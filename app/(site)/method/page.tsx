import type { Metadata } from "next";
import { Build, Goals, Ground, Start } from "@/components/method/MethodScreens";
import { Footer } from "@/components/site/Footer";
import { PageTitle } from "@/components/site/PageTitle";
import { method } from "@/content/method";
import { meta } from "@/content/site";

export const metadata: Metadata = meta.pages.method;

export default function MethodPage() {
  return (
    <>
      <PageTitle title={method.title} />
      <Start />
      <Build />
      <Ground />
      <Goals />
      <Footer />
    </>
  );
}
