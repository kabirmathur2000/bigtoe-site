"use client";

import { useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { patterns } from "@/content/method";

/**
 * Find Your Pattern (Method). Four tall photo cards; tapping one widens it (desktop) or
 * opens it (mobile) and shows what BigToe does for that person.
 */
export function Patterns() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section chapter tone="navy">
      <div className="mx-auto max-w-wide px-gutter">
        <Reveal className="md:ml-[8.333%]">
          <RevealItem as="h2" className="text-h1">{patterns.headline}</RevealItem>
        </Reveal>

        <ul className="mt-6 flex flex-col gap-0 md:mt-12 md:ml-[8.333%] md:h-[min(640px,62svh)] md:flex-row md:gap-4">
          {patterns.items.map((p) => {
            const isOpen = open === p.id;
            return (
              <li
                key={p.id}
                className={`group relative min-w-0 md:overflow-hidden transition-[flex-grow] duration-700 ease-soft md:flex md:flex-col ${
                  isOpen ? "md:grow-[2.6]" : "md:grow"
                } md:basis-0`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`pattern-${p.id}`}
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  className="flex w-full flex-col text-left md:h-full"
                >
                  <div
                    className={`relative w-full overflow-hidden transition-[height] duration-700 ease-soft md:h-auto md:flex-1 ${
                      isOpen ? "h-[min(420px,48svh)]" : "h-0 md:h-auto"
                    }`}
                  >
                    <div
                      role="img"
                      aria-label={p.shot}
                      className="absolute inset-0 flex items-end bg-current/15 p-4 transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.03]"
                    >
                      <span className="text-caption opacity-75">{p.shot}</span>
                    </div>
                  </div>
                  <span className={`flex items-baseline justify-between gap-4 border-t border-current/15 py-4 md:mt-4 md:min-h-24 ${isOpen ? "mt-3" : ""}`}>
                    <span className="text-h3">{p.title}</span>
                    <span aria-hidden className={`text-h3 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </span>
                </button>

                <div
                  id={`pattern-${p.id}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-700 ease-soft ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden md:w-[min(32rem,40vw)]">
                    <p className="pt-3 text-body-lg">{p.need}</p>
                    {"how" in p && <p className="max-w-text pt-2 pb-2 text-body opacity-70">{p.how}</p>}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

      </div>
    </Section>
  );
}
