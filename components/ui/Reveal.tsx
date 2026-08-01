"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerParent, inView } from "@/lib/motion/variants";

/** Scroll-reveal wrapper. Children with `variants={fadeUp}` stagger in. */
export function Reveal({
  children,
  className,
  stagger = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={stagger ? staggerParent : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
