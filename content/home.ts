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
