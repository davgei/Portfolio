import { ArchitectureDiagram, CodeBlock, MetricDisplay } from "@/components/visualizations/building-blocks";
import { ProjectChart } from "@/components/visualizations/project-chart";
import type { Project } from "@/data/projects";

export function ProjectDetailContent({ project }: { project: Project }) {
  return (
    <div className="container-readable grid gap-8 py-14">
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricDisplay label="Focus" value={project.area[0]} />
        <MetricDisplay label="Status" value="Foundation" />
        <MetricDisplay label="Metric" value={project.metric} />
      </div>

      <section className="prose prose-invert max-w-none prose-p:text-muted prose-headings:text-mist">
        <h2>Project content placeholder</h2>
        <p>
          A future writeup can combine technical notes, diagrams, media and interactive experiments while shared metadata stays separate.
        </p>
      </section>

      <ArchitectureDiagram />
      <ProjectChart />
      <CodeBlock code={`type DemoBlock = {\n  kind: "chart" | "video" | "diagram" | "code";\n  project: "${project.slug}";\n};`} />
    </div>
  );
}
