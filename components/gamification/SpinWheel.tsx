"use client";
import { useState } from "react";
import { Gift, Check } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils/cn";

const PRIZES = [
  { label: "10% OFF", points: 0 },
  { label: "+50 pts", points: 50 },
  { label: "Free ship", points: 0 },
  { label: "+100 pts", points: 100 },
  { label: "Mystery", points: 25 },
  { label: "+200 pts", points: 200 },
];
const COLORS = ["#EFF4FF", "#F3EEFF", "#FBF3EC", "#EEF6F1", "#F6F0E9", "#F0F1F4"];

export function SpinWheel() {
  const addPoints = useStore((s) => s.addPoints);
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [used, setUsed] = useState(false);

  const seg = 360 / PRIZES.length;

  const spin = () => {
    if (spinning || used) return;
    setSpinning(true);
    setResult(null);
    const winner = Math.floor(Math.random() * PRIZES.length);
    const target = 360 * 5 + (360 - winner * seg - seg / 2);
    setAngle(target);
    setTimeout(() => {
      setSpinning(false);
      setUsed(true);
      setResult(PRIZES[winner].label);
      if (PRIZES[winner].points) addPoints(PRIZES[winner].points);
    }, 3200);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-56 w-56">
        {/* pointer */}
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
          <div className="h-0 w-0 border-x-8 border-t-[14px] border-x-transparent border-t-text" />
        </div>
        <div
          className="relative h-full w-full rounded-full border-4 border-text shadow-md"
          style={{ transform: `rotate(${angle}deg)`, transition: spinning ? "transform 3.1s cubic-bezier(0.17,0.67,0.2,1)" : "none" }}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {PRIZES.map((p, i) => {
              const a0 = (i * seg - 90) * (Math.PI / 180);
              const a1 = ((i + 1) * seg - 90) * (Math.PI / 180);
              const x0 = 50 + 50 * Math.cos(a0), y0 = 50 + 50 * Math.sin(a0);
              const x1 = 50 + 50 * Math.cos(a1), y1 = 50 + 50 * Math.sin(a1);
              const mid = (i * seg + seg / 2 - 90) * (Math.PI / 180);
              const tx = 50 + 30 * Math.cos(mid), ty = 50 + 30 * Math.sin(mid);
              return (
                <g key={i}>
                  <path d={`M50,50 L${x0},${y0} A50,50 0 0,1 ${x1},${y1} Z`} fill={COLORS[i]} stroke="#fff" strokeWidth={0.5} />
                  <text x={tx} y={ty} fontSize={4.2} fontWeight={600} textAnchor="middle" dominantBaseline="middle" fill="#111" transform={`rotate(${i * seg + seg / 2}, ${tx}, ${ty})`}>
                    {p.label}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-text text-white">
            <Gift className="h-4 w-4" />
          </div>
        </div>
      </div>

      {result ? (
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 font-sub font-semibold text-success">
          <Check className="h-4 w-4" /> You won: {result}!
        </div>
      ) : (
        <button
          onClick={spin}
          disabled={spinning || used}
          className={cn("mt-5 rounded-DEFAULT bg-accent px-8 py-3 font-sub font-semibold text-white shadow-accent transition-transform active:scale-95", (spinning || used) && "opacity-60")}
        >
          {spinning ? "Spinning…" : used ? "Come back tomorrow" : "Spin to win"}
        </button>
      )}
    </div>
  );
}
