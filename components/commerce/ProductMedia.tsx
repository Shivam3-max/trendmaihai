"use client";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const GRADIENTS = [
  "linear-gradient(135deg,#EFF4FF,#E4ECFF)",
  "linear-gradient(135deg,#FBF3EC,#F5E7DA)",
  "linear-gradient(135deg,#F3EEFF,#E9E0FF)",
  "linear-gradient(135deg,#EEF6F1,#DFF0E6)",
  "linear-gradient(135deg,#F6F0E9,#EFE4D6)",
  "linear-gradient(135deg,#F0F1F4,#E4E7EE)",
];

function gradientFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 997;
  return GRADIENTS[h % GRADIENTS.length];
}

export function ProductMedia({
  src,
  alt,
  seed,
  className,
  imgClassName,
  priority,
}: {
  src: string;
  alt: string;
  seed: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const grad = gradientFor(seed);

  return (
    <div className={cn("relative overflow-hidden bg-bg-secondary", className)}>
      {failed ? (
        <div
          className="absolute inset-0 flex items-end p-3"
          style={{ background: grad }}
          aria-label={alt}
          role="img"
        >
          <span className="font-sub text-xs font-semibold uppercase tracking-wide text-text-secondary/70">
            {alt}
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            imgClassName
          )}
        />
      )}
    </div>
  );
}
