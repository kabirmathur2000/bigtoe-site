/**
 * How we train (anchor `how-we-train`), sections 4 to 8 of the one page
 * (agreed copy, 18 Nov 2026, with the 19 Nov one-page brief).
 */
import type { Accented } from "./site";

export const method = {
  /** 4. The text, then the photo card. */
  coach: {
    headline: { text: "Your coach. Your plan.", accent: "coach. Your plan." } as Accented,
    lines: [
      "A dedicated coach guides you through every session.",
      "Your Reserve Audit sets the starting point.",
      "Your progress shapes what comes next.",
    ],
    after: "Mobility, strength and conditioning for the life you want to lead.",
    shot: "one coach guiding one member: the attention and interaction, not the equipment",
  },

  /** 5. The text together, then the example dials (content/site.ts, `dials`). */
  start: {
    headline: { text: "Know your starting point.", accent: "your starting point." } as Accented,
    line: "The Reserve Audit measures four dials.",
    after: "Your plan starts with the dial that needs the most attention.",
  },

  /** 6. The text together, then three numbered rows (Function style, no cards or icons). */
  build: {
    headline: { text: "Build more than appearance.", accent: "more than appearance." } as Accented,
    after: "Capacity you can use outside the studio.",
    rows: [
      { name: "Muscle.", line: "What you're made of." },
      { name: "Strength.", line: "What you can lift, push and carry." },
      { name: "Power.", line: "How fast you can move when it counts." },
    ],
  },

  /** 7. The text together (the Big Seven included), then the photo card. */
  ground: {
    headline: { text: "Train from the ground up.", accent: "from the ground up." } as Accented,
    line: "Bare feet. Free weights. Attention to movement.",
    teach: "Mastering the Big Seven is what we teach.",
    movements: "Squat. Hinge. Lunge. Push. Pull. Rotate. Walk or run.",
    shot: "bare feet on the training floor",
  },

  /** 8. The text, then the pledge photo card. */
  goals: {
    headline: { text: "Your goals. Our shared commitment.", accent: "Our shared commitment." } as Accented,
    line: "Set goals with your coach, whom we call a Sherpa. Train with their guidance. Review your progress together.",
    shot: "the pledge partnership photo (not the poster; the signed card cropped out, both people's permission)",
  },
} as const;
