"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import Link from "next/link";
import { html, rich } from "@/components/cms/rich";

// Helper for sequential animations
const drawVariants: any = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.2, type: "spring", duration: 1.5, bounce: 0 },
      opacity: { delay: i * 0.2, duration: 0.1 }
    }
  })
};

// --- Process Cards Data & SVGs ---
const processSteps__cms = [
  {
    num: "01",
    title: "Research & Audit",
    desc: "We analyze your website, competitors, keywords & market to find high-impact opportunities.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
    bottomLabel: "In-depth Analysis",
    bottomPoints: ["Website Audit", "Competitor Analysis", "Keyword Research", "Gap Identification"],
    graphic: (
      <motion.svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        {/* Donut Chart Background */}
        <circle cx="50" cy="50" r="36" fill="none" stroke="#e2e8f0" strokeWidth="16" />
        {/* Animated Segments */}
        <motion.circle cx="50" cy="50" r="36" fill="none" stroke="#0f5c56" strokeWidth="16" strokeDasharray="226" transform="rotate(-90 50 50)"
          initial={{ strokeDashoffset: 226 }} whileInView={{ strokeDashoffset: 100 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} viewport={{ once: true }} />
        <motion.circle cx="50" cy="50" r="36" fill="none" stroke="#14b8a6" strokeWidth="16" strokeDasharray="226" transform="rotate(45 50 50)"
          initial={{ strokeDashoffset: 226 }} whileInView={{ strokeDashoffset: 160 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }} viewport={{ once: true }} />
      </motion.svg>
    )
  },
  {
    num: "02",
    title: "Strategy & Planning",
    desc: "We create a custom SEO roadmap aligned with your business goals and target audience.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
      </svg>
    ),
    bottomLabel: "Your SEO Roadmap",
    bottomPoints: ["On-Page SEO", "Content Strategy", "Technical SEO", "Link Building"],
    graphic: (
      <motion.svg viewBox="0 0 120 80" className="w-32 h-20 drop-shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        {/* Gantt Chart lines */}
        <line x1="40" y1="10" x2="120" y2="10" stroke="#f1f5f9" strokeWidth="1" />
        <line x1="40" y1="30" x2="120" y2="30" stroke="#f1f5f9" strokeWidth="1" />
        <line x1="40" y1="50" x2="120" y2="50" stroke="#f1f5f9" strokeWidth="1" />
        <line x1="40" y1="70" x2="120" y2="70" stroke="#f1f5f9" strokeWidth="1" />
        {/* Animated Bars */}
        <motion.rect x="45" y="5" height="10" rx="2" fill="#0f5c56" initial={{ width: 0 }} whileInView={{ width: 25 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} />
        <motion.rect x="60" y="25" height="10" rx="2" fill="#14b8a6" initial={{ width: 0 }} whileInView={{ width: 30 }} transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true }} />
        <motion.rect x="80" y="45" height="10" rx="2" fill="#5eead4" initial={{ width: 0 }} whileInView={{ width: 20 }} transition={{ duration: 0.8, delay: 0.8 }} viewport={{ once: true }} />
        <motion.rect x="90" y="65" height="10" rx="2" fill="#99f6e4" initial={{ width: 0 }} whileInView={{ width: 25 }} transition={{ duration: 0.8, delay: 1.1 }} viewport={{ once: true }} />
        
        {/* Labels */}
        <text x="5" y="13" fontSize="8" fill="#64748b" fontWeight="500">Wk 1</text>
        <text x="5" y="33" fontSize="8" fill="#64748b" fontWeight="500">Wk 2</text>
        <text x="5" y="53" fontSize="8" fill="#64748b" fontWeight="500">Wk 3</text>
        <text x="5" y="73" fontSize="8" fill="#64748b" fontWeight="500">Wk 4</text>
      </motion.svg>
    )
  },
  {
    num: "03",
    title: "Optimize & Create",
    desc: "We optimize your website and create high-quality, SEO-friendly content that ranks and converts.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
        <circle cx="15" cy="15" r="3" />
        <path d="M15 12v1" />
        <path d="M15 17v1" />
      </svg>
    ),
    bottomLabel: "We Focus On",
    bottomPoints: ["On-Page Optimization", "Technical Optimization", "Content Creation", "UX & Speed Optimization"],
    graphic: (
      <motion.svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        <motion.rect x="10" y="10" width="80" height="80" rx="6" fill="#fff" stroke="#e2e8f0" strokeWidth="2" custom={0} variants={drawVariants} />
        <motion.rect x="10" y="10" width="80" height="16" fill="#f1f5f9" rx="6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} viewport={{ once: true }} />
        <motion.circle cx="20" cy="18" r="3" fill="#cbd5e1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} viewport={{ once: true }} />
        <motion.circle cx="30" cy="18" r="3" fill="#cbd5e1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }} viewport={{ once: true }} />
        <motion.circle cx="40" cy="18" r="3" fill="#cbd5e1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }} viewport={{ once: true }} />
        
        <motion.rect x="20" y="35" width="40" height="6" rx="2" fill="#94a3b8" initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: 0.9 }} viewport={{ once: true }} />
        <motion.rect x="20" y="45" width="60" height="4" rx="2" fill="#cbd5e1" initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: 1.0 }} viewport={{ once: true }} />
        <motion.rect x="20" y="53" width="55" height="4" rx="2" fill="#cbd5e1" initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: 1.1 }} viewport={{ once: true }} />
        
        <motion.rect x="20" y="65" width="25" height="15" rx="3" fill="#14b8a6" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", delay: 1.3 }} viewport={{ once: true }} />
        <motion.rect x="50" y="65" width="30" height="15" rx="3" fill="#ccfbf1" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", delay: 1.4 }} viewport={{ once: true }} />
      </motion.svg>
    )
  },
  {
    num: "04",
    title: "Build Authority",
    desc: "We build quality backlinks and strengthen your online authority to outrank competitors.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    bottomLabel: "Authority Building",
    bottomPoints: ["High Quality Backlinks", "Digital PR", "Brand Mentions", "Local Citations"],
    graphic: (
      <motion.svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        {/* Animated Connections */}
        <motion.path d="M 20 50 C 40 50, 40 20, 60 20" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" custom={1} variants={drawVariants} />
        <motion.path d="M 20 50 C 40 50, 40 50, 60 50" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" custom={2} variants={drawVariants} />
        <motion.path d="M 20 50 C 40 50, 40 80, 60 80" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" custom={3} variants={drawVariants} />
        
        {/* Nodes */}
        <motion.g initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} viewport={{ once: true }}>
          <circle cx="20" cy="50" r="12" fill="#0f5c56" />
          <svg x="14" y="44" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </motion.g>

        <motion.g initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} viewport={{ once: true }}>
          <rect x="60" y="10" width="30" height="20" rx="4" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="70" cy="20" r="4" fill="#14b8a6" />
          <rect x="78" y="18" width="8" height="4" rx="1" fill="#cbd5e1" />
        </motion.g>

        <motion.g initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} viewport={{ once: true }}>
          <rect x="60" y="40" width="30" height="20" rx="4" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="70" cy="50" r="4" fill="#14b8a6" />
          <rect x="78" y="48" width="8" height="4" rx="1" fill="#cbd5e1" />
        </motion.g>

        <motion.g initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} viewport={{ once: true }}>
          <rect x="60" y="70" width="30" height="20" rx="4" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="70" cy="80" r="4" fill="#14b8a6" />
          <rect x="78" y="78" width="8" height="4" rx="1" fill="#cbd5e1" />
        </motion.g>
      </motion.svg>
    )
  }
];

export default function SeoProcess() {
  const $t = useCmsText();
  const processSteps = useCmsData("SeoProcess__processSteps", processSteps__cms);
  return (
    <section className="relative pt-20 pb-10 lg:pt-24 lg:pb-12 bg-white overflow-hidden">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-teal-600/30" />
            <span className="text-[10px] lg:text-[11px] font-bold tracking-[0.15em] text-teal-800 uppercase flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              {html($t("SeoProcess__t1", "OUR PROVEN SEO PROCESS"))}</span>
            <div className="w-12 h-px bg-teal-600/30" />
          </div>
          <h2 className="text-h2 font-serif font-bold mb-5 text-[#132a43]">
            {html($t("SeoProcess__t2", "A Strategy. A Process."))}<br/>
            <span className="text-[#0f5c56]">{html($t("SeoProcess__t3", "Real, Measurable Results"))}<span className="text-amber-400">.</span></span>
          </h2>
          <p className="text-body text-slate-500">
            {rich($t("SeoProcess__t4", "We follow a data-driven SEO process built around your business goals to deliver consistent visibility and long-term growth."))}</p>
        </div>

        {/* Process Cards Row */}
        <div className="relative mb-16">
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-2 xl:gap-3">
            {processSteps.map((step, index) => (
              <React.Fragment key={step.num}>
                <div className="flex-1 bg-white rounded-2xl p-4 xl:p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col relative z-10 group hover:shadow-[0_8px_30px_rgba(15,92,86,0.08)] transition-shadow duration-300">
                  {/* Top Part */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative w-12 h-12 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0f5c56] shadow-sm">
                      {step.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-[#0f5c56] font-bold text-lg leading-none mb-1">{step.num}</div>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-[#132a43] text-lg mb-2 leading-tight pr-4">
                    {step.title}
                  </h3>
                  <p className="text-small text-slate-500 mb-6">
                    {step.desc}
                  </p>

                  {/* Bottom Graphic Area */}
                  <div className="mt-auto bg-slate-50/50 rounded-xl p-4 border border-slate-100/50 flex flex-col min-h-[160px] relative overflow-hidden">
                    <div className="text-[11px] font-bold text-slate-700 mb-3 relative z-10">{step.bottomLabel}</div>
                    
                    <div className="flex flex-row justify-between items-start gap-2 relative z-10 h-full">
                      {step.bottomPoints.length > 0 && (
                        <div className="flex flex-col gap-2 pb-1 relative z-10">
                          {step.bottomPoints.map((point, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="w-3.5 h-3.5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                              <span className="text-[10px] font-medium text-slate-600 max-w-[110px]">{point}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* The Graphic */}
                    <div className="absolute right-2 bottom-2 z-0">
                      {step.graphic}
                    </div>
                  </div>
                </div>

                {/* Connecting Arrow (Desktop only) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:flex flex-col justify-center items-center shrink-0 w-2 xl:w-3 z-0 relative">
                    <div className="w-5 h-5 xl:w-7 xl:h-7 rounded-full bg-[#0f5c56] flex items-center justify-center text-white shadow-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom Benefits Row */}
        <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap items-center justify-between gap-6 lg:gap-8 bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm">
          
          <div className="flex items-center gap-4 flex-1 min-w-[200px]">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-[#0f5c56] shrink-0 border border-slate-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#132a43] mb-0.5">{html($t("SeoProcess__t5", "Data-Driven Decisions"))}</div>
              <div className="text-[11px] text-slate-500 leading-snug">{html($t("SeoProcess__t6", "Every action backed by data, not guesswork."))}</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-slate-100 shrink-0" />

          <div className="flex items-center gap-4 flex-1 min-w-[200px]">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-[#0f5c56] shrink-0 border border-slate-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#132a43] mb-0.5">{html($t("SeoProcess__t7", "Transparent Reporting"))}</div>
              <div className="text-[11px] text-slate-500 leading-snug">{html($t("SeoProcess__t8", "Clear reports that show what matters most."))}</div>
            </div>
          </div>

          <div className="hidden lg:block w-px h-10 bg-slate-100 shrink-0" />

          <div className="flex items-center gap-4 flex-1 min-w-[200px]">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-[#0f5c56] shrink-0 border border-slate-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#132a43] mb-0.5">{html($t("SeoProcess__t9", "Ethical & White-Hat SEO"))}</div>
              <div className="text-[11px] text-slate-500 leading-snug">{html($t("SeoProcess__t10", "Safe, sustainable & Google-approved strategies."))}</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-slate-100 shrink-0" />

          <div className="flex items-center gap-4 flex-1 min-w-[200px]">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-[#0f5c56] shrink-0 border border-slate-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#132a43] mb-0.5">{html($t("SeoProcess__t11", "Continuous Improvement"))}</div>
              <div className="text-[11px] text-slate-500 leading-snug">{html($t("SeoProcess__t12", "We adapt, optimize & scale as you grow."))}</div>
            </div>
          </div>

        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 bg-[#09222b] rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden border border-[#1a3844] shadow-2xl">
          {/* Background Elements */}
          <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <path d="M-50 250 C 50 200, 100 150, 150 50" stroke="#14b8a6" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M-50 270 C 60 220, 120 170, 170 60" stroke="#14b8a6" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M-50 290 C 70 240, 140 190, 190 70" stroke="#14b8a6" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>
          <div className="absolute right-0 top-0 opacity-20 pointer-events-none">
            <svg width="300" height="200" viewBox="0 0 300 200" fill="none">
              <path d="M0 180 L 80 150 L 150 120 L 220 70 L 280 20" stroke="#14b8a6" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="80" cy="150" r="4" fill="#09222b" stroke="#14b8a6" strokeWidth="2" />
              <circle cx="150" cy="120" r="4" fill="#09222b" stroke="#14b8a6" strokeWidth="2" />
              <circle cx="220" cy="70" r="4" fill="#09222b" stroke="#14b8a6" strokeWidth="2" />
              <path d="M 280 20 L 280 10 L 300 15 L 280 20" fill="#14b8a6" />
            </svg>
          </div>

          {/* Left Content */}
          <div className="flex items-center gap-6 relative z-10 lg:w-1/2">
            <div className="w-20 h-20 rounded-full border border-teal-500/30 flex items-center justify-center bg-[#0d2e3a] shrink-0 shadow-[0_0_20px_rgba(20,184,166,0.15)] relative">
              {/* Inner glowing circle */}
              <div className="absolute inset-2 rounded-full border border-teal-400/20" />
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" fill="#fbbf24" />
                <polygon points="12 4.5 13.5 7.5 16.5 7.5 14 9.5 15 12.5 12 10.5 9 12.5 10 9.5 7.5 7.5 10.5 7.5" fill="#fff" stroke="#fff" strokeWidth="1" />
              </svg>
            </div>
            <div>
              <h3 className="text-h5 font-serif font-bold text-white mb-1">{rich($t("SeoProcess__t13m", "A Process That Drives<br><span class=\"text-[#14b8a6]\">Visibility. Traffic. </span><span class=\"text-amber-400\">Revenue.</span>"))}</h3>
              <p className="text-small text-slate-300">
                {rich($t("SeoProcess__t16", "Let's build your growth story together."))}</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-24 bg-slate-700 shrink-0 z-10" />

          {/* Right Content */}
          <div className="flex flex-col gap-4 relative z-10 lg:w-1/2 lg:items-start pl-0 lg:pl-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <Link href={$t("SeoProcess__u2", "/contact")} className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-[#132a43] font-bold text-[14px] rounded-lg transition-colors flex items-center justify-center gap-2">
                {$t("SeoProcess__t17", "Get My Free SEO Strategy")}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link href={$t("SeoProcess__u1", "/contact")} className="w-full sm:w-auto px-6 py-3.5 border border-slate-600 hover:border-slate-400 text-white font-medium text-[14px] rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {$t("SeoProcess__t18", "Schedule a Call")}</Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full border border-teal-500/50 flex items-center justify-center text-teal-400">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                {html($t("SeoProcess__t19", "Free SEO Audit"))}</div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full border border-teal-500/50 flex items-center justify-center text-teal-400">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                {html($t("SeoProcess__t20", "No Obligation"))}</div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full border border-teal-500/50 flex items-center justify-center text-teal-400">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                {html($t("SeoProcess__t21", "100% Confidential"))}</div>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
