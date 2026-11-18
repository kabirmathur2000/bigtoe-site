/**
 * The style tile, round two (/style-tile, 18 Nov 2026). Copy from
 * docs/copy/agreed-copy-2026-11-18.md; facts from `agreed` in facts.ts.
 * Not linked, not in the sitemap, noindex. The live pages are unchanged.
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
  title: "Style tile",
  cta: agreed.cta,

  nav: {
    links: [
      { href: "/method", label: "Method" },
      { href: "/team", label: "Team" },
      { href: "#faq", label: "FAQ" },
    ],
  },

  /** a. A-lead (Light panel). Home 1. */
  lead: {
    headline: { text: "The second half of life should be stronger than the first.", accent: "stronger than the first." } as Accented,
    line: "One-to-one training for life after 40.",
    caption: `${facts.address.short}.`,
    shot: coffeeBar,
    alt: "The BigToe coffee bar: the long wooden table and stools under pendant lamps, the BigToe logo on the wall, the training floor behind",
  },

  /** b. Text screen (Warm panel). Home 2. */
  text: {
    headline: { text: "We train for a sport called life.", accent: "a sport called life." } as Accented,
    lines: ["A suitcase to lift. Unexpected stairs. A trip to say yes to.", "Build the strength for what comes next."],
  },

  /** c. Photo screen (Photo panel, full-bleed). Home 3. */
  photo: {
    headline: { text: "Get stronger. Keep the pizza.", accent: "Keep the pizza." } as Accented,
    line: "A healthier life shouldn't mean giving up the things you enjoy.",
    shot: {
      name: "Members around the social table, talking and laughing (people first, food incidental)",
      desktop: { ratio: "16:9", size: "2880x1620" },
      phone: { ratio: "4:5", size: "1600x2000" },
    } as Shot,
  },

  /** d. Photo screen, split (Light panel). Home 4. */
  coach: {
    headline: { text: "Your coach. Your plan.", accent: "Your plan." } as Accented,
    lines: [
      "A dedicated coach guides you through every session.",
      "Your Reserve Audit sets the starting point.",
      "Your progress shapes what comes next.",
      "Mobility, strength and conditioning for the life you want to lead.",
    ],
    link: { label: "How we train", href: "/method" },
    shot: {
      name: "One coach guiding one member, close: the attention, not the equipment",
      desktop: { ratio: "4:5", size: "1600x2000" },
      phone: { ratio: "4:5", size: "1600x2000" },
    } as Shot,
  },

  /** e. Diagram (Warm panel). Method 1. Example dials, as on the Scoreboard. */
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

  /** f. Member stories (Navy panel). Quotes in content/quotes.ts (drafts). */
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
    previous: "Previous story",
    next: "Next story",
    regionLabel: "Member stories",
  },

  /** g. Invitation (Navy panel, split). Home 6. */
  invitation: {
    headline: { text: "Come and meet us." } as Accented,
    line: "Meet a founder. Have a body scan and light assessment. Stay for coffee and a chat.",
    price: agreed.price,
    free: agreed.firstHourFree,
    guarantee: agreed.guarantee,
    shot: coffeeBar,
  },

  /** h. Questions (Light panel). FAQ 1, 2 and 10 of the agreed copy. */
  faq: {
    label: "Questions",
    items: [
      {
        q: "Who is BigToe for?",
        a: "Men and women in their 40s, 50s, 60s, 70s and beyond. Whether you're new to training, returning after a break or already active, we start with your ability and your goals. There is no one else's pace to keep up with.",
      },
      {
        q: "I have an old injury or a health condition. Can I train?",
        a: "Tell us in your intake form before your first visit, and check any exercise restrictions with your doctor. We already train members taking GLP-1 medication. We'll discuss what's appropriate for you before you begin.",
      },
      {
        q: "What happens at my first visit?",
        a: "You'll meet a founder, have a body scan and a light assessment, and stay for coffee and a chat. It's a chance to talk about your goals and understand how we train. The team will confirm your preferred time.",
      },
    ],
    all: { label: "All questions", href: "/faq" },
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
