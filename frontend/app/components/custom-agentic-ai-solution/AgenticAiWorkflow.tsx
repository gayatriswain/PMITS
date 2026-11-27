"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

/* =========================================================================
   SCALE BOX: renders at fixed 1440 x 510 design size and scales seamlessly
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
      <div
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* =========================================================================
   ICONS & GRAPHICS
   ========================================================================= */

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function LightningIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function TrendIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <path d="M3 3v18h18" />
      <path d="M18.5 8.5L13.5 13.5L9.5 9.5L4.5 14.5" />
      <path d="M14 8.5h4.5V13" />
    </svg>
  );
}

function TargetIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

// 5 Left Input Icons
function CrmUserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0d9488]" {...strokeProps}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function EmailLetterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#8b5cf6]" {...strokeProps}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function DocFileIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0284c7]" {...strokeProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#a855f7]" {...strokeProps}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0d9488]" {...strokeProps}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

// 4 Right Cognitive Stage Icons
function BrainHeadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0d9488]" {...strokeProps}>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
    </svg>
  );
}

function ReasonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#8b5cf6]" {...strokeProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
    </svg>
  );
}

function ActIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#2563eb]" {...strokeProps}>
      <circle cx="12" cy="12" r="9" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
    </svg>
  );
}

function UpdateIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#10b981]" {...strokeProps}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function CheckmarkIcon({ className = "w-3 h-3 text-[#10b981]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* =========================================================================
   ANIMATED GROWTH CHART
   ========================================================================= */

function GrowthChart() {
  return (
    <div className="relative w-full h-[62px] mt-3">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 190 62" fill="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Gradient area */}
        <path
          d="M 5 48 C 30 48, 45 42, 70 32 C 95 22, 110 34, 138 20 C 155 12, 170 10, 180 6 L 180 58 L 5 58 Z"
          fill="url(#chartGrad)"
        />

        {/* Spline line */}
        <motion.path
          d="M 5 48 C 30 48, 45 42, 70 32 C 95 22, 110 34, 138 20 C 155 12, 170 10, 180 6"
          stroke="#0d9488"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />

        {/* Peak Dot */}
        <circle cx="180" cy="6" r="3.5" fill="#0f766e" />
        <circle cx="180" cy="6" r="7" fill="#14b8a6" opacity="0.3" className="animate-ping" />
      </svg>
    </div>
  );
}

const LEFT_LINES = [
  { sx: 580, sy: 43, color: "#10b981", d: "M 580 43 C 605 43, 590 163, 609 163" },
  { sx: 535, sy: 140, color: "#8b5cf6", d: "M 535 140 C 565 140, 565 194, 593 194" },
  { sx: 495, sy: 240, color: "#06b6d4", d: "M 495 240 L 585 240" },
  { sx: 535, sy: 339, color: "#a855f7", d: "M 535 339 C 565 339, 565 286, 593 286" },
  { sx: 580, sy: 437, color: "#10b981", d: "M 580 437 C 605 437, 590 317, 609 317" },
];

const RIGHT_LINES = [
  { ey: 70, color: "#0d9488", d: "M 895 240 C 925 240, 920 70, 950 70" },
  { ey: 165, color: "#8b5cf6", d: "M 895 240 C 925 240, 920 165, 950 165" },
  { ey: 275, color: "#2563eb", d: "M 895 240 C 925 240, 920 275, 950 275" },
  { ey: 385, color: "#10b981", d: "M 895 240 C 925 240, 920 385, 950 385" },
];

/* =========================================================================
   SEE IT IN ACTION: FROM REQUEST TO RESULT STRIP
   ========================================================================= */

function SmallIcon({ children, className = "w-3.5 h-3.5" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      {children}
    </svg>
  );
}

function DottedArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center shrink-0 w-10">
      <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
        <line x1="0" y1="6" x2="32" y2="6" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 3" strokeLinecap="round" />
        <polyline points="28,2 34,6 28,10" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function StepCard({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      className="flex-1 rounded-xl bg-white border border-slate-100 shadow-[0_8px_24px_-12px_rgba(15,35,80,0.14)] p-4"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="text-[10px] font-black tracking-wider text-[#0f4a5a] uppercase">{title}</div>
      {children}
    </motion.div>
  );
}

function RequestToResult() {
  const $t = useCmsText();
  const working = [
    { t: $t("AgenticAiWorkflow__t1", "Checks CRM"), icon: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></> },
    { t: $t("AgenticAiWorkflow__t2", "Finds latest proposal"), icon: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></> },
    { t: $t("AgenticAiWorkflow__t3", "Verifies customer details"), icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></> },
    { t: $t("AgenticAiWorkflow__t4", "Sends proposal"), icon: <><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" /></> },
  ];
  const actions = [$t("AgenticAiWorkflow__t5", "Email sent"), $t("AgenticAiWorkflow__t6", "CRM updated"), $t("AgenticAiWorkflow__t7", "Activity logged"), $t("AgenticAiWorkflow__t8", "Follow-up scheduled")];

  return (
    <motion.div
      className="mt-10 sm:mt-14 rounded-2xl bg-white/90 border border-slate-100 shadow-[0_15px_40px_-18px_rgba(15,35,80,0.16)] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Intro */}
      <div className="lg:w-[210px] shrink-0">
        <div className="text-[10px] font-black tracking-[0.16em] text-[#0d9488] uppercase">{html($t("AgenticAiWorkflow__t9", "See it in action"))}</div>
        <h3 className="text-h5 mt-2 font-black tracking-tight text-[#0b1f4a]">{html($t("AgenticAiWorkflow__t10", "From request to result."))}</h3>
        <p className="text-caption mt-2 text-slate-500">
          {rich($t("AgenticAiWorkflow__t11", "Your custom AI agent takes care of the entire process — so your team doesn't have to."))}</p>
      </div>

      {/* Flow */}
      <div className="flex-1 flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-0">
        {/* Customer asks */}
        <StepCard title={$t("AgenticAiWorkflow__t12", "Customer asks")} delay={0.05}>
          <div className="mt-3 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fde7d6] to-[#f7c9a8] flex items-end justify-center overflow-hidden shrink-0">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <circle cx="20" cy="16" r="7" fill="#7a4a2e" />
                <path d="M6 40c0-9 6-14 14-14s14 5 14 14z" fill="#0b1f4a" />
                <circle cx="20" cy="17" r="5.2" fill="#f2c6a0" />
                <path d="M14.5 15c1-5 10-6 11-0.5-3-1-7-1.5-11 .5z" fill="#4a2a18" />
              </svg>
            </span>
            <div className="relative rounded-xl rounded-tl-sm bg-[#eef4fb] px-3 py-2 text-[11px] leading-snug text-[#0b1f4a]">
              {html($t("AgenticAiWorkflow__t13", "“Can you send me the updated proposal?”"))}</div>
          </div>
        </StepCard>

        <DottedArrow />

        {/* AI agent working */}
        <StepCard title={$t("AgenticAiWorkflow__t14", "AI agent working")} delay={0.15}>
          <ul className="mt-3 space-y-2">
            {working.map((w, i) => (
              <motion.li
                key={w.t}
                className="flex items-center gap-2 text-[11px] font-medium text-slate-700"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.25, duration: 0.4 }}
              >
                <span className="text-[#0d9488]">
                  <SmallIcon>{w.icon}</SmallIcon>
                </span>
                {w.t}
              </motion.li>
            ))}
          </ul>
        </StepCard>

        <DottedArrow />

        {/* Actions taken */}
        <StepCard title={$t("AgenticAiWorkflow__t15", "Actions taken")} delay={0.25}>
          <ul className="mt-3 space-y-2">
            {actions.map((a, i) => (
              <motion.li
                key={a}
                className="flex items-center gap-2 text-[11px] font-medium text-slate-700"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0 + i * 0.25, duration: 0.4 }}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-50 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <CheckmarkIcon className="w-2.5 h-2.5 text-[#059669]" />
                </span>
                {a}
              </motion.li>
            ))}
          </ul>
        </StepCard>

        <DottedArrow />

        {/* Done */}
        <StepCard title={$t("AgenticAiWorkflow__t16", "Done.")} delay={0.35}>
          <div className="mt-3 flex flex-col items-center text-center">
            <motion.span
              className="w-10 h-10 rounded-full border-2 border-emerald-500 bg-emerald-50/60 flex items-center justify-center"
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2, type: "spring", stiffness: 260, damping: 14 }}
            >
              <CheckmarkIcon className="w-5 h-5 text-[#059669]" />
            </motion.span>
            <p className="mt-2 text-[11px] font-semibold leading-snug text-[#0b1f4a]">{rich($t("AgenticAiWorkflow__t17m", "Customer happy.<br>Team saves time.<br>Business moves forward."))}</p>
          </div>
        </StepCard>
      </div>
    </motion.div>
  );
}

/* =========================================================================
   MAIN COMPONENT
   ========================================================================= */

export default function AgenticAiWorkflow() {
  const $t = useCmsText();
  const inputCards = [
    { label: $t("AgenticAiWorkflow__t20", "CRM"), desc: $t("AgenticAiWorkflow__t21", "Lead & customer\ninformation"), icon: <CrmUserIcon />, bg: "#f0fbf6" },
    { label: $t("AgenticAiWorkflow__t22", "EMAIL"), desc: $t("AgenticAiWorkflow__t23", "Customer\ninquiries"), icon: <EmailLetterIcon />, bg: "#f7f3ff" },
    { label: $t("AgenticAiWorkflow__t24", "DOCUMENTS"), desc: $t("AgenticAiWorkflow__t25", "Proposals, invoices\n& contracts"), icon: <DocFileIcon />, bg: "#f0f9ff" },
    { label: $t("AgenticAiWorkflow__t26", "CALENDAR"), desc: $t("AgenticAiWorkflow__t27", "Meetings &\nfollow-ups"), icon: <CalendarIcon />, bg: "#fbf7ff" },
    { label: $t("AgenticAiWorkflow__t28", "DATA"), desc: $t("AgenticAiWorkflow__t29", "Business\ninformation"), icon: <DatabaseIcon />, bg: "#f0fbf6" },
  ];

  const processCards = [
    { label: $t("AgenticAiWorkflow__t30", "UNDERSTAND"), desc: $t("AgenticAiWorkflow__t31", "Reads and understands the request"), icon: <BrainHeadIcon />, bg: "#e6fbf9" },
    { label: $t("AgenticAiWorkflow__t32", "REASON"), desc: $t("AgenticAiWorkflow__t33", "Analyzes context and decides the best action"), icon: <ReasonIcon />, bg: "#f5efff" },
    { label: $t("AgenticAiWorkflow__t34", "ACT"), desc: $t("AgenticAiWorkflow__t35", "Performs the task across your systems"), icon: <ActIcon />, bg: "#eff6ff" },
    { label: $t("AgenticAiWorkflow__t36", "UPDATE"), desc: $t("AgenticAiWorkflow__t37", "Keeps everything in sync automatically"), icon: <UpdateIcon />, bg: "#ecfdf5" },
  ];

  return (
    <section id="agentic-workflow" className="relative w-full bg-gradient-to-b from-[#f8fbff] via-[#f5f9fe] to-[#edf5fd] py-16 sm:py-24 overflow-hidden font-sans border-t border-slate-100">
      {/* Background Soft Ambient Tech Waves matching reference image */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 960" fill="none" preserveAspectRatio="none">
        {/* Top-Mid Ambient Waves */}
        <path d="M-100 240 C 300 160, 600 360, 950 220 C 1200 120, 1380 260, 1540 180" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 4" opacity="0.35" />
        <path d="M-100 270 C 320 190, 620 390, 970 250 C 1220 150, 1400 290, 1540 210" stroke="#818cf8" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.25" />
        
        {/* Bottom Left Corner Waves */}
        <path d="M-40 680 C 60 700, 120 780, 80 880 C 60 930, 20 960, -20 980" stroke="#38bdf8" strokeWidth="1.2" opacity="0.4" />
        <path d="M-20 650 C 90 680, 160 770, 120 890 C 90 950, 40 980, 0 1000" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
        
        {/* Bottom Right Ambient Waves */}
        <path d="M 1250 820 C 1330 740, 1410 700, 1500 710" stroke="#38bdf8" strokeWidth="1.2" opacity="0.4" />
        <path d="M 1220 850 C 1310 770, 1400 730, 1500 740" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
      </svg>

      <Container className="relative z-10 max-w-[1640px]">
        {/* =========================================================================
            DESKTOP LAYOUT (1440 x 500 DESIGN CANVAS)
            Matching the exact spatial layout from the reference image:
            Left: Heading, Paragraph, 3 Stacked Value Cards
            Right: Standalone Architecture Diagram (Directly on canvas)
            ========================================================================= */}
        <div className="hidden lg:block w-full">
          <ScaleBox width={1440} height={500}>
            <div className="relative w-[1440px] h-[500px]">
              
              {/* ================= LEFT CONTENT COLUMN (x: 20 to 300) ================= */}
              <div className="absolute left-[20px] top-[15px] w-[285px]">
                {/* Heading */}
                <h2 className="text-h2 font-black tracking-tight text-[#0b1f4a]">{rich($t("AgenticAiWorkflow__t38m", "AI That Works<br><span class=\"text-[#2563eb]\">Your Way.</span>"))}</h2>

                {/* Subtitle */}
                <p className="text-caption mt-4 text-slate-600 pr-1">
                  {rich($t("AgenticAiWorkflow__t40", "Your business already has a way of working. We build intelligent agents that understand it, work within it, and take action where your team needs them most."))}</p>

                {/* 3 Value Propositions Stacked Vertically (Transparent list matching reference) */}
                <div className="mt-8 space-y-4">
                  {/* Save Time */}
                  <motion.div
                    className="flex items-start gap-3 cursor-pointer group"
                    whileHover={{ x: 3 }}
                  >
                    <div className="w-8.5 h-8.5 rounded-full bg-[#e6fbf9] text-[#0d9488] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                      <LightningIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#0b1f4a]">{html($t("AgenticAiWorkflow__t41", "Save Time"))}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{rich($t("AgenticAiWorkflow__t42", "Automate repetitive and manual tasks"))}</p>
                    </div>
                  </motion.div>

                  {/* Increase Efficiency */}
                  <motion.div
                    className="flex items-start gap-3 cursor-pointer group"
                    whileHover={{ x: 3 }}
                  >
                    <div className="w-8.5 h-8.5 rounded-full bg-[#f5efff] text-[#8b5cf6] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                      <TrendIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#0b1f4a]">{html($t("AgenticAiWorkflow__t43", "Increase Efficiency"))}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{rich($t("AgenticAiWorkflow__t44", "Streamline workflows and reduce delays"))}</p>
                    </div>
                  </motion.div>

                  {/* Focus on Growth */}
                  <motion.div
                    className="flex items-start gap-3 cursor-pointer group"
                    whileHover={{ x: 3 }}
                  >
                    <div className="w-8.5 h-8.5 rounded-full bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                      <TargetIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#0b1f4a]">{html($t("AgenticAiWorkflow__t45", "Focus on Growth"))}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{rich($t("AgenticAiWorkflow__t46", "Your team works on what truly matters"))}</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* ================= SVG CONNECTOR LINES LAYER ================= */}
              <svg className="absolute inset-0 w-[1440px] h-[500px] pointer-events-none z-0" viewBox="0 0 1440 500" fill="none">
                {/* Soft outer rings around the hub */}
                <circle cx="720" cy="240" r="165" stroke="#bae6fd" strokeWidth="1" opacity="0.7" />
                <circle cx="720" cy="240" r="195" stroke="#bae6fd" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />

                {/* Left connections: card edge -> hub edge */}
                {LEFT_LINES.map((l) => (
                  <g key={l.d}>
                    <path d={l.d} stroke={l.color} strokeWidth="1.3" opacity="0.8" />
                    <circle cx={l.sx} cy={l.sy} r="3.5" fill={l.color} />
                    <circle r="3" fill={l.color}>
                      <animateMotion dur={`${2.6 + l.sy / 300}s`} repeatCount="indefinite" path={l.d} />
                    </circle>
                  </g>
                ))}

                {/* Right stem + fork */}
                <path d="M 855 240 L 895 240" stroke="#0284c7" strokeWidth="1.5" />
                <circle cx="895" cy="240" r="4.5" fill="#0284c7" />
                {RIGHT_LINES.map((l) => (
                  <g key={l.d}>
                    <path d={l.d} stroke={l.color} strokeWidth="1.3" opacity="0.8" />
                    <circle cx="950" cy={l.ey} r="3.5" fill={l.color} />
                    <circle r="3" fill={l.color}>
                      <animateMotion dur={`${2.4 + l.ey / 400}s`} repeatCount="indefinite" path={l.d} />
                    </circle>
                  </g>
                ))}
              </svg>

              {/* ================= LEFT 5 INPUT CARDS (CRESCENT) ================= */}
              {inputCards.map((card, i) => {
                const lefts = [395, 350, 310, 350, 395];
                const tops = [10, 107, 207, 306, 404];
                return (
                  <motion.div
                    key={card.label}
                    className="absolute w-[185px] h-[66px] rounded-2xl bg-white border border-slate-100/90 shadow-[0_10px_28px_-8px_rgba(15,35,80,0.12),0_2px_6px_rgba(15,35,80,0.03)] flex items-center gap-3 px-3.5 z-10 hover:shadow-lg transition-all cursor-pointer"
                    style={{ left: lefts[i], top: tops[i] }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 [&_svg]:w-5 [&_svg]:h-5" style={{ backgroundColor: card.bg }}>
                      {card.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12px] font-black text-[#0b1f4a] tracking-wide uppercase leading-tight">{card.label}</div>
                      <div className="text-[9.5px] text-slate-500 leading-tight whitespace-pre-line mt-0.5">{card.desc}</div>
                    </div>
                  </motion.div>
                );
              })}

              {/* ================= CENTER HUB: CUSTOM AI AGENT ================= */}
              <div className="absolute left-[585px] top-[105px] w-[270px] h-[270px] rounded-full flex items-center justify-center z-10">
                <div className="absolute inset-0 -m-10 rounded-full bg-sky-200/40 blur-2xl pointer-events-none" />
                <motion.div
                  className="absolute inset-0 rounded-full border border-sky-200/70 pointer-events-none"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.8, 0.35, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="relative w-full h-full rounded-full bg-white border border-slate-100 shadow-[0_20px_50px_-12px_rgba(14,165,233,0.35)] flex flex-col items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative w-[96px] h-[108px] flex items-center justify-center">
                    <div className="absolute inset-0 bg-sky-400/40 blur-xl rounded-full" />
                    <svg viewBox="0 0 100 112" className="relative w-full h-full drop-shadow-[0_10px_18px_rgba(2,132,199,0.4)]">
                      <defs>
                        <linearGradient id="hexGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#67e8f9" />
                          <stop offset="45%" stopColor="#0ea5e9" />
                          <stop offset="100%" stopColor="#1d4ed8" />
                        </linearGradient>
                        <linearGradient id="hexInner" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <polygon points="50 4, 94 29, 94 83, 50 108, 6 83, 6 29" fill="url(#hexGrad)" stroke="url(#hexGrad)" strokeWidth="6" strokeLinejoin="round" />
                      <polygon points="50 14, 85 34, 85 78, 50 98, 15 78, 15 34" fill="url(#hexInner)" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1" />
                      <path d="M52 30 L55 40 L65 43 L55 46 L52 56 L49 46 L39 43 L49 40 Z" fill="#ffffff" />
                      <path d="M38 58c-6 2-8 8-4 12s11 3 14-1" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
                      <circle cx="34" cy="38" r="2" fill="#ffffff" opacity="0.9" />
                      <circle cx="68" cy="62" r="2" fill="#ffffff" opacity="0.9" />
                    </svg>
                  </div>
                  <div className="mt-3 text-[16px] font-black tracking-wider text-[#0b1f4a] uppercase">{html($t("AgenticAiWorkflow__t47", "CUSTOM AI AGENT"))}</div>
                  <div className="mt-0.5 text-[11.5px] font-medium text-slate-500">{rich($t("AgenticAiWorkflow__t48m", "Built by <span class=\"text-[#0284c7] font-bold\">ProManage</span>"))}</div>
                </motion.div>
              </div>

              {/* ================= RIGHT 4 COGNITIVE CARDS ================= */}
              {processCards.map((card, i) => {
                const tops = [37, 132, 242, 352];
                return (
                  <motion.div
                    key={card.label}
                    className="absolute left-[950px] w-[190px] h-[66px] rounded-2xl bg-white border border-slate-100 shadow-[0_10px_28px_-8px_rgba(15,35,80,0.12)] flex items-center gap-3 px-3.5 z-10 hover:shadow-md transition-shadow cursor-pointer"
                    style={{ top: tops[i] }}
                    whileHover={{ x: 2, scale: 1.02 }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-slate-100/60 [&_svg]:w-5 [&_svg]:h-5" style={{ backgroundColor: card.bg }}>
                      {card.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11.5px] font-extrabold text-[#0b1f4a] tracking-wide uppercase leading-tight">{card.label}</div>
                      <div className="text-[9.5px] text-slate-500 leading-snug mt-0.5">{card.desc}</div>
                    </div>
                  </motion.div>
                );
              })}

              {/* ================= FAR RIGHT: BUSINESS MOVES FORWARD CARD (x: 1150) ================= */}
              <motion.div
                className="absolute left-[1175px] top-[75px] w-[230px] h-[310px] rounded-2xl bg-white border border-slate-100 shadow-[0_15px_35px_-12px_rgba(15,35,80,0.12)] p-4 flex flex-col justify-between z-10"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header with Title and Green Checkmark Circle */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <span className="text-[10px] font-black tracking-wider text-[#0f4a5a] uppercase">
                    {html($t("AgenticAiWorkflow__t50", "BUSINESS MOVES FORWARD"))}</span>
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckmarkIcon className="w-3 h-3 text-[#10b981]" />
                  </span>
                </div>

                {/* 4 Checklist Bullets */}
                <div className="space-y-2 my-auto">
                  {[
                    $t("AgenticAiWorkflow__t51", "Work gets done on time"),
                    $t("AgenticAiWorkflow__t52", "Customers get faster responses"),
                    $t("AgenticAiWorkflow__t53", "Teams stay aligned"),
                    $t("AgenticAiWorkflow__t54", "Business keeps growing"),
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-2 text-[10px] font-medium text-slate-700">
                      <span className="w-3.5 h-3.5 rounded-full border border-emerald-500/30 bg-emerald-50 flex items-center justify-center shrink-0">
                        <CheckmarkIcon className="w-2.5 h-2.5 text-[#059669]" />
                      </span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                {/* Upward Line Growth Chart */}
                <GrowthChart />
              </motion.div>

            </div>
          </ScaleBox>
        </div>

        {/* =========================================================================
            MOBILE / TABLET ADAPTIVE LAYOUT
            ========================================================================= */}
        <div className="lg:hidden flex flex-col gap-6">
          {/* Header */}
          <div>
            <h2 className="text-h2 font-black tracking-tight text-[#0b1f4a]">{rich($t("AgenticAiWorkflow__t55m", "AI That Works <span class=\"bg-gradient-to-r from-[#1755a6] via-[#107ca3] to-[#4338ca] bg-clip-text text-transparent\">Your Way.</span>"))}</h2>
            <p className="text-small mt-3 text-slate-600">
              {rich($t("AgenticAiWorkflow__t57", "Your business already has a way of working. We build intelligent agents that understand it, work within it, and take action where your team needs them most."))}</p>
          </div>

          {/* 3 Value Cards in Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title: $t("AgenticAiWorkflow__t58", "Save Time"), sub: $t("AgenticAiWorkflow__t59", "Automate repetitive tasks"), icon: <LightningIcon />, bg: "#e6fbf9", text: "text-[#0d9488]" },
              { title: $t("AgenticAiWorkflow__t60", "Increase Efficiency"), sub: $t("AgenticAiWorkflow__t61", "Streamline workflows"), icon: <TrendIcon />, bg: "#f5efff", text: "text-[#8b5cf6]" },
              { title: $t("AgenticAiWorkflow__t62", "Focus on Growth"), sub: $t("AgenticAiWorkflow__t63", "Works on what matters"), icon: <TargetIcon />, bg: "#eff6ff", text: "text-[#2563eb]" },
            ].map((v) => (
              <div key={v.title} className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-100 shadow-xs">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${v.text}`} style={{ backgroundColor: v.bg }}>
                  {v.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0b1f4a]">{v.title}</div>
                  <div className="text-[10px] text-slate-500">{v.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Central AI Agent Card */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-sky-50/60 to-white border border-sky-200 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#06b6d4] via-[#0284c7] to-[#1e40af] flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                <path d="M12 2l2.4 6.6 6.6 2.4-6.6 2.4-2.4 6.6-2.4-6.6-6.6-2.4 6.6-2.4 2.4-6.6z" />
              </svg>
            </div>
            <div className="mt-3 text-sm font-black tracking-wide text-[#0b1f4a] uppercase">{html($t("AgenticAiWorkflow__t64", "CUSTOM AI AGENT"))}</div>
            <div className="text-xs text-slate-500">{rich($t("AgenticAiWorkflow__t65m", "Built by <span class=\"text-[#0284c7] font-semibold\">ProManage</span>"))}</div>
          </div>

          {/* Inputs Grid */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{html($t("AgenticAiWorkflow__t67", "Connected Inputs"))}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {inputCards.map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-100 shadow-xs">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: item.bg }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0b1f4a]">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cognitive Steps Grid */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{html($t("AgenticAiWorkflow__t68", "Execution Process"))}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {processCards.map((step) => (
                <div key={step.label} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-100 shadow-xs">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: step.bg }}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0b1f4a]">{step.label}</div>
                    <div className="text-[10px] text-slate-500">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Moves Forward Card */}
          <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black text-[#0f4a5a] uppercase">{html($t("AgenticAiWorkflow__t69", "BUSINESS MOVES FORWARD"))}</span>
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckmarkIcon className="w-3 h-3 text-[#10b981]" />
              </span>
            </div>
            <div className="mt-3 space-y-2">
              {[$t("AgenticAiWorkflow__t70", "Work gets done on time"), $t("AgenticAiWorkflow__t71", "Customers get faster responses"), $t("AgenticAiWorkflow__t72", "Teams stay aligned"), $t("AgenticAiWorkflow__t73", "Business keeps growing")].map((t) => (
                <div key={t} className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-50 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <CheckmarkIcon className="w-2 h-2 text-[#059669]" />
                  </span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <GrowthChart />
          </div>
        </div>

        <RequestToResult />
      </Container>
    </section>
  );
}
