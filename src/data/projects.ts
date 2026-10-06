export type ProjectArea = "Perception" | "Learning" | "Control" | "Hardware" | "Software";

export type Project = {
  slug: string;
  index: string;
  title: string;
  titleNo: string;
  subtitle: string;
  subtitleNo: string;
  summary: string;
  summaryNo: string;
  context: string;
  contextNo: string;
  contribution: string;
  contributionNo: string;
  approach: string;
  approachNo: string;
  outcome: string;
  outcomeNo: string;
  next: string;
  nextNo: string;
  area: ProjectArea[];
  technologies: string[];
  stages: string[];
  stagesNo: string[];
  date?: string;
  featured: boolean;
  accent: "gold" | "cyan" | "coral" | "sage";
  github?: string;
};

export const projectAreas: ProjectArea[] = ["Perception", "Learning", "Control", "Hardware", "Software"];
export const projectAreaNo: Record<ProjectArea, string> = {
  Perception: "Persepsjon", Learning: "Læring", Control: "Regulering", Hardware: "Maskinvare", Software: "Programvare"
};

export const projects: Project[] = [
  {
    slug: "waste-site-assessment", index: "01", title: "Waste collection site assessment", titleNo: "Vurdering av renovasjonsanlegg",
    subtitle: "AI-assisted perception for Oslo Municipality / REG", subtitleNo: "AI-assistert persepsjon for Oslo kommune / REG",
    summary: "From field capture to 2D detection, 3D verification and human review of waste collection sites.",
    summaryNo: "Fra feltinnsamling til 2D-deteksjon, 3D-verifisering og manuell kontroll av renovasjonsanlegg.",
    context: "Waste collection sites are physical spaces with varied layouts. The project explores how imagery and spatial data can support a consistent assessment workflow.",
    contextNo: "Renovasjonsanlegg er fysiske rom med ulik utforming. Prosjektet utforsker hvordan bilder og romlige data kan støtte en konsekvent vurderingsprosess.",
    contribution: "Worked across data acquisition, computer vision, 3D verification and visualization in the 2026 REG project. Manual review remains part of the system.",
    contributionNo: "Arbeidet med datainnsamling, datasyn, 3D-verifisering og visualisering i REG-prosjektet i 2026. Manuell kontroll er fortsatt del av systemet.",
    approach: "Image detections provide 2D candidates. Spatial information helps verify them in 3D before the result is presented for review.",
    approachNo: "Bildedeteksjoner gir 2D-kandidater. Romlig informasjon hjelper med 3D-verifisering før resultatet presenteres for kontroll.",
    outcome: "An end-to-end assessment workflow with human review. Evaluation numbers and original media are withheld until approved for publication.",
    outcomeNo: "En helhetlig vurderingsprosess med manuell kontroll. Evalueringstall og originalmedia publiseres først etter godkjenning.",
    next: "Add approved field imagery, a real point-cloud sample and verified evaluation results.",
    nextNo: "Legg til godkjente feltbilder, et ekte punktskyeksempel og verifiserte evalueringsresultater.",
    area: ["Perception", "Learning", "Software"],
    technologies: ["Computer vision", "2D detection", "Point clouds", "3D verification", "Web visualization"],
    stages: ["Capture", "2D detection", "3D verification", "Review", "Visualization"],
    stagesNo: ["Innsamling", "2D-deteksjon", "3D-verifisering", "Kontroll", "Visualisering"],
    date: "2026", featured: true, accent: "gold", github: "https://github.com/davgei/Internship-hovedprosjekt-2026"
  },
  {
    slug: "ppo-autonomous-driving", index: "02", title: "PPO autonomous driving", titleNo: "Autonom kjøring med PPO",
    subtitle: "Reinforcement learning in simulation", subtitleNo: "Forsterkningslæring i simulering",
    summary: "Training a driving agent with Proximal Policy Optimization and examining how behavior changes during learning.",
    summaryNo: "Trening av en kjøreagent med Proximal Policy Optimization, og analyse av hvordan atferden endrer seg under læring.",
    context: "A driving agent must turn observations into actions while balancing progress and control. Reinforcement learning makes that behavior an experimental design problem.",
    contextNo: "En kjøreagent må omsette observasjoner til handlinger og balansere fremdrift mot kontroll. Forsterkningslæring gjør dette til et eksperimentelt designproblem.",
    contribution: "Built and trained a PPO-based driving agent in simulation. The exact environment, reward definition and final evaluation remain to be documented.",
    contributionNo: "Bygget og trente en PPO-basert kjøreagent i simulering. Nøyaktig miljø, belønningsfunksjon og sluttevaluering må dokumenteres.",
    approach: "The policy is updated from experience collected in the simulator. Observation, action and reward design determine what the agent can learn.",
    approachNo: "Policyen oppdateres fra erfaring samlet i simulatoren. Observasjoner, handlinger og belønning avgjør hva agenten kan lære.",
    outcome: "A trained driving policy. Real training curves and video checkpoints await the original logs.",
    outcomeNo: "En trent kjørepolicy. Ekte treningskurver og videokontrollpunkter avventer original-loggene.",
    next: "Connect real training logs and synchronized policy playback.", nextNo: "Koble til ekte treningslogger og synkronisert avspilling av policyen.",
    area: ["Learning", "Control"], technologies: ["PPO", "Reinforcement learning", "Simulation", "Policy evaluation"],
    stages: ["Observe", "Act", "Reward", "Update policy"], stagesNo: ["Observer", "Handle", "Belønning", "Oppdater policy"],
    featured: true, accent: "cyan"
  },
  {
    slug: "ros2-robot-control", index: "03", title: "ROS 2 robot control", titleNo: "Robotregulering med ROS 2",
    subtitle: "Robot state, feedback and trajectory tracking", subtitleNo: "Robottilstand, tilbakekobling og banefølging",
    summary: "Exploring how joint state, feedback control and trajectory references fit together in a ROS 2 system.",
    summaryNo: "Utforsker hvordan leddtilstand, tilbakekoblet regulering og referansebaner virker sammen i et ROS 2-system.",
    context: "A robot only follows a path when sensing, control and actuation agree on state and timing. This project connects control concepts to robot software.",
    contextNo: "En robot følger bare en bane når måling, regulering og aktuering deler samme tilstand og timing. Prosjektet kobler reguleringsteori til robotprogramvare.",
    contribution: "Worked with ROS 2, joint states and feedback-control concepts. The final robot/simulator and controller implementation need verification before a more specific claim.",
    contributionNo: "Arbeidet med ROS 2, leddtilstander og konsepter for tilbakekoblet regulering. Endelig robot/simulator og regulator må verifiseres før mer spesifikke påstander.",
    approach: "Represent joint position and velocity, compare state with a reference, and use the error in a controller loop. The diagram is conceptual, not measured telemetry.",
    approachNo: "Representer leddposisjon og hastighet, sammenlign tilstand med en referanse, og bruk avviket i en reguleringssløyfe. Diagrammet er konseptuelt, ikke målt telemetri.",
    outcome: "A developing robotics/control project. Measured response plots will be added when original results can be shown.",
    outcomeNo: "Et robotikk- og reguleringsprosjekt under utvikling. Målte responskurver legges til når originalresultatene kan vises.",
    next: "Document the final controller, platform and measured trajectory response.", nextNo: "Dokumenter endelig regulator, plattform og målt banerespons.",
    area: ["Control", "Software", "Hardware"], technologies: ["ROS 2", "C++", "Joint states", "Feedback control", "Kinematics"],
    stages: ["Reference", "Controller", "Robot", "Joint state"], stagesNo: ["Referanse", "Regulator", "Robot", "Leddtilstand"],
    featured: true, accent: "coral"
  },
  {
    slug: "mechatronic-prototyping", index: "04", title: "Mechatronic prototyping", titleNo: "Mekatronisk prototyping",
    subtitle: "From SolidWorks assembly to physical constraints", subtitleNo: "Fra SolidWorks-sammenstilling til fysiske begrensninger",
    summary: "Mechanical design and rapid prototyping across CAD parts, assemblies and an emerging physical system.",
    summaryNo: "Mekanisk design og rask prototyping med CAD-deler, sammenstillinger og et fysisk system under utvikling.",
    context: "A physical system depends on fit, movement and real constraints, not just a convincing CAD view.",
    contextNo: "Et fysisk system avhenger av passform, bevegelse og reelle begrensninger, ikke bare et overbevisende CAD-bilde.",
    contribution: "Designed parts and assemblies in SolidWorks and explored mechanical constraints. The final assembly and electronics need documentation.",
    contributionNo: "Designet deler og sammenstillinger i SolidWorks og utforsket mekaniske begrensninger. Endelig sammenstilling og elektronikk må dokumenteres.",
    approach: "Model individual parts, define assembly relationships and iterate against physical and manufacturing constraints.",
    approachNo: "Modeller enkeltkomponenter, definer sammenstillingsforhold og iterer mot fysiske og produksjonsmessige begrensninger.",
    outcome: "CAD and prototyping work in progress. A real model or prototype photo will replace the conceptual diagram.",
    outcomeNo: "CAD- og prototypearbeid under utvikling. En ekte modell eller et prototypebilde skal erstatte det konseptuelle diagrammet.",
    next: "Export the approved assembly as a lightweight GLB and add prototype documentation.", nextNo: "Eksporter den godkjente sammenstillingen som en lett GLB og legg til prototypedokumentasjon.",
    area: ["Hardware", "Control"], technologies: ["SolidWorks", "CAD", "Assemblies", "Mechanical constraints", "Prototyping"],
    stages: ["Parts", "Assembly", "Constraints", "Prototype"], stagesNo: ["Deler", "Sammenstilling", "Begrensninger", "Prototype"],
    featured: true, accent: "sage"
  },
  {
    slug: "camera-gps-acquisition", index: "05", title: "360 camera + GPS acquisition", titleNo: "360-kamera og GPS-innsamling",
    subtitle: "A field data acquisition workflow", subtitleNo: "En arbeidsflyt for feltdata",
    summary: "Combining 360 imagery and location data for field collection using a Raspberry Pi-based setup.",
    summaryNo: "Kombinerer 360-bilder og posisjonsdata for feltinnsamling med et Raspberry Pi-basert oppsett.",
    context: "Image-based assessment depends on reliable field data and spatial context.",
    contextNo: "Bildebasert vurdering avhenger av pålitelige feltdata og romlig kontekst.",
    contribution: "Worked on a 360 camera, GPS and Raspberry Pi data acquisition setup. Hardware and synchronization details need documentation.",
    contributionNo: "Arbeidet med et oppsett for datainnsamling med 360-kamera, GPS og Raspberry Pi. Maskinvare og synkronisering må dokumenteres.",
    approach: "Associate captured imagery with location information for later inspection and processing.",
    approachNo: "Knytt innsamlede bilder til posisjonsinformasjon for senere inspeksjon og prosessering.",
    outcome: "Field capture workflow. Original rig photos and sample data await publication approval.",
    outcomeNo: "Arbeidsflyt for feltinnsamling. Originalbilder av riggen og eksempeldata avventer publiseringsgodkjenning.",
    next: "Add approved rig images and a sample capture timeline.", nextNo: "Legg til godkjente riggbilder og en eksempeltidslinje for innsamling.",
    area: ["Hardware", "Perception", "Software"], technologies: ["Raspberry Pi", "360 camera", "GPS", "Python", "Data acquisition"],
    stages: ["Camera", "GPS", "Capture", "Dataset"], stagesNo: ["Kamera", "GPS", "Innsamling", "Datasett"],
    featured: false, accent: "gold"
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
