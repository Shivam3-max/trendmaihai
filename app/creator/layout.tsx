import type { Metadata } from "next";
import { CreatorGate } from "@/components/creator/CreatorGate";

export const metadata: Metadata = {
  title: "Creator · TrendMeHai",
  robots: { index: false, follow: false },
};

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  return <CreatorGate>{children}</CreatorGate>;
}
