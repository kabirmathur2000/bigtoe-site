/** Site-wide interface wording: navigation and footer labels, page metadata. */
import { facts, mailtoHref, todo } from "./facts";

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
  tagline: "Practice Possibility.",
  /** Screen-reader name for the footer's links. */
  navLabel: "More",
  careers: { label: "Careers", href: mailtoHref },
  map: { label: "Location on Maps", missing: todo("map link") },
  links: [
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
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
  description: `${facts.heroLine} Not a gym. A strength studio for life after 40.`,
  pages: {
    method: { title: "The Method", description: "The Reserve Score. Most gyms train in the dark. We turn the lights on." },
    team: { title: "Team", description: "Why we built this. The four of us, and your Sherpas." },
    terms: { title: "Terms & Conditions", description: `${facts.brand} terms and conditions.` },
    privacy: { title: "Privacy Policy", description: `${facts.brand} privacy policy.` },
  },
  /** Alt text for the shared Open Graph image. */
  ogAlt: `${facts.brand}, ${facts.tagline}. ${facts.heroLine}`,
} as const;
