"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "./Container";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#1b8a80";
const ORANGE = "#f59e0b";
const EASE: any = [0.16, 1, 0.3, 1];

function Counter({ value, suffix = "", duration = 2 }: { value: number, suffix?: string, duration?: number }) {
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
        const currentCount = Math.floor(easeProgress * value);
        
        setCount(currentCount);
        
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

  return <span ref={ref}>{count}{suffix}</span>;
}

const WORKFLOW_STEPS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
    ),
    label: "Higher Rankings"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "More Visitors"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    ),
    label: "More Leads"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <polyline points="4 11 10 5 16 11 22 4" />
      </svg>
    ),
    label: "More Revenue"
  }
];

const STATS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    value: 93,
    suffix: "%",
    text: "Online Experiences begin with a Search Engine",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
    ),
    value: 75,
    suffix: "%",
    text: "Users never scroll past the first page of Google",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
        <line x1="22" y1="2" x2="14" y2="10" />
        <path d="M18 2h4v4" />
      </svg>
    ),
    value: 63,
    suffix: "%",
    text: "Of clicks go to the top 3 organic results",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <polyline points="4 11 10 5 16 11 22 4" />
      </svg>
    ),
    value: 5,
    suffix: "x",
    text: "More traffic to #1 result compared to #5",
  }
];

function SearchBar() {
  return (
    <div className="flex items-center gap-4 w-full h-14 pl-5 pr-6 rounded-full bg-white shadow-[0_8px_30px_rgba(15,40,60,0.08)] border border-slate-100 mb-8 max-w-2xl mx-auto">
      <svg width="24" height="24" viewBox="0 0 48 48" aria-label="Google">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
      </svg>
      <p className="flex-1 min-w-0 text-[15px] text-slate-800 truncate font-medium">
        best digital growth partner
      </p>
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
        </svg>
      </div>
    </div>
  );
}

function SmallCard({
  rank,
  title,
  subtitle,
  active = false,
  isOwn = false,
  stars = false,
  chart = false,
  rankColor = "bg-slate-400",
}: {
  rank: number | string;
  title: string;
  subtitle: string;
  active?: boolean;
  isOwn?: boolean;
  stars?: boolean;
  chart?: boolean;
  rankColor?: string;
}) {
  return (
    <div className={`flex items-center gap-3 md:gap-4 py-4 px-3 md:px-4 ${active ? 'bg-white rounded-[16px] shadow-[0_4px_24px_rgba(20,184,166,0.2)] ring-1 ring-teal-300 z-10 relative' : 'bg-transparent'}`}>
      <div className={`w-[42px] h-[42px] shrink-0 rounded-lg flex items-center justify-center font-bold text-white text-lg ${active ? 'bg-[#0f5c56]' : rankColor}`}>
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {active && (
            <svg viewBox="0 0 40 40" width="22" height="22" aria-hidden>
              <defs>
                <linearGradient id="seo-logo-sm" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#1f8f84" />
                  <stop offset="1" stopColor="#0b3b35" />
                </linearGradient>
              </defs>
              <path d="M6 4 H24 C31 4 35 8.5 35 15 C35 21.5 31 26 24 26 H17 V36 H6 Z M17 13 V17 H23 C24.5 17 25 16 25 15 C25 14 24.5 13 23 13 Z" fill="url(#seo-logo-sm)" />
              <path d="M6 26 L17 17 V36 H6 Z" fill="#0b3b35" opacity="0.55" />
            </svg>
          )}
          <h4 className={`font-semibold truncate text-[15px] ${active ? 'text-[#132a43]' : isOwn ? 'text-teal-800' : 'text-[#132a43]'}`}>
            {title}
          </h4>
          {active && (
            <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded ml-auto">#1</span>
          )}
        </div>
        <p className={`text-[12.5px] truncate mt-0.5 ${active ? 'text-teal-700' : 'text-slate-500'}`}>
          {subtitle}
        </p>
        
        {/* Placeholder lines */}
        <div className="mt-2.5 space-y-1.5">
          <div className={`h-[5px] rounded-full w-[85%] ${active ? 'bg-teal-100' : 'bg-slate-200'}`} />
          <div className={`h-[5px] rounded-full w-[60%] ${active ? 'bg-teal-100' : 'bg-slate-200'}`} />
        </div>
      </div>
      
      {/* Right side icon/chart */}
      <div className="shrink-0 ml-2">
        {active ? (
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b">
                  <path d="M12 2.5L14.9 8.6L21.5 9.3L16.6 13.8L18 20.4L12 17L6 20.4L7.4 13.8L2.5 9.3L9.1 8.6Z" />
                </svg>
              ))}
            </div>
            <div className="w-[68px] h-[42px] bg-gradient-to-t from-teal-100/60 to-transparent rounded-lg flex items-end overflow-hidden relative">
              <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full absolute inset-0">
                <path d="M0 45 L30 35 L50 40 L80 15 L100 5" fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M0 45 L30 35 L50 40 L80 15 L100 5 V50 H0 Z" fill="#10b981" fillOpacity="0.2" stroke="none" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="w-[52px] h-[52px] rounded-[10px] bg-slate-100/80 flex items-center justify-center text-slate-300">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              <circle cx="15.5" cy="8.5" r="1.5" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SeoOpportunity() {
  return (
    <section className="relative py-12 lg:py-16 bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-px bg-slate-200" />
            <span className="text-[11px] lg:text-xs font-bold tracking-[0.15em] text-teal-800 uppercase">
              The opportunity you can't ignore
            </span>
            <div className="w-16 h-px bg-slate-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-8 items-center">
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-xl"
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.05] font-bold tracking-tight mb-8">
              <span className="block text-slate-900">Every Search Is</span>
              <span className="block text-slate-900">A Missed</span>
              <span className="block text-teal-800">
                Opportunity
                <span className="text-amber-500">.</span>
              </span>
            </h2>
            <div className="w-12 h-[3px] bg-amber-400 mb-8" />
            
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              Your potential customers are searching every day with intent. If they don't find you, they'll find your competitors.
            </p>

            <div className="flex items-start gap-4 p-5 md:p-6 rounded-2xl bg-teal-50 border border-teal-100">
              <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center shrink-0 shadow-md">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M12 2v1" />
                  <path d="M12 7v1" />
                  <path d="M4.5 9.5l.7.7" />
                  <path d="M18.8 9.5l-.7.7" />
                  <path d="M2 14h1" />
                  <path d="M21 14h1" />
                  <path d="M12 11a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
                  <path d="M12 11c-1.5 2.5-3 4-3 7h6c0-3-1.5-4.5-3-7z" />
                </svg>
              </div>
              <p className="text-sm md:text-base text-teal-900 font-medium leading-relaxed">
                <span className="font-bold">SEO isn't just about rankings.</span><br />
                It's about owning the moments that drive your business forward.
              </p>
            </div>
          </motion.div>

          {/* Right Visual Comparison */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="w-full relative"
          >
            <SearchBar />

            <div className="relative flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-16 items-stretch justify-between mt-8">
              
              {/* Center Dotted Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dotted border-slate-200 -translate-x-1/2 z-0" />

              {/* Without SEO */}
              <div className="flex-1 basis-0 min-w-0 bg-white rounded-[24px] shadow-sm border border-slate-100 px-3 md:px-4 pb-6 md:pb-8 pt-10 relative opacity-90 z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#a3b1c6] text-white text-[11px] font-bold px-5 py-1.5 rounded-full tracking-wider shadow-sm">
                  WITHOUT SEO
                </div>
                
                <div className="flex flex-col mb-8">
                  <SmallCard rank={1} title="Competitor A" subtitle="www.competitorA.com" rankColor="bg-[#6b72bd]" />
                  <div className="w-full h-px bg-slate-100 my-1" />
                  <SmallCard rank={2} title="Competitor B" subtitle="www.competitorB.com" rankColor="bg-[#7c90cd]" />
                  <div className="w-full h-px bg-slate-100 my-1" />
                  <SmallCard rank={8} title="Your Business" subtitle="www.yourbusiness.com" isOwn rankColor="bg-[#64748b]" />
                </div>
                
                <div className="flex items-center justify-center gap-2 text-[11px] md:text-xs text-slate-500 font-semibold pt-2">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                    <polyline points="16 17 22 17 22 11" />
                  </svg>
                  <span>Low Visibility • Less Traffic • Lost Customers</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-50 items-center justify-center z-20 text-teal-800">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-x-[2px]">
                  <path d="M13 17l5-5-5-5" />
                  <path d="M6 17l5-5-5-5" />
                </svg>
              </div>
              <div className="flex md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[44px] h-[44px] bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-50 items-center justify-center z-20 text-teal-800 rotate-90">
                 <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-x-[1.5px]">
                  <path d="M13 17l5-5-5-5" />
                  <path d="M6 17l5-5-5-5" />
                </svg>
              </div>

              {/* With SEO */}
              <div className="flex-1 basis-0 min-w-0 bg-white rounded-[24px] shadow-sm border border-slate-100 px-3 md:px-4 pb-6 md:pb-8 pt-10 relative z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f5c56] text-white text-[11px] font-bold px-5 py-1.5 rounded-full tracking-wider shadow-sm">
                  WITH PROMANAGE SEO
                </div>

                <div className="flex flex-col mb-8">
                  <SmallCard rank={1} title="ProManage" subtitle="www.promanage.com" active />
                  <div className="w-full h-px bg-slate-100 my-1" />
                  <SmallCard rank={2} title="Competitor A" subtitle="www.competitorA.com" rankColor="bg-[#7c90cd]" />
                  <div className="w-full h-px bg-slate-100 my-1" />
                  <SmallCard rank={3} title="Competitor B" subtitle="www.competitorB.com" rankColor="bg-[#8b9bd7]" />
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] md:text-xs text-[#0f5c56] font-bold pt-2">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                  <span>High Visibility • More Traffic • More Revenue</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
        <div className="flex flex-col items-center mt-12 md:mt-16">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-6 text-center" style={{ color: NAVY }}>
            More Visibility Drives Real Business Growth
          </h2>

          {/* Workflow */}
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-start justify-between gap-8 md:gap-0 mb-8">
            
            {WORKFLOW_STEPS.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center w-full md:w-32">
                  <div className="w-[72px] h-[72px] rounded-full bg-[#f2fafa] flex items-center justify-center text-[#0f5c56] shadow-[inset_0_0_0_1px_rgba(20,184,166,0.15)]">
                    {step.icon}
                  </div>
                  <span className="text-[13px] font-semibold text-[#132a43] text-center leading-tight mt-3">
                    {step.label}
                  </span>
                </div>
                
                {/* Mobile downward arrow */}
                {i < WORKFLOW_STEPS.length - 1 && (
                  <div className="block md:hidden text-slate-300 self-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14" />
                      <path d="M19 12l-7 7-7-7" />
                    </svg>
                  </div>
                )}
                
                {/* Desktop dashed line with arrowhead */}
                {i < WORKFLOW_STEPS.length - 1 && (
                  <div className="hidden md:flex flex-1 h-[72px] items-center relative px-2">
                    <div className="w-full border-t-[1.5px] border-dashed border-slate-300" />
                    <svg className="absolute right-0 text-slate-400 translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 3l14 9-14 9z" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4"
          >
            {STATS.map((stat, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-4 lg:gap-5 flex-1 w-full lg:w-auto">
                  <div className="w-[52px] h-[52px] shrink-0 rounded-full bg-slate-50 flex items-center justify-center text-[#0f5c56]">
                    {stat.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[28px] lg:text-[32px] font-bold leading-none mb-1.5" style={{ color: DEEP_TEAL }}>
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="text-[12px] lg:text-[13px] text-[#132a43] font-medium leading-snug">
                      {stat.text}
                    </span>
                  </div>
                </div>
                {i < STATS.length - 1 && (
                  <>
                    <div className="hidden lg:block w-px bg-slate-100 h-16 self-center" />
                    <div className="block lg:hidden w-full h-px bg-slate-100" />
                  </>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
