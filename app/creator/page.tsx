"use client";
import Link from "next/link";
import { ArrowRight, Package, Share2, Wallet } from "lucide-react";
import { getCreatorDashboard } from "@/lib/data/repository";
import { useStore } from "@/store/useStore";
import { PageHeader, StatTile, MiniChart, StatusPill, Card } from "@/components/admin/ui";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { formatPrice, formatCount } from "@/lib/utils/cn";

export default function CreatorDashboard() {
  const user = useStore((s) => s.user);
  const d = getCreatorDashboard(user?.handle);
  const topProducts = [...d.products].sort((a, b) => b.earned - a.earned).slice(0, 5);

  return (
    <div>
      <PageHeader
        title={`Hey ${user?.name?.split(" ")[0] ?? "creator"} 👋`}
        subtitle="Your selling & referral performance, last 30 days"
        action={
          <Link href="/creator/products" className="inline-flex items-center gap-2 rounded-DEFAULT bg-accent px-4 py-2 text-sm font-semibold text-white shadow-accent">
            <Package className="h-4 w-4" /> List a product
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatTile label="Total earnings" value={formatPrice(d.earnings)} delta="+18%" />
        <StatTile label="This month" value={formatPrice(d.thisMonth)} delta="+9%" />
        <StatTile label="Referral clicks" value={formatCount(d.clicks)} delta="+24%" />
        <StatTile label="Conversion" value={`${d.conversion}%`} delta="+0.7%" />
        <StatTile label="Units sold" value={String(d.sold)} delta="+12%" />
        <StatTile label="Payout balance" value={formatPrice(d.balance)} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <p className="font-sub font-semibold">Earnings trend</p>
            <span className="font-mono text-xs text-text-muted">monthly</span>
          </div>
          <MiniChart data={d.earningsSeries} />
        </Card>

        <Card className="flex flex-col">
          <p className="font-sub font-semibold">Quick actions</p>
          <div className="mt-4 space-y-2">
            <Link href="/creator/products" className="flex items-center gap-3 rounded-DEFAULT border border-border p-3 transition-colors hover:border-accent/40">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft text-accent"><Package className="h-4 w-4" /></span>
              <span className="flex-1 text-sm font-medium">List a product to sell</span>
              <ArrowRight className="h-4 w-4 text-text-muted" />
            </Link>
            <Link href="/creator/referrals" className="flex items-center gap-3 rounded-DEFAULT border border-border p-3 transition-colors hover:border-accent/40">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft text-accent"><Share2 className="h-4 w-4" /></span>
              <span className="flex-1 text-sm font-medium">Generate a referral link</span>
              <ArrowRight className="h-4 w-4 text-text-muted" />
            </Link>
            <Link href="/creator/payouts" className="flex items-center gap-3 rounded-DEFAULT border border-border p-3 transition-colors hover:border-accent/40">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft text-accent"><Wallet className="h-4 w-4" /></span>
              <span className="flex-1 text-sm font-medium">Withdraw {formatPrice(d.balance)}</span>
              <ArrowRight className="h-4 w-4 text-text-muted" />
            </Link>
          </div>
        </Card>
      </div>

      <Card className="mt-4 !p-0">
        <div className="flex items-center justify-between border-b border-border p-5">
          <p className="font-sub font-semibold">Top performing products</p>
          <Link href="/creator/products" className="inline-flex items-center gap-1 text-sm font-medium text-accent">All products <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-border text-left font-mono text-[0.7rem] uppercase tracking-wide text-text-muted">
                <th className="px-5 py-2.5 font-medium">Product</th>
                <th className="px-3 py-2.5 font-medium">Commission</th>
                <th className="px-3 py-2.5 font-medium">Sold</th>
                <th className="px-3 py-2.5 font-medium">Earned</th>
                <th className="px-5 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-sm">
                        <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" />
                      </div>
                      <span className="font-medium">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-mono">{p.commissionPct}%</td>
                  <td className="px-3 py-3 font-mono">{p.sold}</td>
                  <td className="px-3 py-3 font-mono text-success">{formatPrice(p.earned)}</td>
                  <td className="px-5 py-3"><StatusPill status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
