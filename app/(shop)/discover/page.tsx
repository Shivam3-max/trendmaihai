"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, LayoutGrid, Play, Heart, Shuffle } from "lucide-react";
import { MasonryFeed } from "@/components/discovery/MasonryFeed";
import { ProductGrid } from "@/components/discovery/ProductGrid";
import { Reels } from "@/components/discovery/Reels";
import { getReelProducts, getMoods, getTrending, getAllProducts } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { cn } from "@/lib/utils/cn";

const MODES = [
  { id: "for-you", label: "For You", icon: Sparkles },
  { id: "masonry", label: "Masonry", icon: LayoutGrid },
  { id: "reels", label: "Reels", icon: Play },
  { id: "moods", label: "Moods", icon: Heart },
  { id: "mystery", label: "Mystery", icon: Shuffle },
] as const;
type Mode = (typeof MODES)[number]["id"];

export default function DiscoverPage() {
  const [mode, setMode] = useState<Mode>("for-you");
  const moods = getMoods();

  return (
    <div className={cn(mode !== "reels" && "container-page", "py-6 md:py-8")}>
      {/* header + switcher */}
      <div className={cn(mode === "reels" && "container-page")}>
        <p className="eyebrow mb-2">Made for you · never ends</p>
        <h1 className="mb-5 font-display text-3xl font-semibold tracking-tight md:text-4xl">Discover</h1>
        <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1">
          {MODES.map((m) => {
            const Icon = m.icon;
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={cn(
                  "relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-white" : "border border-border text-text-secondary hover:text-text"
                )}
              >
                {active && (
                  <motion.span layoutId="mode-pill" className="absolute inset-0 rounded-full bg-text" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
                <span className="relative flex items-center gap-1.5"><Icon className="h-4 w-4" /> {m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {mode === "for-you" && <MasonryFeed />}
      {mode === "masonry" && <ProductGrid products={getAllProducts()} />}
      {mode === "reels" && <Reels products={getReelProducts()} />}
      {mode === "mystery" && <ProductGrid products={[...getAllProducts()].sort(() => Math.random() - 0.5)} />}
      {mode === "moods" && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {moods.map((m) => (
            <Link key={m.slug} href={`/moods/${m.slug}`} className="group relative block overflow-hidden rounded-md border border-border">
              <div className="relative aspect-[4/5]">
                <ProductMedia src={m.image} alt={m.label} seed={m.slug} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <span className="absolute inset-x-3 bottom-3 font-sub text-sm font-semibold text-white">{m.label}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
