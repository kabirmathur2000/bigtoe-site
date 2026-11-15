/**
 * Every reusable BigToe fact. Source: docs/copy/facts.md and the guide's
 * decisions table. Import from here; never retype a fact in a component or
 * another content file.
 *
 * A value of `null` means the fact is still open (see CLAUDE.md, "Still open").
 * Components render `todo(...)` text in its place so the gap stays visible.
 */

export const TODO_PREFIX = "TODO:";
export const todo = (what: string) => `${TODO_PREFIX} ${what}`;

export const facts = {
  brand: "BigToe",
  tagline: "Practice Possibility",

  /** The one button label used everywhere. Wording to confirm with Jay. */
  ctaLabel: "BOOK YOUR FREE FIRST VISIT",
  /** Book page route (decisions table). */
  bookHref: "/book-now",

  heroLine: "The second half of life should be the stronger half.",

  /** Decisions table, "First step". */
  firstStep: {
    price: "Free",
    length: "60 minutes",
    then: "coffee",
    summary: "A free 60-minute first visit, then coffee.",
  },

  price: {
    range: "₹25,000 to ₹45,000 a month",
    note: "Set after the Reserve Audit, given in writing before commitment.",
  },

  /** Exact wording still to confirm ("no argument" or "refund with interest"). */
  guarantee: "30 days, money back",

  /** Open: monthly or four-month blocks. */
  billing: null as string | null,

  session: {
    length: "60 minutes",
    perWeek: "2 to 4 a week by goal",
  },

  where: "Studio, home or online at no extra charge",

  reserveAudit: {
    first: "Sessions 2 to 4",
    repeat: "Every 16 sessions",
  },

  /** Address and hours still to confirm as current. */
  address: {
    lines: ["43 Basant Lok, 3rd Floor", "Vasant Vihar, New Delhi 110057"],
    mapUrl: null as string | null,
  },
  hours: "6 am to 10 pm, Monday to Sunday",
  parking: "There's no parking at the studio. Come by cab or get dropped off.",

  email: "hello@bigtoe.in",
  /** Digits only with country code, e.g. 919800000000. Open item. */
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null) as string | null,
  /** Open: how fast a Sherpa replies after a booking. */
  replyTime: null as string | null,

  /** Open: the six options from the pre-trial form. */
  day120Options: null as string[] | null,
} as const;

export const whatsappHref = (message?: string) =>
  facts.whatsappNumber
    ? `https://wa.me/${facts.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`
    : null;

export const mailtoHref = `mailto:${facts.email}`;
