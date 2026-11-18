import { TileBar, TileHeader } from "@/components/tile/TileChrome";
import { TileFooter } from "@/components/tile/TileFooter";
import { VisitProvider } from "@/components/tile/VisitPanel";

/**
 * The style tile's chrome: the navigation as it will be, panels inset from
 * the screen edges (12px phones, 24px desktop) with a small gap between
 * them, the footer panel and the request panel.
 */
export default function TileLayout({ children }: { children: React.ReactNode }) {
  return (
    <VisitProvider>
      <TileHeader />
      <main className="flex flex-1 flex-col gap-3 px-3 pt-16 pb-3 md:gap-6 md:px-6 md:pt-20 md:pb-6">{children}</main>
      <TileFooter />
      <TileBar />
    </VisitProvider>
  );
}
