import type { Metadata } from "next";
import { Reels } from "@/components/discovery/Reels";
import { getReelProducts } from "@/lib/data/repository";

export const metadata: Metadata = {
  title: "Reels",
  description: "Swipe through the products everyone's about to want.",
};

export default function ReelsPage() {
  return (
    <div className="bg-bg">
      <Reels products={getReelProducts()} />
    </div>
  );
}
