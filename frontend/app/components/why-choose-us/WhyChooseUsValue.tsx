"use client";

import React from "react";
import Image from "next/image";
import { Target, Puzzle, Gauge, ShieldCheck, Users, Rocket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import Link from "next/link";
import { rich } from "@/components/cms/rich";

const NAVY = "#0a1f2c";
const TEAL = "#0d9488";

const VALUES__cms = [
  {
    id: "01.",
    title: "Purpose-Driven\nSolutions",
    image: "/why-choose-us/value-target.webp",
    desc: "Every solution is built around your goals and what matters most.",
    icon: Target,
    blobPath: "M45.5,-51.7C58.3,-41.8,67.6,-26.8,69.5,-11.1C71.3,4.6,65.8,20.9,56.1,34.4C46.4,47.9,32.4,58.5,16.5,63.1C0.5,67.6,-17.4,66,-33.5,58.7C-49.6,51.4,-63.9,38.3,-70.7,21.9C-77.5,5.5,-76.8,-14.2,-68.2,-30.2C-59.5,-46.2,-42.9,-58.5,-27,-62.4C-11,-66.3,4.2,-61.8,18.8,-55.8Z"
  },
  {
    id: "02.",
    title: "Custom Fit,\nAlways",
    image: "/why-choose-us/value-puzzle.webp",
    desc: "Tailored strategies and solutions designed for your unique business.",
    icon: Puzzle,
    blobPath: "M38.8,-53.4C52.6,-44.6,67.5,-35.1,73.1,-21.5C78.6,-7.9,74.7,9.8,66,23.3C57.3,36.8,43.8,46,29.9,53.2C16,60.3,1.7,65.3,-12.3,63.6C-26.3,61.9,-40,53.5,-51.1,41.9C-62.2,30.3,-70.7,15.1,-72.5,-1C-74.3,-17.1,-69.5,-34.2,-58.2,-46C-46.9,-57.8,-29,-64.3,-13.4,-67.2C2.1,-70.1,17.7,-69.3,25,-62.2Z"
  },
  {
    id: "03.",
    title: "Performance\nThat Counts",
    image: "/why-choose-us/value-speed.webp",
    desc: "We focus on outcomes that drive real growth and measurable success.",
    icon: Gauge,
    blobPath: "M43.9,-54.6C54.8,-42.9,59.9,-27.2,60.6,-11.7C61.3,3.8,57.7,19.2,49.1,31.7C40.5,44.2,26.9,53.9,11.2,59.3C-4.5,64.7,-22.4,65.8,-37.8,59.3C-53.1,52.8,-66,38.8,-70.8,22.3C-75.5,5.7,-72.1,-13.4,-63.3,-28.9C-54.6,-44.4,-40.5,-56.3,-25.2,-60.7C-9.9,-65.1,6.5,-61.9,21.3,-58.2Z"
  },
  {
    id: "04.",
    title: "Reliable. Secure.\nFuture-Ready.",
    image: "/why-choose-us/value-shield.webp",
    desc: "Robust, scalable, and secure solutions that are ready for what's next.",
    icon: ShieldCheck,
    blobPath: "M47,-49.4C60.4,-39.7,70.5,-23.7,72.6,-6.6C74.8,10.6,69.1,28.8,57.3,42.5C45.5,56.1,27.7,65.1,9.3,67.6C-9.1,70,-26.8,65.8,-41.8,55.5C-56.7,45.2,-68.8,28.8,-71.4,11.1C-74,-6.7,-67,-25.7,-54.5,-39.6C-42,-53.4,-24.1,-62.1,-5.4,-63.9C13.4,-65.7,33.5,-60.5,47,-49.4Z"
  },
  {
    id: "05.",
    title: "A Partner,\nNot a Vendor",
    image: "/why-choose-us/value-users.webp",
    desc: "We stay with you, support you, and grow with your business.",
    icon: Users,
    blobPath: "M41.7,-52.3C53,-41.2,60.4,-26.4,63.1,-11.1C65.8,4.3,63.9,20.2,55.7,32.6C47.4,45,32.9,53.9,17.2,58.3C1.5,62.8,-15.5,62.8,-30.9,56.9C-46.3,51,-60.2,39.2,-66.2,24.5C-72.2,9.7,-70.4,-8.1,-61.8,-22C-53.1,-36,-37.6,-46.1,-23,-53.4C-8.3,-60.7,5.5,-65.1,19.3,-63.1Z"
  }
];

export default function WhyChooseUsValue() {
  const $t = useCmsText();
  const VALUES = useCmsData("WhyChooseUsValue__VALUES", VALUES__cms);
  return (
    <section className="py-20 lg:py-24 bg-[#f8f7f5] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
          <p className="text-[11px] font-extrabold tracking-widest uppercase mb-4 flex items-center justify-center gap-4" style={{ color: TEAL }}>
            <span className="w-8 h-px bg-current opacity-50"></span>
            {rich($t("WhyChooseUsValue__t1", "WHAT YOU GET WITH PROMANAGE"))}<span className="w-8 h-px bg-current opacity-50"></span>
          </p>
          <h2 className="text-h2 font-heading font-bold leading-[1.1] tracking-[-0.025em] mb-5" style={{ color: NAVY }}>
            {$t("WhyChooseUsValue__t2", "More Than Solutions.")}<br />
            <span style={{ color: TEAL }}>{$t("WhyChooseUsValue__t3", "Real Business Value.")}</span>
          </h2>
          <p className="text-body text-slate-600">
            {rich($t("WhyChooseUsValue__t4", "We don't just deliver. We create impact that lasts."))}</p>
        </div>

        {/* 5 Column Value Chain */}
        <div className="relative mb-12">
          
          {/* Continuous Wavy Line connecting the icons (Desktop) */}
          <div className="absolute top-[72px] left-0 w-full h-px hidden lg:block z-0 pointer-events-none">
            <svg width="100%" height="60" viewBox="0 0 1000 60" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 -translate-y-1/2">
              {/* A smooth sine wave connecting the centers */}
              <path d="M 0 30 Q 125 0 250 30 T 500 30 T 750 30 T 1000 30" stroke="#1f6f7a" strokeWidth="1.6" />
              {/* Dots on the line to match the design style */}
              <circle cx="10" cy="30" r="3" fill={TEAL} />
              <circle cx="250" cy="30" r="3" fill={TEAL} />
              <circle cx="500" cy="30" r="3" fill={TEAL} />
              <circle cx="750" cy="30" r="3" fill={TEAL} />
              <circle cx="990" cy="30" r="3" fill={TEAL} />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
            {VALUES.map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="flex flex-col items-start lg:items-center text-left lg:text-left relative group"
              >
                
                {/* Icon inside organic blob */}
                <div className="w-36 h-36 relative flex items-center justify-center mb-6 mx-auto self-center transition-transform duration-500 group-hover:-translate-y-2">
                  {/* Organic Blob SVG Background */}
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-[#dcecef] transition-colors duration-500 group-hover:text-[#cfe6ea] -z-10" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" transform="translate(100 100) scale(1.1)" d={val.blobPath} />
                  </svg>
                  
                  {/* The Icon */}
                  {val.image ? (
                    <Image src={val.image} alt="" width={140} height={140} className="h-[118px] w-auto select-none object-contain drop-shadow-[0_18px_22px_rgba(13,148,136,0.25)]" />
                  ) : (
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <val.icon size={28} strokeWidth={2.5} style={{ color: TEAL }} />
                    </div>
                  )}
                </div>

                {/* Content Layout with Left Borders for Separators */}
                <div className={`w-full text-left pt-2 px-4 lg:px-0 ${idx > 0 ? 'lg:border-l lg:border-slate-200 lg:pl-6' : 'lg:pr-4'}`}>
                  {/* Number */}
                  <span className="block text-h4 font-heading font-bold tracking-tight mb-2" style={{ color: "#0e7490" }}>
                    {val.id}
                  </span>
                  
                  {/* Title */}
                  <h3 className="whitespace-pre-line text-[17px] font-bold leading-[1.3] mb-3 pr-2" style={{ color: NAVY }}>
                    {val.title}
                  </h3>
                  
                  {/* Small Cyan Line */}
                  <div className="w-5 h-[2px] mb-4" style={{ backgroundColor: "#0891b2" }}></div>

                  {/* Description */}
                  <p className="text-caption text-slate-500 font-medium pr-2">
                    {val.desc}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col xl:flex-row items-center justify-between p-8 md:p-10 gap-8"
        >
          {/* Subtle Background Wave inside Banner */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at 100% 100%, ${TEAL}, transparent 70%)` }}></div>
          <div className="absolute left-0 bottom-0 top-0 w-1/2 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at 0% 0%, #0ea5e9, transparent 70%)` }}></div>

          {/* Left: Icon & Main Question */}
          <div className="flex items-center gap-6 relative z-10 w-full xl:w-auto">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-lg" style={{ backgroundColor: NAVY }}>
              <Rocket size={32} color="#bae6fd" />
            </div>
            <div>
              <h3 className="text-h5 font-bold" style={{ color: NAVY }}>
                {$t("WhyChooseUsValue__t5", "Ready to unlock ")}<br />
                <span style={{ color: TEAL }}>{$t("WhyChooseUsValue__t6", "real business growth?")}</span>
              </h3>
            </div>
          </div>

          {/* Middle: Short text (Divider handled by flex gap) */}
          <div className="hidden md:block w-px h-16 bg-slate-200 mx-4 shrink-0"></div>

          <div className="relative z-10 w-full xl:w-auto text-center xl:text-left">
            <p className="text-small text-slate-600 font-medium">
              {rich($t("WhyChooseUsValue__t7", "Let's build something great together. "))}<br className="hidden sm:block" />
              {rich($t("WhyChooseUsValue__t8", "Your goals. Our expertise. "))}<span className="font-bold" style={{ color: TEAL }}>{$t("WhyChooseUsValue__t9", "Real results.")}</span>
            </p>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full xl:w-auto justify-center xl:justify-end mt-4 xl:mt-0">
            <Link href={$t("WhyChooseUsValue__u2", "/contact")} className="flex items-center justify-center gap-2 px-6 py-3 rounded-md text-white text-sm font-semibold transition-transform hover:scale-105 whitespace-nowrap shadow-md" style={{ backgroundColor: NAVY }}>
              {$t("WhyChooseUsValue__t10", "Talk to an Expert")}<ArrowRight size={16} />
            </Link>
            <Link href={$t("WhyChooseUsValue__u1", "/portfolio")} className="flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold transition-colors hover:bg-slate-50 border-[1.5px] whitespace-nowrap" style={{ color: NAVY, borderColor: "#cbd5e1" }}>
              {$t("WhyChooseUsValue__t11", "View Our Work")}<ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
