---
name: Galactic Harmony
colors:
  surface: '#0b0c3d'
  surface-dim: '#0b0c3d'
  surface-bright: '#333465'
  surface-container-lowest: '#060538'
  surface-container-low: '#141545'
  surface-container: '#191a4a'
  surface-container-high: '#232555'
  surface-container-highest: '#2e3060'
  on-surface: '#e1e0ff'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e1e0ff'
  inverse-on-surface: '#2a2b5b'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#fface8'
  on-secondary: '#5e0053'
  secondary-container: '#ff24e4'
  on-secondary-container: '#520049'
  tertiary: '#e7ffb5'
  on-tertiary: '#253600'
  tertiary-container: '#aeed00'
  on-tertiary-container: '#4b6800'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#ffd7f0'
  secondary-fixed-dim: '#fface8'
  on-secondary-fixed: '#3a0033'
  on-secondary-fixed-variant: '#840076'
  tertiary-fixed: '#b6f700'
  tertiary-fixed-dim: '#9fd800'
  on-tertiary-fixed: '#141f00'
  on-tertiary-fixed-variant: '#374e00'
  background: '#0b0c3d'
  on-background: '#e1e0ff'
  surface-variant: '#2e3060'
typography:
  display-lg:
    fontFamily: Quicksand
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Quicksand
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  title-md:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  label-bold:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
  card-gap: 12px
---

## Brand & Style

The design system is crafted for a high-fidelity, educational gaming experience. It merges the cinematic premium feel of Disney+ with the gamified, friendly accessibility of Duolingo. The aesthetic is "Cosmic Play" — a blend of dark, vast backgrounds and vibrant, neon-lit interactive elements.

The personality is **magical, safe, and wonder-filled**. It aims to evoke a sense of discovery in young learners through soft, tactile surfaces and friendly character design. The visual style utilizes **Glassmorphism** for navigational overlays to maintain a sense of deep-space immersion, while core game elements use **Tactile** metaphors — thick borders, squishy button states, and glowing inner shadows that make the interface feel like a physical toy floating in a nebula.

## Colors

The palette is a **Neon Galaxy** theme, optimized for deep-space immersion and high-contrast accessibility for children.

*   **Primary (Cyan):** Used for primary actions, progress indicators, and "good" feedback. It represents the glow of a spaceship's engine.
*   **Secondary (Magenta):** Used for secondary interactions and special "star" rewards.
*   **Tertiary (Lime Green):** Reserved for "Correct" states and success animations.
*   **Neutral (Space Navy):** The core background color, providing a low-strain environment that makes vibrant game pieces pop.
*   **Gradients:** Use deep radial gradients (e.g., `#1A1B4B` to `#0B0C2A`) for backgrounds to simulate nebulae. All interactive neons should feature a subtle outer glow (`drop-shadow`) of the same hue to enhance the "glowing" effect.

## Typography

This design system uses **Quicksand** exclusively to ensure maximum legibility and friendliness. The rounded terminals of the glyphs mirror the roundedness of the UI components.

**Hierarchy Rules:**
- **Headlines:** Always use Bold (700). Use Primary Cyan or White.
- **Game Text:** Use Medium (500) for instructional text to ensure it doesn't feel aggressive.
- **Labels:** Use Bold (700) with slight letter spacing for button text and pair labels.
- **Readability:** Maintain high contrast against dark backgrounds; avoid using dark purples for text.

## Layout & Spacing

The system uses a **Fluid Grid** with a generous 8px base unit to accommodate small, developing motor skills.

*   **Safe Zones:** Large 20px margins on mobile to prevent accidental edge-taps.
*   **Game Grid:** A flexible 2-column or 3-column grid for the "Match Pair" cards, centered vertically and horizontally.
*   **Touch Targets:** All interactive elements must maintain a minimum hit area of 48x48px, though 64x64px is preferred for this target demographic.
*   **Grouping:** Use wide spacing between disparate functional areas (e.g., Scoreboard vs. Game Board) to prevent cognitive overload.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layering** and **Glassmorphism**.

1.  **Level 0 (Deep Space):** The base background with nebulae and stars.
2.  **Level 1 (Glass Panels):** Semi-transparent surfaces (`rgba(255, 255, 255, 0.1)`) with a 20px backdrop blur. Used for settings menus and pause screens.
3.  **Level 2 (Tactile Cards):** Solid surfaces with thick 4px borders. These use a "3D Press" effect — a bottom-heavy border (shadow) that disappears when pressed.
4.  **Level 3 (Pop-ups):** Floating modals with a vibrant glow (`drop-shadow: 0 0 20px primary_color_hex`) to draw immediate focus.

## Shapes

The shape language is dominated by **circles and super-ellipses**.

*   **Cards:** Use `rounded-lg` (1rem) to feel friendly and safe. 
*   **Borders:** Interactive elements should have a "weighted" border (4px on the bottom, 2px on the sides) to give them a physical, button-like quality.
*   **Characters:** All planet characters should be perfect circles with expressive, large-eyed faces to build an emotional connection with the user.

## Components

### Buttons
Primary buttons should be pill-shaped with a vibrant gradient fill (Cyan to Blue). They feature a "squishy" animation: on press, they scale down to 95% and the bottom "3D border" flattens.

### Cards (The Match Pair)
Cards consist of a thick navy border, a light-cream or soft-glass inner background, and a central planet illustration. When "matched," the card border should glow with the Tertiary Green color.

### Progress Bar
The bar should look like a "fuel gauge" or a star-path. A small rocket icon acts as the indicator, moving along a dashed line that fills with Primary Cyan as the child completes pairs.

### Modals
Use the Glassmorphism style. Backgrounds behind the modal should dim with a deep purple overlay. Buttons inside modals should be large and centered.

### Feedback Particles
Successful matches should trigger a burst of "star particles" (small circles and 4-pointed stars) in the Primary and Secondary colors to provide positive reinforcement.