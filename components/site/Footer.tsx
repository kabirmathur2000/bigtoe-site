import Image from "next/image";
import Link from "next/link";
import { facts, mailtoHref, whatsappHref } from "@/content/facts";
import { footer } from "@/content/site";
import logoTagLight from "@/public/brand/logo-tag-light.png";
import logoTag from "@/public/brand/logo-tag.png";

const footLink = "inline-flex min-h-11 items-center ty-small transition-opacity duration-300 hover:opacity-70";
const inline = "underline decoration-current/30 underline-offset-4 transition-opacity duration-300 hover:opacity-70";

/**
 * The footer, every page: the LogoTag, address, hours, WhatsApp, email,
 * then Careers, Maps, Terms, Privacy. Text and hairlines take the current
 * colour; `tone="navy"` (Home, inside the navy zone) shows the light LogoTag.
 */
export function Footer({ tone = "light" }: { tone?: "light" | "navy" }) {
  const wa = whatsappHref();
  return (
    <footer className="tile-wrap pb-10 md:pb-12">
      <div className="grid gap-8 border-t border-current/20 pt-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <Image src={tone === "navy" ? logoTagLight : logoTag} alt={footer.logoAlt} className="h-16 w-auto md:h-20" sizes="(min-width: 768px) 200px, 160px" />
        </div>
        <div className="space-y-1 md:col-span-5">
          <p className="ty-small">{facts.address.line}</p>
          <p className="ty-small">{facts.hours}</p>
          <p className="ty-small">
            {wa ? (
              <a href={wa} className={inline}>{footer.whatsappLabel}</a>
            ) : (
              <>
                {footer.whatsappLabel} <span className="text-terracotta">{footer.missingWhatsapp}</span>
              </>
            )}
            .{" "}
            <a href={mailtoHref} className={inline}>{facts.email}</a>.
          </p>
        </div>
        <nav aria-label={footer.navLabel} className="flex flex-col md:col-span-3">
          <a href={footer.careers.href} className={footLink}>{footer.careers.label}</a>
          {facts.address.mapUrl ? (
            <a href={facts.address.mapUrl} target="_blank" rel="noopener noreferrer" className={footLink}>{footer.map.label}</a>
          ) : (
            <span className="inline-flex min-h-11 items-center gap-2 ty-small">
              {footer.map.label} <span className="text-terracotta">{footer.map.missing}</span>
            </span>
          )}
          {footer.links.map((l) => (
            <Link key={l.href} href={l.href} className={footLink}>{l.label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
