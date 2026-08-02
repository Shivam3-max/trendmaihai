import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCreator, getCreators, getProductsByIds } from "@/lib/data/repository";
import { ProductGrid } from "@/components/discovery/ProductGrid";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { SectionHeader } from "@/components/chrome/SectionHeader";
import { formatCount } from "@/lib/utils/cn";

export function generateStaticParams() {
  return getCreators().map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const c = getCreator(handle);
  if (!c) return { title: "Creator" };
  return { title: `${c.name} (@${c.handle})`, description: c.bio };
}

export default async function CreatorPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const c = getCreator(handle);
  if (!c) notFound();
  const picks = getProductsByIds(c.pickIds);

  return (
    <div>
      {/* creator hero */}
      <section className="border-b border-border bg-bg-secondary">
        <div className="container-page flex flex-col items-center gap-4 py-14 text-center md:py-20">
          <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-white shadow-md">
            <ProductMedia src={c.avatar} alt={c.name} seed={c.id} priority className="h-full w-full" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{c.name}</h1>
            <p className="mt-1 font-mono text-sm text-text-muted">@{c.handle}</p>
          </div>
          <p className="max-w-md text-text-secondary">{c.bio}</p>
          <div className="flex items-center gap-6 font-mono text-sm">
            <span><span className="text-text">{formatCount(c.followers)}</span> <span className="text-text-muted">followers</span></span>
            <span><span className="text-text">{picks.length}</span> <span className="text-text-muted">picks</span></span>
          </div>
          <button className="mt-1 rounded-full bg-text px-6 py-2.5 font-sub text-sm font-semibold text-white transition-transform active:scale-95">Follow</button>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <SectionHeader eyebrow={`${c.name.split(" ")[0]}'s picks`} title="Shop the edit" />
        <ProductGrid products={picks} />
      </section>
    </div>
  );
}
