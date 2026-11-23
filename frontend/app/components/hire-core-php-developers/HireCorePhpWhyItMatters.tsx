"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";

interface FeatureCard {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const features: FeatureCard[] = [
  {
    id: "secure",
    title: "Secure",
    desc: "Security-first applications built to protect your data and your users.",
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
    title: "High Performance",
    desc: "Optimized code and architecture for speed, stability and scale.",
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
    id: "custom",
    title: "Custom Built",
    desc: "Tailored solutions built around your business goals and workflows.",
    icon: (
      // Puzzle Piece
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.439 7.85c0-1.571-1.274-2.85-2.846-2.85H15V3.5A1.5 1.5 0 0 0 13.5 2h-3A1.5 1.5 0 0 0 9 3.5V5H7.407C5.835 5 4.561 6.279 4.561 7.85v2.15H6.5A1.5 1.5 0 0 1 8 11.5v3A1.5 1.5 0 0 1 6.5 16H4.56v2.15c0 1.571 1.274 2.85 2.847 2.85H9v1.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V21h1.593c1.572 0 2.846-1.279 2.846-2.85V16h1.5a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-1.5V7.85z" />
      </svg>
    ),
  },
  {
    id: "scalable",
    title: "Scalable",
    desc: "Built to grow with your business without limits or rework.",
    icon: (
      // 4-Way Expand Arrows
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <polyline points="21 15 21 21 15 21" />
        <polyline points="3 9 3 3 9 3" />
      </svg>
    ),
  },
  {
    id: "support",
    title: "Reliable Support",
    desc: "Ongoing maintenance and support whenever you need us.",
    icon: (
      // Headset / Customer Support Agent
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
];

export default function HireCorePhpWhyItMatters() {
  return (
    <section id="why-it-matters" className="relative w-full overflow-hidden font-sans bg-[linear-gradient(180deg,#f7fafc_0%,#f2f6fa_60%,#edf2f7_100%)] py-12 sm:py-16">
      <Container className="relative z-10 max-w-6xl">
        {/* ---------------- HEADER ---------------- */}
        <motion.div
          className="text-center max-w-3xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[11px] font-bold tracking-[0.26em] text-[#0f8a83] uppercase">Why It Matters</div>
          <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-[#0f8a83]" />
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.08] text-[#0c1e3d]">
            Powerful Applications.
            <br />
            <span className="bg-gradient-to-r from-[#0f8a83] to-[#1aa6a6] bg-clip-text text-transparent">Real Business Impact.</span>
          </h2>
          <p className="mt-5 text-[14.5px] sm:text-[15.5px] text-slate-600 leading-relaxed">
            Our Core PHP solutions are built to perform,
            <br className="hidden sm:inline" /> scale and drive measurable results for your business.
          </p>
          <motion.div
            className="mt-5 mx-auto h-[2px] rounded-full bg-[#0f8a83]"
            initial={{ width: 0 }}
            whileInView={{ width: 28 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        {/* ---------------- FEATURE CARDS ---------------- */}
        <div className="relative mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              className="relative group rounded-3xl bg-white/70 backdrop-blur border border-white shadow-[0_18px_40px_-20px_rgba(15,35,80,0.18)] px-5 pt-7 pb-8 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              {/* hexagon icon */}
              <div className="relative w-[78px] h-[88px] flex items-center justify-center">
                <svg viewBox="0 0 78 88" className="absolute inset-0 w-full h-full drop-shadow-[0_10px_16px_rgba(15,35,80,0.1)]" fill="none">
                  <polygon points="39 4, 73 23, 73 65, 39 84, 5 65, 5 23" fill="#ffffff" stroke="#e1ecf3" strokeWidth="5" strokeLinejoin="round" />
                  <polygon points="39 4, 73 23, 73 65, 39 84, 5 65, 5 23" fill="none" stroke="#cfe0ea" strokeWidth="0.8" strokeLinejoin="round" />
                </svg>
                <motion.span
                  className="relative text-[#0f6f78] [&_svg]:w-7 [&_svg]:h-7 [&_svg]:text-[#0f6f78]"
                  animate={{ y: [0, -2.5, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  {f.icon}
                </motion.span>
              </div>

              {/* connector to the next card */}
              {i < features.length - 1 && (
                <div className="hidden lg:block absolute top-[68px] left-[calc(50%+46px)] w-[calc(100%-92px+20px)] h-px">
                  <div className="relative w-full h-px bg-gradient-to-r from-transparent via-teal-300/60 to-transparent overflow-hidden">
                    <motion.span
                      className="absolute top-0 h-px w-10 bg-gradient-to-r from-transparent via-teal-500 to-transparent"
                      animate={{ left: ["-20%", "110%"] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: i * 0.45 }}
                    />
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-[7px] h-[7px] rounded-full bg-white border border-teal-400 shadow-[0_0_0_3px_rgba(45,212,191,0.2)]" />
                </div>
              )}

              <h3 className="mt-9 text-[15px] font-bold text-[#0c1e3d] group-hover:text-[#0f8a83] transition-colors">{f.title}</h3>
              <span className="mt-3 w-5 h-[2px] rounded-full bg-[#1aa6a6]" />
              <p className="mt-4 text-[12px] text-slate-500 leading-relaxed max-w-[170px]">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ---------------- DARK CTA BANNER ---------------- */}
        <motion.div
          className="relative mt-10 rounded-2xl bg-[linear-gradient(100deg,#0a1a33_0%,#0c2240_60%,#0b1d38_100%)] px-6 sm:px-9 py-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_24px_50px_-20px_rgba(10,26,51,0.7)] overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />

          <div className="relative flex items-center gap-5 lg:pr-8 lg:border-r border-white/10 flex-1">
            <motion.span
              className="w-[50px] h-[50px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#2cc4c4,#0e7a86)] flex items-center justify-center text-white shadow-[0_0_24px_rgba(45,212,191,0.45)] shrink-0"
              animate={{ boxShadow: ["0 0 14px rgba(45,212,191,0.35)", "0 0 28px rgba(45,212,191,0.6)", "0 0 14px rgba(45,212,191,0.35)"] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.span>
            <div className="text-left text-[19px] font-semibold leading-snug text-white">
              Let&apos;s build something
              <br />
              <span className="text-[#3fd6cf]">powerful</span> together.
            </div>
          </div>

          <div className="relative flex items-center gap-4 flex-wrap justify-center">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 h-[48px] px-8 rounded-lg bg-white text-[#0f6f78] text-[13.5px] font-semibold shadow-lg hover:shadow-xl transition whitespace-nowrap"
            >
              Hire Core PHP Developers
              <svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 h-[48px] px-7 rounded-lg border border-white/25 text-white text-[13.5px] font-medium hover:bg-white/10 transition whitespace-nowrap"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
              Talk to an Expert
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
