"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";

/* =========================================================================
   VISUALS: every illustration is drawn in code (HTML + SVG), no image files
   ========================================================================= */

const BLUE = "#1d63ff";

/** White "app window" that sits inside a card's visual area */
function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`absolute inset-x-[7%] top-[11%] bottom-[6%] overflow-hidden rounded-lg bg-white shadow-[0_18px_36px_-18px_rgba(15,35,51,0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ---- 1. Analytics dashboard: header + smooth area chart ---- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const SERIES = [8, 28, 64, 70, 46, 52, 66, 74, 82];
const CURSOR = 3; // the highlighted point (Apr)

// Smooth line through the points (Catmull-Rom converted to cubic beziers)
function smoothPath(pts: [number, number][]) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

function AnalyticsVisual() {
  const W = 250;
  const H = 96;
  const x0 = 22;
  const y0 = 4;
  const pts = SERIES.map((v, i) => [x0 + (i * (W - x0)) / (SERIES.length - 1), y0 + (1 - v / 100) * (H - y0 - 14)] as [number, number]);
  const line = smoothPath(pts);
  const area = `${line} L${pts[pts.length - 1][0]} ${H - 14} L${pts[0][0]} ${H - 14} Z`;
  const [cx, cy] = pts[CURSOR];

  return (
    <Panel className="px-4 pb-2 pt-3">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold text-slate-700">Sandro Tavares</span>
        <span className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1 text-[8px] font-medium text-slate-600">
          Last 15 Days
          <svg viewBox="0 0 10 10" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 3.5l3 3 3-3" />
          </svg>
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-1.5 h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="crm-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={BLUE} stopOpacity="0.22" />
            <stop offset="1" stopColor={BLUE} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 20, 40, 60, 80, 100].map((v) => {
          const y = y0 + (1 - v / 100) * (H - y0 - 14);
          return (
            <g key={v}>
              <text x="0" y={y + 2} fontSize="5.5" fill="#94a3b8">
                {v}
              </text>
              <line x1={x0 - 4} x2={W} y1={y} y2={y} stroke="#eef1f5" strokeWidth="0.6" />
            </g>
          );
        })}
        <path d={area} fill="url(#crm-area)" />
        <path d={line} fill="none" stroke={BLUE} strokeWidth="1.3" strokeLinecap="round" />
        {/* cursor */}
        <circle cx={cx} cy={cy} r="2.2" fill="#fff" stroke={BLUE} strokeWidth="1.2" />
        <path d={`M${cx + 1.5} ${cy + 1} l5 8 l-1.6 -0.4 l-1.4 2.6 l-1.2 -0.7 l1.4 -2.5 l-2 -0.6z`} fill="#0f2333" />
        {MONTHS.map((m, i) => (
          <text key={m} x={pts[i][0]} y={H - 3} fontSize="5.5" fill="#94a3b8" textAnchor="middle">
            {m}
          </text>
        ))}
      </svg>
    </Panel>
  );
}

/* ---- 2. Relationship organisation: record header, contact rows, progress donut ---- */

function RelationshipVisual() {
  const r = 17;
  const circ = 2 * Math.PI * r;
  return (
    <Panel className="px-4 pt-3.5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[8.5px] font-semibold text-slate-800">Intelligent CRM Framework</p>
          <p className="mt-1 text-[6.5px] text-slate-400">
            Participant: <span className="text-slate-600">Alex Tarafe</span>
            <span className="mx-2">·</span>
            Date added: <span className="text-slate-600">18/08/2024</span>
          </p>
        </div>
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[6.5px] font-semibold text-blue-600">Medium</span>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
        <ul className="space-y-2.5">
          {[
            { name: "Arona Holdan", tag: "High", bars: ["w-16", "w-10"] },
            { name: "Rahild Alaniv", tag: null, bars: ["w-14", "w-8"] },
          ].map((p) => (
            <li key={p.name} className="rounded-md border border-slate-100 px-2.5 py-2 shadow-[0_2px_6px_-4px_rgba(15,35,51,0.25)]">
              <div className="flex items-center justify-between">
                <span className="text-[8.5px] font-semibold text-slate-700">{p.name}</span>
                {p.tag && (
                  <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[6px] font-semibold text-emerald-600">{p.tag}</span>
                )}
              </div>
              <div className="mt-1.5 space-y-1">
                {p.bars.map((w, i) => (
                  <span key={i} className={`block h-1 rounded-full bg-slate-100 ${w}`} />
                ))}
              </div>
            </li>
          ))}
        </ul>

        <div className="flex w-[82px] flex-col items-center pt-1">
          <p className="self-start text-[6px] text-slate-400">Project Progress</p>
          <div className="relative mt-1 h-[58px] w-[58px]">
            <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90" aria-hidden>
              <circle cx="22" cy="22" r={r} fill="none" stroke="#e8edf5" strokeWidth="5" />
              <circle
                cx="22"
                cy="22"
                r={r}
                fill="none"
                stroke={BLUE}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${circ * 0.62} ${circ}`}
              />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-[10px] font-bold text-slate-800">15%</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-[5.5px] text-slate-500">
            <span className="flex items-center gap-0.5">
              <i className="h-1 w-1 rounded-full" style={{ background: BLUE }} />
              Completed
            </span>
            <span className="flex items-center gap-0.5">
              <i className="h-1 w-1 rounded-full bg-slate-200" />
              In progress
            </span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ---- 3. Data analysis: a hub connected to labelled nodes ---- */

type Node = { label: string; x: number; y: number; tone: "blue" | "red" | "green" | "white" };
// x / y are % of the visual area
const NODES: Node[] = [
  { label: "Dashboard", x: 27, y: 29, tone: "blue" },
  { label: "Metrics", x: 20, y: 46, tone: "red" },
  { label: "Contacts", x: 27, y: 62, tone: "blue" },
  { label: "Activity", x: 20, y: 76, tone: "green" },
  { label: "Reports", x: 73, y: 29, tone: "white" },
  { label: "Pipeline", x: 80, y: 46, tone: "white" },
  { label: "Workspace", x: 73, y: 62, tone: "white" },
  { label: "Insights", x: 80, y: 76, tone: "white" },
];
const TONE: Record<Node["tone"], string> = {
  blue: "bg-[#5b8dff] text-white",
  red: "bg-[#f0556a] text-white",
  green: "bg-[#2fcf73] text-white",
  white: "bg-white text-slate-600 ring-1 ring-slate-200",
};

function DataFlowVisual() {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {NODES.map((n) => (
          <line
            key={n.label}
            x1="50"
            y1="52"
            x2={n.x}
            y2={n.y}
            stroke="#cdd3dd"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* corner tool buttons */}
      {[
        { x: 14, y: 12 },
        { x: 86, y: 12 },
        { x: 14, y: 88 },
        { x: 86, y: 88 },
      ].map((c, i) => (
        <span
          key={i}
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
          className="absolute grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border border-slate-200 bg-white/80"
        >
          <i className="h-1.5 w-1.5 rounded-sm border border-slate-400" />
        </span>
      ))}

      {NODES.map((n) => (
        <span
          key={n.label}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md px-2.5 py-1 text-[8px] font-medium shadow-[0_4px_10px_-6px_rgba(15,35,51,0.5)] ${TONE[n.tone]}`}
        >
          {n.label}
        </span>
      ))}

      {/* hub */}
      <span className="absolute left-1/2 top-[52%] grid h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-gradient-to-br from-[#3b82ff] to-[#1d4ed8] shadow-[0_14px_28px_-10px_rgba(29,78,216,0.8)] ring-4 ring-white/70">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M7 5v8a5 5 0 0010 0V5" />
          <path d="M12 9v4" />
        </svg>
      </span>
    </div>
  );
}

/* ---- 4. Task planner: filter form with selects and actions ---- */

function Select({ value, chip }: { value: string; chip?: boolean }) {
  return (
    <span className="flex items-center justify-between rounded border border-slate-200 bg-white px-2 py-1 text-[7px] text-slate-600">
      <span className={chip ? "rounded bg-blue-50 px-1.5 py-px font-semibold text-blue-600" : ""}>{value}</span>
      <svg viewBox="0 0 10 10" className="h-1.5 w-1.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M2 3.5l3 3 3-3" />
      </svg>
    </span>
  );
}

function PlannerVisual() {
  return (
    <Panel className="px-4 pb-3 pt-3">
      <div className="flex items-center justify-between text-[7px]">
        <span className="font-semibold text-slate-700">Task filters</span>
        <span className="font-medium" style={{ color: BLUE }}>
          Reset filter
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-[34px_1fr_8px] items-center gap-x-2 gap-y-2">
        {[
          { l: "Owner", v: "Blue Link", chip: false },
          { l: "Status", v: "New Lead", chip: true },
          { l: "Due", v: "Mar 4, 2025", chip: false },
          { l: "Priority", v: "High", chip: false },
        ].map((row) => (
          <React.Fragment key={row.l}>
            <span className="text-[6.5px] text-slate-400">{row.l}</span>
            <Select value={row.v} chip={row.chip} />
            <span className="text-[8px] leading-none text-slate-300">⋮</span>
          </React.Fragment>
        ))}
      </div>

      <p className="mt-2.5 text-[7px] font-medium" style={{ color: BLUE }}>
        + Add Filter
      </p>

      <div className="mt-2.5 flex justify-end gap-2">
        <span className="rounded border border-slate-200 px-2.5 py-1 text-[7px] font-medium text-slate-600">Cancel</span>
        <span className="rounded px-3 py-1 text-[7px] font-semibold text-white" style={{ background: BLUE }}>
          Apply
        </span>
      </div>
    </Panel>
  );
}

/* =========================================================================
   DATA
   ========================================================================= */

interface ToolCard {
  title: string;
  desc: string;
  href: string;
  visual: React.ReactNode;
  label: string; // accessible description of the illustration
  cardBg: string; // card background
}

const tools: ToolCard[] = [
  {
    title: "Advanced Analytics Dashboard",
    desc: "Turn raw data into meaningful insights with real-time reports, smart visualizations, and performance metrics.",
    href: "#",
    visual: <AnalyticsVisual />,
    label: "Analytics dashboard with a line chart of monthly performance",
    cardBg: "bg-[linear-gradient(160deg,#1560ff_0%,#4d8dff_45%,#cfe0ff_100%)]",
  },
  {
    title: "Streamlined Relationship Organization",
    desc: "Simplify how you manage connections with streamlined relationship organization — effortlessly.",
    href: "#",
    visual: <RelationshipVisual />,
    label: "CRM record with contacts and a project progress chart",
    cardBg: "bg-[#f4f5f7]",
  },
  {
    title: "Smart and Effortless Data Analysis",
    desc: "Experience smart and effortless data analysis with advanced AI tools that simplify insights, visualize patterns.",
    href: "#",
    visual: <DataFlowVisual />,
    label: "A central hub connected to dashboard, metrics, reports and other data nodes",
    cardBg: "bg-[linear-gradient(135deg,#dcdee3_0%,#f1f2f4_45%,#ffffff_100%)]",
  },
  {
    title: "Intelligent Automated Task Planner",
    desc: "Boost efficiency with an intelligent automated task planner — effortlessly schedule, prioritize and manage.",
    href: "#",
    visual: <PlannerVisual />,
    label: "Task filter form with owner, status and due date fields",
    cardBg: "bg-[#f4f5f7]",
  },
];

/* =========================================================================
   MAIN SECTION
   ========================================================================= */

export default function CustomCrmSmartTools() {
  return (
    <section className="relative w-full bg-white py-16 sm:py-20 font-sans">
      <Container>
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] text-slate-700 uppercase">Features</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.15] text-[#0f2333]">
            Smarter Tools to
            <br />
            Accelerate Your Growth
          </h2>
          <p className="mt-4 text-sm sm:text-[15px] text-slate-500 leading-relaxed">
            Explore powerful features designed to simplify
            <br className="hidden sm:block" /> workflows and boost team productivity.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-10 sm:mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
            >
              <Link
                href={tool.href}
                className={`group relative block h-full rounded-md overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_40px_-20px_rgba(15,35,51,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d63ff] ${tool.cardBg}`}
              >
                {/* Illustration */}
                <div
                  role="img"
                  aria-label={tool.label}
                  className="relative aspect-[16/10] w-full overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                >
                  {tool.visual}
                </div>

                {/* Text */}
                <div className="px-5 sm:px-6 pt-5 pb-6 sm:pb-7">
                  <h3 className="text-base sm:text-[18px] font-bold text-[#0f2333] leading-snug group-hover:text-[#1d63ff] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-[13px] sm:text-sm text-slate-600 leading-relaxed">{tool.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
