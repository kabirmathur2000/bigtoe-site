import Image from "next/image";
import { photo } from "@/content/site";
import space from "@/content/space-photos.json";
import coffeeBar from "@/public/photos/studio-coffee-bar.jpg";

/**
 * A photo slot. Until the shoot every slot shows the coffee bar photo,
 * cropped per slot (`pos`); `shot` names the photo it stands in for (in
 * the alt text and docs/shot-list.md). `space`: a slot where the space is
 * the subject shows BigToe's render of it when one is in
 * docs/photos/space/ (scripts/space-photos.mjs). Fills its parent, which
 * sets the shape and corners.
 */
export function Photo({
  shot,
  pos = "50% 50%",
  posClass,
  sizes,
  preload = false,
  space: slot,
}: {
  shot: string;
  pos?: string;
  /** Responsive crop classes (object-[…]), in place of `pos`. */
  posClass?: string;
  sizes: string;
  preload?: boolean;
  space?: keyof typeof space;
}) {
  const render = slot ? space[slot] : null;
  return (
    <Image
      src={render ?? coffeeBar}
      alt={render && slot ? photo.spaceAlt[slot] : shot ? photo.placeholder(shot) : photo.alt}
      fill
      preload={preload}
      draggable={false}
      sizes={sizes}
      quality={75}
      className={`object-cover ${posClass ?? ""}`}
      style={posClass ? undefined : { objectPosition: pos }}
    />
  );
}
