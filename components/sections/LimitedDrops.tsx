"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Bell } from "lucide-react";
import type { Drop, Product } from "@/lib/data/types";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { Price } from "@/components/commerce/atoms";

function useCountdown(target: string) {
  const [left, setLeft] = useState(() => Math.max(0, new Date(target).getTime() - Date.now()));
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, new Date(target).getTime() - Date.now())), 1000);
    return () => clearInterval(t);
  }, [target]);
  const d = Math.floor(left / 86400000);
  const h = Math.floor((left % 86400000) / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const s = Math.floor((left % 60000) / 1000);
  return { d, h, m, s };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="min-w-[3rem] rounded-md border border-white/10 bg-white/5 px-2 py-2 font-mono text-2xl font-medium tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-wider text-spot-muted">{label}</span>
    </div>
  );
}

export function LimitedDropsSpotlight({ drop, products }: { drop: Drop; products: Product[] }) {
  const { d, h, m, s } = useCountdown(drop.endsAt);
  const hero = products[0];

  return (
    <section data-surface="spot" className="bg-spot-bg py-16 text-spot-text md:py-24">
      <div className="container-page">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-4 !text-spot-muted">✦ Limited Drop · Live now</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">{drop.title}</h2>
            <p className="mt-4 max-w-md text-spot-muted">{drop.tagline}</p>

            <div className="mt-8 flex items-center gap-3">
              <Unit value={d} label="days" />
              <span className="pb-4 font-mono text-2xl text-spot-muted">:</span>
              <Unit value={h} label="hrs" />
              <span className="pb-4 font-mono text-2xl text-spot-muted">:</span>
              <Unit value={m} label="min" />
              <span className="pb-4 font-mono text-2xl text-spot-muted">:</span>
              <Unit value={s} label="sec" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/drops/${drop.slug}`} className="inline-flex items-center gap-2 rounded-DEFAULT bg-white px-6 py-3.5 font-sub font-semibold text-spot-bg transition-transform active:scale-[0.98]">
                Enter the drop <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex items-center gap-2 rounded-DEFAULT border border-white/15 px-6 py-3.5 font-sub font-semibold text-white transition-colors hover:bg-white/5 cursor-pointer">
                <Bell className="h-4 w-4" /> Notify me
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {hero && (
              <Link href={`/product/${hero.slug}`} className="group col-span-2 overflow-hidden rounded-lg border border-white/10">
                <div className="relative aspect-[16/10]">
                  <ProductMedia src={hero.image} alt={hero.title} seed={hero.id} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4">
                    <p className="font-sub font-semibold">{hero.title}</p>
                    <Price price={hero.price} compareAt={hero.compareAtPrice} className="[&_*]:!text-white" />
                  </div>
                </div>
              </Link>
            )}
            {products.slice(1, 3).map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="group overflow-hidden rounded-md border border-white/10">
                <div className="relative aspect-square">
                  <ProductMedia src={p.image} alt={p.title} seed={p.id} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-105" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
