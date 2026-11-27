"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

/* =========================================================================
   FEATURE ICONS
   ========================================================================= */

// Card 1: Strategy-Led Creativity (Pen Tool with Vector Nodes)
function PenToolCircleIcon() {
  return (
    <svg className="w-6 h-6 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Curved bezier handle bar */}
      <path d="M4 6c4-1 12-1 16 0" strokeLinecap="round" />
      <circle cx="4" cy="6" r="1.5" fill="#7c3aed" />
      <circle cx="20" cy="6" r="1.5" fill="#7c3aed" />
      {/* Pen tool body and nib */}
      <path d="M12 21l-3.5-7 3.5-3 3.5 3L12 21z" strokeLinejoin="round" />
      <line x1="12" y1="11" x2="12" y2="15" strokeLinecap="round" />
      <circle cx="12" cy="11" r="1.5" fill="#7c3aed" />
    </svg>
  );
}

// Card 2: Emotive Animations (Monitor Play Screen)
function PlayScreenCircleIcon() {
  return (
    <svg className="w-6 h-6 text-[#0284c7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="12" rx="2.5" />
      <polygon points="10 7.5 15 10 10 12.5" strokeWidth="2" strokeLinejoin="round" fill="#0284c7" fillOpacity="0.2" />
      <line x1="12" y1="16" x2="12" y2="19" strokeLinecap="round" />
      <line x1="9" y1="19" x2="15" y2="19" strokeLinecap="round" />
    </svg>
  );
}

// Card 3: Premium, Modern Aesthetics (Diamond)
function DiamondCircleIcon() {
  return (
    <svg className="w-6 h-6 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <polygon points="6 4 18 4 22 9 12 21 2 9" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <polyline points="9 4 12 9 15 4" />
      <line x1="7.5" y1="9" x2="12" y2="21" />
      <line x1="16.5" y1="9" x2="12" y2="21" />
    </svg>
  );
}

// Card 4: End-to-End Support (Stacked Isometric Layers)
function LayersCircleIcon() {
  return (
    <svg className="w-6 h-6 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 3 21 7.5 12 12 3 7.5" strokeLinejoin="round" />
      <polyline points="3 12 12 16.5 21 12" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="3 16.5 12 21 21 16.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Card 5: Focus on Results (Bullseye with Dart/Arrow)
function TargetCircleIcon() {
  return (
    <svg className="w-6 h-6 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="2" fill="#7c3aed" />
      {/* Dart hitting target from top-right */}
      <line x1="18" y1="6" x2="13.5" y2="10.5" strokeLinecap="round" />
      <polyline points="15 5 19 5 19 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Card 6: A Dedicated Creative Team (Heart)
function HeartCircleIcon() {
  return (
    <svg className="w-6 h-6 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

// Stat Icons
function UsersStatIcon() {
  return (
    <svg className="w-5 h-5 text-[#0d9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function SmileyStatIcon() {
  return (
    <svg className="w-5 h-5 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" />
      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round" />
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function GlobeStatIcon() {
  return (
    <svg className="w-5 h-5 text-[#06b6d4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function StarStatIcon() {
  return (
    <svg className="w-5 h-5 text-[#8b5cf6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* =========================================================================
   MAIN COMPONENT: CreativePartnershipSection
   ========================================================================= */

export default function CreativePartnershipSection() {
  const $t = useCmsText();
  return (
    <section className="relative w-full bg-white py-14 sm:py-20 lg:py-24 overflow-hidden">
      
      {/* Background subtle radial lighting */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-cyan-100/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-purple-100/25 rounded-full blur-[150px] pointer-events-none" />

      {/* =========================================================
          FULL-BLEED 3D WAVE ARTWORK (Touching screen left edge,
          flowing behind the 6 feature cards on the right)
          ========================================================= */}
      <div className="hidden lg:block absolute left-0 top-[310px] xl:top-[330px] 2xl:top-[350px] w-[62%] xl:w-[66%] 2xl:w-[68%] h-[380px] xl:h-[440px] 2xl:h-[480px] pointer-events-none z-10">
        <div className="relative w-full h-full">
          <Image
            src={$t("CreativePartnershipSection__t1", "/animation-graphic-design2-seamless.webp")}
            alt={$t("CreativePartnershipSection__t2", "Creative Motion Wave Artwork")}
            fill
            priority
            sizes="65vw"
            className="object-contain object-left select-none"
          />
        </div>

        {/* Bottom soft gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      {/* Main Full-Width Content Container */}
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-20">
        
        {/* Top 2-Column Layout: Left Typography / Right 6-Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* =========================================================
              LEFT COLUMN: Header Content
              ========================================================= */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between h-full relative z-20">
            
            {/* Header Content */}
            <div className="max-w-xl">
              {/* Badge: + WHY CHOOSE US */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-slate-200/90 text-[11px] font-black tracking-widest text-slate-700 uppercase mb-5">
                <span className="text-[#0d9488] font-bold text-xs">+</span>
                <span>{html($t("CreativePartnershipSection__t3", "WHY CHOOSE US"))}</span>
              </div>

              {/* Headline: More Than Design. A Creative Partnership. */}
              <h2 className="text-h2 font-black tracking-tight text-slate-900 mb-4 font-sans">
                {html($t("CreativePartnershipSection__t4", "More Than Design. "))}<br />
                {html($t("CreativePartnershipSection__t5", "A "))}<span className="text-[#06b6d4]">{html($t("CreativePartnershipSection__t6", "Creative"))}</span>{" "}
                <span className="relative inline-block text-[#7c3aed]">
                  {html($t("CreativePartnershipSection__t7", "Partnership."))}{/* Purple brush underline sweep */}
                  <svg className="absolute -bottom-1.5 left-0 w-full h-3.5 text-[#7c3aed] pointer-events-none" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M2 9 C 30 2, 70 2, 98 9" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-body text-slate-500 font-normal max-w-lg mb-6">
                {rich($t("CreativePartnershipSection__t8", "We don’t just create visuals — we craft experiences that make your brand look exceptional and stay memorable."))}</p>
            </div>

            {/* Mobile wave fallback (screen-touching on mobile) */}
            <div className="lg:hidden relative w-screen -ml-4 sm:-ml-8 h-[260px] sm:h-[320px] my-6 overflow-hidden">
              <Image
                src={$t("CreativePartnershipSection__t9", "/animation-graphic-design2-seamless.webp")}
                alt={$t("CreativePartnershipSection__t10", "Creative Motion Wave Artwork")}
                fill
                priority
                className="object-contain object-left select-none pointer-events-none"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>

            {/* Desktop spacer matching wave height */}
            <div className="hidden lg:block h-[280px] xl:h-[340px]" />

          </div>

          {/* =========================================================
              RIGHT COLUMN: 6 Feature Cards (Floating ON TOP of faded wave)
              ========================================================= */}
          <div className="lg:col-span-7 xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 relative z-20">
            
            {/* Card 1: Strategy-Led Creativity */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[26px] p-5 sm:p-6 xl:p-7 pt-7 sm:pt-8 border border-slate-100/90 shadow-[0_12px_36px_rgba(124,58,237,0.08)] hover:shadow-2xl hover:shadow-purple-900/12 hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-start group relative overflow-hidden"
            >
              {/* Colored Line ON the Card's Top Border */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 rounded-b-full bg-gradient-to-r from-[#4f46e5] to-[#9333ea]" />
              {/* Glowing Icon Disc */}
              <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-b from-[#f3e8ff] to-[#e9d5ff] border border-purple-200/60 shadow-[0_4px_16px_rgba(147,51,234,0.14)] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                <PenToolCircleIcon />
              </div>
              <h3 className="font-black text-[#0f172a] text-[15.5px] sm:text-[16.5px] leading-tight mb-2 tracking-tight">
                {html($t("CreativePartnershipSection__t11", "Strategy-Led Creativity"))}</h3>
              <p className="text-caption text-slate-500 max-w-[245px] font-normal">
                {rich($t("CreativePartnershipSection__t12", "Designs backed by purpose, not just pixels — aligned with your business goals."))}</p>
            </motion.div>

            {/* Card 2: Emotive Animations */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-white rounded-[26px] p-5 sm:p-6 xl:p-7 pt-7 sm:pt-8 border border-slate-100/90 shadow-[0_12px_36px_rgba(2,132,199,0.08)] hover:shadow-2xl hover:shadow-sky-900/12 hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-start group relative overflow-hidden"
            >
              {/* Colored Line ON the Card's Top Border */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 rounded-b-full bg-gradient-to-r from-[#0284c7] to-[#0d9488]" />
              {/* Glowing Icon Disc */}
              <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-b from-[#e0f2fe] to-[#bae6fd] border border-sky-200/60 shadow-[0_4px_16px_rgba(2,132,199,0.14)] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                <PlayScreenCircleIcon />
              </div>
              <h3 className="font-black text-[#0f172a] text-[15.5px] sm:text-[16.5px] leading-tight mb-2 tracking-tight">
                {html($t("CreativePartnershipSection__t13", "Emotive Animations"))}</h3>
              <p className="text-caption text-slate-500 max-w-[245px] font-normal">
                {rich($t("CreativePartnershipSection__t14", "Motion that tells your story, captures attention and drives action."))}</p>
            </motion.div>

            {/* Card 3: Premium, Modern Aesthetics */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="bg-white rounded-[26px] p-5 sm:p-6 xl:p-7 pt-7 sm:pt-8 border border-slate-100/90 shadow-[0_12px_36px_rgba(13,148,136,0.08)] hover:shadow-2xl hover:shadow-teal-900/12 hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-start group relative overflow-hidden"
            >
              {/* Colored Line ON the Card's Top Border */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 rounded-b-full bg-gradient-to-r from-[#0d9488] to-[#06b6d4]" />
              {/* Glowing Icon Disc */}
              <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-b from-[#ccfbf1] to-[#99f6e4] border border-teal-200/60 shadow-[0_4px_16px_rgba(13,148,136,0.14)] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                <DiamondCircleIcon />
              </div>
              <h3 className="font-black text-[#0f172a] text-[15.5px] sm:text-[16.5px] leading-tight mb-2 tracking-tight">
                {html($t("CreativePartnershipSection__t15", "Premium, Modern Aesthetics"))}</h3>
              <p className="text-caption text-slate-500 max-w-[245px] font-normal">
                {rich($t("CreativePartnershipSection__t16", "Clean, polished and on-brand visuals that make a lasting impression."))}</p>
            </motion.div>

            {/* Card 4: End-to-End Support */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="bg-white rounded-[26px] p-5 sm:p-6 xl:p-7 pt-7 sm:pt-8 border border-slate-100/90 shadow-[0_12px_36px_rgba(139,92,246,0.08)] hover:shadow-2xl hover:shadow-purple-900/12 hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-start group relative overflow-hidden"
            >
              {/* Colored Line ON the Card's Top Border */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 rounded-b-full bg-gradient-to-r from-[#6366f1] to-[#a855f7]" />
              {/* Glowing Icon Disc */}
              <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-b from-[#f3e8ff] to-[#e9d5ff] border border-purple-200/60 shadow-[0_4px_16px_rgba(147,51,234,0.14)] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                <LayersCircleIcon />
              </div>
              <h3 className="font-black text-[#0f172a] text-[15.5px] sm:text-[16.5px] leading-tight mb-2 tracking-tight">
                {html($t("CreativePartnershipSection__t17", "End-to-End Support"))}</h3>
              <p className="text-caption text-slate-500 max-w-[245px] font-normal">
                {rich($t("CreativePartnershipSection__t18", "Concept to final deliverable — we handle everything, seamlessly."))}</p>
            </motion.div>

            {/* Card 5: Focus on Results */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="bg-white rounded-[26px] p-5 sm:p-6 xl:p-7 pt-7 sm:pt-8 border border-slate-100/90 shadow-[0_12px_36px_rgba(124,58,237,0.08)] hover:shadow-2xl hover:shadow-purple-900/12 hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-start group relative overflow-hidden"
            >
              {/* Colored Line ON the Card's Top Border */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 rounded-b-full bg-gradient-to-r from-[#4f46e5] to-[#9333ea]" />
              {/* Glowing Icon Disc */}
              <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-b from-[#ede9fe] to-[#ddd6fe] border border-violet-200/60 shadow-[0_4px_16px_rgba(124,58,237,0.14)] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                <TargetCircleIcon />
              </div>
              <h3 className="font-black text-[#0f172a] text-[15.5px] sm:text-[16.5px] leading-tight mb-2 tracking-tight">
                {html($t("CreativePartnershipSection__t19", "Focus on Results"))}</h3>
              <p className="text-caption text-slate-500 max-w-[245px] font-normal">
                {rich($t("CreativePartnershipSection__t20", "Visuals that engage your audience, strengthen brand trust and boost growth."))}</p>
            </motion.div>

            {/* Card 6: A Dedicated Creative Team */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-[26px] p-5 sm:p-6 xl:p-7 pt-7 sm:pt-8 border border-slate-100/90 shadow-[0_12px_36px_rgba(13,148,136,0.08)] hover:shadow-2xl hover:shadow-teal-900/12 hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-start group relative overflow-hidden"
            >
              {/* Colored Line ON the Card's Top Border */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 rounded-b-full bg-gradient-to-r from-[#0284c7] to-[#0d9488]" />
              {/* Glowing Icon Disc */}
              <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-b from-[#ccfbf1] to-[#99f6e4] border border-teal-200/60 shadow-[0_4px_16px_rgba(13,148,136,0.14)] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                <HeartCircleIcon />
              </div>
              <h3 className="font-black text-[#0f172a] text-[15.5px] sm:text-[16.5px] leading-tight mb-2 tracking-tight">
                {html($t("CreativePartnershipSection__t21", "A Dedicated Creative Team"))}</h3>
              <p className="text-caption text-slate-500 max-w-[245px] font-normal">
                {rich($t("CreativePartnershipSection__t22", "Passionate designers and animators who treat your brand like our own."))}</p>
            </motion.div>

          </div>

        </div>

        {/* =========================================================
            BOTTOM STATS & MINI-CTA CARD BAR
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-3xl p-6 sm:p-7 lg:py-6 lg:px-8 border border-slate-200/80 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.06)] mt-14 sm:mt-18 relative z-20"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            {/* Callout: CREATING IMPACT, One Frame at a Time */}
            <div className="w-full lg:w-auto lg:pr-6 text-center lg:text-left flex-shrink-0">
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 block mb-0.5">
                {html($t("CreativePartnershipSection__t23", "CREATING IMPACT,"))}</span>
              <span className="text-xl sm:text-[22px] font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-[#0d9488] via-[#06b6d4] to-[#7c3aed] block leading-tight font-serif">
                {html($t("CreativePartnershipSection__t24", "One Frame at a Time."))}</span>
              {/* Subtle underline sweep */}
              <svg className="w-28 h-2 text-[#0d9488]/80 mt-1 mx-auto lg:mx-0" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M2 6 C 35 1, 65 1, 98 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Stat 1: 500+ Projects Delivered */}
            <div className="w-full lg:w-auto pt-4 lg:pt-0 lg:px-6 flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mb-2">
                <UsersStatIcon />
              </div>
              <span className="text-2xl sm:text-[28px] font-black text-slate-900 tracking-tight leading-none">
                {html($t("CreativePartnershipSection__t25", "500+"))}</span>
              <span className="text-[11.5px] font-semibold text-slate-500 mt-1">
                {html($t("CreativePartnershipSection__t26", "Projects Delivered"))}</span>
            </div>

            {/* Stat 2: 100+ Happy Clients */}
            <div className="w-full lg:w-auto pt-4 lg:pt-0 lg:px-6 flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-2">
                <SmileyStatIcon />
              </div>
              <span className="text-2xl sm:text-[28px] font-black text-slate-900 tracking-tight leading-none">
                {html($t("CreativePartnershipSection__t27", "100+"))}</span>
              <span className="text-[11.5px] font-semibold text-slate-500 mt-1">
                {html($t("CreativePartnershipSection__t28", "Happy Clients"))}</span>
            </div>

            {/* Stat 3: 10+ Industries Served */}
            <div className="w-full lg:w-auto pt-4 lg:pt-0 lg:px-6 flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center mb-2">
                <GlobeStatIcon />
              </div>
              <span className="text-2xl sm:text-[28px] font-black text-slate-900 tracking-tight leading-none">
                {html($t("CreativePartnershipSection__t29", "10+"))}</span>
              <span className="text-[11.5px] font-semibold text-slate-500 mt-1">
                {html($t("CreativePartnershipSection__t30", "Industries Served"))}</span>
            </div>

            {/* Stat 4: 4.9/5 Client Rating */}
            <div className="w-full lg:w-auto pt-4 lg:pt-0 lg:px-6 flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center mb-2">
                <StarStatIcon />
              </div>
              <span className="text-2xl sm:text-[28px] font-black text-slate-900 tracking-tight leading-none">
                {html($t("CreativePartnershipSection__t31", "4.9/5"))}</span>
              <span className="text-[11.5px] font-semibold text-slate-500 mt-0.5">
                {html($t("CreativePartnershipSection__t32", "Client Rating"))}</span>
              <div className="text-amber-400 text-xs mt-1 tracking-wider">
                ★★★★★
              </div>
            </div>

            {/* Mini-CTA: Let's Create Something Extraordinary Together. */}
            <div className="w-full lg:w-auto pt-4 lg:pt-0 lg:pl-6 flex flex-col items-center lg:items-end justify-center flex-shrink-0">
              <div className="text-center lg:text-right mb-2.5">
                <p className="text-[11.5px] font-bold text-slate-800 leading-tight">
                  {rich($t("CreativePartnershipSection__t33", "Let's Create Something"))}</p>
                <p className="text-small font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-[#0d9488] to-[#7c3aed]">
                  {rich($t("CreativePartnershipSection__t34", "Extraordinary Together."))}</p>
                <div className="w-20 h-0.5 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full mt-1 ml-auto hidden lg:block opacity-75" />
              </div>
              <Link
                href={$t("CreativePartnershipSection__t35", "#contact-form")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#052b36] via-[#0d2347] to-[#581c87] hover:opacity-95 text-white font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>{html($t("CreativePartnershipSection__t36", "Start Your Project"))}</span>
                <span className="text-sm">→</span>
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
