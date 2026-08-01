"use client";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Bell, Check } from "lucide-react";
import { getDrop, getProductsByIds } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { Price, StockMeter } from "@/components/commerce/atoms";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils/cn";

function useCountdown(target: string) {
  const [left, setLeft] = useState(() => Math.max(0, new Date(target).getTime() - Date.now()));
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, new Date(target).getTime() - Date.now())), 1000);
    return () => clearInterval(t);
  }, [target]);
  return {
    d: Math.floor(left / 86400000),
    h: Math.floor((left % 86400000) / 3600000),
    m: Math.floor((left % 3600000) / 60000),
    s: Math.floor((left % 60000) / 1000),
  };
}

export default function DropDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const drop = getDrop(slug);
  const add = useStore((s) => s.addToCart);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { d, h, m, s } = useCountdown(drop?.endsAt ?? new Date().toISOString());

  if (!drop) notFound();
  const products = getProductsByIds(drop.productIds);

  const doAdd = (id: string) => {
    add(id);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const Unit = ({ v, l }: { v: number; l: string }) => (
    <div className="text-center">
      <div className="min-w-[3.25rem] rounded-md border border-white/10 bg-white/5 px-2 py-2.5 font-mono text-3xl font-medium tabular-nums">{String(v).padStart(2, "0")}</div>
      <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-wider text-spot-muted">{l}</span>
    </div>
  );

  return (
    <div data-surface="spot" className="min-h-screen bg-spot-bg text-spot-text">
      {/* hero */}
      <section className="relative">
        <div className="relative aspect-[21/10] max-h-[520px] w-full overflow-hidden">
          <ProductMedia src={drop.image} alt={drop.title} seed={drop.id} priority className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-spot-bg via-spot-bg/50 to-transparent" />
        </div>
        <div className="container-page relative -mt-24 pb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success px-3 py-1 font-mono text-xs font-bold text-white">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" /> LIVE NOW
          </span>
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-7xl">{drop.title}</h1>
          <p className="mt-3 max-w-lg text-lg text-spot-muted">{drop.tagline}</p>

          <div className="mt-8 flex flex-wrap items-end gap-3">
            <Unit v={d} l="days" /><span className="pb-6 font-mono text-3xl text-spot-muted">:</span>
            <Unit v={h} l="hrs" /><span className="pb-6 font-mono text-3xl text-spot-muted">:</span>
            <Unit v={m} l="min" /><span className="pb-6 font-mono text-3xl text-spot-muted">:</span>
            <Unit v={s} l="sec" />
            <button className="ml-4 inline-flex items-center gap-2 self-center rounded-DEFAULT border border-white/15 px-5 py-3 font-sub font-semibold transition-colors hover:bg-white/5">
              <Bell className="h-4 w-4" /> Notify me
            </button>
          </div>
        </div>
      </section>

      {/* products */}
      <section className="container-page pb-24">
        <p className="eyebrow mb-6 !text-spot-muted">The drop · {products.length} pieces</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-lg border border-white/10 bg-spot-surface">
              <Link href={`/product/${p.slug}`} className="group relative block aspect-[4/5]">
                <ProductMedia src={p.image} alt={p.title} seed={p.id} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-105" />
              </Link>
              <div className="space-y-2 p-4">
                <p className="line-clamp-1 font-sub text-sm font-semibold">{p.title}</p>
                <Price price={p.price} compareAt={p.compareAtPrice} className="[&_.text-text]:!text-white" />
                <StockMeter stock={p.signals.stock} />
                <button
                  onClick={() => doAdd(p.id)}
                  className={cn("mt-1 inline-flex w-full items-center justify-center gap-1.5 rounded-DEFAULT py-2.5 text-sm font-semibold transition-colors", addedId === p.id ? "bg-success text-white" : "bg-white text-spot-bg hover:bg-white/90")}
                >
                  {addedId === p.id ? <><Check className="h-4 w-4" /> Added</> : "Add to cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
