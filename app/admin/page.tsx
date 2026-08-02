import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { getAdminStats, getAdminOrders, getAllProducts } from "@/lib/data/repository";
import { PageHeader, StatTile, MiniChart, StatusPill, Card } from "@/components/admin/ui";
import { formatPrice, formatCount } from "@/lib/utils/cn";

export default function AdminDashboard() {
  const stats = getAdminStats();
  const orders = getAdminOrders().slice(0, 6);
  const lowStock = getAllProducts().filter((p) => p.signals.stock <= 8).slice(0, 5);

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Last 30 days · everything at a glance" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatTile label="Revenue" value={formatPrice(stats.revenue)} delta="+12.4%" />
        <StatTile label="Orders" value={String(stats.orders)} delta="+8.1%" />
        <StatTile label="CVR" value={`${stats.cvr}%`} delta="+0.4%" />
        <StatTile label="AOV" value={formatPrice(stats.aov)} delta="+3.2%" />
        <StatTile label="Discovered" value={formatCount(stats.discovered)} delta="+21%" />
        <StatTile label="Visitors" value={formatCount(stats.visitors)} delta="-2.1%" up={false} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <p className="font-sub font-semibold">Revenue trend</p>
            <span className="font-mono text-xs text-text-muted">monthly</span>
          </div>
          <MiniChart data={stats.revenueSeries} />
        </Card>
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <p className="font-sub font-semibold">Orders trend</p>
            <span className="font-mono text-xs text-text-muted">monthly</span>
          </div>
          <MiniChart data={stats.ordersSeries} accent="var(--accent-secondary)" />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* recent orders */}
        <Card className="!p-0">
          <div className="flex items-center justify-between border-b border-border p-5">
            <p className="font-sub font-semibold">Recent orders</p>
            <Link href="/admin/orders" className="inline-flex items-center gap-1 text-sm font-medium text-accent">View all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left font-mono text-[0.7rem] uppercase tracking-wide text-text-muted">
                <th className="px-5 py-2.5 font-medium">Order</th>
                <th className="px-3 py-2.5 font-medium">Customer</th>
                <th className="px-3 py-2.5 font-medium">Total</th>
                <th className="px-5 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-mono text-xs">#{o.id}</td>
                  <td className="px-3 py-3">{o.customer}</td>
                  <td className="px-3 py-3 font-mono">{formatPrice(o.total)}</td>
                  <td className="px-5 py-3"><StatusPill status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* low stock */}
        <Card className="!p-0">
          <div className="flex items-center gap-2 border-b border-border p-5">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <p className="font-sub font-semibold">Low stock alerts</p>
          </div>
          <ul className="divide-y divide-border">
            {lowStock.map((p) => (
              <li key={p.id} className="flex items-center justify-between px-5 py-3">
                <span className="line-clamp-1 text-sm">{p.title}</span>
                <span className="shrink-0 rounded-full bg-warning/10 px-2 py-0.5 font-mono text-xs font-semibold text-warning">{p.signals.stock} left</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
