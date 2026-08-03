"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Package, Trophy, Heart, Settings, LogOut, LayoutDashboard, Sparkles } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils/cn";

export function ProfileMenu() {
  const user = useStore((s) => s.user);
  const logout = useStore((s) => s.logout);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!user) {
    return (
      <>
        <Link
          href="/login"
          className="hidden items-center gap-1.5 rounded-full bg-text px-4 py-2 text-sm font-semibold text-white transition-transform active:scale-95 sm:inline-flex"
        >
          Log in
        </Link>
        <Link
          href="/login"
          aria-label="Log in"
          className="grid h-10 w-10 place-items-center rounded-full text-text hover:bg-surface-hover sm:hidden"
        >
          <User className="h-5 w-5" />
        </Link>
      </>
    );
  }

  const initials = user.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  const items = [
    { href: "/profile", label: "Profile", icon: User },
    { href: "/profile/orders", label: "Orders", icon: Package },
    { href: "/profile/rewards", label: "Rewards", icon: Trophy },
    { href: "/profile/saved", label: "Saved", icon: Heart },
    { href: "/profile/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="grid h-9 w-9 place-items-center rounded-full bg-accent text-sm font-semibold text-white"
        aria-label="Account menu"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-60 overflow-hidden rounded-lg border border-border bg-surface shadow-lg">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold text-white">{initials}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate font-mono text-xs text-text-muted">{user.email}</p>
            </div>
          </div>

          {user.role === "creator" && (
            <Link
              href="/creator"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 border-b border-border bg-gradient-to-r from-accent to-accent-secondary px-4 py-3 text-sm font-semibold text-white"
            >
              <LayoutDashboard className="h-4 w-4" /> Creator dashboard
            </Link>
          )}

          <div className="py-1">
            {items.map((it) => {
              const Icon = it.icon;
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover hover:text-text"
                >
                  <Icon className="h-4 w-4" /> {it.label}
                </Link>
              );
            })}
            {user.role !== "creator" && (
              <Link
                href="/creator/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-accent transition-colors hover:bg-surface-hover"
              >
                <Sparkles className="h-4 w-4" /> Become a creator
              </Link>
            )}
          </div>

          <button
            onClick={() => { logout(); setOpen(false); router.push("/"); }}
            className={cn("flex w-full items-center gap-2.5 border-t border-border px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-error")}
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      )}
    </div>
  );
}
