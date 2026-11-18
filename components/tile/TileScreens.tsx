import Image from "next/image";
import Link from "next/link";
import { facts, mailtoHref, whatsappHref } from "@/content/facts";
import { footer } from "@/content/site";
import { tile, type Accented } from "@/content/style-tile";
import logoTag from "@/public/brand/logo-tag-light.png";
import coffeeBar from "@/public/photos/studio-coffee-bar.jpg";
import { Icon } from "./Icons";
import { Faq, TrainRow } from "./Interactive";
import { MemberStack, SherpaSplit, StartingPointSplit } from "./Scroll";
import { FadeUp, Rise, RiseItem } from "./Rise";
import { BookPill } from "./VisitPanel";

/**
 * Rounds six and seven: screens after ouraring.com, functionhealth.com,
 * soma-health.co and Neko, in BigToe's brand. A light page (#F0EEEB), navy text, Light headlines,
 * Regular text, Bold only for small labels; terracotta for the button and
 * at most one accent phrase per screen. Content fades up once as it
 * arrives. Every photo slot shows the coffee bar photo until the shoot,
 * cropped per slot.
 */

/** A headline with at most one phrase in terracotta. */
function Accent({ value }: { value: Accented }) {
  const { text, accent } = value;
  if (!accent || !text.includes(accent)) return <>{text}</>;
  const i = text.indexOf(accent);
  return (
    <>
      {text.slice(0, i)}
      <span className="text-terracotta">{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}

const space = "py-24 md:py-36";
const softPill = "inline-flex min-h-11 items-center rounded-full bg-navy/[0.07] px-5 ty-body transition-colors duration-300 hover:bg-navy/[0.12]";

/** 1. Hero, after Function's "Check your health.": a full-screen photo, a soft dark gradient over the lower half, the words on it. */
export function Hero() {
  const h = tile.hero;
  const shadow = "[text-shadow:0_1px_20px_rgb(10_33_45_/_0.35)]";
  return (
    <section className="relative h-svh min-h-[36rem] overflow-hidden bg-navy">
      {/* Phones: the frame runs 40% above the screen, so the logo wall sits higher, clear of the words. */}
      <div className="absolute inset-x-0 -top-[40%] bottom-0 md:top-0">
        <Image src={coffeeBar} alt={tile.photoAlt} fill preload sizes="100vw" quality={75} className="object-cover object-[16%_50%] md:object-[50%_55%]" />
      </div>
      {/* A soft navy gradient behind the words only: strongest at the bottom, clear above about 60% of the height (70% on desktop). */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-navy/95 via-navy/60 to-transparent md:h-[70%]" />
      <Rise
        className={`tile-wrap absolute inset-x-0 bottom-0 pb-[max(2.5rem,calc(env(safe-area-inset-bottom)+1.5rem))] text-offwhite md:pb-16 ${shadow}`}
        stagger={0.1}
      >
        <RiseItem>
          <span className="inline-flex items-center rounded-full border border-offwhite/25 bg-offwhite/15 px-3.5 py-2 ty-label backdrop-blur-md">{h.place}</span>
        </RiseItem>
        <RiseItem as="h1" className="mt-6 max-w-5xl ty-hero">
          <Accent value={h.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 max-w-xl ty-sub md:mt-8">{h.line}</RiseItem>
        <RiseItem className="mt-8 md:mt-10">
          <BookPill placement="tile-hero" />
        </RiseItem>
      </Rise>
    </section>
  );
}

/** 2. Why, after Oura's "Understand your body. Own your health.": text only, centred, two soft pill links. */
export function Why() {
  const w = tile.why;
  return (
    <section className={`tile-wrap text-center ${space} md:py-44`}>
      <Rise>
        <RiseItem as="h2" className="mx-auto max-w-3xl ty-headline">
          <Accent value={w.headline} />
        </RiseItem>
        <RiseItem as="p" className="mx-auto mt-5 max-w-xl ty-sub text-navy/80 md:mt-6">{w.line}</RiseItem>
        <RiseItem className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10">
          {w.links.map((l) => (
            <Link key={l.href} href={l.href} className={softPill}>{l.label}</Link>
          ))}
        </RiseItem>
      </Rise>
    </section>
  );
}

/** 3. What we train, after Oura's card row. */
export function Train() {
  return (
    <section className="pb-24 md:pb-36">
      <FadeUp>
        <TrainRow />
      </FadeUp>
    </section>
  );
}

/** 4. Your first hour, after Function's "Testing is easy": three numbered steps. */
export function FirstHour() {
  const f = tile.firstHour;
  return (
    <section className={`tile-wrap ${space}`}>
      <FadeUp>
        <h2 className="max-w-2xl ty-headline">
          <Accent value={f.headline} />
        </h2>
      </FadeUp>
      <Rise as="ol" className="mt-10 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-8" stagger={0.12}>
        {f.steps.map((s, i) => (
          <RiseItem as="li" key={s.title} className="border-t border-navy/15 pt-6">
            <span className="ty-label tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-6 ty-sub md:mt-10">{s.title}</h3>
            <p className="mt-3 max-w-sm ty-body text-navy/80">{s.line}</p>
          </RiseItem>
        ))}
      </Rise>
    </section>
  );
}

/** 5. Know your starting point: the Soma-style split with the dials diagram (Scroll.tsx). */
export function StartingPoint() {
  return <StartingPointSplit />;
}

/** 6. Your Sherpa: the Soma-style split with the glass panel (Scroll.tsx). The navy zone starts here. */
export function Sherpa() {
  return <SherpaSplit />;
}

/** Your Sherpas: five round portrait placeholders with first names. */
export function Sherpas() {
  const s = tile.sherpas;
  return (
    <section className={`tile-wrap ${space}`}>
      <Rise>
        <RiseItem as="h2" className="max-w-3xl ty-headline">
          <Accent value={s.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 max-w-xl ty-sub opacity-80 md:mt-6">{s.line}</RiseItem>
      </Rise>
      <Rise as="ul" className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-8 md:mt-14 md:grid md:grid-cols-5 md:gap-8" stagger={0.08}>
        {s.names.map((n) => (
          <RiseItem as="li" key={n} className="flex w-24 flex-col items-center text-center md:w-auto">
            <span role="img" aria-label={`${n}: ${s.placeholder}`} className="flex aspect-square w-full items-center justify-center rounded-full border border-offwhite/20 bg-offwhite/10">
              <Icon name="sherpa" className="h-8 w-8 opacity-60 md:h-10 md:w-10" />
            </span>
            <span className="mt-3 ty-body">{n}</span>
          </RiseItem>
        ))}
      </Rise>
    </section>
  );
}

/** In our members' words, after Neko's cards: they stack and slide over one another. Drafts until consent (the build check guards bigtoe.in). */
export function Members() {
  const m = tile.members;
  return (
    <section className={`tile-wrap ${space}`}>
      <FadeUp>
        <h2 className="max-w-2xl ty-headline">
          <Accent value={m.headline} />
        </h2>
      </FadeUp>
      <MemberStack />
    </section>
  );
}

/** Beyond training: the headline and line, then one photo card (members at the social table). */
export function Beyond() {
  const b = tile.beyond;
  return (
    <section className={`tile-wrap ${space}`}>
      <Rise>
        <RiseItem as="h2" className="max-w-3xl ty-headline">
          <Accent value={b.headline} />
        </RiseItem>
        <RiseItem as="p" className="mt-5 max-w-xl ty-sub opacity-80 md:mt-6">{b.line}</RiseItem>
      </Rise>
      <FadeUp className="relative mt-10 aspect-[4/5] overflow-hidden rounded-2xl md:mt-14 md:aspect-video">
        <Image src={coffeeBar} alt="" fill sizes="(min-width: 1280px) 1152px, 100vw" quality={70} className="object-cover object-[60%_60%]" />
      </FadeUp>
    </section>
  );
}

/** 8. What's included, the shape of Function's pricing card, with no price. */
export function Included() {
  const n = tile.included;
  return (
    <section className={`tile-wrap flex justify-center ${space}`}>
      <FadeUp className="w-full max-w-[34rem] rounded-2xl bg-offwhite p-7 text-center text-navy md:p-12">
        <h2 className="ty-headline">
          <Accent value={n.headline} />
        </h2>
        <BookPill placement="tile-included" className="mt-8 w-full" />
        <hr className="mt-8 border-navy/15" />
        <ul className="mt-8 space-y-4 text-left">
          {n.items.map((item) => (
            <li key={item} className="flex gap-3 ty-body">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}

/** 9. Questions, after Function's FAQ. */
export function Questions() {
  const q = tile.questions;
  return (
    <section className={`tile-wrap grid gap-8 md:grid-cols-12 md:gap-12 ${space}`}>
      <FadeUp className="md:col-span-4">
        <h2 className="ty-headline">
          <Accent value={q.headline} />
        </h2>
      </FadeUp>
      <FadeUp className="md:col-span-8">
        <Faq />
      </FadeUp>
    </section>
  );
}

const footLink = "inline-flex min-h-11 items-center ty-small transition-opacity duration-300 hover:opacity-70";
const inline = "underline decoration-current/30 underline-offset-4 transition-opacity duration-300 hover:opacity-70";

/** 10. Ending, after Function's closing: two lines centred, the button, then the footer with the light LogoTag (the footer is in the navy zone). */
export function Ending() {
  const e = tile.ending;
  const wa = whatsappHref();
  const [first, second] = [e.headline.text.replace(e.headline.accent ?? "", "").trim(), e.headline.accent];
  return (
    <section className="tile-wrap pt-24 pb-10 md:pt-40 md:pb-12">
      <Rise className="text-center">
        <RiseItem as="h2" className="mx-auto max-w-3xl ty-headline">
          <span className="block">{first}</span>
          <span className="block text-terracotta">{second}</span>
        </RiseItem>
        <RiseItem className="mt-8 md:mt-10">
          <BookPill placement="tile-ending" />
        </RiseItem>
      </Rise>

      <footer className="mt-24 grid gap-8 border-t border-current/20 pt-10 md:mt-36 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <Image src={logoTag} alt={`${facts.brand}. ${facts.tagline}`} className="h-16 w-auto md:h-20" sizes="(min-width: 768px) 200px, 160px" />
        </div>
        <div className="space-y-1 md:col-span-5">
          <p className="ty-small">{facts.address.line}</p>
          <p className="ty-small">{e.hours}</p>
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
      </footer>
    </section>
  );
}
