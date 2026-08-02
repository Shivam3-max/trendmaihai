"use client";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Check, Share2 } from "lucide-react";
import { getSetup, getProductsByIds, getCommunitySetups } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { Price } from "@/components/commerce/atoms";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/chrome/SectionHeader";
import { useStore } from "@/store/useStore";
import { cn, formatPrice, formatCount } from "@/lib/utils/cn";

export default function SetupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const setup = getSetup(id);
  const add = useStore((s) => s.addToCart);
  const [active, setActive] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!setup) notFound();
  const products = getProductsByIds(setup.productIds);
  const hotspotProducts = getProductsByIds(setup.hotspots.map((h) => h.productId));
  const total = products.reduce((n, p) => n + p.price, 0);
  const others = getCommunitySetups().filter((s) => s.id !== setup.id);

  const buyAll = () => {
    products.forEach((p) => add(p.id));
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="container-page py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* image with hotspots */}
        <div>
          <div className="relative overflow-hidden rounded-lg border border-border">
            <div className="relative aspect-[4/3]">
              <ProductMedia src={setup.image} alt={setup.title} seed={setup.id} priority className="absolute inset-0 h-full w-full" />
              {setup.hotspots.map((h, i) => {
                const p = hotspotProducts.find((x) => x.id === h.productId);
                const isActive = active === h.productId;
                return (
                  <button
                    key={i}
                    onClick={() => setActive(isActive ? null : h.productId)}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                    aria-label={p?.title}
                  >
                    <span className={cn("block h-5 w-5 rounded-full ring-4 transition-all", isActive ? "bg-accent ring-accent/30 scale-125" : "bg-white ring-white/40 animate-pulse-dot")} />
                    <AnimatePresence>
                      {isActive && p && (
                        <motion.span
                          initial={{ opacity: 0, y: 6, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.9 }}
                          className="absolute left-1/2 top-7 z-10 w-44 -translate-x-1/2 rounded-md border border-border bg-white p-2 text-left shadow-lg"
                        >
                          <span className="flex items-center gap-2">
                            <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-sm">
                              <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-xs font-semibold text-text">{p.title}</span>
                              <Price price={p.price} className="text-[0.7rem]" />
                            </span>
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <ProductMedia src={setup.authorAvatar} alt={setup.author} seed={setup.id + "a"} className="h-full w-full" />
            </div>
            <div className="flex-1">
              <p className="font-sub text-sm font-semibold">{setup.title}</p>
              <p className="text-xs text-text-muted">by {setup.author}</p>
            </div>
            <button onClick={() => setLiked(!liked)} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm">
              <Heart className={cn("h-4 w-4", liked && "fill-error text-error")} /> {formatCount(setup.likes + (liked ? 1 : 0))}
            </button>
            <button className="grid h-9 w-9 place-items-center rounded-full border border-border" aria-label="Share"><Share2 className="h-4 w-4" /></button>
          </div>
        </div>

        {/* shop the room */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
            <p className="eyebrow mb-1">Shop the room</p>
            <h1 className="font-display text-2xl font-semibold">{setup.title}</h1>
            <p className="mt-1 text-sm text-text-secondary">{products.length} pieces · tap a dot on the photo to find each one</p>

            <ul className="mt-5 space-y-3">
              {products.map((p) => (
                <li
                  key={p.id}
                  onMouseEnter={() => setActive(p.id)}
                  onMouseLeave={() => setActive(null)}
                  className={cn("flex items-center gap-3 rounded-md p-2 transition-colors", active === p.id && "bg-accent-soft")}
                >
                  <Link href={`/product/${p.slug}`} className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm">
                    <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${p.slug}`} className="line-clamp-1 text-sm font-medium hover:text-accent">{p.title}</Link>
                    <Price price={p.price} className="text-xs" />
                  </div>
                  <button onClick={() => add(p.id)} aria-label="Add" className="grid h-8 w-8 place-items-center rounded-full border border-border hover:border-accent hover:text-accent">
                    <span className="text-lg leading-none">+</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-text-secondary">Full room</span>
              <span className="font-mono text-xl font-medium">{formatPrice(total)}</span>
            </div>
            <Button onClick={buyAll} variant="accent" size="lg" className="mt-3 w-full">
              {added ? <><Check className="h-5 w-5" /> Room added to cart</> : `Buy the whole room (${products.length})`}
            </Button>
          </div>
        </div>
      </div>

      {/* more setups */}
      <section className="mt-16">
        <SectionHeader eyebrow="Keep exploring" title="More community setups" href="/community" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {others.map((s) => (
            <Link key={s.id} href={`/community/${s.id}`} className="group relative block overflow-hidden rounded-md border border-border">
              <div className="relative aspect-[4/5]">
                <ProductMedia src={s.image} alt={s.title} seed={s.id} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 text-white">
                  <p className="line-clamp-1 text-sm font-semibold">{s.title}</p>
                  <span className="inline-flex items-center gap-1 font-mono text-xs opacity-90"><Heart className="h-3 w-3 fill-white" /> {formatCount(s.likes)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
