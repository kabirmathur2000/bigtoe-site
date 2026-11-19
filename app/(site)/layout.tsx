import { Header } from "@/components/site/Header";
import { VisitProvider } from "@/components/site/VisitPanel";

/**
 * Every page (the one page, terms, privacy): the header (logo, book pill,
 * menu of jump links) and the request panel the book pill opens. A light
 * page (#F0EEEB, navy text). Each page ends with its own footer.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <VisitProvider>
      <Header />
      <main className="flex-1">{children}</main>
    </VisitProvider>
  );
}
