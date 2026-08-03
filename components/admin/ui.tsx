import { cn } from "@/lib/utils/cn";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatTile({ label, value, delta, up = true }: { label: string; value: string; delta?: string; up?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <p className="font-mono text-[0.7rem] uppercase tracking-wider text-text-muted">{label}</p>
      <p className="mt-2 font-mono text-xl font-medium tabular-nums md:text-2xl">{value}</p>
      {delta && (
        <p className={cn("mt-1 inline-flex items-center gap-0.5 font-mono text-xs", up ? "text-success" : "text-error")}>
          {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {delta}
        </p>
      )}
    </div>
  );
}

/** Minimal SVG area/line chart — no external lib. */
export function MiniChart({ data, height = 160, accent = "var(--accent)" }: { data: number[]; height?: number; accent?: string }) {
  const w = 600;
  const max = Math.max(...data) * 1.1;
  const min = Math.min(...data) * 0.9;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((d - min) / (max - min)) * (height - 20) - 10;
    return [x, y] as const;
  });
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w},${height} L0,${height} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#area-grad)" />
      <path d={line} fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4 : 0} fill={accent} />
      ))}
    </svg>
  );
}

export function StatusPill({ status }: { status: string }) {
  const s = status.toLowerCase();
  const cls =
    s.includes("deliver") ? "bg-success/10 text-success" :
    s.includes("ship") || s.includes("out") ? "bg-accent/10 text-accent" :
    s.includes("pack") ? "bg-warning/10 text-warning" :
    s.includes("pending") ? "bg-warning/10 text-warning" :
    s.includes("approved") || s.includes("active") ? "bg-success/10 text-success" :
    "bg-bg-secondary text-text-secondary";
  return <span className={cn("inline-flex rounded-full px-2.5 py-0.5 font-mono text-[0.7rem] font-semibold", cls)}>{status}</span>;
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-lg border border-border bg-surface p-5 shadow-sm", className)}>{children}</div>;
}
