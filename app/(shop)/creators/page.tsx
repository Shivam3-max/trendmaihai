import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCreators, getProductsByIds } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { formatCount } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Creators",
  description: "Curated by people with taste. Shop the picks of your favourite creators.",
};

export default function CreatorsPage() {
  const creators = getCreators();
  return (
    <div className="container-page py-10 md:py-14">
      <p className="eyebrow mb-2">Curated by people with taste</p>
      <h1 className="mb-8 font-display text-3xl font-semibold tracking-tight md:text-4xl">Creators</h1>
      <div className="grid gap-5 md:grid-cols-2">
        {creators.map((c) => {
          const picks = getProductsByIds(c.pickIds).slice(0, 3);
          return (
            <div key={c.id} className="rounded-lg border border-border bg-surface p-5 shadow-sm">
              <Link href={`/creators/${c.handle}`} className="flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-full">
                  <ProductMedia src={c.avatar} alt={c.name} seed={c.id} className="h-full w-full" />
                </div>
                <div className="flex-1">
                  <p className="font-sub font-semibold">{c.name}</p>
                  <p className="font-mono text-xs text-text-muted">@{c.handle} · {formatCount(c.followers)} followers</p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">View picks <ArrowRight className="h-4 w-4" /></span>
              </Link>
              <p className="mt-3 text-sm text-text-secondary">{c.bio}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {picks.map((p) => (
                  <Link key={p.id} href={`/product/${p.slug}`} className="group relative aspect-square overflow-hidden rounded-sm">
                    <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" imgClassName="group-hover:scale-105" />
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
