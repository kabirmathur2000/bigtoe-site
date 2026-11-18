import { TileHeader } from "@/components/tile/TileChrome";
import { VisitProvider } from "@/components/tile/VisitPanel";

/**
 * The style tile's chrome (round six): a light page (#F0EEEB, navy text)
 * and the floating header (logo, book pill, menu). Each screen sets its
 * own width: the hero and the Sherpa photo run edge to edge; everything
 * else sits in the 1280px column (`tile-wrap`).
 */
export default function TileLayout({ children }: { children: React.ReactNode }) {
  return (
    <VisitProvider>
      <TileHeader />
      <div data-tile className="bg-offwhite text-navy">
        <main>{children}</main>
      </div>
    </VisitProvider>
  );
}
