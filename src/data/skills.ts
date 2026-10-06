export type SkillCluster = {
  title: string;
  description: string;
  skills: string[];
  position: string;
};

export const skillClusters: SkillCluster[] = [
  {
    title: "AI / ML",
    description: "Models, training loops, evaluation and practical inference.",
    skills: ["PyTorch", "Scikit-learn", "Optimization", "Evaluation"],
    position: "md:col-start-2"
  },
  {
    title: "Robotics",
    description: "Kinematics, planning, simulation and robot software architecture.",
    skills: ["ROS 2", "Kinematics", "Path planning", "Simulation"],
    position: "md:col-start-1"
  },
  {
    title: "Computer Vision",
    description: "Image pipelines, feature extraction, detection and overlays.",
    skills: ["OpenCV", "Detection", "Calibration", "Datasets"],
    position: "md:col-start-3"
  },
  {
    title: "Control / Embedded",
    description: "Control loops, sensors, hardware interfaces and practical constraints.",
    skills: ["PID", "C++", "Microcontrollers", "Sensors"],
    position: "md:col-start-2"
  }
];
