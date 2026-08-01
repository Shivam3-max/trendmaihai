"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import { useStore } from "@/store/useStore";
import { searchIntent, SEARCH_SUGGESTIONS, getTrending } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { Price } from "@/components/commerce/atoms";

export function SearchOverlay() {
  const open = useStore((s) => s.searchOpen);
  const setOpen = useStore((s) => s.setSearchOpen);
  const [q, setQ] = useState("");
  const router = useRouter();

  // keyboard: ⌘K to open, Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  const intent = useMemo(() => (q.trim() ? searchIntent(q) : null), [q]);
  const results = intent ? intent.results.slice(0, 6) : getTrending(6);

  const submit = () => {
    if (!q.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-text/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 34 }}
            className="fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-2xl px-4 pt-4 md:pt-16"
            role="dialog"
            aria-label="Search"
          >
            <div className="overflow-hidden rounded-lg border border-border bg-bg shadow-lg">
              <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                <Sparkles className="h-5 w-5 shrink-0 text-accent" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="What are you looking for today?"
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-text-muted"
                />
                <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full hover:bg-surface-hover cursor-pointer">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4">
                {/* intent chips */}
                {intent && intent.chips.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {intent.chips.map((c) => (
                      <span key={c} className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent">
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                {!q && (
                  <>
                    <p className="eyebrow mb-2.5">Try asking for…</p>
                    <div className="mb-5 flex flex-col gap-1">
                      {SEARCH_SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQ(s)}
                          className="flex items-center gap-2.5 rounded-DEFAULT px-2.5 py-2 text-left text-sm text-text-secondary transition-colors hover:bg-surface-hover hover:text-text cursor-pointer"
                        >
                          <Search className="h-4 w-4 text-text-muted" />
                          {s}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <p className="eyebrow mb-2.5 flex items-center gap-1.5">
                  {q ? <><Sparkles className="h-3.5 w-3.5" /> Smart matches</> : <><TrendingUp className="h-3.5 w-3.5" /> Trending now</>}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="group rounded-DEFAULT border border-transparent p-1.5 transition-colors hover:border-border hover:bg-surface-hover"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-sm">
                        <ProductMedia src={p.image} alt={p.title} seed={p.id} className="h-full w-full" imgClassName="group-hover:scale-105" />
                      </div>
                      <p className="mt-1.5 line-clamp-1 text-xs font-medium">{p.title}</p>
                      <Price price={p.price} className="text-xs" />
                    </Link>
                  ))}
                </div>

                {q && (
                  <button onClick={submit} className="mt-4 flex w-full items-center justify-center gap-2 rounded-DEFAULT bg-text py-3 text-sm font-semibold text-white cursor-pointer">
                    See all results for &ldquo;{q}&rdquo; <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
