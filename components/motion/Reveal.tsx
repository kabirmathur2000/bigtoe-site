"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each RevealItem. */
  stagger?: number;
  delay?: number;
  as?: "div" | "section" | "ul" | "header";
};

/**
 * Wrap a block; each <RevealItem> inside rises ~20px and fades in over 0.7s,
 * one after another, the first time the block enters the screen.
 */
export function Reveal({ children, className, stagger = 0.12, delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }
  return (
    <Tag
      className={className}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "p" | "h1" | "h2" | "h3" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }
  const Tag = motion[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
