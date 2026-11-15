"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/motion/SectionTone";
import { paths } from "@/content/method";

/**
 * Each part keeps the same look in both bars, and every segment carries its
 * name and minutes, so colour is never the only cue. Brand colours only:
 * terracotta, navy, and a navy hairline outline.
 */
const LOOK: Record<string, string> = {
  Mobility: "bg-terracotta",
  Strength: "bg-navy",
  Cardio: "border border-navy",
};

const TOTAL = 60;

/**
 * Chapter 3, two paths: the Deck 4 line, then one bar per path, each a
 * 60-minute hour split into mobility, strength and cardio (Deck 4 slide
 * 10), then the foam-roll line. The bars grow in once, slowly, when the
 * chapter arrives; static under reduced motion.
 */
export function Paths() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [grown, setGrown] = useState(false);
  const on = reduce || grown;

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setGrown(true);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <Section chapter>
      <div className="mx-auto max-w-wide px-gutter">
        <div className="md:ml-[8.333%] md:max-w-5xl">
          <h2 className="max-w-3xl text-h2 md:text-h1">{paths.headline}</h2>

          <div ref={ref} className="mt-8 space-y-8 md:mt-14 md:space-y-12">
            {paths.bars.map((bar, b) => (
              <figure key={bar.name}>
                <figcaption className="flex items-baseline justify-between gap-4 text-label uppercase">
                  <span>{bar.name}</span>
                  <span className="opacity-75">{paths.hour}</span>
                </figcaption>

                {/* The bar: one segment per part, sized by its minutes. */}
                <div aria-hidden className="mt-3 flex h-8 gap-0.5 md:h-11">
                  {bar.parts.map((p, i) => (
                    <div
                      key={p.name}
                      style={{
                        flexBasis: `${(p.minutes / TOTAL) * 100}%`,
                        transitionDelay: on && !reduce ? `${b * 400 + i * 250}ms` : "0ms",
                      }}
                      className={`origin-left transition-transform duration-[1400ms] ease-soft ${LOOK[p.name]} ${on ? "scale-x-100" : "scale-x-0"}`}
                    />
                  ))}
                </div>

                {/* Labels under each segment; the last one ends at the bar's end. */}
                <ul className="mt-2 flex text-caption">
                  {bar.parts.map((p, i) => (
                    <li
                      key={p.name}
                      style={{ flexBasis: `${(p.minutes / TOTAL) * 100}%` }}
                      className={`flex min-w-0 flex-col whitespace-nowrap ${i === bar.parts.length - 1 ? "items-end text-right" : "items-start"}`}
                    >
                      <span>{p.name}</span>
                      <span className="opacity-75">{paths.minutes(p.minutes)}</span>
                    </li>
                  ))}
                </ul>
              </figure>
            ))}
          </div>

          <p className="mt-8 border-t border-current/15 pt-5 text-body-lg md:mt-12 md:pt-6">{paths.early}</p>
        </div>
      </div>
    </Section>
  );
}
