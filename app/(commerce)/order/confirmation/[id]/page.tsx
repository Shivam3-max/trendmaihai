"use client";
import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Package, ArrowRight, Sparkles } from "lucide-react";
import { getTrending } from "@/lib/data/repository";
import { ProductCard } from "@/components/cards/ProductCard";
import { SectionHeader } from "@/components/chrome/SectionHeader";
import { useStore } from "@/store/useStore";

export default function ConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const points = useStore((s) => s.points);
  const recs = getTrending(4);

  return (
    <div>
      <section className="container-page py-16 text-center md:py-24">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/10 text-success"
        >
          <Check className="h-10 w-10" strokeWidth={2.5} />
        </motion.div>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">Order confirmed</h1>
        <p className="mt-2 text-text-secondary">Thank you — your order is on its way to being packed.</p>
        <p className="mt-4 inline-block rounded-full bg-bg-secondary px-4 py-1.5 font-mono text-sm">Order #{id}</p>

        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-medium text-accent">
          <Sparkles className="h-4 w-4" /> You earned points! Balance: <span className="font-mono">{points}</span>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/track" className="inline-flex items-center gap-2 rounded-DEFAULT border border-border bg-surface px-6 py-3.5 font-sub font-semibold">
            <Package className="h-4 w-4" /> Track order
          </Link>
          <Link href="/discover" className="inline-flex items-center gap-2 rounded-DEFAULT bg-text px-6 py-3.5 font-sub font-semibold text-white">
            Keep exploring <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="container-page pb-20">
        <SectionHeader eyebrow="People with your taste also loved" title="Before you go…" href="/discover" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {recs.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
