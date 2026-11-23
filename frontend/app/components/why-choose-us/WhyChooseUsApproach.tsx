"use client";

import React from "react";
import Image from "next/image";
import { TrendingUp, Flag, Users, Target, Code, Rocket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const NAVY = "#0a1f2c";
const TEAL = "#0d9488";
const GREEN = "#65a30d"; // Light green for the right side

const STEPS = [
  {
    id: "01",
    title: "UNDERSTAND",
    desc: <>We listen, research and understand your <span className="font-bold text-[#0284c7]">goals, users</span> and <span className="font-bold text-[#0284c7]">challenges</span>.</>,
    icon: Users,
    color: "#0ea5e9", // Light blue
    numberColor: "#bae6fd",
    iconBg: "#f0f9ff"
  },
  {
    id: "02",
    title: "STRATEGIZE",
    desc: <>We plan the right approach with a solution <span className="font-bold text-[#0284c7]">tailored</span> to your business.</>,
    icon: Target,
    color: "#0ea5e9", // Light blue
    numberColor: "#bae6fd",
    iconBg: "#f0f9ff"
  },
  {
    id: "03",
    title: "BUILD",
    desc: <>We design and develop <span className="font-bold text-[#16a34a]">powerful, scalable</span> and <span className="font-bold text-[#16a34a]">user-friendly</span> solutions.</>,
    icon: Code,
    color: "#65a30d", // Green
    numberColor: "#d9f99d",
    iconBg: "#f7fee7"
  },
  {
    id: "04",
    title: "GROW",
    desc: <>We support, optimize and help you <span className="font-bold text-[#16a34a]">grow</span> continuously in the digital world.</>,
    icon: TrendingUp,
    color: "#65a30d", // Green
    numberColor: "#d9f99d",
    iconBg: "#f7fee7"
  }
];

// Custom Mountain Flag Icon since standard Lucide doesn't have this exact combo
const MountainFlagIcon = ({ size = 32, color = TEAL }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" />
    <path d="M12 3v18" />
    <path d="M12 3c1.5 1 3 1 4 0v4c-1 1-2.5 1-4 0z" fill={color} stroke="none" />
  </svg>
);

export default function WhyChooseUsApproach() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-0 relative z-10">
          <p className="text-[11px] font-extrabold tracking-widest uppercase mb-4 flex items-center justify-center gap-4" style={{ color: TEAL }}>
            <span className="w-8 h-px bg-current opacity-50"></span>
            WHY BUSINESSES CHOOSE PROMANAGE
            <span className="w-8 h-px bg-current opacity-50"></span>
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5" style={{ color: NAVY }}>
            Clarity. Strategy. <span style={{ color: TEAL }}>Results.</span>
          </h2>
          <p className="text-lg text-slate-600">
            We turn challenges into growth—step by step.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 -mt-8 relative z-0">
          
          {/* Left Card: Challenge */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-[250px]"
          >
            {/* Skewed Container */}
            <div className="absolute inset-0 border-[1.5px] border-[#0ea5e9]/30 rounded-2xl bg-white shadow-sm skew-x-[6deg] origin-bottom transform-gpu" />
            
            {/* Un-skewed Content */}
            <div className="relative p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#f0f9ff] flex items-center justify-center mb-6 border-[3px] border-white shadow-sm">
                <MountainFlagIcon color="#0284c7" size={32} />
              </div>
              <h3 className="text-[14px] font-bold tracking-widest mb-6 leading-tight" style={{ color: "#0284c7" }}>
                YOUR BUSINESS<br />CHALLENGE
              </h3>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-6 font-medium">
                Every business faces unique challenges.
              </p>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                We start by truly <br/><span className="font-bold text-[#0284c7]">understanding</span> them.
              </p>
            </div>
          </motion.div>

          {/* Left Arrow (Desktop only) */}
          <div className="hidden lg:flex items-center gap-2 w-16 xl:w-24 z-10">
            <div className="flex-1 border-t-[2.5px] border-dotted border-teal-500 relative h-0">
              {/* Arrow Head */}
              <div className="absolute top-1/2 right-[-2px] -translate-y-1/2 w-0 h-0 border-y-[4.5px] border-y-transparent border-l-[7px] border-l-teal-600"></div>
            </div>
          </div>

          {/* Center Image with Overlaid Text */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-[440px] h-[440px] shrink-0 flex items-center justify-center my-8 lg:my-0 z-20"
          >
            {/* The Image from public folder */}
            <Image 
              src="/why-choose -us.png" 
              alt="ProManage Approach" 
              fill 
              className="object-contain drop-shadow-xl"
              priority
            />
            
            {/* Overlaid Text in Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center -mt-2">
              <div className="w-6 h-6 mb-2 opacity-80 flex items-center justify-center">
                 <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <h3 className="text-[11px] font-extrabold tracking-widest text-white/90 mb-1.5 leading-tight uppercase">
                THE PROMANAGE
              </h3>
              <h3 className="text-[20px] font-black tracking-wider mb-5 uppercase" style={{ color: TEAL }}>
                APPROACH
              </h3>
              <p className="text-[12px] font-semibold text-white/90 leading-[1.8]">
                Smart strategy.<br/>
                Creative thinking.<br/>
                Powerful technology.<br/>
                Real results.
              </p>
            </div>
          </motion.div>

          {/* Right Arrow (Desktop only) */}
          <div className="hidden lg:flex items-center gap-2 w-16 xl:w-24 z-10">
            <div className="flex-1 border-t-[2.5px] border-dotted border-[#65a30d] relative h-0">
              {/* Arrow Head */}
              <div className="absolute top-1/2 right-[-2px] -translate-y-1/2 w-0 h-0 border-y-[4.5px] border-y-transparent border-l-[7px] border-l-[#65a30d]"></div>
            </div>
          </div>

          {/* Right Card: Impact */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-[250px]"
          >
            {/* Skewed Container (opposite direction) */}
            <div className="absolute inset-0 border-[1.5px] border-[#65a30d]/40 rounded-2xl bg-white shadow-sm -skew-x-[6deg] origin-bottom transform-gpu" />
            
            {/* Un-skewed Content */}
            <div className="relative p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#f7fee7] flex items-center justify-center mb-6 border-[3px] border-white shadow-sm">
                <TrendingUp color="#65a30d" size={32} />
              </div>
              <h3 className="text-[14px] font-bold tracking-widest mb-6 leading-tight" style={{ color: "#65a30d" }}>
                YOUR BUSINESS<br />IMPACT
              </h3>
              
              <ul className="text-[13px] text-slate-600 font-bold space-y-3.5 text-left w-full max-w-[160px] mx-auto">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#65a30d] shrink-0"></div>
                  Better performance.
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#65a30d] shrink-0"></div>
                  Higher efficiency.
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#65a30d] shrink-0"></div>
                  Sustainable growth.
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#65a30d] shrink-0"></div>
                  Real impact.
                </li>
              </ul>
            </div>
          </motion.div>

        </div>

        {/* --- ADDED BOTTOM SECTION --- */}
        <div className="-mt-8 relative z-10">
          {/* Process Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {STEPS.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.25, duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* Skewed Container */}
                <div className="absolute inset-0 bg-white border border-slate-100 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] -skew-x-[6deg] transform-gpu" />
                
                {/* Arrow on Right Edge (except last) */}
                {index < STEPS.length - 1 && (
                  <div 
                    className="absolute top-1/2 -right-3 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-6 h-10 bg-white border-y border-r border-slate-100 rounded-r-md -skew-x-[6deg]"
                    style={{ boxShadow: `4px 0 10px rgba(0,0,0,0.03)` }}
                  >
                    <div className="skew-x-[6deg]">
                      <ArrowRight size={16} strokeWidth={3} color={step.color} />
                    </div>
                  </div>
                )}
                
                {/* Arrow glow effect on right edge */}
                {index < STEPS.length - 1 && (
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-12 hidden lg:block -skew-x-[6deg]" style={{ boxShadow: `10px 0 20px ${step.color}` }}></div>
                )}

                {/* Un-skewed Content */}
                <div className="relative p-8 h-full flex flex-col">
                  
                  {/* Top Row: Number & Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-4xl font-light tracking-tighter" style={{ color: step.numberColor }}>
                      {step.id}
                    </span>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center border-[3px] border-white shadow-sm" style={{ backgroundColor: step.iconBg }}>
                      <step.icon size={24} color={step.color} />
                    </div>
                  </div>

                  {/* Title & Line */}
                  <div className="mb-4 text-center">
                    <h3 className="text-[14px] font-extrabold tracking-widest uppercase" style={{ color: NAVY }}>
                      {step.title}
                    </h3>
                    <div className="w-6 h-[2px] mx-auto mt-3 rounded-full" style={{ backgroundColor: step.color }}></div>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] text-slate-500 leading-relaxed text-center font-medium">
                    {step.desc}
                  </p>

                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            {/* Left: Icon & Text */}
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-[#f0f9ff] flex items-center justify-center shrink-0">
                <Rocket size={32} color="#0284c7" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-center md:text-left" style={{ color: NAVY }}>
                Ready to turn your challenges <br className="hidden md:block" />
                into <span style={{ color: "#0284c7" }}>measurable growth?</span>
              </h3>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 border-l-0 lg:border-l-2 border-slate-100 lg:pl-8">
              <button className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-md text-white text-sm font-semibold transition-transform hover:scale-105" style={{ backgroundColor: "#0284c7" }}>
                Let's Talk
                <ArrowRight size={16} />
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-md text-sm font-semibold transition-colors hover:bg-slate-50 border-2" style={{ color: NAVY, borderColor: "#cbd5e1" }}>
                View Our Work
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
