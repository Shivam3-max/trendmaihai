"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { useStore } from "@/store/useStore";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";

export default function CreatorApplyPage() {
  const router = useRouter();
  const login = useStore((s) => s.login);
  const [form, setForm] = useState({ name: "", handle: "", email: "", niche: "minimal-desk" });
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.handle || !form.email) return;
    setLoading(true);
    setTimeout(() => {
      login({ name: form.name, email: form.email, role: "creator", handle: form.handle.replace(/^@/, "") });
      router.push("/creator");
    }, 900);
  };

  const side = (
    <>
      <p className="eyebrow mb-4">Become a creator</p>
      <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
        Get paid to<br />share what you <span className="accent-sweep">love</span>.
      </h2>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[["10%+", "avg commission"], ["48h", "payout time"], ["0₹", "to join"]].map(([v, l]) => (
          <div key={l}>
            <p className="font-mono text-2xl font-medium">{v}</p>
            <p className="font-mono text-xs text-text-muted">{l}</p>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <AuthLayout side={side}>
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Apply to sell</h1>
        <p className="mt-1.5 text-text-secondary">Start earning on sales & referrals today.</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-text-secondary">Full name</span>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="h-11 w-full rounded-DEFAULT border border-border bg-surface px-3.5 text-base outline-none focus:border-accent" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-text-secondary">Handle</span>
            <div className="flex items-center rounded-DEFAULT border border-border bg-surface px-3.5 focus-within:border-accent">
              <span className="text-text-muted">@</span>
              <input value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} placeholder="yourhandle" className="h-11 flex-1 bg-transparent px-1 text-base outline-none" />
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-text-secondary">Email</span>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className="h-11 w-full rounded-DEFAULT border border-border bg-surface px-3.5 text-base outline-none focus:border-accent" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-text-secondary">Your niche</span>
            <select value={form.niche} onChange={(e) => setForm({ ...form, niche: e.target.value })} className="h-11 w-full rounded-DEFAULT border border-border bg-surface px-3 text-base outline-none focus:border-accent">
              <option value="minimal-desk">Minimal Desk</option>
              <option value="gaming">Gaming</option>
              <option value="coffee-lover">Coffee</option>
              <option value="cozy-room">Home & Cozy</option>
              <option value="creator-studio">Creator Studio</option>
            </select>
          </label>
          <Button type="submit" variant="accent" size="lg" loading={loading} className="w-full">
            Create creator account <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-muted">
          <Check className="h-3.5 w-3.5 text-success" /> Instant approval for the demo
        </p>
        <p className="mt-4 text-center text-sm text-text-secondary">
          Already selling? <Link href="/creator/login" className="font-semibold text-accent hover:underline">Log in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
