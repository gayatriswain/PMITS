"use client";

import React, { useState, useEffect } from "react";
import { submitEnquiry, goToThankYou } from "@/lib/forms";
import Honeypot from "@/components/cms/Honeypot";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

/* =========================================================================
   PROJECT SHOWCASE DATA FOR CAROUSEL & 3D FAN
   ========================================================================= */

interface ProjectItem {
  id: string;
  category: string;
  title: string;
  image: string;
  client: string;
  timeline: string;
  deliverables: string[];
  description: string;
}

const showcaseProjects__cms: ProjectItem[] = [
  {
    id: "3d-explainer",
    category: "3D Animation",
    title: "Explainer Video",
    image: "/explainer-character-showcase.webp",
    client: "FinTrack SaaS",
    timeline: "3 Weeks",
    deliverables: ["4K Master 3D Animation", "Custom Character Rigging", "Sound Design & VO"],
    description: "High-energy 3D character explainer video showcasing real-time fintech analytics with Pixar-grade character animation and floating holographic UI widgets.",
  },
  {
    id: "herbal-tea",
    category: "Packaging Design",
    title: "Herbal Tea",
    image: "/herbal-tea-packaging.webp",
    client: "Naturova Organic",
    timeline: "2 Weeks",
    deliverables: ["Matte Standup Pouch", "Botanical Foil Embellishments", "Print-Ready Vector Master"],
    description: "Eco-friendly botanical pouch packaging for premium organic herbal tea blend with custom botanical leaf illustrations and sustainable texture mapping.",
  },
  {
    id: "saas-dashboard",
    category: "UI/UX Design",
    title: "Dashboard Interface",
    image: "/saas-dashboard-showcase.webp",
    client: "Nexus Performance",
    timeline: "4 Weeks",
    deliverables: ["Dark Mode UI System", "Interactive Micro-Interactions", "Figma Design System"],
    description: "Futuristic dark-mode SaaS analytics interface with glowing neon telemetry line graphs, user cohorts, and conversion funnel data visualizations.",
  },
  {
    id: "verdant-branding",
    category: "Brand Identity",
    title: "Verdant Reality",
    image: "/verdant-branding-showcase.webp",
    client: "Verdant Reality Corp",
    timeline: "3 Weeks",
    deliverables: ["Geometric Gold Logo", "Executive Stationery Suite", "Comprehensive Brand Guidelines"],
    description: "Luxury corporate identity suite featuring dark forest green textured paper, embossed gold geometric leaf emblem, foil-stamped business cards, and stationery.",
  },
  {
    id: "sneaker-motion",
    category: "E-commerce / Motion",
    title: "Modern Sneaker 3D",
    image: "/sneaker-mobile-showcase.webp",
    client: "Velocity Footwear",
    timeline: "2 Weeks",
    deliverables: ["3D Product Animation", "Interactive 360 Spin", "Social Ad Cutdowns"],
    description: "Cinematic 3D athletic sneaker reveal with dynamic camera orbit, neon wireframe effects, and high-conversion e-commerce mobile product animation.",
  },
  {
    id: "ev-explainer",
    category: "Motion Graphics",
    title: "EV Charger Explainer",
    image: "/ev-charger-showcase.webp",
    client: "VoltGrid Mobility",
    timeline: "3 Weeks",
    deliverables: ["60s Explainer Animation", "Neon Energy FX", "Social Media Cutdowns"],
    description: "Futuristic explainer animation visualising smart EV charging with glowing energy streams, cinematic lighting and a sleek electric vehicle reveal.",
  },
  {
    id: "amethyst-brand",
    category: "Graphic Design",
    title: "Amethyst Brand Kit",
    image: "/graphic-design-card-visual.webp",
    client: "Amethyst Studio",
    timeline: "2 Weeks",
    deliverables: ["Logo & Monogram", "Stationery & Merch Mockups", "Colour Palette Guide"],
    description: "Royal purple brand identity kit with a gold-foil diamond emblem, business cards, presentation folder, merch mockups and a Pantone colour system.",
  },
  {
    id: "video-player-ui",
    category: "2D / 3D Motion",
    title: "Glass Video Player",
    image: "/animation-card-visual.webp",
    client: "Streamly Media",
    timeline: "2 Weeks",
    deliverables: ["Glassmorphic Player UI", "3D Object Animation", "Micro-Interaction Loops"],
    description: "Frosted-glass video player concept with floating 3D gem objects, glowing playback controls and smooth looping micro-interactions.",
  },
];

/* =========================================================================
   MAIN COMPONENT: AnimationImpactShowcase
   ========================================================================= */

export default function AnimationImpactShowcase() {
  const $t = useCmsText();
  const showcaseProjects = useCmsData("AnimationImpactShowcase__showcaseProjects", showcaseProjects__cms);
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    projectDetails: "",
  });

  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hp, setHp] = useState("");

  // Modal State for Project Inspection
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Carousel State: index of first visible card, cards per view, auto-play pause
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(5);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const maxCarouselIndex = Math.max(0, showcaseProjects.length - cardsPerView);

  // Responsive cards per view: 2 (mobile) / 3 (tablet) / 5 (desktop)
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      setCardsPerView(width >= 1024 ? 5 : width >= 640 ? 3 : 2);
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Clamp so the index stays valid when cards per view changes
  const activeCarouselIndex = Math.min(carouselIndex, maxCarouselIndex);

  // Moves one card at a time and wraps around at either end
  const scrollCarousel = (direction: "left" | "right") => {
    setCarouselIndex((i) => {
      const current = Math.min(i, maxCarouselIndex);
      if (direction === "right") return current >= maxCarouselIndex ? 0 : current + 1;
      return current <= 0 ? maxCarouselIndex : current - 1;
    });
  };

  // Auto-play: advance every 4s unless hovered / touched or modal open
  useEffect(() => {
    if (isCarouselPaused || activeModalProject) return;
    const timer = setInterval(() => {
      setCarouselIndex((i) => (Math.min(i, maxCarouselIndex) >= maxCarouselIndex ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isCarouselPaused, activeModalProject, maxCarouselIndex]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 500) {
      setFormData({ ...formData, projectDetails: text });
      setCharCount(text.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg("Please fill in your name and work email.");
      return;
    }
    if (isSubmitting) return;
    setErrorMsg("");
    setIsSubmitting(true);
    const r = await submitEnquiry("animation-project", {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      service: formData.service || "Animation & Graphic Design",
      message: formData.projectDetails,
      hp,
    });
    setIsSubmitting(false);
    if (r.ok) {
      setSubmitted(true);
      goToThankYou("animation");
    }
    else setErrorMsg(r.error);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      service: "",
      projectDetails: "",
    });
    setCharCount(0);
    setSubmitted(false);
  };

  return (
    <section id="contact-form" className="relative w-full bg-[#fcfdff] py-14 sm:py-20 overflow-hidden font-sans">
      
      {/* Background Subtle Swirl & Glows */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-cyan-100/30 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[650px] h-[650px] bg-purple-100/35 rounded-full blur-[170px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        
        {/* =========================================================
            MAIN SECTION: 
            LEFT CONTAINER (8 cols) -> [Top: Typography & 4 Pillars + 3D Fan Mockup | Bottom: "— A GLIMPSE OF WHAT WE CREATE" Carousel]
            RIGHT CONTAINER (4 cols) -> [Radiant Glowing Project Form]
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-start mb-14 lg:mb-16">
          
          {/* -------------------------------------------------------
              LEFT CONTAINER (8 cols): Typography, 4 Value Props, 3D Fan, AND "— A GLIMPSE OF WHAT WE CREATE" Carousel
              ------------------------------------------------------- */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-between">
            
            {/* Top Sub-Row: Typography & 4 Value Badges (Left) + 3D Isometric Cards Fan (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-3 xl:gap-6 items-center">
              
              {/* Left Sub-Column (md:col-span-7): Editorial Typography & 4 Value Badges */}
              <div className="md:col-span-7 flex flex-col justify-between pt-1 pr-0 xl:pr-2">
                <div>
                  {/* Badge: LET'S CREATE IMPACT */}
                  <div className="inline-block mb-3.5">
                    <span className="text-[11px] font-black tracking-[0.22em] text-[#0d9488] uppercase block">
                      {$t("AnimationImpactShowcase__t1", "LET'S CREATE IMPACT")}</span>
                    <div className="w-9 h-[2px] bg-[#00bcd4] rounded-full mt-1.5" />
                  </div>

                  {/* Main Headline with Serif Typography */}
                  <h2 className="text-h2 font-playfair font-black text-slate-900 tracking-tight mb-4">
                    {$t("AnimationImpactShowcase__t2", "Extraordinary ")}<br />
                    <span>{$t("AnimationImpactShowcase__t3", "Designs.")}</span> <br />
                    <span className="font-playfair italic font-black bg-gradient-to-r from-[#00b4d8] via-[#0284c7] to-[#7c3aed] bg-clip-text text-transparent inline-block relative">
                      {$t("AnimationImpactShowcase__t4", "Real Results.")}{/* Fluid Brush Underline */}
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3.5 pointer-events-none"
                        viewBox="0 0 240 14"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M 3 9 C 60 2, 160 3, 237 9"
                          stroke="url(#realResultsGradient)"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="realResultsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00b4d8" />
                            <stop offset="60%" stopColor="#0284c7" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-small text-slate-500 font-normal max-w-md mb-6 mt-3">
                    {rich($t("AnimationImpactShowcase__t5", "We turn ideas into powerful visual experiences that connect, engage and drive real business growth."))}</p>

                  {/* 4 Value Props: Bold Creativity, Strategic Design, Seamless Execution, Real Impact */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3 pt-4 border-t border-slate-100">
                    
                    {/* 1. Bold Creativity */}
                    <div className="flex flex-col items-start">
                      <div className="w-8 h-8 rounded-full bg-[#0d9488] flex items-center justify-center text-white mb-1.5 shadow-sm shadow-teal-500/20">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs leading-tight mb-0.5">
                        {$t("AnimationImpactShowcase__t6", "Bold Creativity")}</h4>
                      <p className="text-[10px] text-slate-400 leading-snug">
                        {rich($t("AnimationImpactShowcase__t7", "Ideas that stand out and spark emotion."))}</p>
                    </div>

                    {/* 2. Strategic Design */}
                    <div className="flex flex-col items-start">
                      <div className="w-8 h-8 rounded-full bg-[#4338ca] flex items-center justify-center text-white mb-1.5 shadow-sm shadow-indigo-500/20">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="6" />
                          <circle cx="12" cy="12" r="2" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs leading-tight mb-0.5">
                        {$t("AnimationImpactShowcase__t8", "Strategic Design")}</h4>
                      <p className="text-[10px] text-slate-400 leading-snug">
                        {rich($t("AnimationImpactShowcase__t9", "Purpose-driven visuals that deliver results."))}</p>
                    </div>

                    {/* 3. Seamless Execution */}
                    <div className="flex flex-col items-start">
                      <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center text-white mb-1.5 shadow-sm shadow-blue-500/20">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                          <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs leading-tight mb-0.5">
                        {$t("AnimationImpactShowcase__t10", "Seamless Execution")}</h4>
                      <p className="text-[10px] text-slate-400 leading-snug">
                        {rich($t("AnimationImpactShowcase__t11", "Pixel-perfect designs with flawless delivery."))}</p>
                    </div>

                    {/* 4. Real Impact */}
                    <div className="flex flex-col items-start">
                      <div className="w-8 h-8 rounded-full bg-[#0f766e] flex items-center justify-center text-white mb-1.5 shadow-sm shadow-teal-700/20">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="20" x2="18" y2="10" />
                          <line x1="12" y1="20" x2="12" y2="4" />
                          <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs leading-tight mb-0.5">
                        {$t("AnimationImpactShowcase__t12", "Real Impact")}</h4>
                      <p className="text-[10px] text-slate-400 leading-snug">
                        {rich($t("AnimationImpactShowcase__t13", "Designs that engage, convert and grow."))}</p>
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Sub-Column (md:col-span-5): 3D Isometric Showcase Cards & Swirling Vortex */}
              <div className="md:col-span-5 relative flex flex-col items-center md:items-end justify-center min-h-[420px] sm:min-h-[460px]">
                
                {/* Top Annotation: Handwritten Script with Doodle Arrow */}
                <div className="absolute -top-5 left-0 sm:left-2 z-20 pointer-events-none select-none">
                  <div className="font-caveat text-base sm:text-lg font-bold text-slate-700 leading-tight">
                    {$t("AnimationImpactShowcase__t14", "Crafted with ")}<span className="text-[#0d9488]">{$t("AnimationImpactShowcase__t15", "creativity.")}</span> <br />
                    {$t("AnimationImpactShowcase__t16", "Powered by ")}<span className="text-[#7c3aed]">{$t("AnimationImpactShowcase__t17", "strategy.")}</span>
                  </div>
                  {/* Hand-drawn curly arrow pointing down to EV card */}
                  <svg className="w-9 h-9 text-slate-600 -ml-1 mt-0.5" viewBox="0 0 50 50" fill="none">
                    <path
                      d="M 14 6 C 10 20, 15 32, 32 37"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <polyline points="26 40 33 37 31 29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Smoky Cyan/Blue Vortex Background (painted swirl wrapping the card cluster) */}
                <div className="absolute inset-0 flex items-center justify-center md:justify-end md:-mr-12 pointer-events-none overflow-visible">
                  {/* Soft outer aura */}
                  <div className="absolute w-[360px] h-[400px] sm:w-[400px] sm:h-[460px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.35)_0%,rgba(129,140,248,0.22)_45%,rgba(255,255,255,0)_70%)] blur-2xl" />

                  {/* Painterly swirl strokes */}
                  <svg
                    className="absolute w-[380px] h-[420px] sm:w-[420px] sm:h-[480px] rotate-[-18deg]"
                    viewBox="0 0 400 400"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id="vortexSmoke" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0369a1" />
                        <stop offset="35%" stopColor="#0ea5e9" />
                        <stop offset="70%" stopColor="#67e8f9" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                      <linearGradient id="vortexMist" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#bae6fd" />
                        <stop offset="100%" stopColor="#c4b5fd" />
                      </linearGradient>
                      <filter id="vortexBlur" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="9" />
                      </filter>
                      <filter id="vortexSoft" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2.5" />
                      </filter>
                    </defs>

                    {/* Wide smoke body */}
                    <ellipse cx="200" cy="205" rx="165" ry="150" stroke="url(#vortexSmoke)" strokeWidth="46" opacity="0.55" filter="url(#vortexBlur)" />
                    {/* Inner mist ring */}
                    <ellipse cx="200" cy="205" rx="130" ry="118" stroke="url(#vortexMist)" strokeWidth="30" opacity="0.6" filter="url(#vortexBlur)" />

                    {/* Bright white speed streaks */}
                    <path
                      d="M 70 300 C 25 220, 45 105, 145 60 C 235 22, 345 52, 370 150"
                      stroke="#ffffff"
                      strokeWidth="7"
                      strokeLinecap="round"
                      opacity="0.9"
                      filter="url(#vortexSoft)"
                    />
                    <path
                      d="M 355 245 C 330 330, 240 380, 150 360"
                      stroke="#ffffff"
                      strokeWidth="5"
                      strokeLinecap="round"
                      opacity="0.85"
                      filter="url(#vortexSoft)"
                    />
                    <path
                      d="M 95 330 C 60 290, 50 240, 58 190"
                      stroke="#e0f2fe"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                    <path
                      d="M 250 40 C 300 45, 345 80, 360 120"
                      stroke="#e0f2fe"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                  </svg>
                </div>

                {/* 3D Tilted Card Cluster: all 4 cards share one perspective plane */}
                <div
                  className="relative w-[260px] sm:w-[300px] xl:w-[320px] h-[380px] sm:h-[440px] xl:h-[460px] select-none mx-auto md:mx-0 md:mr-2 xl:mr-4"
                  style={{ perspective: "1400px" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: "rotateX(12deg) rotateY(-32deg) rotateZ(4deg)",
                      transformOrigin: "right center",
                      transformStyle: "preserve-3d",
                    }}
                  >

                  {/* Card 1 (Top-Left): EV Charger Explainer Animation */}
                  <motion.div
                    whileHover={{ y: -6, zIndex: 40 }}
                    className="absolute top-[14%] left-0 w-[48%] h-[30%] rounded-[18px] overflow-hidden bg-slate-900 ring-1 ring-cyan-300/60 shadow-[0_18px_40px_-8px_rgba(6,182,212,0.45),0_6px_0_-1px_rgba(15,23,42,0.85)] z-10 cursor-pointer group"
                    onClick={() => setActiveModalProject(showcaseProjects[0])}
                  >
                    <Image
                      src={$t("AnimationImpactShowcase__t18", "/ev-charger-showcase.webp")}
                      alt={$t("AnimationImpactShowcase__t19", "EV Charger Explainer Animation")}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Play button overlay with white circle outline */}
                    <div className="absolute bottom-2.5 left-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/60 flex items-center justify-center text-white text-[10px] group-hover:bg-cyan-500 transition-colors shadow-md">
                      ▶
                    </div>
                  </motion.div>

                  {/* Card 2 (Top-Right): Naturova Herbal Tea Pouch (Tall Card) */}
                  <motion.div
                    whileHover={{ y: -6, zIndex: 40 }}
                    className="absolute top-[6%] right-0 w-[48%] h-[38%] rounded-[18px] overflow-hidden bg-slate-900 ring-1 ring-white/70 shadow-[0_18px_40px_-8px_rgba(15,23,42,0.35),0_6px_0_-1px_rgba(15,23,42,0.85)] z-10 cursor-pointer group"
                    onClick={() => setActiveModalProject(showcaseProjects[1])}
                  >
                    <Image
                      src={$t("AnimationImpactShowcase__t20", "/herbal-tea-packaging.webp")}
                      alt={$t("AnimationImpactShowcase__t21", "Naturova Herbal Tea Packaging")}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>

                  {/* Card 3 (Bottom-Left): Verdant Reality Brand Identity */}
                  <motion.div
                    whileHover={{ y: -6, zIndex: 40 }}
                    className="absolute top-[47%] left-0 w-[48%] h-[45%] rounded-[18px] overflow-hidden bg-slate-900 ring-1 ring-white/50 shadow-[0_24px_50px_-10px_rgba(15,23,42,0.55),0_6px_0_-1px_rgba(15,23,42,0.9)] z-20 cursor-pointer group"
                    onClick={() => setActiveModalProject(showcaseProjects[3])}
                  >
                    <Image
                      src={$t("AnimationImpactShowcase__t22", "/verdant-branding-showcase.webp")}
                      alt={$t("AnimationImpactShowcase__t23", "Verdant Reality Brand Identity")}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>

                  {/* Card 4 (Bottom-Right): SaaS Dashboard UI */}
                  <motion.div
                    whileHover={{ y: -6, zIndex: 40 }}
                    className="absolute top-[47%] right-0 w-[48%] h-[41%] rounded-[18px] overflow-hidden bg-slate-900 ring-1 ring-indigo-300/50 shadow-[0_24px_50px_-10px_rgba(124,58,237,0.5),0_6px_0_-1px_rgba(15,23,42,0.9)] z-20 cursor-pointer group"
                    onClick={() => setActiveModalProject(showcaseProjects[2])}
                  >
                    <Image
                      src={$t("AnimationImpactShowcase__t24", "/saas-dashboard-showcase.webp")}
                      alt={$t("AnimationImpactShowcase__t25", "SaaS Analytics Dashboard UI")}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>

                  </div>

                  {/* Floating Spherical 3D Orb Badge: 200+ Projects Delivered (overlaps dashboard card) */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[4%] right-[8%] z-30 w-[96px] h-[96px] sm:w-[110px] sm:h-[110px] rounded-full bg-gradient-to-br from-white via-sky-50 to-indigo-100 backdrop-blur-2xl border-2 border-white shadow-[0_15px_35px_rgba(34,211,238,0.4),0_0_20px_rgba(99,102,241,0.25)] text-center flex flex-col items-center justify-center select-none"
                  >
                    <span className="text-xl sm:text-2xl font-black text-slate-900 leading-none tracking-tight">
                      {$t("AnimationImpactShowcase__t26", "200+")}</span>
                    <span className="text-[9.5px] sm:text-[10.5px] font-bold text-slate-700 tracking-tight leading-tight mt-1">
                      {$t("AnimationImpactShowcase__t27", "Projects")}</span>
                    <span className="text-[9.5px] sm:text-[10.5px] font-bold text-slate-700 tracking-tight leading-tight">
                      {$t("AnimationImpactShowcase__t28", "Delivered")}</span>
                  </motion.div>

                </div>

              </div>

            </div>

            {/* Bottom Sub-Row: Horizontal Showcase Carousel ("— A GLIMPSE OF WHAT WE CREATE") INSIDE Left Container */}
            <div className="mt-7 pt-5 border-t border-slate-100/90 relative">
              
              {/* Subheading Badge & Desktop Navigation */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11.5px] font-black tracking-widest text-[#0d9488] uppercase">
                  {$t("AnimationImpactShowcase__t29", "— A GLIMPSE OF WHAT WE CREATE")}</span>
              </div>

              {/* Carousel Track with Floating Arrow Buttons (auto-play pauses on hover / touch) */}
              <div
                className="relative group"
                onMouseEnter={() => setIsCarouselPaused(true)}
                onMouseLeave={() => setIsCarouselPaused(false)}
                onTouchStart={() => setIsCarouselPaused(true)}
                onTouchEnd={() => setIsCarouselPaused(false)}
              >

                {/* Viewport: px-2 leaves room for the skewed corners of the edge cards; the 16px gap keeps the next card fully hidden */}
                <div className="overflow-hidden px-2 pt-2 pb-3">
                <div
                  className="flex items-stretch gap-4 transition-transform duration-[1400ms] ease-[cubic-bezier(0.45,0,0.15,1)] will-change-transform"
                  style={{
                    transform: `translateX(calc(-${activeCarouselIndex} * (100% + 16px) / ${cardsPerView}))`,
                  }}
                >
                  {showcaseProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setActiveModalProject(project)}
                      style={{
                        width: `calc((100% - ${(cardsPerView - 1) * 16}px) / ${cardsPerView})`,
                        transform: "skewX(-6deg)",
                        transformOrigin: "center center",
                      }}
                      className="flex-shrink-0 h-[130px] sm:h-[140px] xl:h-[152px] rounded-[5px] overflow-hidden relative cursor-pointer border border-slate-800/80 shadow-md"
                    >
                      {/* Background Image Container (scaled and counter-skewed to cover tilted boundaries) */}
                      <div
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{
                          transform: "skewX(6deg) scale(1.25)",
                          transformOrigin: "center center",
                        }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                        {/* Dark Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent" />
                      </div>

                      {/* Foreground Content (Counter-skewed only, NOT scaled, so text and play button are never cut off) */}
                      <div
                        className="absolute inset-0 p-2.5 sm:p-3 flex flex-col justify-between pointer-events-none z-10"
                        style={{
                          transform: "skewX(6deg)",
                          transformOrigin: "center center",
                        }}
                      >
                        {/* Category & Title */}
                        <div>
                          <span className="text-[8.5px] sm:text-[9px] xl:text-[9.5px] font-bold text-slate-300 uppercase tracking-wider block truncate drop-shadow-sm">
                            {project.category}
                          </span>
                          <h4 className="text-[10.5px] sm:text-[11.5px] xl:text-xs font-bold text-white tracking-tight leading-tight mt-0.5 truncate drop-shadow-sm">
                            {project.title}
                          </h4>
                        </div>

                        {/* Circular Play Button Icon */}
                        <div>
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/50 flex items-center justify-center text-white text-[8px] sm:text-[9px] shadow-md">
                            ▶
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </div>

                {/* Floating Circular Left Navigation Button */}
                <button
                  onClick={() => scrollCarousel("left")}
                  aria-label="Previous Slide"
                  className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center text-sm sm:text-base font-bold z-30 hover:scale-110 transition-all cursor-pointer"
                >
                  ‹
                </button>

                {/* Floating Circular Right Navigation Button */}
                <button
                  onClick={() => scrollCarousel("right")}
                  aria-label="Next Slide"
                  className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center text-sm sm:text-base font-bold z-30 hover:scale-110 transition-all cursor-pointer"
                >
                  ›
                </button>

              </div>

            </div>

          </div>

          {/* -------------------------------------------------------
              RIGHT CONTAINER (4 cols): Radiant Glowing Glassmorphic Project Inquiry Form Card
              ------------------------------------------------------- */}
          <div className="lg:col-span-4 xl:col-span-4 relative mt-8 lg:mt-0">
            
            {/* Doodle Paper Plane & Arrow at Top Right */}
            <div className="absolute -top-10 -right-6 hidden sm:block pointer-events-none z-0 select-none">
              <svg className="w-16 h-16 text-purple-400/80" viewBox="0 0 100 100" fill="none">
                {/* Dashed Loop */}
                <path
                  d="M 20 80 C 10 50, 45 40, 50 65 C 55 90, 80 80, 85 45"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                {/* Paper Plane Silhouette */}
                <polygon points="85 45 70 30 78 50 85 45" fill="currentColor" />
              </svg>
            </div>

            {/* Glowing Neon Aura Halo (Cyan Left to Magenta Right) */}
            <div className="absolute -inset-2.5 rounded-[42px] bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500 opacity-80 blur-xl pointer-events-none animate-pulse" />
            
            {/* Glassmorphic Form Card */}
            <div className="relative bg-white/95 backdrop-blur-2xl rounded-[36px] p-6 sm:p-7 xl:p-8 border-[2.5px] border-white shadow-[0_20px_50px_rgba(2,132,199,0.18)] z-10">
              
              {/* Top Tag & Sparkle */}
              <div className="flex items-center justify-between mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-[10.5px] font-black tracking-wider uppercase">
                  <span>✦</span>
                  <span>{$t("AnimationImpactShowcase__t30", "START YOUR PROJECT")}</span>
                </span>
                <span className="text-cyan-500 text-lg select-none">✨</span>
              </div>

              {/* Form Heading: Serif + Script Accent */}
              <div className="mb-1.5">
                <h3 className="text-h5 font-playfair font-black text-slate-900">
                  {$t("AnimationImpactShowcase__t31", "Let's Build Something")}</h3>
                <div className="inline-block relative">
                  <span className="font-caveat font-bold text-4xl sm:text-[44px] leading-none bg-gradient-to-r from-[#00b4d8] via-[#0284c7] to-[#7c3aed] bg-clip-text text-transparent">
                    {$t("AnimationImpactShowcase__t32", "Amazing")}</span>
                  {/* Cute wavy underline under Amazing */}
                  <svg className="absolute -bottom-1 left-0 w-full h-2.5 pointer-events-none" viewBox="0 0 120 10" fill="none">
                    <path
                      d="M 2 6 C 30 1, 60 10, 90 3 C 105 0, 115 5, 118 6"
                      stroke="#00bcd4"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-caption text-slate-500 mb-5 mt-1">
                {rich($t("AnimationImpactShowcase__t33", "Share a few details and we'll get back to you within"))}{" "}
                <span className="font-bold text-[#0284c7]">{$t("AnimationImpactShowcase__t34", "24 hours.")}</span>
              </p>

              {/* Error Message */}
              {errorMsg && (
                <div className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Form or Success State */}
              {submitted ? (
                <div className="py-10 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-2xl font-bold mb-3 shadow-inner">
                    ✓
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-1">{$t("AnimationImpactShowcase__t35", "Inquiry Received!")}</h4>
                  <p className="text-caption text-slate-500 max-w-xs mb-5">
                    {rich($t("AnimationImpactShowcase__t36", "Thank you, "))}<span className="font-semibold text-slate-800">{formData.name}</span>{rich($t("AnimationImpactShowcase__t37", ". Our creative director will email you back within 24 hours."))}</p>
                  <button
                    onClick={resetForm}
                    className="text-xs font-bold text-teal-600 hover:text-teal-700 underline cursor-pointer"
                  >
                    {$t("AnimationImpactShowcase__t38", "Send another inquiry")}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-3">
                  <Honeypot value={hp} onChange={setHp} />
                  
                  {/* Row 1: Name & Work Email (stacked) with Line Art Icons */}
                  <div className="grid grid-cols-1 gap-3">
                    
                    {/* Your Name */}
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder={$t("AnimationImpactShowcase__t39", "Your Name*")}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-3.5 pr-8 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200/90 text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all"
                      />
                      {/* Outline User Icon */}
                      <svg className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>

                    {/* Work Email */}
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder={$t("AnimationImpactShowcase__t40", "Work Email*")}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-3.5 pr-8 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200/90 text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all"
                      />
                      {/* Outline Mail Icon */}
                      <svg className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>

                  </div>

                  {/* Row 2: Company Name */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={$t("AnimationImpactShowcase__t41", "Company Name")}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-3.5 pr-8 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200/90 text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all"
                    />
                    {/* Outline Building Icon */}
                    <svg className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                      <line x1="9" y1="6" x2="9.01" y2="6" />
                      <line x1="15" y1="6" x2="15.01" y2="6" />
                      <line x1="9" y1="10" x2="9.01" y2="10" />
                      <line x1="15" y1="10" x2="15.01" y2="10" />
                      <line x1="9" y1="14" x2="9.01" y2="14" />
                      <line x1="15" y1="14" x2="15.01" y2="14" />
                      <line x1="9" y1="18" x2="15" y2="18" />
                    </svg>
                  </div>

                  {/* Row 3: Dropdown "What do you need help with?" */}
                  <div className="relative">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full pl-3.5 pr-8 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200/90 text-slate-800 text-xs focus:outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        {$t("AnimationImpactShowcase__t42", "What do you need help with?")}</option>
                      <option value="3D Animation & Motion Graphics">{$t("AnimationImpactShowcase__t43", "3D Animation & Motion Graphics")}</option>
                      <option value="2D Explainer & SaaS Videos">{$t("AnimationImpactShowcase__t44", "2D Explainer & SaaS Videos")}</option>
                      <option value="Brand Identity & Graphic Design">{$t("AnimationImpactShowcase__t45", "Brand Identity & Graphic Design")}</option>
                      <option value="UI/UX & Interactive Product Visuals">{$t("AnimationImpactShowcase__t46", "UI/UX & Interactive Product Visuals")}</option>
                      <option value="Packaging & Print Collaterals">{$t("AnimationImpactShowcase__t47", "Packaging & Print Collaterals")}</option>
                      <option value="Full-Spectrum Creative Retainer">{$t("AnimationImpactShowcase__t48", "Full-Spectrum Creative Retainer")}</option>
                    </select>
                    {/* Outline Chevron Icon */}
                    <svg className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>

                  {/* Row 4: Project Details Textarea with Character Counter */}
                  <div className="relative">
                    <textarea
                      rows={3}
                      placeholder={$t("AnimationImpactShowcase__t49", "Tell us about your project")}
                      value={formData.projectDetails}
                      onChange={handleTextChange}
                      className="w-full px-3.5 pt-2.5 pb-6 rounded-xl bg-[#f8fafc] border border-slate-200/90 text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all resize-none"
                    />
                    {/* Live Character Count */}
                    <span className="absolute right-3 bottom-2 text-[10px] font-semibold text-slate-400">
                      {charCount}{$t("AnimationImpactShowcase__t50", "/500")}</span>
                  </div>

                  {/* High-Impact Gradient Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-3 rounded-full bg-gradient-to-r from-[#00bcd4] via-[#0288d1] to-[#7c3aed] hover:from-[#00acc1] hover:to-[#6d28d9] text-white font-sans font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-cyan-500/25 flex items-center justify-between group transition-all duration-300 hover:shadow-cyan-500/40 hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
                  >
                    {/* Circular Cyan badge with White Paper Airplane */}
                    <div className="w-7 h-7 rounded-full bg-[#00bcd4] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                      <svg className="w-3.5 h-3.5 fill-current transform -rotate-45 -translate-y-0.5 translate-x-0.5" viewBox="0 0 24 24">
                        <polygon points="2 2 22 12 14 14 12 22 2 2" />
                      </svg>
                    </div>

                    <span className="font-bold text-white text-xs sm:text-sm font-sans">
                      {isSubmitting ? $t("AnimationImpactShowcase__t51", "Sending...") : $t("AnimationImpactShowcase__t52", "Get My Free Quote")}
                    </span>

                    {/* Right Arrow */}
                    <span className="text-white text-sm font-bold pr-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>

                </form>
              )}

              {/* Privacy Reassurance with Lock Icon */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] text-slate-400">
                <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>{$t("AnimationImpactShowcase__t53", "100% Privacy Guaranteed. No spam, ever.")}</span>
              </div>

            </div>

          </div>

        </div>

        {/* =========================================================
            BOTTOM ROW: 4 Key Stats (Left) + 3-Step Connected Process Track (Right)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left: 4 Key Stats Pill Card (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-white rounded-2xl py-4 px-6 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-center text-center">
              
              {/* Stat 1: 200+ */}
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-[28px] font-playfair font-black text-slate-900 tracking-tight leading-none">
                  {$t("AnimationImpactShowcase__t54", "200+")}</span>
                <span className="text-[10.5px] font-semibold text-slate-400 mt-1">
                  {$t("AnimationImpactShowcase__t55", "Projects Delivered")}</span>
              </div>

              {/* Stat 2: 50+ */}
              <div className="flex flex-col items-center sm:border-l border-slate-100">
                <span className="text-2xl sm:text-[28px] font-playfair font-black text-slate-900 tracking-tight leading-none">
                  {$t("AnimationImpactShowcase__t56", "50+")}</span>
                <span className="text-[10.5px] font-semibold text-slate-400 mt-1">
                  {$t("AnimationImpactShowcase__t57", "Happy Clients")}</span>
              </div>

              {/* Stat 3: 4.9/5 */}
              <div className="flex flex-col items-center sm:border-l border-slate-100">
                <span className="text-2xl sm:text-[28px] font-playfair font-black text-slate-900 tracking-tight leading-none">
                  {$t("AnimationImpactShowcase__t58", "4.9")}<span className="text-base text-slate-400 font-normal">{$t("AnimationImpactShowcase__t59", "/5")}</span>
                </span>
                <span className="text-[10.5px] font-semibold text-slate-400 mt-0.5">
                  {$t("AnimationImpactShowcase__t60", "Client Rating")}</span>
                <div className="text-amber-400 text-[10px] mt-0.5">
                  ★★★★★
                </div>
              </div>

              {/* Stat 4: 98% */}
              <div className="flex flex-col items-center sm:border-l border-slate-100">
                <span className="text-2xl sm:text-[28px] font-playfair font-black text-slate-900 tracking-tight leading-none">
                  98%
                </span>
                <span className="text-[10.5px] font-semibold text-slate-400 mt-1">
                  {$t("AnimationImpactShowcase__t61", "Repeat Business")}</span>
              </div>

            </div>
          </div>

          {/* Right: 3-Step Connected Process Flow (lg:col-span-6) */}
          <div className="lg:col-span-6 relative">
            
            {/* Flowing gradient wave threading through the 3 icon centres (at 1/6, 3/6, 5/6 width) */}
            <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none z-0">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 48" preserveAspectRatio="none" fill="none">
                <defs>
                  <linearGradient id="processWave" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity="0" />
                    <stop offset="12%" stopColor="#14b8a6" />
                    <stop offset="50%" stopColor="#7c3aed" />
                    <stop offset="85%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                  </linearGradient>
                  <filter id="processWaveGlow" x="-10%" y="-100%" width="120%" height="300%">
                    <feGaussianBlur stdDeviation="3" />
                  </filter>
                </defs>
                {/* Soft glow copy */}
                <path
                  d="M 0 38 C 45 38, 60 24, 100 24 C 170 24, 220 42, 300 24 C 380 6, 430 8, 500 24 C 545 34, 575 12, 600 6"
                  stroke="url(#processWave)"
                  strokeWidth="6"
                  opacity="0.35"
                  filter="url(#processWaveGlow)"
                />
                {/* Crisp line */}
                <path
                  d="M 0 38 C 45 38, 60 24, 100 24 C 170 24, 220 42, 300 24 C 380 6, 430 8, 500 24 C 545 34, 575 12, 600 6"
                  stroke="url(#processWave)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* 3 Step Nodes: icon on top, number + label underneath */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 relative z-10">

              {/* Step 01 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#0d9488] text-white flex items-center justify-center border-[3px] border-white shadow-[0_0_0_5px_rgba(13,148,136,0.15),0_10px_22px_-4px_rgba(13,148,136,0.5)]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    <path d="m9 14 2 2 4-4" />
                  </svg>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2 mt-3">
                  <span className="text-base sm:text-lg font-black text-[#0d9488] leading-none">{$t("AnimationImpactShowcase__t62", "01")}</span>
                  <p className="text-[10.5px] sm:text-[11.5px] font-bold text-slate-800 leading-tight">
                    {rich($t("AnimationImpactShowcase__t63", "We Review "))}<br /> {rich($t("AnimationImpactShowcase__t64", "Your Requirements"))}</p>
                </div>
              </div>

              {/* Step 02 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center border-[3px] border-white shadow-[0_0_0_5px_rgba(124,58,237,0.15),0_10px_22px_-4px_rgba(124,58,237,0.5)]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.4 2.6a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4Z" />
                  </svg>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2 mt-3">
                  <span className="text-base sm:text-lg font-black text-[#7c3aed] leading-none">{$t("AnimationImpactShowcase__t65", "02")}</span>
                  <p className="text-[10.5px] sm:text-[11.5px] font-bold text-slate-800 leading-tight">
                    {rich($t("AnimationImpactShowcase__t66", "Get a Custom "))}<br /> {rich($t("AnimationImpactShowcase__t67", "Plan & Quote"))}</p>
                </div>
              </div>

              {/* Step 03 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#2563eb] text-white flex items-center justify-center border-[3px] border-white shadow-[0_0_0_5px_rgba(37,99,235,0.15),0_10px_22px_-4px_rgba(37,99,235,0.5)]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2 11 13" />
                    <path d="M22 2 15 22l-4-9-9-4Z" />
                  </svg>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2 mt-3">
                  <span className="text-base sm:text-lg font-black text-[#2563eb] leading-none">{$t("AnimationImpactShowcase__t68", "03")}</span>
                  <p className="text-[10.5px] sm:text-[11.5px] font-bold text-slate-800 leading-tight">
                    {rich($t("AnimationImpactShowcase__t69", "We Bring Your "))}<br /> {rich($t("AnimationImpactShowcase__t70", "Vision to Life"))}</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =========================================================
          INTERACTIVE CASE STUDY LIGHTBOX MODAL
          ========================================================= */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
            
            {/* Modal Overlay Click to Close */}
            <div
              className="absolute inset-0"
              onClick={() => setActiveModalProject(null)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-100"
            >
              {/* Media Header */}
              <div className="relative h-64 sm:h-72 w-full bg-slate-900">
                <Image
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors z-20 cursor-pointer"
                >
                  ✕
                </button>

                {/* Badges on Hero */}
                <div className="absolute bottom-4 left-6 z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#00bcd4] text-white text-[11px] font-extrabold tracking-wider uppercase mb-1">
                    {activeModalProject.category}
                  </span>
                  <h3 className="text-h5 font-bold text-white tracking-tight">
                    {activeModalProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8">
                <p className="text-small text-slate-600 mb-6">
                  {activeModalProject.description}
                </p>

                <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {$t("AnimationImpactShowcase__t71", "Client")}</span>
                    <span className="text-sm font-bold text-slate-800">
                      {activeModalProject.client}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {$t("AnimationImpactShowcase__t72", "Production Timeline")}</span>
                    <span className="text-sm font-bold text-slate-800">
                      {activeModalProject.timeline}
                    </span>
                  </div>
                </div>

                {/* Deliverables */}
                <div className="mt-5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    {$t("AnimationImpactShowcase__t73", "Key Deliverables:")}</span>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.deliverables.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => {
                      setActiveModalProject(null);
                      const el = document.getElementById("contact-form");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00bcd4] to-[#0288d1] text-white text-xs font-bold shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    {$t("AnimationImpactShowcase__t74", "Start a Project Like This →")}</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
