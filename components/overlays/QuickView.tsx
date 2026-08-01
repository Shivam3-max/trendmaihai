"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight, Check } from "lucide-react";
import { useStore } from "@/store/useStore";
import { getProductBySlug } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { Price, Rating, StockMeter, SignalChip, SaveButton } from "@/components/commerce/atoms";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export function QuickView() {
  const slug = useStore((s) => s.quickViewSlug);
  const setQuickView = useStore((s) => s.setQuickView);
  const addToCart = useStore((s) => s.addToCart);
  const recordMoods = useStore((s) => s.recordMoods);
  const [variant, setVariant] = useState(0);
  const [added, setAdded] = useState(false);

  const product = slug ? getProductBySlug(slug) : undefined;

  const close = () => {
    setQuickView(null);
    setAdded(false);
    setVariant(0);
  };

  const add = () => {
    if (!product) return;
    addToCart(product.id, product.variants[variant]?.id);
    recordMoods(product.moods, 1.5);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-text/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 400, damping: 34 }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-bg shadow-lg"
            role="dialog"
            aria-label={product.title}
          >
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto">
                <ProductMedia src={product.image} alt={product.title} seed={product.id} className="h-full w-full" />
                {product.signals.badges[0] && (
                  <div className="absolute left-3 top-3">
                    <SignalChip badge={product.signals.badges[0]} />
                  </div>
                )}
              </div>

              <div className="flex flex-col p-6">
                <div className="flex items-start justify-between">
                  <span className="eyebrow">{product.moods[0]?.replace("-", " ")}</span>
                  <button onClick={close} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface-hover cursor-pointer">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <h2 className="mt-1 font-display text-2xl font-semibold">{product.title}</h2>
                <p className="mt-1 text-sm text-text-secondary">{product.subtitle}</p>
                <div className="mt-3 flex items-center gap-3">
                  <Price price={product.price} compareAt={product.compareAtPrice} className="text-lg" />
                  <Rating avg={product.reviews.avg} count={product.reviews.count} />
                </div>

                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-text-secondary">{product.story}</p>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-medium text-text-secondary">Finish · {product.variants[variant]?.value}</p>
                  <div className="flex gap-2">
                    {product.variants.map((v, i) => (
                      <button
                        key={v.id}
                        onClick={() => setVariant(i)}
                        aria-label={v.value}
                        className={cn(
                          "h-8 w-8 rounded-full border-2 transition-all cursor-pointer",
                          variant === i ? "border-accent scale-110" : "border-border"
                        )}
                        style={{ background: v.swatch }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4"><StockMeter stock={product.signals.stock} /></div>

                <div className="mt-auto flex items-center gap-2 pt-6">
                  <Button onClick={add} variant="accent" size="lg" className="flex-1">
                    {added ? <><Check className="h-5 w-5" /> Added</> : "Add to cart"}
                  </Button>
                  <SaveButton productId={product.id} floating={false} className="h-14 w-14 border border-border" size={22} />
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  onClick={close}
                  className="mt-3 inline-flex items-center justify-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  See the full story <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
