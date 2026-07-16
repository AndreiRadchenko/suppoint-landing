export function initAccordion() {
  const buttons = document.querySelectorAll('.accordion-toggle')

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling
      const icon = btn.querySelector('.accordion-icon')
      const isOpen = !content.classList.contains('hidden')

      // Collapse all items first
      document.querySelectorAll('.accordion-content').forEach((c) => c.classList.add('hidden'))
      document.querySelectorAll('.accordion-icon').forEach((i) => (i.textContent = '+'))

      // Expand clicked item if it was closed
      if (!isOpen) {
        content.classList.remove('hidden')
        if (icon) icon.textContent = '−'
      }
    })
  })
}
