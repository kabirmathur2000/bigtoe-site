"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { facts } from "@/content/facts";

/** Renders its children everywhere except the Book page, which already shows them. */
export function NotOnBook({ children }: { children: ReactNode }) {
  return usePathname() === facts.bookHref ? null : <>{children}</>;
}
