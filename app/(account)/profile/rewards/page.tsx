"use client";
import {
  Heart, Bookmark, Sparkles, Compass, Flame, Package, Crown, Trophy, Lock, Copy, Check,
} from "lucide-react";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { BADGES, getLeaderboard, levelFor } from "@/lib/data/repository";
import { ExplorerLevelRing } from "@/components/gamification/ExplorerLevelRing";
import { SpinWheel } from "@/components/gamification/SpinWheel";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { cn, formatCount } from "@/lib/utils/cn";

const ICONS: Record<string, React.ElementType> = {
  heart: Heart, bookmark: Bookmark, sparkles: Sparkles, compass: Compass,
  flame: Flame, package: Package, crown: Crown, trophy: Trophy,
};

export default function RewardsPage() {
  const points = useStore((s) => s.points);
  const streak = useStore((s) => s.streak);
  const saved = useStore((s) => s.saved);
  const taste = useStore((s) => s.taste);
  const [copied, setCopied] = useState(false);

  const moodsExplored = Object.keys(taste).length;
  const earnedCount = (b: (typeof BADGES)[number]) =>
    b.metric === "saved" ? saved.length : b.metric === "points" ? points : b.metric === "moods" ? moodsExplored : 0;
  const leaderboard = getLeaderboard(points);
  const { level, name } = levelFor(points);

  return (
    <div className="container-page py-10 md:py-14">
      <p className="eyebrow mb-2">Discovery has its perks</p>
      <h1 className="mb-8 font-display text-3xl font-semibold tracking-tight md:text-4xl">Rewards</h1>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* left column: level + streak + spin */}
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-surface p-6 text-center shadow-sm">
            <ExplorerLevelRing points={points} size={140} />
          </div>

          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <p className="eyebrow mb-3">Daily streak</p>
            <div className="flex items-center gap-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} className={cn("grid h-9 flex-1 place-items-center rounded-md font-mono text-xs", i < streak ? "bg-warning/15 text-warning" : "bg-bg-secondary text-text-muted")}>
                  {i < streak ? <Flame className="h-4 w-4" /> : d}
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-xs text-text-muted">{streak}-day streak · keep it alive for bonus points</p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <p className="eyebrow mb-4 text-center">Daily spin</p>
            <SpinWheel />
          </div>
        </div>

        {/* right column: badges + leaderboard */}
        <div className="space-y-8">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Badges</h2>
              <span className="font-mono text-sm text-text-muted">{BADGES.filter((b) => earnedCount(b) >= b.need).length}/{BADGES.length} earned</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {BADGES.map((b) => {
                const earned = earnedCount(b) >= b.need;
                const Icon = ICONS[b.icon] ?? Sparkles;
                const pct = Math.min(100, (earnedCount(b) / b.need) * 100);
                return (
                  <div key={b.id} className={cn("rounded-lg border p-4 text-center", earned ? "border-accent/30 bg-accent-soft" : "border-border bg-surface")}>
                    <div className={cn("mx-auto grid h-12 w-12 place-items-center rounded-full", earned ? "bg-accent text-white" : "bg-bg-secondary text-text-muted")}>
                      {earned ? <Icon className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
                    </div>
                    <p className="mt-2 text-sm font-semibold">{b.name}</p>
                    <p className="mt-0.5 text-[0.7rem] leading-tight text-text-muted">{b.desc}</p>
                    {!earned && (
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-divider">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Referral leaderboard</h2>
              <span className="rounded-full bg-bg-secondary px-2.5 py-1 font-mono text-xs text-text-muted">Level {level} · {name}</span>
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              {leaderboard.map((r) => (
                <div key={r.rank} className={cn("flex items-center gap-3 border-b border-border px-4 py-3 last:border-0", r.you && "bg-accent-soft")}>
                  <span className={cn("w-6 font-mono text-sm font-medium", r.rank <= 3 ? "text-accent" : "text-text-muted")}>{r.rank}</span>
                  <div className="relative h-9 w-9 overflow-hidden rounded-full">
                    <ProductMedia src={r.avatar} alt={r.name} seed={r.name} className="h-full w-full" />
                  </div>
                  <span className="flex-1 text-sm font-medium">{r.you ? "You" : `@${r.name}`}</span>
                  <span className="font-mono text-sm">{formatCount(r.points)} pts</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 rounded-lg border border-border bg-bg-secondary p-5 sm:flex-row sm:items-center">
              <div className="flex-1">
                <p className="font-sub font-semibold">Invite friends, climb the board</p>
                <p className="text-sm text-text-secondary">Both of you get 200 points on their first order.</p>
              </div>
              <button
                onClick={() => { navigator.clipboard?.writeText("trendmehai.com/r/you"); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
                className="inline-flex items-center justify-center gap-2 rounded-DEFAULT bg-text px-4 py-2.5 font-sub text-sm font-semibold text-white"
              >
                {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy invite link</>}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
