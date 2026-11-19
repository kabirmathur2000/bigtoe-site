/** Site-wide wording: the section anchors, the header and menu, the footer, shared pieces (dials, member cards), page metadata. */
import { facts, mailtoHref, todo } from "./facts";

/** A headline with at most one phrase in terracotta (`accent` must appear in `text`). */
export type Accented = { text: string; accent?: string };

/** The anchors on the one page (the menu, the jump links, the old page redirects in next.config.ts). */
export const anchors = {
  why: "why-bigtoe",
  method: "how-we-train",
  team: "the-team",
  members: "members-words",
  questions: "questions",
  visit: "come-and-meet-us",
} as const;

export const nav = {
  homeLabel: "BigToe, back to the top",
  /** The three-line icon and the full-screen list of jump links it opens. */
  open: "Menu",
  close: "Close",
  label: "Menu",
  links: [
    { id: anchors.why, label: "Why BigToe" },
    { id: anchors.method, label: "How we train" },
    { id: anchors.team, label: "The team" },
    { id: anchors.members, label: "Members' words" },
    { id: anchors.questions, label: "Questions" },
    { id: anchors.visit, label: "Come and meet us" },
  ],
} as const;

export const footer = {
  /** Screen-reader name for the footer's links. */
  navLabel: "More",
  logoAlt: facts.brand,
  careers: { label: "Careers", href: mailtoHref },
  map: { label: "Location on Maps", missing: todo("map link") },
  links: [
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
  whatsappLabel: "WhatsApp",
  missingWhatsapp: todo("WhatsApp number"),
} as const;

/** Until the shoot every photo slot shows the coffee bar photo, cropped per slot; `shot` names the photo it stands in for. */
export const photo = {
  alt: "The BigToe coffee bar: the long wooden table and stools under pendant lamps, the training floor behind",
  /** BigToe's own 3D renders of the space (docs/photos/space/), for the slots where the space is the subject. */
  spaceAlt: {
    hero: "The BigToe studio: the training floor, a render of the space",
    table: "The BigToe social table, a render of the space",
  },
  placeholder: (shot: string) => `Placeholder for the photo: ${shot}`,
} as const;

/** The example dials ("Know your starting point."). */
export const dials = {
  card: "Your Reserve Audit",
  example: "Example",
  score: { name: "Strength Reserve", value: 69 },
  items: [
    { name: "Body composition", value: 78 },
    { name: "Balance and mobility", value: 42 },
    { name: "Functional strength", value: 90 },
    { name: "Conditioning", value: 66 },
  ],
  outOf: "out of 100",
};

/** The member cards. Quotes live in content/quotes.ts. */
export const members = {
  name: todo("first name"),
  age: todo("age"),
  draftLabel: "Draft",
} as const;

/**
 * Titles and descriptions. Titles show as "Terms & Conditions · BigToe";
 * Home's is absolute. The description is an agreed site line.
 */
export const meta = {
  title: "BigToe",
  homeTitle: `${facts.brand} · One-to-one training for life after 40 · ${facts.address.area}, ${facts.address.city}`,
  description: `${facts.heroLine} One-to-one training for life after 40.`,
  pages: {
    terms: { title: "Terms & Conditions", description: `${facts.brand} terms and conditions.` },
    privacy: { title: "Privacy Policy", description: `${facts.brand} privacy policy.` },
  },
  /** Alt text for the shared Open Graph image. */
  ogAlt: `${facts.brand}, ${facts.tagline}. ${facts.heroLine}`,
} as const;
