import { TileHeader } from "@/components/tile/TileChrome";
import { TileFooter } from "@/components/tile/TileFooter";
import { FloatingVisitButton, VisitProvider } from "@/components/tile/VisitPanel";

/**
 * The style tile's chrome: the navigation (logo, "Menu"), panels inset
 * from the screen edges with a small gap between them, the footer panel,
 * the one floating button and the request panel.
 */
export default function TileLayout({ children }: { children: React.ReactNode }) {
  return (
    <VisitProvider>
      <TileHeader />
      <main className="flex flex-1 flex-col gap-3 px-3 pt-16 pb-3 md:gap-6 md:px-6 md:pt-20 md:pb-6">{children}</main>
      <TileFooter />
      <FloatingVisitButton />
    </VisitProvider>
  );
}
