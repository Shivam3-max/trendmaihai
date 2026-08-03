"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { useStore } from "@/store/useStore";
import { CreatorShell } from "@/components/creator/CreatorShell";

const BARE = ["/creator/login", "/creator/apply"];

export function CreatorGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useStore((s) => s.user);
  const [ready, setReady] = useState(false);

  // wait for persisted store to hydrate before deciding
  useEffect(() => setReady(true), []);

  // login / apply screens render without the dashboard shell
  if (BARE.includes(pathname)) return <>{children}</>;

  if (!ready) {
    return <div className="grid min-h-screen place-items-center bg-bg-secondary"><div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" /></div>;
  }

  if (!user || user.role !== "creator") {
    return (
      <div className="grid min-h-screen place-items-center bg-bg-secondary px-6">
        <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-8 text-center shadow-sm">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-soft text-accent"><Lock className="h-6 w-6" /></div>
          <h1 className="mt-5 font-display text-2xl font-semibold">Creator access only</h1>
          <p className="mt-2 text-sm text-text-secondary">Log in to your creator account to reach the dashboard.</p>
          <Link href="/creator/login" className="mt-6 inline-block w-full rounded-DEFAULT bg-accent py-3 font-sub font-semibold text-white shadow-accent">
            Creator log in
          </Link>
          <Link href="/" className="mt-3 inline-block text-sm text-text-secondary hover:text-text">Back to store</Link>
        </div>
      </div>
    );
  }

  return <CreatorShell>{children}</CreatorShell>;
}
