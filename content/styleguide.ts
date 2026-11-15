/**
 * Wording for the internal /styleguide page. Sample lines are taken from the
 * decks and the guide so type is judged on real copy.
 */
import { facts } from "./facts";

export const styleguide = {
  title: "Styleguide",
  intro: "Foundation only: colors, type, buttons, photographs and motion. Grey boxes stand in for the shoot.",

  sections: {
    colour: "Color",
    type: "Typography",
    buttons: "Buttons",
    photo: "Photograph with caption",
    motion: "Motion",
  },

  colours: [
    { name: "Off-white", token: "offwhite", hex: "#F0EEEB", share: "About 70%. The page." },
    { name: "Navy", token: "navy", hex: "#0A212D", share: "About 20%. Text, and one or two full sections." },
    { name: "Terracotta", token: "terracotta", hex: "#D4644D", share: "About 10%. The button and one accent per screen." },
  ],

  typeSamples: {
    label: "THE CORE BELIEF",
    display: facts.heroLine,
    h1: "We train for a sport called life.",
    h2: "Every sport has a score. This is ours.",
    h3: "Neither path is better. We start where you are today.",
    bodyLg:
      "You play it every day, for decades. No off-season. No retirement. No substitute to send in when you're tired.",
    body:
      "Your foot is built to feel the ground. Barefoot, it gets strong again, and you lift from a solid base. A machine moves you one way. Free weights let your body find its own way, and that is how real life works.",
    caption: "Caption: first name, age, and what the photo shows.",
  },

  typeTokens: ["label", "display", "h1", "h2", "h3", "body-lg", "body", "caption"],

  buttons: {
    outline: "Method",
    outlineLight: "Team",
    note: "Every booking button uses the same label from facts.ctaLabel.",
  },

  photo: {
    shot: "A member mid-lift with a Sherpa beside them, warm natural light",
    caption: "TODO: first name, age. Mid-lift with their Sherpa.",
  },

  motion: {
    reveal: {
      title: "Reveal",
      note: "Each line rises about 20px and fades in over 0.7 seconds, one after another.",
      lines: [
        "The problem isn't your age.",
        "It's the narrative.",
        "We train for a sport called life.",
      ],
    },
    imageReveal: {
      title: "ImageReveal",
      note: "A soft wipe, then the photograph settles from a very slight zoom. Hover zooms about 3%.",
      shotWide: "Bare feet on the training floor",
      shotHalf: "Coffee being poured at the social table",
    },
    tone: {
      title: "Section color cross-fade",
      note: "Scroll into the navy section: the page color cross-fades instead of cutting hard.",
      navyLine: "Seen. Belong. Progress.",
    },
    page: {
      title: "Page cross-fade",
      note: "Move to another page and back. Pages cross-fade.",
      link: "Go to Home",
    },
    smooth: {
      title: "Smooth scroll",
      note: "Weighted scrolling is on across the whole site. All motion is off when reduced motion is set on the device.",
    },
  },
} as const;
