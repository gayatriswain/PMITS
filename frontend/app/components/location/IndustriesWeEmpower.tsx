"use client";

import React, { useRef, useEffect, useState } from "react";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const RealEstateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18"></path>
    <path d="M9 8h1"></path>
    <path d="M9 12h1"></path>
    <path d="M9 16h1"></path>
    <path d="M14 8h1"></path>
    <path d="M14 12h1"></path>
    <path d="M14 16h1"></path>
    <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
  </svg>
);

const EducationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
  </svg>
);

const HealthcareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    <path d="M12 8v4"></path>
    <path d="M10 10h4"></path>
  </svg>
);

const ManufacturingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 22 1-5-1-5 1-5-1-5h16l-1 5 1 5-1 5 1 5z"></path>
    <path d="M14 8h-4v8h4"></path>
    <path d="M4 17v-8"></path>
    <path d="M10 17v-5"></path>
    <path d="M20 17v-8"></path>
  </svg>
);

const ITTechIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

const RetailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const industries__cms = [
  {
    title: "Real Estate",
    description: "High-performing websites that generate quality leads and close more deals.",
    icon: RealEstateIcon,
  },
  {
    title: "Education",
    description: "Digital experiences that attract & engage students and parents.",
    icon: EducationIcon,
  },
  {
    title: "Healthcare",
    description: "Patient-centric websites that build trust and improve engagement.",
    icon: HealthcareIcon,
  },
  {
    title: "Manufacturing",
    description: "Industrial websites that drive B2B inquiries and global growth.",
    icon: ManufacturingIcon,
  },
  {
    title: "IT & Technology",
    description: "Solutions for tech brands that scale globally and stand out online.",
    icon: ITTechIcon,
  },
  {
    title: "Retail & E-commerce",
    description: "Online stores built to sell more, every day.",
    icon: RetailIcon,
  },
];



export default function IndustriesWeEmpower() {
  const $t = useCmsText();
  const industries = useCmsData("IndustriesWeEmpower__industries", industries__cms);
  const extendedIndustries = Array(20).fill(industries).flat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        // If we are at the end, scroll back to start
        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll one card width + gap. 
          const firstChild = scrollRef.current.firstElementChild as HTMLElement;
          const cardWidth = firstChild ? firstChild.offsetWidth + 24 : 300;
          scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth + 24 : 300;
      scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth + 24 : 300;
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-white">

      <div className="relative z-10 mx-auto w-full max-w-[1640px] px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h4 className="text-[#0D9488] font-bold tracking-widest text-xs sm:text-sm uppercase mb-3">{html($t("IndustriesWeEmpower__t1", "INDUSTRIES WE EMPOWER"))}</h4>
            <h2 className="text-h2 font-extrabold text-[#0F172A] mb-4 font-serif">{rich($t("IndustriesWeEmpower__t2m", "Helping Businesses Across <br class=\"hidden md:block\"> Every Industry <span class=\"text-[#0D9488]\">in Noida</span>"))}</h2>
            <p className="text-body text-gray-600 max-w-md">
              {rich($t("IndustriesWeEmpower__t5", "We create customized digital solutions for businesses of all sizes and industries."))}</p>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            <button 
              onClick={handlePrev} 
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:border-[#0D9488] hover:text-[#0D9488] transition-colors shadow-sm"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button 
              onClick={handleNext} 
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0D9488] text-white hover:bg-teal-700 transition-colors shadow-sm"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide pb-8 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {extendedIndustries.map((item, idx) => (
            <div 
              key={idx} 
              className="w-[280px] sm:w-[320px] md:w-[350px] xl:w-[calc(20%-1.2rem)] shrink-0 snap-start bg-white rounded-xl p-5 border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 shrink-0 rounded-lg bg-[#F4F8F9] flex items-center justify-center text-[#0D9488]">
                  <item.icon />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">{item.title}</h3>
              </div>
              <p className="text-small text-gray-500 mb-8 flex-grow">
                {item.description}
              </p>
              <div className="w-8 h-1 bg-[#0D9488] rounded-full mt-auto"></div>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: $t("IndustriesWeEmpower__t6", `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `)}} />
    </section>
  );
}
