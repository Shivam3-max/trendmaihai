"use client";
import { useState } from "react";
import Link from "next/link";
import { Upload, ImagePlus, Tag, Check, ArrowLeft } from "lucide-react";
import { getAllProducts } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export default function UploadPage() {
  const products = getAllProducts();
  const [title, setTitle] = useState("");
  const [tagged, setTagged] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) =>
    setTagged((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  if (submitted) {
    return (
      <div className="container-page py-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success"><Check className="h-8 w-8" /></div>
        <h1 className="mt-5 font-display text-2xl font-semibold">Submitted for review</h1>
        <p className="mt-2 text-text-secondary">Thanks for sharing! We&apos;ll review your setup and feature it soon.</p>
        <Link href="/community" className="mt-6 inline-block rounded-DEFAULT bg-text px-6 py-3 font-sub font-semibold text-white">Back to community</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8 md:py-12">
      <Link href="/community" className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text">
        <ArrowLeft className="h-4 w-4" /> Community
      </Link>
      <p className="eyebrow mb-2">Share your setup</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Upload a setup</h1>
      <p className="mt-2 max-w-lg text-text-secondary">Show off your space and tag the products in it — others can shop your whole room in a tap.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          {/* image drop */}
          <div>
            <span className="mb-1.5 block text-sm font-medium text-text-secondary">Photo</span>
            <div className="grid aspect-[4/3] place-items-center rounded-lg border-2 border-dashed border-border bg-bg-secondary text-center">
              <div>
                <ImagePlus className="mx-auto h-8 w-8 text-text-muted" />
                <p className="mt-2 text-sm font-medium">Drop a photo of your setup</p>
                <p className="text-xs text-text-muted">JPG or PNG, up to 10MB</p>
              </div>
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-text-secondary">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. My ₹15k minimal oak desk"
              className="h-12 w-full rounded-DEFAULT border border-border bg-surface px-4 text-base outline-none focus:border-accent"
            />
          </label>

          <div className="rounded-lg border border-border bg-bg-secondary p-4 text-sm text-text-secondary">
            <p className="flex items-center gap-2 font-medium text-text"><Upload className="h-4 w-4" /> Before it goes live</p>
            <p className="mt-1.5">Uploads are reviewed before they&apos;re published to the community. You&apos;ll be asked to confirm before anything is shared publicly.</p>
          </div>

          <Button
            onClick={() => setSubmitted(true)}
            disabled={!title || tagged.size === 0}
            variant="accent"
            size="lg"
            className="w-full"
          >
            Submit for review
          </Button>
          {(!title || tagged.size === 0) && <p className="text-center text-xs text-text-muted">Add a title and tag at least one product</p>}
        </div>

        {/* tag products */}
        <div>
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-text-secondary"><Tag className="h-4 w-4" /> Tag products in your setup ({tagged.size})</span>
          <div className="max-h-[520px] overflow-y-auto rounded-lg border border-border p-3">
            <div className="grid grid-cols-3 gap-2">
              {products.map((p) => {
                const on = tagged.has(p.id);
                return (
                  <button key={p.id} onClick={() => toggle(p.id)} className="group text-left">
                    <div className={cn("relative aspect-square overflow-hidden rounded-sm border-2 transition-all", on ? "border-accent" : "border-transparent")}>
                      <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" />
                      {on && <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-white"><Check className="h-3 w-3" /></span>}
                    </div>
                    <p className="mt-1 line-clamp-1 text-[0.7rem] font-medium">{p.title}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
