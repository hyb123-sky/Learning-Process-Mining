"use client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";

export function ScoreChart({
  data,
}: {
  data: { name: string; score: number }[];
}) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-pf-text-muted">完了した章がまだありません。</p>
    );
  }
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: -10 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "hsl(218 10% 55%)" }}
            stroke="hsl(35 20% 85%)"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "hsl(218 10% 55%)" }}
            stroke="hsl(35 20% 85%)"
          />
          <Tooltip
            contentStyle={{
              background: "hsl(42 30% 96%)",
              border: "1px solid hsl(35 20% 85%)",
              fontSize: 12,
            }}
            cursor={{ fill: "hsl(35 30% 87% / 0.4)" }}
          />
          <Bar dataKey="score" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={d.score >= 90 ? "hsl(145 55% 42%)" : d.score >= 70 ? "hsl(38 65% 52%)" : "hsl(0 72% 55%)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
