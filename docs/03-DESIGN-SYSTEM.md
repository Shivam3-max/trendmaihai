# TrendMeHai — Design System

> **Version:** 1.0 · Downstream of `01-PRD.md` (§7 is binding) and `02-IA.md`
> **Purpose:** The single source of truth for tokens, type, color, space, elevation, radius, motion, and component styling primitives. Everything visual derives from here.

---

## 1. Design Principles (operational)

1. **Bright by default.** White/off-white canvas; product imagery is the only permitted "color explosion." Dark is a rare spotlight, never the base.
2. **Product is the hero; UI recedes.** Chrome is quiet — thin borders, near-invisible shadows, restrained accents.
3. **Whitespace is a feature.** Generous, rhythmic spacing. When in doubt, add space.
4. **One accent, used sparingly.** Blue `#2563EB` primary, violet `#7C3AED` secondary — for emphasis and interaction, not decoration.
5. **Editorial hierarchy.** Big confident headings, calm body, monospace numerics for a "tech-premium" signal.
6. **Motion with manners.** Fast, physical, purposeful; honors `prefers-reduced-motion`.

---

## 2. Color Tokens

### 2.1 Core (semantic → value)
```
--bg              #FFFFFF   /* primary canvas */
--bg-secondary    #FAFAFA   /* section alternation, subtle zones */
--surface         #FFFFFF   /* cards */
--surface-hover   #F8F8F8   /* hover surface */

--text            #111111   /* primary text */
--text-secondary  #5F6368   /* secondary */
--text-muted      #8A8A8A   /* muted/meta */
--text-inverse    #FFFFFF   /* on dark spotlight sections */

--accent          #2563EB   /* primary accent */
--accent-secondary#7C3AED   /* secondary accent */
--accent-soft     #EFF4FF   /* accent tint bg (10-12% blue) */

--success         #16A34A
--warning         #F59E0B
--error           #DC2626

--border          #ECECEC
--divider         #F3F4F6
```

### 2.2 Dark "Spotlight" tokens (drops / rare cinematic bands only)
```
--spot-bg         #0A0A0B
--spot-surface    #141416
--spot-text       #FFFFFF
--spot-text-muted #A1A1AA
--spot-border     rgba(255,255,255,0.08)
```
Used only on `/drops/[slug]`, the home Limited-Drops band, and select hero moments. Never as a page's default.

### 2.3 Signal colors (honest social proof)
```
--trending        #7C3AED   /* violet — "viral/trending" */
--live            #16A34A   /* green pulse — "live purchases", in stock */
--low-stock       #F59E0B   /* amber — stock meter warning */
--sold-out        #8A8A8A
```

### 2.4 Contrast contract (accessibility)
- Body text on white: `#111111` (≈ 19:1) — pass.
- Secondary `#5F6368` on white ≈ 6.3:1 — pass for normal text.
- Muted `#8A8A8A` on white ≈ 3.5:1 — **meta text ≥ 14px / large only**; never body.
- Accent `#2563EB` on white ≈ 4.7:1 — OK for large text/icons; for button labels use white on accent.
- Color is **never** the sole signal (pair with icon/label).

### 2.5 Gradients (restraint)
Only two sanctioned uses:
- **Accent sweep** `linear-gradient(120deg,#2563EB,#7C3AED)` — for the AI/"Genie" identity, active-state underlays, and the hero's animated word. Never as a section background.
- **Skeleton shimmer** — neutral `#F3F4F6 → #FAFAFA → #F3F4F6`.

---

## 3. Typography

### 3.1 Families & roles
| Role | Family | Fallback |
|---|---|---|
| Display / Headings | **Space Grotesk** | `ui-sans-serif, system-ui` |
| Subheadings / labels | **Satoshi** | `Inter, system-ui` |
| Body | **Inter** | `system-ui, sans-serif` |
| Numbers / metrics / prices | **JetBrains Mono** | `ui-monospace, monospace` |

> Satoshi is not a Google Font — self-host via Fontshare (WOFF2). Space Grotesk, Inter, JetBrains Mono via `next/font/google` with `display: swap` and subsetting.

### 3.2 Type scale (fluid, `clamp()`; desktop → mobile)
| Token | Use | Size (clamp) | Weight | Tracking | Leading |
|---|---|---|---|---|---|
| `display-1` | Hero headline | `clamp(2.75rem, 6vw, 5.5rem)` | 600 | -0.03em | 0.98 |
| `display-2` | Section editorial statements | `clamp(2rem, 4vw, 3.5rem)` | 600 | -0.02em | 1.02 |
| `h1` | Page titles | `clamp(1.75rem, 3vw, 2.5rem)` | 600 | -0.02em | 1.1 |
| `h2` | Section headings | `clamp(1.375rem, 2.2vw, 1.875rem)` | 600 | -0.015em | 1.15 |
| `h3` | Card/block titles | `1.125–1.25rem` | 600 | -0.01em | 1.25 |
| `subhead` | Satoshi labels/eyebrows | `0.8125rem` | 600 | **0.08em, UPPERCASE** | 1.2 |
| `body-lg` | Lead paragraphs | `1.125rem` | 400 | 0 | 1.6 |
| `body` | Default | `1rem` (16px min mobile) | 400 | 0 | 1.6 |
| `body-sm` | Secondary | `0.875rem` | 400 | 0 | 1.55 |
| `meta` | Captions/meta | `0.75–0.8125rem` | 500 | 0.01em | 1.4 |
| `price` | Prices | `1–1.25rem` **JetBrains Mono** | 500 | 0 | 1.2 |
| `metric` | Big numbers (saves, %) | `1.5–2.5rem` **JetBrains Mono** | 500 | -0.01em | 1 |
| `button` | Buttons | `0.9375–1rem` | 600 (semibold) | 0 | 1 |

### 3.3 Rules
- Body line length capped **65–75ch**.
- Editorial statement sections may break to 2–3 lines with an animated accent word (see Motion §8).
- Prices, counts, timers, stock, ratings → **always JetBrains Mono** (the "numbers" signature).
- Eyebrows/labels → Satoshi uppercase, tracked, muted.

---

## 4. Spacing & Layout

### 4.1 Space scale (4px base)
`0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160` (px). Tailwind-aligned; sections breathe in the 64–128 range.

### 4.2 Section rhythm
- Vertical section padding: `py-20` mobile → `py-28`/`py-32` desktop.
- Alternate `--bg` / `--bg-secondary` for rhythm (never colored blocks).
- Asymmetry is encouraged: offset grids, 60/40 and 70/30 splits, intentional negative space.

### 4.3 Grid & containers
- Max content width: `--container` = `1280px` (`max-w-7xl`); wide editorial breakouts to `1440px`.
- Gutters: 20px mobile, 32px tablet, 48px+ desktop.
- Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.
- **Masonry feed:** 2 cols mobile → 3 tablet → 4–5 desktop (CSS columns / virtualized grid).

### 4.4 Radius
```
--r-sm  10px   /* chips, inputs */
--r     14px   /* buttons, small cards (in the 12–20 band) */
--r-md  16px   /* cards */
--r-lg  20px   /* large media cards, modals */
--r-xl  28px   /* hero media, feature panels */
--r-full 9999  /* pills, avatars */
```
Corners live in the **12–20px** comfort band for most UI; hero/media may go larger.

### 4.5 Elevation (soft, premium — never harsh)
```
--shadow-xs   0 1px 2px rgba(17,17,17,0.04)
--shadow-sm   0 2px 8px rgba(17,17,17,0.05)
--shadow-md   0 8px 24px rgba(17,17,17,0.06)
--shadow-lg   0 16px 48px rgba(17,17,17,0.08)   /* modals, cart, hovered cards */
--shadow-accent 0 12px 32px rgba(37,99,235,0.14) /* CTA emphasis only */
```
Elevation change is the primary "lift" feedback on hover, paired with a 1–2% surface tint and ~1.01 scale (transform-based).

---

## 5. Borders, Dividers, Glass

- Hairline borders `1px --border`; dividers `--divider`. On white, borders are barely-there.
- **Premium dividers** between sections: options are (a) whitespace only, (b) a thin `--divider` line inset from edges, (c) a marquee ticker band, (d) a big-type editorial statement. Specified per section in Page Specs.
- **Glass** only where genuinely appropriate: sticky nav on scroll (`backdrop-blur-md`, `bg-white/70`, `--border`), quick-view/cart scrim. Never as decorative panels. Maintain light-mode contrast (`bg-white/80+`).

---

## 6. Iconography

- **Lucide**, stroke width **1.75**, sizes `16 / 20 / 24`. Rounded joins/caps.
- Icon-only buttons carry `aria-label`, min **44×44** hit target.
- No emoji as UI icons (moods may use a curated icon or subtle illustration, not emoji).

---

## 7. Imagery & Media

- Products shot/composed on white or soft neutral; imagery does the "color" work.
- Aspect ratios: product card `4:5`, reel `9:16`, lifestyle `3:2` / `16:9`, hero `varies`.
- All media: Next/Image + Cloudinary, `blur` placeholders, lazy below fold, priority for hero/LCP.
- Video (hero, reels, product): muted autoplay, `playsInline`, poster frame, pause off-screen, reduced-motion → poster only.

---

## 8. Motion System (overview; choreography in `06-INTERACTIONS-AND-ANIMATION.md`)

### 8.1 Tokens
```
--dur-fast   150ms   /* taps, toggles */
--dur        220ms   /* default micro */
--dur-med    320ms   /* cards, reveals */
--dur-slow   500ms   /* page/hero transitions */
--ease-out   cubic-bezier(0.22, 1, 0.36, 1)   /* default, "expo-out" */
--ease-inout cubic-bezier(0.65, 0, 0.35, 1)
--spring     { type: spring, stiffness: 380, damping: 32, mass: 0.9 }  /* Framer */
```

### 8.2 Signature motions
- **Card hover:** lift (`y:-4`, scale 1.01), shadow `sm→lg`, image micro-zoom (1.0→1.04), 220–320ms.
- **Save (double-tap / heart):** heart burst + haptic (mobile), count ticks in mono, spring.
- **Add to cart:** product image "flies" to cart icon (shared-layout), cart badge spring-bumps.
- **Scroll reveal:** fade + `y:16→0`, staggered 40–60ms, `once: true`, viewport margin -10%.
- **Text reveal:** editorial statements mask-reveal per line/word; accent word gradient-sweeps.
- **Magnetic buttons/cursor (desktop):** CTA and hero elements attract the cursor within a radius.
- **Page transitions:** shared-element for product open/close; cross-fade + subtle scale otherwise (`--dur-slow`).
- **Reels:** vertical snap, spring settle, progress bar per item.
- **Smooth scrolling:** Lenis (desktop), native momentum on touch.

### 8.3 Discipline
- Prefer `transform`/`opacity` only. No layout-animating width/height in hot paths.
- Everything gated by `prefers-reduced-motion: reduce` → replace movement with instant/opacity-only.
- Target 60fps; keep the feed's per-item motion cheap (virtualize + will-change sparingly).

---

## 9. Component Style Primitives (tokens → components)

These are the *style contracts*; full props/variants live in `05-COMPONENT-LIBRARY.md`.

### 9.1 Buttons
| Variant | Fill | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--text` (#111) *or* `--accent` for commerce CTAs | white | none | Add to cart, Checkout |
| Accent | `--accent` | white | none | AI actions, key CTAs |
| Secondary | white | `--text` | `--border` | secondary actions |
| Ghost | transparent | `--text` | none | tertiary, in-card |
| Icon | white/transparent | `--text` | optional | wishlist, share |
- Height: `44/48/56`. Radius `--r`. Semibold. Hover: darken 6–8% / lift. Press: scale 0.98. Loading: inline spinner, label held, disabled.
- **Magnetic** on desktop for primary/accent.

### 9.2 Product Card (the atom of discovery)
White surface, `--r-md`, hairline border, `--shadow-sm`. Image `4:5` top with micro-zoom on hover. Overlaid quiet controls: wishlist heart (top-right), quick-view (hover/long-press), signal chips (trending/low-stock) bottom-left. Title (h3), price (mono), optional compare-at (muted strike). Whole card is a link; controls stopPropagation. Double-tap anywhere saves.

### 9.3 Chips / Tags / Signals
Pill `--r-full`, `--bg-secondary` or `--accent-soft` for active, Satoshi/label size, mono for numeric signals. Trending = violet dot; Live = green pulse; Low stock = amber meter.

### 9.4 Inputs / Search
- Standard input: white, `--border`, `--r-sm`, 16px text (no mobile zoom), focus ring `--accent` at 2px + soft glow.
- **AI Search field:** larger, pill, leading sparkle icon (accent gradient), placeholder *"What are you looking for today?"*, opens the command overlay.

### 9.5 Overlays
- Modal/quick-view: white `--surface`, `--r-lg`, `--shadow-lg`, scrim `rgba(17,17,17,.4)` + slight blur. Close on Esc/scrim, focus-trapped.
- Cart slide-over (desktop right) / bottom sheet (mobile) with drag-to-dismiss.

### 9.6 Trust & meters
- Stock meter: thin track + fill (green→amber as it depletes), mono count.
- Trending score / popularity: mono number + tiny sparkline.
- Trust row (COD · Returns · Secure · Fast): monochrome Lucide icons + small labels, muted.

---

## 10. Theming & Tokens Delivery

- Tokens exposed as **CSS custom properties** on `:root`, mapped into **Tailwind theme** (colors, radius, shadow, fontFamily, fontSize, spacing) so utilities read from tokens.
- One `tokens.css` (or `globals.css`) + `tailwind.config.ts` extension is the contract; components never hardcode hex/px outside the scale.
- Optional future dark *mode* is out of scope (site is bright by design); dark is section-scoped via `--spot-*`, applied with a `data-surface="spot"` wrapper.

---

## 11. Accessibility Baseline (design-level)

- AA contrast enforced by the token contract (§2.4).
- Visible focus rings (`--accent`, 2px, offset) on all interactive elements.
- Hit targets ≥ 44×44; spacing prevents mis-taps in the thumb zone.
- Motion respects reduced-motion; autoplay video is muted + pausable.
- Semantic landmarks, labelled controls, and ARIA for carousels/reels/modals (detailed in component + a11y sections).

---

*End of Design System. Next: `04-PAGE-SPECS.md` (every page, section by section, with responsive + motion + interactions).*
