"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useCmsText } from "@/components/cms/SectionContent";
import Link from "next/link";
import { rich } from "@/components/cms/rich";

export default function EcommerceSeoHero() {
  const $t = useCmsText();
  return (
    <section className="bg-[#fafdfc] overflow-hidden relative">
      <div className="max-w-[1640px] mx-auto py-8 relative z-10 px-5">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 mb-16">
          
          {/* Left Content */}
          <div className="w-full lg:w-[35%] flex flex-col justify-center shrink-0">
            <div className="inline-flex items-center gap-2 bg-[#00897b]/10 text-[#00897b] px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-8 self-start border border-[#00897b]/20">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              {$t("EcommerceSeoHero__t1", "E-Commerce SEO Services")}</div>

            <h1 className="text-h1 font-bold text-[#132a43] mb-6 font-serif tracking-tight max-w-[500px]">
              {$t("EcommerceSeoHero__t2", "Rank Your Products. ")}<span className="text-[#00897b]">{$t("EcommerceSeoHero__t3", "Grow Your Business.")}</span>
            </h1>

            <p className="text-body text-slate-500 mb-10 max-w-xl font-medium">
              {rich($t("EcommerceSeoHero__t4", "E-commerce SEO that gets your products found by the right shoppers and turns searches into sales."))}</p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <Link href={$t("EcommerceSeoHero__u2", "/contact")} className="w-full sm:w-auto bg-[#004e48] hover:bg-[#003d38] text-white pl-5 pr-3 py-2.5 rounded-full font-bold text-[11px] transition-all shadow-[0_10px_20px_rgba(0,78,72,0.2)] flex items-center justify-between gap-3 group">
                {$t("EcommerceSeoHero__t5", "Get My Ecommerce SEO Strategy")}<div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-[#004e48] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </Link>
              
              <Link href={$t("EcommerceSeoHero__u1", "/testimonials")} className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#132a43] px-5 py-2.5 rounded-full font-bold text-[11px] transition-all shadow-[0_8px_16px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center justify-center gap-2 group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00897b" strokeWidth="2.5"><rect x="3" y="16" width="4" height="4"/><rect x="10" y="10" width="4" height="10"/><rect x="17" y="4" width="4" height="16"/></svg>
                {$t("EcommerceSeoHero__t6", "See Our Results")}</Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`w-12 h-12 rounded-full border-2 border-white bg-slate-200 shadow-sm relative overflow-hidden`}>
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt={$t("EcommerceSeoHero__t7", "Client")} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map((star) => (
                    <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                  <span className="text-[#132a43] font-bold text-sm ml-2">{$t("EcommerceSeoHero__t8", "4.9/5 ")}<span className="font-medium text-slate-500">{$t("EcommerceSeoHero__t9", "(120+ Reviews)")}</span></span>
                </div>
                <p className="text-small text-slate-600 font-medium">{rich($t("EcommerceSeoHero__t10", "Trusted by 500+ Ecommerce Brands"))}</p>
              </div>
            </div>
          </div>

          {/* Right Visual Dashboard */}
          <div className="w-full lg:w-[65%] relative min-h-[520px]">
            
            {/* Top Flow */}
            <div className="absolute top-0 left-0 right-0 mx-auto w-full max-w-[680px] hidden md:flex flex-col items-center z-10">
              <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4 text-center">{rich($t("EcommerceSeoHero__t11", "We optimize. You rank. They buy."))}</p>
              <div className="w-full flex items-center justify-between text-center relative">
                <div className="absolute top-8 left-8 right-8 h-[2px] z-0 flex items-center justify-between px-10">
                  <svg className="w-full h-full text-[#00897b]/40" preserveAspectRatio="none"><line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4"/><polygon points="100%,1 95%,-4 95%,6" fill="currentColor" /></svg>
                </div>
              
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-white rounded-full border border-slate-100 shadow-[0_8px_20px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#00897b]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </div>
                <div>
                  <h4 className="text-[#132a43] font-bold text-sm">{$t("EcommerceSeoHero__t12", "Optimize")}</h4>
                  <p className="text-[10px] text-slate-500 max-w-[100px] leading-tight">{rich($t("EcommerceSeoHero__t13", "We optimize your store and product pages"))}</p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-white rounded-full border border-slate-100 shadow-[0_8px_20px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#00897b]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <div>
                  <h4 className="text-[#132a43] font-bold text-sm">{$t("EcommerceSeoHero__t14", "Rank")}</h4>
                  <p className="text-[10px] text-slate-500 max-w-[100px] leading-tight">{rich($t("EcommerceSeoHero__t15", "Your products rank higher in search"))}</p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-white rounded-full border border-slate-100 shadow-[0_8px_20px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#00897b]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <h4 className="text-[#132a43] font-bold text-sm">{$t("EcommerceSeoHero__t16", "Attract")}</h4>
                  <p className="text-[10px] text-slate-500 max-w-[100px] leading-tight">{rich($t("EcommerceSeoHero__t17", "High-intent shoppers find your products"))}</p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-white rounded-full border border-slate-100 shadow-[0_8px_20px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#00897b]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                </div>
                <div>
                  <h4 className="text-[#132a43] font-bold text-sm">{$t("EcommerceSeoHero__t18", "Convert")}</h4>
                  <p className="text-[10px] text-slate-500 max-w-[100px] leading-tight">{rich($t("EcommerceSeoHero__t19", "More clicks."))}<br/>{rich($t("EcommerceSeoHero__t20", "More sales."))}</p>
                </div>
              </div>
              </div>
            </div>

            {/* Middle Section (Before / After SEO) */}
            <div className="absolute top-[180px] lg:top-[160px] xl:top-[180px] left-0 w-full flex justify-center items-center gap-0 z-20 origin-left lg:scale-[0.80] xl:scale-[0.95]">
              
              {/* Before SEO Wireframe */}
              <div className="hidden md:flex w-[200px] bg-white rounded-2xl shadow-lg border border-slate-100 flex-col p-4 scale-95 shrink-0 origin-right relative z-10">
                <p className="text-[10.5px] font-bold text-slate-500 mb-1">{rich($t("EcommerceSeoHero__t21", "BEFORE SEO"))}</p>
                <p className="text-[9.5px] text-slate-500 mb-4">{rich($t("EcommerceSeoHero__t22", "Page 5 of results"))}</p>
                {[
                  $t("EcommerceSeoHero__t23", "/red-jacket.jpg"),
                  $t("EcommerceSeoHero__t24", "/furnisher.png"),
                  $t("EcommerceSeoHero__t25", "/product3.webp"),
                  $t("EcommerceSeoHero__t26", "/product4.webp")
                ].map((img, i) => (
                  <div key={i} className="flex gap-2.5 mb-3.5 items-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center p-1.5 shrink-0">
                       <img src={img} alt={$t("EcommerceSeoHero__t27", "Product")} className="w-full h-full object-contain mix-blend-multiply opacity-50" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.parentElement!.classList.add('bg-slate-100'); }} />
                    </div>
                    <div className="flex-1">
                      <div className="w-full h-2 bg-slate-100 rounded mb-1"></div>
                      <div className="w-3/4 h-2 bg-slate-100 rounded mb-1"></div>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(s => <div key={s} className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>)}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-auto flex justify-center gap-3 pt-2">
                  {[1, 2, 3, 4, 5].map(page => (
                    <div key={page} className={`text-[10px] font-bold flex items-center justify-center ${
                      page === 5 ? 'w-[18px] h-[18px] bg-slate-500 rounded-full text-white' : 
                      page === 1 ? 'w-[18px] h-[18px] border border-slate-200 rounded-full text-slate-600' : 
                      'text-slate-600 w-[18px] h-[18px]'
                    }`}>
                      {page}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrows */}
              <div className="hidden md:flex flex-col justify-center gap-12 w-[20px] relative text-[#00897b] shrink-0">
                 <svg className="w-full h-[8px] text-[#00897b]/30" preserveAspectRatio="none"><line x1="0" y1="4" x2="100%" y2="4" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/><polygon points="100%,4 26,1 26,7" fill="currentColor" /></svg>
                 <svg className="w-full h-[10px] text-[#00897b]" preserveAspectRatio="none"><line x1="0" y1="5" x2="100%" y2="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/><polygon points="100%,5 24,-1 24,11" fill="currentColor" /></svg>
                 <svg className="w-full h-[8px] text-[#00897b]/30" preserveAspectRatio="none"><line x1="0" y1="4" x2="100%" y2="4" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/><polygon points="100%,4 26,1 26,7" fill="currentColor" /></svg>
              </div>

              {/* After SEO Google Shopping Card */}
              <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-slate-100 p-6 relative z-30">
                <div className="mb-4">
                  <p className="text-[#00897b] text-[10px] font-bold tracking-wider uppercase mb-1">{rich($t("EcommerceSeoHero__t28", "AFTER SEO"))}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00897b] font-bold text-xl">{$t("EcommerceSeoHero__t29", "Top Result")}</span>
                    <div className="bg-[#00897b] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">{$t("EcommerceSeoHero__t30", "#1")}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <img src={$t("EcommerceSeoHero__t31", "/Google_2015_logo.svg.webp")} alt={$t("EcommerceSeoHero__t32", "Google")} className="h-6 w-auto object-contain" />
                  </div>
                  <div className="flex-1 bg-white border border-slate-200 rounded-full h-10 px-4 flex items-center justify-between shadow-sm">
                    <span className="text-sm text-[#132a43] font-medium">{$t("EcommerceSeoHero__t33", "women's running jacket")}</span>
                    <div className="flex gap-3 items-center">
                      <svg width="12" height="16" viewBox="0 0 24 24" fill="none" stroke="none">
                         <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" fill="#4285F4"/>
                         <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3" fill="#EA4335"/><path d="M5 11h1.7c0 3 2.54 5.1 5.3 5.1" fill="#34A853"/><path d="M12 17.72C8.72 17.23 6 14.41 6 11H4.3c0 3.73 3.01 6.86 6.7 7.22" fill="#FBBC05"/>
                      </svg>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="none">
                         <path d="M4 4h4v2H4v4H2V4a2 2 0 0 1 2-2zm16 0a2 2 0 0 1 2 2v4h-2V6h-4V4h4zM4 20a2 2 0 0 0-2-2v-4h2v4h4v2H4zm16 0h-4v2h4a2 2 0 0 0 2-2v-4h-2v4z" fill="#4285F4"/>
                         <circle cx="12" cy="12" r="3" fill="#EA4335"/><circle cx="17" cy="17" r="1.5" fill="#34A853"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 text-xs font-medium text-slate-500 border-b border-slate-100 pb-2 mb-4">
                  <span className="text-slate-500">{$t("EcommerceSeoHero__t34", "All")}</span>
                  <span className="text-[#00897b] border-b-2 border-[#00897b] pb-2 -mb-[9px] font-bold">{$t("EcommerceSeoHero__t35", "Shopping")}</span>
                  <span>{$t("EcommerceSeoHero__t36", "Images")}</span>
                  <span>{$t("EcommerceSeoHero__t37", "Videos")}</span>
                  <span>{$t("EcommerceSeoHero__t38", "News")}</span>
                </div>

                {/* The Product Result */}
                <div className="border border-[#00897b] rounded-2xl p-4 flex gap-4 bg-white relative overflow-hidden">
                  <div className="w-[110px] h-[110px] bg-white rounded-xl flex items-center justify-center shrink-0">
                    <img src={$t("EcommerceSeoHero__t39", "/red-jacket.jpg")} alt={$t("EcommerceSeoHero__t40", "Running Jacket")} className="w-full h-full object-contain scale-110" />
                  </div>
                  <div>
                    <h3 className="text-[#1a0dab] font-bold text-[15px] leading-tight mb-1 cursor-pointer hover:underline">{$t("EcommerceSeoHero__t41", "Women's Running Jacket")}</h3>
                    <p className="text-[11px] text-slate-500 mb-2">{rich($t("EcommerceSeoHero__t42", "Lightweight • Breathable • Quick Dry"))}</p>
                    <div className="flex items-center gap-1 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      ))}
                      <span className="text-[11px] text-slate-500 ml-1">{$t("EcommerceSeoHero__t43", "(230)")}</span>
                    </div>
                    <div className="font-bold text-lg text-[#132a43] mb-1">{$t("EcommerceSeoHero__t44", "$89.00")}</div>
                    <div className="text-[11px] text-[#00897b] font-bold mb-1">{$t("EcommerceSeoHero__t45", "In Stock")}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                      {$t("EcommerceSeoHero__t46", "YourStore.com")}</div>
                  </div>
                </div>
              </div>
              
              {/* Arrows */}
              <div className="hidden xl:flex flex-col justify-center gap-12 w-[20px] relative text-[#00897b] shrink-0">
                 <svg className="w-full h-[8px] text-[#00897b]/30" preserveAspectRatio="none"><line x1="0" y1="4" x2="100%" y2="4" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/><polygon points="100%,4 26,1 26,7" fill="currentColor" /></svg>
                 <svg className="w-full h-[10px] text-[#00897b]" preserveAspectRatio="none"><line x1="0" y1="5" x2="100%" y2="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/><polygon points="100%,5 24,-1 24,11" fill="currentColor" /></svg>
                 <svg className="w-full h-[8px] text-[#00897b]/30" preserveAspectRatio="none"><line x1="0" y1="4" x2="100%" y2="4" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/><polygon points="100%,4 26,1 26,7" fill="currentColor" /></svg>
              </div>

              {/* Right Side Stats Panel */}
              <div className="hidden xl:flex w-[180px] bg-white rounded-2xl shadow-xl border border-slate-100 flex-col p-5 relative z-10 shrink-0">
                <p className="text-[#00897b] text-[10px] font-bold tracking-widest uppercase text-center mb-4">{rich($t("EcommerceSeoHero__t47", "More Sales"))}</p>
                <div className="w-full h-16 mb-6 relative">
                  <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00897b" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#00897b" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <motion.path 
                      d="M0,35 L20,25 L40,30 L60,10 L80,15 L100,0 L100,40 L0,40 Z" 
                      fill="url(#chartGradient)" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: 1 }} 
                    />
                    <motion.path 
                      d="M0,35 L20,25 L40,30 L60,10 L80,15 L100,0" 
                      fill="none" 
                      stroke="#00897b" 
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    />
                    <motion.circle cx="100" cy="0" r="3" fill="#00897b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} />
                  </svg>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#00897b]/10 flex items-center justify-center text-[#00897b]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{$t("EcommerceSeoHero__t48", "More Visibility")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#00897b]/10 flex items-center justify-center text-[#00897b]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{$t("EcommerceSeoHero__t49", "More Clicks")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#00897b]/10 flex items-center justify-center text-[#00897b]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{$t("EcommerceSeoHero__t50", "More Orders")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#00897b]/10 flex items-center justify-center text-[#00897b]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{$t("EcommerceSeoHero__t51", "More Revenue")}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Horizontal Nav / Categories */}
        <div className="w-full bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-100 mb-6 flex flex-col xl:flex-row items-center overflow-hidden">
          
          <div className="p-8 xl:pr-12 xl:border-r border-slate-100 shrink-0 text-center xl:text-left">
            <h4 className="text-[#132a43] font-bold text-lg leading-tight mb-1">{$t("EcommerceSeoHero__t52", "Whatever You Sell,")}</h4>
            <p className="text-body text-[#00897b] font-bold">{rich($t("EcommerceSeoHero__t53", "We Help It Get Found."))}</p>
          </div>

          <div className="flex-1 overflow-x-auto w-full no-scrollbar">
            <div className="flex items-center px-4 py-6 min-w-max">
              
              <div className="flex flex-col items-center justify-center w-[120px] h-[100px] px-2 py-2 bg-[#f0f9f8] rounded-xl border border-[#00897b] cursor-pointer group relative shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00897b" strokeWidth="1.5" className="mb-2"><path d="M22 13h-4.32a2 2 0 0 1-1.89-1.37L13 3.65a2 2 0 0 0-3.79 0l-2.79 7.98A2 2 0 0 1 4.53 13H2"/><path d="M11 20.35L8.5 21l-1.5-2"/><path d="M13 20.35L15.5 21l1.5-2"/></svg>
                <span className="text-[10px] font-bold text-[#00897b] text-center leading-tight">{$t("EcommerceSeoHero__t54", "Fashion & Apparel")}</span>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#f0f9f8] border-b border-r border-[#00897b] rotate-45"></div>
              </div>

              {[
                { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>, label: $t("EcommerceSeoHero__t55", "Electronics") },
                { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/></svg>, label: $t("EcommerceSeoHero__t56", "Home & Decor") },
                { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="4" width="8" height="16" rx="2"/><path d="M10 4V2h4v2"/><path d="M18 16v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4"/></svg>, label: $t("EcommerceSeoHero__t57", "Beauty & Cosmetics") },
                { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 7v5.5"/><path d="M12 10h-2.5"/><path d="M14.5 10H12"/></svg>, label: $t("EcommerceSeoHero__t58", "Health & Wellness") },
                { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/></svg>, label: $t("EcommerceSeoHero__t59", "Sports & Outdoors") },
                { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>, label: $t("EcommerceSeoHero__t60", "More Industries") },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center w-[120px] h-[100px] px-2 py-2 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 hover:border-slate-200 transition-colors text-[#00897b]/70 hover:text-[#00897b] shrink-0 ml-3">
                  <div className="mb-2">{item.icon}</div>
                  <span className="text-[10px] font-bold text-slate-500 text-center leading-tight">{item.label}</span>
                </div>
              ))}
              
            </div>
          </div>
          
          <div className="hidden xl:flex items-center gap-2 p-6 shrink-0">
            <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#00897b] hover:border-[#00897b]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#00897b] hover:border-[#00897b]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

        </div>

        {/* Bottom Features Bar */}
        <div className="w-full bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col lg:flex-row items-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100 overflow-hidden">
          
          <div className="flex gap-4 p-6 xl:p-8 flex-1 w-full">
            <div className="w-12 h-12 rounded-full bg-[#f0f9f8] text-[#00897b] flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <div>
              <h4 className="text-[#132a43] font-bold text-sm mb-1">{$t("EcommerceSeoHero__t61", "More Visibility")}</h4>
              <p className="text-caption text-slate-500 font-medium">{rich($t("EcommerceSeoHero__t62", "Rank your products for high-intent searches that matter."))}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-[#f0f9f8] text-[#00897b] flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <h4 className="text-[#132a43] font-bold text-sm mb-1">{$t("EcommerceSeoHero__t63", "Qualified Shoppers")}</h4>
              <p className="text-caption text-slate-500 font-medium">{rich($t("EcommerceSeoHero__t64", "Attract shoppers who are ready to compare and buy."))}</p>
            </div>
          </div>

          <div className="flex gap-4 p-6 xl:p-8 flex-1 w-full">
            <div className="w-12 h-12 rounded-full bg-[#f0f9f8] text-[#00897b] flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </div>
            <div>
              <h4 className="text-[#132a43] font-bold text-sm mb-1">{$t("EcommerceSeoHero__t65", "Higher Conversions")}</h4>
              <p className="text-caption text-slate-500 font-medium">{rich($t("EcommerceSeoHero__t66", "Better product pages and user experience that convert more."))}</p>
            </div>
          </div>

          <div className="flex gap-4 p-6 xl:p-8 flex-1 w-full">
            <div className="w-12 h-12 rounded-full bg-[#f0f9f8] text-[#00897b] flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
            </div>
            <div>
              <h4 className="text-[#132a43] font-bold text-sm mb-1">{$t("EcommerceSeoHero__t67", "More Revenue")}</h4>
              <p className="text-caption text-slate-500 font-medium">{rich($t("EcommerceSeoHero__t68", "Sustainable organic growth that impacts your bottom line."))}</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
