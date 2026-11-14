"use client";

import { useEffect, type ReactNode } from "react";

export type Tone = "light" | "navy";

const COLORS: Record<Tone, { bg: string; fg: string }> = {
  light: { bg: "var(--offwhite)", fg: "var(--navy)" },
  navy: { bg: "var(--navy)", fg: "var(--offwhite)" },
};

/** A full-width block with a tone. Paints itself until the controller takes over. */
export function Section({
  tone = "light",
  children,
  className = "",
  id,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} data-tone={tone} className={className}>
      {children}
    </section>
  );
}

/**
 * Watches every [data-tone] element. Whichever one crosses the middle of the
 * screen sets the page colour, and the body's CSS transition cross-fades it.
 * Under reduced motion the change is instant (the global CSS rule).
 */
export function SectionToneController() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("tones-managed");

    const apply = (tone: Tone) => {
      root.style.setProperty("--page-bg", COLORS[tone].bg);
      root.style.setProperty("--page-fg", COLORS[tone].fg);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) apply((e.target as HTMLElement).dataset.tone as Tone);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    const observeAll = () => {
      io.disconnect();
      document.querySelectorAll<HTMLElement>("[data-tone]").forEach((el) => io.observe(el));
    };
    observeAll();

    // Pages change under the layout; re-scan when the DOM changes.
    let pending = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(observeAll);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(pending);
      io.disconnect();
      mo.disconnect();
      root.classList.remove("tones-managed");
      root.style.removeProperty("--page-bg");
      root.style.removeProperty("--page-fg");
    };
  }, []);

  return null;
}
