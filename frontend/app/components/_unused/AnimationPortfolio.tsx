"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../shared/Container";

interface ProjectItem {
  id: string;
  title: string;
  category: "3d" | "2d" | "branding" | "uiux";
  categoryLabel: string;
  description: string;
  image: string;
  tags: string[];
  metrics: string;
}

const projects: ProjectItem[] = [
  {
    id: "p1",
    title: "Spatial Pro 3D Product Launch",
    category: "3d",
    categoryLabel: "3D Motion",
    description: "Futuristic 3D mechanical breakdown and product animation for high-fidelity audio equipment.",
    image: "/headphones.webp",
    tags: ["Blender", "CGI", "Product Render"],
    metrics: "+340% Landing Page Engagement",
  },
  {
    id: "p2",
    title: "EcoPack Sustainable Brand Identity",
    category: "branding",
    categoryLabel: "Branding",
    description: "Complete visual identity, packaging design system, and animated logo mark for eco-conscious gear.",
    image: "/backpack.webp",
    tags: ["Branding", "Packaging", "Figma"],
    metrics: "Featured on Behance Best of Branding",
  },
  {
    id: "p3",
    title: "Luxera Modern Apparel Showcase",
    category: "3d",
    categoryLabel: "3D Motion",
    description: "Dynamic 3D cloth physics and digital runway showcase for an emerging premium apparel brand.",
    image: "/red-jacket.webp",
    tags: ["Marvelous Designer", "Cloth Sim", "4K Video"],
    metrics: "4.8x Return on Ad Spend (ROAS)",
  },
  {
    id: "p4",
    title: "FinFlow SaaS Explainer Animation",
    category: "2d",
    categoryLabel: "2D Explainer",
    description: "Energetic 2D character-driven explainer video demonstrating automated invoicing and cross-border payroll.",
    image: "/furnisher.webp",
    tags: ["After Effects", "Character Rigging", "Voiceover"],
    metrics: "62% Increase in Trial Signups",
  },
  {
    id: "p5",
    title: "Luxe Minimalist Watch Visuals",
    category: "uiux",
    categoryLabel: "UI/UX & 3D",
    description: "Interactive 3D configurator visuals and interface animations for bespoke luxury timepieces.",
    image: "/lux.webp",
    tags: ["Spline 3D", "Interactive Web", "Micro-motion"],
    metrics: "Over 1.2M Social Impressions",
  },
  {
    id: "p6",
    title: "Aura Smart Living Mobile Motion",
    category: "uiux",
    categoryLabel: "UI/UX & 2D",
    description: "Fluid micro-interactions, gesture animations, and dark-mode interface mockups for IoT smart homes.",
    image: "/project4.webp",
    tags: ["ProtoPie", "Figma", "Lottie"],
    metrics: "App Store Editor's Choice Award",
  },
];

export default function AnimationPortfolio() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="relative w-full bg-[#f8fafc] py-20 sm:py-28 overflow-hidden">
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-[11px] font-bold tracking-widest text-[#0d9488] uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
              CREATIVE SHOWCASE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Featured Motion &amp; <br />
              <span className="text-[#0d9488]">Design Projects</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Works" },
              { id: "3d", label: "3D Motion" },
              { id: "2d", label: "2D Explainer" },
              { id: "branding", label: "Branding" },
              { id: "uiux", label: "UI/UX Visuals" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeFilter === tab.id
                    ? "bg-[#0d9488] text-white shadow-md shadow-teal-700/20"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-teal-900/10 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Category Pill Over Image */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider text-slate-800 shadow-sm">
                      {project.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug mb-2 group-hover:text-[#0d9488] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metric / Highlight */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0d9488]">
                      <span>{project.metrics}</span>
                      <span className="text-slate-400 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
