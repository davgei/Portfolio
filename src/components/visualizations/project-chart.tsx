"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export type ChartPoint = { step: number; value: number };

export function ProjectChart({ points, label, color = "#8adce7" }: { points: ChartPoint[]; label: string; color?: string }) {
  if (points.length === 0) return null;
  return (
    <figure className="border border-line bg-panel p-4">
      <figcaption className="mb-4 font-mono text-xs uppercase text-muted">{label}</figcaption>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points}>
            <XAxis dataKey="step" stroke="#a8a59c" tickLine={false} axisLine={false} />
            <YAxis stroke="#a8a59c" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#101011", border: "1px solid rgba(255,255,255,.12)", color: "#efeee8" }} />
            <Line dataKey="value" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
