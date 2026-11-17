"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";

/** Home, The Method and Team; the current page is underlined. 44px tap targets. */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {nav.links.map((l) => {
        const current = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={current ? "page" : undefined}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center px-1.5 text-[1rem] whitespace-nowrap transition-opacity duration-500 hover:opacity-75 md:px-1 md:text-body ${
              current ? "underline decoration-current/40 underline-offset-[6px]" : ""
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </>
  );
}
