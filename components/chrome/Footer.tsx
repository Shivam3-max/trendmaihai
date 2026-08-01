import Link from "next/link";
import { Truck, RotateCcw, ShieldCheck, BadgeIndianRupee, Instagram, Youtube, Twitter } from "lucide-react";

const COLS = [
  {
    title: "Discover",
    links: [
      ["Trending", "/trending"],
      ["New Drops", "/new"],
      ["Shop by Mood", "/moods"],
      ["Collections", "/collections"],
      ["Deals", "/deals"],
    ],
  },
  {
    title: "Community",
    links: [
      ["Creators", "/creators"],
      ["Community Setups", "/community"],
      ["Upload a Setup", "/community/upload"],
      ["Reels", "/reels"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Support", "/support"],
      ["Track Order", "/track"],
      ["Wishlist", "/wishlist"],
    ],
  },
];

const TRUST = [
  [BadgeIndianRupee, "Cash on Delivery"],
  [RotateCcw, "7-day Easy Returns"],
  [ShieldCheck, "Secure Payments"],
  [Truck, "Fast Delivery"],
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-bg-secondary">
      <div className="container-page py-14">
        {/* trust row */}
        <div className="mb-12 grid grid-cols-2 gap-4 border-b border-border pb-10 md:grid-cols-4">
          {TRUST.map(([Icon, label]) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-text-secondary" strokeWidth={1.75} />
              <span className="text-sm font-medium text-text-secondary">{label}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-display text-2xl font-bold tracking-tight">
              TrendMe<span className="accent-sweep">Hai</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
              You don&apos;t search. You discover. The products everyone&apos;s about to
              want — before they blow up.
            </p>
            <div className="mt-5 flex gap-2">
              {[Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-text-secondary transition-colors hover:border-accent hover:text-accent"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-text-secondary transition-colors hover:text-text"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 md:flex-row">
          <span className="font-mono text-xs text-text-muted">
            © 2026 TrendMeHai · Made for discovery.
          </span>
          <div className="flex gap-5 font-mono text-xs text-text-muted">
            <Link href="#" className="hover:text-text">Privacy</Link>
            <Link href="#" className="hover:text-text">Terms</Link>
            <Link href="#" className="hover:text-text">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
