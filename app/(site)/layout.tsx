import { ViewTransition } from "react";
import { BookingProvider } from "@/components/booking/BookingPanel";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBookBar } from "@/components/layout/MobileBookBar";

/** The live site: Home, Method, Team, terms and privacy. Every "Book your free first hour" button opens the booking panel. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      <Header />
      {/* Page cross-fade: route changes are transitions, so this animates. */}
      <ViewTransition>
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
      </ViewTransition>
      <Footer />
      <MobileBookBar />
    </BookingProvider>
  );
}
