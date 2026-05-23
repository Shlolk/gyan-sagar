---
name: Candy Galaxy Adventure
colors:
  surface: '#e9ffed'
  surface-dim: '#6df2ac'
  surface-bright: '#e9ffed'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#cfffde'
  surface-container: '#b0ffce'
  surface-container-high: '#8bffbe'
  surface-container-highest: '#76fbb4'
  on-surface: '#002111'
  on-surface-variant: '#53424b'
  inverse-surface: '#003921'
  inverse-on-surface: '#c0ffd6'
  outline: '#86727b'
  outline-variant: '#d8c0cb'
  surface-tint: '#9e347c'
  primary: '#9e347c'
  on-primary: '#ffffff'
  primary-container: '#ff85d1'
  on-primary-container: '#7b135e'
  inverse-primary: '#ffaedc'
  secondary: '#006686'
  on-secondary: '#ffffff'
  secondary-container: '#4ccbfe'
  on-secondary-container: '#00536e'
  tertiary: '#705d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#ceac00'
  on-tertiary-container: '#4f4100'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd8eb'
  primary-fixed-dim: '#ffaedc'
  on-primary-fixed: '#3c002c'
  on-primary-fixed-variant: '#811963'
  secondary-fixed: '#bfe8ff'
  secondary-fixed-dim: '#6ed2ff'
  on-secondary-fixed: '#001f2b'
  on-secondary-fixed-variant: '#004d65'
  tertiary-fixed: '#ffe173'
  tertiary-fixed-dim: '#e8c426'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#554500'
  background: '#e9ffed'
  on-background: '#002111'
  surface-variant: '#76fbb4'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
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
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  radius-pill: 9999px
---

## Brand & Style

The design system is a high-energy, whimsical reimagining of a sci-fi universe, transformed into a tactile playground of interstellar sweets. It targets a young audience and the "young at heart," evoking feelings of joy, curiosity, and boundless energy. 

The aesthetic is **Tactile-Playful**, blending the "squishy" physical metaphors of toy design with a vibrant, modern digital interface. It draws heavy inspiration from the chunky, rounded forms of *Fall Guys* and the saturated, rewarding feedback loops of *Candy Crush*. Every element should feel "bonk-able"—soft to the touch but visually high-contrast to ensure maximum readability and accessibility for younger players.

## Colors

The palette is a "Sugar-Rush" explosion, utilizing high-saturation candy tones against soft pastel foundations. 

- **Primary (Bubblegum Pink):** Used for main actions, hero icons, and player-critical progress indicators.
- **Secondary (Sky Blue):** Used for secondary navigation, mana/energy systems, and cosmic environmental UI.
- **Tertiary (Sunny Yellow):** Reserved for currency, rewards, and high-attention notifications.
- **Neutral/Accent (Mint Green):** Used for success states, "Ready" indicators, and healthy status bars.
- **Surface Strategy:** Standard grays are replaced with "Frosted" tones—very pale, tinted versions of the primary colors (e.g., #FFF0F9) to maintain the sugary aesthetic without sacrificing legibility.

## Typography

This design system utilizes **Plus Jakarta Sans** for all roles due to its soft, rounded terminals and approachable geometric construction. 

The type hierarchy is intentionally oversized to accommodate younger readers. Headlines use "Extra Bold" (800) weights to create a "bouncy" visual rhythm, while body text maintains a "Medium" (500) weight to ensure clarity against vibrant backgrounds. High-contrast outlines (1-2px) in a darker shade of the font color should be applied to headlines to ensure they "pop" off the screen like stickers.

## Layout & Spacing

The layout follows a **Fluid "Bubble" Grid**. Instead of rigid boxes, content is grouped into floating organic clusters with generous padding.

- **Rhythm:** An 8px base unit drives all spacing. 
- **The "Safety Cushion":** Elements never touch the edge of their containers; a minimum 16px internal padding is required to maintain the "toy-in-a-box" feel.
- **Adaptation:** On mobile, the HUD elements shrink into a "Radial Menu" style in the corners, while on desktop, they expand into a horizontal "Toolbar" at the bottom of the screen, mimicking a dashboard made of marshmallows.

## Elevation & Depth

Visual hierarchy is achieved through **Tactile Neomorphism** and **Jelly-Depth**.

1.  **Object Depth:** Elements do not use flat shadows. Instead, they use a "Drop-Glow"—a shadow tinted with the element's own color (e.g., a Pink button casts a soft Pink shadow) to create a glowing, magical effect.
2.  **Surface Treatment:** All containers use a "Sugar Glaze" overlay—a subtle top-down white linear gradient (opacity 10-20%) that makes the surface look convex and shiny.
3.  **The "Squish" Factor:** When interactive elements are hovered or pressed, they should physically scale down (95%) and increase their shadow spread, simulating a physical squish.

## Shapes

The shape language is strictly **Pill-Shaped (ROUND_FULL)**. There are zero sharp corners in the design system.

- **Primary Elements:** All buttons, input fields, and chips are fully rounded.
- **Containers:** Even large modal windows and cards must use the maximum available `rounded-xl` (1.5rem / 24px) or higher to maintain the soft, safe, and friendly aesthetic. 
- **Icons:** Use thick, 3pt rounded strokes.

## Components

- **Buttons:** "Jelly Buttons" are chunky, with a 4px bottom border in a darker shade of the button color to create a 3D "pushable" look.
- **Chips/Badges:** These should look like small hard candies. High-gloss finish with white text.
- **Input Fields:** Recessed surfaces. Instead of a standard border, use an "Inner Shadow" to make the field look like it’s carved out of a soft material.
- **Cards:** "Sugar Cookie" cards—off-white (#FFF) base with a thick 4px colored border and a soft colored shadow.
- **Progress Bars:** "Liquorice Whips"—thick, rounded tracks with a striped "candy cane" animation for the active progress state.
- **HUD Bubbles:** The player’s health and stats are housed in floating circular bubbles in the top-left corner, featuring a "glass" highlight to look like marbles.