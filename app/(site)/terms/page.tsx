import type { Metadata } from "next";
import { LegalText } from "@/components/legal/LegalText";
import { Footer } from "@/components/site/Footer";
import { terms } from "@/content/legal";
import { meta } from "@/content/site";

export const metadata: Metadata = meta.pages.terms;

export default function TermsPage() {
  return (
    <>
      <LegalText blocks={terms} />
      <Footer />
    </>
  );
}
