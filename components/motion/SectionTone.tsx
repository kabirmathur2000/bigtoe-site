"use client";

import { useEffect, type ReactNode } from "react";

export type Tone = "light" | "navy";

/**
 * A full-width block with a tone. Paints itself until the controller takes over.
 * `chapter` makes it a full-screen chapter (see `.chapter` in globals.css):
 * at least one screen tall below the header, content centred, and a point
 * the guided scrolling settles on.
 */
export function Section({
  tone = "light",
  chapter = false,
  photoBreak = false,
  children,
  className = "",
  id,
}: {
  tone?: Tone;
  chapter?: boolean;
  /** The full-bleed photo between the halves; the colour fade happens across it. */
  photoBreak?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} data-tone={tone} data-chapter={chapter || undefined} data-photo-break={photoBreak || undefined} className={chapter ? `chapter ${className}` : className}>
      {children}
    </section>
  );
}

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/** Share of the viewport height a colour change is spread across. */
const BAND = 0.6;

/**
 * Scroll-linked page colour, one change per page. The page background
 * mixes from off-white to navy as the first navy section's top travels up
 * through the middle 60% of the screen, and then stays navy to the end,
 * footer included; there is no fade back. Where a photo break is the first
 * navy section, the fade runs across it and is complete when the photo
 * fills the screen. Each section keeps its own text colour; only text
 * outside sections (the footer) follows the page, switching at halfway.
 * The change is a fade, not movement, so it runs the same under reduced
 * motion: never a hard switch.
 */
export function SectionToneController() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("tones-managed");

    let frame = 0;
    let lastAmount = -1;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const start = vh * (0.5 + BAND / 2);
      const end = vh * (0.5 - BAND / 2);

      // Colour zones: the first navy section starts the one fade; from
      // there the page stays navy to the end, footer included.
      let amount = 0;
      const first = document.querySelector<HTMLElement>('main [data-tone="navy"]');
      if (first) {
        const r = first.getBoundingClientRect();
        // A photo break carries the fade: it starts as the photo enters the
        // lower part of the screen and is complete when the photo fills it.
        const photo = first.hasAttribute("data-photo-break");
        const from = photo ? vh * 0.7 : start;
        const to = photo ? 0 : end;
        amount = clamp((from - r.top) / (from - to));
      }

      // Any navy at all counts as the navy zone (the header keeps out of it).
      root.dataset.zone = amount > 0 ? "navy" : "light";
      const pct = Math.round(amount * 1000) / 10;
      if (pct === lastAmount) return;
      lastAmount = pct;

      root.style.setProperty("--page-bg", `color-mix(in srgb, var(--navy) ${pct}%, var(--offwhite))`);
      root.style.setProperty("--page-fg", amount >= 0.5 ? "var(--offwhite)" : "var(--navy)");
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Pages change under the layout; recompute when the DOM changes.
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mo.disconnect();
      root.classList.remove("tones-managed");
      root.style.removeProperty("--page-bg");
      root.style.removeProperty("--page-fg");
      delete root.dataset.zone;
    };
  }, []);

  return null;
}
