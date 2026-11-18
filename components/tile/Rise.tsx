"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const group = (stagger: number): Variants => ({ hidden: {}, shown: { transition: { staggerChildren: stagger } } });
const up: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type Tag = "div" | "ul" | "ol" | "section" | "header";
type ItemTag = "div" | "p" | "h1" | "h2" | "h3" | "li" | "span";

/**
 * The one motion on the tile (round six): content fades up about 16px over
 * 0.6s, once, as it arrives. Each RiseItem inside a Rise follows the one
 * before by a beat. Nothing is tied to scroll position and nothing moves
 * again. Reduced motion: shown as is.
 */
export function Rise({ children, className, stagger = 0.08, as = "div" }: { children: ReactNode; className?: string; stagger?: number; as?: Tag }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }
  const M = motion[as];
  return (
    <M className={className} variants={group(stagger)} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.2 }}>
      {children}
    </M>
  );
}

export function RiseItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: ItemTag }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }
  const M = motion[as];
  return (
    <M className={className} variants={up}>
      {children}
    </M>
  );
}

/** One block that fades up on its own. */
export function FadeUp({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
