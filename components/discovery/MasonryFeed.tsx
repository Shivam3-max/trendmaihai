"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";
import type { FeedItem } from "@/lib/data/types";
import { getFeedPage } from "@/lib/data/repository";
import { ProductCard } from "@/components/cards/ProductCard";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { useStore } from "@/store/useStore";
import { formatCount } from "@/lib/utils/cn";

export function MasonryFeed({ initialCursor = 0 }: { initialCursor?: number }) {
  const topMoods = useStore((s) => s.topMoods);
  const [items, setItems] = useState<FeedItem[]>([]);
  const [cursor, setCursor] = useState<number | null>(initialCursor);
  const [loading, setLoading] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (cursor === null || loading) return;
    setLoading(true);
    // simulate async without blocking; keeps UX real
    const page = getFeedPage(cursor, 12, topMoods());
    setTimeout(() => {
      setItems((prev) => [...prev, ...page.items]);
      setCursor(page.nextCursor);
      setLoading(false);
    }, 180);
  }, [cursor, loading, topMoods]);

  // initial load
  useEffect(() => {
    const page = getFeedPage(0, 12, topMoods());
    setItems(page.items);
    setCursor(page.nextCursor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
      { rootMargin: "600px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [loadMore]);

  return (
    <div>
      <div className="[column-fill:_balance] columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4 xl:columns-5">
        {items.map((item, i) => (
          <div key={i} className="mb-3 break-inside-avoid md:mb-4">
            <FeedCell item={item} priority={i < 5} />
          </div>
        ))}
        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div key={`sk-${i}`} className="mb-3 break-inside-avoid md:mb-4">
              <div className="skeleton rounded-md" style={{ height: 220 + (i % 3) * 60 }} />
            </div>
          ))}
      </div>
      <div ref={sentinel} className="h-10" />
      {cursor === null && (
        <p className="py-8 text-center font-mono text-sm text-text-muted">
          You&apos;ve seen the best of today — check back for fresh drops ✦
        </p>
      )}
    </div>
  );
}

function FeedCell({ item, priority }: { item: FeedItem; priority?: boolean }) {
  if (item.kind === "product") return <ProductCard product={item.product} masonry priority={priority} />;

  if (item.kind === "reel") {
    const p = item.product;
    return (
      <Link href={`/reels`} className="group relative block overflow-hidden rounded-md border border-border">
        <div className="relative" style={{ aspectRatio: "9 / 14" }}>
          <ProductMedia src={p.image} alt={p.title} seed={p.id} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 font-mono text-[0.6rem] font-bold text-text">▶ REEL</span>
          <div className="absolute inset-x-3 bottom-3 text-white">
            <p className="line-clamp-1 text-sm font-semibold">{p.title}</p>
            <p className="font-mono text-xs opacity-90">from ₹{p.price.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </Link>
    );
  }

  // setup
  const s = item.setup;
  return (
    <Link href={`/community/${s.id}`} className="group relative block overflow-hidden rounded-md border border-border">
      <div className="relative" style={{ aspectRatio: "4 / 5" }}>
        <ProductMedia src={s.image} alt={s.title} seed={s.id} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-2 py-0.5 font-mono text-[0.6rem] font-bold text-white">SHOP THE ROOM</span>
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-white">
          <div>
            <p className="line-clamp-1 text-sm font-semibold">{s.title}</p>
            <p className="text-xs opacity-90">by {s.author}</p>
          </div>
          <span className="inline-flex items-center gap-1 font-mono text-xs">
            <Heart className="h-3.5 w-3.5 fill-white" /> {formatCount(s.likes)}
          </span>
        </div>
        <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white/90 opacity-0 transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
