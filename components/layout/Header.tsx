import Image from "next/image";
import Link from "next/link";
import { HeaderCta } from "./HeaderCta";
import { nav } from "@/content/site";
import logo from "@/public/brand/logo.png";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-navy/10 bg-offwhite text-navy">
      <div className="mx-auto flex h-16 max-w-wide items-center justify-between px-gutter md:h-20">
        <Link href="/" aria-label={nav.homeLabel} className="flex min-h-11 shrink-0 items-center">
          <Image src={logo} alt="" priority className="h-9 w-auto md:h-11" sizes="(min-width: 768px) 170px, 140px" />
        </Link>
        <nav className="flex items-center gap-6 md:gap-10">
          {nav.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex min-h-11 items-center text-body transition-opacity duration-500 hover:opacity-75"
            >
              {l.label}
            </Link>
          ))}
          <HeaderCta />
        </nav>
      </div>
    </header>
  );
}

