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
  {
    title: "Computer vision & 3D AI", titleNo: "Maskinsyn og 3D-AI",
    description: "During my REG internship I worked with YOLOv8 detections, PointNet/PointNet++ and multimodal data pipelines. The results fed a web-based GIS and 3D review workflow instead of making unattended decisions.",
    descriptionNo: "Under REG-praksisen arbeidet jeg med YOLOv8-deteksjon, PointNet/PointNet++ og multimodale datapipelines. Resultatene ble del av en webbasert GIS- og 3D-løsning for menneskelig kontroll, ikke automatiske vedtak.",
    skills: ["YOLOv8", "PointNet++", "Point clouds", "Geospatial data"],
    projectSlug: "waste-site-assessment", projectLabel: "REG / AI CASE STUDY"
  },
  {
    title: "Learning autonomous behaviour", titleNo: "Læring av autonom atferd",
    description: "I trained a driving agent with PPO in simulation and studied how observations, actions and reward design shape its behaviour. The project is about evaluating a learned policy, not just getting a car to move.",
    descriptionNo: "Jeg trente en kjøreagent med PPO i simulering og undersøkte hvordan observasjoner, handlinger og belønningsdesign former atferden. Prosjektet handler om å evaluere en lært policy, ikke bare om å få en bil til å kjøre.",
    skills: ["PPO", "Reinforcement learning", "Simulation", "Evaluation"],
    projectSlug: "ppo-autonomous-driving", projectLabel: "PPO / LEARNING CASE STUDY"
  },
  {
    title: "Feedback & robot control", titleNo: "Tilbakekobling og robotstyring",
    description: "Coursework and projects connect kinematics, joint states and PID feedback in Gazebo with robot software and trajectory tracking. This is the control side of the same intelligent-system chain.",
    descriptionNo: "Emner og prosjekter knytter kinematikk, leddtilstander og PID-regulering i Gazebo til robotprogramvare og banefølging. Dette er reguleringsdelen av den samme systemkjeden.",
    skills: ["Kinematics", "PID", "Gazebo", "ROS 2"],
    projectSlug: "ros2-robot-control", projectLabel: "ROS 2 / CONTROL CASE STUDY"
  },
  {
    title: "Sensors & physical prototypes", titleNo: "Sensorer og prototyper",
    description: "I have worked with a Raspberry Pi-based 360-camera/GPS capture setup, CAD assemblies and 3D printing. These projects make data quality, fit and physical constraints part of the design.",
    descriptionNo: "Jeg har arbeidet med et Raspberry Pi-basert oppsett for 360-kamera og GPS, CAD-sammenstillinger og 3D-printing. Prosjektene gjør datakvalitet, passform og fysiske begrensninger til en del av designet.",
    skills: ["Raspberry Pi", "360 camera", "GPS", "SolidWorks"],
    projectSlug: "camera-gps-acquisition", projectLabel: "FIELD DATA / SMALL PROJECT"
  }
];
