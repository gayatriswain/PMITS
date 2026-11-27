"use client";

import React from 'react';
import { useCmsText } from "@/components/cms/SectionContent";
import Link from "next/link";
import { html, rich } from "@/components/cms/rich";

export default function GoogleAdsBottomBanner() {
  const $t = useCmsText();
  return (
    <section className="bg-[#fafdfc] py-16  px-6 relative z-40">
      <div className="max-w-[1640px] mx-auto relative rounded-[2rem] overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12 gap-8 lg:gap-12 shadow-2xl">

        {/* Background Image */}
        <img
          src={$t("GoogleAdsBottomBanner__t1", "/google-ads-bottom.webp")}
          alt={$t("GoogleAdsBottomBanner__t2", "Background")}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay to ensure text readability if needed */}
        <div className="absolute inset-0 bg-[#002a25]/60 mix-blend-multiply"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

          {/* Left: Icon and Heading */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center text-center sm:text-left gap-6 shrink-0 lg:w-[40%]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00897b] to-[#004e48] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(0,137,123,0.4)] border border-[#00897b]/50">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </div>
            <h2 className="text-h2 font-bold text-white">{rich($t("GoogleAdsBottomBanner__t3m", "Ready to turn clicks<br class=\"hidden lg:block\"> into <span class=\"text-[#00cbb2]\">customers?</span>"))}</h2>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-16 bg-white/10 shrink-0"></div>

          {/* Middle: Paragraph */}
          <div className="text-center lg:text-left text-white/80 text-sm sm:text-base leading-relaxed max-w-md">
            {rich($t("GoogleAdsBottomBanner__t5", "Book a free strategy call and let's discuss how we can grow your business with Google Ads."))}</div>

          {/* Right: Button */}
          <div className="shrink-0">
            <Link href={$t("GoogleAdsBottomBanner__u1", "/contact")} className="group flex items-center justify-between gap-6 pl-8 pr-2 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm">
              <span className="text-white font-bold text-sm">{html($t("GoogleAdsBottomBanner__t6", "Book a Free Call"))}</span>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#004e48] group-hover:scale-105 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
