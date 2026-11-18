import Link from "next/link";
import type { StaticImageData } from "next/image";
import { Section } from "@/components/motion/SectionTone";
import { tile, type Shot } from "@/content/style-tile";
import { ArtImage } from "./ArtImage";
import { Dial } from "./Dial";
import { Faq } from "./Faq";
import { Rise, RiseItem } from "./Rise";
import { VisitButton } from "./VisitPanel";

/**
 * A. Photo screen (light). Desktop: the photo on one half, the words on the
 * other (`flip` puts the photo on the right). Phones: the photo on top at
 * 4:5, the words below.
 */
export function PhotoScreen({
  headline,
  line,
  link,
  shot,
  photo,
  flip = false,
}: {
  headline: string;
  line: string;
  link?: { label: string; href: string };
  shot: Shot;
  photo?: { src: StaticImageData; alt: string; phonePos: string; desktopPos: string };
  flip?: boolean;
}) {
  // A tall (4:5) photo is capped so it fits the window on laptops.
  const cap = shot.desktop.ratio === "4:5" ? "md:max-w-[min(100%,calc((100svh-11rem)*0.8))]" : "";
  return (
    <Section chapter className="md:justify-center">
      {/* Desktop: the photo runs to the screen edge on its half; the words keep the page margin. */}
      <div className="grid w-full items-center gap-8 md:grid-cols-2 md:gap-16">
        <div className={`w-full ${cap} ${flip ? "md:order-2 md:justify-self-end" : "md:justify-self-start"}`}>
          <ArtImage
            shot={shot}
            src={photo?.src}
            alt={photo?.alt}
            phonePos={photo?.phonePos}
            desktopPos={photo?.desktopPos}
            label={!!photo}
          />
        </div>
        <Rise className={`px-gutter md:max-w-lg ${flip ? "md:order-1 md:justify-self-end md:pr-0 md:pl-gutter" : "md:pr-gutter md:pl-0"}`} stagger={0.15}>
          <RiseItem as="h2" className="text-h1 md:text-[3.5rem] md:leading-[1.05]">{headline}</RiseItem>
          <RiseItem as="p" className="mt-4 text-body-lg opacity-85 md:mt-6">{line}</RiseItem>
          {link && (
            <RiseItem className="mt-6">
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center text-body-lg underline decoration-current/40 underline-offset-[6px] transition-opacity duration-500 hover:opacity-75"
              >
                {link.label}
              </Link>
            </RiseItem>
          )}
        </Rise>
      </div>
    </Section>
  );
}

/** B. Text screen (light): a large headline, then its lines, with generous space. */
export function TextScreen() {
  const t = tile.text;
  return (
    <Section chapter>
      <div className="mx-auto w-full max-w-wide px-gutter">
        <Rise className="max-w-4xl md:ml-[8.333%]" stagger={0.2}>
          <RiseItem as="h2" className="text-h1 md:text-display">{t.headline}</RiseItem>
          {t.lines.map((l, i) => (
            <RiseItem key={l} as="p" className={`max-w-2xl text-h3 ${i ? "mt-3 opacity-85" : "mt-8 opacity-85 md:mt-12"}`}>
              {l}
            </RiseItem>
          ))}
        </Rise>
      </div>
    </Section>
  );
}

/** D. Diagram screen (light): four labelled dials, line drawings, no scores. Four in a row on desktop, 2 x 2 on phones. */
export function DialsScreen() {
  const d = tile.dials;
  return (
    <Section chapter>
      <div className="mx-auto w-full max-w-wide px-gutter">
        <div className="md:mx-[8.333%]">
          <Rise stagger={0.2}>
            <RiseItem as="h2" className="text-h1 md:text-display">{d.headline}</RiseItem>
            <RiseItem as="p" className="mt-4 max-w-2xl text-h3 opacity-85 md:mt-6">{d.line}</RiseItem>
          </Rise>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-16 md:grid-cols-4 md:gap-10">
            {d.names.map((n, i) => (
              <li key={n}>
                <Dial index={i} />
                <p className="mt-4 text-body md:text-body-lg">{n}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/** E. Invitation (navy, centred): the visit, the price, the free hour, the guarantee, the button. */
export function Invitation() {
  const v = tile.invitation;
  return (
    <Section chapter tone="navy">
      <div className="mx-auto w-full max-w-wide px-gutter text-center">
        <Rise className="mx-auto max-w-3xl" stagger={0.15}>
          <RiseItem as="h2" className="text-h1 md:text-display">{v.headline}</RiseItem>
          <RiseItem as="p" className="mx-auto mt-5 max-w-2xl text-h3 opacity-85 md:mt-8">{v.line}</RiseItem>
          <RiseItem className="mx-auto mt-8 max-w-xl space-y-2 border-t border-current/15 pt-6 md:mt-12 md:pt-8">
            <p className="text-body-lg">{v.price}</p>
            <p className="text-body-lg">{v.free}</p>
            <p className="text-body opacity-75">{v.guarantee}</p>
          </RiseItem>
          <RiseItem className="mt-8 md:mt-10">
            <div data-cta>
              <VisitButton placement="tile-invitation" />
            </div>
          </RiseItem>
        </Rise>
      </div>
    </Section>
  );
}

/** Three questions under the invitation, one open at a time, then "All questions". */
export function Questions() {
  return (
    <Section tone="navy" id="faq" className="scroll-mt-24 pt-(--phone-gap) pb-(--phone-gap) md:pt-0 md:pb-28">
      <div className="mx-auto max-w-wide px-gutter">
        <div className="mx-auto max-w-3xl">
          <Faq label={tile.faq.label} items={tile.faq.items} />
          <Link
            href={tile.faq.all.href}
            className="mt-6 inline-flex min-h-11 items-center text-body-lg underline decoration-current/40 underline-offset-[6px] transition-opacity duration-500 hover:opacity-75"
          >
            {tile.faq.all.label}
          </Link>
        </div>
      </div>
    </Section>
  );
}

/** The sign-off above the footer: the poem's first and last lines. */
export function SignOff() {
  return (
    <Section tone="navy" className="border-t border-current/15 py-20 md:py-32">
      <Rise className="mx-auto max-w-wide px-gutter text-center" stagger={0.4}>
        {tile.signOff.map((l, i) => (
          <RiseItem key={l} as="p" className={i ? "mt-3 text-h3 md:text-h2" : "text-h3 opacity-75 md:text-h2"}>
            {l}
          </RiseItem>
        ))}
      </Rise>
    </Section>
  );
}
