"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DM_Serif_Display } from "next/font/google";
import Container from "../shared/Container";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const cards = [
  {
    num: "01",
    title: "Understand",
    sub: "Your goals & vision",
    icon: (
      // Magnifying glass icon in glass circle
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(45,212,191,0.2)]">
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
    ),
    // Desktop positioning coordinates aligned with Orb 1
    orb: { x: 39.7, y: 62.8 },
  },
  {
    num: "02",
    title: "Explore",
    sub: "Ideas & possibilities",
    icon: (
      // Wireframe cards mockup
      <div className="w-full h-14 sm:h-16 rounded-xl bg-slate-900/80 border border-cyan-500/20 p-2 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="w-8 h-1.5 rounded bg-cyan-400/50" />
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-6 rounded bg-cyan-500/10 border border-cyan-500/20" />
          <div className="h-6 rounded bg-slate-800" />
        </div>
      </div>
    ),
    // Desktop positioning coordinates aligned with Orb 2
    orb: { x: 53.8, y: 51.8 },
  },
  {
    num: "03",
    title: "Design",
    sub: "Beautiful, intuitive experiences",
    icon: (
      // Mobile screen mockup
      <div className="w-full h-14 sm:h-16 rounded-xl bg-slate-900/80 border border-cyan-500/20 p-2 flex items-center justify-between gap-2">
        <div className="w-8 h-full rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center">
          <span className="w-3 h-3 rounded-full bg-cyan-400" />
        </div>
        <div className="flex-1 space-y-1">
          <span className="block w-full h-1.5 rounded bg-slate-400" />
          <span className="block w-2/3 h-1.5 rounded bg-cyan-400/60" />
          <span className="block w-1/2 h-1.5 rounded bg-slate-600" />
        </div>
      </div>
    ),
    // Desktop positioning coordinates aligned with Orb 3
    orb: { x: 64.0, y: 40.6 },
  },
  {
    num: "04",
    title: "Deliver",
    sub: "Real business impact",
    icon: (
      // Growth trendline chart
      <div className="w-full h-14 sm:h-16 rounded-xl bg-slate-900/80 border border-cyan-500/20 p-2 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-cyan-300">Conversion</span>
          <span className="text-[10px] font-black text-emerald-400">+68%</span>
        </div>
        <svg viewBox="0 0 60 20" className="w-full h-6 text-cyan-400">
          <path d="M0 18 L15 12 L30 14 L45 5 L60 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="60" cy="2" r="2.5" fill="#2dd4bf" />
        </svg>
      </div>
    ),
    // Desktop positioning coordinates aligned with Orb 4 (near doorway)
    orb: { x: 71.7, y: 38.3 },
  },
];

/** Mimics `object-cover` for the 1802×873 artwork so % coordinates land on the same pixels as the image. */
const coverBox: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
  width: "max(100cqw, calc(100cqh * 1802 / 873))",
  aspectRatio: "1802 / 873",
  transform: "translate(-50%, -50%)",
};

const trustBadges = [
  {
    title: "Quick",
    sub: "Response",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400" fill="currentColor">
        <path d="M13 2 4 14h7l-1 8 9-12h-7Z" />
      </svg>
    ),
  },
  {
    title: "100%",
    sub: "Confidential",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Real Experts,",
    sub: "Real Solutions",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function UiUxContactCTA() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative w-full min-h-[920px] lg:min-h-[1100px] bg-[#050b18] overflow-hidden font-sans pt-12 pb-16 sm:pt-14 sm:pb-24 flex flex-col justify-between">
      {/* ---------------- BACKGROUND IMAGE (uiux.webp) ---------------- */}
      <div className="absolute inset-0 z-0 overflow-hidden [container-type:size]">
        <div style={coverBox}>
          <Image
            src="/uiux.webp"
            alt="ProManage UI/UX Pathway"
            fill
            priority
            sizes="100vw"
            className="object-cover select-none"
          />
        </div>
        {/* Soft dark vignette on edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b18] via-transparent to-[#050b18]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050b18]/80 via-transparent to-[#050b18]/50 pointer-events-none" />
      </div>

      {/* ---------------- 4 POINT CARDS — anchored on the glowing orbs in the image ---------------- */}
      <div className="pointer-events-none absolute inset-0 z-[5] hidden overflow-hidden xl:block [container-type:size]">
        <div style={coverBox}>
          {cards.map((c, idx) => (
            <div
              key={c.num}
              className="absolute"
              style={{ left: `${c.orb.x}%`, top: `${c.orb.y}%`, zIndex: idx + 1 }}
            >
              {/* pulse ring on the orb */}
              <span className="absolute left-0 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-cyan-300/60" style={{ animationDelay: `${idx * 0.6}s`, animationDuration: "2.6s" }} />
              {/* anchor stem down to the orb */}
              <motion.span
                className="absolute bottom-[8px] left-0 h-[34px] w-px origin-bottom -translate-x-1/2 bg-gradient-to-t from-cyan-300 to-cyan-400/10"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.15 }}
              />
              <motion.div
                className="pointer-events-auto absolute bottom-[40px] left-0 w-[170px] -translate-x-1/2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
              >
                <motion.div
                  className="group cursor-pointer rounded-2xl border border-cyan-400/35 bg-[#09152e]/75 p-3 shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(45,212,191,0.18)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(45,212,191,0.35)]"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4 + idx * 0.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-[14px] font-bold text-cyan-300">{c.num}</span>
                    <span className="text-[13.5px] font-bold text-white transition-colors group-hover:text-cyan-200">{c.title}</span>
                  </div>
                  <div className="mt-0.5 text-[10.5px] leading-tight text-slate-300">{c.sub}</div>
                  <div className="mt-2.5">{c.icon}</div>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <Container className="relative z-10 max-w-7xl w-full flex-1 flex flex-col justify-between">
        {/* ---------------- TOP CONTENT & FLOATING CARDS AREA ---------------- */}
        <div className="relative min-h-[500px] lg:min-h-[560px]">
          {/* Top-Left Header Content */}
          <div className="max-w-xl text-left">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2.5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-8 h-px bg-cyan-400/60" />
              <span className="text-[11px] font-bold tracking-[0.25em] text-cyan-300 uppercase">
                LET&apos;S START A CONVERSATION
              </span>
              <span className="w-8 h-px bg-cyan-400/60" />
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              className="mt-5 text-4xl sm:text-6xl lg:text-[56px] font-normal tracking-tight leading-[1.05] text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className={`${dmSerif.className} block`}>Have a project</span>
              <span className={`${dmSerif.className} block`}>in mind?</span>
              <span className={`${dmSerif.className} block italic text-[#2dd4bf]`}>
                It starts here.
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="mt-4 text-[15px] sm:text-[16px] text-slate-300 leading-relaxed max-w-md font-normal"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Share your idea and let&apos;s turn it into an exceptional{" "}
              <strong className="text-white font-semibold">digital experience.</strong>
            </motion.p>

            {/* 3 Trust Badges */}
            <motion.div
              className="mt-6 flex items-center gap-6 sm:gap-8 flex-wrap"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {trustBadges.map((tb) => (
                <div key={tb.title} className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                    {tb.icon}
                  </span>
                  <div className="leading-tight text-left">
                    <div className="text-[12px] font-bold text-white">{tb.title}</div>
                    <div className="text-[11px] text-slate-400">{tb.sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mobile / Tablet View for 4 Cards */}
          <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {cards.map((c) => (
              <div
                key={c.num}
                className="rounded-2xl bg-[#09152e]/80 backdrop-blur-md border border-cyan-400/30 p-4 shadow-lg text-left"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-cyan-300">{c.num}</span>
                  <span className="text-sm font-bold text-white">{c.title}</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">{c.sub}</div>
                <div className="mt-3">{c.icon}</div>
              </div>
            ))}
          </div>

          {/* Far Right Elegant Quote */}
          <div className="absolute right-2 bottom-12 text-right hidden xl:block pointer-events-none opacity-80">
            <p className={`${dmSerif.className} text-[15px] italic text-slate-300 leading-snug`}>
              Great
              <br />
              products
              <br />
              begin with
              <br />
              a simple
              <br />
              conversation.
            </p>
          </div>
        </div>

        {/* ---------------- BOTTOM FLOATING CONTACT BAR (GLASSMORPHISM CARD) ---------------- */}
        <motion.div
          className="relative mt-12 rounded-[28px] sm:rounded-[36px] bg-[#071329]/80 backdrop-blur-xl border border-cyan-500/35 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(45,212,191,0.18)] p-5 sm:p-7"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {sent ? (
            <div className="py-6 text-center">
              <span className="inline-flex w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 items-center justify-center text-2xl shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                ✓
              </span>
              <h3 className={`${dmSerif.className} mt-3 text-2xl text-white font-normal`}>
                Thank you! We&apos;ve received your project details.
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                Our design experts will reach out within 24 hours to schedule your consultation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left Brand Element: Glowing 3D Speech Bubble with "P" */}
              <div className="flex items-center gap-4 shrink-0 w-full lg:w-auto">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-cyan-400/25 via-slate-900 to-[#071329] border border-cyan-400 shadow-[0_0_25px_rgba(45,212,191,0.35)] flex items-center justify-center shrink-0">
                  <span className={`${dmSerif.className} text-2xl sm:text-3xl font-extrabold text-[#2dd4bf] drop-shadow-[0_0_10px_#2dd4bf]`}>
                    P
                  </span>
                </div>
                <div className="text-left leading-tight">
                  <div className={`${dmSerif.className} text-xl sm:text-2xl text-white font-normal`}>
                    Tell us about
                  </div>
                  <div className={`${dmSerif.className} text-xl sm:text-2xl text-[#2dd4bf] font-normal`}>
                    your project
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">
                    We&apos;ll get back to you within <strong className="text-white">24 hours.</strong>
                  </div>
                </div>
              </div>

              {/* Right Form Fields */}
              <div className="flex-1 w-full space-y-3">
                {/* Top Row: 3 Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Your Name */}
                  <label className="flex items-center gap-2.5 h-11 rounded-xl bg-slate-950/60 border border-slate-700/80 px-3.5 text-slate-400 focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400 transition-all">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent text-[12.5px] text-white placeholder:text-slate-400 outline-none"
                    />
                  </label>

                  {/* Work Email */}
                  <label className="flex items-center gap-2.5 h-11 rounded-xl bg-slate-950/60 border border-slate-700/80 px-3.5 text-slate-400 focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400 transition-all">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                    <input
                      type="email"
                      required
                      placeholder="Work Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent text-[12.5px] text-white placeholder:text-slate-400 outline-none"
                    />
                  </label>

                  {/* Company */}
                  <label className="flex items-center gap-2.5 h-11 rounded-xl bg-slate-950/60 border border-slate-700/80 px-3.5 text-slate-400 focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400 transition-all">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="4" y="2" width="16" height="20" rx="2" />
                      <line x1="9" y1="6" x2="9" y2="6" strokeWidth="2" />
                      <line x1="15" y1="6" x2="15" y2="6" strokeWidth="2" />
                      <line x1="9" y1="10" x2="9" y2="10" strokeWidth="2" />
                      <line x1="15" y1="10" x2="15" y2="10" strokeWidth="2" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-transparent text-[12.5px] text-white placeholder:text-slate-400 outline-none"
                    />
                  </label>
                </div>

                {/* Bottom Row: Message + Submit Button */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <label className="flex items-center gap-2.5 h-12 rounded-xl bg-slate-950/60 border border-slate-700/80 px-3.5 text-slate-400 focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400 transition-all flex-1 w-full">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Briefly describe your project or goal..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent text-[12.5px] text-white placeholder:text-slate-400 outline-none"
                    />
                  </label>

                  {/* Gradient Pill Button with Circular Arrow */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto h-12 px-6 rounded-full bg-[linear-gradient(90deg,#0ea5e9_0%,#14b8a6_50%,#0d9488_100%)] text-white text-[13px] font-bold flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(45,212,191,0.45)] hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0"
                  >
                    <span>Start the Conversation</span>
                    <span className="w-6 h-6 rounded-full bg-white text-[#0c1e3d] flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </button>
                </div>

                {/* Subtext */}
                <div className="text-center text-[11px] text-slate-400 pt-1">
                  Free Consultation &bull; No Obligation &bull; Expert Guidance
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
