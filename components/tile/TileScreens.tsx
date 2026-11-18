import Link from "next/link";
import type { ReactNode } from "react";
import { memberQuotes } from "@/content/quotes";
import { tile, type Accented } from "@/content/style-tile";
import coffeeBar from "@/public/photos/studio-coffee-bar.jpg";
import { MemberCard } from "./MemberCard";
import { Accent, Card, PhotoFill } from "./Panel";
import { RingDials } from "./RingDials";
import { Rise, RiseItem } from "./Rise";

/**
 * Round four, after soma-health.co: one idea per scroll. A short headline
 * on the navy page, then one card holding one visual, then breathing room
 * before the next idea. Text is never on a photo, except a member's name
 * and age (and their quote) on member cards. Nothing needs a tap to read.
 * The type matches the invitation ("Come and meet us"): t-headline, t-sub,
 * t-body, t-label.
 */
const link =
  "inline-flex min-h-11 items-center t-body underline decoration-current/40 underline-offset-[6px] transition-opacity duration-500 hover:opacity-75";

/** One idea: the headline (and its lines) on navy, fading up one after another, then its card 24px below. */
function Idea({
  as = "h2",
  headline,
  lines = [],
  link: l,
  children,
}: {
  as?: "h1" | "h2";
  headline: Accented;
  lines?: readonly string[];
  link?: { label: string; href: string };
  children?: ReactNode;
}) {
  return (
    <section>
      <Rise className="max-w-4xl" stagger={0.15}>
        <RiseItem as={as} className="t-headline">
          <Accent value={headline} />
        </RiseItem>
        {lines.map((line, i) => (
          <RiseItem key={line} as="p" className={`max-w-2xl t-sub ${i ? "mt-3" : "mt-4 md:mt-6"}`}>
            {line}
          </RiseItem>
        ))}
        {l && (
          <RiseItem className="mt-4">
            <Link href={l.href} className={link}>{l.label}</Link>
          </RiseItem>
        )}
      </Rise>
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}

/** a. Hero: the words on navy, then the coffee bar photo card, its caption below (never on the photo). */
export function Hero() {
  const h = tile.hero;
  return (
    <Idea as="h1" headline={h.headline} lines={[h.line]}>
      <Card variant="photo" className="aspect-[4/5] md:aspect-video">
        <PhotoFill shot={h.shot} src={coffeeBar} alt={h.alt} preload sizes="100vw" phonePos="18% 55%" desktopPos="50% 55%" />
      </Card>
      <p className="mt-3 t-label">{h.caption}</p>
    </Idea>
  );
}

/** b. A pause: words only, no card. */
export function Pause() {
  const p = tile.pause;
  return <Idea headline={p.headline} lines={p.lines} />;
}

/** c. The words on navy, then a Light card holding one photo (3:2 desktop, 4:5 phones). */
export function Coach() {
  const c = tile.coach;
  return (
    <Idea headline={c.headline} lines={[c.line]} link={c.link}>
      <Card variant="light" className="p-3 md:p-5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] md:aspect-[3/2] md:rounded-[22px]">
          <PhotoFill shot={c.shot} sizes="100vw" />
        </div>
      </Card>
    </Idea>
  );
}

/** d. The words on navy, then a Warm card with the example ring dials. */
export function Dials() {
  const d = tile.dials;
  return (
    <Idea headline={d.headline} lines={[d.line]}>
      <Card variant="warm" className="px-6 py-8 md:px-12 md:py-12">
        <RingDials plain />
      </Card>
    </Idea>
  );
}

/** e. The words on navy, then one photo card (16:9 desktop, 4:5 phones). */
export function Social() {
  const s = tile.social;
  return (
    <Idea headline={s.headline} lines={[s.line]}>
      <Card variant="photo" className="aspect-[4/5] md:aspect-video">
        <PhotoFill shot={s.shot} sizes="100vw" />
      </Card>
    </Idea>
  );
}

/** f. Member stories, stacked down the page: one photo card per member; each quote fades in at the middle of the screen. */
export function Stories() {
  return (
    <Idea headline={tile.stories.headline}>
      <div className="space-y-6">
        {memberQuotes.map((q, i) => (
          <MemberCard key={i} quote={q} />
        ))}
      </div>
    </Idea>
  );
}

/** g. The words on navy, then a Light card with the big number. */
export function Team() {
  const t = tile.team;
  return (
    <Idea headline={t.headline} lines={[t.line]}>
      <Card variant="light" className="px-6 py-10 md:px-12 md:py-14">
        <p className="t-number">{t.figure}</p>
        <p className="mt-4 max-w-xl t-sub md:mt-6">{t.figureLine}</p>
        <Link href={t.link.href} className={`mt-6 ${link}`}>{t.link.label}</Link>
      </Card>
    </Idea>
  );
}

/** h. One line on navy. */
export function Questions() {
  const q = tile.questions;
  return (
    <section>
      <p className="t-sub">
        {q.lead}{" "}
        <Link href={q.link.href} className="underline decoration-current/40 underline-offset-[6px] transition-opacity duration-500 hover:opacity-75">
          {q.link.label}
        </Link>
      </p>
    </section>
  );
}
