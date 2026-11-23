"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "./Container";

/* =========================================================================
   ANIMATION SERVICES ICONS (Teal #0d9488)
   ========================================================================= */

function ScreenPlayBadgeIcon() {
  return (
    <svg className="w-7 h-7 text-[#0d9488]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
      <rect x="3" y="5" width="26" height="18" rx="4" strokeWidth="2" />
      <polygon points="13,10 20,14 13,18" fill="#0d9488" fillOpacity="0.25" strokeWidth="1.8" strokeLinejoin="round" />
      <line x1="16" y1="23" x2="16" y2="28" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="28" x2="22" y2="28" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Cube3dIcon() {
  return (
    <svg className="w-4 h-4 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function PlayVideoIcon() {
  return (
    <svg className="w-4 h-4 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <polygon points="10 8 16 12 10 16 10 8" fill="#0d9488" fillOpacity="0.2" />
    </svg>
  );
}

function WaveformIcon() {
  return (
    <svg className="w-4 h-4 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2 12 6 12 9 5 15 19 18 12 22 12" />
    </svg>
  );
}

function ProductCubeIcon() {
  return (
    <svg className="w-4 h-4 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="3" fill="#0d9488" fillOpacity="0.2" />
    </svg>
  );
}

function CharacterIcon() {
  return (
    <svg className="w-4 h-4 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
    </svg>
  );
}

function LottieSpinIcon() {
  return (
    <svg className="w-4 h-4 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3">
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

/* =========================================================================
   GRAPHIC DESIGN ICONS (Purple #7c3aed)
   ========================================================================= */

function PenToolBadgeIcon() {
  return (
    <svg className="w-7 h-7 text-[#7c3aed]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
      <line x1="5" y1="12" x2="27" y2="12" strokeWidth="1.6" />
      <rect x="3" y="10" width="4" height="4" rx="1" fill="#7c3aed" />
      <rect x="25" y="10" width="4" height="4" rx="1" fill="#7c3aed" />
      <path d="M5 20 C 5 8, 27 8, 27 20" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 16 L20 23 L18 29 L14 29 L12 23 Z" fill="#7c3aed" fillOpacity="0.2" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="16" cy="24" r="1.2" fill="#7c3aed" />
    </svg>
  );
}

function DiamondBrandIcon() {
  return (
    <svg className="w-4 h-4 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="6 3 18 3 22 9 12 22 2 9" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <polyline points="10 3 12 9 14 3" />
    </svg>
  );
}

function PackagingIcon() {
  return (
    <svg className="w-4 h-4 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16.5 9.4 7.55 4.24a1.8 1.8 0 0 0-1.8 0L2 6.4a1.8 1.8 0 0 0-.9 1.56v9.08a1.8 1.8 0 0 0 .9 1.56l3.75 2.16a1.8 1.8 0 0 0 1.8 0l8.95-5.16" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  );
}

function MarketingBrochureIcon() {
  return (
    <svg className="w-4 h-4 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

function PresentationSlidesIcon() {
  return (
    <svg className="w-4 h-4 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <circle cx="8" cy="8" r="1.5" fill="#7c3aed" />
      <polyline points="6 13 9 10 13 13 18 8" />
    </svg>
  );
}

function SocialMediaPostIcon() {
  return (
    <svg className="w-4 h-4 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="#7c3aed" />
    </svg>
  );
}

function PrintDigitalIcon() {
  return (
    <svg className="w-4 h-4 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" rx="1" />
    </svg>
  );
}

/* =========================================================================
   MAIN COMPONENT: Visual Communication Solutions
   ========================================================================= */

export default function VisualCommunicationSolutions() {
  return (
    <section className="relative w-full bg-[#fbfcfd] py-20 sm:py-28 overflow-hidden">
      
      {/* Background ambient accents */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-teal-100/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-100/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle dot matrix pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          {/* Top Tag: WHAT WE DO */}
          <div className="inline-block mb-4">
            <span className="text-[11px] sm:text-[12px] font-black tracking-[0.25em] text-[#0d9488] uppercase block">
              WHAT WE DO
            </span>
            <div className="w-8 h-[2.5px] bg-[#0d9488] rounded-full mx-auto mt-1.5" />
          </div>

          {/* Main Title: Complete Visual Communication Solutions */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.12] mb-4 text-[#0f2333]">
            Complete <span className="text-[#0284c7]">Visual</span> <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d9488] via-[#0284c7] to-[#7c3aed]">
              Communication
            </span>{" "}
            Solutions
          </h2>

          {/* Subtitle */}
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
            We combine creativity, technology and storytelling to deliver visuals
            that are not only beautiful but also effective.
          </p>
        </div>

        {/* Dual Cards Grid with Center Isometric Connector */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* =========================================================
              CARD 1: Animation Services (Left Card)
              ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 border border-slate-200/80 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.06)] hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Header: Icon + Title + Underline + Description */}
            <div>
              <div className="flex items-start gap-4 mb-3">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-teal-50/80 border border-teal-100 flex items-center justify-center shrink-0">
                  <ScreenPlayBadgeIcon />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                    Animation Services
                  </h3>
                  <div className="w-8 h-[2.5px] bg-[#0d9488] rounded-full mt-2 mb-2" />
                  <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-normal max-w-md">
                    Engaging animations that simplify complex ideas, showcase products and create memorable brand experiences.
                  </p>
                </div>
              </div>

              {/* Split Content: Left 6 Sub-services (with rounded box icons) / Right 3D Visual (Seamless Faded) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-6">
                
                {/* 6 Sub-services List (7 cols) */}
                <div className="md:col-span-7 grid grid-cols-2 gap-x-3 gap-y-3.5 z-10">
                  
                  {/* 1. 2D & 3D Animation */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-50/70 border border-teal-100/60 flex items-center justify-center shrink-0">
                      <Cube3dIcon />
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] font-bold text-slate-700 leading-tight">
                      2D &amp; 3D Animation
                    </span>
                  </div>

                  {/* 2. Product Animation */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-50/70 border border-teal-100/60 flex items-center justify-center shrink-0">
                      <ProductCubeIcon />
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] font-bold text-slate-700 leading-tight">
                      Product Animation
                    </span>
                  </div>

                  {/* 3. Explainer Videos */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-50/70 border border-teal-100/60 flex items-center justify-center shrink-0">
                      <PlayVideoIcon />
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] font-bold text-slate-700 leading-tight">
                      Explainer Videos
                    </span>
                  </div>

                  {/* 4. Character Animation */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-50/70 border border-teal-100/60 flex items-center justify-center shrink-0">
                      <CharacterIcon />
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] font-bold text-slate-700 leading-tight">
                      Character Animation
                    </span>
                  </div>

                  {/* 5. Motion Graphics */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-50/70 border border-teal-100/60 flex items-center justify-center shrink-0">
                      <WaveformIcon />
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] font-bold text-slate-700 leading-tight">
                      Motion Graphics
                    </span>
                  </div>

                  {/* 6. GIF & Lottie Animation */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-50/70 border border-teal-100/60 flex items-center justify-center shrink-0">
                      <LottieSpinIcon />
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] font-bold text-slate-700 leading-tight">
                      GIF &amp; Lottie Animation
                    </span>
                  </div>

                </div>

                {/* Right 3D Visual: Seamless White Faded Effect (NO box, blends directly into white card) */}
                <div className="md:col-span-5 relative flex items-center justify-center">
                  <div className="relative w-full h-[220px] sm:h-[250px] flex items-center justify-center">
                    
                    {/* Image with multiply blend mode & radial mask fade */}
                    <div
                      className="relative w-full h-full"
                      style={{
                        maskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 50%, transparent 85%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 50%, transparent 85%)',
                      }}
                    >
                      <Image
                        src="/animation-card-visual.jpg"
                        alt="Animation Services 3D Visual"
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-contain select-none pointer-events-none"
                        style={{
                          mixBlendMode: 'multiply',
                        }}
                      />
                    </div>

                    {/* Perimeter soft white fade overlays to completely dissolve outer edges */}
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Link: Explore Animation */}
            <div className="pt-5 border-t border-slate-100 mt-2">
              <Link
                href="#contact-form"
                className="group inline-flex items-center gap-2 text-sm font-bold text-[#0d9488] hover:text-[#0b7a70] transition-colors"
              >
                <span>Explore Animation</span>
                <span className="text-base font-normal transition-transform duration-200 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>
          </motion.div>

          {/* =========================================================
              CARD 2: Graphic Design Services (Right Card)
              ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 border border-slate-200/80 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.06)] hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Header: Icon + Title + Underline + Description */}
            <div>
              <div className="flex items-start gap-4 mb-3">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-purple-50/80 border border-purple-100 flex items-center justify-center shrink-0">
                  <PenToolBadgeIcon />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                    Graphic Design Services
                  </h3>
                  <div className="w-8 h-[2.5px] bg-[#7c3aed] rounded-full mt-2 mb-2" />
                  <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-normal max-w-md">
                    Creative designs that build strong brand identity, communicate clearly and leave a lasting impression.
                  </p>
                </div>
              </div>

              {/* Split Content: Left 6 Sub-services (with rounded box icons) / Right Branding Visual (Seamless Faded) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-6">
                
                {/* 6 Sub-services List (7 cols) */}
                <div className="md:col-span-7 grid grid-cols-2 gap-x-3 gap-y-3.5 z-10">
                  
                  {/* 1. Brand Identity Design */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50/70 border border-purple-100/60 flex items-center justify-center shrink-0">
                      <DiamondBrandIcon />
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] font-bold text-slate-700 leading-tight">
                      Brand Identity Design
                    </span>
                  </div>

                  {/* 2. Packaging Design */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50/70 border border-purple-100/60 flex items-center justify-center shrink-0">
                      <PackagingIcon />
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] font-bold text-slate-700 leading-tight">
                      Packaging Design
                    </span>
                  </div>

                  {/* 3. Marketing Collateral */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50/70 border border-purple-100/60 flex items-center justify-center shrink-0">
                      <MarketingBrochureIcon />
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] font-bold text-slate-700 leading-tight">
                      Marketing Collateral
                    </span>
                  </div>

                  {/* 4. Presentation Design */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50/70 border border-purple-100/60 flex items-center justify-center shrink-0">
                      <PresentationSlidesIcon />
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] font-bold text-slate-700 leading-tight">
                      Presentation Design
                    </span>
                  </div>

                  {/* 5. Social Media Graphics */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50/70 border border-purple-100/60 flex items-center justify-center shrink-0">
                      <SocialMediaPostIcon />
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] font-bold text-slate-700 leading-tight">
                      Social Media Graphics
                    </span>
                  </div>

                  {/* 6. Print & Digital Design */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50/70 border border-purple-100/60 flex items-center justify-center shrink-0">
                      <PrintDigitalIcon />
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] font-bold text-slate-700 leading-tight">
                      Print &amp; Digital Design
                    </span>
                  </div>

                </div>

                {/* Right Stationery Visual: Seamless White Faded Effect (NO box, blends directly into white card) */}
                <div className="md:col-span-5 relative flex items-center justify-center">
                  <div className="relative w-full h-[220px] sm:h-[250px] flex items-center justify-center">
                    
                    {/* Image with multiply blend mode & radial mask fade */}
                    <div
                      className="relative w-full h-full"
                      style={{
                        maskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 50%, transparent 85%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 50%, transparent 85%)',
                      }}
                    >
                      <Image
                        src="/graphic-design-card-visual.jpg"
                        alt="Graphic Design Services Stationery Visual"
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-contain select-none pointer-events-none"
                        style={{
                          mixBlendMode: 'multiply',
                        }}
                      />
                    </div>

                    {/* Perimeter soft white fade overlays */}
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Link: Explore Graphic Design */}
            <div className="pt-5 border-t border-slate-100 mt-2">
              <Link
                href="#contact-form"
                className="group inline-flex items-center gap-2 text-sm font-bold text-[#7c3aed] hover:text-[#6d28d9] transition-colors"
              >
                <span>Explore Graphic Design</span>
                <span className="text-base font-normal transition-transform duration-200 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Center Floating Isometric 3D Cube Badge (connecting the 2 cards on desktop) */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="w-14 h-14 p-2.5 rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                <Cube3dIcon />
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================
            BOTTOM FLOATING PILL CTA: "Have a project in mind?"
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-14 sm:mt-18 bg-white rounded-3xl sm:rounded-full p-4 sm:p-4 px-6 sm:px-8 border border-slate-200/80 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.07)] flex flex-col sm:flex-row items-center justify-between gap-5 relative"
        >
          {/* Left: Paper Plane Circle Icon + Text */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#0d9488] flex items-center justify-center text-white shrink-0 shadow-md shadow-teal-700/25">
              <svg className="w-5 h-5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </div>
            <div>
              <h4 className="text-base sm:text-[17px] font-black text-slate-900 tracking-tight leading-tight">
                Have a project in mind?
              </h4>
              <p className="text-slate-500 text-xs sm:text-[13px] leading-snug mt-0.5">
                Let&apos;s create something amazing together.
              </p>
            </div>
          </div>

          {/* Center Playful Dashed Curve */}
          <div className="hidden md:flex items-center justify-center w-36 h-6 pointer-events-none opacity-40">
            <svg viewBox="0 0 120 20" fill="none" className="w-full h-full">
              <path
                d="M5 12 Q 35 2, 60 12 T 115 12"
                stroke="#0d9488"
                strokeWidth="1.6"
                strokeDasharray="3 3"
              />
            </svg>
          </div>

          {/* Right: Dark Teal Pill Button */}
          <Link
            href="#contact-form"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#0a4d47] hover:bg-[#073833] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-teal-950/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shrink-0"
          >
            <span>Get in Touch</span>
            <span className="text-base font-normal">→</span>
          </Link>
        </motion.div>

      </Container>
    </section>
  );
}
