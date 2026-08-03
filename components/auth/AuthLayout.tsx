import Link from "next/link";

/** Full-screen, chromeless auth shell with a bright editorial side panel. */
export function AuthLayout({
  children,
  side,
}: {
  children: React.ReactNode;
  side?: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* form side */}
      <div className="flex flex-col px-6 py-8 md:px-12">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          TrendMe<span className="accent-sweep">Hai</span>
        </Link>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
        <p className="text-center font-mono text-xs text-text-muted">© 2026 TrendMeHai</p>
      </div>

      {/* editorial side */}
      <div className="relative hidden overflow-hidden bg-bg-secondary lg:block">
        <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-10 h-72 w-72 rounded-full bg-accent-secondary/10 blur-3xl" />
        <div className="relative flex h-full flex-col justify-center px-14">
          {side ?? (
            <>
              <p className="eyebrow mb-4">Welcome to the club</p>
              <h2 className="font-display text-[clamp(2rem,3.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
                You don&apos;t search.<br />You <span className="accent-sweep">discover</span>.
              </h2>
              <p className="mt-5 max-w-sm text-lg text-text-secondary">
                Save what you love, earn as you explore, and pick up right where you left off.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
