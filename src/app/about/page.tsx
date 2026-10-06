import type { Metadata } from "next";
import { ContactSection } from "@/components/layout/contact-section";
import { LocalizedPageHeading } from "@/components/layout/localized-page-heading";

export const metadata: Metadata = {
  title: "About",
  description: "Personal and technical profile foundation."
};

export default function AboutPage() {
  return (
    <>
      <LocalizedPageHeading page="about" />
      <section className="container-wide grid gap-5 pb-16 md:grid-cols-3">
        {["What I build", "How I work", "Personal engineering interests"].map((title) => (
          <article key={title} className="rounded-lg border border-line bg-white/[0.035] p-6">
            <h2 className="text-2xl font-semibold text-mist">{title}</h2>
            <p className="mt-4 leading-7 text-muted">Placeholder for short, concrete biography content and selected photos later.</p>
          </article>
        ))}
      </section>
      <ContactSection />
    </>
  );
}
