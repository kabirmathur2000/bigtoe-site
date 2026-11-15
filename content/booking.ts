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
  },

  errors: {
    firstName: "Please add your first name.",
    lastName: "Please add your last name.",
    contactMissing: "Please add a WhatsApp number or an email address.",
    contactInvalid: "That doesn't look like a WhatsApp number or an email address.",
    day120: "Please choose one.",

    failed: `Something went wrong and your details weren't sent. Please try again, or email ${facts.email}.`,
  },

  submit: facts.ctaLabel,
  /** Hidden spam trap; real visitors never see it. */
  honeypotLabel: "Company",

  /**
   * Thank-you state after sending. Interface wording written for the site,
   * not from a deck: to confirm with Jay.
   */
  thanks: {
    heading: (firstName: string) => `Thank you, ${firstName}.`,
    reply: facts.replyTime ?? todo("how fast a Sherpa replies"),
    /** Interface wording given for the site; links to facts.preVisitFormUrl. */
    formLead: "Before you walk in, tell us a little about yourself.",
    formLabel: "Fill in the short form",
    whatsappLabel: "Message us on WhatsApp",
    /** Pre-filled WhatsApp message, by facts.ctaMode. */
    whatsappMessage: (firstName: string) =>
      facts.ctaMode === "waitlist"
        ? `Hi BigToe, this is ${firstName}. I've just joined the waitlist.`
        : `Hi BigToe, this is ${firstName}. I'd like to book my free first visit.`,
    emailLead: "Or write to us at",
    emailOnlyLead: "Write to us at",
  },
} as const;
