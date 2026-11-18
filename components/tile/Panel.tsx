import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { shotLabel, type Accented, type Shot } from "@/content/style-tile";
import { Parallax } from "./Parallax";
import { CardRise, Settle } from "./Rise";

export type CardVariant = "light" | "warm" | "photo";

const CARD: Record<CardVariant, string> = {
  light: "bg-offwhite text-navy",
  warm: "panel-warm text-navy",
  photo: "bg-offwhite/10 text-offwhite",
};

/**
 * A card on the navy page: pronounced rounded corners (28px phones, 32px
 * desktop). Light, Warm or Photo, alternating so neighbours differ. It
 * rises about 40px, fades in and settles from 98% to full size over about
 * 0.8s as it arrives (CardRise).
 */
export function Card({
  variant,
  children,
  className = "",
  label,
}: {
  variant: CardVariant;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <CardRise className={`relative overflow-hidden rounded-[28px] md:rounded-[32px] ${CARD[variant]} ${className}`} label={label}>
      {children}
    </CardRise>
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
      <Parallax>
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
      </Parallax>
    );
  }
  return (
    <Parallax>
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
    </Parallax>
  );
}
