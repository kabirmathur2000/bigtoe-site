import Link from "next/link";
import { tile } from "@/content/style-tile";
import coffeeBar from "@/public/photos/studio-coffee-bar.jpg";
import { Faq } from "./Faq";
import { Accent, Panel, PhotoFill } from "./Panel";
import { RingDials } from "./RingDials";
import { Rise, RiseItem } from "./Rise";
import { StoryCards } from "./StoryCards";
import { VisitButton } from "./VisitPanel";

/** Text inside a panel: generous, on the panel's own padding. */
const pad = "px-6 py-12 md:px-16 md:py-16";
/** Desktop: a panel fills the window (less the page inset); phones: it sizes to its content. */
const tall = "md:min-h-[calc(100svh-3rem)]";
const link =
  "inline-flex min-h-11 items-center t-body underline decoration-current/40 underline-offset-[6px] transition-opacity duration-500 hover:opacity-75";

/** The coffee bar, cropped to 4:5: the logo wall and the table on phones and desktop. */
const coffee = { src: coffeeBar, phonePos: "18% 55%", desktopPos: "20% 55%" };

/**
 * a. A-lead (Light panel, the first screen of a page). Desktop: the words
 * on one half, the photo on the other (4:5). Phones: headline, line and
 * button first, the photo below. Caption on the photo.
 */
export function Lead() {
  const l = tile.lead;
  return (
    <Panel variant="light" className="grid md:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
      <Rise className={`${pad} flex flex-col justify-center`} stagger={0.15}>
        <RiseItem as="h1" className="t-headline max-w-xl">
          <Accent value={l.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 t-sub md:mt-6">{l.line}</RiseItem>
        <RiseItem className="mt-8 md:mt-10">
          <div data-cta>
            <VisitButton placement="tile-lead" />
          </div>
        </RiseItem>
      </Rise>
      <div className="relative aspect-[4/5]">
        <PhotoFill shot={l.shot} alt={l.alt} preload sizes="(min-width: 768px) 45vw, 100vw" {...coffee} />
        <p className="absolute bottom-4 left-5 t-label text-offwhite md:bottom-6 md:left-6">{l.caption}</p>
      </div>
    </Panel>
  );
}

/** b. Text screen (Warm panel): a large headline, then its lines. */
export function Text() {
  const t = tile.text;
  return (
    <Panel variant="warm" className={`flex items-center ${tall}`}>
      <Rise className={`${pad} max-w-4xl`} stagger={0.2}>
        <RiseItem as="h2" className="t-headline">
          <Accent value={t.headline} />
        </RiseItem>
        {t.lines.map((l, i) => (
          <RiseItem key={l} as="p" className={i ? "mt-3 t-sub" : "mt-8 t-sub md:mt-10"}>
            {l}
          </RiseItem>
        ))}
      </Rise>
    </Panel>
  );
}

/**
 * c. Photo screen (Photo panel, full-bleed): the photograph fills the
 * panel (16:9 desktop, 4:5 phones); the words sit on a soft dark gradient
 * over its lower part, so they always read.
 */
export function Photo() {
  const p = tile.photo;
  return (
    <Panel variant="photo" className="aspect-[4/5] md:aspect-video">
      <PhotoFill shot={p.shot} sizes="100vw" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 photo-scrim" />
      <Rise className="absolute inset-x-0 bottom-0 px-6 pb-10 md:px-16 md:pb-16" stagger={0.15}>
        <RiseItem as="h2" className="t-headline max-w-3xl">
          <Accent value={p.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-3 max-w-xl t-sub md:mt-5">{p.line}</RiseItem>
      </Rise>
    </Panel>
  );
}

/** d. Photo screen, split (Light panel): the photo on one half (4:5), the words on the other. Phones: words, then photo. */
export function Coach() {
  const c = tile.coach;
  return (
    <Panel variant="light" className="grid md:grid-cols-[minmax(0,9fr)_minmax(0,11fr)]">
      <div className="relative order-2 aspect-[4/5] md:order-1">
        <PhotoFill shot={c.shot} sizes="(min-width: 768px) 45vw, 100vw" />
      </div>
      <Rise className={`${pad} order-1 flex flex-col justify-center md:order-2`} stagger={0.12}>
        <RiseItem as="h2" className="t-headline">
          <Accent value={c.headline} />
        </RiseItem>
        <RiseItem className="mt-6 max-w-lg space-y-2 md:mt-8">
          {c.lines.map((l) => (
            <p key={l} className="t-body">{l}</p>
          ))}
        </RiseItem>
        <RiseItem className="mt-6">
          <Link href={c.link.href} className={link}>{c.link.label}</Link>
        </RiseItem>
      </Rise>
    </Panel>
  );
}

/** e. Diagram (Warm panel): the example dials, filling once on entry. */
export function Dials() {
  const d = tile.dials;
  return (
    <Panel variant="warm" className={`flex items-center ${tall}`}>
      <div className={`${pad} w-full`}>
        <Rise stagger={0.15}>
          <RiseItem as="h2" className="t-headline">
            <Accent value={d.headline} />
          </RiseItem>
          <RiseItem as="p" className="mt-4 max-w-2xl t-sub md:mt-6">{d.line}</RiseItem>
        </Rise>
        <RingDials />
      </div>
    </Panel>
  );
}

/** f. Member stories (Navy panel): large portrait cards, Equinox style. */
export function Stories() {
  return (
    <Panel variant="navy" className="py-12 md:py-16">
      <StoryCards />
    </Panel>
  );
}

/** g. Invitation (Navy panel, split): the words on one half, the coffee bar on the other. Phones: words, then photo. */
export function Invitation() {
  const v = tile.invitation;
  return (
    <Panel variant="navy" className="grid md:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
      <Rise className={`${pad} flex flex-col justify-center`} stagger={0.12}>
        <RiseItem as="h2" className="t-headline">
          <Accent value={v.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 max-w-lg t-sub md:mt-6">{v.line}</RiseItem>
        <RiseItem className="mt-8 max-w-lg space-y-2 border-t border-current/20 pt-6">
          <p className="t-body">{v.price}</p>
          <p className="t-body">{v.free}</p>
          <p className="t-body">{v.guarantee}</p>
        </RiseItem>
        <RiseItem className="mt-8">
          <div data-cta>
            <VisitButton placement="tile-invitation" />
          </div>
        </RiseItem>
      </Rise>
      <div className="relative aspect-[4/5]">
        <PhotoFill shot={v.shot} alt={tile.lead.alt} sizes="(min-width: 768px) 45vw, 100vw" {...coffee} />
      </div>
    </Panel>
  );
}

/** h. Questions (Light panel): three, one open at a time, then "All questions". */
export function Questions() {
  return (
    <Panel variant="light" id="faq" className="scroll-mt-24">
      <div className={`${pad} mx-auto max-w-3xl`}>
        <p className="t-label">{tile.faq.label}</p>
        <div className="mt-6">
          <Faq items={tile.faq.items} label={tile.faq.label} />
        </div>
        <Link href={tile.faq.all.href} className={`mt-6 ${link}`}>{tile.faq.all.label}</Link>
      </div>
    </Panel>
  );
}
