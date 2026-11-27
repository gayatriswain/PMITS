"use client";

import Image from "next/image";
import React from "react";
import { Layers, Puzzle, Shield, LineChart, UserCheck, Lightbulb, Rocket, Users, Clock, Send, ArrowRight, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import Link from "next/link";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#0a1f2c";
const TEAL = "#0d9488";

const FEATURES__cms = [
  {
    title: "Scalable by Design",
    desc: "Solutions that grow with your business, not against it.",
    icon: Layers,
    color: "#0284c7" // light blue for icon
  },
  {
    title: "Flexible & Adaptable",
    desc: "We adapt to your needs and evolving market.",
    icon: Puzzle,
    color: "#0f766e"
  },
  {
    title: "Secure & Compliant",
    desc: "Enterprise-grade security you can count on.",
    icon: Shield,
    color: "#0369a1"
  },
  {
    title: "Data-Driven Decisions",
    desc: "Turn data into insights and insights into growth.",
    icon: LineChart,
    color: "#0284c7"
  },
  {
    title: "User-Centric Experience",
    desc: "Designed for people. Built for results.",
    icon: UserCheck,
    color: "#0ea5e9"
  },
  {
    title: "Innovation at Core",
    desc: "We explore, iterate, and build what gives you an edge.",
    icon: Lightbulb,
    color: "#0369a1"
  }
];

export default function WhyChooseUsFutureReady() {
  const $t = useCmsText();
  const FEATURES = useCmsData("WhyChooseUsFutureReady__FEATURES", FEATURES__cms);
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <p className="text-[11px] font-extrabold tracking-widest uppercase mb-4 flex items-center justify-center gap-4" style={{ color: TEAL }}>
            <span className="w-8 h-px bg-current opacity-50"></span>
            {rich($t("WhyChooseUsFutureReady__t1", "BUILT FOR TODAY. READY FOR TOMORROW."))}<span className="w-8 h-px bg-current opacity-50"></span>
          </p>
          <h2 className="text-h2 font-extrabold mb-5" style={{ color: NAVY }}>{rich($t("WhyChooseUsFutureReady__t2m", "Future-Ready Solutions <br><span class=\"text-[#00647a]\">Built Around You.</span>"))}</h2>
          <p className="text-body text-slate-600 font-medium">{rich($t("WhyChooseUsFutureReady__t4m", "Technology moves fast. We build solutions that stay <br class=\"hidden md:block\">relevant, adaptable, and <span class=\"font-bold text-[#0d9488]\">ahead of what's next.</span>"))}</p>
        </div>

        {/* Main Content: Left Cards & Right Image */}
        <div className="flex flex-col xl:flex-row gap-10 mb-16">
          
          {/* Left Side: 3x2 Grid of Cards */}
          <div className="w-full xl:w-7/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {FEATURES.map((feat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 relative overflow-hidden flex flex-col items-center text-center shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-slate-100 group transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
              >
                {/* Top Right Corner Accent */}
                <div 
                  className="absolute top-0 right-0 w-[42px] h-[42px] transition-transform duration-500 group-hover:scale-110 z-0" 
                  style={{ 
                    background: "linear-gradient(to bottom right, #0891b2, #0a1f2c)", 
                    borderBottomLeftRadius: "100%" 
                  }} 
                ></div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 relative z-10" style={{ background: "radial-gradient(circle, #f8fafc 0%, #f1f5f9 100%)", boxShadow: "inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 10px rgba(0,0,0,0.03)" }}>
                  <feat.icon size={26} strokeWidth={2.5} style={{ color: feat.color }} />
                </div>

                {/* Text */}
                <h3 className="text-[14px] font-extrabold mb-2 leading-snug relative z-10" style={{ color: NAVY }}>
                  {feat.title}
                </h3>
                
                {/* Small Divider Line */}
                <div className="w-6 h-[2px] mx-auto mb-3 relative z-10" style={{ backgroundColor: "#7dd3fc" }}></div>
                
                <p className="text-caption text-slate-500 font-medium relative z-10">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Image with Overlay */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full xl:w-5/12 relative min-h-[400px] lg:min-h-[460px] xl:mr-4 xl:mb-4"
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
              <Image
                src={$t("WhyChooseUsFutureReady__t20", "/why-choose-us/future-stairs-photo.webp")}
                alt={$t("WhyChooseUsFutureReady__t21", "Business leader walking up a curved staircase towards the sky")}
                fill
                sizes="(min-width: 1280px) 560px, 100vw"
                className="object-cover object-[30%_60%]"
              />
              
              {/* Top Left Quote */}
              <div className="absolute top-7 left-7 lg:top-9 lg:left-9 max-w-[300px] z-10">
                <Quote size={30} className="text-[#0e7490] mb-3 rotate-180" fill="currentColor" strokeWidth={0} />
                <h3 className="text-[clamp(19px,1.6vw,24px)] font-bold leading-snug text-[#0a1f2c] mb-2 tracking-tight">{rich($t("WhyChooseUsFutureReady__t7m", "We don't just keep up <br>with the future."))}</h3>
                <h3 className="text-[clamp(19px,1.6vw,24px)] font-bold leading-snug text-[#0e7490] tracking-tight">
                  {html($t("WhyChooseUsFutureReady__t9", "We build it."))}</h3>
              </div>
            </div>

            {/* Bottom Right Stats Box (protruding slightly) */}
            <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-gradient-to-br from-[#0a1f2c] to-[#04111a] rounded-[1.25rem] p-6 shadow-[0_20px_50px_rgba(10,31,44,0.5)] border border-[#1e3a5f]/40 z-20 w-[240px] lg:w-[260px]">
              <div className="flex flex-col">
                
                {/* Stat 1 */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 shadow-[inset_0_0_10px_rgba(14,165,233,0.1)]">
                    <Rocket size={22} className="text-[#0ea5e9]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-h5 text-white font-bold mb-1">{html($t("WhyChooseUsFutureReady__t10", "200+"))}</h4>
                    <p className="text-caption text-slate-300 font-medium">{rich($t("WhyChooseUsFutureReady__t11", "Projects Delivered"))}</p>
                  </div>
                </div>
                
                <div className="w-full h-px bg-[#1e3a5f]/60 mb-4"></div>

                {/* Stat 2 */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 shadow-[inset_0_0_10px_rgba(14,165,233,0.1)]">
                    <Users size={22} className="text-[#0ea5e9]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-h5 text-white font-bold mb-1">98%</h4>
                    <p className="text-caption text-slate-300 font-medium">{rich($t("WhyChooseUsFutureReady__t12", "Client Satisfaction"))}</p>
                  </div>
                </div>

                <div className="w-full h-px bg-[#1e3a5f]/60 mb-4"></div>

                {/* Stat 3 */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 shadow-[inset_0_0_10px_rgba(14,165,233,0.1)]">
                    <Clock size={22} className="text-[#0ea5e9]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-h5 text-white font-bold mb-1">{html($t("WhyChooseUsFutureReady__t13", "5+"))}</h4>
                    <p className="text-caption text-slate-300 font-medium">{rich($t("WhyChooseUsFutureReady__t14", "Years of Impact"))}</p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at 100% 100%, ${TEAL}, transparent 70%)` }}></div>

          {/* Left: Icon & Text */}
          <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10 text-center sm:text-left w-full md:w-auto">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-lg" style={{ backgroundColor: NAVY }}>
              <Send size={24} color="#bae6fd" />
            </div>
            <div>
              <h3 className="text-h6 font-bold mb-1" style={{ color: NAVY }}>{rich($t("WhyChooseUsFutureReady__t15m", "Ready to build <span class=\"text-[#0d9488]\">what's next?</span>"))}</h3>
              <p className="text-small text-slate-500 font-medium">
                {rich($t("WhyChooseUsFutureReady__t17", "Let's create future-ready solutions that drive real results."))}</p>
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full md:w-auto justify-center md:justify-end mt-2 md:mt-0">
            <Link href={$t("WhyChooseUsFutureReady__u2", "/contact")} className="flex items-center justify-center gap-2 px-6 py-3 rounded-md text-white text-[13px] font-bold transition-transform hover:scale-105 shadow-md whitespace-nowrap" style={{ backgroundColor: "#0f4c5c" }}>
              {$t("WhyChooseUsFutureReady__t18", "Talk to an Expert")}<ArrowRight size={16} />
            </Link>
            <Link href={$t("WhyChooseUsFutureReady__u1", "/portfolio")} className="flex items-center justify-center gap-2 px-6 py-3 rounded-md text-[13px] font-bold transition-colors hover:bg-slate-50 border-[1.5px] whitespace-nowrap" style={{ color: NAVY, borderColor: "#cbd5e1" }}>
              {$t("WhyChooseUsFutureReady__t19", "View Our Work")}<ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
