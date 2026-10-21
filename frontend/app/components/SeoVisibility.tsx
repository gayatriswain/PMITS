"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "./Container";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";

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
        // Easing function: easeOutQuart
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

export default function SeoVisibility() {
  return (
    <section className="py-20 lg:py-24 bg-[#F7F9FA]">
      <Container>
        <div className="flex flex-col items-center">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold mb-16 text-center" style={{ color: NAVY }}>
            More Visibility Drives Real Business Growth
          </h2>

          {/* Workflow */}
          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 mb-20 relative">
            
            {/* Background Dotted Line */}
            <div className="hidden md:block absolute top-[40px] left-16 right-16 border-t-2 border-dotted border-slate-300 -z-10" />

            {WORKFLOW_STEPS.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center relative z-10 w-full md:w-auto">
                  <div className="w-20 h-20 rounded-full bg-white shadow-sm border border-teal-50 flex items-center justify-center mb-4 text-[#0f5c56] ring-8 ring-[#F7F9FA]">
                    {step.icon}
                  </div>
                  <span className="text-[15px] font-semibold text-[#132a43] text-center">
                    {step.label}
                  </span>
                </div>
                
                {/* Mobile downward arrow (instead of horizontal dotted line) */}
                {i < WORKFLOW_STEPS.length - 1 && (
                  <div className="block md:hidden text-slate-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14" />
                      <path d="M19 12l-7 7-7-7" />
                    </svg>
                  </div>
                )}
                
                {/* Desktop horizontal arrow on the dotted line */}
                {i < WORKFLOW_STEPS.length - 1 && (
                  <div className="hidden md:flex flex-1 items-center justify-center -mt-6">
                    <div className="bg-[#F7F9FA] px-2 text-slate-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="w-full bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-8 lg:p-10 flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-6"
          >
            {STATS.map((stat, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-5 lg:gap-6 flex-1">
                  <div className="w-16 h-16 shrink-0 rounded-full bg-slate-50 flex items-center justify-center text-[#0f5c56]">
                    {stat.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl lg:text-[34px] font-bold leading-none mb-2" style={{ color: DEEP_TEAL }}>
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="text-[13px] lg:text-[14px] text-[#132a43] font-medium leading-snug">
                      {stat.text}
                    </span>
                  </div>
                </div>
                {i < STATS.length - 1 && (
                  <>
                    <div className="hidden lg:block w-px bg-slate-100 self-stretch my-2" />
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
