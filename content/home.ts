/**
 * Home page copy: six chapters in Deck 1 order (the poem moved to the footer, the Scoreboard in from Method). The deck labels shape the order but are not shown.
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
  /** Shown as a small label: one of the two labels on the site (with IN OUR MEMBERS' WORDS). */
  label: "Our belief",
  headline: facts.heroLine,
  lines: ["The problem isn't your age."],
} as const;

/** Chapter 3 (moved from Method, unchanged). Deck 7 slides 1, 5 and 12; the score as a sport (Deck 7 cover). */
export const scoreboard = {
  /** Deck label, not shown (it shapes the page order): THE SCOREBOARD. */
  headline: "Every sport has a score. This is ours.",
  /** Always shown above the dials, so they never read as a member's results. */
  example: "Example",
  /** Deck 7 slide 5: the four dials, each out of 100. */
  dials: [
    { name: "InBody", value: 78 },
    { name: "Balance & Mobility", value: 42 },
    { name: "Functional Strength", value: 90 },
    { name: "Conditioning", value: 66 },
  ],
  outOf: "out of 100",
  scoreName: "Strength Reserve",
  /** Deck 7 slide 5, THE SCORE. */
  scoreNote: "the average of the four dials",
  /** Deck 7 slide 12, "say it to a member". */
  weakest: "Your Strength Reserve is only as good as your weakest dial. That is where we start.",
} as const;

/**
 * The Practice Possibility poem: the text on the studio wall, shown in the footer.
 * FIXED WORDING. Never edit a character: spelling, capitals and
 * punctuation stay exactly as on the wall. See CLAUDE.md.
 */
export const poem = {
  /** Deck 1 slide 5 label. */
  /** Deck label OUR MISSION; the poem now lives in the footer on every page. */
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

/**
 * Chapter 4, the loop (Deck 5's closed loop, in four steps). Lines as
 * approved: Deck 7 / Deck 0 ("We don't guess. We test."), Deck 5 slide 10
 * (goals agreed, "Signed by both"; "16 targeted sessions"), Deck 1 ("one
 * Sherpa beside you"; "If a client's numbers don't move, the failure is
 * ours", turned to "you").
 */
export const loop = {
  /** Deck label, not shown (it shapes the page order): THE LOOP. */
  steps: [
    { word: "Test", line: "We don\u2019t guess. We test." },
    { word: "Pledge", line: "A goal you chose, signed by both of us." },
    { word: "Train", line: "16 targeted sessions, one Sherpa beside you." },
    { word: "Retest", line: "If your numbers don\u2019t move, the failure is ours." },
  ],
  /** Deck 5 slide 23 ("A client never finishes a programme. They complete a loop."), turned to "you". */
  close: "You never finish a program. You complete a loop.",
  /** Screen-reader name for the diagram. */
  label: "The loop: test, pledge, train, retest",
} as const;

/** The photo break between the light and navy halves; the colour fade happens across it. */
export const photoBreak = {
  shot: "Members and Sherpas at the coffee table after a session",
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
  /** One small line each: the lowest price, then the guarantee. The range is a Method question. */
  price: facts.price.fromLine,
  guarantee: `Guarantee: ${facts.guarantee}.`,
} as const;
