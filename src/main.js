import './style.css'
import { initNavbar } from './components/navbar.js'
import { initI18n, setLanguage, getCurrentLanguage } from './i18n.js'
import { initWeatherWidget } from './components/weatherWidget.js'
import { initPriceTable } from './components/priceTable.js'

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

// Fill full price table from price.js
function safeInitPriceTable() {
  try {
    initPriceTable()
  } catch (e) {
    console.error('Price table init failed:', e)
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', safeInitPriceTable)
} else {
  safeInitPriceTable()
}

// ── Slider helpers ────────────────────────────────────────────────────────
const SLIDER_IDS = ['equipment-slider', 'location-slider']

function getSlides(slider) {
  return Array.from(slider.querySelectorAll(':scope > .slider-item'))
}

function getCurrentSlideIndex(slider) {
  const slides = getSlides(slider)
  if (!slides.length) return 0

  const scrollLeft = slider.scrollLeft
  let bestIndex = 0
  let bestDistance = Infinity

  slides.forEach((slide, index) => {
    const distance = Math.abs(slide.offsetLeft - scrollLeft)
    if (distance < bestDistance) {
      bestDistance = distance
      bestIndex = index
    }
  })

  return bestIndex
}

function scrollToSlide(slider, index, behavior = 'smooth') {
  const slides = getSlides(slider)
  if (!slides.length) return

  const clamped = Math.max(0, Math.min(index, slides.length - 1))
  const target = slides[clamped]
  if (!target) return

  slider.scrollTo({
    left: target.offsetLeft,
    behavior,
  })

  // Keep buttons in sync even while smooth scroll is in progress
  updateSliderButtons(slider.id)
}

function scrollSlider(sliderId, direction) {
  const slider = document.getElementById(sliderId)
  if (!slider) return

  const current = getCurrentSlideIndex(slider)
  scrollToSlide(slider, current + direction)
}

function updateSliderButtons(sliderId) {
  const slider = document.getElementById(sliderId)
  if (!slider) return

  const slides = getSlides(slider)
  const index = getCurrentSlideIndex(slider)
  const atStart = index <= 0
  const atEnd = index >= slides.length - 1 || slides.length <= 1

  document.querySelectorAll(`[data-slider-btn="${sliderId}"]`).forEach((btn) => {
    const dir = Number(btn.dataset.dir)
    const disabled = dir < 0 ? atStart : atEnd
    btn.disabled = disabled
    btn.setAttribute('aria-disabled', String(disabled))
  })
}

function initSliderControls(sliderId) {
  const slider = document.getElementById(sliderId)
  if (!slider) return

  let scrollEndTimer = null

  const sync = () => updateSliderButtons(sliderId)

  slider.addEventListener(
    'scroll',
    () => {
      // Live update while dragging / swiping
      sync()
      clearTimeout(scrollEndTimer)
      scrollEndTimer = setTimeout(sync, 80)
    },
    { passive: true }
  )

  // Snap to nearest slide after touch/drag ends (mobile browsers can stop mid-slide)
  const snapToNearest = () => {
    const index = getCurrentSlideIndex(slider)
    const slides = getSlides(slider)
    const target = slides[index]
    if (!target) return
    if (Math.abs(slider.scrollLeft - target.offsetLeft) > 1) {
      scrollToSlide(slider, index, 'smooth')
    } else {
      sync()
    }
  }

  slider.addEventListener('scrollend', snapToNearest)
  // Fallback for browsers without scrollend
  slider.addEventListener(
    'touchend',
    () => {
      setTimeout(snapToNearest, 50)
    },
    { passive: true }
  )

  window.addEventListener('resize', () => {
    // Re-align current slide after layout changes
    scrollToSlide(slider, getCurrentSlideIndex(slider), 'auto')
  })

  // Initial state
  scrollToSlide(slider, 0, 'auto')
  sync()
}

function initDragScroll(id) {
  const slider = document.getElementById(id)
  if (!slider) return

  let down = false
  let startX = 0
  let left = 0
  let moved = false

  slider.addEventListener('mousedown', (e) => {
    // Only primary button
    if (e.button !== 0) return
    down = true
    moved = false
    startX = e.pageX
    left = slider.scrollLeft
    slider.style.scrollBehavior = 'auto'
    slider.classList.add('cursor-grabbing')
  })

  const endDrag = () => {
    if (!down) return
    down = false
    slider.style.scrollBehavior = 'smooth'
    slider.classList.remove('cursor-grabbing')
    if (moved) {
      scrollToSlide(slider, getCurrentSlideIndex(slider), 'smooth')
    }
  }

  slider.addEventListener('mouseleave', endDrag)
  window.addEventListener('mouseup', endDrag)
  slider.addEventListener('mousemove', (e) => {
    if (!down) return
    e.preventDefault()
    const dx = e.pageX - startX
    if (Math.abs(dx) > 3) moved = true
    slider.scrollLeft = left - dx
  })
}

function initAutoScroll(id, interval = 7000) {
  // if (window.innerWidth < 768) return

  const slider = document.getElementById(id)
  if (!slider) return

  let dir = 1
  setInterval(() => {
    const slides = getSlides(slider)
    if (slides.length <= 1) return

    const current = getCurrentSlideIndex(slider)
    if (current >= slides.length - 1) dir = -1
    if (current <= 0) dir = 1
    scrollToSlide(slider, current + dir)
  }, interval)
}

document.addEventListener('DOMContentLoaded', () => {
  SLIDER_IDS.forEach((id) => {
    initSliderControls(id)
    initDragScroll(id)
  })
  initAutoScroll('equipment-slider', 15000)
  // initAutoScroll('location-slider', 15000)
  initRouteLinks()
})

// expose for inline onclick attributes
window.scrollSlider = scrollSlider

// ── Route links ───────────────────────────────────────────────────────────
// Build Google Maps links from a translation key holding "lat, lng"
function initRouteLinks() {
  document.querySelectorAll('[data-route]').forEach((el) => {
    const coords = t(el.dataset.route).trim()
    if (coords) {
      el.href = `https://maps.google.com/?q=${encodeURIComponent(coords)}`
    }
  })
}

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
    initRouteLinks()
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
