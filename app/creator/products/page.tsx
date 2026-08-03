"use client";
import { useState } from "react";
import { Plus, X, Check, ImagePlus } from "lucide-react";
import { getCreatorDashboard, getAllProducts } from "@/lib/data/repository";
import { useStore } from "@/store/useStore";
import { PageHeader, StatTile, StatusPill, Card } from "@/components/admin/ui";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/cn";

export default function CreatorProductsPage() {
  const user = useStore((s) => s.user);
  const dash = getCreatorDashboard(user?.handle);
  const [products, setProducts] = useState(dash.products);
  const [open, setOpen] = useState(false);

  // "list a product" — pick from catalogue not already listed
  const listed = new Set(products.map((p) => p.id));
  const available = getAllProducts().filter((p) => !listed.has(p.id));

  const addProduct = (id: string) => {
    const p = getAllProducts().find((x) => x.id === id);
    if (!p) return;
    setProducts((prev) => [{ id: p.id, title: p.title, image: p.image, price: p.price, commissionPct: 10, sold: 0, earned: 0, status: "Live" as const }, ...prev]);
    setOpen(false);
  };

  const revenue = products.reduce((n, p) => n + p.earned, 0);
  const live = products.filter((p) => p.status === "Live").length;

  return (
    <div>
      <PageHeader
        title="Sell products"
        subtitle="List products to your storefront and earn commission on every sale"
        action={<Button onClick={() => setOpen(true)} variant="accent"><Plus className="h-4 w-4" /> List a product</Button>}
      />

      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatTile label="Listed" value={String(products.length)} />
        <StatTile label="Live" value={String(live)} />
        <StatTile label="Units sold" value={String(products.reduce((n, p) => n + p.sold, 0))} />
        <StatTile label="Earned" value={formatPrice(revenue)} />
      </div>

      <Card className="!p-0 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left font-mono text-[0.7rem] uppercase tracking-wide text-text-muted">
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-3 py-3 font-medium">Price</th>
              <th className="px-3 py-3 font-medium">Commission</th>
              <th className="px-3 py-3 font-medium">Sold</th>
              <th className="px-3 py-3 font-medium">Earned</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surface-hover">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm border border-border">
                      <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" />
                    </div>
                    <span className="font-medium">{p.title}</span>
                  </div>
                </td>
                <td className="px-3 py-3 font-mono">{formatPrice(p.price)}</td>
                <td className="px-3 py-3 font-mono text-accent">{p.commissionPct}%</td>
                <td className="px-3 py-3 font-mono">{p.sold}</td>
                <td className="px-3 py-3 font-mono text-success">{formatPrice(p.earned)}</td>
                <td className="px-5 py-3"><StatusPill status={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* list-a-product modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-text/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg overflow-hidden rounded-lg border border-border bg-surface shadow-lg">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <p className="font-sub font-semibold">List a product</p>
                <p className="text-xs text-text-muted">Pick from the catalogue to add to your storefront</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full hover:bg-surface-hover"><X className="h-5 w-5" /></button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              <div className="mb-4 grid place-items-center rounded-lg border-2 border-dashed border-border bg-bg-secondary py-6 text-center">
                <ImagePlus className="h-6 w-6 text-text-muted" />
                <p className="mt-1.5 text-xs text-text-muted">Or upload your own product photos</p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {available.map((p) => (
                  <button key={p.id} onClick={() => addProduct(p.id)} className="group rounded-DEFAULT border border-border p-2 text-left transition-colors hover:border-accent">
                    <div className="relative aspect-square overflow-hidden rounded-sm">
                      <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" imgClassName="group-hover:scale-105" />
                      <span className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-white/90 text-text opacity-0 shadow-sm transition-opacity group-hover:opacity-100"><Plus className="h-4 w-4" /></span>
                    </div>
                    <p className="mt-1.5 line-clamp-1 text-xs font-medium">{p.title}</p>
                    <p className="font-mono text-[0.7rem] text-text-muted">{formatPrice(p.price)}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
