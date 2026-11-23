"use client";

import React, { useEffect, useState } from "react";
import { Search, ShoppingBag, Code, Pen, Star, Link2, CheckCircle2 } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function EcommerceSeoProcessSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-slate-300"></div>
            <span className="text-[13px] font-bold text-[#0f766e] tracking-[0.2em] uppercase">What We Do</span>
            <div className="h-px w-8 bg-slate-300"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#132a43] leading-tight mb-4 tracking-tight">
            End-to-End SEO for <span className="text-[#0f766e]">Ecommerce Growth.</span>
          </h2>
          <p className="text-slate-500 text-lg">
            A complete SEO system that drives visibility, traffic and revenue—consistently.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="flex flex-col xl:flex-row items-center xl:items-stretch justify-center gap-8 xl:gap-4 mb-16 relative">
          
          {/* Left Column (01, 03, 05) */}
          <div className="w-full xl:w-[35%] flex flex-col gap-6 z-10">
            <ProcessCard 
              number="01" 
              title="Search Intent" 
              desc="We uncover what your buyers search, compare and want to buy."
              ui={<SearchIntentUI />}
            />
            <ProcessCard 
              number="03" 
              title="Technical SEO" 
              desc="We fix technical issues and build a fast, crawlable, future-proof store."
              ui={<TechnicalSeoUI />}
            />
            <ProcessCard 
              number="05" 
              title="Schema & Rich Results" 
              desc="We implement schema that earns rich results and boosts CTR."
              ui={<SchemaUI />}
            />
          </div>

          {/* Center Column (Image & Icons) */}
          <div className="w-full xl:w-[35%] flex items-center justify-center relative py-12 xl:py-0 z-10 shrink-0 min-h-[500px]">
            {/* Center Container for precise positioning */}
            <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] flex items-center justify-center">
              
              {/* Radial Dotted Arrows (Desktop Only) */}
              <div className="hidden xl:block absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 500 500">
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" opacity="0.8"/>
                    </marker>
                  </defs>
                  
                  {/* Three rotating faint dashed circular orbits */}
                  <motion.circle 
                    cx="250" cy="250" r="230" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "250px 250px" }}
                  />
                  <motion.circle 
                    cx="250" cy="250" r="170" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "250px 250px" }}
                  />
                  <motion.circle 
                    cx="250" cy="250" r="110" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "250px 250px" }}
                  />

                  {/* Outer Orbit Dots */}
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "250px 250px" }}
                  >
                    {[
                      { cx: 250, cy: 20 },
                      { cx: 250, cy: 480 },
                      { cx: 20, cy: 250 },
                      { cx: 480, cy: 250 }
                    ].map((pt, i) => (
                      <motion.circle key={`out-${i}`} cx={pt.cx} cy={pt.cy} r="3" fill="#0f766e"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      />
                    ))}
                  </motion.g>

                  {/* Middle Orbit Dots */}
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "250px 250px" }}
                  >
                    {[
                      { cx: 250, cy: 80 },
                      { cx: 250, cy: 420 },
                      { cx: 80, cy: 250 },
                      { cx: 420, cy: 250 }
                    ].map((pt, i) => (
                      <motion.circle key={`mid-${i}`} cx={pt.cx} cy={pt.cy} r="3" fill="#0f766e"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </motion.g>

                  {/* Inner Orbit Dots */}
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "250px 250px" }}
                  >
                    {[
                      { cx: 250, cy: 140 },
                      { cx: 250, cy: 360 },
                      { cx: 140, cy: 250 },
                      { cx: 360, cy: 250 }
                    ].map((pt, i) => (
                      <motion.circle key={`in-${i}`} cx={pt.cx} cy={pt.cy} r="3" fill="#0f766e"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7 }}
                      />
                    ))}
                  </motion.g>

                  {/* Lines pointing inwards */}
                  {[-35, 0, 35, 145, 180, 215].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 250 + 200 * Math.cos(rad); // start near icon
                    const y1 = 250 + 200 * Math.sin(rad);
                    const x2 = 250 + 125 * Math.cos(rad); // end near inner orbit
                    const y2 = 250 + 125 * Math.sin(rad);
                    return (
                      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow)" opacity="0.6" />
                    )
                  })}
                </svg>
              </div>

              {/* Center Image */}
              <img src="/e-commerce1.png" alt="Ecommerce SEO Process" className="w-[45%] h-[45%] object-contain relative z-10 drop-shadow-2xl" 
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/400x400/transparent/0f766e?text=Cart+Image';
                }}
              />
              
              <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 text-[#0f766e] text-[10px] md:text-[11px] font-bold text-center tracking-widest leading-relaxed whitespace-nowrap z-20 bg-white/95 px-5 py-2.5 rounded-full shadow-md border border-slate-100">
                BETTER VISIBILITY<br/>MORE TRAFFIC<br/>HIGHER REVENUE
              </div>

              {/* Orbiting Icons (Desktop Only) */}
              <div className="hidden xl:block absolute inset-0 pointer-events-none">
                <IconNode icon={<ShoppingBag size={18} />} angle={-35} />
                <IconNode icon={<Pen size={18} />} angle={0} />
                <IconNode icon={<Link2 size={18} />} angle={35} />
                
                <IconNode icon={<Search size={18} />} angle={215} />
                <IconNode icon={<Code size={18} />} angle={180} />
                <IconNode icon={<Star size={18} />} angle={145} />
              </div>
            </div>
          </div>

          {/* Right Column (02, 04, 06) */}
          <div className="w-full xl:w-[35%] flex flex-col gap-6 z-10">
            <ProcessCard 
              number="02" 
              title="Product & Category SEO" 
              desc="We optimize product and category pages that rank higher & convert better."
              ui={<ProductSeoUI />}
            />
            <ProcessCard 
              number="04" 
              title="Content That Drives Traffic" 
              desc="We create content that answers, ranks and moves buyers forward."
              ui={<ContentSeoUI />}
            />
            <ProcessCard 
              number="06" 
              title="Authority & Link Building" 
              desc="We build relevant authority that strengthens rankings and long-term growth."
              ui={<LinkBuildingUI />}
            />
          </div>
        </div>

        {/* Features Row */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 mb-6">
          <div className="md:w-1/4">
            <h4 className="font-bold text-[#132a43] text-xl leading-tight">
              Everything works<br/>together. That's the<br/><span className="text-[#0f766e]">Promanage advantage.</span>
            </h4>
          </div>
          
          <div className="md:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-6">
            <FeatureItem icon="🎯" title="Integrated Strategy" desc="All SEO areas aligned for maximum impact." />
            <FeatureItem icon="📊" title="Data-Driven Decisions" desc="We act on data, not guesswork." />
            <FeatureItem icon="📋" title="Transparent Reporting" desc="Clear insights. Real results." />
            <FeatureItem icon="👤" title="Ecommerce Specialists" desc="We understand stores, customers and conversions." />
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#0b514b] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden text-white shadow-xl">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current" preserveAspectRatio="none"><pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" /></pattern><rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" /></svg>
          </div>
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center shrink-0 bg-white/5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 3.86-12A22 22 0 0 1 12 15z"/><path d="m15 12-3-3a22 22 0 0 1 12-3.86A22 22 0 0 1 15 12z"/></svg>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Ready to Grow Your Store?</h3>
              <p className="text-teal-50 text-sm md:text-base opacity-90">Let's build the SEO foundation that drives traffic, ranks and real revenue.</p>
            </div>
          </div>
          
          <button className="bg-white text-[#0f766e] font-bold px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-colors shrink-0 relative z-10 shadow-lg">
            Get My Free SEO Strategy
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>

      </div>
    </section>
  );
}

// Subcomponents

function ProcessCard({ number, title, desc, ui }: { number: string, title: string, desc: string, ui: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-2xl p-4 md:p-4 flex flex-col md:flex-row gap-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow">
      <div className="flex-1">
        <div className="flex items-start gap-3 mb-2">
          <span className="text-3xl font-black text-slate-200 leading-none">{number}</span>
          <div>
            <h4 className="font-bold text-[#132a43] text-[14px] mb-1.5">{title}</h4>
            <div className="w-5 h-[2px] bg-[#0f766e] mb-2.5"></div>
            <p className="text-[11.5px] text-slate-500 leading-relaxed">{desc}</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[170px] shrink-0 flex items-center justify-center">
        {ui}
      </div>
    </div>
  );
}

function IconNode({ icon, angle }: { icon: React.ReactNode, angle: number }) {
  const rad = (angle * Math.PI) / 180;
  const radius = 230; // Updated to match outer circle radius
  const left = `calc(50% + ${radius * Math.cos(rad)}px - 24px)`;
  const top = `calc(50% + ${radius * Math.sin(rad)}px - 24px)`;

  return (
    <div 
      className="absolute w-12 h-12 bg-[#0f766e] rounded-full text-white flex items-center justify-center shadow-lg border-[3px] border-white z-10 shadow-[0_4px_10px_rgba(15,118,110,0.3)]"
      style={{ top, left }}
    >
      {icon}
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-2xl mt-1">{icon}</div>
      <div>
        <h5 className="font-bold text-[#132a43] text-[12px] mb-1">{title}</h5>
        <p className="text-[11px] text-slate-500 leading-tight">{desc}</p>
      </div>
    </div>
  );
}

// Mini UIs

function SearchIntentUI() {
  return (
    <div className="w-full bg-white rounded-xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col h-full justify-between border border-slate-50">
      <div>
        <div className="bg-white rounded-[2rem] border border-slate-100 p-1.5 px-2.5 flex items-center justify-between mb-2 shadow-sm">
          <span className="text-[7.5px] font-medium text-[#132a43] truncate">best noise cancelling headphones</span>
          <Search size={8} className="text-slate-400 shrink-0 ml-1.5" />
        </div>
        <div className="text-[7.5px] font-bold text-[#132a43] mb-1">People also search for</div>
        <div className="flex gap-1 overflow-hidden flex-wrap mb-2">
          <span className="bg-[#ecfdf5] text-[#0f766e] px-1.5 py-0.5 rounded-full text-[6.5px] font-bold whitespace-nowrap">wireless</span>
          <span className="bg-[#ecfdf5] text-[#0f766e] px-1.5 py-0.5 rounded-full text-[6.5px] font-bold whitespace-nowrap">bluetooth</span>
          <span className="bg-[#ecfdf5] text-[#0f766e] px-1.5 py-0.5 rounded-full text-[6.5px] font-bold whitespace-nowrap">over ear</span>
          <span className="bg-[#ecfdf5] text-[#0f766e] px-1.5 py-0.5 rounded-full text-[6.5px] font-bold whitespace-nowrap">noise cancelling</span>
        </div>
      </div>
      
      {/* Mini Line Chart */}
      <div className="w-full h-10 relative mt-auto">
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f766e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path 
            d="M0,25 L10,24 L20,22 L30,22 L40,19 L50,19 L60,17 L70,14 L80,7 L90,3 L100,0 L100,30 L0,30 Z" 
            fill="url(#chartGradient)" 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.path 
            d="M0,25 L10,24 L20,22 L30,22 L40,19 L50,19 L60,17 L70,14 L80,7 L90,3 L100,0" 
            fill="none" stroke="#0f766e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {[
            {cx: 10, cy: 24}, {cx: 20, cy: 22}, {cx: 30, cy: 22}, {cx: 40, cy: 19}, {cx: 50, cy: 19},
            {cx: 60, cy: 17}, {cx: 70, cy: 14}, {cx: 80, cy: 7}, {cx: 90, cy: 3}, {cx: 100, cy: 0}
          ].map((pt, i) => (
            <motion.circle 
              key={i} cx={pt.cx} cy={pt.cy} r="1.5" fill="#0f766e" 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + (i * 0.1), type: "spring" }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

function ProductSeoUI() {
  return (
    <div className="w-full bg-white rounded-lg p-2 border border-slate-100 shadow-sm flex items-center gap-3">
      <div className="w-10 h-10 bg-slate-100 rounded-md overflow-hidden shrink-0">
        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80" alt="Headphones" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="h-1.5 w-full bg-slate-200 rounded mb-1"></div>
        <div className="flex items-center gap-0.5 mb-1">
          {[1,2,3,4,5].map(i => <Starey key={i} width="8" />)}
          <span className="text-[5.5px] text-slate-400 ml-1">(128)</span>
        </div>
        <div className="font-bold text-[8.5px] text-[#132a43] mb-1">$59.99</div>
        <div className="bg-[#0f766e] text-white text-[6.5px] font-bold text-center py-0.5 rounded">Add to cart</div>
      </div>
    </div>
  );
}

function TechnicalSeoUI() {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = 96;
      const duration = 1500;
      const incrementTime = duration / end;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="w-full bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center border border-slate-50">
      <div className="text-[12px] font-bold text-[#1e293b] mb-4">Site Speed</div>
      
      {/* Semi-Circle Dial */}
      <div className="relative w-40 h-24 flex flex-col items-center justify-end overflow-visible mb-1 mt-1">
        <svg viewBox="0 0 120 65" className="absolute top-0 left-0 w-full h-full overflow-visible">
          {/* Background Track */}
          <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="#f1f5f9" strokeWidth="7" strokeLinecap="round" />
          {/* Active Track (96%) */}
          <motion.path 
            d="M 10 60 A 50 50 0 0 1 110 60" 
            fill="none" stroke="#117664" strokeWidth="7" strokeLinecap="round" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 0.96 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="text-center flex flex-col items-center z-10 relative mt-4">
          <div className="text-[28px] font-extrabold text-[#117664] leading-none flex items-baseline gap-1">
            {count}<span className="text-[12px] text-[#475569] font-bold">/100</span>
          </div>
          <div className="text-[12px] font-bold text-[#117664] mt-1.5">Excellent</div>
        </div>
      </div>
    </div>
  );
}

function ContentSeoUI() {
  return (
    <div className="w-full bg-white rounded-lg p-2 border border-slate-100 shadow-sm flex items-start gap-2.5">
      <div className="w-7 h-7 bg-slate-100 rounded flex-shrink-0 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&q=80" alt="Product" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="h-1 w-3/4 bg-slate-200 rounded mb-1"></div>
        <div className="h-1 w-1/2 bg-slate-200 rounded mb-1.5"></div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1"><CheckCircle2 size={7} className="text-[#0f766e]" /><span className="text-[6.5px] font-bold text-slate-600">Buying Guide</span></div>
          <div className="flex items-center gap-1"><CheckCircle2 size={7} className="text-[#0f766e]" /><span className="text-[6.5px] font-bold text-slate-600">Comparison</span></div>
          <div className="flex items-center gap-1"><CheckCircle2 size={7} className="text-[#0f766e]" /><span className="text-[6.5px] font-bold text-slate-600">Use Cases</span></div>
        </div>
      </div>
    </div>
  );
}

function SchemaUI() {
  return (
    <motion.div 
      className="w-full bg-white rounded-xl p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-50"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-1.5 mb-2">
        {/* Google G Logo */}
        <svg viewBox="0 0 24 24" width="13" height="13">
          <path fill="#4285F4" d="M23.74 12.27c0-.86-.07-1.68-.22-2.47H12v4.67h6.58a6.3 6.3 0 0 1-2.73 4.14v3.42h4.42c2.58-2.38 4.07-5.88 4.07-9.76z" />
          <path fill="#34A853" d="M12 24c3.31 0 6.08-1.1 8.11-2.97l-4.42-3.42c-1.1.74-2.51 1.18-4.07 1.18-3.13 0-5.78-2.11-6.72-4.96H.32v3.5A12.02 12.02 0 0 0 12 24z" />
          <path fill="#FBBC05" d="M5.28 14.83a7.2 7.2 0 0 1 0-4.66v-3.5H.32a11.96 11.96 0 0 0 0 11.66l4.96-3.5z" />
          <path fill="#EA4335" d="M12 4.79c1.8 0 3.42.62 4.69 1.83l3.52-3.52C18.08 1.1 15.31 0 12 0 7.37 0 3.32 2.65.32 6.67l4.96 3.5c.94-2.85 3.59-4.96 6.72-4.96z" />
        </svg>
        <span className="h-1.5 w-16 bg-slate-100 rounded"></span>
      </div>
      <div className="flex items-center gap-0.5 mb-1.5">
        {[1,2,3,4,5].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + (i * 0.1), type: "spring" }}
          >
            <Starey width="9" />
          </motion.div>
        ))}
      </div>
      <div className="text-[#1a0dab] text-[10.5px] font-medium leading-snug mb-1 hover:underline cursor-pointer">Wireless Headphones |<br/>Active Noise Cancelling</div>
      <div className="text-[9px] text-slate-600 mb-1.5">$59.99 • <span className="text-[#0f766e] font-medium">In stock</span></div>
      <div className="flex items-center gap-1 text-[8px] text-slate-500 font-medium">
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map(i => <Starey key={i} fill="#cbd5e1" width="8" />)} 
        </div>
        (128)
      </div>
    </motion.div>
  );
}

function LinkBuildingUI() {
  return (
    <div className="w-full bg-white rounded-2xl p-5 pb-0 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col border border-slate-50 relative overflow-hidden h-full min-h-[160px]">
      <div className="text-[12px] font-bold text-[#1e293b] mb-4 text-left w-full z-10 relative">Domain Authority</div>
      
      <div className="flex items-center justify-center gap-4 mb-8 z-10 relative">
        {/* Circle 42 */}
        <div className="relative w-14 h-14 flex items-center justify-center rounded-full">
          <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full" style={{ transform: "rotate(-180deg)" }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="4" />
            <motion.circle 
              cx="50" cy="50" r="45" fill="none" stroke="#117664" strokeWidth="6" strokeLinecap="round"
              strokeDasharray="282.7" strokeDashoffset="282.7"
              initial={{ strokeDashoffset: 282.7 }}
              whileInView={{ strokeDashoffset: 282.7 - (282.7 * 0.25) }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <span className="text-[20px] font-black text-[#0f172a] leading-none tracking-tight">42</span>
        </div>
        
        <span className="text-[13px] font-bold text-[#334155] mt-1 z-10 px-1">to</span>
        
        {/* Circle 68 */}
        <div className="relative w-16 h-16 flex items-center justify-center rounded-full">
          <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full" style={{ transform: "rotate(-135deg)" }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="4" />
            <motion.circle 
              cx="50" cy="50" r="45" fill="none" stroke="#117664" strokeWidth="6" strokeLinecap="round"
              strokeDasharray="282.7" strokeDashoffset="282.7"
              initial={{ strokeDashoffset: 282.7 }}
              whileInView={{ strokeDashoffset: 282.7 - (282.7 * 0.25) }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
          </svg>
          <span className="text-[24px] font-black text-[#0f172a] leading-none tracking-tight">68</span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-20 absolute bottom-0 left-0 z-0 pointer-events-none">
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="linkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#117664" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <motion.path 
            d="M-2,46 L10,43 L18,45 L28,38 L38,37 L48,31 L58,29 L68,32 L82,22 L95,16 L105,16 L105,52 L-2,52 Z" 
            fill="url(#linkGradient)" 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <motion.path 
            d="M-2,46 L10,43 L18,45 L28,38 L38,37 L48,31 L58,29 L68,32 L82,22 L95,16 L105,16" 
            fill="none" stroke="#117664" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {[
            {cx: 0, cy: 46}, {cx: 10, cy: 43}, {cx: 18, cy: 45}, {cx: 28, cy: 38}, {cx: 38, cy: 37},
            {cx: 48, cy: 31}, {cx: 58, cy: 29}, {cx: 68, cy: 32}, {cx: 82, cy: 22}, {cx: 95, cy: 16}
          ].map((pt, i) => (
            <motion.circle 
              key={i} cx={pt.cx} cy={pt.cy} r="1.5" fill="#117664" 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + (i * 0.1), type: "spring" }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

function Starey({ fill = "#fbbf24", width = "12" }: { fill?: string, width?: string }) {
  return (
    <svg width={width} height={width} viewBox="0 0 24 24" fill={fill} stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
