"use client";

import React from 'react';
import Image from 'next/image';
import { Search, Target, Pencil, TrendingUp, CheckCircle2, Rocket, Calendar, ArrowRight } from 'lucide-react';
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import Link from "next/link";
import { rich } from "@/components/cms/rich";

const NAVY = "#0a1f2c";
const TEAL = "#0d9488";

const STEPS__cms = [
  {
    id: "01",
    title: "UNDERSTAND",
    desc: <>We learn about your business, your audience, and your goals to find the <span style={{ color: TEAL }} className="font-semibold">right opportunities</span>.</>,
    icon: Search,
    image: "/why-choose-us/process-understand.webp",
  },
  {
    id: "02",
    title: "STRATEGIZE",
    desc: <>We craft a <span style={{ color: TEAL }} className="font-semibold">custom strategy</span> tailored to your business and market needs.</>,
    icon: Target,
    image: "/why-choose-us/process-strategize.webp",
  },
  {
    id: "03",
    title: "CREATE",
    desc: <>We design and build digital experiences that are <span style={{ color: TEAL }} className="font-semibold">fast, beautiful</span>, and <span style={{ color: TEAL }} className="font-semibold">effective</span>.</>,
    icon: Pencil,
    image: "/why-choose-us/process-create.webp",
  },
  {
    id: "04",
    title: "GROW",
    desc: <>We optimize, support, and scale your solution to <span style={{ color: TEAL }} className="font-semibold">keep your business growing</span>.</>,
    icon: TrendingUp,
    image: "/why-choose-us/process-grow.webp",
  }
];

export default function HowWeWorkProcess() {
  const $t = useCmsText();
  const STEPS = useCmsData("HowWeWorkProcess__STEPS", STEPS__cms);
  return (
    <section id="how-we-work" className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-small font-bold tracking-widest uppercase mb-4 flex items-center justify-center gap-4" style={{ color: TEAL }}>
            <span className="w-8 h-px bg-current opacity-50"></span>
            {rich($t("HowWeWorkProcess__t1", "How We Work"))}<span className="w-8 h-px bg-current opacity-50"></span>
          </p>
          <h2 className="text-h2 font-extrabold mb-6" style={{ color: NAVY }}>{rich($t("HowWeWorkProcess__t2m", "A Process That's Simple.<br><span class=\"text-[#0d9488]\">Results That Speak.</span>"))}</h2>
          <p className="text-body text-slate-600">{rich($t("HowWeWorkProcess__t4m", "We follow a proven approach to turn your goals into powerful digital solutions that drive <strong class=\"font-bold text-[#0d9488]\">real business growth</strong>."))}</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center text-center">
              
              {/* L-Curve Dashed Arrow (except last) */}
              {index < STEPS.length - 1 && (
                <div 
                  className="absolute hidden lg:block z-0 pointer-events-none" 
                  style={{ 
                    top: '116px', 
                    left: 'calc(50% + 125px)', 
                    width: 'calc(100% + 32px - 250px)', 
                    height: '90px' 
                  }}
                >
                  {/* Dashed line with rounded corner */}
                  <div className="absolute inset-0 rounded-tl-2xl border-t-[2px] border-l-[2px] border-dashed" style={{ borderColor: TEAL }}></div>
                  
                  {/* Start Dot (bottom-left) */}
                  <div className="absolute bottom-[-4px] left-[-4px] w-2 h-2 rounded-full" style={{ backgroundColor: TEAL }}></div>
                  
                  {/* End Arrowhead (top-right) */}
                  <div className="absolute top-[-4.5px] right-[-6px] w-0 h-0 border-y-[5px] border-y-transparent border-l-[7px]" style={{ borderLeftColor: TEAL }}></div>
                </div>
              )}

              {/* Step Number */}
              <div className="absolute top-0 left-4 text-5xl font-light text-slate-200 select-none z-0">
                {step.id}
              </div>

              {/* Icon */}
              <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg" style={{ backgroundColor: TEAL }}>
                <step.icon size={28} className="text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10 px-2 flex-grow">
                <h3 className="text-[15px] font-bold tracking-widest uppercase mb-3" style={{ color: NAVY }}>{step.title}</h3>
                <p className="text-small text-slate-500 max-w-[220px] mx-auto">
                  {step.desc}
                </p>
              </div>

              {/* 3D Image */}
              <div className="relative z-10 mt-6 w-full h-[190px]">
                <Image src={step.image} alt={step.title} fill sizes="300px" className="edge-fade object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Icon & Headline */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#e6f6f4' }}>
              <Rocket size={32} style={{ color: TEAL }} />
            </div>
            <h3 className="text-h5 font-bold max-w-[320px]" style={{ color: NAVY }}>{rich($t("HowWeWorkProcess__t6m", "Ready to turn your ideas into <span class=\"text-[#0d9488]\">real results?</span>"))}</h3>
          </div>

          {/* Middle: Features */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={18} style={{ color: TEAL }} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-small font-bold" style={{ color: NAVY }}>{rich($t("HowWeWorkProcess__t8", "Custom Solutions"))}</p>
                <p className="text-[11px] text-slate-500">{rich($t("HowWeWorkProcess__t9", "Built around your goals"))}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={18} style={{ color: TEAL }} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-small font-bold" style={{ color: NAVY }}>{rich($t("HowWeWorkProcess__t10", "Experienced Team"))}</p>
                <p className="text-[11px] text-slate-500">{rich($t("HowWeWorkProcess__t11", "Experts who deliver"))}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={18} style={{ color: TEAL }} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-small font-bold" style={{ color: NAVY }}>{rich($t("HowWeWorkProcess__t12", "Measurable Impact"))}</p>
                <p className="text-[11px] text-slate-500">{rich($t("HowWeWorkProcess__t13", "Results you can track"))}</p>
              </div>
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-col gap-3 shrink-0">
            <Link href={$t("HowWeWorkProcess__u2", "/contact")} className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold transition-transform hover:scale-105" style={{ backgroundColor: TEAL }}>
              {$t("HowWeWorkProcess__t14", "Let's Build Your Growth")}<ArrowRight size={16} />
            </Link>
            <Link href={$t("HowWeWorkProcess__u1", "/contact")} className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors hover:bg-slate-50" style={{ color: TEAL, border: `1.5px solid ${TEAL}` }}>
              <Calendar size={16} />
              {$t("HowWeWorkProcess__t15", "Schedule a Call")}<ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
