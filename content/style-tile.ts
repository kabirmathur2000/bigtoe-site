/**
 * The style tile, round three (/style-tile, 18 Nov 2026). Copy from
 * docs/copy/agreed-copy-2026-11-18.md (with the round-three changes);
 * facts from `agreed` in facts.ts. Not linked, not in the sitemap,
 * noindex. The live pages are unchanged.
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

const coffeeBar: Shot = {
  name: "The studio coffee bar",
  desktop: { ratio: "4:5", size: "1600x2000" },
  phone: { ratio: "4:5", size: "1600x2000" },
};

export const tile = {
  /** The inner-page title pattern, shown at the top of the tile. */
  title: "Style tile",
  back: { label: "← Back to home", href: "/" },
  cta: agreed.cta,

  /** The navigation: the logo on the left, "Menu" on the right, opening a full-screen list. */
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

  /** A-lead (Light panel). Home 1. No button: the floating button carries it. */
  lead: {
    headline: { text: "The second half of life should be stronger than the first.", accent: "stronger than the first." } as Accented,
    line: "One-to-one training for life after 40.",
    caption: `${facts.address.short}.`,
    shot: coffeeBar,
    alt: "The BigToe coffee bar: the long wooden table and stools under pendant lamps, the BigToe logo on the wall, the training floor behind",
  },

  /** b. Inline photo chips (Navy panel). Home 2: a small rounded photo after each phrase. */
  chips: {
    headline: { text: "We train for a sport called life.", accent: "a sport called life." } as Accented,
    phrases: [
      { text: "A suitcase to lift.", shot: "A member lifting a suitcase into a car boot" },
      { text: "Unexpected stairs.", shot: "A member taking a flight of stairs" },
      { text: "A trip to say yes to.", shot: "A member on a trek or a trip" },
    ],
    chip: { ratio: "2:1", size: "480x240" },
    close: "Build the strength for what comes next.",
  },

  /** c. Offset pair (Warm panel). Home 3: the words, then two photos at different sizes, slightly overlapping. */
  offset: {
    headline: { text: "Get stronger. Keep the pizza.", accent: "Keep the pizza." } as Accented,
    line: "A healthier life shouldn't mean giving up the things you enjoy.",
    large: {
      name: "Members around the social table, talking and laughing (people first, food incidental)",
      short: "Members at the social table",
      desktop: { ratio: "3:2", size: "2400x1600" },
      phone: { ratio: "4:3", size: "1600x1200" },
    } as Shot,
    small: {
      name: "Coffee cups on the bar",
      short: "Coffee cups",
      desktop: { ratio: "4:5", size: "1200x1500" },
      phone: { ratio: "4:5", size: "800x1000" },
    } as Shot,
  },

  /** a. Split (Light panel). Home 4, with "Sherpa" in the headline (round three). */
  coach: {
    headline: { text: "Your Sherpa. Your plan.", accent: "Your plan." } as Accented,
    lines: [
      "A dedicated coach guides you through every session.",
      "Your Reserve Audit sets the starting point.",
      "Your progress shapes what comes next.",
      "Mobility, strength and conditioning for the life you want to lead.",
    ],
    link: { label: "How we train →", href: "/method" },
    shot: {
      name: "One Sherpa guiding one member, close: the attention, not the equipment",
      short: "Sherpa guiding a member",
      desktop: { ratio: "4:5", size: "1600x2000" },
      phone: { ratio: "4:5", size: "1600x2000" },
    } as Shot,
  },

  /** d. Diagram beside text (Warm panel). Method 1. Example dials, as on the Scoreboard. */
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

  /** e. Big number (Light panel). From facts. */
  number: {
    figure: facts.coachingHours,
    line: "coaching hours behind every workout template.",
    link: { label: "Meet the team →", href: "/team" },
  },

  /** Member stories (Navy panel), Oura's expandable style. Quotes in content/quotes.ts (drafts). */
  stories: {
    headline: { text: "In our members' words." } as Accented,
    portrait: {
      name: "Member portrait, relaxed, in the studio (same crop and size for every member)",
      short: "Member portrait",
      desktop: { ratio: "4:5", size: "1200x1500" },
      phone: { ratio: "4:5", size: "1200x1500" },
    } as Shot,
    name: todo("first name"),
    age: todo("age"),
    draftLabel: "Draft",
    open: "Read the story",
    close: "Close the story",
    previous: "Previous story",
    next: "Next story",
    regionLabel: "Member stories",
  },

  /** Invitation (Navy panel, split). Home 6. No button; one link to all questions. */
  invitation: {
    headline: { text: "Come and meet us." } as Accented,
    line: "Meet a founder. Have a body scan and light assessment. Stay for coffee and a chat.",
    price: agreed.price,
    free: agreed.firstHourFree,
    guarantee: agreed.guarantee,
    shot: coffeeBar,
    all: { label: "All questions →", href: "/faq" },
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

  /** The tile's footer (no tagline line, no parking line). */
  footer: {
    hours: agreed.hours,
  },
} as const;
