"use client";
import { usePathname } from "next/navigation";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { BottomTabBar } from "@/components/chrome/BottomTabBar";
import { GlobalOverlays } from "@/components/overlays/GlobalOverlays";

/** Renders storefront chrome everywhere except surfaces with their own shell. */
const BARE = ["/admin", "/creator", "/login", "/signup"];

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (BARE.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="pb-20 md:pb-0">{children}</main>
      <Footer />
      <BottomTabBar />
      <GlobalOverlays />
    </>
  );
}
