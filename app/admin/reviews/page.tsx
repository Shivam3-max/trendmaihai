"use client";
import { useState } from "react";
import { Check, X, Star } from "lucide-react";
import { getAdminReviews } from "@/lib/data/repository";
import { PageHeader, Card, StatusPill } from "@/components/admin/ui";
import { cn } from "@/lib/utils/cn";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(getAdminReviews());
  const setStatus = (id: string, status: "approved" | "pending", remove = false) =>
    setReviews((rs) => (remove ? rs.filter((r) => r.id !== id) : rs.map((r) => (r.id === id ? { ...r, status } : r))));

  const pending = reviews.filter((r) => r.status === "pending");

  return (
    <div>
      <PageHeader title="Reviews" subtitle={`${pending.length} awaiting moderation`} />
      <div className="space-y-3">
        {reviews.map((r) => (
          <Card key={r.id} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{r.author}</span>
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("h-3.5 w-3.5", i < r.rating ? "fill-warning text-warning" : "text-border")} />
                  ))}
                </span>
                <StatusPill status={r.status} />
              </div>
              <p className="mt-1 text-sm text-text-secondary">{r.text}</p>
              <p className="mt-1 font-mono text-xs text-text-muted">on {r.product}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              {r.status === "pending" && (
                <button onClick={() => setStatus(r.id, "approved")} className="inline-flex items-center gap-1.5 rounded-DEFAULT bg-success/10 px-3 py-2 text-sm font-semibold text-success">
                  <Check className="h-4 w-4" /> Approve
                </button>
              )}
              <button onClick={() => setStatus(r.id, "pending", true)} className="inline-flex items-center gap-1.5 rounded-DEFAULT border border-border px-3 py-2 text-sm font-semibold text-text-secondary hover:text-error">
                <X className="h-4 w-4" /> Remove
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
