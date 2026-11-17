import Image from "next/image";
import Link from "next/link";
import { facts, mailtoHref, whatsappHref } from "@/content/facts";
import { footer } from "@/content/site";
import logoTag from "@/public/brand/logo-tag-light.png";

const link = "inline-flex min-h-11 items-center transition-opacity duration-500 hover:opacity-75";
const inline = "underline decoration-current/40 underline-offset-4 transition-opacity duration-500 hover:opacity-75";

/**
 * Navy footer on every page, with the light LogoTag: the tagline, where
 * and when, the parking note, how to reach us, then Careers, the map and
 * the legal links.
 */
export function Footer() {
  const wa = whatsappHref();
  return (
    <footer data-tone="navy" className="border-t border-current/15 pb-28 md:pb-0">
      <div className="mx-auto grid max-w-wide gap-10 px-gutter py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4 md:col-start-2">
          <Image
            src={logoTag}
            alt={`${facts.brand}. ${facts.tagline}`}
            className="h-[72px] w-auto md:h-[88px]"
            sizes="(min-width: 768px) 260px, 210px"
          />
        </div>

        <div className="max-w-text space-y-3 md:col-span-6 md:col-start-6">
          <p className="text-h3">{footer.tagline}</p>
          <p>{facts.address.line}</p>
          <p>{facts.hours}</p>
          <p className="opacity-75">{facts.parking}</p>
          <p>
            {wa ? (
              <a href={wa} className={inline}>{footer.whatsappLabel}</a>
            ) : (
              <>
                {footer.whatsappLabel} <span className="text-caption text-terracotta">{footer.missingWhatsapp}</span>
              </>
            )}
            .{" "}
            <a href={mailtoHref} className={inline}>{facts.email}</a>.
          </p>

          <nav aria-label={footer.navLabel} className="flex flex-wrap gap-x-8 border-t border-current/15 pt-4">
            <a href={footer.careers.href} className={link}>{footer.careers.label}</a>
            {facts.address.mapUrl ? (
              <a href={facts.address.mapUrl} target="_blank" rel="noopener noreferrer" className={link}>{footer.map.label}</a>
            ) : (
              <span className="inline-flex min-h-11 items-center gap-2">
                {footer.map.label} <span className="text-caption text-terracotta">{footer.map.missing}</span>
              </span>
            )}
            {footer.links.map((l) => (
              <Link key={l.href} href={l.href} className={link}>{l.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
