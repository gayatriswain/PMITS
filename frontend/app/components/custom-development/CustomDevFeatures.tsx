"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Puzzle, Link as LinkIcon, Sliders, BarChart, Send, ShieldCheck, Lock, CheckCircle, Network, Palette, Settings, Database, BrainCircuit, LayoutList } from 'lucide-react';
import Image from 'next/image';
import { useCmsText } from "@/components/cms/SectionContent";
import NextLink from "next/link";
import { rich } from "@/components/cms/rich";

const CustomDevFeatures = () => {
  const $t = useCmsText();
  const features = [
    {
      icon: <Puzzle className="w-6 h-6 text-teal-600" />,
      title: $t("CustomDevFeatures__t1", "Custom Features"),
      desc: $t("CustomDevFeatures__t2", "Only the features you need, built the way your business works.")
    },
    {
      icon: <LinkIcon className="w-6 h-6 text-teal-600" />,
      title: $t("CustomDevFeatures__t3", "Custom Design"),
      desc: $t("CustomDevFeatures__t4", "UI/UX that reflects your brand and delivers a seamless experience.")
    },
    {
      icon: <Sliders className="w-6 h-6 text-teal-600" />,
      title: $t("CustomDevFeatures__t5", "Custom Workflows"),
      desc: $t("CustomDevFeatures__t6", "Automate and streamline processes built around your operations.")
    },
    {
      icon: <Network className="w-6 h-6 text-teal-600" />,
      title: $t("CustomDevFeatures__t7", "Seamless Integrations"),
      desc: $t("CustomDevFeatures__t8", "Connect with any system, API, or third-party tool you already use.")
    },
    {
      icon: <Settings className="w-6 h-6 text-teal-600" />,
      title: $t("CustomDevFeatures__t9", "Complete Control"),
      desc: $t("CustomDevFeatures__t10", "Own your data, your logic, your rules—full flexibility at every level.")
    },
    {
      icon: <BarChart className="w-6 h-6 text-teal-600" />,
      title: $t("CustomDevFeatures__t11", "Built to Scale"),
      desc: $t("CustomDevFeatures__t12", "Future-ready architecture that grows with your business goals.")
    }
  ];

  return (
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-teal-600 font-bold tracking-[0.15em] uppercase text-xs mb-4">
            {$t("CustomDevFeatures__t13", "Custom isn't extra. It's everything.")}</h3>
          <h2 className="text-h2 font-extrabold text-slate-900 mb-6">
            {$t("CustomDevFeatures__t14", "Design It. Build It. Scale It.")}<br/>
            <span className="text-teal-600 relative inline-block mt-2">
              {$t("CustomDevFeatures__t15", "Exactly How You Want.")}<svg className="absolute w-full h-[12px] -bottom-1 left-0 text-teal-500 opacity-60" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M 0,8 Q 100,0 200,8 L 200,12 Q 100,4 0,12 Z" fill="currentColor"/>
              </svg>
            </span>
          </h2>
          <p className="text-body text-slate-500">
            {rich($t("CustomDevFeatures__t16", "Every business is different. That's why we give you complete freedom to customize every part of your software—your way."))}</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Left Column (Hero Card with 3D Graphic) */}
          <div className="lg:col-span-1 bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
            <div className="mb-8 z-10 relative">
              <h3 className="text-h5 font-extrabold text-slate-900 mb-2">{$t("CustomDevFeatures__t17", "You Imagine.")}</h3>
              <h3 className="text-h5 font-extrabold text-teal-600 mb-4">{$t("CustomDevFeatures__t18", "We Make It Real.")}</h3>
              <p className="text-small text-slate-500">
                {rich($t("CustomDevFeatures__t19", "From the smallest feature to the big picture architecture—we give you the power to customize every element."))}</p>
            </div>
            
            {/* Minimalized 3D Graphic inside the card */}
            <div className="relative flex-1 w-full min-h-[230px] flex items-center justify-center mt-4">
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ perspective: '1200px' }}>
                 <div
                   className="relative flex items-center justify-center"
                   style={{ transform: 'translateY(-15px) rotateX(60deg) rotateZ(45deg) scale(1)', transformStyle: 'preserve-3d' }}
                 >
                   {/* Background Rings */}
                   <div className="absolute w-[320px] h-[320px] rounded-full border border-teal-500/20 border-dashed" style={{ transform: 'translateZ(-15px)' }} />
                   <div className="absolute w-[220px] h-[220px] rounded-full border border-teal-500/10" style={{ transform: 'translateZ(-15px)' }} />

                   {/* Dotted Connection Lines */}
                   <svg className="absolute overflow-visible w-[1px] h-[1px]" style={{ transform: 'translateZ(0px)' }}>
                     {[
                       { x: -140, y: 0 },    // Palette
                       { x: -100, y: -100 }, // Org Chart
                       { x: 0, y: -140 },    // Checklist
                       { x: 140, y: 0 },     // Database
                       { x: 100, y: 100 },   // Puzzle
                       { x: 0, y: 140 }      // Sliders
                     ].map((pos, i) => (
                       <g key={`line-${i}`}>
                         <line x1="0" y1="0" x2={pos.x} y2={pos.y} stroke="#2dd4bf" strokeWidth="2" strokeDasharray="4 6" opacity="0.6" />
                         <circle cx={pos.x * 0.4} cy={pos.y * 0.4} r="3" fill="#0d9488" opacity="0.8" />
                       </g>
                     ))}
                   </svg>

                   {/* LAYER 1: Bottom Wide Base Platform */}
                   {Array.from({ length: 2 }).map((_, i) => (
                     <div 
                       key={`base1-mini-${i}`}
                       className="absolute w-[180px] h-[180px] -ml-[90px] -mt-[90px] rounded-[40px]"
                       style={{
                         backgroundColor: i === 1 ? '#f8fafc' : '#e2e8f0',
                         transform: `translateZ(${i - 10}px)`,
                         boxShadow: i === 0 ? '0 40px 60px rgba(13,148,136,0.15)' : 'none'
                       }}
                     >
                       {/* Subtle surface dots */}
                       {i === 1 && (
                         <div className="absolute inset-0 rounded-[40px]" 
                              style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '16px 16px', opacity: 0.5 }} />
                       )}
                     </div>
                   ))}

                   {/* LAYER 2: Middle Base Platform (Thicker, Solid White) */}
                   {Array.from({ length: 8 }).map((_, i) => (
                     <div 
                       key={`base2-mini-${i}`}
                       className="absolute w-[120px] h-[120px] -ml-[60px] -mt-[60px] rounded-[28px]"
                       style={{
                         backgroundColor: i === 7 ? '#ffffff' : `hsl(210, 20%, ${92 - (7-i)*1}%)`,
                         transform: `translateZ(${i - 5}px)`,
                         boxShadow: i === 0 ? '0 10px 20px rgba(0,0,0,0.05)' : 'none'
                       }}
                     />
                   ))}
                   
                   {/* LAYER 3: Top Teal Block (Glassy, Darker edges) */}
                   {Array.from({ length: 12 }).map((_, i) => (
                     <div 
                       key={`teal-mini-${i}`}
                       className="absolute w-[76px] h-[76px] -ml-[38px] -mt-[38px] rounded-[20px]"
                       style={{
                         backgroundColor: i === 11 ? '#2dd4bf' : `hsl(175, 75%, ${30 + (i)*1}%)`,
                         transform: `translateZ(${i + 4}px)`,
                         boxShadow: i === 0 ? '0 0 20px rgba(13,148,136,0.3)' : 'none'
                       }}
                     />
                   ))}
                   
                   {/* Central Teal Top Surface */}
                   <div
                     className="absolute w-[76px] h-[76px] -ml-[38px] -mt-[38px] rounded-[20px] overflow-hidden flex items-center justify-center"
                     style={{
                       transform: 'translateZ(16px)',
                       transformStyle: 'preserve-3d',
                       background: 'linear-gradient(135deg, #34d399 0%, #0f766e 100%)',
                       boxShadow: 'inset 2px 2px 6px rgba(255,255,255,0.6), inset -2px -2px 6px rgba(0,0,0,0.2)'
                     }}
                   >
                     {/* Glassy reflection */}
                     <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-white/40 to-transparent rounded-b-[60%] opacity-90 blur-[0.5px]" />
                     {/* Flat orientation on grid — counter-rotate the FULL parent tilt
                         (rotateX(60deg) rotateZ(45deg)) in reverse order, not just rotateZ(-90),
                         so this actually renders upright/flat instead of skewed. */}
                     <span className="text-white font-bold text-[32px] leading-none z-10" style={{ transform: 'rotateZ(-45deg) rotateX(-60deg)', filter: 'drop-shadow(0 2px 4px rgba(0,80,80,0.5))' }}>&lt;/&gt;</span>
                   </div>

                   {/* 6 Satellite Nodes */}
                   {[
                     { icon: <Palette strokeWidth={2.5} className="w-5 h-5 text-[#0f766e]" />, x: -140, y: 0 },
                     { icon: <Network strokeWidth={2.5} className="w-5 h-5 text-[#0f766e]" />, x: -100, y: -100 },
                     { icon: <LayoutList strokeWidth={2.5} className="w-5 h-5 text-[#0f766e]" />, x: 0, y: -140 },
                     { icon: <Database strokeWidth={2.5} className="w-5 h-5 text-[#0f766e]" />, x: 140, y: 0 },
                     { icon: <Puzzle strokeWidth={2.5} className="w-5 h-5 text-[#0f766e]" />, x: 100, y: 100 },
                     { icon: <Sliders strokeWidth={2.5} className="w-5 h-5 text-[#0f766e]" />, x: 0, y: 140 }
                   ].map((node, index) => (
                     <div key={`node-${index}`} className="absolute" style={{ transform: `translate3d(${node.x}px, ${node.y}px, -3px)`, transformStyle: 'preserve-3d' }}>
                       {/* Node Base 3D Slices (Thicker) */}
                       {Array.from({ length: 5 }).map((_, i) => (
                         <div 
                           key={`nbase-${i}`}
                           className="absolute w-[50px] h-[50px] -ml-[25px] -mt-[25px] rounded-[16px]"
                           style={{ 
                             backgroundColor: i === 4 ? '#ffffff' : `hsl(210, 20%, ${94 - (4-i)*1}%)`,
                             transform: `translateZ(${-i}px)`,
                             boxShadow: i === 0 ? '0 10px 20px rgba(0,0,0,0.05)' : 'none'
                           }}
                         />
                       ))}
                       {/* Node Top Surface with Icon — same full counter-rotation fix as the
                           central "</>" so each icon renders flat/upright, not skewed. */}
                       <div
                         className="absolute w-[50px] h-[50px] -ml-[25px] -mt-[25px] rounded-[16px] bg-white flex items-center justify-center overflow-visible"
                         style={{
                           transform: 'translateZ(1px)',
                           transformStyle: 'preserve-3d',
                           boxShadow: 'inset 0 0 2px rgba(0,0,0,0.05)'
                         }}
                       >
                         <div style={{ transform: 'rotateZ(-45deg) rotateX(-60deg)' }}>
                           {node.icon}
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
          
          {/* Right Column (6 Feature Cards) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 content-start">
            {features.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mb-4 border border-teal-100/50">
                  {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5 text-teal-600' })}
                </div>
                <h4 className="text-[17px] font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-small text-slate-500">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col xl:flex-row items-center justify-between gap-8">
          
          {/* Banner Left */}
          <div className="flex items-start gap-5 flex-1 max-w-xl">
            <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-600/30">
              <Send className="w-5 h-5 text-white ml-[-2px]" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">{$t("CustomDevFeatures__t20", "Have something specific in mind?")}</h4>
              <p className="text-small text-slate-500">
                {rich($t("CustomDevFeatures__t21", "Tell us what you want to build. We'll turn it into a solution that fits your vision perfectly."))}</p>
            </div>
          </div>

          {/* Banner Middle (Trust Badges) */}
          <div className="flex flex-wrap justify-center xl:justify-start gap-x-8 gap-y-4">
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{$t("CustomDevFeatures__t22", "Free Strategy Session")}</span>
            </div>
            <div className="w-[1px] h-8 bg-slate-100 hidden sm:block"></div>
            <div className="flex flex-col items-center gap-2">
              <Lock className="w-5 h-5 text-teal-600" />
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{$t("CustomDevFeatures__t23", "No Obligation")}</span>
            </div>
            <div className="w-[1px] h-8 bg-slate-100 hidden sm:block"></div>
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal-600" />
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{$t("CustomDevFeatures__t24", "100% Confidential")}</span>
            </div>
          </div>

          {/* Banner Right (CTA) */}
          <div className="flex flex-col items-center xl:items-end gap-4">
            <NextLink href={$t("CustomDevFeatures__u1", "/contact")} className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3.5 rounded-full font-semibold transition-colors flex items-center gap-3">
              {$t("CustomDevFeatures__t25", "Start Your Project")}<div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </NextLink>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt={$t("CustomDevFeatures__t26", "User")} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-500">{$t("CustomDevFeatures__t27", "Trusted by 500+ businesses")}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CustomDevFeatures;
