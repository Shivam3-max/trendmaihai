"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { getDrops } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";

function status(startsAt: string, endsAt: string) {
  const now = Date.now();
  if (now < new Date(startsAt).getTime()) return "upcoming";
  if (now > new Date(endsAt).getTime()) return "ended";
  return "live";
}

export default function DropsPage() {
  const drops = getDrops();
  const [, tick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => tick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div data-surface="spot" className="min-h-screen bg-spot-bg text-spot-text">
      <div className="container-page py-14 md:py-20">
        <p className="eyebrow mb-2 !text-spot-muted">Limited · timed · gone fast</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">Drops</h1>
        <p className="mt-3 max-w-lg text-spot-muted">Exclusive runs that disappear when the timer hits zero.</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {drops.map((d) => {
            const st = status(d.startsAt, d.endsAt);
            return (
              <Link key={d.id} href={`/drops/${d.slug}`} className="group overflow-hidden rounded-lg border border-white/10 bg-spot-surface">
                <div className="relative aspect-[16/10]">
                  <ProductMedia src={d.image} alt={d.title} seed={d.id} className="absolute inset-0 h-full w-full" imgClassName="group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-bold ${st === "live" ? "bg-success text-white" : st === "upcoming" ? "bg-white/15 text-white" : "bg-white/10 text-spot-muted"}`}>
                    {st === "live" && <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" />}
                    {st === "live" ? "LIVE NOW" : st === "upcoming" ? "UPCOMING" : "ENDED"}
                  </span>
                  <div className="absolute inset-x-4 bottom-4">
                    <h2 className="font-display text-2xl font-semibold">{d.title}</h2>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80"><Clock className="h-4 w-4" /> {d.tagline}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="font-mono text-sm text-spot-muted">{d.productIds.length} pieces</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold">Enter drop <ArrowRight className="h-4 w-4" /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
