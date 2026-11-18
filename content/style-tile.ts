/**
 * The style tile (/style-tile, 18 Nov 2026): one working example of each
 * screen type, with real copy, to approve the look before the pages are
 * rebuilt from these patterns. Not linked, not in the sitemap, noindex.
 *
 * PROPOSED FACTS: the price, the guarantee, the first visit and the button
 * label here differ from content/facts.ts (which the live pages still use).
 * When the pages are rebuilt, move the approved versions into facts.ts.
 */
import { facts, todo } from "./facts";

/** A photo's two shapes: what to supply for desktop and for phones. */
export type Shot = {
  name: string;
  desktop: { ratio: string; size: string };
  phone: { ratio: string; size: string };
};

/** How a placeholder labels itself: shot name, shape and pixel size to supply. */
export const shotLabel = (s: Shot) =>
  `${s.name} · desktop ${s.desktop.ratio}, ${s.desktop.size} · phone ${s.phone.ratio}, ${s.phone.size}`;

export const tile = {
  title: "Style tile",
  /** The one button label in the new flow (proposed; the live pages say "Book your free first hour"). */
  cta: "Book your first visit",

  nav: {
    links: [
      { href: "/method", label: "Method" },
      { href: "/team", label: "Team" },
      { href: "#faq", label: "FAQ" },
    ],
  },

  /** A. Photo screens (light), alternating sides. */
  photoScreens: [
    {
      headline: "Get stronger. Keep the pizza.",
      line: "A healthier life shouldn't mean giving up the things you enjoy.",
      shot: {
        name: "Members around the social table",
        desktop: { ratio: "3:2", size: "2400x1600" },
        phone: { ratio: "4:5", size: "1600x2000" },
      } satisfies Shot,
      /** Until the shoot, the studio's coffee bar (the social table, empty) stands in. */
      useStudioPhoto: true,
    },
    {
      headline: "Your Sherpa. Your plan.",
      line: "A dedicated coach for every session. Your Reserve Audit sets the starting point; your progress shapes the next step.",
      link: { label: "How we train", href: "/method" },
      shot: {
        name: "One Sherpa guiding one member, close",
        desktop: { ratio: "4:5", size: "1600x2000" },
        phone: { ratio: "4:5", size: "1600x2000" },
      } satisfies Shot,
      useStudioPhoto: false,
    },
  ],

  /** B. Text screen (light). */
  text: {
    headline: "We train for a sport called life.",
    lines: ["A suitcase to lift. Unexpected stairs. A trip to say yes to.", "Build the strength for what comes next."],
  },

  /** D. Diagram screen (light): four dials, no scores. */
  dials: {
    headline: "Know your starting point.",
    line: "Your plan starts with the dial that needs the most attention.",
    names: ["Body composition", "Balance and mobility", "Functional strength", "Conditioning"],
  },

  /** C. Member card (navy). Quotes live in content/quotes.ts (all drafts). */
  members: {
    heading: "In our members' words.",
    name: todo("first name"),
    age: todo("age"),
    draftLabel: "Draft",
    portrait: {
      name: "Member portrait",
      desktop: { ratio: "1:1", size: "1200x1200" },
      phone: { ratio: "1:1", size: "1200x1200" },
    } satisfies Shot,
    previous: "Previous member",
    next: "Next member",
    regionLabel: "Member quotes",
  },

  /** E. Invitation (navy, centred). Proposed facts: see the note at the top. */
  invitation: {
    headline: "Come and meet us.",
    line: "Meet a founder, take a body scan and a light assessment, then stay for coffee.",
    price: "₹25,000 to ₹50,000 a month, depending on how often you train.",
    free: "Your first hour is free.",
    guarantee: "Complete six sessions within three weeks of joining. Not for you? Your money back, no questions asked.",
  },

  /** Accordion under E: three questions, one open at a time. */
  faq: {
    label: "Questions",
    items: [
      {
        q: "Who is BigToe for?",
        /** Agreed FAQ copy, 17 Nov 2026 (Deck 1: youngest 40, oldest 69, average 54, 65% women). */
        a: "Our youngest member is 40. Our oldest is 69, so far. Average age 54. About two thirds women. All you need is an open mind.",
      },
      {
        q: "I have an old injury or a health condition. Can I train?",
        /** Agreed FAQ copy (Version C). */
        a: "You fill in a health-history form first. Where it matters, we check with your doctor. Hard is okay. Painful never is.",
      },
      {
        q: "What happens at my first visit?",
        a: todo("answer for the first visit (no agreed FAQ copy yet)"),
      },
    ],
    all: { label: "All questions", href: "/faq" },
  },

  /** The sign-off above the footer: the poem's first and last lines (fixed wording). */
  signOff: ["We get better at what we practice.", "At BigToe, we Practice Possibility."],

  /** The request panel. */
  panel: {
    heading: "Book your first visit",
    fields: {
      name: { label: "Name" },
      mobile: { label: "Mobile number" },
      time: {
        label: "Preferred time",
        options: ["Weekday morning", "Weekday evening", "Weekend"],
      },
    },
    errors: {
      name: "Please add your name.",
      mobileMissing: "Please add your mobile number.",
      mobileInvalid: "That doesn't look like a mobile number.",
      time: "Please choose a time.",
      failed: `Something went wrong and your details weren't sent. Please try again, or email ${facts.email}.`,
    },
    submit: "Book your first visit",
    close: "Close",
    honeypotLabel: "Company",
    thanks: {
      heading: (name: string) => `Thank you, ${name}. We'll confirm your visit on WhatsApp.`,
      formLabel: "Fill in the intake form",
      whatsappLabel: "Message us on WhatsApp",
      whatsappMessage: (name: string) => `Hi BigToe, this is ${name}. I've just asked to book my first visit.`,
    },
  },
} as const;
