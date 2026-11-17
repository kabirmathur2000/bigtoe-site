import Image from "next/image";
import Link from "next/link";
import { facts, mailtoHref, whatsappHref } from "@/content/facts";
import { footer } from "@/content/site";
import { FooterPoem } from "./FooterPoem";
import logoTag from "@/public/brand/logo-tag-light.png";

const link = "underline decoration-current/40 underline-offset-4 transition-opacity duration-500 hover:opacity-75";

/**
 * Navy footer on every page, with the light LogoTag: where and when, how to
 * reach us, the parking note, the legal links, then the poem, small.
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

        <div className="max-w-text space-y-4 md:col-span-6 md:col-start-6">
          <p>
            {facts.brand}. {facts.address.line} {facts.hours}{" "}
            {facts.address.mapUrl ? (
              <a href={facts.address.mapUrl} target="_blank" rel="noopener noreferrer" className={link}>{footer.mapLabel}</a>
            ) : (
              <span className="text-caption text-terracotta">{footer.missingMap}</span>
            )}
          </p>
          <p>
            {wa ? (
              <a href={wa} className={link}>{footer.whatsappLabel}</a>
            ) : (
              <>
                {footer.whatsappLabel} <span className="text-caption text-terracotta">{footer.missingWhatsapp}</span>
              </>
            )}
            .{" "}
            <a href={mailtoHref} className={link}>{facts.email}</a>.
          </p>
          <p className="opacity-75">{facts.parking}</p>

          <nav aria-label={footer.navLabel} className="flex flex-wrap gap-x-8 pt-2">
            {footer.links.map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex min-h-11 items-center transition-opacity duration-500 hover:opacity-75">
                {l.label}
              </Link>
            ))}
          </nav>

          <FooterPoem className="border-t border-current/15 pt-8" />
        </div>
      </div>
    </footer>
  );
}
