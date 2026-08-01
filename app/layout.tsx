import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { BottomTabBar } from "@/components/chrome/BottomTabBar";
import { GlobalOverlays } from "@/components/overlays/GlobalOverlays";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trendmehai.com"),
  title: {
    default: "TrendMeHai — You don't search. You discover.",
    template: "%s · TrendMeHai",
  },
  description:
    "A discovery-first shopping experience. Scroll, save, and buy the products everyone's about to want — before they blow up.",
  openGraph: {
    title: "TrendMeHai — You don't search. You discover.",
    description: "Discover the products everyone's about to want.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body
        style={{ ["--font-sub" as string]: "var(--font-display)" }}
        className="min-h-screen bg-bg text-text antialiased"
      >
        <Header />
        <main className="pb-20 md:pb-0">{children}</main>
        <Footer />
        <BottomTabBar />
        <GlobalOverlays />
      </body>
    </html>
  );
}
