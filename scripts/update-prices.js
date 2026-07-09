/**
 * Fetches rental prices from Google Sheets and regenerates price.js
 * Runs automatically on every build (prebuild) and can be run manually:
 *   node scripts/update-prices.js
 */

import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUTPUT = resolve(ROOT, 'price.js')

const SHEET_ID = '1-IUP7OdeZGyxACiC_Uvc0nLtO7oJTsiANHOX8QtV3rQ'
const GID = '0'
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${GID}`

/** Parse a single CSV line respecting quoted fields */
function parseCsvLine(line) {
  const cells = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    const next = line[i + 1]

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        current += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        current += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      cells.push(current)
      current = ''
    } else {
      current += ch
    }
  }

  cells.push(current)
  return cells
}

function parseCsv(text) {
  return text
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map(parseCsvLine)
}

/** "1 040,00" / "1\u00a0040,00" / "320,00" → 1040 / 320 */
function parsePrice(value) {
  if (value == null || String(value).trim() === '') return null
  const normalized = String(value)
    .replace(/[\s\u00a0]/g, '')
    .replace(',', '.')
    .replace(/[^\d.-]/g, '')
  const num = Number(normalized)
  return Number.isFinite(num) ? Math.round(num) : null
}

/** "5,00%" → 5 */
function parseDiscount(value) {
  if (value == null || String(value).trim() === '') return 0
  const num = Number(String(value).replace('%', '').replace(',', '.').trim())
  return Number.isFinite(num) ? num : 0
}

/** "1 год. 30 хв." → { key: "1:30", minutes: 90, label: "1 год. 30 хв." } */
function parseDuration(raw) {
  const label = String(raw ?? '').trim()
  if (!label) return null

  const match = label.match(/(\d+)\s*год\.?\s*(\d+)\s*хв\.?/i)
  if (!match) return { key: label, minutes: null, label }

  const hours = Number(match[1])
  const minutesPart = Number(match[2])
  const minutes = hours * 60 + minutesPart
  const key = `${hours}:${String(minutesPart).padStart(2, '0')}`

  return { key, minutes, label }
}

function buildPrices(rows) {
  // Skip header
  const dataRows = rows.slice(1)
  const prices = {}
  const list = []
  let specialIndex = 0

  for (const row of dataRows) {
    const [durationRaw, stdWeekday, stdWeekend, maxiWeekday, maxiWeekend, discountRaw] = row

    // Skip completely empty rows
    if (row.every((cell) => !String(cell ?? '').trim())) continue

    const duration = parseDuration(durationRaw)
    let key
    let minutes = null
    let label = ''

    if (duration) {
      key = duration.key
      minutes = duration.minutes
      label = duration.label
    } else {
      specialIndex += 1
      key = `special_${specialIndex}`
      label = `special_${specialIndex}`
    }

    // Avoid overwriting if duplicate keys appear
    if (prices[key]) {
      key = `${key}_${specialIndex || list.length}`
    }

    const entry = {
      minutes,
      label,
      standard: {
        weekday: parsePrice(stdWeekday),
        weekend: parsePrice(stdWeekend),
      },
      maxi: {
        weekday: parsePrice(maxiWeekday),
        weekend: parsePrice(maxiWeekend),
      },
      discount: parseDiscount(discountRaw),
    }

    prices[key] = entry
    list.push({ time: key, ...entry })
  }

  return { prices, list }
}

function generateFile({ prices, list }) {
  const generatedAt = new Date().toISOString()

  return `/**
 * Auto-generated price list from Google Sheets.
 * Do not edit manually — run: npm run update-prices
 *
 * Source: https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit?gid=${GID}
 * Generated: ${generatedAt}
 *
 * Keys are time slots (H:MM). Values are prices in UAH.
 * special_* keys are package rows without a duration label in the sheet.
 */

/** @type {Record<string, {
 *   minutes: number | null,
 *   label: string,
 *   standard: { weekday: number | null, weekend: number | null },
 *   maxi: { weekday: number | null, weekend: number | null },
 *   discount: number
 * }>} */
export const prices = ${JSON.stringify(prices, null, 2)}

/** Ordered list of all price rows (same data as \`prices\`) */
export const priceList = ${JSON.stringify(list, null, 2)}

/** Convenience: standard weekday price for a time key, e.g. getPrice('1:00') → 320 */
export function getPrice(time, { kit = 'standard', day = 'weekday' } = {}) {
  const row = prices[time]
  if (!row) return null
  return row[kit]?.[day] ?? null
}

export default prices
`
}

async function main() {
  console.log('Fetching prices from Google Sheets…')
  console.log(CSV_URL)

  const response = await fetch(CSV_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet: HTTP ${response.status} ${response.statusText}`)
  }

  const csv = await response.text()
  if (!csv || csv.includes('accounts.google.com') || csv.trimStart().startsWith('<!DOCTYPE')) {
    throw new Error(
      'Sheet is not publicly readable. Share the spreadsheet as "Anyone with the link can view".'
    )
  }

  const rows = parseCsv(csv)
  if (rows.length < 2) {
    throw new Error('Sheet returned no data rows')
  }

  const data = buildPrices(rows)
  const content = generateFile(data)

  writeFileSync(OUTPUT, content, 'utf8')

  console.log(`Wrote ${OUTPUT}`)
  console.log(`  ${Object.keys(data.prices).length} time slots`)
  for (const item of data.list) {
    const std = item.standard.weekday ?? '—'
    console.log(`  ${item.time.padEnd(12)} standard weekday: ${std}₴  discount: ${item.discount}%`)
  }
}

main().catch((err) => {
  console.error('update-prices failed:', err.message)
  process.exit(1)
})
