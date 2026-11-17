/** Site-wide interface wording: navigation and footer labels, page metadata. */
import { facts, todo } from "./facts";

export const nav = {
  homeLabel: "BigToe home",
  /** Screen-reader name for the top navigation. */
  label: "Main",
  links: [
    { href: "/", label: "Home" },
    { href: "/method", label: "The Method" },
    { href: "/team", label: "Team" },
  ],
} as const;

export const footer = {
  /** Screen-reader name for the footer's links. */
  navLabel: "Legal",
  links: [
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
  mapLabel: "Map",
  missingMap: todo("map link"),
  whatsappLabel: "WhatsApp",
  missingWhatsapp: todo("WhatsApp number"),
} as const;

/**
 * Page titles and descriptions. Titles show as "Team · BigToe"; Home's is
 * absolute. Descriptions are approved site lines.
 */
export const meta = {
  title: "BigToe",
  homeTitle: `${facts.brand} · Personal training for adults over 40 · ${facts.address.area}, ${facts.address.city}`,
  description: `${facts.heroLine} A strength studio for life after 40.`,
  pages: {
    method: { title: "The Method", description: "The Strength Reserve. More strength than your day demands." },
    team: { title: "Team", description: "Why we built this. The four of us, and your Sherpas." },
    terms: { title: "Terms & Conditions", description: `${facts.brand} terms and conditions.` },
    privacy: { title: "Privacy Policy", description: `${facts.brand} privacy policy.` },
  },
  /** Alt text for the shared Open Graph image. */
  ogAlt: `${facts.brand}, ${facts.tagline}. ${facts.heroLine}`,
} as const;
