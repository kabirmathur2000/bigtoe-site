/** Site-wide interface wording: navigation and footer labels. */

export const nav = {
  homeLabel: "BigToe home",
  links: [
    { href: "/method", label: "Method" },
    { href: "/team", label: "Team" },
  ],
} as const;

export const footer = {
  hoursLabel: "Hours",
  contactLabel: "Contact",
  whatsappLabel: "WhatsApp",
  emailLabel: "Email",
  missingWhatsapp: "WhatsApp number to publish",
  missingMap: "map link",
} as const;

export const meta = {
  title: "BigToe",
  description: "The second half of life should be the stronger half.",
} as const;
