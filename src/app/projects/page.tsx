import type { Metadata } from "next";
import { ProjectFilterGrid } from "@/components/projects/project-filter-grid";
import { LocalizedPageHeading } from "@/components/layout/localized-page-heading";

export const metadata: Metadata = {
  title: "Projects",
  description: "Filterable project index for robotics, AI, computer vision, control, embedded and software work."
};

export default function ProjectsPage() {
  return (
    <>
      <LocalizedPageHeading page="projects" />
      <ProjectFilterGrid />
    </>
  );
}
