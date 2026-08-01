"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check, Sparkles, ShieldCheck, RotateCcw, Truck, BadgeIndianRupee,
  ChevronDown, Plus, Star, ArrowRight,
} from "lucide-react";
import type { Product, Review } from "@/lib/data/types";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { Price, Rating, StockMeter, SignalChip, SaveButton } from "@/components/commerce/atoms";
import { ProductCard } from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/chrome/SectionHeader";
import { useStore } from "@/store/useStore";
import { cn, formatPrice, formatCount } from "@/lib/utils/cn";

const ICON: Record<string, React.ElementType> = {
  sparkles: Sparkles, "shield-check": ShieldCheck, feather: Star, zap: Sparkles, leaf: RotateCcw, heart: Star,
};

export function ProductDetail({
  product, completes, alsoBought, reviews,
}: {
  product: Product;
  completes: Product[];
  alsoBought: Product[];
  reviews: Review[];
}) {
  const [variant, setVariant] = useState(0);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [setupPicks, setSetupPicks] = useState<Set<string>>(new Set());

  const addToCart = useStore((s) => s.addToCart);
  const recordMoods = useStore((s) => s.recordMoods);
  const recordView = useStore((s) => s.recordView);

  useEffect(() => {
    recordView(product.id);
    recordMoods(product.moods, 1);
    const onScroll = () => setShowBar(window.scrollY > 620);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const add = () => {
    addToCart(product.id, product.variants[variant]?.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const setupTotal =
    product.price + completes.filter((p) => setupPicks.has(p.id)).reduce((n, p) => n + p.price, 0);
  const toggleSetup = (id: string) =>
    setSetupPicks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const addSetup = () => {
    addToCart(product.id, product.variants[variant]?.id);
    completes.filter((p) => setupPicks.has(p.id)).forEach((p) => addToCart(p.id));
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="container-page grid gap-8 pt-6 md:grid-cols-2 md:gap-12 md:pt-10">
        {/* gallery */}
        <div className="md:sticky md:top-24 md:h-fit">
          <div className="relative overflow-hidden rounded-lg border border-border">
            <div className="relative aspect-[4/5]">
              <ProductMedia src={product.images[activeImg] ?? product.image} alt={product.title} seed={product.id + activeImg} priority className="absolute inset-0 h-full w-full" />
              {product.signals.badges[0] && (
                <div className="absolute left-3 top-3"><SignalChip badge={product.signals.badges[0]} /></div>
              )}
              <div className="absolute right-3 top-3"><SaveButton productId={product.id} /></div>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn("relative h-16 w-16 overflow-hidden rounded-sm border-2 transition-colors", activeImg === i ? "border-accent" : "border-border")}
              >
                <ProductMedia src={img} alt={`${product.title} ${i + 1}`} seed={product.id + "t" + i} className="h-full w-full" />
              </button>
            ))}
          </div>
        </div>

        {/* buy panel */}
        <div className="flex flex-col">
          <Link href={`/moods/${product.moods[0]}`} className="eyebrow hover:text-accent">{product.moods[0]?.replace("-", " ")}</Link>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">{product.title}</h1>
          <p className="mt-2 text-lg text-text-secondary">{product.subtitle}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Price price={product.price} compareAt={product.compareAtPrice} className="text-2xl" />
            <Rating avg={product.reviews.avg} count={product.reviews.count} />
            <span className="inline-flex items-center gap-1 font-mono text-xs text-accent-secondary">
              <Sparkles className="h-3.5 w-3.5" /> {formatCount(product.signals.saveCount)} saved
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-text-secondary">{product.story}</p>

          {/* variants */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">Finish · <span className="text-text-secondary">{product.variants[variant]?.value}</span></p>
            <div className="flex gap-2.5">
              {product.variants.map((v, i) => (
                <button key={v.id} onClick={() => setVariant(i)} aria-label={v.value}
                  className={cn("h-10 w-10 rounded-full border-2 transition-all", variant === i ? "scale-110 border-accent" : "border-border")}
                  style={{ background: v.swatch }} />
              ))}
            </div>
          </div>

          <div className="mt-5"><StockMeter stock={product.signals.stock} /></div>

          <div className="mt-6 flex items-center gap-3">
            <Button onClick={add} variant="accent" size="lg" className="flex-1">
              {added ? <><Check className="h-5 w-5" /> Added to cart</> : "Add to cart"}
            </Button>
            <SaveButton productId={product.id} floating={false} className="h-14 w-14 border border-border" size={22} />
          </div>

          {/* trust */}
          <div className="mt-6 grid grid-cols-2 gap-3 rounded-lg border border-border bg-bg-secondary p-4 sm:grid-cols-4">
            {[[BadgeIndianRupee, "COD"], [RotateCcw, "7-day returns"], [ShieldCheck, "Secure"], [Truck, "Fast delivery"]].map(([Icon, label], i) => {
              const I = Icon as React.ElementType;
              return (
                <div key={i} className="flex flex-col items-center gap-1.5 text-center">
                  <I className="h-5 w-5 text-text-secondary" strokeWidth={1.75} />
                  <span className="text-xs text-text-secondary">{label as string}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- BENEFITS ---------- */}
      <section className="container-page py-16 md:py-20">
        <Reveal className="grid gap-6 md:grid-cols-3">
          {product.benefits.map((b, i) => {
            const I = ICON[b.icon] ?? Sparkles;
            return (
              <RevealItem key={i} className="rounded-lg border border-border bg-surface p-6 shadow-sm">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent"><I className="h-5 w-5" /></div>
                <h3 className="mt-4 font-sub text-lg font-semibold">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{b.text}</p>
              </RevealItem>
            );
          })}
        </Reveal>
      </section>

      {/* ---------- FEATURES (editorial alternating) ---------- */}
      {product.features.map((f, i) => (
        <section key={i} className={cn("py-8", i % 2 === 1 && "bg-bg-secondary")}>
          <div className={cn("container-page grid items-center gap-8 md:grid-cols-2 md:gap-14", i % 2 === 1 && "md:[&>*:first-child]:order-2")}>
            <Reveal><RevealItem>
              <p className="eyebrow mb-3">Detail {String(i + 1).padStart(2, "0")}</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{f.title}</h2>
              <p className="mt-4 max-w-md leading-relaxed text-text-secondary">{f.text}</p>
            </RevealItem></Reveal>
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-border">
              <ProductMedia src={f.image} alt={f.title} seed={product.id + "f" + i} className="absolute inset-0 h-full w-full" />
            </div>
          </div>
        </section>
      ))}

      {/* ---------- REVIEWS ---------- */}
      <section className="container-page py-16 md:py-20">
        <SectionHeader eyebrow="Verified buyers" title="What people are saying" />
        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          <div className="rounded-lg border border-border bg-bg-secondary p-6">
            <div className="flex items-end gap-2">
              <span className="font-display text-5xl font-bold">{product.reviews.avg.toFixed(1)}</span>
              <span className="pb-1.5 font-mono text-sm text-text-muted">/ 5</span>
            </div>
            <div className="mt-1 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn("h-4 w-4", i < Math.round(product.reviews.avg) ? "fill-warning text-warning" : "text-border")} />
              ))}
            </div>
            <p className="mt-1 font-mono text-xs text-text-muted">{formatCount(product.reviews.count)} reviews</p>
            <div className="mt-5 space-y-1.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const c = product.reviews.distribution[star - 1];
                const pct = (c / product.reviews.count) * 100;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="w-3 font-mono text-xs text-text-muted">{star}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-divider">
                      <div className="h-full rounded-full bg-warning" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reviews.map((r) => (
              <figure key={r.id} className="rounded-lg border border-border bg-surface p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full">
                    <ProductMedia src={r.avatar} alt={r.author} seed={r.id} className="h-full w-full" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{r.author}</p>
                    {r.verified && <span className="inline-flex items-center gap-1 font-mono text-[0.65rem] text-success"><Check className="h-3 w-3" /> Verified</span>}
                  </div>
                  <div className="ml-auto"><Rating avg={r.rating} /></div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{r.text}</p>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BUILD YOUR SETUP ---------- */}
      {completes.length > 0 && (
        <section className="bg-bg-secondary py-16 md:py-20">
          <div className="container-page">
            <SectionHeader eyebrow="Make it a whole vibe" title="Build your setup" />
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {completes.slice(0, 4).map((p) => {
                  const on = setupPicks.has(p.id);
                  return (
                    <button key={p.id} onClick={() => toggleSetup(p.id)} className="group text-left">
                      <div className={cn("relative aspect-square overflow-hidden rounded-md border-2 transition-all", on ? "border-accent" : "border-border")}>
                        <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" imgClassName="group-hover:scale-105" />
                        <span className={cn("absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full transition-colors", on ? "bg-accent text-white" : "bg-white/90 text-text")}>
                          {on ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </span>
                      </div>
                      <p className="mt-1.5 line-clamp-1 text-xs font-medium">{p.title}</p>
                      <Price price={p.price} className="text-xs" />
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-col rounded-lg border border-border bg-surface p-5 shadow-sm">
                <p className="font-sub font-semibold">Your setup</p>
                <p className="mt-1 text-sm text-text-secondary">{product.title} + {setupPicks.size} add-on{setupPicks.size === 1 ? "" : "s"}</p>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm text-text-secondary">Total</span>
                  <span className="font-mono text-xl font-medium">{formatPrice(setupTotal)}</span>
                </div>
                <Button onClick={addSetup} variant="accent" className="mt-3 w-full">
                  {added ? <><Check className="h-5 w-5" /> Added</> : `Add setup (${setupPicks.size + 1})`}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- FAQ ---------- */}
      <section className="container-page py-16 md:py-20">
        <SectionHeader eyebrow="Good to know" title="Questions, answered" />
        <div className="mx-auto max-w-2xl divide-y divide-border rounded-lg border border-border">
          {product.faqs.map((f, i) => (
            <div key={i}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="font-medium">{f.q}</span>
                <ChevronDown className={cn("h-5 w-5 shrink-0 text-text-muted transition-transform", openFaq === i && "rotate-180")} />
              </button>
              {openFaq === i && <p className="px-5 pb-4 text-sm leading-relaxed text-text-secondary">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- PEOPLE ALSO BOUGHT ---------- */}
      {alsoBought.length > 0 && (
        <section className="container-page py-8">
          <SectionHeader eyebrow="Pairs well with" title="People also bought" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {alsoBought.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* ---------- CONTINUE BROWSING (no dead end) ---------- */}
      <section className="container-page py-16 text-center">
        <p className="eyebrow mb-3">You&apos;re on a roll</p>
        <h2 className="font-display text-2xl font-semibold md:text-3xl">Keep discovering</h2>
        <Link href="/discover" className="mt-5 inline-flex items-center gap-2 rounded-DEFAULT bg-text px-6 py-3.5 font-sub font-semibold text-white">
          Back to the feed <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* ---------- STICKY BUY BAR ---------- */}
      <motion.div
        initial={false}
        animate={{ y: showBar ? 0 : 120 }}
        transition={{ type: "spring", stiffness: 360, damping: 34 }}
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/90 backdrop-blur-lg md:bottom-0"
      >
        <div className="container-page flex items-center gap-4 py-3">
          <div className="relative hidden h-12 w-12 overflow-hidden rounded-sm sm:block">
            <ProductMedia src={product.image} alt={product.title} seed={product.id} className="h-full w-full" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="line-clamp-1 text-sm font-semibold">{product.title}</p>
            <Price price={product.price} compareAt={product.compareAtPrice} className="text-sm" />
          </div>
          <Button onClick={add} variant="accent" className="shrink-0">
            {added ? <><Check className="h-4 w-4" /> Added</> : "Add to cart"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
