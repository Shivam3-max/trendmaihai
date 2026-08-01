import type { Variants, Transition } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;
export const spring: Transition = { type: "spring", stiffness: 380, damping: 32, mass: 0.9 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: easeOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: spring },
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
};

/** viewport config for scroll reveals */
export const inView = { once: true, margin: "-10% 0px -10% 0px" } as const;
