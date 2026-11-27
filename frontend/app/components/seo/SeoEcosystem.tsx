"use client";

import React from "react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import Link from "next/link";
import { html, rich } from "@/components/cms/rich";

const orbitNodes__cms = [
  {
    id: "google-search",
    title: "Google Search",
    desc: "Rank higher in search results when customers look for solutions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    posClasses: "md:top-[18%] md:left-[28%]",
    pos: { top: "18%", left: "28%" },
    innerPos: { top: "31.9%", left: "37.6%" }
  },
  {
    id: "ai-overviews",
    title: "AI Overviews & Assistants",
    desc: "Be recommended by AI when users ask questions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" fill="#e8f0fe"/>
      </svg>
    ),
    posClasses: "md:top-[18%] md:left-[72%]",
    pos: { top: "18%", left: "72%" },
    innerPos: { top: "31.9%", left: "62.4%" }
  },
  {
    id: "google-maps",
    title: "Google Maps",
    desc: "Show up in local searches and get more calls, visits.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 2c-3.86 0-7 3.14-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EA4335"/>
        <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#34A853" clipPath="inset(0 0 50% 50%)"/>
        <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FBBC05" clipPath="inset(50% 50% 0 0)"/>
        <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#4285F4" clipPath="inset(0 50% 50% 0)"/>
      </svg>
    ),
    posClasses: "md:top-[42%] md:left-[12%]",
    pos: { top: "42%", left: "12%" },
    innerPos: { top: "45.5%", left: "28.5%" }
  },
  {
    id: "images",
    title: "Images",
    desc: "Be discovered in image searches and drive high-intent traffic.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="#e8f0fe"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="#4285F4"/>
        <polyline points="21 15 16 10 5 21" fill="#e8f0fe"/>
      </svg>
    ),
    posClasses: "md:top-[42%] md:left-[88%]",
    pos: { top: "42%", left: "88%" },
    innerPos: { top: "45.5%", left: "71.5%" }
  },
  {
    id: "reviews",
    title: "Reviews",
    desc: "Build trust with strong reviews that influence decisions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#FBBC05" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    posClasses: "md:top-[58%] md:left-[12%]",
    pos: { top: "58%", left: "12%" },
    innerPos: { top: "54.5%", left: "28.5%" }
  },
  {
    id: "videos",
    title: "Videos",
    desc: "Attract attention with videos that showcase your work and expertise.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3" fill="#fce8e6"/>
        <polygon points="10 9 15 12 10 15 10 9" fill="#EA4335" />
      </svg>
    ),
    posClasses: "md:top-[58%] md:left-[88%]",
    pos: { top: "58%", left: "88%" },
    innerPos: { top: "54.5%", left: "71.5%" }
  },
  {
    id: "paa",
    title: "People Also Ask",
    desc: "Appear in relevant questions and become the helpful answer.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#4285F4" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="8" cy="10" r="1" fill="#fff" stroke="#fff" />
        <circle cx="12" cy="10" r="1" fill="#fff" stroke="#fff" />
        <circle cx="16" cy="10" r="1" fill="#fff" stroke="#fff" />
      </svg>
    ),
    posClasses: "md:top-[82%] md:left-[28%]",
    pos: { top: "82%", left: "28%" },
    innerPos: { top: "68.1%", left: "37.6%" }
  },
  {
    id: "snippets",
    title: "Featured Snippets",
    desc: "Get the top spot and stand out above your competitors.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#FBBC05" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15 8 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 8 12 2" />
        <path d="M6 21l3-8 3 8" fill="#fff" stroke="#fff" />
      </svg>
    ),
    posClasses: "md:top-[82%] md:left-[72%]",
    pos: { top: "82%", left: "72%" },
    innerPos: { top: "68.1%", left: "62.4%" }
  }
];

export default function SeoEcosystem() {
  const $t = useCmsText();
  const orbitNodes = useCmsData("SeoEcosystem__orbitNodes", orbitNodes__cms);
  return (
    <section className="relative   bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          
          {/* Left Content */}
          <div className="w-full lg:w-[35%] flex flex-col items-start relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span className="text-[10px] lg:text-[11px] font-bold tracking-[0.15em] text-teal-700 uppercase">
                {html($t("SeoEcosystem__t1", "THE MODERN SEARCH ECOSYSTEM"))}</span>
            </div>
            
            <h2 className="text-h2 font-serif font-bold text-[#132a43] mb-6">{rich($t("SeoEcosystem__t2m", "Your Customers<br>Search<br><span class=\"text-[#0f5c56]\">Everywhere.</span>"))}</h2>
            
            <p className="text-body text-slate-500 mb-8 max-w-md">{rich($t("SeoEcosystem__t5m", "Search is no longer limited to Google. Your customers discover, compare and decide across multiple platforms and touchpoints. We make sure your business shows up in <strong class=\"text-[#0f5c56] font-semibold\">all the places that matter.</strong>"))}</p>
            
            <Link href={$t("SeoEcosystem__u1", "/contact")} className="px-6 py-3.5 bg-[#0f5c56] hover:bg-[#0b423d] text-white font-medium text-[14px] rounded-lg transition-colors flex items-center justify-center gap-2 mb-10">
              {$t("SeoEcosystem__t7", "We Put You Everywhere")}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            {/* Stats Info Box */}
            <div className="bg-[#f8fafc] rounded-2xl p-5 border border-slate-100 flex items-start gap-4 max-w-sm">
              <div className="w-10 h-10 rounded-full bg-teal-100/50 flex items-center justify-center text-teal-600 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                  <line x1="2" y1="22" x2="22" y2="22" stroke="#cbd5e1" />
                  <line x1="2" y1="2" x2="2" y2="22" stroke="#cbd5e1" />
                  <rect x="19" y="10" width="2" height="12" fill="currentColor" stroke="none"/>
                  <rect x="14" y="16" width="2" height="6" fill="currentColor" stroke="none"/>
                  <rect x="9" y="12" width="2" height="10" fill="currentColor" stroke="none"/>
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-slate-500 leading-snug mb-1">
                  {rich($t("SeoEcosystem__t8", "Businesses that appear across multiple search touchpoints get up to"))}</p>
                <div className="text-[16px] font-bold text-[#0f5c56] mb-1">
                  {html($t("SeoEcosystem__t9", "2.7X More Customers"))}</div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {rich($t("SeoEcosystem__t10", "than those that don't."))}</p>
              </div>
            </div>
          </div>

          {/* Right Diagram */}
          <div className="w-full lg:w-[65%] flex justify-center items-center relative min-h-[600px] lg:min-h-[700px]">
            
            {/* The Connecting Lines SVG Background */}
            <div className="absolute inset-0 z-0 pointer-events-none hidden md:flex justify-center items-center">
               <div className="w-full max-w-[800px] aspect-square relative">
                 <svg className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                        <stop offset="40%" stopColor="#14b8a6" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    
                    {/* Glowing Center Aura */}
                    <circle cx="50%" cy="50%" r="35%" fill="url(#centerGlow)" />

                    {/* Outer Rings */}
                    <circle cx="50%" cy="50%" r="25%" fill="none" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="6 6" />
                    <circle cx="50%" cy="50%" r="22%" fill="none" stroke="#14b8a6" strokeWidth="2" strokeOpacity="0.25" />
                    <circle cx="50%" cy="50%" r="19%" fill="none" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                    
                    {/* Spokes and Connection Dots */}
                    {orbitNodes.map((node, i) => (
                      <g key={i}>
                        <line x1={node.innerPos.left} y1={node.innerPos.top} x2={node.pos.left} y2={node.pos.top} stroke="#14b8a6" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 4" />
                        {/* Inner Dot on the ring */}
                        <circle cx={node.innerPos.left} cy={node.innerPos.top} r="8" fill="#fff" />
                        <circle cx={node.innerPos.left} cy={node.innerPos.top} r="3.5" fill="#14b8a6" />
                        {/* Outer Dot at the card */}
                        <circle cx={node.pos.left} cy={node.pos.top} r="3.5" fill="#14b8a6" />
                      </g>
                    ))}
                 </svg>
               </div>
            </div>

            {/* The Orbit Cards (Desktop: Absolute, Mobile: Grid) */}
            <div className="w-full max-w-[800px] md:aspect-square relative z-10 flex flex-col md:block gap-4 mt-8 md:mt-0">
              <style dangerouslySetInnerHTML={{__html: $t("SeoEcosystem__t11", `
                @media (min-width: 768px) {
                  .orbit-node-0 { top: 18%; left: 28%; }
                  .orbit-node-1 { top: 18%; left: 72%; }
                  .orbit-node-2 { top: 42%; left: 12%; }
                  .orbit-node-3 { top: 42%; left: 88%; }
                  .orbit-node-4 { top: 58%; left: 12%; }
                  .orbit-node-5 { top: 58%; left: 88%; }
                  .orbit-node-6 { top: 82%; left: 28%; }
                  .orbit-node-7 { top: 82%; left: 72%; }
                }
              `)}} />
              
              {orbitNodes.map((node, i) => (
                <div 
                  key={node.id}
                  className={`md:absolute orbit-node-${i} bg-white rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-50 flex items-start gap-3 w-full md:w-[220px] md:-translate-x-1/2 md:-translate-y-1/2 z-10`}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
                    {node.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[13px] font-bold text-[#132a43] mb-1 leading-tight">{node.title}</h4>
                    <p className="text-[10.5px] text-slate-500 leading-snug">{node.desc}</p>
                    <div className="w-6 h-0.5 bg-[#14b8a6] mt-2.5" />
                  </div>
                </div>
              ))}

              {/* Center Hub */}
              <div className="md:absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20 mt-8 md:mt-0 w-full md:w-[280px]">
                <div className="bg-white rounded-full p-6 shadow-[0_10px_40px_rgba(20,184,166,0.1)] border-4 border-white aspect-square flex flex-col items-center justify-center relative group mx-auto max-w-[280px]">
                  {/* Subtle pulsing background */}
                  <div className="absolute inset-0 rounded-full bg-teal-500/10 animate-ping opacity-40" />
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1)_0%,rgba(255,255,255,0)_70%)]" />

                  
                  {/* Building/House SVG Placeholder */}
                  <div className="w-24 h-24 mb-4 relative z-10 drop-shadow-md">
                     <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 50L50 20L90 50V90H10V50Z" fill="#1e293b"/>
                        <path d="M50 20L90 50V90H50V20Z" fill="#0f172a"/>
                        <rect x="25" y="45" width="15" height="15" fill="#38bdf8"/>
                        <rect x="60" y="45" width="15" height="15" fill="#38bdf8"/>
                        <rect x="25" y="65" width="15" height="15" fill="#38bdf8"/>
                        <rect x="60" y="65" width="15" height="15" fill="#38bdf8"/>
                        <rect x="42" y="70" width="16" height="20" fill="#e2e8f0"/>
                        <path d="M5 50L50 15L95 50" stroke="#475569" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </div>
                  
                  <h3 className="text-[18px] font-bold text-[#132a43] mb-1 relative z-10 text-center uppercase tracking-wide">
                    {html($t("SeoEcosystem__t12", "Your Business"))}</h3>
                  <p className="text-[11px] font-bold text-[#14b8a6] mb-2 relative z-10">
                    {rich($t("SeoEcosystem__t13", "Visible. Trusted. Chosen."))}</p>
                  
                  <div className="flex gap-1 relative z-10">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
