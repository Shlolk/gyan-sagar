## Goal
Transform Space Quest into an interactive mini-game adventure for kids 5-7 with premium UI/UX and all 6 planets unlocked.

## Constraints & Preferences
- Jungle Adventure remains the original quiz; only Space Quest gets new games
- Touch-friendly, kid-safe, large tap targets
- Must work with existing file structure and local images
- All planets must be accessible from the map
- Rocket Lab opens `rocket.html` as a separate page (no longer inline overlay)
- Kids must figure out letter order themselves — no glowing hints
- Planet visual should be visible during all question modes in Color Planet (reverted earlier hide-on-color change)

## Progress
### Done
- Enhanced `rocket.html` with word preview strip, score system (100pt/letter + 200pt bonus), particle burst on tap, SVG gradient glow lines with animated draw-in, question transitions with staggered tile entrances, fixed shake animation for `translate(-50%,-50%)` base
- Added opening splash screen to `index.html`: bouncing logo, rainbow gradient title, spinning stars, tap-to-dismiss or auto-dismiss at 3s
- Removed dark gradient overlay from splash
- Made all paragraph text in `index.html` super visible: `#0d0221` dark purple color, white text-shadow for lift, bold weight; added extra gold glow on section subtitle
- Set `kidspace.png` as body background in `code.html` (Space Quest hub)
- Set `rolling space.png` as background in Rocket Lab (via `.nebula-bg`), Letter Galaxy (`#gameLetter`), Color Planet (`#gameColor`), Shape Station (`#gameShape`)
- Made Shape Station Martian sky overlay transparent so space background shows through
- Removed Try Again button from Letter Galaxy game over screen
- Fixed Shape Station card overflow: `grid-template-rows: repeat(4, 1fr)`, cards fill cells at 100% width/height, removed `aspect-ratio:1` constraint
- Fixed `rocket.html`: removed next-letter glow (`nextTileGlow` function), hint letter indicator (green border on `hintIdx`), `nextPulse` keyframes, and voice clue reference to hinted letter — without accidentally deleting critical CSS
- Unlocked all 6 planets (color, letter, shape, rocket, alien, moon)
- Replaced vertical planet-node chain with horizontal scrollable game cards (3-column grid wrapping)
- Added premium UI/UX effects: 3D card tilt, sparkle burst, staggered entrances, animated glow, guide auto-rotation, star counter burst
- Rebuilt Shape Station as Mars Expedition memory match using real local planet images
- Rocket Lab rebuilt as standalone 10-question tap-to-connect game with 30s timer, 3 lives, pentagon letter layout, SVG connection lines
- Added dark overlay (`linear-gradient(rgba(0,0,0,0.5),...)`) to all 4 game backgrounds for text readability
- Boosted low-opacity text (0.5-0.6) to 0.85-0.9 across all mini-games for young-kid readability
- Replaced logo icon in `code.html` header from rocket emoji to `ChatGPT Image May 26, 2026, 02_08_24 PM.png`
- Replaced splash and header logo in `index.html` from 🎮 to `Gemini_Generated_Image_io0yjdio0yjdio0y-removebg-preview.png`
- Restored point section (score badge) and avatar to `index.html` navbar after removal was reverted
- Added `clip-path: inset(0)` and `overflow: hidden` to `.quiz-modal.full-screen-quiz` to clip all rendering (box-shadows, glow) at viewport edge
- Removed `backdrop-filter` from `.quiz-modal.full-screen-quiz .quiz-container` to eliminate hard-edge artifacts
- Changed full-screen quiz container background to solid dark `rgba(11,12,30,0.85)`, removed `max-height: none`, added `max-height: calc(100vh - 40px)` + `overflow-y: auto`
- Removed `translateY(-1px)` from `quizGlassGlow` animation; reduced glow blur spread from 88px→48px
- Set `html`/`body` background to `#0a0a1a` in `jungle.html` with overflow hidden
- Added `will-change: transform` to `.game-canvas` and `.island-map` in `quiz-adventure.html` to promote GPU layers
- Added `transform: translateZ(0)` + `backface-visibility: hidden` to `.level-btn` in `quiz-adventure.html`
- Fixed `.level-btn:hover`, `:active`, and `@keyframes current-stone` to include `translateZ(0)` so GPU layer is preserved during hover/animation (was being overwritten by `scale()` alone)
- **Restored top bar and bottom nav to `quiz-adventure.html`** — re-added CSS (`.top-bar`, `.bottom-nav`, responsive/media query styles) and HTML (header with avatar/XP/stats, nav with Home/Map/Ranks/Trophy/Me) that were removed in commit `50d701e`

### In Progress
- *(none)*

### Blocked
- *(none)*

## Key Decisions
- Removed hint letter glow from Rocket Lab — kids must remember the word order themselves, adding challenge
- Used `rolling space.png` as unified space background across all 4 mini-games for visual consistency
- `clip-path: inset(0)` used instead of just `overflow: hidden` because `overflow` doesn't clip box-shadows or backdrop-filter renderings
- `translateZ(0)` must be included in every `transform` value (base, hover, active, animation) to keep the button on a GPU layer — browser overwrites the entire `transform` property on each state change
- `will-change: transform` on parent containers without an actual transform avoids creating a new containing block for `position: fixed` descendants
- Top bar and bottom nav restored from git history (`50d701e` diff) — original CSS/HTML adapted for current layout with updated Material Symbols icons and responsive adjustments

## Next Steps
- *(none)*

## Critical Context
- Main entry: index.html → Jungle → quiz-adventure.html?world=jungle (quiz), Space → code.html (adventure hub), Pirate → pirate.html (quiz)
- code.html has 6 planet cards — all unlocked, all have working games: Color (Planet Match), Letter (letter quiz), Shape (memory match), Rocket (navigates to rocket.html), Alien (feed), Moon (jump)
- `rolling space.png` used as background in: `.nebula-bg` (rocket.html), `#gameLetter`, `#gameColor`, `#gameShape` (code.html) — now with dark overlay for readability
- `kidspace.png` used as body background in code.html
- Guide avatar: `image_2026-05-23_150811711-removebg-preview.png`
- Planet images: eath.png.png, mars.png.jpeg, jupter.pmg.jpeg, saturn.png.png, netrpturn.png.png, venus.png.jpeg, mercury.png.png, sun.png, moon.png, urasun.png
- `Gemini_Generated_Image_io0yjdio0yjdio0y-removebg-preview.png` used as logo in index.html splash and header
- Top bar + bottom nav in quiz-adventure.html was removed in commit `50d701e` and has now been **restored** — includes CSS for `.top-bar`, `.bottom-nav`, responsive (640px) breakpoint, and `prefers-reduced-motion` accessibility
- Backdrop-filter removed from full-screen quiz container in styles.css to prevent hard-edge artifact at viewport top
- `clip-path: inset(0)` added to `.quiz-modal.full-screen-quiz` to clip box-shadow glow at viewport edge
- GPU layer preservation requires `translateZ(0)` in EVERY `transform` value (base, hover, active, animation) — browser does not merge transforms, it overwrites

## Relevant Files
- C:\Users\HP\Downloads\gayan sagar\rocket.html: Standalone tap-to-connect game with 10 questions, 30s timer, 3 lives, score, no letter glow hints
- C:\Users\HP\Downloads\gayan sagar\code.html: Galaxy Adventure Hub with 6 planet cards + 4 mini-games sharing `rolling space.png` background with dark overlay
- C:\Users\HP\Downloads\gayan sagar\index.html: Landing page with splash screen, Gemini logo, point section + avatar restored
- C:\Users\HP\Downloads\gayan sagar\quiz-adventure.html: World map page — top bar (avatar, XP, stars/streak) and bottom nav (Home/Map/Ranks/Trophy/Me) **restored**; GPU layer fixes applied to `.game-canvas`, `.island-map`, `.level-btn`
- C:\Users\HP\Downloads\gayan sagar\jungle.html: Jungle quiz page — dark html/body background added, full-screen quiz container overflow fixes applied
- C:\Users\HP\Downloads\gayan sagar\styles.css: Shared styles — full-screen quiz container overflow/backdrop-filter fixes, GPU layer promotions
- C:\Users\HP\Downloads\gayan sagar\rolling space.png: Unified space background
- C:\Users\HP\Downloads\gayan sagar\kidspace.png: Body background for code.html
- C:\Users\HP\Downloads\gayan sagar\ChatGPT Image May 26, 2026, 02_08_24 PM.png: Logo in code.html header
- C:\Users\HP\Downloads\gayan sagar\Gemini_Generated_Image_io0yjdio0yjdio0y-removebg-preview.png: Logo in index.html splash and header
