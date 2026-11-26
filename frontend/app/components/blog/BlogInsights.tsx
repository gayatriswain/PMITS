"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Sparkles, ShoppingCart, MapPin, Search, CheckCircle, ChevronRight, Telescope } from 'lucide-react';
import Image from 'next/image';
import { useCmsText } from "@/components/cms/SectionContent";
import Link from "next/link";
import { rich } from "@/components/cms/rich";

export default function BlogInsights() {
  const $t = useCmsText();
  const smallCards = [
    {
      tag: $t("BlogInsights__t1", "AI & GEO"),
      title: $t("BlogInsights__t2", "GEO vs SEO: What's the Difference and Why It Matters Now"),
      date: $t("BlogInsights__t3", "May 16, 2026"),
      readTime: $t("BlogInsights__t4", "6 min read"),
      image: $t("BlogInsights__t5", "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop") // AI chip abstract
    },
    {
      tag: $t("BlogInsights__t6", "Ecommerce"),
      title: $t("BlogInsights__t7", "Product Page SEO: The Complete Optimization Checklist"),
      date: $t("BlogInsights__t8", "May 15, 2026"),
      readTime: $t("BlogInsights__t9", "5 min read"),
      image: $t("BlogInsights__t10", "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600&auto=format&fit=crop") // Ecommerce cart
    },
    {
      tag: $t("BlogInsights__t11", "Local SEO"),
      title: $t("BlogInsights__t12", "Local SEO for Ecommerce Brands: Rank Locally, Sell Globally"),
      date: $t("BlogInsights__t13", "May 12, 2026"),
      readTime: $t("BlogInsights__t14", "6 min read"),
      image: $t("BlogInsights__t15", "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop") // Map abstract
    },
    {
      tag: $t("BlogInsights__t16", "Web & UX"),
      title: $t("BlogInsights__t17", "Core Web Vitals & SEO: The Real Impact on Rankings"),
      date: $t("BlogInsights__t18", "May 10, 2026"),
      readTime: $t("BlogInsights__t19", "7 min read"),
      image: $t("BlogInsights__t20", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop") // Speed/data abstract
    },
    {
      tag: $t("BlogInsights__t21", "Digital Growth"),
      title: $t("BlogInsights__t22", "From Traffic to Revenue: Building a Growth System That Scales"),
      date: $t("BlogInsights__t23", "May 8, 2026"),
      readTime: $t("BlogInsights__t24", "8 min read"),
      image: $t("BlogInsights__t25", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop") // Chart upward
    },
    {
      tag: $t("BlogInsights__t26", "SEO"),
      title: $t("BlogInsights__t27", "Ecommerce SEO in 2026: 10 Strategies That Actually Drive Growth"),
      date: $t("BlogInsights__t28", "May 6, 2026"),
      readTime: $t("BlogInsights__t29", "7 min read"),
      image: $t("BlogInsights__t30", "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=600&auto=format&fit=crop") // Laptop dashboard
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#fafdfc] font-sans">
      <div className="max-w-[1640px] mx-auto px-5">
        
        {/* Title */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-[1px] bg-gradient-to-r from-transparent to-teal-200 w-16 md:w-32"></div>
          <span className="text-[#0f766e] text-[11px] font-extrabold tracking-[0.2em] uppercase">{$t("BlogInsights__t31", "Explore Insights by Topic")}</span>
          <div className="h-[1px] bg-gradient-to-l from-transparent to-teal-200 w-16 md:w-32"></div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
          
          {/* Left Large Card (Spans 5 cols on XL screens) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="xl:col-span-5 bg-[#eef8f6] rounded-[24px] p-8 md:p-10 relative overflow-hidden border border-[#dcf0ed] flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Background Image Container - specifically placed to not muddy the text */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[24px]">
              {/* Strong fade gradients to smoothly blend image into the solid background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#eef8f6] from-40% via-[#eef8f6]/90 via-60% to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#eef8f6] from-10% via-transparent to-transparent z-10"></div>
              
              <img 
                src={$t("BlogInsights__t32", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop")} 
                alt={$t("BlogInsights__t33", "Background Chart")} 
                className="w-full h-full object-cover object-right-bottom opacity-[0.15] mix-blend-multiply group-hover:scale-105 group-hover:opacity-[0.2] transition-all duration-700 grayscale origin-bottom-right" 
              />
            </div>

            <div className="relative z-10">
              <div className="bg-white/80 backdrop-blur-sm border border-teal-100 text-[#0f766e] text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-6 shadow-sm">
                <Sparkles size={12} className="text-[#14b8a6]" />
                {$t("BlogInsights__t34", "Featured Insight")}</div>

              <h3 className="text-h3 font-extrabold text-[#0f2923] mb-5 tracking-tight max-w-[90%]">
                {$t("BlogInsights__t35", "The Search Is Changing. Is Your Business Ready?")}</h3>
              
              <p className="text-body text-slate-600 mb-8 max-w-[85%] relative z-10">
                {rich($t("BlogInsights__t36", "AI search, evolving SERPs, and changing user behavior are reshaping how businesses get discovered online."))}</p>

              <div className="flex items-center gap-6 text-xs text-slate-500 font-medium mb-10 relative z-10">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-slate-400" />
                  {$t("BlogInsights__t37", "May 20, 2026")}</div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" />
                  {$t("BlogInsights__t38", "8 min read")}</div>
                <div className="flex items-center gap-2 border-l border-slate-200 pl-6 hidden sm:flex">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border border-white bg-slate-200 overflow-hidden"><img src={$t("BlogInsights__t39", "https://i.pravatar.cc/100?img=11")} alt={$t("BlogInsights__t40", "Avatar")} /></div>
                    <div className="w-6 h-6 rounded-full border border-white bg-slate-300 overflow-hidden"><img src={$t("BlogInsights__t41", "https://i.pravatar.cc/100?img=12")} alt={$t("BlogInsights__t42", "Avatar")} /></div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">{$t("BlogInsights__t43", "ProManage Team")}</span>
                </div>
              </div>

              <Link href={$t("BlogInsights__u1", "#all-articles")} className="bg-[#1b7367] hover:bg-[#155a51] text-white px-6 py-3 rounded-lg text-[15px] font-serif font-bold flex items-center gap-2 transition-all relative z-10 shadow-md">
                {$t("BlogInsights__t44", "Read the Insight ")}<ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Right Small Cards Grid (Spans 7 cols on XL screens) */}
          <div className="xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {smallCards.map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden group hover:shadow-[0_8px_30px_rgba(15,118,110,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image Box */}
                <div className="relative h-[140px] w-full overflow-hidden bg-slate-100">
                  <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-[#0f2923] text-[9px] font-extrabold px-2.5 py-1 rounded-md shadow-sm">
                    {card.tag}
                  </div>
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none"></div>
                </div>
                
                {/* Content Box */}
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="text-[14px] font-bold text-[#0f2923] leading-snug mb-4 group-hover:text-[#0f766e] transition-colors line-clamp-2">
                    {card.title}
                  </h4>
                  
                  <div className="mt-auto flex items-center gap-4 text-[11px] text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-slate-400" />
                      {card.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-slate-400" />
                      {card.readTime}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Bottom Horizontal Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 md:p-8 lg:p-10 lg:pr-[220px] flex flex-col lg:flex-row items-center justify-between relative overflow-hidden gap-8"
        >
          {/* Left Text */}
          <div className="w-full lg:w-1/4 relative z-10 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-100 pb-8 lg:pb-0 lg:pr-8">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <span className="text-[#0f766e] text-[9px] font-extrabold uppercase tracking-widest">{$t("BlogInsights__t45", "What's Changing Right Now")}</span>
              <div className="h-[1px] bg-teal-100 w-8 hidden md:block"></div>
            </div>
            <h3 className="text-h4 font-extrabold text-[#0f2923] mb-3">
              {$t("BlogInsights__t46", "Stay Ahead of")}<br/>{$t("BlogInsights__t47", "What's Next.")}</h3>
            <p className="text-small text-slate-500 mb-4">
              {rich($t("BlogInsights__t48", "Key shifts in search and digital that you should know."))}</p>
            {/* Scribble underline graphic (css fallback) */}
            <svg width="60" height="12" viewBox="0 0 60 12" fill="none" className="mx-auto lg:mx-0 text-[#14b8a6]">
              <path d="M2 9.5C15.5 3.5 25.5 1.5 40 4.5C48 6.155 52 8.5 58 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          {/* 4 Feature Columns */}
          <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-slate-100 relative z-10 px-4">
            
            {/* Col 1 */}
            <div className="flex flex-col items-center text-center group cursor-pointer lg:px-6">
              <div className="w-16 h-16 rounded-full bg-[#f4fcfb] flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 10 L32 18 M32 46 L32 54 M10 32 L18 32 M46 32 L54 32 M16 16 L22 22 M42 42 L48 48 M16 48 L22 42 M42 22 L48 16" stroke="#dcf0ed" strokeWidth="1"/>
                  <circle cx="15" cy="32" r="1.5" fill="#14b8a6"/>
                  <circle cx="49" cy="32" r="1.5" fill="#14b8a6"/>
                  <circle cx="20" cy="19" r="1.5" fill="#14b8a6"/>
                  <circle cx="44" cy="45" r="1.5" fill="#14b8a6"/>
                  <path d="M42 30c0 5.523-4.477 10-10 10a9.96 9.96 0 0 1-4.7-1.173L22 40l1.173-5.3A9.96 9.96 0 0 1 22 30c0-5.523 4.477-10 10-10s10 4.477 10 10z" stroke="#0f2923" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <text x="32" y="34.5" fontFamily="sans-serif" fontSize="11" fontWeight="800" fill="#0f2923" textAnchor="middle">{$t("BlogInsights__t49", "AI")}</text>
                </svg>
              </div>
              <h5 className="text-[13px] font-extrabold text-[#0f2923] mb-2 tracking-tight">{$t("BlogInsights__t50", "AI Search & Overviews")}</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{rich($t("BlogInsights__t51", "AI Overviews, SGE and conversational search are here to stay."))}</p>
              <div className="text-[10px] font-bold text-[#0f766e] flex items-center gap-1 group-hover:gap-2 transition-all">{$t("BlogInsights__t52", "8 New Articles ")}<ArrowRight size={12}/></div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col items-center text-center group cursor-pointer lg:px-6">
              <div className="w-16 h-16 rounded-full bg-[#f4fcfb] flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="bagGrad" x1="20" y1="26" x2="44" y2="48" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#0d625b" />
                    </linearGradient>
                  </defs>
                  <path d="M32 10 L32 18 M32 46 L32 54 M10 32 L18 32 M46 32 L54 32" stroke="#dcf0ed" strokeWidth="1"/>
                  <path d="M26 26V20a6 6 0 0 1 12 0v6" stroke="#0d625b" strokeWidth="2.5" strokeLinecap="round"/>
                  <rect x="20" y="26" width="24" height="22" rx="3" fill="url(#bagGrad)"/>
                  <path d="M32 33v8M28 37h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h5 className="text-[13px] font-extrabold text-[#0f2923] mb-2 tracking-tight">{$t("BlogInsights__t53", "Ecommerce Discovery")}</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{rich($t("BlogInsights__t54", "Product discovery is evolving beyond the traditional search box."))}</p>
              <div className="text-[10px] font-bold text-[#0f766e] flex items-center gap-1 group-hover:gap-2 transition-all">{$t("BlogInsights__t55", "12 New Articles ")}<ArrowRight size={12}/></div>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col items-center text-center group cursor-pointer lg:px-6">
              <div className="w-16 h-16 rounded-full bg-[#f4fcfb] flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 10 L32 18 M32 46 L32 54 M10 32 L18 32 M46 32 L54 32" stroke="#dcf0ed" strokeWidth="1"/>
                  <g transform="translate(20, 20) scale(1)">
                     <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                     <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                     <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                     <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </g>
                </svg>
              </div>
              <h5 className="text-[13px] font-extrabold text-[#0f2923] mb-2 tracking-tight">{$t("BlogInsights__t56", "Google Updates")}</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{rich($t("BlogInsights__t57", "Core updates, spam updates and ranking changes explained."))}</p>
              <div className="text-[10px] font-bold text-[#0f766e] flex items-center gap-1 group-hover:gap-2 transition-all">{$t("BlogInsights__t58", "15 New Articles ")}<ArrowRight size={12}/></div>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col items-center text-center group cursor-pointer lg:px-6">
              <div className="w-16 h-16 rounded-full bg-[#f4fcfb] flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="pinGrad" x1="32" y1="16" x2="32" y2="48" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#093f3a" />
                    </linearGradient>
                  </defs>
                  <path d="M32 10 L32 18 M32 46 L32 54 M10 32 L18 32 M46 32 L54 32" stroke="#dcf0ed" strokeWidth="1"/>
                  <ellipse cx="32" cy="46" rx="6" ry="2.5" fill="rgba(0,0,0,0.15)"/>
                  <path d="M32 16c-6.627 0-12 5.373-12 12 0 8 12 18 12 18s12-10 12-18c0-6.627-5.373-12-12-12z" fill="url(#pinGrad)"/>
                  <circle cx="32" cy="28" r="4.5" fill="#f4fcfb"/>
                </svg>
              </div>
              <h5 className="text-[13px] font-extrabold text-[#0f2923] mb-2 tracking-tight">{$t("BlogInsights__t59", "Local Visibility")}</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{rich($t("BlogInsights__t60", "Maps, reviews and local packs—opportunities you can't miss."))}</p>
              <div className="text-[10px] font-bold text-[#0f766e] flex items-center gap-1 group-hover:gap-2 transition-all">{$t("BlogInsights__t61", "9 New Articles ")}<ArrowRight size={12}/></div>
            </div>

          </div>

          {/* Right Edge Telescope Graphic */}
          <div className="absolute right-[-20px] bottom-0 w-[180px] lg:w-[240px] pointer-events-none hidden lg:block z-0 mix-blend-multiply">
            <img 
              src={$t("BlogInsights__t62", "/blog3.webp")} 
              alt={$t("BlogInsights__t63", "Telescope")} 
              className="w-full h-auto object-contain object-right-bottom drop-shadow-xl"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

        </motion.div>

      </div>
    </section>
  );
}
