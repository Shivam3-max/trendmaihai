# TrendMeHai — Interactions & Animation Choreography

> **Version:** 1.0 · Downstream of Design System §8.
> **Purpose:** Specify the *feel* — every micro-interaction, motion pattern, gesture, and the rules that keep it buttery and accessible. Framer Motion is default; GSAP (+ ScrollTrigger) only for pinned/complex scroll choreography.

---

## 1. Motion philosophy

1. **Physical, not floaty.** Springs and expo-out easing; things settle, they don't drift (except deliberate hero float).
2. **Fast enough to feel instant, slow enough to read.** 150–320ms for micro; 500ms for page/hero.
3. **Motion earns its place.** It communicates state, hierarchy, or delight — never decoration for its own sake.
4. **Accessible always.** `prefers-reduced-motion: reduce` swaps movement for opacity/instant. Nothing essential depends on motion.
5. **Cheap in hot paths.** The feed animates with `transform`/`opacity` only; heavy effects live outside scroll-critical areas.

---

## 2. Shared variant library (single source; components import these)

```
fadeUp        : hidden {opacity:0, y:16} → show {opacity:1, y:0}  (--dur-med, --ease-out)
fadeIn        : {opacity:0} → {opacity:1}
scaleIn       : {opacity:0, scale:0.96} → {opacity:1, scale:1} (spring)
staggerParent : staggerChildren 0.05, delayChildren 0.05
cardHover     : rest {y:0, scale:1} → hover {y:-4, scale:1.01} (spring); shadow sm→lg
imageZoom     : rest {scale:1} → hover {scale:1.04} (--dur-med)
heartBurst    : keyframe scale [1,1.3,1] + particle ring
flyToCart     : shared layout / motion path from card image → cart icon
lineReveal    : clip-path/masked reveal per line (editorial statements)
railSnap      : x-scroll snap + spring settle
reelSnap      : y-scroll snap + spring settle, progress bar
sheetIn       : translateY/ X in with spring, drag-to-dismiss
```
Reduced-motion variants collapse each to opacity-only or instant.

---

## 3. Micro-interactions (by surface)

### 3.1 Hover (desktop)
- **Cards:** `cardHover` lift + `imageZoom` + shadow raise + quiet control fade-in; cursor-pointer.
- **Buttons (primary/accent):** darken + lift; **magnetic** attraction within ~40px radius (translate toward cursor, spring back).
- **Nav links:** accent underline slide; active lens underline shared-layout slides between items.
- **Images/media:** subtle parallax on mouse-move (≤12px) in hero/lifestyle.

### 3.2 Press / tap
- All tappables: scale `0.98` in, spring back; haptic (mobile, where supported) on save/add.
- Ripple avoided (too material) — prefer scale + opacity.

### 3.3 Save / Wishlist
- Heart toggle: `heartBurst` + count ticks (mono) + optimistic update; double-tap on any card/reel triggers it with a centered burst (Instagram grammar). Undo via toast.

### 3.4 Add to cart
- `flyToCart`: the product image clones and arcs to the cart icon; cart badge spring-bumps; toast "Added" with "View cart"/"Undo". Sticky BuyBar reflects state. On reels/quick-view, stays in place (no navigation).

### 3.5 Quantity / variant
- Qty ± → total number re-animates (rolling mono digits). Variant select → media crossfade + price spring.

### 3.6 Search
- AISearchField focus → overlay descends (`--dur`, ease-out) + scrim; sparkle shimmer; example chips stagger in; typeahead results fade/stagger; ↑↓ moves an accent highlight; Enter routes.

### 3.7 Filters / mode switch
- DiscoveryModeSwitcher: active pill shared-layout slides; surface crossfades; chips toggle with `--accent-soft` fill.

### 3.8 Cart / sheets
- Open: `sheetIn` spring; scrim fades. Remove item: slide-out + height collapse (outside hot scroll). Drag-to-dismiss on mobile with rubber-banding.

### 3.9 Toasts / feedback
- Enter from bottom with spring; auto-dismiss; success = check-morph; error = subtle shake (reduced-motion: none) + color/icon (never color alone).

---

## 4. Scroll choreography

### 4.1 Reveals
- Sections/children use `fadeUp` + `staggerParent`, `whileInView`, `once:true`, viewport margin `-10%`. Below-fold only (hero animates on load).

### 4.2 Editorial statement reveals
- `lineReveal` masks each line upward on scroll; the accent word runs a slow gradient sweep loop.

### 4.3 Counters
- Mono metrics (saves, %, prices-from) count up when entering viewport (rAF, ~600ms, ease-out), once.

### 4.4 Parallax & pinning (GSAP ScrollTrigger where needed)
- Hero product stage parallax; lifestyle image parallax; Limited-Drops spotlight subtle pin + reveal; Before/After context. Kept off the masonry hot path.

### 4.5 Smooth scrolling
- Lenis on desktop (disabled under reduced-motion); native momentum on touch. Anchor links eased.

---

## 5. Gestures (mobile — "feels like Instagram")

| Gesture | Where | Result |
|---|---|---|
| Vertical swipe | Reels, discover "For You" | next/prev product (snap + spring) |
| Horizontal swipe | Rails, galleries, stories | scroll/snap |
| Double-tap | Any card / reel / product media | save (heart burst) |
| Long-press / hold | Card / reel | Quick-View preview / pause reel |
| Drag | Cart/wishlist sheet, before/after handle | dismiss / compare |
| Pull-to-refresh | Feeds | reshuffle "For You" |
| Pinch | Product gallery | zoom |

All gestures have non-gesture fallbacks (buttons/links) and visible affordances (peeks, handles, dots).

---

## 6. Page transitions

- **Product open/close:** shared-element — the tapped card image morphs into the product hero (and back). Fallback: cross-fade + scale.
- **Route change (default):** content cross-fades + subtle `y`/scale (`--dur-slow`); chrome persists (no full white flash).
- **Modal/quick-view:** intercepting route → scale/opacity in over preserved feed; back restores scroll position.
- **Reels entry:** expand from teaser into full-screen.

---

## 7. Loading & perceived performance

- **Skeletons** everywhere in the feed (exact sizes, neutral shimmer) — no spinners in content. CTA buttons use inline spinners.
- **Optimistic UI** for saves/cart/qty; reconcile silently.
- **Prefetch** product routes on card hover/viewport; prefetch next feed page before the sentinel.
- **Media:** blur-up placeholders; priority hero; lazy below fold; pause off-screen video.

---

## 8. Gamification motion

- **Streak +1:** flame bump + count roll on first daily visit.
- **Badge unlock:** modal with badge scale-in + shine sweep + points count-up (reduced-motion: static reveal).
- **Explorer level up:** ring fills, level number flips, confetti burst (tasteful, reduced-motion safe).
- **Spin wheel:** eased spin (GSAP), decelerate to a deterministic reward, reward card scale-in.
- **Treasure hunt:** hidden reward card in feed shimmers faintly; on find → burst + reward.

All gamification celebrations are skippable, non-blocking, and never guilt on absence.

---

## 9. Performance & accessibility guardrails (motion)

- `transform`/`opacity` only in scroll-critical paths; `will-change` used sparingly and removed after.
- Respect `prefers-reduced-motion`: disable parallax, autoplay, drift, confetti, magnetic, smooth-scroll; keep opacity/instant.
- Autoplay media muted + `playsInline` + pausable; captions/labels on reels.
- Focus is managed on overlay open/close; keyboard equivalents for every gesture; visible focus rings throughout.
- 60fps target; motion budget per section; test on mid-range mobile.

---

*End of Interactions & Animation. Next: `07-FRONTEND-ARCHITECTURE.md`.*
