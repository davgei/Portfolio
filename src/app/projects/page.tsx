import type { Metadata } from "next";
import { ProjectFilterGrid } from "@/components/projects/project-filter-grid";
import { LocalizedPageHeading } from "@/components/layout/localized-page-heading";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects by David Geier across deep learning, computer vision, autonomous systems, robot control and mechatronics."
};

export default function ProjectsPage() {
  return (
    <>
      <LocalizedPageHeading page="projects" />
      <ProjectFilterGrid />
    </>
  );
}
