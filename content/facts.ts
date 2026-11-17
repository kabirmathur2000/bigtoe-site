/**
 * Every reusable BigToe fact. Import from here; never retype a fact in a
 * component or another content file.
 *
 * A value of `null` means the fact is still open (see CLAUDE.md, "Still open").
 * Components render `todo(...)` text in its place so the gap stays visible.
 */

export const TODO_PREFIX = "TODO:";
export const todo = (what: string) => `${TODO_PREFIX} ${what}`;

export const facts = {
  brand: "BigToe",
  tagline: "Practice Possibility",
  /** The live domain (email is @bigtoe.in). Override with NEXT_PUBLIC_SITE_URL for previews. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://bigtoe.in",

  /** The one button label, everywhere, and the booking panel's heading. Never a variant. */
  ctaLabel: "Book your first hour",

  /** The core belief, as Home opens with it (also the share image and search description). */
  heroLine: "The second half should be the stronger half.",

  price: {
    from: "₹25,000",
    to: "₹45,000",
    get range() {
      return `${this.from} to ${this.to} a month.`;
    },
    note: "Set with you in your first hour. In writing, before you commit.",
  },

  /** Exact wording approved for launch. */
  guarantee: "Not seeing progress in your functional scores after 30 days? Your money back.",

  /** Training frequency (FAQ). */
  frequency: "Two, three or four times a week.",

  /** Address and hours still to confirm as current. */
  address: {
    /** As the footer says it, in one line. */
    line: "43 Basant Lok, 3rd Floor, Vasant Vihar, New Delhi 110057.",
    /** The same address in parts, for search engines (JSON-LD). */
    street: "43 Basant Lok, 3rd Floor",
    area: "Vasant Vihar",
    city: "New Delhi",
    postalCode: "110057",
    country: "IN",
    mapUrl: null as string | null,
  },
  hours: "6 am to 10 pm, every day.",
  /** The same hours for search engines (schema.org openingHours). */
  hoursSchema: "Mo-Su 06:00-22:00",
  parking: "There's no parking at the studio. Come by cab or get dropped off.",

  email: "hello@bigtoe.in",
  /** Digits only with country code, e.g. 919800000000. Open item. */
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null) as string | null,

  /** The short form a visitor fills in before the first hour (linked from the thank-you step). */
  preVisitFormUrl: "https://forms.gle/7GWfSvARWfdz4hkE9",
} as const;

export const whatsappHref = (message?: string) =>
  facts.whatsappNumber
    ? `https://wa.me/${facts.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`
    : null;

export const mailtoHref = `mailto:${facts.email}`;
