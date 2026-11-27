"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { display, heading } from "./MagentoShared";
import { useCmsText } from "@/components/cms/SectionContent";
import { html } from "@/components/cms/rich";

export { display, heading };

export const TEAL = "#0f766e";
export const TEAL_MID = "#14a39a";
export const NAVY = "#0b1b33";
export const ease = [0.22, 1, 0.36, 1] as const;

/** Images for the AI SEO page live in /public/ai-seo (robots copied from /public/AI Seo, the rest cropped from the design). */
export const AI = {
  robotDesk: "/ai-seo/robot-desk.webp",
  robotPoint: "/ai-seo/robot-point.webp",
  robotHuman: "/ai-seo/robot-human.webp",
  robotPresent: "/ai-seo/robot-presenter.webp",
  robotStand: "/ai-seo/robot-stand.webp",
  interior1: "/ai-seo/interior-1.webp",
  interior2: "/ai-seo/interior-2.webp",
  caseLaptop: "/ai-seo/case-laptop.webp",
  casePhone: "/ai-seo/case-phone.webp",
  rocket: "/ai-seo/rocket.webp",
  avatars: "/ai-seo/avatars.webp",
  thumbs: ["/ai-seo/thumb-1.webp", "/ai-seo/thumb-2.webp", "/ai-seo/thumb-3.webp", "/ai-seo/thumb-4.webp", "/ai-seo/thumb-5.webp"],
};

/** Feathers all four edges of a photo so its baked-in background melts into the section. */
export const FADE: React.CSSProperties = {
  maskImage:
    "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent), linear-gradient(180deg, transparent, #000 9%, #000 88%, transparent)",
  maskComposite: "intersect",
  WebkitMaskImage:
    "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent), linear-gradient(180deg, transparent, #000 9%, #000 88%, transparent)",
  WebkitMaskComposite: "source-in",
};

/** Oval feather: a photo's pale backdrop dissolves into whatever is behind it. */
export const oval = (inner = 70): React.CSSProperties => ({
  maskImage: `radial-gradient(50% 50% at 50% 50%, #000 ${inner}%, transparent 100%)`,
  WebkitMaskImage: `radial-gradient(50% 50% at 50% 50%, #000 ${inner}%, transparent 100%)`,
});

/**
 * Every section of the design sits in a soft grey rounded panel on the white page
 * (1656px wide on a 1920 artboard, content 1500px).
 */
export function Panel({
  children,
  id,
  className = "",
  inner = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  inner?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-24 ${className}`}>
      <div className={`relative w-full overflow-hidden bg-[#f5f7fb] ${inner}`}>
        {children}
      </div>
    </section>
  );
}

/** Content column inside a Panel. */
export function Inner({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative mx-auto w-full max-w-[1500px] px-4 sm:px-8 lg:px-12 2xl:px-0 ${className}`}>{children}</div>;
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08, ease } }),
};

/** Keyframes used across the AI SEO sections (rendered once by the page). */
export function AiSeoStyles() {
  const $t = useCmsText();
  return (
    <style>{`
      @keyframes aiFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
      @keyframes aiFlow { to { stroke-dashoffset: -40; } }
      @keyframes aiPing { 0% { transform: scale(.6); opacity: .7 } 100% { transform: scale(1.9); opacity: 0 } }
      @keyframes aiSpin { to { transform: rotate(360deg); } }
      @keyframes aiShine { 0% { background-position: 200% 50% } 100% { background-position: -200% 50% } }
      @keyframes aiBlink { 0%,100% { opacity: 1 } 50% { opacity: .25 } }
      @keyframes aiType { from { width: 0 } to { width: 100% } }
      @keyframes aiMarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
      @keyframes aiWave { 0% { stroke-dashoffset: 120 } 100% { stroke-dashoffset: 0 } }
      .ai-float { animation: aiFloat 5s ease-in-out infinite; }
      .ai-flow { stroke-dasharray: 4 6; animation: aiFlow 1.6s linear infinite; }
      .ai-shine { background-size: 200% 100%; animation: aiShine 6s linear infinite; }
      @media (prefers-reduced-motion: reduce) {
        .ai-anim, .ai-float, .ai-flow, .ai-shine { animation: none !important; }
      }
    `}</style>
  );
}

/** Rounded "✦ LABEL" pill above headings. */
export function Pill({ children, className = "", dark = false }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs ${
        dark ? "border-white/15 bg-white/5 text-teal-200" : "border-teal-100 bg-teal-50/70 text-[#0f766e]"
      } ${className}`}
    >
      <Sparkle className="h-3.5 w-3.5" />
      {children}
    </motion.span>
  );
}

export function Sparkle({ className = "h-4 w-4", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill={color} d="M12 1.5c.5 5.6 4.9 10 10.5 10.5-5.6.5-10 4.9-10.5 10.5C11.5 16.9 7.1 12.5 1.5 12 7.1 11.5 11.5 7.1 12 1.5z" />
    </svg>
  );
}

/** Heading with a teal-highlighted fragment: "How Your [AI SEO] Team Works". */
export function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease }}
      className={`text-h2 ${heading.className} font-bold tracking-[-0.02em] text-[#0b1b33] ${className}`}
    >
      {children}
    </motion.h2>
  );
}

export function Hl({ children }: { children: React.ReactNode }) {
  return <span className="text-[#0f766e]">{children}</span>;
}

export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PlayCircle({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 8.2v7.6L16 12z" fill="currentColor" />
    </svg>
  );
}

/** Primary (filled teal) and secondary (outlined) CTA buttons. */
export function CtaButton({
  href = "#ai-seo-strategy",
  children,
  variant = "primary",
  className = "",
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base = "group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 sm:text-[15px]";
  if (variant === "ghost")
    return (
      <a href={href} className={`${base} border border-[#0f766e]/40 bg-white text-[#0f766e] hover:border-[#0f766e] hover:shadow-[0_10px_30px_-12px_rgba(15,118,110,.45)] ${className}`}>
        {children}
        <PlayCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      </a>
    );
  return (
    <a
      href={href}
      className={`${base} relative overflow-hidden bg-gradient-to-r from-[#0f766e] to-[#14a39a] text-white shadow-[0_14px_30px_-12px_rgba(15,118,110,.7)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-12px_rgba(15,118,110,.8)] ${className}`}
    >
      <span className="ai-shine pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,.28)_50%,transparent_65%)]" aria-hidden />
      <span className="relative">{children}</span>
      <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Platform marks (simplified, monochrome-friendly glyphs)            */
/* ------------------------------------------------------------------ */

export type Brand =
  | "google"
  | "gemini"
  | "chatgpt"
  | "claude"
  | "perplexity"
  | "copilot"
  | "youtube"
  | "maps"
  | "voice"
  | "more"
  | "aioverview";

export function BrandIcon({ name, className = "h-5 w-5" }: { name: Brand; className?: string }) {
  // unique per instance: a gradient defined inside a display:none copy can't be referenced by visible ones
  const gid = React.useId();
  switch (name) {
    case "google":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden>
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
        </svg>
      );
    case "gemini":
    case "aioverview":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={name === "gemini" ? "#4f8ff7" : "#0f766e"} />
              <stop offset="1" stopColor={name === "gemini" ? "#9b72f2" : "#14a39a"} />
            </linearGradient>
          </defs>
          <path fill={`url(#${gid})`} d="M12 1.5c.5 5.6 4.9 10 10.5 10.5-5.6.5-10 4.9-10.5 10.5C11.5 16.9 7.1 12.5 1.5 12 7.1 11.5 11.5 7.1 12 1.5z" />
        </svg>
      );
    case "chatgpt":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#10a37f" strokeWidth="1.6" aria-hidden>
          {[0, 60, 120, 180, 240, 300].map((r) => (
            <path key={r} transform={`rotate(${r} 12 12)`} d="M12 3.2c2.6 0 4.4 1.6 4.4 4v5.2L12 15" strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </svg>
      );
    case "claude":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <g stroke="#d97757" strokeWidth="2.4" strokeLinecap="round">
            {[0, 30, 60, 90, 120, 150].map((r) => (
              <path key={r} transform={`rotate(${r} 12 12)`} d="M12 2.5v19" />
            ))}
          </g>
        </svg>
      );
    case "perplexity":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#20808d" strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
          <path d="M12 2v20M5 6l7 6 7-6M5 6v9l7-3 7 3V6M5 15l7 6 7-6M3.5 9h17" />
        </svg>
      );
    case "copilot":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect x="2" y="2" width="9.5" height="9.5" fill="#f25022" />
          <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7fba00" />
          <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00a4ef" />
          <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#ffb900" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect x="1.5" y="5" width="21" height="14" rx="4" fill="#ff0000" />
          <path d="M10 9v6l5.2-3z" fill="#fff" />
        </svg>
      );
    case "maps":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill="#ea4335" d="M12 1.8A7.2 7.2 0 0 0 4.8 9c0 5.4 7.2 13.2 7.2 13.2S19.2 14.4 19.2 9A7.2 7.2 0 0 0 12 1.8z" />
          <path fill="#fbbc04" d="M4.8 9c0 2 .9 4.2 2.1 6.2L12 9.6V1.8A7.2 7.2 0 0 0 4.8 9z" opacity=".9" />
          <path fill="#34a853" d="M6.9 15.2c2 3.4 5.1 7 5.1 7s2.4-2.6 4.3-5.6L12 9.6z" opacity=".85" />
          <circle cx="12" cy="9" r="2.7" fill="#fff" />
        </svg>
      );
    case "voice":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" />
        </svg>
      );
    case "more":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#0f766e" strokeWidth="1.6" aria-hidden>
          <circle cx="12" cy="12" r="9" strokeDasharray="2.5 2.5" />
          <circle cx="8" cy="12" r="1.2" fill="#0f766e" />
          <circle cx="12" cy="12" r="1.2" fill="#0f766e" />
          <circle cx="16" cy="12" r="1.2" fill="#0f766e" />
        </svg>
      );
  }
}

/** Tiny animated sparkline used on stat cards. */
export function Spark({ color = "#14a39a", className = "h-8 w-full", points = "0,26 12,22 22,24 34,15 46,18 58,9 70,12 82,4 100,2" }: { color?: string; className?: string; points?: string }) {
  const id = React.useId();
  return (
    <motion.svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity=".25" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,30 ${points} 100,30`} fill={`url(#${id})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </motion.svg>
  );
}

/** Serif-ish wordmarks of the sample clients ("Trusted by …" row). */
export function ClientWordmarks({ className = "" }: { className?: string }) {
  const $t = useCmsText();
  const marks = [
    { big: $t("AiSeoShared__t2", "LUXE"), small: $t("AiSeoShared__t3", "INTERIORS"), serif: true, spread: true },
    { big: $t("AiSeoShared__t4", "urban space"), small: $t("AiSeoShared__t5", "DESIGNS"), serif: false },
    { big: $t("AiSeoShared__t6", "HOME NEST"), small: $t("AiSeoShared__t7", "COLLECTION"), serif: true },
    { big: $t("AiSeoShared__t8", "DÉCOR"), small: $t("AiSeoShared__t9", "CRAFT"), serif: true, spread: true },
  ];
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-[#4b5675] sm:gap-x-0 ${className}`}>
      {marks.map((m) => (
        <div key={m.big} className="flex flex-col items-center px-5 leading-none sm:border-r sm:border-slate-200 sm:px-8 lg:px-10">
          <span
            className={`${m.serif ? "font-serif" : ""} ${m.spread ? "tracking-[0.3em]" : m.serif ? "tracking-[0.12em]" : "tracking-tight"} text-[17px] sm:text-xl 2xl:text-[25px]`}
          >
            {m.big}
          </span>
          <span className="mt-1 text-[7.5px] font-medium tracking-[0.35em] sm:text-[8px] 2xl:text-[10px]">{m.small}</span>
        </div>
      ))}
      <div className="flex items-center gap-2 px-5 sm:px-8 lg:px-10">
        <span className="flex h-7 w-7 items-end justify-center rounded-full border-[1.5px] border-[#4b5675] pb-1">
          <span className="h-3.5 w-2.5 rounded-t-full border-[1.5px] border-b-0 border-[#4b5675]" />
        </span>
        <span className="text-[17px] tracking-tight sm:text-lg 2xl:text-[23px]">{html($t("AiSeoShared__t10", "studio oak"))}</span>
      </div>
    </div>
  );
}
