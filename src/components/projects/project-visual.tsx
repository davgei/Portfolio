import type { Project } from "@/data/projects";

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const label = project.slug === "waste-site-assessment" ? "2D / 3D PERCEPTION" :
    project.slug === "ppo-autonomous-driving" ? "POLICY / SIMULATION" :
    project.slug === "ros2-robot-control" ? "STATE / FEEDBACK" :
    project.slug === "mechatronic-prototyping" ? "PART / ASSEMBLY" : "SENSOR / LOCATION";

  return (
    <div className={`project-visual project-visual--${project.accent} ${compact ? "project-visual--compact" : ""}`} aria-label={`${project.title}: conceptual illustration`} role="img">
      <div className="project-visual__grid" />
      <span className="project-visual__label">{label}</span>
      <span className="project-visual__number">{project.index} / DG</span>
      {project.slug === "waste-site-assessment" && (
        <svg viewBox="0 0 800 500" className="project-visual__drawing" aria-hidden="true">
          <defs><linearGradient id="regLine"><stop stopColor="#dbad55"/><stop offset="1" stopColor="#85cfda"/></linearGradient></defs>
          <path d="M74 342h652M200 68v368M580 68v368" stroke="currentColor" opacity=".13" strokeDasharray="4 10" />
          <path d="M115 123h250v252H115z" fill="#111819" stroke="currentColor" opacity=".55" />
          <path d="M144 329V196l60-39 55 40 66-28v160z" fill="#293637" stroke="#9caca7" strokeWidth="2" />
          <path d="M153 217h77v103h-77zM245 194h78v128h-78z" fill="none" stroke="#e8bb62" strokeWidth="3" />
          <path d="M231 260h100" stroke="#e8bb62" strokeWidth="2" strokeDasharray="5 6" />
          <path d="M375 250h68m-12-10 12 10-12 10" fill="none" stroke="url(#regLine)" strokeWidth="3" />
          {Array.from({length: 78}, (_, i) => {
            const x = 485 + ((i * 47) % 205);
            const y = 135 + ((i * 71) % 200);
            return <circle key={i} cx={x} cy={y} r={i % 7 === 0 ? 3 : 1.8} fill={i % 4 === 0 ? "#e8bb62" : "#86cbd4"} opacity={0.3 + (i % 5) * 0.13} />;
          })}
          <path d="M482 168l91-36 122 60-80 51-133-75zm0 0v122l133 75V243m80-51v111l-80 62" fill="none" stroke="#86cbd4" strokeWidth="2" opacity=".75" />
          <circle cx="615" cy="243" r="8" fill="#e8bb62" />
          <text x="116" y="406" fill="#aebbb5" fontSize="13" fontFamily="monospace">IMAGE CANDIDATES</text>
          <text x="483" y="406" fill="#aebbb5" fontSize="13" fontFamily="monospace">SPATIAL CHECK</text>
        </svg>
      )}
      {project.slug === "ppo-autonomous-driving" && (
        <svg viewBox="0 0 800 500" className="project-visual__drawing" aria-hidden="true">
          <path d="M-60 463C180 455 95 90 420 93S649 356 860-9" fill="none" stroke="#1c3337" strokeWidth="180" />
          <path d="M-60 463C180 455 95 90 420 93S649 356 860-9" fill="none" stroke="#74c9d2" strokeWidth="3" opacity=".6" />
          <path d="M-60 463C180 455 95 90 420 93S649 356 860-9" fill="none" stroke="#dcebe8" strokeWidth="2" strokeDasharray="16 20" opacity=".7" />
          <path d="M-60 463C180 455 95 90 420 93S649 356 860-9" fill="none" stroke="#74c9d2" strokeWidth="180" opacity=".17" strokeDasharray="2 13" />
          <g transform="translate(413 95) rotate(-86)"><rect x="-33" y="-15" width="66" height="30" rx="5" fill="#d7f4ef" /><rect x="-18" y="-12" width="23" height="24" fill="#2d5960" /><circle cx="-19" cy="-18" r="5" fill="#101719"/><circle cx="22" cy="-18" r="5" fill="#101719"/><circle cx="-19" cy="18" r="5" fill="#101719"/><circle cx="22" cy="18" r="5" fill="#101719"/></g>
          <circle cx="413" cy="95" r="57" fill="none" stroke="#d7f4ef" strokeDasharray="3 9" />
          <path d="M460 64h150m-150 13h93m-93 13h119" stroke="#94b9b8" strokeWidth="2" opacity=".55" />
          <text x="482" y="56" fill="#d7f4ef" fontSize="13" fontFamily="monospace">POLICY UPDATE</text>
        </svg>
      )}
      {project.slug === "ros2-robot-control" && (
        <svg viewBox="0 0 800 500" className="project-visual__drawing" aria-hidden="true">
          <path d="M50 409h700" stroke="#708789" strokeWidth="2" />
          <path d="M135 396L318 267 484 311 618 145" fill="none" stroke="#1d2426" strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M135 396L318 267 484 311 618 145" fill="none" stroke="#bdc9c6" strokeWidth="29" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M135 396L318 267 484 311 618 145" fill="none" stroke="#e5e9e5" strokeWidth="4" opacity=".65" />
          {[ [135,396], [318,267], [484,311] ].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="27" fill="#172022" stroke="#ef9e84" strokeWidth="3"/><circle cx={x} cy={y} r="9" fill="#ef9e84"/></g>)}
          <circle cx="618" cy="145" r="36" fill="none" stroke="#ef9e84" strokeDasharray="3 7" strokeWidth="2" />
          <path d="M580 145h76m-38-38v76" stroke="#ef9e84" opacity=".7" />
          <path d="M170 168h105m-105 23h75m-75 23h95" stroke="#ef9e84" strokeWidth="3" opacity=".5" />
          <text x="169" y="153" fill="#f0b4a1" fontSize="13" fontFamily="monospace">q / q_dot</text>
        </svg>
      )}
      {project.slug === "mechatronic-prototyping" && (
        <svg viewBox="0 0 800 500" className="project-visual__drawing" aria-hidden="true">
          <path d="M100 390l251-147 294 103-250 128z" fill="#263535" stroke="#a4c4a5" strokeWidth="2" />
          <path d="M101 390v-40l250-144 294 104v36M351 206v37m294 67v36" fill="none" stroke="#a4c4a5" strokeWidth="2" strokeDasharray="5 8" />
          <path d="M248 267l103-60 158 55-103 62z" fill="#455348" stroke="#e6efe4" strokeWidth="2" />
          <path d="M248 267v59l158 56v-58m103-62v59l-103 61" fill="#283c34" stroke="#e6efe4" strokeWidth="2" />
          <path d="M311 126l81-47 105 38-81 47zM311 126v48l105 38v-48m81-47v48l-81 47" fill="#6d8572" stroke="#e6efe4" strokeWidth="2" />
          <path d="M415 212v34m0 16v30M362 232l-28 16m108-14 32 11" stroke="#b4d2b7" strokeWidth="2" strokeDasharray="5 7" />
          <circle cx="416" cy="230" r="54" fill="none" stroke="#b4d2b7" opacity=".5" strokeDasharray="3 8" />
          <text x="546" y="113" fill="#d5ead6" fontSize="13" fontFamily="monospace">EXPLODED VIEW</text>
        </svg>
      )}
      {project.slug === "camera-gps-acquisition" && (
        <svg viewBox="0 0 800 500" className="project-visual__drawing" aria-hidden="true">
          <circle cx="300" cy="232" r="135" fill="none" stroke="#b4c9c2" strokeWidth="2"/><circle cx="300" cy="232" r="91" fill="none" stroke="#d9ae5b" strokeWidth="3"/><circle cx="300" cy="232" r="29" fill="#d9ae5b"/>
          <path d="M299 366v69m-90 0h180M421 192h187m-187 82h187" stroke="#b4c9c2" strokeWidth="3" />
          <circle cx="631" cy="192" r="27" fill="none" stroke="#d9ae5b" strokeWidth="3"/><path d="M630 274l-28 44 28 44 29-44z" fill="#d9ae5b"/>
          <text x="464" y="170" fill="#d9ae5b" fontSize="13" fontFamily="monospace">CAMERA</text><text x="471" y="256" fill="#d9ae5b" fontSize="13" fontFamily="monospace">GPS</text>
        </svg>
      )}
      <span className="project-visual__foot">CONCEPT / NOT PROJECT MEDIA</span>
    </div>
  );
}
