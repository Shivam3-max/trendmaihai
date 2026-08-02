"use client";
import Link from "next/link";
import { Package, Heart, Trophy, Settings, Flame, ChevronRight, Sparkles } from "lucide-react";
import { useStore } from "@/store/useStore";
import { ExplorerLevelRing } from "@/components/gamification/ExplorerLevelRing";
import { levelFor } from "@/lib/data/repository";

export default function ProfilePage() {
  const points = useStore((s) => s.points);
  const streak = useStore((s) => s.streak);
  const saved = useStore((s) => s.saved);
  const cart = useStore((s) => s.cart);
  const { name } = levelFor(points);

  const links = [
    { href: "/profile/orders", label: "Orders", desc: "Track & re-order", icon: Package },
    { href: "/profile/saved", label: "Saved", desc: `${saved.length} in your wishlist`, icon: Heart },
    { href: "/profile/rewards", label: "Rewards", desc: "Badges, streak & spin", icon: Trophy },
    { href: "/profile/settings", label: "Settings", desc: "Profile & preferences", icon: Settings },
  ];

  return (
    <div className="container-page py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* left: identity card */}
        <aside className="h-fit rounded-lg border border-border bg-surface p-6 text-center shadow-sm">
          <ExplorerLevelRing points={points} />
          <div className="mt-5 flex items-center justify-center gap-4 border-t border-border pt-4">
            <div className="text-center">
              <p className="inline-flex items-center gap-1 font-mono text-lg font-medium"><Flame className="h-4 w-4 text-warning" /> {streak}</p>
              <p className="font-mono text-[0.65rem] text-text-muted">day streak</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-lg font-medium">{saved.length}</p>
              <p className="font-mono text-[0.65rem] text-text-muted">saved</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-lg font-medium">{cart.reduce((n, l) => n + l.qty, 0)}</p>
              <p className="font-mono text-[0.65rem] text-text-muted">in cart</p>
            </div>
          </div>
        </aside>

        {/* right */}
        <div>
          <p className="eyebrow mb-1">Welcome back, {name}</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Your profile</h1>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <Link key={l.href} href={l.href} className="group flex items-center gap-4 rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent"><Icon className="h-5 w-5" /></span>
                  <div className="flex-1">
                    <p className="font-sub font-semibold">{l.label}</p>
                    <p className="text-sm text-text-muted">{l.desc}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-text-muted transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>

          <Link href="/profile/rewards" className="mt-3 flex items-center gap-3 overflow-hidden rounded-lg bg-gradient-to-r from-accent to-accent-secondary p-5 text-white">
            <Sparkles className="h-6 w-6" />
            <div className="flex-1">
              <p className="font-sub font-semibold">Spin the wheel today</p>
              <p className="text-sm text-white/80">You have a free daily spin waiting.</p>
            </div>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
