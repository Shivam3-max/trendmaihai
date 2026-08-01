import type { Metadata } from "next";
import { Zap } from "lucide-react";
import { getDeals } from "@/lib/data/repository";
import { ProductGrid } from "@/components/discovery/ProductGrid";

export const metadata: Metadata = {
  title: "Deals",
  description: "Real savings, honest timers. The best prices on trending finds.",
};

export default function DealsPage() {
  const products = getDeals(40);
  return (
    <div className="container-page py-10 md:py-14">
      <div className="mb-1 flex items-center gap-2">
        <Zap className="h-6 w-6 text-warning" />
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Deals</h1>
      </div>
      <p className="mb-8 text-text-secondary">Genuine markdowns on the pieces people actually want.</p>
      <ProductGrid products={products} masonry={false} />
    </div>
  );
}
