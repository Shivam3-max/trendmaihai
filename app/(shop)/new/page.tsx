import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { getNewArrivals } from "@/lib/data/repository";
import { ProductGrid } from "@/components/discovery/ProductGrid";

export const metadata: Metadata = {
  title: "New Drops",
  description: "The freshest arrivals — before everyone else finds them.",
};

export default function NewPage() {
  const products = getNewArrivals(40);
  return (
    <div className="container-page py-10 md:py-14">
      <div className="mb-1 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-accent" />
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">New Drops</h1>
      </div>
      <p className="mb-8 text-text-secondary">Just landed. Be the first to discover them.</p>
      <ProductGrid products={products} />
    </div>
  );
}
