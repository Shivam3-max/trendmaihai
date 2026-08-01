import type { Metadata } from "next";
import Link from "next/link";
import { getMoods } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";

export const metadata: Metadata = {
  title: "Shop by Mood",
  description: "Shop by feeling, not category. Find your vibe and buy the whole thing.",
};

export default function MoodsPage() {
  const moods = getMoods();
  return (
    <div className="container-page py-10 md:py-14">
      <p className="eyebrow mb-2">Shop by feeling, not category</p>
      <h1 className="mb-8 font-display text-3xl font-semibold tracking-tight md:text-4xl">Shop by Mood</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {moods.map((m, i) => (
          <Link key={m.slug} href={`/moods/${m.slug}`} className="group relative block overflow-hidden rounded-md border border-border">
            <div className="relative aspect-[4/5]">
              <ProductMedia src={m.image} alt={m.label} seed={m.slug} priority={i < 4} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 text-white">
                <p className="font-sub text-lg font-semibold">{m.label}</p>
                <p className="mt-0.5 line-clamp-1 text-xs opacity-85">{m.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
