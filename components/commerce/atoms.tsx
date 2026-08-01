"use client";
import { cn } from "@/lib/utils/cn";
import { formatPrice, formatCount, savingsPct } from "@/lib/utils/cn";
import type { Product, SignalBadge } from "@/lib/data/types";
import { Flame, TrendingUp, Sparkles, Star, Heart } from "lucide-react";
import { useStore } from "@/store/useStore";

/* ---------- Price ---------- */
export function Price({
  price,
  compareAt,
  className,
}: {
  price: number;
  compareAt?: number;
  className?: string;
}) {
  const pct = savingsPct(price, compareAt);
  return (
    <span className={cn("inline-flex items-baseline gap-2 font-mono", className)}>
      <span className="font-medium text-text">{formatPrice(price)}</span>
      {compareAt && (
        <span className="text-xs text-text-muted line-through">{formatPrice(compareAt)}</span>
      )}
      {pct && (
        <span className="rounded-full bg-success/10 px-1.5 py-0.5 text-[0.65rem] font-semibold text-success">
          -{pct}%
        </span>
      )}
    </span>
  );
}

/* ---------- Signal chips ---------- */
const BADGE_META: Record<SignalBadge, { label: string; icon: React.ElementType; cls: string }> = {
  viral: { label: "Viral", icon: Flame, cls: "text-accent-secondary bg-accent-secondary/10" },
  rising: { label: "Rising", icon: TrendingUp, cls: "text-accent bg-accent/10" },
  new: { label: "New", icon: Sparkles, cls: "text-text bg-bg-secondary" },
  editor: { label: "Editor's pick", icon: Star, cls: "text-warning bg-warning/10" },
  bestseller: { label: "Bestseller", icon: Star, cls: "text-success bg-success/10" },
};

export function SignalChip({ badge }: { badge: SignalBadge }) {
  const m = BADGE_META[badge];
  const Icon = m.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold backdrop-blur",
        m.cls
      )}
    >
      <Icon className="h-3 w-3" strokeWidth={2} />
      {m.label}
    </span>
  );
}

/* ---------- Stock meter ---------- */
export function StockMeter({ stock, className }: { stock: number; className?: string }) {
  const pct = Math.min(100, (stock / 40) * 100);
  const low = stock <= 8;
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-1 w-16 overflow-hidden rounded-full bg-divider">
        <div
          className={cn("h-full rounded-full", low ? "bg-warning" : "bg-success")}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={cn("font-mono text-[0.7rem]", low ? "text-warning" : "text-text-muted")}>
        {low ? `Only ${stock} left` : "In stock"}
      </span>
    </div>
  );
}

/* ---------- Rating ---------- */
export function Rating({ avg, count, className }: { avg: number; count?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs text-text-secondary", className)}>
      <Star className="h-3.5 w-3.5 fill-warning text-warning" />
      <span className="font-mono font-medium text-text">{avg.toFixed(1)}</span>
      {count !== undefined && <span className="text-text-muted">({formatCount(count)})</span>}
    </span>
  );
}

/* ---------- Save (heart) button ---------- */
export function SaveButton({
  productId,
  className,
  size = 18,
  floating = true,
}: {
  productId: string;
  className?: string;
  size?: number;
  floating?: boolean;
}) {
  const saved = useStore((s) => s.saved.includes(productId));
  const toggle = useStore((s) => s.toggleSaved);
  return (
    <button
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      className={cn(
        "grid place-items-center rounded-full transition-all duration-200 active:scale-90 cursor-pointer",
        floating && "h-9 w-9 bg-white/85 backdrop-blur shadow-sm hover:bg-white",
        className
      )}
    >
      <Heart
        style={{ width: size, height: size }}
        className={cn(
          "transition-colors",
          saved ? "fill-error text-error" : "text-text"
        )}
        strokeWidth={2}
      />
    </button>
  );
}

/* ---------- Trending score ---------- */
export function TrendingScore({ score }: { score: number }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[0.7rem] text-accent-secondary">
      <Flame className="h-3 w-3" />
      {score}
    </span>
  );
}

export { formatPrice, formatCount };
export type { Product };
