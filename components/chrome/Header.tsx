"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Heart, ShoppingBag, Flame } from "lucide-react";
import { useStore } from "@/store/useStore";
import { ProfileMenu } from "@/components/chrome/ProfileMenu";
import { cn } from "@/lib/utils/cn";

const LENSES = [
  { href: "/trending", label: "Trending" },
  { href: "/discover", label: "Discover" },
  { href: "/moods", label: "Moods" },
  { href: "/collections", label: "Collections" },
  { href: "/deals", label: "Deals" },
  { href: "/creators", label: "Creators" },
  { href: "/community", label: "Community" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const setSearchOpen = useStore((s) => s.setSearchOpen);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const cart = useStore((s) => s.cart);
  const saved = useStore((s) => s.saved);
  const points = useStore((s) => s.points);
  const user = useStore((s) => s.user);
  const count = cart.reduce((n, l) => n + l.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled ? "border-b border-border bg-white/75 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[68px]">
        {/* wordmark */}
        <Link href="/" className="flex shrink-0 items-center gap-1">
          <span className="font-display text-lg font-bold tracking-tight text-text">
            TrendMe<span className="accent-sweep">Hai</span>
          </span>
        </Link>

        {/* lenses (desktop) */}
        <nav className="hidden shrink-0 items-center gap-1 lg:flex">
          {LENSES.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  active ? "text-text" : "text-text-secondary hover:text-text"
                )}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="lens-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* actions */}
        <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5 md:gap-2.5">
          <button
            onClick={() => setSearchOpen(true)}
            className="group hidden min-w-0 shrink items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-muted transition-colors hover:border-accent/40 hover:text-text md:flex cursor-pointer"
          >
            <Search className="h-4 w-4 shrink-0 text-accent" />
            <span className="truncate whitespace-nowrap font-sub">What are you looking for?</span>
            <kbd className="ml-2 hidden shrink-0 rounded border border-border bg-bg-secondary px-1.5 font-mono text-[0.65rem] text-text-muted xl:inline">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="grid h-10 w-10 place-items-center rounded-full text-text hover:bg-surface-hover md:hidden cursor-pointer"
          >
            <Search className="h-5 w-5" />
          </button>

          {user && (
            <span className="hidden shrink-0 items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs font-medium text-accent sm:inline-flex">
              <Flame className="h-3.5 w-3.5" /> {points}
            </span>
          )}

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative grid h-10 w-10 place-items-center rounded-full text-text hover:bg-surface-hover"
          >
            <Heart className="h-5 w-5" />
            {saved.length > 0 && (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-error px-1 font-mono text-[0.6rem] font-bold text-white">
                {saved.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-full text-text hover:bg-surface-hover cursor-pointer"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 font-mono text-[0.6rem] font-bold text-white"
              >
                {count}
              </motion.span>
            )}
          </button>

          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
