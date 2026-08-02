import { Plus, FileText } from "lucide-react";
import { getCollections } from "@/lib/data/repository";
import { PageHeader, Card, StatusPill } from "@/components/admin/ui";
import { ProductMedia } from "@/components/commerce/ProductMedia";

const STORIES = [
  { title: "The art of the minimal desk", type: "Lookbook", status: "Active" },
  { title: "Slow mornings, done right", type: "Story", status: "Active" },
  { title: "5 setups going viral this week", type: "Editorial", status: "Draft" },
];

export default function AdminContentPage() {
  const collections = getCollections();
  return (
    <div>
      <PageHeader
        title="Content"
        subtitle="Editorial, collections & storytelling"
        action={<button className="inline-flex items-center gap-2 rounded-DEFAULT bg-accent px-4 py-2 text-sm font-semibold text-white shadow-accent"><Plus className="h-4 w-4" /> New content</button>}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="!p-0">
          <p className="border-b border-border p-5 font-sub font-semibold">Collections</p>
          <ul className="divide-y divide-border">
            {collections.map((c) => (
              <li key={c.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-sm">
                  <ProductMedia src={c.image} alt={c.title} seed={c.id} className="h-full w-full" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{c.title}</p>
                  <p className="font-mono text-xs text-text-muted">{c.productIds.length} products</p>
                </div>
                <StatusPill status="Active" />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="!p-0">
          <div className="flex items-center gap-2 border-b border-border p-5">
            <FileText className="h-4 w-4" /><p className="font-sub font-semibold">Editorial stories</p>
          </div>
          <ul className="divide-y divide-border">
            {STORIES.map((s, i) => (
              <li key={i} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className="font-mono text-xs text-text-muted">{s.type}</p>
                </div>
                <StatusPill status={s.status} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
