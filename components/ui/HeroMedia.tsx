"use client";

import { useReducedMotion } from "motion/react";

/**
 * Full-width hero media. Until the shoot it is a grey placeholder sized for
 * the final loop; pass `src` (and `poster`) to switch to the silent video.
 * Under reduced motion the video does not play; the poster shows instead.
 */
export function HeroMedia({
  shot,
  src,
  poster,
  className = "",
}: {
  shot: string;
  src?: string;
  poster?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="settle absolute inset-0">
        {src ? (
          <video
            className="h-full w-full object-cover"
            src={src}
            poster={poster}
            autoPlay={!reduce}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={shot}
          />
        ) : (
          <div role="img" aria-label={shot} className="flex h-full w-full items-end bg-navy/15 p-4 md:p-6">
            <span className="text-caption text-navy/75">{shot}</span>
          </div>
        )}
      </div>
    </div>
  );
}
