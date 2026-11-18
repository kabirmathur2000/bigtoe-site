/**
 * The style tile, round six (/style-tile, 18 Nov 2026): ten screens after
 * ouraring.com and functionhealth.com, in BigToe's brand. Copy from
 * docs/copy/agreed-copy-2026-11-18.md and the round-six brief (where the
 * brief gives a line, it wins); facts from `agreed` in facts.ts. Lines
 * marked "proposed" are not in the agreed copy and need approval. Not
 * linked, not in the sitemap, noindex. The live pages are unchanged.
 */
import { agreed, facts, todo } from "./facts";

/** A headline with at most one phrase in terracotta (`accent` must appear in `text`). */
export type Accented = { text: string; accent?: string };

export type TrainIcon = "balance" | "strength" | "conditioning" | "body";
export type StepIcon = "sherpa" | "audit" | "plan" | "progress";

export const tile = {
  title: "Style tile",
  /** The inner-page pattern (Method, Team, FAQ): a page title, then this link. */
  back: { label: "← Back to home", href: "/" },
  cta: agreed.cta,
  /** The header pill below 380px screen width. */
  ctaShort: "Book a visit",

  /** The header: the logo, the book pill and a menu icon (labelled "Menu") opening a full-screen overlay. */
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

  /** Every photo slot uses the coffee bar photo until the shoot, cropped per slot. */
  photoAlt: "The BigToe coffee bar: the long wooden table and stools under pendant lamps, the training floor behind",

  /** 1. Hero, after Function's "Check your health.": a full-screen photo. */
  hero: {
    place: facts.address.short,
    headline: { text: "The second half of life should be stronger than the first.", accent: "stronger than the first" } as Accented,
    line: "One-to-one coaching for life after 40.",
  },

  /** 2. Why, after Oura's "Understand your body. Own your health.": text only, centred. */
  why: {
    headline: { text: "We train for a sport called life." } as Accented,
    line: "A suitcase to lift. Unexpected stairs. A trip to say yes to.",
    links: [
      { label: "How we train", href: "/method" },
      { label: "Meet the team", href: "/team" },
    ],
  },

  /** 3. What we train, after Oura's card row. `line` sits on the photo (proposed); `more` is revealed by the plus. */
  train: {
    headline: { text: "What we train." } as Accented,
    previous: "Previous",
    next: "Next",
    moreLabel: (name: string) => `More about ${name}`,
    cards: [
      { name: "Mobility and balance", icon: "balance", line: "Move well. Stay steady.", more: todo("one sentence on mobility and balance"), pos: "18% 50%" },
      { name: "Strength", icon: "strength", line: "Bare feet. Free weights.", more: "What you can lift, push and carry.", pos: "48% 50%" },
      { name: "Conditioning", icon: "conditioning", line: "Keep going for longer.", more: todo("one sentence on conditioning"), pos: "72% 55%" },
      { name: "Body composition", icon: "body", line: "Muscle, measured.", more: "What you're made of.", pos: "90% 45%" },
    ] as { name: string; icon: TrainIcon; line: string; more: string; pos: string }[],
  },

  /** 4. Your first hour, after Function's "Testing is easy" steps. */
  firstHour: {
    headline: { text: "Your first hour is free." } as Accented,
    steps: [
      { title: "Meet a founder.", line: "A chance to talk about your goals and understand how we train." },
      { title: "A body scan and a light assessment.", line: todo("one sentence on the scan and assessment") },
      { title: "Coffee and a chat about what's next.", line: todo("one sentence on the chat") },
    ],
  },

  /** 5. Know your starting point, after Function's biomarker range card. */
  start: {
    headline: { text: "Know your starting point.", accent: "starting point." } as Accented,
    line: "Your Reserve Audit measures four dials. Your plan starts with the one that needs the most attention.",
    example: "Example",
    dial: "Balance and mobility",
    inRange: "In range",
    belowRange: "Below range",
    first: "First visit",
    retest: "Retest",
    chartLabel: "Example chart: balance and mobility, below range at the first visit and in range at the retest.",
  },

  /** 6. Your Sherpa, after Function's "Next Steps" glass panel. */
  sherpa: {
    headline: { text: "Your Sherpa. Your plan.", accent: "Your plan." } as Accented,
    rows: [
      { icon: "sherpa", label: "Your Sherpa", line: "A dedicated coach for every session" },
      { icon: "audit", label: "Your Reserve Audit", line: "Sets the starting point" },
      { icon: "plan", label: "Your plan", line: "Built from your dials" },
      { icon: "progress", label: "Your progress", line: "Shapes what comes next" },
    ] as { icon: StepIcon; label: string; line: string }[],
  },

  /** 7. Members' words, after Oura's quote cards. Quotes in content/quotes.ts (drafts). */
  members: {
    headline: { text: "In our members' words." } as Accented,
    name: todo("first name"),
    age: todo("age"),
    draftLabel: "Draft",
  },

  /** 8. What's included, the shape of Function's pricing card, no price. */
  included: {
    headline: { text: "Everything, one-to-one." } as Accented,
    items: [
      agreed.firstHourFree.replace(/\.$/, ""),
      "60-minute sessions, one-to-one with your Sherpa",
      "Two to four sessions a week, by your goal",
      "Studio, home or online",
      "Six sessions in three weeks, or your money back",
    ],
  },

  /** 9. Questions, after Function's FAQ: one open at a time. */
  questions: {
    headline: { text: "Questions." } as Accented,
    items: [
      {
        q: "Who is BigToe for?",
        a: "Men and women in their 40s, 50s, 60s, 70s and beyond. Whether you're new to training, returning after a break or already active, we start with your ability and your goals. There is no one else's pace to keep up with.",
      },
      {
        q: "I have an old injury or a health condition. Can I train?",
        a: "Tell us in your intake form before your first visit, and check any exercise restrictions with your doctor. We already train members taking GLP-1 medication. We'll discuss what's appropriate for you before you begin.",
      },
      { q: "What does it cost?", a: `${agreed.price} ${agreed.firstHourFree}` },
    ],
    all: { label: "See all questions →", href: "/faq" },
  },

  /** 10. Ending, after Function's closing: two lines, the button, the footer. */
  ending: {
    headline: { text: "Come and meet us. Your first hour is free.", accent: "Your first hour is free." } as Accented,
    hours: agreed.hours,
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
