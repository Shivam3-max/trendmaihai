import { Plus, ExternalLink, LayoutTemplate } from "lucide-react";
import { PageHeader, Card, StatTile, StatusPill } from "@/components/admin/ui";

const PAGES = [
  { name: "Diwali Sale 2026", slug: "/l/diwali", views: "42.1k", cvr: "5.4%", status: "Active" },
  { name: "Creator Studio Kit", slug: "/l/creator-kit", views: "18.7k", cvr: "7.1%", status: "Active" },
  { name: "Gaming Battlestation", slug: "/l/gaming", views: "31.2k", cvr: "6.2%", status: "Active" },
  { name: "New Year Drops", slug: "/l/new-year", views: "—", cvr: "—", status: "Draft" },
];

export default function AdminLandingPage() {
  return (
    <div>
      <PageHeader
        title="Landing Pages"
        subtitle="Block-based pages for campaigns"
        action={<button className="inline-flex items-center gap-2 rounded-DEFAULT bg-accent px-4 py-2 text-sm font-semibold text-white shadow-accent"><Plus className="h-4 w-4" /> New page</button>}
      />
      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatTile label="Live pages" value="3" />
        <StatTile label="Total views" value="92k" delta="+16%" />
        <StatTile label="Avg CVR" value="6.2%" delta="+0.7%" />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {PAGES.map((p) => (
          <Card key={p.slug}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-DEFAULT bg-accent-soft text-accent"><LayoutTemplate className="h-5 w-5" /></span>
                <div>
                  <p className="font-sub font-semibold">{p.name}</p>
                  <p className="font-mono text-xs text-text-muted">{p.slug}</p>
                </div>
              </div>
              <StatusPill status={p.status} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <div className="flex gap-6 font-mono text-sm">
                <span><span className="text-text-muted">views</span> {p.views}</span>
                <span><span className="text-text-muted">cvr</span> {p.cvr}</span>
              </div>
              <button className="inline-flex items-center gap-1 text-sm font-medium text-accent">Edit <ExternalLink className="h-3.5 w-3.5" /></button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
