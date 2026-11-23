"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";

interface SolutionCard {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const solutions: SolutionCard[] = [
  {
    step: "01",
    title: "Custom Web Applications",
    desc: "Powerful, secure and tailored web applications for your business.",
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
    step: "02",
    title: "System Integrations",
    desc: "Seamless integrations with third-party systems, APIs and platforms.",
    icon: (
      // Power Plug
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-5" />
        <path d="M9 8V2" />
        <path d="M15 8V2" />
        <path d="M18 8v5a6 6 0 0 1-12 0V8z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Legacy PHP Modernization",
    desc: "Upgrade, refactor and optimize legacy applications for the future.",
    icon: (
      // Database Cylinders
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Performance Optimization",
    desc: "Speed up, scale up and ensure optimal performance at every level.",
    icon: (
      // Speedometer Gauge
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 12l4-4" />
        <circle cx="12" cy="12" r="2" fill="#0d9488" />
      </svg>
    ),
  },
  {
    step: "05",
    title: "Maintenance & Support",
    desc: "Reliable support and maintenance to keep your application running smoothly.",
    icon: (
      // Headset / Customer Support Agent
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
];

export default function HireCorePhpSolutions() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_55%,#eef4fa_100%)] overflow-hidden font-sans pt-10 sm:pt-14 pb-12 sm:pb-16">
      <Container className="relative z-10 max-w-7xl w-full">
        {/* ---------------- TOP SPLIT: HEADLINE ON LEFT, DEVELOPER IMAGE ON RIGHT ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left: Text & Badges */}
          <div className="lg:col-span-6 text-left">
            {/* Top Tag: BUILT FOR YOUR BUSINESS */}
            <motion.div
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.24em] text-[#0d9488] uppercase">
                BUILT FOR YOUR BUSINESS
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="mt-3 text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-[#0c1e3d]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Whatever Your Challenge,
              <br />
              <span className="text-[#0d9488]">We Have the Solution.</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="mt-4 text-[14px] sm:text-[16px] text-slate-600 leading-relaxed font-normal max-w-lg"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our Core PHP experts build tailored solutions to solve real
              business problems.
            </motion.p>

            {/* Teal Horizontal Divider Accent Line */}
            <motion.div
              className="w-12 h-1 bg-[#0d9488] rounded-full mt-5"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            />
          </div>

          {/* Right: Core PHP Developer at Desk Image (core-php-2.png) */}
          <motion.div
            className="lg:col-span-6 flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-[640px] flex items-center justify-center">
              <Image
                src="/core-php-2.png"
                alt="Core PHP Developer solving complex challenges"
                width={800}
                height={560}
                priority
                className="w-full h-auto object-contain select-none relative z-10 mix-blend-multiply"
                style={{
                  maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, black 65%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, black 65%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                }}
              />

              {/* floating PHP badge */}
              <motion.div
                className="absolute left-[10%] top-[-4%] z-20 w-[74px] h-[44px] rounded-[50%] bg-[linear-gradient(145deg,#6b7bc4,#4a5aa8)] border-2 border-white/80 shadow-[0_12px_22px_-8px_rgba(74,90,168,0.6)] flex items-center justify-center text-white text-[20px] font-black italic tracking-tight"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
              >
                php
              </motion.div>

              {/* floating code tile */}
              <motion.div
                className="absolute left-[2%] top-[22%] z-20 w-[62px] h-[44px] rounded-xl bg-white/90 backdrop-blur border border-white shadow-[0_14px_24px_-10px_rgba(15,35,80,0.3)] flex items-center justify-center text-[#0f6f78] text-[15px] font-bold"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                &lt;/&gt;
              </motion.div>

              {/* floating checklist tile */}
              <motion.div
                className="absolute left-[-2%] top-[40%] z-20 w-[86px] rounded-xl bg-white/90 backdrop-blur border border-white shadow-[0_14px_24px_-10px_rgba(15,35,80,0.3)] p-2.5 space-y-1.5"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
              >
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm bg-[#1aa6a6] shrink-0" />
                    <span className="h-[3px] rounded-full bg-slate-300 flex-1" style={{ maxWidth: 28 + (i % 2) * 14 }} />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ---------------- MIDDLE AREA: 5 FEATURE CARDS CHAIN ---------------- */}
        <div className="relative mt-8 lg:-mt-14 w-full z-10">
          {/* 5 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 relative z-10">
            {solutions.map((item, idx) => {
              const isHovered = hoveredIdx === idx;

              return (
                <motion.div
                  key={item.step}
                  className="relative rounded-3xl bg-white/80 backdrop-blur-md border border-white shadow-[0_12px_32px_-8px_rgba(15,35,80,0.06)] p-6 flex flex-col items-start text-left cursor-pointer group transition-all duration-300"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
                  animate={{
                    y: isHovered ? -8 : 0,
                  }}
                  style={{
                    boxShadow: isHovered
                      ? "0 22px 42px -10px rgba(13,148,136,0.2), 0 4px 12px rgba(15,35,80,0.06)"
                      : "0 12px 32px -8px rgba(15,35,80,0.06)",
                    borderColor: isHovered
                      ? "rgba(45,212,191,0.6)"
                      : "rgba(241,245,249,0.9)",
                  }}
                >
                  {/* connector to the next card */}
                  {idx < solutions.length - 1 && (
                    <div className="hidden lg:block absolute top-[52px] left-full w-5 h-px bg-gradient-to-r from-teal-300/70 to-teal-300/70">
                      <span className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-[7px] h-[7px] rounded-full bg-white border border-teal-400 shadow-[0_0_0_3px_rgba(45,212,191,0.2)]" />
                    </div>
                  )}

                  {/* Top Glass Icon Badge */}
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-white border border-slate-200/70 shadow-[0_8px_18px_-6px_rgba(15,35,80,0.12)] flex items-center justify-center mb-5 mx-auto shrink-0 transition-all duration-300 group-hover:border-teal-300 group-hover:shadow-[0_10px_20px_rgba(13,148,136,0.22)] [&_svg]:w-7 [&_svg]:h-7"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Step Number */}
                  <span className="text-[13px] font-bold text-[#1aa6a6]/60 mb-1">
                    {item.step}
                  </span>

                  {/* Card Title */}
                  <h3 className="text-[15.5px] sm:text-[16.5px] font-bold text-[#0c1e3d] group-hover:text-[#0d9488] transition-colors leading-tight">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="mt-2.5 text-[12px] sm:text-[12.5px] text-slate-500 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ---------------- BOTTOM FLOATING ACTION BAR ---------------- */}
        <motion.div
          className="mt-8 w-full rounded-2xl sm:rounded-3xl bg-white border border-slate-100/90 shadow-[0_16px_40px_-12px_rgba(15,35,80,0.08)] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Left: Concentric Radar Icon + Copy */}
          <div className="flex items-center gap-4">
            {/* Concentric Circular Radar Graphic */}
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <span className="absolute w-12 h-12 rounded-full border border-teal-200/60 animate-ping opacity-25" />
              <span className="absolute w-11 h-11 rounded-full border border-teal-200/80" />
              <span className="absolute w-8 h-8 rounded-full border border-teal-300/70" />
              <span className="w-4 h-4 rounded-full bg-[#0d9488] shadow-[0_0_12px_rgba(13,148,136,0.8)]" />
            </div>

            {/* Text Copy */}
            <div className="text-left leading-snug">
              <div className="text-[15px] sm:text-[16.5px] font-bold text-[#0c1e3d]">
                Your challenges.
              </div>
              <div className="text-[15px] sm:text-[16.5px] font-bold">
                <span className="text-[#0d9488]">Our expertise. </span>
                <span className="text-[#0c1e3d]">Real results.</span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3.5 flex-wrap justify-center">
            {/* Dark Navy Button: Hire Core PHP Developers → */}
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-[#061325] text-white text-[13px] sm:text-[13.5px] font-bold hover:bg-[#0f2340] active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <span>Hire Core PHP Developers</span>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            {/* White Outlined Button: Talk to an Expert 💬 */}
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 text-[#0d9488] text-[13px] sm:text-[13.5px] font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <span>Talk to an Expert</span>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-[#0d9488]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
