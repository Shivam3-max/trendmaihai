"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Package, Share2, Wallet, Store, LogOut, ExternalLink, Menu, X,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils/cn";

const NAV = [
  { href: "/creator", label: "Dashboard", icon: LayoutDashboard },
  { href: "/creator/products", label: "Sell products", icon: Package },
  { href: "/creator/referrals", label: "Refer & earn", icon: Share2 },
  { href: "/creator/payouts", label: "Payouts", icon: Wallet },
];

export function CreatorShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useStore((s) => s.user);
  const logout = useStore((s) => s.logout);
  const [open, setOpen] = useState(false);

  const initials = user?.name.split(" ").map((w) => w[0]).slice(0, 2).join("") ?? "C";

  const Sidebar = (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex h-16 items-center justify-between px-5">
        <Link href="/creator" className="font-display text-lg font-bold tracking-tight">
          TrendMe<span className="accent-sweep">Hai</span>
          <span className="ml-1.5 rounded bg-accent-soft px-1.5 py-0.5 align-middle font-mono text-[0.6rem] font-medium text-accent">creator</span>
        </Link>
        <button onClick={() => setOpen(false)} className="lg:hidden" aria-label="Close"><X className="h-5 w-5" /></button>
      </div>
      <nav className="flex-1 px-3 py-2">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/creator" ? pathname === "/creator" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "mb-1 flex items-center gap-2.5 rounded-DEFAULT px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-accent-soft text-accent" : "text-text-secondary hover:bg-surface-hover hover:text-text"
              )}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} /> {item.label}
            </Link>
          );
        })}
        {user?.handle && (
          <Link href={`/creators/${user.handle}`} className="mt-2 flex items-center gap-2.5 rounded-DEFAULT px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-hover hover:text-text">
            <Store className="h-[18px] w-[18px]" strokeWidth={1.9} /> My storefront <ExternalLink className="ml-auto h-3.5 w-3.5" />
          </Link>
        )}
      </nav>
      <div className="border-t border-border p-3">
        <button onClick={() => { logout(); router.push("/"); }} className="flex w-full items-center gap-2.5 rounded-DEFAULT px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-error">
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-bg-secondary">
      <div className="hidden lg:block">{Sidebar}</div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-text/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0">{Sidebar}</div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-white/80 px-4 backdrop-blur-md lg:px-8">
          <button onClick={() => setOpen(true)} className="lg:hidden" aria-label="Menu"><Menu className="h-5 w-5" /></button>
          <div className="flex-1" />
          <div className="flex items-center gap-2.5">
            <span className="hidden text-right sm:block">
              <span className="block text-sm font-semibold leading-tight">{user?.name}</span>
              <span className="block font-mono text-xs text-text-muted">@{user?.handle}</span>
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-sm font-semibold text-white">{initials}</span>
          </div>
        </header>
        <main className="min-w-0 flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
