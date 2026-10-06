export type SkillCluster = {
  title: string;
  titleNo: string;
  description: string;
  descriptionNo: string;
  skills: string[];
  projectSlug: string;
  projectLabel: string;
};

export const skillClusters: SkillCluster[] = [
  { title: "Perception", titleNo: "Persepsjon", description: "Image and spatial data are the starting point for a physical decision.", descriptionNo: "Bilder og romlige data er utgangspunktet for en fysisk beslutning.", skills: ["Computer vision", "2D detection", "Point clouds"], projectSlug: "waste-site-assessment", projectLabel: "REG / SITE ASSESSMENT" },
  { title: "Learning", titleNo: "Læring", description: "Train policies and models, then inspect where and why their behavior changes.", descriptionNo: "Tren policyer og modeller, og undersøk hvor og hvorfor atferden endrer seg.", skills: ["PPO", "Reinforcement learning", "Model evaluation"], projectSlug: "ppo-autonomous-driving", projectLabel: "PPO / AUTONOMOUS DRIVING" },
  { title: "Control", titleNo: "Regulering", description: "Connect a reference, robot state and feedback into a working loop.", descriptionNo: "Koble referanse, robottilstand og tilbakekobling i en fungerende sløyfe.", skills: ["ROS 2", "Joint states", "Feedback"], projectSlug: "ros2-robot-control", projectLabel: "ROS 2 / ROBOT CONTROL" },
  { title: "Hardware", titleNo: "Maskinvare", description: "Make geometry, sensors and physical constraints part of the system design.", descriptionNo: "Ta med geometri, sensorer og fysiske begrensninger i systemdesignet.", skills: ["SolidWorks", "Assemblies", "Prototyping"], projectSlug: "mechatronic-prototyping", projectLabel: "CAD / MECHATRONICS" }
];
