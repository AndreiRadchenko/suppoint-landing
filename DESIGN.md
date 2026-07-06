---
name: Liquid Azure
colors:
  surface: '#f4faff'
  surface-dim: '#d2dbe1'
  surface-bright: '#f4faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf5fb'
  surface-container: '#e6eff5'
  surface-container-high: '#e0e9ef'
  surface-container-highest: '#dbe4ea'
  on-surface: '#141d21'
  on-surface-variant: '#42474f'
  inverse-surface: '#293236'
  inverse-on-surface: '#e9f2f8'
  outline: '#727780'
  outline-variant: '#c2c7d0'
  surface-tint: '#2c6193'
  primary: '#003053'
  on-primary: '#ffffff'
  primary-container: '#004777'
  on-primary-container: '#84b6ec'
  inverse-primary: '#9ccaff'
  secondary: '#006a62'
  on-secondary: '#ffffff'
  secondary-container: '#5ef6e6'
  on-secondary-container: '#006f66'
  tertiary: '#4a2400'
  on-tertiary: '#ffffff'
  tertiary-container: '#6a3700'
  on-tertiary-container: '#ff9938'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d0e4ff'
  primary-fixed-dim: '#9ccaff'
  on-primary-fixed: '#001d35'
  on-primary-fixed-variant: '#054979'
  secondary-fixed: '#61f9e9'
  secondary-fixed-dim: '#3adccc'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f4faff'
  on-background: '#141d21'
  surface-variant: '#dbe4ea'
  deep-water: '#002B49'
  glass-white: rgba(255, 255, 255, 0.4)
  surface-blur: rgba(240, 249, 255, 0.6)
  sunny-accent: '#FFA500'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 56px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system embodies the "Liquid Glass" aesthetic—a sophisticated blend of **Glassmorphism** and **Modern Minimalism**. It is designed for SUPPOINT to evoke the refreshing, buoyant sensation of being on the water. The visual narrative centers on high-transparency surfaces, soft organic blurs, and a sense of "weightless depth."

The target audience is active, modern individuals seeking a seamless, premium leisure experience. The UI should feel like a clear summer morning at a lake: fresh, energetic, and crystal clear. By utilizing translucent layers, we mimic the physical properties of water and high-end sports equipment, creating a professional yet inviting atmosphere for an automated rental service.

## Colors

The palette is anchored in a gradient of aquatic blues. **Deep Water Blue** provides a stable foundation for text and primary branding, while **Turquoise** acts as a vibrant secondary color for highlights and progress indicators. 

**Sunny Orange** is reserved strictly for high-impact calls to action (CTAs) and the brand logo, providing a warm, energetic contrast to the cool base colors. 

The background is not pure white but a very light, cool-tinted **Neutral Azure**. The "Liquid Glass" effect is achieved using **Glass-white** and **Surface-blur** tokens, which utilize alpha transparency and backdrop-filter blurs (20px-40px) to create the signature translucent look.

## Typography

We use a combination of **Hanken Grotesk** for headlines and **Plus Jakarta Sans** for body copy. Hanken Grotesk provides a sharp, technical, and modern edge that suggests efficiency and precision. Plus Jakarta Sans adds a softer, more approachable feel to the reading experience.

Headlines should use tight tracking and bold weights to command attention against the soft, blurred backgrounds. Body text maintains a generous line height to ensure maximum readability over translucent surfaces.

## Layout & Spacing

The design system utilizes a **Fluid Grid** with a 12-column structure for desktop. To maintain the "liquid" feel, the layout prioritizes large, expansive white space (or "blur space") between sections.

Spacing follows an 8px base unit. Margins are kept wide to prevent the UI from feeling cluttered, reinforcing the "rest and relaxation" brand pillar. On mobile, we switch to a 4-column grid with reduced margins but maintain significant vertical padding between modules to keep the "breezy" atmosphere intact.

## Elevation & Depth

Depth is not communicated through traditional black shadows, but through **Glassmorphism and Tonal Layers**. 

1.  **Backdrop Blurs:** Every floating container uses a `backdrop-filter: blur(24px)` to separate it from the background imagery.
2.  **Inner Glows:** Instead of drop shadows, use a 1px semi-transparent white border on the top and left sides of containers to simulate a light source hitting the edge of glass.
3.  **Tinted Shadows:** Where depth is critical, use soft, low-opacity shadows tinted with the Primary Blue color (`rgba(0, 71, 119, 0.1)`) rather than neutral gray.

## Shapes

The shape language is organic and friendly. We avoid sharp corners entirely to mirror the soft edges of a SUP board and the flow of water. 

The standard **Rounded** setting (0.5rem) is used for input fields and small cards, while larger sections and containers use `rounded-xl` (1.5rem) to emphasize the soft, premium feel of the glass panels. Buttons should always feel "touchable" and ergonomic.

## Components

**Buttons**
- **Primary:** Sunny Orange background with white text. High-gloss finish with a subtle gradient.
- **Secondary:** Glass-white background with Primary Blue text. 1px solid Turquoise border.

**Cards**
- All cards use the "Liquid Glass" effect: semi-transparent white background, backdrop blur, and 1.5rem corner radius.
- Padding should be generous (min 32px) to allow the content to "breathe."

**Input Fields**
- Soft blue-tinted transparency.
- Active states should glow with a Turquoise outer stroke.

**Chips/Badges**
- Use fully pill-shaped (rounded-full) containers.
- Low-contrast Turquoise backgrounds for "Active" states.

**Navigation**
- A sticky, glassmorphic top bar that adapts its blur intensity based on scroll position.
- Language switchers use simple, bold Hanken Grotesk labels with a Turquoise underline for the active state.