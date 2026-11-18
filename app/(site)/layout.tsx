import { Header } from "@/components/site/Header";
import { VisitProvider } from "@/components/site/VisitPanel";

/**
 * Every page: the header (logo, book pill, menu) and the request panel
 * that every "Book your first visit" button opens. A light page
 * (#F0EEEB, navy text); Home turns navy from "Your coach. Your plan."
 * (NavyZone). Each page ends with its own footer, so Home's sits in the
 * navy zone.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <VisitProvider>
      <Header />
      <main className="flex-1">{children}</main>
    </VisitProvider>
  );
}
