"use client";

import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/**
 * The floating navigation bar: inset from the screen edges, 8px corners,
 * off-white with a hairline border. It slides away while the visitor
 * scrolls down and slides back as soon as they scroll up, in the light and
 * navy zones alike. Always visible at the very top of the page and whenever
 * a keyboard user tabs into it. Reduced motion: it simply stays visible.
 */
export function HeaderShell({ children, glass = false }: { children: ReactNode; glass?: boolean }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [state, setState] = useState({ path: pathname, hidden: false });
  const hidden = !reduce && state.path === pathname && state.hidden;

  useEffect(() => {
    if (reduce) return;
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const dy = y - last;
      last = y;
      setState((s) => {
        let next = s.path === pathname ? s.hidden : false;
        if (y < 8) next = false;
        else if (dy > 2) next = true;
        else if (dy < -2) next = false;
        return next === s.hidden && s.path === pathname ? s : { path: pathname, hidden: next };
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [reduce, pathname]);

  return (
    <header
      onFocusCapture={() => setState({ path: pathname, hidden: false })}
      // glass (the new design): frosted, slightly translucent navy, so content blurs as it passes beneath.
      className={`fixed inset-x-3 top-2 z-40 mx-auto max-w-wide rounded-lg border transition-[translate,opacity] duration-500 ease-soft md:inset-x-6 md:top-3 ${
        glass ? "border-offwhite/15 bg-navy/70 text-offwhite backdrop-blur-md" : "border-navy/15 bg-offwhite text-navy"
      } ${
        hidden ? "pointer-events-none -translate-y-[calc(100%+1rem)] opacity-0" : ""
      }`}
    >
      {children}
    </header>
  );
}
