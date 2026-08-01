# TrendMeHai — Product Requirements Document (PRD)

> **Version:** 1.0
> **Status:** Foundational — approved for build
> **Owner:** Product & Design
> **One-line:** *You don't search. You discover.*

---

## 0. How to read this document

This PRD is the **source of truth** for why TrendMeHai exists, who it serves, what it must do, and how we will know it's working. It deliberately does **not** contain code. It contains decisions. Every later document — Information Architecture, Design System, Page Specs, Component Library, Frontend Architecture, Roadmap — is downstream of the decisions made here.

Reading order for the full project:

1. **`01-PRD.md`** ← you are here (the *why* and *what*)
2. `02-INFORMATION-ARCHITECTURE.md` (the *where* — routes, nav, data model)
3. `03-DESIGN-SYSTEM.md` (the *look* — tokens, type, color, motion)
4. `04-PAGE-SPECS.md` (the *screens* — every page, section by section)
5. `05-COMPONENT-LIBRARY.md` (the *parts* — reusable components + props)
6. `06-INTERACTIONS-AND-ANIMATION.md` (the *feel* — micro-interactions, motion choreography)
7. `07-FRONTEND-ARCHITECTURE.md` (the *how* — stack, folders, state, data)
8. `08-ROADMAP.md` (the *when* — phased delivery)

---

## 1. Vision & Positioning

### 1.1 The one-sentence vision
TrendMeHai is a **discovery-first commerce experience** where shopping feels like scrolling Instagram, not searching Amazon — a place people open out of boredom and leave having found three things they didn't know they wanted.

### 1.2 The problem we're actually solving
Traditional e-commerce is built around **intent**: the user already knows what they want, types it into a search box, compares a grid of near-identical results, and leaves. This is efficient and joyless. It also caps growth — you can only sell what people already know to ask for.

The most valuable minutes of a modern consumer's attention don't go to Amazon. They go to **feeds** — Instagram, TikTok, Pinterest, Netflix — because feeds manufacture *desire* rather than merely *serving* it. These platforms have trained a generation to expect: infinite content, zero dead-ends, personalization that feels like magic, and a dopamine rhythm of "just one more."

**The gap:** none of that engagement machinery has been properly married to a *checkout*. Instagram makes you want things but sends you elsewhere to buy them. Amazon lets you buy but kills the wanting.

**TrendMeHai closes that gap.** We take the engagement mechanics of a content feed and put a frictionless purchase at the end of every spark of desire.

### 1.3 Positioning statement
> For **Gen-Z and millennial shoppers** who browse for entertainment, TrendMeHai is a **product-discovery destination** that turns idle scrolling into effortless buying. Unlike **Amazon** (search-and-leave) or **Instagram Shopping** (desire without a checkout), TrendMeHai makes **discovery, delight, and purchase a single continuous experience.**

### 1.4 Who we benchmark against (and why)
We do **not** benchmark against other Shopify stores. Our competitive set is the set of apps fighting for the same *attention*:

| Benchmark | What we steal | What we do differently |
|---|---|---|
| **Instagram** | The feed rhythm, double-tap-to-save, stories format, reels | Every item is instantly buyable; saving builds a real cart, not a vanity board |
| **Pinterest** | Masonry discovery, "more like this," mood boards | Boards convert to buyable "setups"; discovery is monetized end-to-end |
| **TikTok** | Full-screen vertical product reels, algorithmic "For You," addictive loop | The loop terminates in a 1-tap buy, not a like |
| **Netflix** | Row-based recommendation shelves, "because you watched," cinematic tiles | Rows are shoppable collections, not passive content |
| **Apple Store** | Editorial calm, product-as-hero, generous whitespace, premium restraint | Same restraint, but with a living, personalized feed underneath |
| **Nothing.tech** | Confident minimalism, monospace numerics, distinctive personality | Warmth + playfulness layered on top of the minimalism |

### 1.5 Brand philosophy (non-negotiable)
- **"You don't search. You discover."** Search exists but is the *escape hatch*, not the front door.
- Every product should create **curiosity**.
- Every page should encourage **exploration** — no dead-ends, ever.
- Every interaction should raise **dopamine**, ethically.
- Shopping should become **entertainment**.

### 1.6 Brand personality
Minimal · Premium · Modern · Playful · Creative · Confident · Trustworthy · Gen-Z · Millennial · Tech-inspired. Apple-level simplicity, Nothing-style aesthetics, Pinterest inspiration, TikTok engagement.

---

## 2. Goals, Non-Goals & Guardrails

### 2.1 Product goals (in priority order)
1. **Make discovery the default.** A first-time visitor with no query should be delighted within 5 seconds and browsing within 15.
2. **Maximize products-viewed-per-session** without feeling manipulative.
3. **Convert desire to cart instantly** — remove every gram of friction between "I want that" and "it's mine."
4. **Build a returning habit** — a reason to open the app when you have nothing specific to buy.
5. **Feel expensive.** The experience quality must read as a premium lifestyle brand, not a discount marketplace.

### 2.2 Non-goals (things we deliberately will NOT do)
- We will **not** build an Amazon-style dense catalogue with faceted-search-as-homepage.
- We will **not** clutter the UI with banners, countdown-everywhere urgency spam, or aggressive interstitials.
- We will **not** use dark, heavy backgrounds as the site's base canvas (see Design Language, §7).
- We will **not** ship dark patterns (fake scarcity, hidden costs, confirm-shaming). Trust is a growth lever, not a cost.
- We will **not** gate discovery behind login. Browsing is open; the account deepens it.

### 2.3 Ethical guardrails on "addictive"
"Addictive" is a design target for *quality of experience*, not for compulsion. Our rules:
- Gamification rewards **exploration and taste**, never overspending.
- Scarcity/urgency signals must be **true** (real stock, real drop timers).
- Streaks and badges celebrate **discovery**, and never punish absence with guilt.
- Every "live purchase" / "trending" signal reflects **real data** (or, in the demo phase, clearly-seeded mock data — never fabricated social proof presented as real once we have real users).

---

## 3. Target Audience & Personas

### 3.1 Primary segment
Urban Indian (and India-diaspora) **Gen-Z + young millennials, 18–34**, mobile-first, socially fluent, aesthetically literate, price-aware but willing to pay for delight and design. Currency: **₹ (INR)**. Payment reality: **COD matters**, UPI dominant, cards secondary.

### 3.2 Personas

**Persona A — "The Scroller" (Aanya, 22, student)**
- Opens apps out of boredom, not intent. Lives on Instagram/TikTok.
- Buys aesthetic desk/room items, gifts, trending gadgets under ₹1,500.
- Wants: entertainment, novelty, shareability, low commitment.
- Success for her: found something cute, saved a few, bought one on impulse, felt good.

**Persona B — "The Setup Builder" (Rohan, 27, WFH professional)**
- Has a project: build the perfect desk / gaming / coffee corner.
- Wants: curated *complete setups*, not to assemble 20 items himself.
- Success for him: "Build Your Setup" and shoppable community rooms let him buy a whole vibe in a few taps.

**Persona C — "The Gifter" (Meera, 30)**
- Recurring need: thoughtful gifts under a budget, fast.
- Wants: AI that understands "aesthetic gift under ₹1000 for a coffee lover."
- Success for her: AI search + Gift Genie surfaces 5 perfect options instantly.

**Persona D — "The Creator/Community member" (Kabir, 24)**
- Posts his setups, follows creators, wants status and rewards.
- Wants: to be featured, earn badges/points, influence others, unlock drops.
- Success for him: community upload → featured → referral leaderboard → perks.

### 3.3 Jobs To Be Done (JTBD)
- *When I'm bored,* I want effortless novelty, *so I feel entertained (and maybe find something).*
- *When I'm building a space,* I want a curated complete setup, *so I don't have to research 20 products.*
- *When I need a gift fast,* I want a smart shortlist to a brief, *so I look thoughtful without effort.*
- *When I find something I love,* I want to own it in one tap, *so the desire doesn't fade.*
- *When I come back,* I want it to remember my taste, *so it feels made for me.*

---

## 4. Core Experience Pillars

Everything we build must serve one of these five pillars. If a feature serves none, we cut it.

1. **Discovery Engine** — the beating heart. An infinite, personalized, multi-format feed (masonry + reels + rows + stories) that never dead-ends. *This is the single most important system in the product.*
2. **Storytelling Product Pages** — products sold through narrative, video, lifestyle, and social proof, always flowing outward to "explore more."
3. **Frictionless Buying** — instant add, quick-buy, one-page checkout, COD, saved everything.
4. **Delight & Play** — micro-interactions, gamification, mystery, rewards, taste-building.
5. **Community & Creators** — user setups, creator picks, shoppable rooms, social proof, status.

---

## 5. Feature Requirements

Each feature carries a **MoSCoW priority** (Must / Should / Could / Won't-yet) and a one-line **UX rationale** and **business rationale**.

### 5.1 Discovery & Feed (Pillar 1)

| # | Feature | Priority | UX rationale | Business rationale |
|---|---|---|---|---|
| D1 | **Infinite Discover Feed** (mixed-format: masonry, reels, rows) | Must | Removes the "end," sustains flow state | ↑ products/session, ↑ session length |
| D2 | **TikTok-style vertical Product Reels** (full-screen, swipe) | Must | Native mobile gesture language, immersive | ↑ engagement, ↑ impulse buys |
| D3 | **Netflix-style recommendation rows** ("Because you saved…") | Must | Familiar, scannable, personalized | ↑ relevance → ↑ CTR |
| D4 | **Pinterest masonry grid** with "more like this" | Must | Visual, low-friction browsing | ↑ breadth of discovery |
| D5 | **Horizontal Product Stories** (tap-through, timed) | Should | Snackable, familiar from IG stories | ↑ novelty, ↑ daily-open habit |
| D6 | **Shop by Mood** (mood → curated feed) | Must | Matches how people actually think ("cozy," "gaming") | ↑ curated conversion, differentiator |
| D7 | **Random Finds / Treasure Hunt** (serendipity mode) | Should | Manufactures surprise & delight | ↑ session length, shareability |
| D8 | **"Continue Browsing"** resume rail | Should | Zero-friction return to flow | ↑ return conversion |
| D9 | **Personalization engine** (taste vector from saves/views/dwell) | Must | Feed must feel "made for me" | Core retention moat |

### 5.2 Product & Merchandising (Pillar 2)

| # | Feature | Priority | UX rationale | Business rationale |
|---|---|---|---|---|
| P1 | **Storytelling Product Page** (video-led, editorial) | Must | Sells the feeling, not the spec sheet | ↑ conversion, ↑ AOV |
| P2 | **Quick-View modal** (buy without leaving feed) | Must | Keeps the flow intact | ↓ friction, ↑ add-rate |
| P3 | **Build Your Setup** (product → completes the set) | Must | Turns 1 item into a basket | ↑ AOV, ↑ units/order |
| P4 | **People Also Bought / Hidden Recommendations** | Must | No dead-ends, always a next step | ↑ products/session |
| P5 | **Bundles & Kits** | Should | Pre-curated value | ↑ AOV |
| P6 | **Comparison view** (2–3 products side-by-side) | Should | Reduces decision paralysis | ↑ conversion on considered buys |
| P7 | **Trending Score / Popularity / Stock meters** | Must | Honest social proof + urgency | ↑ trust + ↑ conversion |
| P8 | **Limited Drops** (timed, exclusive) | Should | Scarcity & event energy | ↑ peak traffic, ↑ FOMO conversion |

### 5.3 Search & AI (escape hatch + magic)

| # | Feature | Priority | UX rationale | Business rationale |
|---|---|---|---|---|
| S1 | **AI natural-language search** ("something aesthetic for my study table") | Must | Meets intent when it exists, in human language | Captures high-intent tail |
| S2 | **Instant/typeahead results + query suggestions** | Must | Speed = perceived quality | ↑ search conversion |
| S3 | **Trend Genie** (AI trend concierge) | Could | On-brand personality, guided discovery | Engagement, differentiation |
| S4 | **Gift Recommendation AI** | Should | Solves a real recurring JTBD | ↑ occasion-driven conversion |
| S5 | **Image / visual search** | Could | "Find me this" from a photo | Novelty, future moat |
| S6 | **AI Bundle Generator / Budget Planner** | Could | "₹5000 to make my desk aesthetic" | ↑ AOV, delight |
| S7 | **Room Visualizer** | Won't-yet | High cost, later phase | — |

> **AI implementation note:** In the frontend-first phase, AI features are powered by **structured mock intelligence** — curated intent→result mappings, tag matching, and scripted concierge responses — engineered so the *interaction* is fully real even before a live model is wired. The seam is abstracted so a real model (Claude) can replace the mock without UI changes.

### 5.4 Shopping Modes
Normal · Mood · Budget · Lifestyle · Creator · Seasonal · AI · Mystery · Trending. **Priority:** Normal/Mood/Trending = Must; Budget/AI/Mystery = Should; Lifestyle/Creator/Seasonal = Could. Each mode is a *lens* over the same catalogue, not a separate store.

### 5.5 Gamification & Rewards (Pillar 4)

| # | Feature | Priority | UX rationale | Business rationale |
|---|---|---|---|---|
| G1 | **Discovery badges & Explorer Level** | Should | Progress = reason to return | ↑ retention |
| G2 | **Daily streak** | Should | Habit formation | ↑ DAU |
| G3 | **Points & rewards** | Should | Tangible value for engagement | ↑ LTV |
| G4 | **Spin wheel / Mystery product / Hidden deals** | Could | Surprise, dopamine, playfulness | ↑ delight, ↑ email capture |
| G5 | **Referral leaderboard** | Should | Viral loop | ↓ CAC |

### 5.6 Community & Creators (Pillar 5)

| # | Feature | Priority | UX rationale | Business rationale |
|---|---|---|---|---|
| C1 | **Shoppable community setups** (buy the whole room) | Must | Aspiration → basket | ↑ AOV, ↑ UGC content supply |
| C2 | **Creator Picks / Creator storefronts** | Should | Trust transfer, curation | ↑ conversion, influencer channel |
| C3 | **UGC upload** (desk/gaming/decor/car/kitchen) | Should | Free content engine, status | ↓ content cost, ↑ community |
| C4 | **Customer videos & verified reviews** | Must | Authentic proof | ↑ trust, ↑ conversion |

### 5.7 Cart, Checkout & Trust (Pillar 3)

| # | Feature | Priority | UX rationale | Business rationale |
|---|---|---|---|---|
| X1 | **Persistent slide-over cart** | Must | Never lose the flow | ↓ abandonment |
| X2 | **Wishlist / Saves** (double-tap) | Must | Low-commitment desire capture | ↑ return conversion |
| X3 | **One-page premium checkout** | Must | Speed + calm = completion | ↑ checkout conversion |
| X4 | **COD + UPI + cards** | Must | Matches Indian payment reality | ↑ addressable buyers |
| X5 | **Checkout upsells / bundles** | Should | Last-moment AOV | ↑ AOV |
| X6 | **Trust system** (COD, returns, secure, fast delivery, verified reviews, live purchases) | Must | Reduces first-purchase anxiety | ↑ new-buyer conversion |
| X7 | **Order tracking** | Must | Post-purchase confidence | ↓ support load, ↑ repeat |

### 5.8 Admin (operator surface)
Analytics · Orders · Products · Customers · Coupons · Inventory · Reviews · Content · **Homepage Builder** · Landing Pages · Push Notifications · Marketing · Referral System · Influencer Management. **Priority for build:** Analytics/Orders/Products/Inventory = Must; the rest = Should/Could. Admin is designed but built *after* the storefront MVP.

---

## 6. User Journeys (end-to-end)

### 6.1 The Bored Scroller (primary, no-intent)
1. Lands on home → animated hero sparks curiosity in <5s.
2. Scrolls into the **Infinite Discover Feed** → mixed formats keep it fresh.
3. Double-taps to **save** two items (tiny delightful animation, saved to a live wishlist).
4. Opens a **Product Reel** → swipes through 4 products full-screen.
5. Taps **Quick-View** on one → **Add to Cart** without leaving the reel.
6. "**Complete the setup**" suggests 2 companions → adds one.
7. Slide-over cart → **one-page checkout** → COD → done.
8. Post-purchase: "**People with your taste also loved…**" → back into the feed. *No dead-end.*

### 6.2 The Setup Builder (project-driven)
Home → **Shop by Mood: "Minimal Desk"** → curated feed → a **community desk setup** he loves → "**Buy this entire setup**" (6 items, one basket, bundle discount) → checkout.

### 6.3 The Gifter (intent + AI)
Opens **AI search** → types *"aesthetic gift under ₹1000 for a coffee lover"* → 5 tailored results + a **Gift Genie** bundle → adds → gift-note at checkout → tracked.

### 6.4 The Returning Habit (retention)
Opens app → **Continue Browsing** rail + **Daily streak +1** + **"New drops in your moods"** → feels remembered → browses → converts on a **Limited Drop**.

### 6.5 The Creator (community/status)
Uploads a gaming-room setup → tagged as shoppable → featured in **Community** → earns a badge + climbs **referral leaderboard** → unlocks an exclusive drop.

Detailed step-by-step journeys with screen states live in `04-PAGE-SPECS.md`.

---

## 7. Design Language & Constraints (binding)

These are hard constraints that override any conflicting instinct later.

### 7.1 The canvas is BRIGHT
- Primary background: **pure white `#FFFFFF`** / off-white **`#FAFAFA`**.
- **No dark backgrounds** as the site's base. Dark is reserved for **typography, icons, and select premium "spotlight" sections** (e.g. a single cinematic drop section), used sparingly for contrast, never as the default canvas.
- Editorial, airy, luxurious — the visual quality bar of **Apple Store, Linear, Notion, MUJI, COS, Nothing, Stripe, Vercel.**
- **Products are the hero.** The UI recedes so product imagery pops against white.

### 7.2 Color system (tokens)
| Token | Value |
|---|---|
| Background / Primary | `#FFFFFF` |
| Background / Secondary | `#FAFAFA` |
| Card | `#FFFFFF` |
| Text / Primary | `#111111` |
| Text / Secondary | `#5F6368` |
| Text / Muted | `#8A8A8A` |
| Accent / Primary | `#2563EB` |
| Accent / Secondary | `#7C3AED` |
| Success | `#16A34A` |
| Warning | `#F59E0B` |
| Error | `#DC2626` |
| Border | `#ECECEC` |
| Divider | `#F3F4F6` |
| Hover surface | `#F8F8F8` |
| Shadow | very soft, near-invisible, premium elevation only — **never harsh** |

### 7.3 Visual style rules
- Minimal, editorial, luxury, airy, elegant, bright.
- Avoid unnecessary gradients; avoid colorful backgrounds; avoid excessive glassmorphism (use only where genuinely appropriate).
- Rounded corners **12–20px**.
- Generous whitespace everywhere. Eyes should glide product-to-product without fatigue.
- Exceptional spacing, type hierarchy, and alignment on **every** section.

### 7.4 Typography
- **Headings:** Space Grotesk
- **Subheadings:** Satoshi
- **Body:** Inter
- **Numbers/metrics:** JetBrains Mono
- **Buttons:** semi-bold, large, generous hit areas.

### 7.5 Icons
Lucide — minimal, rounded, consistent stroke width.

### 7.6 Motion
Framer Motion as the default; GSAP only where genuinely required (complex scroll choreography, pinning). Page transitions, card hover, image zoom, scroll reveals, magnetic buttons, cursor effects, text reveals, product reveals, smooth scrolling — everything buttery, ~60fps, respectful of `prefers-reduced-motion`.

Full tokens, scales, and motion specs: `03-DESIGN-SYSTEM.md`.

---

## 8. Platform & Responsiveness

- **Mobile-first.** The mobile experience should feel like **Instagram**: swipe, double-tap-to-save, hold-to-preview, gesture-based, thumb-friendly, one-handed. Bottom nav + bottom sheets.
- **Tablet:** adaptive multi-column, hybrid touch/pointer.
- **Desktop:** editorial widescreen, magnetic cursor affordances, richer hover states, multi-column feeds.
- Every section is specified for **desktop / tablet / mobile** in `04-PAGE-SPECS.md`.

---

## 9. Technical Direction (summary; full detail in doc 07)

**Stack (target production):** Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion · GSAP (selective) · React Query · Zustand · Shopify Storefront API · Sanity CMS · Cloudinary · Algolia · Stripe · Razorpay · Shiprocket · GA4 · Meta Pixel · Clarity.

**Build philosophy — frontend-first with a swappable data seam:**
- Phase 1 ships the full experience against a **typed mock data layer** (seeded catalogue, mock AI, mock personalization) behind a repository interface, so every screen is real and interactive immediately.
- Integrations (Shopify, Sanity, Algolia, payments, Shiprocket) slot in behind that seam **without UI rewrites**.
- Rendering: **Server Components** for shells/SEO, Client Components for the interactive feed/motion. Aggressive code-splitting and lazy-loading.

**Local dev port:** `3560`.

---

## 10. SEO, Performance & Accessibility (acceptance-level)

- **Performance:** Lighthouse **> 95**; Core Web Vitals green (LCP < 2.5s, CLS < 0.1, INP < 200ms). Image optimization (Next/Image + Cloudinary), lazy-loading, code-splitting, minimal main-thread work in the feed (virtualized where needed).
- **SEO:** per-page metadata, OpenGraph/Twitter cards, JSON-LD schema (`Product`, `Offer`, `AggregateRating`, `BreadcrumbList`, `Organization`), sitemap, canonicals, semantic HTML.
- **Accessibility:** WCAG 2.1 AA — keyboard operable, visible focus, ARIA for custom widgets (carousels, reels, modals), color-contrast pass on the bright palette, `prefers-reduced-motion` honored, alt text on all product media.

---

## 11. Success Metrics (how we know it's working)

**North-Star Metric:** **Products Discovered per Session** (unique product detail-equivalent views), because it captures the discovery habit that drives both conversion and retention.

**Supporting KPIs**
- *Engagement:* avg session duration, scroll depth, products/session, feed return rate.
- *Discovery quality:* save-rate, quick-view rate, "explore more" click-through, % sessions using ≥2 discovery formats.
- *Conversion:* add-to-cart rate, cart→checkout, checkout completion, overall CVR.
- *Value:* AOV, units/order, bundle/setup attach rate.
- *Retention:* D1/D7/D30 return, daily streak participation, wishlist→purchase conversion.
- *Trust/quality:* Lighthouse ≥95, CWV green, return rate (product), review submission rate.
- *Virality:* referral shares, community uploads, creator-attributed sales.

**Guardrail metrics** (must NOT worsen): checkout error rate, support tickets/order, product return rate, page weight, accessibility violations = 0 criticals.

---

## 12. Assumptions & Open Questions

**Assumptions (proceeding on these):**
- Market = India, currency ₹, COD required, mobile-first.
- Phase 1 is a **frontend showcase on mock data**; backend/commerce integrations follow.
- Catalogue is **lifestyle/trending goods** (desk, room, gadgets, gifting, gaming, coffee, etc.).

**Open questions (to confirm, non-blocking):**
1. Real Shopify store + product feed timing — do we integrate in Phase 2 or ship a longer mock phase?
2. Live AI model (Claude) budget for AI search/genie — mock now, wire when approved.
3. Brand accent: keep blue `#2563EB` / violet `#7C3AED` as accents, or introduce a signature brand hue? (Proceeding with the given palette.)
4. Logo/wordmark treatment for "TrendMeHai" — to be designed in the Design System pass.

None of these block Phase 1. Defaults chosen above.

---

## 13. Definition of Done (Phase 1)

- Every page in the IA exists, is responsive (mobile/tablet/desktop), and has **no dead-ends**.
- The Discovery Engine works across ≥3 formats (feed, reels, rows) on real (mock) data.
- Storytelling product page, quick-view, cart, wishlist, and one-page checkout all function end-to-end on mock data.
- Design language constraints (bright canvas, tokens, type, motion) are met everywhere.
- Lighthouse ≥ 95, AA accessibility, SEO metadata/schema present.
- Motion honors `prefers-reduced-motion`.

---

*End of PRD. Next: `02-INFORMATION-ARCHITECTURE.md`.*
