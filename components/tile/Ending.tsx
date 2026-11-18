"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { facts, mailtoHref, whatsappHref } from "@/content/facts";
import { footer } from "@/content/site";
import { tile } from "@/content/style-tile";
import logoTag from "@/public/brand/logo-tag-light.png";
import coffeeBar from "@/public/photos/studio-coffee-bar.jpg";
import { Accent } from "./Panel";
import { BookPill } from "./VisitPanel";

const small = "inline-flex min-h-11 items-center t-small transition-opacity duration-500 hover:opacity-75";
const inline = "underline decoration-current/40 underline-offset-4 transition-opacity duration-500 hover:opacity-75";

/**
 * i. The ending, curtain reveal: the page content scrolls away to reveal a
 * full-screen ending fixed beneath it. The coffee bar photo, darkened,
 * fills the screen; over it, left-aligned, the invitation and the book
 * pill, then the footer in smaller text. Where the ending is taller than
 * the screen (phones), it sits in the normal flow instead and scrolls like
 * the rest of the page.
 */
export function Ending() {
  const e = tile.ending;
  const wa = whatsappHref();
  const ref = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setFits(el.scrollHeight <= window.innerHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={ref} className={`z-0 min-h-svh ${fits ? "sticky bottom-0" : "relative"}`}>
      <Image src={coffeeBar} alt={e.alt} fill sizes="100vw" quality={70} className="object-cover object-[50%_55%]" />
      {/* Darkened so the words always read. */}
      <div aria-hidden className="absolute inset-0 bg-navy/75" />

      <div className="relative mx-auto flex min-h-svh max-w-[1440px] flex-col justify-between gap-16 px-6 pt-28 pb-10 text-offwhite md:gap-10 md:px-16 md:pt-24 md:pb-8">
        <div className="max-w-2xl">
          <h2 className="t-headline">
            <Accent value={e.headline} />
          </h2>
          <p className="mt-5 t-sub md:mt-6">{e.line}</p>
          <div className="mt-8 space-y-2 border-t border-current/25 pt-6 md:mt-6 md:pt-5">
            <p className="t-body">{e.price}</p>
            <p className="t-body">{e.free}</p>
            <p className="t-body">{e.guarantee}</p>
          </div>
          <div className="mt-8 md:mt-6">
            <BookPill placement="tile-ending" />
          </div>
        </div>

        <footer className="grid gap-6 border-t border-current/25 pt-6 md:grid-cols-12 md:gap-10">
          <div className="space-y-1 md:col-span-7">
            <p className="t-small">{facts.address.line}</p>
            <p className="t-small">{e.hours}</p>
            <p className="t-small">
              {wa ? (
                <a href={wa} className={inline}>{footer.whatsappLabel}</a>
              ) : (
                <>
                  {footer.whatsappLabel} <span className="text-[0.875rem] text-terracotta">{footer.missingWhatsapp}</span>
                </>
              )}
              .{" "}
              <a href={mailtoHref} className={inline}>{facts.email}</a>.
            </p>
            <nav aria-label={footer.navLabel} className="flex flex-wrap gap-x-6 pt-2">
              <a href={footer.careers.href} className={small}>{footer.careers.label}</a>
              {facts.address.mapUrl ? (
                <a href={facts.address.mapUrl} target="_blank" rel="noopener noreferrer" className={small}>{footer.map.label}</a>
              ) : (
                <span className="inline-flex min-h-11 items-center gap-2 t-small">
                  {footer.map.label} <span className="text-[0.875rem] text-terracotta">{footer.map.missing}</span>
                </span>
              )}
              {footer.links.map((l) => (
                <Link key={l.href} href={l.href} className={small}>{l.label}</Link>
              ))}
            </nav>
          </div>
          <div className="md:col-span-5 md:justify-self-end">
            <Image src={logoTag} alt={`${facts.brand}. ${facts.tagline}`} className="h-[64px] w-auto md:h-[80px]" sizes="(min-width: 768px) 240px, 190px" />
          </div>
        </footer>
      </div>
    </div>
  );
}
