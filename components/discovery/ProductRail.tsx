"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/data/types";
import { ProductCard } from "@/components/cards/ProductCard";
import { cn } from "@/lib/utils/cn";

export function ProductRail({
  products,
  cardWidth = "w-[230px]",
  showArrows = true,
  rank,
}: {
  products: Product[];
  cardWidth?: string;
  showArrows?: boolean;
  rank?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * 520, behavior: "smooth" });

  return (
    <div className="relative">
      {showArrows && (
        <>
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-white shadow-md transition-transform hover:scale-105 md:grid cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-white shadow-md transition-transform hover:scale-105 md:grid cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {products.map((p, i) => (
          <div key={p.id} className={cn("relative shrink-0 snap-start", cardWidth)}>
            {rank && (
              <span className="absolute -left-1 -top-2 z-10 font-display text-4xl font-bold text-border">
                {i + 1}
              </span>
            )}
            <ProductCard product={p} priority={i < 3} />
          </div>
        ))}
      </div>
    </div>
  );
}
