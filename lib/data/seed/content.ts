import type {
  Mood,
  Collection,
  Creator,
  CommunitySetup,
  Testimonial,
  Drop,
  MoodSlug,
} from "../types";
import { PRODUCTS } from "./products";
import { IMG } from "./images";

const byMood = (m: MoodSlug, n = 8) =>
  PRODUCTS.filter((p) => p.moods.includes(m)).slice(0, n).map((p) => p.id);

export const MOODS: Mood[] = [
  { slug: "minimal-desk", label: "Minimal Desk", description: "Clean lines, zero clutter, maximum focus.", image: IMG.desk[0], tint: "#EFF4FF" },
  { slug: "cozy-room", label: "Cozy Room", description: "Warm light, soft textures, pure comfort.", image: IMG.cozy[0], tint: "#FBF3EC" },
  { slug: "gaming", label: "Gaming", description: "RGB, reaction time, and pure adrenaline.", image: IMG.gaming[0], tint: "#F3EEFF" },
  { slug: "coffee-lover", label: "Coffee Lover", description: "The ritual, perfected cup by cup.", image: IMG.coffee[0], tint: "#F6F0E9" },
  { slug: "wfh", label: "Work From Home", description: "The setup that makes work feel good.", image: IMG.desk[1], tint: "#EEF6F1" },
  { slug: "study-setup", label: "Study Setup", description: "Focus tools for deep, distraction-free work.", image: IMG.desk[2], tint: "#F0F4FF" },
  { slug: "travel", label: "Travel", description: "Everything you need, nothing you don't.", image: IMG.outdoor[0], tint: "#EAF3F6" },
  { slug: "road-trip", label: "Road Trips", description: "Windows down, playlist up, gear sorted.", image: IMG.car[0], tint: "#F4F1EC" },
  { slug: "pet-parent", label: "Pet Parent", description: "For the ones who rule the house.", image: IMG.outdoor[3], tint: "#F1F6EF" },
  { slug: "fitness", label: "Fitness", description: "Move better, recover smarter.", image: IMG.wellness[0], tint: "#EEF6F4" },
  { slug: "car-lover", label: "Car Lover", description: "Details for the drive obsessed.", image: IMG.car[1], tint: "#F2F2F4" },
  { slug: "photography", label: "Photography", description: "Chase the light, keep the frame.", image: IMG.outdoor[2], tint: "#F0F1F4" },
  { slug: "music", label: "Music", description: "Sound that moves the room.", image: IMG.tech[2], tint: "#F3EFFA" },
  { slug: "student-life", label: "Student Life", description: "Smart, affordable, actually useful.", image: IMG.desk[3], tint: "#EFF4FF" },
  { slug: "creator-studio", label: "Creator Studio", description: "Gear that makes you press record.", image: IMG.tech[0], tint: "#F4EEFB" },
];

export const MOOD_BY_SLUG = new Map(MOODS.map((m) => [m.slug, m]));

export const COLLECTIONS: Collection[] = [
  { id: "c1", slug: "the-focus-edit", title: "The Focus Edit", editorial: "Everything you need to build a desk you actually want to sit at.", image: IMG.desk[0], productIds: byMood("minimal-desk") },
  { id: "c2", slug: "slow-mornings", title: "Slow Mornings", editorial: "Coffee rituals and cozy corners for people who savour the start.", image: IMG.coffee[1], productIds: byMood("coffee-lover") },
  { id: "c3", slug: "night-mode", title: "Night Mode", editorial: "Ambient light, warm sound, and the softest landings.", image: IMG.cozy[1], productIds: byMood("cozy-room") },
  { id: "c4", slug: "creator-kit", title: "The Creator Kit", editorial: "Press record with gear that punches way above its price.", image: IMG.tech[0], productIds: byMood("creator-studio") },
];

export const COLLECTION_BY_SLUG = new Map(COLLECTIONS.map((c) => [c.slug, c]));

export const CREATORS: Creator[] = [
  { id: "cr1", handle: "aesthetic.aanya", name: "Aanya Kapoor", avatar: IMG.style[0], bio: "Desk stylist & minimalist. I find the pieces before they trend.", followers: 148000, pickIds: byMood("minimal-desk", 6) },
  { id: "cr2", handle: "brewedbyrohan", name: "Rohan Mehta", avatar: IMG.coffee[2], bio: "Coffee obsessive. Third-wave at home, one pour at a time.", followers: 92000, pickIds: byMood("coffee-lover", 6) },
  { id: "cr3", handle: "kabir.plays", name: "Kabir Singh", avatar: IMG.gaming[1], bio: "Setup builder. If it glows, I've probably reviewed it.", followers: 205000, pickIds: byMood("gaming", 6) },
  { id: "cr4", handle: "meera.makes", name: "Meera Nair", avatar: IMG.style[2], bio: "Creator studio nerd. Cameras, mics, and good light.", followers: 71000, pickIds: byMood("creator-studio", 6) },
];

export const CREATOR_BY_HANDLE = new Map(CREATORS.map((c) => [c.handle, c]));

export const COMMUNITY_SETUPS: CommunitySetup[] = [
  { id: "s1", title: "My ₹20k minimal oak desk", author: "Aanya K.", authorAvatar: IMG.style[0], image: IMG.desk[0], likes: 3400, hotspots: [{ x: 30, y: 40, productId: "p2" }, { x: 62, y: 55, productId: "p12" }, { x: 45, y: 70, productId: "p7" }], productIds: byMood("minimal-desk", 6) },
  { id: "s2", title: "Cozy corner reset", author: "Rohan M.", authorAvatar: IMG.coffee[2], image: IMG.cozy[0], likes: 2100, hotspots: [{ x: 40, y: 50, productId: "p1" }, { x: 70, y: 60, productId: "p8" }], productIds: byMood("cozy-room", 6) },
  { id: "s3", title: "RGB battlestation v3", author: "Kabir S.", authorAvatar: IMG.gaming[1], image: IMG.gaming[0], likes: 5600, hotspots: [{ x: 35, y: 45, productId: "p5" }, { x: 60, y: 50, productId: "p17" }], productIds: byMood("gaming", 6) },
  { id: "s4", title: "Pour-over station", author: "Meera N.", authorAvatar: IMG.style[2], image: IMG.coffee[0], likes: 1800, hotspots: [{ x: 45, y: 40, productId: "p4" }, { x: 65, y: 65, productId: "p30" }], productIds: byMood("coffee-lover", 6) },
];

export const SETUP_BY_ID = new Map(COMMUNITY_SETUPS.map((s) => [s.id, s]));

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", quote: "I came in for a desk lamp and left with a whole new setup. I couldn't stop scrolling.", author: "Ishita R.", role: "Bengaluru", rating: 5 },
  { id: "t2", quote: "It genuinely feels like Instagram, but everything is actually buyable. Dangerous.", author: "Aditya P.", role: "Pune", rating: 5 },
  { id: "t3", quote: "The most beautiful shopping experience I've used. Everything just feels expensive.", author: "Sana K.", role: "Mumbai", rating: 5 },
  { id: "t4", quote: "Bought the entire creator setup from one community post. Two taps. Done.", author: "Devansh M.", role: "Delhi", rating: 5 },
];

const now = Date.now();
export const DROPS: Drop[] = [
  { id: "d1", slug: "midnight-oak", title: "Midnight Oak", tagline: "A limited run of blacked-out desk essentials. 200 units.", image: IMG.desk[2], startsAt: new Date(now - 3600_000).toISOString(), endsAt: new Date(now + 2 * 86400_000 + 5 * 3600_000).toISOString(), productIds: byMood("minimal-desk", 5) },
  { id: "d2", slug: "aurora-rgb", title: "Aurora RGB", tagline: "The reactive lighting drop creators keep asking for.", image: IMG.gaming[2], startsAt: new Date(now + 86400_000).toISOString(), endsAt: new Date(now + 4 * 86400_000).toISOString(), productIds: byMood("gaming", 5) },
];

export const DROP_BY_SLUG = new Map(DROPS.map((d) => [d.slug, d]));
