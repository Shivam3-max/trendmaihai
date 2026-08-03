"use client";
import { useState } from "react";
import { Copy, Check, Link2, Search } from "lucide-react";
import { getCreatorDashboard, getAllProducts } from "@/lib/data/repository";
import { useStore } from "@/store/useStore";
import { PageHeader, StatTile, Card } from "@/components/admin/ui";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { formatPrice, formatCount } from "@/lib/utils/cn";

export default function CreatorReferralsPage() {
  const user = useStore((s) => s.user);
  const handle = user?.handle ?? "creator";
  const dash = getCreatorDashboard(user?.handle);
  const [copied, setCopied] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [genFor, setGenFor] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const results = query
    ? getAllProducts().filter((p) => p.title.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  const totalEarned = dash.referrals.reduce((n, r) => n + r.earned, 0);
  const totalClicks = dash.referrals.reduce((n, r) => n + r.clicks, 0);
  const totalConv = dash.referrals.reduce((n, r) => n + r.conversions, 0);

  return (
    <div>
      <PageHeader title="Refer & earn" subtitle="Share any product, keep the commission on every sale" />

      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatTile label="Referral earnings" value={formatPrice(totalEarned)} delta="+22%" />
        <StatTile label="Total clicks" value={formatCount(totalClicks)} delta="+24%" />
        <StatTile label="Conversions" value={String(totalConv)} delta="+11%" />
        <StatTile label="Avg CVR" value={`${dash.conversion}%`} />
      </div>

      {/* generate a link */}
      <Card className="mb-4">
        <div className="flex items-center gap-2">
          <Link2 className="h-5 w-5 text-accent" />
          <p className="font-sub font-semibold">Generate a referral link</p>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-DEFAULT border border-border bg-bg-secondary px-3.5">
          <Search className="h-4 w-4 text-text-muted" />
          <input value={query} onChange={(e) => { setQuery(e.target.value); setGenFor(null); }} placeholder="Search a product to share…" className="h-11 flex-1 bg-transparent text-sm outline-none" />
        </div>
        {results.length > 0 && (
          <div className="mt-3 space-y-2">
            {results.map((p) => {
              const link = `trendmehai.com/p/${p.slug}?ref=${handle}`;
              const isGen = genFor === p.id;
              return (
                <div key={p.id} className="flex flex-wrap items-center gap-3 rounded-DEFAULT border border-border p-2.5">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-sm">
                    <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-medium">{p.title}</p>
                    {isGen ? (
                      <p className="truncate font-mono text-xs text-accent">{link}</p>
                    ) : (
                      <p className="font-mono text-xs text-text-muted">Earn ~{formatPrice(Math.round(p.price * 0.1))} per sale</p>
                    )}
                  </div>
                  {isGen ? (
                    <button onClick={() => copy(link, p.id)} className="inline-flex items-center gap-1.5 rounded-DEFAULT bg-text px-3 py-2 text-sm font-semibold text-white">
                      {copied === p.id ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
                    </button>
                  ) : (
                    <button onClick={() => setGenFor(p.id)} className="inline-flex items-center gap-1.5 rounded-DEFAULT bg-accent px-3 py-2 text-sm font-semibold text-white shadow-accent">
                      <Link2 className="h-4 w-4" /> Generate
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* active referrals performance */}
      <Card className="!p-0 overflow-x-auto">
        <p className="border-b border-border p-5 font-sub font-semibold">Your active referrals</p>
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left font-mono text-[0.7rem] uppercase tracking-wide text-text-muted">
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-3 py-3 font-medium">Clicks</th>
              <th className="px-3 py-3 font-medium">Conversions</th>
              <th className="px-3 py-3 font-medium">Earned</th>
              <th className="px-5 py-3 font-medium">Link</th>
            </tr>
          </thead>
          <tbody>
            {dash.referrals.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0 hover:bg-surface-hover">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-sm">
                      <ProductMedia src={r.image} alt={r.title} seed={r.id} className="h-full w-full" />
                    </div>
                    <span className="line-clamp-1 font-medium">{r.title}</span>
                  </div>
                </td>
                <td className="px-3 py-3 font-mono">{formatCount(r.clicks)}</td>
                <td className="px-3 py-3 font-mono">{r.conversions}</td>
                <td className="px-3 py-3 font-mono text-success">{formatPrice(r.earned)}</td>
                <td className="px-5 py-3">
                  <button onClick={() => copy(r.link, r.id)} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-xs hover:border-accent hover:text-accent">
                    {copied === r.id ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy link</>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
