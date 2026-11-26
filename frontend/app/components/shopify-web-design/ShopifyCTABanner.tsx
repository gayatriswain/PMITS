"use client";

import React from 'react';
import Link from 'next/link';
import { useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

export default function ShopifyCTABanner() {
  const $t = useCmsText();
  return (
    <section className="w-full bg-[#fcfdfd] pb-16 pt-4 px-4 md:px-8">
      <div className="max-w-[1280px] mx-auto bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col lg:flex-row items-center p-6 lg:p-8 gap-8 lg:gap-10 relative overflow-hidden">
        
        {/* Background decorative wave (optional soft texture) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute -left-20 -top-20 w-[400px] h-[400px] rounded-full border-[1px] border-[#0d9488]/10" />
          <div className="absolute -left-40 -top-40 w-[600px] h-[600px] rounded-full border-[1px] border-[#0d9488]/10" />
        </div>

        {/* Left Side: Content */}
        <div className="flex-1 w-full relative z-10">
          
          <h2 className="text-h2 font-black text-[#0f2333] mb-3">
            {$t("ShopifyCTABanner__t1", "Let's build a store that")}<br />
            looks <span className="text-[#0d9488]">amazing</span> and <span className="text-[#0d9488]">{$t("ShopifyCTABanner__t2", "sells even better.")}</span>
          </h2>
          <p className="text-body text-slate-500 font-medium mb-10">
            {rich($t("ShopifyCTABanner__t3", "Get a tailored strategy for your Shopify store."))}</p>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            
            {/* The Image (Composite 3D illustration) */}
            <div className="w-[180px] md:w-[220px] shrink-0 relative">
              {/* Fallback image path, assuming shopify4.webp or similar is the 3D asset */}
              <img src={$t("ShopifyCTABanner__t4", "/shopify4.webp")} alt={$t("ShopifyCTABanner__t5", "Shopify Strategy")} className="w-full h-auto object-contain" 
                   onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>

            {/* Features Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8">
              
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#f4fdfa] flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0b3b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    <path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="3" stroke="#0d9488"/>
                  </svg>
                </div>
                <h4 className="text-[12px] font-bold text-[#0f2333] leading-tight mb-1 whitespace-nowrap">{$t("ShopifyCTABanner__t6", "Free Expert")}<br/>{$t("ShopifyCTABanner__t7", "Consultation")}</h4>
                <p className="text-[10px] text-slate-500 font-medium">{rich($t("ShopifyCTABanner__t8", "No obligations."))}</p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#f4fdfa] flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0b3b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14" stroke="#0d9488" strokeWidth="2.5"/>
                  </svg>
                </div>
                <h4 className="text-[12px] font-bold text-[#0f2333] leading-tight mb-1 whitespace-nowrap">{$t("ShopifyCTABanner__t9", "Actionable")}<br/>{$t("ShopifyCTABanner__t10", "Recommendations")}</h4>
                <p className="text-[10px] text-slate-500 font-medium">{rich($t("ShopifyCTABanner__t11", "Clear next steps."))}</p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#f4fdfa] flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0b3b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="18" y="3" width="4" height="18" rx="1" fill="#0d9488" stroke="none" />
                    <rect x="10" y="8" width="4" height="13" rx="1" fill="#0b3b35" stroke="none" />
                    <rect x="2" y="13" width="4" height="8" rx="1" fill="#14b8a6" stroke="none" />
                  </svg>
                </div>
                <h4 className="text-[12px] font-bold text-[#0f2333] leading-tight mb-1 whitespace-nowrap">{$t("ShopifyCTABanner__t12", "Growth-Focused")}<br/>{$t("ShopifyCTABanner__t13", "Strategy")}</h4>
                <p className="text-[10px] text-slate-500 font-medium">{rich($t("ShopifyCTABanner__t14", "Built for results."))}</p>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: CTA Action */}
        <div className="lg:w-[320px] xl:w-[380px] shrink-0 lg:pl-10 lg:border-l lg:border-slate-100 flex flex-col justify-center relative z-10 w-full">
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">✨</span>
            <h3 className="text-[18px] font-bold text-[#0f2333]">{$t("ShopifyCTABanner__t15", "Ready to get started?")}</h3>
          </div>
          
          <Link href={$t("ShopifyCTABanner__t16", "/contact")} className="w-full bg-[#0d9488] text-white font-bold rounded-xl py-4 px-6 flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(13,148,136,0.25)] hover:shadow-[0_8px_25px_rgba(13,148,136,0.35)] hover:-translate-y-1 transition-all duration-300 mb-6">
            {$t("ShopifyCTABanner__t17", "Get My Shopify Strategy")}<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <div className="flex items-center gap-4">
            {/* Avatars */}
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-9 h-9 rounded-full border-[2.5px] border-white bg-slate-200 overflow-hidden relative">
                  {/* Generic SVG Avatar */}
                  <svg viewBox="0 0 24 24" className="w-full h-full text-slate-400 bg-slate-100" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              ))}
            </div>
            
            <p className="text-[11px] text-slate-500 font-medium leading-tight">
              {rich($t("ShopifyCTABanner__t18", "Trusted by"))}<br/>{rich($t("ShopifyCTABanner__t19", "businesses worldwide"))}</p>
          </div>

        </div>

      </div>
    </section>
  );
}
