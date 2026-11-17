/**
 * The booking panel: opens from every button, anywhere on the site.
 * Wording as approved in the final plan (17 Nov 2026).
 */
import { facts } from "./facts";

export const booking = {
  heading: facts.ctaLabel,
  fields: {
    firstName: { label: "First name" },
    whatsapp: { label: "WhatsApp number" },
  },
  errors: {
    firstName: "Please add your first name.",
    whatsappMissing: "Please add your WhatsApp number.",
    whatsappInvalid: "That doesn't look like a WhatsApp number.",
    failed: `Something went wrong and your details weren't sent. Please try again, or email ${facts.email}.`,
  },
  submit: facts.ctaLabel,
  close: "Close",
  /** Hidden spam trap; real visitors never see it. */
  honeypotLabel: "Company",

  thanks: {
    heading: (firstName: string) => `Thank you, ${firstName}. We'll message you on WhatsApp to set your first hour.`,
    formLead: "Before you come, tell us a little about yourself.",
    formLabel: "Fill in the short form",
    whatsappLabel: "Message us now",
    /** Pre-filled WhatsApp message (interface wording). */
    whatsappMessage: (firstName: string) => `Hi BigToe, this is ${firstName}. I'd like to book my first hour.`,
  },
} as const;
