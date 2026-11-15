/**
 * Home page copy: six chapters in Deck 1 order. The deck labels shape the order but are not shown.
 * Every line comes from CLAUDE.md, the guide or the decks, cut but never
 * reworded; facts are imported, never retyped. American spelling.
 */
import { facts, todo } from "./facts";

/** Chapter 1, the hero. Deck 1 slide 3. */
export const hero = {
  /** Deck label, not shown (it shapes the page order): THE MAIN POINT. */
  headline: "We train for a sport called life.",
  subline: "Most people play it untrained. We train for it.",
  media: {
    shot: "Silent video loop: a member mid-lift with a Sherpa beside them",
    caption: todo("member first name, age. Mid-lift, with their Sherpa."),
  },
} as const;

/** Chapter 2. Deck 1 slide 4, cut. */
export const belief = {
  /** Deck label, not shown (it shapes the page order): THE CORE BELIEF. */
  headline: facts.heroLine,
  lines: ["The problem isn't your age.", "Capability is built at any age, not spent."],
} as const;

/**
 * Chapter 3. The Practice Possibility poem: the text on the studio wall.
 * FIXED WORDING. Never edit a character: spelling, capitals and
 * punctuation stay exactly as on the wall. See CLAUDE.md.
 */
export const poem = {
  /** Deck 1 slide 5 label. */
  /** Deck label, not shown (it shapes the page order): OUR MISSION. */
  stanzas: [
    ["We get better at what we practice."],
    [
      "If we practice hesitation, we get better at it.",
      "If we practice fear, we get better at it.",
      "If we practice movement, we get better at it.",
      "People practice decline without realizing it.",
    ],
    ["At BigToe, we Practice Possibility."],
  ],
} as const;

/** Chapter 4. Deck 1 slide 15, then the guide's first steps. */
export const answer = {
  /** Deck label, not shown (it shapes the page order): OUR ANSWER. */
  term: "Strength Reserve",
  /** Deck 1 slide 15. */
  definition: "The capacity you build above what daily life asks of you.",
  steps: [
    {
      id: "visit",
      /** Guide, Home block 4. */
      title: "The first visit is free.",
      body: "An hour with a Sherpa.",
    },
    {
      id: "audit",
      /** Guide, Home block 4, cut. */
      title: "Then the Reserve Audit.",
      meta: facts.reserveAudit.first,
      body: "About 60 minutes. Four dials. You leave with your Strength Reserve Score.",
    },
    {
      id: "loop",
      /** Guide, Method ("Test, train, retest"); Deck 5 slide 3, cut. */
      title: "Test, train, retest.",
      body: "A plan built from test results, and tested again every 16 sessions.",
    },
  ],
  shot: "The audit: the body scan, a Sherpa beside the member",
} as const;

/** Chapter 5. */
export const memberWords = {
  label: "IN OUR MEMBERS' WORDS",
  /**
   * The BigToe word cloud poster, from member testimonials, in the order the
   * words appear: smallest first, largest last. `size` and `key` (terracotta)
   * match the poster.
   */
  words: [
    { word: "a way of life", size: "small" },
    { word: "no injuries", size: "small" },
    { word: "balance", size: "small" },
    { word: "seen", size: "small" },
    { word: "sacred", size: "small", key: true },
    { word: "grounding", size: "small", key: true },
    { word: "passion", size: "medium", key: true },
    { word: "mindset", size: "medium" },
    { word: "honest", size: "medium" },
    { word: "trust", size: "medium" },
    { word: "patient", size: "medium" },
    { word: "rare", size: "medium" },
    { word: "home", size: "medium" },
    { word: "compassion", size: "medium" },
    { word: "motivated", size: "large", key: true },
    { word: "pushed", size: "large", key: true },
    { word: "joy", size: "large", key: true },
    { word: "care", size: "large", key: true },
    { word: "family", size: "large" },
    { word: "mobility", size: "large", key: true },
    { word: "noticed", size: "large" },
    { word: "energy", size: "large" },
    { word: "personal", size: "large" },
    { word: "stronger", size: "largest" },
  ] as { word: string; size: "small" | "medium" | "large" | "largest"; key?: boolean }[],
  /** Deck 9 slide 13, Jay. Fades in once every word is in. */
  close: "No policy produces that. No manual teaches it.",
} as const;

/** Chapter 6. Deck 1 slide 24, then the price and guarantee, then the form. */
export const promise = {
  /** Deck label, not shown (it shapes the page order): OUR PROMISE. */
  headline: "Look better. Move better. Feel better.",
  rows: [
    { label: "Price", value: facts.price.range, note: facts.price.note },
    { label: "Guarantee", value: `${facts.guarantee}.` },
  ],
} as const;
