import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { shotLabel, type Accented, type Shot } from "@/content/style-tile";
import { Settle } from "./Rise";

export type Variant = "light" | "warm" | "navy" | "photo";

const VARIANT: Record<Variant, string> = {
  // Light and Warm panels carry a hairline so their edge reads on the page background.
  light: "bg-offwhite text-navy border border-navy/10",
  warm: "panel-warm text-navy border border-navy/10",
  navy: "bg-navy text-offwhite",
  photo: "bg-navy text-offwhite",
};

/**
 * A panel: every screen is its own, with softly rounded corners (24px),
 * inset from the screen edges (12px phones, 24px desktop, set by the
 * page) with a small gap between panels. Light, Warm, Navy or Photo,
 * rotated so neighbours differ. Buttons inside keep square corners.
 */
export function Panel({
  variant,
  children,
  className = "",
  id,
  label,
}: {
  variant: Variant;
  children: ReactNode;
  className?: string;
  id?: string;
  label?: string;
}) {
  return (
    <section id={id} aria-label={label} className={`relative overflow-hidden rounded-[24px] ${VARIANT[variant]} ${className}`}>
      {children}
    </section>
  );
}

/** A headline with at most one phrase in terracotta. */
export function Accent({ value }: { value: Accented }) {
  const { text, accent } = value;
  if (!accent || !text.includes(accent)) return <>{text}</>;
  const i = text.indexOf(accent);
  return (
    <>
      {text.slice(0, i)}
      <span className="text-terracotta">{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}

/**
 * A photograph (or its placeholder) filling its parent, which sets the
 * shape per device. With `src`, the real photo, cropped per device
 * (object-position), settling from a very slight zoom on entry. Without,
 * a grey placeholder labelled with the shot name, both shapes and the pixel
 * size to supply (top left, clear of any text at the bottom).
 */
export function PhotoFill({
  shot,
  src,
  alt,
  phonePos = "50% 50%",
  desktopPos = "50% 50%",
  sizes = "(min-width: 768px) 50vw, 100vw",
  preload = false,
}: {
  shot: Shot;
  src?: StaticImageData;
  alt?: string;
  phonePos?: string;
  desktopPos?: string;
  sizes?: string;
  preload?: boolean;
}) {
  if (src) {
    return (
      <Settle className="absolute inset-0">
        <Image
          src={src}
          alt={alt ?? shot.name}
          fill
          sizes={sizes}
          quality={75}
          placeholder="blur"
          loading={preload ? "eager" : "lazy"}
          fetchPriority={preload ? "high" : "auto"}
          style={{ "--pos-phone": phonePos, "--pos-wide": desktopPos } as CSSProperties}
          className="object-cover object-(--pos-phone) md:object-(--pos-wide)"
        />
      </Settle>
    );
  }
  return (
    <div role="img" aria-label={shot.name} className="absolute inset-0 bg-current/15">
      <p className="max-w-md p-4 text-[0.75rem] leading-snug opacity-80 md:p-6 md:text-[0.8125rem]">
        {shot.short ? (
          <>
            {/* Small placeholders on phones: the short name and the phone shape only. */}
            <span className="md:hidden">{`${shot.short} · phone ${shot.phone.ratio}, ${shot.phone.size}`}</span>
            <span className="hidden md:inline">{shotLabel(shot)}</span>
          </>
        ) : (
          shotLabel(shot)
        )}
      </p>
    </div>
  );
}
