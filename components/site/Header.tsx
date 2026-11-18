"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
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
 * The header, after Function's, every page: always visible, never hides.
 * A frosted light bar across the top with a hairline at the bottom: the
 * logo (to Home) on the left; on the right the terracotta pill ("Book
 * your first visit" on desktop, "Book a visit" on phones) and a three-line
 * icon (labelled "Menu") opening a full-screen list of Home, Method,
 * Team, FAQ. No text links in the bar. The icon only ever opens the menu.
 * Close or Escape closes it; focus returns to the icon. 44px tap targets
 * throughout. Reduced motion: a fade, no movement.
 */
export function Header() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const m = nav;
  const path = usePathname();

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
          <div className="flex items-center gap-1 md:gap-3">
            <BookPill placement="header" size="small" className="min-h-11" />
            <button
              ref={button}
              type="button"
              aria-label={m.open}
              aria-haspopup="dialog"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="-mr-2.5 ml-1 flex h-11 w-11 items-center justify-center transition-opacity duration-300 hover:opacity-70"
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
        <div className="flex h-full flex-col pb-[max(2rem,env(safe-area-inset-bottom))] md:pb-12">
          {/* The same row as the header, so the logo stays in place as the menu opens. */}
          <div className="tile-wrap flex h-16 shrink-0 items-center justify-between">
            <Link href="/" aria-label={nav.homeLabel} onClick={() => setOpen(false)} className="flex min-h-11 items-center">
              <Image src={logo} alt="" className="h-6 w-auto md:h-7" sizes="(min-width: 768px) 140px, 120px" />
            </Link>
            <button type="button" autoFocus onClick={() => setOpen(false)} className="-mr-3 inline-flex min-h-11 items-center px-3 ty-body transition-opacity duration-500 hover:opacity-75">
              {m.close}
            </button>
          </div>
          <nav aria-label={m.label} className="tile-wrap flex flex-1 items-center">
            <ul className="space-y-2 md:space-y-4">
              {m.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={path === l.href ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-11 items-center ty-headline transition-opacity duration-500 hover:opacity-70 aria-[current=page]:text-terracotta"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="tile-wrap">
            <BookPill placement="menu" onOpen={() => setOpen(false)} />
          </div>
        </div>
      </dialog>
    </>
  );
}
