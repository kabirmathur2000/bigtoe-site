/**
 * Method page copy: five chapters, all light. Every line is a deck line,
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
  /** Deck 1 slide 11, REMEMBER, cut. */
  close: "Power goes first, long before size.",
} as const;

/** Chapter 2. Deck 4: slide 16 summary line (cut), slides 6, 7, 10 and 13. */
export const training = {
  /** Deck label, not shown (it shapes the page order): HOW WE TRAIN. */
  headline: "Barefoot, free weights, one supervised hour.",
  lines: [
    "Your foot is built to feel the ground.",
    "No machines.",
  ],
  paths: ["Mobility & Conditioning", "Strength & Conditioning"],
  /** Deck 4 slide 13, "say it to a member". */
  pathsLine: "Neither path is better. We start where you are today.",
  shot: "Bare feet on the training floor, a member mid-lift",
} as const;

/** Chapter 3. Deck 7 slides 1, 5 and 12; the score as a sport (Deck 7 cover). */
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

/** Chapter 5. Approved list: Deck 4 slide 21, Deck 1 slides 18 and 22, Deck 2, Deck 5 slide 17. */
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
      /** "They" turned to the member, kept general (approved). */
      q: "Why so much strength, not cardio?",
      a: ["Most members already walk or do cardio. Strength is what most of us lack."],
    },
    {
      q: "Will I feel out of place?",
      a: ["Introduced on day one. Never a stranger on the floor.", "A team floor where everyone is introduced and looked after."],
    },
    {
      /** Four deck sentences, not joined (Deck 1 slide 18; Deck 2 The Road Trip). */
      q: "I've never enjoyed exercise. Is this for me?",
      a: [
        "Fun is how people stay in the game.",
        "There is no finish line. So the journey has to be fun.",
        "Every hour ends in a clap.",
        "You don't climb alone.",
      ],
    },
    {
      q: "Can I train at home or online?",
      a: [facts.where, "Can't make it? We'll make it 30 minutes at home or online. The week still counts."],
    },
  ],
  sourceLabel: "Source",
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
