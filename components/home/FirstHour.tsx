"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { Placeholder } from "@/components/ui/Photo";
import { firstHour } from "@/content/home";

type Step = (typeof firstHour.steps)[number];

function StepText({ step, index }: { step: Step; index: number }) {
  return (
    <div>
      <p className="text-label uppercase opacity-60">
        {String(index + 1).padStart(2, "0")}
        {"meta" in step && <span className="ml-4">{step.meta}</span>}
      </p>
      <h3 className="mt-4 text-h2">{step.title}</h3>
      <p className="mt-5 max-w-text text-body-lg opacity-80">{step.body}</p>
      {"dials" in step && (
        <ul className="mt-5 max-w-text border-t border-current/20">
          {step.dials.map((d) => (
            <li key={d} className="border-b border-current/20 py-3 text-body">{d}</li>
          ))}
        </ul>
      )}
      {"close" in step && <p className="mt-5 max-w-text text-body opacity-80">{step.close}</p>}
    </div>
  );
}

/**
 * Home block 4, on navy. Desktop: the photograph stays pinned while the
 * steps change beside it; the active step's photo cross-fades in.
 * Mobile: each step carries its own photo.
 */
export function FirstHour() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Section tone="navy" className="py-section">
      <div className="mx-auto max-w-wide px-gutter">
        <Reveal>
          <RevealItem as="p" className="text-label uppercase opacity-70">{firstHour.label}</RevealItem>
          <RevealItem as="h2" className="mt-6 text-h1">{firstHour.headline}</RevealItem>
        </Reveal>

        <div className="mt-16 md:mt-8 md:grid md:grid-cols-12 md:gap-12">
          <div className="hidden md:col-span-6 md:block">
            <div className="sticky top-28 h-[calc(100svh-9rem)]">
              {firstHour.steps.map((s, i) => (
                <div
                  key={s.id}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-soft ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Placeholder ratio="" shot={s.shot} className="h-full" />
                </div>
              ))}
            </div>
          </div>

          <ol className="space-y-20 md:col-span-5 md:col-start-8 md:space-y-0">
            {firstHour.steps.map((s, i) => (
              <li
                key={s.id}
                data-index={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={`md:flex md:min-h-[85svh] md:items-center md:transition-opacity md:duration-700 ${
                  i === active ? "md:opacity-100" : "md:opacity-35"
                }`}
              >
                <div className="w-full">
                  <div className="mb-8 md:hidden">
                    <Placeholder ratio="4 / 5" shot={s.shot} />
                  </div>
                  <StepText step={s} index={i} />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-section border-t border-current/20 pt-section">
          <Reveal>
            <RevealItem as="h2" className="text-display">{firstHour.stay.headline}</RevealItem>
          </Reveal>
          <Reveal className="mt-12 grid gap-8 md:grid-cols-3 md:gap-12" stagger={0.15}>
            {firstHour.stay.items.map((it) => (
              <RevealItem key={it.title} className="border-t border-current/20 pt-5">
                <p className="text-h3">{it.title}</p>
                <p className="mt-2 text-body opacity-75">{it.body}</p>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal className="mx-auto mt-24 max-w-4xl md:mt-32">
            <RevealItem as="p" className="text-h2">
              <span aria-hidden>“</span>
              {firstHour.testimonial.quote}
              <span aria-hidden>”</span>
            </RevealItem>
            <RevealItem as="p" className="mt-6 text-caption text-terracotta">
              {firstHour.testimonial.name}, {firstHour.testimonial.age}
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
