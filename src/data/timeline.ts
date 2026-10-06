export type TimelineItem = {
  id: string;
  date: string;
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
};

export const timelineItems: TimelineItem[] = [
  {
    id: "uio-master",
    date: "2025-2027",
    title: "MSc Robotics and Intelligent Systems",
    eyebrow: "University of Oslo",
    description: "Replace with focus areas, courses, thesis direction and relevant lab work.",
    tags: ["Robotics", "AI", "Control"]
  },
  {
    id: "project-systems",
    date: "2026",
    title: "Technical portfolio projects",
    eyebrow: "Independent work",
    description: "Use this slot for selected robotics, vision, embedded or software projects.",
    tags: ["Software", "Hardware"]
  },
  {
    id: "experience-placeholder",
    date: "Later",
    title: "Experience placeholder",
    eyebrow: "Internship / work",
    description: "Add internships, part-time roles, assistant positions or engineering experience.",
    tags: ["Engineering", "Teamwork"]
  }
];
