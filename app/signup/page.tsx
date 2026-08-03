"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, Check } from "lucide-react";
import { useStore } from "@/store/useStore";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";

const PERKS = ["Save & organise everything you love", "Earn points, badges & daily spins", "Buy whole setups in one tap", "Get drops before they blow up"];

export default function SignupPage() {
  const router = useRouter();
  const login = useStore((s) => s.login);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return;
    setLoading(true);
    setTimeout(() => {
      login({ name: form.name, email: form.email, role: "customer" });
      router.push("/profile");
    }, 800);
  };

  const side = (
    <>
      <p className="eyebrow mb-4">Join TrendMeHai</p>
      <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
        Shopping,<br />but <span className="accent-sweep">addictive</span>.
      </h2>
      <ul className="mt-8 space-y-3">
        {PERKS.map((p) => (
          <li key={p} className="flex items-center gap-3 text-text-secondary">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent"><Check className="h-3.5 w-3.5" /></span>
            {p}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <AuthLayout side={side}>
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-1.5 text-text-secondary">Free forever. Takes 20 seconds.</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {([["name", User, "Full name", "text"], ["email", Mail, "Email", "email"], ["password", Lock, "Password", "password"]] as const).map(([key, Icon, label, type]) => (
            <label key={key} className="block">
              <span className="mb-1.5 block text-sm font-medium text-text-secondary">{label}</span>
              <div className="flex items-center gap-2 rounded-DEFAULT border border-border bg-surface px-3.5 focus-within:border-accent">
                <Icon className="h-4 w-4 text-text-muted" />
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={type === "password" ? "••••••••" : label}
                  className="h-11 flex-1 bg-transparent text-base outline-none"
                />
              </div>
            </label>
          ))}
          <Button type="submit" variant="accent" size="lg" loading={loading} className="w-full">
            Create account <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-text-muted">
          By continuing you agree to our Terms & Privacy Policy.
        </p>
        <p className="mt-4 text-center text-sm text-text-secondary">
          Already have an account? <Link href="/login" className="font-semibold text-accent hover:underline">Log in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
