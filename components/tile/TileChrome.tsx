"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeaderShell } from "@/components/layout/HeaderShell";
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
 * The floating header on every page: the logo on the left; on the right
 * the "Book your first visit" pill and a three-line menu icon (labelled
 * "Menu"). It hides on scroll down and returns on scroll up (HeaderShell).
 * The menu opens a full-screen off-white overlay: Home, How we train, Team,
 * Questions, with the book pill at the bottom. Close or Escape closes it;
 * focus returns to the icon. Reduced motion: a fade, no movement.
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
      <HeaderShell glass>
        <div className="flex h-12 items-center justify-between gap-2 pr-1 pl-3 md:h-14 md:pr-2 md:pl-5">
          <Link href="/" aria-label={nav.homeLabel} className="flex min-h-11 shrink-0 items-center">
            <Image src={logo} alt="" priority className="h-6 w-auto md:h-7" sizes="(min-width: 768px) 140px, 120px" />
          </Link>
          {/* The pill opens the request panel; the icon opens the menu. Kept apart so a tap never lands on the wrong one. */}
          <div className="flex items-center gap-2 md:gap-3">
            <BookPill placement="tile-header" size="small" />
            <button
              ref={button}
              type="button"
              aria-label={m.open}
              aria-haspopup="dialog"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center transition-opacity duration-500 hover:opacity-75"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </HeaderShell>

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
