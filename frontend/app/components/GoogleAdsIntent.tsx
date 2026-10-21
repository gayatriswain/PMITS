"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "./Container";

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B4F55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B4F55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B4F55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M18 9l-5 5-4-4-5 5" />
    <path d="M14 9h4v4" />
  </svg>
);

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#526b7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B4F55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const UsersGroupIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B4F55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const RupeeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B4F55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12M6 8h12M6 13l7.5-7.5M9 13c3.5 0 6-2 6-5s-2.5-5-6-5M9 13l6 8" />
  </svg>
);

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B4F55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const TargetIllustration = () => (
  <div className="relative w-full max-w-[300px] mx-auto flex items-center justify-center">
    <div className="absolute inset-0 bg-teal-50 rounded-full blur-3xl opacity-70"></div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/target.png"
      alt="Target Bullseye"
      className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
    />
  </div>
);

const DottedConnector = () => (
  <div className="hidden lg:block absolute top-[18px] left-0 w-full z-0 pointer-events-none">
    <svg width="100%" height="50" viewBox="0 0 900 50" fill="none" preserveAspectRatio="none">
      {/* Single continuous wavy dotted line from left to right, circles sit on top */}
      <path
        d="M0 25 C 100 5, 200 45, 300 25 C 400 5, 500 45, 600 25 C 700 5, 820 45, 900 25"
        stroke="#0B4F55"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        fill="none"
      />
      {/* Arrow at end */}
      <polygon points="895,20 908,25 895,30" fill="#0B4F55" />
    </svg>
  </div>
);

export default function GoogleAdsIntent() {
  return (
    <section className="py-20 bg-[#fbfdfd] overflow-hidden">
      <Container>
        <div className="flex flex-col xl:flex-row gap-16 lg:gap-12">

          {/* Left Column */}
          <div className="xl:w-[35%] flex flex-col items-start relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#00acc1] font-bold text-xs tracking-widest uppercase">WHY GOOGLE ADS?</span>
              <span className="h-px w-8 bg-[#00acc1]"></span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-[#132a43] leading-[1.1] mb-6 font-serif">
              Your Customers<br />
              Are Searching.<br />
              <span className="text-[#0B4F55]">We Make Sure</span><br />
              <span className="text-[#00acc1]">They Find You.</span>
            </h2>

            <p className="text-slate-600 mb-10 max-w-sm text-sm lg:text-base leading-relaxed">
              Google Ads puts your business in front of people at the exact moment they're ready to take action.
            </p>

            <button className="flex items-center gap-4 text-[#0B4F55] font-bold text-sm tracking-wider uppercase group">
              SEE HOW IT WORKS
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0B4F55] text-white group-hover:bg-[#00acc1] transition-colors">
                <ArrowRight />
              </span>
            </button>

            {/* Illustration */}
            <div className="mt-16 relative w-full flex justify-center lg:justify-start">
              <TargetIllustration />

              {/* Floating Box */}
              <motion.div
                className="absolute right-0 bottom-10 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-4 flex items-center gap-4 max-w-[180px] border border-slate-50 z-20"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-teal-500">
                  <UsersGroupIcon />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium leading-tight mb-0.5">Be the business they choose.</p>
                  <p className="text-[11px] font-bold text-teal-600">Every single time.</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column */}
          <div className="xl:w-[65%] relative z-10 w-full mt-10 xl:mt-0">
            {/* Search Bar Mockup */}
            <div className="w-full max-w-[480px] bg-white rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-slate-200 py-3 px-5 flex items-center justify-between mb-16 xl:mb-20">
              <div className="flex items-center gap-3">
                <Image src="/Google_2015_logo.svg.webp" alt="Google" width={32} height={32} className="object-contain shrink-0" />
                <p className="text-slate-600 text-sm">
                  Someone <span className="font-bold text-[#132a43]">searches</span> on Google...
                </p>
              </div>
              <div className="text-slate-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>

            <div className="relative">
              {/* === ROW 1: Numbered Circles with connector line behind === */}
              <div className="relative hidden lg:flex items-center justify-between mb-4 px-[16.67%]">
                {/* The wavy dotted SVG line - behind circles (z-0) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 600 50" fill="none" preserveAspectRatio="none">
                    {/* Path passes exactly through center of each circle: x=100,300,500 at y=25 */}
                    <path
                      d="M100,25 C 175,50 225,0 300,25 C 375,50 425,0 500,25 L 535,25"
                      stroke="#0B4F55"
                      strokeWidth="1.5"
                      strokeDasharray="5 5"
                      fill="none"
                    />
                    {/* Arrow head at end */}
                    <polygon points="530,20 542,25 530,30" fill="#0B4F55" />
                  </svg>
                </div>

                {/* Circle 01 */}
                <div className="relative z-10 w-9 h-9 rounded-full bg-[#0B4F55] text-white flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">01</div>
                {/* Circle 02 */}
                <div className="relative z-10 w-9 h-9 rounded-full bg-[#34A853] text-white flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">02</div>
                {/* Circle 03 */}
                <div className="relative z-10 w-9 h-9 rounded-full bg-[#673AB7] text-white flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">03</div>
              </div>

              {/* === ROW 2: Images + content grid === */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">

                {/* Step 1 */}
                <div className="flex flex-col items-center bg-transparent group">
                  {/* Mobile only circle */}
                  <div className="relative z-20 mb-4 flex items-center gap-2 lg:hidden">
                    <div className="w-9 h-9 rounded-full bg-[#0B4F55] text-white flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">01</div>
                  </div>
                  <div
                    className="relative w-full overflow-hidden shadow-xl"
                    style={{
                      aspectRatio: '4/3',
                      borderRadius: '20px',
                      transform: 'perspective(900px) rotateY(12deg)',
                      transformStyle: 'preserve-3d',
                      boxShadow: '8px 15px 30px rgba(0,0,0,0.18)'
                    }}
                  >
                    <Image src="/google-ads1.avif" alt="High Intent" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="relative -mt-6 bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center z-10 border border-slate-50">
                    <PhoneIcon />
                  </div>
                  <div className="text-center mt-6">
                    <h3 className="text-lg font-bold text-[#132a43] mb-2">High Intent</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6 max-w-[200px] mx-auto">They are actively looking for a solution like yours.</p>
                    <div className="bg-slate-50 rounded-xl p-4 w-full text-left">
                      <div className="inline-block bg-teal-50 text-teal-600 text-[10px] font-bold px-3 py-1 rounded-full mb-4">Example Searches</div>
                      <ul className="flex flex-col gap-3">
                        {['dentist near me', 'interior designer in delhi', 'erp software for business'].map(q => (
                          <li key={q} className="flex items-center gap-2 text-xs text-slate-600"><SearchIcon />{q}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center bg-transparent group">
                  <div className="relative z-20 mb-4 flex items-center gap-2 lg:hidden">
                    <div className="w-9 h-9 rounded-full bg-[#34A853] text-white flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">02</div>
                  </div>
                  <div
                    className="relative w-full overflow-hidden shadow-xl"
                    style={{
                      aspectRatio: '4/3',
                      borderRadius: '20px',
                      transform: 'perspective(900px) rotateY(12deg)',
                      transformStyle: 'preserve-3d',
                      boxShadow: '8px 15px 30px rgba(0,0,0,0.18)'
                    }}
                  >
                    <Image src="/google-ads2.avif" alt="Decision Intent" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="relative -mt-6 bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center z-10 border border-slate-50">
                    <CalendarIcon />
                  </div>
                  <div className="text-center mt-6">
                    <h3 className="text-lg font-bold text-[#132a43] mb-2">Decision Intent</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6 max-w-[200px] mx-auto">They compare, evaluate and decide.</p>
                    <div className="bg-slate-50 rounded-xl p-4 w-full text-left">
                      <div className="inline-block bg-green-50 text-green-600 text-[10px] font-bold px-3 py-1 rounded-full mb-4">Example Searches</div>
                      <ul className="flex flex-col gap-3">
                        {['best immigration consultant', 'top digital marketing agency', 'compare crm software'].map(q => (
                          <li key={q} className="flex items-center gap-2 text-xs text-slate-600"><SearchIcon />{q}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center bg-transparent group">
                  <div className="relative z-20 mb-4 flex items-center gap-2 lg:hidden">
                    <div className="w-9 h-9 rounded-full bg-[#673AB7] text-white flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">03</div>
                  </div>
                  <div
                    className="relative w-full overflow-hidden shadow-xl"
                    style={{
                      aspectRatio: '4/3',
                      borderRadius: '20px',
                      transform: 'perspective(900px) rotateY(12deg)',
                      transformStyle: 'preserve-3d',
                      boxShadow: '8px 15px 30px rgba(0,0,0,0.18)'
                    }}
                  >
                    <Image src="/google-ads3.avif" alt="Solution Intent" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="relative -mt-6 bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center z-10 border border-slate-50">
                    <ChartIcon />
                  </div>
                  <div className="text-center mt-6">
                    <h3 className="text-lg font-bold text-[#132a43] mb-2">Solution Intent</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6 max-w-[200px] mx-auto">They're ready to take action and invest.</p>
                    <div className="bg-slate-50 rounded-xl p-4 w-full text-left">
                      <div className="inline-block bg-purple-50 text-purple-600 text-[10px] font-bold px-3 py-1 rounded-full mb-4">Example Searches</div>
                      <ul className="flex flex-col gap-3">
                        {['hire interior designer', 'buy crm software', 'google ads expert near me'].map(q => (
                          <li key={q} className="flex items-center gap-2 text-xs text-slate-600"><SearchIcon />{q}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className=" w-full bg-[#0B4F55] rounded-3xl p-8 lg:p-10 flex flex-col xl:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-teal-600/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-800/50 rounded-full blur-3xl pointer-events-none"></div>

          <div className="xl:w-1/3 z-10 text-center xl:text-left">
            <h3 className="text-xl lg:text-2xl font-bold text-white leading-snug">
              When we put your business in front of the <span className="text-[#00acc1]">right person</span>, you get:
            </h3>
          </div>

          <div className="xl:w-2/3 z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <div className="flex flex-col items-center xl:items-start text-center xl:text-left gap-3">
              <div className="w-12 h-12 bg-white text-[#0B4F55] rounded-full flex items-center justify-center shadow-lg">
                <EyeIcon />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">More Visibility</h4>
                <p className="text-teal-100 text-xs leading-relaxed">Show up where your customers are looking.</p>
              </div>
            </div>

            <div className="flex flex-col items-center xl:items-start text-center xl:text-left gap-3">
              <div className="w-12 h-12 bg-white text-[#0B4F55] rounded-full flex items-center justify-center shadow-lg">
                <UsersGroupIcon />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Better Quality Leads</h4>
                <p className="text-teal-100 text-xs leading-relaxed">Attract people who are actually interested.</p>
              </div>
            </div>

            <div className="flex flex-col items-center xl:items-start text-center xl:text-left gap-3">
              <div className="w-12 h-12 bg-white text-[#0B4F55] rounded-full flex items-center justify-center shadow-lg">
                <RupeeIcon />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Higher Conversions</h4>
                <p className="text-teal-100 text-xs leading-relaxed">Turn intent into action and paying customers.</p>
              </div>
            </div>

            <div className="flex flex-col items-center xl:items-start text-center xl:text-left gap-3">
              <div className="w-12 h-12 bg-white text-[#0B4F55] rounded-full flex items-center justify-center shadow-lg">
                <RocketIcon />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Sustainable Growth</h4>
                <p className="text-teal-100 text-xs leading-relaxed">Scale your business with long-term results.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
