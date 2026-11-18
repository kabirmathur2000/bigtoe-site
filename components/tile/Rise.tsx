"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const group = (stagger: number): Variants => ({ hidden: {}, shown: { transition: { staggerChildren: stagger } } });
const rise: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type Tag = "div" | "ul" | "ol" | "section" | "figure";
type ItemTag = "div" | "p" | "h1" | "h2" | "h3" | "li" | "span";

/**
 * Gentle reveal (style tile): each RiseItem inside rises about 12px and
 * fades in over 0.6s, one after another, the first time the group enters
 * the screen. Nothing moves on its own after that. Reduced motion: shown
 * as is, no movement.
 */
export function Rise({ children, className, stagger = 0.12, as = "div" }: { children: ReactNode; className?: string; stagger?: number; as?: Tag }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }
  const M = motion[as];
  return (
    <M className={className} variants={group(stagger)} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.3 }}>
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
    <M className={className} variants={rise}>
      {children}
    </M>
  );
}

/** A photograph settles from a very slight zoom (1.04 to 1) the first time it enters. Reduced motion: no zoom. */
export function Settle({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ scale: 1.04 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A card's arrival: it rises about 40px, fades in and settles from 98% to
 * full size over about 0.8s, once. Reduced motion: shown as is.
 */
export function CardRise({ children, className, label }: { children: ReactNode; className?: string; label?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} aria-label={label} role={label ? "group" : undefined}>{children}</div>;
  return (
    <motion.div
      className={className}
      aria-label={label}
      role={label ? "group" : undefined}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
