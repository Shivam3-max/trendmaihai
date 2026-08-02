import { getLeaderboard } from "@/lib/data/repository";
import { PageHeader, Card, StatTile } from "@/components/admin/ui";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { formatCount } from "@/lib/utils/cn";

export default function AdminReferralsPage() {
  const board = getLeaderboard(120).filter((r) => !r.you);
  return (
    <div>
      <PageHeader title="Referral System" subtitle="Your viral loop, measured" />
      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatTile label="Referrers" value="3,420" delta="+9%" />
        <StatTile label="Invites sent" value="18.6k" delta="+14%" />
        <StatTile label="Conversion" value="22%" delta="+1.8%" />
        <StatTile label="Referred rev" value="₹9.4L" delta="+27%" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card className="!p-0">
          <p className="border-b border-border p-5 font-sub font-semibold">Top referrers</p>
          <ul className="divide-y divide-border">
            {board.map((r) => (
              <li key={r.rank} className="flex items-center gap-3 px-5 py-3.5">
                <span className="w-5 font-mono text-sm text-text-muted">{r.rank}</span>
                <div className="relative h-9 w-9 overflow-hidden rounded-full">
                  <ProductMedia src={r.avatar} alt={r.name} seed={r.name} className="h-full w-full" />
                </div>
                <span className="flex-1 text-sm font-medium">@{r.name}</span>
                <span className="font-mono text-sm text-text-secondary">{formatCount(r.points)} pts</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <p className="font-sub font-semibold">Program settings</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-text-secondary">Referrer reward</dt><dd className="font-mono">200 pts</dd></div>
            <div className="flex justify-between"><dt className="text-text-secondary">Friend reward</dt><dd className="font-mono">200 pts</dd></div>
            <div className="flex justify-between"><dt className="text-text-secondary">Trigger</dt><dd>First order</dd></div>
            <div className="flex justify-between"><dt className="text-text-secondary">Status</dt><dd className="text-success">Live</dd></div>
          </dl>
          <button className="mt-5 w-full rounded-DEFAULT border border-border bg-surface py-2.5 text-sm font-semibold">Edit rewards</button>
        </Card>
      </div>
    </div>
  );
}
