"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Glide to a section (or the top) and stop below the header (the page's
 * scroll-padding-top). Reduced motion: a jump. The address bar shows the
 * section's anchor, so the link can be shared.
 */
export function scrollToId(id: string | null) {
  const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  const el = id ? document.getElementById(id) : null;
  if (el) el.scrollIntoView({ behavior, block: "start" });
  else window.scrollTo({ top: 0, behavior });
  history.replaceState(null, "", id ? `#${id}` : window.location.pathname);
}

/**
 * A jump link to a section of the one page. On Home it glides there; on
 * the legal pages it goes to Home at that section. `id` null: the top.
 */
export function JumpLink({
  id,
  className,
  children,
  label,
  onJump,
}: {
  id: string | null;
  className?: string;
  children: ReactNode;
  label?: string;
  onJump?: () => void;
}) {
  const home = usePathname() === "/";
  const href = id ? `/#${id}` : "/";
  return (
    <Link
      href={home ? (id ? `#${id}` : "#") : href}
      aria-label={label}
      className={className}
      onClick={(e) => {
        onJump?.();
        if (!home || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        scrollToId(id);
      }}
    >
      {children}
    </Link>
  );
}
