import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../shared/Container';
import BeforeAfterShowcase from './BeforeAfterShowcase';

const NAVY = "#132a43";
const TEAL = "#0d9488";
const GOLD = "#b58e3a";
const DARK = "#0b3b35";

export default function WebsiteDevTransformations() {
  return (
    <section className="relative w-full bg-white overflow-hidden py-8 lg:py-10">
      {/* Background Dot Pattern (Top Left) */}
      <div className="absolute top-4 left-4 w-64 h-64 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)', backgroundSize: '20px 20px', backgroundPosition: '0 0' }}></div>
      
      <Container className="relative">
        <div className="flex flex-col lg:flex-row items-center justify-center relative">
          
          {/* Center Content */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto relative z-10 lg:pr-24">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white mb-6 shadow-sm">
              <span className="flex items-center justify-center w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 w-4 h-4">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#0d9488] uppercase pr-2">
                Real Results, Real Growth
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl md:text-[52px] font-bold leading-[1.1] mb-3 tracking-tight">
              <span style={{ color: NAVY }}>Real Businesses.</span><br />
              <span style={{ color: GOLD }}>Real Transformations.</span>
            </h2>

            {/* Subheading */}
            <p className="text-sm md:text-[15px] text-slate-700 max-w-[28rem] leading-[1.6] font-medium mb-3">
              We don&apos;t just build websites. We build digital experiences that turn businesses into industry leaders.
            </p>

            {/* Imagine Text */}
            <div className="relative inline-block mt-0 mb-4">
              <span className="font-serif italic text-[22px] md:text-[26px] tracking-wide" style={{ color: TEAL }}>
                Imagine your business here next.
              </span>
              <svg className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-[115%] h-3" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M5 10 Q 100 -2 195 10 Q 100 2 5 10 Z" fill={GOLD} />
              </svg>
            </div>
          </div>

          {/* Right Floating Card (Absolute on large screens, static on small) */}
          <div className="mt-12 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-20 flex flex-col items-center lg:items-start">
            
            {/* Arrow connecting center text to card (Hidden on mobile) */}
            <div className="hidden lg:block absolute right-[102%] top-[60%] -translate-y-1/2 text-[#0d9488]/50 w-16 h-12">
              <svg viewBox="0 0 100 100" fill="none" preserveAspectRatio="none" className="w-full h-full">
                <path d="M10 80 Q 50 80 90 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <path d="M78 16 L 93 17 L 88 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 w-full max-w-[300px]">
              <div className="flex gap-4 items-start mb-5">
                <div className="w-12 h-12 rounded-full bg-[#0b3b35] flex items-center justify-center flex-shrink-0 text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                    <path d="M12 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                  </svg>
                </div>
                <div className="pt-0.5">
                  <h4 className="text-[14px] font-bold text-slate-900 leading-snug mb-1.5">
                    Curious what we can do for your business?
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium pr-2">
                    Let&apos;s discuss your goals in a free strategy call.
                  </p>
                </div>
              </div>

              <Link href="/contact" className="flex items-center justify-center gap-2 w-full bg-[#0b3b35] hover:bg-[#132a43] text-white text-[12px] font-semibold py-3 px-4 rounded-lg transition-colors">
                Book Free Strategy Call
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            {/* Social Proof Below Card */}
            <div className="flex items-center gap-3 mt-4 ml-1">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                     <Image src="/image1.jpg" alt="User" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-bold text-slate-700 leading-tight">
                50+ businesses<br/>
                <span className="text-slate-400 font-medium">transformed with ProManage</span>
              </p>
            </div>

          </div>
        </div>

        {/* --- BEFORE / AFTER SHOWCASE: category filter → carousel → slider --- */}
        <BeforeAfterShowcase />

        {/* --- BOTTOM BANNER --- */}
        <div className="mt-4 lg:mt-6 w-full bg-[#FEFEFC] rounded-[24px] lg:rounded-[32px] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] border border-slate-100 p-6 lg:px-10 lg:py-8 flex flex-col xl:flex-row items-center gap-8 xl:gap-0 relative z-20">
          
          {/* Left Side: Testimonial */}
          <div className="flex-1 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 xl:pr-10">
            {/* Quote + Text */}
            <div className="flex items-start gap-3 sm:gap-4 max-w-[320px]">
              <div className="text-[#cca651] text-4xl sm:text-5xl font-serif leading-none mt-1 sm:mt-2 shrink-0">“</div>
              <p className="text-[12px] sm:text-[13px] font-medium text-slate-700 leading-relaxed">
                ProManage didn&apos;t just redesign our website, they transformed our entire digital presence. The results speak for themselves.
              </p>
            </div>
            
            {/* Author */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden relative bg-slate-200">
                 <Image src="/image1.jpg" alt="Rahul Mehta" fill className="object-cover" />
              </div>
              <div>
                 <h4 className="text-[12px] sm:text-[13px] font-bold text-slate-900 leading-tight mb-0.5">Rahul Mehta</h4>
                 <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight">Founder, Organic Harvest</p>
              </div>
            </div>
          </div>

          {/* Vertical Divider (Desktop) / Horizontal Divider (Mobile) */}
          <div className="hidden xl:block w-px h-16 bg-slate-200 shrink-0"></div>
          <div className="block xl:hidden w-full h-px bg-slate-200"></div>

          {/* Right Side: CTA */}
          <div className="flex-1 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 xl:pl-10">
            <div className="flex flex-col gap-1.5 max-w-[300px]">
               <h3 className="text-[15px] sm:text-[16px] font-bold text-[#132a43] leading-snug">
                 What could your business look like with the right website?
               </h3>
               <p className="text-[11px] sm:text-[12px] text-slate-500 font-medium">
                 Let&apos;s build something that drives real results for you.
               </p>
            </div>
            
            <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
              <Link href="/success-stories" className="bg-[#0b3b35] hover:bg-[#132a43] text-white text-[12px] font-semibold py-3 px-5 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                See More Success Stories
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
              </Link>
              <div className="flex items-center gap-1.5 text-[#0d9488]/80 sm:mr-1 mt-0.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15c0-4.4 3.6-8 8-8s8 3.6 8 8"></path><polyline points="17 11 21 15 17 19"></polyline></svg>
                <span className="text-[9px] font-bold tracking-wide">Explore more transformations</span>
              </div>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}
