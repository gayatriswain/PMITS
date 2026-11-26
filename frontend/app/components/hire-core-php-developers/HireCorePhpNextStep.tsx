"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";

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

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Icon = ({ children, className = "w-5 h-5" }: { children: React.ReactNode; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    {children}
  </svg>
);

interface Step {
  n: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  /* card position + number badge position in the 1100 x 700 canvas */
  x: number;
  y: number;
  w: number;
}

const steps__cms: Step[] = [
  {
    n: "01",
    title: "DISCOVER",
    desc: "We understand your requirements and goals.",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
    x: 717,
    y: 40,
    w: 188,
  },
  {
    n: "02",
    title: "MATCH",
    desc: "We assign the right Core PHP developer.",
    icon: (
      <>
        <path d="M16 20v-1.500a3.500 3.500 0 0 0-3.500-3.500h-5A3.500 3.500 0 0 0 4 18.500V20" />
        <circle cx="10" cy="8" r="3.500" />
        <path d="M20 20v-1.500a3.500 3.500 0 0 0-2.500-3.300M15 4.700a3.500 3.500 0 0 1 0 6.600" />
      </>
    ),
    x: 871,
    y: 162,
    w: 196,
  },
  {
    n: "03",
    title: "BUILD",
    desc: "We develop, test and refine with clarity.",
    icon: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6M14 4l-4 16" />,
    x: 840,
    y: 297,
    w: 200,
  },
  {
    n: "04",
    title: "GROW",
    desc: "We support and scale as you grow.",
    icon: <path d="M4 20V10M10 20V4M16 20v-8M22 20H2M5 7l5-4 5 6 6-5" />,
    x: 678,
    y: 404,
    w: 206,
  },
];

/* Curved connectors between the steps */
const FLOW = [
  "M 577 174 C 560 110, 610 66, 678 58",
  "M 858 136 L 856 160",
  "M 884 241 C 892 272, 862 290, 840 305",
  "M 836 352 C 782 352, 708 344, 668 400",
  "M 582 273 C 546 350, 562 440, 626 508",
];

const codeLines: { t: React.ReactNode; indent: number }[] = [
  { t: <span className="text-[#5eead4]">&lt;?php</span>, indent: 0 },
  { t: <><span className="text-[#c4b5fd]">class</span> <span className="text-white">ProManage {"{"}</span></>, indent: 0 },
  { t: <><span className="text-[#c4b5fd]">public function</span></>, indent: 1 },
  { t: <><span className="text-[#7dd3fc]">build</span><span className="text-white">($vision){"{"}</span></>, indent: 1 },
  { t: <><span className="text-[#c4b5fd]">return</span> <span className="text-[#5eead4]">success</span><span className="text-white">();</span></>, indent: 2 },
  { t: <span className="text-white">{"}"}</span>, indent: 1 },
  { t: <span className="text-white">{"}"}</span>, indent: 0 },
];

/* Layered glass code window: teal glass -> frosted glass -> dark glass editor -> glossy php tile.
   Layers sit on the left like a stack of slides, tilted together, and rise into place one after another. */
const LAYER_EASE = [0.22, 1, 0.36, 1] as const;

function CodeWindow({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ perspective: 1000 }}>
      <div className="relative" style={{ transform: "rotateY(-14deg) rotateZ(-2deg)" }}>
        {/* layer 1: teal glass, furthest left */}
        <motion.div
          className="absolute rounded-2xl border border-white/60 bg-[linear-gradient(150deg,rgba(94,234,212,0.7)_0%,rgba(103,212,236,0.5)_55%,rgba(125,211,252,0.35)_100%)] backdrop-blur-md shadow-[0_18px_32px_-14px_rgba(20,170,180,0.7),inset_0_1px_0_rgba(255,255,255,0.7),inset_0_0_18px_rgba(255,255,255,0.25)]"
          style={{ left: 0, top: 0, right: 0, bottom: 0 }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, x: -34, y: 18, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: LAYER_EASE }}
        />

        {/* layer 2: frosted white glass */}
        <motion.div
          className="absolute rounded-2xl border border-white/80 bg-[linear-gradient(150deg,rgba(255,255,255,0.75)_0%,rgba(207,236,252,0.5)_100%)] backdrop-blur-md shadow-[0_14px_26px_-14px_rgba(60,140,200,0.5),inset_0_1px_0_rgba(255,255,255,0.9)]"
          style={{ left: 0, top: 0, right: 0, bottom: 0 }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, x: -17, y: 9, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: LAYER_EASE }}
        />

        {/* layer 3: dark glass editor */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7, ease: LAYER_EASE }}
        >
          <motion.div
            className="relative rounded-2xl border border-sky-200/30 bg-[linear-gradient(145deg,rgba(14,42,76,0.96)_0%,rgba(9,28,54,0.97)_60%,rgba(12,44,76,0.96)_100%)] shadow-[0_28px_50px_-18px_rgba(7,22,43,0.85),inset_0_1px_0_rgba(255,255,255,0.18)] px-5 py-4 overflow-hidden"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            {/* glass sheen across the top-left */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(125deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_38%)]" />
            <div className="absolute left-0 inset-y-0 w-10 pointer-events-none bg-[linear-gradient(90deg,rgba(125,211,252,0.18),transparent)]" />
            <div className="relative flex gap-1.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-sky-300/60" />
              <span className="w-2 h-2 rounded-full bg-sky-300/40" />
              <span className="w-2 h-2 rounded-full bg-sky-300/25" />
            </div>
            <div className="relative font-mono text-[11.5px] leading-[1.75]">
              {codeLines.map((l, i) => (
                <motion.div
                  key={i}
                  style={{ paddingLeft: l.indent * 16 }}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.3 + i * 0.18 }}
                >
                  {l.t}
                  {i === codeLines.length - 1 && (
                    <motion.span className="inline-block w-[6px] h-[12px] ml-1 align-middle bg-sky-300" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* layer 4: glossy php tile, overlapping the bottom-right corner */}
        <motion.div
          className="absolute -right-8 -bottom-7"
          initial={{ opacity: 0, y: 26, scale: 0.6 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.div
            className="relative w-[84px] h-[74px] rounded-2xl border-2 border-white/80 bg-[linear-gradient(145deg,#7e8ef0,#4656c4)] shadow-[0_18px_28px_-10px_rgba(63,79,184,0.75),inset_0_1px_0_rgba(255,255,255,0.6)] flex items-center justify-center text-white text-[26px] font-black italic tracking-tight overflow-hidden"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
          >
            <span className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0))]" />
            <span className="relative">php</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function ExpertsCard({ className = "" }: { className?: string }) {
  const $t = useCmsText();
  return (
    <div className={`flex items-center gap-4 rounded-2xl bg-white/85 backdrop-blur border border-white shadow-[0_16px_34px_-18px_rgba(15,35,80,0.25)] px-5 py-4 ${className}`}>
      <span className="w-12 h-12 rounded-xl bg-[#eaf6f6] border border-white shadow-[inset_0_0_0_1px_rgba(13,148,136,0.15)] text-[#0f8a83] flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6">
          <path d="m16 18 6-6-6-6M8 6l-6 6 6 6M14 4l-4 16" />
        </Icon>
      </span>
      <div className="text-left">
        <div className="text-[14px] font-bold text-[#0c1e3d]">{$t("HireCorePhpNextStep__t1", "Core PHP Experts")}</div>
        <div className="mt-1 text-[11.5px] text-slate-500 leading-snug">
          {$t("HireCorePhpNextStep__t2", "Clean code. Scalable solutions.")}<br />
          {$t("HireCorePhpNextStep__t3", "On-time delivery.")}</div>
      </div>
    </div>
  );
}

function TalkBanner({ className = "" }: { className?: string }) {
  const $t = useCmsText();
  return (
    <motion.div
      className={`relative rounded-2xl bg-white border border-slate-100 shadow-[0_20px_44px_-20px_rgba(15,35,80,0.25)] overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[60%] bg-[linear-gradient(100deg,#07162b_0%,#0a2038_70%,#0c2845_100%)]"
        style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)" }}
      >
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-teal-500/15 blur-3xl" />
      </div>
      <div className="relative h-full flex flex-col lg:flex-row items-center lg:justify-between gap-5 px-6 sm:px-8 py-5 lg:py-0">
        <div className="flex items-center gap-4">
          <motion.span
            className="relative w-12 h-12 rounded-full border border-teal-300/40 bg-white/5 text-[#5eead4] flex items-center justify-center shrink-0"
            animate={{ boxShadow: ["0 0 0 0 rgba(45,212,191,0)", "0 0 18px 3px rgba(45,212,191,0.35)", "0 0 0 0 rgba(45,212,191,0)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="w-6 h-6">
              <path d="M21 12a8 8 0 0 1-11.500 7.200L4 21l1.800-5.500A8 8 0 1 1 21 12Z" />
              <path d="M9 11h.01M12.500 11h.01M16 11h.01" />
            </Icon>
          </motion.span>
          <div className="text-left text-[18px] font-semibold leading-snug text-white">
            {$t("HireCorePhpNextStep__t4", "Have a PHP project in mind?")}<br />
            <span className="text-[#3fd6cf] font-bold">{$t("HireCorePhpNextStep__t5", "Let's talk about it.")}</span>
          </div>
        </div>

        <Link
          href={$t("HireCorePhpNextStep__t6", "#contact")}
          className="group inline-flex items-center justify-center gap-3 h-[46px] px-9 rounded-lg bg-[linear-gradient(90deg,#0f8a99,#1aa6a6)] text-white text-[13.5px] font-semibold shadow-[0_12px_24px_-10px_rgba(26,166,166,0.8)] hover:brightness-110 transition whitespace-nowrap"
        >
          {$t("HireCorePhpNextStep__t7", "Let's Talk")}<svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: step.x, top: step.y, width: step.w }}
      initial={{ opacity: 0, x: 20, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.7 + index * 0.25 }}
    >
      <div className="rounded-2xl bg-white/95 backdrop-blur border border-white shadow-[0_18px_36px_-18px_rgba(15,35,80,0.28)] px-4 py-4 min-h-[80px] flex items-center gap-3.5">
        <span className="text-[#0f7f8f] shrink-0 [&_svg]:w-[32px] [&_svg]:h-[32px] [&_svg]:stroke-[1.5]">
          <Icon>{step.icon}</Icon>
        </span>
        <div className="text-left">
          <div className="text-[14px] font-extrabold tracking-[0.06em] text-[#0c1e3d] leading-none">{step.title}</div>
          <div className="mt-1.5 text-[11.5px] text-slate-500 leading-snug">{step.desc}</div>
        </div>
      </div>
      <motion.span
        className="absolute -left-[31px] -top-[2px] w-[34px] h-[34px] rounded-full bg-[linear-gradient(145deg,#12a1ad,#0b7d8c)] border-[3px] border-white text-white text-[12.5px] font-bold flex items-center justify-center"
        animate={{ boxShadow: ["0 10px 18px -6px rgba(11,125,140,0.5)", "0 0 0 7px rgba(45,212,191,0.18)", "0 10px 18px -6px rgba(11,125,140,0.5)"] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
      >
        {step.n}
      </motion.span>
    </motion.div>
  );
}

export default function HireCorePhpNextStep() {
  const $t = useCmsText();
  const steps = useCmsData("HireCorePhpNextStep__steps", steps__cms);
  const subtitle = (
    <>
      {$t("HireCorePhpNextStep__t8", "A clear process. Zero guesswork.")}<br />
      {$t("HireCorePhpNextStep__t9", "We turn your idea into a scalable PHP solution.")}</>
  );

  return (
    <section id="next-step" className="relative w-full overflow-hidden font-sans bg-[linear-gradient(180deg,#fbfdff_0%,#f3f8fc_55%,#eef4fa_100%)] pt-10 sm:pt-14 pb-12 sm:pb-16">
      <Container className="relative z-10 max-w-[1320px] w-full sm:px-10 lg:px-16">
        {/* ======================= DESKTOP: fixed 1100 x 710 canvas, scaled ======================= */}
        <div className="hidden lg:block">
          <ScaleBox width={1100} height={710}>
            <div className="relative w-[1100px] h-[710px]">
              {/* Header */}
              <motion.div
                className="absolute left-[77px] top-[30px] text-[12px] font-bold tracking-[0.24em] text-[#0f8a83] uppercase"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {$t("HireCorePhpNextStep__t10", "Your next step")}</motion.div>
              <motion.h2
                className="absolute left-[77px] top-[62px] text-[56px] font-black tracking-tight leading-[1.08] text-[#0c1e3d] whitespace-nowrap"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {$t("HireCorePhpNextStep__t11", "From First Call.")}<br />
                <span className="bg-gradient-to-r from-[#0f8a83] to-[#1aa6a6] bg-clip-text text-transparent">{$t("HireCorePhpNextStep__t12", "To First Commit.")}</span>
              </motion.h2>
              <motion.p
                className="absolute left-[77px] top-[216px] text-[15px] leading-[1.55] text-slate-600"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>

              <ExpertsCard className="absolute left-[77px] top-[300px] w-[300px]" />

              {/* soft sparkle dots near the code window */}
              {[
                [410, 360],
                [470, 395],
                [520, 345],
                [385, 470],
              ].map(([x, y], i) => (
                <motion.span
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-sky-300"
                  style={{ left: x, top: y }}
                  animate={{ opacity: [0.2, 1, 0.2], y: [0, -6, 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                />
              ))}

              <CodeWindow className="absolute left-[130px] top-[410px] w-[310px]" />

              {/* Flow lines */}
              <svg className="absolute inset-0 w-[1100px] h-[710px] pointer-events-none" viewBox="0 0 1100 710" fill="none">
                <defs>
                  <marker id="nextArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="13" markerHeight="13" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#12a1ad" />
                  </marker>
                </defs>
                {FLOW.map((d, i) => (
                  <g key={d}>
                    <motion.path
                      d={d}
                      stroke="#12a1ad"
                      strokeOpacity="0.8"
                      strokeWidth="1.6"
                      markerEnd={i === FLOW.length - 1 ? "url(#nextArrow)" : undefined}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.6 + i * 0.25, ease: "easeOut" }}
                    />
                    <circle r="3" fill="#14b8a6">
                      <animateMotion dur={`${3 + i * 0.4}s`} begin={`${2 + i * 0.3}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  </g>
                ))}
                <circle cx="577" cy="174" r="4" fill="#12a1ad" />
                <circle cx="582" cy="273" r="4" fill="#12a1ad" />
              </svg>

              {/* Requirement hub */}
              <motion.div
                className="absolute"
                style={{ left: 657 - 100, top: 220 - 100, width: 200, height: 200 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full border border-sky-200/80 bg-[radial-gradient(circle,rgba(226,243,252,0.8),rgba(255,255,255,0))]"
                  animate={{ scale: [1, 1.04, 1], opacity: [0.8, 0.4, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="absolute -inset-[14px] rounded-full border border-dashed border-sky-300/70" />
                <div className="absolute inset-[22px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#17406b,#0a2038_65%,#071a31)] border border-sky-300/40 shadow-[0_26px_44px_-14px_rgba(7,22,43,0.7)] flex flex-col items-center justify-center text-center">
                  <div className="text-[9.5px] font-bold tracking-[0.18em] text-sky-200/80">{$t("HireCorePhpNextStep__t13", "YOUR REQUIREMENT")}</div>
                  <span className="mt-2 w-11 h-11 rounded-full border border-sky-300/50 text-sky-100 flex items-center justify-center">
                    <Icon className="w-6 h-6">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
                    </Icon>
                  </span>
                  <div className="mt-2.5 text-[12px] font-semibold text-white leading-snug">
                    {$t("HireCorePhpNextStep__t14", "We start")}<br />
                    {$t("HireCorePhpNextStep__t15", "with your goals.")}</div>
                </div>
              </motion.div>

              {steps.map((s, i) => (
                <StepCard key={s.n} step={s} index={i} />
              ))}

              {/* Your product */}
              <div className="absolute left-[629px] top-[520px] -translate-x-1/2 flex flex-col items-center">
                <div className="relative w-[170px] h-[64px] flex items-center justify-center">
                  {[0, 1].map((i) => (
                    <motion.span
                      key={i}
                      className="absolute rounded-[50%] border border-sky-200/80"
                      style={{ inset: i * 8 }}
                      animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.97, 1.03, 0.97] }}
                      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    />
                  ))}
                  <div className="relative flex flex-col items-center">
                    <Icon className="w-5 h-5 text-[#0f8a83]">
                      <path d="M4.500 16.500c-1.500 1.260-2 5-2 5s3.740-.5 5-2c.710-.840.700-2.130-.090-2.910a2.180 2.180 0 0 0-2.910-.090z" />
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.950A12.880 12.880 0 0 1 22 2c0 2.720-.780 7.500-6 11a22.350 22.350 0 0 1-4 2z" />
                    </Icon>
                    <span className="mt-1 text-[10px] font-bold tracking-[0.18em] text-[#0f6f78]">{$t("HireCorePhpNextStep__t16", "YOUR PRODUCT")}</span>
                  </div>
                </div>
              </div>

              <TalkBanner className="absolute left-[77px] top-[600px] w-[960px] h-[84px]" />
            </div>
          </ScaleBox>
        </div>

        {/* ======================= MOBILE / TABLET ======================= */}
        <div className="lg:hidden">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#0f8a83] uppercase">{$t("HireCorePhpNextStep__t17", "Your next step")}</div>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.08] text-[#0c1e3d]">
            {$t("HireCorePhpNextStep__t18", "From First Call.")}<br />
            <span className="text-[#0f8a83]">{$t("HireCorePhpNextStep__t19", "To First Commit.")}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">{subtitle}</p>

          <ExpertsCard className="mt-6" />

          <div className="mt-8 mx-4">
            <CodeWindow className="w-full max-w-[300px] mx-auto" />
          </div>

          <div className="mt-10 mx-auto w-[190px] h-[190px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#17406b,#0a2038_65%,#071a31)] border border-sky-300/40 shadow-[0_26px_44px_-14px_rgba(7,22,43,0.7)] flex flex-col items-center justify-center text-center">
            <div className="text-[9.5px] font-bold tracking-[0.18em] text-sky-200/80">{$t("HireCorePhpNextStep__t20", "YOUR REQUIREMENT")}</div>
            <span className="mt-2 w-11 h-11 rounded-full border border-sky-300/50 text-sky-100 flex items-center justify-center">
              <Icon className="w-6 h-6">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
              </Icon>
            </span>
            <div className="mt-2.5 text-[12px] font-semibold text-white leading-snug">
              {$t("HireCorePhpNextStep__t21", "We start")}<br />
              {$t("HireCorePhpNextStep__t22", "with your goals.")}</div>
          </div>

          <div className="mt-8 space-y-4 max-w-md mx-auto">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-2xl bg-white/90 border border-white shadow-[0_14px_30px_-16px_rgba(15,35,80,0.25)] pl-16 pr-4 py-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[linear-gradient(145deg,#12a1ad,#0b7d8c)] text-white text-[13px] font-bold flex items-center justify-center">{s.n}</span>
                <div className="text-[12.5px] font-extrabold tracking-[0.1em] text-[#0c1e3d]">{s.title}</div>
                <div className="mt-1 text-[12px] text-slate-500 leading-snug">{s.desc}</div>
              </div>
            ))}
          </div>

          <TalkBanner className="mt-10" />
        </div>
      </Container>
    </section>
  );
}
