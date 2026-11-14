import Image from "next/image";
import Link from "next/link";
import { BookButton } from "@/components/ui/Button";
import { nav } from "@/content/site";
import logo from "@/public/brand/logo.png";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-navy/10 bg-offwhite text-navy">
      <div className="mx-auto flex h-16 max-w-wide items-center justify-between px-gutter md:h-20">
        <Link href="/" aria-label={nav.homeLabel} className="shrink-0">
          <Image src={logo} alt="" priority className="h-5 w-auto md:h-6" sizes="200px" />
        </Link>
        <nav className="flex items-center gap-6 md:gap-10">
          {nav.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-body transition-opacity duration-500 hover:opacity-60"
            >
              {l.label}
            </Link>
          ))}
          <div className="hidden md:block">
            <BookButton />
          </div>
        </nav>
      </div>
    </header>
  );
}

/** Mobile only: the button fixed to the bottom of the screen. */
export function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-offwhite px-gutter py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <BookButton className="w-full" />
    </div>
  );
}
