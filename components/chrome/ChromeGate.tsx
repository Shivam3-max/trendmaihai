"use client";
import { usePathname } from "next/navigation";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { BottomTabBar } from "@/components/chrome/BottomTabBar";
import { GlobalOverlays } from "@/components/overlays/GlobalOverlays";

/** Renders storefront chrome everywhere except /admin, which has its own shell. */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;

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
