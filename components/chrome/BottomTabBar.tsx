"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Sparkles, Heart, ShoppingBag } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils/cn";

export function BottomTabBar() {
  const pathname = usePathname();
  const setCartOpen = useStore((s) => s.setCartOpen);
  const cart = useStore((s) => s.cart);
  const count = cart.reduce((n, l) => n + l.qty, 0);

  const tab = (href: string, active: boolean) =>
    cn(
      "flex flex-1 flex-col items-center justify-center gap-0.5 text-[0.65rem] font-medium transition-colors",
      active ? "text-text" : "text-text-muted"
    );

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/90 backdrop-blur-lg md:hidden">
      <div className="flex h-[62px] items-stretch px-2 pb-[env(safe-area-inset-bottom)]">
        <Link href="/" className={tab("/", pathname === "/")}>
          <Home className="h-5 w-5" /> Home
        </Link>
        <Link href="/discover" className={tab("/discover", pathname.startsWith("/discover"))}>
          <Compass className="h-5 w-5" /> Discover
        </Link>
        <Link
          href="/reels"
          className="flex flex-1 flex-col items-center justify-center"
          aria-label="Reels"
        >
          <span className="grid h-11 w-11 -translate-y-3 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-secondary text-white shadow-accent">
            <Sparkles className="h-5 w-5" />
          </span>
        </Link>
        <Link href="/wishlist" className={tab("/wishlist", pathname.startsWith("/wishlist"))}>
          <Heart className="h-5 w-5" /> Saved
        </Link>
        <button
          onClick={() => setCartOpen(true)}
          className={cn(tab("/cart", false), "relative cursor-pointer")}
        >
          <ShoppingBag className="h-5 w-5" />
          Cart
          {count > 0 && (
            <span className="absolute right-4 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 font-mono text-[0.55rem] font-bold text-white">
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
