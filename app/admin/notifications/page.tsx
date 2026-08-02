"use client";
import { useState } from "react";
import { Send, Check, Bell } from "lucide-react";
import { PageHeader, Card } from "@/components/admin/ui";

const SENT = [
  { title: "New drop: Midnight Oak is live", audience: "All · 24.8k", when: "2h ago", ctr: "8.2%" },
  { title: "Your saved item is on sale", audience: "Wishlisters · 6.1k", when: "Yesterday", ctr: "14.7%" },
  { title: "Flash deals end tonight", audience: "All · 24.8k", when: "3 days ago", ctr: "6.9%" },
];

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("all");
  const [sent, setSent] = useState(false);

  return (
    <div>
      <PageHeader title="Push Notifications" subtitle="Reach shoppers where they are" />
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <p className="font-sub font-semibold">Compose</p>
          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-text-secondary">Title</span>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New drop just landed ✦" className="h-11 w-full rounded-DEFAULT border border-border bg-surface px-3 text-sm outline-none focus:border-accent" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-text-secondary">Message</span>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={3} placeholder="Be the first to discover it…" className="w-full rounded-DEFAULT border border-border bg-surface p-3 text-sm outline-none focus:border-accent" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-text-secondary">Audience</span>
              <select value={audience} onChange={(e) => setAudience(e.target.value)} className="h-11 w-full rounded-DEFAULT border border-border bg-surface px-3 text-sm outline-none focus:border-accent">
                <option value="all">All users · 24.8k</option>
                <option value="wishlist">Wishlisters · 6.1k</option>
                <option value="lapsed">Lapsed 30d · 3.4k</option>
                <option value="vip">VIP (Level 4+) · 890</option>
              </select>
            </label>
            <button onClick={() => { if (title) { setSent(true); setTimeout(() => setSent(false), 1600); } }} className="inline-flex items-center gap-2 rounded-DEFAULT bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-accent">
              {sent ? <><Check className="h-4 w-4" /> Sent</> : <><Send className="h-4 w-4" /> Send notification</>}
            </button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <p className="mb-3 font-sub font-semibold">Preview</p>
            <div className="flex items-start gap-3 rounded-DEFAULT border border-border bg-bg-secondary p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-white"><Bell className="h-4 w-4" /></span>
              <div>
                <p className="text-sm font-semibold">{title || "Notification title"}</p>
                <p className="text-sm text-text-secondary">{body || "Your message preview appears here."}</p>
                <p className="mt-1 font-mono text-[0.65rem] text-text-muted">TrendMeHai · now</p>
              </div>
            </div>
          </Card>
          <Card className="!p-0">
            <p className="border-b border-border p-4 font-sub font-semibold">Recently sent</p>
            <ul className="divide-y divide-border">
              {SENT.map((n, i) => (
                <li key={i} className="px-4 py-3">
                  <p className="text-sm font-medium">{n.title}</p>
                  <div className="mt-1 flex items-center justify-between font-mono text-xs text-text-muted">
                    <span>{n.audience} · {n.when}</span>
                    <span className="text-success">CTR {n.ctr}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
