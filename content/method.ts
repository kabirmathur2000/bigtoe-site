/**
 * Method page copy: five chapters (three light, then navy). Every line is a deck line,
 * cut but never reworded ("they" may become "you"; American spelling).
 */

import { facts } from "./facts";

/** Chapter 1. Deck 1 slide 11 (the light-bulb picture from slide 10). */
export const fades = {
  /** Deck label, not shown (it shapes the page order): WHAT FADES. */
  headline: "Three things fade with age. We train all three.",
  bulbs: [
    { name: "Muscle", line: "The size of the bulb." },
    { name: "Strength", line: "How bright the bulb burns." },
    { name: "Power", line: "How fast the switch works." },
  ],
} as const;

/** Chapter 2. Deck 4 slides 8 and 9; Deck 1 ("If a member asks"). */
export const barefoot = {
  /** Deck label, not shown (it shapes the page order): UNDER THEIR FEET. */
  /** Deck 1, "If a member asks"; Deck 4 slide 8 heading. */
  headline: "It all starts with the big toe.",
  /** Deck 4 slide 9, word for word. */
  weights: "Free weights, not fixed machines.",
  shot: "Bare feet on the training floor, a member mid-lift",
} as const;

/**
 * Chapter 3. Deck 4 slide 13 ("say it to a member"), then slide 10, "All
 * three, supervised, in one session": the minutes of each path's hour.
 */
export const paths = {
  /** Deck label, not shown (it shapes the page order): THE HOUR. */
  headline: "Neither path is better. We start where you are today.",
  hour: facts.session.length,
  /** Deck 4 slide 10. Each path's minutes add up to the hour. */
  bars: [
    {
      name: "Strength & Conditioning",
      parts: [
        { name: "Mobility", minutes: 10 },
        { name: "Strength", minutes: 40 },
        { name: "Cardio", minutes: 10 },
      ],
    },
    {
      name: "Mobility & Conditioning",
      parts: [
        { name: "Mobility", minutes: 30 },
        { name: "Strength", minutes: 25 },
        { name: "Cardio", minutes: 5 },
      ],
    },
  ],
  minutes: (n: number) => `${n} min`,
} as const;

/** Chapter 5. Approved list (plus the price question): Deck 4 slide 21, Deck 1 slides 18 and 22, Deck 2, Deck 5 slide 17. */
export const questions = {
  /** Deck label, not shown (it shapes the page order): QUESTIONS. */
  items: [
    {
      q: "Only twice a week? Will I see results?",
      a: ["Yes. Every session packs strength, mobility and cardio into one hour, so two is enough to keep muscle and strength, and can grow them. Three is better."],
    },
    {
      /** "at my age" dropped from the question: never "at your age". */
      q: "Isn't heavy lifting risky?",
      a: [
        "Weak muscles and falls are the bigger risk. In a trial of 101 women around 65 with low bone mass, screened and supervised heavy lifting twice a week built bone, with no fractures.",
      ],
      /** Deck 4 slide 5 cites it; confirmed as the trial described. */
      source: { text: "Watson et al, J Bone Miner Res 2018", href: "https://doi.org/10.1002/jbmr.3284" },
    },
    {
      q: "Will I feel out of place?",
      a: ["Introduced on day one. Never a stranger on the floor."],
    },
    {
      /** Deck 2 (The Road Trip) and Deck 1 slide 18, as approved. */
      q: "I've never enjoyed exercise. Is this for me?",
      a: ["There is no finish line. So the journey has to be fun. You don't climb alone."],
    },
    {
      q: "Can I train at home or online?",
      a: [facts.where],
    },
    {
      /** Decisions table: price and guarantee, from facts. */
      q: "What does it cost?",
      a: [`${facts.price.range}, ${facts.price.note}.`, `${facts.guarantee}.`],
    },
  ],
  sourceLabel: "Source",
} as const;

/** The photo break at the colour change (guide shot list: each Sherpa coaching). */
export const photoBreak = {
  shot: "A Sherpa coaching a member on the training floor",
} as const;

export const patterns = {
  /** Guide, Find Your Pattern (moved from Home to Method). */
  /** Deck label, not shown (it shapes the page order): WHO WE SERVE. */
  headline: "Find your pattern.",
  /**
   * The four personas (Deck 1 slide 19; Deck 3 slide 8 calls them
   * "Pattern"). `need` is the deck's "what they need from us", the
   * only line on each card.
   */
  items: [
    {
      id: "never-trained",
      title: "Never trained",
      need: "To feel safe, and win early.",
      shot: "Member for the pattern 'Never trained', with their Sherpa",
    },
    {
      id: "life-got-in-the-way",
      title: "Life got in the way",
      need: "Easy timing changes, home or online sessions.",
      shot: "Member for the pattern 'Life got in the way', with their Sherpa",
    },
    {
      id: "train-but-dont-progress",
      title: "Train but don't progress",
      /** Deck 1 slide 28 wording. */
      need: "Progress you can see.",
      shot: "Member for the pattern 'Train but don't progress', with their Sherpa",
    },
    {
      id: "start-and-stop",
      title: "Start and stop",
      /** Deck 1 slide 19. */
      need: "An easy restart, with no blame.",
      shot: "Member for the pattern 'Start and stop', with their Sherpa",
    },
  ],
} as const;
