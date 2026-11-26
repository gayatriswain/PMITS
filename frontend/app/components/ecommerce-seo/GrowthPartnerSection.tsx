"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, User, Target, Search, ShoppingCart, ShieldCheck } from 'lucide-react';
import { useCmsText } from "@/components/cms/SectionContent";
import Link from "next/link";
import { rich } from "@/components/cms/rich";

// Custom Animated Icons
const StoreIcon = () => (
  <svg viewBox="0 0 100 100" className="w-11 h-11 relative z-10">
    <motion.path 
      d="M 20 45 L 20 85 L 80 85 L 80 45" 
      fill="#ccfbf1" 
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ transformOrigin: "bottom" }}
    />
    <motion.path 
      d="M 30 60 L 50 60 L 50 85 L 30 85 Z" 
      fill="#ffffff" 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
    />
    <motion.path 
      d="M 60 60 L 75 60 L 75 75 L 60 75 Z" 
      fill="#ffffff" 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.7 }}
    />
    <motion.path 
      d="M 10 45 L 90 45 L 80 25 L 20 25 Z" 
      fill="#0f766e"
      initial={{ y: -20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    />
    <motion.path 
      d="M 10 45 Q 20 55 30 45 Q 40 55 50 45 Q 60 55 70 45 Q 80 55 90 45" 
      fill="#0f766e"
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.4 }}
      style={{ transformOrigin: "top" }}
    />
  </svg>
);

const AnalyzeIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 relative z-10">
    <motion.rect x="40" y="55" width="12" height="30" fill="#99f6e4" rx="2"
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ transformOrigin: "bottom" }}
    />
    <motion.rect x="58" y="40" width="12" height="45" fill="#14b8a6" rx="2"
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{ transformOrigin: "bottom" }}
    />
    <motion.rect x="76" y="25" width="12" height="60" fill="#0f766e" rx="2"
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ transformOrigin: "bottom" }}
    />
    <motion.g
      initial={{ x: -20, y: -20, opacity: 0 }}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
    >
      <circle cx="35" cy="35" r="18" fill="none" stroke="#0f2923" strokeWidth="6" />
      <line x1="48" y1="48" x2="65" y2="65" stroke="#0f2923" strokeWidth="8" strokeLinecap="round" />
      <circle cx="35" cy="35" r="10" fill="#ffffff" opacity="0.8" />
    </motion.g>
  </svg>
);

const ClarityIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 relative z-10">
    <motion.path 
      d="M 15 80 L 15 50 L 40 60 L 65 35 L 85 55 L 85 80 Z" 
      fill="#ccfbf1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    />
    <motion.path 
      d="M 15 50 L 40 60 L 65 35 L 85 55" 
      fill="none" 
      stroke="#0f766e" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    />
    <motion.polygon 
      points="75,55 85,55 85,45" 
      fill="#0f766e"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 1.1 }}
    />
    <motion.circle cx="15" cy="50" r="4" fill="#14b8a6" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} />
    <motion.circle cx="40" cy="60" r="4" fill="#14b8a6" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} />
    <motion.circle cx="65" cy="35" r="4" fill="#14b8a6" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }} />
  </svg>
);

export default function GrowthPartnerSection() {
  const $t = useCmsText();
  return (
    <section className="pt-8 pb-8 bg-white relative overflow-hidden font-sans">
      <div className="max-w-[1640px] mx-auto relative z-10 px-5">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-[#0f766e]/30"></div>
            <span className="text-[11px] font-bold text-[#0f766e] tracking-[0.15em] uppercase">{$t("GrowthPartnerSection__t1", "Your Growth Partner")}</span>
            <div className="h-px w-8 bg-[#0f766e]/30"></div>
          </div>
          <h2 className="text-h2 font-black text-[#0f2923] mb-5 tracking-tight">
            {$t("GrowthPartnerSection__t2", "You Bring the Store.")}<br/>
            <span className="text-[#0f766e]">{$t("GrowthPartnerSection__t3", "We'll Find the Growth.")}</span>
          </h2>
          <p className="text-body text-slate-500 max-w-lg mx-auto">
            {rich($t("GrowthPartnerSection__t4", "Share your store with us. We'll analyze what's holding your organic growth back and show you the biggest opportunities."))}</p>
        </div>

        {/* 3 Steps Container */}
        <div className="relative mb-12 mt-16">
          
          {/* Animated Curved SVG Line */}
          <div className="absolute top-[35px] left-0 w-full h-[150px] pointer-events-none z-0 hidden md:block">
            <svg width="100%" height="100%" viewBox="0 0 1000 150" preserveAspectRatio="none">
              <motion.path 
                d="M 166 40 C 330 40, 350 110, 500 110 C 650 110, 670 40, 833 40" 
                fill="none" 
                stroke="#14b8a6" 
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {/* Arrow 1 */}
              <motion.polygon points="-5,-4 4,0 -5,4" fill="#0f766e"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                style={{ offsetPath: "path('M 166 40 C 330 40, 350 110, 500 110')", offsetDistance: "55%", transform: "rotate(15deg)" } as any}
              />
              {/* Arrow 2 */}
              <motion.polygon points="-5,-4 4,0 -5,4" fill="#0f766e"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
                style={{ offsetPath: "path('M 500 110 C 650 110, 670 40, 833 40')", offsetDistance: "50%", transform: "rotate(-15deg)" } as any}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            
            {/* Step 1: You Share */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative pt-12"
            >
              {/* Fade at the top, solid at the bottom */}
              <div className="absolute inset-0 top-[20px] bg-gradient-to-b from-transparent via-[#e8f7f5]/40 to-[#e8f7f5] rounded-b-[40px] -z-10"></div>
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#e8f7f5] text-[#0f766e] font-black text-xs flex items-center justify-center mb-3">{$t("GrowthPartnerSection__t5", "01")}</div>
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-[4px] border-white p-2">
                  <StoreIcon />
                </div>
              </div>
              
              <div className="text-center px-4 pt-20 pb-8 h-full flex flex-col items-center">
                <h3 className="text-[17px] font-bold text-[#0f2923] mb-2">{$t("GrowthPartnerSection__t6", "You Share")}</h3>
                <p className="text-small text-slate-500 mb-6">{rich($t("GrowthPartnerSection__t7", "Share your store URL"))}<br/>{rich($t("GrowthPartnerSection__t8", "and a few details."))}</p>
                
                {/* UI Card */}
                <div className="w-full max-w-[260px] bg-white rounded-[14px] p-3 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col gap-3 mt-auto">
                  <div className="bg-[#f8fafc] rounded-md border border-slate-200 p-1.5 flex items-center gap-2">
                    <Lock size={12} className="text-[#0f766e]" />
                    <span className="text-[10px] font-medium text-slate-600">{$t("GrowthPartnerSection__t9", "https://yourstore.com")}</span>
                    <Search size={12} className="text-slate-400 ml-auto" />
                  </div>
                  <div className="flex gap-3 pb-1">
                    <div className="w-16 h-16 bg-[#f1f5f9] rounded-md flex items-center justify-center shrink-0">
                      <img src={$t("GrowthPartnerSection__t10", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80")} alt={$t("GrowthPartnerSection__t11", "Headphones")} className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-2">
                      <div className="w-full h-[4px] bg-slate-200 rounded-full"></div>
                      <div className="w-2/3 h-[4px] bg-slate-200 rounded-full"></div>
                      <div className="w-1/2 h-[4px] bg-slate-200 rounded-full"></div>
                      <div className="ml-auto mt-2"><ShoppingCart size={14} className="text-[#0f766e]" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 2: We Analyze */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative pt-12 md:mt-16"
            >
              {/* Fade at the top, solid at the bottom */}
              <div className="absolute inset-0 top-[20px] bg-gradient-to-b from-transparent via-[#f1f5f9]/40 to-[#f1f5f9] rounded-b-[40px] -z-10"></div>
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#0f766e] text-white font-black text-xs flex items-center justify-center mb-3 shadow-md">{$t("GrowthPartnerSection__t12", "02")}</div>
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-[4px] border-white p-2">
                  <AnalyzeIcon />
                </div>
              </div>
              
              <div className="text-center px-2 pt-20 pb-8 h-full flex flex-col items-center">
                <h3 className="text-[17px] font-bold text-[#0f2923] mb-2">{$t("GrowthPartnerSection__t13", "We Analyze")}</h3>
                <p className="text-small text-slate-500 mb-6">{rich($t("GrowthPartnerSection__t14", "Our SEO experts dive deep into your"))}<br/>{rich($t("GrowthPartnerSection__t15", "site, data and competitors."))}</p>
                
                <div className="flex flex-col gap-3.5 text-left w-full max-w-[260px] mt-auto mb-4 pl-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#0f766e] flex items-center justify-center shrink-0"><Check size={10} className="text-white stroke-[3]" /></div>
                    <span className="text-[11px] font-bold text-[#0f2923]">{$t("GrowthPartnerSection__t16", "Search intent & keyword gaps")}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#0f766e] flex items-center justify-center shrink-0"><Check size={10} className="text-white stroke-[3]" /></div>
                    <span className="text-[11px] font-bold text-[#0f2923]">{$t("GrowthPartnerSection__t17", "Product & category opportunities")}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#0f766e] flex items-center justify-center shrink-0"><Check size={10} className="text-white stroke-[3]" /></div>
                    <span className="text-[11px] font-bold text-[#0f2923]">{$t("GrowthPartnerSection__t18", "Technical SEO & site health")}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#0f766e] flex items-center justify-center shrink-0"><Check size={10} className="text-white stroke-[3]" /></div>
                    <span className="text-[11px] font-bold text-[#0f2923]">{$t("GrowthPartnerSection__t19", "Content & conversion insights")}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3: You Get Clarity */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative pt-12"
            >
              {/* Fade at the top, solid at the bottom */}
              <div className="absolute inset-0 top-[20px] bg-gradient-to-b from-transparent via-[#fffaf0]/40 to-[#fffaf0] rounded-b-[40px] -z-10"></div>
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#e8f7f5] text-[#0f766e] font-black text-xs flex items-center justify-center mb-3">{$t("GrowthPartnerSection__t20", "03")}</div>
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-[4px] border-white p-2">
                  <ClarityIcon />
                </div>
              </div>
              
              <div className="text-center px-4 pt-20 pb-8 h-full flex flex-col items-center">
                <h3 className="text-[17px] font-bold text-[#0f2923] mb-2">{$t("GrowthPartnerSection__t21", "You Get Clarity")}</h3>
                <p className="text-small text-slate-500 mb-6">{rich($t("GrowthPartnerSection__t22", "We deliver a clear, prioritized plan"))}<br/>{rich($t("GrowthPartnerSection__t23", "to grow your traffic and revenue."))}</p>
                
                {/* UI Card */}
                <div className="w-full max-w-[260px] bg-white rounded-[14px] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col gap-4 text-left mt-auto">
                  <div className="text-[11px] font-bold text-[#0f2923]">{$t("GrowthPartnerSection__t24", "Your Growth Opportunities")}</div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="flex items-center gap-2.5"><div className="w-2.5 h-2.5 rounded-full bg-[#99f6e4] shrink-0"></div><div className="h-2 w-[80%] bg-slate-100 rounded-full"></div></div>
                      <div className="flex items-center gap-2.5"><div className="w-2.5 h-2.5 rounded-full bg-[#14b8a6] shrink-0"></div><div className="h-2 w-[80%] bg-slate-100 rounded-full"></div></div>
                      <div className="flex items-center gap-2.5"><div className="w-2.5 h-2.5 rounded-full bg-[#0f766e] shrink-0"></div><div className="h-2 w-[60%] bg-slate-100 rounded-full"></div></div>
                    </div>
                    <div className="w-[52px] h-[52px] shrink-0 relative flex items-center justify-center">
                       <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                         {/* Light Mint (50% from 6 to 12 o'clock) */}
                         <motion.circle 
                           cx="50" cy="50" r="40" 
                           fill="none" stroke="#99f6e4" strokeWidth="20"
                           strokeDasharray="125.65 251.3"
                           strokeDashoffset="-125.65"
                           initial={{ strokeDasharray: "0 251.3" }}
                           whileInView={{ strokeDasharray: "125.65 251.3" }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                         />
                         {/* Dark Green (37.5% from 12 to 4:30 o'clock) */}
                         <motion.circle 
                           cx="50" cy="50" r="40" 
                           fill="none" stroke="#0f766e" strokeWidth="20"
                           strokeDasharray="94.25 251.3"
                           strokeDashoffset="0"
                           initial={{ strokeDasharray: "0 251.3" }}
                           whileInView={{ strokeDasharray: "94.25 251.3" }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                         />
                         {/* Medium Teal (12.5% from 4:30 to 6 o'clock) */}
                         <motion.circle 
                           cx="50" cy="50" r="40" 
                           fill="none" stroke="#14b8a6" strokeWidth="20"
                           strokeDasharray="31.41 251.3"
                           strokeDashoffset="-94.25"
                           initial={{ strokeDasharray: "0 251.3" }}
                           whileInView={{ strokeDasharray: "31.41 251.3" }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
                         />
                       </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Trust Markers */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[16px] border border-slate-100 p-5 md:px-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-6 mb-8 relative z-10"
        >
          <TrustMarker icon={<ShieldCheck size={18} strokeWidth={2} />} title={$t("GrowthPartnerSection__t25", "No Obligation")} desc={$t("GrowthPartnerSection__t26", "100% free. No pressure ever.")} />
          <div className="hidden md:block w-px h-10 bg-slate-100"></div>
          <TrustMarker icon={<Lock size={18} strokeWidth={2} />} title={$t("GrowthPartnerSection__t27", "Your Data is Safe")} desc={$t("GrowthPartnerSection__t28", "We respect your privacy. Always.")} />
          <div className="hidden md:block w-px h-10 bg-slate-100"></div>
          <TrustMarker icon={<User size={18} strokeWidth={2} />} title={$t("GrowthPartnerSection__t29", "Expert Review")} desc={$t("GrowthPartnerSection__t30", "Real humans. Real insights.")} />
          <div className="hidden md:block w-px h-10 bg-slate-100"></div>
          <TrustMarker icon={<Target size={18} strokeWidth={2} />} title={$t("GrowthPartnerSection__t31", "Actionable Plan")} desc={$t("GrowthPartnerSection__t32", "Clear next steps that drive growth.")} />
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center relative z-10"
        >
          <Link href={$t("GrowthPartnerSection__u1", "/contact")} className="bg-white border-2 border-[#0f766e] text-[#0f766e] font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-[#0f766e] hover:text-white transition-colors group text-[15px]">
            {$t("GrowthPartnerSection__t33", "See What You Can Improve")}<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

function TrustMarker({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-center md:items-start gap-3 flex-1 min-w-[170px]">
      <div className="w-10 h-10 rounded-full border border-teal-50 bg-[#e8f7f5] text-[#0f766e] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="text-left">
        <h4 className="text-[13px] font-bold text-[#0f2923] mb-0.5">{title}</h4>
        <p className="text-[11px] text-slate-500 leading-tight">{desc}</p>
      </div>
    </div>
  );
}
