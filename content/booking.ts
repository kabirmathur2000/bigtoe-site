/**
 * The request panel: "Book your first visit" opens it from every button,
 * anywhere on the site. A visit request, not a confirmed appointment; no
 * health questions (the intake form's job). Agreed 18 Nov 2026.
 */
import { facts } from "./facts";

export const booking = {
  heading: facts.cta,
  fields: {
    name: { label: "Name" },
    mobile: { label: "Mobile number" },
    time: {
      label: "Preferred time",
      options: ["Weekday morning", "Weekday evening", "Weekend"],
    },
  },
  errors: {
    name: "Please add your name.",
    mobileMissing: "Please add your mobile number.",
    mobileInvalid: "That doesn't look like a mobile number.",
    time: "Please choose a time.",
    failed: `Something went wrong and your details weren't sent. Please try again, or email ${facts.email}.`,
  },
  submit: facts.cta,
  close: "Close",
  honeypotLabel: "Company",
  thanks: {
    heading: (name: string) => `Thank you, ${name}. We'll confirm your visit on WhatsApp.`,
    formLabel: "Fill in the intake form",
    whatsappLabel: "Message us on WhatsApp",
    whatsappMessage: (name: string) => `Hi BigToe, this is ${name}. I've just asked to book my first visit.`,
  },
} as const;
