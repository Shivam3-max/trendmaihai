import type { Metadata } from "next";
import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";
import { getMockOrders, getProductsByIds } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { formatPrice } from "@/lib/utils/cn";

export const metadata: Metadata = { title: "Your orders" };

const STATUS_LABEL: Record<string, string> = {
  placed: "Placed", packed: "Packed", shipped: "Shipped", out: "Out for delivery", delivered: "Delivered",
};

export default function OrdersPage() {
  const orders = getMockOrders();
  return (
    <div className="container-page py-10 md:py-14">
      <div className="mb-8 flex items-center gap-2">
        <Package className="h-6 w-6" />
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Your orders</h1>
      </div>

      <div className="space-y-4">
        {orders.map((o) => {
          const items = getProductsByIds(o.itemIds);
          const delivered = o.status === "delivered";
          return (
            <div key={o.id} className="rounded-lg border border-border bg-surface p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="font-mono text-sm font-medium">#{o.id}</p>
                  <p className="font-mono text-xs text-text-muted">Placed {o.date}</p>
                </div>
                <span className={`rounded-full px-3 py-1 font-mono text-xs font-semibold ${delivered ? "bg-success/10 text-success" : "bg-accent-soft text-accent"}`}>
                  {STATUS_LABEL[o.status]}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {items.map((p) => (
                    <div key={p.id} className="relative h-14 w-14 overflow-hidden rounded-md border-2 border-white">
                      <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" />
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <p className="line-clamp-1 text-sm">{items.map((p) => p.title).join(", ")}</p>
                  <p className="font-mono text-sm font-medium">{formatPrice(o.total)}</p>
                </div>
                <Link href={`/track/${o.id}`} className="inline-flex items-center gap-1.5 rounded-DEFAULT border border-border px-4 py-2 text-sm font-semibold hover:border-accent hover:text-accent">
                  Track <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
