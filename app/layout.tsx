import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { facts } from "@/content/facts";
import { meta } from "@/content/site";
import { anderson } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(facts.siteUrl),
  title: { default: meta.homeTitle, template: `%s · ${meta.title}` },
  description: meta.description,
  openGraph: { siteName: facts.brand, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

/** LocalBusiness structured data, built only from facts.ts. */
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: facts.brand,
  slogan: facts.tagline,
  description: facts.heroLine,
  url: facts.siteUrl,
  email: facts.email,
  ...(facts.whatsappNumber ? { telephone: `+${facts.whatsappNumber}` } : {}),
  priceRange: facts.priceRange,
  openingHours: facts.hoursSchema,
  address: {
    "@type": "PostalAddress",
    streetAddress: facts.address.street,
    addressLocality: `${facts.address.area}, ${facts.address.city}`,
    postalCode: facts.address.postalCode,
    addressCountry: facts.address.country,
  },
  image: `${facts.siteUrl}/opengraph-image`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${anderson.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        {/* The header, main and request panel come from app/(site)/layout.tsx; each page ends with its footer. */}
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }}
        />
        <Analytics />
      </body>
    </html>
  );
}
