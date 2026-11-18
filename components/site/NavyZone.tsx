"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * The navy switch (Home): from "Your coach. Your plan." to the footer the
 * page is navy with #F0EEEB text. The page colour fades from off-white to
 * navy over about half a screen as this zone's top travels up from three
 * quarters of the screen to a quarter, then stays navy; one change only.
 * A fade, not movement, so it runs the same under reduced motion.
 */
export function NavyZone({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let last = -1;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const vh = window.innerHeight;
      const amount = Math.round(clamp((vh * 0.75 - el.getBoundingClientRect().top) / (vh * 0.5)) * 1000) / 10;
      if (amount === last) return;
      last = amount;
      root.style.setProperty("--site-bg", `color-mix(in srgb, var(--navy) ${amount}%, var(--offwhite))`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root.style.removeProperty("--site-bg");
    };
  }, []);
  return (
    <div ref={ref} data-zone="navy" className="text-offwhite">
      {children}
    </div>
  );
}
