"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Container from "../shared/Container";

interface ServiceItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  features: string[];
  tools: string[];
  accentColor: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "3d-motion",
    tag: "3D & CGI",
    title: "3D Motion Graphics & Visual Effects",
    description:
      "Transforming complex ideas into cinematic 3D animations, product renders, and hyper-realistic physics simulations that demand attention.",
    features: [
      "Photorealistic 3D Product Demos",
      "Dynamic Camera Moves & Spatial Typography",
      "Liquid, Cloth & Particle Simulations",
      "Cinema-grade Lighting & Texturing",
    ],
    tools: ["Blender", "Cinema 4D", "Octane / Redshift", "After Effects"],
    accentColor: "#0d9488",
  },
  {
    id: "2d-explainer",
    tag: "2D & VECTOR",
    title: "2D Explainer & SaaS Product Videos",
    description:
      "Engaging 2D character and vector animations crafted to simplify technical concepts, onboard users, and boost conversion rates for SaaS & tech.",
    features: [
      "Story-driven Explainer Videos",
      "Interactive Lottie & Web Animations",
      "Character Design & Rigging",
      "Infographic & Data Visualization",
    ],
    tools: ["After Effects", "Illustrator", "LottieFiles", "Animate"],
    accentColor: "#6366f1",
  },
  {
    id: "brand-identity",
    tag: "BRANDING",
    title: "Brand Identity & Graphic Design Systems",
    description:
      "Memorable logos, cohesive design languages, typography systems, and brand guidelines that position your company as an industry benchmark.",
    features: [
      "Logo Design & Animated Brand Marks",
      "Comprehensive Brand Guidelines",
      "Color Palettes & Typography Systems",
      "Iconography & Vector Illustrations",
    ],
    tools: ["Figma", "Illustrator", "Photoshop", "InDesign"],
    accentColor: "#0284c7",
  },
  {
    id: "ad-creatives",
    tag: "MARKETING",
    title: "High-Converting Ad Creatives & Motion Ads",
    description:
      "Hook-focused short-form video ads for Meta, TikTok, YouTube Shorts, and Google Performance Max, engineered for high click-through rates.",
    features: [
      "First-3-Seconds Scroll Stopper Hooks",
      "Multi-aspect Exports (9:16, 1:1, 16:9)",
      "Dynamic UGC & Motion Graphic Mashups",
      "A/B Variant Creative Batches",
    ],
    tools: ["Premiere Pro", "CapCut Pro", "After Effects", "Photoshop"],
    accentColor: "#e11d48",
  },
  {
    id: "uiux-visual",
    tag: "DIGITAL",
    title: "UI/UX & Interactive Product Visuals",
    description:
      "High-fidelity UI mockups, interactive prototypes, micro-interactions, and futuristic app walk-through animations that wow investors and users.",
    features: [
      "Interactive High-Fidelity Prototypes",
      "Smooth Micro-Interactions & Gestures",
      "Device Mockups & 3D Clay Frames",
      "Design System Component Libraries",
    ],
    tools: ["Figma", "ProtoPie", "Framer", "Spline 3D"],
    accentColor: "#14b8a6",
  },
  {
    id: "marketing-collateral",
    tag: "PRINT & DIGITAL",
    title: "Marketing Collateral & Packaging Design",
    description:
      "Premium print collaterals, trade show banners, pitch decks, and physical packaging designs that leave a lasting real-world impression.",
    features: [
      "Investor Pitch Decks & Keynotes",
      "Retail & E-commerce Product Packaging",
      "Trade Show Displays & Event Banners",
      "Whitepapers, E-books & Broadsheets",
    ],
    tools: ["Illustrator", "InDesign", "Photoshop", "Dimension 3D"],
    accentColor: "#8b5cf6",
  },
];

export default function AnimationServicesGrid() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered = activeTab === "all"
    ? servicesData
    : servicesData.filter((s) => s.id === activeTab || s.tag.toLowerCase().includes(activeTab));

  return (
    <section className="relative w-full bg-[#f8fafc] py-20 sm:py-28 overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-[11px] font-bold tracking-widest text-[#0d9488] uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#0d9488] animate-pulse" />
            WHAT WE CREATE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Full-Spectrum Animation &amp; <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d9488] via-[#0891b2] to-[#6366f1]">
              Graphic Design Services
            </span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            From photorealistic 3D motion graphics to complete brand identities, we blend artistic vision with digital craft to produce unforgettable visual experiences.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { id: "all", label: "All Services" },
            { id: "3d", label: "3D & CGI Motion" },
            { id: "2d", label: "2D & Explainer" },
            { id: "brand", label: "Branding & Identity" },
            { id: "marketing", label: "Ad Creatives" },
            { id: "digital", label: "UI/UX Visuals" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#0d9488] text-white shadow-md shadow-teal-700/20"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(13,148,136,0.15)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: service.accentColor }}
              />

              <div>
                {/* Badge Tag */}
                <span
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase mb-4"
                  style={{
                    backgroundColor: `${service.accentColor}15`,
                    color: service.accentColor,
                  }}
                >
                  {service.tag}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 tracking-tight leading-snug mb-3 group-hover:text-[#0d9488] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Feature Checkmarks */}
                <ul className="space-y-2.5 mb-6">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                      <svg
                        className="w-4 h-4 text-[#0d9488] shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools tags footer */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Software &amp; Tools
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {service.tools.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
