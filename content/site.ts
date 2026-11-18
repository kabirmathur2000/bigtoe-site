/** Site-wide wording: the header and menu, the footer, shared pieces (dials, member cards), page metadata. */
import { facts, mailtoHref, todo } from "./facts";

/** A headline with at most one phrase in terracotta (`accent` must appear in `text`). */
export type Accented = { text: string; accent?: string };

export const nav = {
  homeLabel: "BigToe home",
  /** The three-line icon and the full-screen list it opens. */
  open: "Menu",
  close: "Close",
  label: "Menu",
  links: [
    { href: "/", label: "Home" },
    { href: "/method", label: "Method" },
    { href: "/team", label: "Team" },
    { href: "/faq", label: "FAQ" },
  ],
} as const;

/** The inner-page pattern (Method, Team, FAQ): a page title, then this link. */
export const back = { label: "← Back to home", href: "/" } as const;

export const footer = {
  /** Screen-reader name for the footer's links. */
  navLabel: "More",
  logoAlt: `${facts.brand}. ${facts.tagline}`,
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
  placeholder: (shot: string) => `Placeholder for the photo: ${shot}`,
} as const;

/** The example dials (Home and Method; the style tile too). */
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

/** The member cards (Home; the style tile too). Quotes live in content/quotes.ts. */
export const members = {
  name: todo("first name"),
  age: todo("age"),
  draftLabel: "Draft",
} as const;

/**
 * Page titles and descriptions. Titles show as "Team · BigToe"; Home's is
 * absolute. Descriptions are agreed site lines.
 */
export const meta = {
  title: "BigToe",
  homeTitle: `${facts.brand} · One-to-one training for life after 40 · ${facts.address.area}, ${facts.address.city}`,
  description: `${facts.heroLine} One-to-one training for life after 40.`,
  pages: {
    method: { title: "How we train", description: "Know your starting point. Build more than appearance. Train from the ground up." },
    team: { title: "Team", description: "Why we built this. The four of us, and your Sherpas." },
    faq: { title: "Questions", description: "Who BigToe is for, what a session covers, what it costs, and what happens at your first visit." },
    terms: { title: "Terms & Conditions", description: `${facts.brand} terms and conditions.` },
    privacy: { title: "Privacy Policy", description: `${facts.brand} privacy policy.` },
  },
  /** Alt text for the shared Open Graph image. */
  ogAlt: `${facts.brand}, ${facts.tagline}. ${facts.heroLine}`,
} as const;
