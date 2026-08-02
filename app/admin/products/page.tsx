import { Plus } from "lucide-react";
import { getAllProducts } from "@/lib/data/repository";
import { PageHeader, StatusPill, Card, StatTile } from "@/components/admin/ui";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { formatPrice, formatCount } from "@/lib/utils/cn";

export default function AdminProductsPage() {
  const products = getAllProducts();
  const outStock = products.filter((p) => p.signals.stock === 0).length;
  const lowStock = products.filter((p) => p.signals.stock > 0 && p.signals.stock <= 8).length;
  const inventoryValue = products.reduce((n, p) => n + p.price * p.signals.stock, 0);

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle={`${products.length} products in catalogue`}
        action={<button className="inline-flex items-center gap-2 rounded-DEFAULT bg-accent px-4 py-2 text-sm font-semibold text-white shadow-accent"><Plus className="h-4 w-4" /> Add product</button>}
      />

      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatTile label="Products" value={String(products.length)} />
        <StatTile label="Low stock" value={String(lowStock)} />
        <StatTile label="Out of stock" value={String(outStock)} />
        <StatTile label="Inventory value" value={formatPrice(inventoryValue)} />
      </div>

      <Card className="!p-0 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border text-left font-mono text-[0.7rem] uppercase tracking-wide text-text-muted">
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-3 py-3 font-medium">Price</th>
              <th className="px-3 py-3 font-medium">Stock</th>
              <th className="px-3 py-3 font-medium">Saves</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const status = p.signals.stock === 0 ? "Out of stock" : p.signals.stock <= 8 ? "Low stock" : "Active";
              return (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surface-hover">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm border border-border">
                        <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" />
                      </div>
                      <div>
                        <p className="font-medium">{p.title}</p>
                        <p className="font-mono text-[0.7rem] text-text-muted">{p.moods[0]}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-mono">{formatPrice(p.price)}</td>
                  <td className="px-3 py-3 font-mono">{p.signals.stock}</td>
                  <td className="px-3 py-3 font-mono text-text-secondary">{formatCount(p.signals.saveCount)}</td>
                  <td className="px-5 py-3"><StatusPill status={status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
