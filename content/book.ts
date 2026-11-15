/**
 * Book page (/book-now) copy. Facts are imported, never retyped.
 */
import { facts, todo } from "./facts";

export const book = {
  /** Deck label, not shown (it shapes the page order): TRAINING ANYWHERE. Headline: Deck 5 slide 17. */
  headline: facts.where,
  addressLabel: "Address",
  hoursLabel: "Hours",
  mapLabel: "Open in Maps",
  mapMissing: todo("map link"),
} as const;
