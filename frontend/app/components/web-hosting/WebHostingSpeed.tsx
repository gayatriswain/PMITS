"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Server, 
  FileText, 
  Globe, 
  ChevronRight, 
  Activity, 
  Lightbulb, 
  MonitorSmartphone,
  CloudLightning
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import Image from 'next/image';
import Container from '../shared/Container';
import { useCmsText } from "@/components/cms/SectionContent";
import Link from "next/link";
import { rich } from "@/components/cms/rich";

export default function WebHostingSpeed() {
  const $t = useCmsText();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Refs for number counters
  const speedRef38 = useRef<HTMLSpanElement>(null);
  const isInView38 = useInView(speedRef38, { once: true, margin: "-50px" });

  const speedRef18 = useRef<HTMLSpanElement>(null);
  const isInView18 = useInView(speedRef18, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView38 && speedRef38.current) {
      animate(0, 3.8, {
        duration: 1.5,
        delay: 0.4,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (speedRef38.current) {
            speedRef38.current.textContent = latest.toFixed(1) + "x";
          }
        }
      });
    }
  }, [isInView38]);

  useEffect(() => {
    if (isInView18 && speedRef18.current) {
      animate(5.0, 1.8, {
        duration: 1.5,
        delay: 0.6,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (speedRef18.current) {
            speedRef18.current.textContent = latest.toFixed(1);
          }
        }
      });
    }
  }, [isInView18]);

  return (
    <section className="py-24 bg-[#FAFCFF] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_0.8fr] gap-8 lg:gap-12 mb-16">
          
          {/* Left Column - Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-1 text-[#0f766e] text-[12px] font-bold tracking-wider uppercase mb-4">
              {$t("WebHostingSpeed__t1", "Built For Speed ")}<Zap size={14} className="fill-[#0f766e]" />
            </div>
            
            <h2 className="text-h2 font-black text-[#0f2923] mb-6">
              {$t("WebHostingSpeed__t2", "Every Second ")}<br/>
              <span className="text-[#0f766e]">{$t("WebHostingSpeed__t3", "Matters.")}</span>
            </h2>
            
            <p className="text-body text-slate-600 mb-8 pr-4">
              {rich($t("WebHostingSpeed__t4", "Our optimized infrastructure ensures your website loads faster and keeps visitors engaged."))}</p>

            <div className="bg-white rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#0f766e] flex items-center justify-center shrink-0">
                <CloudLightning className="text-white" size={20} />
              </div>
              <span className="font-bold text-[#0f2923] text-[15px]">{$t("WebHostingSpeed__t5", "High performance servers")}</span>
            </div>

            <ul className="space-y-4">
              {[
                $t("WebHostingSpeed__t6", "LiteSpeed & advanced caching"),
                $t("WebHostingSpeed__t7", "CDN for global delivery"),
                $t("WebHostingSpeed__t8", "Optimized database & PHP"),
                $t("WebHostingSpeed__t9", "Image & asset optimization")
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#0f766e] shrink-0" />
                  <span className="text-[14px] text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Center Column - Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Delivery Process Card */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100">
              <h4 className="font-bold text-[#0f2923] text-[15px] mb-8">{$t("WebHostingSpeed__t10", "How We Deliver Speed")}</h4>
              <div className="flex items-center justify-between text-[#0f766e]">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-[#f8fdfc] flex items-center justify-center border border-[#e2f8f5]">
                    <MonitorSmartphone size={24} className="text-[#0f766e] stroke-[1.5]" />
                  </div>
                  <span className="text-[13px] font-bold text-[#0f2923]">{$t("WebHostingSpeed__t11", "Request")}</span>
                </div>
                <ArrowRight size={18} className="text-[#a7f3d0]" />
                
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-[#f8fdfc] flex items-center justify-center border border-[#e2f8f5]">
                    <Server size={24} className="text-[#0f766e] stroke-[1.5]" />
                  </div>
                  <span className="text-[13px] font-bold text-[#0f2923]">{$t("WebHostingSpeed__t12", "Server")}</span>
                </div>
                <ArrowRight size={18} className="text-[#a7f3d0]" />
                
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-[#f8fdfc] flex items-center justify-center border border-[#e2f8f5]">
                    <FileText size={24} className="text-[#0f766e] stroke-[1.5]" />
                  </div>
                  <span className="text-[13px] font-bold text-[#0f2923]">{$t("WebHostingSpeed__t13", "Content")}</span>
                </div>
                <ArrowRight size={18} className="text-[#a7f3d0]" />
                
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-[#10b981] flex items-center justify-center shadow-[0_4px_15px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 size={28} className="text-white" />
                  </div>
                  <span className="text-[13px] font-bold text-[#0f2923]">{$t("WebHostingSpeed__t14", "Page Ready")}</span>
                </div>
              </div>
            </motion.div>

            {/* Comparison Card */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 relative">
              
              {/* Subtle dotted background grid in the center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[radial-gradient(circle_at_center,#10b981_1px,transparent_1px)] bg-[size:8px_8px] opacity-10"></div>

              {/* Center Circle Gauge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[150px] h-[150px] bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-20">
                
                {/* White cover to hide circle stroke behind the badge */}
                <div className="absolute -top-2 w-20 h-6 bg-white z-10"></div>

                {/* SVG Progress Ring */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full transform -rotate-[135deg] z-10">
                  <defs>
                    <linearGradient id="upToGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                  </defs>
                  {/* Background Track */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                  {/* Progress Line */}
                  <motion.circle 
                    cx="50" cy="50" r="45" fill="none" stroke="url(#upToGrad)" strokeWidth="6" 
                    strokeLinecap="round"
                    strokeDasharray={283} // 2 * pi * 45
                    initial={{ strokeDashoffset: 283 }}
                    whileInView={{ strokeDashoffset: 283 * 0.2 }} // Fill 80%
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                  />
                </svg>

                {/* Clean 2D UP TO Ribbon Badge */}
                <div className="absolute -top-3 z-30 flex items-start justify-center">
                  {/* Left tail */}
                  <div className="mt-2 w-2 h-4 bg-[#047857] rounded-l-[3px] -mr-1"></div>
                  
                  {/* Main badge */}
                  <div className="bg-[#10b981] text-white text-[10px] font-black px-4 py-1 rounded-[4px] uppercase tracking-wider relative z-10">
                    {$t("WebHostingSpeed__t15", "Up To")}</div>
                  
                  {/* Right tail */}
                  <div className="mt-2 w-2 h-4 bg-[#047857] rounded-r-[3px] -ml-1"></div>
                </div>

                <span ref={speedRef38} className="text-[44px] font-black text-[#0f766e] leading-none mt-3 z-20">{$t("WebHostingSpeed__t16", "0.0x")}</span>
                <span className="text-[15px] font-bold text-[#0f766e] mt-1 z-20">{$t("WebHostingSpeed__t17", "Faster")}</span>
              </div>

              <div className="grid grid-cols-2 gap-12 md:gap-20 h-full relative z-10 px-2 md:px-4">
                {/* Left Side (Red) */}
                <div className="flex flex-col justify-between pr-8 md:pr-12 pb-2 border-b border-transparent">
                  <span className="text-[13px] text-slate-500 font-medium">{$t("WebHostingSpeed__t18", "Without Optimization")}</span>
                  <div className="mt-5">
                    <div className="text-[36px] font-black text-[#0f2923] leading-none">{$t("WebHostingSpeed__t19", "5.6")}<span className="text-[20px] ml-1">s</span></div>
                    <span className="text-[12px] text-slate-500 font-medium mt-1 block">{$t("WebHostingSpeed__t20", "Average Load Time")}</span>
                  </div>
                  {/* Recharts Red Chart */}
                  <div className="h-14 mt-6 -ml-2 -mb-2 opacity-90">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { value: 14 }, { value: 16 }, { value: 13 }, { value: 24 }, { value: 28 }, { value: 38 }
                      ]}>
                        <defs>
                          <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f87171" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#f87171" 
                          strokeWidth={3} 
                          fillOpacity={1} 
                          fill="url(#colorRed)" 
                          isAnimationActive={true} 
                          animationDuration={1500} 
                          dot={{ r: 3.5, fill: '#fff', stroke: '#f87171', strokeWidth: 2.5 }}
                          activeDot={{ r: 5, strokeWidth: 0, fill: '#ef4444' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right Side (Green) */}
                <div className="flex flex-col justify-between pl-8 md:pl-12 pb-2 border-b border-transparent text-right">
                  <span className="text-[13px] font-bold text-[#0f766e]">{$t("WebHostingSpeed__t21", "With ProManage Hosting")}</span>
                  <div className="mt-5">
                    <div className="text-[36px] font-black text-[#0f766e] leading-none">{$t("WebHostingSpeed__t22", "1.8")}<span className="text-[20px] ml-1">s</span></div>
                    <span className="text-[12px] text-slate-500 font-medium mt-1 block">{$t("WebHostingSpeed__t23", "Average Load Time")}</span>
                  </div>
                  {/* Recharts Green Chart */}
                  <div className="h-14 mt-6 -mr-2 -mb-2 opacity-90">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { value: 22 }, { value: 19 }, { value: 24 }, { value: 20 }, { value: 23 }, { value: 19 }
                      ]}>
                        <defs>
                          <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#10b981" 
                          strokeWidth={3} 
                          fillOpacity={1} 
                          fill="url(#colorGreen)" 
                          isAnimationActive={true} 
                          animationDuration={1500} 
                          dot={{ r: 3.5, fill: '#fff', stroke: '#10b981', strokeWidth: 2.5 }}
                          activeDot={{ r: 5, strokeWidth: 0, fill: '#10b981' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Big Gauge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 p-8"
          >
            <div className="flex flex-col items-center text-center w-full relative">
              
              {/* Gauge Illustration */}
              <div className="relative w-[220px] h-[220px] mb-2 flex items-center justify-center">
                
                {/* 1. Outer Faint Dotted Ring */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2 4" />
                </svg>

                {/* 2. Inner Ticks */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                  {[...Array(24)].map((_, i) => {
                    // Generate ticks from bottom-left (150 deg) to bottom-right (390 deg)
                    // We have 24 ticks over 240 degrees -> 10 degrees per tick
                    const angle = 150 + (i * 10);
                    // Skip the very bottom gap (angle > 390 or angle < 150)
                    if (angle > 390) return null;
                    
                    // Make some ticks longer/bolder (e.g., every 3rd tick)
                    const isMajor = i % 3 === 0;
                    const innerRadius = isMajor ? 32 : 34;
                    const outerRadius = 36;
                    
                    // Convert angle to radians (SVG 0 is 3 o'clock, clockwise)
                    const rad = (angle * Math.PI) / 180;
                    
                    const x1 = +(50 + innerRadius * Math.cos(rad)).toFixed(3);
                    const y1 = +(50 + innerRadius * Math.sin(rad)).toFixed(3);
                    const x2 = +(50 + outerRadius * Math.cos(rad)).toFixed(3);
                    const y2 = +(50 + outerRadius * Math.sin(rad)).toFixed(3);

                    return (
                      <line 
                        key={i} 
                        x1={x1} y1={y1} x2={x2} y2={y2} 
                        stroke="#cbd5e1" 
                        strokeWidth={isMajor ? "1.5" : "1"} 
                        strokeLinecap="round" 
                      />
                    );
                  })}
                </svg>

                {/* 3. The Thick Gradient Arc */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="gaugeArc" x1="0%" y1="100%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0f766e" /> {/* Dark Teal */}
                      <stop offset="50%" stopColor="#10b981" /> {/* Emerald */}
                      <stop offset="100%" stopColor="#4ade80" /> {/* Light Green */}
                    </linearGradient>
                  </defs>
                  
                  {/* The Background Track (empty) */}
                  <circle 
                    cx="50" cy="50" r="42" 
                    fill="none" 
                    stroke="#f1f5f9" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                    strokeDasharray="175.9 263.9" 
                    transform="rotate(150 50 50)" 
                  />

                  {/* The Animating Filled Arc */}
                  <motion.circle 
                    cx="50" cy="50" r="42" 
                    fill="none" 
                    stroke="url(#gaugeArc)" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                    strokeDasharray="175.9 263.9" 
                    transform="rotate(150 50 50)"
                    initial={{ strokeDashoffset: 175.9 }}
                    whileInView={{ strokeDashoffset: 175.9 - (175.9 * 0.85) }} // Fill 85% of the 240 deg arc
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                    className="drop-shadow-md"
                  />
                </svg>

                {/* 4. The Animating Handle */}
                <motion.div 
                  className="absolute inset-0 w-full h-full"
                  initial={{ rotate: 150 }} // Start at bottom-left
                  whileInView={{ rotate: 150 + (240 * 0.85) }} // Rotate to 85% of 240 deg
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                >
                  {/* Positioned at the right edge of the 42 radius circle (which is 8% from the edge of 50 radius) */}
                  <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-4 h-4 bg-white rounded-full border-[4px] border-[#4ade80] shadow-md z-10"></div>
                </motion.div>
                
                {/* Inner Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                  <Zap size={22} className="fill-[#10b981] text-[#10b981] mb-1 drop-shadow-sm" />
                  <div className="text-[52px] font-black text-[#0f766e] leading-none tracking-tight">
                    <span ref={speedRef18}>{$t("WebHostingSpeed__t24", "5.0")}</span><span className="text-[28px]">s</span>
                  </div>
                  <span className="text-[16px] font-black text-[#0f2923] tracking-widest mt-1">{$t("WebHostingSpeed__t25", "FAST")}</span>
                </div>
              </div>

              <p className="text-body text-[#0f2923] font-medium mt-2">
                {rich($t("WebHostingSpeed__t26", "Good for visitors."))}<br />
                {rich($t("WebHostingSpeed__t27", "Great for business."))}</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Wide Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-[#eefaf8] to-[#f8fcfb] rounded-3xl p-6 md:p-8 lg:px-10 lg:py-8 relative overflow-hidden border border-[#ccfbf1]"
        >
          {/* Decorative faint circles in bg on the right */}
          <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-[#0f766e]/10 border-dashed z-0"></div>
          <div className="absolute right-[2%] top-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border border-[#0f766e]/10 border-dashed z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_250px] gap-10 xl:gap-14 items-center relative z-10">
            
            {/* Left 2D Laptop Mockup */}
            <div className="relative w-full max-w-[280px] mx-auto lg:mx-0 h-[180px] perspective-[1000px] mt-2 lg:mt-0">
              
              {/* Speed / Wind lines on the left */}
              <motion.div 
                className="absolute -left-16 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-0"
                animate={{ x: [-10, 0, -10], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-20 h-1 bg-gradient-to-r from-transparent to-[#99f6e4] rounded-full"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent to-[#99f6e4] rounded-full"></div>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent to-[#99f6e4] rounded-full"></div>
              </motion.div>

              {/* Laptop Body */}
              <motion.div 
                style={{ rotateY: 40, transformStyle: "preserve-3d" }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full h-full flex flex-col"
              >
                {/* Screen */}
                <div className="w-full flex-1 bg-white border-[6px] border-[#1e293b] rounded-t-xl overflow-hidden flex flex-col relative shadow-lg">
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></div>
                      <div className="w-12 h-1 bg-slate-200 rounded-full"></div>
                    </div>
                    
                    {/* Content Grid */}
                    <div className="grid grid-cols-[1fr_1.2fr] gap-2 flex-1 mt-1">
                      
                      {/* Gauge */}
                      <div className="flex items-center justify-center relative pb-2">
                        {/* Gauge Arc */}
                        <div className="w-16 h-8 border-[6px] border-b-0 border-[#0f766e] rounded-t-full relative overflow-visible">
                          {/* Needle */}
                          <motion.div 
                            className="absolute bottom-[-3px] left-1/2 w-1.5 h-7 bg-[#1e293b] rounded-full origin-bottom"
                            initial={{ rotate: -70 }}
                            whileInView={{ rotate: 45 }}
                            transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
                            style={{ x: "-50%" }}
                          ></motion.div>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="flex flex-col justify-center">
                        <div className="text-[7px] font-black text-[#64748b] uppercase tracking-wider">{$t("WebHostingSpeed__t28", "Your Site Speed")}</div>
                        <div className="text-[10px] font-bold text-[#10b981] leading-tight">{$t("WebHostingSpeed__t29", "Good")}</div>
                        <div className="text-[24px] font-black text-[#0f2923] leading-none tracking-tight">1.8s</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Chart in Screen */}
                  <div className="h-10 bg-[#e6fcf5] w-full relative overflow-hidden">
                    <svg viewBox="0 0 100 30" className="absolute bottom-0 w-full h-full fill-[#ccfbf1] stroke-[#10b981] stroke-[2px]" preserveAspectRatio="none">
                      <path d="M0 30 L0 25 L15 28 L30 18 L45 25 L60 12 L75 22 L90 10 L100 15 L100 30 Z" />
                    </svg>
                  </div>
                </div>
                
                {/* Keyboard Base - Straight */}
                <div className="h-3 w-[114%] -ml-[7%] bg-[#cbd5e1] rounded-b-xl rounded-t-sm shadow-md relative z-20">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#94a3b8] rounded-b-md"></div>
                </div>
                
                {/* Floating Overlapping Badge */}
                <motion.div 
                  className="absolute -right-6 top-2 w-14 h-14 bg-[#10b981] rounded-full shadow-[0_10px_20px_rgba(16,185,129,0.3)] border-[4px] border-white flex flex-col items-center justify-center z-30"
                  animate={{ y: [0, -6, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  {/* Sun/Gear Icon */}
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 border-[1.5px] border-white rounded-full"></div>
                    <div className="absolute inset-0">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-white"></div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-white"></div>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-white"></div>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-white"></div>
                      <div className="absolute top-[2px] left-[2px] w-1.5 h-0.5 bg-white transform rotate-45"></div>
                      <div className="absolute bottom-[2px] right-[2px] w-1.5 h-0.5 bg-white transform rotate-45"></div>
                      <div className="absolute top-[2px] right-[2px] w-1.5 h-0.5 bg-white transform -rotate-45"></div>
                      <div className="absolute bottom-[2px] left-[2px] w-1.5 h-0.5 bg-white transform -rotate-45"></div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Center Form */}
            <div className="flex flex-col justify-center">
              <h3 className="text-h4 font-black text-[#0f2923] mb-2">
                {$t("WebHostingSpeed__t30", "Check Your ")}<span className="text-[#0f766e]">{$t("WebHostingSpeed__t31", "Website Speed")}</span>
              </h3>
              <p className="text-small text-slate-600 mb-8">
                {rich($t("WebHostingSpeed__t32", "See how your site performs and discover opportunities to make it faster."))}</p>

              {/* Inline Input & Button */}
              <div className="flex p-1.5 bg-white rounded-full border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-8 w-full xl:max-w-3xl">
                <div className="flex-1 flex items-center pl-4 relative">
                  <Globe className="text-slate-400 shrink-0" size={18} />
                  <input 
                    type="text" 
                    placeholder={$t("WebHostingSpeed__t33", "Enter your website URL (e.g., yoursite.com)")} 
                    className="w-full h-12 pl-3 pr-4 bg-transparent border-none focus:outline-none text-[14px] text-slate-700 placeholder-slate-400"
                  />
                </div>
                <Link href={$t("WebHostingSpeed__u1", "/contact")} className="h-12 px-6 sm:px-8 bg-[#0f766e] hover:bg-[#0d645e] transition-colors text-white text-[14px] font-bold rounded-full flex items-center justify-center gap-2 shrink-0">
                  {$t("WebHostingSpeed__t34", "Check My Speed ")}<ChevronRight size={16} />
                </Link>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-[#e2f8f5] px-3 py-1.5 rounded-full">
                  <Zap size={14} className="text-[#0f766e] fill-[#0f766e]" />
                  <span className="text-[12px] font-bold text-[#0f2923]">{$t("WebHostingSpeed__t35", "Instant Results")}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#e2f8f5] px-3 py-1.5 rounded-full">
                  <Activity size={14} className="text-[#0f766e]" />
                  <span className="text-[12px] font-bold text-[#0f2923]">{$t("WebHostingSpeed__t36", "Performance Score")}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#e2f8f5] px-3 py-1.5 rounded-full">
                  <Lightbulb size={14} className="text-[#0f766e] fill-[#0f766e]" />
                  <span className="text-[12px] font-bold text-[#0f2923]">{$t("WebHostingSpeed__t37", "Actionable Insights")}</span>
                </div>
              </div>
            </div>

            {/* Right 2D Rocket Illustration */}
            <div className="hidden lg:flex items-center justify-center relative h-[250px] w-[250px] mx-auto">
              
              {/* Outer faint dashed circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-slate-300 border-dashed opacity-40"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border border-slate-300 border-dashed opacity-40"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border border-slate-300 border-dashed opacity-40"></div>

              {/* Exhaust Fluffy Clouds (Fixed position behind rocket) */}
              <div className="absolute bottom-4 left-0 w-full h-20 opacity-90 z-0">
                 <div className="absolute bottom-0 left-12 w-16 h-16 bg-white rounded-full blur-[4px]"></div>
                 <div className="absolute bottom-4 left-20 w-20 h-20 bg-white rounded-full blur-[6px]"></div>
                 <div className="absolute -bottom-2 left-28 w-24 h-24 bg-white rounded-full blur-[5px]"></div>
                 <div className="absolute bottom-2 left-40 w-16 h-16 bg-white rounded-full blur-[4px]"></div>
              </div>

              {/* Animated Rocket */}
              <motion.div 
                className="relative z-10 origin-center"
                animate={{ y: [0, -12, 0], x: [0, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* 3D-ish Chubby Rocket SVG */}
                <svg viewBox="0 0 100 100" className="w-[180px] h-[180px] drop-shadow-[0_20px_20px_rgba(0,0,0,0.1)] transform rotate-[40deg]">
                  <defs>
                    {/* Body Gradient (3D cylinder effect) */}
                    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="65%" stopColor="#f8fafc" />
                      <stop offset="100%" stopColor="#cbd5e1" />
                    </linearGradient>
                    
                    {/* Nose Gradient */}
                    <linearGradient id="noseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#064e3b" />
                    </linearGradient>

                    {/* Fin Gradient */}
                    <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a7f3d0" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>

                  {/* Left Fin */}
                  <path d="M 35 60 Q 15 65 10 85 Q 20 80 32 78 Z" fill="url(#finGrad)" />
                  
                  {/* Right Fin */}
                  <path d="M 65 60 Q 85 65 90 85 Q 80 80 68 78 Z" fill="url(#finGrad)" />

                  {/* Main Body */}
                  <path d="M 50 10 Q 75 40 65 80 L 35 80 Q 25 40 50 10 Z" fill="url(#bodyGrad)" />

                  {/* Specular Highlight on Body (Left side) */}
                  <path d="M 48 12 Q 30 35 38 75 Q 36 40 50 10 Z" fill="#ffffff" opacity="0.8" />

                  {/* Nose Cone */}
                  <path d="M 50 10 Q 61 24 62 30 Q 50 33 38 30 Q 39 24 50 10 Z" fill="url(#noseGrad)" />
                  {/* Nose Highlight */}
                  <path d="M 48 11 Q 42 20 42 29 Q 44 24 50 10 Z" fill="#ffffff" opacity="0.4" />

                  {/* Base Band (Thruster) */}
                  <path d="M 35 80 L 65 80 Q 62 85 50 86 Q 38 85 35 80 Z" fill="#2dd4bf" />

                  {/* Center Fin (front) */}
                  <path d="M 46 76 Q 50 79 54 76 L 54 96 Q 50 101 46 96 Z" fill="url(#finGrad)" />

                  {/* Window Border */}
                  <circle cx="50" cy="50" r="12" fill="#5eead4" />
                  {/* Window Glass */}
                  <circle cx="50" cy="50" r="8" fill="#0f2923" />
                  {/* Window Reflection */}
                  <path d="M 45 46 A 4 4 0 0 1 52 46 A 6 6 0 0 0 45 46" fill="#ffffff" opacity="0.5" />
                  
                </svg>
              </motion.div>
            </div>
            
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// Simple Rocket SVG Component for background decoration
function RocketIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
