import Image from "next/image";
import { photo } from "@/content/site";
import coffeeBar from "@/public/photos/studio-coffee-bar.jpg";

/**
 * A photo slot. Until the shoot every slot shows the coffee bar photo,
 * cropped per slot (`pos`); `shot` names the photo it stands in for (in
 * the alt text and docs/shot-list.md). Fills its parent, which sets the
 * shape and corners.
 */
export function Photo({
  shot,
  pos = "50% 50%",
  posClass,
  sizes,
  preload = false,
}: {
  shot: string;
  pos?: string;
  /** Responsive crop classes (object-[…]), in place of `pos`. */
  posClass?: string;
  sizes: string;
  preload?: boolean;
}) {
  return (
    <Image
      src={coffeeBar}
      alt={shot ? photo.placeholder(shot) : photo.alt}
      fill
      preload={preload}
      sizes={sizes}
      quality={75}
      className={`object-cover ${posClass ?? ""}`}
      style={posClass ? undefined : { objectPosition: pos }}
    />
  );
}
