export function initNavbar() {
  // ── Mobile menu toggle ──────────────────────────────────────────────────
  const toggle = document.getElementById('menu-toggle')
  const menu   = document.getElementById('mobile-menu')

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = !menu.classList.contains('hidden')
      menu.classList.toggle('hidden', isOpen)
      toggle.setAttribute('aria-expanded', String(!isOpen))
    })
    // Close when a menu link is clicked
    menu.querySelectorAll('a').forEach((link) =>
      link.addEventListener('click', () => {
        menu.classList.add('hidden')
        toggle.setAttribute('aria-expanded', 'false')
      })
    )
  }

  // ── Nav shrink on scroll ────────────────────────────────────────────────
  const nav = document.getElementById('main-nav')
  if (!nav) return

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('py-2', 'shadow-lg')
      nav.classList.remove('py-3')
    } else {
      nav.classList.remove('py-2', 'shadow-lg')
      nav.classList.add('py-3')
    }
  }, { passive: true })
}
