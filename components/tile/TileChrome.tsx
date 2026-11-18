"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { tile } from "@/content/style-tile";
import logo from "@/public/brand/logo.png";
import { BookPill } from "./VisitPanel";

/** Three lines that become a cross when the menu is open. */
function MenuIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

/**
 * The header, after Function's: always visible, never hides. A frosted
 * light bar across the top with a hairline at the bottom.
 * Desktop: the logo, then Method, Team, FAQ as text links and the
 * "Book your first visit" pill on the right; no menu icon.
 * Phones: the logo, then the pill ("Book a visit" below 380px) and a
 * three-line icon (labelled "Menu") opening a full-screen list of
 * Method, Team, FAQ. The icon only ever opens the menu. Close or Escape
 * closes it; focus returns to the icon. 44px tap targets throughout.
 * Reduced motion: a fade, no movement.
 */
export function TileHeader() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const m = tile.menu;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const root = document.documentElement;
    if (open) {
      if (!d.open) d.showModal();
      root.style.overflow = "hidden";
      const f = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(f);
    }
    if (!d.open) return;
    const t = window.setTimeout(() => {
      setShown(false);
      d.close();
      // The request panel may have opened from the menu: keep the page still while it is open.
      if (!document.querySelector("dialog[open]")) root.style.overflow = "";
      button.current?.focus({ preventScroll: true });
    }, 500);
    return () => window.clearTimeout(t);
  }, [open]);

  const visible = open && shown;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-navy/10 bg-offwhite/80 text-navy backdrop-blur-xl">
        <div className="tile-wrap flex h-16 items-center justify-between gap-3">
          <Link href="/" aria-label={nav.homeLabel} className="flex min-h-11 shrink-0 items-center">
            <Image src={logo} alt="" priority className="h-6 w-auto md:h-7" sizes="(min-width: 768px) 140px, 120px" />
          </Link>
          <div className="flex items-center gap-1 md:gap-8">
            <nav aria-label={m.label} className="hidden md:block">
              <ul className="flex items-center gap-6">
                {m.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-11 items-center ty-body transition-opacity duration-300 hover:opacity-70">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <BookPill placement="tile-header" size="small" className="min-h-11" />
            <button
              ref={button}
              type="button"
              aria-label={m.open}
              aria-haspopup="dialog"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="ml-1 flex h-11 w-11 items-center justify-center transition-opacity duration-300 hover:opacity-70 md:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={ref}
        aria-label={m.label}
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        className={`fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-offwhite p-0 text-navy backdrop:bg-transparent transition-[opacity,translate] duration-500 ease-soft ${
          visible ? "translate-y-0 opacity-100" : `opacity-0 ${reduce ? "" : "-translate-y-3"}`
        }`}
      >
        <div className="flex h-full flex-col px-6 pt-5 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-12 md:pt-8 md:pb-12">
          <div className="flex items-center justify-between">
            <Link href="/" aria-label={nav.homeLabel} onClick={() => setOpen(false)} className="flex min-h-11 items-center">
              <Image src={logo} alt="" className="h-7 w-auto md:h-8" sizes="(min-width: 768px) 160px, 140px" />
            </Link>
            <button type="button" autoFocus onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center px-3 ty-body transition-opacity duration-500 hover:opacity-75">
              {m.close}
            </button>
          </div>
          <nav aria-label={m.label} className="flex flex-1 items-center">
            <ul className="space-y-2 md:space-y-4">
              {m.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center ty-headline transition-opacity duration-500 hover:opacity-70">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <BookPill placement="tile-menu" onOpen={() => setOpen(false)} />
          </div>
        </div>
      </dialog>
    </>
  );
}
