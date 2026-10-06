import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";
import { ProjectDetailContent } from "@/components/projects/project-detail-content";

const publicUrl = "https://davgei.github.io/Portfolio";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `${publicUrl}/projects/${project.slug}/` },
    openGraph: { title: project.title, description: project.summary, images: [{ url: `${publicUrl}/images/social-preview.png`, width: 1200, height: 630 }] }
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <ProjectDetailContent project={project} />;
}
