"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Depth in photos: the photo moves about 8% slower than its frame, inside
 * the frame's rounded edges. Tied to scroll position, so it rewinds on the
 * way up. Transform only. Off under reduced motion.
 */
export function Parallax({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  if (reduce) return <div className="absolute inset-0">{children}</div>;
  return (
    <div ref={frame} className="absolute inset-0 overflow-hidden">
      {/* 16% taller than the frame, so the movement never shows an edge. */}
      <motion.div className="absolute inset-x-0 -top-[8%] -bottom-[8%]" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
