"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { step: "00", loss: 0.96, reward: 0.12 },
  { step: "10", loss: 0.71, reward: 0.31 },
  { step: "20", loss: 0.48, reward: 0.48 },
  { step: "30", loss: 0.38, reward: 0.64 },
  { step: "40", loss: 0.27, reward: 0.76 },
  { step: "50", loss: 0.18, reward: 0.86 }
];

export function ProjectChart() {
  return (
    <div className="h-72 rounded-lg border border-line bg-white/[0.03] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="step" stroke="#a8a59c" tickLine={false} axisLine={false} />
          <YAxis stroke="#a8a59c" tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: "#101011", border: "1px solid rgba(255,255,255,.12)", color: "#efeee8" }} />
          <Line dataKey="loss" stroke="#d8a545" strokeWidth={2} dot={false} />
          <Line dataKey="reward" stroke="#8adce7" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
