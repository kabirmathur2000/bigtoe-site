/**
 * Method page copy. Every line comes from CLAUDE.md, the guide or the
 * decks. The page itself is planned in the next prompt.
 */

export const patterns = {
  /** Guide, Find Your Pattern (moved from Home to Method). */
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
} as const;
