import { Plus } from "lucide-react";
import { getCreators } from "@/lib/data/repository";
import { PageHeader, Card, StatTile, StatusPill } from "@/components/admin/ui";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { formatCount, formatPrice } from "@/lib/utils/cn";

export default function AdminInfluencersPage() {
  const creators = getCreators();
  const rows = creators.map((c, i) => ({
    ...c,
    status: i === 0 ? "Active" : i === creators.length - 1 ? "Pending" : "Active",
    sales: 40000 + i * 28500,
    commission: 8 + i * 2,
  }));

  return (
    <div>
      <PageHeader
        title="Influencer Management"
        subtitle="Creators driving discovery"
        action={<button className="inline-flex items-center gap-2 rounded-DEFAULT bg-accent px-4 py-2 text-sm font-semibold text-white shadow-accent"><Plus className="h-4 w-4" /> Invite creator</button>}
      />
      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatTile label="Creators" value={String(creators.length)} />
        <StatTile label="Attributed sales" value={formatPrice(rows.reduce((n, r) => n + r.sales, 0))} delta="+31%" />
        <StatTile label="Avg commission" value="12%" />
        <StatTile label="Pending" value="1" />
      </div>

      <Card className="!p-0 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left font-mono text-[0.7rem] uppercase tracking-wide text-text-muted">
              <th className="px-5 py-3 font-medium">Creator</th>
              <th className="px-3 py-3 font-medium">Followers</th>
              <th className="px-3 py-3 font-medium">Sales</th>
              <th className="px-3 py-3 font-medium">Commission</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-surface-hover">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full">
                      <ProductMedia src={c.avatar} alt={c.name} seed={c.id} className="h-full w-full" />
                    </div>
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="font-mono text-[0.7rem] text-text-muted">@{c.handle}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 font-mono">{formatCount(c.followers)}</td>
                <td className="px-3 py-3 font-mono">{formatPrice(c.sales)}</td>
                <td className="px-3 py-3 font-mono">{c.commission}%</td>
                <td className="px-5 py-3"><StatusPill status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
