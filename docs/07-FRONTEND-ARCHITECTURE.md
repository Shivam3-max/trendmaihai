# TrendMeHai — Frontend Architecture & Folder Structure

> **Version:** 1.0 · Downstream of all prior docs.
> **Purpose:** How the code is organized, how data flows, how the mock→live seam works, rendering strategy, and the exact folder structure to build against.

---

## 1. Stack & rationale

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router)** + **TypeScript** | RSC for SEO/perf, file routing, intercepting routes for quick-view |
| Styling | **Tailwind CSS** + CSS tokens | token-driven, fast, consistent |
| Components | **shadcn/ui** (Radix) | accessible primitives we restyle to brand |
| Motion | **Framer Motion** (+ **GSAP/ScrollTrigger** selective) | declarative micro-motion + heavy scroll choreography |
| Smooth scroll | **Lenis** | premium desktop scrolling |
| Server state | **React Query (TanStack)** | caching, infinite queries, prefetch |
| Client state | **Zustand** | cart/wishlist/taste/ui slices, persisted |
| Data (commerce) | **Shopify Storefront API** (seam) | products/checkout later |
| CMS | **Sanity** (seam) | home sections, editorial, moods, drops |
| Media | **Cloudinary** + next/image | optimization, transforms |
| Search | **Algolia** + AI layer (seam) | instant + NL search later |
| Payments | **Razorpay** (India) + **Stripe** (seam) | UPI/COD + cards |
| Fulfilment | **Shiprocket** (seam) | tracking |
| Analytics | **GA4 · Meta Pixel · Clarity** (seam) | measurement |

**Guiding principle — the swappable data seam:** every external dependency sits behind a **repository interface**. Phase 1 uses a mock implementation; later phases swap in live adapters with **zero UI changes**.

---

## 2. Rendering strategy

- **Server Components (default):** page shells, SEO metadata/JSON-LD, static/editorial content, initial feed page, product page shell. Fast first paint, indexable.
- **Client Components (`"use client"`):** the interactive feed, reels, quick-view, cart/wishlist, search overlay, motion-driven sections, gamification.
- **Streaming + Suspense:** stream sections; skeletons as fallbacks; keep hero as LCP priority.
- **Caching:** RSC data cached/revalidated (ISR-style) for catalogue/editorial; React Query for client infinite feeds and mutations.
- **Code-splitting:** heavy islands (reels, spin-wheel, GSAP, before/after) dynamically imported; GSAP loaded only where used.

---

## 3. The data seam (repository pattern)

```
lib/data/
  repository.ts          // interfaces: ProductRepo, FeedRepo, SearchRepo, CartRepo,
                         //   CollectionRepo, MoodRepo, DropRepo, CommunityRepo,
                         //   CreatorRepo, ReviewRepo, OrderRepo, RewardsRepo
  index.ts               // getRepository(): picks impl by env flag
  mock/                  // Phase 1 implementations
    products.mock.ts     // seeded catalogue (typed)
    feed.mock.ts         // ranking + interleave + pagination
    search.mock.ts       // "AI" intent parsing → results (mock intelligence)
    ...
  live/                  // Phase 2+ adapters
    shopify.product.ts
    sanity.content.ts
    algolia.search.ts
    ...
  types.ts               // domain models (IA §6)
  seed/                  // seed data + generators (products, reviews, setups, creators)
```
- UI/components import **only** from `repository.ts` interfaces via hooks (`useFeed`, `useProduct`, `useSearch`…). They never know if data is mock or live.
- `getRepository()` returns mock or live impl based on `NEXT_PUBLIC_DATA_MODE`.
- **Mock AI** (`search.mock.ts`, `genie.mock.ts`) implements real intent→result behavior (tag/price/mood matching + scripted concierge) so the UX is genuine pre-model; a Claude adapter drops in later behind `SearchRepo`.

---

## 4. State architecture (Zustand slices)

```
store/
  cart.store.ts       // items, totals, coupon; persist(localStorage); actions add/remove/qty
  wishlist.store.ts   // saves, boards; persist
  taste.store.ts      // taste vector; record(view|save|dwell|buy); rank(products)
  rewards.store.ts    // points, level, streak, badges; persist
  ui.store.ts         // cartOpen, searchOpen, quickView, activeMode (ephemeral)
  recent.store.ts     // recently viewed / continue-browsing; persist
```
- Persisted slices hydrate on mount (guest) and merge to the account on login (later).
- React Query owns *server* state (feeds, product, search); Zustand owns *client* state. No overlap.

---

## 5. Folder structure (App Router)

```
trendmehai/
  app/
    layout.tsx                      // root: fonts, providers, chrome
    globals.css                     // tokens + tailwind layers
    page.tsx                        // HOME (composes S1–S25 section components)
    (shop)/
      trending/page.tsx
      new/page.tsx
      discover/page.tsx
      reels/page.tsx
      reels/[id]/page.tsx
      moods/page.tsx
      moods/[mood]/page.tsx
      collections/page.tsx
      collections/[slug]/page.tsx
      deals/page.tsx
      drops/page.tsx
      drops/[slug]/page.tsx
      creators/page.tsx
      creators/[handle]/page.tsx
      community/page.tsx
      community/[id]/page.tsx
      community/upload/page.tsx
      product/[slug]/page.tsx
      search/page.tsx
    (commerce)/
      cart/page.tsx
      wishlist/page.tsx
      checkout/page.tsx
      order/confirmation/[id]/page.tsx
      track/page.tsx
      track/[id]/page.tsx
    (account)/
      profile/page.tsx
      profile/orders/page.tsx
      profile/rewards/page.tsx
      profile/saved/page.tsx
      profile/settings/page.tsx
    (content)/
      about/page.tsx
      support/page.tsx
    @modal/                         // parallel route for intercepting overlays
      (.)product/[slug]/page.tsx    // QuickView intercept
      (.)search/page.tsx
      default.tsx
    admin/                          // built after MVP
      layout.tsx
      page.tsx
      orders/ products/ customers/ coupons/ reviews/ content/
      homepage-builder/ landing/ notifications/ marketing/ referrals/ influencers/
    sitemap.ts  robots.ts  manifest.ts
    api/                            // route handlers (mock endpoints now)
      feed/route.ts  search/route.ts  ...
  components/
    ui/                             // primitives (shadcn, restyled)
    commerce/                       // Price, StockMeter, SaveButton, QtyStepper, VariantSwatch...
    cards/                          // ProductCard, ReelCard, MoodTile, ...
    discovery/                      // MasonryFeed, DiscoveryModeSwitcher, ProductRail, Reels...
    product/                        // gallery, buybar, build-your-setup, comparison, reviews...
    overlays/                       // AISearchOverlay, QuickView, CartSheet, WishlistSheet, AuthSheet
    chrome/                         // Header, BottomTabBar, Footer, SectionHeader, EditorialStatement
    sections/                       // Home S1–S25 section components
    gamification/                   // SpinWheel, ExplorerLevelRing, BadgeUnlock, StreakChip
    providers/                      // Motion, Lenis, Taste, Repository, Query, Toaster, Analytics
  lib/
    data/                           // repository seam (see §3)
    motion/                         // variants.ts (shared), useMagnetic, useParallax, useReveal
    hooks/                          // useFeed, useProduct, useSearch, useCart, useWishlist...
    analytics/                      // events seam (GA4/Pixel/Clarity)
    seo/                            // metadata + JSON-LD builders
    utils/                          // formatPrice(₹), cn, ids, etc.
  store/                            // Zustand slices (see §4)
  content/                          // MDX/editorial (about), fallback copy
  public/                           // fonts (Satoshi woff2), icons, static media
  styles/                           // tokens.css (if split from globals)
  tailwind.config.ts
  next.config.ts
  tsconfig.json
  package.json
```

---

## 6. Styling & tokens integration

- `globals.css` declares CSS custom properties (Design System §2–§8) on `:root`; a `[data-surface="spot"]` scope remaps to dark spotlight tokens.
- `tailwind.config.ts` extends `colors/spacing/radius/boxShadow/fontFamily/fontSize` to read the tokens — utilities stay token-driven; **no raw hex/px in components**.
- Fonts via `next/font` (Space Grotesk, Inter, JetBrains Mono) + self-hosted Satoshi (`public/fonts` + `@font-face`), all `display: swap`, subset, `font-display` optimized.

---

## 7. Performance plan (Lighthouse ≥95, CWV green)

- Server-render shells; stream sections; hero = LCP priority image/poster.
- Virtualize long feeds/rails; IntersectionObserver pagination; prefetch next page + hovered product routes.
- next/image + Cloudinary (AVIF/WebP, responsive `sizes`, blur placeholders); lazy below fold; pause off-screen video.
- Dynamic-import heavy islands (reels engine, GSAP, spin-wheel, before/after).
- Minimize client JS: RSC by default; motion only where needed; tree-shake Lucide (per-icon imports).
- Reserve space for all async content (zero CLS); font-display swap with metrics-adjusted fallbacks.

---

## 8. SEO & accessibility plumbing

- `lib/seo`: per-route `generateMetadata` (title/description/OG/Twitter), canonical; JSON-LD builders (`Product`, `Offer`, `AggregateRating`, `BreadcrumbList`, `Organization`, `ItemList` for collections).
- `app/sitemap.ts` + `robots.ts` from the catalogue repo; `manifest.ts` for PWA-lite installability.
- Accessibility: semantic landmarks, focus management in overlays, ARIA for carousels/reels/tabs/dialogs, `prefers-reduced-motion` gate in `MotionProvider`, contrast enforced by tokens.

---

## 9. Analytics & measurement seam

- `lib/analytics/track(event, payload)` fans out to GA4 / Meta Pixel / Clarity behind one interface; events: `product_view`, `save`, `quick_view`, `add_to_cart`, `begin_checkout`, `purchase`, `discover_scroll`, `mode_switch`, plus the **North-Star `product_discovered`**.
- No PII in URLs; consent-aware loading of pixels.

---

## 10. Environments & config

- `NEXT_PUBLIC_DATA_MODE = mock | live` toggles the repository.
- Integration keys (Shopify/Sanity/Algolia/Razorpay/Stripe/Shiprocket/GA4/Pixel/Clarity) in env, read only by `live/` adapters.
- Local dev on **port 3560** (`next dev -p 3560`).

---

*End of Frontend Architecture. Next: `08-ROADMAP.md`.*
