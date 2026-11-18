"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** A 270° arc from 7:30 round to 4:30, centre (50, 52), radius 40. */
const ARC = "M21.7 80.3A40 40 0 1 1 78.3 80.3";
/** Eleven short ticks along the arc. */
const TICKS = Array.from({ length: 11 }, (_, i) => {
  const a = ((135 + i * 27) * Math.PI) / 180;
  const r1 = 33;
  const r2 = i % 5 === 0 ? 27 : 30;
  const p = (r: number) => `${(50 + r * Math.cos(a)).toFixed(2)} ${(52 + r * Math.sin(a)).toFixed(2)}`;
  return `M${p(r1)}L${p(r2)}`;
}).join("");

/**
 * One dial as a hairline line drawing: the arc, its ticks and a centre
 * point, no needle and no score. The lines draw once when the dials
 * arrive, one dial after another; static under reduced motion.
 */
export function Dial({ index }: { index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const [seen, setSeen] = useState(false);
  const on = reduce || seen;

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setSeen(true);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const draw = (delay: number) => ({
    strokeDasharray: 1,
    strokeDashoffset: on ? 0 : 1,
    transition: reduce ? "none" : `stroke-dashoffset 1400ms cubic-bezier(0.22, 1, 0.36, 1) ${index * 200 + delay}ms`,
  });

  return (
    <svg ref={ref} aria-hidden viewBox="0 0 100 92" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" className="w-full max-w-[11rem]">
      <path d={ARC} pathLength={1} style={draw(0)} />
      <path d={TICKS} pathLength={1} style={draw(300)} />
      <circle cx="50" cy="52" r="1.6" fill="currentColor" stroke="none" style={{ opacity: on ? 1 : 0, transition: reduce ? "none" : `opacity 600ms ease ${index * 200 + 900}ms` }} />
    </svg>
  );
}
