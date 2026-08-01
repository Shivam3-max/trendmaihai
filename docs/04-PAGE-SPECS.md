# TrendMeHai — Page & Section Specifications

> **Version:** 1.0 · Downstream of PRD, IA, Design System.
> **How to read:** For each surface: **Purpose → Layout → Interactions → Micro-animations → Responsive (Desktop/Tablet/Mobile)**. Motion tokens (`--dur`, `--ease-out`, etc.) refer to `03-DESIGN-SYSTEM.md §8`. Components (in **bold**) are specced in `05-COMPONENT-LIBRARY.md`.

---

## 1. Global Chrome (present on all storefront pages)

### 1.1 Header / Nav
- **Desktop:** minimal top bar — wordmark left; 7 lenses center; **AISearchPill**, **WishlistButton**, **CartButton(n)**, **ProfileMenu** right. Transparent over hero → on scroll gains `bg-white/70 backdrop-blur-md` + hairline bottom border; bar height 72→60 on scroll (`--dur`). Active lens = accent underline that slides between items (shared layout).
- **Tablet:** same, lenses collapse into a scrollable chip row beneath.
- **Mobile:** top mini-bar (wordmark · streak/points chip · avatar) + **BottomTabBar** (Home · Discover · ✦Spark · Wishlist · Cart). Spark = raised accent FAB → immersive Reels/Mystery surface.
- **Micro:** cart badge spring-bumps on add; wishlist heart pulses on save; nav links have magnetic hover (desktop).

### 1.2 AI Search Overlay (global, `⌘K` / `/` / tap)
- Full-width command palette descending from top with scrim; **AISearchField** focused, placeholder *"What are you looking for today?"*.
- Below: **example prompt chips** ("something for my study table", "a gift under ₹1000", "something aesthetic"), recent searches, and trending queries.
- As user types: instant typeahead (products, moods, collections) in grouped sections; Enter → `/search?q=`.
- **Micro:** sparkle icon gradient-shimmers; results fade/stagger in; ↑↓ keyboard nav with accent highlight.

### 1.3 Cart (slide-over / bottom sheet) — see Page 12.
### 1.4 Footer — see §4.

---

## 2. HOME `/` — the interactive magazine (25 sections)

> The home is an ordered, CMS-drivable sequence (IA §4). Alternate `--bg` / `--bg-secondary`, use asymmetry, and separate sections with **premium dividers** (whitespace / hairline / ticker / big-type statement). After §24 it dissolves into true infinite scroll.

### S1 — Hero (immersive, animated)
- **Purpose:** In <5s, communicate "discover, don't search" and spark curiosity.
- **Layout:** Asymmetric split. Left 55%: eyebrow (Satoshi upper "TRENDING NOW"), **display-1** headline with a rotating accent word (`discover / obsess over / fall for`) that gradient-sweeps on swap; supporting line; **AISearchField** (primary CTA) + secondary "Start exploring" ghost. Right 45%: a **HeroProductStage** — auto-cycling floating product cards (3–5) with soft parallax, drifting slowly, casting near-invisible shadows on white.
- **Interactions:** Mouse-move parallax on product stage (subtle, ≤12px); clicking a floating product → quick-view; search focus expands the overlay.
- **Micro:** headline word swaps every 2.6s (mask + gradient sweep); products drift on a slow sine; magnetic CTA; scroll-cue chevron breathing at bottom.
- **Responsive:** Desktop parallax stage; Tablet stacked (headline over a 2-card float row); Mobile single centered floating product behind headline, search pill full-width, thumb-reachable. Reduced-motion → static hero, no drift/parallax.

### S2 — Live Social-Proof Ticker (premium divider band)
- **Purpose:** Honest liveliness without clutter.
- **Layout:** Thin full-bleed band, `--bg-secondary`, marquee of real-time-style events: "Aditi in Pune just grabbed the Sunset Lamp · 214 saved today · Desk Riser trending ↑". Mono numerics, green live dot.
- **Micro:** continuous marquee (pauses on hover), live dot pulses. Reduced-motion → static, non-scrolling row.

### S3 — Trending Today (horizontal snap rail)
- **Purpose:** Immediate "what's hot."
- **Layout:** Section head (h2 "Trending Today" + "See all" → `/trending`). Horizontal **ProductRail** of **ProductCard**s with snap; trending rank badge (mono #1..#n) + trending-score chip.
- **Interactions:** drag/scroll snap; arrows on desktop; card hover lift + micro-zoom; double-tap save.
- **Responsive:** peek next card on all breakpoints (affordance). Mobile = 1.2 cards visible.

### S4 — Products Going Viral (asymmetric editorial 2-up)
- **Layout:** 60/40 asymmetric: one large hero product with an editorial caption + "why it's blowing up" mono stat (saves/day), paired with a smaller stacked pair. Whitespace-heavy.
- **Micro:** scroll-reveal (stagger); the mono stat counts up when in view.

### S5 — Shop by Mood (tile grid → `/moods`)
- **Purpose:** Category alternative — shop by feeling.
- **Layout:** Responsive grid of **MoodTile**s (Minimal Desk, Cozy Room, Gaming, Coffee Lover, WFH, Study, Travel, Pet Parent, Fitness…). Each tile: soft lifestyle image, mood label (Satoshi), subtle hover zoom + label slide.
- **Interactions:** tap → `/moods/[mood]`; hover reveals a 2-product peek.
- **Responsive:** 2 cols mobile · 3 tablet · 4–5 desktop; tiles vary height (bento asymmetry).

### S6 — Infinite Discover Feed · Segment 1 (masonry)
- **Purpose:** The heart. Mixed personalized discovery.
- **Layout:** Pinterest **MasonryFeed** of **ProductCard**s + occasional **ReelCard** and **SetupCard** interleaved. Columns 2→5 by breakpoint.
- **Interactions:** infinite via IntersectionObserver; double-tap save; long-press → **QuickView**; "more like this" on card menu; endless.
- **Micro:** items fade/rise on enter (stagger, once); skeleton shimmer while loading; save heart-burst.

### S7 — Editorial Divider ("You don't search. You discover.")
- **Layout:** Full-bleed whitespace band, **display-2** statement centered/left, one accent word gradient-sweeping; tiny eyebrow.
- **Micro:** line-by-line mask reveal on scroll; accent word sweep loops slowly.

### S8 — Creator Picks
- **Layout:** Row of **CreatorCard**s (avatar, handle, follower mono count, "view picks") each with 3 curated product thumbs. → `/creators/[handle]`.
- **Micro:** avatar hover ring; product thumbs parallax slightly on scroll.

### S9 — Best Desk Setups (shoppable showcase)
- **Layout:** Large **SetupShowcase**: a styled desk photo with **hotspot dots**; clicking a dot pops a mini product card; "Buy this setup (6)" CTA → adds bundle.
- **Interactions:** hotspots pulse; click → **HotspotPopover**; "buy setup" → cart with bundle discount.
- **Responsive:** Desktop full lifestyle image + hotspots; Mobile → image with a horizontal product strip below (hotspots become chips).

### S10 — Product Reels teaser (→ `/reels`)
- **Layout:** Full-bleed dark-ish media strip (permitted spotlight) showing 2–3 vertical **ReelCard** previews auto-playing muted; "Enter Reels" CTA.
- **Micro:** subtle Ken-Burns; tap → full-screen `/reels`. Reduced-motion → static posters.

### S11 — Before vs After (interactive slider)
- **Layout:** **BeforeAfterSlider** (drag handle) over room/kitchen transformations; caption + "shop this transformation" → setup.
- **Interactions:** drag/keyboard slider; product chips below the reveal.

### S12 — Most Saved Products (ranked, mono counts)
- **Layout:** Editorial ranked list/grid; big **metric** save counts (JetBrains Mono), rank numerals, subtle sparkline of save velocity.
- **Micro:** counts count-up in view; #1 gets a soft accent glow.

### S13 — Explore by Lifestyle (asymmetric)
- **Layout:** Bento of lifestyle themes (Desk, Kitchen, Bedroom, Car, Tech, Wellness) with varied tile sizes; each → a filtered feed.

### S14 — Limited Drops (cinematic DARK spotlight band)
- **Purpose:** Event energy; the one deliberately dark section.
- **Layout:** `data-surface="spot"` band (`--spot-bg`): countdown **timer** (mono), drop hero product, "Notify me / Enter drop" → `/drops/[slug]`. High-contrast, cinematic, restrained.
- **Micro:** timer ticks (mono), subtle grain/parallax; CTA magnetic. Returns to white after.

### S15 — Collections (editorial cards)
- **Layout:** 2–3 large **CollectionCard**s (editorial image, title, item count) asymmetric. → `/collections/[slug]`.

### S16 — Bundles ("complete the set")
- **Layout:** **BundleCard**s: grouped product thumbs, "was/ now" mono pricing, savings chip, add-bundle CTA.

### S17 — Flash Deals (honest live timers)
- **Layout:** Rail of deal **ProductCard**s with genuine per-item countdown + stock meter; savings chip.
- **Micro:** timers tick; stock meter animates only on real change. No fake urgency.

### S18 — New Arrivals (fresh grid)
- **Layout:** Clean grid, "NEW" chips, subtle date meta (mono). → `/new`.

### S19 — Kitchen Transformations (lifestyle story)
- **Layout:** Editorial story block: big lifestyle image + short narrative + shoppable chips. (Content-parallel to S9 for a different room.)

### S20 — Trending Categories (chip cloud / tiles)
- **Layout:** Cloud of trending tags/tiles sized by momentum (mono counts); tap → filtered feed.

### S21 — Customer Videos (UGC reel strip)
- **Layout:** Horizontal strip of vertical customer **ReelCard**s (verified badge); tap → full-screen with shop chips.

### S22 — Community Setups (shoppable rooms → `/community`)
- **Layout:** Masonry of **CommunitySetupCard**s (author, likes mono, "shop the room"); → `/community/[id]`.

### S23 — Testimonials (verified reviews)
- **Layout:** Premium quote cards (large Space Grotesk quote, author, verified check, star row); soft auto-advancing carousel.
- **Micro:** gentle cross-fade; drag on touch.

### S24 — Infinite Discover Feed · Segment 2 → true infinite
- **Layout:** Personalized **MasonryFeed** ("Because you saved…", "For your Minimal Desk mood"); becomes endless — the home never dead-ends.

### S25 — Newsletter / Join (+ spin-wheel hook)
- **Layout:** Calm email capture on `--bg-secondary`; "unlock a mystery reward" → **SpinWheel** modal (gamification); trust line (no spam).
- **Micro:** submit → success check morph; spin wheel physics + reward reveal.

### Home performance notes
Hero is LCP (priority image/poster). Feed virtualized; below-fold lazy. Sections are independent client islands where interactive, server-rendered where static, for Lighthouse ≥95.

---

## 3. Discovery Surfaces

### 3.1 `/discover` — multi-format explorer
- **Purpose:** Dedicated home of the Discovery Engine.
- **Layout:** Sticky **DiscoveryModeSwitcher** (For You · Masonry · Reels · Rows · Moods · Mystery/Treasure). Below: the selected format fills the viewport.
- **Interactions:** switch mode = animated crossfade; "For You" ranks by taste vector; Treasure Hunt hides a reward card randomly in the feed (find → reward).
- **Responsive:** Mobile defaults to Reels-first; desktop defaults to Masonry + rows.

### 3.2 `/reels` (+ `/reels/[id]`) — full-screen vertical
- **Layout:** One product per screen, `9:16` autoplay muted video/lifestyle; right rail (mobile: floating column): save ♥ (mono count), share, "details", **QuickBuy**; bottom: title, price (mono), trending chip; progress bar top.
- **Interactions:** vertical swipe (snap + spring), double-tap save (heart burst), tap product name → product page, QuickBuy → add + continue, hold → pause/preview.
- **Micro:** progress bar per item; heart burst; buy → flies to cart. Reduced-motion → manual advance, no autoplay.
- **A11y:** captions/labels, keyboard ↑↓, pause control, focus management.

### 3.3 `/moods` & `/moods/[mood]`
- **`/moods`:** grid of **MoodTile**s (mirrors S5, full set).
- **`/moods/[mood]`:** mood hero (label, palette-tinted soft banner, short line) → curated **MasonryFeed** filtered to the mood + "complete the [mood] setup" bundle + related moods rail. Deep-linkable, SEO'd.

### 3.4 `/trending` & `/new`
- Time-windowed lenses: tabs (Today · This Week · Rising / New Today · This Week). Ranked grids with mono signals. Same card grammar; no dead-ends (ends in "explore more").

### 3.5 `/search` — results
- **Layout:** query echoed at top (editable), AI-parsed intent chips (e.g. "budget ≤ ₹1000", "aesthetic", "coffee"), results grid, refine chips (moods/price/aesthetic). Empty/low-result → "you might also love" discovery fallback (never a dead end).

---

## 4. FOOTER (all pages)
- **Layout:** Expansive, editorial, `--bg-secondary`. Columns: Discover (Trending, New, Moods, Collections, Deals), Community (Creators, Community, Upload), Company (About, Support, Track Order), Legal. Big wordmark; newsletter mini-form; trust row (COD · Returns · Secure · Fast); socials (Lucide). Bottom: mono "©2026 · Made for discovery."
- **Micro:** link hover = accent slide-underline; wordmark subtle letter-spacing on hover.

---

## 5. PRODUCT PAGE `/product/[slug]` — storytelling experience

> Not "image · title · price." A narrative that always flows onward. Sticky **BuyBar** persists.

### Structure (top → bottom)
1. **Hero (video-led):** full-bleed product hero video (muted autoplay, poster) or premium image; overlaid title (h1), subtitle, price (mono), rating chip, trending/stock signals; **primary Add to Cart / Buy Now** + wishlist. Sticky **BuyBar** appears on scroll past hero.
2. **Gallery:** horizontal snap gallery + thumbnail rail; pinch/scroll zoom; variant swatches update media.
3. **Benefits:** 3–4 icon + short benefit blocks (why you'll love it), whitespace-rich.
4. **Features:** editorial alternating image/text rows (asymmetric), scroll-revealed.
5. **Lifestyle images:** full-bleed in-context shots; parallax.
6. **Creator videos / Instagram-style reels:** horizontal **ReelCard** strip of creators using it → shoppable.
7. **Customer reviews:** rating summary (mono avg + distribution bars) + verified reviews with media; "most helpful"; write-review.
8. **Comparison:** **ComparisonTable** vs 1–2 alternatives (honest, scannable).
9. **FAQs:** accordion.
10. **People Also Bought:** rail.
11. **Build Your Setup:** `completesWith` products as an interactive add-multiple builder (running total, "add all").
12. **Related Rooms / Setups:** community/curated setups featuring this product (shoppable).
13. **Complete the Collection:** if part of a collection.
14. **Recently Trending / Hidden Recommendations:** personalized discovery.
15. **Continue Browsing:** feeds back into infinite masonry — **no dead-end.**

- **Interactions:** variant select → media + price update (spring); Add → flies to cart + toast; wishlist pulse; sticky BuyBar mirrors state; reels open full-screen; setup builder updates a mono running total.
- **Micro:** section scroll-reveals; gallery zoom; rating bars fill in view; "flying image" add-to-cart.
- **Responsive:** Desktop = 2-col hero (media left, sticky buy panel right) then full-width story; Tablet = stacked with sticky bottom BuyBar; Mobile = full-bleed media carousel, sticky bottom BuyBar (price + Add), sheets for details.
- **SEO:** `Product`, `Offer`, `AggregateRating`, `BreadcrumbList` JSON-LD; OG image = hero.

---

## 6. Cart, Wishlist, Checkout, Order

### 6.1 Cart `/cart` + slide-over
- **Layout:** line items (thumb, title, variant, mono price, qty stepper, remove), order summary (subtotal/discount/total mono), coupon field, **trust row**, **upsell rail** ("complete your setup" / "frequently added"), primary "Checkout".
- **Micro:** qty change animates total; remove = slide-out; empty cart = discovery launchpad ("Nothing here yet — start discovering" + trending rail), never blank.

### 6.2 Wishlist `/wishlist` + slide-over
- **Layout:** saved grid + optional **boards**; "move to cart", "add all"; recommendation rail "based on your saves".
- **Micro:** unsave = gentle fade; board switching = crossfade.

### 6.3 Checkout `/checkout` — one page, premium
- **Layout:** single column, calm, `--container` narrow. **ProgressIndicator** (Contact → Shipping → Payment) as inline steps (no page changes). Sticky order summary (desktop right / collapsible top mobile) with **upsell/bundle** nudge. Payment: **COD**, UPI, cards (Razorpay/Stripe seam). **Trust signals** (secure, returns, COD) near CTA. Gift-note optional.
- **Interactions:** inline validation with friendly errors near field; address autofill; COD default-visible; "Place order" → loading state → confirmation.
- **Guardrails:** no hidden costs, no forced account (guest checkout), no confirm-shaming.
- **Responsive:** mobile = full-width fields, 16px text, sticky "Place order (₹total)" bar; summary collapsible.

### 6.4 Order Confirmation `/order/confirmation/[id]`
- **Layout:** celebratory (tasteful confetti burst, reduced-motion safe), order summary, tracking link, "earned X points / badge" (gamification), and — crucially — **"Keep exploring"** feed. No dead-end.

### 6.5 Track Order `/track` + `/track/[id]`
- **Layout:** lookup (id/email) → **OrderTimeline** (Placed → Packed → Shipped → Out for delivery → Delivered) with mono timestamps, courier info (Shiprocket seam), item list, support link.

---

## 7. Community, Creators, Drops, Deals

### 7.1 `/community` (+ `/[id]`, `/upload`)
- **Index:** masonry of **CommunitySetupCard**s (author, likes, "shop the room"), filter by room type.
- **Detail:** big setup media with **hotspots** → products; "Buy the whole setup" bundle; author card; like/save/share; related setups; comments (light).
- **Upload:** auth-gated flow — image upload (Cloudinary), tag products (search + place hotspots), title/description, submit for review. Prohibited-action note: publishing UGC requires explicit user confirm.

### 7.2 `/creators` (+ `/[handle]`)
- **Index:** creator directory grid.
- **Detail:** creator storefront — hero (avatar, bio, mono followers), picks feed, their setups, "follow", shoppable throughout.

### 7.3 `/drops` (+ `/[slug]`)
- **Index:** upcoming/live/past drops calendar.
- **Detail:** cinematic **dark spotlight** page — countdown, hero product(s), scarcity (real stock), "notify me"/"buy now"; the rare full-dark experience.

### 7.4 `/deals`
- Flash deals grid with honest timers + stock meters; category filters; ends in discovery rail.

---

## 8. Account, Rewards, Support, About

### 8.1 `/profile` + subroutes
- **Hub:** avatar, **Explorer Level** ring + points (mono), streak flame, quick links (Orders, Saved, Rewards, Settings).
- **`/profile/rewards`:** badges grid (earned/locked), level progress, streak calendar, points ledger (mono), referral leaderboard + share link, spin-wheel entry.
- **`/profile/orders`:** list → order detail/track.
- **`/profile/saved`:** wishlist/boards.
- **`/profile/settings`:** profile, addresses, payment prefs, notifications, privacy.

### 8.2 `/support`
- Help center: searchable FAQ accordions, order-help shortcuts, contact (form/chat), returns policy — calm and reassuring.

### 8.3 `/about`
- Brand-story editorial: the "you don't search, you discover" manifesto, philosophy, team/values; big type, generous imagery.

---

## 9. ADMIN (designed now, built after MVP)

- **Shell:** left nav (Lucide), top bar (search, notifications, account), light dashboard aesthetic consistent with the brand (bright, editorial, mono metrics).
- **`/admin` Dashboard:** KPI tiles (mono) — revenue, orders, CVR, AOV, products discovered/session; trend charts; live orders feed; low-stock alerts.
- **Orders/Products/Inventory/Customers/Coupons/Reviews:** data tables (sortable, filterable, bulk actions), detail drawers, inline edit; product editor with media, tags/moods, relations (completesWith/bundles), signals.
- **Homepage Builder:** drag-drop the 25 home sections — reorder, toggle, configure each section's data source; live preview. (This is the CMS realization of IA §4.)
- **Landing Pages:** block-based builder.
- **Push Notifications / Marketing / Referrals / Influencers:** campaign composer, pixel config, referral rules + leaderboard, creator onboarding & payouts.

---

## 10. Cross-page states (specified once, reused)

- **Loading:** skeleton screens (card/feed/reel skeletons) with neutral shimmer — never spinners in the feed. Reserve space (no CLS).
- **Empty:** always a discovery launchpad with a trending rail + CTA.
- **Error:** friendly, on-brand copy + retry + "keep exploring" fallback.
- **Offline:** cached feed + graceful banner.
- **Toasts:** bottom (mobile) / bottom-right (desktop), auto-dismiss, with undo where relevant (e.g. remove from cart).

---

*End of Page Specs. Next: `05-COMPONENT-LIBRARY.md`.*
