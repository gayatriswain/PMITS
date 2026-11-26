"use client";

import React from 'react';
import { useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

export default function EcommerceSeoEcosystem() {
  const $t = useCmsText();
  return (
    <section id="what-we-optimize" className="pt-24 pb-8 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-teal-200"></div>
            <span className="text-teal-600 text-[11px] font-bold tracking-widest uppercase">
              {$t("EcommerceSeoEcosystem__t1", "Be Found Where It Matters")}</span>
            <div className="h-[1px] w-12 bg-teal-200"></div>
          </div>
          <h2 className="text-h2 font-extrabold text-[#132a43] mb-6 tracking-tight">
            {$t("EcommerceSeoEcosystem__t2", "Where Your Products Get ")}<span className="text-teal-600">{$t("EcommerceSeoEcosystem__t3", "Discovered.")}</span>
          </h2>
          <p className="text-body text-slate-600">
            {rich($t("EcommerceSeoEcosystem__t4", "We help your store show up across the most valuable search channels"))}<br className="hidden md:block" />
            {rich($t("EcommerceSeoEcosystem__t5", "so more shoppers find you, visit you and buy."))}</p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-12 relative">
          
          {/* Background Dotted Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-dashed border-slate-300 z-0 pointer-events-none hidden xl:block"></div>

          {/* Left Cards */}
          <div className="w-full xl:w-[320px] flex flex-col gap-8 relative z-20 shrink-0">
            {/* Card 1: Google Search */}
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 relative">
              <svg className="absolute hidden xl:block top-1/2 left-[100%] w-[50px] h-[100px] pointer-events-none z-0" style={{ transform: 'translate(0px, -20px)', overflow: 'visible' }}>
                <path d="M 0 20 C 25 20, 25 80, 50 80" fill="none" stroke="#0d9488" strokeWidth="1.5" />
                <circle cx="50" cy="80" r="4" fill="#0d9488" />
              </svg>
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-[#132a43] font-bold text-[16px] mb-1">{$t("EcommerceSeoEcosystem__t6", "Google Search")}</h4>
                  <p className="text-small text-slate-500">{rich($t("EcommerceSeoEcosystem__t7", "Rank your products for high-intent keyword searches and get more organic traffic."))}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-50">
                <span className="text-[10px] font-bold text-teal-600 tracking-widest uppercase">{$t("EcommerceSeoEcosystem__t8", "HIGH INTENT • HIGH IMPACT")}</span>
              </div>
            </div>

            {/* Card 2: Google Shopping */}
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 relative">
              <svg className="absolute hidden xl:block bottom-1/2 left-[100%] w-[50px] h-[100px] pointer-events-none z-0" style={{ transform: 'translate(0px, 20px)', overflow: 'visible' }}>
                <path d="M 0 80 C 25 80, 25 20, 50 20" fill="none" stroke="#0d9488" strokeWidth="1.5" />
                <circle cx="50" cy="20" r="4" fill="#0d9488" />
              </svg>
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 17.5L22 22" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11Z" stroke="#EA4335" strokeWidth="2.5"/>
                    <circle cx="11" cy="11" r="3" fill="#FBBC05"/>
                    <path d="M14 8L8 14" stroke="#34A853" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-[#132a43] font-bold text-[16px] mb-1">{$t("EcommerceSeoEcosystem__t9", "Google Shopping")}</h4>
                  <p className="text-small text-slate-500">{rich($t("EcommerceSeoEcosystem__t10", "Showcase your products with rich results, ratings and prices to drive more qualified clicks."))}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-50">
                <span className="text-[10px] font-bold text-teal-600 tracking-widest uppercase">{$t("EcommerceSeoEcosystem__t11", "MORE VISIBILITY • MORE CLICKS")}</span>
              </div>
            </div>
          </div>

          {/* Center Mockup */}
          <div className="w-full max-w-[640px] flex flex-col items-center gap-4 relative z-10 shrink-0">
            
            {/* Floating Tabs Bar */}
            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 px-6 pt-3 pb-0 flex items-center justify-between w-[92%] z-20">
              <div className="flex items-center gap-2 text-teal-700 pb-3 border-b-[3px] border-teal-500 cursor-pointer">
                <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-[13px] font-bold">{$t("EcommerceSeoEcosystem__t12", "Search")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 pb-3 cursor-pointer hover:text-slate-900 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2"><path d="M17.5 17.5L22 22" strokeLinecap="round"/><path d="M20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11Z"/><circle cx="11" cy="11" r="3"/><path d="M14 8L8 14" strokeLinecap="round"/></svg>
                <span className="text-[13px] font-semibold">{$t("EcommerceSeoEcosystem__t13", "Shopping")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 pb-3 cursor-pointer hover:text-slate-900 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span className="text-[13px] font-semibold">{$t("EcommerceSeoEcosystem__t14", "Images")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 pb-3 cursor-pointer hover:text-slate-900 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
                <span className="text-[13px] font-semibold">{$t("EcommerceSeoEcosystem__t15", "AI Overview")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 pb-3 cursor-pointer hover:text-slate-900 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="4"/><path d="m10 9 5 3-5 3z"/></svg>
                <span className="text-[13px] font-semibold">{$t("EcommerceSeoEcosystem__t16", "Videos")}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 w-full overflow-hidden relative z-10 p-6 px-8">
              
              {/* Search Bar Row */}
              <div className="flex items-center gap-6 mb-8">
                <div className="font-sans font-bold text-[26px] tracking-tighter">
                  <span className="text-[#4285F4]">{$t("EcommerceSeoEcosystem__t17", "G")}</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span>
                </div>
                <div className="flex-1 h-12 rounded-full border border-slate-200 bg-white shadow-sm flex items-center px-5 justify-between">
                  <span className="text-[14px] text-slate-800">{$t("EcommerceSeoEcosystem__t18", "minimalist leather backpack")}</span>
                  <div className="flex items-center gap-4 text-slate-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2.5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
                  </div>
                </div>
              </div>

              {/* Product Result */}
              <div className="flex gap-8 items-start border-l-4 border-transparent">
                <div className="w-[200px] h-[240px] bg-slate-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center relative p-2 shadow-inner">
                  <img src={$t("EcommerceSeoEcosystem__t19", "/backpack.webp")} alt={$t("EcommerceSeoEcosystem__t20", "Minimalist Leather Backpack")} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                
                <div className="flex-1 pt-1">
                  <div className="flex items-start gap-3 mb-2">
                    {/* Starburst Badge */}
                    <div className="relative w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full text-amber-400 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l2.4 2.8 3.7-1 1.7 3.4 3.8 1.4-.7 3.8 2.8 2.4-2.8 2.4.7 3.8-3.8 1.4-1.7 3.4-3.7-1L12 22l-2.4-2.8-3.7 1-1.7-3.4-3.8-1.4.7-3.8L-1.3 12l2.8-2.4-.7-3.8 3.8-1.4 1.7-3.4 3.7 1z"/>
                      </svg>
                      <span className="text-[12px] font-bold text-slate-900 relative z-10">{$t("EcommerceSeoEcosystem__t21", "1")}</span>
                    </div>
                    <div>
                      <h3 className="text-[#1a0dab] text-[18px] font-medium leading-tight hover:underline cursor-pointer">
                        {$t("EcommerceSeoEcosystem__t22", "Minimalist Leather Backpack")}</h3>
                      <p className="text-small text-slate-500 mt-1">{rich($t("EcommerceSeoEcosystem__t23", "Stylish • Durable • Everyday Use"))}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3 mt-3">
                    <div className="flex text-amber-400 gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      ))}
                    </div>
                    <span className="text-[13px] text-slate-500">{$t("EcommerceSeoEcosystem__t24", "(320)")}</span>
                  </div>
                  
                  <div className="mb-1 text-[22px] font-bold text-[#132a43]">{$t("EcommerceSeoEcosystem__t25", "$79.99")}</div>
                  <div className="text-[13px] text-green-700 font-semibold mb-4">{$t("EcommerceSeoEcosystem__t26", "In Stock")}</div>
                  
                  <div className="flex items-center gap-1.5 text-[13px] text-slate-600 font-medium">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    {$t("EcommerceSeoEcosystem__t27", "YourStore.com")}</div>
                </div>
              </div>
            </div>

            {/* Bottom Floating Card */}
            <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-100 p-5 flex items-center gap-5 w-[92%] z-20">
              <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </div>
              <div>
                <h4 className="text-[#132a43] font-bold text-[15px] mb-1">{$t("EcommerceSeoEcosystem__t28", "More Channels. More Visibility. More Sales.")}</h4>
                <p className="text-small text-slate-500 pr-4">{rich($t("EcommerceSeoEcosystem__t29", "We maximize your presence across every channel your customers use to search, discover and buy."))}</p>
              </div>
            </div>
          </div>

          {/* Right Cards */}
          <div className="w-full xl:w-[320px] flex flex-col gap-6 relative z-20 shrink-0">
            {/* Card 3: Google Images */}
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 relative">
              <svg className="absolute hidden xl:block top-1/2 right-[100%] w-[50px] h-[100px] pointer-events-none z-0" style={{ transform: 'translate(0px, -20px)', overflow: 'visible' }}>
                <path d="M 50 20 C 25 20, 25 80, 0 80" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                <circle cx="0" cy="80" r="4" fill="#6366f1" />
              </svg>
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
                <div>
                  <h4 className="text-[#132a43] font-bold text-[16px] mb-1">{$t("EcommerceSeoEcosystem__t30", "Google Images")}</h4>
                  <p className="text-small text-slate-500">{rich($t("EcommerceSeoEcosystem__t31", "Optimized images help your products appear in image searches and drive discovery."))}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-50">
                <span className="text-[10px] font-bold text-indigo-500 tracking-widest uppercase">{$t("EcommerceSeoEcosystem__t32", "VISUAL SEARCH • MORE TRAFFIC")}</span>
              </div>
            </div>

            {/* Card 4: AI & Voice */}
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 relative">
              <svg className="absolute hidden xl:block top-1/2 right-[100%] w-[50px] h-[40px] pointer-events-none z-0" style={{ transform: 'translate(0px, -20px)', overflow: 'visible' }}>
                <path d="M 50 20 L 0 20" fill="none" stroke="#10b981" strokeWidth="1.5" />
                <circle cx="0" cy="20" r="4" fill="#10b981" />
              </svg>
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
                </div>
                <div>
                  <h4 className="text-[#132a43] font-bold text-[16px] mb-1">{$t("EcommerceSeoEcosystem__t33", "AI & Voice Search")}</h4>
                  <p className="text-small text-slate-500">{rich($t("EcommerceSeoEcosystem__t34", "Be the answer in AI overviews and voice search results with structured, relevant content."))}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-50">
                <span className="text-[10px] font-bold text-emerald-600 tracking-widest uppercase">{$t("EcommerceSeoEcosystem__t35", "EMERGING SEARCH • FUTURE READY")}</span>
              </div>
            </div>

            {/* Card 5: YouTube */}
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 relative">
              <svg className="absolute hidden xl:block bottom-1/2 right-[100%] w-[50px] h-[120px] pointer-events-none z-0" style={{ transform: 'translate(0px, 20px)', overflow: 'visible' }}>
                <path d="M 50 100 C 25 100, 25 0, 0 0" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="4" fill="#ef4444" />
              </svg>
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5"><rect width="20" height="14" x="2" y="5" rx="4"/><path d="m10 9 5 3-5 3z"/></svg>
                </div>
                <div>
                  <h4 className="text-[#132a43] font-bold text-[16px] mb-1">{$t("EcommerceSeoEcosystem__t36", "YouTube Search")}</h4>
                  <p className="text-small text-slate-500">{rich($t("EcommerceSeoEcosystem__t37", "Optimize your videos and product content to rank in YouTube search results."))}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-50">
                <span className="text-[10px] font-bold text-red-500 tracking-widest uppercase">{$t("EcommerceSeoEcosystem__t38", "MORE EXPOSURE • MORE TRUST")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Logos Bar */}
        <div className="mt-10 max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-6 relative z-20">
          <div className="text-center mb-6">
            <span className="text-sm font-bold text-[#132a43]">{$t("EcommerceSeoEcosystem__t39", "Helping Stores Get Found Across All Major Channels")}</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            
            <div className="flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <div className="font-sans font-bold text-xl tracking-tighter">
                <span className="text-blue-500">{$t("EcommerceSeoEcosystem__t40", "G")}</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">{$t("EcommerceSeoEcosystem__t41", "Search")}</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 17.5L22 22" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11Z" stroke="#EA4335" strokeWidth="2.5"/>
                  <circle cx="11" cy="11" r="3" fill="#FBBC05"/>
                  <path d="M14 8L8 14" stroke="#34A853" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div className="font-sans font-bold text-lg tracking-tighter">{$t("EcommerceSeoEcosystem__t42", "Google")}</div>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">{$t("EcommerceSeoEcosystem__t43", "Shopping")}</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <div className="font-sans font-bold text-lg tracking-tighter">{$t("EcommerceSeoEcosystem__t44", "Google")}</div>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">{$t("EcommerceSeoEcosystem__t45", "Images")}</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">{$t("EcommerceSeoEcosystem__t46", "AI Overviews")}</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1.5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="4"/><path d="m10 9 5 3-5 3z"/></svg>
                <div className="font-sans font-bold text-lg tracking-tighter">{$t("EcommerceSeoEcosystem__t47", "YouTube")}</div>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">{$t("EcommerceSeoEcosystem__t48", "Search")}</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1.5">
                <div className="font-sans font-bold text-lg tracking-tighter text-[#008373] flex items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9.95 2.23l-3.3 11.23h3.58l.75-2.6h3.69l.7 2.6h3.68l-3.55-11.23h-5.55zm1.5 5.92l.98-3.4h.04l.98 3.4h-2z"/></svg>
                  <span className="ml-1">{$t("EcommerceSeoEcosystem__t49", "Bing")}</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">{$t("EcommerceSeoEcosystem__t50", "Search")}</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1.5">
                <div className="font-sans font-bold text-lg tracking-tighter text-[#E60023] flex items-center gap-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.439.214-.908 1.382-5.848 1.382-5.848s-.353-.706-.353-1.748c0-1.638.948-2.862 2.131-2.862.998 0 1.48.749 1.48 1.646 0 1.003-.639 2.502-.97 3.896-.277 1.164.584 2.113 1.737 2.113 2.083 0 3.681-2.196 3.681-5.362 0-2.802-2.015-4.757-4.887-4.757-3.328 0-5.284 2.496-5.284 5.074 0 1.006.388 2.084.873 2.668.096.115.11.22.082.327-.087.351-.282 1.144-.32 1.298-.051.205-.168.25-.38.151-1.42-.663-2.311-2.748-2.311-4.428 0-3.606 2.62-6.918 7.551-6.918 3.963 0 7.042 2.825 7.042 6.593 0 3.94-2.483 7.113-5.933 7.113-1.157 0-2.247-.601-2.62-1.314l-.714 2.72c-.258.99-.958 2.227-1.429 2.983C9.753 23.633 10.852 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                  {$t("EcommerceSeoEcosystem__t51", "Pinterest")}</div>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">{$t("EcommerceSeoEcosystem__t52", "Search")}</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1.5">
                <div className="font-sans font-bold text-lg tracking-tighter text-black flex items-center gap-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.71a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                  {$t("EcommerceSeoEcosystem__t53", "TikTok")}</div>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">{$t("EcommerceSeoEcosystem__t54", "Search")}</span>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
