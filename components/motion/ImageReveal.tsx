"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * A soft wipe: a mask with a feathered edge slides across the image, while
 * the image settles from a very slight zoom. The mask is wider than the box
 * so the feathered edge travels fully off-screen.
 */
const MASK = "linear-gradient(90deg, #000 40%, transparent 60%)";

export function ImageReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={`overflow-hidden ${className}`}>{children}</div>;

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      style={{
        maskImage: MASK,
        WebkitMaskImage: MASK,
        maskSize: "260% 100%",
        WebkitMaskSize: "260% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "var(--wipe) 0%",
        WebkitMaskPosition: "var(--wipe) 0%",
      }}
      initial={{ "--wipe": "100%" }}
      whileInView={{ "--wipe": "0%" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.8, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
