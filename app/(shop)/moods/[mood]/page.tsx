import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getMood, getMoods, getByMood } from "@/lib/data/repository";
import { ProductGrid } from "@/components/discovery/ProductGrid";
import { SectionHeader } from "@/components/chrome/SectionHeader";
import { formatPrice } from "@/lib/utils/cn";

export function generateStaticParams() {
  return getMoods().map((m) => ({ mood: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ mood: string }> }): Promise<Metadata> {
  const { mood } = await params;
  const m = getMood(mood);
  if (!m) return { title: "Mood" };
  return { title: m.label, description: m.description };
}

export default async function MoodPage({ params }: { params: Promise<{ mood: string }> }) {
  const { mood } = await params;
  const m = getMood(mood);
  if (!m) notFound();

  const products = getByMood(m.slug, 40);
  const setup = products.slice(0, 4);
  const setupTotal = setup.reduce((n, p) => n + p.price, 0);
  const related = getMoods().filter((x) => x.slug !== m.slug).slice(0, 6);

  return (
    <div>
      {/* mood hero banner */}
      <section style={{ background: m.tint }}>
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow mb-2">Shop the mood</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">{m.label}</h1>
          <p className="mt-3 max-w-lg text-lg text-text-secondary">{m.description}</p>
          <p className="mt-4 font-mono text-sm text-text-muted">{products.length} pieces curated for this vibe</p>
        </div>
      </section>

      {/* complete the setup */}
      {setup.length >= 3 && (
        <section className="container-page py-12">
          <div className="grid items-center gap-6 rounded-lg border border-border bg-surface p-5 shadow-sm md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow mb-3">Buy the whole vibe</p>
              <div className="flex gap-3">
                {setup.map((p) => (
                  <Link key={p.id} href={`/product/${p.slug}`} className="relative h-16 w-16 overflow-hidden rounded-sm border border-border">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-2xl font-medium">{formatPrice(setupTotal)}</p>
              <p className="text-xs text-text-muted">The complete {m.label.toLowerCase()} setup</p>
            </div>
          </div>
        </section>
      )}

      {/* the feed */}
      <section className="container-page pb-16">
        <SectionHeader eyebrow="Everything in this mood" title={`The ${m.label} edit`} />
        <ProductGrid products={products} />
      </section>

      {/* related moods */}
      <section className="container-page pb-20">
        <SectionHeader eyebrow="If you like this…" title="Related moods" href="/moods" />
        <div className="flex flex-wrap gap-2.5">
          {related.map((r) => (
            <Link key={r.slug} href={`/moods/${r.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
              {r.label} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
