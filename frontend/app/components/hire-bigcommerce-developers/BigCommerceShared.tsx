"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Icon, ease, heading, type IconName } from "../shared/MagentoShared";
import { useCmsText } from "@/components/cms/SectionContent";

export { ArrowRight, DotGrid, Eyebrow, Icon, ease, fadeUp, heading, useSeen, MagentoStyles, type IconName } from "../shared/MagentoShared";

export const NAVY = "#0b1a4a";
export const TEAL = "#0d8f9a";
export const BLUE = "#2348e6";

export const BC = {
  heroDev: { src: "/big-ecommerce/hero-dev.webp", w: 1500, h: 1049 },
  coding: { src: "/big-ecommerce/coding.webp", w: 1736, h: 906 },
  monitor: { src: "/big-ecommerce/monitor.webp", w: 1314, h: 1197 },
  laptop: { src: "/big-ecommerce/laptop3d.webp", w: 1543, h: 1019 },
  home: { src: "/big-ecommerce/home-showcase.webp", w: 1753, h: 897 },
  office: { src: "/big-ecommerce/office.webp", w: 1729, h: 910 },
};

/** Where the "talk to us" CTAs on this page scroll to. */
export const QUOTE_HREF = "#bigcommerce-quote";

/* ------------------------------------------------------------------ */
/* Perspective overlay: map a W×H box onto a 4-corner quad of an image */
/* ------------------------------------------------------------------ */

type Pt = [number, number];

/** CSS matrix3d that maps a w×h box (origin 0 0) onto the quad TL, TR, BR, BL. */
export function quadMatrix(w: number, h: number, [p0, p1, p2, p3]: [Pt, Pt, Pt, Pt]) {
  const [x0, y0] = p0, [x1, y1] = p1, [x2, y2] = p2, [x3, y3] = p3;
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / den;
  const hh = (dx1 * dy3 - dx3 * dy1) / den;
  const a = x1 - x0 + g * x1, b = x3 - x0 + hh * x3, c = x0;
  const d = y1 - y0 + g * y1, e = y3 - y0 + hh * y3, f = y0;
  const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, hh / h, 0, 0, 1, 0, c, f, 0, 1];
  return `matrix3d(${m.map((v) => +v.toFixed(8)).join(",")})`;
}

/** Width of an element, kept in sync with a ResizeObserver. */
export function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

/**
 * Renders `children` (laid out in a `boxW`×`boxH` box) onto a screen inside an image.
 * Must be placed in a relatively-positioned wrapper that is exactly the image's box;
 * `imgW` is the image's natural width and `quad` its screen corners in natural pixels.
 */
export function ScreenOverlay({
  imgW,
  quad,
  boxW,
  boxH,
  scale,
  className = "",
  children,
}: {
  imgW: number;
  quad: [Pt, Pt, Pt, Pt];
  boxW: number;
  boxH: number;
  /** rendered width of the image wrapper (from useWidth) */
  scale: number;
  className?: string;
  children: React.ReactNode;
}) {
  if (!scale) return null;
  const k = scale / imgW;
  return (
    <div
      className={`pointer-events-none absolute left-0 top-0 overflow-hidden ${className}`}
      style={{ width: boxW, height: boxH, transformOrigin: "0 0", transform: `scale(${k}) ${quadMatrix(boxW, boxH, quad)}` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Glossy "3D" icons (blue glass objects in a frosted bubble)           */
/* ------------------------------------------------------------------ */

export type Glyph3D = "rocket" | "chart" | "globe" | "shield" | "puzzle" | "headset" | "cart";

function GlyphShape({ g, id }: { g: Glyph3D; id: string }) {
  const fill = `url(#${id}-f)`;
  const hi = "rgba(255,255,255,0.55)";
  switch (g) {
    case "rocket":
      return (
        <g transform="rotate(40 36 36)">
          <path d="M30 50 36 68 42 50Z" fill="#38bdf8" />
          <path d="M33 50 36 60 39 50Z" fill="#e0f2fe" />
          <path d="M26 36 14 50 26 48Z M46 36 58 50 46 48Z" fill="#1d4ed8" />
          <path d="M36 4C47 13 51 27 48 50H24C21 27 25 13 36 4Z" fill={fill} />
          <circle cx="36" cy="26" r="6" fill="#dbeafe" stroke="#1e3a8a" strokeWidth="2.5" />
          <path d="M31 12c-3 6-4 14-3 24" stroke={hi} strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      );
    case "chart":
      return (
        <g>
          <rect x="10" y="44" width="10" height="20" rx="2" fill={fill} />
          <rect x="24" y="34" width="10" height="30" rx="2" fill={fill} />
          <rect x="38" y="26" width="10" height="38" rx="2" fill={fill} />
          <rect x="52" y="16" width="10" height="48" rx="2" fill={fill} />
          <path d="M8 38 28 22l12 8 20-18" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M52 10h10v10" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      );
    case "globe":
      return (
        <g>
          <circle cx="36" cy="36" r="26" fill={fill} />
          <path d="M20 22c6 2 8 8 4 12s2 10 8 10-2 10 2 14M44 12c-2 6 4 8 8 6s8 6 4 10-8 0-10 6 4 10 0 14" stroke="#bbf7d0" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.85" />
          <ellipse cx="28" cy="24" rx="10" ry="6" fill={hi} transform="rotate(-30 28 24)" />
        </g>
      );
    case "shield":
      return (
        <g>
          <path d="M36 6 60 14v18c0 16-10 28-24 34C22 60 12 48 12 32V14Z" fill={fill} />
          <rect x="26" y="32" width="20" height="16" rx="3" fill="#e0f2fe" />
          <path d="M30 32v-5a6 6 0 0 1 12 0v5" stroke="#e0f2fe" strokeWidth="4" fill="none" />
          <circle cx="36" cy="40" r="2.6" fill="#1d4ed8" />
          <path d="M20 16 36 10" stroke={hi} strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case "puzzle":
      return (
        <g>
          <path d="M14 18h14a6 6 0 1 1 10 0h14v14a6 6 0 1 1 0 10v14H38a6 6 0 1 0-10 0H14V42a6 6 0 1 0 0-10Z" fill={fill} />
          <path d="M18 22h8" stroke={hi} strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case "headset":
      return (
        <g>
          <path d="M14 40v-6a22 22 0 0 1 44 0v6" stroke={fill} strokeWidth="7" fill="none" strokeLinecap="round" />
          <rect x="8" y="36" width="14" height="22" rx="6" fill={fill} />
          <rect x="50" y="36" width="14" height="22" rx="6" fill={fill} />
          <path d="M57 58c0 6-6 8-14 8" stroke="#1d4ed8" strokeWidth="3" fill="none" />
          <circle cx="40" cy="66" r="3" fill="#38bdf8" />
        </g>
      );
    case "cart":
      return (
        <g>
          <path d="M8 14h8l6 30h30l6-22H20" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="26" cy="54" r="4.5" fill="#fff" />
          <circle cx="48" cy="54" r="4.5" fill="#fff" />
          <path d="M26 26h26M28 34h20" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        </g>
      );
  }
}

/** Glossy blue glass object inside a frosted bubble, with a soft halo. */
export function Icon3D({ g, size = 96, active = false, className = "" }: { g: Glyph3D; size?: number; active?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const id = `bc3d-${g}`;
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <span
        aria-hidden
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          active ? "scale-110 bg-blue-400/25 blur-xl" : "scale-90 bg-blue-300/15 blur-lg"
        }`}
      />
      <span className="absolute inset-0 rounded-full border border-white/90 bg-[radial-gradient(circle_at_35%_25%,#ffffff,#eef4ff_55%,#dbe7fb)] shadow-[0_18px_34px_-16px_rgba(35,72,230,0.55),inset_0_-6px_14px_rgba(59,130,246,0.15)]" />
      <motion.svg
        viewBox="0 0 72 72"
        className="relative"
        style={{ width: size * 0.62, height: size * 0.62, filter: "drop-shadow(0 6px 8px rgba(29,78,216,0.35))" }}
        animate={reduce ? undefined : active ? { y: [0, -4, 0], rotate: [0, -4, 4, 0] } : { y: 0, rotate: 0 }}
        transition={{ duration: 1.2 }}
        aria-hidden
      >
        <defs>
          <linearGradient id={`${id}-f`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#60a5fa" />
            <stop offset="0.55" stopColor="#2563eb" />
            <stop offset="1" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
        <GlyphShape g={g} id={id} />
      </motion.svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

/** Blue→teal gradient text. */
export function Grad({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`bg-gradient-to-r from-[#2348e6] via-[#1f6fd6] to-[#0d8f9a] bg-clip-text text-transparent ${className}`}>{children}</span>;
}

/** Hand-drawn underline that draws in when visible. */
export function Swoosh({ className = "", color = "#2348e6" }: { className?: string; color?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg aria-hidden viewBox="0 0 200 16" preserveAspectRatio="none" className={`pointer-events-none absolute ${className}`} fill="none">
      <motion.path
        d="M4 11 C 50 3, 140 2, 196 8"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.5, ease }}
      />
    </svg>
  );
}

/** Caveat note with a curly arrow, e.g. "It's free. It's easy. It's time." */
export function HandNote({ children, className = "", light = false }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 30 30" className={`h-6 w-6 ${light ? "text-white/80" : "text-[#2348e6]"}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        <path d="M22 4c-10 2-16 8-14 18" />
        <path d="m4 18 4 5 5-4" />
      </svg>
      <span className={`font-caveat -rotate-3 text-xl ${light ? "text-white/90" : "text-[#2348e6]"}`}>{children}</span>
    </span>
  );
}

/** Primary pill button (blue→teal gradient). */
export function GradButton({ href = QUOTE_HREF, children, className = "", light = false }: { href?: string; children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-[15px] font-semibold transition hover:-translate-y-0.5 ${
        light
          ? "bg-white text-[#2348e6] shadow-[0_14px_30px_-12px_rgba(0,0,0,0.35)]"
          : "bg-gradient-to-r from-[#2348e6] to-[#1aa3c4] text-white shadow-[0_16px_34px_-14px_rgba(35,72,230,0.8)]"
      } ${className}`}
    >
      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/25 transition-[left] duration-700 group-hover:left-[120%]" />
      <span className="relative">{children}</span>
      <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/** "Ready to …" call-to-action strip used between sections. */
export function CtaStrip({
  title,
  accent,
  text,
  checks,
  dark = false,
  tile = "ring",
}: {
  title: string;
  accent: string;
  text: string;
  checks: { icon: IconName; label: string }[];
  dark?: boolean;
  tile?: "ring" | "square";
}) {
  const $t = useCmsText();
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      className={`relative mx-auto flex max-w-[1080px] flex-col items-center gap-6 overflow-hidden rounded-[24px] px-6 py-7 text-center md:flex-row md:text-left lg:px-10 ${
        dark
          ? "bg-gradient-to-r from-[#0a1d6b] via-[#123c9c] to-[#0b6f98] text-white shadow-[0_30px_60px_-30px_rgba(10,29,107,0.9)]"
          : "border border-white bg-white/70 shadow-[0_30px_60px_-34px_rgba(35,72,230,0.45)] backdrop-blur-md"
      }`}
    >
      {dark && <div aria-hidden className="pointer-events-none absolute -left-10 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-3xl" />}
      {/* tile */}
      <div className="relative flex h-[110px] w-[110px] shrink-0 items-center justify-center">
        {tile === "ring" ? (
          <>
            {[0, 1].map((k) => (
              <motion.span
                key={k}
                aria-hidden
                className={`absolute inset-0 rounded-full border ${dark ? "border-cyan-200/40" : "border-blue-300/50"}`}
                animate={reduce ? undefined : { scale: [0.8, 1.15], opacity: [0.8, 0] }}
                transition={{ duration: 2.4, delay: k * 1.2, repeat: Infinity }}
              />
            ))}
            <span className={`absolute inset-3 rounded-full ${dark ? "border border-cyan-200/50 bg-white/5" : "border border-blue-100 bg-white"} shadow-[0_0_30px_rgba(59,130,246,0.35)]`} />
            <span className="relative flex h-[62px] w-[62px] items-center justify-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1d3fd8] shadow-[0_10px_24px_-8px_rgba(29,63,216,0.9)]">
              <svg viewBox="0 0 72 72" className="h-9 w-9" aria-hidden><GlyphShape g="cart" id="cta" /></svg>
            </span>
          </>
        ) : (
          <motion.span
            animate={reduce ? undefined : { y: [0, -6, 0], rotate: [-4, -2, -4] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-[84px] w-[96px] items-center justify-center rounded-[22px] bg-gradient-to-br from-[#4f8cff] to-[#1d3fd8] shadow-[0_18px_30px_-10px_rgba(29,63,216,0.8),inset_0_2px_6px_rgba(255,255,255,0.4)]"
          >
            <svg viewBox="0 0 72 72" className="h-12 w-12" aria-hidden><GlyphShape g="cart" id="cta2" /></svg>
            <span className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#0d8f9a] text-white shadow-md">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 5 5 9-10" /></svg>
            </span>
          </motion.span>
        )}
      </div>

      <div className="relative flex-1">
        <h3 className={`${heading.className} text-xl font-semibold sm:text-2xl ${dark ? "text-white" : "text-[#0b1a4a]"}`}>
          {title} <span className={dark ? "text-cyan-300" : "text-[#2348e6]"}>{accent}</span>
        </h3>
        <p className={`text-small mt-1 ${dark ? "text-blue-100/85" : "text-slate-600"}`}>{text}</p>
        <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-start">
          {checks.map((c, i) => (
            <li key={c.label} className={`flex items-center gap-2 text-[13px] ${dark ? "text-blue-50/90" : "text-slate-600"} ${i > 0 ? "md:border-l md:pl-5" : ""} ${dark ? "border-white/20" : "border-slate-200"}`}>
              <Icon name={c.icon} className={`h-4 w-4 ${dark ? "text-cyan-200" : "text-[#2348e6]"}`} />
              {c.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative flex shrink-0 flex-col items-center gap-2">
        <GradButton light={dark}>{$t("BigCommerceShared__t1", "Start Your Free Trial")}</GradButton>
        <HandNote light={dark}>{$t("BigCommerceShared__t2", "It’s free. It’s easy. It’s time.")}</HandNote>
      </div>
    </motion.div>
  );
}

/** Row of brand wordmarks (placeholder names — swap for real client logos). */
export function BrandRow({ brands, className = "" }: { brands: { name: string; style: string }[]; className?: string }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-4 ${className}`}
    >
      {brands.map((b, i) => (
        <motion.li
          key={b.name}
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { delay: i * 0.08 } } }}
          className={`select-none text-slate-500 grayscale transition duration-300 hover:-translate-y-0.5 hover:text-[#0b1a4a] ${b.style}`}
        >
          {b.name}
        </motion.li>
      ))}
    </motion.ul>
  );
}

/** Stylised sneaker used on the storefront mock-ups. */
export function Sneaker({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 110" className={className} aria-hidden>
      <defs>
        <linearGradient id="bcShoe" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a4fa8" />
          <stop offset="1" stopColor="#0f2a6b" />
        </linearGradient>
      </defs>
      <path d="M20 70c0-18 8-34 22-40 10-4 18 4 26 10 12 10 26 14 44 18 30 6 62 8 84 20 8 4 10 12 6 18H26c-4-6-6-14-6-26Z" fill="url(#bcShoe)" />
      <path d="M44 34c6 10 18 18 34 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d="M58 40l-6 8M68 44l-6 8M78 48l-6 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 88h188c4 0 6 4 4 8-2 4-6 6-10 6H30c-8 0-12-6-12-14Z" fill="#f1f5f9" />
      <path d="M22 92h184" stroke="#cbd5e1" strokeWidth="2" />
      <path d="M120 66c20 2 40 6 60 12" stroke="#6ea0ff" strokeWidth="2" opacity="0.6" fill="none" />
    </svg>
  );
}
