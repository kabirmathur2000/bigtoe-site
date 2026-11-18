/**
 * Every reusable BigToe fact (agreed copy, 18 Nov 2026:
 * docs/copy/agreed-copy-2026-11-18.md). Import from here; never retype a
 * fact in a component or another content file.
 *
 * A value of `null` means the fact is still open (see CLAUDE.md, "Still open").
 * Components render `todo(...)` text in its place so the gap stays visible.
 */

export const TODO_PREFIX = "TODO:";
export const todo = (what: string) => `${TODO_PREFIX} ${what}`;

const guarantee = {
  condition: "Complete six sessions within three weeks of joining.",
  counts: "Studio and online sessions both count.",
  refund: "Not for you? Your money back, no questions asked.",
};

export const facts = {
  brand: "BigToe",
  tagline: "Practice Possibility",
  /** The live domain (email is @bigtoe.in). Override with NEXT_PUBLIC_SITE_URL for previews. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://bigtoe.in",

  /** The one button label, everywhere. Every button opens the request panel. */
  cta: "Book your first visit",
  /** The same button in the phone header, where the full label does not fit. */
  ctaShort: "Book a visit",

  /** The core belief, as Home opens with it (also the share image and search description). */
  heroLine: "The second half of life should be stronger than the first.",

  coachingHours: "20,000+",
  /** Members on the floor at once. */
  membersAtOnce: "five",

  price: "₹25,000 to ₹50,000 a month, depending on how often you train.",
  /** The same range for search engines. */
  priceRange: "₹25,000 to ₹50,000 a month",
  firstHourFree: "Your first hour is free.",

  /** The guarantee as Home says it (the FAQ adds that studio and online sessions both count). */
  guarantee: `${guarantee.condition} ${guarantee.refund}`,
  guaranteeFull: `${guarantee.condition} ${guarantee.counts} ${guarantee.refund}`,

  founders: [
    { name: "Jay Singh", age: 59 },
    { name: "Jeevan Aujla", age: 41 },
    { name: "Seema Jindal", age: 58 },
    { name: "Rodrigo Pérez", age: 51 },
  ],
  sherpas: ["Himanshu", "Saurav", "Sumit", "Tanuj", "Kabir"],

  address: {
    /** As the footer says it, in one line. */
    line: "43 Basant Lok, 3rd Floor, Vasant Vihar, New Delhi 110057.",
    /** The neighborhood, as the hero pill says it. */
    short: "Vasant Vihar, New Delhi.",
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

  email: "hello@bigtoe.in",
  /** Digits only with country code, e.g. 919800000000. Open item. */
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null) as string | null,

  /** The intake form, linked from the request panel's thank-you (Jay's link, 5 Nov). */
  intakeFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdtFRybz94zmLgkWQT9pnLRGVndA5rfe-K_NI1pd8Q72B8iHw/viewform",
} as const;

export const whatsappHref = (message?: string) =>
  facts.whatsappNumber
    ? `https://wa.me/${facts.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`
    : null;

export const mailtoHref = `mailto:${facts.email}`;
