"use client";

import Image from "next/image";
import Link from "next/link";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { useCtaHidden } from "@/components/layout/useCtaHidden";
import { nav } from "@/content/site";
import { tile } from "@/content/style-tile";
import logo from "@/public/brand/logo.png";
import { VisitButton } from "./VisitPanel";

/**
 * The navigation bar as it will be: the navy and terracotta logo (to Home),
 * Method, Team, FAQ and "Book your first visit" (desktop). Phones: the
 * logo and the three links; the button is fixed to the bottom (TileBar).
 */
export function TileHeader() {
  const hidden = useCtaHidden();
  return (
    <HeaderShell>
      <div className="flex h-12 items-center justify-between gap-2 pr-1 pl-3 md:h-14 md:pr-1.5 md:pl-5">
        <Link href="/" aria-label={nav.homeLabel} className="flex min-h-11 shrink-0 items-center">
          <Image src={logo} alt="" priority className="h-7 w-auto md:h-9" sizes="(min-width: 768px) 136px, 106px" />
        </Link>
        <nav aria-label={nav.label} className="flex items-center gap-0.5 md:gap-6">
          {tile.nav.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex min-h-11 min-w-11 items-center justify-center px-1.5 text-[1rem] whitespace-nowrap transition-opacity duration-500 hover:opacity-75 md:px-1 md:text-body"
            >
              {l.label}
            </Link>
          ))}
          <div
            aria-hidden={hidden}
            inert={hidden}
            className={`hidden transition-opacity duration-700 ease-soft md:block ${hidden ? "pointer-events-none opacity-0" : ""}`}
          >
            <VisitButton placement="tile-header" className="py-2.5!" />
          </div>
        </nav>
      </div>
    </HeaderShell>
  );
}

/** Phones: the button fixed to the bottom of the screen; it steps aside while an in-page button is on screen. */
export function TileBar() {
  const hidden = useCtaHidden("0px 0px -15% 0px");
  return (
    <div
      aria-hidden={hidden}
      inert={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-current/15 bg-(--page-bg) px-gutter py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-700 ease-soft md:hidden ${
        hidden ? "pointer-events-none translate-y-full opacity-0" : ""
      }`}
    >
      <VisitButton placement="tile-mobile-bar" className="w-full" />
    </div>
  );
}
