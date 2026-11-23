"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";

const NAVY = "#0b1f4a";

/* =========================================================================
   SCALE BOX: lays children out at a fixed design size and scales them to the available width
   ========================================================================= */

function ScaleBox({ width, height, children }: { width: number; height: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left", visibility: scale ? "visible" : "hidden" }}>
        {children}
      </div>
    </div>
  );
}

/* Steps through 0..count-1 on an interval (used for the looping tick animations) */
function useTicker(ms: number, count: number) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % count), ms);
    return () => clearInterval(timer);
  }, [ms, count]);
  return step;
}

/* =========================================================================
   ICONS
   ========================================================================= */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Icon = ({ d, className = "w-4 h-4" }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d={d} />
  </svg>
);

const Sparkle = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2c.6 4.6 2.4 7.4 7 8-4.6.6-6.4 3.4-7 8-.6-4.6-2.4-7.4-7-8 4.6-.6 6.4-3.4 7-8Z" />
    <path d="M19 14c.3 2 1 3 3 3.3-2 .3-2.7 1.300-3 3.300-.3-2-1-3-3-3.300 2-.3 2.700-1.300 3-3.300Z" opacity="0.8" />
  </svg>
);

const D = {
  mail: "M3 6h18v12H3ZM3.5 7l8.5 6.5L20.5 7",
  check: "m5 12.5 4.500 4.500L19 7.500",
  calendar: "M5 5h14v15H5ZM9 3v4M15 3v4M5 10h14",
  layers: "m12 3 9 5-9 5-9-5ZM3 13l9 5 9-5",
  folder: "M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z",
  clip: "M20 11.500 12 19.500a5 5 0 0 1-7-7l8-8a3.300 3.300 0 0 1 4.700 4.700l-8 8a1.700 1.700 0 0 1-2.400-2.400l7.300-7.300",
  db: "M5 6c0-1.700 3.100-3 7-3s7 1.300 7 3-3.100 3-7 3-7-1.300-7-3Zm0 0v12c0 1.700 3.100 3 7 3s7-1.300 7-3V6M5 12c0 1.700 3.100 3 7 3s7-1.300 7-3",
  sliders: "M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M8 14v6",
  arrow: "M5 12h14M13 6l6 6-6 6",
  play: "M8 5.500v13l11-6.500Z",
} as const;

/* =========================================================================
   FLOATING CARDS
   ========================================================================= */

function FloatCard({
  className,
  style,
  delay,
  float = 5,
  children,
}: {
  className?: string;
  style: React.CSSProperties;
  delay: number;
  float?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="absolute"
      style={style}
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={`rounded-xl bg-white/95 backdrop-blur border border-slate-100 shadow-[0_20px_44px_-22px_rgba(15,35,80,0.35)] p-3 text-[#0b1f4a] whitespace-nowrap ${className ?? ""}`}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: float, repeat: Infinity, ease: "easeInOut", delay: delay + 0.8 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const AiChip = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-2 flex items-center gap-1.5 rounded-md bg-[#eef4fb] px-2 py-1.5 text-[9px] text-[#1b5fa8]">
    <Sparkle className="w-2.5 h-2.5" />
    {children}
  </div>
);

function EmailCard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-[18px] h-[18px] rounded bg-[#2563eb] text-white flex items-center justify-center">
            <Icon d={D.mail} className="w-3 h-3" />
          </span>
          <span className="text-[10.5px] font-bold">New Email</span>
        </div>
        <span className="text-[8.5px] text-slate-400">9:41 AM</span>
      </div>
      <div className="mt-2 text-[10px] font-bold">Project Update</div>
      <div className="text-[9px] text-slate-500">From: Sarah Miller</div>
      <AiChip>AI will draft a reply</AiChip>
    </>
  );
}

function TasksCard() {
  const step = useTicker(1700, 4); // 0 -> none done, 1 -> first, 2 -> first two, 3 -> hold
  const tasks = [
    { t: "Client proposal", w: "9:30 AM" },
    { t: "Strategy call", w: "11:30 AM" },
    { t: "Design review", w: "2:00 PM" },
  ];
  return (
    <>
      <div className="flex items-center gap-1.5">
        <span className="w-[18px] h-[18px] rounded-full bg-[#2563eb] text-white flex items-center justify-center">
          <Icon d={D.check} className="w-3 h-3" />
        </span>
        <span className="text-[10.5px] font-bold">Today&apos;s Tasks</span>
      </div>
      <div className="mt-2.5 flex flex-col gap-2">
        {tasks.map((task, i) => {
          const done = i < step;
          return (
            <div key={task.t} className="flex items-center gap-2">
              <span
                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors duration-500 ${
                  done ? "bg-[#0f8a83] border-[#0f8a83] text-white" : "border-[#0f8a83] text-transparent"
                }`}
              >
                <Icon d={D.check} className="w-2.5 h-2.5" />
              </span>
              <span className="flex-1 text-[9.5px]">{task.t}</span>
              <span className="text-[8.5px] text-slate-400">{task.w}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-2.5 flex items-center gap-1.5 text-[9px] text-[#0f8a83]">
        <Sparkle className="w-2.5 h-2.5" />2 tasks automated
      </div>
    </>
  );
}

function MeetingCard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-[18px] h-[18px] rounded bg-[#2563eb] text-white flex items-center justify-center">
            <Icon d={D.calendar} className="w-3 h-3" />
          </span>
          <span className="text-[10.5px] font-bold">Upcoming Meeting</span>
        </div>
        <span className="text-[8.5px] text-slate-400">11:30 AM</span>
      </div>
      <div className="mt-2 text-[10px] font-bold">Strategy Sync</div>
      <div className="text-[9px] text-slate-500">30 min • Google Meet</div>
      <div className="mt-2 flex items-center gap-1.5 text-[9px] text-[#0f8a83]">
        <Sparkle className="w-2.5 h-2.5" />
        AI prepared brief
      </div>
    </>
  );
}

function SummaryCard() {
  const items = ["Project roadmap approved", "Q2 planning finalized", "Design feedback captured"];
  return (
    <>
      <div className="flex items-center gap-1.5 text-[#1b5fa8]">
        <Sparkle className="w-3.5 h-3.5" />
        <span className="text-[10.5px] font-bold text-[#0b1f4a]">AI Summary</span>
      </div>
      <div className="mt-2.5 flex flex-col gap-2">
        {items.map((t, i) => (
          <motion.div
            key={t}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.35, duration: 0.4 }}
          >
            <span className="w-3.5 h-3.5 rounded bg-[#0f8a83] text-white flex items-center justify-center">
              <Icon d={D.check} className="w-2.5 h-2.5" />
            </span>
            <span className="text-[9.5px]">{t}</span>
          </motion.div>
        ))}
        <div className="flex items-center gap-2 text-slate-500">
          <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="#0f8a83" strokeWidth="2.500" strokeLinecap="round">
            <path d="M12 3a9 9 0 1 1-9 9" opacity="0.9" />
            <circle cx="12" cy="12" r="9" opacity="0.15" />
          </svg>
          <span className="text-[9.5px]">Action items assigned</span>
        </div>
      </div>
    </>
  );
}

function SystemsCard() {
  return (
    <>
      <div className="flex items-center gap-1.5">
        <span className="text-[#1b5fa8]">
          <Icon d={D.layers} className="w-4 h-4" />
        </span>
        <span className="text-[10.5px] font-bold">Connected Systems</span>
      </div>
      <div className="mt-3 flex items-center gap-2.5">
        {/* Salesforce */}
        <svg viewBox="0 0 32 22" className="w-7 h-5">
          <path d="M13 3a5.500 5.500 0 0 1 9 2 4.500 4.500 0 0 1 5 7 4 4 0 0 1-4.500 5.500A5 5 0 0 1 14 18.500 4.500 4.500 0 0 1 6 16a4.500 4.500 0 0 1 1-8.500A5.500 5.500 0 0 1 13 3Z" fill="#1798c1" />
        </svg>
        {/* Slack */}
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <rect x="9.500" y="2" width="4" height="9" rx="2" fill="#36c5f0" />
          <rect x="13" y="9.500" width="9" height="4" rx="2" fill="#2eb67d" />
          <rect x="10.500" y="13" width="4" height="9" rx="2" fill="#ecb22e" />
          <rect x="2" y="10.500" width="9" height="4" rx="2" fill="#e01e5a" />
        </svg>
        {/* Gmail */}
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path d="M3 6.500v11h3.500V10.500L12 14.500l5.500-4v7H21v-11L19 5l-7 5.200L5 5Z" fill="#ea4335" />
          <path d="M3 6.500 5 5l1.500 1.200V17.500H3Z" fill="#c5221f" />
          <path d="M21 6.500 19 5l-1.500 1.200V17.500H21Z" fill="#4285f4" />
        </svg>
        {/* Notion */}
        <span className="w-5 h-5 rounded bg-white border border-slate-800 text-slate-900 text-[11px] font-black flex items-center justify-center">N</span>
        {/* More */}
        <span className="w-5 h-5 rounded-full border border-slate-300 text-slate-500 text-[12px] leading-none flex items-center justify-center">+</span>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[9px] text-slate-500">
        <motion.span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
        All systems in sync
      </div>
    </>
  );
}

function FilesCard() {
  const files = [
    { c: "#ef4444", t: "PDF" },
    { c: "#16a34a", t: "XLS" },
    { c: "#2563eb", t: "DOC" },
  ];
  return (
    <>
      <div className="flex items-center gap-1.5">
        <span className="text-[#1b5fa8]">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d={D.folder} />
          </svg>
        </span>
        <span className="text-[10.5px] font-bold">Files Organized</span>
      </div>
      <div className="mt-2 text-[9.5px] leading-snug">
        5 files sorted
        <br />
        <span className="text-slate-500">in Project Folder</span>
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        {files.map((f, i) => (
          <motion.span
            key={f.t}
            className="w-[18px] h-[22px] rounded-[3px] text-white text-[6.5px] font-bold flex items-end justify-center pb-[2px]"
            style={{ backgroundColor: f.c }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
          >
            {f.t}
          </motion.span>
        ))}
        <span className="px-1.5 h-[18px] rounded-full border border-slate-300 text-[8.5px] text-slate-500 flex items-center">+2</span>
      </div>
    </>
  );
}

/* =========================================================================
   NETWORK (lines + glowing nodes), drawn in the 1200 x 600 design space
   ========================================================================= */

const links = [
  "M342 156 C 380 168 398 215 396 255 C 394 310 440 348 482 368",
  "M281 296 C 320 300 330 325 360 330 C 400 335 440 360 482 378",
  "M348 437 C 380 445 420 435 440 425 C 455 405 470 398 490 398",
  "M833 166 C 800 180 790 230 793 264 C 796 318 760 350 716 368",
  "M903 301 C 860 305 840 325 800 330 C 770 335 745 360 716 382",
  "M843 430 C 810 435 780 425 760 420 C 748 405 735 398 712 398",
];

const nodes: [number, number][] = [
  [342, 156], [396, 255], [281, 296], [348, 437], [486, 345],
  [715, 342], [793, 264], [833, 166], [903, 301], [843, 430],
];

function Network() {
  return (
    <svg className="absolute inset-0 w-[1200px] h-[740px] pointer-events-none" viewBox="0 0 1200 740" fill="none">
      <defs>
        <linearGradient id="aiLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#38bdf8" stopOpacity="0.75" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity="0.15" />
        </linearGradient>
        <filter id="aiGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {links.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="url(#aiLine)"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.5 + i * 0.15, ease: "easeOut" }}
        />
      ))}

      {/* Light travelling along each link */}
      {links.map((d, i) => (
        <g key={`t-${d}`}>
          <circle r="5" fill="#38bdf8" opacity="0" filter="url(#aiGlow)">
            <animate attributeName="opacity" from="0" to="0.5" dur="0.01s" begin={`${1.5 + i * 0.4}s`} fill="freeze" />
            <animateMotion dur={`${4.5 + (i % 3)}s`} begin={`${1.5 + i * 0.4}s`} repeatCount="indefinite" path={d} />
          </circle>
          <circle r="2.2" fill="#ffffff" stroke="#38bdf8" strokeWidth="1" opacity="0">
            <animate attributeName="opacity" from="0" to="1" dur="0.01s" begin={`${1.5 + i * 0.4}s`} fill="freeze" />
            <animateMotion dur={`${4.5 + (i % 3)}s`} begin={`${1.5 + i * 0.4}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}

      {/* Nodes */}
      {nodes.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <motion.circle
            cx={x}
            cy={y}
            r="7"
            fill="#38bdf8"
            opacity="0.35"
            animate={{ r: [5, 10, 5], opacity: [0.45, 0.1, 0.45] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          />
          <circle cx={x} cy={y} r="3" fill="#2f9bf5" />
        </g>
      ))}
    </svg>
  );
}

/* Audio-style bars rising behind the figure */
function Equalizer() {
  const bars = Array.from({ length: 58 }, (_, i) => i);
  return (
    <div className="absolute left-[462px] top-[412px] w-[276px] h-[100px] flex items-end justify-between pointer-events-none">
      {bars.map((i) => {
        const h = 18 + Math.abs(Math.sin(i * 0.62)) * 54 + (i % 5) * 4;
        return (
          <motion.span
            key={i}
            className="w-px rounded-full bg-gradient-to-t from-[#38bdf8]/70 to-[#38bdf8]/0"
            style={{ height: h, originY: 1 }}
            animate={{ scaleY: [0.45, 1, 0.55] }}
            transition={{ duration: 2.2 + (i % 4) * 0.4, repeat: Infinity, ease: "easeInOut", delay: (i % 9) * 0.18 }}
          />
        );
      })}
    </div>
  );
}

/* =========================================================================
   COMMAND BOX
   ========================================================================= */

function CommandBox() {
  return (
    <motion.div
      className="absolute left-[308px] top-[565px] w-[569px] h-[129px] rounded-2xl bg-white border border-slate-100 shadow-[0_30px_60px_-30px_rgba(15,35,80,0.4)] p-5 text-[#0b1f4a]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3">
        <motion.span
          className="w-[42px] h-[42px] rounded-xl bg-[#edf4fd] text-[#1b5fa8] flex items-center justify-center"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkle className="w-5 h-5" />
        </motion.span>
        <div>
          <div className="text-[15px] font-bold leading-tight whitespace-nowrap">What should your AI agent handle today?</div>
          <div className="mt-0.5 text-[12px] text-slate-500 flex items-center">
            Describe a task or workflow...
            <motion.span className="ml-0.5 w-px h-3.5 bg-slate-400" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.1, repeat: Infinity }} />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {[
            { label: "Attach", d: D.clip },
            { label: "Connect Data", d: D.db },
            { label: "Set Preferences", d: D.sliders },
          ].map((b) => (
            <span key={b.label} className="inline-flex items-center gap-1.5 h-[34px] px-3.5 rounded-lg border border-slate-200 text-[11.5px] font-medium text-slate-700 whitespace-nowrap">
              <Icon d={b.d} className="w-3.5 h-3.5 text-slate-500" />
              {b.label}
            </span>
          ))}
        </div>
        <Link
          href="#"
          className="group inline-flex items-center gap-2 h-[36px] px-4 rounded-lg bg-[linear-gradient(90deg,#0b3b5a_0%,#0f6f78_100%)] text-white text-[12px] font-semibold whitespace-nowrap shadow-[0_10px_22px_-10px_rgba(11,59,90,0.8)]"
        >
          <Sparkle className="w-3 h-3" />
          Create AI Agent
          <Icon d={D.arrow} className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

/* =========================================================================
   MAIN HERO
   ========================================================================= */

function Heading() {
  return (
    <>
      <h1 className="font-extrabold tracking-tight text-[#0b1f4a]" style={{ fontFamily: "inherit" }}>
        AI That <span className="bg-gradient-to-r from-[#1e6fd6] to-[#0f8a83] bg-clip-text text-transparent">Thinks.</span>
        <br />
        AI That <span className="bg-gradient-to-r from-[#0f8a83] to-[#12b5a6] bg-clip-text text-transparent">Acts.</span>
      </h1>
    </>
  );
}

function Buttons() {
  return (
    <>
      <Link
        href="#contact"
        className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[linear-gradient(90deg,#0b3b5a_0%,#0f7a80_100%)] text-white font-semibold shadow-[0_14px_28px_-12px_rgba(11,59,90,0.8)] hover:brightness-110 transition"
      >
        Build Your AI Agent
        <Icon d={D.arrow} className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
      <Link
        href="#how-it-works"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-white border border-slate-200 text-[#0b1f4a] font-semibold shadow-[0_10px_24px_-14px_rgba(15,35,80,0.35)] hover:border-[#0f8a83] transition-colors"
      >
        <span className="w-[18px] h-[18px] rounded-full border border-[#0b1f4a] flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 ml-px" fill="currentColor">
            <path d={D.play} />
          </svg>
        </span>
        See How It Works
      </Link>
    </>
  );
}

export default function AgenticAiHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fd_55%,#eaf3fb_100%)] pt-6 pb-12 sm:pb-16 font-sans">
      {/* Soft glow behind the figure */}
      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 w-[760px] h-[460px] bg-sky-200/40 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* ======================= DESKTOP: fixed 1200 x 740 layout, scaled ======================= */}
        <div className="hidden lg:block">
          <ScaleBox width={1200} height={740}>
            <div className="relative w-[1200px] h-[740px] text-[#0b1f4a]">
              {/* Badge */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-[2px] inline-flex items-center gap-2 h-[27px] px-4 rounded-full bg-white border border-slate-200 shadow-[0_8px_20px_-12px_rgba(15,35,80,0.4)] text-[10.5px] font-bold tracking-[0.12em] text-[#0b1f4a] uppercase whitespace-nowrap"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[#2f9bf5]">
                  <Sparkle className="w-3 h-3" />
                </span>
                Custom Agentic AI Solution
              </motion.div>

              {/* Title */}
              <motion.div
                className="absolute left-0 right-0 top-[38px] text-center text-[50px] leading-[1.14]"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <Heading />
              </motion.div>

              {/* Subtitle */}
              <motion.p
                className="absolute left-1/2 -translate-x-1/2 top-[153px] w-[372px] text-center text-[13.5px] leading-[17px] text-slate-600"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                Intelligent AI agents that understand your business, make decisions, and take action—automatically.
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-[203px] flex items-center gap-4 text-[12.5px] [&>a]:h-[36px] [&>a]:w-[168px]"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <Buttons />
              </motion.div>

              {/* Network behind everything */}
              <Network />
              <Equalizer />

              {/* Halo rings around the head */}
              {[110, 150].map((r, i) => (
                <motion.span
                  key={r}
                  className="absolute rounded-full border border-sky-300/50"
                  style={{ width: r * 2, height: r * 2, left: 600 - r, top: 385 - r }}
                  animate={{ scale: [1, 1.05, 1], opacity: [0.7, 0.25, 0.7] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                />
              ))}
              <div className="absolute rounded-full bg-[radial-gradient(circle,rgba(125,200,255,0.45)_0%,rgba(125,200,255,0)_70%)]" style={{ width: 340, height: 340, left: 430, top: 225 }} />

              {/* Figure */}
              <motion.div
                className="absolute"
                style={{ left: 410, top: 272, width: 380 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                  <Image
                    src="/AI.webp"
                    alt="AI assistant"
                    width={1411}
                    height={1115}
                    priority
                    sizes="400px"
                    className="w-full h-auto select-none"
                    style={{
                      filter: "drop-shadow(0 20px 30px rgba(11, 31, 74, 0.16)) drop-shadow(0 6px 14px rgba(56, 189, 248, 0.24))",
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Left cards */}
              <FloatCard style={{ left: 173, top: 93, width: 165 }} delay={0.7} float={5}>
                <EmailCard />
              </FloatCard>
              <FloatCard style={{ left: 112, top: 226, width: 165 }} delay={0.85} float={5.6}>
                <TasksCard />
              </FloatCard>
              <FloatCard style={{ left: 160, top: 381, width: 182 }} delay={1} float={4.8}>
                <MeetingCard />
              </FloatCard>

              {/* Right cards */}
              <FloatCard style={{ left: 836, top: 108, width: 172 }} delay={0.75} float={5.2}>
                <SummaryCard />
              </FloatCard>
              <FloatCard style={{ left: 915, top: 253, width: 167 }} delay={0.9} float={4.6}>
                <SystemsCard />
              </FloatCard>
              <FloatCard style={{ left: 852, top: 372, width: 148 }} delay={1.05} float={5.4}>
                <FilesCard />
              </FloatCard>

              <CommandBox />
            </div>
          </ScaleBox>
        </div>

        {/* ======================= MOBILE / TABLET ======================= */}
        <div className="lg:hidden text-center">
          <span className="inline-flex items-center gap-2 h-8 px-4 rounded-full bg-white border border-slate-200 text-[10.5px] font-bold tracking-[0.12em] text-[#0b1f4a] uppercase">
            <span className="text-[#2f9bf5]">
              <Sparkle className="w-3 h-3" />
            </span>
            Custom Agentic AI Solution
          </span>
          <div className="mt-5 text-4xl sm:text-5xl leading-[1.15]" style={{ color: NAVY }}>
            <Heading />
          </div>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-md mx-auto">
            Intelligent AI agents that understand your business, make decisions, and take action—automatically.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm [&>a]:h-11 [&>a]:w-full sm:[&>a]:w-52">
            <Buttons />
          </div>

          <div className="relative mt-10 sm:mt-12 max-w-sm mx-auto">
            <div className="absolute inset-0 -m-6 rounded-full bg-sky-200/50 blur-3xl" />
            <Image
              src="/AI.webp"
              alt="AI assistant"
              width={1411}
              height={1115}
              priority
              sizes="400px"
              className="relative w-full h-auto"
              style={{
                filter: "drop-shadow(0 20px 30px rgba(11, 31, 74, 0.16)) drop-shadow(0 6px 14px rgba(56, 189, 248, 0.24))",
              }}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto">
            {[EmailCard, TasksCard, MeetingCard, SummaryCard, SystemsCard, FilesCard].map((C, i) => (
              <div key={i} className="rounded-xl bg-white border border-slate-100 shadow-sm p-3.5 text-[#0b1f4a]">
                <C />
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-white border border-slate-100 shadow-lg p-4 text-left max-w-xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#edf4fd] text-[#1b5fa8] flex items-center justify-center">
                <Sparkle className="w-5 h-5" />
              </span>
              <div>
                <div className="text-sm font-bold text-[#0b1f4a]">What should your AI agent handle today?</div>
                <div className="text-xs text-slate-500">Describe a task or workflow...</div>
              </div>
            </div>
            <Link
              href="#"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 h-11 rounded-lg bg-[linear-gradient(90deg,#0b3b5a_0%,#0f6f78_100%)] text-white text-sm font-semibold"
            >
              <Sparkle className="w-3 h-3" />
              Create AI Agent
              <Icon d={D.arrow} className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
