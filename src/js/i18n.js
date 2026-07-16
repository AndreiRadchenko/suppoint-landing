import { translations } from './translations.js'

let currentLang = localStorage.getItem('lang') || 'uk'

/**
 * Get translated string by key
 * @param {string} key - Translation key (e.g., 'hero.title')
 * @returns {string} Translated text or key if not found
 */
export function t(key) {
  const dict = translations[currentLang]
  if (!dict) return key
  // Support nested keys via dot notation (e.g. 'location1.name.title')
  const value = key.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), dict)
  return value ?? key
}

/**
 * Change language and update DOM
 * @param {string} lang - Language code ('uk' or 'en')
 */
export function setLanguage(lang) {
  if (!translations[lang]) return

  currentLang = lang
  localStorage.setItem('lang', lang)
  document.documentElement.lang = lang

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n
    const text = t(key)

    // Support for attributes (e.g., data-i18n="placeholder:emailPlaceholder")
    if (key.includes(':')) {
      const [attr, translationKey] = key.split(':')
      el.setAttribute(attr, t(translationKey))
    } else {
      el.textContent = text
    }
  })

  // Update page title if it has data-i18n-title
  const pageTitle = document.querySelector('[data-i18n-title]')
  if (pageTitle) {
    document.title = t(pageTitle.dataset.i18nTitle)
  }

  // Dispatch custom event for language change
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }))
}

/**
 * Get current language
 */
export function getCurrentLanguage() {
  return currentLang
}

/**
 * Initialize i18n on page load
 */
export function initI18n() {
  setLanguage(currentLang)
}
