"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

/* =========================================================================
   FEATURE ICONS (Exact match to reference image: pure teal outlines, no box)
   ========================================================================= */

// 1. Engaging Animations: Video monitor with sparkles and play button
function VideoSparkleIcon() {
  return (
    <svg className="w-8 h-8 text-[#0d9488]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
      {/* Video display screen */}
      <rect
        x="3"
        y="6"
        width="22"
        height="17"
        rx="4"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Play button */}
      <polygon
        points="12,11 18,14.5 12,18"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
      {/* Sparkles / star accents on top right */}
      <path
        d="M28 4v4M26 6h4"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="28.5" cy="12" r="0.8" fill="currentColor" />
      <path
        d="M2 19l1.5 1.5"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 2. Creative Designs: Pen tool with bezier handle curve and nodes
function PenToolIcon() {
  return (
    <svg className="w-8 h-8 text-[#0d9488]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
      {/* Dashed bezier curve */}
      <path
        d="M4 16C10 8 22 8 28 16"
        strokeWidth="1.5"
        strokeDasharray="2.5 2.5"
        opacity="0.8"
      />
      {/* End anchor squares */}
      <rect x="3" y="14.5" width="3.5" height="3.5" rx="0.6" fill="#0d9488" />
      <rect x="25.5" y="14.5" width="3.5" height="3.5" rx="0.6" fill="#0d9488" />
      {/* Control point circle */}
      <circle cx="16" cy="10" r="2.2" fill="white" strokeWidth="1.6" />

      {/* Pen tool */}
      <path
        d="M16.5 15.5L21.5 10.5C22.3 9.7 23.3 9.9 23.8 10.5C24.3 11.1 24.5 12.1 23.7 12.9L18.7 17.9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 23.5L11.5 28L16.2 26.2L18.7 17.9L13.5 15.5L13.5 23.5Z"
        fill="#0d9488"
        fillOpacity="0.2"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="14.5" cy="22" r="1" fill="#0d9488" />
    </svg>
  );
}

// 3. On-Time Delivery: Minimalist clock
function ClockDeliveryIcon() {
  return (
    <svg className="w-8 h-8 text-[#0d9488]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
      {/* Outer clock ring */}
      <circle cx="16" cy="16" r="12" strokeWidth="1.9" />
      {/* Clock hands showing ~10:10 */}
      <path
        d="M16 9.5V16L20.5 16"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="1.6" fill="#0d9488" />
    </svg>
  );
}

// 4. Brand Focused: Bullseye target with crosshairs
function TargetBrandIcon() {
  return (
    <svg className="w-8 h-8 text-[#0d9488]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
      {/* Outer ring */}
      <circle cx="16" cy="16" r="12" strokeWidth="1.9" />
      {/* Middle ring */}
      <circle cx="16" cy="16" r="6.5" strokeWidth="1.5" strokeOpacity="0.85" />
      {/* Center bullseye */}
      <circle cx="16" cy="16" r="2.2" fill="#0d9488" />
      {/* Crosshair ticks */}
      <line x1="16" y1="1.8" x2="16" y2="6.2" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="25.8" x2="16" y2="30.2" strokeWidth="2" strokeLinecap="round" />
      <line x1="1.8" y1="16" x2="6.2" y2="16" strokeWidth="2" strokeLinecap="round" />
      <line x1="25.8" y1="16" x2="30.2" y2="16" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* =========================================================================
   MONOCHROME CHARCOAL BRAND LOGOS (Exact match to reference bottom bar)
   ========================================================================= */

function ByjusLogo() {
  const $t = useCmsText();
  return (
    <div className="flex items-center gap-2 text-slate-700">
      <div className="w-7 h-7 rounded-md bg-slate-700 flex items-center justify-center text-white font-black text-sm">
        {$t("AnimationGraphicDesignHero__t1", "B")}</div>
      <div className="flex flex-col text-left">
        <span className="text-[17px] font-black tracking-tight leading-none text-slate-800">
          {$t("AnimationGraphicDesignHero__t2", "BYJU'S")}</span>
        <span className="text-[8px] font-bold text-slate-500 tracking-tight mt-0.5">
          {$t("AnimationGraphicDesignHero__t3", "The Learning App")}</span>
      </div>
    </div>
  );
}

function LenskartLogo() {
  return (
    <div className="flex items-center gap-1.5 text-slate-700">
      <svg className="w-6 h-4 text-slate-700" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="6" cy="8" r="5" />
        <circle cx="22" cy="8" r="5" />
        <path d="M11 6.5C13 5 15 5 17 6.5" strokeLinecap="round" />
      </svg>
      <span className="text-[18px] font-bold tracking-tight lowercase text-slate-800 font-sans">
        lenskart
      </span>
    </div>
  );
}

function OyoLogo() {
  const $t = useCmsText();
  return (
    <div className="flex items-center text-slate-800">
      <span className="text-[25px] font-black tracking-tighter text-slate-800 font-sans">
        {$t("AnimationGraphicDesignHero__t4", "OYO")}</span>
    </div>
  );
}

function MyntraLogo() {
  const $t = useCmsText();
  return (
    <div className="flex items-center gap-1.5 text-slate-700">
      <svg className="w-5 h-4 text-slate-700" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 17L7 4L12 14L17 4L22 17" />
      </svg>
      <span className="text-[17px] font-extrabold tracking-tight text-slate-800 font-sans">
        {$t("AnimationGraphicDesignHero__t5", "Myntra")}</span>
    </div>
  );
}

function BoatLogo() {
  return (
    <div className="flex items-center text-slate-800">
      <span className="text-[22px] font-black tracking-tight text-slate-800 lowercase font-sans">
        bo<span className="relative inline-block">a<span className="absolute -top-1.5 left-0.5 w-1.5 h-1.5 bg-slate-800 rotate-45" /></span>t
      </span>
    </div>
  );
}

function ZomatoLogo() {
  return (
    <div className="flex items-center text-slate-800">
      <span className="text-[20px] font-black tracking-tight italic text-slate-800 font-sans lowercase">
        zomato
      </span>
    </div>
  );
}

function MapsLogo() {
  const $t = useCmsText();
  return (
    <div className="flex items-center text-slate-800">
      <span className="text-[18px] font-black tracking-tight text-slate-800">
        maps<span className="text-[12px] font-semibold text-slate-500">{$t("AnimationGraphicDesignHero__t6", ".com")}</span>
      </span>
    </div>
  );
}

/* =========================================================================
   MAIN HERO COMPONENT
   ========================================================================= */

export default function AnimationGraphicDesignHero() {
  const $t = useCmsText();
  return (
    <section className="relative w-full bg-white pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 overflow-hidden">
      <Container className="relative z-10">
        
        {/* Top 2-Column Section: Left Text (5 cols) & Right 3D Visual (7 cols) for Bigger Size */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* LEFT COLUMN: Badge, Heading, Subtitle, Buttons, 4 Features */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center">
            
            {/* Tag Badge with Underline */}
            <div className="mb-4 sm:mb-5">
              <span className="text-[11px] sm:text-[12px] font-black tracking-[0.22em] text-[#0d9488] uppercase block">
                {$t("AnimationGraphicDesignHero__t7", "ANIMATION & GRAPHIC DESIGN")}</span>
              <div className="w-10 h-[3px] bg-[#0d9488] rounded-full mt-2" />
            </div>

            {/* Main Headline */}
            <h1 className="text-h1 font-black text-[#0f2333] tracking-tight mb-5 sm:mb-6 font-sans">
              {$t("AnimationGraphicDesignHero__t8", "Design That ")}<span className="text-[#0d9488]">{$t("AnimationGraphicDesignHero__t9", "Speaks.")}</span>
              <br />
              {$t("AnimationGraphicDesignHero__t10", "Animation That ")}<span className="text-[#6366f1]">{$t("AnimationGraphicDesignHero__t11", "Moves.")}</span>
            </h1>

            {/* Subheading */}
            <p className="text-body text-slate-500 max-w-xl mb-8 sm:mb-10 font-normal">
              {rich($t("AnimationGraphicDesignHero__t12", "We create powerful animations and stunning designs that communicate your message, captivate your audience and elevate your brand."))}</p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-10 sm:mb-14">
              {/* Primary Solid Teal Pill */}
              <Link
                href={$t("AnimationGraphicDesignHero__t13", "#contact-form")}
                className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full bg-[#0d9488] hover:bg-[#0b7a70] text-white font-semibold text-sm sm:text-[15px] shadow-[0_8px_20px_-4px_rgba(13,148,136,0.35)] transition-colors duration-200"
              >
                <span>{$t("AnimationGraphicDesignHero__t14", "Explore Our Work")}</span>
                <span className="text-base font-normal">→</span>
              </Link>

              {/* Secondary Outline Teal Pill */}
              <Link
                href={$t("AnimationGraphicDesignHero__t15", "#contact-form")}
                className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full border-2 border-[#14b8a6] hover:bg-teal-50/60 text-[#0d9488] font-semibold text-sm sm:text-[15px] transition-colors duration-200"
              >
                <span>{$t("AnimationGraphicDesignHero__t16", "Discuss Your Project")}</span>
                <span className="text-base font-normal">→</span>
              </Link>
            </div>

            {/* 4 Feature Columns: Direct teal icons, NO background box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
              {/* Feature 1 */}
              <div className="flex flex-col items-start gap-2">
                <VideoSparkleIcon />
                <div>
                  <h3 className="font-bold text-slate-800 text-[13px] sm:text-[13.5px] leading-tight mb-1">
                    {$t("AnimationGraphicDesignHero__t17", "Engaging Animations")}</h3>
                  <p className="text-slate-500 text-[11px] sm:text-[11.5px] leading-snug">
                    {rich($t("AnimationGraphicDesignHero__t18", "2D, 3D & motion graphics that tell your story."))}</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-start gap-2">
                <PenToolIcon />
                <div>
                  <h3 className="font-bold text-slate-800 text-[13px] sm:text-[13.5px] leading-tight mb-1">
                    {$t("AnimationGraphicDesignHero__t19", "Creative Designs")}</h3>
                  <p className="text-slate-500 text-[11px] sm:text-[11.5px] leading-snug">
                    {rich($t("AnimationGraphicDesignHero__t20", "Eye-catching visuals that build your brand."))}</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-start gap-2">
                <ClockDeliveryIcon />
                <div>
                  <h3 className="font-bold text-slate-800 text-[13px] sm:text-[13.5px] leading-tight mb-1">
                    {$t("AnimationGraphicDesignHero__t21", "On-Time Delivery")}</h3>
                  <p className="text-slate-500 text-[11px] sm:text-[11.5px] leading-snug">
                    {rich($t("AnimationGraphicDesignHero__t22", "High-quality deliverables on time, every time."))}</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-start gap-2">
                <TargetBrandIcon />
                <div>
                  <h3 className="font-bold text-slate-800 text-[13px] sm:text-[13.5px] leading-tight mb-1">
                    {$t("AnimationGraphicDesignHero__t23", "Brand Focused")}</h3>
                  <p className="text-slate-500 text-[11px] sm:text-[11.5px] leading-snug">
                    {rich($t("AnimationGraphicDesignHero__t24", "Designs that connect and convert."))}</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D Workspace Visual (Enlarged, White Faded Borders, NO shadow, NO hover effect, 2 Floating Cards) */}
          <div className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-[760px] lg:max-w-none">
              
              {/* Image Container with White Faded Edge Effects so borders melt seamlessly into the white page */}
              <div className="relative w-full overflow-hidden">
                
                {/* Clean 3D Workspace PNG (No cards burned in, High-Res, No hover effect, No shadow) */}
                <Image
                  src={$t("AnimationGraphicDesignHero__t25", "/animation-graphic-clean.png")}
                  alt={$t("AnimationGraphicDesignHero__t26", "Animation & Graphic Design 3D Workspace")}
                  width={1672}
                  height={941}
                  priority
                  className="w-full h-auto object-contain block select-none pointer-events-none"
                />

                {/* White Faded Borders (Vignette overlays to remove any hard image boundaries) */}
                {/* Left Edge Fade */}
                <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none z-10" />
                {/* Top Edge Fade */}
                <div className="absolute inset-x-0 top-0 h-12 sm:h-16 bg-gradient-to-b from-white via-white/60 to-transparent pointer-events-none z-10" />
                {/* Right Edge Fade */}
                <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white via-white/60 to-transparent pointer-events-none z-10" />
                {/* Bottom Edge Fade */}
                <div className="absolute inset-x-0 bottom-0 h-10 sm:h-16 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-10" />
              </div>

              {/* FLOATING CARD 1: Smooth Animation (Top-Left of Monitor) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] left-[2%] sm:left-[5%] lg:left-[4%] bg-white rounded-2xl p-3 sm:p-4 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col justify-between w-[115px] sm:w-[142px] z-20 pointer-events-none"
              >
                <div className="text-slate-800 font-bold text-xs sm:text-[13px] leading-tight">
                  {$t("AnimationGraphicDesignHero__t27", "Smooth")}<br />{$t("AnimationGraphicDesignHero__t28", "Animation")}</div>
                <div className="mt-2.5 w-full">
                  <svg viewBox="0 0 64 20" fill="none" className="w-full h-auto">
                    <path
                      d="M2 13 C 14 13, 20 4, 32 4 C 44 4, 50 15, 62 15"
                      stroke="#0d9488"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* FLOATING CARD 2: Creative Designs (Right side of Monitor) */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute top-[32%] right-[2%] sm:right-[4%] lg:right-[3%] bg-white rounded-2xl p-3 sm:p-4 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col justify-between w-[120px] sm:w-[152px] z-20 pointer-events-none"
              >
                <div className="text-slate-800 font-bold text-xs sm:text-[13px] leading-tight mb-2">
                  {$t("AnimationGraphicDesignHero__t29", "Creative")}<br />{$t("AnimationGraphicDesignHero__t30", "Designs")}</div>
                <div className="w-full h-9 sm:h-11 flex items-center justify-center">
                  <svg viewBox="0 0 64 48" fill="none" className="w-full h-full">
                    {/* Horizontal handle guide line */}
                    <line x1="8" y1="14" x2="56" y2="14" stroke="#06b6d4" strokeWidth="1.5" />
                    {/* Anchor handles */}
                    <rect x="4" y="10" width="8" height="8" rx="1.5" fill="#06b6d4" />
                    <rect x="52" y="10" width="8" height="8" rx="1.5" fill="#8b5cf6" />
                    {/* Bezier arc curve */}
                    <path
                      d="M8 26 C 8 10, 56 10, 56 26"
                      stroke="#06b6d4"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    {/* Pen nib */}
                    <path
                      d="M32 20 L37 28 L35 38 L29 38 L27 28 Z"
                      fill="#0d9488"
                      fillOpacity="0.2"
                      stroke="#0d9488"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <line x1="32" y1="20" x2="32" y2="30" stroke="#0d9488" strokeWidth="1.5" />
                    <circle cx="32" cy="30" r="1.5" fill="#0d9488" />
                  </svg>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

        {/* BOTTOM: "TRUSTED BY BRANDS THAT TRUST US" & DIVIDER ROW */}
        <div className="mt-14 sm:mt-18 pt-8 text-center">
          {/* Header uppercase label in teal */}
          <p className="text-[11px] sm:text-[11.5px] font-black tracking-[0.24em] text-[#0d9488] uppercase mb-6 sm:mb-8">
            {rich($t("AnimationGraphicDesignHero__t31", "TRUSTED BY BRANDS THAT TRUST US"))}</p>

          {/* Logos Row with vertical dividers matching the reference */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-7 lg:gap-8 px-2 max-w-6xl mx-auto opacity-80 hover:opacity-100 transition-opacity">
            <ByjusLogo />
            <div className="hidden md:block h-6 w-[1px] bg-slate-200" />
            <LenskartLogo />
            <div className="hidden md:block h-6 w-[1px] bg-slate-200" />
            <OyoLogo />
            <div className="hidden md:block h-6 w-[1px] bg-slate-200" />
            <MyntraLogo />
            <div className="hidden md:block h-6 w-[1px] bg-slate-200" />
            <BoatLogo />
            <div className="hidden md:block h-6 w-[1px] bg-slate-200" />
            <ZomatoLogo />
            <div className="hidden md:block h-6 w-[1px] bg-slate-200" />
            <MapsLogo />
          </div>
        </div>

      </Container>
    </section>
  );
}
