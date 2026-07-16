import { priceList } from '../price.js'

function formatPrice(value) {
  if (value == null) return '—'
  return `${value.toLocaleString('uk-UA')}₴`
}

function formatDuration(row) {
  if (row.minutes != null) {
    const hours = Math.floor(row.minutes / 60)
    const mins = row.minutes % 60

    if (hours === 0) return `${mins} хв.`
    if (mins === 0) return hours === 1 ? '1 година' : `${hours} години`
    return `${hours} год. ${mins} хв.`
  }

  // Package rows without duration in the sheet
  if (row.time === 'special_2' || row.discount >= 50) return 'Весь день'
  if (row.discount > 0) return `5 годин`
  return row.label || row.time
}

function isHighlightRow(row) {
  return row.minutes == null || row.discount >= 50 || row.time === 'special_2'
}

/**
 * Renders the full price table from price.js into #price-table-body
 */
export function initPriceTable() {
  const tbody = document.getElementById('price-table-body')
  if (!tbody) return

  tbody.replaceChildren()

  priceList.forEach((row, index) => {
    const isLast = index === priceList.length - 1
    const highlight = isHighlightRow(row)
    const tr = document.createElement('tr')

    tr.className = highlight
      ? 'hover:bg-white/50 transition-colors bg-secondary/5'
      : 'hover:bg-white/40 transition-colors'

    const borderClass = isLast ? '' : 'border-b border-primary/5'
    const durationClass = highlight
      ? `p-6 font-black text-primary ${borderClass}`.trim()
      : `p-6 border-b border-primary/5 font-medium text-primary`
    const priceClass = highlight
      ? `p-6 font-black text-secondary text-xl ${borderClass}`.trim()
      : `p-6 border-b border-primary/5 font-black text-primary/80`

    tr.innerHTML = `
      <td class="${durationClass}">${formatDuration(row)}</td>
      <td class="${priceClass}">${formatPrice(row.standard.weekday)}</td>
      <td class="${priceClass}">${formatPrice(row.standard.weekend)}</td>
    `

    tbody.appendChild(tr)
  })
}
