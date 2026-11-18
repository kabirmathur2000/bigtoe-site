import Link from "next/link";
import { tile } from "@/content/style-tile";
import coffeeBar from "@/public/photos/studio-coffee-bar.jpg";
import { Accent, Panel, PhotoFill } from "./Panel";
import { RingDials } from "./RingDials";
import { Rise, RiseItem } from "./Rise";
import { StoryCards } from "./StoryCards";

/**
 * The type hierarchy, matched everywhere to the invitation ("Come and
 * meet us"): t-headline, t-sub, t-body, t-label. Headlines are never
 * placed on photographs. No buttons in sections: the floating button
 * carries the one action.
 */
const pad = "px-6 py-12 md:px-16 md:py-16";
/** Desktop: a panel fills the window (less the page inset); phones: it sizes to its content. */
const tall = "md:min-h-[calc(100svh-3rem)]";
const link =
  "inline-flex min-h-11 items-center t-body underline decoration-current/40 underline-offset-[6px] transition-opacity duration-500 hover:opacity-75";

/** The coffee bar, cropped to 4:5: the logo wall and the table on phones and desktop. */
const coffee = { src: coffeeBar, phonePos: "18% 55%", desktopPos: "20% 55%" };

/**
 * A-lead (Light, the first screen of a page). Desktop: the words on one
 * half, the photo (4:5) on the other. Phones: the words first, the photo
 * below. Caption on the photo.
 */
export function Lead() {
  const l = tile.lead;
  return (
    <Panel variant="light" className="grid md:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
      <Rise className={`${pad} flex flex-col justify-center`} stagger={0.15}>
        <RiseItem as="h2" className="t-headline max-w-xl">
          <Accent value={l.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 t-sub md:mt-6">{l.line}</RiseItem>
      </Rise>
      <div className="relative aspect-[4/5]">
        <PhotoFill shot={l.shot} alt={l.alt} preload sizes="(min-width: 768px) 45vw, 100vw" {...coffee} />
        <p className="absolute bottom-4 left-5 t-label text-offwhite md:bottom-6 md:left-6">{l.caption}</p>
      </div>
    </Panel>
  );
}

/**
 * b. Inline photo chips (Navy): the headline, then the line with a small
 * rounded photo chip after each phrase, sitting inside the text line. Each
 * phrase and its chip stay together on one line.
 */
export function Chips() {
  const c = tile.chips;
  return (
    <Panel variant="navy" className={`flex items-center ${tall}`}>
      <Rise className={`${pad} max-w-4xl`} stagger={0.2}>
        <RiseItem as="h2" className="t-headline">
          <Accent value={c.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-8 t-sub md:mt-10">
          {/* Each phrase and its chip stay together; lines break only between phrases. */}
          {c.phrases.map((p) => {
            return (
              <span key={p.text}>
                <span className="whitespace-nowrap">
                  {p.text}
                  <span
                    role="img"
                    aria-label={`${p.shot} (photo chip, ${c.chip.ratio}, ${c.chip.size})`}
                    title={`${p.shot} · ${c.chip.ratio}, ${c.chip.size}`}
                    className="mx-[0.3em] inline-block h-[0.95em] w-[1.9em] translate-y-[0.12em] rounded-full bg-current/25"
                  />
                </span>{" "}
              </span>
            );
          })}
        </RiseItem>
        <RiseItem as="p" className="mt-4 t-sub">{c.close}</RiseItem>
      </Rise>
    </Panel>
  );
}

/**
 * c. Offset pair (Warm): the headline and line, then two photos below at
 * different sizes, slightly overlapping. Desktop: the large photo (3:2)
 * on the left, the small one (4:5) overlapping its lower right. Phones:
 * the large photo (4:3) full width, the small one overlapping its corner.
 */
export function Offset() {
  const o = tile.offset;
  return (
    <Panel variant="warm">
      <Rise className={`${pad} max-w-4xl pb-0 md:pb-0`} stagger={0.15}>
        <RiseItem as="h2" className="t-headline">
          <Accent value={o.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 max-w-xl t-sub md:mt-6">{o.line}</RiseItem>
      </Rise>
      <div className="relative px-6 pt-10 pb-20 md:px-16 md:pt-12 md:pb-16">
        <div className="relative aspect-[4/3] w-[88%] overflow-hidden rounded-[16px] md:aspect-[3/2] md:w-[50%]">
          <PhotoFill shot={o.large} sizes="(min-width: 768px) 50vw, 88vw" />
        </div>
        <div className="absolute right-6 bottom-8 aspect-[4/5] w-[38%] overflow-hidden rounded-[16px] border-4 border-[color-mix(in_srgb,var(--offwhite)_92%,var(--terracotta))] md:right-auto md:bottom-8 md:left-[calc(4rem+44%)] md:w-[20%]">
          <PhotoFill shot={o.small} sizes="(min-width: 768px) 20vw, 38vw" />
        </div>
      </div>
    </Panel>
  );
}

/** a. Split (Light): the words on one half, the photo (4:5) on the other. Phones: words, then photo. */
export function Coach() {
  const c = tile.coach;
  return (
    <Panel variant="light" className="grid md:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
      <Rise className={`${pad} flex flex-col justify-center`} stagger={0.12}>
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
      <div className="relative aspect-[4/5]">
        <PhotoFill shot={c.shot} sizes="(min-width: 768px) 45vw, 100vw" />
      </div>
    </Panel>
  );
}

/** d. Diagram beside text (Warm): the words on one half, the ring dials (2 x 2) on the other. Phones: below. */
export function Dials() {
  const d = tile.dials;
  return (
    <Panel variant="warm" className={`flex items-center ${tall}`}>
      <div className={`${pad} grid w-full items-center gap-10 md:grid-cols-2 md:gap-16`}>
        <Rise stagger={0.15}>
          <RiseItem as="h2" className="t-headline">
            <Accent value={d.headline} />
          </RiseItem>
          <RiseItem as="p" className="mt-5 max-w-lg t-sub md:mt-6">{d.line}</RiseItem>
        </Rise>
        <RingDials compact />
      </div>
    </Panel>
  );
}

/** e. Big number (Light): "20,000+" very large, its line, then the link. */
export function BigNumber() {
  const n = tile.number;
  return (
    <Panel variant="light" className={`flex items-center ${tall}`}>
      <Rise className={pad} stagger={0.2}>
        <RiseItem as="p" className="t-number">{n.figure}</RiseItem>
        <RiseItem as="p" className="mt-4 max-w-xl t-sub md:mt-6">{n.line}</RiseItem>
        <RiseItem className="mt-6 md:mt-8">
          <Link href={n.link.href} className={link}>{n.link.label}</Link>
        </RiseItem>
      </Rise>
    </Panel>
  );
}

/** Member stories (Navy): Oura's expandable cards. */
export function Stories() {
  return (
    <Panel variant="navy" className="py-12">
      <StoryCards />
    </Panel>
  );
}

/**
 * The invitation (Navy, split): the words on one half, the coffee bar on
 * the other. Phones: words, then photo. No button (the floating button
 * carries it); one link under it: "All questions →".
 */
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
        <RiseItem className="mt-6">
          <Link href={v.all.href} className={link}>{v.all.label}</Link>
        </RiseItem>
      </Rise>
      <div className="relative aspect-[4/5]">
        <PhotoFill shot={v.shot} alt={tile.lead.alt} sizes="(min-width: 768px) 45vw, 100vw" {...coffee} />
      </div>
    </Panel>
  );
}
