"use client";

import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/motion/SectionTone";
import { poem } from "@/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Chapter 3, OUR MISSION: the studio-wall poem.
 * Each line rises and fades in on its own as it scrolls into view, slowly;
 * the first line of a new stanza waits a little longer. The last line is
 * the only one at full strength. Reduced motion shows the whole poem.
 */
export function Poem() {
  const reduce = useReducedMotion();
  const last = poem.stanzas.length - 1;

  return (
    <Section chapter>
      <div className="mx-auto max-w-wide px-gutter">
        <div className="max-w-[20em] text-[1.625rem] leading-[1.2] md:ml-[8.333%] md:text-h2">
          {poem.stanzas.map((stanza, s) => (
            <div key={s} className={s > 0 ? "mt-[1.1em]" : undefined}>
              {stanza.map((line, i) => {
                const className = `-indent-[1em] pl-[1em] ${s === last ? "" : "opacity-65"}`;
                if (reduce) return <p key={line} className={className}>{line}</p>;
                return (
                  <motion.p
                    key={line}
                    className={className}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: s === last ? 1 : 0.65, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -18% 0px" }}
                    transition={{ duration: 1.4, ease: EASE, delay: i === 0 && s > 0 ? 0.7 : 0.15 }}
                  >
                    {line}
                  </motion.p>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
