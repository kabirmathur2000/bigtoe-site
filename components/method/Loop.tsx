"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Size = { w: number; h: number; vertical: boolean };

/** Each divider's bow, in px: three different curvatures, all one way. */
const BOWS = [18, 34, 54];

/**
 * The dividers and the rising terracotta line, drawn in real pixels (the
 * SVG's viewBox matches the panel), so hairlines stay one pixel at any
 * size. Desktop: three smooth arcs of growing curvature and a line rising
 * left to right. Phones: the arcs run across, and the panel has no line
 * (a short rising line sits above it instead), so it never slopes down.
 */
function paths({ w, h, vertical }: Size) {
  if (vertical) {
    const curves = BOWS.map((b, i) => {
      const y = (h * (i + 1)) / 4;
      return `M0 ${y} Q${w / 2} ${y - b * 0.45} ${w} ${y}`;
    });
    return { curves, reserve: null };
  }
  const curves = BOWS.map((b, i) => {
    const x = (w * (i + 1)) / 4;
    return `M${x} 0 Q${x + b} ${h / 2} ${x} ${h}`;
  });
  const reserve = `M0 ${h * 0.6} C${w * 0.35} ${h * 0.58} ${w * 0.62} ${h * 0.26} ${w} ${h * 0.08}`;
  return { curves, reserve };
}

/**
 * The loop diagram (Method, "What we promise"), after Love.Life's
 * panel, in BigToe's words and colours. One panel (hairline border, 8px
 * corners) in four columns: Measure, Train the weakest, Retest,
 * Recalibrate, divided by three smooth arcs; a thin terracotta line rises
 * across all four. Drawn in the current text colour, so it sits on navy or
 * light. As it arrives the arcs and the rising line draw together, then the
 * words fade in, left to right: about two seconds in all. Static under
 * reduced motion. Phones: stacked, arcs across, and a short terracotta line
 * rising above the panel (it never slopes downward).
 */
export function LoopDiagram({ steps, label }: { steps: readonly string[]; label: string }) {
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [seen, setSeen] = useState(false);
  const on = reduce || seen;

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.round(r.width), h: Math.round(r.height), vertical: !window.matchMedia("(min-width: 768px)").matches });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) return;
    const el = panel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setSeen(true);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const p = size ? paths(size) : null;
  // About two seconds: arcs and line together (1s), then the words, left to right.
  const draw = (delay: number, duration: number) => ({
    strokeDasharray: 1,
    strokeDashoffset: on ? 0 : 1,
    transition: reduce ? "none" : `stroke-dashoffset ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  });
  const words = (i: number) => ({ transitionDelay: on && !reduce ? `${900 + i * 150}ms` : "0ms" });

  return (
    <>
      {/* Phones: the rising line sits above the stacked panel. */}
      <svg aria-hidden viewBox="0 0 112 32" fill="none" className="mb-3 h-8 w-28 md:hidden">
        <path d="M1 31C40 30 78 15 111 1" pathLength={1} stroke="var(--color-terracotta)" strokeWidth={1.5} strokeLinecap="round" style={draw(0, 1000)} />
      </svg>
      <div
        ref={panel}
        role="group"
        aria-label={label}
        className="relative h-[min(42svh,320px)] rounded-lg border border-current/60 short:h-[36svh] md:h-[min(44svh,420px)]"
      >
        {p && size && (
          <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${size.w} ${size.h}`} fill="none">
            {p.curves.map((d, i) => (
              <path key={i} d={d} pathLength={1} stroke="currentColor" strokeOpacity={0.6} strokeWidth={1} style={draw(0, 1000)} />
            ))}
            {p.reserve && (
              <path d={p.reserve} pathLength={1} stroke="var(--color-terracotta)" strokeWidth={1.5} strokeLinecap="round" style={draw(0, 1000)} />
            )}
          </svg>
        )}

        {/* The four steps: columns on desktop, rows on phones. */}
        <ol className="relative grid h-full grid-rows-4 md:grid-cols-4 md:grid-rows-1">
          {steps.map((s, i) => (
            <li
              key={s}
              style={words(i)}
              className={`flex flex-col justify-center px-4 transition-opacity duration-[600ms] ease-soft md:justify-end md:pr-6 md:pb-8 md:pl-10 ${
                on ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-h3 md:text-[2.5rem] md:leading-[1.05] md:font-light">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
