import { Section } from "@/components/motion/SectionTone";
import { home } from "@/content/home";

export default function Home() {
  return (
    <Section className="flex min-h-[70svh] items-center">
      <div className="mx-auto w-full max-w-content px-gutter">
        <p className="text-body text-terracotta">{home.pending}</p>
      </div>
    </Section>
  );
}
