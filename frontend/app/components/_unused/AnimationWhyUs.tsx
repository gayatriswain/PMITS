"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "../shared/Container";

const stats = [
  { value: "500+", label: "Creative Projects Delivered" },
  { value: "60 FPS", label: "Ultra-Fluid Easing & Physics" },
  { value: "98.8%", label: "Client Satisfaction Rating" },
  { value: "48-72h", label: "Initial Styleframe Turnaround" },
];

const pillars = [
  {
    title: "Conversion-Focused Storytelling",
    desc: "We don't just make things move; we animate with psychological hooks, visual pacing, and clear messaging that guides viewers toward action.",
    icon: (
      <svg className="w-6 h-6 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Dedicated Art Direction",
    desc: "Every project is paired with an experienced Art Director ensuring brand cohesion, color harmony, and cinematic lighting from start to finish.",
    icon: (
      <svg className="w-6 h-6 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: "Multi-Platform Master Exports",
    desc: "Delivered ready-to-publish for web, social media, broadcast, and print (16:9 widescreen, 9:16 vertical reels, 1:1 square, Lottie JSON, vector SVG).",
    icon: (
      <svg className="w-6 h-6 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
  },
  {
    title: "Full Source File Ownership",
    desc: "You retain 100% intellectual property rights, including open source Blender/Cinema 4D project archives, vector assets, and layered Photoshop/Illustrator files.",
    icon: (
      <svg className="w-6 h-6 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
];

export default function AnimationWhyUs() {
  return (
    <section className="relative w-full bg-white py-20 sm:py-28 overflow-hidden">
      <Container className="relative z-10">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-[11px] font-bold tracking-widest text-[#0d9488] uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
            THE PROMANAGE DIFFERENCE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Why Forward-Thinking Brands Choose Us for <br />
            <span className="text-[#0d9488]">Animation &amp; Design</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            We bridge the gap between jaw-dropping aesthetics and measurable business performance.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {pillars.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-50 rounded-3xl p-7 border border-slate-100 hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100/80 flex items-center justify-center mb-6">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug mb-3">
                {p.title}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Highlight Stats Bar */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0a232e] via-[#0d3b45] to-[#12283a] p-8 sm:p-12 text-white shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {stats.map((s, i) => (
              <div key={i} className={`flex flex-col items-center justify-center ${i > 0 ? "pt-6 lg:pt-0" : ""}`}>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-200 tracking-tight mb-2">
                  {s.value}
                </span>
                <span className="text-xs sm:text-sm text-slate-300 font-medium">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
