"use client";
import { levelFor } from "@/lib/data/repository";

export function ExplorerLevelRing({ points, size = 120 }: { points: number; size?: number }) {
  const { level, name, next, progress } = levelFor(points);
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - progress);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--divider)" strokeWidth={8} />
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke="url(#lvl-grad)" strokeWidth={8} strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.22,1,0.36,1)" }}
          />
          <defs>
            <linearGradient id="lvl-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent-secondary)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-text-muted">Level {level}</span>
          <span className="font-mono text-2xl font-medium">{points}</span>
        </div>
      </div>
      <p className="mt-2 font-sub font-semibold">{name}</p>
      {next && (
        <p className="font-mono text-xs text-text-muted">{next.min - points} pts to {next.name}</p>
      )}
    </div>
  );
}
