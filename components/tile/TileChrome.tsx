"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { nav } from "@/content/site";
import { tile } from "@/content/style-tile";
import logo from "@/public/brand/logo.png";

/**
 * The navigation: the logo on the left (to Home), the word "Menu" on the
 * right, written out, opening a simple full-screen list: Home, How we
 * train, Team, Questions. A modal <dialog> in the brand light colour;
 * Close or Escape closes it; focus returns to "Menu". The page does not
 * scroll behind it. Reduced motion: a fade, no movement.
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
      root.style.overflow = "";
      button.current?.focus({ preventScroll: true });
    }, 500);
    return () => window.clearTimeout(t);
  }, [open]);

  const visible = open && shown;

  return (
    <>
      <HeaderShell>
        <div className="flex h-12 items-center justify-between gap-2 pr-2 pl-3 md:h-14 md:pr-3 md:pl-5">
          <Link href="/" aria-label={nav.homeLabel} className="flex min-h-11 shrink-0 items-center">
            <Image src={logo} alt="" priority className="h-7 w-auto md:h-9" sizes="(min-width: 768px) 136px, 106px" />
          </Link>
          <button
            ref={button}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="inline-flex min-h-11 items-center px-3 t-body font-bold transition-opacity duration-500 hover:opacity-75"
          >
            {m.open}
          </button>
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
        <div className="flex h-full flex-col px-6 pt-5 pb-10 md:px-12 md:pt-8">
          <div className="flex items-center justify-between">
            <Link href="/" aria-label={nav.homeLabel} onClick={() => setOpen(false)} className="flex min-h-11 items-center">
              <Image src={logo} alt="" className="h-7 w-auto md:h-9" sizes="(min-width: 768px) 136px, 106px" />
            </Link>
            <button type="button" autoFocus onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center px-3 t-body font-bold transition-opacity duration-500 hover:opacity-75">
              {m.close}
            </button>
          </div>
          <nav aria-label={m.label} className="flex flex-1 items-center">
            <ul className="space-y-2 md:space-y-4">
              {m.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center t-headline transition-opacity duration-500 hover:opacity-70">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}

/** Inner pages: a clear title at the top and "← Back to home". */
export function PageTitle({ title }: { title: string }) {
  return (
    <div className="px-3 pt-4 pb-2 md:px-6 md:pt-6 md:pb-4">
      <Link href={tile.back.href} className="inline-flex min-h-11 items-center t-body transition-opacity duration-500 hover:opacity-75">
        {tile.back.label}
      </Link>
      <h1 className="mt-2 t-headline">{title}</h1>
    </div>
  );
}
