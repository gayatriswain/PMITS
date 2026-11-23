"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";

/* =========================================================================
   OUR WORK DATA (Coverflow carousel + filter tabs)
   ========================================================================= */

type WorkFilter =
  | "All Work"
  | "Animation"
  | "Graphic Design"
  | "Branding"
  | "Packaging"
  | "UI Motion"
  | "Social Media";

interface WorkItem {
  id: string;
  category: string;
  categoryColor: string;
  filter: Exclude<WorkFilter, "All Work">;
  title: string;
  description: string;
  image: string;
  video?: string;
}

const workFilters: WorkFilter[] = [
  "All Work",
  "Animation",
  "Graphic Design",
  "Branding",
  "Packaging",
  "UI Motion",
  "Social Media",
];

const workItems: WorkItem[] = [
  {
    id: "saas-explainer",
    category: "2D Animation",
    categoryColor: "text-[#0d9488]",
    filter: "Animation",
    title: "SaaS Product Explainer",
    description: "Simplifying a complex product with storytelling and motion.",
    image: "/explainer-character-showcase.jpg",
    video: "/video1.mp4",
  },
  {
    id: "naturova-tea",
    category: "Packaging Design",
    categoryColor: "text-[#0d9488]",
    filter: "Packaging",
    title: "Naturova Tea Packaging",
    description: "Premium packaging that reflects purity, nature and trust.",
    image: "/herbal-tea-packaging.jpg",
  },
  {
    id: "ev-charger",
    category: "3D Animation",
    categoryColor: "text-[#0d9488]",
    filter: "Animation",
    title: "EV Charger Explainer Animation",
    description: "Explaining next-gen EV charging with engaging 3D visuals.",
    image: "/ev-charger-showcase.jpg",
    video: "/video2.mp4",
  },
  {
    id: "verdant-branding",
    category: "Brand Identity",
    categoryColor: "text-[#0d9488]",
    filter: "Branding",
    title: "Verdant Realty Branding",
    description: "A complete brand identity that stands out and stays remembered.",
    image: "/verdant-branding-showcase.jpg",
  },
  {
    id: "sneaker-social",
    category: "Social Media Design",
    categoryColor: "text-[#db2777]",
    filter: "Social Media",
    title: "Social Media Campaign",
    description: "Scroll-stopping designs that drive engagement.",
    image: "/sneaker-mobile-showcase.jpg",
  },
  {
    id: "dashboard-motion",
    category: "UI Motion",
    categoryColor: "text-[#7c3aed]",
    filter: "UI Motion",
    title: "Analytics Dashboard Motion",
    description: "Fluid micro-interactions that bring data to life.",
    image: "/saas-dashboard-showcase.jpg",
    video: "/video3.mp4",
  },
  {
    id: "amethyst-kit",
    category: "Graphic Design",
    categoryColor: "text-[#7c3aed]",
    filter: "Graphic Design",
    title: "Amethyst Brand Kit",
    description: "Stationery, merch and colour system with a royal touch.",
    image: "/graphic-design-card-visual.jpg",
  },
  {
    id: "glass-player",
    category: "UI Motion",
    categoryColor: "text-[#7c3aed]",
    filter: "UI Motion",
    title: "Glass Video Player",
    description: "Frosted-glass player UI with floating 3D objects.",
    image: "/animation-card-visual.jpg",
    video: "/video4.mp4",
  },
];

/* =========================================================================
   COVERFLOW POSITIONS (offset from active card -> transform)
   ========================================================================= */

// Card layout (vw units): wide centre card, narrower side cards, edge cards bleed off-screen
const DESKTOP_LAYOUT = { center: 26, side: 16, gap: 0.6, centerH: "20vw", sideH: "19.5vw" };
const MOBILE_LAYOUT = { center: 62, side: 36, gap: 2, centerH: "280px", sideH: "270px" };

function getCardPose(offset: number, layout: typeof DESKTOP_LAYOUT) {
  const abs = Math.abs(offset);
  const dir = Math.sign(offset);
  const { center, side, gap } = layout;
  const x = abs === 0 ? 0 : dir * (center / 2 + gap + side / 2 + (abs - 1) * (side + gap));
  return {
    x: `${x}vw`,
    y: abs === 0 ? 0 : 14, // side cards sit slightly lower than the centre card
    width: `${abs === 0 ? center : side}vw`,
    height: abs === 0 ? layout.centerH : layout.sideH,
    z: 50 - abs * 10,
    opacity: abs <= 3 ? 1 : 0,
  };
}

const CARD_SKEW = -10;

// Image takes the top 66% of every card; background and image share this slant pivot so their edges line up
const IMAGE_RATIO = 66;

/* =========================================================================
   MONOCHROME BRAND LOGOS (Trusted-by strip)
   ========================================================================= */

function TrustedLogos() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-slate-700">
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded bg-slate-700 text-white text-[11px] font-black flex items-center justify-center">B</div>
        <div className="leading-none">
          <div className="text-[13px] font-black tracking-tight">BYJU&apos;S</div>
          <div className="text-[7px] font-bold text-slate-500">The Learning App</div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <svg className="w-5 h-3" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="2.4">
          <circle cx="6" cy="8" r="5" />
          <circle cx="22" cy="8" r="5" />
          <path d="M11 6.5C13 5 15 5 17 6.5" strokeLinecap="round" />
        </svg>
        <span className="text-[14px] font-bold lowercase">lenskart</span>
      </div>
      <span className="text-[18px] font-black tracking-tighter">OYO</span>
      <div className="flex items-center gap-1">
        <svg className="w-4 h-3.5" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 17L7 4L12 14L17 4L22 17" />
        </svg>
        <span className="text-[13px] font-extrabold">Myntra</span>
      </div>
      <span className="text-[17px] font-black lowercase">boat</span>
      <span className="text-[15px] font-black italic lowercase">zomato</span>
    </div>
  );
}

/* =========================================================================
   MAIN COMPONENT: AnimationOurWork
   ========================================================================= */

export default function AnimationOurWork() {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>("All Work");
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [playingItem, setPlayingItem] = useState<WorkItem | null>(null);

  // Close the video lightbox with Escape
  useEffect(() => {
    if (!playingItem) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPlayingItem(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playingItem]);

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const layout = isDesktop ? DESKTOP_LAYOUT : MOBILE_LAYOUT;

  const filteredItems = useMemo(
    () => (activeFilter === "All Work" ? workItems : workItems.filter((item) => item.filter === activeFilter)),
    [activeFilter]
  );
  const total = filteredItems.length;
  const currentIndex = total ? activeIndex % total : 0;

  const goTo = (direction: 1 | -1) => {
    setActiveIndex((i) => (((i % total) + direction) % total + total) % total);
  };

  const handleFilterChange = (filter: WorkFilter) => {
    setActiveFilter(filter);
    setActiveIndex(filter === "All Work" ? 2 : 0);
  };

  // Auto-play: slow, smooth advance; pauses on hover
  useEffect(() => {
    if (isPaused || playingItem || total < 2) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => ((i % total) + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, playingItem, total]);

  // Shortest circular offset of each card from the active one
  const getOffset = (index: number) => {
    let offset = index - currentIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  return (
    <section className="relative w-full bg-[#fbfcfe] pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden font-sans">
      {/* Giant faint brush watermark */}
      <div className="absolute top-6 right-[4%] hidden md:block pointer-events-none select-none">
        <div className="font-caveat font-bold uppercase text-[110px] lg:text-[150px] leading-[0.85] text-slate-200/60 -rotate-6 tracking-wide">
          Crafted
          <br />
          <span className="pl-16">To Impact</span>
        </div>
      </div>

      <Container className="relative z-10">
        {/* ======================= HEADER ROW ======================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left: Heading block */}
          <div className="lg:col-span-6">
            <span className="text-[11px] font-black tracking-[0.22em] text-[#0d9488] uppercase block mb-3">
              Our Work
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0f2333] tracking-tight leading-[1.05]">
              Real Projects.
              <br />
              Real <span className="text-[#0d9488]">Impact.</span>
            </h2>
            <div className="w-14 h-[3px] bg-[#0d9488] rounded-full mt-5 mb-5" />
            <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed max-w-md">
              Explore how our animation and design solutions help brands communicate, engage and grow.
            </p>

            {/* Script tagline with squiggle */}
            <div className="mt-4 inline-flex items-center gap-1.5">
              <span className="font-caveat text-lg sm:text-xl font-bold text-[#0d9488]">
                Ideas. Crafted. Delivered.
              </span>
              <svg className="w-5 h-4 text-[#0d9488]" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 13 L8 3" />
                <path d="M9 13 L14 5" />
                <path d="M15 13 L18 8" />
              </svg>
            </div>

            {/* View all projects */}
            <div className="mt-7 flex items-center gap-3">
              <Link href="#contact-form" className="group inline-flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-[#0f5e63] text-white flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(13,148,136,0.5)] group-hover:bg-[#0d9488] transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
                <span className="text-sm font-bold text-slate-800 group-hover:text-[#0d9488] transition-colors">
                  View All Projects
                </span>
              </Link>
              {/* Dashed doodle arrow */}
              <svg className="w-14 h-6 text-[#0d9488]/70 hidden sm:block" viewBox="0 0 60 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M2 16 C 14 22, 22 4, 34 10 C 42 14, 48 8, 56 5" strokeDasharray="3 3" />
                <path d="M50 3 L56 5 L53 11" />
              </svg>
            </div>
          </div>

          {/* Right: Annotation + filter tabs */}
          <div className="lg:col-span-6 flex flex-col items-start lg:items-end gap-6">
            <div className="hidden lg:flex items-end gap-2 mr-10">
              <svg className="w-10 h-10 text-slate-600" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M44 8 C 30 10, 14 18, 10 40" />
                <path d="M5 33 L10 40 L16 34" />
              </svg>
              <div className="font-caveat text-lg font-bold text-slate-700 leading-tight -rotate-6 mb-6">
                Design + Motion
                <br />
                that drives results
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-nowrap items-center gap-0.5 xl:gap-1 max-w-full overflow-x-auto lg:overflow-visible no-scrollbar bg-white rounded-full p-1 border border-slate-100 shadow-[0_4px_20px_rgba(15,35,51,0.05)]" style={{ scrollbarWidth: "none" }}>
              {workFilters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className={`relative flex-shrink-0 whitespace-nowrap px-3 xl:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer ${
                      isActive ? "bg-[#0f2333] text-white" : "text-slate-600 hover:text-[#0d9488]"
                    }`}
                  >
                    {filter}
                    {isActive && (
                      <span className="hidden lg:block absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      {/* ======================= COVERFLOW CAROUSEL ======================= */}
      <div
        className="relative mt-3 sm:mt-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Stage: full-width; the card that lands in the centre grows wide and turns dark */}
        <div className="relative w-full h-[300px] lg:h-[22vw] overflow-hidden">
          {filteredItems.map((item, index) => {
            const offset = getOffset(index);
            const pose = getCardPose(offset, layout);
            const isActive = offset === 0;
            const transition = { duration: 1.1, ease: [0.45, 0, 0.15, 1] as const };

            return (
              /* Outer: slides horizontally from the stage centre */
              <motion.div
                key={item.id}
                initial={false}
                animate={{ x: pose.x, y: pose.y, opacity: pose.opacity }}
                transition={transition}
                style={{ zIndex: pose.z }}
                className={`absolute left-1/2 top-1/2 ${Math.abs(offset) > 2 ? "pointer-events-none" : ""}`}
              >
                {/* Inner: centred on that point, grows / shrinks between side and centre size */}
                <motion.div
                  initial={false}
                  animate={{ width: pose.width, height: pose.height }}
                  transition={transition}
                  onClick={() => !isActive && setActiveIndex(index)}
                  className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 flex flex-col cursor-pointer"
                >
                  {/* Side-card background: soft white panel whose border fades out towards the bottom */}
                  <div
                    className={`absolute inset-0 rounded-[18px] bg-gradient-to-b from-white via-white/95 to-white/0 border border-slate-200/80 transition-opacity duration-700 ${
                      isActive ? "opacity-0" : "opacity-100"
                    }`}
                    style={{
                      transform: `skewX(${CARD_SKEW}deg)`,
                      transformOrigin: `50% ${IMAGE_RATIO}%`,
                      maskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
                    }}
                  />

                  {/* Centre-card background: solid dark panel, fades in when the card lands in the middle */}
                  <div
                    className={`absolute inset-0 rounded-[18px] bg-[#070d1a] transition-opacity duration-700 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transform: `skewX(${CARD_SKEW}deg)`, transformOrigin: `50% ${IMAGE_RATIO}%` }}
                  />

                  {/* Slanted image panel */}
                  <div
                    className="relative flex-shrink-0 overflow-hidden rounded-t-[18px]"
                    style={{
                      height: `${IMAGE_RATIO}%`,
                      transform: `skewX(${CARD_SKEW}deg)`,
                      transformOrigin: "50% 100%",
                      // Fade the image's bottom to transparent so it melts into whichever background is behind
                      maskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
                    }}
                  >
                    <div className="absolute inset-0" style={{ transform: `skewX(${-CARD_SKEW}deg) scale(1.2)` }}>
                      <Image src={item.image} alt={item.title} fill unoptimized className="object-cover" />
                    </div>
                    {item.video && (
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
                          isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                        style={{ transform: `skewX(${-CARD_SKEW}deg)` }}
                      >
                        <button
                          type="button"
                          aria-label={`Play ${item.title} video`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlayingItem(item);
                          }}
                          className="group/play relative w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border-2 border-white/85 flex items-center justify-center text-white cursor-pointer hover:bg-[#0d9488] hover:border-[#2dd4bf] hover:scale-110 transition-all duration-300"
                        >
                          <span className="absolute inset-0 rounded-full border-2 border-white/60 animate-ping opacity-40 group-hover/play:opacity-0" />
                          <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Text: dark on the white side cards, white on the dark centre card */}
                  <div className={`relative pr-3 transition-[padding] duration-700 ${isActive ? "pt-3 pl-5" : "pt-3 pl-4"}`}>
                    <span
                      className={`text-[9.5px] font-black tracking-[0.16em] uppercase transition-colors duration-700 ${
                        isActive ? "text-[#2dd4bf]" : item.categoryColor
                      }`}
                    >
                      {item.category}
                    </span>
                    <h3
                      className={`mt-1 font-bold leading-snug truncate transition-colors duration-700 ${
                        isActive ? "text-white text-base lg:text-lg" : "text-slate-900 text-sm"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`mt-1 text-[11px] lg:text-xs leading-snug line-clamp-2 transition-colors duration-700 ${
                        isActive ? "text-slate-300 max-w-[85%]" : "text-slate-500"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Navigation Arrows */}
          {total > 1 && (
            <>
              <button
                onClick={() => goTo(-1)}
                aria-label="Previous project"
                className="absolute left-3 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-[60] w-10 h-10 rounded-full bg-[#0f2333] text-white flex items-center justify-center shadow-lg hover:bg-[#0d9488] transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" />
                  <path d="m11 6-6 6 6 6" />
                </svg>
              </button>
              <button
                onClick={() => goTo(1)}
                aria-label="Next project"
                className="absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-[60] w-10 h-10 rounded-full bg-[#0f2333] text-white flex items-center justify-center shadow-lg hover:bg-[#0d9488] transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* ======================= BOTTOM BAR: Trusted By + CTA ======================= */}
      <Container className="relative z-10 mt-10 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Trusted by */}
          <div className="lg:col-span-6">
            <p className="text-[10.5px] font-black tracking-[0.2em] text-[#0d9488] uppercase mb-4">
              Trusted by forward-thinking brands
            </p>
            <TrustedLogos />
          </div>

          {/* CTA */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 lg:pl-8 lg:border-l border-slate-200">
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-3 rounded-full border border-slate-200/80" />
              <div className="w-14 h-14 rounded-full bg-[#0f5e63] text-white flex items-center justify-center shadow-[0_10px_25px_-6px_rgba(13,148,136,0.55)]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 11 13" />
                  <path d="M22 2 15 22l-4-9-9-4Z" />
                </svg>
              </div>
            </div>
            <div className="flex-1 sm:ml-2">
              <h4 className="text-lg sm:text-xl font-bold text-[#0f2333]">Have a project in mind?</h4>
              <p className="text-xs sm:text-[13px] text-[#0d9488] mt-0.5">Let&apos;s create something amazing together.</p>
              <svg className="w-28 h-2 mt-1 text-[#0d9488]" viewBox="0 0 120 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 5 C 30 1, 60 7, 118 3" />
              </svg>
            </div>
            <Link
              href="#contact-form"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0f2333] text-white text-sm font-semibold shadow-[0_10px_30px_-6px_rgba(99,102,241,0.55)] ring-1 ring-indigo-400/40 hover:bg-[#0d9488] transition-colors"
            >
              Let&apos;s Talk
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </Container>
      {/* ======================= VIDEO LIGHTBOX ======================= */}
      <AnimatePresence>
        {playingItem?.video && (
          <motion.div
            key="video-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-[#030712]/85 backdrop-blur-md"
            onClick={() => setPlayingItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${playingItem.title} video`}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-end justify-between mb-3 text-white">
                <div>
                  <span className="text-[10px] font-black tracking-[0.18em] text-[#2dd4bf] uppercase">
                    {playingItem.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold">{playingItem.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPlayingItem(null)}
                  aria-label="Close video"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black ring-1 ring-white/10">
                <video
                  key={playingItem.video}
                  src={playingItem.video}
                  poster={playingItem.image}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
