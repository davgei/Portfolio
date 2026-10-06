export function MetricDisplay({ label, value }: { label: string; value: string }) {
  return <div className="border-t border-line pt-4"><dt className="font-mono text-xs uppercase text-muted">{label}</dt><dd className="mt-2 text-2xl font-semibold text-mist">{value}</dd></div>;
}

export function CodeBlock({ code }: { code: string }) {
  return <pre className="overflow-x-auto border border-line bg-ink p-5 text-sm text-mist"><code>{code}</code></pre>;
}

export function ArchitectureDiagram({ stages }: { stages: string[] }) {
  return <ol className="flex flex-wrap gap-3 border-y border-line py-5">{stages.map((stage, index) => <li key={`${index}-${stage}`} className="flex items-center gap-3 text-sm text-mist"><span className="font-mono text-xs text-amber">0{index + 1}</span>{stage}{index < stages.length - 1 && <span className="text-muted" aria-hidden="true">→</span>}</li>)}</ol>;
}
