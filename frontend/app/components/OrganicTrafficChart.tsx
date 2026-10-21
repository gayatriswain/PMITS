"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";

const TEAL = "#0d9488";

const data = [
  { value: 10 },
  { value: 18 },
  { value: 15 },
  { value: 28 },
  { value: 24 },
  { value: 38 },
  { value: 34 },
  { value: 50 },
  { value: 46 },
  { value: 62 },
  { value: 70 },
];

export default function OrganicTrafficChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
        <defs>
          <linearGradient id="organicFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={TEAL} stopOpacity={0.35} />
            <stop offset="100%" stopColor={TEAL} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={TEAL}
          strokeWidth={2.5}
          fill="url(#organicFill)"
          dot={false}
          isAnimationActive
          animationDuration={1400}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
