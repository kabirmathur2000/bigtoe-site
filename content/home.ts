/**
 * Home page copy. Every line comes from CLAUDE.md, the guide or the decks;
 * facts are imported, never retyped.
 */
import { facts, todo } from "./facts";

export const hero = {
  headline: facts.heroLine,
  /** Decisions table, "First step". */
  subline: facts.firstStep.summary,
  media: {
    shot: "Silent video loop: a member mid-lift with a Sherpa beside them",
    caption: todo("member first name, age. Mid-lift, with their Sherpa."),
  },
} as const;

export const problem = {
  /** Deck 1 slide 6 label. */
  label: "THE PROBLEM",
  /** Guide, Home block 2. */
  headline: "The problem isn't your age. It's the narrative.",
  /** Deck 1 slide 3. */
  sport: {
    title: "We train for a sport called life.",
    body: "You play it every day, for decades. No off-season. No retirement. No substitute to send in when you're tired.",
    close: "Most people play it untrained. We train for it.",
  },
  /** Guide, Home block 2 (what fades: muscle, strength and power). */
  fades: "Muscle, strength and power fade quietly. They can be built at any age.",
  photo: {
    shot: "Bare feet on the training floor",
  },
} as const;
