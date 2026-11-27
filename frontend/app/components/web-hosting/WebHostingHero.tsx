"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Zap, MessageCircle, CheckCircle2, ShieldCheck, Headphones, CloudLightning, Lock, Check } from 'lucide-react';
import Image from 'next/image';

import Container from '../shared/Container';
import { useCmsText } from "@/components/cms/SectionContent";
import Link from "next/link";
import { html, rich } from "@/components/cms/rich";

export default function WebHostingHero() {
  const $t = useCmsText();
  return (
    <section className="relative bg-gradient-to-r from-white to-[#D7E3F0] pt-0 pb-16 overflow-hidden font-sans flex flex-col justify-start">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft glowing radial gradient on the right */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#e0f8f5] to-transparent rounded-full blur-3xl opacity-60"></div>
        
        {/* Dotted wave pattern on bottom left */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[radial-gradient(circle_at_bottom_left,#0f766e_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.05] [mask-image:radial-gradient(ellipse_100%_100%_at_bottom_left,#000_10%,transparent_80%)]"></div>

        {/* Bottom White Fade Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <Container className="relative z-10 flex-1 flex flex-col">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.5fr_1fr] gap-8 items-center flex-1 mt-4 lg:mt-0 pt-4 lg:pt-0">
          
          {/* Left Content */}
          <div className="max-w-[650px] flex flex-col justify-center pt-0 lg:pt-4">
            {/* Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#0f766e]/20 mb-8 shadow-sm self-start"
            >
              <Cloud size={16} className="text-[#0f766e]" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#0f766e]">
                {html($t("WebHostingHero__t1", "WEBSITE HOSTING"))}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]"></span>
            </motion.div>
            
            {/* Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-h1 font-black text-[#0f2923] mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {$t("WebHostingHero__t2", "Fast Hosting. ")}<br />
              <span className="text-[#0f766e]">{html($t("WebHostingHero__t3", "Zero Hosting Headaches."))}</span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-body text-slate-600 mb-8 font-medium max-w-[540px]"
            >
              {rich($t("WebHostingHero__t4", "Reliable, secure, and high-performance hosting built to keep your website online, fast, and ready for every visitor."))}</motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-3 mb-6"
            >
              <Link href={$t("WebHostingHero__u2", "/contact")} className="w-full sm:w-auto px-6 py-3 bg-[#0f766e] hover:bg-[#0d645d] text-white rounded-xl font-bold text-[14px] transition-all shadow-[0_8px_20px_rgba(15,118,110,0.2)] flex items-center justify-center gap-2 group">
                <Zap size={16} fill="currentColor" />
                {$t("WebHostingHero__t5", "Get My Hosting Plan")}<span className="group-hover:translate-x-1 transition-transform ml-1">→</span>
              </Link>
              
              <Link href={$t("WebHostingHero__u1", "/contact")} className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-[#0f2923] border border-[#0f766e]/20 rounded-xl font-bold text-[14px] transition-all flex items-center justify-center gap-2 shadow-sm">
                <MessageCircle size={16} className="text-[#0f766e]" />
                {$t("WebHostingHero__t6", "Talk to an Expert")}</Link>
            </motion.div>
            
            {/* Trust Markers */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 text-[12px] font-semibold text-slate-600"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#14b8a6]" />
                {html($t("WebHostingHero__t7", "No Hidden Fees"))}</div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#14b8a6]" />
                {html($t("WebHostingHero__t8", "Cancel Anytime"))}</div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#14b8a6]" />
                {html($t("WebHostingHero__t9", "30-Day Money-Back Guarantee"))}</div>
            </motion.div>
          </div>
                   {/* Center Image Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full h-[300px] lg:h-[500px] flex items-center justify-center mix-blend-multiply"
          >
            <Image 
              src={$t("WebHostingHero__t10", "/web-hosting-hero.webp")} 
              alt={$t("WebHostingHero__t11", "Web Hosting Dashboard")}
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          
          {/* Right Points Container */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-6 justify-center relative pl-8 lg:pl-12"
          >
            {/* Main Vertical Dashed Line */}
            <div className="absolute left-0 lg:left-1 top-[45px] bottom-[45px] border-l-[2px] border-dashed border-[#14b8a6]/50 hidden sm:block"></div>

            {/* Point 1 */}
            <div className="relative bg-white rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-50 flex items-start gap-4 hover:-translate-y-1 transition-transform">
              {/* Connector */}
              <div className="absolute top-1/2 left-[-2rem] lg:left-[-2.75rem] w-8 lg:w-11 h-0 border-t-[2px] border-dashed border-[#14b8a6]/50 -translate-y-1/2 hidden sm:block">
                <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#14b8a6]"></div>
                <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#14b8a6]"></div>
              </div>

              <div className="w-10 h-10 rounded-full bg-[#14b8a6]/10 flex items-center justify-center shrink-0">
                <Check className="text-[#0f766e]" size={18} />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">{html($t("WebHostingHero__t12", "YOUR WEBSITE"))}</div>
                <div className="font-bold text-[#0f2923] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#14b8a6]"></span>
                  {html($t("WebHostingHero__t13", "Online"))}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">{html($t("WebHostingHero__t14", "Always Available"))}</div>
              </div>
            </div>

            {/* Point 2 */}
            <div className="relative bg-white rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-50 flex items-start gap-4 hover:-translate-y-1 transition-transform">
              {/* Connector */}
              <div className="absolute top-1/2 left-[-2rem] lg:left-[-2.75rem] w-8 lg:w-11 h-0 border-t-[2px] border-dashed border-[#14b8a6]/50 -translate-y-1/2 hidden sm:block">
                <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#14b8a6]"></div>
                <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#14b8a6]"></div>
              </div>

              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                <CloudLightning className="text-slate-600" size={18} />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">{html($t("WebHostingHero__t15", "FAST DELIVERY"))}</div>
                <div className="font-bold text-[#0f2923]">{html($t("WebHostingHero__t16", "98-100% Uptime*"))}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">{html($t("WebHostingHero__t17", "High Performance"))}</div>
              </div>
            </div>

            {/* Point 3 */}
            <div className="relative bg-white rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-50 flex items-start gap-4 hover:-translate-y-1 transition-transform">
              {/* Connector */}
              <div className="absolute top-1/2 left-[-2rem] lg:left-[-2.75rem] w-8 lg:w-11 h-0 border-t-[2px] border-dashed border-[#14b8a6]/50 -translate-y-1/2 hidden sm:block">
                <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#14b8a6]"></div>
                <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#14b8a6]"></div>
              </div>

              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="text-slate-600" size={18} />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">{html($t("WebHostingHero__t18", "SECURED"))}</div>
                <div className="font-bold text-[#0f2923]">{html($t("WebHostingHero__t19", "SSL + Firewall"))}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">{html($t("WebHostingHero__t20", "Your Data, Protected"))}</div>
              </div>
            </div>

            {/* Point 4 */}
            <div className="relative bg-white rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-slate-50 flex items-start gap-4 hover:-translate-y-1 transition-transform">
              {/* Connector */}
              <div className="absolute top-1/2 left-[-2rem] lg:left-[-2.75rem] w-8 lg:w-11 h-0 border-t-[2px] border-dashed border-[#14b8a6]/50 -translate-y-1/2 hidden sm:block">
                <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#14b8a6]"></div>
                <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#14b8a6]"></div>
              </div>

              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                <CheckCircle2 className="text-slate-600" size={18} />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">{html($t("WebHostingHero__t21", "READY FOR VISITORS"))}</div>
                <div className="font-bold text-[#0f2923]">{html($t("WebHostingHero__t22", "Always On"))}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">{html($t("WebHostingHero__t23", "Built for Every Visitor"))}</div>
              </div>
            </div>
          </motion.div>
          
        </div>
        
        {/* Bottom Banner Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full mt-8 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 py-6 px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 relative z-20"
        >
          {/* Stat 1 */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0">
            <div className="w-12 h-12 rounded-full bg-[#f0fdfa] flex items-center justify-center shrink-0 border border-[#ccfbf1]">
              <ShieldCheck size={24} className="text-[#0f766e]" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-xl font-black text-[#0f2923] leading-none mb-1">99.9%</div>
              <div className="text-[11px] font-bold text-[#0f766e]">{html($t("WebHostingHero__t24", "Uptime Commitment"))}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{html($t("WebHostingHero__t25", "Your site. Always on."))}</div>
            </div>
          </div>
          
          {/* Stat 2 */}
          <div className="flex items-center gap-4 sm:pl-8 pt-4 sm:pt-0">
            <div className="w-12 h-12 rounded-full bg-[#f0fdfa] flex items-center justify-center shrink-0 border border-[#ccfbf1]">
              <Headphones size={24} className="text-[#0f766e]" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-xl font-black text-[#0f2923] leading-none mb-1">{html($t("WebHostingHero__t26", "24/7"))}</div>
              <div className="text-[11px] font-bold text-[#0f766e]">{html($t("WebHostingHero__t27", "Expert Support"))}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{html($t("WebHostingHero__t28", "Real people. Real help."))}</div>
            </div>
          </div>
          
          {/* Stat 3 */}
          <div className="flex items-center gap-4 lg:pl-8 pt-4 sm:pt-0">
            <div className="w-12 h-12 rounded-full bg-[#f0fdfa] flex items-center justify-center shrink-0 border border-[#ccfbf1]">
              <CloudLightning size={24} className="text-[#0f766e]" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-xl font-black text-[#0f2923] leading-none mb-1">{html($t("WebHostingHero__t29", "Daily"))}</div>
              <div className="text-[11px] font-bold text-[#0f766e]">{html($t("WebHostingHero__t30", "Backups"))}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{html($t("WebHostingHero__t31", "Restore anytime."))}</div>
            </div>
          </div>
          
          {/* Stat 4 */}
          <div className="flex items-center gap-4 sm:pl-8 pt-4 sm:pt-0">
            <div className="w-12 h-12 rounded-full bg-[#f0fdfa] flex items-center justify-center shrink-0 border border-[#ccfbf1]">
              <Lock size={24} className="text-[#0f766e]" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-xl font-black text-[#0f2923] leading-none mb-1">{html($t("WebHostingHero__t32", "Secure"))}</div>
              <div className="text-[11px] font-bold text-[#0f766e]">{html($t("WebHostingHero__t33", "By Design"))}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{html($t("WebHostingHero__t34", "Protection at every layer."))}</div>
            </div>
          </div>
        </motion.div>
        
      </Container>
    </section>
  );
}
