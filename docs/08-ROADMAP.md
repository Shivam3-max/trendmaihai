# TrendMeHai — Implementation Roadmap

> **Version:** 1.0 · The build sequence from empty repo to production, with milestones, exit criteria, and the code-generation order.

---

## 1. Strategy

**Frontend-first, vertical slices, mock-data seam.** We build a fully interactive experience on typed mock data, screen by screen, so every milestone is *demoable and real*. Live integrations slot in behind the repository seam afterward — no UI rewrites. We ship the **spine** (tokens → chrome → home → product → cart → checkout) before breadth (all discovery surfaces, community, gamification), because the spine is what proves the core "discover → desire → buy" loop.

---

## 2. Phases & milestones

### Phase 0 — Foundation (scaffold + design system)
- Next.js + TS + Tailwind + shadcn init; **port 3560**.
- `globals.css` tokens + `tailwind.config.ts` token mapping; fonts (Space Grotesk, Inter, JetBrains Mono, self-hosted Satoshi).
- Providers (Query, Motion, Lenis, Repository, Taste, Toaster); base primitives (`ui/`); `lib/motion/variants.ts`.
- Domain types (`lib/data/types.ts`) + mock repository skeleton + **seed catalogue** (products, moods, collections, creators, setups, reviews).
- **Exit:** app boots on white canvas, tokens/fonts live, a `ProductCard` renders seeded data, reduced-motion respected.

### Phase 1 — The Spine (core buy loop)
1. **Chrome:** Header, BottomTabBar, Footer, AISearchPill, Cart/Wishlist buttons, ProfileMenu.
2. **Home:** all 25 sections (S1–S25), responsive, motion, infinite feed.
3. **Product page:** full storytelling structure + sticky BuyBar + Build Your Setup + no-dead-end tail.
4. **QuickView** (intercepting route) from any card.
5. **Cart** (sheet + `/cart`), **Wishlist** (sheet + `/wishlist`), Zustand persistence.
6. **Checkout** (one-page) + **Order confirmation** (mock order) + celebration.
- **Exit:** a user can discover on home → open product → quick-view → save → add → checkout → confirmation → "keep exploring." Lighthouse ≥95 on home + product.

### Phase 2 — Discovery breadth
- `/discover` (mode switcher), `/reels` full-screen engine, `/moods` + `/moods/[mood]`, `/trending`, `/new`, `/collections` + detail, `/deals`, `/drops` + dark spotlight detail, `/search` (mock AI) + AISearchOverlay.
- Taste vector wired into feeds and "Because you saved…" rows.
- **Exit:** ≥3 discovery formats live and personalized; every surface ends in "explore more."

### Phase 3 — Community, creators, gamification
- `/community` (+ detail + upload), shoppable hotspots/setups, `/creators` (+ storefront).
- Rewards: Explorer Level, streak, points, badges, spin-wheel, treasure hunt, referral leaderboard (`/profile/rewards`).
- Account: `/profile` hub, orders, saved, settings; `/track` order timeline.
- **Exit:** community shoppable setups + full gamification loop demoable.

### Phase 4 — Admin
- Dashboard analytics, orders/products/inventory/customers, coupons, reviews, **Homepage Builder** (drag-drop the 25 sections), landing builder, notifications, marketing, referrals, influencers.
- **Exit:** operator can manage catalogue + reorder home sections against the same data seam.

### Phase 5 — Live integrations (behind the seam)
- Swap mock → live adapters: Shopify (catalogue/checkout), Sanity (content/home), Cloudinary (media), Algolia + Claude (AI search), Razorpay/Stripe (pay), Shiprocket (tracking), GA4/Pixel/Clarity (analytics).
- **Exit:** `NEXT_PUBLIC_DATA_MODE=live` runs the same UI on real data + payments.

### Phase 6 — Hardening
- Full a11y audit (AA), Lighthouse ≥95 across key routes, CWV green on field-like tests, SEO (schema/sitemap/OG) complete, cross-device QA, reduced-motion pass, error/empty/offline states.
- **Exit:** meets the PRD Definition of Done.

---

## 3. Code-generation order (page-by-page, per your instruction)

When we move into code, this is the sequence — each item is a shippable, verifiable slice:

1. Scaffold + tokens + fonts + providers + primitives + seed data (Phase 0).
2. `ProductCard` + `MasonryFeed` (prove the discovery atom).
3. Chrome (Header/BottomTabBar/Footer/search pill).
4. **Home** — build S1→S25 incrementally, verifying each in the browser preview.
5. **Product page** (storytelling) + QuickView.
6. Cart + Wishlist + Checkout + Confirmation.
7. Discover / Reels / Moods / Trending / New / Search.
8. Collections / Deals / Drops.
9. Community / Creators / Gamification / Account / Track.
10. Admin.
11. Live adapters + hardening.

Each coded slice is verified in the running app (port 3560) with screenshots before moving on — no big-bang.

---

## 4. Definition of Done (recap from PRD)
Every IA page exists + responsive + no dead-ends · Discovery Engine across ≥3 formats on real data · storytelling product + quick-view + cart + wishlist + one-page checkout end-to-end · design constraints met (bright canvas, tokens, type, motion) · Lighthouse ≥95, AA a11y, SEO present · reduced-motion honored.

---

## 5. Risks & mitigations
| Risk | Mitigation |
|---|---|
| Motion hurts feed performance | transform/opacity only, virtualize, dynamic-import heavy islands, reduced-motion gate |
| "Addictive" tips into dark patterns | honest signals only, ethical guardrails (PRD §2.3) |
| Scope sprawl (huge feature list) | MoSCoW + phase gates; spine before breadth |
| Live integration churn | repository seam isolates UI from every vendor |
| Bright + premium is hard to keep consistent | token contract + component library discipline |

---

*End of Roadmap. The planning set (docs 01–08) is complete. Next action: begin code at Phase 0.*
