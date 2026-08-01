"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { searchIntent, SEARCH_SUGGESTIONS } from "@/lib/data/repository";
import { ProductGrid } from "@/components/discovery/ProductGrid";

function SearchResults() {
  const sp = useSearchParams();
  const router = useRouter();
  const q0 = sp.get("q") ?? "";
  const [q, setQ] = useState(q0);
  useEffect(() => setQ(q0), [q0]);

  const intent = q.trim() ? searchIntent(q) : null;
  const results = intent?.results ?? [];

  const submit = (val: string) => {
    setQ(val);
    router.replace(`/search?q=${encodeURIComponent(val)}`);
  };

  return (
    <div className="container-page py-10 md:py-14">
      {/* editable query */}
      <div className="mx-auto mb-8 flex max-w-2xl items-center gap-3 rounded-full border border-border bg-surface px-5 py-3.5 shadow-sm">
        <Sparkles className="h-5 w-5 text-accent" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit(q)}
          placeholder="What are you looking for today?"
          className="flex-1 bg-transparent text-base outline-none placeholder:text-text-muted"
        />
        <button onClick={() => submit(q)} className="rounded-full bg-text px-4 py-1.5 text-sm font-semibold text-white">Search</button>
      </div>

      {!q.trim() ? (
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-3">Try asking for…</p>
          <div className="flex flex-col gap-1">
            {SEARCH_SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => submit(s)} className="flex items-center gap-2.5 rounded-DEFAULT px-3 py-2.5 text-left text-sm text-text-secondary transition-colors hover:bg-surface-hover hover:text-text">
                <Search className="h-4 w-4 text-text-muted" /> {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold">
              <span className="font-mono text-base text-text-muted">{results.length} finds for</span> &ldquo;{q}&rdquo;
            </h1>
          </div>
          {intent && intent.chips.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 text-xs text-text-muted"><Sparkles className="h-3.5 w-3.5 text-accent" /> AI understood:</span>
              {intent.chips.map((c) => (
                <span key={c} className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent">{c}</span>
              ))}
            </div>
          )}
          <ProductGrid products={results} />
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-page py-20 text-center text-text-muted">Loading…</div>}>
      <SearchResults />
    </Suspense>
  );
}
