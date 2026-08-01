"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ArrowRight, Heart, Check } from "lucide-react";
import type { Product, Mood, Collection, Creator, CommunitySetup, Testimonial } from "@/lib/data/types";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { Price, Rating, formatCount } from "@/components/commerce/atoms";
import { SectionHeader } from "@/components/chrome/SectionHeader";
import { ProductRail } from "@/components/discovery/ProductRail";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { useStore } from "@/store/useStore";
import { cn, formatPrice } from "@/lib/utils/cn";

/* ---------- generic rail section ---------- */
export function RailSection({
  eyebrow, title, href, products, rank, tint,
}: {
  eyebrow?: string; title: string; href?: string; products: Product[]; rank?: boolean; tint?: boolean;
}) {
  return (
    <section className={cn("py-14 md:py-16", tint && "bg-bg-secondary")}>
      <div className="container-page">
        <SectionHeader eyebrow={eyebrow} title={title} href={href} />
        <ProductRail products={products} rank={rank} />
      </div>
    </section>
  );
}

/* ---------- S2 live social proof ticker ---------- */
const EVENTS = [
  "Aditi in Pune just grabbed the Aura Sunset Lamp",
  "214 people saved the Monolith Riser today",
  "Cloud Keyboard is trending ↑ 38%",
  "Rohan in Delhi bought the Pour-Over Set",
  "Only 6 left of the Apex Gaming Mouse",
  "Halo Light Bars going viral this week",
];
export function SocialProofTicker() {
  const row = [...EVENTS, ...EVENTS];
  return (
    <div className="border-y border-border bg-bg-secondary py-3">
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8">
          {row.map((e, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-sm text-text-secondary">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" />
              {e}
            </span>
          ))}
        </div>
        <div aria-hidden className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8">
          {row.map((e, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-sm text-text-secondary">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" />
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- editorial statement divider ---------- */
export function EditorialStatement({ pre, line1, accent, line2 }: { pre?: string; line1: string; accent: string; line2?: string }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          {pre && <RevealItem><p className="eyebrow mb-4">{pre}</p></RevealItem>}
          <RevealItem>
            <p className="max-w-4xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.03] tracking-[-0.02em]">
              {line1} <span className="accent-sweep">{accent}</span> {line2}
            </p>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- S5 mood grid ---------- */
export function MoodGrid({ moods }: { moods: Mood[] }) {
  return (
    <section className="py-14 md:py-16">
      <div className="container-page">
        <SectionHeader eyebrow="Shop by feeling, not category" title="Shop by Mood" href="/moods" />
        <Reveal className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {moods.slice(0, 10).map((m) => (
            <RevealItem key={m.slug}>
              <Link href={`/moods/${m.slug}`} className="group relative block overflow-hidden rounded-md border border-border">
                <div className="relative aspect-[4/5]">
                  <ProductMedia src={m.image} alt={m.label} seed={m.slug} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                  <div className="absolute inset-x-3 bottom-3 text-white">
                    <p className="font-sub text-sm font-semibold">{m.label}</p>
                    <p className="mt-0.5 line-clamp-1 text-[0.7rem] opacity-0 transition-opacity duration-300 group-hover:opacity-90">{m.description}</p>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- creator picks ---------- */
export function CreatorPicks({ data }: { data: { creator: Creator; picks: Product[] }[] }) {
  return (
    <section className="py-14 md:py-16">
      <div className="container-page">
        <SectionHeader eyebrow="Curated by people with taste" title="Creator Picks" href="/creators" />
        <div className="grid gap-5 md:grid-cols-2">
          {data.slice(0, 2).map(({ creator: c, picks }) => {
            return (
              <div key={c.id} className="rounded-lg border border-border bg-surface p-5 shadow-sm">
                <Link href={`/creators/${c.handle}`} className="flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full">
                    <ProductMedia src={c.avatar} alt={c.name} seed={c.id} className="h-full w-full" />
                  </div>
                  <div className="flex-1">
                    <p className="font-sub text-sm font-semibold">{c.name}</p>
                    <p className="font-mono text-xs text-text-muted">@{c.handle} · {formatCount(c.followers)} followers</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-text-muted" />
                </Link>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {picks.slice(0, 3).map((p) => (
                    <Link key={p.id} href={`/product/${p.slug}`} className="group">
                      <div className="relative aspect-square overflow-hidden rounded-sm">
                        <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" imgClassName="group-hover:scale-105" />
                      </div>
                      <Price price={p.price} className="mt-1 text-[0.7rem]" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- most saved (ranked, mono) ---------- */
export function MostSaved({ products }: { products: Product[] }) {
  return (
    <section className="bg-bg-secondary py-14 md:py-16">
      <div className="container-page">
        <SectionHeader eyebrow="The internet has spoken" title="Most Saved This Week" href="/trending" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p, i) => (
            <Link key={p.id} href={`/product/${p.slug}`} className="group flex items-center gap-4 rounded-md border border-border bg-surface p-3 shadow-sm transition-shadow hover:shadow-md">
              <span className={cn("font-display text-3xl font-bold", i === 0 ? "text-accent" : "text-border")}>{i + 1}</span>
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm">
                <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" imgClassName="group-hover:scale-105" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-semibold">{p.title}</p>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-text-muted">
                  <Heart className="h-3 w-3 fill-error text-error" /> {formatCount(p.signals.saveCount)} saves
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- collections ---------- */
export function CollectionsSection({ collections }: { collections: Collection[] }) {
  return (
    <section className="py-14 md:py-16">
      <div className="container-page">
        <SectionHeader eyebrow="Edits worth exploring" title="Collections" href="/collections" />
        <div className="grid gap-4 md:grid-cols-2">
          {collections.slice(0, 2).map((c, i) => (
            <Link key={c.id} href={`/collections/${c.slug}`} className={cn("group relative block overflow-hidden rounded-lg border border-border", i === 0 && "md:row-span-1")}>
              <div className="relative aspect-[16/10]">
                <ProductMedia src={c.image} alt={c.title} seed={c.id} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <p className="font-mono text-xs opacity-80">{c.productIds.length} pieces</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold">{c.title}</h3>
                  <p className="mt-1 max-w-sm text-sm opacity-90">{c.editorial}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- flash deals ---------- */
export function FlashDeals({ products }: { products: Product[] }) {
  return (
    <section className="py-14 md:py-16">
      <div className="container-page">
        <SectionHeader eyebrow="Ends soon · real timers" title="Flash Deals" href="/deals" />
        <ProductRail products={products} />
      </div>
    </section>
  );
}

/* ---------- desk setup showcase (hotspots) ---------- */
export function SetupShowcase({ setup, products }: { setup: CommunitySetup; products: Product[] }) {
  const add = useStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);
  const total = products.reduce((n, p) => n + p.price, 0);

  const buyAll = () => {
    products.forEach((p) => add(p.id));
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section className="bg-bg-secondary py-14 md:py-16">
      <div className="container-page">
        <SectionHeader eyebrow="Buy the whole vibe" title="Shoppable Setups" href="/community" />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative overflow-hidden rounded-lg border border-border">
            <div className="relative aspect-[16/11]">
              <ProductMedia src={setup.image} alt={setup.title} seed={setup.id} className="absolute inset-0 h-full w-full" />
              {setup.hotspots.map((h, i) => (
                <span key={i} className="absolute" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
                  <span className="block h-4 w-4 animate-pulse-dot rounded-full bg-white ring-4 ring-white/40" />
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col rounded-lg border border-border bg-surface p-5 shadow-sm">
            <p className="font-sub font-semibold">{setup.title}</p>
            <p className="font-mono text-xs text-text-muted">by {setup.author} · {formatCount(setup.likes)} likes</p>
            <ul className="mt-4 flex-1 space-y-3">
              {products.slice(0, 4).map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm">
                    <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" />
                  </div>
                  <Link href={`/product/${p.slug}`} className="min-w-0 flex-1 text-sm font-medium hover:text-accent">
                    <span className="line-clamp-1">{p.title}</span>
                  </Link>
                  <Price price={p.price} className="text-xs" />
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-text-secondary">Full setup</span>
              <span className="font-mono text-lg font-medium">{formatPrice(total)}</span>
            </div>
            <button onClick={buyAll} className="mt-3 inline-flex items-center justify-center gap-2 rounded-DEFAULT bg-accent py-3 font-sub font-semibold text-white shadow-accent transition-transform active:scale-[0.98] cursor-pointer">
              {added ? <><Check className="h-5 w-5" /> Added the setup</> : `Buy this setup (${products.length})`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- lifestyle bento ---------- */
export function LifestyleBento({ items }: { items: { label: string; mood: string; image: string }[] }) {
  return (
    <section className="py-14 md:py-16">
      <div className="container-page">
        <SectionHeader eyebrow="Find your corner" title="Explore by Lifestyle" href="/moods" />
        <div className="grid auto-rows-[140px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {items.map((l, i) => (
            <Link
              key={l.mood}
              href={`/moods/${l.mood}`}
              className={cn(
                "group relative overflow-hidden rounded-md border border-border",
                i === 0 && "col-span-2 row-span-2",
                i === 3 && "md:row-span-2"
              )}
            >
              <ProductMedia src={l.image} alt={l.label} seed={l.mood} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-3 left-3 font-sub font-semibold text-white">{l.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- trending categories cloud ---------- */
export function TrendingCategories({ moods }: { moods: Mood[] }) {
  return (
    <section className="bg-bg-secondary py-14 md:py-16">
      <div className="container-page">
        <SectionHeader eyebrow="What everyone's into" title="Trending Categories" />
        <div className="flex flex-wrap gap-2.5">
          {moods.map((m, i) => (
            <Link
              key={m.slug}
              href={`/moods/${m.slug}`}
              className={cn(
                "rounded-full border border-border bg-surface px-4 py-2 font-sub text-sm font-medium transition-all hover:border-accent hover:text-accent",
                i % 3 === 0 && "text-base"
              )}
            >
              {m.label}
              <span className="ml-2 font-mono text-xs text-text-muted">{80 + ((i * 37) % 400)}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- community setups ---------- */
export function CommunitySetups({ setups }: { setups: CommunitySetup[] }) {
  return (
    <section className="py-14 md:py-16">
      <div className="container-page">
        <SectionHeader eyebrow="Real rooms, real people" title="From the Community" href="/community" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {setups.map((s) => (
            <Link key={s.id} href={`/community/${s.id}`} className="group relative block overflow-hidden rounded-md border border-border">
              <div className="relative aspect-[4/5]">
                <ProductMedia src={s.image} alt={s.title} seed={s.id} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 text-white">
                  <p className="line-clamp-1 text-sm font-semibold">{s.title}</p>
                  <span className="inline-flex items-center gap-1 font-mono text-xs opacity-90">
                    <Heart className="h-3 w-3 fill-white" /> {formatCount(s.likes)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */
export function TestimonialsSection({ items }: { items: Testimonial[] }) {
  return (
    <section className="py-14 md:py-16">
      <div className="container-page">
        <SectionHeader eyebrow="Loved a little too much" title="Why people keep coming back" center />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((t) => (
            <figure key={t.id} className="flex flex-col rounded-lg border border-border bg-surface p-5 shadow-sm">
              <Rating avg={t.rating} />
              <blockquote className="mt-3 flex-1 font-display text-lg font-medium leading-snug text-text">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.author}</span>
                <span className="text-text-muted"> · {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- newsletter / join ---------- */
export function NewsletterJoin() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="py-16">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-xl border border-border bg-bg-secondary px-6 py-14 text-center md:py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
          <p className="eyebrow mb-3">Join the discovery club</p>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Get the drops before they blow up.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-text-secondary">
            One email a week. The trending finds, limited drops, and a mystery reward on sign-up.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
            className="mx-auto mt-7 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="h-12 flex-1 rounded-DEFAULT border border-border bg-surface px-4 text-base outline-none transition-colors focus:border-accent"
            />
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-DEFAULT bg-accent px-6 font-sub font-semibold text-white shadow-accent transition-transform active:scale-[0.98] cursor-pointer">
              {done ? <><Check className="h-5 w-5" /> You&apos;re in</> : "Unlock reward"}
            </button>
          </form>
          <p className="mt-3 font-mono text-xs text-text-muted">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
