import { getBasePath } from "@/lib/utils";

export type ProjectArea = "AI" | "Robotics" | "Computer Vision" | "Control" | "Embedded" | "Hardware" | "Software";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  area: ProjectArea[];
  technologies: string[];
  metric: string;
  dates: string;
  featured: boolean;
  image: string;
  links: {
    github?: string;
    report?: string;
    demo?: string;
  };
};

export const projectAreas: ProjectArea[] = ["AI", "Robotics", "Computer Vision", "Control", "Embedded", "Hardware", "Software"];

export const projects: Project[] = [
  {
    slug: "adaptive-robot-arm",
    title: "Adaptive Robot Arm",
    subtitle: "Kinematic control playground",
    summary: "Placeholder project for inverse kinematics, trajectory planning and actuator control notes.",
    area: ["Robotics", "Control", "Hardware"],
    technologies: ["Python", "ROS 2", "Control", "CAD"],
    metric: "6-DOF concept",
    dates: "2026",
    featured: true,
    image: `${getBasePath()}/images/projects/robot-arm.svg`,
    links: {
      github: "https://github.com/username/adaptive-robot-arm"
    }
  },
  {
    slug: "vision-lab",
    title: "Vision Lab",
    subtitle: "Detection and perception experiments",
    summary: "Placeholder project for later computer vision demos, dataset notes and detection overlays.",
    area: ["AI", "Computer Vision", "Software"],
    technologies: ["PyTorch", "OpenCV", "TypeScript"],
    metric: "Realtime-ready UI",
    dates: "2026",
    featured: true,
    image: `${getBasePath()}/images/projects/vision-lab.svg`,
    links: {
      github: "https://github.com/username/vision-lab"
    }
  },
  {
    slug: "autonomous-paths",
    title: "Autonomous Paths",
    subtitle: "Planning, simulation and telemetry",
    summary: "Placeholder project for autonomous systems, path planning and interactive technical metrics.",
    area: ["Robotics", "AI", "Embedded"],
    technologies: ["C++", "Simulation", "Recharts"],
    metric: "Trajectory viewer",
    dates: "2026",
    featured: true,
    image: `${getBasePath()}/images/projects/autonomous-paths.svg`,
    links: {
      github: "https://github.com/username/autonomous-paths"
    }
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
