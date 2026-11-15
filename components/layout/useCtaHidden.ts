"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * True while an in-page button ([data-cta]) or the booking form's section
 * ([data-booking-form]) is on screen, so the header and mobile-bar buttons
 * step aside and only one button shows at a time.
 */
export function useCtaHidden(rootMargin = "0px") {
  const pathname = usePathname();
  // Keyed by path so a stale "hidden" never carries over to another page.
  const [state, setState] = useState({ path: pathname, hidden: false });

  useEffect(() => {
    const targets = [
      ...Array.from(document.querySelectorAll<HTMLElement>("[data-cta]")),
      ...Array.from(document.querySelectorAll<HTMLElement>("[data-booking-form]"))
        .map((m) => m.closest("section"))
        .filter((s): s is HTMLElement => !!s),
    ];
    if (!targets.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // A display:none button (e.g. desktop-only) never counts.
          if (e.isIntersecting && (e.target as HTMLElement).offsetParent !== null) visible.add(e.target);
          else visible.delete(e.target);
        }
        setState({ path: pathname, hidden: visible.size > 0 });
      },
      { rootMargin },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname, rootMargin]);

  return state.path === pathname && state.hidden;
}
