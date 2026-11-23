import React from 'react';
import Image from 'next/image';
import { Search, Target, Pencil, TrendingUp, CheckCircle2, Rocket, Calendar, ArrowRight } from 'lucide-react';

const NAVY = "#0a1f2c";
const TEAL = "#0d9488";

const STEPS = [
  {
    id: "01",
    title: "UNDERSTAND",
    desc: <>We learn about your business, your audience, and your goals to find the <span style={{ color: TEAL }} className="font-semibold">right opportunities</span>.</>,
    icon: Search,
    image: "/process_understand.png",
  },
  {
    id: "02",
    title: "STRATEGIZE",
    desc: <>We craft a <span style={{ color: TEAL }} className="font-semibold">custom strategy</span> tailored to your business and market needs.</>,
    icon: Target,
    image: "/process_strategize.png",
  },
  {
    id: "03",
    title: "CREATE",
    desc: <>We design and build digital experiences that are <span style={{ color: TEAL }} className="font-semibold">fast, beautiful</span>, and <span style={{ color: TEAL }} className="font-semibold">effective</span>.</>,
    icon: Pencil,
    image: "/process_create.png",
  },
  {
    id: "04",
    title: "GROW",
    desc: <>We optimize, support, and scale your solution to <span style={{ color: TEAL }} className="font-semibold">keep your business growing</span>.</>,
    icon: TrendingUp,
    image: "/process_grow.png",
  }
];

export default function HowWeWorkProcess() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-sm font-bold tracking-widest uppercase mb-4 flex items-center justify-center gap-4" style={{ color: TEAL }}>
            <span className="w-8 h-px bg-current opacity-50"></span>
            How We Work
            <span className="w-8 h-px bg-current opacity-50"></span>
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ color: NAVY }}>
            A Process That&apos;s Simple.<br/>
            <span style={{ color: TEAL }}>Results That Speak.</span>
          </h2>
          <p className="text-lg text-slate-600">
            We follow a proven approach to turn your goals into powerful digital solutions that drive <strong className="font-bold" style={{ color: TEAL }}>real business growth</strong>.
          </p>
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
                <p className="text-[13px] text-slate-500 leading-relaxed max-w-[220px] mx-auto">
                  {step.desc}
                </p>
              </div>

              {/* 3D Image */}
              <div className="relative z-10 w-full h-[180px] mt-auto -translate-y-6">
                <Image src={step.image} alt={step.title} fill className="object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" />
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
            <h3 className="text-2xl font-bold leading-tight max-w-[220px]" style={{ color: NAVY }}>
              Ready to turn your ideas into <span style={{ color: TEAL }}>real results?</span>
            </h3>
          </div>

          {/* Middle: Features */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={18} style={{ color: TEAL }} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-[13px] font-bold" style={{ color: NAVY }}>Custom Solutions</p>
                <p className="text-[11px] text-slate-500">Built around your goals</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={18} style={{ color: TEAL }} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-[13px] font-bold" style={{ color: NAVY }}>Experienced Team</p>
                <p className="text-[11px] text-slate-500">Experts who deliver</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={18} style={{ color: TEAL }} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-[13px] font-bold" style={{ color: NAVY }}>Measurable Impact</p>
                <p className="text-[11px] text-slate-500">Results you can track</p>
              </div>
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-col gap-3 shrink-0">
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold transition-transform hover:scale-105" style={{ backgroundColor: TEAL }}>
              Let's Build Your Growth
              <ArrowRight size={16} />
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors hover:bg-slate-50" style={{ color: TEAL, border: `1.5px solid ${TEAL}` }}>
              <Calendar size={16} />
              Schedule a Call
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
