"use client";

import React from 'react';
import Link from 'next/link';
import { useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

export default function ShopifyMobileExperience() {
  const $t = useCmsText();
  return (
    <>
      <style>{`
        @keyframes smoothHeartbeat {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.03) translateY(-5px); }
        }
        .animate-smooth-heartbeat {
          animation: smoothHeartbeat 4s ease-in-out infinite;
        }
        .animate-smooth-heartbeat-delayed {
          animation: smoothHeartbeat 4s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
      <section className="relative w-full bg-[#fcfdfd] bg-[url('/shopify3.webp')] bg-[length:100%_100%] bg-center bg-no-repeat overflow-hidden border-t border-slate-100">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">

          <div className="flex flex-col xl:flex-row items-center min-h-[550px] xl:min-h-[650px] relative">

            {/* Left Side: Floating Boxes (Desktop only) */}
            <div className="hidden xl:block w-1/2 h-full absolute left-0 top-0 pointer-events-none z-20">
              {/* Box 1 */}
              <div className="absolute top-[28%] left-[-35%] 2xl:left-[-25%] bg-white/95 backdrop-blur-sm rounded-[18px] p-4 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.12)] flex items-center gap-3.5 border border-white/80 pointer-events-auto animate-smooth-heartbeat">
                <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="20" width="5" height="8" rx="1.5" fill="#4ade80" />
                  <rect x="11" y="14" width="5" height="14" rx="1.5" fill="#2dd4bf" />
                  <rect x="18" y="8" width="5" height="20" rx="1.5" fill="#0d9488" />
                  <path d="M12 16L17 11L21 15L28 7" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 7H28V12" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <h4 className="text-[#0f2333] font-extrabold text-[16px] leading-tight mb-0.5">{html($t("ShopifyMobileExperience__t2", "3x Higher"))}</h4>
                  <p className="text-caption text-[#475569] font-bold">{rich($t("ShopifyMobileExperience__t3", "Mobile Conversions"))}</p>
                </div>
              </div>

              {/* Box 2 */}
              <div className="absolute top-[58%] left-[60%] 2xl:left-[50%] bg-white/95 backdrop-blur-sm rounded-[18px] px-5 py-4 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.12)] flex items-center gap-4 border border-white/80 pointer-events-auto animate-smooth-heartbeat-delayed">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[#0f2333] font-extrabold text-[14px] leading-snug">{html($t("ShopifyMobileExperience__t4", "Designed for"))}</h4>
                  <h4 className="text-[#0f2333] font-extrabold text-[14px] leading-snug">{html($t("ShopifyMobileExperience__t5", "Real Shoppers"))}</h4>
                </div>
              </div>
            </div>

          {/* Right Side: Content */}
          <div className="w-full xl:w-1/2 xl:ml-auto py-10 xl:py-16 relative z-10 xl:pl-16 order-1 xl:order-2">

            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#e6f4f1]/90 backdrop-blur-sm mb-4">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0b3b35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
                <span className="text-[9px] font-bold text-[#0b3b35] uppercase tracking-wider">{html($t("ShopifyMobileExperience__t6", "Mobile Experience"))}</span>
              </div>

              {/* Hand-drawn text */}
              <div className="absolute top-0 right-0 hidden md:block rotate-[-5deg]">
                <span className="text-[#0d9488] font-medium text-[16px] italic leading-tight block text-right">{rich($t("ShopifyMobileExperience__t7m", "Shopping.<br>Anytime.<br>Anywhere."))}</span>
                <svg className="w-12 h-3 absolute -bottom-2 right-0 stroke-[#0d9488]" viewBox="0 0 100 20" fill="none" strokeWidth="3"><path d="M5,15 Q50,0 95,10" /></svg>
              </div>

              {/* Heading */}
              <h2 className="text-h2 font-black text-[#0f2333] mb-3">{rich($t("ShopifyMobileExperience__t10m", "Your Customers<br>Are <span class=\"text-[#0d9488]\">Already on Mobile.</span>"))}</h2>

              {/* Subheading */}
              <p className="text-small text-[#475569] font-medium max-w-[420px] mb-8">
                {rich($t("ShopifyMobileExperience__t13", "We design every interaction for the screen where your customers actually shop."))}</p>
            </div>

            {/* Process Flow Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-[20px] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 mb-5 relative">

              {/* Connecting Dashed Line (Background) */}
              <div className="absolute top-[44px] md:top-[56px] left-[15%] right-[15%] h-[1px] bg-transparent border-t-[1.5px] border-dashed border-[#bce4d6] z-0"></div>

              <div className="flex items-start justify-between relative z-10">
                {/* Step 1: Search */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#f4fdfa] flex items-center justify-center shadow-[0_4px_20px_rgba(13,148,136,0.15)] mb-3 border-[3px] border-white">
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="#0a4a40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  </div>
                  <h4 className="text-[11px] md:text-[13px] font-bold text-[#0f2333] mb-0.5">{html($t("ShopifyMobileExperience__t14", "Search"))}</h4>
                  <p className="text-[9px] md:text-[11px] text-[#64748b] font-medium text-center">{rich($t("ShopifyMobileExperience__t15", "Find in seconds"))}</p>
                </div>

                {/* Arrow 1 */}
                <div className="text-[#0d9488] mt-[18px] md:mt-[26px]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </div>

                {/* Step 2: Product */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#f4fdfa] flex items-center justify-center shadow-[0_4px_20px_rgba(13,148,136,0.15)] mb-3 border-[3px] border-white">
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="#0a4a40" stroke="#0a4a40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a8.5 8.5 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" /><path d="M9 13.5l2 1.5 4-3" stroke="white" strokeWidth="2.5" fill="none" /></svg>
                  </div>
                  <h4 className="text-[11px] md:text-[13px] font-bold text-[#0f2333] mb-0.5">{html($t("ShopifyMobileExperience__t16", "Product"))}</h4>
                  <p className="text-[9px] md:text-[11px] text-[#64748b] font-medium text-center">{rich($t("ShopifyMobileExperience__t17", "See what they love"))}</p>
                </div>

                {/* Arrow 2 */}
                <div className="text-[#0d9488] mt-[18px] md:mt-[26px]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </div>

                {/* Step 3: Cart */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#f4fdfa] flex items-center justify-center shadow-[0_4px_20px_rgba(13,148,136,0.15)] mb-3 border-[3px] border-white">
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="#0a4a40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                  </div>
                  <h4 className="text-[11px] md:text-[13px] font-bold text-[#0f2333] mb-0.5">{html($t("ShopifyMobileExperience__t18", "Add to Cart"))}</h4>
                  <p className="text-[9px] md:text-[11px] text-[#64748b] font-medium text-center">{rich($t("ShopifyMobileExperience__t19", "One tap away"))}</p>
                </div>

                {/* Arrow 3 */}
                <div className="text-[#0d9488] mt-[18px] md:mt-[26px]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </div>

                {/* Step 4: Checkout */}
                <div className="flex flex-col items-center flex-1">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#f4fdfa] flex items-center justify-center shadow-[0_4px_20px_rgba(13,148,136,0.15)] mb-3 border-[3px] border-white">
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="#0a4a40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="10" x2="22" y2="10" /><circle cx="16" cy="15" r="1" fill="#0a4a40" stroke="none" /><circle cx="12" cy="15" r="1" fill="#0a4a40" stroke="none" /></svg>
                  </div>
                  <h4 className="text-[11px] md:text-[13px] font-bold text-[#0f2333] mb-0.5">{html($t("ShopifyMobileExperience__t20", "Checkout"))}</h4>
                  <p className="text-[9px] md:text-[11px] text-[#64748b] font-medium text-center">{rich($t("ShopifyMobileExperience__t21", "Buy with confidence"))}</p>
                </div>
              </div>
            </div>

            {/* CTA Banner */}
            <div className="bg-gradient-to-r from-[#e3f4ef]/90 to-[#d0efe5]/90 backdrop-blur-sm rounded-[16px] p-3 md:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-white/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-white/70 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0b3b35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
                </div>
                <div>
                  <h4 className="text-[12px] md:text-[14px] font-bold text-[#0b3b35] leading-tight">{html($t("ShopifyMobileExperience__t22", "Mobile-First Design"))}</h4>
                  <p className="text-[10px] md:text-[11px] text-[#2c544d] font-medium">{rich($t("ShopifyMobileExperience__t23", "for a shopping experience that feels effortless."))}</p>
                </div>
              </div>
              <Link href={$t("ShopifyMobileExperience__t24", "/contact")} className="w-full sm:w-auto px-5 py-2.5 bg-[#0b3b35] text-white rounded-lg text-[12px] font-bold shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2 whitespace-nowrap">
                {$t("ShopifyMobileExperience__t25", "Get a Mobile UX Preview")}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
    </>
  );
}
