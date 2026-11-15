import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { SectionToneController } from "@/components/motion/SectionTone";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { meta } from "@/content/site";
import { anderson } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: meta.title, template: `%s · ${meta.title}` },
  description: meta.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anderson.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <SmoothScroll />
        <SectionToneController />
        <Header />
        {/* Page cross-fade: route changes are transitions, so this animates. */}
        <ViewTransition>
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
        </ViewTransition>
        <Footer />
        <MobileBookBar />
      </body>
    </html>
  );
}
