import './style.css'
import { initNavbar } from './components/navbar.js'

initNavbar()

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
