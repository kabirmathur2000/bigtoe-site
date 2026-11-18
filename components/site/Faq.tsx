"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { Question } from "@/content/faq";
import { Icon } from "./Icons";

/** Questions, after Function's FAQ: an accordion, one open at a time (the first open unless `firstOpen` is false). Hairlines in the current text colour. */
export function Faq({ items, all, firstOpen = true }: { items: Question[]; all?: { label: string; href: string }; firstOpen?: boolean }) {
  const [open, setOpen] = useState<number | null>(firstOpen ? 0 : null);
  const base = useId();
  return (
    <div>
      <ul className="border-t border-current/20">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} className="border-b border-current/20">
              <h3>
                <button
                  type="button"
                  id={`${base}-q${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`${base}-a${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-11 w-full items-start justify-between gap-6 py-6 text-left ty-sub md:py-7"
                >
                  {item.q}
                  <Icon name="plus" className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-300 ease-soft motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`} />
                </button>
              </h3>
              <div
                id={`${base}-a${i}`}
                role="region"
                aria-labelledby={`${base}-q${i}`}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-soft motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-7 ty-body opacity-80">{item.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {all && (
        <Link href={all.href} className="mt-8 inline-flex min-h-11 items-center ty-body underline decoration-current/30 underline-offset-[6px] transition-opacity duration-300 hover:opacity-70">
          {all.label}
        </Link>
      )}
    </div>
  );
}
