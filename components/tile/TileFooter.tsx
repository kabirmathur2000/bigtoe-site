import Image from "next/image";
import Link from "next/link";
import { facts, mailtoHref, whatsappHref } from "@/content/facts";
import { footer } from "@/content/site";
import { tile } from "@/content/style-tile";
import logoTag from "@/public/brand/logo-tag-light.png";

const link = "inline-flex min-h-11 items-center t-small transition-opacity duration-500 hover:opacity-75";
const inline = "underline decoration-current/40 underline-offset-4 transition-opacity duration-500 hover:opacity-75";

/**
 * The tile's footer, as it will be, in a navy panel: the light LogoTag,
 * the address, the hours, WhatsApp and email, then Careers, Location on
 * Maps, Terms and Privacy. No tagline line, no parking line. Text one step
 * smaller than body (t-small).
 */
export function TileFooter() {
  const wa = whatsappHref();
  return (
    <footer className="px-3 pb-3 md:px-6 md:pb-6">
      <div className="rounded-[24px] bg-navy px-6 py-12 text-offwhite md:grid md:grid-cols-12 md:gap-10 md:px-16 md:py-16">
        <div className="md:col-span-4">
          <Image src={logoTag} alt={`${facts.brand}. ${facts.tagline}`} className="h-[72px] w-auto md:h-[88px]" sizes="(min-width: 768px) 260px, 210px" />
        </div>
        <div className="mt-10 space-y-3 md:col-span-7 md:col-start-6 md:mt-0">
          <p className="t-small">{facts.address.line}</p>
          <p className="t-small">{tile.footer.hours}</p>
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
          <nav aria-label={footer.navLabel} className="flex flex-wrap gap-x-8 border-t border-current/20 pt-4">
            <a href={footer.careers.href} className={link}>{footer.careers.label}</a>
            {facts.address.mapUrl ? (
              <a href={facts.address.mapUrl} target="_blank" rel="noopener noreferrer" className={link}>{footer.map.label}</a>
            ) : (
              <span className="inline-flex min-h-11 items-center gap-2 t-small">
                {footer.map.label} <span className="text-[0.875rem] text-terracotta">{footer.map.missing}</span>
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
