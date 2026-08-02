"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Package, RotateCcw, CreditCard, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const FAQS = [
  { q: "How long does delivery take?", a: "Most orders arrive in 2–5 days across India. You'll get a tracking link the moment your order ships." },
  { q: "What's your return policy?", a: "Easy 7-day returns, no questions asked. If something doesn't spark joy, send it back for a full refund." },
  { q: "Do you offer Cash on Delivery?", a: "Yes — COD is available across India, alongside UPI and cards. Pay whichever way feels right." },
  { q: "How do rewards and points work?", a: "You earn points as you explore and shop. Points unlock badges, levels, and the daily spin-to-win. Check your Rewards page." },
  { q: "Can I buy an entire community setup at once?", a: "Absolutely — that's the fun part. On any community or mood page, tap 'Buy the whole room' to add every piece in one go." },
];

const SHORTCUTS = [
  { icon: Package, label: "Track an order", href: "/track" },
  { icon: RotateCcw, label: "Start a return", href: "/profile/orders" },
  { icon: CreditCard, label: "Payment & COD", href: "#faq" },
];

export default function SupportPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="container-page py-12 md:py-16">
      <div className="text-center">
        <p className="eyebrow mb-2">We&apos;re here to help</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Support</h1>
        <p className="mx-auto mt-2 max-w-md text-text-secondary">Answers to common questions — and a real human when you need one.</p>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
        {SHORTCUTS.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} href={s.href} className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent"><Icon className="h-5 w-5" /></span>
              <span className="text-sm font-medium">{s.label}</span>
            </Link>
          );
        })}
      </div>

      <div id="faq" className="mx-auto mt-12 max-w-2xl">
        <h2 className="mb-4 font-display text-xl font-semibold">Frequently asked</h2>
        <div className="divide-y divide-border rounded-lg border border-border">
          {FAQS.map((f, i) => (
            <div key={i}>
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="font-medium">{f.q}</span>
                <ChevronDown className={cn("h-5 w-5 shrink-0 text-text-muted transition-transform", open === i && "rotate-180")} />
              </button>
              {open === i && <p className="px-5 pb-4 text-sm leading-relaxed text-text-secondary">{f.a}</p>}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 rounded-lg border border-border bg-bg-secondary p-6 text-center">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-text text-white"><MessageCircle className="h-5 w-5" /></span>
          <p className="font-sub font-semibold">Still need help?</p>
          <p className="text-sm text-text-secondary">Our team replies within a few hours, every day.</p>
          <a href="mailto:help@trendmehai.com" className="mt-1 rounded-DEFAULT bg-accent px-6 py-2.5 font-sub text-sm font-semibold text-white shadow-accent">Contact support</a>
        </div>
      </div>
    </div>
  );
}
