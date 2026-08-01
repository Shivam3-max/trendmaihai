"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { Heart, Plus, Check, ArrowUpRight, Volume2, ChevronUp } from "lucide-react";
import type { Product } from "@/lib/data/types";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { useStore } from "@/store/useStore";
import { cn, formatPrice, formatCount } from "@/lib/utils/cn";

export function Reels({ products }: { products: Product[] }) {
  return (
    <div className="mx-auto h-[calc(100vh-4rem)] max-w-md md:h-[calc(100vh-5rem)]">
      <div className="no-scrollbar h-full snap-y snap-mandatory overflow-y-auto rounded-none md:rounded-lg">
        {products.map((p, i) => (
          <ReelItem key={p.id} product={p} priority={i < 2} />
        ))}
      </div>
    </div>
  );
}

function ReelItem({ product, priority }: { product: Product; priority?: boolean }) {
  const isSaved = useStore((s) => s.saved.includes(product.id));
  const toggle = useStore((s) => s.toggleSaved);
  const add = useStore((s) => s.addToCart);
  const recordMoods = useStore((s) => s.recordMoods);
  const [added, setAdded] = useState(false);
  const lastTap = useRef(0);

  const doAdd = () => {
    add(product.id);
    recordMoods(product.moods, 1.5);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  const onDouble = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) { if (!isSaved) toggle(product.id); recordMoods(product.moods, 2); }
    lastTap.current = now;
  };

  return (
    <section className="relative h-full w-full snap-start snap-always" onClick={onDouble}>
      <div className="relative h-full w-full overflow-hidden bg-black md:rounded-lg">
        <ProductMedia src={product.image} alt={product.title} seed={product.id} priority={priority} className="absolute inset-0 h-full w-full" imgClassName="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

        {/* top progress hint */}
        <div className="absolute inset-x-3 top-3 flex gap-1">
          <span className="h-0.5 flex-1 rounded-full bg-white/70" />
          <span className="h-0.5 flex-1 rounded-full bg-white/25" />
          <span className="h-0.5 flex-1 rounded-full bg-white/25" />
        </div>

        {/* right action rail */}
        <div className="absolute bottom-28 right-3 flex flex-col items-center gap-5 text-white">
          <button onClick={(e) => { e.stopPropagation(); toggle(product.id); }} className="flex flex-col items-center gap-1">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur transition-transform active:scale-90">
              <Heart className={cn("h-6 w-6", isSaved && "fill-error text-error")} />
            </span>
            <span className="font-mono text-xs">{formatCount(product.signals.saveCount)}</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); doAdd(); }} className="flex flex-col items-center gap-1">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-accent shadow-accent transition-transform active:scale-90">
              {added ? <Check className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            </span>
            <span className="font-mono text-xs">buy</span>
          </button>
          <Link href={`/product/${product.slug}`} onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-1">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur">
              <ArrowUpRight className="h-6 w-6" />
            </span>
            <span className="font-mono text-xs">open</span>
          </Link>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 backdrop-blur">
            <Volume2 className="h-5 w-5" />
          </span>
        </div>

        {/* bottom info */}
        <div className="absolute inset-x-4 bottom-6 max-w-[75%] text-white">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 font-mono text-[0.65rem] backdrop-blur">
            {product.moods[0]?.replace("-", " ")}
          </span>
          <Link href={`/product/${product.slug}`} onClick={(e) => e.stopPropagation()} className="mt-2 block font-display text-2xl font-semibold leading-tight">
            {product.title}
          </Link>
          <p className="mt-1 text-sm text-white/85">{product.subtitle}</p>
          <div className="mt-3 flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); doAdd(); }} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform active:scale-95">
              {added ? <><Check className="h-4 w-4" /> Added</> : <>Add · {formatPrice(product.price)}</>}
            </button>
          </div>
        </div>

        {/* swipe cue */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center text-white/50">
          <ChevronUp className="h-4 w-4" />
          <span className="font-mono text-[0.6rem]">swipe</span>
        </div>
      </div>
    </section>
  );
}
