"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { HomeIcon, GridIcon, BarChartUpIcon, UsersIcon, GearIcon } from "../shared/icons";
import { Counter } from "../shared/useCountUp";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const TEAL = "#12a883";

const statTiles__cms = [
  { label: "Website Traffic", target: 215 },
  { label: "Leads Generated", target: 180 },
  { label: "Keywords Ranked", target: 120 },
];

const months__cms = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const values = [5, 42, 35, 68, 60, 95, 88, 140, 130, 195, 205, 215];


const sidebarIcons = [
  { Icon: HomeIcon, active: false },
  { Icon: GridIcon, active: false },
  { Icon: BarChartUpIcon, active: true },
  { Icon: UsersIcon, active: false },
  { Icon: GearIcon, active: false },
];

function StatTile({ label, target }: { label: string; target: number }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-small font-bold" style={{ color: TEAL }}>
        <Counter target={target} prefix="+" suffix="%" />
      </p>
      <p className="mt-1 text-[10px] leading-tight text-slate-500">{label}</p>
    </div>
  );
}

export default function GrowthDashboardCard() {
  const $t = useCmsText();
  const statTiles = useCmsData("GrowthDashboardCard__statTiles", statTiles__cms);
  const months = useCmsData("GrowthDashboardCard__months", months__cms);
  const chartData = values.map((value, i) => ({
  month: i % 2 === 0 ? months[i / 2] : "",
  value,
}));
  return (
    <div className="lg:[perspective:650px]">
      <div className="relative">
        {/* Decorative soft backdrop — large blurred gray gradient for depth */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl lg:block"
          style={{
            background:
              "radial-gradient(circle, rgba(100,116,139,0.55) 0%, rgba(148,163,184,0.35) 45%, transparent 75%)",
          }}
        />

        <div className="relative overflow-hidden rounded-2xl bg-white shadow-[28px_50px_100px_-25px_rgba(15,23,42,0.5)] ring-1 ring-slate-100 lg:[transform-origin:right_center] lg:[transform:rotateY(-38deg)_rotateX(6deg)]">
        {/* Browser-style title bar */}
        <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
        </div>

        <div className="flex">
          {/* Icon dock */}
          <div className="flex flex-col items-center gap-3 py-5 px-2.5" style={{ backgroundColor: NAVY }}>
            {sidebarIcons.map(({ Icon, active }, i) => (
              <span
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: active ? TEAL : "transparent",
                  color: active ? "white" : "rgba(255,255,255,0.55)",
                }}
              >
                <Icon />
              </span>
            ))}
          </div>

          {/* Main panel */}
          <div className="flex-1 p-5">
            <div className="flex items-center justify-between">
              <p className="text-small font-bold text-black">{rich($t("GrowthDashboardCard__t1", "Your Business Growth"))}</p>
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#e6f6f4", color: TEAL }}
              >
                <BarChartUpIcon />
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {statTiles.map((tile) => (
                <StatTile key={tile.label} label={tile.label} target={tile.target} />
              ))}
            </div>

            <div className="relative mt-5 rounded-xl bg-slate-50 p-4 pt-3">
              <div className="flex items-center justify-between">
                <p className="text-caption font-semibold text-slate-500">{rich($t("GrowthDashboardCard__t2", "Growth Overview"))}</p>
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-bold text-white shadow-md"
                  style={{ backgroundColor: TEAL }}
                >
                  <Counter target={215} prefix="+" suffix="%" />
                </span>
              </div>

              <div className="mt-2 h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 8, right: 4, left: -22, bottom: 0 }}>
                    <defs>
                      <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={TEAL} stopOpacity={0.35} />
                        <stop offset="100%" stopColor={TEAL} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" />
                    <YAxis
                      domain={[0, 300]}
                      ticks={[0, 150, 300]}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `${v}%`}
                      tick={{ fontSize: 9, fill: "#94a3b8" }}
                      width={34}
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                      tick={{ fontSize: 9, fill: "#94a3b8" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={TEAL}
                      strokeWidth={2.5}
                      fill="url(#growthFill)"
                      dot={{ r: 3, stroke: "white", strokeWidth: 1.5, fill: TEAL }}
                      activeDot={false}
                      isAnimationActive
                      animationDuration={1600}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 pl-2">
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
          <path d="M4 22c3-10 12-14 20-10" />
          <path d="M18 9l6 3-2 6" />
        </svg>
        <p className="text-caption max-w-[220px] italic text-slate-600">{rich($t("GrowthDashboardCard__t3m", "We turn ideas into <span class=\"font-medium text-[#12a883]\">digital growth engines.</span>"))}</p>
      </div>
    </div>
  );
}
