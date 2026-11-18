/** Method, "How we train" (agreed copy, 18 Nov 2026, with the 18 Nov build brief). */
import type { Accented } from "./site";

export type MethodIcon = "muscle" | "strength" | "power";

export const method = {
  title: "How we train",

  /** 1. The four dials, with the example numbers from Home. */
  start: {
    headline: { text: "Know your starting point.", accent: "starting point." } as Accented,
    line: "The Reserve Audit measures four dials.",
    after: "Your plan starts with the dial that needs the most attention.",
  },

  /** 2. Three icon-and-text blocks. */
  build: {
    headline: { text: "Build more than appearance." } as Accented,
    blocks: [
      { icon: "muscle", name: "Muscle.", line: "What you're made of." },
      { icon: "strength", name: "Strength.", line: "What you can lift, push and carry." },
      { icon: "power", name: "Power.", line: "How fast you can move when it counts." },
    ] as { icon: MethodIcon; name: string; line: string }[],
    after: "Capacity you can use outside the studio.",
  },

  /** 3. The photo, then the Big Seven as clean type. */
  ground: {
    headline: { text: "Train from the ground up.", accent: "ground up." } as Accented,
    line: "Bare feet. Free weights. Attention to movement.",
    shot: "bare feet on the training floor",
    movements: ["Squat.", "Hinge.", "Lunge.", "Push.", "Pull.", "Rotate.", "Walk or run."],
  },

  /** 4. The pledge photo, then the button. */
  goals: {
    headline: { text: "Your goals. Our shared commitment." } as Accented,
    line: "Set goals with your coach, whom we call a Sherpa. Train with their guidance. Review your progress together.",
    shot: "the pledge partnership photo (not the poster; the signed card cropped out, both people's permission)",
  },
} as const;
