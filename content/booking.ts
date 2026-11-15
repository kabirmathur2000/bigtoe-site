/**
 * Waitlist / booking form copy, shared by the end of Home and /book-now.
 */
import { facts, todo } from "./facts";

export const booking = {
  /** The only words above the form (10 Squared model). From facts.ctaMode. */
  heading: facts.ctaHeading,

  fields: {
    firstName: { label: "First name" },
    lastName: { label: "Last name" },
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
    heardFrom: {
      label: "How did you hear about us?",
      placeholder: "Choose one",
      options: ["Member referral", "Instagram", "Google", "Other"],
    },
    note: { label: "Anything we should know", optional: "Optional" },
  },

  errors: {
    firstName: "Please add your first name.",
    lastName: "Please add your last name.",
    contactMissing: "Please add a WhatsApp number or an email address.",
    contactInvalid: "That doesn't look like a WhatsApp number or an email address.",
    day120: "Please choose one.",
    heardFrom: "Please choose one.",
  },

  submit: facts.ctaLabel,
  /** Sending is built in a later step. */
  notSentYet: todo("sending is built in a later step"),
} as const;
