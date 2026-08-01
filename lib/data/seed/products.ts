import type {
  Product,
  MoodSlug,
  Aesthetic,
  Lifestyle,
  SignalBadge,
} from "../types";
import { pickImages, type ImgTheme } from "./images";

/* Deterministic pseudo-random so the catalogue is stable across renders. */
function rng(seed: number) {
  let s = seed + 1;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function priceBand(p: number): Product["priceBand"] {
  if (p < 500) return "<500";
  if (p < 1000) return "500-1000";
  if (p < 2000) return "1000-2000";
  if (p < 5000) return "2000-5000";
  return "5000+";
}

interface Blueprint {
  title: string;
  subtitle: string;
  price: number;
  compareAt?: number;
  theme: ImgTheme;
  moods: MoodSlug[];
  lifestyle: Lifestyle[];
  aesthetic: Aesthetic[];
  badges?: SignalBadge[];
}

/* 40 curated products across every mood — enough to make discovery feel alive. */
const BLUEPRINTS: Blueprint[] = [
  { title: "Aura Sunset Lamp", subtitle: "16M-colour ambient projector", price: 1299, compareAt: 1999, theme: "cozy", moods: ["cozy-room", "creator-studio", "minimal-desk"], lifestyle: ["bedroom", "desk"], aesthetic: ["warm", "minimal"], badges: ["viral"] },
  { title: "Monolith Monitor Riser", subtitle: "Solid oak, cable-hidden", price: 2490, compareAt: 3200, theme: "desk", moods: ["minimal-desk", "wfh", "study-setup"], lifestyle: ["desk"], aesthetic: ["natural", "minimal"], badges: ["bestseller"] },
  { title: "Cloud Mechanical Keyboard", subtitle: "Gasket-mount, hot-swap", price: 5990, compareAt: 7490, theme: "tech", moods: ["gaming", "creator-studio", "wfh"], lifestyle: ["tech", "desk"], aesthetic: ["futuristic", "minimal"], badges: ["rising"] },
  { title: "Pour-Over Ritual Set", subtitle: "Borosilicate + walnut stand", price: 1790, theme: "coffee", moods: ["coffee-lover", "cozy-room"], lifestyle: ["kitchen"], aesthetic: ["warm", "natural"], badges: ["editor"] },
  { title: "Halo RGB Light Bars", subtitle: "Reactive desk backlighting", price: 2290, compareAt: 2990, theme: "gaming", moods: ["gaming", "creator-studio"], lifestyle: ["tech", "desk"], aesthetic: ["futuristic", "colorful"], badges: ["viral"] },
  { title: "Drift Lounge Chair", subtitle: "Bouclé, cloud-soft", price: 8990, theme: "cozy", moods: ["cozy-room", "wfh"], lifestyle: ["bedroom"], aesthetic: ["warm", "minimal"] },
  { title: "Nimbus Desk Mat", subtitle: "Vegan leather, stitched edge", price: 890, compareAt: 1290, theme: "desk", moods: ["minimal-desk", "wfh", "creator-studio"], lifestyle: ["desk"], aesthetic: ["minimal", "monochrome"], badges: ["bestseller"] },
  { title: "Ember Scented Candle", subtitle: "Amber & smoked cedar, 60h", price: 690, theme: "cozy", moods: ["cozy-room"], lifestyle: ["bedroom", "wellness"], aesthetic: ["warm", "natural"] },
  { title: "Voyager Carry-On", subtitle: "Aircraft-grade shell, 40L", price: 6490, compareAt: 8990, theme: "outdoor", moods: ["travel", "road-trip"], lifestyle: ["outdoor", "style"], aesthetic: ["minimal", "futuristic"], badges: ["rising"] },
  { title: "Pulse Wireless Earbuds", subtitle: "ANC · 32h · spatial audio", price: 3490, compareAt: 4990, theme: "tech", moods: ["music", "fitness", "travel"], lifestyle: ["tech", "wellness"], aesthetic: ["minimal", "futuristic"], badges: ["viral"] },
  { title: "Terra Ceramic Mug", subtitle: "Hand-thrown, matte glaze", price: 490, theme: "coffee", moods: ["coffee-lover", "cozy-room", "student-life"], lifestyle: ["kitchen"], aesthetic: ["natural", "warm"] },
  { title: "Focus Task Lamp", subtitle: "Wireless-charge base, warm CRI", price: 2190, compareAt: 2690, theme: "desk", moods: ["minimal-desk", "study-setup", "wfh"], lifestyle: ["desk"], aesthetic: ["minimal", "monochrome"], badges: ["editor"] },
  { title: "Nova Mechanical Watch", subtitle: "Sapphire, 40h reserve", price: 12990, theme: "style", moods: ["road-trip", "travel"], lifestyle: ["style"], aesthetic: ["minimal", "monochrome"], badges: ["bestseller"] },
  { title: "Trail Runner Bottle", subtitle: "Insulated, 24h cold", price: 990, theme: "wellness", moods: ["fitness", "travel", "student-life"], lifestyle: ["wellness", "outdoor"], aesthetic: ["minimal", "colorful"] },
  { title: "Studio Condenser Mic", subtitle: "USB-C, cardioid, zero-latency", price: 4490, compareAt: 5490, theme: "tech", moods: ["creator-studio", "music", "gaming"], lifestyle: ["tech"], aesthetic: ["futuristic", "monochrome"], badges: ["rising"] },
  { title: "Bloom Planter Trio", subtitle: "Self-watering, stoneware", price: 1190, theme: "cozy", moods: ["cozy-room", "wfh"], lifestyle: ["bedroom", "wellness"], aesthetic: ["natural", "warm"] },
  { title: "Apex Gaming Mouse", subtitle: "26k DPI · 58g · wireless", price: 3990, compareAt: 4990, theme: "gaming", moods: ["gaming", "creator-studio"], lifestyle: ["tech", "desk"], aesthetic: ["futuristic"], badges: ["viral"] },
  { title: "Meridian Sunglasses", subtitle: "Polarised, acetate frame", price: 2490, theme: "style", moods: ["travel", "road-trip", "car-lover"], lifestyle: ["style", "outdoor"], aesthetic: ["retro", "warm"] },
  { title: "Cabin Espresso Maker", subtitle: "Hand-pump, travel-size", price: 3290, theme: "coffee", moods: ["coffee-lover", "travel", "road-trip"], lifestyle: ["kitchen", "outdoor"], aesthetic: ["minimal", "natural"], badges: ["editor"] },
  { title: "Lumen Wall Sconce", subtitle: "Dimmable, plaster finish", price: 1890, theme: "cozy", moods: ["cozy-room", "minimal-desk"], lifestyle: ["bedroom"], aesthetic: ["minimal", "warm"] },
  { title: "Orbit Phone Stand", subtitle: "Aluminium, magnetic, foldable", price: 790, compareAt: 1090, theme: "desk", moods: ["minimal-desk", "wfh", "creator-studio"], lifestyle: ["desk", "tech"], aesthetic: ["minimal", "monochrome"], badges: ["bestseller"] },
  { title: "Peak Yoga Mat", subtitle: "6mm cork, non-slip", price: 1690, theme: "wellness", moods: ["fitness", "wellness" as MoodSlug].filter(Boolean) as MoodSlug[], lifestyle: ["wellness"], aesthetic: ["natural", "minimal"] },
  { title: "Cassette Bluetooth Speaker", subtitle: "Retro deck, 20h", price: 2790, compareAt: 3490, theme: "tech", moods: ["music", "creator-studio", "road-trip"], lifestyle: ["tech"], aesthetic: ["retro", "colorful"], badges: ["rising"] },
  { title: "Dune Throw Blanket", subtitle: "Chunky knit, merino blend", price: 1990, theme: "cozy", moods: ["cozy-room"], lifestyle: ["bedroom"], aesthetic: ["warm", "natural"] },
  { title: "Pilot Dash Mount", subtitle: "Magnetic, 360° cradle", price: 690, theme: "car", moods: ["car-lover", "road-trip"], lifestyle: ["car"], aesthetic: ["minimal", "monochrome"] },
  { title: "Prism Camera Strap", subtitle: "Quick-release, woven", price: 1290, theme: "outdoor", moods: ["photography", "travel"], lifestyle: ["style", "outdoor"], aesthetic: ["retro", "natural"], badges: ["editor"] },
  { title: "Cloud Desk Speakers", subtitle: "2.0 bookshelf, warm mids", price: 6990, compareAt: 8490, theme: "tech", moods: ["music", "creator-studio", "wfh"], lifestyle: ["tech", "desk"], aesthetic: ["minimal", "monochrome"], badges: ["bestseller"] },
  { title: "Sprout Grow Light", subtitle: "Full-spectrum, clip-on", price: 1490, theme: "cozy", moods: ["cozy-room", "wfh"], lifestyle: ["wellness", "desk"], aesthetic: ["futuristic", "natural"] },
  { title: "Nomad Sling Bag", subtitle: "Water-repellent, 6L", price: 1990, compareAt: 2490, theme: "style", moods: ["travel", "student-life", "photography"], lifestyle: ["style", "outdoor"], aesthetic: ["minimal", "monochrome"], badges: ["viral"] },
  { title: "Kettle Gooseneck Pro", subtitle: "Variable temp, 0.9L", price: 3990, theme: "coffee", moods: ["coffee-lover"], lifestyle: ["kitchen"], aesthetic: ["minimal", "monochrome"], badges: ["editor"] },
  { title: "Halo Ring Light", subtitle: "18\" bi-colour, app-controlled", price: 3290, compareAt: 3990, theme: "tech", moods: ["creator-studio", "photography"], lifestyle: ["tech"], aesthetic: ["futuristic"], badges: ["rising"] },
  { title: "Basecamp Cooler", subtitle: "Rotomould, 5-day ice", price: 5490, theme: "outdoor", moods: ["road-trip", "travel"], lifestyle: ["outdoor"], aesthetic: ["colorful", "natural"] },
  { title: "Slate Notebook Set", subtitle: "Dot-grid, lay-flat, 3-pack", price: 590, theme: "desk", moods: ["study-setup", "student-life", "minimal-desk"], lifestyle: ["desk"], aesthetic: ["minimal", "monochrome"], badges: ["bestseller"] },
  { title: "Echo Standing Desk", subtitle: "Dual-motor, oak top", price: 18990, compareAt: 22990, theme: "desk", moods: ["wfh", "minimal-desk", "creator-studio"], lifestyle: ["desk"], aesthetic: ["natural", "minimal"], badges: ["editor"] },
  { title: "Pace Smart Ring", subtitle: "Sleep · HR · recovery", price: 8990, theme: "wellness", moods: ["fitness", "wellness" as MoodSlug].filter(Boolean) as MoodSlug[], lifestyle: ["wellness", "tech"], aesthetic: ["futuristic", "minimal"], badges: ["viral"] },
  { title: "Vinyl Turntable Mini", subtitle: "Belt-drive, built-in pre-amp", price: 6490, theme: "tech", moods: ["music", "cozy-room", "creator-studio"], lifestyle: ["tech"], aesthetic: ["retro", "warm"], badges: ["rising"] },
  { title: "Trailhead Tumbler", subtitle: "40oz, leak-proof lid", price: 1290, theme: "wellness", moods: ["fitness", "student-life", "road-trip"], lifestyle: ["wellness"], aesthetic: ["colorful", "minimal"], badges: ["bestseller"] },
  { title: "Aperture Tripod", subtitle: "Carbon, ball-head, 155cm", price: 4990, theme: "outdoor", moods: ["photography", "travel"], lifestyle: ["style", "outdoor"], aesthetic: ["minimal", "monochrome"] },
  { title: "Cove Bedside Charger", subtitle: "3-in-1 magnetic dock", price: 2490, compareAt: 2990, theme: "tech", moods: ["cozy-room", "minimal-desk", "wfh"], lifestyle: ["bedroom", "tech"], aesthetic: ["minimal", "monochrome"], badges: ["editor"] },
  { title: "Roam Picnic Rug", subtitle: "Waterproof-backed, packable", price: 1490, theme: "outdoor", moods: ["road-trip", "travel", "pet-parent"], lifestyle: ["outdoor"], aesthetic: ["colorful", "natural"] },
];

const BENEFIT_ICONS = ["sparkles", "shield-check", "feather", "zap", "leaf", "heart"];

function buildProduct(bp: Blueprint, i: number): Product {
  const r = rng(i * 7 + 3);
  const slug = bp.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const images = pickImages(bp.theme, i);
  const saveCount = 200 + Math.floor(r() * 4200);
  const trendingScore = 55 + Math.floor(r() * 45);
  const stock = 3 + Math.floor(r() * 40);
  const avg = +(4 + r()).toFixed(1) > 5 ? 4.9 : +(4 + r()).toFixed(1);
  const count = 40 + Math.floor(r() * 900);
  const ratio = [1.25, 1.0, 1.4, 1.15][i % 4]; // masonry variety

  return {
    id: `p${i + 1}`,
    slug,
    title: bp.title,
    subtitle: bp.subtitle,
    story: `${bp.title} isn't just another ${bp.lifestyle[0]} object — it's the piece people stop scrolling for. Designed in the ${bp.aesthetic[0]} spirit, it earns its place the moment it lands in your space.`,
    price: bp.price,
    compareAtPrice: bp.compareAt,
    currency: "INR",
    image: images[0],
    images,
    moods: bp.moods,
    lifestyle: bp.lifestyle,
    aesthetic: bp.aesthetic,
    priceBand: priceBand(bp.price),
    signals: {
      trendingScore,
      saveCount,
      viewVelocity: 20 + Math.floor(r() * 260),
      stock,
      badges: bp.badges ?? [],
    },
    variants: [
      { id: `${slug}-a`, option: "Finish", value: bp.aesthetic.includes("warm") ? "Sand" : "Graphite", swatch: bp.aesthetic.includes("warm") ? "#D8C3A5" : "#3F3F46" },
      { id: `${slug}-b`, option: "Finish", value: "Ivory", swatch: "#F3EFE7" },
      { id: `${slug}-c`, option: "Finish", value: "Ink", swatch: "#1A1A1E" },
    ],
    benefits: [
      { icon: BENEFIT_ICONS[i % BENEFIT_ICONS.length], title: "Made to be noticed", text: "A silhouette that reads premium from across the room." },
      { icon: BENEFIT_ICONS[(i + 2) % BENEFIT_ICONS.length], title: "Built to last", text: "Materials chosen to age beautifully, not wear out." },
      { icon: BENEFIT_ICONS[(i + 4) % BENEFIT_ICONS.length], title: "Effortless everyday", text: "Thoughtful details you feel every single day." },
    ],
    features: [
      { title: "Designed in the details", text: "Every edge, weight, and finish is considered — nothing is accidental.", image: images[1] },
      { title: "The material story", text: "Premium materials that feel as good as they look, sourced responsibly.", image: images[2] },
    ],
    faqs: [
      { q: "How fast is delivery?", a: "2–5 days across India, with free shipping over ₹999 and COD available." },
      { q: "What's the return policy?", a: "Easy 7-day returns, no questions asked. If it doesn't spark joy, send it back." },
      { q: "Is there a warranty?", a: "Yes — 12 months against manufacturing defects." },
    ],
    reviews: {
      avg,
      count,
      distribution: [
        Math.floor(count * 0.02),
        Math.floor(count * 0.03),
        Math.floor(count * 0.07),
        Math.floor(count * 0.23),
        Math.floor(count * 0.65),
      ],
    },
    completesWith: [],
    bundleWith: [],
    alsoBought: [],
    seo: {
      title: `${bp.title} — TrendMeHai`,
      description: bp.subtitle,
    },
    ratio,
  };
}

export const PRODUCTS: Product[] = BLUEPRINTS.map(buildProduct);

/* Wire relations: complete-the-setup / also-bought based on shared moods. */
for (const p of PRODUCTS) {
  const related = PRODUCTS.filter(
    (o) => o.id !== p.id && o.moods.some((m) => p.moods.includes(m))
  );
  p.completesWith = related.slice(0, 4).map((o) => o.id);
  p.alsoBought = related.slice(2, 8).map((o) => o.id);
  p.bundleWith = related.slice(0, 3).map((o) => o.id);
}

export const PRODUCT_BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));
export const PRODUCT_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));
