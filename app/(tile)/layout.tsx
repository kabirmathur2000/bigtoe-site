import { Ending } from "@/components/tile/Ending";
import { TileHeader } from "@/components/tile/TileChrome";
import { VisitProvider } from "@/components/tile/VisitPanel";

/**
 * The style tile's chrome (round four): a navy page; the floating header
 * (logo, book pill, menu); the page content on top, inset from the screen
 * edges, scrolling away at the end to reveal the ending beneath it.
 */
export default function TileLayout({ children }: { children: React.ReactNode }) {
  return (
    <VisitProvider>
      <TileHeader />
      <div data-tile className="relative bg-navy text-offwhite">
        {/* Full width so the ending never shows at the sides; rounded at the bottom like a lifting curtain. */}
        <main className="relative z-10 rounded-b-[28px] bg-navy md:rounded-b-[32px]">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-24 px-4 pt-28 pb-24 md:gap-40 md:px-12 md:pt-36 md:pb-40 lg:px-16">{children}</div>
        </main>
        <Ending />
      </div>
    </VisitProvider>
  );
}
