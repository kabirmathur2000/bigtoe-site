/**
 * Every reusable BigToe fact (Version C, 17 Nov 2026). Import from here;
 * never retype a fact in a component or another content file.
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
  ctaLabel: "Book your free first hour",

  /** The core belief, as Home opens with it (also the share image and search description). */
  heroLine: "The second half should be the stronger half.",

  coachingHours: "20,000+",
  sherpaCount: "Five",
  /** Members on the floor at once. */
  membersPerHour: "Five members an hour",

  price: {
    from: "₹25,000",
    to: "₹45,000",
    get range() {
      return `${this.from} to ${this.to} a month, by how often you train.`;
    },
  },

  /** The guarantee, word for word. */
  guarantee: "Come to your first eight sessions. Not for you? Your money back.",
  /** Only studio sessions count toward the eight. */
  guaranteeRule: "Only studio sessions count toward your first eight.",

  /** The free first hour. */
  firstHour: "Your first hour is free: a body scan, a light session, and a straight talk over coffee.",

  founders: [
    { name: "Jay Singh", age: 59 },
    { name: "Jeevan Aujla", age: 41 },
    { name: "Seema Jindal", age: 58 },
    { name: "Rodrigo Pérez", age: 51 },
  ],

  address: {
    /** As the footer says it, in one line. */
    line: "43 Basant Lok, 3rd Floor, Vasant Vihar, New Delhi 110057.",
    /** The neighborhood, as the Home strip says it. */
    short: "Vasant Vihar, New Delhi",
    /** The same address in parts, for search engines (JSON-LD). */
    street: "43 Basant Lok, 3rd Floor",
    area: "Vasant Vihar",
    city: "New Delhi",
    postalCode: "110057",
    country: "IN",
    mapUrl: null as string | null,
  },
  hours: "Monday to Saturday, 6 am to 8 pm. Sunday, 8 am to 1 pm.",
  /** The same hours for search engines (schema.org openingHours). */
  hoursSchema: ["Mo-Sa 06:00-20:00", "Su 08:00-13:00"],
  parking: "There's no parking at the studio. Come by cab or get dropped off.",

  email: "hello@bigtoe.in",
  /** Digits only with country code, e.g. 919800000000. Open item. */
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null) as string | null,

  /** The short form a visitor fills in before the first hour (linked from the thank-you step). */
  preVisitFormUrl: "https://forms.gle/7GWfSvARWfdz4hkE9",
  /** The intake form linked from the style tile's request panel (the new booking flow). */
  intakeFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdtFRybz94zmLgkWQT9pnLRGVndA5rfe-K_NI1pd8Q72B8iHw/viewform",
} as const;

/**
 * The agreed facts (docs/copy/agreed-copy-2026-11-18.md), used by the style
 * tile now and by every page once they are rebuilt from it. The live pages
 * still read the older values above until then.
 */
export const agreed = {
  /** The one button label in the new flow. */
  cta: "Book your first visit",
  price: "₹25,000 to ₹50,000 a month, depending on how often you train.",
  firstHourFree: "Your first hour is free.",
  guarantee:
    "Complete six sessions within three weeks of joining. Studio and online sessions both count. Not for you? Your money back, no questions asked.",
  hours: facts.hours,
} as const;

export const whatsappHref = (message?: string) =>
  facts.whatsappNumber
    ? `https://wa.me/${facts.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`
    : null;

export const mailtoHref = `mailto:${facts.email}`;
