import type { Metadata } from "next";
import { InteractiveTimeline } from "@/components/timeline/interactive-timeline";
import { LocalizedPageHeading } from "@/components/layout/localized-page-heading";
import { CvActions } from "@/components/layout/cv-actions";

export const metadata: Metadata = {
  title: "CV",
  description: "Web CV foundation with education, experience, projects, skills and PDF actions."
};

const sections = [
  "Education",
  "Work experience",
  "Technical experience",
  "Selected projects",
  "Skills",
  "Languages"
];

export default function CvPage() {
  const cvPath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/documents/cv-placeholder.pdf`;

  return (
    <>
      <LocalizedPageHeading page="cv" />
      <section className="container-readable pb-12">
        <CvActions cvPath={cvPath} />
      </section>
      <section className="container-wide grid gap-4 pb-12 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <article key={section} className="rounded-lg border border-line bg-white/[0.035] p-6">
            <h2 className="text-2xl font-semibold text-mist">{section}</h2>
            <p className="mt-4 leading-7 text-muted">Placeholder entries for later replacement.</p>
          </article>
        ))}
      </section>
      <InteractiveTimeline />
    </>
  );
}
