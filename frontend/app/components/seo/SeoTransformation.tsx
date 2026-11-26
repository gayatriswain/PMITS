"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "../shared/Container";
import { useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const LIGHT_RED = "#fee2e2";
const DARK_RED = "#ef4444";
const LIGHT_GREEN = "#ecfdf5";
const DARK_GREEN = "#10b981";

function DecimalCounter({ value, suffix = "", duration = 2 }: { value: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      let animationFrameId: number;

      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        
        setCount(easeProgress * value);
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animateCount);
        } else {
          setCount(value);
        }
      };
      
      animationFrameId = requestAnimationFrame(animateCount);
      
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [inView, value, duration]);

  // Format to 1 decimal place if it has decimals
  const displayValue = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count).toString();

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

function SearchBar({ query }: { query: string }) {
  return (
    <div className="flex items-center gap-2 w-full h-9 pl-3 pr-2 rounded-full bg-white shadow-sm border border-slate-100 mb-5">
      <svg width="16" height="16" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
      </svg>
      <p className="text-caption flex-1 min-w-0 text-slate-700 truncate font-medium">{query}</p>
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#4285f4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    </div>
  );
}

export default function SeoTransformation() {
  const $t = useCmsText();
  return (
    <section className="relative py-[50px] bg-white overflow-hidden">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-teal-600/30" />
            <span className="text-[10px] lg:text-[11px] font-bold tracking-[0.15em] text-teal-800 uppercase">
              {$t("SeoTransformation__t1", "REAL STRATEGIES. REAL RESULTS. REAL GROWTH.")}</span>
            <div className="w-12 h-px bg-teal-600/30" />
          </div>
          <h2 className="text-h2 font-serif font-bold text-center mb-3 text-[#132a43]">
            {$t("SeoTransformation__t2", "From Invisible to ")}<span className="text-[#0f5c56]">{$t("SeoTransformation__t3", "Industry Leader.")}</span>
          </h2>
          <p className="text-body text-slate-500 text-center max-w-2xl">
            {rich($t("SeoTransformation__t4", "See what happens when your business gets the visibility it deserves."))}</p>
        </div>

        {/* Main Transformation Area */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-6">
          
          {/* Left Panel: BEFORE */}
          <div className="flex-1 bg-white rounded-[24px] border border-red-100 shadow-[0_8px_30px_rgba(239,68,68,0.06)] relative pt-10 pb-5 px-5 lg:px-6 flex flex-col">
            <div className="absolute top-0 left-6 -translate-y-1/2 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">
              {$t("SeoTransformation__t5", "BEFORE PROMANAGE SEO")}</div>
            
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-5 flex-1 mb-8">
              {/* Search Results */}
              <div className="flex-1">
                <SearchBar query="best interior designer in delhi" />
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <div key={num} className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-slate-400 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        {num}
                      </div>
                      <div className="flex-1">
                        <div className="text-[12px] font-semibold text-slate-700 leading-none mb-1">{$t("SeoTransformation__t6", "Competitor ")}{String.fromCharCode(64 + num)}</div>
                        <div className="h-1 rounded-full bg-slate-100 w-[60%]" />
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2.5 bg-red-50/50 p-1.5 -mx-1.5 rounded-lg border border-red-100/50">
                    <div className="w-6 h-6 rounded bg-red-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      {$t("SeoTransformation__t7", "8")}</div>
                    <div className="flex-1">
                      <div className="text-[12px] font-bold text-red-600 leading-none">{$t("SeoTransformation__t8", "Your Business")}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphic */}
              <div className="w-full lg:w-[180px] flex flex-col items-center justify-center pt-6 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-5">
                <div className="relative mb-5 transform scale-90">
                  {/* Storefront Graphic (Grey) */}
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <rect x="20" y="60" width="80" height="40" fill="#e2e8f0" />
                    <rect x="30" y="70" width="20" height="20" fill="#cbd5e1" />
                    <rect x="70" y="70" width="20" height="20" fill="#cbd5e1" />
                    <rect x="52" y="80" width="16" height="20" fill="#94a3b8" />
                    <path d="M10 60 L60 30 L110 60 Z" fill="#cbd5e1" />
                    <rect x="15" y="55" width="90" height="5" fill="#94a3b8" rx="2" />
                    
                    {/* Badge */}
                    <circle cx="60" cy="50" r="16" fill="#fee2e2" />
                    <path d="M53 50 A 7 7 0 0 1 67 50" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="60" cy="50" r="2" fill="#ef4444" />
                    <line x1="50" y1="40" x2="70" y2="60" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-small text-center text-slate-500 font-medium px-2">
                  {rich($t("SeoTransformation__t9", "Your business is"))}<br />{rich($t("SeoTransformation__t10", "hard to find."))}<br />{rich($t("SeoTransformation__t11", "Customers choose"))}<br />{rich($t("SeoTransformation__t12", "your competitors."))}</p>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="bg-red-50/50 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 justify-between border border-red-50">
              <div className="flex flex-col items-center text-center gap-2.5 flex-1">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-[12px] font-bold text-red-950 mb-0.5">{$t("SeoTransformation__t13", "Low Visibility")}</div>
                  <div className="text-[10px] text-slate-500 leading-snug">{$t("SeoTransformation__t14", "Buried in search results")}</div>
                </div>
              </div>
              <div className="hidden sm:block w-px bg-red-100 self-stretch" />
              <div className="flex flex-col items-center text-center gap-2.5 flex-1">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-[12px] font-bold text-red-950 mb-0.5">{$t("SeoTransformation__t15", "Few Enquiries")}</div>
                  <div className="text-[10px] text-slate-500 leading-snug">{$t("SeoTransformation__t16", "Missing potential customers")}</div>
                </div>
              </div>
              <div className="hidden sm:block w-px bg-red-100 self-stretch" />
              <div className="flex flex-col items-center text-center gap-2.5 flex-1">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                    <polyline points="16 17 22 17 22 11" />
                  </svg>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-[12px] font-bold text-red-950 mb-0.5">{$t("SeoTransformation__t17", "Slow Growth")}</div>
                  <div className="text-[10px] text-slate-500 leading-snug">{$t("SeoTransformation__t18", "Competitors taking all the opportunities")}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Transition Column */}
          <div className="flex flex-col items-center justify-center py-2 lg:py-0 shrink-0 lg:w-40 xl:w-48">
            <div className="text-center mb-3">
              <div className="text-[10px] font-bold text-[#0f5c56] tracking-wider mb-0.5">{$t("SeoTransformation__t19", "THE PROMANAGE")}<br />{$t("SeoTransformation__t20", "TRANSFORMATION")}</div>
            </div>
            
            <div className="text-center mb-4">
              <div className="text-xl font-bold text-[#0f5c56] leading-tight">{$t("SeoTransformation__t21", "6 MONTHS")}</div>
              <div className="text-[10px] font-bold text-[#0f5c56] tracking-wider">{$t("SeoTransformation__t22", "OF STRATEGIC SEO")}</div>
            </div>

            <div className="relative w-full h-12 mb-6 text-[#51a79d] hidden lg:block">
              {/* Swoosh arrow SVG */}
              <svg viewBox="0 0 200 60" fill="none" className="w-full h-full drop-shadow-md">
                <path d="M 0 30 C 50 60, 150 60, 180 20" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                <polygon points="175,10 200,20 185,45" fill="currentColor" />
              </svg>
            </div>
            <div className="relative w-12 h-12 mb-6 text-[#51a79d] block lg:hidden rotate-90">
               {/* Mobile swoosh */}
               <svg viewBox="0 0 200 60" fill="none" className="w-full h-full drop-shadow-md">
                <path d="M 0 30 C 50 60, 150 60, 180 20" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                <polygon points="175,10 200,20 185,45" fill="currentColor" />
              </svg>
            </div>

            <div className="flex flex-col gap-2.5 w-full max-w-[180px]">
              {[$t("SeoTransformation__t23", "Data-Driven Strategy"), $t("SeoTransformation__t24", "Technical Excellence"), $t("SeoTransformation__t25", "Content That Converts"), $t("SeoTransformation__t26", "Authority Building"), $t("SeoTransformation__t27", "Continuous Optimization")].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-medium text-slate-600">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: AFTER */}
          <div className="flex-[1.2] bg-white rounded-[24px] border border-teal-100 shadow-[0_12px_40px_rgba(20,184,166,0.12)] relative pt-10 pb-5 px-5 lg:px-6 flex flex-col">
            <div className="absolute top-0 right-6 lg:left-6 lg:right-auto -translate-y-1/2 bg-teal-50 border border-teal-100 text-[#0f5c56] text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">
              {$t("SeoTransformation__t28", "AFTER PROMANAGE SEO (6 MONTHS)")}</div>
            
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-5 flex-1 mb-8">
              {/* Search Results */}
              <div className="flex-[1.2]">
                <SearchBar query="best interior designer in delhi" />
                <div className="space-y-3">
                  
                  {/* Rank 1 (Active) */}
                  <div className="flex items-center gap-3 bg-white p-2.5 md:p-3 rounded-xl shadow-[0_4px_20px_rgba(20,184,166,0.15)] ring-1 ring-teal-300 relative z-10 -mx-2 md:-mx-3">
                    <div className="w-7 h-7 rounded-md bg-[#0f5c56] text-white flex items-center justify-center text-[12px] font-bold shrink-0">
                      {$t("SeoTransformation__t29", "1")}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                        <svg viewBox="0 0 40 40" width="16" height="16" aria-hidden>
                          <defs>
                            <linearGradient id="seo-logo-sm2" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0" stopColor="#1f8f84" />
                              <stop offset="1" stopColor="#0b3b35" />
                            </linearGradient>
                          </defs>
                          <path d="M6 4 H24 C31 4 35 8.5 35 15 C35 21.5 31 26 24 26 H17 V36 H6 Z M17 13 V17 H23 C24.5 17 25 16 25 15 C25 14 24.5 13 23 13 Z" fill="url(#seo-logo-sm2)" />
                          <path d="M6 26 L17 17 V36 H6 Z" fill="#0b3b35" opacity="0.55" />
                        </svg>
                        <div className="text-[13px] font-bold text-[#132a43] leading-none">{$t("SeoTransformation__t30", "Your Business")}</div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <svg key={i} width="9" height="9" viewBox="0 0 24 24" fill="#f59e0b">
                              <path d="M12 2.5L14.9 8.6L21.5 9.3L16.6 13.8L18 20.4L12 17L6 20.4L7.4 13.8L2.5 9.3L9.1 8.6Z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-[9px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded ml-auto">{$t("SeoTransformation__t31", "Top Result")}</span>
                      </div>
                      <div className="h-1 rounded-full bg-teal-400 w-[60%] mb-1" />
                      <div className="h-1 rounded-full bg-slate-200 w-[85%]" />
                    </div>
                  </div>

                  {/* Ranks 2-5 */}
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-[#7c90cd] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        {num + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-[12px] font-semibold text-slate-700 leading-none mb-1">{$t("SeoTransformation__t32", "Competitor ")}{String.fromCharCode(64 + num)}</div>
                        <div className="h-1 rounded-full bg-slate-100 w-[60%]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphic */}
              <div className="w-full lg:w-[200px] flex flex-col items-center justify-center pt-6 border-t lg:border-t-0 lg:border-l border-teal-50 lg:pl-5 relative">
                 <div className="absolute top-10 w-full h-full opacity-20 pointer-events-none scale-75">
                    <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_20s_linear_infinite]">
                      <path d="M100 0 L105 95 L200 100 L105 105 L100 200 L95 105 L0 100 L95 95 Z" fill="#10b981" />
                    </svg>
                 </div>
                <div className="relative mb-5 z-10 transform scale-90">
                  {/* Storefront Graphic (Colorful/Green) */}
                  <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                    {/* Bushes */}
                    <circle cx="20" cy="100" r="15" fill="#15803d" />
                    <circle cx="35" cy="95" r="18" fill="#166534" />
                    <circle cx="105" cy="95" r="18" fill="#166534" />
                    <circle cx="120" cy="100" r="15" fill="#15803d" />
                    
                    <rect x="25" y="70" width="90" height="40" fill="#ccfbf1" />
                    {/* Windows */}
                    <rect x="35" y="80" width="20" height="20" fill="#0f766e" />
                    <rect x="37" y="82" width="7" height="16" fill="#5eead4" />
                    <rect x="46" y="82" width="7" height="16" fill="#5eead4" />
                    <rect x="85" y="80" width="20" height="20" fill="#0f766e" />
                    <rect x="87" y="82" width="7" height="16" fill="#5eead4" />
                    <rect x="96" y="82" width="7" height="16" fill="#5eead4" />
                    
                    {/* Door */}
                    <rect x="62" y="85" width="16" height="25" fill="#0f5c56" />
                    <rect x="64" y="87" width="12" height="10" fill="#5eead4" />
                    
                    {/* Roof */}
                    <path d="M15 70 L70 35 L125 70 Z" fill="#14b8a6" />
                    <rect x="20" y="65" width="100" height="5" fill="#0f766e" rx="2" />
                    
                    {/* Awning */}
                    <path d="M22 70 L30 80 H110 L118 70 Z" fill="#115e59" />

                    {/* Star Badge */}
                    <circle cx="70" cy="55" r="18" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
                    <path d="M70 45 L73 51 L80 52 L75 57 L76 64 L70 60 L64 64 L65 57 L60 52 L67 51 Z" fill="#10b981" />
                  </svg>
                </div>
                <p className="text-small text-center text-[#132a43] font-bold px-2">
                  {rich($t("SeoTransformation__t33", "You're visible. You're trusted. You're the obvious choice."))}</p>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="bg-teal-50/70 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 justify-between border border-teal-100">
              <div className="flex flex-col items-center text-center gap-2.5 flex-1">
                <div className="w-8 h-8 rounded-full bg-white border border-teal-100 flex items-center justify-center text-[#0f5c56] shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-[14px] font-bold text-[#0f5c56] leading-none mb-1">
                    <DecimalCounter value={3.6} suffix="X" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-700 leading-tight mb-0.5">{$t("SeoTransformation__t34", "More Calls")}</div>
                  <div className="text-[9px] text-slate-500 leading-tight">{$t("SeoTransformation__t35", "From organic search")}</div>
                </div>
              </div>
              <div className="hidden sm:block w-px bg-teal-100 self-stretch" />
              <div className="flex flex-col items-center text-center gap-2.5 flex-1">
                <div className="w-8 h-8 rounded-full bg-white border border-teal-100 flex items-center justify-center text-[#0f5c56] shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <polyline points="3 7 12 13 21 7" />
                  </svg>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-[14px] font-bold text-[#0f5c56] leading-none mb-1">
                    <DecimalCounter value={4.2} suffix="X" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-700 leading-tight mb-0.5">{$t("SeoTransformation__t36", "More Enquiries")}</div>
                  <div className="text-[9px] text-slate-500 leading-tight">{$t("SeoTransformation__t37", "High-quality leads")}</div>
                </div>
              </div>
              <div className="hidden sm:block w-px bg-teal-100 self-stretch" />
              <div className="flex flex-col items-center text-center gap-2.5 flex-1">
                <div className="w-8 h-8 rounded-full bg-white border border-teal-100 flex items-center justify-center text-[#0f5c56] shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <line x1="12" y1="18" x2="12" y2="22" />
                    <line x1="12" y1="2" x2="12" y2="6" />
                  </svg>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-[14px] font-bold text-[#0f5c56] leading-none mb-1">
                    <DecimalCounter value={2.8} suffix="X" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-700 leading-tight mb-0.5">{$t("SeoTransformation__t38", "More Revenue")}</div>
                  <div className="text-[9px] text-slate-500 leading-tight">{$t("SeoTransformation__t39", "Organic traffic value")}</div>
                </div>
              </div>
              <div className="hidden sm:block w-px bg-teal-100 self-stretch" />
              <div className="flex flex-col items-center text-center gap-2.5 flex-1">
                <div className="w-8 h-8 rounded-full bg-white border border-teal-100 flex items-center justify-center text-[#0f5c56] shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-[14px] font-bold text-[#0f5c56] leading-none mb-1">{$t("SeoTransformation__t40", "Industry Leader")}</div>
                  <div className="text-[10px] font-bold text-slate-700 leading-tight mb-0.5">{$t("SeoTransformation__t41", "Dominating your")}</div>
                  <div className="text-[9px] text-slate-500 leading-tight">{$t("SeoTransformation__t42", "local market")}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
