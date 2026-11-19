"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import logo from "@/public/brand/logo.png";
import { JumpLink } from "./Jump";
import { BookPill } from "./VisitPanel";

/** Three lines. */
function MenuIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

const logoClass = "h-6 w-auto md:h-7";

/**
 * The header, every page: always visible, never hides. A frosted light
 * bar with a hairline at the bottom: the plain BigToe logo on the left
 * (back to the top of Home); on the right the terracotta pill ("Book your
 * first visit" on desktop, "Book a visit" on phones) and the three-line
 * icon, which opens a full-screen list of jump links to the sections.
 * Close or Escape closes it; focus returns to the icon. 44px tap targets.
 * Reduced motion: a fade, no movement.
 */
export function Header() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const m = nav;

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
    // The page glides to the chosen section behind the menu as it fades.
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
        <div className="page-wrap flex h-(--header-h) items-center justify-between gap-3">
          <JumpLink id={null} label={nav.homeLabel} className="flex min-h-11 shrink-0 items-center">
            <Image src={logo} alt="" priority className={logoClass} sizes="(min-width: 1440px) 200px, (min-width: 768px) 140px, 120px" />
          </JumpLink>
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
          <div className="page-wrap flex h-(--header-h) shrink-0 items-center justify-between">
            <JumpLink id={null} label={nav.homeLabel} onJump={() => setOpen(false)} className="flex min-h-11 items-center">
              <Image src={logo} alt="" className={logoClass} sizes="(min-width: 1440px) 200px, (min-width: 768px) 140px, 120px" />
            </JumpLink>
            <button type="button" autoFocus onClick={() => setOpen(false)} className="-mr-3 inline-flex min-h-11 items-center px-3 ty-body transition-opacity duration-500 hover:opacity-75">
              {m.close}
            </button>
          </div>
          <nav aria-label={m.label} className="page-wrap flex flex-1 items-center overflow-y-auto">
            <ul className="space-y-1 md:space-y-3">
              {m.links.map((l) => (
                <li key={l.id}>
                  <JumpLink
                    id={l.id}
                    onJump={() => setOpen(false)}
                    className="inline-flex min-h-11 items-center ty-headline transition-opacity duration-500 hover:opacity-70"
                  >
                    {l.label}
                  </JumpLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="page-wrap">
            <BookPill placement="menu" onOpen={() => setOpen(false)} />
          </div>
        </div>
      </dialog>
    </>
  );
}
