"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";

interface OrbitFeature {
  id: string;
  title: string;
  desc: string;
  position: string;
  icon: React.ReactNode;
}

const features__cms: OrbitFeature[] = [
  {
    id: "secure",
    title: "Secure & Reliable",
    desc: "Security-first approach to protect your data and users.",
    position: "top",
    icon: (
      // Shield with Checkmark
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: "performance",
    title: "Performance Driven",
    desc: "Optimized code and architecture for speed and efficiency.",
    position: "top-right",
    icon: (
      // Rocket
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5" />
        <path d="M15 15v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5" />
      </svg>
    ),
  },
  {
    id: "support",
    title: "Long-Term Support",
    desc: "Ongoing maintenance and support to keep your application ahead.",
    position: "bottom-right",
    icon: (
      // Gear / Cog
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    id: "client-focused",
    title: "Client Focused",
    desc: "Transparent communication and a partnership you can trust.",
    position: "bottom-left",
    icon: (
      // Three People / Team
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "expertise",
    title: "Proven Expertise",
    desc: "Deep Core PHP experience delivering robust and scalable solutions.",
    position: "top-left",
    icon: (
      // Award Ribbon Badge with Star
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        <polygon points="12 5 13 7.5 15.5 7.5 13.5 9 14.5 11.5 12 10 9.5 11.5 10.5 9 8.5 7.5 11 7.5 12 5" fill="#0d9488" stroke="none" />
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

/* Design space is 1100 x 720. The five cards sit around the hub in a pentagon. */
const HUB = { x: 785, y: 291 };
const CARD = { w: 172, h: 150 };
const CARD_POS: Record<string, { x: number; y: number }> = {
  secure: { x: 700, y: 36 },
  performance: { x: 911, y: 216 },
  support: { x: 786, y: 396 },
  "client-focused": { x: 582, y: 396 },
  expertise: { x: 493, y: 216 },
};
const ORBIT_R = 185;
/* small nodes on the orbit between the cards, in degrees */
const ORBIT_NODES = [128, 52, 188, -8, 270];

function orbitPoint(deg: number, r = ORBIT_R) {
  const a = (deg * Math.PI) / 180;
  return { x: HUB.x + r * Math.cos(a), y: HUB.y - r * Math.sin(a) };
}

function OrbitCard({ f, index, hovered, setHovered }: { f: OrbitFeature; index: number; hovered: string | null; setHovered: (id: string | null) => void }) {
  const pos = CARD_POS[f.id];
  const active = hovered === f.id;
  return (
    <motion.div
      className={`absolute rounded-2xl border backdrop-blur flex flex-col items-center text-center px-4 pt-5 cursor-pointer transition-all ${
        active ? "bg-white border-teal-200 shadow-[0_24px_44px_-16px_rgba(13,148,136,0.4)]" : "bg-white/90 border-white shadow-[0_20px_40px_-20px_rgba(15,35,80,0.3)]"
      }`}
      style={{ left: pos.x, top: pos.y, width: CARD.w, height: CARD.h }}
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(f.id)}
      onMouseLeave={() => setHovered(null)}
    >
      <motion.span
        className="text-[#0f7f8f] [&_svg]:w-[38px] [&_svg]:h-[38px]"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3.6 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
      >
        {f.icon}
      </motion.span>
      <h3 className={`mt-3 text-[13px] font-bold leading-tight transition-colors ${active ? "text-[#0d9488]" : "text-[#0c1e3d]"}`}>{f.title}</h3>
      <p className="mt-2 text-[10.5px] text-slate-500 leading-snug">{f.desc}</p>
    </motion.div>
  );
}

function PartnerBanner({ className = "" }: { className?: string }) {
  const $t = useCmsText();
  return (
    <motion.div
      className={`relative rounded-2xl bg-[linear-gradient(100deg,#07162b_0%,#0a2038_60%,#08192f_100%)] shadow-[0_24px_50px_-20px_rgba(7,22,43,0.8)] border border-white/5 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
      <div className="relative h-full flex flex-col lg:flex-row items-center gap-5 lg:gap-7 px-6 sm:px-8 py-5 lg:py-0">
        <div className="flex items-center gap-4 lg:flex-1">
          <motion.span
            className="w-11 h-11 rounded-full border border-teal-300/40 bg-white/5 text-[#2dd4bf] flex items-center justify-center shrink-0"
            animate={{ boxShadow: ["0 0 8px rgba(45,212,191,0.2)", "0 0 20px rgba(45,212,191,0.5)", "0 0 8px rgba(45,212,191,0.2)"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </motion.span>
          <div className="text-left text-[17px] font-semibold leading-snug text-white">
            {$t("HireCorePhpWhyChooseUs__t1", "The Right Partner for Your")}<br />
            <span className="text-[#3fd6cf]">{$t("HireCorePhpWhyChooseUs__t2", "Core PHP Projects.")}</span>
          </div>
        </div>

        <span className="hidden lg:block w-px h-12 bg-white/15" />

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link
            href={$t("HireCorePhpWhyChooseUs__t3", "#contact")}
            className="group inline-flex items-center justify-center gap-2.5 h-[46px] px-7 rounded-lg bg-[linear-gradient(90deg,#0f8a99,#1aa6a6)] text-white text-[13px] font-semibold shadow-[0_12px_24px_-10px_rgba(26,166,166,0.8)] hover:brightness-110 transition whitespace-nowrap"
          >
            {$t("HireCorePhpWhyChooseUs__t4", "Hire Core PHP Developers")}<svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link
            href={$t("HireCorePhpWhyChooseUs__t5", "#contact")}
            className="inline-flex items-center justify-center gap-2.5 h-[46px] px-6 rounded-lg border border-white/30 text-white text-[13px] font-medium hover:bg-white/10 transition whitespace-nowrap"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12Z" />
              <path d="M9 11h.01M12.5 11h.01M16 11h.01" />
            </svg>
            {$t("HireCorePhpWhyChooseUs__t6", "Talk to an Expert")}</Link>
        </div>
      </div>
    </motion.div>
  );
}

function HubCircle({ className = "" }: { className?: string }) {
  const $t = useCmsText();
  return (
    <div className={`rounded-full bg-white border border-slate-100 shadow-[0_26px_50px_-18px_rgba(15,35,80,0.35)] flex flex-col items-center justify-center text-center ${className}`}>
      <span className="w-9 h-[2px] rounded-full bg-[#0f8a83]" />
      <div className="mt-2.5 text-[15px] font-extrabold tracking-wide text-[#0c1e3d] leading-none">{$t("HireCorePhpWhyChooseUs__t7", "CORE PHP")}</div>
      <div className="mt-1.5 text-[15px] font-extrabold tracking-wide text-[#0f8a83] leading-none">{$t("HireCorePhpWhyChooseUs__t8", "EXCELLENCE")}</div>
      <svg viewBox="0 0 24 24" className="mt-2.5 w-6 h-6 text-[#0f8a83]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    </div>
  );
}

export default function HireCorePhpWhyChooseUs() {
  const $t = useCmsText();
  const features = useCmsData("HireCorePhpWhyChooseUs__features", features__cms);
  const [hovered, setHovered] = useState<string | null>(null);
  const subtitle = "We combine deep Core PHP expertise with a commitment to quality, security and long-term success.";

  return (
    <section id="why-choose-us" className="relative w-full overflow-hidden font-sans bg-[linear-gradient(180deg,#fbfdff_0%,#f4f8fc_55%,#eff4fa_100%)] pt-10 sm:pt-14 pb-12 sm:pb-16">
      <Container className="relative z-10 max-w-[1320px] w-full">
        {/* ======================= DESKTOP: fixed 1100 x 720 canvas, scaled ======================= */}
        <div className="hidden lg:block">
          <ScaleBox width={1100} height={720}>
            <div className="relative w-[1100px] h-[720px]">
              {/* Header */}
              <motion.div
                className="absolute left-[47px] top-[40px] text-[12px] font-bold tracking-[0.22em] text-[#0f8a83] uppercase"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {$t("HireCorePhpWhyChooseUs__t9", "Why businesses choose us")}</motion.div>
              <motion.h2
                className="absolute left-[47px] top-[80px] text-[44px] font-black tracking-tight leading-[1.12] text-[#0c1e3d] whitespace-nowrap"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {$t("HireCorePhpWhyChooseUs__t10", "Experience That")}<br />
                <span className="bg-gradient-to-r from-[#0f8a83] to-[#1aa6a6] bg-clip-text text-transparent">{$t("HireCorePhpWhyChooseUs__t11", "Delivers Confidence.")}</span>
              </motion.h2>
              <motion.p
                className="absolute left-[47px] top-[200px] w-[400px] text-[14.5px] leading-[1.55] text-slate-600"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
              <motion.div
                className="absolute left-[47px] top-[262px] h-[3px] rounded-full bg-[#0f8a83]"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />

              {/* Developer photo, fading into the page on its left, top and bottom edges */}
              <motion.div
                className="absolute left-0 top-[290px] w-[560px]"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Image
                  src={$t("HireCorePhpWhyChooseUs__t12", "/core-php3.webp")}
                  alt={$t("HireCorePhpWhyChooseUs__t13", "Expert PHP developer delivering confidence")}
                  width={1237}
                  height={693}
                  priority
                  className="w-full h-auto select-none mix-blend-multiply"
                  style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 18%, black 86%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 18%, black 86%, transparent 100%)",
                    maskComposite: "intersect",
                    WebkitMaskComposite: "source-in",
                  }}
                />
              </motion.div>

              {/* Orbit ring, nodes and light travelling along it */}
              <svg className="absolute inset-0 w-[1100px] h-[720px] pointer-events-none" viewBox="0 0 1100 720" fill="none">
                <defs>
                  <path id="chooseOrbit" d={`M ${HUB.x - ORBIT_R} ${HUB.y} a ${ORBIT_R} ${ORBIT_R} 0 1 1 ${ORBIT_R * 2} 0 a ${ORBIT_R} ${ORBIT_R} 0 1 1 -${ORBIT_R * 2} 0`} />
                </defs>
                <motion.circle
                  cx={HUB.x}
                  cy={HUB.y}
                  r={ORBIT_R}
                  stroke="#9fdde3"
                  strokeOpacity="0.8"
                  strokeWidth="1.2"
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
                />
                <circle cx={HUB.x} cy={HUB.y} r="86" stroke="#cfeaf3" strokeWidth="1" />
                {ORBIT_NODES.map((deg) => {
                  const p = orbitPoint(deg);
                  return (
                    <g key={deg}>
                      <circle cx={p.x} cy={p.y} r="6" fill="#2dd4bf" opacity="0.25" />
                      <circle cx={p.x} cy={p.y} r="3" fill="#14a3a0" />
                    </g>
                  );
                })}
                <circle r="3.2" fill="#14b8a6">
                  <animateMotion dur="14s" repeatCount="indefinite">
                    <mpath href="#chooseOrbit" />
                  </animateMotion>
                </circle>
              </svg>

              {/* Hub */}
              <motion.div
                className="absolute"
                style={{ left: HUB.x - 70, top: HUB.y - 70, width: 140, height: 140 }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <motion.span
                  className="absolute -inset-[7px] rounded-full border border-sky-200/80"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.8, 0.35, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <HubCircle className="w-full h-full" />
              </motion.div>

              {features.map((f, i) => (
                <OrbitCard key={f.id} f={f} index={i} hovered={hovered} setHovered={setHovered} />
              ))}

              <PartnerBanner className="absolute left-[63px] top-[596px] w-[980px] h-[92px]" />
            </div>
          </ScaleBox>
        </div>

        {/* ======================= MOBILE / TABLET ======================= */}
        <div className="lg:hidden">
          <div className="text-[11.5px] font-bold tracking-[0.22em] text-[#0f8a83] uppercase">{$t("HireCorePhpWhyChooseUs__t14", "Why businesses choose us")}</div>
          <h2 className="text-h2 mt-3 font-black tracking-tight text-[#0c1e3d]">
            {$t("HireCorePhpWhyChooseUs__t15", "Experience That")}<br />
            <span className="text-[#0f8a83]">{$t("HireCorePhpWhyChooseUs__t16", "Delivers Confidence.")}</span>
          </h2>
          <p className="text-body mt-4 text-slate-600 max-w-md">{subtitle}</p>
          <div className="mt-5 w-10 h-[3px] rounded-full bg-[#0f8a83]" />

          <div className="mt-8 -mx-2">
            <Image
              src={$t("HireCorePhpWhyChooseUs__t17", "/core-php3.webp")}
              alt={$t("HireCorePhpWhyChooseUs__t18", "Expert PHP developer delivering confidence")}
              width={1237}
              height={693}
              className="w-full h-auto mix-blend-multiply"
              style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}
            />
          </div>

          <HubCircle className="mt-8 mx-auto w-[180px] h-[180px]" />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.id} className="rounded-2xl bg-white/90 border border-white shadow-[0_18px_36px_-20px_rgba(15,35,80,0.3)] p-5 text-center flex flex-col items-center">
                <span className="text-[#0f7f8f] [&_svg]:w-9 [&_svg]:h-9">{f.icon}</span>
                <h3 className="mt-3 text-[14px] font-bold text-[#0c1e3d]">{f.title}</h3>
                <p className="text-caption mt-1.5 text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>

          <PartnerBanner className="mt-8" />
        </div>
      </Container>
    </section>
  );
}
