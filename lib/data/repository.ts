/* ------------------------------------------------------------------ */
/* Repository seam. Phase 1 = in-memory mock. Live adapters (Shopify/   */
/* Sanity/Algolia) implement the same functions later — UI never knows. */
/* ------------------------------------------------------------------ */
import type {
  Product,
  FeedItem,
  FeedPage,
  SearchIntent,
  MoodSlug,
  Aesthetic,
  Review,
} from "./types";
import { PRODUCTS, PRODUCT_BY_SLUG, PRODUCT_BY_ID } from "./seed/products";
import {
  MOODS,
  MOOD_BY_SLUG,
  COLLECTIONS,
  COLLECTION_BY_SLUG,
  CREATORS,
  CREATOR_BY_HANDLE,
  COMMUNITY_SETUPS,
  SETUP_BY_ID,
  TESTIMONIALS,
  DROPS,
  DROP_BY_SLUG,
} from "./seed/content";

/* -------- products -------- */
export const getAllProducts = () => PRODUCTS;
export const getProductBySlug = (slug: string) => PRODUCT_BY_SLUG.get(slug);
export const getProductById = (id: string) => PRODUCT_BY_ID.get(id);
export const getProductsByIds = (ids: string[]) =>
  ids.map((id) => PRODUCT_BY_ID.get(id)).filter(Boolean) as Product[];

export const getTrending = (n = 12) =>
  [...PRODUCTS].sort((a, b) => b.signals.trendingScore - a.signals.trendingScore).slice(0, n);

export const getViral = (n = 6) =>
  PRODUCTS.filter((p) => p.signals.badges.includes("viral")).slice(0, n);

export const getMostSaved = (n = 8) =>
  [...PRODUCTS].sort((a, b) => b.signals.saveCount - a.signals.saveCount).slice(0, n);

export const getNewArrivals = (n = 10) => {
  const fresh = PRODUCTS.filter(
    (p) => p.signals.badges.includes("new") || p.signals.badges.includes("rising")
  );
  const seen = new Set(fresh.map((p) => p.id));
  const rest = PRODUCTS.filter((p) => !seen.has(p.id));
  return [...fresh, ...rest].slice(0, n);
};

export const getDeals = (n = 8) =>
  PRODUCTS.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price)
    .sort((a, b) => (b.compareAtPrice! - b.price) - (a.compareAtPrice! - a.price))
    .slice(0, n);

export const getByMood = (mood: MoodSlug, n = 24) =>
  PRODUCTS.filter((p) => p.moods.includes(mood)).slice(0, n);

/* -------- content -------- */
export const getMoods = () => MOODS;
export const getMood = (slug: string) => MOOD_BY_SLUG.get(slug as MoodSlug);
export const getCollections = () => COLLECTIONS;
export const getCollection = (slug: string) => COLLECTION_BY_SLUG.get(slug);
export const getCreators = () => CREATORS;
export const getCreator = (handle: string) => CREATOR_BY_HANDLE.get(handle);
export const getCommunitySetups = () => COMMUNITY_SETUPS;
export const getSetup = (id: string) => SETUP_BY_ID.get(id);
export const getTestimonials = () => TESTIMONIALS;
export const getDrops = () => DROPS;
export const getDrop = (slug: string) => DROP_BY_SLUG.get(slug);

/* -------- discovery feed (interleaves formats, paginated) -------- */
export function getFeedPage(cursor = 0, pageSize = 12, tasteMoods: MoodSlug[] = []): FeedPage {
  // rank: taste match first, then trending, with deterministic shuffle by cursor
  const ranked = [...PRODUCTS].sort((a, b) => {
    const at = tasteMoods.length ? a.moods.filter((m) => tasteMoods.includes(m)).length : 0;
    const bt = tasteMoods.length ? b.moods.filter((m) => tasteMoods.includes(m)).length : 0;
    if (bt !== at) return bt - at;
    return b.signals.trendingScore - a.signals.trendingScore;
  });

  // rotate by cursor so infinite scroll keeps producing "fresh" pages
  const rotated = ranked
    .map((p, i) => ({ p, i }))
    .sort((a, b) => ((a.i + cursor * 5) % ranked.length) - ((b.i + cursor * 5) % ranked.length))
    .map((x) => x.p);

  const slice = rotated.slice(0, pageSize);
  const items: FeedItem[] = slice.map((product, i) => {
    // interleave a reel every 5th, a setup occasionally
    if ((cursor + i) % 5 === 4) return { kind: "reel", product };
    return { kind: "product", product };
  });
  // splice in a community setup mid-page
  if (COMMUNITY_SETUPS.length) {
    const setup = COMMUNITY_SETUPS[(cursor + 1) % COMMUNITY_SETUPS.length];
    items.splice(Math.min(6, items.length), 0, { kind: "setup", setup });
  }

  const nextCursor = cursor < 6 ? cursor + 1 : cursor < 12 ? cursor + 1 : null; // ~13 pages then stop
  return { items, nextCursor };
}

/* -------- reviews (generated, deterministic) -------- */
const REVIEW_TEXT = [
  "Genuinely exceeded my expectations. Feels twice the price.",
  "Bought it on impulse from the feed and zero regrets. Looks incredible.",
  "The quality is unreal for the price. Everyone who visits asks about it.",
  "Shipping was fast, packaging premium. This brand gets it.",
  "Obsessed. It completely changed the vibe of my space.",
  "Exactly like the photos. Sturdy, minimal, perfect.",
];
const REVIEWERS = [
  ["Ananya S.", "style"], ["Vikram R.", "tech"], ["Priya M.", "coffee"],
  ["Karan T.", "gaming"], ["Nisha B.", "wellness"], ["Arjun D.", "desk"],
] as const;

export function getReviews(product: Product): Review[] {
  const n = 4;
  return Array.from({ length: n }).map((_, i) => {
    const [author] = REVIEWERS[(i + product.id.length) % REVIEWERS.length];
    return {
      id: `${product.id}-r${i}`,
      productId: product.id,
      author,
      avatar: product.images[i % product.images.length],
      rating: i === 3 ? 4 : 5,
      text: REVIEW_TEXT[(i + product.title.length) % REVIEW_TEXT.length],
      verified: true,
      helpful: 3 + ((i * 7) % 40),
      date: "2026-07",
    };
  });
}

/* -------- reels list -------- */
export const getReelProducts = () =>
  [...PRODUCTS].sort((a, b) => b.signals.viewVelocity - a.signals.viewVelocity);

/* -------- mock AI search: real intent behaviour, no model yet -------- */
const MOOD_KEYWORDS: Record<string, MoodSlug> = {
  desk: "minimal-desk", study: "study-setup", work: "wfh", office: "wfh",
  game: "gaming", gaming: "gaming", coffee: "coffee-lover", cozy: "cozy-room",
  travel: "travel", trip: "road-trip", road: "road-trip", pet: "pet-parent",
  fitness: "fitness", gym: "fitness", car: "car-lover", photo: "photography",
  music: "music", student: "student-life", creator: "creator-studio", camera: "photography",
};
const AESTHETIC_KEYWORDS: Record<string, Aesthetic> = {
  aesthetic: "minimal", minimal: "minimal", warm: "warm", cozy: "warm",
  retro: "retro", vintage: "retro", futuristic: "futuristic", natural: "natural",
  wood: "natural", colorful: "colorful", monochrome: "monochrome", black: "monochrome",
};

export function searchIntent(rawQuery: string): SearchIntent {
  const q = rawQuery.toLowerCase();
  const moods = new Set<MoodSlug>();
  const aesthetic = new Set<Aesthetic>();
  for (const [kw, m] of Object.entries(MOOD_KEYWORDS)) if (q.includes(kw)) moods.add(m);
  for (const [kw, a] of Object.entries(AESTHETIC_KEYWORDS)) if (q.includes(kw)) aesthetic.add(a);

  // price: "under 1000", "below ₹500", "₹2000"
  let priceMax: number | undefined;
  const priceMatch = q.match(/(?:under|below|less than|upto|up to|within)\s*₹?\s*(\d{2,6})/) || q.match(/₹\s*(\d{2,6})/);
  if (priceMatch) priceMax = parseInt(priceMatch[1], 10);

  let occasion: string | undefined;
  if (q.includes("gift")) occasion = "gifting";
  if (q.includes("birthday")) occasion = "birthday";

  const moodArr = [...moods];
  const aesArr = [...aesthetic];

  let results = PRODUCTS.filter((p) => {
    const moodOk = moodArr.length === 0 || p.moods.some((m) => moodArr.includes(m));
    const aesOk = aesArr.length === 0 || p.aesthetic.some((a) => aesArr.includes(a));
    const priceOk = priceMax === undefined || p.price <= priceMax;
    return moodOk && aesOk && priceOk;
  });
  if (results.length === 0) results = getTrending(12); // never a dead end

  results = results
    .sort((a, b) => b.signals.trendingScore - a.signals.trendingScore)
    .slice(0, 18);

  const chips: string[] = [];
  moodArr.forEach((m) => chips.push(MOOD_BY_SLUG.get(m)?.label ?? m));
  aesArr.forEach((a) => chips.push(a));
  if (priceMax) chips.push(`under ₹${priceMax}`);
  if (occasion) chips.push(occasion);

  return { rawQuery, parsed: { moods: moodArr, priceMax, occasion, aesthetic: aesArr }, chips, results };
}

/* -------- gamification -------- */
export interface Level { name: string; min: number; }
export const LEVELS: Level[] = [
  { name: "Curious", min: 0 },
  { name: "Explorer", min: 100 },
  { name: "Tastemaker", min: 400 },
  { name: "Connoisseur", min: 1200 },
  { name: "Trendsetter", min: 3000 },
  { name: "Legend", min: 8000 },
];

export function levelFor(points: number) {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) if (points >= LEVELS[i].min) idx = i;
  const current = LEVELS[idx];
  const next = LEVELS[idx + 1];
  const progress = next ? (points - current.min) / (next.min - current.min) : 1;
  return { level: idx + 1, name: current.name, current, next, progress: Math.min(1, progress) };
}

export interface Badge { id: string; name: string; desc: string; icon: string; need: number; metric: "saved" | "points" | "orders" | "moods"; }
export const BADGES: Badge[] = [
  { id: "first-save", name: "First Crush", desc: "Save your first product", icon: "heart", need: 1, metric: "saved" },
  { id: "curator", name: "Curator", desc: "Save 10 products", icon: "bookmark", need: 10, metric: "saved" },
  { id: "hoarder", name: "Wishlist Wizard", desc: "Save 25 products", icon: "sparkles", need: 25, metric: "saved" },
  { id: "taste", name: "Taste Explorer", desc: "Explore 5 moods", icon: "compass", need: 5, metric: "moods" },
  { id: "spender", name: "Big Spender", desc: "Reach 500 points", icon: "flame", need: 500, metric: "points" },
  { id: "buyer", name: "First Order", desc: "Place your first order", icon: "package", need: 1, metric: "orders" },
  { id: "vip", name: "VIP", desc: "Reach 2000 points", icon: "crown", need: 2000, metric: "points" },
  { id: "legend", name: "Legend", desc: "Reach 8000 points", icon: "trophy", need: 8000, metric: "points" },
];

export interface LeaderRow { rank: number; name: string; avatar: string; points: number; you?: boolean; }
export function getLeaderboard(youPoints: number): LeaderRow[] {
  const base = [
    { name: "aesthetic.aanya", pts: 9240 },
    { name: "kabir.plays", pts: 7180 },
    { name: "brewedbyrohan", pts: 5030 },
    { name: "meera.makes", pts: 3890 },
    { name: "desk.diaries", pts: 2110 },
    { name: "cozy.cornerr", pts: 1450 },
  ];
  const rows = base.map((b, i) => ({ name: b.name, points: b.pts, avatar: PRODUCTS[i * 3].image }));
  rows.push({ name: "you", points: youPoints, avatar: PRODUCTS[1].image });
  return rows
    .sort((a, b) => b.points - a.points)
    .map((r, i) => ({ rank: i + 1, name: r.name, avatar: r.avatar, points: r.points, you: r.name === "you" }));
}

/* -------- mock orders -------- */
export interface MockOrder { id: string; date: string; status: "placed" | "packed" | "shipped" | "out" | "delivered"; itemIds: string[]; total: number; }
export function getMockOrders(): MockOrder[] {
  const pick = (n: number) => PRODUCTS.slice(n, n + 2);
  const mk = (id: string, status: MockOrder["status"], off: number, date: string): MockOrder => {
    const items = pick(off);
    return { id, date, status, itemIds: items.map((p) => p.id), total: items.reduce((s, p) => s + p.price, 0) };
  };
  return [
    mk("TMH482910", "shipped", 0, "2026-07-28"),
    mk("TMH471255", "delivered", 6, "2026-07-12"),
  ];
}
export function getOrder(id: string): MockOrder | undefined {
  return getMockOrders().find((o) => o.id === id) ?? { id, date: "2026-08-01", status: "packed", itemIds: [PRODUCTS[0].id, PRODUCTS[4].id], total: PRODUCTS[0].price + PRODUCTS[4].price };
}

/* -------- admin analytics (mock) -------- */
export interface AdminStats {
  revenue: number; orders: number; cvr: number; aov: number;
  discovered: number; visitors: number;
  revenueSeries: number[]; ordersSeries: number[];
}
export function getAdminStats(): AdminStats {
  const revenueSeries = [42, 51, 47, 63, 58, 72, 69, 84, 78, 96, 91, 108].map((n) => n * 1000);
  const ordersSeries = [28, 34, 31, 42, 39, 48, 45, 56, 52, 64, 61, 72];
  return {
    revenue: revenueSeries.reduce((a, b) => a + b, 0),
    orders: ordersSeries.reduce((a, b) => a + b, 0),
    cvr: 3.8, aov: 2140, discovered: 18420, visitors: 24800,
    revenueSeries, ordersSeries,
  };
}

export interface AdminOrder { id: string; customer: string; items: number; total: number; status: string; date: string; }
export function getAdminOrders(): AdminOrder[] {
  const names = ["Aanya K.", "Rohan M.", "Ishita R.", "Kabir S.", "Meera N.", "Aditya P.", "Sana K.", "Devansh M.", "Priya V.", "Arjun D."];
  const statuses = ["Delivered", "Shipped", "Packed", "Placed", "Out for delivery"];
  return names.flatMap((n, i) =>
    [0, 1].map((j) => {
      const k = i * 2 + j;
      const items = 1 + (k % 4);
      return {
        id: "TMH" + (490000 - k * 137),
        customer: n,
        items,
        total: 890 + (k * 617) % 8000,
        status: statuses[k % statuses.length],
        date: `2026-07-${String(28 - (k % 20)).padStart(2, "0")}`,
      };
    })
  );
}

export interface AdminCustomer { name: string; email: string; orders: number; spent: number; level: string; }
export function getAdminCustomers(): AdminCustomer[] {
  const names = ["Aanya Kapoor", "Rohan Mehta", "Ishita Rao", "Kabir Singh", "Meera Nair", "Aditya Patel", "Sana Khan", "Devansh Malhotra", "Priya Verma", "Arjun Desai"];
  return names.map((n, i) => ({
    name: n,
    email: n.toLowerCase().replace(/\s/g, ".") + "@email.com",
    orders: 1 + (i * 3) % 12,
    spent: 1200 + (i * 2137) % 40000,
    level: LEVELS[Math.min(LEVELS.length - 1, Math.floor(i / 2))].name,
  }));
}

export interface AdminCoupon { code: string; type: string; value: string; used: number; limit: number; active: boolean; }
export function getAdminCoupons(): AdminCoupon[] {
  return [
    { code: "WELCOME10", type: "Percent", value: "10%", used: 842, limit: 5000, active: true },
    { code: "DISCOVER50", type: "Flat", value: "₹50", used: 1204, limit: 2000, active: true },
    { code: "FIRSTDROP", type: "Percent", value: "15%", used: 318, limit: 500, active: true },
    { code: "FESTIVE25", type: "Percent", value: "25%", used: 2000, limit: 2000, active: false },
    { code: "FREESHIP", type: "Shipping", value: "Free", used: 560, limit: 1000, active: true },
  ];
}

export interface AdminReview { id: string; product: string; author: string; rating: number; text: string; status: "pending" | "approved"; }
export function getAdminReviews(): AdminReview[] {
  const texts = [
    "Absolutely stunning, feels premium.",
    "Good but shipping was a day late.",
    "Not what I expected — a bit smaller.",
    "Obsessed! Buying another for a gift.",
    "Quality is unreal for the price.",
    "Perfect. Exactly like the photos.",
  ];
  return PRODUCTS.slice(0, 8).map((p, i) => ({
    id: `rv-${p.id}`,
    product: p.title,
    author: ["Aanya", "Rohan", "Ishita", "Kabir", "Meera", "Aditya", "Sana", "Devansh"][i],
    rating: i % 5 === 2 ? 3 : 5,
    text: texts[i % texts.length],
    status: i < 3 ? "pending" : "approved",
  }));
}

/* -------- creator portal (mock) -------- */
export interface CreatorProductStat { id: string; title: string; image: string; price: number; commissionPct: number; sold: number; earned: number; status: "Live" | "Draft"; }
export interface CreatorReferral { id: string; title: string; image: string; clicks: number; conversions: number; earned: number; link: string; }
export interface CreatorPayout { id: string; amount: number; date: string; method: string; status: "Paid" | "Processing"; }
export interface CreatorDashboard {
  earnings: number; thisMonth: number; clicks: number; conversion: number;
  sold: number; balance: number;
  earningsSeries: number[];
  products: CreatorProductStat[];
  referrals: CreatorReferral[];
  payouts: CreatorPayout[];
}

export function getCreatorDashboard(handle = "aesthetic.aanya"): CreatorDashboard {
  const creator = getCreator(handle);
  const owned = creator ? getProductsByIds(creator.pickIds) : getAllProducts().slice(0, 6);
  const list = owned.length ? owned : getAllProducts().slice(0, 6);

  const products: CreatorProductStat[] = list.map((p, i) => {
    const commissionPct = 8 + (i % 5) * 2;
    const sold = 12 + (i * 37) % 220;
    return {
      id: p.id, title: p.title, image: p.image, price: p.price,
      commissionPct, sold,
      earned: Math.round((p.price * commissionPct / 100) * sold),
      status: i === list.length - 1 ? "Draft" : "Live",
    };
  });

  const referrals: CreatorReferral[] = list.slice(0, 5).map((p, i) => {
    const clicks = 240 + (i * 613) % 3400;
    const conversions = Math.round(clicks * (0.03 + (i % 4) * 0.015));
    const commissionPct = 8 + (i % 5) * 2;
    return {
      id: p.id, title: p.title, image: p.image, clicks, conversions,
      earned: Math.round((p.price * commissionPct / 100) * conversions),
      link: `trendmehai.com/p/${p.slug}?ref=${handle}`,
    };
  });

  const earned = products.reduce((n, p) => n + p.earned, 0);
  const payouts: CreatorPayout[] = [
    { id: "PO-2291", amount: 42800, date: "2026-07-01", method: "UPI", status: "Paid" },
    { id: "PO-2188", amount: 38100, date: "2026-06-01", method: "Bank", status: "Paid" },
    { id: "PO-2402", amount: 18600, date: "2026-08-01", method: "UPI", status: "Processing" },
  ];

  return {
    earnings: earned,
    thisMonth: Math.round(earned * 0.22),
    clicks: referrals.reduce((n, r) => n + r.clicks, 0),
    conversion: 4.6,
    sold: products.reduce((n, p) => n + p.sold, 0),
    balance: 18600,
    earningsSeries: [14, 19, 17, 24, 22, 29, 27, 34, 31, 39, 42, 48].map((n) => n * 1000),
    products, referrals, payouts,
  };
}

/* home section list for the admin Homepage Builder */
export interface HomeSection { id: string; label: string; group: string; }
export function getHomeSections(): HomeSection[] {
  return [
    { id: "hero", label: "Hero", group: "Above the fold" },
    { id: "ticker", label: "Live Social-Proof Ticker", group: "Above the fold" },
    { id: "trending", label: "Trending Today", group: "Discovery" },
    { id: "viral", label: "Products Going Viral", group: "Discovery" },
    { id: "moods", label: "Shop by Mood", group: "Discovery" },
    { id: "feed1", label: "Infinite Discover Feed I", group: "Discovery" },
    { id: "statement", label: "Editorial Statement", group: "Editorial" },
    { id: "creators", label: "Creator Picks", group: "Community" },
    { id: "setup", label: "Shoppable Setups", group: "Community" },
    { id: "mostsaved", label: "Most Saved", group: "Discovery" },
    { id: "lifestyle", label: "Explore by Lifestyle", group: "Discovery" },
    { id: "drops", label: "Limited Drops (dark)", group: "Merchandising" },
    { id: "collections", label: "Collections", group: "Merchandising" },
    { id: "deals", label: "Flash Deals", group: "Merchandising" },
    { id: "new", label: "New Arrivals", group: "Merchandising" },
    { id: "categories", label: "Trending Categories", group: "Discovery" },
    { id: "community", label: "Community Setups", group: "Community" },
    { id: "testimonials", label: "Testimonials", group: "Trust" },
    { id: "feed2", label: "Infinite Discover Feed II", group: "Discovery" },
    { id: "newsletter", label: "Newsletter / Join", group: "Conversion" },
  ];
}

export const SEARCH_SUGGESTIONS = [
  "something aesthetic for my study table",
  "a gift under ₹1000",
  "cozy warm lighting for my room",
  "the perfect coffee setup",
  "gaming desk that glows",
  "something minimal and monochrome",
];
