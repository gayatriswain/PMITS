"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../shared/Container";

/* =========================================================================
   VECTOR LOGOS FOR "WORKS ACROSS YOUR CONNECTED SYSTEMS"
   ========================================================================= */

function SalesforceLogo() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
      <path
        d="M10.1 5.3a5.2 5.2 0 0 1 4.5 2.6 4.7 4.7 0 0 1 3.5 0 4.1 4.1 0 0 1 3 4 4.3 4.3 0 0 1-1.3 3.1 5.2 5.2 0 0 1-3.6 1.3H6.9a4.8 4.8 0 0 1-3.4-1.4A4.6 4.6 0 0 1 2.2 11a4.8 4.8 0 0 1 3.1-4.4 4.5 4.5 0 0 1 4.8-1.3z"
        fill="#00A1E0"
      />
    </svg>
  );
}

function GmailLogo() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M2 6.5V18a2 2 0 0 0 2 2h2V9.5L2 6.5z" />
      <path fill="#34A853" d="M18 20h2a2 2 0 0 0 2-2V6.5l-4 3V20z" />
      <path fill="#EA4335" d="M18 6.5l-6 4.5-6-4.5V5a1 1 0 0 1 1.6-.8L12 7.7l4.4-3.5A1 1 0 0 1 18 5v1.5z" />
      <path fill="#FBBC05" d="M2 6.5l4 3V5L2 6.5z" />
      <path fill="#C5221F" d="M18 5v4.5l4-3L18 5z" />
    </svg>
  );
}

function CalendarLogo() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="17" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <path d="M3 7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v2H3V7z" fill="#4285F4" />
      <rect x="7" y="2" width="2" height="3.5" rx="1" fill="#EA4335" />
      <rect x="15" y="2" width="2" height="3.5" rx="1" fill="#34A853" />
      <text x="12" y="17.5" fill="#1e293b" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
        31
      </text>
    </svg>
  );
}

function SlackLogo() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24">
      <path d="M5.5 10.5a2 2 0 1 0-2-2v2h2z" fill="#E01E5A" />
      <path d="M2 13a2 2 0 0 0 2 2h4.5a2 2 0 0 0 0-4H4a2 2 0 0 0-2 2z" fill="#E01E5A" />
      <path d="M10.5 5.5a2 2 0 1 0-2-2h2v2z" fill="#36C5F0" />
      <path d="M13 2a2 2 0 0 0-2 2v4.5a2 2 0 0 0 4 0V4a2 2 0 0 0-2-2z" fill="#36C5F0" />
      <path d="M18.5 13.5a2 2 0 1 0 2 2v-2h-2z" fill="#2EB67D" />
      <path d="M22 11a2 2 0 0 0-2-2h-4.5a2 2 0 0 0 0 4H20a2 2 0 0 0 2-2z" fill="#2EB67D" />
      <path d="M13.5 18.5a2 2 0 1 0 2 2h-2v-2z" fill="#ECB22E" />
      <path d="M11 22a2 2 0 0 0 2-2v-4.5a2 2 0 0 0-4 0V20a2 2 0 0 0 2 2z" fill="#ECB22E" />
    </svg>
  );
}

function DriveLogo() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24">
      <path d="M8.2 4.5l5.6 0 7 12-5.6 0z" fill="#FFC107" />
      <path d="M1.5 16.5l4-7 7 12-8 0z" fill="#0066DA" />
      <path d="M8.2 4.5l5.6 0-5.6 9.8-5.6 0z" fill="#00AC47" />
      <path d="M15.2 16.5l5.6 0-3.5 6-5.6 0z" fill="#2684FC" />
      <path d="M1.5 16.5l5.6 0 3.5 6-5.6 0z" fill="#00832D" />
    </svg>
  );
}

/* =========================================================================
   MAIN COMPONENT: AgenticAiLiveAction
   ========================================================================= */

export default function AgenticAiLiveAction() {
  // Live simulation interactive state
  const [activeStep, setActiveStep] = useState(0); // 0: idle, 1: understand, 2: decide, 3: act, 4: complete
  const [isRunning, setIsRunning] = useState(false);
  const [leadsCount] = useState(12);
  const [followups, setFollowups] = useState(9);
  const [meetings, setMeetings] = useState(3);
  const [records, setRecords] = useState(12);

  // Trigger agent execution simulation
  const handleStartAgent = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(1); // 01 UNDERSTAND
    setFollowups(0);
    setMeetings(0);
    setRecords(0);

    setTimeout(() => {
      setActiveStep(2); // 02 DECIDE
    }, 1100);

    setTimeout(() => {
      setActiveStep(3); // 03 ACT
    }, 2200);

    setTimeout(() => {
      setActiveStep(4); // 04 COMPLETED
      setFollowups(9);
      setMeetings(3);
      setRecords(12);
      setIsRunning(false);
    }, 3300);
  };

  return (
    <section id="see-it-in-action" className="relative w-full bg-[#fbfdff] py-10 sm:py-14 font-sans overflow-hidden border-t border-slate-100/80">
      
      <Container className="relative z-10 max-w-6xl mx-auto">
        
        {/* =========================================================================
            HEADER: SEE IT IN ACTION & TITLE
            ========================================================================= */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Top Pill */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-sky-200/80 shadow-[0_2px_10px_-4px_rgba(56,189,248,0.3)] text-[10.5px] font-extrabold tracking-widest text-[#0d9488] uppercase">
            <svg className="w-3.5 h-3.5 text-[#0d9488]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>SEE IT IN ACTION</span>
          </div>

          {/* Heading */}
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight leading-[1.12] text-[#0b1f4a]">
            Watch Your Agent
            <br />
            <span className="bg-gradient-to-r from-[#0284c7] via-[#2563eb] to-[#38bdf8] bg-clip-text text-transparent">
              Go to Work.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-[15px] text-slate-500 max-w-xl mx-auto leading-relaxed">
            Give your agent a goal. It handles the steps,
            <br className="hidden sm:inline" /> decisions and actions behind it.
          </p>
        </motion.div>

        {/* =========================================================================
            3-COLUMN PIPELINE SIMULATION (LEFT CARD, CENTER AGENT, RIGHT CARD)
            ========================================================================= */}
        <div className="mt-8 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
            
            {/* ----------------- LEFT: YOUR REQUEST CARD (col-span-4) ----------------- */}
            <motion.div
              className="lg:col-span-4 flex flex-col items-center lg:items-end z-10"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full max-w-[320px] rounded-[28px] bg-white border border-slate-200/80 shadow-[0_15px_40px_-15px_rgba(15,35,80,0.07)] p-6 transition-all duration-300 hover:shadow-lg">
                {/* Header */}
                <div className="text-[11px] font-extrabold tracking-widest text-[#0d9488] uppercase">
                  YOUR REQUEST
                </div>

                {/* Quotation mark */}
                <div className="text-3xl font-serif text-[#06b6d4] leading-none mt-3">
                  &ldquo;
                </div>

                {/* Request Text */}
                <p className="mt-1 text-base sm:text-[17px] font-bold text-[#0b1f4a] leading-snug">
                  Follow up with every new sales lead from today.
                </p>

                {/* Subtle Divider */}
                <div className="mt-5 mb-4 h-px bg-slate-100" />

                {/* Bottom Detection Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <svg className="w-4 h-4 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>New leads detected</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-[#0284c7] font-black text-xs border border-cyan-100/80">
                    {leadsCount}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full max-w-[320px] mt-4">
                <button
                  onClick={handleStartAgent}
                  disabled={isRunning}
                  className={`w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-[#0d9488] via-[#0284c7] to-[#2563eb] text-white font-black text-xs tracking-wider uppercase shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/35 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-95 ${
                    isRunning ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  <span>{isRunning ? "AGENT WORKING..." : "START AGENT"}</span>
                  <motion.span
                    animate={isRunning ? { x: [0, 4, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    →
                  </motion.span>
                </button>
              </div>
            </motion.div>

            {/* ----------------- CENTER: AI AGENT & 3-STEP COGNITIVE PIPELINE (col-span-4) ----------------- */}
            <motion.div
              className="lg:col-span-4 flex flex-col items-center text-center relative z-10 lg:pt-1"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Connector lines to the side cards (desktop) */}
              {(["left", "right"] as const).map((side) => {
                const isLeft = side === "left";
                const cardDot = "#0e7490";
                const avatarDot = "#06b6d4";
                return (
                  <div
                    key={side}
                    className="hidden lg:block absolute top-[72px] h-5 pointer-events-none"
                    style={{ [side]: -24, width: "calc((100% - 170px) / 2 + 24px)" }}
                  >
                    <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none">
                      <motion.path
                        d={isLeft ? "M 0 4 L 25 4 C 45 4, 45 16, 65 16 L 100 16" : "M 0 16 L 35 16 C 55 16, 55 4, 75 4 L 100 4"}
                        stroke="#0891b2"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        vectorEffect="non-scaling-stroke"
                        animate={{ strokeDashoffset: [0, -8] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                      />
                    </svg>
                    <span
                      className={`absolute w-2.5 h-2.5 rounded-full ${isLeft ? "left-0 top-[4px]" : "right-0 top-[4px]"} -translate-y-1/2 ${isLeft ? "-translate-x-1/2" : "translate-x-1/2"}`}
                      style={{ backgroundColor: cardDot, boxShadow: `0 0 0 4px ${cardDot}22` }}
                    />
                    <span
                      className={`absolute w-2 h-2 rounded-full top-[16px] -translate-y-1/2 ${isLeft ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"}`}
                      style={{ backgroundColor: avatarDot, boxShadow: `0 0 0 4px ${avatarDot}22` }}
                    />
                  </div>
                );
              })}
              {/* Outer Ambient Glow Circles */}
              <div className="relative flex items-center justify-center">
                {/* Soft Radial Backlight */}
                <div className="absolute w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.4)_0%,rgba(56,189,248,0)_70%)] pointer-events-none" />
                
                {/* Outer Concentric Animated Halo Rings */}
                <motion.div
                  className="absolute w-[200px] h-[200px] rounded-full border border-sky-300/40 pointer-events-none"
                  animate={{ scale: [1, 1.06, 1], opacity: [0.6, 0.25, 0.6] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-[180px] h-[180px] rounded-full border border-sky-400/30 pointer-events-none"
                  animate={{ scale: [1.04, 1, 1.04], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                />

                {/* Circular Agent Avatar Frame */}
                <div className="relative w-[140px] h-[140px] sm:w-[155px] sm:h-[155px] lg:w-[170px] lg:h-[170px] rounded-full p-1 bg-white ring-4 ring-white shadow-[0_15px_35px_-8px_rgba(2,132,199,0.35)] overflow-hidden">
                  <Image
                    src="/agent-live-avatar.png"
                    alt="Custom AI Agent"
                    width={155}
                    height={155}
                    className="w-full h-full object-cover rounded-full"
                    priority
                  />
                  {/* Subtle inner glass highlight */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-white/30 pointer-events-none" />
                </div>
              </div>

              {/* Agent Floating Badge */}
              <div className="-mt-4 relative z-10 px-5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-[0_6px_20px_-8px_rgba(15,35,80,0.1)]">
                <div className="text-[10.5px] font-black tracking-wider text-[#0b1f4a] uppercase">
                  YOUR CUSTOM AI AGENT
                </div>
                <div className="text-[9px] font-medium text-slate-500">
                  Built by <span className="text-[#0284c7] font-bold">ProManage</span>
                </div>
              </div>

              {/* 3 Step Pills: 01 UNDERSTAND, 02 DECIDE, 03 ACT */}
              <div className="mt-5 flex items-center justify-center gap-2 sm:gap-3 w-full max-w-md">
                
                {/* 01 UNDERSTAND */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      activeStep === 1
                        ? "bg-teal-500 text-white border-teal-500 shadow-md scale-110"
                        : "bg-teal-50 text-teal-600 border-teal-100"
                    }`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <div className="mt-2 text-[9px] font-bold text-slate-400">01</div>
                  <div className="text-[10px] sm:text-[11px] font-black text-[#0d9488] tracking-wider uppercase">
                    UNDERSTAND
                  </div>
                  <div className="mt-0.5 text-[9px] text-slate-500 leading-tight">
                    Reads your business
                    <br />
                    context and data.
                  </div>
                </div>

                {/* Arrow 1 */}
                <div className="text-sky-300 text-xs shrink-0 select-none pb-6">
                  <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                    <line x1="0" y1="6" x2="16" y2="6" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
                    <polyline points="13,3 18,6 13,9" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* 02 DECIDE */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      activeStep === 2
                        ? "bg-purple-500 text-white border-purple-500 shadow-md scale-110"
                        : "bg-purple-50 text-purple-600 border-purple-100"
                    }`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
                      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
                    </svg>
                  </div>
                  <div className="mt-2 text-[9px] font-bold text-slate-400">02</div>
                  <div className="text-[10px] sm:text-[11px] font-black text-[#8b5cf6] tracking-wider uppercase">
                    DECIDE
                  </div>
                  <div className="mt-0.5 text-[9px] text-slate-500 leading-tight">
                    Determines the best
                    <br />
                    next action.
                  </div>
                </div>

                {/* Arrow 2 */}
                <div className="text-sky-300 text-xs shrink-0 select-none pb-6">
                  <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                    <line x1="0" y1="6" x2="16" y2="6" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="2 2" />
                    <polyline points="13,3 18,6 13,9" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* 03 ACT */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      activeStep === 3
                        ? "bg-blue-600 text-white border-blue-600 shadow-md scale-110"
                        : "bg-blue-50 text-blue-600 border-blue-100"
                    }`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <div className="mt-2 text-[9px] font-bold text-slate-400">03</div>
                  <div className="text-[10px] sm:text-[11px] font-black text-[#2563eb] tracking-wider uppercase">
                    ACT
                  </div>
                  <div className="mt-0.5 text-[9px] text-slate-500 leading-tight">
                    Executes across your
                    <br />
                    connected systems.
                  </div>
                </div>

              </div>
            </motion.div>

            {/* ----------------- RIGHT: RESULT CARD (col-span-4) ----------------- */}
            <motion.div
              className="lg:col-span-4 flex flex-col items-center lg:items-start z-10"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full max-w-[320px] rounded-[28px] bg-white border border-slate-200/80 shadow-[0_15px_40px_-15px_rgba(15,35,80,0.07)] p-6 transition-all duration-300 hover:shadow-lg">
                {/* Header */}
                <div className="text-[11px] font-extrabold tracking-widest text-[#2563eb] uppercase">
                  RESULT
                </div>

                {/* Big Green Circle Checkmark */}
                <div className="mt-4 flex flex-col items-center text-center">
                  <motion.div
                    className="w-11 h-11 rounded-full border-2 border-emerald-500 bg-emerald-50/60 flex items-center justify-center text-emerald-600 shadow-sm"
                    animate={activeStep === 4 ? { scale: [1, 1.18, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.div>
                  <h4 className="mt-2.5 text-base sm:text-[17px] font-black text-[#0b1f4a] tracking-tight">
                    Workflow completed
                  </h4>
                </div>

                {/* 3 Result Stats */}
                <div className="mt-5 space-y-3">
                  
                  {/* Row 1: Follow-ups */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100/60">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-teal-600 tracking-tight">{followups}</span>
                      <span className="text-xs font-semibold text-slate-700">Follow-ups Sent</span>
                    </div>
                  </div>

                  {/* Row 2: Meetings */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100/60">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-[#2563eb] tracking-tight">{meetings}</span>
                      <span className="text-xs font-semibold text-slate-700">Meetings Scheduled</span>
                    </div>
                  </div>

                  {/* Row 3: CRM Records */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/60">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                      </svg>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-[#0284c7] tracking-tight">{records}</span>
                      <span className="text-xs font-semibold text-slate-700">CRM Records Updated</span>
                    </div>
                  </div>

                </div>

                {/* Footer Message */}
                <div className="mt-6 pt-3.5 border-t border-slate-100 text-center text-[10.5px] text-slate-500 leading-snug">
                  Your team steps in only
                  <br />
                  when it matters.
                </div>
              </div>
            </motion.div>

          </div>

        </div>

        {/* =========================================================================
            BOTTOM STRIP: "WORKS ACROSS YOUR CONNECTED SYSTEMS"
            ========================================================================= */}
        <motion.div
          className="mt-8 max-w-4xl mx-auto rounded-[24px] bg-white border border-slate-200/80 shadow-[0_10px_35px_-10px_rgba(15,35,80,0.06)] p-5 sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Label */}
          <div className="text-center text-[10.5px] font-extrabold tracking-[0.16em] text-slate-400 uppercase">
            WORKS ACROSS YOUR CONNECTED SYSTEMS
          </div>

          {/* 6 Logos Row with Vertical Dividers */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 items-center">
            
            {/* 1. Salesforce */}
            <div className="flex flex-col items-center justify-center p-3 group cursor-pointer hover:bg-slate-50/60 rounded-xl transition-colors">
              <div className="transition-transform group-hover:scale-110 duration-200">
                <SalesforceLogo />
              </div>
              <span className="mt-1.5 text-xs font-bold text-slate-700">Salesforce</span>
            </div>

            {/* 2. Gmail */}
            <div className="flex flex-col items-center justify-center p-3 group cursor-pointer hover:bg-slate-50/60 rounded-xl transition-colors">
              <div className="transition-transform group-hover:scale-110 duration-200">
                <GmailLogo />
              </div>
              <span className="mt-1.5 text-xs font-bold text-slate-700">Gmail</span>
            </div>

            {/* 3. Calendar */}
            <div className="flex flex-col items-center justify-center p-3 group cursor-pointer hover:bg-slate-50/60 rounded-xl transition-colors">
              <div className="transition-transform group-hover:scale-110 duration-200">
                <CalendarLogo />
              </div>
              <span className="mt-1.5 text-xs font-bold text-slate-700">Calendar</span>
            </div>

            {/* 4. Slack */}
            <div className="flex flex-col items-center justify-center p-3 group cursor-pointer hover:bg-slate-50/60 rounded-xl transition-colors">
              <div className="transition-transform group-hover:scale-110 duration-200">
                <SlackLogo />
              </div>
              <span className="mt-1.5 text-xs font-bold text-slate-700">Slack</span>
            </div>

            {/* 5. Drive */}
            <div className="flex flex-col items-center justify-center p-3 group cursor-pointer hover:bg-slate-50/60 rounded-xl transition-colors">
              <div className="transition-transform group-hover:scale-110 duration-200">
                <DriveLogo />
              </div>
              <span className="mt-1.5 text-xs font-bold text-slate-700">Drive</span>
            </div>

            {/* 6. & More */}
            <div className="flex flex-col items-center justify-center p-3 group cursor-pointer hover:bg-slate-50/60 rounded-xl transition-colors">
              <div className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 font-bold text-base transition-transform group-hover:scale-110 duration-200 group-hover:border-sky-300 group-hover:text-sky-600">
                +
              </div>
              <span className="mt-1.5 text-xs font-bold text-slate-700">& More</span>
            </div>

          </div>
        </motion.div>

      </Container>
    </section>
  );
}
