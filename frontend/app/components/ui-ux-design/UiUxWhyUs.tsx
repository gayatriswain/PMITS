"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const dmSerif = { className: "font-heading" }; // global font from app/layout.tsx

const leftPillars__cms = [
  {
    num: "01",
    title: "User First",
    desc: "We start with real users, crafting experiences that are intuitive and meaningful.",
    icon: (
      // User Profile Avatar
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0c1e3d]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Goal Driven",
    desc: "Every design decision is aligned with your business goals and growth.",
    icon: (
      // Stacked 3D layers
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0c1e3d]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

const rightPillars__cms = [
  {
    num: "03",
    title: "Scalable by Design",
    desc: "We build flexible design systems that scale with your product and vision.",
    icon: (
      // Rocket Launch taking off
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0c1e3d]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <circle cx="15.5" cy="8.5" r="1.5" fill="#0d9488" stroke="none" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Built for Impact",
    desc: "We focus on outcomes that drive engagement, conversion and real results.",
    icon: (
      // Bullseye Target with Arrow
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0c1e3d]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill="#0d9488" stroke="none" />
        <line x1="12" y1="2" x2="12" y2="4" stroke="#0d9488" strokeWidth="2" />
        <line x1="12" y1="20" x2="12" y2="22" stroke="#0d9488" strokeWidth="2" />
        <line x1="2" y1="12" x2="4" y2="12" stroke="#0d9488" strokeWidth="2" />
        <line x1="20" y1="12" x2="22" y2="12" stroke="#0d9488" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function UiUxWhyUs() {
  const $t = useCmsText();
  const leftPillars = useCmsData("UiUxWhyUs__leftPillars", leftPillars__cms);
  const rightPillars = useCmsData("UiUxWhyUs__rightPillars", rightPillars__cms);
  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);

  return (
    <section className="relative w-full py-12 sm:py-16 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_50%,#f8fafc_100%)] overflow-hidden font-sans">
      {/* ---------------- BACKGROUND DECORATIONS ---------------- */}
      {/* Top Left Architectural Blueprint Sketch Texture with Dots */}
      <div className="absolute left-4 sm:left-10 top-20 pointer-events-none opacity-40 z-0">
        <div className="relative">
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#0d9488]/40" />
            ))}
          </div>
          {/* Subtle hatch sketch lines */}
          <svg className="w-24 h-24 absolute -top-4 -left-4 opacity-30" viewBox="0 0 100 100">
            <line x1="0" y1="20" x2="80" y2="100" stroke="#0d9488" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="40" x2="60" y2="100" stroke="#0d9488" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="60" x2="40" y2="100" stroke="#0d9488" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>

      {/* Bottom Right Topographical Elevation Contour Lines */}
      <div className="absolute right-0 bottom-0 w-[420px] sm:w-[540px] h-[340px] sm:h-[420px] pointer-events-none z-0 opacity-40">
        <svg viewBox="0 0 500 400" className="w-full h-full" fill="none">
          <path d="M 120 400 C 180 340, 220 280, 320 250 C 420 220, 470 260, 500 240" stroke="rgba(13,148,136,0.35)" strokeWidth="1.5" />
          <path d="M 160 400 C 220 330, 260 270, 360 240 C 460 210, 480 230, 500 210" stroke="rgba(13,148,136,0.3)" strokeWidth="1.5" />
          <path d="M 210 400 C 260 320, 310 260, 400 225 C 480 195, 490 200, 500 180" stroke="rgba(13,148,136,0.25)" strokeWidth="1.5" />
          <path d="M 270 400 C 310 330, 360 270, 440 230 C 485 205, 495 180, 500 150" stroke="rgba(13,148,136,0.2)" strokeWidth="1.5" />
          <line x1="320" y1="250" x2="500" y2="400" stroke="rgba(13,148,136,0.4)" strokeWidth="2" />
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
              {html($t("UiUxWhyUs__t1", "WHY PROMANAGE"))}</span>
            <span className="w-8 sm:w-12 h-px bg-teal-500/40" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-h2 mt-6 tracking-tight text-[#0c1e3d]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className={`${dmSerif.className} block font-normal tracking-[-0.015em]`}>{rich($t("UiUxWhyUs__t2m", "Design with <span class=\"text-[#0d9488]\">purpose.</span>"))}</span>
            <span className={`${dmSerif.className} block font-normal tracking-[-0.015em]`}>{rich($t("UiUxWhyUs__t4m", "Built for <span class=\"text-[#0d9488]\">impact.</span>"))}</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-body mt-5 mx-auto max-w-2xl text-slate-600 font-normal"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >{rich($t("UiUxWhyUs__t6m", "We blend strategy, creativity and technology to design<br class=\"hidden sm:inline\"> experiences that drive real business growth."))}</motion.p>
        </div>

        {/* ---------------- MIDDLE SHOWCASE: 4 PILLARS & CENTER 3D FLOATING STACK ---------------- */}
        <div className="relative mt-10 sm:mt-14 w-full">
          {/* Main 3-Column Layout: Left 2 Pillars | Center 3D Stack with Orbit | Right 2 Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            {/* ---------------- LEFT PILLARS (01 & 02) ---------------- */}
            <div className="lg:col-span-3 flex flex-col justify-around gap-12 sm:gap-14">
              {leftPillars.map((p, idx) => (
                <motion.div
                  key={p.num}
                  className="flex items-start gap-4 group cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(p.num)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                >
                  {/* Circular White Icon Badge */}
                  <motion.div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center border shrink-0 transition-all ${
                      hoveredIdx === p.num
                        ? "border-teal-300 shadow-[0_16px_32px_-8px_rgba(13,148,136,0.25)] ring-4 ring-teal-100/60"
                        : "border-slate-100 shadow-[0_10px_25px_-5px_rgba(15,35,80,0.1),0_4px_10px_-2px_rgba(15,35,80,0.05)]"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {p.icon}
                  </motion.div>

                  {/* Text Description */}
                  <div className="text-left">
                    <span className="text-[26px] sm:text-[30px] font-bold text-slate-300 select-none tracking-tight leading-none block">
                      {p.num}
                    </span>
                    <h3 className="mt-1 text-[17px] sm:text-[18px] font-bold text-[#0c1e3d] group-hover:text-[#0d9488] transition-colors">
                      {p.title}
                    </h3>
                    <div className="mt-1.5 w-6 h-[2px] rounded-full bg-[#0d9488]/50" />
                    <p className="text-caption mt-2 text-slate-500 max-w-[210px]">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ---------------- CENTER: 3D ISOMETRIC STACK WITH CONNECTING ORBIT ---------------- */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
              {/* Background Circular Orbit Ring */}
              <div className="absolute w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full border border-teal-200/40 bg-[radial-gradient(circle,rgba(240,253,250,0.6)_0%,rgba(240,249,255,0.2)_50%,transparent_72%)] pointer-events-none z-0" />

              {/* Connecting Spline Curves to Pillars */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 600 400" fill="none">
                {/* Curve to Top-Left Pillar 01 */}
                <path d="M 230 150 C 160 140, 110 130, 40 120" stroke="rgba(13,148,136,0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="110" cy="130" r="3.5" fill="#0d9488" />

                {/* Curve to Bottom-Left Pillar 02 */}
                <path d="M 210 270 C 150 280, 110 290, 40 300" stroke="rgba(13,148,136,0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="110" cy="290" r="3.5" fill="#0d9488" />

                {/* Curve to Top-Right Pillar 03 */}
                <path d="M 370 150 C 440 140, 490 130, 560 120" stroke="rgba(13,148,136,0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="490" cy="130" r="3.5" fill="#0d9488" />

                {/* Curve to Bottom-Right Pillar 04 */}
                <path d="M 390 270 C 450 280, 490 290, 560 300" stroke="rgba(13,148,136,0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="490" cy="290" r="3.5" fill="#0d9488" />
              </svg>

              {/* 3D Isometric Stack Container */}
              <div className="relative w-[300px] sm:w-[350px] h-[260px] sm:h-[300px] flex items-center justify-center [perspective:1200px] [transform-style:preserve-3d] z-10">
                {/* Base Blueprint Layer (Bottom Paper) */}
                <motion.div
                  className="absolute w-[240px] sm:w-[280px] h-[155px] sm:h-[180px] rounded-2xl border-2 border-dashed border-teal-300/50 bg-teal-50/40 backdrop-blur-[2px] p-3 shadow-sm"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, y: 70, rotateX: 56, rotateZ: -38 }}
                  whileInView={{ opacity: 1, y: 48, rotateX: 56, rotateZ: -38 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <div className="w-full h-full border border-teal-300/40 rounded-xl p-2 flex flex-col justify-between opacity-50">
                    <div className="flex justify-between items-center">
                      <span className="w-8 h-1.5 rounded bg-teal-400" />
                      <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
                    </div>
                    <div className="w-full h-12 border border-teal-300/40 rounded-lg flex items-center justify-center">
                      <span className="text-[10px] text-teal-600/40 font-mono">{html($t("UiUxWhyUs__t8", "FRAMEWORK BASE"))}</span>
                    </div>
                    <span className="w-12 h-1.5 rounded bg-teal-400" />
                  </div>
                </motion.div>

                {/* Middle-Bottom: Dark Navy UI Dashboard Layer */}
                <motion.div
                  className="absolute w-[240px] sm:w-[280px] h-[155px] sm:h-[180px] rounded-2xl bg-[#0c1e3d] border border-slate-700 shadow-[0_20px_40px_-10px_rgba(12,30,61,0.55)] p-3 text-white"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, y: 85, rotateX: 56, rotateZ: -38 }}
                  whileInView={{ opacity: 1, y: 16, rotateX: 56, rotateZ: -38 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                >
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-400/80" />
                        <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                      </div>
                      <span className="w-8 h-2 rounded bg-slate-700" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 my-1">
                      <div className="rounded-lg bg-[#0d9488] p-2 flex items-center justify-center shadow-sm">
                        <span className="text-[9.5px] font-bold text-white tracking-wider">{html($t("UiUxWhyUs__t9", "DEPLOY"))}</span>
                      </div>
                      <div className="rounded-lg bg-slate-800 p-2 border border-slate-700" />
                    </div>
                    <div className="w-full h-2 rounded bg-slate-700/60" />
                  </div>
                </motion.div>

                {/* Middle-Top: Vibrant Cyan/Teal Gradient Sheet */}
                <motion.div
                  className="absolute w-[240px] sm:w-[280px] h-[155px] sm:h-[180px] rounded-2xl bg-[linear-gradient(135deg,#14b8a6_0%,#0d9488_100%)] shadow-[0_20px_35px_-10px_rgba(13,148,136,0.4)] p-3"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, y: 100, rotateX: 56, rotateZ: -38 }}
                  whileInView={{ opacity: 1, y: -16, rotateX: 56, rotateZ: -38 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="w-full h-full flex flex-col justify-between text-white/90">
                    <div className="flex items-center justify-between">
                      <span className="w-12 h-2 rounded bg-white/70" />
                      <span className="w-4 h-4 rounded-full bg-white/30" />
                    </div>
                    <div className="w-full h-10 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center">
                      <span className="text-[10px] font-bold tracking-wider">{html($t("UiUxWhyUs__t10", "DESIGN TO SCALE"))}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="w-8 h-1.5 rounded bg-white/70" />
                      <span className="w-6 h-1.5 rounded bg-white/50" />
                    </div>
                  </div>
                </motion.div>

                {/* Top: Polished ProManage Screen Interface */}
                <motion.div
                  className="absolute w-[240px] sm:w-[280px] h-[155px] sm:h-[180px] rounded-2xl bg-white border border-slate-100 shadow-[0_30px_60px_-15px_rgba(15,35,80,0.22)] p-3.5 z-20"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, y: 120, rotateX: 56, rotateZ: -38 }}
                  whileInView={{ opacity: 1, y: -50, rotateX: 56, rotateZ: -38 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.85 }}
                  animate={{
                    y: [-50, -58, -50],
                  }}
                  whileHover={{ y: -68, scale: 1.03 }}
                >
                  <div className="w-full h-full flex flex-col justify-between">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0d9488]" />
                        <span className="text-[10px] font-extrabold text-[#0c1e3d] tracking-wide">{html($t("UiUxWhyUs__t11", "ProManage"))}</span>
                      </div>
                      <span className="w-4 h-4 rounded-full bg-slate-100 border border-slate-200" />
                    </div>

                    {/* Middle Section: Landscape Mountain Card + Form Rows */}
                    <div className="grid grid-cols-2 gap-2 my-1">
                      {/* Left: Input rows */}
                      <div className="space-y-1.5">
                        <span className="block w-full h-2 rounded bg-slate-100" />
                        <span className="block w-3/4 h-2 rounded bg-slate-100" />
                        <span className="block w-1/2 h-2 rounded bg-teal-100" />
                      </div>
                      {/* Right: Dark landscape widget */}
                      <div className="rounded-xl bg-[#0c1e3d] p-1.5 flex flex-col justify-between shadow-sm">
                        <div className="flex justify-between items-center">
                          <span className="w-3 h-3 rounded-full bg-[#0d9488]" />
                          <span className="w-4 h-1 rounded bg-slate-600" />
                        </div>
                        {/* Mountain wave curve */}
                        <svg viewBox="0 0 40 20" className="w-full h-4 text-teal-400">
                          <path d="M0 20 Q10 5 20 15 T40 5 L40 20 Z" fill="currentColor" opacity="0.6" />
                        </svg>
                      </div>
                    </div>

                    {/* Bottom Navigation Controls */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
                        <span className="w-2 h-2 rounded-full bg-[#0c1e3d]" />
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#0d9488] text-white text-[8.5px] font-bold">
                        {html($t("UiUxWhyUs__t12", "Live Preview"))}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ---------------- RIGHT PILLARS (03 & 04) ---------------- */}
            <div className="lg:col-span-3 flex flex-col justify-around gap-12 sm:gap-14">
              {rightPillars.map((p, idx) => (
                <motion.div
                  key={p.num}
                  className="flex items-start gap-4 group cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(p.num)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                >
                  {/* Circular White Icon Badge */}
                  <motion.div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center border shrink-0 transition-all ${
                      hoveredIdx === p.num
                        ? "border-teal-300 shadow-[0_16px_32px_-8px_rgba(13,148,136,0.25)] ring-4 ring-teal-100/60"
                        : "border-slate-100 shadow-[0_10px_25px_-5px_rgba(15,35,80,0.1),0_4px_10px_-2px_rgba(15,35,80,0.05)]"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {p.icon}
                  </motion.div>

                  {/* Text Description */}
                  <div className="text-left">
                    <span className="text-[26px] sm:text-[30px] font-bold text-slate-300 select-none tracking-tight leading-none block">
                      {p.num}
                    </span>
                    <h3 className="mt-1 text-[17px] sm:text-[18px] font-bold text-[#0c1e3d] group-hover:text-[#0d9488] transition-colors">
                      {p.title}
                    </h3>
                    <div className="mt-1.5 w-6 h-[2px] rounded-full bg-[#0d9488]/50" />
                    <p className="text-caption mt-2 text-slate-500 max-w-[210px]">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ---------------- BOTTOM FLOATING PILL CARD BANNER ---------------- */}
          <motion.div
            className="mt-10 sm:mt-14 max-w-xl mx-auto rounded-full sm:rounded-[36px] bg-white border border-slate-100 shadow-[0_16px_40px_-12px_rgba(15,35,80,0.08)] py-4 px-6 sm:px-8 flex items-center justify-between gap-5 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Left: Dark squircle badge with cyan sparkle */}
            <div className="flex items-center gap-3">
              {/* Subtle 3x3 Dotted Matrix Accent */}
              <div className="grid grid-cols-3 gap-1 opacity-30 hidden sm:grid">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="w-1 h-1 rounded-full bg-[#0d9488]" />
                ))}
              </div>

              {/* Dark Squircle with Sparkle Star */}
              <div className="w-12 h-12 rounded-2xl bg-[#0c1e3d] flex items-center justify-center text-[#2dd4bf] shadow-md shadow-[#0c1e3d]/30 shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M12 2c.6 4.6 2.4 7.4 7 8-4.6.6-6.4 3.4-7 8-.6-4.6-2.4-7.4-7-8 4.6-.6 6.4-3.4 7-8Z" />
                </svg>
              </div>
            </div>

            {/* Middle: 3-line Copy */}
            <div className="text-left flex-1 leading-tight">
              <div className="text-[14.5px] sm:text-[15.5px] font-bold text-[#0c1e3d]">{html($t("UiUxWhyUs__t13", "Thoughtful design."))}</div>
              <div className="text-[14.5px] sm:text-[15.5px] font-bold text-[#0c1e3d]">{html($t("UiUxWhyUs__t14", "Stronger products."))}</div>
              <div className="text-[14.5px] sm:text-[15.5px] font-bold text-[#0d9488]">{html($t("UiUxWhyUs__t15", "Real growth."))}</div>
            </div>

            {/* Right: Circular Teal Arrow Button */}
            <Link
              href={$t("UiUxWhyUs__t16", "#contact")}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0d9488] text-white flex items-center justify-center shadow-md shadow-teal-500/30 hover:bg-[#0b766c] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
