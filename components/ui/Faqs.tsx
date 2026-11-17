"use client";

import { useId, useState } from "react";
import { Section } from "@/components/motion/SectionTone";

/**
 * Collapsed questions under a screen (navy on Home). Not a full screen: it
 * runs as long as it needs. One open at a time.
 */
export function Faqs({ label, items }: { label: string; items: readonly { q: string; a: string }[] }) {
  const id = useId();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section tone="navy" className="pt-(--phone-gap) pb-(--phone-gap) md:pt-0 md:pb-36">
      <div className="mx-auto max-w-wide px-gutter">
        <div className="md:ml-[8.333%] md:max-w-3xl">
          <h2 className="sr-only">{label}</h2>
          <ul className="border-t border-current/15">
            {items.map((item, i) => {
              const isOpen = open === i;
              const panel = `${id}-q${i}`;
              return (
                <li key={item.q} className="border-b border-current/15">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panel}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-11 w-full items-baseline justify-between gap-6 py-5 text-left text-h3"
                    >
                      <span>{item.q}</span>
                      <span aria-hidden className={`shrink-0 transition-transform duration-500 ease-soft ${isOpen ? "rotate-45" : ""}`}>+</span>
                    </button>
                  </h3>
                  <div
                    id={panel}
                    role="region"
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-700 ease-soft ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-text pb-8 text-body-lg opacity-85">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
