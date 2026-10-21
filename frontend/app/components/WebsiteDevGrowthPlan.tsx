"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import Container from "./Container";
import { Counter } from "./useCountUp";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#1b8a80";
const GOLD = "#d4a54a";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const svgBase = (color: string, size: number, strokeWidth = 1.8) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const loop = (duration: number, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  ease: "easeInOut" as const,
});

/* ------------------------------------------------------------------ */
/* Card illustrations (soft grey 3D-ish, animated)                     */
/* ------------------------------------------------------------------ */

function GrowthArt() {
  const bars = [18, 28, 40, 54, 70];
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="gp-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e2e8ee" />
          <stop offset="0.6" stopColor="#f8fafc" />
          <stop offset="1" stopColor="#cfd8e0" />
        </linearGradient>
      </defs>
      {bars.map((h, i) => (
        <motion.g
          key={i}
          style={{ originY: 1 }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: EASE }}
        >
          <rect x={14 + i * 20} y={88 - h} width="13" height={h} rx="1.5" fill="url(#gp-bar)" />
          <path d={`M${27 + i * 20} ${88 - h} l3 -2 v${h} l-3 2 Z`} fill="#c4ced7" />
        </motion.g>
      ))}
      <motion.path
        d="M8 70 C30 62 50 50 70 36 C84 26 96 16 112 6"
        fill="none"
        stroke="#cbd5df"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.6, ease: "easeInOut" }}
      />
      <motion.path
        d="M102 5 L113 5 L111 16"
        fill="none"
        stroke="#cbd5df"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6 }}
      />
    </svg>
  );
}

function EcommerceArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="gp-bag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dde4ea" />
        </linearGradient>
      </defs>
      <ellipse cx="72" cy="88" rx="44" ry="3.5" fill="#0f172a" opacity="0.05" />
      {/* card */}
      <motion.g animate={{ y: [0, -3, 0], rotate: [-8, -5, -8] }} transition={loop(3.2, 0.4)} style={{ originX: 0.5, originY: 0.5 }}>
        <rect x="18" y="52" width="40" height="26" rx="3" fill="url(#gp-bag)" stroke="#d7dee5" />
        <rect x="18" y="58" width="40" height="5" fill="#d7dee5" />
        <rect x="23" y="68" width="12" height="3" rx="1" fill="#d7dee5" />
      </motion.g>
      {/* bag */}
      <motion.g animate={{ y: [0, -5, 0] }} transition={loop(3)}>
        <path d="M60 30 H100 L104 86 H56 Z" fill="url(#gp-bag)" stroke="#d7dee5" />
        <path d="M100 30 L108 26 L112 80 L104 86 Z" fill="#d3dbe2" />
        <path d="M60 30 L68 26 H108 L100 30 Z" fill="#eef2f5" />
        <path d="M71 38 V30 C71 20 89 20 89 30 V38" fill="none" stroke="#c4ced7" strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

function CorporateArt() {
  const buildings = [
    { x: 18, w: 22, h: 44 },
    { x: 42, w: 26, h: 70 },
    { x: 70, w: 22, h: 54 },
    { x: 94, w: 18, h: 34 },
  ];
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="gp-bld" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f8fafc" />
          <stop offset="1" stopColor="#dbe3ea" />
        </linearGradient>
      </defs>
      {buildings.map((b, i) => (
        <motion.g
          key={i}
          style={{ originY: 1 }}
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: EASE }}
        >
          <rect x={b.x} y={88 - b.h} width={b.w} height={b.h} fill="url(#gp-bld)" stroke="#dde4ea" strokeWidth="0.6" />
          {Array.from({ length: Math.floor((b.h - 8) / 8) }).map((_, r) =>
            [0, 1].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={b.x + 4 + c * (b.w / 2 - 2)}
                y={88 - b.h + 5 + r * 8}
                width={b.w / 2 - 6}
                height="4"
                fill="#d5dde4"
              />
            ))
          )}
        </motion.g>
      ))}
    </svg>
  );
}

function StartupArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="gp-rocket" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#dfe6ec" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c9d3db" />
        </linearGradient>
        <radialGradient id="gp-cloud" cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e2e8ee" />
        </radialGradient>
      </defs>
      <motion.g animate={{ y: [0, -6, 0] }} transition={loop(2.6)}>
        <motion.path
          d="M66 60 C66 70 70 78 70 78 C70 78 74 70 74 60 Z"
          fill="#e5e9ee"
          style={{ originX: 0.5, originY: 0 }}
          animate={{ scaleY: [0.8, 1.2, 0.8] }}
          transition={loop(0.6)}
        />
        <path d="M62 44 L54 58 L62 58 Z" fill="#cfd8e0" />
        <path d="M78 44 L86 58 L78 58 Z" fill="#cfd8e0" />
        <path d="M70 6 C79 14 80 34 78 60 H62 C60 34 61 14 70 6 Z" fill="url(#gp-rocket)" stroke="#d7dee5" strokeWidth="0.6" />
        <circle cx="70" cy="30" r="4.5" fill="#e8edf1" stroke="#cfd8e0" />
      </motion.g>
      {[
        { cx: 52, cy: 80, r: 11, d: 0 },
        { cx: 70, cy: 76, r: 14, d: 0.3 },
        { cx: 88, cy: 80, r: 11, d: 0.6 },
        { cx: 40, cy: 85, r: 7, d: 0.9 },
        { cx: 100, cy: 85, r: 8, d: 1.2 },
      ].map((c, i) => (
        <motion.circle
          key={i}
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          fill="url(#gp-cloud)"
          style={{ originX: 0.5, originY: 0.5 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={loop(2.4, c.d)}
        />
      ))}
    </svg>
  );
}

function LandingArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="gp-page" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dde4ea" />
        </linearGradient>
      </defs>
      <ellipse cx="66" cy="88" rx="44" ry="3.5" fill="#0f172a" opacity="0.05" />
      <motion.g animate={{ y: [0, -4, 0] }} transition={loop(3.2)}>
        {/* browser window */}
        <path d="M24 14 L104 20 L104 84 L24 78 Z" fill="url(#gp-page)" stroke="#d7dee5" strokeWidth="0.8" />
        <path d="M104 20 L109 17 L109 81 L104 84 Z" fill="#d3dbe2" />
        <path d="M24 14 L104 20 L104 27 L24 21 Z" fill="#e3e9ee" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={29 + i * 4} cy={18 + i * 0.3} r="1.1" fill="#c9d2da" />
        ))}
        {/* hero lines */}
        <rect x="32" y="32" width="38" height="4" rx="2" fill="#d2dae1" />
        <rect x="32" y="40" width="28" height="4" rx="2" fill="#d2dae1" />
        <rect x="32" y="50" width="34" height="2.5" rx="1.2" fill="#e0e6eb" />
        <rect x="32" y="55" width="26" height="2.5" rx="1.2" fill="#e0e6eb" />
        {/* CTA button pulses */}
        <motion.rect
          x="32"
          y="63"
          width="24"
          height="8"
          rx="4"
          fill="#c4ced7"
          style={{ originX: 0.5, originY: 0.5 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={loop(1.8)}
        />
        {/* image block */}
        <rect x="76" y="34" width="22" height="30" rx="2" fill="#e6ebef" />
        <path d="M76 58 L84 49 L90 55 L98 46 L98 64 L76 64 Z" fill="#d3dbe2" />
      </motion.g>
      {/* cursor clicking the CTA */}
      <motion.path
        d="M52 70 L52 84 L56 80 L59 86 L61 85 L58 79 L63 79 Z"
        fill="#ffffff"
        stroke="#c4ced7"
        strokeWidth="1"
        strokeLinejoin="round"
        animate={{ x: [10, 0, 0, 10], y: [8, 0, 0, 8], scale: [1, 1, 0.9, 1] }}
        transition={loop(2.6)}
      />
    </svg>
  );
}

function WebAppArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="gp-dash" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dde4ea" />
        </linearGradient>
      </defs>
      <ellipse cx="62" cy="88" rx="46" ry="3.5" fill="#0f172a" opacity="0.05" />
      {/* dashboard panel */}
      <motion.g animate={{ y: [0, -3, 0] }} transition={loop(3.4, 0.3)}>
        <path d="M18 24 L92 30 L92 84 L18 78 Z" fill="url(#gp-dash)" stroke="#d7dee5" strokeWidth="0.8" />
        <path d="M92 30 L97 27 L97 81 L92 84 Z" fill="#d3dbe2" />
        <path d="M18 24 L34 25.3 L34 79.3 L18 78 Z" fill="#e3e9ee" />
        {[34, 42, 50].map((y) => (
          <rect key={y} x="21" y={y} width="10" height="3" rx="1.5" fill="#cfd8e0" />
        ))}
        {[0, 1].map((i) => (
          <rect key={i} x={40 + i * 25} y={36 + i * 2} width="21" height="12" rx="2" fill="#e8edf1" />
        ))}
        {[10, 16, 12, 20, 15].map((h, i) => (
          <motion.rect
            key={i}
            x={42 + i * 9}
            y={74 - h + i * 0.6}
            width="5"
            height={h}
            rx="1"
            fill="#cfd8e0"
            style={{ originY: 1 }}
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={loop(2.4, i * 0.15)}
          />
        ))}
      </motion.g>
      {/* rotating gears */}
      <motion.g
        style={{ originX: 0.5, originY: 0.5 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="22" r="11" fill="none" stroke="#cfd8e0" strokeWidth="5" strokeDasharray="4 3.2" />
        <circle cx="100" cy="22" r="7" fill="#e8edf1" stroke="#cfd8e0" strokeWidth="1.5" />
        <circle cx="100" cy="22" r="2.5" fill="#cfd8e0" />
      </motion.g>
      <motion.g
        style={{ originX: 0.5, originY: 0.5 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="112" cy="40" r="6" fill="none" stroke="#d5dde4" strokeWidth="3.5" strokeDasharray="2.6 2.4" />
        <circle cx="112" cy="40" r="2" fill="#d5dde4" />
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const PLANS = [
  {
    num: "01",
    title: ["Business Growth", "Website"],
    text: "Strategic websites designed to attract, engage and convert the right visitors into loyal customers.",
    icon: (
      <svg {...svgBase("#fff", 20)}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 12 L19 5 M16 5 H19 V8" />
      </svg>
    ),
    Art: GrowthArt,
  },
  {
    num: "02",
    title: ["Ecommerce", "Website"],
    text: "Powerful online stores that deliver seamless shopping experiences and increase repeat sales.",
    icon: (
      <svg {...svgBase("#fff", 20)}>
        <path d="M3 4 H6 L8.5 15 H18 L20 8 H7" />
        <circle cx="9.5" cy="19" r="1.4" />
        <circle cx="17" cy="19" r="1.4" />
      </svg>
    ),
    Art: EcommerceArt,
  },
  {
    num: "03",
    title: ["Corporate", "Website"],
    text: "Professional websites that establish trust, strengthen your brand and create a lasting impression.",
    icon: (
      <svg {...svgBase("#fff", 20)}>
        <path d="M4 21 V5 H13 V21 M13 9 H20 V21 M2 21 H22" />
        <path d="M7 9 H10 M7 13 H10 M7 17 H10 M16 13 H17 M16 17 H17" />
      </svg>
    ),
    Art: CorporateArt,
  },
  {
    num: "04",
    title: ["Startup", "Website"],
    text: "Fast, modern websites to validate your idea, attract investors and win your first customers.",
    icon: (
      <svg {...svgBase("#fff", 20)}>
        <path d="M14 4 C18 3 21 6 20 10 L13 17 L7 11 Z" />
        <circle cx="15.5" cy="8.5" r="1.5" />
        <path d="M7 11 H4 L7 7 H11 M13 17 V20 L17 17 V13 M6 18 L3.5 20.5" />
      </svg>
    ),
    Art: StartupArt,
  },
  {
    num: "05",
    title: ["Landing Page", "Website"],
    text: "High-converting landing pages built for campaigns, product launches and lead generation.",
    icon: (
      <svg {...svgBase("#fff", 20)}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 8 H21 M7 12 H13 M7 15.5 H11" />
        <path d="M15 12 L15 18 L16.8 16.4 L18 18.6 L19 18.1 L17.9 15.9 L20.2 15.8 Z" />
      </svg>
    ),
    Art: LandingArt,
  },
  {
    num: "06",
    title: ["Custom Web", "Application"],
    text: "Tailor-made web apps, portals and dashboards that automate work and scale with your business.",
    icon: (
      <svg {...svgBase("#fff", 20)}>
        <path d="M9 7 L4 12 L9 17 M15 7 L20 12 L15 17 M13.5 5 L10.5 19" />
      </svg>
    ),
    Art: WebAppArt,
  },
];

const FEATURES = [
  "Custom Website Design & Development",
  "Responsive & Mobile-First Design",
  "SEO-Friendly Development",
  "Speed Optimization & Performance",
  "Secure & Scalable Websites",
  "Ecommerce & CMS Development",
  "Ongoing Maintenance & Support",
];

const STATS = [
  {
    target: 200,
    suffix: "+",
    label: "Websites Delivered",
    icon: (
      <svg {...svgBase(TEAL, 22)}>
        <path d="M12 3 L20 6 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V6 Z" />
        <path d="M8.5 12 L11 14.5 L15.5 9.5" />
      </svg>
    ),
  },
  {
    target: 98,
    suffix: "%",
    label: "Client Satisfaction",
    icon: (
      <svg {...svgBase(TEAL, 22)}>
        <circle cx="12" cy="9" r="6" />
        <path d="M12 6 L12.9 7.9 L15 8.2 L13.5 9.6 L13.9 11.7 L12 10.7 L10.1 11.7 L10.5 9.6 L9 8.2 L11.1 7.9 Z" />
        <path d="M8.5 14 L7 21 L12 18.5 L17 21 L15.5 14" />
      </svg>
    ),
  },
  {
    target: 5,
    suffix: "+",
    label: "Years of Experience",
    icon: (
      <svg {...svgBase(TEAL, 22)}>
        <path d="M4 20 V15 M9 20 V12 M14 20 V14 M19 20 V9" />
        <path d="M4 11 L9 7 L13 9 L20 4 M16.5 4 H20 V7.5" />
      </svg>
    ),
  },
  {
    target: 24,
    suffix: "/7",
    label: "Support & Maintenance",
    icon: (
      <svg {...svgBase(TEAL, 22)}>
        <path d="M4 14 V12 C4 7.6 7.6 4 12 4 C16.4 4 20 7.6 20 12 V14" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" />
        <path d="M19 19 C19 20.5 17.5 21 15 21 H13" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Motion                                                              */
/* ------------------------------------------------------------------ */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  // custom = card index; right-column cards trail slightly behind the left ones
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: (i % 2) * 0.12 } }),
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

/* ------------------------------------------------------------------ */

function DottedRule() {
  return <span className="hidden sm:block w-14 border-t-2 border-dotted" style={{ borderColor: `${TEAL}80` }} />;
}

function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: EASE }}
      className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-[0_15px_40px_-25px_rgba(15,40,60,0.25)] px-4 py-5 grid grid-cols-2 lg:grid-cols-4 gap-y-6"
    >
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex items-center justify-center gap-3 px-2 ${i > 0 ? "lg:border-l border-slate-100" : ""}`}
        >
          <span className="shrink-0 w-12 h-12 rounded-full bg-[#F1F4F6] flex items-center justify-center">{stat.icon}</span>
          <div>
            <p className="text-xl font-bold tabular-nums leading-none mb-1" style={{ color: DEEP_TEAL }}>
              {inView ? <Counter target={stat.target} suffix={stat.suffix} /> : `0${stat.suffix}`}
            </p>
            <p className="text-[11px] text-slate-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default function WebsiteDevGrowthPlan() {
  return (
    <section className="relative w-full bg-white py-12 lg:py-16 overflow-x-clip">
      <Container>
        <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="flex items-center gap-4 mb-3">
            <DottedRule />
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: TEAL }}>
              Choose Your Growth Plan
            </p>
            <DottedRule />
          </div>
          <h2 className="font-serif text-3xl md:text-[44px] leading-tight font-semibold mb-3" style={{ color: NAVY }}>
            Choose Your Growth Plan
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-xl leading-relaxed">
            Different businesses. Different goals. We create the right website solution to help you grow, scale and lead in your industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,2fr)] gap-5">
          {/* Core focus card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative lg:sticky lg:top-40 lg:self-start"
            style={{ filter: "drop-shadow(0 18px 30px rgba(15,40,60,0.08)) drop-shadow(0 1px 1px rgba(15,40,60,0.04))" }}
          >
            {/* Card */}
            <div className="absolute inset-0 bg-white rounded-3xl pointer-events-none" aria-hidden />

            {/* Icon badge */}
            <div className="absolute left-10 top-12 w-[120px] h-[120px] flex items-center justify-center">
              <motion.span
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: `${TEAL}40` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: DEEP_TEAL }} />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: DEEP_TEAL }} />
                <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: DEEP_TEAL }} />
                <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: DEEP_TEAL }} />
              </motion.span>
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={loop(3)}
                className="relative w-[84px] h-[84px] rounded-full bg-gradient-to-br from-white via-white to-[#e8eef1] shadow-[0_14px_28px_-10px_rgba(15,60,70,0.35),inset_0_2px_6px_rgba(255,255,255,1)] flex items-center justify-center"
              >
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none" aria-hidden>
                  <defs>
                    <linearGradient id="gp-badge-bar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#1f8f84" />
                      <stop offset="1" stopColor={DEEP_TEAL} />
                    </linearGradient>
                  </defs>
                  {[
                    { x: 8, h: 12 },
                    { x: 17, h: 18 },
                    { x: 26, h: 24 },
                    { x: 35, h: 30 },
                  ].map((b, i) => (
                    <motion.rect
                      key={i}
                      x={b.x}
                      y={42 - b.h}
                      width="6.5"
                      height={b.h}
                      rx="1"
                      fill="url(#gp-badge-bar)"
                      style={{ originY: 1 }}
                      animate={{ scaleY: [0.6, 1, 0.6] }}
                      transition={loop(2.4, i * 0.18)}
                    />
                  ))}
                  <path d="M6 24 L16 16 L24 19 L40 6" stroke={DEEP_TEAL} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M33 5.5 H40.5 V13" stroke={DEEP_TEAL} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </div>

            {/* Vertical label */}
            <div className="absolute left-5 top-44 bottom-12 flex flex-col items-center gap-3">
              <span
                className="text-[10px] font-bold tracking-[0.25em] uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-180"
                style={{ color: TEAL }}
              >
                Our Core Focus
              </span>
              <motion.span
                className="w-px flex-1 origin-top"
                style={{ backgroundColor: `${TEAL}80` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: EASE }}
              />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: DEEP_TEAL }} />
            </div>

            {/* Content */}
            <div className="relative pt-[184px] pb-10 pl-14 pr-5">
              <h3 className="font-serif text-xl md:text-[22px] leading-[1.25] font-semibold mb-4">
                <span style={{ color: NAVY }}>Website<br />Development</span>
                <br />
                <span style={{ color: TEAL }}>Solutions That Drive<br />Real Business Growth</span>
              </h3>
              <span className="block w-8 h-[2px] mb-6" style={{ backgroundColor: GOLD }} />

              <motion.ul
                variants={listVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col gap-3 mb-8"
              >
                {FEATURES.map((f) => (
                  <motion.li key={f} variants={listItem} className="flex items-center gap-2 text-[12px] text-slate-600">
                    <span className="shrink-0 w-3.5 h-3.5 rounded-full border-[1.5px] flex items-center justify-center" style={{ borderColor: TEAL }}>
                      <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {f}
                  </motion.li>
                ))}
              </motion.ul>

              <div className="flex flex-nowrap items-center gap-3">
                <Link
                  href="/contact"
                  className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-white text-[12px] font-semibold whitespace-nowrap shadow-lg shadow-teal-900/20 transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: DEEP_TEAL }}
                >
                  Discuss Your Project
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/portfolio" className="group shrink-0 inline-flex items-center gap-2 text-[12px] font-semibold whitespace-nowrap" style={{ color: DEEP_TEAL }}>
                  <span className="border-b" style={{ borderColor: DEEP_TEAL }}>View Our Work</span>
                  <span className="w-7 h-7 rounded-full border flex items-center justify-center transition-transform group-hover:translate-x-1" style={{ borderColor: DEEP_TEAL }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Plan cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {PLANS.map(({ num, title, text, icon, Art }, i) => (
              // each card animates on its own when it scrolls into view,
              // so cards beyond the first four load in as you reach them
              <motion.div
                key={num}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                whileHover="hover"
                className="group relative bg-white rounded-2xl border border-slate-100 shadow-[0_15px_40px_-25px_rgba(15,40,60,0.25)] p-6 overflow-hidden min-h-[260px] flex flex-col transition-shadow hover:shadow-[0_25px_50px_-20px_rgba(15,60,70,0.3)]"
              >
                <div className="flex items-start gap-4 mb-5">
                  <motion.span
                    variants={{ hover: { rotate: -8, scale: 1.08 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_8px_16px_-6px_rgba(15,92,86,0.6)]"
                    style={{ backgroundColor: DEEP_TEAL }}
                  >
                    {icon}
                  </motion.span>
                  <div className="pt-1">
                    <h3 className="font-serif text-lg md:text-xl leading-tight font-semibold" style={{ color: NAVY }}>
                      {title[0]}
                      <br />
                      {title[1]}
                    </h3>
                    <motion.span
                      className="block h-[2px] w-7 mt-3 origin-left"
                      style={{ backgroundColor: TEAL }}
                      variants={{ hover: { scaleX: 1.6 } }}
                    />
                  </div>
                  <span className="ml-auto font-serif text-5xl md:text-[56px] font-extralight text-slate-200 transition-colors group-hover:text-teal-100 leading-none">
                    {num}
                  </span>
                </div>

                <p className="relative z-10 text-[13px] text-slate-600 leading-relaxed max-w-[64%] mb-6">{text}</p>

                <Link
                  href="/contact"
                  className="relative z-10 mt-auto inline-flex items-center gap-2 text-[13px] font-semibold self-start"
                  style={{ color: DEEP_TEAL }}
                >
                  Learn More
                  <motion.svg
                    variants={{ hover: { x: 5 } }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </motion.svg>
                </Link>

                {/* illustration, faded into the card */}
                <div
                  className="absolute right-2 bottom-2 w-[48%] max-w-[190px] aspect-[4/3] pointer-events-none opacity-80"
                  style={{
                    maskImage: "radial-gradient(ellipse 90% 90% at 80% 85%, #000 45%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 80% 85%, #000 45%, transparent 100%)",
                  }}
                >
                  <Art />
                </div>
                {/* soft mist at the bottom */}
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <Stats />
        </div>
      </Container>
    </section>
  );
}
