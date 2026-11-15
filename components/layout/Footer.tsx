import Image from "next/image";
import { facts, mailtoHref, todo, whatsappHref } from "@/content/facts";
import Link from "next/link";
import { footer, nav } from "@/content/site";
import { FooterPoem } from "./FooterPoem";
import { NotOnBook } from "./NotOnBook";
import logoTag from "@/public/brand/logo-tag-light.png";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label uppercase opacity-75">{children}</p>;
}

function Todo({ children }: { children: string }) {
  return <span className="text-terracotta">{children}</span>;
}

/** Navy footer (the end of every page's navy zone) with the light LogoTag (logo plus "Practice Possibility"). */
export function Footer() {
  const wa = whatsappHref();
  return (
    <footer data-tone="navy" className="border-t border-current/15 pb-28 md:pb-0">
      <div className="mx-auto grid max-w-wide gap-12 px-gutter py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5 md:col-start-2">
          <Image
            src={logoTag}
            alt={`${facts.brand}. ${facts.tagline}`}
            className="h-[72px] w-auto md:h-[88px]"
            sizes="(min-width: 768px) 260px, 210px"
          />
          {/* The Book page shows the address and hours already. */}
          <NotOnBook>
          <address className="mt-10 not-italic">
            {facts.address.lines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </address>
          <p className="mt-3 max-w-text text-caption opacity-70">{facts.parking}</p>
          {!facts.address.mapUrl && (
            <p className="mt-2 text-caption"><Todo>{todo(footer.missingMap)}</Todo></p>
          )}
          </NotOnBook>
        </div>

        <NotOnBook>
          <div className="md:col-span-3 md:col-start-7">
            <Label>{footer.hoursLabel}</Label>
            <p>{facts.hours}</p>
          </div>
        </NotOnBook>

        <div className="md:col-span-3">
          <Label>{footer.contactLabel}</Label>
          <ul>
            <li>
              <span className="sr-only">{footer.whatsappLabel}: </span>
              {wa ? (
                <a href={wa} className="inline-flex min-h-11 items-center transition-opacity duration-500 hover:opacity-75">{footer.whatsappLabel}</a>
              ) : (
                <Todo>{todo(footer.missingWhatsapp)}</Todo>
              )}
            </li>
            <li>
              <span className="sr-only">{footer.emailLabel}: </span>
              <a href={mailtoHref} className="inline-flex min-h-11 items-center transition-opacity duration-500 hover:opacity-75">{facts.email}</a>
            </li>
          </ul>
        </div>

        <FooterPoem className="md:col-span-10 md:col-start-2" />

        {/* Method and Team, reachable from the navy zone, where the header stays away. */}
        <nav aria-label={footer.navLabel} className="flex gap-8 border-t border-current/15 pt-6 md:col-span-10 md:col-start-2">
          {nav.links.map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex min-h-11 items-center text-body transition-opacity duration-500 hover:opacity-75">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
