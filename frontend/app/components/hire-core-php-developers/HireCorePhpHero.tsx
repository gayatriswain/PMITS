"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const leftFeatures__cms = [
  {
    id: "custom-dev",
    title: "Custom Development",
    desc: "Build web applications tailored to your business.",
    icon: (
      // Code brackets </>
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "database",
    title: "Database Expertise",
    desc: "Design, optimize and manage high-performance databases.",
    icon: (
      // Database Cylinders
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: "integrations",
    title: "Third-Party Integrations",
    desc: "Seamless integration with APIs, gateways and external services.",
    icon: (
      // Puzzle piece
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.439 7.85c0-1.571-1.274-2.85-2.846-2.85H15V3.5A1.5 1.5 0 0 0 13.5 2h-3A1.5 1.5 0 0 0 9 3.5V5H7.407C5.835 5 4.561 6.279 4.561 7.85v2.15H6.5A1.5 1.5 0 0 1 8 11.5v3A1.5 1.5 0 0 1 6.5 16H4.56v2.15c0 1.571 1.274 2.85 2.847 2.85H9v1.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V21h1.593c1.572 0 2.846-1.279 2.846-2.85V16h1.5a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-1.5V7.85z" />
      </svg>
    ),
  },
];

const rightFeatures__cms = [
  {
    id: "perf-opt",
    title: "Performance Optimization",
    desc: "Clean code, optimization and scaling for better performance.",
    icon: (
      // Speedometer Gauge
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 12l4-4" />
        <circle cx="12" cy="12" r="2" fill="#0d9488" />
      </svg>
    ),
  },
  {
    id: "security",
    title: "Secure & Reliable",
    desc: "Security-first approach to keep your application and data protected.",
    icon: (
      // Shield Check
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: "support",
    title: "Maintenance & Support",
    desc: "Ongoing support and maintenance to keep your application running.",
    icon: (
      // Headset / Customer Support
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

/* Connectors in the 1026 x 610 design space: [path, dot on the orbit ring] */
const LEFT_LINES: [string, number, number][] = [
  ["M 282 251 H 328 V 276", 328, 276],
  ["M 258 335 H 298", 298, 335],
  ["M 244 439 H 328 V 394", 328, 394],
];
const RIGHT_LINES: [string, number, number][] = [
  ["M 729 251 H 698 V 276", 698, 276],
  ["M 738 335 H 728", 728, 335],
  ["M 753 439 H 698 V 394", 698, 394],
];
const ORBIT_Y = 335;

const ROW_Y = [241, 335, 429];
const LEFT_X = [69, 45, 31];
const RIGHT_X = [735, 744, 759];

type Feature = (typeof leftFeatures__cms)[number];

function FeatureRow({
  f,
  y,
  x,
  side,
  delay,
  hoveredId,
  setHoveredId,
}: {
  f: Feature;
  y: number;
  x: number;
  side: "left" | "right";
  delay: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) {
  const active = hoveredId === f.id;
  return (
    <motion.div
      className="absolute flex items-center gap-3.5 cursor-pointer"
      style={{ left: x, top: y - 26 }}
      initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setHoveredId(f.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <motion.div
        className={`w-[52px] h-[52px] rounded-full bg-white/90 backdrop-blur border flex items-center justify-center shrink-0 transition-all ${
          active
            ? "border-teal-300 shadow-[0_14px_28px_-6px_rgba(13,148,136,0.3)] ring-4 ring-teal-100/70"
            : "border-white shadow-[0_10px_24px_-8px_rgba(15,35,80,0.18),inset_0_0_0_3px_rgba(224,242,254,0.7)]"
        }`}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4 + delay * 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {f.icon}
      </motion.div>
      <div className="text-left w-[132px]">
        <h3 className={`text-[12.5px] font-bold leading-tight whitespace-nowrap transition-colors ${active ? "text-[#0d9488]" : "text-[#0c1e3d]"}`}>{f.title}</h3>
        <p className="mt-1 text-[10.5px] text-slate-500 leading-snug">{f.desc}</p>
      </div>
    </motion.div>
  );
}

const perks__cms = [
  { a: "Flexible", b: "Engagements", d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.870M16 3.130a4 4 0 0 1 0 7.750" },
  { a: "Quick", b: "Onboarding", d: "M13 2 4 14h7l-1 8 9-12h-7Z" },
  { a: "Dedicated", b: "Support", d: "M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3ZM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3Z" },
];

function BottomBanner({ className = "" }: { className?: string }) {
  const $t = useCmsText();
  const perks = useCmsData("HireCorePhpHero__perks", perks__cms);
  return (
    <motion.div
      className={`rounded-2xl bg-white/95 border border-slate-100 shadow-[0_16px_40px_-14px_rgba(15,35,80,0.12)] ${className}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <div className="h-full flex flex-col lg:flex-row items-center justify-between gap-4 px-6 py-4 lg:py-0">
        <div className="flex items-center gap-3.5 shrink-0">
          <span className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-500 shrink-0">
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </span>
          <div className="text-left leading-snug text-[13.5px] font-bold">
            <div className="text-[#0c1e3d]">{html($t("HireCorePhpHero__t1", "Your product deserves"))}</div>
            <div className="text-[#0d9488]">{html($t("HireCorePhpHero__t2", "the right PHP team."))}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={$t("HireCorePhpHero__t3", "#contact")}
            className="group inline-flex items-center justify-center gap-2 h-[38px] px-5 rounded-lg bg-[#0d8a94] text-white text-[12px] font-semibold shadow-md shadow-teal-600/25 hover:bg-[#0b7a84] transition-colors whitespace-nowrap"
          >
            {$t("HireCorePhpHero__t4", "Hire PHP Developers")}<svg viewBox="0 0 24 24" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link
            href={$t("HireCorePhpHero__t5", "#contact")}
            className="inline-flex items-center justify-center gap-2 h-[38px] px-4 rounded-lg bg-white border border-slate-300 text-[#0c1e3d] text-[12px] font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap"
          >
            {$t("HireCorePhpHero__t6", "Talk to an Expert")}<svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-left divide-x divide-slate-200 shrink-0">
          {perks.map((p, i) => (
            <div key={p.a} className={`flex items-center gap-2 ${i ? "pl-4" : ""}`}>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={p.d} />
              </svg>
              <div className="text-[9.5px] leading-tight text-slate-600 font-medium">
                {p.a}
                <br />
                {p.b}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Heading({ className = "" }: { className?: string }) {
  const $t = useCmsText();
  return (
    <h1 className={`font-black tracking-tight text-[#0c1e3d] ${className}`}>{rich($t("HireCorePhpHero__t7m", "Hire Core PHP<br><span class=\"bg-gradient-to-r from-[#0f8a83] to-[#1aa6a6] bg-clip-text text-transparent\">Developers</span>"))}</h1>
  );
}

export default function HireCorePhpHero() {
  const $t = useCmsText();
  const leftFeatures = useCmsData("HireCorePhpHero__leftFeatures", leftFeatures__cms);
  const rightFeatures = useCmsData("HireCorePhpHero__rightFeatures", rightFeatures__cms);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const subtitle = (
    <>
      {$t("HireCorePhpHero__t9", "Bring in dedicated PHP experts who build,")}<br className="hidden sm:inline" /> {$t("HireCorePhpHero__t10", "optimize and scale powerful web applications.")}</>
  );

  return (
    <section className="relative w-full overflow-hidden font-sans bg-[linear-gradient(180deg,#fbfcfe_0%,#f1f5f9_55%,#eaf0f6_100%)] pt-6 pb-10">
      <Container className="relative z-10 max-w-[1240px]">
        {/* ======================= DESKTOP: fixed 1026 x 610 canvas, scaled ======================= */}
        <div className="hidden lg:block">
          <ScaleBox width={1026} height={610}>
            <div className="relative w-[1026px] h-[610px]">
              {/* Arch outline */}
              <div className="absolute left-[92px] top-[120px] w-[842px] h-[370px] rounded-t-[300px] border border-slate-200/60 pointer-events-none" />

              {/* Header */}
              <motion.div
                className="absolute inset-x-0 top-[18px] text-center text-[11px] font-bold tracking-[0.24em] text-[#0f8a83] uppercase"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {html($t("HireCorePhpHero__t11", "Core PHP Development"))}</motion.div>
              <motion.div
                className="absolute inset-x-0 top-[38px] text-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Heading className="text-[54px] leading-[1.06]" />
              </motion.div>
              <motion.p
                className="absolute left-1/2 -translate-x-1/2 top-[158px] w-[360px] text-center text-[13.5px] leading-[1.5] text-slate-600"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>

              {/* Orbit rings + connectors */}
              <svg className="absolute inset-0 w-[1026px] h-[610px] pointer-events-none" viewBox="0 0 1026 610" fill="none">
                <defs>
                  <path id="phpOrbit" d={`M 298 ${ORBIT_Y} a 215 115 0 1 0 430 0 a 215 115 0 1 0 -430 0`} />
                </defs>
                <ellipse cx="513" cy={ORBIT_Y} rx="215" ry="115" stroke="#5fd0cf" strokeOpacity="0.45" strokeWidth="1.2" />
                <ellipse cx="513" cy={ORBIT_Y} rx="245" ry="135" stroke="#9adbe0" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 5" />

                {[...LEFT_LINES, ...RIGHT_LINES].map(([d, x, y], i) => (
                  <g key={d}>
                    <motion.path
                      d={d}
                      stroke="#2aa7a7"
                      strokeOpacity="0.55"
                      strokeWidth="1.1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    />
                    <circle cx={x} cy={y} r="6" fill="#2dd4bf" opacity="0.25" />
                    <circle cx={x} cy={y} r="3" fill="#14a3a0" />
                    <circle r="2.4" fill="#14b8a6">
                      <animateMotion dur={`${2.6 + i * 0.3}s`} begin={`${1.2 + i * 0.2}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  </g>
                ))}

                {/* travelling nodes on the orbit */}
                {[0, 1, 2].map((i) => (
                  <circle key={i} r="3" fill="#22c5c0">
                    <animateMotion dur="14s" begin={`${-i * 4.6}s`} repeatCount="indefinite">
                      <mpath href="#phpOrbit" />
                    </animateMotion>
                  </circle>
                ))}
              </svg>

              {/* Light pool under the badge */}
              <motion.div
                className="absolute left-[353px] top-[375px] w-[320px] h-[110px] rounded-[50%] bg-[radial-gradient(ellipse,rgba(94,234,212,0.45)_0%,rgba(125,211,252,0.2)_50%,transparent_72%)] blur-md pointer-events-none"
                animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Pedestal */}
              <motion.div
                className="absolute z-10"
                style={{ left: 263, top: 226, width: 500 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
              >
                <Image src={$t("HireCorePhpHero__t12", "/core-php-base.webp")} alt={$t("HireCorePhpHero__t13", "Core PHP platform")} width={633} height={394} priority className="w-full h-auto select-none drop-shadow-[0_20px_36px_rgba(15,35,80,0.12)]" />
              </motion.div>

              {/* Levitating badge */}
              <motion.div
                className="absolute z-20"
                style={{ left: 418, top: 240, width: 190, transformOrigin: "50% 100%" }}
                initial={{ opacity: 0, y: 30, scale: 0.12 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={$t("HireCorePhpHero__t14", "/core-php-badge.webp")} alt={$t("HireCorePhpHero__t15", "Core PHP")} width={523} height={477} priority className="w-full h-auto select-none drop-shadow-[0_18px_30px_rgba(14,116,144,0.4)]" />
              </motion.div>

              {/* Features */}
              {leftFeatures.map((f, i) => (
                <FeatureRow key={f.id} f={f} y={ROW_Y[i]} x={LEFT_X[i]} side="left" delay={0.3 + i * 0.12} hoveredId={hoveredId} setHoveredId={setHoveredId} />
              ))}
              {rightFeatures.map((f, i) => (
                <FeatureRow key={f.id} f={f} y={ROW_Y[i]} x={RIGHT_X[i]} side="right" delay={0.3 + i * 0.12} hoveredId={hoveredId} setHoveredId={setHoveredId} />
              ))}

              <BottomBanner className="absolute left-[125px] top-[525px] w-[778px] h-[72px]" />
            </div>
          </ScaleBox>
        </div>

        {/* ======================= MOBILE / TABLET ======================= */}
        <div className="lg:hidden text-center">
          <div className="text-[11px] font-bold tracking-[0.22em] text-[#0f8a83] uppercase">{html($t("HireCorePhpHero__t16", "Core PHP Development"))}</div>
          <Heading className="mt-3 text-4xl sm:text-5xl leading-[1.08]" />
          <p className="text-body mt-4 mx-auto max-w-md text-slate-600">{subtitle}</p>

          <div className="relative mt-8 mx-auto w-[300px] sm:w-[380px] h-[260px] sm:h-[310px]">
            <div className="absolute inset-x-0 bottom-0">
              <Image src={$t("HireCorePhpHero__t17", "/core-php-base.webp")} alt={$t("HireCorePhpHero__t18", "Core PHP platform")} width={633} height={394} className="w-full h-auto" />
            </div>
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-[130px] sm:w-[165px] origin-bottom"
              initial={{ opacity: 0, y: 30, scale: 0.12 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={$t("HireCorePhpHero__t19", "/core-php-badge.webp")} alt={$t("HireCorePhpHero__t20", "Core PHP")} width={523} height={477} priority className="w-full h-auto drop-shadow-[0_14px_24px_rgba(14,116,144,0.4)]" />
            </motion.div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
            {[...leftFeatures, ...rightFeatures].map((f) => (
              <div key={f.id} className="flex items-center gap-3 rounded-2xl bg-white/90 border border-slate-100 shadow-sm p-3.5">
                <span className="w-11 h-11 rounded-full bg-white border border-slate-100 shadow flex items-center justify-center shrink-0">{f.icon}</span>
                <div>
                  <h3 className="text-[13.5px] font-bold text-[#0c1e3d] leading-tight">{f.title}</h3>
                  <p className="mt-0.5 text-[11.5px] text-slate-500 leading-snug">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <BottomBanner className="mt-8" />
        </div>
      </Container>
    </section>
  );
}
