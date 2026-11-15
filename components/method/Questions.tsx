"use client";

import { useId, useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { BookButton } from "@/components/ui/BookButton";
import { questions } from "@/content/method";

/** Chapter 5, QUESTIONS: six collapsed questions, then the page’s one button. */
export function Questions() {
  const id = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section chapter tone="navy" className="pt-12 md:pt-16">
      <div className="mx-auto max-w-wide px-gutter">
        <div className="md:ml-[8.333%] md:max-w-3xl">
          <Reveal as="ul" className="border-t border-current/15" stagger={0.1}>
            {questions.items.map((item, i) => {
              const isOpen = open === i;
              const panel = `${id}-q${i}`;
              return (
                <RevealItem as="li" key={item.q} className="border-b border-current/15">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panel}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-baseline justify-between gap-6 py-5 text-left text-h3"
                    >
                      <span>{item.q}</span>
                      <span aria-hidden className={`shrink-0 transition-transform duration-500 ease-soft ${isOpen ? "rotate-45" : ""}`}>+</span>
                    </button>
                  </h3>
                  <div
                    id={panel}
                    role="region"
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-700 ease-soft ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="max-w-text pb-8">
                        {item.a.map((line) => (
                          <p key={line} className="mt-2 first:mt-0 text-body-lg opacity-85">{line}</p>
                        ))}
                        {"source" in item && (
                          <p className="mt-4 text-caption opacity-70">
                            {questions.sourceLabel}:{" "}
                            <a
                              href={item.source.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={isOpen ? 0 : -1}
                              className="underline underline-offset-4"
                            >
                              {item.source.text}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </Reveal>

          <div data-cta className="mt-10">
            <BookButton placement="method-end" />
          </div>
        </div>
      </div>
    </Section>
  );
}
