import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * Grey placeholder sized for the final photo. `shot` is the alt text: it
 * describes the photo the shot list calls for, so it can be swapped by name.
 */
export function Placeholder({
  ratio = "3 / 2",
  shot,
  className = "",
}: {
  ratio?: string;
  shot: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={shot}
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={`relative flex w-full items-end bg-current/15 p-4 ${className}`}
    >
      <span className="text-caption opacity-50">{shot}</span>
    </div>
  );
}

/**
 * A photograph with a small caption (first name, age, what it shows).
 * Unveils with ImageReveal and zooms about 3% on hover.
 */
export function Photo({
  shot,
  ratio,
  caption,
  reveal = true,
}: {
  shot: string;
  ratio?: string;
  caption?: string;
  reveal?: boolean;
}) {
  const image = (
    <div className="overflow-hidden">
      <div className="transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.03]">
        <Placeholder ratio={ratio} shot={shot} />
      </div>
    </div>
  );
  return (
    <figure className="group">
      {reveal ? <ImageReveal>{image}</ImageReveal> : image}
      {caption && <figcaption className="mt-3 text-caption opacity-70">{caption}</figcaption>}
    </figure>
  );
}
