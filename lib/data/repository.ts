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

export const SEARCH_SUGGESTIONS = [
  "something aesthetic for my study table",
  "a gift under ₹1000",
  "cozy warm lighting for my room",
  "the perfect coffee setup",
  "gaming desk that glows",
  "something minimal and monochrome",
];
