# TrendMeHai — Component Library

> **Version:** 1.0 · Downstream of Design System + Page Specs.
> **Purpose:** The reusable building blocks. Each entry: **role · key props · variants · states · a11y**. Built on shadcn/ui primitives + Tailwind tokens + Framer Motion. Naming maps 1:1 to the `components/` folder in `07-FRONTEND-ARCHITECTURE.md`.

---

## 1. Component taxonomy (atomic → organism)

- **Primitives (ui/):** Button, IconButton, Chip, Badge, Input, Textarea, Select, Switch, Slider, Tabs, Accordion, Tooltip, Dialog/Modal, Sheet, Popover, Toast, Skeleton, Avatar, Rating, Progress, Separator, Marquee, ScrollArea.
- **Commerce atoms:** Price, CompareAtPrice, StockMeter, TrendingScore, SignalChip, QtyStepper, VariantSwatch, TrustBadge, CountdownTimer, SaveButton (heart).
- **Cards:** ProductCard, ReelCard, MoodTile, CollectionCard, CreatorCard, BundleCard, SetupCard, CommunitySetupCard, ReviewCard, TestimonialCard.
- **Molecules:** ProductRail, MasonryFeed, DiscoveryModeSwitcher, HotspotPopover, BeforeAfterSlider, ComparisonTable, OrderTimeline, ProgressIndicator, SpinWheel, ExplorerLevelRing.
- **Overlays:** AISearchOverlay, QuickView, CartSheet, WishlistSheet, AuthSheet.
- **Chrome:** Header, BottomTabBar, AISearchPill, CartButton, WishlistButton, ProfileMenu, Footer, SectionHeader, EditorialStatement, Divider.
- **Sections (home):** one component per home section (S1–S25) composing the above.
- **Providers/utility:** MotionProvider, ReducedMotionGate, LenisProvider, TasteProvider, RepositoryProvider, Toaster, Analytics.

---

## 2. Primitives (selected specs)

### Button
- **Props:** `variant: primary|accent|secondary|ghost|icon`, `size: sm|md|lg`, `magnetic?`, `loading?`, `iconLeft?`, `iconRight?`, `asChild?`.
- **States:** default / hover (darken 6–8% + lift) / active (scale .98) / focus (accent ring) / loading (spinner, label held, disabled) / disabled (muted).
- **A11y:** real `<button>`/`<a>`, `aria-busy` when loading, icon-only requires `aria-label`, ≥44px.

### Chip / Badge / SignalChip
- **Chip props:** `active?`, `icon?`, `count?` (mono). Active = `--accent-soft` + accent text.
- **SignalChip variants:** `trending` (violet dot), `live` (green pulse), `new`, `low-stock` (amber + meter), `sold-out` (muted).

### Input / AISearchField
- Standard: 16px text, `--r-sm`, accent focus ring. **AISearchField:** pill, leading gradient sparkle, placeholder *"What are you looking for today?"*, opens AISearchOverlay; supports typeahead + example chips.

### Dialog / Sheet / Popover / Toast
- Focus-trapped, Esc/scrim close, scroll-lock; Sheet supports drag-to-dismiss (mobile). Toast: bottom placement, auto-dismiss, optional undo.

### Skeleton / Progress / Rating / QtyStepper / CountdownTimer
- Skeleton: neutral shimmer, exact-size to prevent CLS. Rating: mono avg + star row + distribution bars. QtyStepper: −/n/+ with total re-animate. CountdownTimer: mono, real deadlines, `role="timer"`.

---

## 3. Commerce atoms

### Price / CompareAtPrice
- `Price`: JetBrains Mono, `₹` prefix, locale grouping. `CompareAtPrice`: muted strikethrough; savings computed to a `SavingsChip`.

### StockMeter / TrendingScore / TrustBadge
- `StockMeter`: track + fill, green→amber as depletes, mono count, honest (reflects real stock). `TrendingScore`: mono value + micro-sparkline. `TrustBadge`: Lucide icon + label (COD / Returns / Secure / Fast), monochrome.

### SaveButton (heart) / VariantSwatch
- `SaveButton`: heart toggle, spring + burst on save, optimistic, mono count; double-tap alias on cards. `VariantSwatch`: color/size options, selected ring, disabled when OOS, updates media/price.

---

## 4. Cards

### ProductCard (the atom of discovery)
- **Props:** `product`, `layout: grid|rail|masonry|compact`, `priority?`, `showSignals?`.
- **Anatomy:** media (`4:5`, micro-zoom on hover, blur placeholder) · SaveButton (top-right) · SignalChips (bottom-left) · QuickView trigger (hover/long-press) · title (h3, 2-line clamp) · Price/CompareAt.
- **Interactions:** whole card = link to product; controls stopPropagation; double-tap saves; hover lift + zoom.
- **States:** default/hover/loading(skeleton)/OOS(muted + "notify me").
- **A11y:** card is a labelled link; controls individually labelled; keyboard focus ring.

### ReelCard
- Vertical `9:16` autoplay-muted media, overlay action rail (save/share/buy/details), title+price, progress bar. Pauses off-screen; reduced-motion → poster. Used in `/reels`, teasers, customer videos, creator reels.

### MoodTile / CollectionCard / CreatorCard
- `MoodTile`: lifestyle image + label + hover 2-product peek → `/moods/[mood]`. `CollectionCard`: editorial image + title + item count. `CreatorCard`: avatar + handle + mono followers + 3 pick thumbs.

### BundleCard / SetupCard / CommunitySetupCard
- `BundleCard`: grouped thumbs, was/now mono, savings chip, add-bundle. `SetupCard`/`CommunitySetupCard`: styled room media + hotspots + "shop the room/setup" + author/likes.

### ReviewCard / TestimonialCard
- `ReviewCard`: avatar, verified check, rating, text, media, helpful count. `TestimonialCard`: large Space Grotesk quote, author, stars.

---

## 5. Molecules

### ProductRail
- Horizontal snap scroller of cards; `SectionHeader` + "See all"; desktop arrows; peek affordance; drag on touch. Virtualize if long.

### MasonryFeed (discovery engine core)
- **Props:** `source` (query/mood/taste), `interleave?: (reel|setup)`, `pageSize`, `infinite?`.
- CSS columns / virtualized masonry, 2→5 cols; IntersectionObserver pagination; interleaves ReelCard/SetupCard; "more like this"; skeletons; endless. Ranked by TasteProvider when personalized.

### DiscoveryModeSwitcher
- Segmented control (For You · Masonry · Reels · Rows · Moods · Mystery); animated active pill; crossfades the surface.

### HotspotPopover / BeforeAfterSlider / ComparisonTable
- `HotspotPopover`: pulsing dot → mini product card + add. `BeforeAfterSlider`: draggable/keyboard handle, accessible label, shop chips. `ComparisonTable`: 2–3 columns, sticky first column, highlight differences.

### OrderTimeline / ProgressIndicator
- `OrderTimeline`: vertical stepper, mono timestamps, current-step accent. `ProgressIndicator`: inline checkout steps (Contact→Shipping→Payment), no page nav.

### SpinWheel / ExplorerLevelRing
- `SpinWheel`: physics spin, deterministic reward, reduced-motion → instant reveal. `ExplorerLevelRing`: circular progress + level + mono points.

---

## 6. Overlays

- **AISearchOverlay:** command palette; typeahead groups (Products/Moods/Collections); example prompt chips; keyboard nav; parsed-intent chips. Backed by search repository (mock AI → real).
- **QuickView:** modal product summary (gallery, price, variants, Add, "full details" link) without leaving the feed; deep-linkable via intercepting route.
- **CartSheet / WishlistSheet:** slide-over (desktop) / bottom sheet (mobile); items, totals, upsell rail, trust row, primary CTA; drag-to-dismiss.
- **AuthSheet:** non-blocking sign-in/up; browsing never requires it.

---

## 7. Chrome & Sections

- **Header / BottomTabBar / ProfileMenu / CartButton / WishlistButton / AISearchPill:** per Page Specs §1; badge springs, active-lens sliding underline, magnetic nav (desktop).
- **SectionHeader:** eyebrow (Satoshi upper) + h2 + optional "See all". **EditorialStatement:** display-2 with animated accent word. **Divider:** `whitespace|hairline|ticker|statement` variants.
- **Footer:** expansive editorial (Page Specs §4).
- **Home section components (S1–S25):** `HeroSection`, `SocialProofTicker`, `TrendingTodayRail`, `ViralEditorial`, `MoodGrid`, `DiscoverFeedSegment`, `EditorialStatement`, `CreatorPicksRow`, `DeskSetupShowcase`, `ReelsTeaser`, `BeforeAfterSection`, `MostSavedSection`, `LifestyleBento`, `LimitedDropsSpotlight`, `CollectionsSection`, `BundlesSection`, `FlashDealsRail`, `NewArrivalsGrid`, `KitchenStorySection`, `TrendingCategoriesCloud`, `CustomerVideosStrip`, `CommunitySetupsSection`, `TestimonialsCarousel`, `NewsletterJoin`. Each takes typed section data (CMS/mock) → renders with its own motion.

---

## 8. Providers & utilities

- **RepositoryProvider:** injects the data repository (mock now, live later) — the swappable seam.
- **TasteProvider:** accumulates taste vector; exposes ranking.
- **MotionProvider / ReducedMotionGate:** central motion config + reduced-motion handling.
- **LenisProvider:** smooth scroll (desktop; disabled for reduced-motion/touch as appropriate).
- **Toaster / Analytics:** global toast host; GA4/Pixel/Clarity events behind an `analytics` seam.

---

## 9. Component conventions

- Server Components by default; add `"use client"` only for interactive/motion components.
- Props are typed against domain models (IA §6). No hardcoded colors/sizes — tokens only.
- Every interactive component: focus-visible ring, `aria-*`, keyboard support, reduced-motion variant.
- Motion via a shared `variants` library (see doc 06) — components import named variants, not ad-hoc values.
- Each card/overlay ships a `Skeleton` sibling.

---

*End of Component Library. Next: `06-INTERACTIONS-AND-ANIMATION.md`.*
