/**
 * The Method (Version C, 17 Nov 2026): four screens. 1 to 2 light;
 * 3 to 4 navy.
 */
import { hero } from "./home";

/** Screen 1 (light, photo: the studio floor, reused from Home). */
export const reserve = {
  headline: "The Reserve Score.",
  line: "Most gyms train in the dark. We turn the lights on.",
  note: "Mobility and balance. Strength. Conditioning. Body composition. One number, out of 100.",
  shot: hero.shot,
} as const;

/** Screen 2 (light, no photo). Three lines, one per thing that fades. */
export const fades = {
  headline: "Three things fade with age. We train all three.",
  lines: [
    "Muscle. What you're made of.",
    "Strength. What you can lift, push and carry.",
    "Power. How fast you can move when it counts.",
  ],
} as const;

/** Screen 3 (navy, photo: tight vertical crop). */
export const barefoot = {
  headline: "It all starts with the big toe.",
  line: "Bare feet. Free weights. No machine to hold you up.",
  shot: "A Sherpa's bare feet on the training floor, tight vertical crop",
} as const;

/** Screen 4 (navy): the loop diagram. */
export const how = {
  headline: "How it works.",
  line: "It was never motivation. It was the missing scoreboard.",
  steps: ["Measure", "Train the weakest", "Retest", "Recalibrate"],
  /** Screen-reader name for the diagram. */
  label: "The loop: measure, train the weakest, retest, recalibrate",
} as const;
