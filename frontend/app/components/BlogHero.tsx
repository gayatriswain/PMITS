"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Search, FileText, Users, Calendar, Sparkles, Target, BarChart3, Lightbulb, ShieldCheck, ArrowRight, ShoppingCart, TrendingUp } from 'lucide-react';

export default function BlogHero() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-12 lg:py-16 bg-[#fafdfc] relative overflow-hidden font-sans flex flex-col justify-center">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#99f6e4]/20 blur-[100px] rounded-full"></div>
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-[#0f766e]/5 blur-[120px] rounded-full"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,118,110,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 w-full">
        
        {/* Top Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center mb-16">
          
          {/* Left Content */}
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-6 h-[2px] bg-[#14b8a6]"></span>
              <span className="text-[#0f766e] text-[11px] font-bold tracking-[0.15em] uppercase flex items-center gap-1.5">
                Promanage Insights <Sparkles size={12} className="text-[#14b8a6]" />
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[46px] lg:text-[64px] font-black text-[#0f2923] leading-[1.1] mb-6 tracking-tight"
            >
              Ideas That Move <br />
              <span className="text-[#0f766e]">Your Business</span> <br />
              <span className="text-[#0f766e]">Forward.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[17px] text-slate-600 mb-10 leading-relaxed font-medium max-w-[460px]"
            >
              Practical insights on SEO, AI, ecommerce, websites, and digital growth—without the jargon.
            </motion.p>
            
            {/* Search Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative w-full max-w-[460px] mb-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-xl"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search articles, topics or keywords..." 
                className="w-full bg-white border border-slate-200 text-slate-800 text-[14px] rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-all"
              />
            </motion.div>
            
            {/* Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-[#14b8a6]" />
                <span className="text-[11px] font-bold text-[#0f766e] uppercase tracking-wider">Latest from the blog</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 md:gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#e8f7f5] flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-[#0f766e]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0f2923] text-[15px]">250+</div>
                    <div className="text-[11px] font-medium text-slate-500">In-depth Articles</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#e8f7f5] flex items-center justify-center shrink-0">
                    <Users size={18} className="text-[#0f766e]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0f2923] text-[15px]">15K+</div>
                    <div className="text-[11px] font-medium text-slate-500">Readers Monthly</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#e8f7f5] flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-[#0f766e]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0f2923] text-[15px]">Updated</div>
                    <div className="text-[11px] font-medium text-slate-500">Every Week</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
          </div>
          
          {/* Right Vector Graphic (Custom Composite Layout) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end w-full h-[450px] lg:h-[550px]"
          >


            <div className="relative z-10 flex items-center justify-center w-full h-full mt-4 lg:mt-0">
              
              {/* The Main Card Stack */}
              <div 
                className="relative cursor-pointer" 
                style={{ perspective: 1200 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                ref={cardRef}
              >
                <motion.div
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  className="relative w-full h-full transition-all duration-200"
                >
                  {/* Back Card 1 (Darkest) */}
                  <motion.div style={{ transform: "translateZ(-40px)" }} className="absolute inset-0 bg-[#0d9488] rounded-3xl transform -rotate-[6deg] scale-[1.02] -translate-y-1 -translate-x-6 shadow-xl transition-transform origin-center"></motion.div>
                  {/* Back Card 2 (Light) */}
                  <motion.div style={{ transform: "translateZ(-20px)" }} className="absolute inset-0 bg-[#f8fafc] rounded-3xl transform -rotate-[3deg] scale-[1.01] -translate-y-0.5 -translate-x-3 shadow-lg border border-slate-200 transition-transform origin-center"></motion.div>
                  
                  {/* Top Main Card */}
                  <motion.div style={{ transform: "translateZ(20px)" }} className="relative bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,40,60,0.1)] p-6 lg:p-8 w-[320px] lg:w-[460px] flex flex-col md:flex-row items-center gap-6 lg:gap-8 border border-slate-100">
                  
                  {/* Left Content inside card */}
                  <div className="flex-1">
                    <div className="bg-[#0f766e] text-white text-[9px] lg:text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full inline-block mb-4 shadow-sm">Featured Insight</div>
                    <h3 className="text-xl lg:text-2xl font-bold text-[#0f2923] leading-[1.15] mb-3">How AI Search<br/>Is Changing<br/>SEO in 2026</h3>
                    <p className="text-[11px] lg:text-xs text-slate-500 leading-relaxed mb-5">AI search, evolving SERPs, and changing user behavior are reshaping how businesses get discovered online.</p>
                    <button className="text-[#0f766e] text-xs font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all">Read Insight <ArrowRight size={14} /></button>
                  </div>
                  
                  {/* Right Hologram inside card */}
                  <div className="w-[120px] lg:w-[150px] h-[150px] lg:h-[180px] relative flex items-center justify-center shrink-0">
                    
                    {/* Small floating tags around hologram */}
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-0 right-0 bg-[#e8f7f5] text-[#0f766e] text-[8px] font-bold px-2 py-1 rounded-full whitespace-nowrap shadow-sm border border-teal-100/50 z-20">AI Overviews</motion.div>
                    <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-4 -left-6 bg-white text-slate-600 text-[8px] font-bold px-2 py-1 rounded-full whitespace-nowrap shadow-sm border border-slate-100 z-20">Intent</motion.div>
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3.5, repeat: Infinity }} className="absolute top-12 -left-4 bg-white text-slate-600 text-[8px] font-bold px-2 py-1 rounded-full whitespace-nowrap shadow-sm border border-slate-100 z-20">Search</motion.div>

                    {/* Static Image replacing the SVG Hologram */}
                    <img 
                      src="/Blog.png" 
                      alt="AI Hologram Illustration" 
                      className="w-[180%] h-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] object-contain z-10"
                      onError={(e) => { e.currentTarget.src = "/blog-vector.svg"; }}
                    />
                  </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Floating Widgets */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} className="absolute top-[5%] lg:top-[10%] left-[5%] lg:-left-[10%] bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] w-[90px] lg:w-[100px] h-[90px] lg:h-[100px] flex flex-col items-center justify-center border border-slate-50 z-20">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-1"><Search size={20} className="text-[#0f766e]" /></div>
                <span className="text-[10px] font-bold text-[#0f2923]">SEO</span>
              </motion.div>

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute bottom-[10%] left-0 lg:-left-[5%] bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] w-[90px] lg:w-[100px] h-[90px] lg:h-[100px] flex flex-col items-center justify-center border border-slate-50 z-20">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-1"><ShoppingCart size={20} className="text-[#0f766e]" /></div>
                <span className="text-[10px] font-bold text-[#0f2923]">Ecommerce</span>
              </motion.div>

              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, delay: 0.2 }} className="absolute top-[0%] lg:top-[5%] right-[5%] lg:-right-[5%] bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] w-[90px] lg:w-[100px] h-[90px] lg:h-[100px] flex flex-col items-center justify-center border border-slate-50 z-20">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-1"><Sparkles size={20} className="text-[#14b8a6]" /></div>
                <span className="text-[10px] font-bold text-[#0f2923]">AI & GEO</span>
              </motion.div>

              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5.5, repeat: Infinity, delay: 1.5 }} className="absolute bottom-[5%] lg:bottom-[15%] right-[0%] lg:-right-[10%] bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] w-[90px] lg:w-[100px] h-[90px] lg:h-[100px] flex flex-col items-center justify-center border border-slate-50 z-20">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-1"><TrendingUp size={20} className="text-[#0f766e]" /></div>
                <span className="text-[10px] font-bold text-[#0f2923]">Digital Growth</span>
              </motion.div>

              {/* Handwriting Annotations */}
              <div className="absolute right-[-15%] top-1/2 transform -translate-y-1/2 hidden xl:flex flex-col items-center z-30">
                <p className="font-handwriting text-[22px] text-[#0f766e] leading-tight text-center mb-2" style={{ textShadow: "1px 1px 2px rgba(15,118,110,0.1)" }}>Insights<br/>That Matters</p>
                {/* Hand drawn arrow pointing to Digital Growth */}
                <svg width="40" height="40" viewBox="0 0 50 50" fill="none" className="transform -scale-x-100 rotate-45 text-[#0f766e]">
                  <path d="M5 5C15 20 30 40 45 45M45 45L30 40M45 45L40 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

            </div>
          </motion.div>
          
        </div>
        
        {/* Bottom Banner Component */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full mt-12 bg-gradient-to-r from-[#f0f9f8] to-[#f8fcfb] rounded-2xl shadow-[0_15px_40px_rgba(15,40,60,0.06)] border border-[#e6f4f1] overflow-hidden relative"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 lg:gap-10 pr-6 md:pr-12">
            
            {/* Book Image */}
            <div className="shrink-0 relative w-48 md:w-[320px] flex items-end justify-start self-stretch">
               <img 
                 src="/blog2.png" 
                 alt="Knowledge Book" 
                 className="w-full h-auto object-contain object-bottom md:object-left-bottom mix-blend-multiply"
                 onError={(e) => { e.currentTarget.src = "/Blog.png"; }}
               />
            </div>
            
            <div className="flex-1 text-center md:text-left py-6 md:py-8 pl-6 md:pl-0">
              <h3 className="text-xl md:text-[22px] font-extrabold text-[#0f2923] mb-2">Knowledge that drives growth.</h3>
              <p className="text-slate-600 text-[13px] leading-relaxed">Actionable insights. Real strategies.<br className="hidden md:block"/> Better decisions.</p>
            </div>
            
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-6 md:gap-0 flex-1 py-6 md:py-8">
              
              <div className="flex flex-col items-center justify-center text-center gap-3 w-1/2 md:w-1/4 relative">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                  <Target size={22} className="text-[#14b8a6]" strokeWidth={1.5} />
                </div>
                <span className="text-[9px] font-bold text-[#0f2923] leading-tight uppercase tracking-wider">Practical<br/>Strategies</span>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center gap-3 w-1/2 md:w-1/4 relative md:border-l md:border-slate-200">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                  <BarChart3 size={22} className="text-[#0f766e]" strokeWidth={1.5} />
                </div>
                <span className="text-[9px] font-bold text-[#0f2923] leading-tight uppercase tracking-wider">Data-Backed<br/>Insights</span>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center gap-3 w-1/2 md:w-1/4 relative md:border-l md:border-slate-200">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                  <Lightbulb size={22} className="text-[#0f766e]" strokeWidth={1.5} />
                </div>
                <span className="text-[9px] font-bold text-[#0f2923] leading-tight uppercase tracking-wider">Easy to<br/>Implement</span>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center gap-3 w-1/2 md:w-1/4 relative md:border-l md:border-slate-200">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                  <ShieldCheck size={22} className="text-[#14b8a6]" strokeWidth={1.5} />
                </div>
                <span className="text-[9px] font-bold text-[#0f2923] leading-tight uppercase tracking-wider">For Real<br/>Businesses</span>
              </div>
              
            </div>
            
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
