import { getAdminCustomers } from "@/lib/data/repository";
import { PageHeader, Card, StatTile } from "@/components/admin/ui";
import { formatPrice } from "@/lib/utils/cn";

export default function AdminCustomersPage() {
  const customers = getAdminCustomers();
  const totalSpent = customers.reduce((n, c) => n + c.spent, 0);
  const totalOrders = customers.reduce((n, c) => n + c.orders, 0);

  return (
    <div>
      <PageHeader title="Customers" subtitle={`${customers.length} customers`} />
      <div className="mb-4 grid grid-cols-3 gap-4">
        <StatTile label="Customers" value={String(customers.length)} />
        <StatTile label="Total orders" value={String(totalOrders)} />
        <StatTile label="Lifetime value" value={formatPrice(totalSpent)} />
      </div>
      <Card className="!p-0 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left font-mono text-[0.7rem] uppercase tracking-wide text-text-muted">
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-3 py-3 font-medium">Email</th>
              <th className="px-3 py-3 font-medium">Orders</th>
              <th className="px-3 py-3 font-medium">Spent</th>
              <th className="px-5 py-3 font-medium">Level</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.email} className="border-b border-border last:border-0 hover:bg-surface-hover">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft font-mono text-xs font-semibold text-accent">
                      {c.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                    <span className="font-medium">{c.name}</span>
                  </div>
                </td>
                <td className="px-3 py-3 font-mono text-xs text-text-secondary">{c.email}</td>
                <td className="px-3 py-3 font-mono">{c.orders}</td>
                <td className="px-3 py-3 font-mono">{formatPrice(c.spent)}</td>
                <td className="px-5 py-3"><span className="rounded-full bg-bg-secondary px-2.5 py-0.5 font-mono text-[0.7rem]">{c.level}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
