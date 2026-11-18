import { Footer } from "@/components/layout/Footer";
import { TileBar, TileHeader } from "@/components/tile/TileChrome";
import { VisitProvider } from "@/components/tile/VisitPanel";

/** The style tile's chrome: the navigation and footer as they will be, and the request panel. */
export default function TileLayout({ children }: { children: React.ReactNode }) {
  return (
    <VisitProvider>
      <TileHeader />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <TileBar />
    </VisitProvider>
  );
}
