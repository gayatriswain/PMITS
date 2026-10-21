"use client";

import React from "react";
import Image from "next/image";
import { motion, type MotionProps } from "framer-motion";

const ENTRY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
// Last element (conversion card) finishes entering at 1.3s + 1.2s
const ALL_ENTERED_AT = 2.5;
const POP_DURATION = 0.6;

// Bottom panels: same entry as before, then pop slightly forward once everything has entered
function bottomPanelMotion(delay: number, xOut: number): MotionProps {
  const total = ALL_ENTERED_AT + POP_DURATION - delay;
  return {
    initial: { opacity: 0, x: 0, y: 60, scale: 0.95 },
    animate: {
      opacity: [0, 1, 1, 1],
      x: [0, 0, 0, xOut],
      y: [60, 0, 0, -18],
      scale: [0.95, 1, 1, 1.12],
    },
    transition: {
      duration: total,
      delay,
      times: [0, 1.2 / total, (ALL_ENTERED_AT - delay) / total, 1],
      ease: [ENTRY_EASE, "linear", "easeOut"],
    },
  };
}

export default function WebsiteDevHeroVisual() {
  return (
    <div className="relative w-full max-w-[560px] lg:w-[145%] lg:max-w-none lg:shrink-0 lg:mr-0 lg:-ml-[45%] h-[400px] lg:h-[480px] flex items-end justify-center perspective-[1000px] mx-auto">
      <div className="absolute inset-0 w-full h-full origin-bottom scale-[0.75] sm:scale-[0.8] lg:scale-[0.85] flex items-end justify-center">
        {/* BASE PLATFORM IMAGE */}
        <div className="absolute z-0 w-[135%] lg:w-[90%] bottom-[-15%] lg:bottom-[-20%] h-[200px] lg:h-[250px] pointer-events-none left-1/2 -translate-x-1/2">
          <Image
            src="/website-dev.png"
            alt="Base Platform"
            fill
            className="object-contain lg:object-fill object-bottom"
            priority
          />
        </div>

        {/* Container for floating elements, shifted up from the base so they rest on top */}
        <div className="relative w-full h-[85%] flex items-center justify-center z-10 -translate-y-28 lg:-translate-y-32 scale-[0.85] sm:scale-95 lg:scale-100">

          {/* ALL ELEMENTS CONTAINER (Everything except the base) */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            style={{ transform: "perspective(1200px) rotateY(-14deg) skewY(3deg)", transformStyle: "preserve-3d" }}
          >

            {/* MAIN BROWSER WINDOW */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-10 w-[90%] md:w-[78%] lg:w-[66%] h-[420px] md:h-[500px] bg-[#ECEFF2] rounded-3xl shadow-[0_40px_60px_-15px_rgba(0,0,0,0.2),inset_10px_0_20px_rgba(255,255,255,1),-8px_0_15px_rgba(0,0,0,0.05)] border-l-4 border-slate-50 overflow-hidden"
            >
              {/* Header */}
              <div className="w-full h-12 flex items-center justify-between px-5 border-b border-slate-200/60 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-[#eff8f7] flex items-center justify-center border border-[#d6efee]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#0d827f]" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <span className="text-[9px] font-bold text-slate-800">Your Brand</span>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-[8px] font-bold text-slate-600">
                  <span className="text-slate-900">Home</span>
                  <span>About</span>
                  <span>Services</span>
                  <span>Work</span>
                  <span>Contact</span>
                </div>
                <div className="bg-[#0d827f] text-white text-[8px] font-bold px-3 py-1.5 rounded-full shadow-sm shadow-[#0d827f]/20">
                  Get Started
                </div>
              </div>
              {/* Content */}
              <div className="flex h-[calc(100%-3rem)] p-6 gap-5">
                <div className="flex-[1.1] flex flex-col justify-start pt-4 md:pt-8">
                  <h2 className="text-[#132a43] text-xl md:text-2xl font-extrabold leading-tight mb-3 font-sans tracking-tight">
                    A Website<br />That Works<br />As Hard As<br /><span className="text-[#0d827f]">You Do</span>
                  </h2>
                  <p className="text-[9px] font-medium text-slate-500 mb-4 max-w-[150px] leading-relaxed">
                    Custom websites built for performance, built for growth, built for you.
                  </p>
                  <div className="bg-[#0d827f] text-white text-[9px] font-bold px-4 py-2 rounded-full self-start shadow-md shadow-[#0d827f]/30">
                    Get Started
                  </div>
                </div>
                <div className="flex-[0.9] relative rounded-2xl overflow-hidden shadow-inner ring-1 ring-black/5">
                  <Image src="/image1.jpg" alt="Website Content" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#132a43]/70 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>

            {/* BOTTOM 3 PANELS GROUP */}
            <div className="absolute bottom-[-60px] md:bottom-[-70px] w-full flex justify-center items-end gap-[28px] z-30 pointer-events-none">

              {/* LEFT FLOATING BLACK CODE PANEL */}
              <motion.div
                {...bottomPanelMotion(0.5, -16)}
                className="relative pointer-events-auto origin-bottom w-[225px] h-[135px] bg-gradient-to-br from-[#1a2332] to-[#0f1520] rounded-[1.25rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),0_15px_20px_-10px_rgba(0,0,0,0.4),5px_0px_0px_0px_#2a3649,inset_0_1px_1px_rgba(255,255,255,0.15),inset_1px_0_1px_rgba(255,255,255,0.1)] ring-1 ring-white/10 p-4 flex flex-col"
              >
                <p className="text-white text-[10px] font-bold mb-3 tracking-tight">Clean Code. Better Results.</p>

                {/* Realistic Code Syntax Lines */}
                <div className="flex flex-col gap-1.5 mt-0.5 w-full opacity-90">
                  {/* <div className="Component"> */}
                  <div className="flex gap-1 items-center">
                    <div className="h-[3px] w-2.5 rounded-full bg-slate-500" />
                    <div className="h-[3px] w-8 rounded-full bg-blue-400" />
                    <div className="h-[3px] w-12 rounded-full bg-teal-300" />
                    <div className="h-[3px] w-2.5 rounded-full bg-slate-500" />
                  </div>

                  {/*   <header className="header"> */}
                  <div className="flex gap-1 items-center ml-3">
                    <div className="h-[3px] w-2.5 rounded-full bg-slate-500" />
                    <div className="h-[3px] w-8 rounded-full bg-blue-400" />
                    <div className="h-[3px] w-10 rounded-full bg-sky-300" />
                    <div className="h-[3px] w-2 rounded-full bg-slate-500" />
                    <div className="h-[3px] w-10 rounded-full bg-amber-300" />
                    <div className="h-[3px] w-2.5 rounded-full bg-slate-500" />
                  </div>

                  {/*     <h1>Hello World</h1> */}
                  <div className="flex gap-1 items-center ml-6">
                    <div className="h-[3px] w-2.5 rounded-full bg-slate-500" />
                    <div className="h-[3px] w-5 rounded-full bg-blue-400" />
                    <div className="h-[3px] w-2.5 rounded-full bg-slate-500" />
                    <div className="h-[3px] w-16 rounded-full bg-slate-200" />
                    <div className="h-[3px] w-3 rounded-full bg-slate-500" />
                    <div className="h-[3px] w-5 rounded-full bg-blue-400" />
                    <div className="h-[3px] w-2.5 rounded-full bg-slate-500" />
                  </div>

                  {/*     <p>Description text</p> */}
                  <div className="flex gap-1 items-center ml-6">
                    <div className="h-[3px] w-2.5 rounded-full bg-slate-500" />
                    <div className="h-[3px] w-4 rounded-full bg-blue-400" />
                    <div className="h-[3px] w-2.5 rounded-full bg-slate-500" />
                    <div className="h-[3px] w-[50px] rounded-full bg-slate-200" />
                    <div className="h-[3px] w-3 rounded-full bg-slate-500" />
                    <div className="h-[3px] w-4 rounded-full bg-blue-400" />
                  </div>

                  {/*   </header> */}
                  <div className="flex gap-1 items-center ml-3">
                    <div className="h-[3px] w-3 rounded-full bg-slate-500" />
                    <div className="h-[3px] w-8 rounded-full bg-blue-400" />
                    <div className="h-[3px] w-2.5 rounded-full bg-slate-500" />
                  </div>

                  {/*   <Features data={data} /> */}
                  <div className="flex gap-1 items-center ml-3">
                    <div className="h-[3px] w-2.5 rounded-full bg-slate-500" />
                    <div className="h-[3px] w-12 rounded-full bg-teal-300" />
                    <div className="h-[3px] w-8 rounded-full bg-sky-300" />
                    <div className="h-[3px] w-2 rounded-full bg-slate-500" />
                    <div className="h-[3px] w-6 rounded-full bg-rose-400" />
                    <div className="h-[3px] w-3 rounded-full bg-slate-500" />
                  </div>

                  {/* </div> */}
                  <div className="flex gap-1 items-center">
                    <div className="h-[3px] w-3 rounded-full bg-slate-500" />
                    <div className="h-[3px] w-8 rounded-full bg-blue-400" />
                    <div className="h-[3px] w-2.5 rounded-full bg-slate-500" />
                  </div>
                </div>
              </motion.div>

              {/* CENTER GLASS WIREFRAME PANEL */}
              <motion.div
                {...bottomPanelMotion(0.7, 0)}
                className="relative pointer-events-auto origin-bottom w-[185px] h-[215px] bg-gradient-to-br from-[#dfe8ee]/85 via-[#c9d8e1]/75 to-[#a9c0cc]/70 backdrop-blur-[20px] rounded-[1.25rem] shadow-[0_30px_60px_-15px_rgba(15,40,60,0.35),0_15px_20px_-10px_rgba(15,40,60,0.2),inset_1px_1px_0_rgba(255,255,255,0.9),inset_0_0_20px_rgba(255,255,255,0.35)] ring-[1.5px] ring-white/90 p-3.5 flex flex-col gap-3"
              >
                {/* Top Section: Landscape & Lines */}
                <div className="w-full h-[95px] rounded-xl border-[1.5px] border-white bg-white/15 shadow-[0_1px_3px_rgba(15,40,60,0.15)] relative p-3 flex gap-3 items-center">
                  {/* Left: Mountain Graphics */}
                  <div className="relative w-14 h-full flex-shrink-0">
                    {/* Sun */}
                    <div className="absolute top-1 left-7 w-2.5 h-2.5 rounded-full bg-white shadow-[0_1px_2px_rgba(15,40,60,0.2)]" />
                    {/* Mountains (SVG) */}
                    <svg className="absolute bottom-1 left-0 w-full h-[40px]" viewBox="0 0 100 50" preserveAspectRatio="none">
                      <path d="M0,50 L28,22 L45,34 L62,12 L100,50 Z" fill="rgba(255,255,255,0.55)" />
                      <path d="M20,50 L62,12 L100,50 Z" fill="rgba(255,255,255,0.85)" />
                    </svg>
                  </div>
                  {/* Right: Lines */}
                  <div className="flex-1 flex flex-col gap-2 justify-center">
                    <div className="h-[3px] w-full bg-white rounded-full shadow-[0_1px_1px_rgba(15,40,60,0.15)]" />
                    <div className="h-[3px] w-full bg-white rounded-full shadow-[0_1px_1px_rgba(15,40,60,0.15)]" />
                    <div className="h-[3px] w-[85%] bg-white rounded-full shadow-[0_1px_1px_rgba(15,40,60,0.15)]" />
                    <div className="h-[3px] w-[70%] bg-white rounded-full shadow-[0_1px_1px_rgba(15,40,60,0.15)]" />
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex gap-3 h-[75px]">
                  {/* Left: Wireframe Box */}
                  <div className="w-[75px] h-full rounded-xl border-[1.5px] border-white bg-white/15 shadow-[0_1px_3px_rgba(15,40,60,0.15)] relative flex items-center justify-center overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="2" />
                      <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="2" />
                    </svg>
                    <div className="w-5 h-5 rounded-[5px] border-[1.5px] border-white bg-[#c9d8e1] z-10" />
                  </div>

                  {/* Right: Lines and Squares */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex flex-col gap-2">
                      <div className="h-[5px] w-full bg-white rounded-full shadow-[0_1px_1px_rgba(15,40,60,0.15)]" />
                      <div className="h-[5px] w-full bg-white rounded-full shadow-[0_1px_1px_rgba(15,40,60,0.15)]" />
                      <div className="h-[5px] w-[90%] bg-white rounded-full shadow-[0_1px_1px_rgba(15,40,60,0.15)]" />
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-5 h-5 rounded-md border-[1.5px] border-white bg-white/15" />
                      <div className="w-5 h-5 rounded-md border-[1.5px] border-white bg-white/15" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT TEAL MOBILE PANEL */}
              <motion.div
                {...bottomPanelMotion(0.9, 16)}
                className="relative pointer-events-auto origin-bottom w-[190px] h-[125px] bg-gradient-to-br from-[#0d8580] to-[#075955] rounded-[1.25rem] shadow-[0_30px_60px_-15px_rgba(11,122,117,0.3),0_15px_20px_-10px_rgba(0,0,0,0.2),5px_0px_0px_0px_#043e3b,inset_0_1px_1px_rgba(255,255,255,0.4),inset_1px_0_1px_rgba(255,255,255,0.2)] ring-1 ring-white/20 p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white text-[10px] font-bold tracking-wide">Mobile</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1abc9c] flex items-center justify-center shadow-inner">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                </div>

                {/* Feature points */}
                <ul className="flex flex-col gap-1.5">
                  {['Fast Performance', 'SEO Optimized', 'Secure & Scalable', 'Built for Growth'].map((text, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#5eead4]" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <span className="text-[8px] font-bold text-white">{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* TOP RIGHT PERFORMANCE STAT CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-20 right-[-2%] md:right-[3%] top-[5%] w-[120px]"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.3 }}
                className="w-full bg-gradient-to-br from-white to-slate-50 rounded-[1.25rem] shadow-[10px_15px_30px_-10px_rgba(0,0,0,0.15),3px_0px_0px_0px_#e2e8f0,inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-slate-200/60 p-3 flex flex-col items-center"
              >
                <p className="text-[10px] font-bold text-slate-700 mb-2.5 w-full text-left">Performance</p>
                <div className="relative w-[64px] h-[64px] flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-[#0d827f]" strokeDasharray="98, 100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeLinecap="round" />
                  </svg>
                  <div className="absolute text-[15px] font-extrabold text-[#132a43] tracking-tighter">98%</div>
                </div>
                <p className="text-[9px] font-bold text-slate-400 mt-2.5">Site Score</p>
              </motion.div>
            </motion.div>

            {/* MIDDLE RIGHT CONVERSION CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-20 right-[-8%] md:right-[5%] top-[45%] w-[140px]"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                className="w-full bg-gradient-to-br from-white to-slate-50 rounded-[1.25rem] shadow-[10px_15px_30px_-10px_rgba(0,0,0,0.15),3px_0px_0px_0px_#e2e8f0,inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-slate-200/60 p-3"
              >
                <p className="text-[10px] font-bold text-slate-700 mb-1.5">Conversion Rate</p>
                <p className="text-lg font-extrabold text-[#0d827f] mb-2.5 tracking-tight">+200%</p>
                <svg className="w-full h-7" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,25 Q10,25 20,20 T40,22 T60,15 T80,10 T100,2" fill="none" stroke="#0d827f" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="100" cy="2" r="3" fill="#0d827f" />
                </svg>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
