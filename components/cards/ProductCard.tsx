"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import type { Product } from "@/lib/data/types";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { Price, SignalChip, SaveButton, Rating } from "@/components/commerce/atoms";
import { useStore } from "@/store/useStore";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function ProductCard({
  product,
  priority,
  masonry,
  className,
}: {
  product: Product;
  priority?: boolean;
  masonry?: boolean;
  className?: string;
}) {
  const setQuickView = useStore((s) => s.setQuickView);
  const toggleSaved = useStore((s) => s.toggleSaved);
  const recordMoods = useStore((s) => s.recordMoods);
  const lastTap = useRef(0);

  // double-tap to save (mobile Instagram grammar)
  const onTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      toggleSaved(product.id);
      recordMoods(product.moods, 2);
    }
    lastTap.current = now;
  };

  const ratio = masonry ? product.ratio ?? 1.25 : 1.25;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      className={cn("group relative", className)}
      onClick={onTap}
    >
      <Link
        href={`/product/${product.slug}`}
        onMouseEnter={() => recordMoods(product.moods, 0.2)}
        className="block overflow-hidden rounded-md border border-border bg-surface shadow-sm transition-shadow duration-300 group-hover:shadow-lg"
      >
        <div className="relative" style={{ aspectRatio: `1 / ${ratio}` }}>
          <ProductMedia
            src={product.image}
            alt={product.title}
            seed={product.id}
            priority={priority}
            className="absolute inset-0 h-full w-full"
            imgClassName="group-hover:scale-[1.04]"
          />

          {/* signals top-left */}
          {product.signals.badges[0] && (
            <div className="absolute left-2.5 top-2.5">
              <SignalChip badge={product.signals.badges[0]} />
            </div>
          )}

          {/* save top-right */}
          <div className="absolute right-2.5 top-2.5">
            <SaveButton productId={product.id} />
          </div>

          {/* quick view — appears on hover (desktop) */}
          <button
            aria-label="Quick view"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickView(product.slug);
            }}
            className="absolute bottom-2.5 left-1/2 hidden -translate-x-1/2 translate-y-2 items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-xs font-semibold text-text opacity-0 shadow-md backdrop-blur transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 md:inline-flex cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" /> Quick view
          </button>
        </div>

        <div className="space-y-1.5 p-3.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-sub text-sm font-semibold text-text">
              {product.title}
            </h3>
          </div>
          <p className="line-clamp-1 text-xs text-text-muted">{product.subtitle}</p>
          <div className="flex items-center justify-between pt-1">
            <Price price={product.price} compareAt={product.compareAtPrice} />
            <Rating avg={product.reviews.avg} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
