import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ViewTransition } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { SectionToneController } from "@/components/motion/SectionTone";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
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
  priceRange: facts.price.range,
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
    <html lang="en" className={`${anderson.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <SmoothScroll />
        <SectionToneController />
        <Header />
        {/* Page cross-fade: route changes are transitions, so this animates. */}
        <ViewTransition>
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
        </ViewTransition>
        <Footer />
        <MobileBookBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }}
        />
        <Analytics />
      </body>
    </html>
  );
}
