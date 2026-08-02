"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, Search } from "lucide-react";
import { getMockOrders } from "@/lib/data/repository";

export default function TrackPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const recent = getMockOrders();

  return (
    <div className="container-page max-w-xl py-16 text-center md:py-24">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-bg-secondary"><Package className="h-7 w-7 text-text-secondary" /></div>
      <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight md:text-4xl">Track your order</h1>
      <p className="mt-2 text-text-secondary">Enter your order ID to see where it is.</p>

      <form
        onSubmit={(e) => { e.preventDefault(); if (id.trim()) router.push(`/track/${id.trim()}`); }}
        className="mx-auto mt-8 flex max-w-md gap-2"
      >
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="e.g. TMH482910"
          className="h-12 flex-1 rounded-DEFAULT border border-border bg-surface px-4 text-base outline-none focus:border-accent"
        />
        <button className="inline-flex h-12 items-center gap-2 rounded-DEFAULT bg-accent px-5 font-sub font-semibold text-white shadow-accent">
          <Search className="h-4 w-4" /> Track
        </button>
      </form>

      <div className="mt-10 text-left">
        <p className="eyebrow mb-3">Recent orders</p>
        <div className="space-y-2">
          {recent.map((o) => (
            <Link key={o.id} href={`/track/${o.id}`} className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm transition-colors hover:border-accent">
              <span className="font-mono font-medium">#{o.id}</span>
              <span className="font-mono text-text-muted">{o.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
