import { Megaphone, TrendingUp } from "lucide-react";
import { PageHeader, Card, StatTile, StatusPill } from "@/components/admin/ui";
import { formatPrice } from "@/lib/utils/cn";

const CAMPAIGNS = [
  { name: "Diwali Discovery", channel: "Meta + Google", spend: 84000, roas: "4.2x", status: "Active" },
  { name: "Creator Reels Push", channel: "Instagram", spend: 42000, roas: "5.8x", status: "Active" },
  { name: "Retargeting — Cart", channel: "Meta", spend: 28000, roas: "6.1x", status: "Active" },
  { name: "New Year Drops", channel: "Google", spend: 0, roas: "—", status: "Scheduled" },
];
const PIXELS = [
  { name: "Meta Pixel", id: "8829***", status: "Active" },
  { name: "Google Analytics 4", id: "G-TMH***", status: "Active" },
  { name: "Microsoft Clarity", id: "clr***", status: "Active" },
];

export default function AdminMarketingPage() {
  const totalSpend = CAMPAIGNS.reduce((n, c) => n + c.spend, 0);
  return (
    <div>
      <PageHeader title="Marketing" subtitle="Campaigns, channels & tracking" />
      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatTile label="Ad spend" value={formatPrice(totalSpend)} />
        <StatTile label="Blended ROAS" value="4.9x" delta="+0.6x" />
        <StatTile label="Active campaigns" value="3" />
        <StatTile label="Attributed rev" value={formatPrice(totalSpend * 4.9)} delta="+18%" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card className="!p-0 overflow-x-auto">
          <div className="flex items-center gap-2 border-b border-border p-5">
            <Megaphone className="h-4 w-4" /><p className="font-sub font-semibold">Campaigns</p>
          </div>
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-border text-left font-mono text-[0.7rem] uppercase tracking-wide text-text-muted">
                <th className="px-5 py-2.5 font-medium">Campaign</th>
                <th className="px-3 py-2.5 font-medium">Channel</th>
                <th className="px-3 py-2.5 font-medium">Spend</th>
                <th className="px-3 py-2.5 font-medium">ROAS</th>
                <th className="px-5 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {CAMPAIGNS.map((c) => (
                <tr key={c.name} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-medium">{c.name}</td>
                  <td className="px-3 py-3 text-text-secondary">{c.channel}</td>
                  <td className="px-3 py-3 font-mono">{c.spend ? formatPrice(c.spend) : "—"}</td>
                  <td className="px-3 py-3 font-mono text-success">{c.roas}</td>
                  <td className="px-5 py-3"><StatusPill status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="!p-0">
          <div className="flex items-center gap-2 border-b border-border p-5">
            <TrendingUp className="h-4 w-4" /><p className="font-sub font-semibold">Tracking pixels</p>
          </div>
          <ul className="divide-y divide-border">
            {PIXELS.map((p) => (
              <li key={p.name} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="font-mono text-xs text-text-muted">{p.id}</p>
                </div>
                <StatusPill status={p.status} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
