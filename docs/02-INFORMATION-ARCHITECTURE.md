# TrendMeHai — Information Architecture (IA)

> **Version:** 1.0 · Downstream of `01-PRD.md`
> **Purpose:** Define *where everything lives* — routes, navigation, taxonomy, data model, and the seams between UI and data.

---

## 1. IA Principles

1. **Discovery is the front door.** The homepage is a *feed*, not a menu. Navigation is lightweight; the app pulls you forward, it doesn't ask you to choose from a directory.
2. **Lenses, not silos.** Trending / Mood / Deals / Creators are *lenses* over one catalogue, not separate stores. The same product appears in many contexts.
3. **No dead-ends.** Every leaf route (product, order, empty state) offers a way *back into the flow*.
4. **Shallow depth.** Nothing important should be more than **2 taps** from the home feed.
5. **URL = shareable state.** Moods, collections, drops, products, and filtered feeds are all deep-linkable for SEO and social sharing.

---

## 2. Global Navigation Model

### 2.1 Desktop — top bar (minimal, sticky, translucent-on-scroll)
```
[TrendMeHai wordmark]   Trending  Discover  Moods  Collections  Deals  Creators  Community      [AI Search ⌘K]  [Wishlist ♥]  [Cart 🛍 (n)]  [Profile]
```
- Max 7 primary links — everything else lives in Profile or is discoverable in-feed.
- On scroll down: bar slims and gains a soft frosted backdrop over white. On scroll up: restores.
- **AI Search** is a prominent pill, not a tiny icon — it's the "escape hatch," treated with importance. Opens a command-palette overlay (`⌘K` / `/`).

### 2.2 Mobile — bottom tab bar (thumb zone) + top mini-bar
**Bottom tabs (5, Instagram-grammar):**
```
[Home/Feed]   [Discover/Search]   [＋ Reels/Create]   [Wishlist]   [Cart]
```
- Center action is a raised "spark" button → opens **Reels / Mystery / Treasure Hunt** discovery surface (the "for you" immersive mode).
- **Top mini-bar:** wordmark (left), streak/points chip (center-right), profile avatar (right).
- Primary lens navigation (Trending, Moods, Collections, Deals, Creators, Community) lives in a **horizontal chip scroller** under the home hero and in the Discover tab — not buried in a hamburger.

### 2.3 Utility & overlays (not routes)
- **AI Search overlay** (command palette) — global, keyboard + tap.
- **Cart** — slide-over (desktop) / bottom sheet (mobile), plus a full `/cart` route for deep-link.
- **Quick-View** — modal over the feed (does not navigate away).
- **Wishlist** — slide-over + full `/wishlist` route.
- **Auth** — modal/bottom sheet, non-blocking (browsing never requires login).

---

## 3. Route Map (App Router)

Legend: `S` = primarily Server Component (SEO/shell), `C` = interactive Client surface, `M` = modal/overlay (intercepting route where useful).

### 3.1 Storefront routes
| Route | Page | Render | Notes |
|---|---|---|---|
| `/` | **Home** (feed magazine, 20–25 sections) | S+C | Hero + infinite discover feed |
| `/trending` | **Trending** (today / viral / rising) | S+C | Time-windowed lens |
| `/new` | **New Drops / New Arrivals** | S+C | Freshness lens |
| `/discover` | **Discover** (multi-format explorer) | C | Masonry + reels + rows + treasure hunt |
| `/reels` | **Product Reels** (full-screen vertical) | C | TikTok-grammar; deep-linkable `/reels/[id]` |
| `/moods` | **Shop by Mood** (index of moods) | S | Grid of mood tiles |
| `/moods/[mood]` | **Mood feed** (e.g. `/moods/minimal-desk`) | S+C | Curated lens per mood |
| `/collections` | **Collections** (index) | S | Editorial collections |
| `/collections/[slug]` | **Collection detail** | S+C | Shoppable editorial |
| `/deals` | **Deals / Flash Deals** | S+C | Live timers, honest scarcity |
| `/drops` | **Limited Drops** (index) | S+C | Event calendar |
| `/drops/[slug]` | **Drop detail** (cinematic, timed) | S+C | One of the few dark "spotlight" pages |
| `/creators` | **Creators** (index) | S | Creator directory |
| `/creators/[handle]` | **Creator storefront / picks** | S+C | Curated by creator |
| `/community` | **Community** (UGC setups) | S+C | Shoppable rooms feed |
| `/community/[id]` | **Setup detail** (buy the whole room) | S+C | Bundle-from-UGC |
| `/community/upload` | **Upload a setup** | C | Auth-gated action |
| `/product/[slug]` | **Product page** (storytelling) | S+C | The big one; §5 of PAGE-SPECS |
| `/search` | **Search results** (AI + facets) | C | Backed by AI/Algolia seam |
| `/wishlist` | **Wishlist** (full page) | C | Also a slide-over |
| `/cart` | **Cart** (full page) | C | Also a slide-over |
| `/checkout` | **One-page checkout** | C | Premium, minimal |
| `/order/confirmation/[id]` | **Order confirmed** | S+C | Celebration + "keep exploring" |
| `/track` | **Track order** (lookup) | C | Enter id / from account |
| `/track/[id]` | **Order tracking detail** | S+C | Shiprocket seam |
| `/profile` | **Profile hub** | C | Auth-gated |
| `/profile/orders` | Order history | C | |
| `/profile/rewards` | **Rewards / badges / level / streak** | C | Gamification home |
| `/profile/saved` | Saved / boards | C | |
| `/profile/settings` | Settings | C | |
| `/deals`, `/support`, `/about` | Support, About | S | Editorial/static + help |
| `/support` | **Support / Help center** | S+C | FAQ + contact + order help |
| `/about` | **About / brand story** | S | Editorial |

### 3.2 Modal / intercepting routes (feed-preserving)
| Route | Behavior |
|---|---|
| `/@modal/product/[slug]` | Quick-View modal intercept — deep-linkable, but rendered over the current feed; full page on hard load |
| `/@modal/search` | AI search overlay as a route (shareable query state) |
| `/@modal/auth` | Auth sheet |

### 3.3 Admin routes (built after storefront MVP)
| Route | Page |
|---|---|
| `/admin` | Dashboard / analytics |
| `/admin/orders` | Orders |
| `/admin/products` | Products & inventory |
| `/admin/customers` | Customers |
| `/admin/coupons` | Coupons |
| `/admin/reviews` | Reviews moderation |
| `/admin/content` | Content / editorial |
| `/admin/homepage-builder` | **Drag-drop homepage section builder** |
| `/admin/landing` | Landing page builder |
| `/admin/notifications` | Push notifications |
| `/admin/marketing` | Campaigns / pixels |
| `/admin/referrals` | Referral system |
| `/admin/influencers` | Influencer/creator management |

---

## 4. Homepage Section Map (the 20–25-section magazine)

The home feed is an ordered, CMS-drivable sequence. Full per-section specs (layout, motion, responsive, interactions) are in `04-PAGE-SPECS.md §3`. The canonical order:

1. **Hero** — immersive, animated, auto-cycling products
2. **Live ticker / social proof** ("live purchases," trending score) — thin premium divider-band
3. **Trending Today** — horizontal snap rail
4. **Products Going Viral** — asymmetric editorial 2-up
5. **Shop by Mood** — mood tile grid (entry to `/moods`)
6. **Infinite Discover Feed — segment 1** (masonry)
7. **Editorial divider** — big-type statement ("You don't search. You discover.")
8. **Creator Picks** — creator cards + curated products
9. **Best Desk Setups** — shoppable setup showcase
10. **Product Reels teaser** — full-bleed vertical preview → `/reels`
11. **Before vs After** — interactive slider (kitchen/room transformations)
12. **Most Saved Products** — ranked, JetBrains-Mono counts
13. **Explore by Lifestyle** — lifestyle categories, asymmetric
14. **Limited Drops** — cinematic dark spotlight band (rare dark section)
15. **Collections** — editorial collection cards
16. **Bundles** — "complete the set" value
17. **Flash Deals** — honest live timers
18. **New Arrivals** — fresh grid
19. **Kitchen Transformations** — lifestyle story block
20. **Trending Categories** — chip cloud / tiles
21. **Customer Videos** — UGC reel strip
22. **Community Setups** — shoppable rooms (entry to `/community`)
23. **Testimonials** — verified reviews, premium quote cards
24. **Infinite Discover Feed — segment 2** (masonry, personalized) → seamless into infinite scroll
25. **Newsletter / Join** — email capture + spin-wheel hook
26. **Footer** — expansive, editorial

> Sections 6 and 24 anchor the **infinite feed**; after 24 the page transitions into true infinite scroll so the home literally never ends — reinforcing "no dead-ends." Sections are reorderable/toggleable via the Admin Homepage Builder.

---

## 5. Discovery Taxonomy (how catalogue is organized for discovery)

We intentionally avoid a rigid category tree as the primary structure. Products are richly **tagged** and surfaced through multiple overlapping lenses:

### 5.1 Facets on every product (the tag model)
- **Moods** (many): `minimal-desk`, `cozy-room`, `gaming`, `coffee-lover`, `wfh`, `study-setup`, `travel`, `road-trip`, `pet-parent`, `fitness`, `car-lover`, `photography`, `music`, `student-life`, `creator-studio`.
- **Lifestyle themes**: desk, kitchen, bedroom, car, outdoor, tech, wellness, style.
- **Occasions**: gifting, birthday, festive/seasonal, housewarming.
- **Price bands**: `<₹500`, `₹500–1000`, `₹1000–2000`, `₹2000–5000`, `₹5000+` (drives Budget mode).
- **Signals** (dynamic): trending score, save count, view velocity, stock level, "viral," "rising," "new."
- **Aesthetic tags**: minimal, warm, monochrome, colorful, retro, futuristic, natural.
- **Relations**: `completesWith[]` (Build Your Setup), `partOfSetup[]`, `bundleWith[]`, `alternativesTo[]`.

### 5.2 The taxonomy is a graph, not a tree
A product like a "wooden monitor stand" simultaneously lives in moods `minimal-desk` + `wfh` + `study-setup`, lifestyle `desk`, aesthetic `natural/minimal`, and links to `completesWith` (lamp, cable tray). Discovery traverses these edges — this is what powers "more like this," "complete the setup," and personalized rows.

---

## 6. Data Model (typed domain — the swappable seam)

All UI reads from a **repository interface**; Phase 1 implements it with mock data, later phases with Shopify/Sanity/Algolia. Core entities:

```
Product
  id, slug, title, subtitle, story (rich), price, compareAtPrice, currency
  media: { heroVideo?, images[], reels[], lifestyleImages[] }
  moods[], lifestyle[], occasions[], aesthetic[], priceBand
  signals: { trendingScore, saveCount, viewVelocity, stock, badges[] }
  variants[] (option, value, price, stock)
  relations: { completesWith[], partOfSetup[], bundleWith[], alternativesTo[], alsoBought[] }
  reviews: summary { avg, count, distribution }, items[]
  faqs[], features[], benefits[]
  seo: { title, description, ogImage }

Collection { id, slug, title, editorial, heroMedia, productIds[], layout }
Mood       { id, slug, label, emoji/icon, palette, heroMedia, description }
Drop       { id, slug, title, startsAt, endsAt, productIds[], theme(dark) }
Bundle/Setup { id, title, source(curated|community|creator), items[{productId, qty}], bundlePrice }
Creator    { id, handle, name, avatar, bio, picks[], setups[] }
CommunitySetup { id, author, title, media[], hotspots[{x,y,productId}], productIds[], likes }
Review     { id, productId, author, rating, text, media[], verified, helpfulCount }
Order      { id, items[], totals, status, tracking, address, payment }
Cart       { items[{productId, variantId, qty}], applied{coupon}, totals }
Wishlist   { items[productId], boards[] }
User       { id, profile, taste(vector), rewards{ points, level, streak, badges[] }, addresses[] }
SearchIntent (AI) { rawQuery, parsed{ moods[], priceMax, occasion, aesthetic }, results[] }
```

### 6.1 Personalization (taste vector)
A lightweight client-side (Phase 1) taste profile is accumulated from **views, dwell time, saves, quick-views, and purchases**, weighting the mood/aesthetic/price facets. The Discover feed and "Because you saved…" rows are ranked against it. In later phases this moves server-side / to a recommendations service behind the same interface.

---

## 7. State & Persistence Map

| State | Scope | Store | Persistence |
|---|---|---|---|
| Cart | global | Zustand | localStorage (guest) → account on login |
| Wishlist / saves | global | Zustand | localStorage → account |
| Taste vector | global | Zustand | localStorage → account |
| Rewards (points/streak/badges) | global | Zustand | localStorage → account |
| Feed pages / server data | per-query | React Query | cache + prefetch |
| UI (cart open, search open, quick-view) | global | Zustand (ui slice) | ephemeral |
| Recently viewed / Continue Browsing | global | Zustand | localStorage |
| Auth/session | global | provider | cookie/session (later) |

---

## 8. Cross-Cutting IA Rules

- **Every product card** (anywhere) supports: tap → product page, quick-view, double-tap → save, and shows honest signals.
- **Every leaf page** ends with an "**Explore more / Continue browsing**" module feeding the infinite engine.
- **Breadcrumbs** exist for SEO/JSON-LD but are visually minimal (moods/collections context chips rather than heavy trails).
- **Deep links** for moods, collections, drops, products, reels, and search queries are all first-class and shareable.
- **Empty states** (empty cart/wishlist/search) are *discovery launchpads*, never dead ends.

---

*End of Information Architecture. Next: `03-DESIGN-SYSTEM.md`.*
