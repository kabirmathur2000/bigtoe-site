import type { Metadata } from "next";
import { LegalText } from "@/components/legal/LegalText";
import { privacy } from "@/content/legal";
import { meta } from "@/content/site";

export const metadata: Metadata = meta.pages.privacy;

export default function PrivacyPage() {
  return <LegalText blocks={privacy} />;
}
