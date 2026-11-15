"use client";

import { useId, useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { Placeholder } from "@/components/ui/Photo";
import { founders, foundersNote } from "@/content/team";

/** Founders, screen b: Rooted. Real. Rebellious., each word large with its Deck 1 definition, one at a time. */
export function FoundersValues() {
  return (
    <Section chapter>
      <div className="mx-auto max-w-wide px-gutter">
        <Reveal as="ul" className="mx-auto max-w-3xl space-y-8 text-center md:space-y-12" stagger={0.8}>
          {founders.values.map((v) => (
            <RevealItem as="li" key={v.name}>
              <p className="text-h1 md:text-display">{v.name}.</p>
              <p className="mx-auto mt-2 max-w-xl text-body-lg opacity-80 md:mt-3">{v.line}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

/** The full approved founders' note, shown in place when asked for. */
function FullNote() {
  const n = foundersNote;
  const p = "mt-6 text-body-lg leading-[1.8] opacity-85";
  return (
    <div className="mx-auto max-w-[34rem] pt-12 text-left">
      <h3 className="text-h2">{n.headline}</h3>
      {n.intro.map((t) => (
        <p key={t} className={p}>{t}</p>
      ))}
      <p className={p}>{n.pillarsIntro}</p>
      <div className="mt-6 border-t border-current/15">
        {n.pillars.map((v) => (
          <div key={v.name} className="border-b border-current/15 py-5">
            <span className="block text-h3">{v.name}</span>
            <span className="mt-1 block text-body leading-[1.75] opacity-80">{v.line}</span>
          </div>
        ))}
      </div>
      <p className={p}>{n.reserve}</p>
      <p className="mt-4 text-caption text-terracotta">{n.reserveTodo}</p>
      <p className="mt-8 text-h3 leading-[1.5]">{n.close}</p>
    </div>
  );
}

/**
 * Founders, screen c: the poem's last line above the four founders (name
 * and age). Below, a quiet link expands the full note in place, 10 Squared
 * style, and collapses it again.
 */
export function FoundersCircle() {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <Section chapter>
      <div className="mx-auto max-w-wide px-gutter text-center">
        <Reveal>
          <RevealItem as="h2" className="text-h2 md:text-h1">{founders.line}</RevealItem>
        </Reveal>

        <Reveal as="ul" className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-4 md:mt-12 md:grid-cols-4 md:gap-x-8" stagger={0.15}>
          {foundersNote.founders.map((f) => (
            <RevealItem as="li" key={f.name}>
              <Placeholder ratio="" shot={f.shot} className="aspect-[4/3] p-2 md:aspect-[4/5] md:p-4" />
              <p className="mt-2 text-body md:mt-3">{f.name}, {f.age}</p>
            </RevealItem>
          ))}
        </Reveal>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          className="mt-3 inline-flex min-h-11 items-center text-body underline decoration-current/40 underline-offset-4 opacity-80 transition-opacity duration-500 hover:opacity-100 md:mt-10"
        >
          {open ? founders.closeNote : founders.readNote}
        </button>

        <div
          id={id}
          aria-hidden={!open}
          inert={!open}
          className={`grid transition-[grid-template-rows,opacity] duration-700 ease-soft ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <FullNote />
          </div>
        </div>
      </div>
    </Section>
  );
}
