"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { getAdminCoupons } from "@/lib/data/repository";
import { PageHeader, Card } from "@/components/admin/ui";
import { cn } from "@/lib/utils/cn";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(getAdminCoupons());
  const toggle = (code: string) =>
    setCoupons((cs) => cs.map((c) => (c.code === code ? { ...c, active: !c.active } : c)));

  return (
    <div>
      <PageHeader
        title="Coupons"
        subtitle={`${coupons.filter((c) => c.active).length} active`}
        action={<button className="inline-flex items-center gap-2 rounded-DEFAULT bg-accent px-4 py-2 text-sm font-semibold text-white shadow-accent"><Plus className="h-4 w-4" /> New coupon</button>}
      />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {coupons.map((c) => {
          const pct = Math.min(100, (c.used / c.limit) * 100);
          return (
            <Card key={c.code}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-lg font-semibold tracking-wide">{c.code}</p>
                  <p className="text-sm text-text-secondary">{c.type} · <span className="font-mono">{c.value}</span> off</p>
                </div>
                <button
                  onClick={() => toggle(c.code)}
                  className={cn("relative h-6 w-11 rounded-full transition-colors", c.active ? "bg-success" : "bg-divider")}
                  aria-pressed={c.active}
                >
                  <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform", c.active ? "translate-x-5" : "translate-x-0.5")} />
                </button>
              </div>
              <div className="mt-4">
                <div className="mb-1 flex justify-between font-mono text-xs text-text-muted">
                  <span>{c.used} used</span><span>{c.limit} limit</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-divider">
                  <div className={cn("h-full rounded-full", pct >= 100 ? "bg-error" : "bg-accent")} style={{ width: `${pct}%` }} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
