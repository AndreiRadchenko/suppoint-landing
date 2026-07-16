# AGENTS.md

## Project

SUPPOINT landing site — a static multi-page marketing site for a self-service SUP (stand-up paddleboard) rental service. Vanilla JS + Vite + Tailwind CSS v4 + Handlebars partials. No framework.

## Commands

- `npm run dev` — start Vite dev server (with `--host`)
- `npm run build` — runs `prebuild` (fetches prices) then `vite build`
- `npm run preview` — preview production build
- `npm run update-prices` — regenerate `price.js` from Google Sheets
- `npm run format` — Prettier over the whole repo

There is no lint, typecheck, or test setup. Verify changes by running `npm run dev` / `npm run build`.

## Structure

- `index.html`, `about.html`, `contact.html` — the three build entry points (see `vite.config.js` `rollupOptions.input`)
- `src/main.js` — app entry, loaded via `<script type="module" src="/src/main.js">`; wires up sliders, language switcher, route links, and inits components
- `src/components/` — `navbar.js`, `priceTable.js`, `weatherWidget.js`, `accordion.js` (each exports an `init*` function)
- `src/partials/*.hbs` — Handlebars partials (`head`, `nav`, `footer`) resolved from `src/partials` by `vite-plugin-handlebars`
- `src/i18n.js` + `src/translations.js` — client-side i18n (uk/en); default `uk`, persisted in `localStorage` under `lang`
- `src/style.css`, `src/fonts.css` — Tailwind v4 (via `@tailwindcss/vite`) and font styles
- `price.js` — AUTO-GENERATED, do not edit manually; run `npm run update-prices`
- `scripts/update-prices.js` — fetches CSV from a public Google Sheet and writes `price.js`
- `DESIGN.md` — design system (Liquid Glass / glassmorphism); colors, typography, spacing tokens

## Conventions

- Prettier config (`.prettierrc.json`): no semicolons, single quotes, 2-space tabs, `printWidth: 100`, es5 trailing commas, always arrow parens
- ES modules throughout (`"type": "module"`)
- i18n: mark translatable elements with `data-i18n="key"` (supports nested dot keys and `attr:key` for attributes); page titles via `data-i18n-title`
- Google Maps route links: use `data-route` with a translation key holding `"lat, lng"`
- Component init functions wrap work in try/catch and are called from `main.js`
