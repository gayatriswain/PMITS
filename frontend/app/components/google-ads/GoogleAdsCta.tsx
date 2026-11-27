"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useCmsText } from "@/components/cms/SectionContent";
import Link from "next/link";
import { html, rich } from "@/components/cms/rich";

export default function GoogleAdsCta() {
  const $t = useCmsText();
  return (
    <section className="bg-[#fafdfc] relative w-full overflow-hidden">
      
      {/* Main Split Layout */}
      <div className="flex flex-col lg:flex-row min-h-[750px]">
        
        {/* Left Side - Content */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 lg:pl-[max(1.25rem,calc((100vw-1640px)/2+1.25rem))] lg:pr-16 py-20 relative z-20">
          
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[#00897b] text-xl leading-none">✦</span>
            <span className="text-[#00897b] text-[10px] font-bold tracking-[0.2em] uppercase relative">
              <span className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-px bg-[#00897b]/30"></span>
              {html($t("GoogleAdsCta__t1", "Ready to grow?"))}</span>
          </div>

          <h2 className="text-h2 font-bold text-[#132a43] mb-6 font-serif">{rich($t("GoogleAdsCta__t2m", "Let's Build Your<br>Next Growth Story<br><span class=\"text-[#004e48]\">Together.</span>"))}</h2>

          <p className="text-body text-slate-500 mb-10 max-w-lg">
            {rich($t("GoogleAdsCta__t5", "You've seen what's possible. Now, let's create a Google Ads strategy that drives real customers and real business growth."))}</p>

          <div className="flex flex-col sm:flex-row items-center gap-8 mb-16">
            <Link href={$t("GoogleAdsCta__u2", "/contact")} className="whitespace-nowrap bg-[#004e48] hover:bg-[#003d38] text-white pl-2 pr-6 py-2 rounded-full font-bold text-[15px] transition-all shadow-[0_10px_20px_rgba(0,78,72,0.2)] flex items-center gap-4 group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#004e48] shrink-0 group-hover:scale-105 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              {$t("GoogleAdsCta__t6", "Get My Free Google Ads Strategy")}</Link>
            
            <Link href={$t("GoogleAdsCta__u1", "/testimonials")} className="whitespace-nowrap text-[#004e48] font-bold text-[15px] flex items-center gap-2 hover:gap-3 transition-all border-b-2 border-[#004e48]/30 hover:border-[#004e48] pb-1 group">
              {$t("GoogleAdsCta__t7", "View Case Studies")}<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#132a43] flex items-center justify-center text-white shrink-0 mt-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#132a43] mb-1">{html($t("GoogleAdsCta__t8", "Custom Strategy"))}</h4>
                <p className="text-[10px] text-slate-500 leading-tight">{rich($t("GoogleAdsCta__t9", "Tailored to your business goals and market."))}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#132a43] flex items-center justify-center text-white shrink-0 mt-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#132a43] mb-1">{html($t("GoogleAdsCta__t10", "Transparent Results"))}</h4>
                <p className="text-[10px] text-slate-500 leading-tight">{rich($t("GoogleAdsCta__t11", "Clear reporting. Real numbers. No hidden surprises."))}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#132a43] flex items-center justify-center text-white shrink-0 mt-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#132a43] mb-1">{html($t("GoogleAdsCta__t12", "No Lock-in Contracts"))}</h4>
                <p className="text-[10px] text-slate-500 leading-tight">{rich($t("GoogleAdsCta__t13", "Work with us because you want to."))}</p>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Side - Image & Overlay */}
        <div className="w-full lg:w-[55%] relative min-h-[500px] lg:min-h-full">
          <img 
            src={$t("GoogleAdsCta__t14", "/growth_doorway.webp")} 
            alt={$t("GoogleAdsCta__t15", "Growth Doorway")} 
            className="absolute inset-0 w-full h-full object-cover rounded-l-3xl"
          />
          <div className="absolute inset-0 rounded-l-3xl bg-black/40"></div>
          
          {/* Left Overlay Text */}
          <div className="absolute left-8 lg:left-12 top-1/2 -translate-y-1/2 max-w-[150px] lg:max-w-[180px]">
            <p className="text-small text-white/90 font-medium mb-4">{rich($t("GoogleAdsCta__t16", "You focus on your business."))}</p>
            <div className="w-8 h-px bg-white/30 mb-6"></div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white mb-4 backdrop-blur-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <p className="text-small text-white font-bold">{rich($t("GoogleAdsCta__t17", "We bring you qualified customers."))}</p>
          </div>

          {/* Right Overlay Text */}
          <div className="absolute right-8 lg:right-[max(2rem,calc((100vw-1640px)/2+2rem))] top-1/2 -translate-y-1/2 max-w-[150px] lg:max-w-[180px] text-right">
            <p className="text-small text-white/90 font-medium mb-4">{rich($t("GoogleAdsCta__t18", "Together, we create growth that lasts."))}</p>
            <div className="w-8 h-px bg-white/30 mb-6 ml-auto"></div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white mb-4 backdrop-blur-sm ml-auto">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
            </div>
            <p className="text-small text-white font-bold">{rich($t("GoogleAdsCta__t19m", "More leads.<br>Lower costs.<br>Better ROI."))}</p>
          </div>
          {/* Floating Results Bar */}
          <div className="absolute bottom-8 right-6 lg:right-[max(1.25rem,calc((100vw-1640px)/2+1.25rem))] left-6 lg:left-12 bg-white/95 backdrop-blur-xl rounded-3xl p-5 lg:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/50 z-30">
            
            <div className="text-center mb-5">
              <p className="text-[#004e48] text-[9px] lg:text-[10px] font-bold tracking-widest uppercase">{rich($t("GoogleAdsCta__t22", "Average Results Our Clients Achieve"))}</p>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap xl:flex-nowrap items-center justify-between gap-4 px-2 lg:px-4">
              
              <div className="flex items-center gap-3 w-[45%] md:w-auto">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#e0f2f1] rounded-xl lg:rounded-2xl flex items-center justify-center text-[#00897b] shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <h4 className="text-h5 font-bold text-[#132a43] mb-1">{html($t("GoogleAdsCta__t23", "+186%"))}</h4>
                  <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">{rich($t("GoogleAdsCta__t24", "Qualified Leads"))}</p>
                </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200"></div>

              <div className="flex items-center gap-3 w-[45%] md:w-auto">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-100 rounded-xl lg:rounded-2xl flex items-center justify-center text-slate-500 border border-slate-200 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                </div>
                <div>
                  <h4 className="text-h5 font-bold text-[#132a43] mb-1">-40%</h4>
                  <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">{rich($t("GoogleAdsCta__t25", "Cost Per Lead"))}</p>
                </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200"></div>

              <div className="flex items-center gap-3 w-[45%] md:w-auto mt-4 md:mt-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#e0f2f1] rounded-xl lg:rounded-2xl flex items-center justify-center text-[#00897b] shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
                </div>
                <div>
                  <h4 className="text-h5 font-bold text-[#132a43] mb-1">{html($t("GoogleAdsCta__t26", "6.2x"))}</h4>
                  <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">{rich($t("GoogleAdsCta__t27", "ROAS Improved"))}</p>
                </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200"></div>

              <div className="flex items-center gap-3 w-[45%] md:w-auto mt-4 md:mt-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-100 rounded-xl lg:rounded-2xl flex items-center justify-center text-slate-600 border border-slate-200 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div>
                  <h4 className="text-h5 font-bold text-[#132a43] mb-1">{html($t("GoogleAdsCta__t28", "100+"))}</h4>
                  <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">{rich($t("GoogleAdsCta__t29", "Businesses Trust Us"))}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
