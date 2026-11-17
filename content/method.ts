/**
 * The Method: four screens. Wording as approved in the final plan
 * (17 Nov 2026). Photos of the space and the Sherpas only.
 */

/** Screen 1 (light, photo of the space). */
export const reserve = {
  headline: "The Strength Reserve.",
  line: "More strength than your day demands.",
  shot: "The training floor, empty, early morning",
} as const;

/** Screen 2 (light, no visual). Deck 1 slides 10 to 11. */
export const fades = {
  headline: "What fades.",
  line: "Muscle. Strength. Power.",
} as const;

/** Screen 3 (navy, photo of the Sherpas). The three pillars (decisions table). */
export const train = {
  headline: "What we train.",
  line: "Mobility and balance. Strength. Conditioning.",
  shot: "A Sherpa coaching a member on the training floor",
} as const;

/** Screen 4 (navy): the loop diagram, then the promise (Deck 1, turned to "you"). */
export const promise = {
  headline: "What we promise.",
  steps: ["Measure", "Train the weakest", "Retest", "Recalibrate"],
  /** Screen-reader name for the diagram. */
  label: "The loop: measure, train the weakest, retest, recalibrate",
  line: "If your numbers don’t move, the failure is ours.",
} as const;
