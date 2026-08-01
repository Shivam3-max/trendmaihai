import type { Metadata } from "next";
import Link from "next/link";
import { getCollections } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";

export const metadata: Metadata = {
  title: "Collections",
  description: "Editorial edits worth exploring — curated for a feeling.",
};

export default function CollectionsPage() {
  const collections = getCollections();
  return (
    <div className="container-page py-10 md:py-14">
      <p className="eyebrow mb-2">Edits worth exploring</p>
      <h1 className="mb-8 font-display text-3xl font-semibold tracking-tight md:text-4xl">Collections</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {collections.map((c, i) => (
          <Link key={c.id} href={`/collections/${c.slug}`} className="group relative block overflow-hidden rounded-lg border border-border">
            <div className="relative aspect-[16/10]">
              <ProductMedia src={c.image} alt={c.title} seed={c.id} priority={i < 2} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-white">
                <p className="font-mono text-xs opacity-80">{c.productIds.length} pieces</p>
                <h2 className="mt-1 font-display text-3xl font-semibold">{c.title}</h2>
                <p className="mt-1 max-w-md text-sm opacity-90">{c.editorial}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
