"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const dmSerif = { className: "font-heading" }; // global font from app/layout.tsx

const clientStories__cms = [
  {
    id: "01",
    quote:
      "Promanage delivered a platform that not only looks exceptional but also made our entire process faster, smarter and effortless.",
    author: "Arjun Malhotra",
    role: "CEO, SolarWave Energy",
    avatar: "/ravi-sharma-avatar.webp",
    company: "SOLARWAVE",
    companySub: "ENERGY",
    companyIcon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-500" fill="currentColor">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    laptop: {
      headline: "Powering a sustainable future.",
      sub: "Smart solar solutions for homes, businesses and industries.",
      heroImage: "/verdant-branding-showcase.webp",
      metrics: [
        { label: "Total Projects", val: "248", icon: "🌱" },
        { label: "Active Systems", val: "1,248", icon: "⚡" },
        { label: "CO₂ Reduced", val: "2,532 t", icon: "♻️" },
        { label: "Happy Clients", val: "98%", icon: "☀️" },
      ],
    },
    mobile: {
      title: "Your energy. Smarter.",
      sub: "Track, monitor and optimize your solar performance in real time.",
      statValue: "1284",
      statUnit: "kWh",
      statChange: "+16.8% vs last month",
    },
  },
  {
    id: "02",
    quote:
      "Our patient engagement surged by 74% within 3 weeks of launch. The intuitive booking flow transformed our entire digital healthcare practice.",
    author: "Dr. Elena Rostova",
    role: "Head of Product, HealthPulse",
    avatar: "/customer-avatar.webp",
    company: "HEALTHPULSE",
    companySub: "AI HEALTH",
    companyIcon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-teal-500" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    laptop: {
      headline: "Clinical intelligence at your fingertips.",
      sub: "Next-gen telehealth experiences built with empathy and speed.",
      heroImage: "/case-velore-main.webp",
      metrics: [
        { label: "Consultations", val: "34.2k", icon: "🩺" },
        { label: "Patient Care", val: "99.4%", icon: "💙" },
        { label: "Time Saved", val: "4.8 hrs", icon: "⏱️" },
        { label: "Active Clinics", val: "420+", icon: "🏥" },
      ],
    },
    mobile: {
      title: "Care on demand.",
      sub: "Instant biometric diagnostics and specialist appointments.",
      statValue: "99.8",
      statUnit: "%",
      statChange: "Real-time sync active",
    },
  },
  {
    id: "03",
    quote:
      "The design system and high-density dashboard ProManage created allowed our traders to execute complex portfolio workflows 3x faster.",
    author: "Marcus Vance",
    role: "Chief Design Officer, FinScale",
    avatar: "/ravi-sharma-avatar.webp",
    company: "FINSCALE",
    companySub: "CAPITAL",
    companyIcon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-500" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    laptop: {
      headline: "Institutional-grade wealth intelligence.",
      sub: "Actionable real-time market insights with zero cognitive fatigue.",
      heroImage: "/saas-dashboard-showcase.webp",
      metrics: [
        { label: "AUM Managed", val: "$1.4B+", icon: "📈" },
        { label: "Uptime Feed", val: "99.99%", icon: "⚡" },
        { label: "Active Traders", val: "18.5k", icon: "💼" },
        { label: "Latency", val: "12 ms", icon: "🎯" },
      ],
    },
    mobile: {
      title: "Portfolio Alpha.",
      sub: "Algorithmic market execution and liquidity monitoring.",
      statValue: "+32.4",
      statUnit: "%",
      statChange: "Benchmark beaten YTD",
    },
  },
];

const bottomBenefits__cms = [
  {
    num: "01",
    title: "Clearer journeys",
    desc: "Better structure and easier navigation for every user.",
    icon: (
      // Target / Bullseye with crosshair
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  {
    num: "02",
    title: "Stronger experiences",
    desc: "Interfaces designed around real user behaviour.",
    icon: (
      // Heart Outline
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Business value",
    desc: "Design decisions connected to meaningful outcomes.",
    icon: (
      // Ascending Bar Chart with Trendline Arrow
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" strokeWidth="2" />
        <line x1="12" y1="20" x2="12" y2="14" strokeWidth="2" />
        <line x1="6" y1="20" x2="6" y2="17" strokeWidth="2" />
        <path d="M4 12l4-4 4 3 6-6" stroke="#0d9488" strokeWidth="2" />
        <polyline points="14 5 18 5 18 9" stroke="#0d9488" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function UiUxClientStories() {
  const $t = useCmsText();
  const clientStories = useCmsData("UiUxClientStories__clientStories", clientStories__cms);
  const bottomBenefits = useCmsData("UiUxClientStories__bottomBenefits", bottomBenefits__cms);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev === 0 ? clientStories.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev === clientStories.length - 1 ? 0 : prev + 1));
  };

  const story = clientStories[currentIdx];

  return (
    <section className="relative w-full py-12 sm:py-16 bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_50%,#f8fafc_100%)] overflow-hidden font-sans">
      {/* ---------------- BACKGROUND ACCENTS ---------------- */}
      {/* Top Right Dotted Matrix */}
      <div className="absolute right-6 sm:right-14 top-20 pointer-events-none opacity-40 z-0">
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#0d9488]/40" />
          ))}
        </div>
      </div>

      {/* Bottom Left Dotted Matrix */}
      <div className="absolute left-6 sm:left-14 bottom-28 pointer-events-none opacity-40 z-0">
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#0d9488]/40" />
          ))}
        </div>
      </div>

      {/* Bottom Right Topographic Elevation Contours */}
      <div className="absolute right-0 bottom-0 w-[380px] h-[300px] pointer-events-none z-0 opacity-30">
        <svg viewBox="0 0 400 300" className="w-full h-full" fill="none">
          <circle cx="400" cy="300" r="150" stroke="rgba(13,148,136,0.3)" strokeWidth="1.5" />
          <circle cx="400" cy="300" r="220" stroke="rgba(13,148,136,0.25)" strokeWidth="1.5" />
          <circle cx="400" cy="300" r="290" stroke="rgba(13,148,136,0.2)" strokeWidth="1.5" />
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
              {html($t("UiUxClientStories__t1", "CLIENT STORIES"))}</span>
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
            <span className={`${dmSerif.className} font-normal tracking-[-0.015em]`}>{rich($t("UiUxClientStories__t2m", "Good design is <span class=\"text-[#0d9488]\">felt.</span>"))}</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-body mt-5 mx-auto max-w-2xl text-slate-600 font-normal"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >{rich($t("UiUxClientStories__t4m", "The best experiences don't need to explain themselves.<br class=\"hidden sm:inline\"> They simply feel right."))}</motion.p>
        </div>

        {/* ---------------- CAROUSEL SHOWCASE SECTION ---------------- */}
        <div className="relative mt-10 sm:mt-14">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={story.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* ---------------- LEFT: TESTIMONIAL CARD & CONTROLS ---------------- */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                {/* Testimonial White Card */}
                <div className="rounded-[32px] bg-white border border-slate-100 shadow-[0_20px_50px_-15px_rgba(15,35,80,0.08)] p-7 sm:p-10 relative">
                  {/* Big Teal Quotation Mark */}
                  <div className={`${dmSerif.className} text-[72px] leading-none text-[#0d9488] select-none -mt-4`}>
                    “
                  </div>

                  {/* Quote Body */}
                  <p className={`${dmSerif.className} mt-2 text-[21px] sm:text-[23px] text-[#0c1e3d] leading-[1.38] font-normal`}>
                    {story.quote}
                  </p>

                  <div className="mt-6 w-9 h-[2.5px] rounded-full bg-[#0d9488]/40" />

                  {/* Author + Company Details */}
                  <div className="mt-7 flex items-center justify-between flex-wrap gap-4 pt-5 border-t border-slate-100">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src={story.avatar}
                          alt={story.author}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-[15px] font-bold text-[#0c1e3d]">
                          {story.author}
                        </div>
                        <div className="text-[12px] text-slate-500">
                          {story.role}
                        </div>
                      </div>
                    </div>

                    {/* Company Branding */}
                    <div className="flex items-center gap-2 text-right">
                      {story.companyIcon}
                      <div className="text-left leading-none">
                        <div className="text-[12px] font-black tracking-wider text-[#0c1e3d]">
                          {story.company}
                        </div>
                        <div className="text-[7.5px] font-bold tracking-[0.18em] text-slate-400 uppercase mt-0.5">
                          {story.companySub}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carousel Controls (Below Card) */}
                <div className="mt-8 flex items-center gap-5">
                  {/* Slide Counter (01 / 03) */}
                  <div className="flex items-center gap-1.5 text-base font-bold">
                    <span className="text-[#0d9488] text-lg">{story.id}</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-slate-400 text-sm">{html($t("UiUxClientStories__t6", "0"))}{clientStories.length}</span>
                  </div>

                  {/* Left & Right Arrow Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={prevSlide}
                      aria-label="Previous client story"
                      className="w-11 h-11 rounded-full bg-white border border-slate-200/90 text-slate-700 flex items-center justify-center shadow-sm hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                      </svg>
                    </button>

                    <button
                      onClick={nextSlide}
                      aria-label="Next client story"
                      className="w-11 h-11 rounded-full bg-[#0d9488] text-white flex items-center justify-center shadow-md shadow-teal-500/30 hover:bg-[#0b766c] active:scale-95 transition-all cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* ---------------- RIGHT: MULTI-DEVICE MOCKUPS (LAPTOP + OVERVIEW + PHONE) ---------------- */}
              <div className="lg:col-span-7 relative flex items-center justify-center">
                {/* Connecting Dashed Dimension / Blueprint Spline */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-24 h-1 pointer-events-none hidden lg:block z-20">
                  <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 20">
                    <line x1="0" y1="10" x2="100" y2="10" stroke="#0d9488" strokeWidth="1.8" strokeDasharray="3 3" />
                    <circle cx="0" cy="10" r="3.5" fill="#0d9488" />
                    <line x1="95" y1="5" x2="105" y2="15" stroke="#0d9488" strokeWidth="2" />
                    <line x1="95" y1="15" x2="105" y2="5" stroke="#0d9488" strokeWidth="2" />
                  </svg>
                </div>

                <div className="relative w-full max-w-[560px]">
                  {/* Laptop Mockup Shell */}
                  <div className="relative rounded-[28px] p-2 bg-gradient-to-b from-slate-200 to-slate-300 shadow-[0_30px_70px_-20px_rgba(15,35,80,0.18)] border border-slate-100">
                    <div className="rounded-[22px] bg-white overflow-hidden border border-slate-200">
                      {/* Browser Bar */}
                      <div className="h-7 bg-slate-100/90 border-b border-slate-200/80 px-3.5 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">solarwave-energy.com</span>
                        <div className="w-8" />
                      </div>

                      {/* Screen Content */}
                      <div className="relative h-[250px] sm:h-[300px] w-full bg-white flex flex-col justify-between overflow-hidden">
                        {/* Mockup Header */}
                        <div className="p-4 flex items-center justify-between border-b border-slate-100">
                          <span className="text-xs font-bold text-[#0c1e3d] flex items-center gap-1.5">
                            {story.companyIcon}
                            {story.company}
                          </span>
                          <div className="hidden sm:flex items-center gap-4 text-[10px] text-slate-500 font-medium">{rich($t("UiUxClientStories__t7m", "<span>Home</span><span>Solutions</span><span>Projects</span><span>Resources</span><span>About</span>"))}</div>
                          <span className="px-3 py-1 rounded-full bg-[#0c1e3d] text-white text-[9px] font-bold">
                            {html($t("UiUxClientStories__t12", "Get a Quote"))}</span>
                        </div>

                        {/* Mockup Body Content */}
                        <div className="relative flex-1 p-4 sm:p-6 flex flex-col justify-center max-w-xs z-10">
                          <h4 className={`text-h5 ${dmSerif.className} text-[#0c1e3d] font-normal`}>
                            {story.laptop.headline}
                          </h4>
                          <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
                            {story.laptop.sub}
                          </p>
                          <div className="mt-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0c1e3d] text-white text-[10px] font-bold shadow-sm">
                              {html($t("UiUxClientStories__t13", "Explore Solutions →"))}</span>
                          </div>
                        </div>

                        {/* Background Solar Architecture Photo */}
                        <div className="absolute right-0 inset-y-0 w-3/5 sm:w-1/2">
                          <Image
                            src={story.laptop.heroImage}
                            alt={$t("UiUxClientStories__t14", "Project Showcase")}
                            fill
                            sizes="300px"
                            className="object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Analytics Widget (Overlapping Laptop Bottom-Left) */}
                  <motion.div
                    className="absolute -bottom-6 -left-4 sm:-left-8 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_20px_40px_-10px_rgba(15,35,80,0.18)] p-3.5 sm:p-4 z-20 w-[240px] sm:w-[280px]"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {html($t("UiUxClientStories__t15", "Overview"))}</div>
                    <div className="mt-2 grid grid-cols-4 gap-2 text-center divide-x divide-slate-100">
                      {story.laptop.metrics.map((m) => (
                        <div key={m.label} className="px-1 first:pl-0">
                          <div className="text-xs">{m.icon}</div>
                          <div className="text-[12px] font-black text-[#0c1e3d] mt-0.5 leading-none">
                            {m.val}
                          </div>
                          <div className="text-[8px] text-slate-400 mt-0.5 truncate">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Floating Smartphone Mockup (Overlapping Laptop Right) */}
                  <motion.div
                    className="absolute -top-6 -right-3 sm:-right-8 w-[140px] sm:w-[165px] rounded-[30px] p-2 bg-gradient-to-b from-white to-slate-200 shadow-[0_24px_50px_-15px_rgba(15,35,80,0.25)] border border-white z-20"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  >
                    <div className="rounded-[24px] bg-white overflow-hidden p-3 h-[250px] sm:h-[280px] flex flex-col justify-between border border-slate-100 text-left">
                      {/* Phone Header */}
                      <div className="flex items-center justify-between text-[9px] text-slate-600 font-bold">
                        <span>{html($t("UiUxClientStories__t16", "9:41"))}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>

                      {/* App Content */}
                      <div className="mt-2">
                        <div className="text-[11px] font-extrabold text-[#0c1e3d] leading-tight">
                          {story.mobile.title}
                        </div>
                        <div className="text-[8.5px] text-slate-400 leading-tight mt-1">
                          {story.mobile.sub}
                        </div>
                      </div>

                      {/* Energy Metric Card */}
                      <div className="rounded-xl bg-slate-50 border border-slate-100 p-2 my-2">
                        <div className="text-[8px] text-slate-400">{html($t("UiUxClientStories__t17", "Energy Generated"))}</div>
                        <div className="text-base font-black text-[#0c1e3d] leading-none mt-0.5">
                          {story.mobile.statValue} <span className="text-[9px] font-normal text-slate-500">{story.mobile.statUnit}</span>
                        </div>
                        <div className="text-[7.5px] text-teal-600 font-bold mt-1">
                          {story.mobile.statChange}
                        </div>
                        {/* Wave sparkline */}
                        <svg viewBox="0 0 50 15" className="w-full h-3 mt-1 text-[#0d9488]">
                          <path d="M0 10 Q12 2 25 8 T50 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </div>

                      {/* Mobile Navigation */}
                      <div className="flex items-center justify-around text-slate-400 pt-1 border-t border-slate-100">
                        <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---------------- BOTTOM 3 BENEFIT CARDS ---------------- */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {bottomBenefits.map((b, idx) => (
            <motion.div
              key={b.num}
              className="rounded-3xl bg-white border border-slate-100 p-6 sm:p-7 shadow-[0_10px_25px_-5px_rgba(15,35,80,0.05)] flex items-start gap-4 transition-all hover:border-teal-200 hover:shadow-lg hover:-translate-y-1 group"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
            >
              {/* White Icon Badge Container */}
              <div className="w-12 h-12 rounded-2xl bg-teal-50/80 border border-teal-200/60 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#0d9488] group-hover:text-white transition-colors">
                {b.icon}
              </div>

              {/* Text */}
              <div>
                <span className="text-xs font-bold text-[#0d9488] tracking-widest block">
                  {b.num}
                </span>
                <h4 className="mt-1 text-[17px] font-bold text-[#0c1e3d] group-hover:text-[#0d9488] transition-colors">
                  {b.title}
                </h4>
                <p className="text-caption mt-1.5 text-slate-500">
                  {b.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
