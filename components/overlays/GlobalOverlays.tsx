"use client";
import { CartSheet } from "./CartSheet";
import { SearchOverlay } from "./SearchOverlay";
import { QuickView } from "./QuickView";

/** Single mount point for all global overlays. Rendered once in root layout. */
export function GlobalOverlays() {
  return (
    <>
      <SearchOverlay />
      <CartSheet />
      <QuickView />
    </>
  );
}
