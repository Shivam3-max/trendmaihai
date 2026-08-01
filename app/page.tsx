import { Hero } from "@/components/sections/Hero";
import { LimitedDropsSpotlight } from "@/components/sections/LimitedDrops";
import { MasonryFeed } from "@/components/discovery/MasonryFeed";
import { SectionHeader } from "@/components/chrome/SectionHeader";
import {
  RailSection,
  SocialProofTicker,
  EditorialStatement,
  MoodGrid,
  CreatorPicks,
  MostSaved,
  CollectionsSection,
  FlashDeals,
  SetupShowcase,
  LifestyleBento,
  TrendingCategories,
  CommunitySetups,
  TestimonialsSection,
  NewsletterJoin,
} from "@/components/sections/blocks";
import {
  getTrending,
  getViral,
  getMostSaved,
  getNewArrivals,
  getDeals,
  getMoods,
  getCollections,
  getCreators,
  getProductsByIds,
  getCommunitySetups,
  getTestimonials,
  getDrops,
  getMood,
} from "@/lib/data/repository";

export default function HomePage() {
  const trending = getTrending(12);
  const viral = getViral(8);
  const moods = getMoods();
  const setups = getCommunitySetups();
  const drops = getDrops();
  const heroSetup = setups[0];

  const creatorData = getCreators().map((creator) => ({
    creator,
    picks: getProductsByIds(creator.pickIds),
  }));

  const lifestyleItems = [
    { label: "Desk", mood: "minimal-desk" },
    { label: "Kitchen", mood: "coffee-lover" },
    { label: "Bedroom", mood: "cozy-room" },
    { label: "Gaming", mood: "gaming" },
    { label: "Travel", mood: "travel" },
    { label: "Fitness", mood: "fitness" },
  ].map((l) => ({ ...l, image: getMood(l.mood)?.image ?? "" }));

  return (
    <>
      {/* S1 */}
      <Hero products={trending} />

      {/* S2 */}
      <SocialProofTicker />

      {/* S3 */}
      <RailSection eyebrow="What's hot right now" title="Trending Today" href="/trending" products={trending} rank />

      {/* S4 */}
      <RailSection eyebrow="Blowing up this week" title="Products Going Viral" href="/trending" products={viral} tint />

      {/* S5 */}
      <MoodGrid moods={moods} />

      {/* S6 — infinite discover feed segment 1 */}
      <section id="discover" className="py-14 md:py-16">
        <div className="container-page">
          <SectionHeader eyebrow="Made for you · never ends" title="Discover" />
          <MasonryFeed />
        </div>
      </section>

      {/* S7 */}
      <EditorialStatement pre="Our whole philosophy, in five words" line1="You don't search." accent="You discover." />

      {/* S8 */}
      <CreatorPicks data={creatorData} />

      {/* S9 */}
      {heroSetup && <SetupShowcase setup={heroSetup} products={getProductsByIds(heroSetup.productIds)} />}

      {/* S11-12 */}
      <MostSaved products={getMostSaved(4)} />

      {/* S13 */}
      <LifestyleBento items={lifestyleItems} />

      {/* S14 — dark spotlight */}
      {drops[0] && <LimitedDropsSpotlight drop={drops[0]} products={getProductsByIds(drops[0].productIds)} />}

      {/* S15 */}
      <CollectionsSection collections={getCollections()} />

      {/* S17 */}
      <FlashDeals products={getDeals(10)} />

      {/* S18 */}
      <RailSection eyebrow="Fresh in" title="New Arrivals" href="/new" products={getNewArrivals(10)} />

      {/* S20 */}
      <TrendingCategories moods={moods} />

      {/* S22 */}
      <CommunitySetups setups={setups} />

      {/* S23 */}
      <TestimonialsSection items={getTestimonials()} />

      {/* S24 — infinite feed segment 2 */}
      <section className="py-14 md:py-16">
        <div className="container-page">
          <SectionHeader eyebrow="Because you've got taste" title="Keep discovering" />
          <MasonryFeed initialCursor={3} />
        </div>
      </section>

      {/* S25 */}
      <NewsletterJoin />
    </>
  );
}
