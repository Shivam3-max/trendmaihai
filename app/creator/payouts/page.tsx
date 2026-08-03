"use client";
import { useState } from "react";
import { Wallet, Check, Building2, Smartphone } from "lucide-react";
import { getCreatorDashboard } from "@/lib/data/repository";
import { useStore } from "@/store/useStore";
import { PageHeader, StatTile, StatusPill, Card } from "@/components/admin/ui";
import { Button } from "@/components/ui/Button";
import { formatPrice, cn } from "@/lib/utils/cn";

export default function CreatorPayoutsPage() {
  const user = useStore((s) => s.user);
  const dash = getCreatorDashboard(user?.handle);
  const [method, setMethod] = useState<"upi" | "bank">("upi");
  const [requested, setRequested] = useState(false);

  const paid = dash.payouts.filter((p) => p.status === "Paid").reduce((n, p) => n + p.amount, 0);

  return (
    <div>
      <PageHeader title="Payouts" subtitle="Withdraw your earnings, track your history" />

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-4 grid grid-cols-3 gap-4">
            <StatTile label="Available" value={formatPrice(dash.balance)} />
            <StatTile label="Lifetime paid" value={formatPrice(paid)} />
            <StatTile label="Total earned" value={formatPrice(dash.earnings)} />
          </div>

          <Card className="!p-0 overflow-x-auto">
            <p className="border-b border-border p-5 font-sub font-semibold">Payout history</p>
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-border text-left font-mono text-[0.7rem] uppercase tracking-wide text-text-muted">
                  <th className="px-5 py-3 font-medium">Payout</th>
                  <th className="px-3 py-3 font-medium">Date</th>
                  <th className="px-3 py-3 font-medium">Method</th>
                  <th className="px-3 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {dash.payouts.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 font-mono text-xs">{p.id}</td>
                    <td className="px-3 py-3 font-mono text-xs text-text-muted">{p.date}</td>
                    <td className="px-3 py-3">{p.method}</td>
                    <td className="px-3 py-3 font-mono">{formatPrice(p.amount)}</td>
                    <td className="px-5 py-3"><StatusPill status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* withdraw card */}
        <Card className="h-fit">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-accent" />
            <p className="font-sub font-semibold">Withdraw</p>
          </div>
          <div className="mt-4 rounded-lg bg-bg-secondary p-4 text-center">
            <p className="font-mono text-[0.7rem] uppercase tracking-wider text-text-muted">Available balance</p>
            <p className="mt-1 font-mono text-3xl font-medium">{formatPrice(dash.balance)}</p>
          </div>

          <p className="mt-5 mb-2 text-sm font-medium text-text-secondary">Payout method</p>
          <div className="space-y-2">
            {([["upi", Smartphone, "UPI", "aanya@okhdfc"], ["bank", Building2, "Bank transfer", "HDFC ••4821"]] as const).map(([id, Icon, label, sub]) => (
              <button key={id} onClick={() => setMethod(id)} className={cn("flex w-full items-center gap-3 rounded-DEFAULT border-2 p-3 text-left transition-colors", method === id ? "border-accent bg-accent-soft" : "border-border")}>
                <Icon className="h-5 w-5 text-text-secondary" />
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block font-mono text-xs text-text-muted">{sub}</span>
                </span>
                <span className={cn("grid h-5 w-5 place-items-center rounded-full border-2", method === id ? "border-accent bg-accent text-white" : "border-border")}>
                  {method === id && <Check className="h-3 w-3" />}
                </span>
              </button>
            ))}
          </div>

          <Button
            onClick={() => { setRequested(true); setTimeout(() => setRequested(false), 2000); }}
            variant="accent" size="lg" className="mt-5 w-full"
          >
            {requested ? <><Check className="h-5 w-5" /> Payout requested</> : `Withdraw ${formatPrice(dash.balance)}`}
          </Button>
          <p className="mt-2 text-center text-xs text-text-muted">Payouts arrive within 48 hours.</p>
        </Card>
      </div>
    </div>
  );
}
