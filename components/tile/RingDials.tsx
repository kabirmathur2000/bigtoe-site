"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { tile } from "@/content/style-tile";

const DURATION = 1800;
const R = 44;
const C = 2 * Math.PI * R;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const values: number[] = tile.dials.items.map((d) => d.value);
const weakest = values.indexOf(Math.min(...values));
const strongest = values.indexOf(Math.max(...values));

/**
 * The example dials, restored from the Scoreboard (commit 89c3973): rings
 * that fill once on entry to 78, 42, 90 and 66 with the number inside.
 * Then the weakest (Balance and mobility) turns terracotta and the
 * strongest (Functional strength) the muted green; the others stay navy.
 * Always labelled "Example". Four in a row on desktop, 2 x 2 on phones.
 * Reduced motion: the final numbers at once.
 */
export function RingDials() {
  const d = tile.dials;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [counted, setT] = useState(0);
  const t = reduce ? 1 : counted;

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION);
          setT(easeOut(p));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduce]);

  const done = t >= 1;

  return (
    <div ref={ref} className="mt-10 border-t border-current/15 pt-5 md:mt-14 md:pt-6">
      <p className="t-label">{d.example}</p>
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-8 md:grid-cols-4 md:gap-10">
        {d.items.map((item, i) => {
          const now = Math.round(item.value * t);
          const tint = !done ? "" : i === weakest ? "text-terracotta" : i === strongest ? "text-dial-green" : "";
          return (
            <li key={item.name}>
              <div className={`relative w-full max-w-[9rem] transition-colors duration-700 ease-soft md:max-w-[11rem] ${tint}`}>
                <svg aria-hidden viewBox="0 0 100 100" className="w-full -rotate-90" fill="none">
                  <circle cx="50" cy="50" r={R} stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
                  <circle
                    cx="50" cy="50" r={R} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeDasharray={C} strokeDashoffset={C * (1 - (item.value * t) / 100)}
                  />
                </svg>
                <span aria-hidden className="absolute inset-0 flex items-center justify-center t-sub tabular-nums">{now}</span>
              </div>
              <p className="sr-only">{`${item.name}: ${item.value} ${d.outOf}`}</p>
              <p aria-hidden className="mt-3 t-body leading-snug">{item.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
