import Link from "next/link";
import { back } from "@/content/site";
import { FadeUp } from "./Rise";

/** The inner-page pattern (Method, Team, FAQ): "← Back to home", then a clear page title. */
export function PageTitle({ title }: { title: string }) {
  return (
    <header className="tile-wrap pt-28 md:pt-40">
      <Link href={back.href} className="inline-flex min-h-11 items-center ty-body opacity-80 transition-opacity duration-300 hover:opacity-100">
        {back.label}
      </Link>
      <FadeUp>
        <h1 className="mt-4 ty-hero md:mt-6">{title}</h1>
      </FadeUp>
    </header>
  );
}
