"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/motion/SectionTone";
import { Button } from "@/components/ui/Button";
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

/** Pause before the first paragraph, then between paragraphs (ms). */
const FIRST = 500;
const STEP = 700;
/** How long the overlay takes to rise in and to fade away (ms). */
const FADE = 900;

/**
 * The founders' note in a full-screen overlay in the brand light colour.
 * It rises and fades in slowly, then the paragraphs appear one at a time,
 * then the four founders' names. Closes with the Close button, Escape or a
 * tap outside the text, and fades away slowly. A modal <dialog> keeps focus
 * inside and the page behind inert; the page does not scroll while it is
 * open, and focus returns to the button on close. Reduced motion: a slow
 * fade with no movement.
 */
function NoteOverlay({ open, onClose, returnTo }: { open: boolean; onClose: () => void; returnTo: RefObject<HTMLButtonElement | null> }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const root = document.documentElement;
    if (open) {
      if (!d.open) d.showModal();
      d.scrollTop = 0;
      root.dataset.overlay = "";
      root.style.overflow = "hidden";
      const f = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(f);
    }
    if (!d.open) return;
    const t = window.setTimeout(() => {
      setShown(false);
      d.close();
      // Focus goes back to the button that opened it (the page is no longer inert).
      returnTo.current?.focus({ preventScroll: true });
      delete root.dataset.overlay;
      root.style.overflow = "";
    }, FADE);
    return () => window.clearTimeout(t);
  }, [open, returnTo]);

  // Never leave the page locked if the visitor navigates away while it is open.
  useEffect(
    () => () => {
      delete document.documentElement.dataset.overlay;
      document.documentElement.style.overflow = "";
    },
    [],
  );

  // Closing fades at once; the dialog itself closes when the fade ends.
  const visible = open && shown;
  const n = foundersNote;
  const at = (i: number) => ({ transitionDelay: visible ? `${FIRST + i * STEP}ms` : "0ms" });

  return (
    <dialog
      ref={ref}
      aria-label={founders.noteLabel}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      // A tap anywhere outside the text column closes it.
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("[data-note]")) onClose();
      }}
      className={`fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-offwhite p-0 text-navy backdrop:bg-transparent transition-[opacity,translate] duration-[900ms] ease-soft ${
        visible ? "translate-y-0 opacity-100" : `opacity-0 ${reduce ? "" : "translate-y-8"}`
      }`}
    >
      <div className="sticky top-0 flex justify-end px-gutter pt-3 md:pt-6">
        <button
          type="button"
          autoFocus
          onClick={onClose}
          className="inline-flex min-h-11 items-center bg-offwhite px-2 text-label uppercase opacity-80 transition-opacity duration-500 hover:opacity-100"
        >
          {founders.close}
        </button>
      </div>

      <div className="flex min-h-[calc(100dvh-4rem)] items-center px-gutter pb-20 md:min-h-[calc(100dvh-5.5rem)] md:pb-28">
        <div data-note className="mx-auto max-w-[38rem] text-center">
          {n.paragraphs.map((t, i) => (
            <p
              key={i}
              style={at(i)}
              className={`text-h3 leading-[1.6] transition-opacity duration-[900ms] ease-soft md:text-[1.875rem] md:leading-[1.55] ${
                i ? "mt-8 md:mt-10" : ""
              } ${visible ? "opacity-100" : "opacity-0"}`}
            >
              {t}
            </p>
          ))}
          <ul
            style={at(n.paragraphs.length)}
            className={`mt-12 flex flex-wrap justify-center gap-x-6 gap-y-1 text-body opacity-0 transition-opacity duration-[900ms] ease-soft md:mt-16 ${
              visible ? "opacity-80!" : ""
            }`}
          >
            {n.founders.map((f) => (
              <li key={f.name}>{f.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </dialog>
  );
}

/**
 * Founders, second screen: the poem's last line above the four founders
 * (name and age), then a button that opens the founders' note.
 */
export function FoundersCircle() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
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

        <Button ref={button} variant="outline" type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className="mt-4 md:mt-10">
          {founders.readNote}
        </Button>
      </div>
      <NoteOverlay open={open} onClose={() => setOpen(false)} returnTo={button} />
    </Section>
  );
}
