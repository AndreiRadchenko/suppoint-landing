import { getCurrentLanguage } from '../i18n.js'
import { translations } from '../translations.js'

// Weather API configuration
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

// DOM element refs (populated in initWeatherWidget)
let locationEl
let tempEl
let waterTempEl
let windEl

// Fetch weather data using coordinates from translations
async function fetchWeather() {
  const lang = getCurrentLanguage()
  const coordsStr = translations[lang]?.coordinates
  if (!coordsStr) {
    console.error('No coordinates configured for language:', lang)
    applyFallback()
    return
  }
  const [lat, lon] = coordsStr.split(',').map((s) => s.trim())

  if (!API_KEY) {
    console.warn('Missing VITE_WEATHER_API_KEY in .env (must start with VITE_)')
    applyFallback()
    return
  }

  try {
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${lang}`
    console.log('Fetching weather for:', url)
    const response = await fetch(url)

    if (!response.ok) throw new Error(`Weather fetch failed: ${response.status}`)
    const data = await response.json()
    console.log('Weather data:', data)
    applyWeatherData(data)
  } catch (error) {
    console.error('Error fetching weather:', error)
    applyFallback()
  }
}

// Add a function to force refresh the weather data
function refreshWeather() {
  fetchWeather()
}

async function applyWeatherData(data) {
  if (!data || !tempEl) return
  if (locationEl) locationEl.textContent = translations[getCurrentLanguage()]?.location || ''
  tempEl.textContent = `${Math.round(data.main.temp)}°C`

  // Use weather description and icon instead of water temperature
  if (data.weather && data.weather.length > 0) {
    const weatherDesc = data.weather[0].description
    const weatherIcon = data.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`

    if (waterTempEl) {
      waterTempEl.textContent = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)
      // Optionally set icon if you have an element for it
      const iconEl = document.getElementById('weather-icon')
      if (iconEl) {
        iconEl.src = iconUrl
        iconEl.alt = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)
      }
    }
  } else {
    if (waterTempEl) waterTempEl.textContent = 'N/A'
  }

  if (windEl) windEl.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`
}

function applyFallback() {
  const lang = getCurrentLanguage()
  const trans = translations[lang] || {}
  if (locationEl) locationEl.textContent = trans.location || ''
  if (tempEl) tempEl.textContent = '25°C'
  if (waterTempEl) waterTempEl.textContent = '22°C'
  if (windEl) windEl.textContent = '10 km/h'
}

// Initialize weather widget - safe to call early; queries DOM here
function initWeatherWidget() {
  // Query the actual elements that exist in the page (we add ids in index.html)
  locationEl = document.getElementById('weather-location')
  tempEl = document.getElementById('weather-temp')
  waterTempEl = document.getElementById('weather-water-temp')
  windEl = document.getElementById('weather-wind')

  const hasTargets = tempEl || waterTempEl || windEl
  if (!hasTargets) {
    // No weather section on this page (e.g. about/contact) - do nothing
    return
  }

  fetchWeather()
  // Refresh every 10 minutes
  setInterval(fetchWeather, 600000)
}

async function estimateLakeWaterTempFromTimeMachine({
  apiKey,
  lat,
  lon,
  days = 5,
  units = 'metric',
  offset = 3,
}) {
  if (!apiKey) throw new Error('Missing OpenWeather apiKey')
  if (days < 3 || days > 7) {
    throw new Error('days should be between 3 and 7')
  }

  const now = Math.floor(Date.now() / 1000)
  const end = now
  const start = now - days * 24 * 60 * 60

  const url = new URL('https://history.openweathermap.org/data/2.5/history/city')
  url.searchParams.set('lat', lat)
  url.searchParams.set('lon', lon)
  url.searchParams.set('type', 'hour')
  url.searchParams.set('start', start)
  url.searchParams.set('end', end)
  url.searchParams.set('units', units)
  url.searchParams.set('appid', apiKey)

  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`OpenWeather History API error: ${res.status} ${text}`)
  }

  const data = await res.json()
  const list = Array.isArray(data.list) ? data.list : []

  if (!list.length) {
    throw new Error('No historical hourly data returned for this range')
  }

  const dailyTemps = new Map()

  for (const entry of list) {
    const temp = entry?.main?.temp
    if (typeof temp !== 'number') continue

    const date = new Date(entry.dt * 1000).toISOString().slice(0, 10)

    if (!dailyTemps.has(date)) {
      dailyTemps.set(date, [])
    }
    dailyTemps.get(date).push(temp)
  }

  const dailyAirTemps = [...dailyTemps.entries()].map(([date, temps]) => ({
    date,
    avgAirTemp: temps.reduce((sum, t) => sum + t, 0) / temps.length,
    samples: temps.length,
  }))

  if (!dailyAirTemps.length) {
    throw new Error('Could not compute daily averages from hourly data')
  }

  const avgAirTemp = dailyAirTemps.reduce((sum, d) => sum + d.avgAirTemp, 0) / dailyAirTemps.length

  const estimatedWaterTemp = 0.7 * avgAirTemp + offset

  return {
    lat,
    lon,
    units,
    days,
    offset,
    avgAirTemp,
    estimatedWaterTemp,
    dailyAirTemps,
  }
}

// Add a global event listener for language changes to refresh weather
window.addEventListener('languageChanged', refreshWeather)

export { initWeatherWidget, refreshWeather }
