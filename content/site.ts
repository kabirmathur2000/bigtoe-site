/** Site-wide interface wording: navigation and footer labels, page metadata. */
import { facts } from "./facts";

export const nav = {
  homeLabel: "BigToe home",
  links: [
    { href: "/method", label: "Method" },
    { href: "/team", label: "Team" },
  ],
} as const;

export const footer = {
  hoursLabel: "Hours",
  contactLabel: "Contact",
  whatsappLabel: "WhatsApp",
  emailLabel: "Email",
  missingWhatsapp: "WhatsApp number to publish",
  missingMap: "map link",
} as const;

/**
 * Page titles and descriptions. Titles show as "Team · BigToe"; Home's is
 * absolute (set by Kabir). Descriptions are deck lines, never new claims.
 */
export const meta = {
  title: "BigToe",
  homeTitle: "BigToe · Personal training for adults over 40 · Vasant Vihar, New Delhi",
  /** Core belief (Deck 1), then Deck 1 slide 3. */
  description: `${facts.heroLine} We train for a sport called life.`,
  pages: {
    method: {
      title: "Method",
      /** Deck 1 slide 11, then Deck 4. */
      description: "Three things fade with age. We train all three. Barefoot, free weights, one supervised hour.",
    },
    team: {
      title: "Team",
      /** Deck 1 slide 25, then Deck 1 slide 18. */
      description: "Behind each face is a real person. You don’t climb alone.",
    },
    book: {
      /** Deck 5 slide 17. */
      description: facts.where,
    },
  },
  /** Alt text for the shared Open Graph image. */
  ogAlt: `${facts.brand}, ${facts.tagline}. ${facts.heroLine}`,
} as const;
