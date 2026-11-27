"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";
import { useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

export default function RecentSuccessStories() {
  const $t = useCmsText();
  const caseStudies = [
    {
      theme: "light-blue",
      badgeIcon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          <path d="M12 8v4"></path>
          <path d="M10 10h4"></path>
        </svg>
      ),
      badgeText: $t("RecentSuccessStories__t1", "Healthcare"),
      badgeColor: "text-orange-500",
      badgeBg: "bg-white",
      title: $t("RecentSuccessStories__t2", "CarePlus Hospital"),
      subtitle: $t("RecentSuccessStories__t3", "Website Design & SEO"),
      stats: [
        { value: $t("RecentSuccessStories__t4", "+220%"), label: $t("RecentSuccessStories__t5", "Organic Traffic") },
        { value: $t("RecentSuccessStories__t6", "+140%"), label: $t("RecentSuccessStories__t7", "Appointment Bookings") }
      ],
      bgClass: "bg-[#F8FAFC]",
      textColor: "text-[#0F172A]",
      subtextColor: "text-slate-500",
      statsColor: "text-[#0D9488]",
      dividerClass: "bg-slate-200",
    },
    {
      theme: "dark",
      badgeIcon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18"></path>
          <path d="M9 8h1"></path>
          <path d="M9 12h1"></path>
          <path d="M9 16h1"></path>
          <path d="M14 8h1"></path>
          <path d="M14 12h1"></path>
          <path d="M14 16h1"></path>
          <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
        </svg>
      ),
      badgeText: $t("RecentSuccessStories__t8", "Real Estate"),
      badgeColor: "text-teal-400",
      badgeBg: "bg-white/10",
      title: $t("RecentSuccessStories__t9", "Urban Space"),
      subtitle: $t("RecentSuccessStories__t10", "WordPress Development"),
      stats: [
        { value: $t("RecentSuccessStories__t11", "+127%"), label: $t("RecentSuccessStories__t12", "Organic Traffic") },
        { value: $t("RecentSuccessStories__t13", "+115%"), label: $t("RecentSuccessStories__t14", "Leads Generated") }
      ],
      bgClass: "bg-[#253741]",
      textColor: "text-white",
      subtextColor: "text-slate-300",
      statsColor: "text-white",
      dividerClass: "bg-white/20",
    },
    {
      theme: "light-orange",
      badgeIcon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      ),
      badgeText: $t("RecentSuccessStories__t15", "Education"),
      badgeColor: "text-orange-500",
      badgeBg: "bg-white",
      title: $t("RecentSuccessStories__t16", "EduBright Academy"),
      subtitle: $t("RecentSuccessStories__t17", "Website Design & SEO"),
      stats: [
        { value: $t("RecentSuccessStories__t18", "+200%"), label: $t("RecentSuccessStories__t19", "Organic Traffic") },
        { value: $t("RecentSuccessStories__t20", "+150%"), label: $t("RecentSuccessStories__t21", "Enquiries") }
      ],
      bgClass: "bg-[#FFF9F3]",
      textColor: "text-[#0F172A]",
      subtextColor: "text-slate-500",
      statsColor: "text-[#0D9488]",
      dividerClass: "bg-slate-200",
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <Container>
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 relative z-10">
          <div>
            <h4 className="text-[#0D9488] font-bold tracking-widest text-sm uppercase mb-4">{html($t("RecentSuccessStories__t22", "RECENT SUCCESS STORIES"))}</h4>
            <h2 className="text-h2 font-extrabold text-[#0F172A] font-serif">{rich($t("RecentSuccessStories__t23m", "Real Results. Real Impact. <br> For <span class=\"text-[#0D9488]\">Noida</span> Businesses."))}</h2>
            <div className="w-12 h-1 bg-[#0D9488] mt-6"></div>
          </div>
          <Link href={$t("RecentSuccessStories__t27", "/testimonials")} className="hidden md:inline-flex items-center gap-2 font-bold text-[#0D9488] hover:text-teal-800 transition-colors mt-6 md:mt-0">
            {$t("RecentSuccessStories__t28", "View All Case Studies")}<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, idx) => (
            <div 
              key={idx} 
              className={`relative overflow-hidden rounded-3xl ${study.bgClass} flex flex-row items-center p-5 group shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100/60`}
            >
              {/* Card Content Top */}
              <div className="relative z-20 flex flex-col w-[42%] pr-2">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${study.badgeBg} self-start mb-2`}>
                  <span className={study.badgeColor}>{study.badgeIcon}</span>
                  <span className={`text-[9px] font-bold ${study.textColor}`}>{study.badgeText}</span>
                </div>
                
                <h3 className={`text-base xl:text-lg font-bold mb-1 ${study.textColor}`}>{study.title}</h3>
                <p className={`text-[9px] xl:text-[10px] font-medium mb-3 ${study.subtextColor}`}>{study.subtitle}</p>
                
                {/* Stats Row */}
                <div className="flex gap-3 mb-3">
                  {study.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="flex flex-col gap-1">
                      <span className={`text-base xl:text-lg font-extrabold ${study.statsColor}`}>{stat.value}</span>
                      <span className={`text-[8px] xl:text-[9px] font-medium leading-tight ${study.textColor}`}>{stat.label}</span>
                    </div>
                  ))}
                </div>

                <Link href={$t("RecentSuccessStories__u1", "/testimonials")} className={`inline-flex items-center gap-1.5 text-[10px] xl:text-[11px] font-bold ${study.textColor} hover:opacity-70 transition-opacity mt-auto pb-1`}>
                  {$t("RecentSuccessStories__t29", "View Case Study")}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>

              {/* Image Container */}
              <div className="relative z-10 w-[58%] flex items-center justify-end pl-2">
                <img 
                  src={$t("RecentSuccessStories__t30", "/website1.webp")} 
                  alt={study.title} 
                  className="max-w-full max-h-full w-auto h-auto rounded-xl shadow-lg border border-black/5 group-hover:-translate-y-1 transition-transform duration-500 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Link */}
        <div className="mt-8 flex justify-center md:hidden">
           <Link href={$t("RecentSuccessStories__t31", "/testimonials")} className="inline-flex items-center gap-2 font-bold text-[#0D9488] hover:text-teal-800 transition-colors">
            {$t("RecentSuccessStories__t32", "View All Case Studies")}<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
