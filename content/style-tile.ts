/**
 * The style tile, round five (/style-tile, 18 Nov 2026). Copy from
 * docs/copy/agreed-copy-2026-11-18.md and the round-four brief (where the
 * brief gives a line, it wins); facts from `agreed` in facts.ts. Not
 * linked, not in the sitemap, noindex. The live pages are unchanged.
 */
import { agreed, facts, todo } from "./facts";

/** A photo's two shapes: what to supply for desktop and for phones. */
export type Shot = {
  name: string;
  /** A short name for small placeholders on phones. */
  short?: string;
  desktop: { ratio: string; size: string };
  phone: { ratio: string; size: string };
};

/** How a placeholder labels itself: the shot name, then each shape and the pixel size to supply. */
export const shotLabel = (s: Shot) =>
  `${s.name} · desktop ${s.desktop.ratio}, ${s.desktop.size} · phone ${s.phone.ratio}, ${s.phone.size}`;

/** A headline with at most one phrase in terracotta (`accent` must appear in `text`). */
export type Accented = { text: string; accent?: string };

export const tile = {
  /** The inner-page title pattern, shown at the top of the tile. */
  title: "Style tile",
  back: { label: "← Back to home", href: "/" },
  cta: agreed.cta,
  /** The header pill below 380px screen width. */
  ctaShort: "Book a visit",

  /** The header: the logo, the book pill and a menu icon (labelled "Menu") opening a full-screen navy overlay. */
  menu: {
    open: "Menu",
    close: "Close",
    label: "Menu",
    links: [
      { href: "/", label: "Home" },
      { href: "/method", label: "How we train" },
      { href: "/team", label: "Team" },
      { href: "/faq", label: "Questions" },
    ],
  },

  /** a. Hero: words on navy, then the coffee bar photo card, its caption below. */
  hero: {
    headline: { text: "The second half of life should be stronger than the first.", accent: "stronger than the first" } as Accented,
    line: "One-to-one coaching for life after 40.",
    caption: `${facts.address.short}.`,
    shot: {
      name: "The studio coffee bar",
      desktop: { ratio: "16:9", size: "2880x1620" },
      phone: { ratio: "4:5", size: "1600x2000" },
    } as Shot,
    alt: "The BigToe coffee bar: the long wooden table and stools under pendant lamps, the BigToe logo on the wall, the training floor behind",
  },

  /** b. A pause: words only, no card. */
  pause: {
    headline: { text: "We train for a sport called life.", accent: "a sport called life." } as Accented,
    lines: ["A suitcase to lift. Unexpected stairs. A trip to say yes to.", "Build the strength for what comes next."],
  },

  /** c. Words on navy, then a Light card holding one photo. */
  coach: {
    headline: { text: "Your Sherpa. Your plan.", accent: "Your plan." } as Accented,
    line: "A dedicated coach for every session. Your Reserve Audit sets the starting point; your progress shapes the next step.",
    link: { label: "How we train →", href: "/method" },
    shot: {
      name: "One Sherpa guiding one member, close: the attention, not the equipment",
      short: "Sherpa guiding a member",
      desktop: { ratio: "3:2", size: "2400x1600" },
      phone: { ratio: "4:5", size: "1600x2000" },
    } as Shot,
  },

  /** d. Words on navy, then a Warm card with the example ring dials. */
  dials: {
    headline: { text: "Know your starting point.", accent: "starting point." } as Accented,
    line: "Your plan starts with the dial that needs the most attention.",
    example: "Example",
    outOf: "out of 100",
    items: [
      { name: "Body composition", value: 78 },
      { name: "Balance and mobility", value: 42 },
      { name: "Functional strength", value: 90 },
      { name: "Conditioning", value: 66 },
    ],
  },

  /** e. Words on navy, then one photo card. */
  social: {
    headline: { text: "Get stronger. Keep the pizza.", accent: "Keep the pizza." } as Accented,
    line: "A healthier life shouldn't mean giving up the things you enjoy.",
    shot: {
      name: "Members around the social table, talking and laughing (people first, food incidental)",
      short: "Members at the social table",
      desktop: { ratio: "16:9", size: "2880x1620" },
      phone: { ratio: "4:5", size: "1600x2000" },
    } as Shot,
  },

  /** f. Member stories, stacked: one photo card per member. Quotes in content/quotes.ts (drafts). */
  stories: {
    headline: { text: "In our members' words." } as Accented,
    portrait: {
      name: "Member portrait, relaxed, in the studio (same crop and size for every member)",
      short: "Member portrait",
      desktop: { ratio: "16:9", size: "2880x1620" },
      phone: { ratio: "4:5", size: "1200x1500" },
    } as Shot,
    name: todo("first name"),
    age: todo("age"),
    draftLabel: "Draft",
    /** Screen-reader name for the story sequence. */
    regionLabel: "Member stories",
  },

  /** g. Words on navy, then a Light card with the big number. */
  team: {
    headline: { text: "The four of us." } as Accented,
    line: "We met at Decode, Jeevan's gym.",
    figure: facts.coachingHours,
    figureLine: "coaching hours behind every workout template.",
    link: { label: "Meet the team →", href: "/team" },
  },

  /** h. One line on navy. */
  questions: { lead: "Questions?", link: { label: "All answers →", href: "/faq" } },

  /** i. The ending, revealed beneath the page: the darkened coffee bar photo, the invitation, the footer. */
  ending: {
    headline: { text: "Come and meet us." } as Accented,
    line: "Meet a founder, take a body scan and a light assessment, then stay for coffee.",
    price: agreed.price,
    free: agreed.firstHourFree,
    guarantee: agreed.guarantee,
    hours: agreed.hours,
    alt: "The BigToe coffee bar, darkened",
  },

  /** The request panel. */
  panel: {
    heading: agreed.cta,
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
    submit: agreed.cta,
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
