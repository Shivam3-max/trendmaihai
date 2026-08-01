"use client";
import { useState } from "react";
import { Flame } from "lucide-react";
import { getTrending, getViral, getMostSaved } from "@/lib/data/repository";
import { ProductGrid } from "@/components/discovery/ProductGrid";
import { cn } from "@/lib/utils/cn";

const TABS = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "rising", label: "Rising" },
] as const;

export default function TrendingPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("today");
  const products = tab === "today" ? getTrending(30) : tab === "week" ? getMostSaved(30) : getViral(30);

  return (
    <div className="container-page py-10 md:py-14">
      <div className="mb-1 flex items-center gap-2">
        <Flame className="h-6 w-6 text-accent-secondary" />
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Trending</h1>
      </div>
      <p className="mb-6 text-text-secondary">What everyone&apos;s discovering right now.</p>

      <div className="mb-8 inline-flex gap-1 rounded-full border border-border bg-bg-secondary p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              tab === t.id ? "bg-surface text-text shadow-sm" : "text-text-secondary hover:text-text"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
