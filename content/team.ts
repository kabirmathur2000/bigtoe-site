/**
 * Team page copy: a short story in four chapters. Every line is quoted from
 * docs/copy or Deck 1; nothing is reworded. American spelling.
 */
import { todo } from "./facts";
import { poem } from "./home";

/** Chapter 1. docs/copy/jay-story.md, word for word. Label: Deck 1 slide 2. */
export const story = {
  /** Deck label, not shown (it shapes the page order): IN JAY'S WORDS. */
  headline: "Why we built this",
  paragraphs: [
    "In 2019, I injured my back at a gym. It put me flat for six months. Lying there, I asked what I had actually built. Wealth: full. Health: low. Time to enjoy it: gone.",
    "Then a harder thought: what would my son's life be like if he had to look after me?",
    "You can't buy a new body. Biology doesn't accept cash. Longer is what everybody asks for. Stronger is what you build. That's why we built BigToe.",
  ],
  signature: "Jay, 59. Co-founder.",
  /** Shown in Bold, everything else unchanged (the one exception to Bold-for-labels). */
  bold: ["at a gym", "if he had to look after me", "Stronger is what you build."],
  /** CLAUDE.md, still open. */
  todo: todo("Jay's son to see this story before it goes public"),
  shot: "Portrait of Jay on the training floor",
} as const;

/** Chapter 2. Deck 1 slide 25. */
export const sherpas = {
  /** Deck label, not shown (it shapes the page order): WHO CARRIES IT FORWARD. */
  headline: "Behind each face is a real person.",
  todo: todo("confirm Sherpa name spellings"),
  /**
   * Saurav's Deck 1 line ("Quit drinking at 22 and rebuilt his life through
   * training.") is held until he agrees to it going public: name and
   * portrait only, with a TODO.
   */
  people: [
    { name: "Himanshu", line: "Obese and bullied as a kid. Fitness gave him his confidence.", todo: null },
    { name: "Saurav", line: null, todo: todo("Saurav to agree to his line going public") },
    { name: "Sumit", line: "Cycled 140 km in about 8 hours. Fitness became his lifestyle.", todo: null },
    { name: "Tanuj", line: "A frail 47 kg kid who fought his way to a muscular 76 kg.", todo: null },
  ].map((p) => ({
    ...p,
    line: p.line as string | null,
    todo: p.todo as string | null,
    shot: `Portrait of ${p.name}, Sherpa, on the training floor`,
  })),
} as const;

/**
 * The founders' note: docs/copy/founders-note.md, approved text, word for
 * word, shown in a full-screen overlay opened from the founders screen.
 * Signed with the four founders' names (Deck 1 slide 8). One-line stories
 * come from docs/copy/founder-lines.md only once marked approved: none yet.
 */
export const foundersNote = {
  /** Deck label, not shown (it shapes the page order): NOTE FROM THE FOUNDERS. */
  paragraphs: [
    "We are four founders, aged 41 to 59. At this age, society expects you to start \"slowing down\", accepting the nagging back, the fading energy, or the shrinking horizon as a natural tax on aging. We chose a different path: the work of staying capable.",
    "Whether you are navigating a wake-up call or protecting the high-functioning life you love, the goal is the same. You don\u2019t wait for a fire to buy insurance; you build the foundation now so your future remains open. We build a Strength Reserve. That extra \"gas in the tank\" ensures you can lift a heavy suitcase, play three hours of pickleball, or climb Kilimanjaro at 80.",
    "Stop surviving your schedule. Start practicing possibility.",
  ],
  /** Kept here for Jay; not shown on the page. */
  reserveTodo: todo("Jay to confirm \"Kilimanjaro at 80\""),
  /** Deck 1 slide 8. `line` only when founder-lines.md marks it approved. */
  founders: [
    { name: "Jay Singh", age: 59, line: null },
    { name: "Jeevan Aujla", age: 41, line: null },
    { name: "Seema Jindal", age: 58, line: null },
    { name: "Rodrigo P\u00e9rez", age: 51, line: null },
  ].map((f) => ({ ...f, line: f.line as string | null, shot: `Portrait of ${f.name.split(" ")[0]}, co-founder, on the training floor` })),
} as const;

/**
 * The founders, two screens after Jay's words (each a glide stop):
 * Rooted. Real. Rebellious., then the four founders under the poem's last
 * line, with a button that opens the founders' note in an overlay.
 */
export const founders = {
  /** "Rooted. Real. Rebellious." with Deck 1 slide 7's definitions, approved. */
  values: [
    { name: "Rooted", line: "Fitness is built on fundamentals, not trends." },
    { name: "Real", line: "How we show up: honest, present, without pretense." },
    {
      name: "Rebellious",
      line: "We refuse to accept that decline is inevitable, or that people in their 40s, 50s and 60s have had their moment.",
    },
  ],
  /** The poem's last line (studio wall), never retyped. */
  line: poem.stanzas[poem.stanzas.length - 1][0],
  readNote: "Read the founders\u2019 note",
  /** Interface wording: the overlay's accessible name and its close button. */
  noteLabel: "The founders\u2019 note",
  close: "Close",
} as const;

/** Chapter 4. Deck 1 slide 18, cut, never reworded. */
export const social = {
  /** Deck label, not shown (it shapes the page order): THE SOCIAL SPACE. */
  headline: "Fun is how people stay in the game.",
  body: "BigToe is life in miniature: a table, a seat, a coffee, and people who notice when you’re gone. Every quarter we hold a Pizza & Beer Party. Every hour ends in a clap.",
  close: "You don’t climb alone.",
  shots: [
    "Coffee being poured at the social table",
    "The clap at the end of the hour",
    "The founders together at the coffee table",
  ],
} as const;
