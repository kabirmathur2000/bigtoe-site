import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { shotLabel, type Shot } from "@/content/style-tile";
import { Settle } from "./Rise";

/** Shapes, written out so Tailwind sees every class. */
const PHONE: Record<string, string> = { "3:2": "aspect-[3/2]", "4:5": "aspect-[4/5]", "1:1": "aspect-square" };
const DESKTOP: Record<string, string> = { "3:2": "md:aspect-[3/2]", "4:5": "md:aspect-[4/5]", "1:1": "md:aspect-square" };

/**
 * An art-directed photograph: one shape on phones, another on desktop, so
 * the layout is true on every device. With `src` it shows the real photo,
 * cropped per shape (`phonePos`, `desktopPos` as object-position); without,
 * a grey placeholder labelled with the shot name, both shapes and the pixel
 * size to supply. The photo settles from a very slight zoom on entry.
 */
export function ArtImage({
  shot,
  src,
  alt,
  phonePos = "50% 50%",
  desktopPos = "50% 50%",
  sizes = "(min-width: 768px) 50vw, 100vw",
  label = false,
  className = "",
}: {
  shot: Shot;
  src?: StaticImageData;
  alt?: string;
  phonePos?: string;
  desktopPos?: string;
  sizes?: string;
  /** Show the shot label over a real photo too (for stand-ins on the tile). */
  label?: boolean;
  className?: string;
}) {
  const shape = `${PHONE[shot.phone.ratio]} ${DESKTOP[shot.desktop.ratio]}`;
  return (
    <div className={`relative w-full overflow-hidden ${shape} ${className}`}>
      {src ? (
        <Settle className="absolute inset-0">
          <Image
            src={src}
            alt={alt ?? shot.name}
            fill
            sizes={sizes}
            quality={75}
            placeholder="blur"
            style={{ "--pos-phone": phonePos, "--pos-wide": desktopPos } as CSSProperties}
            className="object-cover object-(--pos-phone) md:object-(--pos-wide)"
          />
        </Settle>
      ) : (
        <div role="img" aria-label={shot.name} className="absolute inset-0 bg-current/15" />
      )}
      {(!src || label) && (
        <p className={`absolute inset-x-0 bottom-0 p-3 text-[0.75rem] leading-snug md:p-4 md:text-caption ${src ? "text-offwhite" : "opacity-75"}`}>
          {shotLabel(shot)}
        </p>
      )}
    </div>
  );
}
