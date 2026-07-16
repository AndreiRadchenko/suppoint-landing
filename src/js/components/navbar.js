export function initNavbar() {
  // ── Mobile menu toggle ──────────────────────────────────────────────────
  const toggle = document.getElementById('menu-toggle')
  const menu   = document.getElementById('mobile-menu')

  if (toggle && menu) {
    const openClasses = ['opacity-100', 'translate-y-0', 'pointer-events-auto']
    const closedClasses = ['opacity-0', '-translate-y-2', 'pointer-events-none']
    const transitionClasses = ['transition-all', 'duration-300', 'ease-out', 'transform']

    menu.classList.add(...transitionClasses, ...closedClasses)

    const openMenu = () => {
      menu.classList.remove('hidden')
      requestAnimationFrame(() => {
        menu.classList.remove(...closedClasses)
        menu.classList.add(...openClasses)
      })
      toggle.setAttribute('aria-expanded', 'true')
    }

    const closeMenu = () => {
      menu.classList.remove(...openClasses)
      menu.classList.add(...closedClasses)
      toggle.setAttribute('aria-expanded', 'false')

      window.setTimeout(() => {
        if (menu.classList.contains('opacity-0')) {
          menu.classList.add('hidden')
        }
      }, 300)
    }

    toggle.addEventListener('click', () => {
      const isOpen = !menu.classList.contains('hidden')
      if (isOpen) {
        closeMenu()
      } else {
        openMenu()
      }
    })
    // Close when a menu link is clicked
    menu.querySelectorAll('a, .close-menu').forEach((item) =>
      item.addEventListener('click', () => {
        window.setTimeout(closeMenu, 0)
      })
    )

    document.addEventListener('click', (event) => {
      if (menu.classList.contains('hidden')) return
      if (menu.contains(event.target) || toggle.contains(event.target)) return
      closeMenu()
    })
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
