import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollection, getCollections, getProductsByIds } from "@/lib/data/repository";
import { ProductGrid } from "@/components/discovery/ProductGrid";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { SectionHeader } from "@/components/chrome/SectionHeader";

export function generateStaticParams() {
  return getCollections().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return { title: "Collection" };
  return { title: c.title, description: c.editorial };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();
  const products = getProductsByIds(c.productIds);

  return (
    <div>
      <section className="relative">
        <div className="relative aspect-[21/9] max-h-[420px] w-full overflow-hidden">
          <ProductMedia src={c.image} alt={c.title} seed={c.id} priority className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <div className="container-page absolute inset-x-0 bottom-0 pb-8 text-white md:pb-12">
            <p className="eyebrow mb-2 !text-white/80">Collection</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">{c.title}</h1>
            <p className="mt-3 max-w-xl text-lg text-white/90">{c.editorial}</p>
          </div>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <SectionHeader eyebrow={`${products.length} pieces`} title="In this collection" />
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
