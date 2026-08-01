"use client";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, RotateCcw, BadgeIndianRupee } from "lucide-react";
import { useStore } from "@/store/useStore";
import { getProductById, getProductsByIds } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { Price } from "@/components/commerce/atoms";
import { ProductCard } from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/chrome/SectionHeader";
import { formatPrice } from "@/lib/utils/cn";

export default function CartPage() {
  const cart = useStore((s) => s.cart);
  const setQty = useStore((s) => s.setQty);
  const remove = useStore((s) => s.removeFromCart);

  const lines = cart.map((l) => ({ line: l, product: getProductById(l.productId) })).filter((x) => x.product);
  const subtotal = lines.reduce((sum, x) => sum + x.product!.price * x.line.qty, 0);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const upsell = lines[0]?.product ? getProductsByIds(lines[0].product!.completesWith).filter((p) => !cart.some((l) => l.productId === p.id)).slice(0, 4) : [];

  if (lines.length === 0) {
    return (
      <div className="container-page py-16">
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-bg-secondary py-20 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-surface"><ShoppingBag className="h-7 w-7 text-text-muted" /></div>
          <div>
            <p className="font-sub text-lg font-semibold">Your cart is empty</p>
            <p className="mt-1 text-text-secondary">The good stuff is one scroll away.</p>
          </div>
          <Link href="/discover" className="inline-flex items-center gap-2 rounded-DEFAULT bg-accent px-6 py-3 font-sub font-semibold text-white shadow-accent">
            Start discovering <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="mb-8 font-display text-3xl font-semibold tracking-tight md:text-4xl">Your cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <ul className="divide-y divide-border rounded-lg border border-border">
            {lines.map(({ line, product }) => (
              <li key={line.productId + (line.variantId ?? "")} className="flex gap-4 p-4">
                <Link href={`/product/${product!.slug}`} className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm">
                  <ProductMedia src={product!.image} alt={product!.title} seed={product!.id} className="h-full w-full" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <Link href={`/product/${product!.slug}`} className="font-medium hover:text-accent">{product!.title}</Link>
                    <button onClick={() => remove(line.productId, line.variantId)} aria-label="Remove" className="text-text-muted hover:text-error"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <p className="text-sm text-text-muted">{product!.subtitle}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-full border border-border">
                      <button onClick={() => setQty(line.productId, line.variantId, line.qty - 1)} aria-label="Decrease" className="grid h-8 w-8 place-items-center rounded-full hover:bg-surface-hover"><Minus className="h-4 w-4" /></button>
                      <span className="w-7 text-center font-mono text-sm">{line.qty}</span>
                      <button onClick={() => setQty(line.productId, line.variantId, line.qty + 1)} aria-label="Increase" className="grid h-8 w-8 place-items-center rounded-full hover:bg-surface-hover"><Plus className="h-4 w-4" /></button>
                    </div>
                    <Price price={product!.price * line.qty} className="text-base" />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {upsell.length > 0 && (
            <div className="mt-8">
              <SectionHeader eyebrow="Complete your setup" title="Frequently added together" />
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {upsell.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-lg border border-border bg-bg-secondary p-5 lg:sticky lg:top-24">
          <h2 className="font-sub font-semibold">Order summary</h2>
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between"><dt className="text-text-secondary">Subtotal</dt><dd className="font-mono">{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-text-secondary">Shipping</dt><dd className="font-mono">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-medium"><dt>Total</dt><dd className="font-mono">{formatPrice(subtotal + shipping)}</dd></div>
          </dl>
          <Link href="/checkout"><Button variant="accent" size="lg" className="mt-5 w-full">Checkout <ArrowRight className="h-4 w-4" /></Button></Link>
          <div className="mt-5 flex justify-center gap-4 text-text-muted">
            {[[BadgeIndianRupee, "COD"], [RotateCcw, "Returns"], [ShieldCheck, "Secure"]].map(([Icon, l], i) => {
              const I = Icon as React.ElementType;
              return <span key={i} className="inline-flex items-center gap-1 text-xs"><I className="h-3.5 w-3.5" /> {l as string}</span>;
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
