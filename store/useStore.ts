"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, MoodSlug, AuthUser } from "@/lib/data/types";

/* ------------------------------------------------------------------ */
/* Unified client store: cart · wishlist · taste · rewards · ui        */
/* Persisted slices survive reload (guest); merge to account later.    */
/* ------------------------------------------------------------------ */

interface StoreState {
  // cart
  cart: CartLine[];
  addToCart: (productId: string, variantId?: string, qty?: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  setQty: (productId: string, variantId: string | undefined, qty: number) => void;
  clearCart: () => void;
  cartCount: () => number;

  // wishlist
  saved: string[];
  toggleSaved: (productId: string) => void;
  isSaved: (productId: string) => boolean;

  // taste vector (mood affinity)
  taste: Record<string, number>;
  recordMoods: (moods: MoodSlug[], weight?: number) => void;
  topMoods: (n?: number) => MoodSlug[];

  // recently viewed
  recent: string[];
  recordView: (productId: string) => void;

  // rewards
  points: number;
  streak: number;
  addPoints: (n: number) => void;

  // auth (mock)
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;

  // ui (ephemeral, not persisted)
  cartOpen: boolean;
  searchOpen: boolean;
  quickViewSlug: string | null;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setQuickView: (slug: string | null) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (productId, variantId, qty = 1) =>
        set((s) => {
          const idx = s.cart.findIndex(
            (l) => l.productId === productId && l.variantId === variantId
          );
          if (idx >= 0) {
            const cart = [...s.cart];
            cart[idx] = { ...cart[idx], qty: cart[idx].qty + qty };
            return { cart };
          }
          return { cart: [...s.cart, { productId, variantId, qty }] };
        }),
      removeFromCart: (productId, variantId) =>
        set((s) => ({
          cart: s.cart.filter(
            (l) => !(l.productId === productId && l.variantId === variantId)
          ),
        })),
      setQty: (productId, variantId, qty) =>
        set((s) => ({
          cart: s.cart
            .map((l) =>
              l.productId === productId && l.variantId === variantId
                ? { ...l, qty }
                : l
            )
            .filter((l) => l.qty > 0),
        })),
      clearCart: () => set({ cart: [] }),
      cartCount: () => get().cart.reduce((n, l) => n + l.qty, 0),

      saved: [],
      toggleSaved: (productId) =>
        set((s) => ({
          saved: s.saved.includes(productId)
            ? s.saved.filter((id) => id !== productId)
            : [productId, ...s.saved],
        })),
      isSaved: (productId) => get().saved.includes(productId),

      taste: {},
      recordMoods: (moods, weight = 1) =>
        set((s) => {
          const taste = { ...s.taste };
          for (const m of moods) taste[m] = (taste[m] ?? 0) + weight;
          return { taste };
        }),
      topMoods: (n = 3) =>
        Object.entries(get().taste)
          .sort((a, b) => b[1] - a[1])
          .slice(0, n)
          .map(([m]) => m as MoodSlug),

      recent: [],
      recordView: (productId) =>
        set((s) => ({
          recent: [productId, ...s.recent.filter((id) => id !== productId)].slice(0, 20),
        })),

      points: 120,
      streak: 1,
      addPoints: (n) => set((s) => ({ points: s.points + n })),

      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),

      cartOpen: false,
      searchOpen: false,
      quickViewSlug: null,
      setCartOpen: (v) => set({ cartOpen: v }),
      setSearchOpen: (v) => set({ searchOpen: v }),
      setQuickView: (slug) => set({ quickViewSlug: slug }),
    }),
    {
      name: "trendmehai",
      partialize: (s) => ({
        cart: s.cart,
        saved: s.saved,
        taste: s.taste,
        recent: s.recent,
        points: s.points,
        streak: s.streak,
        user: s.user,
      }),
    }
  )
);
