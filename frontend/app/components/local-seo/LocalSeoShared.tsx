"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { ease, heading } from "../shared/AiSeoShared";

/* The Local SEO page reuses the AI SEO building blocks (panel layout, buttons, brand marks, keyframes). */
export { AiSeoStyles as LocalSeoStyles, BrandIcon, Inner, Panel, Spark, ease, heading, oval, ArrowRight, PlayCircle } from "../shared/AiSeoShared";

/** Images in /public/local-seo (scenes copied from /public/local seo, the rest cropped from the design). */
export const LS = {
  heroScene: "/local-seo/hero-scene.webp",
  routeScene: "/local-seo/route-map.webp",
  contactMap: "/local-seo/contact-shop-pin.webp",
  cityMapBg: "/local-seo/city-map-bg.webp",
  cityscape: "/local-seo/cityscape.webp",
  cornerShop: "/local-seo/corner-shop.webp",
  journeyMap: "/local-seo/journey-map.webp",
  journeyPhoto: "/local-seo/journey-photo.webp",
  journeyShop: "/local-seo/journey-shop.webp",
  journeyRoute: "/local-seo/journey-route.webp",
  gbpPhoto: "/local-seo/gbp-photo.webp",
  gbpThumbs: ["/local-seo/gbp-thumb-1.webp", "/local-seo/gbp-thumb-2.webp", "/local-seo/gbp-thumb-3.webp"],
  sarah: "/local-seo/avatar-sarah.webp",
  avatars: "/local-seo/avatars.webp",
  plumbers: ["/local-seo/plumber-1.webp", "/local-seo/plumber-2.webp", "/local-seo/plumber-3.webp"],
};

export const TEAL = "#0f766e";
export const INK = "#0b1b33";

/** "📍 LABEL" eyebrow used above the Local SEO headings. */
export function LPill({ children, className = "", soft = false }: { children: React.ReactNode; className?: string; soft?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0f766e] sm:text-xs 2xl:px-5 2xl:py-2 2xl:text-[14px] ${
        soft ? "border-transparent bg-teal-50" : "border-teal-200/80 bg-white/70"
      } ${className}`}
    >
      <MapPin className="h-3.5 w-3.5 2xl:h-4 2xl:w-4" strokeWidth={2.2} />
      {children}
    </motion.span>
  );
}

/** Section heading that fades up; size is fluid so it keeps the design's proportions on every screen. */
export function LH2({ children, className = "", size = "text-[clamp(30px,2.95vw,57px)]" }: { children: React.ReactNode; className?: string; size?: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease }}
      className={`${heading.className} ${size} font-bold leading-[1.1] tracking-[-0.02em] text-[#0b1b33] ${className}`}
    >
      {children}
    </motion.h2>
  );
}

export function T({ children }: { children: React.ReactNode }) {
  return <span className="text-[#0f766e]">{children}</span>;
}

/** Hand-drawn teal swash under a word. */
export function Swash({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 14" preserveAspectRatio="none" className={`pointer-events-none absolute left-0 w-full ${className}`} aria-hidden>
      <motion.path
        d="M3 10 C 50 3, 120 2, 197 7"
        fill="none"
        stroke="#0f766e"
        strokeWidth="3.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
      />
    </svg>
  );
}

export function Stars({ n = 5, className = "h-3.5 w-3.5", color = "text-amber-400", of = 5 }: { n?: number; className?: string; color?: string; of?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: of }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`${className} fill-current ${i < n ? color : "text-slate-200"}`} aria-hidden>
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
        </svg>
      ))}
    </span>
  );
}

/** Rectangular CTA buttons used across the Local SEO design (rounded-lg, not pills). */
export function LButton({
  href = "#local-seo-contact",
  children,
  variant = "primary",
  className = "",
  icon,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  icon?: React.ReactNode;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-lg px-6 py-3.5 text-[15px] font-semibold transition-all duration-300 2xl:px-8 2xl:py-4 2xl:text-[17px]";
  if (variant === "ghost")
    return (
      <a href={href} className={`${base} border border-slate-300 bg-white text-[#0b1b33] hover:border-[#0f766e] hover:text-[#0f766e] ${className}`}>
        {icon}
        {children}
      </a>
    );
  return (
    <a href={href} className={`${base} bg-[#0f766e] text-white shadow-[0_14px_30px_-14px_rgba(15,118,110,.8)] hover:-translate-y-0.5 hover:bg-[#0d6b64] ${className}`}>
      <span className="ai-shine pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,.22)_50%,transparent_65%)]" aria-hidden />
      <span className="relative">{children}</span>
      <svg viewBox="0 0 24 24" className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 12h16M14 6l6 6-6 6" />
      </svg>
    </a>
  );
}

/** Coloured "Google" word-mark (text, not the logo file). */
export function GoogleWord({ className = "" }: { className?: string }) {
  const c = ["#4285F4", "#EA4335", "#FBBC05", "#4285F4", "#34A853", "#EA4335"];
  return (
    <span className={`font-semibold tracking-tight ${className}`} aria-label="Google">
      {"Google".split("").map((ch, i) => (
        <span key={i} style={{ color: c[i] }}>
          {ch}
        </span>
      ))}
    </span>
  );
}
