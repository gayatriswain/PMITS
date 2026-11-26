"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

interface WhatYouGetItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const whatYouGet__cms: WhatYouGetItem[] = [
  {
    id: "goals",
    title: "Focus on Your Goals",
    desc: "We align with your business objectives, not just tasks.",
    icon: (
      // Target with Dart / Arrow in Center
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: "vetted",
    title: "Expertly Vetted Developers",
    desc: "Skilled Core PHP professionals with proven experience.",
    icon: (
      // Person with Star / Check
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="m16 11 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "collab",
    title: "Seamless Collaboration",
    desc: "Clear communication and full transparency at every step.",
    icon: (
      // Speech Bubble with Dots
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="8" cy="10" r="1" fill="#0d9488" />
        <circle cx="12" cy="10" r="1" fill="#0d9488" />
        <circle cx="16" cy="10" r="1" fill="#0d9488" />
      </svg>
    ),
  },
  {
    id: "scale",
    title: "Scalable & Flexible",
    desc: "Engage the best talent on your terms, and scale as you grow.",
    icon: (
      // Trending Chart with Arrow
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
        <path d="M2 11l6-6 4 4 10-10" />
      </svg>
    ),
  },
];

interface ArcPod {
  id: string;
  label: string;
  desc: string;
  position: string;
  icon: React.ReactNode;
}

const arcPods__cms: ArcPod[] = [
  {
    id: "skilled",
    label: "SKILLED",
    desc: "Experienced Core PHP developers who build clean, efficient and scalable solutions.",
    position: "top-left",
    icon: (
      // Code Window </>
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="3" />
        <line x1="2" y1="9" x2="22" y2="9" />
        <path d="m9 13-2 2 2 2" />
        <path d="m15 13 2 2-2 2" />
      </svg>
    ),
  },
  {
    id: "dedicated",
    label: "DEDICATED",
    desc: "Your project is our priority. We're with you, all the way.",
    position: "top-center",
    icon: (
      // Person with Star Badge
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <polygon points="12 2 13 4 15 4 13.5 5.5 14 7.5 12 6.5 10 7.5 10.5 5.5 9 4 11 4" fill="#0d9488" stroke="none" />
      </svg>
    ),
  },
  {
    id: "secure",
    label: "SECURE",
    desc: "Security-first approach to protect your data and your users.",
    position: "top-right",
    icon: (
      // Shield with Lock
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <rect x="9.5" y="10" width="5" height="4" rx="1" />
        <path d="M10.5 10V8.5a1.5 1.5 0 0 1 3 0V10" />
      </svg>
    ),
  },
  {
    id: "flexible",
    label: "FLEXIBLE",
    desc: "Engage on your terms and scale your team as your needs evolve.",
    position: "middle-left",
    icon: (
      // Sliders / Controls
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <circle cx="4" cy="12" r="2" />
        <circle cx="12" cy="10" r="2" />
        <circle cx="20" cy="14" r="2" />
      </svg>
    ),
  },
  {
    id: "reliable",
    label: "RELIABLE",
    desc: "Delivering quality code on time, every time. You can count on us.",
    position: "middle-right",
    icon: (
      // Handshake
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 15h2" />
        <path d="m7 11 5-5 5 5-5 5-5-5Z" />
        <path d="m2 9 5 5" />
        <path d="m22 9-5 5" />
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

/* Design space is 1180 x 720. The five pods sit on one circle concentric with the halo,
   far enough out that their text never reaches the developer photo. */
const DEV_X = 815;
const ARC = { cx: DEV_X, cy: 325, r: 285 };
const HALO = { cx: ARC.cx, cy: ARC.cy, d: 330 };
const POD_ANGLE: Record<string, number> = {
  flexible: 190,
  skilled: 140,
  dedicated: 90,
  secure: 40,
  reliable: -10,
};

function podPoint(id: string) {
  const a = (POD_ANGLE[id] * Math.PI) / 180;
  return { x: ARC.cx + ARC.r * Math.cos(a), y: ARC.cy - ARC.r * Math.sin(a) };
}

/* point on the pod circle at a given angle, used to start/stop lines at the icon edge */
function arcAt(deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: ARC.cx + ARC.r * Math.cos(a), y: ARC.cy - ARC.r * Math.sin(a) };
}

/* icon radius is 28, so step ~6 degrees off each icon along the circle */
const GAP = 6;
function arcPath(from: number, to: number) {
  const a = arcAt(from);
  const b = arcAt(to);
  return `M ${a.x} ${a.y} A ${ARC.r} ${ARC.r} 0 0 1 ${b.x} ${b.y}`;
}

const FLEX = podPoint("flexible");
const SKILL = podPoint("skilled");
const SECURE = podPoint("secure");
const RELIABLE = podPoint("reliable");

/* top arcs follow the circle; side lines bow outwards so they pass beside the pod text, never through it */
const POD_PATHS = [
  arcPath(POD_ANGLE.skilled - GAP, POD_ANGLE.dedicated + GAP),
  arcPath(POD_ANGLE.dedicated - GAP, POD_ANGLE.secure + GAP),
  `M ${SKILL.x - 26} ${SKILL.y + 14} C ${SKILL.x - 120} ${SKILL.y + 40}, ${FLEX.x - 80} ${FLEX.y - 95}, ${FLEX.x} ${FLEX.y - 30}`,
  `M ${SECURE.x + 26} ${SECURE.y + 14} C ${SECURE.x + 120} ${SECURE.y + 40}, ${RELIABLE.x + 80} ${RELIABLE.y - 95}, ${RELIABLE.x} ${RELIABLE.y - 30}`,
];

function ArcPodView({ pod, index, hovered, setHovered }: { pod: ArcPod; index: number; hovered: string | null; setHovered: (id: string | null) => void }) {
  const { x, y } = podPoint(pod.id);
  const active = hovered === pod.id;
  return (
    <motion.div
      className="absolute flex flex-col items-center text-center cursor-pointer"
      style={{ left: x - 70, top: y - 28, width: 140 }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(pod.id)}
      onMouseLeave={() => setHovered(null)}
    >
      <motion.span
        className={`w-[56px] h-[56px] rounded-full bg-white border flex items-center justify-center transition-all [&_svg]:w-6 [&_svg]:h-6 ${
          active
            ? "border-teal-300 shadow-[0_16px_28px_-8px_rgba(13,148,136,0.4)] ring-4 ring-teal-100/70"
            : "border-white shadow-[0_12px_26px_-8px_rgba(15,35,80,0.25),inset_0_0_0_3px_rgba(224,242,254,0.8)]"
        }`}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.8 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
      >
        {pod.icon}
      </motion.span>
      <div className={`mt-2.5 text-[12px] font-extrabold tracking-[0.12em] transition-colors ${active ? "text-[#0d9488]" : "text-[#0c1e3d]"}`}>{pod.label}</div>
      <p className="mt-1 text-[10.5px] leading-snug text-slate-500">{pod.desc}</p>
    </motion.div>
  );
}

function WhatYouGetCard({ className = "" }: { className?: string }) {
  const $t = useCmsText();
  const whatYouGet = useCmsData("HireCorePhpWhyHireFromUs__whatYouGet", whatYouGet__cms);
  return (
    <div className={`rounded-2xl bg-white/90 backdrop-blur border border-white shadow-[0_22px_46px_-22px_rgba(15,35,80,0.28)] p-5 ${className}`}>
      <h3 className="text-[16px] font-bold text-[#0c1e3d]">
        {$t("HireCorePhpWhyHireFromUs__t1", "What ")}<span className="text-[#0f8a83]">{$t("HireCorePhpWhyHireFromUs__t2", "You Get")}</span>
      </h3>
      <div className="mt-3 divide-y divide-slate-100">
        {whatYouGet.map((item, i) => (
          <motion.div
            key={item.id}
            className="flex items-start gap-3 py-3 first:pt-1 last:pb-0"
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.12 }}
          >
            <span className="w-9 h-9 rounded-full bg-[#e8f6f4] flex items-center justify-center shrink-0">{item.icon}</span>
            <div>
              <div className="text-[12.5px] font-bold text-[#0c1e3d] leading-tight">{item.title}</div>
              <div className="mt-1 text-[10.5px] text-slate-500 leading-snug">{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CtaBanner({ className = "" }: { className?: string }) {
  const $t = useCmsText();
  return (
    <motion.div
      className={`relative rounded-2xl bg-white border border-slate-100 shadow-[0_24px_50px_-22px_rgba(7,22,43,0.55)] overflow-hidden flex flex-col lg:flex-row ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* left half: dark blue, slanted edge */}
      <div className="relative lg:w-[64%] bg-[linear-gradient(100deg,#07162b_0%,#0a2038_65%,#0c2845_100%)] lg:[clip-path:polygon(0_0,100%_0,95.5%_100%,0_100%)] px-6 sm:px-8 py-5 lg:py-0 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />

        <div className="relative flex items-center gap-4 shrink-0">
          <motion.span
            className="w-[52px] h-[52px] rounded-full border border-sky-300/30 bg-white/5 text-[#2dd4bf] flex items-center justify-center shrink-0"
            animate={{ boxShadow: ["0 0 10px rgba(45,212,191,0.2)", "0 0 22px rgba(45,212,191,0.5)", "0 0 10px rgba(45,212,191,0.2)"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            </svg>
          </motion.span>
          <div className="text-left text-[17px] font-bold leading-snug text-white">
            {$t("HireCorePhpWhyHireFromUs__t3", "Built around your business.")}<br />
            <span className="text-[#2fc6d3]">{$t("HireCorePhpWhyHireFromUs__t4", "Designed for real impact.")}</span>
          </div>
        </div>

        <p className="relative text-left text-[11.5px] leading-relaxed text-slate-200/85 lg:border-l lg:border-white/20 lg:pl-6 max-w-[300px]">
          {rich($t("HireCorePhpWhyHireFromUs__t5", "Hire dedicated Core PHP developers and turn your ideas into powerful, scalable real-world solutions."))}</p>
      </div>

      {/* right half: white */}
      <div className="flex-1 flex items-center justify-center gap-5 px-6 py-5 lg:py-0">
        <Link
          href={$t("HireCorePhpWhyHireFromUs__t6", "#contact")}
          className="group inline-flex items-center justify-center gap-3 h-[46px] px-8 rounded-lg bg-[linear-gradient(90deg,#0f8a99,#1aa6a6)] text-white text-[13px] font-semibold shadow-[0_12px_24px_-10px_rgba(26,166,166,0.8)] hover:brightness-110 transition whitespace-nowrap"
        >
          {$t("HireCorePhpWhyHireFromUs__t7", "Hire Core PHP Developers")}<svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
        <Link href={$t("HireCorePhpWhyHireFromUs__t8", "#contact")} aria-label="Chat with us" className="w-[46px] h-[46px] rounded-full bg-white text-[#0c1e3d] flex items-center justify-center shadow-[0_10px_22px_-8px_rgba(15,35,80,0.35)] border border-slate-100 hover:scale-105 transition-transform shrink-0">
          <svg viewBox="0 0 24 24" className="w-[19px] h-[19px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12Z" />
            <path d="M9 11h.01M12.5 11h.01M16 11h.01" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

export default function HireCorePhpWhyHireFromUs() {
  const $t = useCmsText();
  const arcPods = useCmsData("HireCorePhpWhyHireFromUs__arcPods", arcPods__cms);
  const [hoveredPod, setHoveredPod] = useState<string | null>(null);
  const subtitle = "Dedicated Core PHP expertise, aligned with your goals and focused on results.";

  return (
    <section id="why-hire-from-us" className="relative w-full overflow-hidden font-sans bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_60%,#eff4fa_100%)] pt-10 sm:pt-14 pb-12 sm:pb-16">
      <Container className="relative z-10 max-w-[1320px] w-full">
        {/* ======================= DESKTOP: fixed 1180 x 720 canvas, scaled ======================= */}
        <div className="hidden lg:block">
          <ScaleBox width={1180} height={720}>
            <div className="relative w-[1180px] h-[720px]">
              {/* Header */}
              <motion.div
                className="absolute left-[30px] top-[20px] text-[12px] font-bold tracking-[0.24em] text-[#0f8a83] uppercase"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {$t("HireCorePhpWhyHireFromUs__t9", "Why hire from us —")}</motion.div>
              <motion.h2
                className="absolute left-[30px] top-[50px] text-[46px] font-black tracking-tight leading-[1.1] text-[#0c1e3d]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {$t("HireCorePhpWhyHireFromUs__t10", "The Right Developer.")}<br />
                <span className="bg-gradient-to-r from-[#0f8a83] to-[#1aa6a6] bg-clip-text text-transparent">{$t("HireCorePhpWhyHireFromUs__t11", "The Right Impact.")}</span>
              </motion.h2>
              <motion.p
                className="absolute left-[30px] top-[176px] w-[330px] text-[14px] leading-[1.55] text-slate-600"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
              <motion.div
                className="absolute left-[30px] top-[246px] h-[3px] rounded-full bg-[#0f8a83]"
                initial={{ width: 0 }}
                animate={{ width: 44 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />

              <WhatYouGetCard className="absolute left-[30px] top-[282px] w-[330px]" />

              {/* Halo + ripples behind the developer */}
              <motion.div
                className="absolute rounded-full bg-[radial-gradient(circle,rgba(214,236,252,0.95)_0%,rgba(200,226,248,0.8)_62%,rgba(176,212,240,0.45)_100%)] border border-white/70"
                style={{ left: HALO.cx - HALO.d / 2, top: HALO.cy - HALO.d / 2, width: HALO.d, height: HALO.d }}
                animate={{ scale: [1, 1.025, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute rounded-full border border-sky-100" style={{ left: HALO.cx - HALO.d / 2 - 26, top: HALO.cy - HALO.d / 2 - 26, width: HALO.d + 52, height: HALO.d + 52 }} />
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-[50%] border border-sky-200/70"
                  style={{ left: DEV_X - (130 + i * 75), top: 545 - (22 + i * 11), width: (130 + i * 75) * 2, height: (22 + i * 11) * 2 }}
                  animate={{ opacity: [0.35, 0.9, 0.35], scale: [0.98, 1.03, 0.98] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                />
              ))}

              {/* Connectors between the pods */}
              <svg className="absolute inset-0 w-[1180px] h-[720px] pointer-events-none" viewBox="0 0 1180 720" fill="none">
                {POD_PATHS.map((d, i) => (
                  <g key={d}>
                    <motion.path
                      d={d}
                      stroke="#5fc7cf"
                      strokeOpacity="0.75"
                      strokeWidth="1.2"
                      strokeDasharray="3 5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                    />
                    <circle r="3" fill="#14b8a6">
                      <animateMotion dur={`${3.4 + i * 0.4}s`} begin={`${1.6 + i * 0.2}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  </g>
                ))}
              </svg>

              {/* Developer */}
              <motion.div
                className="absolute"
                style={{ left: DEV_X - 195, top: 150, width: 390 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Image src={$t("HireCorePhpWhyHireFromUs__t12", "/core-php3.png")} alt={$t("HireCorePhpWhyHireFromUs__t13", "Core PHP developer")} width={435} height={432} priority className="w-full h-auto select-none drop-shadow-[0_20px_30px_rgba(15,35,80,0.12)]" />
              </motion.div>

              {arcPods.map((pod, i) => (
                <ArcPodView key={pod.id} pod={pod} index={i} hovered={hoveredPod} setHovered={setHoveredPod} />
              ))}

              <CtaBanner className="absolute left-[30px] top-[620px] w-[1120px] h-[78px]" />
            </div>
          </ScaleBox>
        </div>

        {/* ======================= MOBILE / TABLET ======================= */}
        <div className="lg:hidden">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#0f8a83] uppercase">{$t("HireCorePhpWhyHireFromUs__t14", "Why hire from us —")}</div>
          <h2 className="text-h2 mt-3 font-black tracking-tight text-[#0c1e3d]">
            {$t("HireCorePhpWhyHireFromUs__t15", "The Right Developer.")}<br />
            <span className="text-[#0f8a83]">{$t("HireCorePhpWhyHireFromUs__t16", "The Right Impact.")}</span>
          </h2>
          <p className="text-body mt-4 text-slate-600 max-w-md">{subtitle}</p>
          <div className="mt-5 w-11 h-[3px] rounded-full bg-[#0f8a83]" />

          <div className="relative mt-8 mx-auto max-w-[360px]">
            <div className="absolute inset-0 rounded-full bg-sky-100/70 blur-2xl" />
            <Image src={$t("HireCorePhpWhyHireFromUs__t17", "/core-php3.png")} alt={$t("HireCorePhpWhyHireFromUs__t18", "Core PHP developer")} width={435} height={432} className="relative w-full h-auto" />
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {arcPods.map((pod) => (
              <div key={pod.id} className="flex items-start gap-3 rounded-2xl bg-white/90 border border-white shadow-[0_14px_30px_-16px_rgba(15,35,80,0.2)] p-3.5">
                <span className="w-11 h-11 rounded-full bg-[#e8f6f4] flex items-center justify-center shrink-0">{pod.icon}</span>
                <div>
                  <div className="text-[12px] font-extrabold tracking-[0.12em] text-[#0c1e3d]">{pod.label}</div>
                  <p className="mt-1 text-[11.5px] text-slate-500 leading-snug">{pod.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <WhatYouGetCard className="mt-6" />
          <CtaBanner className="mt-6" />
        </div>
      </Container>
    </section>
  );
}
