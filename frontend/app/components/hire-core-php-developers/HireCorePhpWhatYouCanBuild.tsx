"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";

interface BuildCard {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const leftCards: BuildCard[] = [
  {
    id: "custom-web",
    title: "Custom Web Applications",
    desc: "High-performance web applications tailored to your business needs.",
    icon: (
      // Browser Window with </>
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="3" />
        <line x1="2" y1="9" x2="22" y2="9" />
        <path d="m9 13-2 2 2 2" />
        <path d="m15 13 2 2-2 2" />
      </svg>
    ),
  },
  {
    id: "ecommerce",
    title: "E-Commerce Solutions",
    desc: "Secure, feature-rich online stores with seamless checkout experience.",
    icon: (
      // Shopping Cart
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    ),
  },
  {
    id: "security",
    title: "Security & Data Protection",
    desc: "Secure coding practices and robust protection for your critical data.",
    icon: (
      // Shield with Checkmark
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

const rightCards: BuildCard[] = [
  {
    id: "cms-portal",
    title: "CMS & Portal Applications",
    desc: "Dynamic portals and CMS solutions for easy content management.",
    icon: (
      // Laptop / Portal Screen Layout
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <line x1="2" y1="20" x2="22" y2="20" />
        <path d="M7 8h4" />
        <path d="M7 12h8" />
      </svg>
    ),
  },
  {
    id: "api-integrations",
    title: "API & System Integrations",
    desc: "Connect third-party services and automate your business workflows.",
    icon: (
      // API Network Nodes
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M7.8 7.8 10.5 15.5" />
        <path d="m16.2 7.8-2.7 7.7" />
        <text x="12" y="11" textAnchor="middle" fill="#0d9488" fontSize="6.5" fontWeight="900">API</text>
      </svg>
    ),
  },
  {
    id: "performance-opt",
    title: "Performance Optimization",
    desc: "Optimize speed, scalability and performance for the best user experience.",
    icon: (
      // Speedometer Gauge
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 12l4-4" />
        <circle cx="12" cy="12" r="2" fill="#0d9488" />
      </svg>
    ),
  },
];

const bottomPillars = [
  {
    title: "Agile Development",
    desc: "Iterative, transparent and on-time delivery.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2dd4bf]" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      </svg>
    ),
  },
  {
    title: "Code Quality",
    desc: "Clean, maintainable and future-ready code.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2dd4bf]" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        <polygon points="12 5 13 7.5 15.5 7.5 13.5 9 14.5 11.5 12 10 9.5 11.5 10.5 9 8.5 7.5 11 7.5 12 5" fill="#2dd4bf" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Experienced Team",
    desc: "Skilled Core PHP experts with proven expertise.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2dd4bf]" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Ongoing Support",
    desc: "Continuous support and maintenance you can rely on.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2dd4bf]" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
];

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

/* Design space is 1300 x 450. Hub centre is (820, 238); the header owns the left 400px. */
const CX = 820;
const CY = 238;
const CARD_W = 200;
const LEFT_POS = [
  { x: 455, y: 64 },
  { x: 385, y: 213 },
  { x: 375, y: 362 },
];
/* mirror of LEFT_POS around the hub so both sides sit the same distance from the circle */
const RIGHT_POS = LEFT_POS.map((p) => ({ x: 2 * CX - (p.x + CARD_W), y: p.y }));
/* node on the glass ring each card connects to */
const LEFT_NODES: [number, number][] = [[CX - 94, 144], [CX - 133, 238], [CX - 94, 332]];
const RIGHT_NODES: [number, number][] = [[CX + 94, 144], [CX + 133, 238], [CX + 94, 332]];

function BuildCardView({
  card,
  x,
  y,
  side,
  delay,
  hoveredId,
  setHoveredId,
}: {
  card: BuildCard;
  x: number;
  y: number;
  side: "left" | "right";
  delay: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) {
  const active = hoveredId === card.id;
  return (
    <motion.div
      className={`absolute flex items-center gap-3 rounded-2xl px-3.5 py-3 cursor-pointer backdrop-blur border transition-all ${
        active ? "bg-white border-teal-200 shadow-[0_18px_32px_-14px_rgba(13,148,136,0.35)]" : "bg-white/70 border-white shadow-[0_14px_30px_-16px_rgba(15,35,80,0.2)]"
      }`}
      style={{ left: x, top: y - 36, width: CARD_W }}
      initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setHoveredId(card.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <motion.span
        className="w-10 h-10 rounded-xl bg-[#eef6f9] border border-white shadow-[inset_0_0_0_1px_rgba(13,148,136,0.12)] flex items-center justify-center shrink-0 [&_svg]:w-5 [&_svg]:h-5"
        animate={{ y: [0, -2.5, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {card.icon}
      </motion.span>
      <div className="min-w-0 text-left">
        <h3 className={`text-[12px] font-bold leading-tight transition-colors ${active ? "text-[#0d9488]" : "text-[#0c1e3d]"}`}>{card.title}</h3>
        <p className="mt-1 text-[9.5px] text-slate-500 leading-snug">{card.desc}</p>
      </div>
    </motion.div>
  );
}

/* Dark glass hexagon with "Core php" wordmark */
function CoreHex({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 224" className={className} fill="none">
      <defs>
        <linearGradient id="coreHexBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14456b" />
          <stop offset="0.5" stopColor="#0a2a4d" />
          <stop offset="1" stopColor="#071a36" />
        </linearGradient>
        <linearGradient id="coreHexRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fe3e8" />
          <stop offset="1" stopColor="#3b8fd0" />
        </linearGradient>
      </defs>
      <polygon points="100 8, 188 58, 188 166, 100 216, 12 166, 12 58" fill="url(#coreHexBody)" stroke="url(#coreHexRim)" strokeWidth="9" strokeLinejoin="round" />
      <polygon points="100 22, 176 65, 176 159, 100 202, 24 159, 24 65" fill="none" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1.5" strokeLinejoin="round" />
      <text x="100" y="82" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="700" fontFamily="system-ui, sans-serif">Core</text>
      <text x="100" y="140" textAnchor="middle" fill="#ffffff" fontSize="64" fontWeight="500" fontStyle="italic" fontFamily="system-ui, sans-serif" letterSpacing="-2">php</text>
      <text x="100" y="170" textAnchor="middle" fill="#9fc3dd" fontSize="11" fontFamily="system-ui, sans-serif">Robust. Scalable. Secure.</text>
    </svg>
  );
}

export default function HireCorePhpWhatYouCanBuild() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const subtitle =
    "From custom web applications to complex enterprise systems, our Core PHP developers build solutions that scale with your business.";

  return (
    <section id="what-you-can-build" className="relative w-full overflow-hidden font-sans bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_55%,#f0f5fa_100%)] pt-10 sm:pt-14 pb-12 sm:pb-16">
      <Container className="relative z-10 max-w-[1320px] w-full sm:px-10 lg:px-16">
        {/* ======================= DESKTOP: fixed 1300 x 450 canvas, scaled ======================= */}
        <div className="hidden lg:block">
          <ScaleBox width={1300} height={450}>
            <div className="relative w-[1300px] h-[450px]">
              {/* Header */}
              <motion.div
                className="absolute left-[38px] top-[22px] text-[11.5px] font-bold tracking-[0.24em] text-[#0f8a83] uppercase"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                What you can build —
              </motion.div>
              <motion.h2
                className="absolute left-[38px] top-[52px] text-[40px] font-black tracking-tight leading-[1.1] text-[#0c1e3d]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Powerful Solutions.
                <br />
                <span className="bg-gradient-to-r from-[#0f8a83] to-[#1aa6a6] bg-clip-text text-transparent">Built With Core PHP.</span>
              </motion.h2>
              <motion.p
                className="absolute left-[38px] top-[176px] w-[262px] text-[13px] leading-[1.55] text-slate-600"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
              <motion.div
                className="absolute left-[38px] top-[282px] h-[3px] rounded-full bg-[#0f8a83]"
                initial={{ width: 0 }}
                animate={{ width: 44 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />

              {/* Rings + connectors */}
              <svg className="absolute inset-0 w-[1300px] h-[450px] pointer-events-none" viewBox="0 0 1300 450" fill="none">
                <circle cx={CX} cy={CY} r="133" stroke="#9fdde3" strokeOpacity="0.7" strokeWidth="1.5" />
                <circle cx={CX} cy={CY} r="168" stroke="#b9e3e8" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="3 5" />

                {[
                  ...LEFT_POS.map((p, i) => ({ d: `M ${p.x + CARD_W} ${p.y} C ${p.x + CARD_W + 36} ${p.y}, ${LEFT_NODES[i][0] - 36} ${LEFT_NODES[i][1]}, ${LEFT_NODES[i][0]} ${LEFT_NODES[i][1]}`, n: LEFT_NODES[i] })),
                  ...RIGHT_POS.map((p, i) => ({ d: `M ${p.x} ${p.y} C ${p.x - 36} ${p.y}, ${RIGHT_NODES[i][0] + 36} ${RIGHT_NODES[i][1]}, ${RIGHT_NODES[i][0]} ${RIGHT_NODES[i][1]}`, n: RIGHT_NODES[i] })),
                ].map((l, i) => (
                  <g key={l.d}>
                    <motion.path
                      d={l.d}
                      stroke="#2aa7a7"
                      strokeOpacity="0.5"
                      strokeWidth="1.1"
                      strokeDasharray="3 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                    />
                    <circle cx={l.n[0]} cy={l.n[1]} r="6" fill="#2dd4bf" opacity="0.25" />
                    <circle cx={l.n[0]} cy={l.n[1]} r="3" fill="#14a3a0" />
                    <circle r="2.4" fill="#14b8a6">
                      <animateMotion dur={`${2.8 + i * 0.3}s`} begin={`${1.4 + i * 0.2}s`} repeatCount="indefinite" path={l.d} />
                    </circle>
                  </g>
                ))}
              </svg>

              {/* Glass ring halo + pedestal */}
              <motion.div
                className="absolute rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(226,243,250,0.7)_65%,rgba(186,228,240,0.35)_100%)] border border-white shadow-[0_0_40px_rgba(125,211,252,0.35)]"
                style={{ left: CX - 118, top: CY - 118, width: 236, height: 236 }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute" style={{ left: CX - 125, top: 358, width: 250, height: 70 }}>
                <motion.span
                  className="absolute inset-x-0 bottom-0 h-[34px] rounded-[50%] border-2 border-teal-300/60 shadow-[0_0_20px_3px_rgba(45,212,191,0.35)]"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="absolute inset-x-[4%] bottom-[8px] h-[44px] rounded-[50%] bg-[linear-gradient(180deg,#ffffff,#dcecf3)] border border-white shadow-[0_16px_26px_-10px_rgba(15,35,80,0.25)]" />
                <span className="absolute inset-x-[16%] bottom-[20px] h-[30px] rounded-[50%] bg-[linear-gradient(180deg,#ffffff,#eef6fa)] border border-white/90" />
              </div>

              {/* Hex badge grows up out of the pedestal */}
              <motion.div
                className="absolute"
                style={{ left: CX - 80, top: CY - 90, width: 160, transformOrigin: "50% 100%" }}
                initial={{ opacity: 0, y: 30, scale: 0.15 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <CoreHex className="w-full h-auto drop-shadow-[0_18px_28px_rgba(10,42,77,0.45)]" />
              </motion.div>

              {/* Cards */}
              {leftCards.map((c, i) => (
                <BuildCardView key={c.id} card={c} x={LEFT_POS[i].x} y={LEFT_POS[i].y} side="left" delay={0.25 + i * 0.12} hoveredId={hoveredId} setHoveredId={setHoveredId} />
              ))}
              {rightCards.map((c, i) => (
                <BuildCardView key={c.id} card={c} x={RIGHT_POS[i].x} y={RIGHT_POS[i].y} side="right" delay={0.25 + i * 0.12} hoveredId={hoveredId} setHoveredId={setHoveredId} />
              ))}
            </div>
          </ScaleBox>
        </div>

        {/* ======================= MOBILE / TABLET ======================= */}
        <div className="lg:hidden">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#0f8a83] uppercase">What you can build —</div>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[#0c1e3d]">
            Powerful Solutions.
            <br />
            <span className="text-[#0f8a83]">Built With Core PHP.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">{subtitle}</p>
          <div className="mt-5 w-11 h-[3px] rounded-full bg-[#0f8a83]" />

          <motion.div
            className="mt-8 mx-auto w-[150px] origin-bottom"
            initial={{ opacity: 0, y: 24, scale: 0.2 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <CoreHex className="w-full h-auto drop-shadow-[0_16px_24px_rgba(10,42,77,0.4)]" />
          </motion.div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...leftCards, ...rightCards].map((c) => (
              <div key={c.id} className="flex items-center gap-3 rounded-2xl bg-white/80 border border-white shadow-[0_14px_30px_-16px_rgba(15,35,80,0.2)] p-3.5">
                <span className="w-11 h-11 rounded-xl bg-[#eef6f9] flex items-center justify-center shrink-0">{c.icon}</span>
                <div>
                  <h3 className="text-[13.5px] font-bold text-[#0c1e3d] leading-tight">{c.title}</h3>
                  <p className="mt-1 text-[11.5px] text-slate-500 leading-snug">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- DARK CTA PANEL ---------------- */}
        <motion.div
          className="relative mt-8 lg:mt-4 rounded-3xl bg-[linear-gradient(110deg,#07162b_0%,#0a2038_55%,#08192f_100%)] px-6 sm:px-10 py-8 flex flex-col xl:flex-row xl:items-center gap-8 shadow-[0_28px_60px_-24px_rgba(7,22,43,0.8)] overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />

          <div className="relative xl:w-[330px] shrink-0">
            <div className="text-[22px] sm:text-[24px] font-semibold leading-snug text-white">
              Tell us <span className="text-[#3fd6cf]">what you need</span> built.
              <br />
              We&apos;ll build the right solution for you.
            </div>
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <Link
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 h-[42px] px-5 rounded-lg bg-[linear-gradient(90deg,#0f8a99,#1aa6a6)] text-white text-[12.5px] font-semibold shadow-[0_10px_22px_-8px_rgba(26,166,166,0.7)] hover:brightness-110 transition whitespace-nowrap"
              >
                Hire Core PHP Developers
                <svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 h-[42px] px-5 rounded-lg border border-white/25 text-white text-[12.5px] font-medium hover:bg-white/10 transition whitespace-nowrap"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Talk to an Expert
              </Link>
            </div>
          </div>

          <div className="relative flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-white/10">
            {bottomPillars.map((p, i) => (
              <motion.div
                key={p.title}
                className="flex flex-col items-center text-center lg:px-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <motion.span
                  className="w-11 h-11 rounded-full border border-teal-300/30 bg-white/5 flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5"
                  animate={{ boxShadow: ["0 0 0 0 rgba(45,212,191,0)", "0 0 16px 2px rgba(45,212,191,0.3)", "0 0 0 0 rgba(45,212,191,0)"] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                >
                  {p.icon}
                </motion.span>
                <h4 className="mt-3 text-[13px] font-bold text-white">{p.title}</h4>
                <p className="mt-1.5 text-[11px] text-slate-300/80 leading-snug max-w-[150px]">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
