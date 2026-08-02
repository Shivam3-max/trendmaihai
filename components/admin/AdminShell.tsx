"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, ShoppingCart, Package, Users, Ticket, Star, FileText,
  LayoutTemplate, Megaphone, Bell, Share2, Sparkles, ExternalLink, Search, Menu, X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const NAV = [
  { group: "Overview", items: [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  ]},
  { group: "Commerce", items: [
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/coupons", label: "Coupons", icon: Ticket },
    { href: "/admin/reviews", label: "Reviews", icon: Star },
  ]},
  { group: "Content", items: [
    { href: "/admin/homepage-builder", label: "Homepage Builder", icon: LayoutTemplate },
    { href: "/admin/content", label: "Content", icon: FileText },
    { href: "/admin/landing", label: "Landing Pages", icon: LayoutTemplate },
  ]},
  { group: "Growth", items: [
    { href: "/admin/marketing", label: "Marketing", icon: Megaphone },
    { href: "/admin/notifications", label: "Notifications", icon: Bell },
    { href: "/admin/referrals", label: "Referrals", icon: Share2 },
    { href: "/admin/influencers", label: "Influencers", icon: Sparkles },
  ]},
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const Sidebar = (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex h-16 items-center justify-between px-5">
        <Link href="/admin" className="font-display text-lg font-bold tracking-tight">
          TrendMe<span className="accent-sweep">Hai</span>
          <span className="ml-1.5 rounded bg-bg-secondary px-1.5 py-0.5 align-middle font-mono text-[0.6rem] font-medium text-text-muted">admin</span>
        </Link>
        <button onClick={() => setOpen(false)} className="lg:hidden" aria-label="Close menu"><X className="h-5 w-5" /></button>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {NAV.map((section) => (
          <div key={section.group} className="mb-4">
            <p className="px-3 pb-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-text-muted">{section.group}</p>
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-DEFAULT px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-accent-soft text-accent" : "text-text-secondary hover:bg-surface-hover hover:text-text"
                  )}
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.9} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <Link href="/" className="flex items-center gap-2 rounded-DEFAULT px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-text">
          <ExternalLink className="h-4 w-4" /> View storefront
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-bg-secondary">
      <div className="hidden lg:block">{Sidebar}</div>
      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-text/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0">{Sidebar}</div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-white/80 px-4 backdrop-blur-md lg:px-6">
          <button onClick={() => setOpen(true)} className="lg:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></button>
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-bg-secondary px-3.5 py-2 text-sm text-text-muted md:max-w-sm">
            <Search className="h-4 w-4" /> <span>Search orders, products, customers…</span>
          </div>
          <span className="hidden items-center gap-2 sm:flex">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-sm font-semibold text-white">S</span>
          </span>
        </header>
        <main className="min-w-0 flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
