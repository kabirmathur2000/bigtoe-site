import Image from "next/image";
import Link from "next/link";
import { HeaderCta } from "./HeaderCta";
import { HeaderShell } from "./HeaderShell";
import { NavLinks } from "./NavLinks";
import { nav } from "@/content/site";
import logo from "@/public/brand/logo.png";

/**
 * The floating navigation on every page: the navy logo, then Home, Method,
 * Team and (on desktop) the main button. On phones the button stays in the
 * bottom bar. See HeaderShell for when it shows.
 */
export function Header() {
  return (
    <HeaderShell>
      <div className="flex h-12 items-center justify-between gap-3 pr-1 pl-3 md:h-14 md:pr-1.5 md:pl-5">
        <Link href="/" aria-label={nav.homeLabel} className="flex min-h-11 shrink-0 items-center">
          <Image src={logo} alt="" priority className="h-7 w-auto md:h-9" sizes="(min-width: 768px) 136px, 106px" />
        </Link>
        <nav aria-label={nav.label} className="flex items-center gap-1 md:gap-6">
          <NavLinks />
          <HeaderCta />
        </nav>
      </div>
    </HeaderShell>
  );
}
