"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

/* =========================================================================
   PROCESS STEP ICONS (Exact Match with Reference)
   ========================================================================= */

// Step 01: Chat Speech Bubble with 3 circular dots (Teal)
function ChatBubbleIcon() {
  return (
    <svg className="w-7 h-7 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      <circle cx="8.5" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="15.5" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

// Step 02: Pen Tool with Anchor Nodes (Blue)
function PenToolProcessIcon() {
  return (
    <svg className="w-7 h-7 text-[#2563eb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6c4-1 12-1 16 0" strokeLinecap="round" />
      <circle cx="4" cy="6" r="1.5" fill="#2563eb" />
      <circle cx="20" cy="6" r="1.5" fill="#2563eb" />
      <path d="M12 21l-3.5-7 3.5-3 3.5 3L12 21z" strokeLinejoin="round" />
      <line x1="12" y1="11" x2="12" y2="15" strokeLinecap="round" />
      <circle cx="12" cy="11" r="1.5" fill="#2563eb" />
    </svg>
  );
}

// Step 03: Monitor Screen with Play Button (Purple)
function MonitorPlayIcon() {
  return (
    <svg className="w-7 h-7 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="12" rx="2.5" />
      <polygon points="10 7.5 15 10 10 12.5" strokeWidth="1.5" strokeLinejoin="round" fill="#7c3aed" fillOpacity="0.25" />
      <line x1="12" y1="16" x2="12" y2="19" strokeLinecap="round" />
      <line x1="9" y1="19" x2="15" y2="19" strokeLinecap="round" />
    </svg>
  );
}

// Step 04: Paper Airplane (Fuchsia/Pink)
function PaperPlaneIcon() {
  return (
    <svg className="w-7 h-7 text-[#d946ef]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// Step 05: Rocket Ship Taking Off (Orange)
function RocketProcessIcon() {
  return (
    <svg className="w-7 h-7 text-[#ea580c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5" />
      <path d="M15 12v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5" />
    </svg>
  );
}

// Stats & CTA Icons
function BriefcaseStatIcon() {
  return (
    <svg className="w-5 h-5 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function UsersStatIcon() {
  return (
    <svg className="w-5 h-5 text-[#3b82f6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function GlobeStatIcon() {
  return (
    <svg className="w-5 h-5 text-[#8b5cf6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function StarStatIcon() {
  return (
    <svg className="w-5 h-5 text-[#f97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* =========================================================================
   PROCESS STEPS DATA
   ========================================================================= */

const processSteps__cms = [
  {
    step: "01",
    title: "Discover & Understand",
    description: "We learn about your brand, goals and audience to lay the perfect foundation.",
    Icon: ChatBubbleIcon,
    arcColor: "#0d9488", // Teal
    trackColor: "#99f6e4",
    badgeBg: "bg-[#0d9488]",
    shadowColor: "shadow-teal-500/15",
    // Loop SVG path inside 88x88 hub:
    // Starts at bottom-left of circle, loops over top, fillets to (88, 82) on right
    loopPath: "M 16 75 A 42 42 0 1 1 72 75 C 76 78, 82 82, 88 82",
    hasLeftLine: false,
    hasRightLine: true,
    rightLineGrad: "from-[#99f6e4] to-[#bfdbfe]",
  },
  {
    step: "02",
    title: "Ideate & Conceptualize",
    description: "Creative ideas and concepts are crafted that align with your vision and objectives.",
    Icon: PenToolProcessIcon,
    arcColor: "#2563eb", // Blue
    trackColor: "#bfdbfe",
    badgeBg: "bg-[#2563eb]",
    shadowColor: "shadow-blue-500/15",
    loopPath: "M 0 82 C 6 82, 12 78, 16 75 A 42 42 0 1 1 72 75 C 76 78, 82 82, 88 82",
    hasLeftLine: true,
    hasRightLine: true,
    leftLineGrad: "from-[#99f6e4] to-[#bfdbfe]",
    rightLineGrad: "from-[#bfdbfe] to-[#ddd6fe]",
  },
  {
    step: "03",
    title: "Design & Animate",
    description: "We bring concepts to life with stunning visuals, motion and meaningful design.",
    Icon: MonitorPlayIcon,
    arcColor: "#7c3aed", // Purple
    trackColor: "#ddd6fe",
    badgeBg: "bg-[#7c3aed]",
    shadowColor: "shadow-purple-500/15",
    loopPath: "M 0 82 C 6 82, 12 78, 16 75 A 42 42 0 1 1 72 75 C 76 78, 82 82, 88 82",
    hasLeftLine: true,
    hasRightLine: true,
    leftLineGrad: "from-[#bfdbfe] to-[#ddd6fe]",
    rightLineGrad: "from-[#ddd6fe] to-[#fbcfe8]",
  },
  {
    step: "04",
    title: "Refine & Perfect",
    description: "We review, refine and perfect every detail to deliver impactful results.",
    Icon: PaperPlaneIcon,
    arcColor: "#d946ef", // Fuchsia / Pink
    trackColor: "#fbcfe8",
    badgeBg: "bg-[#d946ef]",
    shadowColor: "shadow-pink-500/15",
    loopPath: "M 0 82 C 6 82, 12 78, 16 75 A 42 42 0 1 1 72 75 C 76 78, 82 82, 88 82",
    hasLeftLine: true,
    hasRightLine: true,
    leftLineGrad: "from-[#ddd6fe] to-[#fbcfe8]",
    rightLineGrad: "from-[#fbcfe8] to-[#fed7aa]",
  },
  {
    step: "05",
    title: "Deliver & Elevate",
    description: "Final delivery that elevates your brand and drives maximum impact.",
    Icon: RocketProcessIcon,
    arcColor: "#ea580c", // Orange
    trackColor: "#fed7aa",
    badgeBg: "bg-[#ea580c]",
    shadowColor: "shadow-orange-500/15",
    // Loop stops at bottom-right of circle:
    loopPath: "M 0 82 C 6 82, 12 78, 16 75 A 42 42 0 1 1 72 75",
    hasLeftLine: true,
    hasRightLine: false,
    leftLineGrad: "from-[#fbcfe8] to-[#fed7aa]",
  },
];

/* =========================================================================
   MAIN COMPONENT: AnimationProcess
   ========================================================================= */

export default function AnimationProcess() {
  const $t = useCmsText();
  const processSteps = useCmsData("AnimationProcess__processSteps", processSteps__cms);
  return (
    <section className="relative w-full bg-[#fbfcfd] py-16 sm:py-24 overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-teal-100/30 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 right-0 w-[600px] h-[600px] bg-purple-100/35 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* =========================================================
            TOP ROW: Typography (Left) & 3D Infinity Ribbon Artwork (Right)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 lg:mb-20">
          
          {/* Top-Left: Header Content */}
          <div className="lg:col-span-7 xl:col-span-7 max-w-2xl">
            {/* Badge: OUR PROCESS */}
            <div className="inline-block mb-3">
              <span className="text-xs font-black tracking-widest text-[#0d9488] uppercase block">
                {$t("AnimationProcess__t1", "OUR PROCESS")}</span>
              <div className="w-14 h-1 bg-[#0d9488] rounded-full mt-1.5" />
            </div>

            {/* Headline: Exactly 2 lines */}
            <h2 className="text-h2 font-black tracking-tight text-slate-900 mb-4 font-sans">
              {$t("AnimationProcess__t2", "Our Process. ")}<br />
              <span>{$t("AnimationProcess__t3", "Your Vision, ")}</span>
              <span className="bg-gradient-to-r from-[#0284c7] via-[#6366f1] to-[#7c3aed] bg-clip-text text-transparent">
                {$t("AnimationProcess__t4", "Perfectly Crafted.")}</span>
            </h2>

            {/* Subtitle with colored emphasis words */}
            <p className="text-body text-slate-500 font-normal max-w-xl">
              {rich($t("AnimationProcess__t5", "A collaborative approach that ensures"))}{" "}
              <span className="font-semibold text-[#0d9488]">creativity</span>,{" "}
              <span className="font-semibold text-[#0284c7]">clarity</span> and{" "}
              <span className="font-semibold text-[#7c3aed]">results</span> {rich($t("AnimationProcess__t6", "at every step."))}</p>
          </div>

          {/* Top-Right: 3D Infinity Ribbon Artwork (animation-graphic-design3) */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center lg:justify-end">
            
            {/* Dot Matrix Pattern behind top right of ribbon */}
            <div className="absolute right-2 top-0 pointer-events-none hidden sm:block opacity-35 z-0">
              <svg width="140" height="90" viewBox="0 0 140 90" fill="none">
                <pattern id="ribbon-dots-grid" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#6366f1" />
                </pattern>
                <rect width="140" height="90" fill="url(#ribbon-dots-grid)" />
              </svg>
            </div>

            {/* Floating 3D Infinity Ribbon Image */}
            <div className="relative w-full max-w-[480px] h-[250px] sm:h-[290px] lg:h-[310px] z-10">
              <Image
                src={$t("AnimationProcess__t7", "/animation-graphic-design3.png")}
                alt={$t("AnimationProcess__t8", "3D Infinity Ribbon Motion Loop")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-contain object-center lg:object-right select-none pointer-events-none drop-shadow-sm"
              />
            </div>

          </div>

        </div>

        {/* =========================================================
            MIDDLE ROW: 5-Step Process Flow with Exact Concentric Omega Track
            ========================================================= */}
        <div className="relative mb-16 sm:mb-20">
          
          {/* 5 Process Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 items-stretch relative z-10">
            {processSteps.map((step, idx) => {
              const IconComponent = step.Icon;
              return (
                <div key={step.step} className="flex flex-col items-center group relative w-full px-2 xl:px-2.5">
                  
                  {/* Top Hub Container: Height 96px, with seamless connector lines and concentric outer loop */}
                  <div className="relative w-full h-[96px] flex items-center justify-center">
                    
                    {/* Left Horizontal Connector Line (desktop only, connecting to previous step) */}
                    {step.hasLeftLine && (
                      <div
                        className={`hidden lg:block absolute top-[81px] left-0 w-[calc(50%-43px)] h-[1.75px] bg-gradient-to-r ${step.leftLineGrad} z-0 pointer-events-none`}
                      />
                    )}

                    {/* Right Horizontal Connector Line (desktop only, connecting to next step) */}
                    {step.hasRightLine && (
                      <div
                        className={`hidden lg:block absolute top-[81px] right-0 w-[calc(50%-43px)] h-[1.75px] bg-gradient-to-r ${step.rightLineGrad} z-0 pointer-events-none`}
                      />
                    )}

                    {/* Concentric 88x88 Loop SVG (Outer Loop Arch + Middle Colored Arc) */}
                    <svg
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-[88px] h-[88px] pointer-events-none z-10 overflow-visible"
                      viewBox="0 0 88 88"
                      fill="none"
                    >
                      {/* Outer Loop Arch hugging the circle: R=42 */}
                      <path
                        d={step.loopPath}
                        stroke={step.trackColor}
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-colors duration-300"
                      />

                      {/* Concentric Colored Accent Arc (concentric outside the white circle, radius 38) */}
                      <path
                        d="M 9 34 A 38 38 0 0 1 79 34"
                        stroke={step.arcColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>

                    {/* Pure White Circular Disc with soft drop shadow */}
                    <div className="relative w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] rounded-full bg-white border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.05)] flex items-center justify-center group-hover:scale-105 transition-all duration-300 z-20">
                      {/* Crisp Clean Icon Centered Inside (NO arc inside) */}
                      <IconComponent />
                    </div>

                    {/* Circular Number Badge (centered at bottom of circle, resting on card top edge) */}
                    <div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 ${step.badgeBg} text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md z-30 select-none`}
                    >
                      {step.step}
                    </div>

                  </div>

                  {/* Card Content (Symmetrically positioned directly beneath the circle & badge) */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="w-full bg-white rounded-2xl pt-7 pb-6 px-4 sm:px-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-start flex-1 -mt-1.5"
                  >
                    <h3 className="font-bold text-slate-900 text-[15px] sm:text-[15.5px] leading-snug mb-2 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-caption text-slate-500 font-normal">
                      {step.description}
                    </p>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

        {/* =========================================================
            BOTTOM ROW: Testimonial & Stats Card (Left) + Dark CTA Card (Right)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Testimonial & 4 Key Stats Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Testimonial Section */}
            <div className="w-full md:w-2/5 md:pr-6 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0">
              {/* Quote Mark */}
              <div className="text-3xl text-purple-600 font-serif leading-none mb-2 font-black select-none">
                “
              </div>
              <p className="text-small text-slate-700 font-medium mb-4">
                {rich($t("AnimationProcess__t9", "They transformed our ideas into visuals that truly represent our brand. The animation and design quality is outstanding!"))}</p>
              
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
                  <Image
                    src={$t("AnimationProcess__t10", "/ravi-sharma-avatar.jpg")}
                    alt={$t("AnimationProcess__t11", "Ravi Sharma")}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">
                    {$t("AnimationProcess__t12", "Ravi Sharma")}</h4>
                  <p className="text-[11px] text-slate-400 font-normal">
                    {rich($t("AnimationProcess__t13", "Founder, WellnessKart"))}</p>
                </div>
              </div>
            </div>

            {/* 4 Stats Grid */}
            <div className="w-full md:w-3/5 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center text-center">
              
              {/* Stat 1: 500+ Projects Completed */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mb-2">
                  <BriefcaseStatIcon />
                </div>
                <span className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight leading-none">
                  {$t("AnimationProcess__t14", "500+")}</span>
                <span className="text-[11px] font-semibold text-slate-500 mt-1">
                  {$t("AnimationProcess__t15", "Projects Completed")}</span>
                <div className="w-8 h-0.5 bg-teal-500 rounded-full mt-2" />
              </div>

              {/* Stat 2: 100+ Happy Clients */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  <UsersStatIcon />
                </div>
                <span className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight leading-none">
                  {$t("AnimationProcess__t16", "100+")}</span>
                <span className="text-[11px] font-semibold text-slate-500 mt-1">
                  {$t("AnimationProcess__t17", "Happy Clients")}</span>
                <div className="w-8 h-0.5 bg-blue-500 rounded-full mt-2" />
              </div>

              {/* Stat 3: 10+ Industries Served */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-2">
                  <GlobeStatIcon />
                </div>
                <span className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight leading-none">
                  {$t("AnimationProcess__t18", "10+")}</span>
                <span className="text-[11px] font-semibold text-slate-500 mt-1">
                  {$t("AnimationProcess__t19", "Industries Served")}</span>
                <div className="w-8 h-0.5 bg-purple-500 rounded-full mt-2" />
              </div>

              {/* Stat 4: 4.9/5 Client Rating */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-2">
                  <StarStatIcon />
                </div>
                <span className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight leading-none">
                  {$t("AnimationProcess__t20", "4.9/5")}</span>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  {$t("AnimationProcess__t21", "Client Rating")}</span>
                <div className="text-amber-400 text-xs mt-1">
                  ★★★★★
                </div>
              </div>

            </div>

          </div>

          {/* Right: Dark High-Impact CTA Card */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#0c1024] via-[#0f172a] to-[#1a0f37] rounded-3xl p-7 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
            
            {/* Background Decorative Dot Grid */}
            <div className="absolute right-0 bottom-0 w-32 h-32 opacity-20 pointer-events-none">
              <svg width="128" height="128" viewBox="0 0 128 128" fill="none">
                <pattern id="dark-card-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#818cf8" />
                </pattern>
                <rect width="128" height="128" fill="url(#dark-card-dots)" />
              </svg>
            </div>

            {/* Ambient Purple Radial Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-purple-600/20 rounded-full blur-[60px] pointer-events-none" />

            <div>
              <h3 className="text-h6 font-bold mb-1 text-white">
                {$t("AnimationProcess__t22", "Let's Create Something")}</h3>
              <p className="text-body font-black mb-2.5">
                <span className="text-[#2dd4bf]">{$t("AnimationProcess__t23", "Extraordinary")}</span>{" "}
                <span className="text-white">{$t("AnimationProcess__t24", "Together.")}</span>
              </p>
              <p className="text-caption text-slate-400 mb-6 font-normal">
                {rich($t("AnimationProcess__t25", "Have a project in mind? Let's bring your ideas to life."))}</p>

              {/* CTA Button */}
              <Link
                href={$t("AnimationProcess__t26", "#contact-form")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-md transition-all duration-200 hover:-translate-y-0.5 w-fit"
              >
                <span>{$t("AnimationProcess__t27", "Start Your Project")}</span>
                <span className="text-sm font-black text-purple-700">→</span>
              </Link>
            </div>

            {/* Bottom Call Prompt */}
            <div className="pt-4 border-t border-slate-800/80 mt-6 flex items-center gap-2 text-xs text-slate-400">
              <svg className="w-4 h-4 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{$t("AnimationProcess__t28", "Prefer to talk?")}</span>
              <Link href={$t("AnimationProcess__t29", "tel:+15551234567")} className="underline text-slate-200 hover:text-white font-medium">
                {$t("AnimationProcess__t30", "Schedule a Call")}</Link>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
