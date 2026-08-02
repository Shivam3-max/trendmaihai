"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [notif, setNotif] = useState({ drops: true, deals: true, community: false, streak: true });

  const field = (label: string, placeholder: string, type = "text") => (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-text-secondary">{label}</span>
      <input type={type} placeholder={placeholder} className="h-12 w-full rounded-DEFAULT border border-border bg-surface px-4 text-base outline-none focus:border-accent" />
    </label>
  );

  return (
    <div className="container-page max-w-3xl py-10 md:py-14">
      <h1 className="mb-8 font-display text-3xl font-semibold tracking-tight md:text-4xl">Settings</h1>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="mb-4 font-sub text-lg font-semibold">Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {field("Full name", "Your name")}
          {field("Email", "you@email.com", "email")}
          {field("Phone", "+91", "tel")}
          {field("City", "Your city")}
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="mb-4 font-sub text-lg font-semibold">Default address</h2>
        <div className="grid gap-4">
          {field("Address", "Flat, street, area")}
          <div className="grid gap-4 sm:grid-cols-2">
            {field("City", "City")}
            {field("PIN code", "PIN")}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="mb-4 font-sub text-lg font-semibold">Notifications</h2>
        <div className="space-y-3">
          {([["drops", "New drops in your moods"], ["deals", "Flash deals & price drops"], ["community", "Community activity"], ["streak", "Streak reminders"]] as const).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm">{label}</span>
              <button
                onClick={() => setNotif({ ...notif, [key]: !notif[key] })}
                className={cn("relative h-6 w-11 rounded-full transition-colors", notif[key] ? "bg-accent" : "bg-divider")}
                aria-pressed={notif[key]}
              >
                <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform", notif[key] ? "translate-x-5" : "translate-x-0.5")} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 flex justify-end">
        <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1500); }} variant="accent" size="lg">
          {saved ? <><Check className="h-5 w-5" /> Saved</> : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
