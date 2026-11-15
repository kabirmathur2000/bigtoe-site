import Image from "next/image";
import { facts, mailtoHref, todo, whatsappHref } from "@/content/facts";
import { footer } from "@/content/site";
import logo from "@/public/brand/logo.png";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-label uppercase text-offwhite/60">{children}</p>;
}

function Todo({ children }: { children: string }) {
  return <span className="text-terracotta">{children}</span>;
}

export function Footer() {
  const wa = whatsappHref();
  return (
    <footer data-tone="navy" className="border-t border-offwhite/15 pb-28 md:pb-0">
      <div className="mx-auto grid max-w-wide gap-12 px-gutter py-20 md:grid-cols-4 md:py-28">
        <div>
          {/* The navy logo is inverted to off-white on navy until a light SVG exists. */}
          <Image src={logo} alt={facts.brand} className="h-6 w-auto brightness-0 invert" sizes="200px" />
          <p className="mt-4 text-caption text-offwhite/60">{facts.tagline}</p>
        </div>

        <div>
          <Label>{footer.visitLabel}</Label>
          <address className="not-italic">
            {facts.address.lines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </address>
          <p className="mt-3 text-caption text-offwhite/70">{facts.parking}</p>
          {!facts.address.mapUrl && (
            <p className="mt-2 text-caption"><Todo>{todo(footer.missingMap)}</Todo></p>
          )}
        </div>

        <div>
          <Label>{footer.hoursLabel}</Label>
          <p>{facts.hours}</p>
        </div>

        <div>
          <Label>{footer.contactLabel}</Label>
          <ul className="space-y-2">
            <li>
              <span className="sr-only">{footer.whatsappLabel}: </span>
              {wa ? (
                <a href={wa} className="underline-offset-4 hover:underline">{footer.whatsappLabel}</a>
              ) : (
                <Todo>{todo(footer.missingWhatsapp)}</Todo>
              )}
            </li>
            <li>
              <span className="sr-only">{footer.emailLabel}: </span>
              <a href={mailtoHref} className="underline-offset-4 hover:underline">{facts.email}</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
