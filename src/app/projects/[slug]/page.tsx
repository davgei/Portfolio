import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Github } from "lucide-react";
import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";
import { ProjectDetailContent } from "@/components/projects/project-detail-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.image]
    }
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <section className="container-wide grid gap-8 pb-12 pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="font-mono text-xs uppercase text-amber">{project.dates}</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold text-mist sm:text-7xl">{project.title}</h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-muted">{project.subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span key={technology} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                {technology}
              </span>
            ))}
          </div>
          {project.links.github && (
            <Link href={project.links.github} className="mt-8 inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-mist transition hover:border-amber">
              <Github size={18} />
              GitHub
            </Link>
          )}
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-panel shadow-glow">
          <Image src={project.image} alt="" fill priority className="object-cover" />
        </div>
      </section>
      <ProjectDetailContent project={project} />
    </>
  );
}
