export type SkillCluster = {
  title: string;
  titleNo: string;
  description: string;
  descriptionNo: string;
  skills: string[];
};

export const skillClusters: SkillCluster[] = [
  {
    title: "AI / ML",
    titleNo: "AI / ML",
    description: "Models, training loops, evaluation and practical inference.",
    descriptionNo: "Modeller, treningssløyfer, evaluering og praktisk inferens.",
    skills: ["PyTorch", "Scikit-learn", "Optimization", "Evaluation"]
  },
  {
    title: "Robotics",
    titleNo: "Robotikk",
    description: "Kinematics, planning, simulation and robot software architecture.",
    descriptionNo: "Kinematikk, planlegging, simulering og robotprogramvare.",
    skills: ["ROS 2", "Kinematics", "Path planning", "Simulation"]
  },
  {
    title: "Computer Vision",
    titleNo: "Datasyn",
    description: "Image pipelines, feature extraction, detection and overlays.",
    descriptionNo: "Bildebehandling, objektdeteksjon, kalibrering og datasett.",
    skills: ["OpenCV", "Detection", "Calibration", "Datasets"]
  },
  {
    title: "Control / Embedded",
    titleNo: "Regulering / embedded",
    description: "Control loops, sensors, hardware interfaces and practical constraints.",
    descriptionNo: "Regulering, sensorer, maskinvaregrensesnitt og sanntidssystemer.",
    skills: ["PID", "C++", "Microcontrollers", "Sensors"]
  }
];
