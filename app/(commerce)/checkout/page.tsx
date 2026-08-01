"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Lock, BadgeIndianRupee, Smartphone, CreditCard, ShieldCheck, RotateCcw, Truck } from "lucide-react";
import { useStore } from "@/store/useStore";
import { getProductById } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { Button } from "@/components/ui/Button";
import { cn, formatPrice } from "@/lib/utils/cn";

type Pay = "cod" | "upi" | "card";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useStore((s) => s.cart);
  const clearCart = useStore((s) => s.clearCart);
  const addPoints = useStore((s) => s.addPoints);
  const [pay, setPay] = useState<Pay>("cod");
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pin: "" });

  const lines = cart.map((l) => ({ line: l, product: getProductById(l.productId) })).filter((x) => x.product);
  const subtotal = lines.reduce((sum, x) => sum + x.product!.price * x.line.qty, 0);
  const shipping = subtotal > 999 ? 0 : 49;
  const total = subtotal + shipping;

  const valid = form.name && form.email && form.phone.length >= 10 && form.address && form.city && form.pin.length >= 5;

  const placeOrder = () => {
    if (!valid) return;
    setPlacing(true);
    setTimeout(() => {
      const id = "TMH" + Math.floor(100000 + Math.random() * 900000);
      addPoints(Math.round(total / 50));
      clearCart();
      router.push(`/order/confirmation/${id}`);
    }, 1300);
  };

  if (lines.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <p className="font-sub text-lg font-semibold">Your cart is empty</p>
        <Link href="/discover" className="mt-4 inline-block rounded-DEFAULT bg-accent px-6 py-3 font-sub font-semibold text-white">Discover something</Link>
      </div>
    );
  }

  const field = (key: keyof typeof form, label: string, type = "text", extra?: string) => (
    <label className={cn("block", extra)}>
      <span className="mb-1.5 block text-sm font-medium text-text-secondary">{label}</span>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="h-12 w-full rounded-DEFAULT border border-border bg-surface px-4 text-base outline-none transition-colors focus:border-accent"
      />
    </label>
  );

  return (
    <div className="container-page py-8 md:py-12">
      <div className="mb-8 flex items-center gap-2 font-mono text-xs text-text-muted">
        <span className="text-accent">Contact</span><span>·</span><span className="text-accent">Shipping</span><span>·</span><span className="text-accent">Payment</span>
      </div>
      <h1 className="mb-8 font-display text-3xl font-semibold tracking-tight md:text-4xl">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* form */}
        <div className="space-y-8">
          <section>
            <h2 className="mb-4 font-sub text-lg font-semibold">Contact</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field("name", "Full name")}
              {field("email", "Email", "email")}
              {field("phone", "Phone", "tel", "sm:col-span-2")}
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-sub text-lg font-semibold">Shipping address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field("address", "Address", "text", "sm:col-span-2")}
              {field("city", "City")}
              {field("pin", "PIN code")}
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-sub text-lg font-semibold">Payment</h2>
            <div className="space-y-3">
              {([["cod", BadgeIndianRupee, "Cash on Delivery", "Pay when it arrives"], ["upi", Smartphone, "UPI", "GPay, PhonePe, Paytm"], ["card", CreditCard, "Card", "Credit / Debit"]] as const).map(([id, Icon, label, desc]) => (
                <button key={id} onClick={() => setPay(id)} className={cn("flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left transition-colors", pay === id ? "border-accent bg-accent-soft" : "border-border")}>
                  <Icon className="h-5 w-5 text-text-secondary" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-xs text-text-muted">{desc}</p>
                  </div>
                  <span className={cn("grid h-5 w-5 place-items-center rounded-full border-2", pay === id ? "border-accent bg-accent text-white" : "border-border")}>
                    {pay === id && <Check className="h-3 w-3" />}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* summary */}
        <aside className="h-fit rounded-lg border border-border bg-bg-secondary p-5 lg:sticky lg:top-24">
          <h2 className="font-sub font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {lines.map(({ line, product }) => (
              <li key={line.productId + (line.variantId ?? "")} className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm">
                  <ProductMedia src={product!.image} alt={product!.title} seed={product!.id} className="h-full w-full" />
                  <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-text font-mono text-[0.6rem] font-bold text-white">{line.qty}</span>
                </div>
                <span className="line-clamp-1 flex-1 text-sm">{product!.title}</span>
                <span className="font-mono text-sm">{formatPrice(product!.price * line.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-text-secondary">Subtotal</dt><dd className="font-mono">{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-text-secondary">Shipping</dt><dd className="font-mono">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-medium"><dt>Total</dt><dd className="font-mono">{formatPrice(total)}</dd></div>
          </dl>
          <Button onClick={placeOrder} loading={placing} disabled={!valid} variant="accent" size="lg" className="mt-5 w-full">
            {placing ? "Placing order…" : <><Lock className="h-4 w-4" /> Place order · {formatPrice(total)}</>}
          </Button>
          {!valid && <p className="mt-2 text-center text-xs text-text-muted">Fill your details to place the order</p>}
          <div className="mt-5 flex justify-center gap-4 text-text-muted">
            {[[ShieldCheck, "Secure"], [RotateCcw, "7-day returns"], [Truck, "Fast"]].map(([Icon, l], i) => {
              const I = Icon as React.ElementType;
              return <span key={i} className="inline-flex items-center gap-1 text-xs"><I className="h-3.5 w-3.5" /> {l as string}</span>;
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
