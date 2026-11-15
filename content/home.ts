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
  /** The two core beliefs, exactly as Deck 1 has them (slides 3 and 4). */
  beliefs: {
    sport: "We train for a sport called life.",
    /** Deck 1 slide 3. */
    sportBody: "You play it every day, for decades. No off-season. No retirement. No substitute to send in when you're tired.",
    sportClose: "Most people play it untrained. We train for it.",
    secondHalf: facts.heroLine,
  },
  /** Guide, Home block 2, word for word. */
  fades: "Muscle, strength and power fade quietly; they can be built at any age.",
  photo: {
    shot: "Bare feet on the training floor",
  },
} as const;

/**
 * The Practice Possibility poem: the text on the studio wall.
 * FIXED WORDING. Never edit a character: spelling, capitals and
 * punctuation stay exactly as on the wall. See CLAUDE.md.
 */
export const poem = {
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

export const patterns = {
  /** Guide, Home block 3. */
  label: "FIND YOUR PATTERN",
  headline: "Find your pattern.",
  /**
   * The four personas (Deck 1 slide 19; Deck 3 slide 8 calls them
   * "Pattern"). `need` is the deck's "what they need from us";
   * `how` is a deck line on what BigToe does about it.
   */
  items: [
    {
      id: "never-trained",
      title: "Never trained",
      need: "To feel safe, and win early.",
      /** Deck 4 slide 15. */
      how: "Every member starts where they are today.",
      shot: "Member for the pattern 'Never trained', with their Sherpa",
    },
    {
      id: "life-got-in-the-way",
      title: "Life got in the way",
      need: "Easy timing changes, home or online sessions.",
      /** Deck 5 slide 17, "say it to a member". */
      how: "Can't make it? We'll make it 30 minutes at home or online. The week still counts.",
      shot: "Member for the pattern 'Life got in the way', with their Sherpa",
    },
    {
      id: "train-but-dont-progress",
      title: "Train but don't progress",
      /** Deck 1 slide 28 wording. */
      need: "Progress you can see.",
      /** Deck 5 slide 3. */
      how: "A plan built from test results, and tested again every 16 sessions. Nothing random.",
      shot: "Member for the pattern 'Train but don't progress', with their Sherpa",
    },
    {
      id: "start-and-stop",
      title: "Start and stop",
      /** Deck 1 slide 19. No second line: Deck 1 has only this one. */
      need: "An easy restart, with no blame.",
      shot: "Member for the pattern 'Start and stop', with their Sherpa",
    },
  ],
  /** docs/copy/testimonials.md, testimonial 1. Consent still needed. */
  testimonial: {
    quote:
      "A space where those of us in our 40s, 50s and 60s can genuinely feel pride and joy. I look forward to every session, something I never imagined would happen!",
    name: todo("first name"),
    age: todo("age"),
  },
} as const;

export const firstHour = {
  /** Guide, Home block 4. */
  label: "YOUR FIRST HOUR",
  headline: "Your first hour.",
  steps: [
    {
      id: "visit",
      title: "The first visit is free.",
      /** Guide; Deck 2 slide 14. */
      body: "An hour with a Sherpa. A trainer gives orders. A Sherpa walks beside you.",
      shot: "The greeting at the door: a Sherpa welcoming a new member",
    },
    {
      id: "audit",
      title: "Then the Reserve Audit.",
      meta: facts.reserveAudit.first,
      /** Guide (about 60 minutes); Deck 7 slide 5. */
      body: "About 60 minutes. Four dials:",
      dials: ["Body composition", "Balance and mobility", "Functional strength", "Conditioning"],
      close: "Every test here is a job your body does in daily life.",
      shot: "The audit: the body scan, a Sherpa beside the member",
    },
    {
      id: "score",
      title: "You leave with your Strength Reserve Score.",
      /** Deck 7 slides 2 and 12. */
      body: "Every sport has a score. This is ours. Your Strength Reserve is only as good as your weakest dial. That is where we start.",
      shot: "One audit test in progress, the Sherpa within reach",
    },
    {
      id: "coffee",
      title: "Then coffee.",
      /** Deck 1 slide 18. */
      body: "A table, a seat, a coffee, and people who notice when you're gone.",
      shot: "Coffee being poured at the social table after the audit",
    },
  ],
  /** Deck 2 slide 10. */
  stay: {
    headline: "Seen. Belong. Progress.",
    items: [
      { title: "Seen", body: "Every member matters as a person." },
      { title: "Belong", body: "The floor is a team." },
      { title: "Progress", body: "You can see yourself getting better." },
    ],
  },
  /** docs/copy/testimonials.md, testimonial 2. Consent still needed. */
  testimonial: {
    quote:
      "Once I was absentmindedly rubbing my arm after an exercise, and he picked up on it instantly, checked on me throughout the class, and adjusted the workout. It's that level of attention that makes you feel seen.",
    name: todo("first name"),
    age: todo("age"),
  },
} as const;

/** Word cloud band after block 4. Words supplied by Kabir, largest first. */
export const memberWords = {
  label: "IN OUR MEMBERS' WORDS",
  words: [
    "stronger", "motivated", "pushed", "care", "joy", "mobility",
    "family", "noticed", "energy", "passion", "mindset", "honest",
    "personal", "trust", "patient", "compassion", "grounding", "home",
    "rare", "balance", "seen", "sacred", "no injuries", "a way of life",
  ],
  /** Deck 9 slide 13, Jay. */
  close: "No policy produces that. No manual teaches it.",
} as const;

export const investment = {
  /** Guide, Home block 5. */
  label: "INVESTMENT",
  headline: "The first step is free.",
  rows: [
    { label: "First visit", value: facts.firstStep.summary },
    { label: "Price", value: facts.price.range, note: facts.price.note },
    { label: "Guarantee", value: `${facts.guarantee}.` },
  ],
} as const;
