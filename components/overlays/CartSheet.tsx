"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import { getProductById, getProductsByIds } from "@/lib/data/repository";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { Price } from "@/components/commerce/atoms";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/cn";

export function CartSheet() {
  const open = useStore((s) => s.cartOpen);
  const setOpen = useStore((s) => s.setCartOpen);
  const cart = useStore((s) => s.cart);
  const setQty = useStore((s) => s.setQty);
  const remove = useStore((s) => s.removeFromCart);

  const lines = cart
    .map((l) => ({ line: l, product: getProductById(l.productId) }))
    .filter((x) => x.product);
  const subtotal = lines.reduce((sum, x) => sum + (x.product!.price * x.line.qty), 0);

  // upsell: complete the setup from first item
  const upsell = lines[0]?.product
    ? getProductsByIds(lines[0].product!.completesWith).filter(
        (p) => !cart.some((l) => l.productId === p.id)
      ).slice(0, 4)
    : [];

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
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 40 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-bg shadow-lg"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-display text-lg font-semibold">
                Your cart <span className="font-mono text-sm text-text-muted">({cart.reduce((n, l) => n + l.qty, 0)})</span>
              </h2>
              <button onClick={() => setOpen(false)} aria-label="Close cart" className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface-hover cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-bg-secondary">
                  <ShoppingBag className="h-7 w-7 text-text-muted" />
                </div>
                <div>
                  <p className="font-sub font-semibold">Nothing here yet</p>
                  <p className="mt-1 text-sm text-text-secondary">Start discovering — you&apos;ll find something you love.</p>
                </div>
                <Button onClick={() => setOpen(false)} variant="accent">Start exploring</Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="space-y-4">
                    {lines.map(({ line, product }) => (
                      <li key={line.productId + (line.variantId ?? "")} className="flex gap-3">
                        <Link href={`/product/${product!.slug}`} onClick={() => setOpen(false)} className="relative h-20 w-16 shrink-0 overflow-hidden rounded-sm">
                          <ProductMedia src={product!.image} alt={product!.title} seed={product!.id} className="h-full w-full" />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <p className="line-clamp-1 text-sm font-medium">{product!.title}</p>
                            <button onClick={() => remove(line.productId, line.variantId)} aria-label="Remove" className="text-text-muted hover:text-error cursor-pointer">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-xs text-text-muted">{product!.subtitle}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full border border-border">
                              <button onClick={() => setQty(line.productId, line.variantId, line.qty - 1)} aria-label="Decrease" className="grid h-7 w-7 place-items-center rounded-full hover:bg-surface-hover cursor-pointer">
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center font-mono text-sm">{line.qty}</span>
                              <button onClick={() => setQty(line.productId, line.variantId, line.qty + 1)} aria-label="Increase" className="grid h-7 w-7 place-items-center rounded-full hover:bg-surface-hover cursor-pointer">
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <Price price={product!.price * line.qty} />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {upsell.length > 0 && (
                    <div className="mt-8">
                      <p className="eyebrow mb-3">Complete your setup</p>
                      <div className="flex gap-3 overflow-x-auto no-scrollbar">
                        {upsell.map((p) => (
                          <AddUpsell key={p.id} id={p.id} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-border px-5 py-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Subtotal</span>
                    <span className="font-mono text-lg font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mb-3 text-xs text-text-muted">Shipping & taxes calculated at checkout · Free shipping over ₹999</p>
                  <Link href="/checkout" onClick={() => setOpen(false)}>
                    <Button variant="accent" size="lg" className="w-full">
                      Checkout · {formatPrice(subtotal)}
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function AddUpsell({ id }: { id: string }) {
  const product = getProductById(id)!;
  const add = useStore((s) => s.addToCart);
  return (
    <button onClick={() => add(id)} className="group w-28 shrink-0 text-left cursor-pointer">
      <div className="relative aspect-square overflow-hidden rounded-sm border border-border">
        <ProductMedia src={product.image} alt={product.title} seed={product.id} className="h-full w-full" />
        <span className="absolute bottom-1.5 right-1.5 grid h-7 w-7 place-items-center rounded-full bg-white/90 shadow-sm transition-transform group-hover:scale-110">
          <Plus className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-1.5 line-clamp-1 text-xs font-medium">{product.title}</p>
      <Price price={product.price} className="text-xs" />
    </button>
  );
}
