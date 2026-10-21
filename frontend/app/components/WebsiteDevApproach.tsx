"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "./Container";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#1b8a80";

const float = (distance = 4, duration = 3, delay = 0) => ({
  animate: { y: [0, -distance, 0] },
  transition: { duration, repeat: Infinity, ease: "easeInOut" as const, delay },
});

/* ------------------------------------------------------------------ */
/* 01 — Magnifier over analytics document                              */
/* ------------------------------------------------------------------ */
function UnderstandIcon() {
  return (
    <svg viewBox="0 0 160 120" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="u-doc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dfe6ec" />
        </linearGradient>
        <linearGradient id="u-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b9c4ce" />
          <stop offset="1" stopColor="#d5dde4" />
        </linearGradient>
        <radialGradient id="u-glass" cx="0.35" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.6" stopColor="#d7eef0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#9fc9cf" stopOpacity="0.5" />
        </radialGradient>
        <linearGradient id="u-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4b5563" />
          <stop offset="1" stopColor="#111827" />
        </linearGradient>
        <linearGradient id="u-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fb77e" />
          <stop offset="1" stopColor="#2f7a4f" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="82" cy="110" rx="56" ry="6" fill="#0f172a" opacity="0.08" />

      {/* document (isometric slab) */}
      <motion.g {...float(3, 4)}>
        <path d="M62 18 L138 30 L138 98 L62 86 Z" fill="url(#u-doc)" />
        <path d="M138 30 L143 27 L143 95 L138 98 Z" fill="url(#u-side)" />
        <path d="M62 18 L67 15 L143 27 L138 30 Z" fill="#eef2f5" />
        <path d="M62 18 L138 30 L138 38 L62 26 Z" fill="#2c3e50" opacity="0.85" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={67 + i * 4} cy={22.5 + i * 0.6} r="1.1" fill="#cbd5e1" />
        ))}
        {/* bars */}
        {[
          { x: 98, h: 22 },
          { x: 107, h: 32 },
          { x: 116, h: 18 },
          { x: 125, h: 38 },
        ].map((b, i) => (
          <motion.rect
            key={i}
            x={b.x}
            y={86 - b.h + i * 1.5}
            width="6"
            height={b.h}
            rx="1"
            fill={i % 2 ? TEAL : "#7cc2bb"}
            style={{ originY: 1 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 + i * 0.12, ease: "easeOut" }}
          />
        ))}
        {/* text lines */}
        {[48, 55, 62].map((y, i) => (
          <rect key={y} x="70" y={y + i * 0.3} width={i === 2 ? 14 : 22} height="2.5" rx="1.2" fill="#c3ccd5" />
        ))}
      </motion.g>

      {/* leaves */}
      <motion.g
        style={{ originX: 0.5, originY: 1 }}
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M140 104 C136 90 142 78 152 72 C154 86 150 98 140 104 Z" fill="url(#u-leaf)" />
        <path d="M138 104 C128 96 124 86 128 76 C138 82 142 94 138 104 Z" fill="#5d9e6a" />
        <path d="M142 104 C146 96 154 92 160 92 C158 100 150 106 142 104 Z" fill="#3f8a58" />
      </motion.g>

      {/* magnifier — scans across the document */}
      <motion.g
        animate={{ x: [0, 14, 4, 0], y: [0, -6, 4, 0], rotate: [0, 4, -2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M44 72 L22 104" stroke="#0b1220" strokeWidth="11" strokeLinecap="round" />
        <path d="M44 72 L22 104" stroke="#374151" strokeWidth="7" strokeLinecap="round" />
        <path d="M42 78 L47 71" stroke="#9ca3af" strokeWidth="9" strokeLinecap="round" />
        <circle cx="58" cy="50" r="27" fill="url(#u-rim)" />
        <circle cx="58" cy="50" r="21.5" fill="url(#u-glass)" />
        {/* magnified bars */}
        <rect x="50" y="52" width="4" height="10" rx="1" fill={TEAL} opacity="0.8" />
        <rect x="57" y="45" width="4" height="17" rx="1" fill="#7cc2bb" opacity="0.8" />
        <rect x="64" y="40" width="4" height="22" rx="1" fill={TEAL} opacity="0.8" />
        <path d="M44 38 A18 18 0 0 1 58 32" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — 3D pie chart + growing bar chart                               */
/* ------------------------------------------------------------------ */
function ResearchIcon() {
  // pie slices on a circle of r=26 centred at 0,0 (squashed later for 3D)
  const slices = [
    { d: "M0 0 L0 -26 A26 26 0 0 1 24.7 8 Z", fill: "#1f8f84" },
    { d: "M0 0 L24.7 8 A26 26 0 0 1 -15.3 21 Z", fill: "#5bb8ad" },
    { d: "M0 0 L-15.3 21 A26 26 0 0 1 0 -26 Z", fill: "#a8d9d2" },
  ];
  return (
    <svg viewBox="0 0 160 120" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="r-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e1e8ee" />
        </linearGradient>
        <linearGradient id="r-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#16786f" />
          <stop offset="1" stopColor="#2aa597" />
        </linearGradient>
      </defs>

      <ellipse cx="80" cy="110" rx="62" ry="6" fill="#0f172a" opacity="0.08" />

      {/* back document */}
      <motion.g {...float(2.5, 4.5, 0.3)}>
        <path d="M78 14 L130 22 L130 70 L78 62 Z" fill="url(#r-card)" />
        <path d="M130 22 L134 20 L134 68 L130 70 Z" fill="#c4cdd5" />
        {[28, 35, 42, 49].map((y, i) => (
          <rect key={y} x="86" y={y + i * 1.2} width={i === 3 ? 20 : 34} height="2.5" rx="1.2" fill="#c3ccd5" />
        ))}
      </motion.g>

      {/* pie chart */}
      <g transform="translate(48 44)">
      <motion.g {...float(4, 3.5)}>
        <g transform="scale(1 0.62)">
          {/* depth */}
          <g transform="translate(0 14)">
            <circle r="26" fill="#0e5a53" />
          </g>
          <rect x="-26" y="0" width="52" height="14" fill="#0e5a53" />
          {slices.map((s, i) =>
            i === 0 ? (
              <motion.path
                key={i}
                d={s.d}
                fill={s.fill}
                animate={{ x: [0, 5, 0], y: [0, -6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
            ) : (
              <path key={i} d={s.d} fill={s.fill} />
            )
          )}
        </g>
      </motion.g>
      </g>

      {/* bar chart card */}
      <motion.g {...float(3, 3.8, 0.6)}>
        <path d="M92 58 L144 66 L144 104 L92 96 Z" fill="url(#r-card)" />
        <path d="M144 66 L148 64 L148 102 L144 104 Z" fill="#c4cdd5" />
        {[14, 22, 18, 30, 26].map((h, i) => (
          <motion.rect
            key={i}
            x={98 + i * 9}
            y={96 - h + i * 1.4}
            width="6"
            height={h}
            rx="1"
            fill="url(#r-bar)"
            style={{ originY: 1 }}
            animate={{ scaleY: [0.4, 1, 0.75, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
          />
        ))}
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — Glowing lightbulb on pedestal + wireframe board                */
/* ------------------------------------------------------------------ */
function StrategyIcon() {
  return (
    <svg viewBox="0 0 160 120" className="w-full h-full overflow-visible">
      <defs>
        <radialGradient id="s-bulb" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#fff7d1" />
          <stop offset="0.5" stopColor="#fcd34d" />
          <stop offset="1" stopColor="#e7a51c" />
        </radialGradient>
        <radialGradient id="s-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fde68a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="s-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6b7280" />
          <stop offset="0.5" stopColor="#e5e7eb" />
          <stop offset="1" stopColor="#6b7280" />
        </linearGradient>
        <linearGradient id="s-ped" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1f2937" />
          <stop offset="0.5" stopColor="#4b5563" />
          <stop offset="1" stopColor="#111827" />
        </linearGradient>
      </defs>

      <ellipse cx="80" cy="110" rx="52" ry="6" fill="#0f172a" opacity="0.08" />

      {/* wireframe board */}
      <g>
        <path d="M70 8 L148 18 L148 82 L70 72 Z" fill="#ffffff" stroke="#dbe2e8" strokeWidth="1" />
        <path d="M148 18 L152 16 L152 80 L148 82 Z" fill="#cfd8df" />
        {[
          [78, 18], [100, 21], [122, 24],
          [78, 42], [100, 45], [122, 48],
        ].map(([x, y], i) => (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width="18"
            height="18"
            rx="2"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.12 }}
          />
        ))}
        <motion.path
          d="M80 34 L94 22 M102 26 L116 38 M124 28 L138 40"
          stroke="#94a3b8"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.1 }}
        />
      </g>

      {/* pedestal */}
      <ellipse cx="62" cy="104" rx="26" ry="7" fill="#0b1220" />
      <rect x="36" y="96" width="52" height="8" fill="url(#s-ped)" />
      <ellipse cx="62" cy="96" rx="26" ry="7" fill="#374151" />
      <ellipse cx="62" cy="95" rx="20" ry="5" fill="#4b5563" />

      {/* bulb */}
      <motion.g {...float(3, 3)}>
        <motion.circle
          cx="62"
          cy="46"
          r="38"
          fill="url(#s-glow)"
          animate={{ opacity: [0.35, 0.9, 0.35], scale: [0.9, 1.08, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: 0.5, originY: 0.5 }}
        />
        <rect x="52" y="70" width="20" height="16" rx="2" fill="url(#s-metal)" />
        {[73, 78, 83].map((y) => (
          <rect key={y} x="51" y={y} width="22" height="2" rx="1" fill="#9ca3af" />
        ))}
        <path d="M56 86 L68 86 L65 92 L59 92 Z" fill="#374151" />
        <path d="M62 16 C80 16 88 30 88 42 C88 54 78 60 74 70 L50 70 C46 60 36 54 36 42 C36 30 44 16 62 16 Z" fill="url(#s-bulb)" />
        <path d="M58 70 L58 52 L62 46 L66 52 L66 70" stroke="#b7791f" strokeWidth="1.5" fill="none" />
        <ellipse cx="52" cy="32" rx="6" ry="9" fill="#ffffff" opacity="0.55" transform="rotate(-25 52 32)" />
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — Monitor + phone                                                */
/* ------------------------------------------------------------------ */
function DevelopIcon() {
  return (
    <svg viewBox="0 0 160 120" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="d-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6f3f1" />
          <stop offset="1" stopColor="#bfe0db" />
        </linearGradient>
        <linearGradient id="d-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#374151" />
          <stop offset="1" stopColor="#0b1220" />
        </linearGradient>
        <linearGradient id="d-stand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9ca3af" />
          <stop offset="0.5" stopColor="#e5e7eb" />
          <stop offset="1" stopColor="#9ca3af" />
        </linearGradient>
      </defs>

      <ellipse cx="80" cy="110" rx="60" ry="6" fill="#0f172a" opacity="0.08" />

      {/* monitor */}
      <motion.g {...float(2, 4.2)}>
        <path d="M20 12 L120 20 L120 84 L20 76 Z" fill="url(#d-frame)" />
        <path d="M120 20 L124 18 L124 82 L120 84 Z" fill="#1f2937" />
        <path d="M25 17 L115 24.5 L115 79 L25 71.5 Z" fill="url(#d-screen)" />
        {/* hero image with mountains */}
        <path d="M30 24 L78 28 L78 52 L30 48 Z" fill="#8fcac2" />
        <path d="M30 48 L42 36 L52 44 L62 32 L78 52 Z" fill={DEEP_TEAL} opacity="0.85" />
        <circle cx="40" cy="31" r="3" fill="#ffffff" opacity="0.9" />
        {/* content lines */}
        {[30, 36, 42].map((y, i) => (
          <motion.rect
            key={y}
            x="84"
            y={y + i * 0.4}
            width={i === 2 ? 16 : 26}
            height="3"
            rx="1.5"
            fill="#6b9c96"
            style={{ originX: 0 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
          />
        ))}
        {/* cards row */}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={32 + i * 27} y={56 + i * 2.2} width="22" height="14" rx="2" fill="#ffffff" opacity="0.85" />
        ))}
        {/* stand */}
        <path d="M62 81 L76 82 L80 98 L60 97 Z" fill="url(#d-stand)" />
        <ellipse cx="70" cy="99" rx="22" ry="4" fill="#cbd5e1" />
      </motion.g>

      {/* phone */}
      <motion.g
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        <motion.g {...float(5, 3, 0.4)}>
          <rect x="112" y="46" width="34" height="60" rx="6" fill="url(#d-frame)" />
          <rect x="115" y="51" width="28" height="50" rx="3" fill="url(#d-screen)" />
          <rect x="124" y="48" width="10" height="1.8" rx="0.9" fill="#4b5563" />
          <rect x="118" y="55" width="22" height="12" rx="2" fill="#8fcac2" />
          {[8, 14, 10, 18].map((h, i) => (
            <motion.rect
              key={i}
              x={119 + i * 5.5}
              y={96 - h}
              width="3.5"
              height={h}
              rx="1"
              fill={TEAL}
              style={{ originY: 1 }}
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
          <rect x="118" y="71" width="16" height="2.5" rx="1.2" fill="#6b9c96" />
        </motion.g>
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 05 — Rocket launching from clouds                                   */
/* ------------------------------------------------------------------ */
function LaunchIcon() {
  const clouds = [
    { cx: 50, cy: 96, r: 18, d: 0 },
    { cx: 76, cy: 90, r: 22, d: 0.3 },
    { cx: 104, cy: 96, r: 18, d: 0.6 },
    { cx: 32, cy: 104, r: 12, d: 0.9 },
    { cx: 126, cy: 104, r: 13, d: 1.2 },
    { cx: 80, cy: 106, r: 20, d: 0.45 },
  ];
  return (
    <svg viewBox="0 0 160 120" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="l-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#cbd5e1" />
          <stop offset="0.45" stopColor="#ffffff" />
          <stop offset="1" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="l-fin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2aa597" />
          <stop offset="1" stopColor="#0e5a53" />
        </linearGradient>
        <radialGradient id="l-window" cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#9fe3da" />
          <stop offset="1" stopColor="#0f5c56" />
        </radialGradient>
        <linearGradient id="l-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff7d1" />
          <stop offset="0.45" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f97316" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="l-cloud" cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dbe3ea" />
        </radialGradient>
      </defs>

      {/* rocket (rotated, flying up-right) */}
      <motion.g
        animate={{ x: [0, 3, 0], y: [0, -8, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="rotate(35 82 52)">
          {/* flame */}
          <motion.path
            d="M74 82 C74 96 82 110 82 110 C82 110 90 96 90 82 Z"
            fill="url(#l-flame)"
            style={{ originX: 0.5, originY: 0 }}
            animate={{ scaleY: [0.8, 1.25, 0.9, 1.15, 0.8], scaleX: [1, 0.85, 1, 0.9, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* fins */}
          <path d="M70 60 L56 80 L58 88 L72 78 Z" fill="url(#l-fin)" />
          <path d="M94 60 L108 80 L106 88 L92 78 Z" fill="url(#l-fin)" />
          {/* body */}
          <path d="M82 12 C96 24 98 48 94 80 L70 80 C66 48 68 24 82 12 Z" fill="url(#l-body)" />
          <path d="M82 12 C88 17 92 24 94 32 L70 32 C72 24 76 17 82 12 Z" fill="url(#l-fin)" />
          <rect x="72" y="78" width="20" height="5" rx="2" fill="#475569" />
          {/* window */}
          <circle cx="82" cy="48" r="8" fill="#e2e8f0" />
          <circle cx="82" cy="48" r="6" fill="url(#l-window)" />
          <circle cx="80" cy="46" r="1.8" fill="#ffffff" opacity="0.8" />
          <path d="M82 80 L82 90 L78 88 Z" fill="url(#l-fin)" />
        </g>
      </motion.g>

      {/* clouds */}
      {clouds.map((c, i) => (
        <motion.circle
          key={i}
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          fill="url(#l-cloud)"
          style={{ originX: 0.5, originY: 0.5 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: c.d }}
        />
      ))}
      <ellipse cx="80" cy="114" rx="62" ry="5" fill="#0f172a" opacity="0.06" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

const STEPS = [
  {
    title: "Understand Your Business",
    text: "We dive deep into your vision, challenges, target audience and goals.",
    Icon: UnderstandIcon,
  },
  {
    title: "Research & Analyze",
    text: "We study your industry, competitors and users to uncover opportunities.",
    Icon: ResearchIcon,
  },
  {
    title: "Plan the Right Strategy",
    text: "We turn insights into a clear website strategy focused on growth and results.",
    Icon: StrategyIcon,
  },
  {
    title: "Design & Develop With Purpose",
    text: "We craft fast, secure and scalable websites that deliver exceptional experiences.",
    Icon: DevelopIcon,
  },
  {
    title: "Launch & Drive Results",
    text: "We launch, monitor and optimize to ensure your website keeps performing.",
    Icon: LaunchIcon,
  },
];

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function Chevron() {
  return (
    <motion.div
      variants={cardVariants}
      className="hidden lg:flex items-center justify-center w-6 shrink-0 self-center"
      aria-hidden
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 6 11 12 6 18" />
        <polyline points="13 6 18 12 13 18" />
      </svg>
    </motion.div>
  );
}

export default function WebsiteDevApproach() {
  return (
    <section className="relative w-full bg-[#F5F7F8] pt-16 pb-6 lg:pt-20 lg:pb-8 overflow-hidden">
      <Container className="flex flex-col gap-10 lg:gap-8">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-2" style={{ color: TEAL }}>
            Our Approach
          </p>
          <div className="w-8 h-[2px] mb-6" style={{ backgroundColor: "#d4a54a" }} />

          <h2 className="font-serif text-2xl md:text-[30px] leading-[1.2] font-semibold tracking-tight mb-6">
            <span style={{ color: NAVY }}>Most Agencies <br className="sm:hidden" />Start With a Design.</span>
            <br />
            <span className="block mt-2" style={{ color: DEEP_TEAL }}>We Start With <br className="sm:hidden" />Your Business.</span>
          </h2>

          <div className="w-8 h-[2px] mb-6" style={{ backgroundColor: "#d4a54a" }} />

          <p className="text-sm text-slate-600 leading-relaxed mb-8 max-w-xl">
            We take time to understand your business, your audience and your goals. Then we create a website strategy that drives real, measurable results.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 px-4 py-3 rounded-lg text-white text-[13px] font-semibold whitespace-nowrap shadow-lg shadow-teal-900/20 transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: DEEP_TEAL }}
            >
              Let&apos;s Build Your Success Story
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>

            <Link href="/portfolio" className="inline-flex shrink-0 items-center gap-2 group">
              <span className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white shadow-sm group-hover:bg-teal-50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill={NAVY} className="ml-0.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </span>
              <span className="text-[13px] font-semibold leading-tight whitespace-nowrap" style={{ color: NAVY }}>
                See Our Process in Action
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Right: 5-step process */}
        <div className="relative">
          {/* Header with dotted arc */}
          <div className="relative hidden lg:block h-12 mb-1">
            <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 1000 48" preserveAspectRatio="none" aria-hidden>
              <defs>
                <clipPath id="approach-arc-reveal">
                  <motion.rect
                    x="0"
                    y="-10"
                    height="68"
                    initial={{ width: 0 }}
                    whileInView={{ width: 1000 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                  />
                </clipPath>
              </defs>
              <path
                d="M100 46 C100 20 130 10 220 10 L780 10 C870 10 900 20 900 46"
                clipPath="url(#approach-arc-reveal)"
                fill="none"
                stroke={TEAL}
                strokeWidth="1.5"
                strokeDasharray="2 6"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className="absolute left-[10%] bottom-[-4px] -translate-x-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: TEAL }} />
            <motion.svg
              className="absolute right-[10%] bottom-[-6px] translate-x-1/2"
              width="12"
              height="10"
              viewBox="0 0 12 10"
              aria-hidden
              initial={{ opacity: 0, y: -4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.5 }}
            >
              <path d="M1 1 L6 9 L11 1" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
            <p
              className="absolute left-1/2 top-[10px] -translate-x-1/2 -translate-y-1/2 px-4 bg-[#F5F7F8] text-[11px] font-bold tracking-[0.15em] uppercase whitespace-nowrap"
              style={{ color: TEAL }}
            >
              Our Proven 5-Step Approach
            </p>
          </div>
          <p className="lg:hidden text-center text-[11px] font-bold tracking-[0.15em] uppercase mb-6" style={{ color: TEAL }}>
            Our Proven 5-Step Approach
          </p>

          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-stretch gap-6 lg:gap-0"
          >
            {STEPS.map(({ title, text, Icon }, i) => (
              <React.Fragment key={title}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  className="relative flex-1 min-w-0 bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_-12px_rgba(15,40,60,0.15)] px-4 pt-10 pb-6 flex flex-col items-center text-center"
                >
                  <span
                    className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shadow-md"
                    style={{ backgroundColor: DEEP_TEAL }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="w-full max-w-[160px] h-[120px] mb-5">
                    <Icon />
                  </div>

                  <h3 className="text-[15px] font-bold leading-snug mb-3 min-h-[2.75em] flex items-center" style={{ color: NAVY }}>
                    {title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-5">{text}</p>
                  <span className="mt-auto w-8 h-[2px] rounded-full" style={{ backgroundColor: TEAL }} />
                </motion.div>
                {i < STEPS.length - 1 && <Chevron />}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
