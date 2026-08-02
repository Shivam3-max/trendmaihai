import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Plus, ArrowUpRight } from "lucide-react";
import { getCommunitySetups } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { formatCount } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Community",
  description: "Real rooms from real people — and you can buy the whole setup.",
};

export default function CommunityPage() {
  const setups = getCommunitySetups();
  const feed = [...setups, ...setups, ...setups].slice(0, 10); // richer wall

  return (
    <div className="container-page py-10 md:py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Real rooms, real people</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Community</h1>
          <p className="mt-2 max-w-md text-text-secondary">Setups shared by the community — tap any to shop the whole room.</p>
        </div>
        <Link href="/community/upload" className="inline-flex shrink-0 items-center gap-2 rounded-DEFAULT bg-accent px-5 py-3 font-sub font-semibold text-white shadow-accent">
          <Plus className="h-4 w-4" /> Share yours
        </Link>
      </div>

      <div className="mt-8 [column-fill:_balance] columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        {feed.map((s, i) => (
          <div key={i} className="mb-3 break-inside-avoid md:mb-4">
            <Link href={`/community/${s.id}`} className="group relative block overflow-hidden rounded-md border border-border">
              <div className="relative" style={{ aspectRatio: i % 3 === 0 ? "4 / 5" : "1 / 1" }}>
                <ProductMedia src={s.image} alt={s.title} seed={s.id + i} priority={i < 4} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-accent px-2 py-0.5 font-mono text-[0.6rem] font-bold text-white">SHOP THE ROOM</span>
                <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white/90 opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <div className="absolute inset-x-3 bottom-3 text-white">
                  <p className="line-clamp-1 text-sm font-semibold">{s.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-90">by {s.author}</span>
                    <span className="inline-flex items-center gap-1 font-mono text-xs"><Heart className="h-3 w-3 fill-white" /> {formatCount(s.likes)}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
