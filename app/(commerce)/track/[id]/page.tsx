import type { Metadata } from "next";
import Link from "next/link";
import { Check, Package, Truck, Home, MapPin, ArrowRight } from "lucide-react";
import { getOrder, getProductsByIds } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { formatPrice, cn } from "@/lib/utils/cn";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: `Track #${id}` };
}

const STEPS = [
  { key: "placed", label: "Order placed", icon: Check, time: "Aug 01, 10:24" },
  { key: "packed", label: "Packed", icon: Package, time: "Aug 01, 18:40" },
  { key: "shipped", label: "Shipped", icon: Truck, time: "Aug 02, 09:15" },
  { key: "out", label: "Out for delivery", icon: MapPin, time: "—" },
  { key: "delivered", label: "Delivered", icon: Home, time: "—" },
] as const;

export default async function TrackDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getOrder(id)!;
  const items = getProductsByIds(order.itemIds);
  const currentIdx = STEPS.findIndex((s) => s.key === order.status);

  return (
    <div className="container-page max-w-3xl py-10 md:py-14">
      <Link href="/track" className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text">← All orders</Link>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-sm text-text-muted">Order</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">#{order.id}</h1>
        </div>
        <span className="rounded-full bg-accent-soft px-3 py-1.5 font-mono text-sm font-semibold text-accent">
          {STEPS[currentIdx]?.label ?? "Processing"}
        </span>
      </div>

      {/* timeline */}
      <div className="mt-10 rounded-lg border border-border bg-surface p-6 shadow-sm">
        <ol className="relative">
          {STEPS.map((s, i) => {
            const done = i <= currentIdx;
            const active = i === currentIdx;
            const Icon = s.icon;
            return (
              <li key={s.key} className="flex gap-4 pb-8 last:pb-0">
                <div className="relative flex flex-col items-center">
                  <span className={cn("z-10 grid h-10 w-10 place-items-center rounded-full border-2 transition-colors", done ? "border-accent bg-accent text-white" : "border-border bg-surface text-text-muted")}>
                    <Icon className="h-5 w-5" />
                  </span>
                  {i < STEPS.length - 1 && <span className={cn("absolute top-10 h-full w-0.5", i < currentIdx ? "bg-accent" : "bg-divider")} />}
                </div>
                <div className={cn("pt-1.5", active && "font-semibold")}>
                  <p className={cn("text-sm", done ? "text-text" : "text-text-muted")}>{s.label}</p>
                  <p className="font-mono text-xs text-text-muted">{s.time}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* items */}
      <div className="mt-6 rounded-lg border border-border bg-surface p-5 shadow-sm">
        <p className="eyebrow mb-4">In this order</p>
        <ul className="space-y-3">
          {items.map((p) => (
            <li key={p.id} className="flex items-center gap-3">
              <Link href={`/product/${p.slug}`} className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm">
                <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" />
              </Link>
              <Link href={`/product/${p.slug}`} className="flex-1 text-sm font-medium hover:text-accent">{p.title}</Link>
              <span className="font-mono text-sm">{formatPrice(p.price)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-text-secondary">Total</span>
          <span className="font-mono text-lg font-medium">{formatPrice(order.total)}</span>
        </div>
      </div>

      <Link href="/discover" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
        Keep discovering while you wait <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
