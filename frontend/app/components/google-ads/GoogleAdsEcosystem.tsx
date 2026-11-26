"use client";

import React from "react";
import Image from "next/image";
import Container from "../shared/Container";
import { motion } from "framer-motion";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00acc1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.circle cx="12" cy="12" r="10" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
    <motion.circle cx="12" cy="12" r="6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.2 }} />
    <motion.circle cx="12" cy="12" r="2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
    <motion.path d="M22 2l-6 6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.8 }} />
    <motion.path d="M22 2l-2.5 1.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} />
    <motion.path d="M22 2l-1.5 2.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} />
  </svg>
);

const LightningIcon = () => (
  <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="#00acc1" stroke="none" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </motion.svg>
);

const UsersIcon = () => (
  <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00acc1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <motion.path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1 }} />
    <motion.circle cx="9" cy="7" r="4" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
    <motion.path d="M23 21v-2a4 4 0 0 0-3-3.87" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.4 }} />
    <motion.path d="M16 3.13a4 4 0 0 1 0 7.75" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.6 }} />
  </motion.svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#00acc1">
    <motion.rect x="3" width="4" rx="1" initial={{ height: 0, y: 22 }} whileInView={{ height: 6, y: 16 }} transition={{ duration: 0.5 }} />
    <motion.rect x="10" width="4" rx="1" initial={{ height: 0, y: 22 }} whileInView={{ height: 13, y: 9 }} transition={{ duration: 0.5, delay: 0.2 }} />
    <motion.rect x="17" width="4" rx="1" initial={{ height: 0, y: 22 }} whileInView={{ height: 20, y: 2 }} transition={{ duration: 0.5, delay: 0.4 }} />
  </svg>
);

const FEATURES__cms = [
  {
    title: "High Intent",
    desc: "Reach customers already looking for your services.",
    Icon: TargetIcon,
  },
  {
    title: "Instant Visibility",
    desc: "Appear when buying decisions are being made.",
    Icon: LightningIcon,
  },
  {
    title: "Qualified Leads",
    desc: "Generate enquiries that actually matter to your business.",
    Icon: UsersIcon,
  },
  {
    title: "Measurable Growth",
    desc: "Know exactly what's working and what's driving results.",
    Icon: ChartIcon,
  }
];

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00acc1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00acc1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00acc1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const MessageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00acc1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00acc1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const INTENTS__cms = [
  { text: "Website Development", top: "16%" },
  { text: "Digital Marketing Agency", top: "33%" },
  { text: "Accountant Near Me", top: "50%" },
  { text: "Luxury Interior Designer", top: "67%" },
  { text: "Your Service", top: "84%" }
];

const OUTCOMES__cms = [
  { title: "New Phone Call", desc: "A potential customer is calling you.", Icon: PhoneIcon, bg: "#e0f2f1", top: "16%" },
  { title: "New Quote Request", desc: "Someone is interested in your service.", Icon: MailIcon, bg: "#e0f7fa", top: "39%" },
  { title: "WhatsApp Enquiry", desc: "A new enquiry just came in.", Icon: MessageIcon, bg: "#e8f5e9", top: "62%" },
  { title: "Appointment Confirmed", desc: "A customer is booked with you.", Icon: CalendarIcon, bg: "#e0f2f1", top: "85%" }
];

export default function GoogleAdsEcosystem() {
  const $t = useCmsText();
  const FEATURES = useCmsData("GoogleAdsEcosystem__FEATURES", FEATURES__cms);
  const INTENTS = useCmsData("GoogleAdsEcosystem__INTENTS", INTENTS__cms);
  const OUTCOMES = useCmsData("GoogleAdsEcosystem__OUTCOMES", OUTCOMES__cms);
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden relative">
      <Container>
        {/* Headings */}
        <div className="text-center mb-12 lg:mb-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-8 bg-[#00acc1]"></span>
            <span className="text-[#00acc1] font-bold text-xs tracking-widest uppercase">{$t("GoogleAdsEcosystem__t1", "Why Google Ads")}</span>
            <span className="h-px w-8 bg-[#00acc1]"></span>
          </div>
          <h2 className="text-h2 font-bold text-[#132a43] mb-4 font-serif">
            {$t("GoogleAdsEcosystem__t2", "Someone Is Searching")}<br/>
            {$t("GoogleAdsEcosystem__t3", "For ")}<span className="text-[#00acc1]">{$t("GoogleAdsEcosystem__t4", "Your Business")}</span> {$t("GoogleAdsEcosystem__t5", "Right Now.")}</h2>
          <p className="text-body text-slate-500 max-w-2xl mx-auto">
            {rich($t("GoogleAdsEcosystem__t6", "Every day, potential customers search Google looking for businesses they can trust. The question isn't whether they're searching—it's whether they find "))}<span className="font-semibold text-[#00acc1]">{$t("GoogleAdsEcosystem__t7", "your business")}</span> {rich($t("GoogleAdsEcosystem__t8", "or your competitor's."))}</p>
        </div>

        {/* Ecosystem Layout */}
        <div className="relative w-full max-w-[1300px] mx-auto flex flex-col items-center gap-10">

          {/* DESKTOP LAYOUT (Image Centered, Cards placed OUTSIDE touching the dots) */}
          <div className="hidden lg:block relative w-full max-w-[550px] xl:max-w-[680px] mx-auto">
            {/* The Image */}
            <Image 
              src={$t("GoogleAdsEcosystem__t9", "/google-ads.png")} 
              alt={$t("GoogleAdsEcosystem__t10", "Google Ads Ecosystem")} 
              width={800} 
              height={500} 
              className="w-full h-auto mix-blend-multiply opacity-95"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
                maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)'
              }}
            />
            
            {/* Left Cards (Customer Intent) */}
            {/* Placed at left: 8% so they overlap the faded lines as per the design */}
            <p className="absolute -top-10 left-[8%] -translate-x-full w-[260px] xl:w-[280px] text-center text-xs font-bold text-slate-800 uppercase tracking-widest">{rich($t("GoogleAdsEcosystem__t11", "Customer Intent"))}</p>
            {INTENTS.map((intent) => (
              <div key={intent.text} className="absolute left-[8%] -translate-x-full -translate-y-1/2 bg-white rounded-full shadow-[0_8px_25px_rgb(0,0,0,0.06)] border border-slate-100 py-3 px-5 flex items-center gap-3 w-[260px] xl:w-[280px] hover:border-[#00acc1] transition-colors cursor-default" style={{ top: intent.top }}>
                <SearchIcon />
                <span className="text-sm font-semibold text-slate-700">{intent.text}</span>
              </div>
            ))}
            
            {/* Right Cards (Business Outcome) */}
            {/* Placed at right: 0 and translated right by 100% so their left edge exactly touches the dots without hiding them */}
            <p className="absolute -top-10 right-0 translate-x-full w-[280px] xl:w-[300px] text-center text-xs font-bold text-slate-800 uppercase tracking-widest">{rich($t("GoogleAdsEcosystem__t12", "Business Outcome"))}</p>
            {OUTCOMES.map((outcome) => (
              <div key={outcome.title} className="absolute right-0 translate-x-full -translate-y-1/2 bg-white rounded-2xl shadow-[0_8px_25px_rgb(0,0,0,0.06)] border border-slate-100 p-4 flex items-start gap-4 w-[280px] xl:w-[300px] hover:border-[#00acc1] transition-colors cursor-default" style={{ top: outcome.top }}>
                <span className="flex items-center justify-center w-10 h-10 rounded-full shrink-0" style={{ backgroundColor: outcome.bg }}>
                  <outcome.Icon />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#132a43]">{outcome.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{outcome.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE LAYOUT (Fallback Stack) */}
          <div className="lg:hidden w-full flex flex-col gap-10">
            {/* Customer Intent */}
            <div className="w-full flex flex-col gap-3">
              <p className="text-caption font-bold text-slate-800 uppercase tracking-widest pl-4 mb-2">{rich($t("GoogleAdsEcosystem__t13", "Customer Intent"))}</p>
              {INTENTS.map((intent) => (
                <div key={intent.text} className="bg-white rounded-full shadow-[0_4px_15px_rgb(0,0,0,0.05)] border border-slate-100 py-3 px-5 flex items-center gap-3 w-full">
                  <SearchIcon />
                  <span className="text-sm font-semibold text-slate-700">{intent.text}</span>
                </div>
              ))}
            </div>

            {/* Mobile Image */}
            <div className="w-full max-w-[400px] mx-auto relative z-10 shrink-0">
              <Image src={$t("GoogleAdsEcosystem__t14", "/google-ads.png")} alt={$t("GoogleAdsEcosystem__t15", "Google Ads Ecosystem")} width={500} height={500} className="w-full h-auto drop-shadow-xl" />
            </div>

            {/* Business Outcome */}
            <div className="w-full flex flex-col gap-3">
              <p className="text-caption font-bold text-slate-800 uppercase tracking-widest pl-4 mb-2 text-right">{rich($t("GoogleAdsEcosystem__t16", "Business Outcome"))}</p>
              {OUTCOMES.map((outcome) => (
                <div key={outcome.title} className="bg-white rounded-2xl shadow-[0_4px_15px_rgb(0,0,0,0.05)] border border-slate-100 p-4 flex items-start gap-3.5 w-full">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full shrink-0" style={{ backgroundColor: outcome.bg }}>
                    <outcome.Icon />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#132a43]">{outcome.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{outcome.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 lg:mt-32">
          {/* Heading */}
          <div className="text-center mb-16">
            <h3 className="text-h4 font-bold text-[#132a43] font-serif flex flex-col items-center">
              <span>{$t("GoogleAdsEcosystem__t17", "The Goal Was Never More Clicks.")}</span>
              <span className="relative mt-2">
                {$t("GoogleAdsEcosystem__t18", "The Goal Is ")}<span className="text-[#00acc1]">{$t("GoogleAdsEcosystem__t19", "More Customers.")}</span>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-[#00acc1]"></span>
              </span>
            </h3>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 max-w-6xl mx-auto">
            {FEATURES.map((feature, idx) => (
              <div key={feature.title} className={`flex items-start gap-4 px-4 ${idx !== 3 ? 'lg:border-r lg:border-slate-200' : ''}`}>
                <div className="w-14 h-14 rounded-full bg-teal-50/50 border border-teal-100 flex items-center justify-center shrink-0">
                  <feature.Icon />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#132a43] mb-1">{feature.title}</h4>
                  <p className="text-caption text-slate-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </Container>
    </section>
  );
}
