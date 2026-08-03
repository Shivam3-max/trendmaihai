"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useStore } from "@/store/useStore";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/profile";
  const login = useStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      login({ name, email, role: "customer" });
      router.push(next);
    }, 700);
  };

  const demo = () => {
    setLoading(true);
    setTimeout(() => {
      login({ name: "Demo Shopper", email: "shopper@trendmehai.com", role: "customer" });
      router.push(next);
    }, 500);
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mt-1.5 text-text-secondary">Log in to keep discovering.</p>

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
        <div className="flex justify-end">
          <Link href="#" className="text-sm text-accent hover:underline">Forgot password?</Link>
        </div>
        <Button type="submit" variant="accent" size="lg" loading={loading} className="w-full">
          Log in <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <button onClick={demo} className="mt-3 w-full rounded-DEFAULT border border-border bg-surface py-3 text-sm font-semibold text-text-secondary transition-colors hover:text-text">
        Continue with demo account
      </button>

      <p className="mt-6 text-center text-sm text-text-secondary">
        New here? <Link href="/signup" className="font-semibold text-accent hover:underline">Create an account</Link>
      </p>

      <Link href="/creator/login" className="mt-6 flex items-center gap-3 rounded-lg border border-border bg-bg-secondary p-4 transition-colors hover:border-accent/40">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-secondary text-white"><Sparkles className="h-4 w-4" /></span>
        <span className="flex-1">
          <span className="block text-sm font-semibold">Are you a creator?</span>
          <span className="block text-xs text-text-muted">Sell & refer products, earn commission</span>
        </span>
        <ArrowRight className="h-4 w-4 text-text-muted" />
      </Link>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
