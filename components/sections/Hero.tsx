"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/data/types";
import { useStore } from "@/store/useStore";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { Price } from "@/components/commerce/atoms";
import { cn } from "@/lib/utils/cn";

const WORDS = ["discover", "fall for", "obsess over", "can't unsee"];

export function Hero({ products }: { products: Product[] }) {
  const [word, setWord] = useState(0);
  const setSearchOpen = useStore((s) => s.setSearchOpen);
  const setQuickView = useStore((s) => s.setQuickView);

  useEffect(() => {
    const t = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2600);
    return () => clearInterval(t);
  }, []);

  const floats = products.slice(0, 4);

  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid items-center gap-10 pb-10 pt-10 md:min-h-[86vh] md:grid-cols-[1.05fr_0.95fr] md:gap-6 md:pb-16 md:pt-6">
        {/* left: copy */}
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-5"
          >
            ✦ Trending right now in India
          </motion.p>

          <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-text">
            You don&apos;t search.
            <br />
            You{" "}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={word}
                initial={{ opacity: 0, y: "0.35em" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-0.35em" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="accent-sweep inline-block whitespace-nowrap"
              >
                {WORDS[word]}
              </motion.span>
            </AnimatePresence>
            .
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
            A shopping feed, not a search box. Scroll into the products everyone&apos;s
            about to want — and buy them in a tap.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setSearchOpen(true)}
              className="group flex items-center gap-3 rounded-DEFAULT border border-border bg-surface px-5 py-3.5 text-left shadow-sm transition-all hover:border-accent/40 hover:shadow-md cursor-pointer sm:min-w-[300px]"
            >
              <Search className="h-5 w-5 text-accent" />
              <span className="flex-1 font-sub text-text-muted">What are you looking for today?</span>
              <ArrowRight className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#discover"
              className="inline-flex items-center justify-center gap-2 rounded-DEFAULT bg-text px-6 py-3.5 font-sub font-semibold text-white transition-transform active:scale-[0.98]"
            >
              Start exploring
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 font-mono text-xs text-text-muted">
            <span><span className="text-text">2M+</span> discovering</span>
            <span><span className="text-text">40k</span> saved today</span>
            <span><span className="text-success">●</span> live</span>
          </div>
        </div>

        {/* right: floating product stage */}
        <div className="relative h-[360px] md:h-[560px]">
          {floats.map((p, i) => (
            <FloatCard key={p.id} product={p} index={i} onClick={() => setQuickView(p.slug)} />
          ))}
          {/* soft accent glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="h-8 w-5 rounded-full border border-border" />
      </motion.div>
    </section>
  );
}

const POS = [
  "left-[2%] top-[6%] w-[46%] rotate-[-4deg]",
  "right-[4%] top-[2%] w-[40%] rotate-[3deg]",
  "left-[10%] bottom-[4%] w-[42%] rotate-[2deg]",
  "right-[2%] bottom-[8%] w-[44%] rotate-[-3deg]",
];

function FloatCard({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: [0, index % 2 === 0 ? -10 : 10, 0] }}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.12 },
        scale: { duration: 0.6, delay: index * 0.12 },
        y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
      }}
      className={cn("group absolute cursor-pointer", POS[index])}
    >
      <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-lg">
        <div className="relative aspect-[4/5]">
          <ProductMedia src={product.image} alt={product.title} seed={product.id} priority className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-105" />
        </div>
        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <span className="line-clamp-1 font-sub text-xs font-semibold">{product.title}</span>
          <Price price={product.price} className="text-[0.7rem]" />
        </div>
      </div>
    </motion.button>
  );
}
