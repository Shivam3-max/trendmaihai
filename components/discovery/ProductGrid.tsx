"use client";
import { useState } from "react";
import type { Product } from "@/lib/data/types";
import { ProductCard } from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/Button";

/** Masonry grid from a static product list, with progressive "load more". */
export function ProductGrid({
  products,
  masonry = true,
  pageSize = 15,
}: {
  products: Product[];
  masonry?: boolean;
  pageSize?: number;
}) {
  const [count, setCount] = useState(pageSize);
  const shown = products.slice(0, count);
  const hasMore = count < products.length;

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-bg-secondary py-16 text-center">
        <p className="font-sub font-semibold">Nothing here yet</p>
        <p className="mt-1 text-sm text-text-secondary">Try another mood — the good stuff is close.</p>
      </div>
    );
  }

  if (masonry) {
    return (
      <div>
        <div className="[column-fill:_balance] columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4 xl:columns-5">
          {shown.map((p, i) => (
            <div key={p.id} className="mb-3 break-inside-avoid md:mb-4">
              <ProductCard product={p} masonry priority={i < 5} />
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Button variant="secondary" size="lg" onClick={() => setCount((c) => c + pageSize)}>
              Load more
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {shown.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 5} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button variant="secondary" size="lg" onClick={() => setCount((c) => c + pageSize)}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
