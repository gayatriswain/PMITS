"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps__cms: StepItem[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "We understand your goals, challenges and technical requirements in detail.",
    icon: (
      // 3D Glossy Speech Bubble with Quotes
      <svg viewBox="0 0 70 70" className="w-14 h-14" fill="none">
        <defs>
          <linearGradient id="bubbleGrad" x1="10" y1="10" x2="60" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0c2340" />
            <stop offset="0.6" stopColor="#0f3b5c" />
            <stop offset="1" stopColor="#0d9488" />
          </linearGradient>
          <filter id="bubbleShadow" x="0" y="0" width="70" height="70" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0d9488" floodOpacity="0.3" />
          </filter>
        </defs>
        {/* Soft back glow */}
        <circle cx="35" cy="33" r="24" fill="rgba(13,148,136,0.15)" filter="blur(6px)" />
        {/* Main speech bubble shape */}
        <path
          d="M 16 22 C 16 14.5 22.5 9 34 9 C 45.5 9 52 14.5 52 22 C 52 29.5 45.5 35 34 35 C 30 35 27 36 21 40 C 22.5 36.5 22 34.5 19 33 C 17 30 16 26.5 16 22 Z"
          fill="url(#bubbleGrad)"
          filter="url(#bubbleShadow)"
        />
        {/* Highlight sheen on top */}
        <path
          d="M 20 15 C 24 11 36 10 46 13 C 41 16 30 17 20 15 Z"
          fill="#ffffff"
          opacity="0.3"
        />
        {/* Left quote mark */}
        <path
          d="M 27 21 C 27 18 29 17 31 17 C 32 17 33 18 33 19.5 C 33 22 30 23.5 30 25.5 M 27 27 C 27 26 28 25 29 25 C 30 25 31 26 31 27 C 31 28 30 29 29 29 C 28 29 27 28 27 27 Z"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Right quote mark */}
        <path
          d="M 37 21 C 37 18 39 17 41 17 C 42 17 43 18 43 19.5 C 43 22 40 23.5 40 25.5 M 37 27 C 37 26 38 25 39 25 C 40 25 41 26 41 27 C 41 28 40 29 39 29 C 38 29 37 28 37 27 Z"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Plan & Architect",
    description:
      "We plan the right architecture and strategy to ensure scalability and security.",
    icon: (
      // 3D Blueprint / Wireframe Sheet Architecture
      <svg viewBox="0 0 70 70" className="w-14 h-14" fill="none">
        <defs>
          <linearGradient id="blueprintGrad" x1="12" y1="12" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f8fafc" />
            <stop offset="1" stopColor="#e2e8f0" />
          </linearGradient>
          <filter id="sheetShadow" x="6" y="6" width="58" height="58" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0f2340" floodOpacity="0.18" />
          </filter>
        </defs>
        {/* Base Sheet / Rolled Blueprint */}
        <rect
          x="14"
          y="13"
          width="42"
          height="38"
          rx="5"
          fill="url(#blueprintGrad)"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          filter="url(#sheetShadow)"
        />
        {/* Top bar header */}
        <rect x="18" y="18" width="34" height="6" rx="2" fill="#0d9488" opacity="0.85" />
        {/* Left block / sidebar */}
        <rect x="18" y="27" width="11" height="19" rx="2" fill="#0c2340" opacity="0.8" />
        {/* Top-right card */}
        <rect x="32" y="27" width="20" height="8" rx="2" fill="#0d9488" opacity="0.4" />
        {/* Bottom-right card */}
        <rect x="32" y="38" width="20" height="8" rx="2" fill="#0c2340" opacity="0.5" />
        {/* Subtle grid lines */}
        <line x1="22" y1="20" x2="28" y2="20" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Develop",
    description:
      "Our Core PHP developers build clean, efficient and robust applications.",
    icon: (
      // 3D Code Window with </> and macOS dots
      <svg viewBox="0 0 70 70" className="w-14 h-14" fill="none">
        <defs>
          <linearGradient id="codeWinGrad" x1="10" y1="12" x2="58" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0c2340" />
            <stop offset="0.6" stopColor="#122b48" />
            <stop offset="1" stopColor="#0f3b5c" />
          </linearGradient>
          <filter id="codeShadow" x="6" y="8" width="58" height="54" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0d9488" floodOpacity="0.3" />
          </filter>
        </defs>
        {/* Outer Window Container */}
        <rect
          x="12"
          y="14"
          width="46"
          height="36"
          rx="6"
          fill="url(#codeWinGrad)"
          stroke="#1e3a5f"
          strokeWidth="1.2"
          filter="url(#codeShadow)"
        />
        {/* Window Top Title Bar */}
        <rect x="12" y="14" width="46" height="10" rx="5" fill="#08172c" />
        {/* Window Controls (3 dots) */}
        <circle cx="18" cy="19" r="1.8" fill="#ef4444" />
        <circle cx="23" cy="19" r="1.8" fill="#f59e0b" />
        <circle cx="28" cy="19" r="1.8" fill="#10b981" />
        {/* Glowing Code Brackets </> in Teal */}
        <path
          d="M 27 34 L 21 38 L 27 42"
          stroke="#0d9488"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="33"
          y1="31"
          x2="37"
          y2="45"
          stroke="#2dd4bf"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 43 34 L 49 38 L 43 42"
          stroke="#0d9488"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Test & Secure",
    description:
      "Rigorous testing and security checks to deliver a bug-free and reliable solution.",
    icon: (
      // 3D Glossy Security Shield with Checkmark
      <svg viewBox="0 0 70 70" className="w-14 h-14" fill="none">
        <defs>
          <linearGradient id="shieldGrad" x1="18" y1="10" x2="52" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0c2340" />
            <stop offset="0.6" stopColor="#0d9488" />
            <stop offset="1" stopColor="#042f2e" />
          </linearGradient>
          <filter id="shieldShadow" x="8" y="6" width="54" height="58" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0d9488" floodOpacity="0.4" />
          </filter>
        </defs>
        {/* Outer Shield rim / glow */}
        <path
          d="M 35 11 L 49 16 C 49 31 43 43 35 50 C 27 43 21 31 21 16 Z"
          fill="#14b8a6"
          opacity="0.3"
        />
        {/* Main 3D Metallic Shield */}
        <path
          d="M 35 13 L 48 18 C 48 31 42.5 42 35 48.5 C 27.5 42 22 31 22 18 Z"
          fill="url(#shieldGrad)"
          stroke="#2dd4bf"
          strokeWidth="1.6"
          filter="url(#shieldShadow)"
        />
        {/* Gloss Sheen on Left Side */}
        <path
          d="M 35 14 L 24 19 C 24 29 27.5 38 35 44 Z"
          fill="#ffffff"
          opacity="0.18"
        />
        {/* Glowing Checkmark */}
        <path
          d="M 28 30 L 33 35 L 42 24"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Deploy",
    description:
      "We deploy with precision ensuring smooth launch and performance.",
    icon: (
      // 3D Rocket Launching at Angle with Blast Trails
      <svg viewBox="0 0 70 70" className="w-14 h-14" fill="none">
        <defs>
          <linearGradient id="rocketBody" x1="24" y1="12" x2="48" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.7" stopColor="#e2e8f0" />
            <stop offset="1" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="rocketFin" x1="20" y1="28" x2="44" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0d9488" />
            <stop offset="1" stopColor="#0f766e" />
          </linearGradient>
          <filter id="rocketShadow" x="10" y="8" width="50" height="54" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0c2340" floodOpacity="0.25" />
          </filter>
        </defs>
        {/* Exhaust flame smoke */}
        <circle cx="23" cy="48" r="5" fill="#f59e0b" opacity="0.6" filter="blur(2px)" />
        <circle cx="20" cy="51" r="3.5" fill="#ef4444" opacity="0.5" filter="blur(2px)" />
        <path d="M 27 43 L 18 52 L 23 47 Z" fill="#f59e0b" />
        {/* Rocket Left Fin */}
        <path d="M 28 35 L 21 44 L 29 42 Z" fill="url(#rocketFin)" />
        {/* Rocket Right Fin */}
        <path d="M 39 24 L 48 31 L 43 36 Z" fill="url(#rocketFin)" />
        {/* Main Rocket Fuselage */}
        <path
          d="M 45 13 C 45 13 47 21 41 33 C 35 41 29 43 27 43 C 27 41 29 35 37 29 C 45 23 45 13 45 13 Z"
          fill="url(#rocketBody)"
          stroke="#cbd5e1"
          strokeWidth="1.2"
          filter="url(#rocketShadow)"
        />
        {/* Rocket Nose Cone tip in Teal */}
        <path d="M 45 13 C 45 13 43 18 40 21 C 42 19 45 16 45 13 Z" fill="#0d9488" />
        {/* Cockpit Porthole / Window */}
        <circle cx="38" cy="24" r="3" fill="#0c2340" stroke="#0d9488" strokeWidth="1.2" />
        <circle cx="37.3" cy="23.3" r="1" fill="#ffffff" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Support & Scale",
    description:
      "Continuous support and optimizations to help your business grow.",
    icon: (
      // 3D Growth Bar Chart with Sweeping Upward Curved Arrow
      <svg viewBox="0 0 70 70" className="w-14 h-14" fill="none">
        <defs>
          <linearGradient id="bar1Grad" x1="16" y1="36" x2="22" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#cbd5e1" />
            <stop offset="1" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="bar2Grad" x1="26" y1="28" x2="32" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2dd4bf" />
            <stop offset="1" stopColor="#0d9488" />
          </linearGradient>
          <linearGradient id="bar3Grad" x1="36" y1="20" x2="42" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0c2340" />
            <stop offset="1" stopColor="#1e3a5f" />
          </linearGradient>
          <filter id="chartShadow" x="12" y="10" width="46" height="46" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0d9488" floodOpacity="0.25" />
          </filter>
        </defs>
        {/* Chart Base Line */}
        <line x1="14" y1="49" x2="52" y2="49" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
        {/* Bar 1 (Short) */}
        <rect x="17" y="37" width="6" height="12" rx="2" fill="url(#bar1Grad)" />
        {/* Bar 2 (Medium) */}
        <rect x="27" y="29" width="6" height="20" rx="2" fill="url(#bar2Grad)" />
        {/* Bar 3 (Tall) */}
        <rect x="37" y="21" width="6" height="28" rx="2" fill="url(#bar3Grad)" />
        {/* Sweeping Upward Cyan Arrow */}
        <path
          d="M 16 39 C 24 37 32 30 46 16"
          stroke="#0d9488"
          strokeWidth="2.8"
          strokeLinecap="round"
          filter="url(#chartShadow)"
        />
        {/* Arrowhead */}
        <path
          d="M 38 15 L 47 15 L 47 24"
          stroke="#0d9488"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const stats__cms = [
  {
    value: "100+",
    label: "Projects Delivered",
    icon: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  },
  {
    value: "50+",
    label: "PHP Experts",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.870M16 3.130a4 4 0 0 1 0 7.750" />
      </>
    ),
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

/* Glassy pointy-top hexagon frame with number and 3D icon inside */
function HexStep({ step, index }: { step: StepItem; index: number }) {
  return (
    <motion.div
      className="relative w-[104px] h-[120px] cursor-pointer"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      {/* teal glow underneath */}
      <motion.span
        className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-[78px] h-[16px] rounded-[50%] bg-[radial-gradient(ellipse,rgba(45,212,191,0.8)_0%,rgba(56,189,248,0.35)_55%,transparent_75%)] blur-[3px]"
        animate={{ opacity: [0.6, 1, 0.6], scaleX: [0.92, 1.05, 0.92] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
      />
      <svg viewBox="0 0 104 120" className="absolute inset-0 w-full h-full drop-shadow-[0_14px_20px_rgba(15,35,80,0.12)]" fill="none">
        <defs>
          <linearGradient id={`hexFill${index}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#eaf3f8" />
          </linearGradient>
        </defs>
        <polygon points="52 5, 98 31, 98 89, 52 115, 6 89, 6 31" fill={`url(#hexFill${index})`} stroke="#dfeaf2" strokeWidth="6" strokeLinejoin="round" />
        <polygon points="52 14, 90 36, 90 84, 52 106, 14 84, 14 36" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="52 5, 98 31, 98 89, 52 115, 6 89, 6 31" fill="none" stroke="#cfe3ee" strokeWidth="1" strokeLinejoin="round" opacity="0.8" />
      </svg>
      <div className="relative h-full flex flex-col items-center pt-[22px]">
        <span className="text-[14px] font-bold text-[#0c1e3d] leading-none">{step.number}</span>
        <motion.span
          className="mt-2 flex items-center justify-center"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
        >
          {step.icon}
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function HireCorePhpApproach() {
  const $t = useCmsText();
  const steps = useCmsData("HireCorePhpApproach__steps", steps__cms);
  const stats = useCmsData("HireCorePhpApproach__stats", stats__cms);
  return (
    <section id="our-approach" className="relative w-full overflow-hidden font-sans bg-[linear-gradient(180deg,#f8fafc_0%,#f4f7fb_60%,#eef3f8_100%)] py-12 sm:py-16">
      {/* soft flowing wave lines on both sides */}
      <svg className="absolute left-0 top-[60px] w-[360px] h-[420px] pointer-events-none opacity-70" viewBox="0 0 360 420" fill="none">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M -20 ${60 + i * 14} C 100 ${40 + i * 18}, 180 ${150 + i * 10}, 360 ${130 + i * 16}`} stroke="#dbe6ef" strokeWidth="1" />
        ))}
      </svg>
      <svg className="absolute right-0 top-[120px] w-[360px] h-[420px] pointer-events-none opacity-70 -scale-x-100" viewBox="0 0 360 420" fill="none">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M -20 ${60 + i * 14} C 100 ${40 + i * 18}, 180 ${150 + i * 10}, 360 ${130 + i * 16}`} stroke="#dbe6ef" strokeWidth="1" />
        ))}
      </svg>

      <Container className="relative z-10 max-w-6xl">
        {/* ---------------- HEADER ---------------- */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[11px] font-bold tracking-[0.26em] text-[#0f8a83] uppercase">{$t("HireCorePhpApproach__t1", "Our Approach")}</div>
          <div className="mt-2 flex items-center justify-center gap-3 text-slate-300">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-slate-300" />
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#0f8a83]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
            </svg>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-slate-300" />
          </div>
          <h2 className="text-h2 mt-5 font-black tracking-tight text-[#0c1e3d]">
            {$t("HireCorePhpApproach__t2", "From Idea to Impact.")}<br />
            <span className="bg-gradient-to-r from-[#0f8a83] to-[#1aa6a6] bg-clip-text text-transparent">{$t("HireCorePhpApproach__t3", "We Build It Right.")}</span>
          </h2>
          <motion.div
            className="mt-5 mx-auto h-[2px] rounded-full bg-[#0f8a83]"
            initial={{ width: 0 }}
            whileInView={{ width: 56 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="text-body mt-5 text-slate-600">
            {rich($t("HireCorePhpApproach__t4", "A proven process that ensures your project is"))}<br className="hidden sm:inline" /> {rich($t("HireCorePhpApproach__t5", "delivered with precision, performance and scale in mind."))}</p>
        </motion.div>

        {/* ---------------- STEPS ---------------- */}
        <div className="mt-12 sm:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <HexStep step={step} index={i} />

              {/* connector to next hexagon */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-[60px] left-[calc(50%+58px)] w-[calc(100%-116px+16px)] items-center">
                  <div className="relative w-full h-px bg-slate-300/70 overflow-hidden">
                    <motion.span
                      className="absolute top-0 h-px w-8 bg-gradient-to-r from-transparent via-teal-400 to-transparent"
                      animate={{ left: ["-20%", "110%"] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                    />
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#1aa6a6] shadow-[0_0_0_3px_rgba(45,212,191,0.18)]" />
                </div>
              )}

              <span className="mt-6 w-1 h-1 rounded-full bg-[#1aa6a6]" />
              <h3 className="mt-4 text-[14px] font-bold text-[#0c1e3d]">{step.title}</h3>
              <p className="mt-2 text-[11.5px] text-slate-500 leading-relaxed max-w-[165px]">{step.description}</p>
              <span className="mt-4 w-5 h-[2px] rounded-full bg-[#1aa6a6]/70" />
            </motion.div>
          ))}
        </div>

        {/* ---------------- BOTTOM BANNER ---------------- */}
        <motion.div
          className="mt-12 rounded-2xl bg-white/95 border border-slate-100 shadow-[0_18px_44px_-16px_rgba(15,35,80,0.14)] px-6 py-5 flex flex-col lg:flex-row items-center justify-between gap-5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 shrink-0">
            <span className="w-[3px] h-12 rounded-full bg-[#0f8a83]" />
            <div className="text-left text-[16px] font-bold leading-snug">
              <div className="text-[#0c1e3d]">{$t("HireCorePhpApproach__t6", "We don't just deliver projects.")}</div>
              <div className="text-[#0f8a83]">{$t("HireCorePhpApproach__t7", "We build long-term success.")}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link
              href={$t("HireCorePhpApproach__t8", "#contact")}
              className="group inline-flex items-center justify-center gap-2 h-[44px] px-6 rounded-lg bg-[#0d8a94] text-white text-[13px] font-semibold shadow-md shadow-teal-600/25 hover:bg-[#0b7a84] transition-colors whitespace-nowrap"
            >
              {$t("HireCorePhpApproach__t9", "Hire PHP Developers")}<svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href={$t("HireCorePhpApproach__t10", "#contact")}
              className="inline-flex items-center justify-center gap-2 h-[44px] px-5 rounded-lg bg-white border border-slate-300 text-[#0c1e3d] text-[13px] font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap"
            >
              {$t("HireCorePhpApproach__t11", "Talk to an Expert")}<svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </Link>
          </div>

          <div className="flex items-center gap-5 divide-x divide-slate-200">
            {stats.map((s, i) => (
              <div key={s.label} className={`flex items-center gap-2.5 text-left ${i ? "pl-5" : ""}`}>
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#0c1e3d] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
                <div>
                  <div className="text-[17px] font-bold text-[#0c1e3d] leading-none">{s.value}</div>
                  <div className="mt-1 text-[9.5px] text-slate-500 leading-tight">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
