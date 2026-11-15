/**
 * Booking form copy, shared by Home block 6 and /book-now.
 */
import { facts, todo } from "./facts";

export const booking = {
  label: "YOUR FIRST VISIT",
  /** Deck 2 slide 16, "say it in 20 seconds". */
  headline: "From the moment you walk in, you're our guest.",
  subline: facts.firstStep.summary,
  replyTime: facts.replyTime ?? todo("how fast a Sherpa replies after a booking"),
  whatsappLabel: "WhatsApp",
  whatsappMissing: todo("WhatsApp number to publish"),

  fields: {
    firstName: { label: "First name" },
    contact: { label: "WhatsApp number or email" },
    day120: {
      /** Guide, Home block 6. */
      label: "By day 120, I want to be able to…",
      placeholder: "Choose one",
      /** facts.day120Options is open; placeholders until the six options arrive. */
      options:
        facts.day120Options ??
        Array.from({ length: 6 }, (_, i) => todo(`day-120 option ${i + 1}`)),
    },
    note: { label: "Anything we should know", optional: "Optional" },
  },

  errors: {
    firstName: "Please add your first name.",
    contactMissing: "Please add a WhatsApp number or an email address.",
    contactInvalid: "That doesn't look like a WhatsApp number or an email address.",
    day120: "Please choose one.",
  },

  submit: facts.ctaLabel,
  /** Sending is built in a later step. */
  notSentYet: todo("sending is built in a later step"),
} as const;
