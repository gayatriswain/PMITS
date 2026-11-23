"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";

/* =========================================================================
   ICONS (solid, colour-coded: navy for sources, teal for outcomes)
   ========================================================================= */

const NAVY = "#1e2a5c";
const TEAL = "#0f8a83";

const UsersIcon = ({ color }: { color: string }) => (
  <svg className="w-8 h-8" viewBox="0 0 32 32" fill={color}>
    <circle cx="16" cy="10" r="4.5" />
    <path d="M8.5 25c0-4.4 3.4-7.5 7.5-7.5s7.5 3.1 7.5 7.5v1h-15Z" />
    <circle cx="7.5" cy="12.5" r="3.2" />
    <path d="M1.5 25c0-3.4 2.6-5.8 5.8-5.8 1 0 1.9.2 2.7.6A9 9 0 0 0 7 25.5V26H1.5Z" />
    <circle cx="24.5" cy="12.5" r="3.2" />
    <path d="M30.5 25c0-3.4-2.6-5.8-5.8-5.8-1 0-1.9.2-2.7.6a9 9 0 0 1 3 5.7V26h5.5Z" />
  </svg>
);
const EnvelopeIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 32 32">
    <rect x="2.5" y="6.5" width="27" height="19" rx="2.5" fill={NAVY} />
    <path d="M4 8.5 16 17.5 28 8.5M4 24l8.5-7.5M28 24l-8.5-7.5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 32 32">
    <path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Z" fill="#1fa855" />
    <path
      d="M11.2 9.4c.3-.6.6-.6.9-.6h.8c.2 0 .6.1.8.6l1.1 2.7c.1.3 0 .6-.1.8l-.8 1c-.2.2-.2.4 0 .7a9 9 0 0 0 4.2 3.7c.3.1.5.1.7-.1l1.1-1.3c.2-.3.5-.3.8-.2l2.6 1.2c.3.2.5.3.5.5.1.4 0 1.6-.6 2.3-.6.7-1.9 1.3-3 1.2-1.8-.1-4.4-1-6.9-3.4-2.3-2.3-3.2-4.8-3.3-6.5 0-1.3.6-2.3 1.2-2.6Z"
      fill="#fff"
    />
  </svg>
);
const SheetIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 32 32">
    <path d="M7 2.5h12.5L26 9v18.5A2 2 0 0 1 24 29.5H7a2 2 0 0 1-2-2v-23a2 2 0 0 1 2-2Z" fill="#14967f" />
    <path d="M19.5 2.5V9H26" fill="#0d7564" />
    <rect x="9" y="13" width="13" height="11" rx="1" fill="none" stroke="#fff" strokeWidth="1.6" />
    <path d="M9 17h13M9 20.5h13M14 13v11" stroke="#fff" strokeWidth="1.6" />
  </svg>
);
const HouseChartIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 32 32">
    <path d="M16 3 3 12.5V29h26V12.5Z" fill="none" stroke={TEAL} strokeWidth="2.6" strokeLinejoin="round" />
    <rect x="9" y="18" width="3.5" height="8" rx="0.6" fill={TEAL} />
    <rect x="14.25" y="14" width="3.5" height="12" rx="0.6" fill={TEAL} />
    <rect x="19.5" y="16" width="3.5" height="10" rx="0.6" fill={TEAL} />
  </svg>
);
const ClockIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="13.5" fill={TEAL} />
    <path d="M16 8.5V16l5 3" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
const GrowthChartIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 32 32">
    <rect x="3" y="3" width="26" height="26" rx="4" fill="none" stroke={TEAL} strokeWidth="2.6" />
    <rect x="8.5" y="18" width="3.2" height="7" rx="0.6" fill={TEAL} />
    <rect x="14.4" y="15" width="3.2" height="10" rx="0.6" fill={TEAL} />
    <rect x="20.3" y="12" width="3.2" height="13" rx="0.6" fill={TEAL} />
    <path d="m8 13 5-4.5 4 2.5 6.5-5" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
const CheckBadge = () => (
  <svg className="w-4 h-4 text-[#0f8a83]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9.5" />
    <path d="m8 12.5 2.5 2.5L16 9.5" />
  </svg>
);

/* =========================================================================
   DATA
   Positions (desktop) are % of the visual stage; lines run chip -> horn mouth.
   ========================================================================= */

interface FlowChip {
  title: string;
  sub: string;
  icon: React.ReactNode;
  y: number; // vertical centre in % of stage
}

const sources: FlowChip[] = [
  { title: "Leads", sub: "New Enquiry", icon: <UsersIcon color={NAVY} />, y: 32 },
  { title: "Email", sub: "Conversations", icon: <EnvelopeIcon />, y: 45 },
  { title: "WhatsApp", sub: "Messages", icon: <WhatsAppIcon />, y: 58 },
  { title: "Spreadsheets", sub: "Manual Data", icon: <SheetIcon />, y: 71 },
  { title: "Calls & Meetings", sub: "Follow-ups", icon: <UsersIcon color={NAVY} />, y: 84 },
];

const outcomes: FlowChip[] = [
  { title: "Higher Conversions", sub: "Close more deals", icon: <HouseChartIcon />, y: 36 },
  { title: "Time Saved", sub: "Automate routine tasks", icon: <ClockIcon />, y: 50 },
  { title: "Stronger Relationships", sub: "360° customer view", icon: <UsersIcon color={TEAL} />, y: 64 },
  { title: "Data-Driven Growth", sub: "Real-time insights", icon: <GrowthChartIcon />, y: 78 },
];

const highlights = ["Custom-Built", "Scalable", "Integrated", "Secure", "Business-Focused"];

const trustedBrands = [
  { name: "RealEdge", sector: "Real Estate", path: "M3 11 12 4l9 7M5 10v10h14V10" },
  { name: "EduQuest", sector: "Education", path: "M2 9l10-5 10 5-10 5Z M6 11v5c3 2 9 2 12 0v-5" },
  { name: "HealthPlus", sector: "Healthcare", path: "M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11Z" },
  { name: "LogiMove", sector: "Logistics", path: "M3 7h11v9H3Z M14 10h4l3 3v3h-7 M7 19a1.5 1.5 0 1 0 0-.01 M17 19a1.5 1.5 0 1 0 0-.01" },
  { name: "FinEdge", sector: "Finance", path: "M4 20V10M10 20V6M16 20v-8M3 20h18" },
];

// Pipe anchor points just inside the speaker mouths, as % of the stage (image spans 20%–80% horizontally)
const HORN_Y = 49;
const LEFT_HORN_X = 23;
const RIGHT_HORN_X = 77;
const LEFT_CHIP_EDGE = 16.5;
const RIGHT_CHIP_EDGE = 83.5;

// Intro timeline (seconds): image rises -> lines grow out of the speakers -> chips pop in at line ends
const IMAGE_DURATION = 0.9;
const LINE_START = IMAGE_DURATION + 0.1;
const LINE_DURATION = 0.7;
const LINE_STAGGER = 0.15;
const lineDelay = (i: number) => LINE_START + i * LINE_STAGGER;
const chipDelay = (i: number) => lineDelay(i) + LINE_DURATION * 0.8;

/* =========================================================================
   SMALL PIECES
   ========================================================================= */

function Chip({ chip }: { chip: FlowChip }) {
  return (
    <div className="flex items-center gap-3 bg-white/95 backdrop-blur rounded-xl border border-slate-200/80 px-3 py-2.5 shadow-[0_6px_18px_-8px_rgba(15,35,51,0.18)]">
      <span className="flex-shrink-0 flex items-center justify-center">{chip.icon}</span>
      <div className="min-w-0 leading-tight">
        <div className="text-[12px] xl:text-[13px] font-bold text-[#0f2333] truncate">{chip.title}</div>
        <div className="text-[10px] xl:text-[11px] text-slate-500 truncate">{chip.sub}</div>
      </div>
    </div>
  );
}

// Frosted-glass tube shading: pale cyan rim, translucent white body, bright highlight nudged
// upward and a faint cyan reflection along the lower edge. Widths and dy are px.
const PIPE_LAYERS = [
  { stroke: "#8fe3ef", width: 10, opacity: 0.65, dy: 0 }, // glass rim
  { stroke: "#f4fdff", width: 8, opacity: 0.85, dy: 0 }, // frosted body
  { stroke: "#b9eff7", width: 5, opacity: 0.55, dy: 0.7 }, // inner tint, lower half
  { stroke: "#7dd8e8", width: 1.5, opacity: 0.6, dy: 2.5 }, // lower edge reflection
  { stroke: "#ffffff", width: 2.5, opacity: 0.95, dy: -1.8 }, // highlight
];

// Pipes fan out across the speaker mouth instead of meeting at one point
const HORN_SPREAD = 18; // total vertical spread (stage %) of the pipe ends inside the mouth
const hornEntryY = (index: number, count: number) =>
  HORN_Y - HORN_SPREAD / 2 + (count > 1 ? (index * HORN_SPREAD) / (count - 1) : HORN_SPREAD / 2);

// S-curve pipe: horizontal out of the speaker, bend, then horizontal into the chip.
// Inputs are stage %; output is in real px so stroke dashes (used by the grow animation) stay solid.
const pipePath = (size: { w: number; h: number }, hornX: number, entryY: number, chipX: number, chipY: number) => {
  const dir = chipX < hornX ? -1 : 1;
  const endX = chipX; // end exactly at the chip edge, where the connector point sits
  const X = (v: number) => ((v * size.w) / 100).toFixed(1);
  const Y = (v: number) => ((v * size.h) / 100).toFixed(1);
  return `M ${X(hornX)} ${Y(entryY)} C ${X(hornX + dir * 4)} ${Y(entryY)}, ${X(endX - dir * 5)} ${Y(chipY)}, ${X(endX)} ${Y(chipY)}`;
};

// Pipes always start at the speaker so they "grow" out of it
function Pipe3D({ d, delay }: { d: string; delay: number }) {
  const grow = {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: LINE_DURATION, ease: "easeOut" as const, delay },
  };
  return (
    <>
      {/* Soft contact shadow under the pipe */}
      <motion.path
        d={d}
        stroke="#0f2333"
        strokeOpacity={0.12}
        strokeWidth={10}
        strokeLinecap="round"
        transform="translate(0 4)"
        style={{ filter: "blur(4px)" }}
        {...grow}
      />
      {PIPE_LAYERS.map((layer) => (
        <motion.path
          key={layer.width}
          d={d}
          stroke={layer.stroke}
          strokeOpacity={layer.opacity}
          strokeWidth={layer.width}
          strokeLinecap="round"
          transform={layer.dy ? `translate(0 ${layer.dy})` : undefined}
          {...grow}
        />
      ))}
    </>
  );
}

/* =========================================================================
   MAIN HERO
   ========================================================================= */

export default function CustomCrmHero() {
  // Measure the desktop stage so pipes can be drawn in real px
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setStageSize({ w: width, h: height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#eef5f7_0%,#f8fbfc_45%,#ffffff_100%)] pt-14 sm:pt-16 pb-10 font-sans">
      {/* Soft ambient glows */}
      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-cyan-300/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-teal-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-sky-100/60 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* ======================= HEADLINE BLOCK ======================= */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[11px] sm:text-xs font-black tracking-[0.22em] text-[#0f8a83] uppercase">
            Custom CRM Solution
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight leading-[1.05] text-[#0f2333]">
            A CRM Built Around
            <br />
            <span className="text-[#0f8a83]">Your Business.</span>
          </h1>
          <p className="mt-5 text-slate-600 text-sm sm:text-base leading-relaxed">
            We don&apos;t force you to adapt to software.
            <br className="hidden sm:block" /> We build a CRM that adapts to the way you work.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[#0f2333] text-white text-sm font-semibold hover:bg-[#0f5e63] transition-colors"
            >
              Build My CRM
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center px-7 py-3 rounded-lg border border-[#0f8a83] text-[#0f2333] text-sm font-semibold bg-white/70 hover:bg-teal-50 transition-colors"
            >
              Book a Free Consultation
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {highlights.map((h) => (
              <span key={h} className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-slate-700">
                <CheckBadge />
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* ======================= DESKTOP VISUAL STAGE ======================= */}
        <div ref={stageRef} className="relative hidden lg:block mt-6 w-full aspect-[1440/620]">
          {/* 3D pipes in real px; drawn under the image and chips so both ends are hidden */}
          {stageSize.w > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox={`0 0 ${stageSize.w} ${stageSize.h}`} fill="none">
            {sources.map((c, i) => (
              <Pipe3D
                key={c.title}
                d={pipePath(stageSize, LEFT_HORN_X, hornEntryY(i, sources.length), LEFT_CHIP_EDGE, c.y)}
                delay={lineDelay(i)}
              />
            ))}
            {outcomes.map((c, i) => (
              <Pipe3D
                key={c.title}
                d={pipePath(stageSize, RIGHT_HORN_X, hornEntryY(i, outcomes.length), RIGHT_CHIP_EDGE, c.y)}
                delay={lineDelay(i)}
              />
            ))}
          </svg>
          )}

          {/* Centre CRM visual */}
          <motion.div
            className="absolute left-[20%] w-[60%] top-[11%]"
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: IMAGE_DURATION, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/Custom CRM Solution1.webp"
              alt="ProManage custom CRM dashboard"
              width={1684}
              height={934}
              priority
              className="w-full h-auto select-none pointer-events-none"
            />
          </motion.div>

          {/* Left column: copy + source chips */}
          <motion.div
            className="absolute left-0 top-[4%] w-[17%]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: LINE_START }}
          >
            <h3 className="text-[11px] font-black tracking-[0.16em] text-[#0f8a83] uppercase leading-snug">
              From Disconnected
              <br />
              <span className="text-[#0f2333]">to Connected</span>
            </h3>
            <p className="mt-2 text-[12px] text-slate-600 leading-relaxed">
              Bring your people, data and processes together in one intelligent system.
            </p>
          </motion.div>
          {sources.map((c, i) => (
            <div
              key={c.title}
              className="absolute left-[1%] -translate-y-1/2"
              style={{ top: `${c.y}%`, width: `${LEFT_CHIP_EDGE - 1}%` }}
            >
              <motion.div
                initial={{ opacity: 0, x: 24, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: chipDelay(i) }}
              >
                <Chip chip={c} />
              </motion.div>
              {/* Connector point where the pipe meets the card */}
              <motion.span
                className="absolute -right-[5px] top-1/2 -mt-[6px] w-[8px] h-[12px] rounded-[3px] bg-gradient-to-b from-[#7ee8f2] via-[#14b8a6] to-[#0d9488] ring-1 ring-white shadow-[0_0_6px_rgba(20,184,166,0.5)]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: lineDelay(i) + LINE_DURATION }}
              />
            </div>
          ))}

          {/* Right column: copy + outcome chips */}
          <motion.div
            className="absolute right-0 top-[4%] w-[17%]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: LINE_START }}
          >
            <h3 className="text-[11px] font-black tracking-[0.16em] text-[#0f8a83] uppercase leading-snug">
              Outcomes That
              <br />
              <span className="text-[#0f2333]">Drive Growth</span>
            </h3>
            <p className="mt-2 text-[12px] text-slate-600 leading-relaxed">
              Make smarter decisions, build stronger relationships and close more deals.
            </p>
          </motion.div>
          {outcomes.map((c, i) => (
            <div
              key={c.title}
              className="absolute right-[1%] -translate-y-1/2"
              style={{ top: `${c.y}%`, width: `${100 - RIGHT_CHIP_EDGE - 1}%` }}
            >
              <motion.div
                initial={{ opacity: 0, x: -24, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: chipDelay(i) }}
              >
                <Chip chip={c} />
              </motion.div>
              {/* Connector point where the pipe meets the card */}
              <motion.span
                className="absolute -left-[5px] top-1/2 -mt-[6px] w-[8px] h-[12px] rounded-[3px] bg-gradient-to-b from-[#7ee8f2] via-[#14b8a6] to-[#0d9488] ring-1 ring-white shadow-[0_0_6px_rgba(20,184,166,0.5)]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: lineDelay(i) + LINE_DURATION }}
              />
            </div>
          ))}
        </div>

        {/* ======================= MOBILE / TABLET VISUAL ======================= */}
        <div className="lg:hidden mt-8">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: IMAGE_DURATION, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
            src="/Custom CRM Solution1.webp"
            alt="ProManage custom CRM dashboard"
            width={1684}
            height={934}
            priority
            className="w-full h-auto"
          />
          </motion.div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[11px] font-black tracking-[0.16em] text-[#0f8a83] uppercase">
                From Disconnected <span className="text-[#0f2333]">to Connected</span>
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Bring your people, data and processes together in one intelligent system.
              </p>
              <div className="mt-4 grid gap-2.5">
                {sources.map((c) => (
                  <Chip key={c.title} chip={c} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[11px] font-black tracking-[0.16em] text-[#0f8a83] uppercase">
                Outcomes That <span className="text-[#0f2333]">Drive Growth</span>
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Make smarter decisions, build stronger relationships and close more deals.
              </p>
              <div className="mt-4 grid gap-2.5">
                {outcomes.map((c) => (
                  <Chip key={c.title} chip={c} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ======================= TRUSTED BY ======================= */}
        <div className="mt-8 lg:mt-4 text-center">
          <p className="text-[10.5px] sm:text-[11px] font-bold tracking-[0.16em] text-slate-500 uppercase">
            Trusted by forward-thinking businesses to streamline, automate and grow.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedBrands.map((b) => (
              <div key={b.name} className="flex items-center gap-2 text-[#0f2333]">
                <span className="w-8 h-8 rounded-full border-2 border-[#0f8a83] text-[#0f8a83] flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={b.path} />
                  </svg>
                </span>
                <div className="text-left leading-tight">
                  <div className="text-sm font-extrabold">{b.name}</div>
                  <div className="text-[10px] text-slate-500">{b.sector}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
