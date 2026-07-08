import './style.css'
import { initNavbar } from './components/navbar.js'
import { initI18n, setLanguage, getCurrentLanguage } from './i18n.js'
import { initWeatherWidget } from './components/weatherWidget.js'

// Initialize i18n
initI18n()
initNavbar()

// Initialize weather widget safely (handles both early and late script execution)
function safeInitWeather() {
  try {
    initWeatherWidget()
  } catch (e) {
    console.error('Weather widget init failed:', e)
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', safeInitWeather)
} else {
  safeInitWeather()
}

// ── Slider helpers ────────────────────────────────────────────────────────
export function scrollSlider(id, direction) {
  const slider = document.getElementById(id)
  if (!slider) return
  slider.scrollBy({ left: direction * slider.clientWidth * 0.85, behavior: 'smooth' })
}

function initDragScroll(id) {
  const slider = document.getElementById(id)
  if (!slider) return
  let down = false, startX = 0, left = 0
  slider.addEventListener('mousedown',  (e) => { down = true; startX = e.pageX - slider.offsetLeft; left = slider.scrollLeft; slider.style.scrollBehavior = 'auto' })
  slider.addEventListener('mouseleave', ()  => { down = false; slider.style.scrollBehavior = 'smooth' })
  slider.addEventListener('mouseup',    ()  => { down = false; slider.style.scrollBehavior = 'smooth' })
  slider.addEventListener('mousemove',  (e) => {
    if (!down) return
    e.preventDefault()
    slider.scrollLeft = left - (e.pageX - slider.offsetLeft - startX) * 2
  })
}

function initAutoScroll(id, interval = 7000) {
  const slider = document.getElementById(id)
  if (!slider) return
  let dir = 1
  setInterval(() => {
    const atEnd   = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 20
    const atStart = slider.scrollLeft <= 20
    if (atEnd)   dir = -1
    if (atStart) dir =  1
    slider.scrollBy({ left: dir * slider.clientWidth * 0.4, behavior: 'smooth' })
  }, interval)
}

document.addEventListener('DOMContentLoaded', () => {
  initDragScroll('equipment-slider')
  initDragScroll('location-slider')
  initAutoScroll('equipment-slider', 6000)
  initAutoScroll('location-slider',  10000)
})

// expose for inline onclick attributes
window.scrollSlider = scrollSlider

// Language switcher
document.addEventListener('DOMContentLoaded', () => {
  const langUaBtn = document.getElementById('lang-ua')
  const langEnBtn = document.getElementById('lang-en')
  const langUaMobileBtn = document.getElementById('lang-ua-mobile')
  const langEnMobileBtn = document.getElementById('lang-en-mobile')

  const allLangBtns = [langUaBtn, langEnBtn, langUaMobileBtn, langEnMobileBtn].filter(Boolean)

  allLangBtns.forEach((btn) => {
    if (btn.id.includes('ua')) {
      btn.addEventListener('click', () => setLanguage('uk'))
    } else if (btn.id.includes('en')) {
      btn.addEventListener('click', () => setLanguage('en'))
    }
  })

  // Update active state on language change
  window.addEventListener('languageChanged', (e) => {
    allLangBtns.forEach((btn) => {
      if (btn.id.includes('ua')) {
        btn.classList.toggle('active', e.detail.lang === 'uk')
      } else if (btn.id.includes('en')) {
        btn.classList.toggle('active', e.detail.lang === 'en')
      }
    })
  })

  // Set initial active state
  allLangBtns.forEach((btn) => {
    if (btn.id.includes('ua')) {
      btn.classList.toggle('active', getCurrentLanguage() === 'uk')
    } else if (btn.id.includes('en')) {
      btn.classList.toggle('active', getCurrentLanguage() === 'en')
    }
  })
})

