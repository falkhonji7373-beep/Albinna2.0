# Design System: Al Binaa Construction & Industry SAOC

## 1. Visual Theme & Atmosphere

A warm, editorial-weight interface that projects heritage authority — the feeling of a premium architecture firm's printed portfolio translated to screen. The atmosphere is unhurried and confident: wide breathing room between sections, decisive typographic scale, and a restrained palette anchored in parchment and near-black with a single arterial red accent.

**Memorable thing:** *"I can trust these people with my project — they are a serious, premium construction company in Oman."* Every design decision should serve this. Trust comes from restraint (no tricks, no noise). Seriousness comes from weight and hierarchy. Premium comes from breathing room and typographic precision.

- **Variance:** 7 — Asymmetric splits, editorial left-aligned headings, strong spatial hierarchy. No centered-everything layouts. Content cards never appear in three equal horizontal columns.
- **Density:** 3–4 — Gallery-airy with intentional whitespace. Sections feel expensive and spaced. Mobile collapses gracefully without cramping.
- **Motion:** 6 — Fluid CSS transitions with expo ease-out curves. IntersectionObserver stagger reveals (blur + translateY, cascade 80–90ms between children). No JavaScript animation libraries required. Clip-path animated tab switches. Accordion via max-height/opacity (always-mounted content).

The page alternates between warm parchment surfaces and deep near-black sections — the contrast creates dramatic visual rhythm without ever feeling garish. The red accent appears sparingly: CTAs, active states, label underlines, and decorative dividers only.

---

## 2. Color Palette & Roles

### Light Mode (default)

| Name | Hex / Value | CSS Variable | Role |
|---|---|---|---|
| **Warm Parchment** | `#f8f6f3` | `--section-bg` | Primary background, main section fill |
| **Deep Parchment** | `#f0ede8` | `--alt-bg` | Alt section background, subtle surface variation |
| **Pure Surface** | `#ffffff` | `--card-bg` | Card fill, form input background |
| **Near-Black** | `#0d0d0d` | `--dark-bg` | Dark section backgrounds (stats, testimonials, footer, banners) |
| **Charcoal Ink** | `#1a1612` | `--fg` | Primary text — deep warm charcoal, not pure black |
| **Muted Ink** | `rgba(26,22,18,0.48)` | `--fg-muted` | Secondary text, descriptions, metadata, labels |
| **Subtle Ink** | `rgba(26,22,18,0.28)` | `--fg-subtle` | Placeholder text, decorative elements |
| **Whisper Border** | `rgba(26,22,18,0.09)` | `--border-color` | Structural dividers, card outlines, input borders |
| **Strong Border** | `rgba(26,22,18,0.18)` | `--border-strong` | Emphasized borders, filter pill outlines |
| **Signal Red** | `#f5141f` | `--red` | Single accent — CTAs, active states, section labels, key data callouts |
| **Deep Red** | `#c9101a` | `--red-dark` | Red hover/pressed state, darker variant |
| **Warm Gold** | `#c9a96e` | `--gold` | Secondary decorative accent — used sparingly on luxury callouts only |
| **Red Icon Circle** | `rgba(245,20,31,0.07)` bg + `rgba(245,20,31,0.14)` border | — | Icon container fill in info/contact layouts |

### Dark Mode (data-theme="dark" on `<html>`)

Dark mode for Al Binaa stays warm — surfaces use the `#1a1612` brown-black family, not zinc or slate grays. The brand warmth survives the mode switch. Signal Red is identical in both modes.

| Name | Hex / Value | CSS Variable | Notes |
|---|---|---|---|
| **Warm Near-Black** | `#1a1612` | `--section-bg` | Primary dark background |
| **Warm Dark Surface** | `#231f1b` | `--alt-bg` | Alt section, card backgrounds, subtle elevation |
| **Raised Surface** | `#2d2723` | `--card-bg` | Cards, form inputs, raised panels |
| **Deep Dark** | `#0d0b09` | `--dark-bg` | Deepest dark zones (footers, banners) |
| **Parchment Text** | `#f8f6f3` | `--fg` | Primary text on dark surfaces |
| **Muted Parchment** | `rgba(248,246,243,0.55)` | `--fg-muted` | Secondary text, descriptions |
| **Subtle Parchment** | `rgba(248,246,243,0.28)` | `--fg-subtle` | Placeholder text, decorative elements |
| **Whisper Border Dark** | `rgba(248,246,243,0.08)` | `--border-color` | Structural dividers |
| **Strong Border Dark** | `rgba(248,246,243,0.15)` | `--border-strong` | Emphasized borders |
| **Signal Red** | `#f5141f` | `--red` | Unchanged — vibrant in both modes |
| **Deep Red** | `#c9101a` | `--red-dark` | Unchanged |
| **Warm Gold** | `#c9a96e` | `--gold` | Unchanged — even more sparing in dark |
| **Input Background** | `#231f1b` | `--input-bg` | Form inputs, slightly raised |

```css
/* Dark mode token overrides */
[data-theme="dark"] {
  --section-bg: #1a1612;
  --alt-bg:     #231f1b;
  --card-bg:    #2d2723;
  --dark-bg:    #0d0b09;
  --fg:         #f8f6f3;
  --fg-muted:   rgba(248, 246, 243, 0.55);
  --fg-subtle:  rgba(248, 246, 243, 0.28);
  --border-color:  rgba(248, 246, 243, 0.08);
  --border-strong: rgba(248, 246, 243, 0.15);
  --input-bg:   #231f1b;
  /* --red, --red-dark, --gold: unchanged */
}
```

**Dark mode rules:**
- Surfaces use warm brown-black family — never zinc (`#18181b`) or slate (`#1e293b`)
- Saturation is reduced from light mode tones, not eliminated
- Section alternation (parchment vs. near-black in light) becomes: `#1a1612` vs. `#231f1b` — subtle but maintained
- Nav background in dark: `#0d0b09` with `border-bottom: 1px solid var(--border-color)`
- Film grain overlay opacity stays at `0.028` in dark mode (no change needed)

**Rules (both modes):**
- Pure black (`#000000`) is BANNED — always use `#0d0d0d` or `#1a1612`
- No purple, no neon, no gradient fills on primary surfaces
- Red saturation is intentionally high — it is the single permitted accent; no second accent color
- Gold (`#c9a96e`) appears only in testimonial quote marks or decorative dividers — never as a functional UI color

---

## 3. Typography Rules

### Font Stack

| Role | Font | Fallback |
|---|---|---|
| **Display / Headings** | `Cinzel` | `Georgia, serif` |
| **Body / UI / Labels** | `Josefin Sans` | `system-ui, sans-serif` |
| **Arabic (RTL)** | `Cairo` | `system-ui, sans-serif` — replaces BOTH display and body when `dir="rtl"` |

### Scale & Behaviour

- **Hero display:** `clamp(2.8rem, 6vw, 5rem)` — Cinzel, weight 700, letterSpacing `0.03em`, lineHeight `1.0`
- **Page banner H1:** `clamp(2.2rem, 4vw, 3.5rem)` — Cinzel, weight 700
- **Section H2:** `clamp(2rem, 4vw, 3rem)` — Cinzel, weight 700, maxWidth `20ch`
- **Card H3:** `1.35rem` — Cinzel, weight 700, lineHeight `1.1`
- **Section labels:** `10–11px`, Josefin Sans, weight 700, `letterSpacing: 0.14em`, `textTransform: uppercase`, color Signal Red. Always preceded by a 32px × 2px red horizontal bar
- **Body copy:** `14–16px`, Josefin Sans, weight 400, lineHeight `1.65–1.8`, color Muted Ink
- **Micro-labels:** `9.5–11px`, Josefin Sans, weight 600, `letterSpacing: 0.10–0.14em`, `textTransform: uppercase`
- **Stat numbers:** `clamp(2.8rem, 5vw, 4rem)` — Cinzel, weight 700

### RTL Overrides (Arabic)

When `dir="rtl"` (Arabic locale):
- `letterSpacing` resets to `0` on **all** elements — Arabic has no concept of tracking
- `textTransform` resets to `none` on **all** labels — Arabic doesn't uppercase
- `flexDirection` reverses to `row-reverse` on all row-based layouts
- Font family switches to Cairo for both display and body roles
- **Line height:** Cairo requires `1.85–2.0` (vs. 1.65–1.8 for Josefin Sans)
- **Numerals:** Use Western Arabic numerals (0–9) throughout — Al Binaa's audience is comfortable with Western digits in both EN and AR contexts
- **Quote marks:** Use `«` and `»` (Arabic guillemets) for any quoted content in AR locale

#### Component-Level RTL Rules

**Section labels:**
- The 32px × 2px red bar moves from the left side to the **right side** of the label span in RTL
- `flex-direction: row-reverse` on the label wrapper
- In LTR: `[red bar] [text]` | In RTL: `[text] [red bar]`

**Navigation:**
- Menu items read right to left — logo on the left, links on the right → **flip**: logo on right, links on left in RTL
- Hamburger icon (mobile): moves to the left in RTL
- Active underline/indicator stays under the current link

**Arrows and chevrons:**
- All directional arrows (→, ›, ›) **flip to ← and ‹** in RTL
- CSS: `transform: scaleX(-1)` on all SVG arrow icons when RTL
- Carousel/slider: next/prev swap direction

**Cards and content blocks:**
- `text-align: right` on all paragraphs and labels
- Card meta rows (`flex-direction: row-reverse`)
- Stat number + label stack: number still prominent, label reads right

**Form inputs:**
- `text-align: right`
- `direction: rtl` explicitly on `<input>` elements
- Error messages appear below the input and align right
- Label still sits above the input (not affected by direction)

**Quick Quote panel:**
- Slides in from **left** (not right) in RTL: `transform: translateX(-100%) → translateX(0)`

**Accordion:**
- Number prefix stays visible but aligns to the right side of its row
- Toggle `+` icon moves to the left end of the row header

**Page banner:**
- Gradient flips: `linear-gradient(to left, rgba(0,0,0,0.75) 0%, transparent 70%)`

**Footer columns:**
- Column order reverses (contact info first in RTL, about second)

### Banned
- `Inter` — banned in this project
- Generic serifs for body copy (`Times New Roman`, `Georgia`) — only Cinzel as display serif
- Font sizes below `9.5px` in any rendered UI label
- Arabic text with non-zero `letterSpacing`
- `textTransform: uppercase` applied to Arabic text

---

## 4. Component Stylings

### Buttons — Primary (Signal Red)
- Background: `var(--red)` → `#f5141f`
- Color: `#ffffff`
- Border: none
- Padding: `14px 32px`
- Font: Josefin Sans, 11px, weight 600, `letterSpacing: 0.14em`, `textTransform: uppercase`
- Border-radius: **0** — sharp corners throughout. No rounded buttons.
- Hover: `opacity: 0.85` transition `0.2s`
- Active: `scale(0.97)` (tactile press feedback)
- No outer glow, no box-shadow
- **Dark mode:** unchanged — red reads strongly on dark surfaces

### Buttons — Outline (Light surface)
- Background: transparent
- Border: `1px solid rgba(26,22,18,0.18)`
- Color: Charcoal Ink
- Hover: background → Charcoal Ink, color → `#fff`, border-color → Charcoal Ink
- Transition: `background 0.22s, color 0.22s, border-color 0.22s`
- **Dark mode:** Border: `1px solid rgba(248,246,243,0.18)`, Color: `var(--fg)`, Hover: background → `var(--fg)`, color → `var(--dark-bg)`

### Buttons — Outline Inverted (Dark surface)
- Background: transparent
- Border: `1px solid rgba(255,255,255,0.32)`
- Color: `#fff`
- Hover: `border-color: rgba(255,255,255,0.75)`, `background: rgba(255,255,255,0.07)`

### Navigation
- Background: `var(--card-bg)` (white in light, `#2d2723` in dark)
- Border-bottom: `1px solid var(--border-color)`
- Sticky, `backdrop-filter: blur(8px)` when scrolled
- Nav link: Josefin Sans, 11px, weight 600, uppercase, `letterSpacing: 0.14em`, `var(--fg-muted)`
- Nav link hover: `var(--fg)`, transition `0.18s ease`
- Nav link active: `var(--red)` with `border-bottom: 2px solid var(--red)` (2px, not underline)
- **Mobile (< 768px):** hamburger icon at top-right (top-left in RTL), full-screen overlay on open
- Mobile overlay: `background: var(--section-bg)`, full viewport, links stacked vertically at 24px, centered
- Mobile overlay backdrop: none (full opaque overlay, not dimmed)

### Cards (Project / Service)
- Background: `var(--card-bg)` → `#ffffff`
- Border-radius: **0** — no rounded corners on cards
- No box-shadow — cards are separated by `1.5px` grid gaps with `background: var(--border-color)` on the grid wrapper
- Image area: fixed height (270px projects, 300px services), `overflow: hidden`, image `transform: scale(1.06)` on hover
- Content padding: `1.5rem 2rem`
- Only use card elevation when it communicates hierarchy — flat grid layout preferred
- **Dark mode:** `var(--card-bg)` → `#2d2723`, grid separators use `var(--border-color)` which is already the dark value

### Category / Filter Pills
- Selected: `background: var(--red)`, `color: #fff`, `border: 1px solid var(--red)`
- Unselected: `background: none`, `color: var(--fg-muted)`, `border: 1px solid var(--border-strong)`
- Hover (unselected): `border-color: var(--fg-muted)`, `color: var(--fg)`
- Padding: `7px 18px`
- Font: Josefin Sans, 11px, weight 500, uppercase

### Accordion (Services)
- Always-mounted content — height animated via `max-height` + `opacity`
- Open: `max-height: 4000px`, `opacity: 1`, transition `0.65s cubic-bezier(0.16,1,0.3,1)` (spring-like)
- Close: `max-height: 0`, `opacity: 0`, transition `0.38s cubic-bezier(0.4,0,1,1)` (fast ease-in)
- Number prefix: Cinzel, `clamp(1.8rem,3vw,2.4rem)`, weight 700, Signal Red, `opacity: 0.35`
- Toggle icon: `+` rotates `45deg` on open, `transition: transform 0.3s`

### Animated Tab Bar (Projects)
- Two-layer clip-path technique: base layer (clickable buttons) + overlay layer (red, clips to active tab using `clipPath: inset(0 X% 0 Y%)`)
- Active pill transitions via `clip-path 0.32s cubic-bezier(0.16,1,0.3,1)`
- No external libraries required

### Form Inputs
- Label: above input, Josefin Sans 11px, uppercase, weight 600, `letterSpacing: 0.1em`, Muted Ink
- Error label: Signal Red
- Input: 15px Josefin Sans, `padding: 13px 14px`, `background: var(--input-bg)`, `border: 1px solid var(--border-color)`, border-radius `0`
- Focus: `border-color: var(--red)` (inline JS onFocus/onBlur)
- Error state: `border-color: #e53935` on input + error text below field
- Error summary: `role="alert"`, red-tinted background, border, 13px body copy
- **Minimum height:** 48px (touch target compliance on mobile)
- **Dark mode:** `--input-bg: #231f1b`, border uses dark `--border-color`

### Quick Quote Panel
- Slides in from right: `transform: translateX(100%) → translateX(0)`, `transition: 0.35s cubic-bezier(0.4,0,0.2,1)`
- **RTL:** Slides in from left: `transform: translateX(-100%) → translateX(0)`
- Backdrop: `backdrop-filter: blur(2px)`, `background: rgba(0,0,0,0.45)`, `animation: fadeIn 0.2s`
- Panel header: Signal Red background, white Cinzel heading
- Width: `min(440px, 100vw)`
- Success state: centered checkmark in red square, Cinzel confirmation heading

### Section Labels
- `<span>` with red horizontal bar (32px × 2px) + uppercase Josefin Sans label text
- Presented as a small "eyebrow" above the main section heading
- Red bar via `.section-label-line` CSS class
- **RTL:** red bar shifts to right side — `flex-direction: row-reverse` on label wrapper

### Contact Info Items
- Icon circle: 36×36px, border-radius 50%, `background: rgba(245,20,31,0.07)`, `border: 1px solid rgba(245,20,31,0.14)`
- SVG icon inside: 16×16, stroke Signal Red, strokeWidth 1.5
- Label: 10px, uppercase, weight 700, Signal Red, `letterSpacing: 0.14em`
- Value: 14px, Muted Ink, lineHeight 1.65
- Separator: `border-bottom: 1px solid var(--border-color)`

### Page Banner
- Background: `#0d0d0d`
- Full-width background image with `object-fit: cover`, `opacity: 0.35` overlay
- Gradient: `linear-gradient(to right, rgba(0,0,0,0.75) 0%, transparent 70%)`
- **RTL:** Gradient: `linear-gradient(to left, rgba(0,0,0,0.75) 0%, transparent 70%)`
- Title: Cinzel, `clamp(2.2rem,4vw,3.5rem)`, weight 700, `#ffffff`
- Subtitle: Josefin Sans, 15px, `rgba(255,255,255,0.65)`, `maxWidth: 50ch`
- Red bar above title label

### Loading / Skeleton States
- Skeletal shimmer: `background: linear-gradient(90deg, var(--alt-bg) 0%, var(--border-color) 50%, var(--alt-bg) 100%)`, `background-size: 200% 100%`, `animation: shimmer 1.8s infinite`
- Never use circular spinner for content loading
- Skeleton blocks match the exact height of the content they represent

### Theme Toggle (dark/light mode)
- Position: in the Nav, adjacent to the mobile hamburger
- Icon: sun (light mode) / moon (dark mode) — SVG, 18×18, stroke `var(--fg-muted)`
- Hover: stroke `var(--fg)`, transition `0.18s`
- Active: `scale(0.92)` tactile feedback
- Toggle sets `data-theme="dark"` on `<html>` and persists to `localStorage`
- On mount: read `localStorage` first, then `prefers-color-scheme` as fallback
- Always validate localStorage value against `["light", "dark"]` before applying

---

## 5. Layout Principles

### Grid & Containers
- **Max-width:** `1400px` centered with `margin: 0 auto`
- **Section padding:** `clamp(4rem, 8vw, 8rem)` vertical × `clamp(1.5rem, 5vw, 4rem)` horizontal
- **Grid separator technique:** Projects grid uses `display: grid`, `gap: 1.5px`, `background: var(--border-color)` — cards have white backgrounds creating a subtle ruled-line grid effect with no visible card shadows
- **Centered Hero is BANNED** — Hero uses asymmetric left-aligned layout: content column (left/start) + full-bleed image right
- **No 3-equal-column card rows** — featured projects use a 3-column grid only when cards are content-heavy; trust pillars use `repeat(auto-fit, minmax(250px, 1fr))`
- **No overlapping elements** — every element occupies its own spatial zone; no absolute-positioned decorative content stacking on text
- **Z-index layers:** `100` (floating CTA), `200` (backdrop), `201` (panel/modal), `9998` (film grain pseudo-element)
- **Border-radius:** 0 throughout — sharp geometry is the signature aesthetic

### Breakpoints

| Name | Min-width | Notes |
|---|---|---|
| `mobile-s` | 375px | iPhone SE baseline — minimum supported |
| `mobile-l` | 480px | Larger Android phones |
| `tablet` | 768px | iPad portrait — primary breakpoint, nav changes here |
| `desktop-s` | 1024px | iPad landscape / small laptops |
| `desktop-m` | 1280px | Standard desktop |
| `desktop-l` | 1440px | Wide desktop |
| `wide` | 1600px+ | Large monitors — max-width kicks in |

Primary CSS breakpoints use `min-width` (mobile-first). Always write mobile styles first, then `@media (min-width: 768px)` etc.

### Responsive Rules per Layout Zone

**Navigation:** Single hamburger at < 768px. Horizontal inline links at ≥ 768px. Logo always visible.

**Hero section:**
- `< 768px`: Single column. Image stacks below content (not above). Content width: 100%.
- `≥ 768px`: Two-column grid (content 55% / image 45% or similar split). Image fills height.
- `< 480px`: Hero headline reduces to `clamp(2rem, 7vw, 2.8rem)`.

**Stats grid (4 numbers):**
- `< 600px`: 2 columns × 2 rows (2×2 grid). Stats stay impactful.
- `≥ 600px`: 4 columns × 1 row.

**Projects / Services grid:**
- `< 600px`: 1 column
- `600px–1023px`: 2 columns
- `≥ 1024px`: 3–4 columns (as designed)

**About / content grids:**
- `< 768px`: All multi-column grids collapse to single column. No exceptions.
- Image blocks (like Manpower section): stacks below text on mobile.

**Footer:**
- `< 768px`: Single column, stacked. Links list drops to a 2-column grid.
- `≥ 768px`: 3–4 column grid.

**Quick Quote panel:**
- `< 480px`: Full screen (`width: 100vw`, height: 100dvh). No partial panel.
- `≥ 480px`: `min(440px, 100vw)`.

**Floating CTA:**
- Hides on mobile (`< 768px`) if it overlaps key content. Use `bottom: 1.5rem` to clear system navigation bars.

**Typography scaling on mobile:**
- Hero H1: `clamp(2rem, 7vw, 2.8rem)` below 768px
- Section H2: `clamp(1.6rem, 5vw, 2.2rem)` below 768px
- Body: 15px on mobile (not 14px) — iOS minimum font size to prevent auto-zoom is 16px; 15px is acceptable in controlled contexts

### Touch Target Rules (mobile)
- All interactive elements: **minimum 44×44px** tap target
- Form inputs: minimum height `48px`
- Navigation links: minimum height `44px` with generous vertical padding
- Filter pills: minimum height `40px` (slight exception — inline context)
- Close buttons: minimum `44×44px`, not just the icon size
- Floating CTA button: minimum `52×52px`

---

## 6. Motion & Interaction

### Easing Tokens
- **Primary reveal:** `cubic-bezier(0.16, 1, 0.3, 1)` — expo ease-out, premium spring-like weight
- **Accordion close:** `cubic-bezier(0.4, 0, 1, 1)` — fast ease-in exit
- **Panel slide:** `cubic-bezier(0.4, 0, 0.2, 1)` — material standard
- **Default micro:** `0.2s ease`

### Scroll Reveal Pattern
All grid children and info columns stagger-reveal on IntersectionObserver intersection:
- Initial state: `opacity: 0`, `transform: translateY(22–28px)`, `filter: blur(3–4px)`, `transition: none`
- Triggered: `opacity: 1`, `transform: translateY(0)`, `filter: blur(0)`, `transition: 0.72–0.78s cubic-bezier(0.16,1,0.3,1)`
- Cascade delay: `80–90ms` between each child
- Observer disconnects after first fire
- Always respects `prefers-reduced-motion: reduce` — skips all motion if set

### Hero Entrance
- Elements animate in via `opacity 0→1` + `translateY(20px→0)` + `filter blur(7px→0)`
- Each element has a staggered delay (0ms, 200ms, 400ms, 700ms, 900ms)
- Triggered 100ms after component mount via `setTimeout`

### Clip-path Tab Animation
- Active tab indicator clips to the active button via `clipPath: inset(0 {right}% 0 {left}%)`
- Measured from real DOM rects each tab switch
- Transition: `clip-path 0.32s cubic-bezier(0.16,1,0.3,1)`

### Performance Rules
- Animate ONLY `opacity`, `transform`, `filter` — never `width`, `height`, `top`, `left`
- Film grain overlay: fixed pseudo-element (`body::after`), `pointer-events: none`, `z-index: 9998`, `opacity: 0.028`
- `will-change: opacity, transform` on reveal elements — auto after animation completes
- `prefers-reduced-motion: reduce` kills ALL durations to `0.01ms`, shows reveal elements at `opacity: 1` immediately

---

## 7. Visual Polish — Missing States

These states were not specced in the original system. Required for production completeness.

### Nav Hover + Active State
- Link hover: `color: var(--fg)` (from `var(--fg-muted)`), transition `0.18s ease`
- Current page link: `color: var(--red)`, `border-bottom: 2px solid var(--red)`, padding-bottom `2px`
- No underline text-decoration — use border-bottom only

### Sticky Header Shadow on Scroll
- Default: no shadow, `border-bottom: 1px solid var(--border-color)`
- After scrolling 40px: add `box-shadow: 0 2px 12px rgba(0,0,0,0.06)` (light mode) or `0 2px 12px rgba(0,0,0,0.22)` (dark mode)
- Transition: `box-shadow 0.2s ease`

### Empty States
- No projects match filter: centered layout, Cinzel "No projects found" heading at 1.4rem, Josefin Sans body at 14px, red "Clear filters" text link below
- Form not yet filled: input areas show placeholder in `var(--fg-subtle)` at 14px

### 404 / Error Page
- Full-page banner section, dark background (`#0d0d0d`)
- Large Cinzel "404" in Signal Red at `clamp(5rem, 12vw, 9rem)`, opacity `0.18`
- Smaller "Page not found" heading below in white Cinzel
- Josefin Sans body copy in `rgba(255,255,255,0.55)`
- Red "Return Home" primary button
- No image background — let the typography do the work

### Focus States (keyboard accessibility)
- All interactive elements: `outline: 2px solid var(--red)`, `outline-offset: 3px` on `:focus-visible`
- Never suppress `outline` without replacing it
- Dark mode: outline stays `var(--red)` — sufficient contrast on dark surfaces

### Image Load States
- All `<img>` elements: show skeleton shimmer while loading
- Skeleton: same dimensions as the image, `background: var(--alt-bg)`, shimmer animation
- On load: `opacity: 0 → 1`, `transition: 0.3s ease`
- Use `loading="lazy"` on all below-the-fold images

---

## 8. Anti-Patterns (Banned)

### Visual
- ❌ Pure black `#000000` — use `#0d0d0d` or `#1a1612`
- ❌ Neon/outer glow box-shadows on buttons or cards
- ❌ Oversaturated second accent color — Signal Red is the only accent
- ❌ Purple, electric blue, or "AI aesthetic" gradient fills
- ❌ Excessive gradient text on large display headings
- ❌ Rounded corners on any card, button, or container — 0 border-radius throughout
- ❌ Custom mouse cursors
- ❌ Dark mode using zinc/slate grays — always use warm brown-black family

### Typography
- ❌ `Inter` font
- ❌ Generic serif fallbacks (`Times New Roman`, `Georgia`) as design-intentional faces
- ❌ Font sizes below 9.5px in any rendered label
- ❌ Latin letter-spacing applied to Arabic text
- ❌ `textTransform: uppercase` applied to Arabic text
- ❌ Cairo font used in English (LTR) context

### Layout
- ❌ Centered Hero sections — always asymmetric or left-aligned
- ❌ Three equal-width card columns as a feature grid — use asymmetric grids or auto-fit
- ❌ `h-screen` for full-height sections — always `min-h-[100dvh]` or `min-height: 100dvh`
- ❌ Flexbox percentage math (`calc(33% - 1rem)`) — use CSS Grid
- ❌ Overlapping text on text, or absolute-positioned decorative elements stacking on content
- ❌ Horizontal scroll on any viewport width
- ❌ Touch targets smaller than 44×44px on mobile

### RTL-Specific
- ❌ Directional arrows (→ ›) that don't flip in RTL contexts
- ❌ Quick Quote panel sliding from right in RTL
- ❌ Page banner gradient pointing the wrong direction in RTL
- ❌ Section label red bar on left in RTL
- ❌ Arabic text with non-zero `letterSpacing`

### Content
- ❌ Emojis anywhere in the UI
- ❌ Filler scroll affordances: "Scroll to explore", scroll arrows, bouncing chevrons
- ❌ Generic placeholder names ("John Doe", "Acme Corp", "Sarah Smith")
- ❌ Fake round-number statistics (`99.99%`, `50%`, `100K`) — use organic figures
- ❌ AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen", "Cutting-edge"
- ❌ Broken or placeholder image URLs — never Unsplash links without confirming availability

### Code / Config
- ❌ `YOUR_FORM_ID` placeholder left in `src/lib/config.ts` — must be replaced before going live
- ❌ Unvalidated `localStorage` values used directly in `router.replace()` — always check against allowed locale list
- ❌ Emoji in `alt` text or `aria-label` attributes
- ❌ `localStorage` access without SSR guard (`typeof window !== 'undefined'`)

---

## 9. Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2024 | Initial design system created | Parchment + near-black + Signal Red editorial aesthetic |
| 2026-05-26 | Dark mode token system added | Warm brown-black family (#1a1612, #231f1b, #2d2723) — not zinc/slate. Brand warmth survives mode switch. |
| 2026-05-26 | Full Arabic/RTL component rules added | Section labels, Quick Quote panel, arrows, gradients, nav — all component-level RTL behaviours specified |
| 2026-05-26 | Responsive/mobile breakpoints added | 375/480/768/1024/1280/1440 breakpoints, 44px touch targets, per-zone collapse rules |
| 2026-05-26 | Visual polish states added | Nav hover/active, sticky header shadow, 404 page, focus states, image load skeletons |
