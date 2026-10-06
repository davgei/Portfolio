export function MetricDisplay({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-white/[0.035] p-5">
      <div className="font-mono text-xs uppercase text-muted">{label}</div>
      <div className="mt-3 text-2xl font-semibold text-mist">{value}</div>
    </div>
  );
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-line bg-ink p-5 text-sm text-mist">
      <code>{code}</code>
    </pre>
  );
}

export function ArchitectureDiagram() {
  return (
    <div className="grid gap-3 rounded-lg border border-line bg-white/[0.03] p-5 sm:grid-cols-3">
      {["Sensor input", "Inference / control", "Actuator output"].map((item) => (
        <div key={item} className="rounded-lg border border-line bg-panel p-4 text-sm text-mist">
          {item}
        </div>
      ))}
    </div>
  );
}
