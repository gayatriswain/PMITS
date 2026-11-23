"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DM_Serif_Display } from "next/font/google";
import Container from "./Container";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const serviceCards = [
  {
    title: "UI/UX Design",
    desc: "Intuitive, beautiful and user-centered interfaces that people love.",
    icon: (
      // Pen drafting tool drawing bezier path
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0c1e3d]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3.5" stroke="#0c1e3d" strokeWidth="1.6" />
        <circle cx="3" cy="3" r="1.5" fill="#0d9488" stroke="none" />
        <circle cx="21" cy="21" r="1.5" fill="#0d9488" stroke="none" />
        <path d="M14 7l-5.5 5.5v2h2L16 9l-2-2z" fill="none" stroke="#0c1e3d" strokeWidth="1.8" />
        <circle cx="17" cy="7" r="1" fill="#0d9488" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Web Design",
    desc: "Modern, responsive and conversion-focused website designs.",
    icon: (
      // Browser window with layout blocks
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0c1e3d]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="3" strokeWidth="1.6" />
        <line x1="2" y1="8" x2="22" y2="8" strokeWidth="1.6" />
        <circle cx="5" cy="5.5" r="1" fill="currentColor" />
        <circle cx="8" cy="5.5" r="1" fill="currentColor" />
        <circle cx="11" cy="5.5" r="1" fill="currentColor" />
        <rect x="5" y="11" width="6" height="7" rx="1" fill="#0d9488" stroke="none" />
        <line x1="14" y1="12" x2="19" y2="12" strokeWidth="2" />
        <line x1="14" y1="15" x2="18" y2="15" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Wireframing & Prototyping",
    desc: "Structured flows and interactive prototypes that validate ideas early.",
    icon: (
      // Tree hierarchy nodes
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0c1e3d]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="5" rx="1" strokeWidth="1.6" />
        <rect x="2" y="15" width="6" height="5" rx="1" strokeWidth="1.6" />
        <rect x="16" y="15" width="6" height="5" rx="1" strokeWidth="1.6" />
        <circle cx="9" cy="17.5" r="1.5" fill="#0d9488" stroke="none" />
        <path d="M12 7v4m0 0H5v4m7-4h6v4" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Design Systems",
    desc: "Scalable components and visual systems for consistent digital experiences.",
    icon: (
      // "Aa" with color palette dots
      <div className="flex flex-col items-center justify-center">
        <span className={`${dmSerif.className} text-[20px] leading-none text-[#0c1e3d]`}>Aa</span>
        <div className="mt-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0c1e3d]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
        </div>
      </div>
    ),
  },
  {
    title: "Interaction Design",
    desc: "Meaningful interactions that engage users and drive actions.",
    icon: (
      // Phone with tap / touch ripple
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0c1e3d]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="3" strokeWidth="1.6" />
        <line x1="10" y1="18" x2="14" y2="18" strokeWidth="2" />
        <circle cx="12" cy="10" r="2.5" fill="#0d9488" stroke="none" />
        <circle cx="12" cy="10" r="5" stroke="#0d9488" strokeWidth="1.2" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    title: "UX Strategy",
    desc: "Research-driven strategy to align user needs with business goals.",
    icon: (
      // Growth trendline chart
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0c1e3d]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" strokeWidth="2.5" />
        <line x1="12" y1="20" x2="12" y2="13" strokeWidth="2.5" />
        <line x1="6" y1="20" x2="6" y2="16" strokeWidth="2.5" />
        <path d="M4 11l4-4 4 3 6-6" stroke="#0d9488" strokeWidth="2" />
        <circle cx="18" cy="4" r="1.5" fill="#0d9488" stroke="none" />
      </svg>
    ),
  },
];

const stats = [
  {
    value: "150+",
    label: "Projects Delivered",
    sub: "Successful digital products across diverse industries.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="12" strokeWidth="3" />
      </svg>
    ),
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    sub: "Long-term relationships built on trust and results.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    value: "10+",
    label: "Industries Served",
    sub: "From startups to enterprises across the globe.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="9" y1="6" x2="9" y2="6" strokeWidth="2.5" />
        <line x1="15" y1="6" x2="15" y2="6" strokeWidth="2.5" />
        <line x1="9" y1="10" x2="9" y2="10" strokeWidth="2.5" />
        <line x1="15" y1="10" x2="15" y2="10" strokeWidth="2.5" />
        <line x1="9" y1="14" x2="9" y2="14" strokeWidth="2.5" />
        <line x1="15" y1="14" x2="15" y2="14" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    value: "5+",
    label: "Years of Experience",
    sub: "Crafting high-impact digital experiences since day one.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="6" />
        <path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.11" />
      </svg>
    ),
  },
];

export default function UiUxWhatWeDo() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative w-full py-12 sm:py-16 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_50%,#f8fafc_100%)] overflow-hidden font-sans">
      {/* ---------------- BACKGROUND DECORATIONS ---------------- */}
      {/* Top Left Dotted Matrix */}
      <div className="absolute left-6 sm:left-14 top-24 pointer-events-none opacity-40 z-0">
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#0d9488]/40" />
          ))}
        </div>
      </div>

      {/* Top Right Curved Orbital Arc with Cyan Dot */}
      <div className="absolute right-0 top-12 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] pointer-events-none z-0">
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
          <circle cx="400" cy="0" r="300" stroke="rgba(13,148,136,0.2)" strokeWidth="1.5" />
          <circle cx="200" cy="100" r="4" fill="#0d9488" />
          <circle cx="200" cy="100" r="8" stroke="rgba(13,148,136,0.25)" strokeWidth="1.5" />
        </svg>
      </div>

      <Container className="relative z-10 max-w-7xl">
        {/* ---------------- HEADER ---------------- */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-8 sm:w-12 h-px bg-teal-500/40" />
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.25em] text-[#0d9488] uppercase">
              WHAT WE DO
            </span>
            <span className="w-8 sm:w-12 h-px bg-teal-500/40" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="mt-6 text-4xl sm:text-6xl lg:text-[68px] tracking-tight leading-[1.05] text-[#0c1e3d]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className={`${dmSerif.className} block font-normal tracking-[-0.015em]`}>
              Digital experiences
            </span>
            <span className={`${dmSerif.className} block font-normal tracking-[-0.015em]`}>
              designed to <span className="text-[#0d9488]">perform.</span>
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="mt-5 mx-auto max-w-2xl text-[14.5px] sm:text-[16px] text-slate-600 leading-relaxed font-normal"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We combine user empathy, design thinking and technology
            <br className="hidden sm:inline" /> to craft intuitive, engaging and result-driven digital experiences.
          </motion.p>
        </div>

        {/* ---------------- MAIN BENTO SECTION ---------------- */}
        <div className="mt-10 sm:mt-12 space-y-5 sm:space-y-6">
          {/* TOP ROW: BIG FEATURED CARD (TEXT ON LEFT + 3D LAYERS ON RIGHT) & 6 CARDS (3x2) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* ---------------- LEFT BIG CARD (50% WIDTH): TEXT ON LEFT, 3D LAYERS ON RIGHT ---------------- */}
            <motion.div
              className="lg:col-span-6 rounded-[30px] sm:rounded-[34px] bg-white border border-slate-100 p-6 sm:p-8 shadow-[0_12px_32px_-10px_rgba(15,35,80,0.06)] relative overflow-hidden flex flex-col justify-between"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Inner Horizontal Flex: Content on Left, 3D Stacked Layers on Right */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-full relative">
                {/* Left Side: Text Details */}
                <div className="flex-1 flex flex-col justify-between h-full z-10 max-w-[260px] sm:max-w-[270px]">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-[9.5px] font-bold tracking-[0.14em] text-[#0d9488] uppercase">
                      USER FIRST. IMPACT ALWAYS.
                    </span>

                    <h3 className="mt-4 text-2xl sm:text-[28px] lg:text-[31px] font-bold text-[#0c1e3d] leading-[1.16] tracking-tight">
                      Great design is more
                      <br />
                      than how it looks.
                      <br />
                      <span className="text-[#0d9488]">It&apos;s how it works.</span>
                    </h3>

                    <p className="mt-3.5 text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed">
                      We design experiences that are easy to use, built to scale and focused on real business outcomes.
                    </p>
                  </div>

                  {/* Bottom Link CTA */}
                  <div className="mt-6 pt-3">
                    <Link
                      href="#contact"
                      className="group inline-flex items-center gap-1.5 text-[13px] font-bold text-[#0d9488] hover:text-[#0b766c] transition-colors"
                    >
                      <span>Let&apos;s create impact</span>
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Right Side: 3D Isometric Stacked Layers (Placed to the right of content) */}
                <div className="flex-1 w-full h-[270px] sm:h-[310px] relative flex items-center justify-center [perspective:1200px] [transform-style:preserve-3d]">
                  {/* Floor Blueprint Grid lines */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                    <div className="w-[240px] h-[170px] border border-dashed border-teal-400 rounded-2xl [transform:rotateX(56deg)_rotateZ(-40deg)]" />
                  </div>

                  {/* Soft Teal Ambient Floor Glow */}
                  <div className="absolute w-36 h-14 rounded-full bg-teal-400/25 blur-2xl pointer-events-none transform translate-y-20" />

                  {/* ================= LAYER 1 (BOTTOM BLUEPRINT PLANE) ================= */}
                  {/* Rises first from bottom (y: 110 -> 40) */}
                  <motion.div
                    className="absolute w-[180px] sm:w-[200px] h-[120px] sm:h-[135px] rounded-2xl border-2 border-dashed border-teal-400/60 bg-teal-50/50 backdrop-blur-[2px] p-2.5 shadow-sm"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    initial={{ opacity: 0, y: 110, rotateX: 56, rotateZ: -40 }}
                    whileInView={{ opacity: 1, y: 40, rotateX: 56, rotateZ: -40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="w-full h-full border border-teal-300/40 rounded-xl p-2 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <span className="w-6 h-1.5 rounded bg-teal-400/40" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
                      </div>
                      <div className="flex items-center justify-center h-8">
                        <span className="text-teal-600/40 text-[9px] font-mono tracking-wider">GRID 12-COL</span>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="w-8 h-1 rounded bg-teal-400/40" />
                        <span className="w-5 h-1 rounded bg-teal-400/40" />
                      </div>
                    </div>
                  </motion.div>

                  {/* ================= LAYER 2 (DARK MODE UI LAYER) ================= */}
                  {/* Rises second from bottom (y: 135 -> 8) */}
                  <motion.div
                    className="absolute w-[180px] sm:w-[200px] h-[120px] sm:h-[135px] rounded-2xl bg-[#0c1e3d] border border-slate-700 shadow-[0_20px_35px_-10px_rgba(12,30,61,0.5)] p-2.5 text-white"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    initial={{ opacity: 0, y: 135, rotateX: 56, rotateZ: -40 }}
                    whileInView={{ opacity: 1, y: 8, rotateX: 56, rotateZ: -40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="w-full h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400/70" />
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                        </div>
                        <span className="w-8 h-1.5 rounded bg-slate-700" />
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 my-1">
                        <div className="rounded-md bg-[#0d9488] p-1.5 flex items-center justify-center shadow-sm">
                          <span className="text-[9px] font-bold text-white tracking-wide">CTA</span>
                        </div>
                        <div className="rounded-md bg-slate-800 p-1.5 border border-slate-700/80" />
                      </div>
                      <div className="w-full h-1.5 rounded bg-slate-700/60" />
                    </div>
                  </motion.div>

                  {/* ================= LAYER 3 (FROSTED GLASS SKELETON WIREFRAME) ================= */}
                  {/* Rises third from bottom (y: 160 -> -24) */}
                  <motion.div
                    className="absolute w-[180px] sm:w-[200px] h-[120px] sm:h-[135px] rounded-2xl bg-white/75 backdrop-blur-md border border-white shadow-[0_20px_35px_-10px_rgba(15,35,80,0.16)] p-2.5"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    initial={{ opacity: 0, y: 160, rotateX: 56, rotateZ: -40 }}
                    whileInView={{ opacity: 1, y: -24, rotateX: 56, rotateZ: -40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="w-full h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="w-10 h-1.5 rounded bg-slate-300/80" />
                        <span className="w-3.5 h-3.5 rounded-md bg-teal-100 border border-teal-300" />
                      </div>
                      <div className="w-full h-10 border border-dashed border-slate-300 rounded-md flex items-center justify-center">
                        <span className="text-slate-400 text-[9px] font-medium">✕ Wireframe</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="w-10 h-1.5 rounded bg-slate-300/80" />
                        <span className="w-6 h-1.5 rounded bg-teal-300/80" />
                      </div>
                    </div>
                  </motion.div>

                  {/* ================= LAYER 4 (TOP FINAL HIGH-FIDELITY SCREEN) ================= */}
                  {/* Rises fourth from bottom (y: 190 -> -56), then floats */}
                  <motion.div
                    className="absolute w-[180px] sm:w-[200px] h-[120px] sm:h-[135px] rounded-2xl bg-white border border-slate-100 shadow-[0_26px_50px_-12px_rgba(15,35,80,0.22)] p-3 z-20"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    initial={{ opacity: 0, y: 190, rotateX: 56, rotateZ: -40 }}
                    whileInView={{ opacity: 1, y: -56, rotateX: 56, rotateZ: -40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
                    animate={{
                      y: [-56, -63, -56],
                    }}
                    whileHover={{ y: -72, scale: 1.03 }}
                  >
                    <div className="w-full h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
                          <span className="w-10 h-1.5 rounded bg-[#0c1e3d]" />
                        </div>
                        <span className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200" />
                      </div>

                      {/* Image block with cross & teal button */}
                      <div className="rounded-lg bg-slate-50 border border-slate-100 p-1.5 flex items-center gap-1.5">
                        <div className="w-8 h-6 rounded-md bg-teal-500/20 border border-teal-300 flex items-center justify-center">
                          <span className="text-[#0d9488] text-[8px] font-bold">PRO</span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <span className="block w-12 h-1 rounded bg-slate-700" />
                          <span className="block w-8 h-1 rounded bg-slate-300" />
                        </div>
                        <span className="w-4 h-4 rounded-full bg-[#0d9488] text-white flex items-center justify-center text-[8px]">
                          ✓
                        </span>
                      </div>

                      {/* Bottom Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0c1e3d]" />
                        </div>
                        <span className="px-1.5 py-0.5 rounded-full bg-[#0d9488] text-white text-[8px] font-bold">
                          Published
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ---------------- RIGHT 6 SERVICE CARDS (3 COLUMNS x 2 ROWS MATCHING SCREENSHOT) ---------------- */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {serviceCards.map((sc, idx) => (
                <motion.div
                  key={sc.title}
                  className={`rounded-[24px] bg-white border p-5 flex flex-col justify-between transition-all cursor-pointer group ${
                    hoveredCard === idx
                      ? "border-teal-300 shadow-[0_16px_30px_-10px_rgba(13,148,136,0.18)] -translate-y-1"
                      : "border-slate-100 shadow-[0_6px_20px_-6px_rgba(15,35,80,0.04)] hover:border-slate-200"
                  }`}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <div>
                    {/* Icon Container */}
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100/80 flex items-center justify-center text-[#0c1e3d] group-hover:bg-teal-50 group-hover:border-teal-200 group-hover:text-[#0d9488] transition-colors">
                      {sc.icon}
                    </div>

                    {/* Title */}
                    <h4 className="mt-4 text-[15.5px] font-bold text-[#0c1e3d] group-hover:text-[#0d9488] transition-colors leading-snug">
                      {sc.title}
                    </h4>

                    {/* Description */}
                    <p className="mt-1.5 text-[12px] text-slate-500 leading-relaxed">
                      {sc.desc}
                    </p>
                  </div>

                  {/* Bottom Arrow CTA */}
                  <div className="mt-5 pt-1 flex items-center text-[#0d9488]">
                    <span className="text-[#0d9488] group-hover:translate-x-1 transition-transform">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ---------------- BOTTOM STATS CARD (4 COLUMNS DIVIDED BY FAINT VERTICAL LINES) ---------------- */}
          <motion.div
            className="rounded-[28px] bg-white border border-slate-100 shadow-[0_12px_32px_-12px_rgba(15,35,80,0.06)] p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-slate-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((st) => (
              <div key={st.label} className="flex items-center gap-3.5 lg:px-6 first:lg:pl-2">
                {/* Circular Icon Badge */}
                <span className="w-12 h-12 rounded-full bg-teal-50/80 border border-teal-200/60 flex items-center justify-center shrink-0 shadow-sm">
                  {st.icon}
                </span>

                {/* Metrics Text */}
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0c1e3d] tracking-tight leading-none">
                    {st.value}
                  </div>
                  <div className="mt-1 text-[13px] font-bold text-[#0c1e3d]">
                    {st.label}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-500 leading-tight">
                    {st.sub}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
