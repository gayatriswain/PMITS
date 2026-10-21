"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Container from './Container';
import Image from 'next/image';

const FloatingBadge = ({ icon, title, desc, position, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className={`absolute ${position} bg-white rounded-xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-50 flex items-center gap-3 z-20 w-[200px]`}
    >
      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
        <span className="text-lg">{icon}</span> 
      </div>
      <div>
        <h4 className="text-xs font-bold text-[#1a2b3c]">{title}</h4>
        <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{desc}</p>
      </div>
    </motion.div>
  );
};

const MetricItem = ({ icon, value, label, color }: any) => (
  <div className="flex items-center gap-4 w-full md:w-auto">
    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-xl shadow-sm border border-slate-100">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className={`text-xl font-bold ${color}`}>{value}</span>
      <span className="text-xs text-slate-500 font-medium">{label}</span>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="text-3xl mb-4 text-[#00897b]">{icon}</div>
    <h4 className="text-sm font-bold text-[#1a2b3c] mb-2">{title}</h4>
    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const AiSeoHero = () => {
  return (
    <section className="bg-[#fcfdfd] pt-32 pb-20 overflow-hidden relative font-sans">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start z-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-slate-100 mb-6">
              <span className="text-[#00897b] text-sm">✨</span>
              <span className="text-[#00897b] text-xs font-bold tracking-widest uppercase">AI SEO & GEO SERVICES</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold text-[#1a2b3c] leading-[1.1] mb-6 font-serif">
              Your <span className="text-[#00897b]">AI SEO</span><br />
              Agent. Always<br />
              Optimizing.
            </h1>

            {/* Subheadline */}
            <p className="text-slate-600 text-lg max-w-lg mb-8 leading-relaxed">
              Powered by multiple AI agents that work together to grow your visibility, rankings and revenue across <span className="text-[#00897b] font-semibold">every search</span> experience.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button className="bg-[#00897b] hover:bg-[#00796b] text-white px-8 py-4 rounded-full font-semibold transition-all shadow-[0_8px_20px_rgba(0,137,123,0.3)] flex items-center gap-2 hover:gap-3">
                Get AI SEO Strategy
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button className="bg-white hover:bg-slate-50 border border-slate-200 text-[#1a2b3c] px-6 py-4 rounded-full font-semibold transition-colors flex items-center gap-2 shadow-sm">
                <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                See How It Works
              </button>
            </div>

            {/* Trusted By */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 overflow-hidden"><img src="https://i.pravatar.cc/100?img=1" alt="User" /></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 overflow-hidden"><img src="https://i.pravatar.cc/100?img=2" alt="User" /></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 overflow-hidden"><img src="https://i.pravatar.cc/100?img=3" alt="User" /></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 overflow-hidden"><img src="https://i.pravatar.cc/100?img=4" alt="User" /></div>
              </div>
              <div className="flex flex-col">
                <div className="flex text-[#fbc02d] text-sm tracking-widest mb-1">
                  ★★★★★
                </div>
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Trusted by 100+ businesses</span>
              </div>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[600px] flex justify-center items-center">
            
            {/* The Robot Image */}
            <div className="relative z-10 w-[100%] h-[100%] flex justify-center items-center">
              <Image 
                src="/ai_seo_robot.jpg"
                alt="AI SEO Agent Robot"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Floating Badges */}
            <FloatingBadge 
              icon="🤖" title="ChatGPT" desc="Content Strategy & Optimization" 
              position="top-[5%] left-[-5%]" delay={0.2} 
            />
            <FloatingBadge 
              icon="🅰️" title="Claude" desc="Content Creation & Enhancement" 
              position="top-[10%] right-[-10%]" delay={0.4} 
            />
            <FloatingBadge 
              icon="✨" title="Google Gemini" desc="Search Insights & Intelligence" 
              position="top-[35%] left-[-15%]" delay={0.3} 
            />
            <FloatingBadge 
              icon="G" title="Google AI" desc="Ranking Signals & Understanding" 
              position="top-[40%] right-[-15%]" delay={0.5} 
            />
            <FloatingBadge 
              icon="P" title="Perplexity" desc="Research & Topic Discovery" 
              position="bottom-[25%] left-[-10%]" delay={0.4} 
            />
            <FloatingBadge 
              icon="🌐" title="And More..." desc="New AI Models & Future Agents" 
              position="bottom-[30%] right-[-10%]" delay={0.6} 
            />
            
            {/* Top Chat Bubble */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl py-3 px-6 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-slate-50 z-30 whitespace-nowrap text-center"
            >
              <p className="text-xs font-semibold text-[#1a2b3c]">Analyzing. Optimizing.</p>
              <p className="text-xs text-[#00897b] font-bold">Growing your business 24/7</p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-b border-r border-slate-50"></div>
            </motion.div>
          </div>
        </div>

        {/* Metrics Banner */}
        <div className="mt-20 bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 relative z-20">
          <MetricItem icon="📈" value="↑ 180%" label="Organic Traffic" color="text-[#00897b]" />
          <div className="w-px h-12 bg-slate-100 hidden md:block"></div>
          <MetricItem icon="📊" value="↑ 145%" label="Keyword Rankings" color="text-[#1a2b3c]" />
          <div className="w-px h-12 bg-slate-100 hidden md:block"></div>
          <MetricItem icon="🔍" value="↑ 200%" label="AI Visibility" color="text-[#00897b]" />
          <div className="w-px h-12 bg-slate-100 hidden md:block"></div>
          <MetricItem icon="👑" value="Top 3" label="More Keywords" color="text-[#1a2b3c]" />
        </div>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-20">
          <FeatureCard 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} 
            title="AI-Powered Insights" 
            desc="Deep analysis across multiple AI models and search engines." 
          />
          <FeatureCard 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} 
            title="24/7 Optimization" 
            desc="Your AI agents never stop testing and improving." 
          />
          <FeatureCard 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>} 
            title="Future-Ready GEO" 
            desc="Optimized for AI Overviews, ChatGPT, Gemini & beyond." 
          />
          <FeatureCard 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>} 
            title="Measurable Growth" 
            desc="Real results that drive traffic, leads and revenue." 
          />
        </div>

        {/* Logos Section */}
        <div className="mt-20 text-center pb-10">
          <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mb-10">
            Trusted by businesses growing through AI search
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text placeholders since we don't have real logos, but styling them cleanly */}
            <span className="font-serif text-xl font-bold">LUXE<span className="font-light text-sm block">INTERIORS</span></span>
            <span className="font-sans text-lg font-bold tracking-tight">urban space<span className="font-light text-xs block">DESIGNS</span></span>
            <span className="font-serif text-xl">HOME NEST<span className="font-light text-xs block tracking-widest">COLLECTION</span></span>
            <span className="font-sans text-xl font-light">DÉCOR<span className="font-bold text-xs block tracking-widest">CRAFT</span></span>
            <span className="font-sans text-lg font-semibold flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
              studio oak
            </span>
          </div>
        </div>

      </Container>
    </section>
  );
};

export default AiSeoHero;
