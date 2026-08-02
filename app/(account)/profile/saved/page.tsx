"use client";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { getProductById, getTrending } from "@/lib/data/repository";
import { ProductCard } from "@/components/cards/ProductCard";
import { SectionHeader } from "@/components/chrome/SectionHeader";

export default function SavedPage() {
  const saved = useStore((s) => s.saved);
  const products = saved.map(getProductById).filter(Boolean) as NonNullable<ReturnType<typeof getProductById>>[];
  const recs = getTrending(4);

  return (
    <div className="container-page py-10 md:py-14">
      <div className="mb-8 flex items-center gap-3">
        <Heart className="h-6 w-6 text-error" />
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Saved</h1>
        <span className="font-mono text-sm text-text-muted">({saved.length})</span>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-bg-secondary py-16 text-center">
          <p className="font-sub font-semibold">Nothing saved yet</p>
          <Link href="/discover" className="inline-flex items-center gap-2 rounded-DEFAULT bg-accent px-6 py-3 font-sub font-semibold text-white shadow-accent">
            Start discovering <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      <div className="mt-16">
        <SectionHeader eyebrow="Based on your taste" title="You might also love" href="/discover" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {recs.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
