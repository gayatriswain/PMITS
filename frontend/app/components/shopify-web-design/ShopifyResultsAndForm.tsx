"use client";

import React, { useState } from 'react';
import { submitEnquiry } from '@/lib/forms';
import Honeypot from '@/components/cms/Honeypot';
import { motion } from 'framer-motion';
import { useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";
import { goToThankYou } from "@/lib/forms";

export default function ShopifyResultsAndForm() {
  const $t = useCmsText();
  const [hp, setHp] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const fd = new FormData(e.currentTarget);
    const goal = e.currentTarget.querySelector('select')?.selectedOptions[0];
    setSending(true);
    setError('');
    const r = await submitEnquiry('shopify-strategy', {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      service: 'Shopify Web Design',
      details: {
        'Store URL': String(fd.get('storeUrl') || ''),
        Goal: goal && goal.value ? goal.text : '',
      },
      hp,
    });
    setSending(false);
    if (r.ok) {
      setSent(true);
      goToThankYou("shopify-web-design");
    }
    else setError(r.error);
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#f0f9f6] to-[#fcfdfd] relative overflow-hidden py-12">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#dcfce7] rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ccfbf1] rounded-full blur-[120px] opacity-40 translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      {/* --- TOP SECTION: Stats --- */}
      <div className="max-w-[1640px] mx-auto pt-8 pb-10 relative z-10 px-5">
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          
          {/* Left Text */}
          <div className="lg:w-[35%]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e0f2fe] text-[#0284c7] rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              {$t("ShopifyResultsAndForm__t1", "REAL IMPACT. REAL RESULTS.")}</div>
            
            <h2 className="text-h2 font-black text-[#0f2333] mb-4">
              {$t("ShopifyResultsAndForm__t2", "Good Design Looks Better.")}<br />
              {$t("ShopifyResultsAndForm__t3", "Great Design ")}<span className="text-[#0d9488]">{$t("ShopifyResultsAndForm__t4", "Sells Better.")}</span>
            </h2>
            <p className="text-body text-slate-500 font-medium">
              {rich($t("ShopifyResultsAndForm__t5", "Data-backed results from real Shopify stores we've designed and scaled."))}</p>
          </div>

          {/* Right Stats Grid */}
          <div className="lg:w-[60%]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-b border-slate-200 pb-6 mb-4">
              
              {/* Stat 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                </div>
                <div className="text-[32px] font-black text-[#0f2333] mb-1 flex items-center gap-1">
                  <span className="text-[#10b981] text-[20px]">↑</span> 68%
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{rich($t("ShopifyResultsAndForm__t6", "Average Increase in"))}<br/>{rich($t("ShopifyResultsAndForm__t7", "Conversion Rate"))}</p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center text-center border-l border-slate-100">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                </div>
                <div className="text-[32px] font-black text-[#0f2333] mb-1 flex items-center gap-1">
                  <span className="text-[#10b981] text-[20px]">↑</span> 54%
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{rich($t("ShopifyResultsAndForm__t8", "Average Increase in"))}<br/>{rich($t("ShopifyResultsAndForm__t9", "Add-to-Cart Rate"))}</p>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center text-center border-l border-slate-100">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <div className="text-[32px] font-black text-[#0f2333] mb-1 flex items-center gap-1">
                  <span className="text-[#10b981] text-[20px]">↑</span> 42%
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{rich($t("ShopifyResultsAndForm__t10", "Average Increase in"))}<br/>{rich($t("ShopifyResultsAndForm__t11", "Checkout Completion"))}</p>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center text-center border-l border-slate-100">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                </div>
                <div className="text-[32px] font-black text-[#0f2333] mb-1 flex items-center gap-1">
                  <span className="text-[#10b981] text-[20px]">↑</span> 35%
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{rich($t("ShopifyResultsAndForm__t12", "Average Increase in"))}<br/>{rich($t("ShopifyResultsAndForm__t13", "Revenue"))}</p>
              </div>

            </div>
            <p className="text-[10px] text-slate-400 font-medium text-right">
              {rich($t("ShopifyResultsAndForm__t14", "Results vary by store, niche and products. Data from our client stores."))}</p>
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: Form Card --- */}
      <div className="max-w-[1640px] mx-auto pb-16 relative z-10 px-5">
        <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100 p-6 md:p-12 pb-6 md:pb-8 flex flex-col">
          
          <div className="flex flex-col lg:flex-row gap-12 border-b border-slate-100 pb-12 mb-8">
            
            {/* Left Column: Graphics and USP */}
            <div className="lg:w-[50%] flex flex-col">
              <h3 className="text-h3 font-black text-[#0f2333] mb-4">
                {$t("ShopifyResultsAndForm__t15", "Let's Build Your")}<br />
                <span className="text-[#0d9488]">{$t("ShopifyResultsAndForm__t16", "Shopify Store.")}</span>
              </h3>
              <p className="text-body text-slate-500 font-medium mb-8 max-w-[280px]">
                {rich($t("ShopifyResultsAndForm__t17", "Tell us what you're selling."))}<br/>{rich($t("ShopifyResultsAndForm__t18", "We'll show you how we can turn it into your best-selling store."))}</p>

              <div className="flex gap-4 flex-1">
                {/* 3 Features */}
                <div className="flex flex-col gap-6 w-[160px] shrink-0 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="text-[#0d9488] shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
                    <div>
                      <h4 className="text-[11px] font-bold text-[#0f2333]">{$t("ShopifyResultsAndForm__t19", "Tailored Strategy")}</h4>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{rich($t("ShopifyResultsAndForm__t20", "Built around your brand and goals."))}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-[#10b981] shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
                    <div>
                      <h4 className="text-[11px] font-bold text-[#0f2333]">{$t("ShopifyResultsAndForm__t21", "Conversion Focused")}</h4>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{rich($t("ShopifyResultsAndForm__t22", "Designed to turn visitors into buyers."))}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-[#0ea5e9] shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
                    <div>
                      <h4 className="text-[11px] font-bold text-[#0f2333]">{$t("ShopifyResultsAndForm__t23", "Growth Driven")}</h4>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{rich($t("ShopifyResultsAndForm__t24", "Optimized to scale your business."))}</p>
                    </div>
                  </div>
                </div>

                {/* Laptop Mockup Image Placeholder */}
                <div className="flex-1 relative -mt-16 ml-4 hidden md:block">
                  <img src={$t("ShopifyResultsAndForm__t25", "/shopify5.webp")} alt={$t("ShopifyResultsAndForm__t26", "Shopify Design")} className="w-full h-auto object-contain drop-shadow-2xl scale-110 origin-bottom-right" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  {/* Handwritten text */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rotate-[-2deg]">
                    <span className="font-['Caveat',_cursive] italic text-[#0b3b35] text-[20px] font-bold">{$t("ShopifyResultsAndForm__t27", "Smart Design. Real Results.")}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Form */}
            <div className="lg:w-[50%] lg:pl-10">
              <form className="relative flex flex-col gap-4" onSubmit={handleSubmit}>
                <Honeypot value={hp} onChange={setHp} />
                {sent ? (
                  <div className="rounded-xl border border-emerald-100 bg-white px-6 py-10 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 text-[#0d9488] flex items-center justify-center text-xl font-bold">✓</div>
                    <h4 className="mt-4 text-lg font-bold text-[#0f2333]">{$t("ShopifyResultsAndForm__t28", "Thank you! Your request is in.")}</h4>
                    <p className="text-small mt-1.5 text-slate-500">{rich($t("ShopifyResultsAndForm__t29", "Our Shopify experts will get back to you within 24 hours."))}</p>
                  </div>
                ) : (
                <>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Name */}
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <input type="text" name="name" required placeholder={$t("ShopifyResultsAndForm__t30", "Your Name")} className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-[14px] outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-all" />
                  </div>
                  
                  {/* Email */}
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <input type="email" name="email" required placeholder={$t("ShopifyResultsAndForm__t31", "Work Email")} className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-[14px] outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-all" />
                  </div>
                </div>

                {/* URL */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  </div>
                  <input type="text" name="storeUrl" placeholder={$t("ShopifyResultsAndForm__t32", "Your Shopify Store or Website URL")} className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-[14px] outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-all" />
                </div>

                {/* Dropdown */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                  </div>
                  <select name="goal" defaultValue="" className="w-full pl-12 pr-10 py-4 bg-white border border-slate-200 rounded-xl text-[14px] text-slate-500 outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-all appearance-none">
                    <option value="" disabled>{$t("ShopifyResultsAndForm__t33", "What are you looking to achieve?")}</option>
                    <option value="redesign">{$t("ShopifyResultsAndForm__t34", "Full Store Redesign")}</option>
                    <option value="cro">{$t("ShopifyResultsAndForm__t35", "Conversion Rate Optimization")}</option>
                    <option value="migration">{$t("ShopifyResultsAndForm__t36", "Migration to Shopify")}</option>
                    <option value="other">{$t("ShopifyResultsAndForm__t37", "Other")}</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                {error && <p role="alert" className="text-caption font-semibold text-red-600">{error}</p>}

                {/* Submit Button */}
                <button type="submit" disabled={sending} className="disabled:opacity-70 w-full bg-[#0b3b35] text-white font-bold rounded-xl py-4 mt-2 flex items-center justify-center gap-2 hover:bg-[#0d9488] transition-colors shadow-lg group">
                  {sending ? $t("ShopifyResultsAndForm__t38", 'Sending...') : $t("ShopifyResultsAndForm__t39", 'Get My Shopify Strategy')}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/>
                  </svg>
                </button>
                </>
                )}
                <div className="flex items-center justify-center gap-1.5 mt-1 text-[11px] text-slate-500 font-medium">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {$t("ShopifyResultsAndForm__t40", "100% Confidential. No spam. Just expert advice.")}</div>

                {/* Features below form */}
                <div className="flex items-center justify-between mt-4 px-2">
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <div>
                      <h4 className="text-[10px] font-bold text-[#0f2333]">{$t("ShopifyResultsAndForm__t41", "Free Strategy Session")}</h4>
                      <p className="text-[9px] text-slate-500">{rich($t("ShopifyResultsAndForm__t42", "No obligations."))}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
                    <div>
                      <h4 className="text-[10px] font-bold text-[#0f2333]">{$t("ShopifyResultsAndForm__t43", "Actionable Insights")}</h4>
                      <p className="text-[9px] text-slate-500">{rich($t("ShopifyResultsAndForm__t44", "Clear next steps."))}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <div>
                      <h4 className="text-[10px] font-bold text-[#0f2333]">{$t("ShopifyResultsAndForm__t45", "Trusted by Brands")}</h4>
                      <p className="text-[9px] text-slate-500">{rich($t("ShopifyResultsAndForm__t46", "Worldwide."))}</p>
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </div>

          {/* Bottom Logos Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
            <div className="flex items-center justify-between md:justify-start lg:justify-between gap-8 lg:gap-12 flex-wrap flex-1 opacity-70 grayscale hover:grayscale-0 transition-all duration-300 lg:pr-12">
              {/* Logo 1 */}
              <div className="font-serif text-[16px] font-bold tracking-widest text-[#0f2333]">{$t("ShopifyResultsAndForm__t47", "LUXEVA ")}<span className="text-[10px] font-sans font-normal tracking-normal block text-center -mt-1">{$t("ShopifyResultsAndForm__t48", "HOME")}</span></div>
              {/* Logo 2 */}
              <div className="font-sans text-[14px] font-black tracking-tight flex items-center gap-1 text-[#0f2333]"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> {$t("ShopifyResultsAndForm__t49", "URBAN BEAST")}</div>
              {/* Logo 3 */}
              <div className="font-serif text-[16px] font-light tracking-[0.2em] text-[#0f2333]">{$t("ShopifyResultsAndForm__t50", "NOIR ")}<span className="text-[9px] font-sans font-normal tracking-normal block text-center -mt-1">{$t("ShopifyResultsAndForm__t51", "ATELIER")}</span></div>
              {/* Logo 4 */}
              <div className="font-sans text-[14px] font-bold text-[#0f2333] flex flex-col items-center leading-none"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg> <span className="mt-1">{$t("ShopifyResultsAndForm__t52", "PURELEAF")}</span></div>
              {/* Logo 5 */}
              <div className="font-serif text-[15px] tracking-widest text-[#0f2333] italic">{$t("ShopifyResultsAndForm__t53", "Velora")}</div>
            </div>

            <div className="flex flex-col items-end shrink-0 border-l border-slate-100 pl-6">
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 font-medium text-right">
                {rich($t("ShopifyResultsAndForm__t54", "Rated 5.0 by our clients"))}<br/>{rich($t("ShopifyResultsAndForm__t55", "for results and experience."))}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
