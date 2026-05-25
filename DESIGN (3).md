---
name: Cosmic Explorer
colors:
  surface: '#1a0b2e'
  surface-dim: '#1a0b2e'
  surface-bright: '#413257'
  surface-container-lowest: '#150629'
  surface-container-low: '#231437'
  surface-container: '#27183b'
  surface-container-high: '#322346'
  surface-container-highest: '#3d2e52'
  on-surface: '#eddcff'
  on-surface-variant: '#debece'
  inverse-surface: '#eddcff'
  inverse-on-surface: '#38294d'
  outline: '#a68998'
  outline-variant: '#57404e'
  surface-tint: '#ffade0'
  primary: '#ffade0'
  on-primary: '#60004c'
  primary-container: '#ff32d0'
  on-primary-container: '#540043'
  inverse-primary: '#b0008f'
  secondary: '#d3fbff'
  on-secondary: '#00363a'
  secondary-container: '#00eefc'
  on-secondary-container: '#00686f'
  tertiary: '#d1bcff'
  on-tertiary: '#3c0090'
  tertiary-container: '#a178ff'
  on-tertiary-container: '#34007f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd8ed'
  primary-fixed-dim: '#ffade0'
  on-primary-fixed: '#3b002e'
  on-primary-fixed-variant: '#87006d'
  secondary-fixed: '#7df4ff'
  secondary-fixed-dim: '#00dbe9'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f54'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d1bcff'
  on-tertiary-fixed: '#23005b'
  on-tertiary-fixed-variant: '#5700c9'
  background: '#1a0b2e'
  on-background: '#eddcff'
  surface-variant: '#3d2e52'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
  body-xl:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 30px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  label-bold:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  element-gap: 12px
---

## Brand & Style

The design system is engineered to evoke a sense of magical adventure and cosmic wonder, specifically tailored for a young audience (ages 4-10). The aesthetic blends **Cute Cartoon Sci-Fi** with **Glassmorphism**, creating a high-fidelity environment that feels like a premium interactive movie.

The brand personality is encouraging and optimistic. It utilizes deep, immersive space backgrounds contrasted with "candy-coated" interactive elements. The goal is to make education feel like a high-stakes, high-reward mission within a futuristic rocket laboratory. Visuals are polished, vibrant, and tactile, ensuring that every interaction feels responsive and "squishy."

## Colors

The palette is rooted in a **Dark Mode** "Neon Galaxy" foundation to provide maximum contrast for young readers.

*   **Primary (Electric Pink):** Reserved for "Success" states, primary call-to-action buttons, and celebratory feedback.
*   **Secondary (Cyber Cyan):** Used for interactive crossword cells, hints, and navigational elements. It provides a cool, high-tech contrast to the warm pink.
*   **Tertiary (Galactic Purple):** Used for secondary buttons and structural accents.
*   **Neutral (Deep Space):** A rich, saturated midnight purple used for the base canvas, ensuring the interface feels vast and deep rather than flat black.
*   **Accents:** Pure white is used sparingly for high-legibility text, while glowing neon outer glows are applied to active interactive states.

## Typography

Typography is prioritized for maximum legibility and friendliness. **Plus Jakarta Sans** provides the geometric, modern structure for headlines, while **Be Vietnam Pro** offers a warm, approachable feel for instructional text.

All text elements should maintain high contrast against the dark backgrounds. For children in the younger age bracket, letter spacing is slightly increased in body copy to prevent "crowding" of characters. Headlines use a heavier weight to feel "bouncy" and significant.

## Layout & Spacing

This design system utilizes a **Fluid Grid** model with generous safe areas to accommodate "fat-finger" interactions on tablets and touch devices. 

The spacing rhythm is based on an 8px square grid. Elements are grouped in "Mission Modules" (logical sections) using wide gutters (24px+) to prevent visual overwhelm. On mobile, the layout reflows into a single column with a bottom-anchored navigation bar for easy thumb reach. Crossword grids should dynamically scale to fit the viewport width, ensuring cells never drop below a 44px hit target.

## Elevation & Depth

Depth is communicated through **Glassmorphism** and **Luminous Layers**.

1.  **The Canvas:** The bottom-most layer is a deep purple gradient with animated floating stars and nebula clouds.
2.  **Panels:** Content containers use a semi-transparent blur (Backdrop Filter: 20px) with a 1px solid Cyber Cyan border at 30% opacity.
3.  **Active Elements:** Interactive components (buttons, active cells) use an "Inner Glow" effect and a drop shadow that matches the element's brand color (e.g., a pink shadow for a pink button) to simulate neon light hitting the surface.
4.  **Floating Elements:** Modals and "Correct" popups use high elevation with wide, soft ambient shadows to appear as if they are floating closest to the user.

## Shapes

The shape language is dominated by **Pill-shaped (Radius: 3)** geometry. Sharp corners are strictly avoided to maintain a safe, friendly, and "toy-like" aesthetic. 

Buttons, input fields, and panel corners all feature large, sweeping radii. Crossword grid cells are the only exception, using a slightly reduced "Soft" (0.5rem) radius to maintain the structural integrity of the grid while remaining tactile and inviting.

## Components

*   **Buttons:** Must be thick and "pressable." Use a 4px bottom border (darker shade) to create a 3D effect. On press, the element should translate 2px down to simulate physical movement.
*   **Crossword Cells:** Large, rounded squares. Active cells feature a pulsing Neon Cyan border. Completed cells turn Electric Pink with a "sparkle" particle effect.
*   **Glass Panels:** Use for instructions and hint overlays. Surfaces are 15% white opacity with a heavy backdrop blur.
*   **Progress Bars:** Styled as "Fuel Gauges" for the rocket. The fill should be a gradient from Tertiary Purple to Primary Pink, featuring a "glowing" cap.
*   **Chips/Badges:** Used for word categories (e.g., "Planets", "Stars"). These are fully pill-shaped with a solid neon border and no fill.
*   **Input Fields:** For character entry, fields should be oversized with a monospaced variant of the body font to ensure each letter is distinct.