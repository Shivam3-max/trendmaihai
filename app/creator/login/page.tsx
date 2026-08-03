"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, TrendingUp, Wallet, Share2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";

const PERKS = [
  { icon: TrendingUp, t: "Sell your picks", d: "List products and earn on every sale." },
  { icon: Share2, t: "Refer & earn", d: "Share links, track clicks, keep the commission." },
  { icon: Wallet, t: "Fast payouts", d: "Withdraw to UPI or bank, anytime." },
];

export default function CreatorLoginPage() {
  const router = useRouter();
  const login = useStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const enter = (name: string, handle: string, email: string) => {
    setLoading(true);
    setTimeout(() => {
      login({ name, email, role: "creator", handle });
      router.push("/creator");
    }, 700);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    const handle = email.split("@")[0].replace(/[^a-z0-9.]/gi, "").toLowerCase();
    const name = handle.replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    enter(name, handle, email);
  };

  const side = (
    <>
      <p className="eyebrow mb-4">Creator Portal</p>
      <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
        Turn your taste<br />into <span className="accent-sweep">income</span>.
      </h2>
      <ul className="mt-8 space-y-4">
        {PERKS.map((p) => {
          const Icon = p.icon;
          return (
            <li key={p.t} className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-accent shadow-sm"><Icon className="h-4 w-4" /></span>
              <span>
                <span className="block font-sub font-semibold">{p.t}</span>
                <span className="block text-sm text-text-secondary">{p.d}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );

  return (
    <AuthLayout side={side}>
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 font-mono text-xs font-semibold text-accent">
          Creator log in
        </div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Welcome, creator</h1>
        <p className="mt-1.5 text-text-secondary">Log in to your selling & referral dashboard.</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-text-secondary">Email</span>
            <div className="flex items-center gap-2 rounded-DEFAULT border border-border bg-surface px-3.5 focus-within:border-accent">
              <Mail className="h-4 w-4 text-text-muted" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="h-11 flex-1 bg-transparent text-base outline-none" />
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-text-secondary">Password</span>
            <div className="flex items-center gap-2 rounded-DEFAULT border border-border bg-surface px-3.5 focus-within:border-accent">
              <Lock className="h-4 w-4 text-text-muted" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-11 flex-1 bg-transparent text-base outline-none" />
            </div>
          </label>
          <Button type="submit" variant="accent" size="lg" loading={loading} className="w-full">
            Enter dashboard <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <button
          onClick={() => enter("Aanya Kapoor", "aesthetic.aanya", "aanya@trendmehai.com")}
          className="mt-3 w-full rounded-DEFAULT border border-border bg-surface py-3 text-sm font-semibold text-text-secondary transition-colors hover:text-text"
        >
          Continue as demo creator
        </button>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Not a creator yet? <Link href="/creator/apply" className="font-semibold text-accent hover:underline">Apply to sell</Link>
        </p>
        <p className="mt-2 text-center text-sm">
          <Link href="/login" className="text-text-muted hover:text-text">← Shopper login</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
