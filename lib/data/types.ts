/* ------------------------------------------------------------------ */
/* TrendMeHai — Domain Models (see docs/02-INFORMATION-ARCHITECTURE.md) */
/* All UI reads these shapes; mock + live repos both satisfy them.     */
/* ------------------------------------------------------------------ */

export type MoodSlug =
  | "minimal-desk"
  | "cozy-room"
  | "gaming"
  | "coffee-lover"
  | "wfh"
  | "study-setup"
  | "travel"
  | "road-trip"
  | "pet-parent"
  | "fitness"
  | "car-lover"
  | "photography"
  | "music"
  | "student-life"
  | "creator-studio";

export type Aesthetic =
  | "minimal"
  | "warm"
  | "monochrome"
  | "colorful"
  | "retro"
  | "futuristic"
  | "natural";

export type Lifestyle =
  | "desk"
  | "kitchen"
  | "bedroom"
  | "car"
  | "outdoor"
  | "tech"
  | "wellness"
  | "style";

export type SignalBadge = "viral" | "rising" | "new" | "editor" | "bestseller";

export interface ProductSignals {
  trendingScore: number; // 0–100
  saveCount: number;
  viewVelocity: number; // saves/day-ish
  stock: number;
  badges: SignalBadge[];
}

export interface ProductVariant {
  id: string;
  option: string; // e.g. "Color"
  value: string; // e.g. "Sand"
  swatch?: string; // hex for color swatch
  price?: number;
  stock?: number;
}

export interface ReviewSummary {
  avg: number;
  count: number;
  distribution: [number, number, number, number, number]; // 1★..5★
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  story: string;
  price: number;
  compareAtPrice?: number;
  currency: "INR";
  image: string; // primary
  images: string[];
  video?: string;
  moods: MoodSlug[];
  lifestyle: Lifestyle[];
  aesthetic: Aesthetic[];
  priceBand: "<500" | "500-1000" | "1000-2000" | "2000-5000" | "5000+";
  signals: ProductSignals;
  variants: ProductVariant[];
  benefits: { icon: string; title: string; text: string }[];
  features: { title: string; text: string; image: string }[];
  faqs: { q: string; a: string }[];
  reviews: ReviewSummary;
  completesWith: string[]; // product ids
  bundleWith: string[];
  alsoBought: string[];
  seo: { title: string; description: string };
  ratio?: number; // masonry aspect hint (h/w)
}

export interface Mood {
  slug: MoodSlug;
  label: string;
  description: string;
  image: string;
  tint: string; // soft banner tint
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  editorial: string;
  image: string;
  productIds: string[];
}

export interface Drop {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  image: string;
  startsAt: string;
  endsAt: string;
  productIds: string[];
}

export interface Creator {
  id: string;
  handle: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  pickIds: string[];
}

export interface CommunitySetup {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  image: string;
  likes: number;
  hotspots: { x: number; y: number; productId: string }[];
  productIds: string[];
}

export interface Bundle {
  id: string;
  title: string;
  source: "curated" | "community" | "creator";
  itemIds: string[];
  bundlePrice: number;
  image: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  verified: boolean;
  helpful: number;
  date: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

/* --- feed items (discovery interleaves formats) --- */
export type FeedItem =
  | { kind: "product"; product: Product }
  | { kind: "reel"; product: Product }
  | { kind: "setup"; setup: CommunitySetup };

export interface FeedPage {
  items: FeedItem[];
  nextCursor: number | null;
}

/* --- AI search intent (mock intelligence in phase 1) --- */
export interface SearchIntent {
  rawQuery: string;
  parsed: {
    moods: MoodSlug[];
    priceMax?: number;
    occasion?: string;
    aesthetic: Aesthetic[];
  };
  chips: string[];
  results: Product[];
}

/* --- cart / wishlist --- */
export interface CartLine {
  productId: string;
  variantId?: string;
  qty: number;
}

/* --- auth (mock, frontend-only) --- */
export interface AuthUser {
  name: string;
  email: string;
  role: "customer" | "creator";
  handle?: string;
  avatar?: string;
}
