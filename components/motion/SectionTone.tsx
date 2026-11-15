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
  split = false,
  children,
  className = "",
  id,
}: {
  tone?: Tone;
  chapter?: boolean;
  /** A split layout: on desktop its blocks are the resting points, not the section. */
  split?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} data-tone={tone} data-chapter={chapter || undefined} data-split={split || undefined} className={chapter ? `chapter ${className}` : className}>
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
 * footer included; there is no fade back. Text switches colour at the
 * halfway point and eases over 700ms. The change is a fade, not movement,
 * so it runs the same under reduced motion: never a hard switch.
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
        amount = clamp((start - r.top) / (start - end));
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
