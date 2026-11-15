/**
 * Home page copy: six chapters, each opening with a Deck 1 slide label.
 * Every line comes from CLAUDE.md, the guide or the decks, cut but never
 * reworded; facts are imported, never retyped. American spelling.
 */
import { facts, todo } from "./facts";
import { noticed } from "./testimonials";

/** Chapter 1, the hero. Deck 1 slide 3. */
export const hero = {
  label: "THE MAIN POINT",
  headline: "We train for a sport called life.",
  subline: "Most people play it untrained. We train for it.",
  media: {
    shot: "Silent video loop: a member mid-lift with a Sherpa beside them",
    caption: todo("member first name, age. Mid-lift, with their Sherpa."),
  },
} as const;

/** Chapter 2. Deck 1 slide 4, cut. */
export const belief = {
  label: "THE CORE BELIEF",
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
  label: "OUR MISSION",
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
  label: "OUR ANSWER",
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
  /** Source: BigToe word cloud poster, from member testimonials. Largest first. */
  words: [
    "stronger", "motivated", "pushed", "care", "joy", "mobility",
    "family", "noticed", "energy", "passion", "mindset", "honest",
    "personal", "trust", "patient", "compassion", "grounding", "home",
    "rare", "balance", "seen", "sacred", "no injuries", "a way of life",
  ],
  /** docs/copy/testimonials.md, testimonial 2 (the Sherpa who noticed). */
  testimonial: noticed,
  /** Deck 9 slide 13, Jay. */
  close: "No policy produces that. No manual teaches it.",
} as const;

/** Chapter 6. Deck 1 slide 24, then the price and guarantee, then the form. */
export const promise = {
  label: "OUR PROMISE",
  headline: "Look better. Move better. Feel better.",
  rows: [
    { label: "Price", value: facts.price.range, note: facts.price.note },
    { label: "Guarantee", value: `${facts.guarantee}.` },
  ],
} as const;
