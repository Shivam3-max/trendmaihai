import { Download } from "lucide-react";
import { getAdminOrders } from "@/lib/data/repository";
import { PageHeader, StatusPill, Card } from "@/components/admin/ui";
import { formatPrice } from "@/lib/utils/cn";

export default function AdminOrdersPage() {
  const orders = getAdminOrders();
  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle={`${orders.length} orders`}
        action={<button className="inline-flex items-center gap-2 rounded-DEFAULT border border-border bg-surface px-4 py-2 text-sm font-semibold"><Download className="h-4 w-4" /> Export</button>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {["All", "Placed", "Packed", "Shipped", "Out for delivery", "Delivered"].map((f, i) => (
          <button key={f} className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${i === 0 ? "bg-text text-white" : "border border-border text-text-secondary hover:text-text"}`}>{f}</button>
        ))}
      </div>
      <Card className="!p-0 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left font-mono text-[0.7rem] uppercase tracking-wide text-text-muted">
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-3 py-3 font-medium">Customer</th>
              <th className="px-3 py-3 font-medium">Items</th>
              <th className="px-3 py-3 font-medium">Total</th>
              <th className="px-3 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0 hover:bg-surface-hover">
                <td className="px-5 py-3 font-mono text-xs">#{o.id}</td>
                <td className="px-3 py-3">{o.customer}</td>
                <td className="px-3 py-3 font-mono">{o.items}</td>
                <td className="px-3 py-3 font-mono">{formatPrice(o.total)}</td>
                <td className="px-3 py-3 font-mono text-xs text-text-muted">{o.date}</td>
                <td className="px-5 py-3"><StatusPill status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
