import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "TrendMeHai exists to help you discover products you never knew you needed.",
};

const VALUES = [
  { t: "Discovery over search", d: "We believe the best things find you — not the other way around. Our feed is built to spark curiosity, not answer queries." },
  { t: "Products are the hero", d: "Clean, bright, editorial. The interface gets out of the way so the things you love can shine." },
  { t: "Delight is the strategy", d: "Every interaction is designed to feel good. Shopping should be entertainment, not a chore." },
  { t: "Honest by design", d: "Real stock, real trends, real reviews. No fake urgency, no dark patterns — trust is how we grow." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="container-page py-20 text-center md:py-28">
        <p className="eyebrow mb-4">Our philosophy</p>
        <h1 className="mx-auto max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          You don&apos;t search.<br />You <span className="accent-sweep">discover</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
          TrendMeHai exists to help people discover products they never knew they needed.
          We&apos;re building the most enjoyable way to shop online — one that feels more like
          scrolling your favourite feed than browsing a catalogue.
        </p>
      </section>

      <section className="border-y border-border bg-bg-secondary">
        <div className="container-page grid gap-8 py-16 md:grid-cols-2 md:py-20">
          {VALUES.map((v) => (
            <div key={v.t}>
              <h2 className="font-display text-2xl font-semibold tracking-tight">{v.t}</h2>
              <p className="mt-3 max-w-md leading-relaxed text-text-secondary">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20 text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Come discover something.</h2>
        <Link href="/discover" className="mt-6 inline-flex items-center gap-2 rounded-DEFAULT bg-accent px-7 py-3.5 font-sub font-semibold text-white shadow-accent">
          Start exploring <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
