"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/motion/SectionTone";
import { loop } from "@/content/home";

type Size = { w: number; h: number; vertical: boolean };

/** How far each dividing curve bows, in px. */
const BOW = 14;

/**
 * The dividing curves and the rising terracotta line, drawn in real pixels
 * (the SVG's viewBox matches the panel), so hairlines stay one pixel at any
 * size. Desktop: three gently curved vertical hairlines and a line rising
 * left to right. Phones: the curves run across and the line rises from top
 * to bottom.
 */
function paths({ w, h, vertical }: Size) {
  if (vertical) {
    const curves = [1, 2, 3].map((i) => {
      const y = (h * i) / 4;
      return `M0 ${y} C${w * 0.33} ${y + BOW} ${w * 0.66} ${y - BOW} ${w} ${y}`;
    });
    // Rises (moves outward) as it goes down: the Strength Reserve widening.
    const reserve = `M${w * 0.7} 0 C${w * 0.71} ${h * 0.35} ${w * 0.86} ${h * 0.62} ${w * 0.95} ${h}`;
    return { curves, reserve };
  }
  const curves = [1, 2, 3].map((i) => {
    const x = (w * i) / 4;
    return `M${x} 0 C${x + BOW} ${h * 0.33} ${x - BOW} ${h * 0.66} ${x} ${h}`;
  });
  const reserve = `M0 ${h * 0.6} C${w * 0.35} ${h * 0.58} ${w * 0.62} ${h * 0.26} ${w} ${h * 0.08}`;
  return { curves, reserve };
}

/**
 * Chapter 4, THE LOOP, after Love.Life's panel, in BigToe's words and
 * colours. One panel (navy hairline, 8px corners) in four columns: Test,
 * Pledge, Train, Retest, each a large word over one short line. A thin
 * terracotta line rises across all four. Below: "You never finish a
 * program. You complete a loop." As it arrives the curves draw in slowly,
 * the terracotta line rises, then each column's words fade in, left to
 * right. Static under reduced motion. Phones: stacked, curves across.
 */
export function Loop() {
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
  // Slow and in order: curves (1.6s), then the line (1.8s), then the words.
  const draw = (delay: number, duration: number) => ({
    strokeDasharray: 1,
    strokeDashoffset: on ? 0 : 1,
    transition: reduce ? "none" : `stroke-dashoffset ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  });
  const words = (i: number) => ({ transitionDelay: on && !reduce ? `${2600 + i * 400}ms` : "0ms" });

  return (
    <Section chapter>
      <div className="mx-auto w-full max-w-wide px-gutter">
        <div className="md:mx-[8.333%]">
          <div
            ref={panel}
            role="group"
            aria-label={loop.label}
            className="relative h-[min(60svh,440px)] rounded-lg border border-navy md:h-[min(58svh,540px)]"
          >
            {p && size && (
              <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${size.w} ${size.h}`} fill="none">
                {p.curves.map((d, i) => (
                  <path key={i} d={d} pathLength={1} stroke="var(--color-navy)" strokeWidth={1} style={draw(i * 200, 1600)} />
                ))}
                <path d={p.reserve} pathLength={1} stroke="var(--color-terracotta)" strokeWidth={1.5} strokeLinecap="round" style={draw(1000, 1800)} />
              </svg>
            )}

            {/* The four steps: columns on desktop, rows on phones. */}
            <ol className="relative grid h-full grid-rows-4 md:grid-cols-4 md:grid-rows-1">
              {loop.steps.map((s, i) => (
                <li
                  key={s.word}
                  style={words(i)}
                  className={`flex flex-col justify-center px-4 transition-opacity duration-[900ms] ease-soft md:justify-end md:px-7 md:pb-8 ${
                    on ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="text-h3 md:text-[2.75rem] md:leading-[1.05] md:font-light">{s.word}</p>
                  <p className="mt-0.5 max-w-[62%] text-caption md:mt-3 md:min-h-[3.2em] md:max-w-none md:text-body">{s.line}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className={`mt-6 text-h3 transition-opacity duration-[900ms] ease-soft md:mt-10 ${on ? "opacity-100" : "opacity-0"}`} style={words(loop.steps.length)}>
            {loop.close}
          </p>
        </div>
      </div>
    </Section>
  );
}
