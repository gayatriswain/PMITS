"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useCmsText } from "@/components/cms/SectionContent";

/* ------------------------------------------------------------------ */
/* Fonts & tokens shared by every Magento* section                    */
/* ------------------------------------------------------------------ */

/** Condensed display face for the hero headline. */
export const display = { className: "font-heading" }; // global font from app/layout.tsx
/**
 * Geometric sans used for section headings (matches the mock).
 * Was Outfit, but Turbopack's next/font loader currently fails on the multi-query font URLs
 * Google serves for Outfit ("next/font/google queries have exactly one entry").
 */
export const heading = { className: "font-heading" }; // global font from app/layout.tsx

export const TEAL = "#0d9488";
export const TEAL_DARK = "#0b5f5a";
export const NAVY = "#0c1e3d";
export const ORANGE = "#f26322";

export const IMG = {
  emblem: { src: "/magento/emblem.webp", w: 962, h: 1165 },
  bulb: { src: "/magento/bulb.webp", w: 890, h: 1348 },
  platform: { src: "/magento/platform.webp", w: 1774, h: 887 },
  tablet: { src: "/magento/tablet-base.webp", w: 2172, h: 724 },
  podium: { src: "/magento/podium-warm.webp", w: 1774, h: 887 },
  showcase: { src: "/magento/showcase.webp", w: 1313, h: 1198 },
};

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease } }),
};

/**
 * Plain IntersectionObserver hook used by the xl-only stages instead of framer's
 * whileInView/useInView, which didn't fire for those stages at ~1280–1300px widths.
 * `once` (default) latches to true the first time the element is visible.
 */
export function useSeen(ref: React.RefObject<Element | null>, amount = 0.15, once = true) {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          if (once) io.disconnect();
        } else if (!once) {
          setSeen(false);
        }
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, amount, once]);
  return seen;
}

/** Keyframes shared by the Magento sections — rendered once by the page. */
export function MagentoStyles() {
  const $t = useCmsText();
  return (
    <style>{`
      @keyframes magFlow { to { stroke-dashoffset: -48; } }
      @keyframes magPing { 0% { transform: translate(-50%,-50%) scale(.55); opacity:.75 } 100% { transform: translate(-50%,-50%) scale(1.35); opacity:0 } }
      @keyframes magShine { 0% { background-position: 200% 50% } 100% { background-position: -200% 50% } }
      @keyframes magSpin { to { transform: rotate(360deg); } }
      @keyframes magFlow2 { from { stroke-dashoffset: 230; } to { stroke-dashoffset: 0; } }      @keyframes bcMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes magDotPing { 0% { transform: scale(1); opacity: .8 } 100% { transform: scale(2.6); opacity: 0 } }
      @media (prefers-reduced-motion: reduce) {
        .mag-anim { animation: none !important; }
      }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
/* ------------------------------------------------------------------ */

/** "◇ LABEL ◇" eyebrow used above most section headings. */
export function Eyebrow({
  children,
  variant = "diamond",
  align = "center",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "diamond" | "line";
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d9488] sm:text-xs ${
        align === "center" ? "justify-center" : "justify-start"
      } ${className}`}
    >
      {align === "center" && <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
        className="h-px w-8 origin-right bg-[#0d9488]/60"
      />}
      {variant === "diamond" && align === "center" && <Diamond />}
      <span>{children}</span>
      {variant === "diamond" && align === "center" && <Diamond />}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
        className="h-px w-8 origin-left bg-[#0d9488]/60"
      />
    </motion.div>
  );
}

function Diamond() {
  return <span className="inline-block h-2.5 w-2.5 rotate-45 border-[1.5px] border-[#0d9488]" aria-hidden />;
}

/** Magento emblem image (transparent). */
export function Emblem({ className = "", priority = false, sizes = "200px" }: { className?: string; priority?: boolean; sizes?: string }) {
  const $t = useCmsText();
  return (
    <Image
      src={IMG.emblem.src}
      alt={$t("MagentoShared__t2", "Magento")}
      width={IMG.emblem.w}
      height={IMG.emblem.h}
      priority={priority}
      sizes={sizes}
      className={`h-auto select-none drop-shadow-[0_18px_30px_rgba(242,99,34,0.35)] ${className}`}
      draggable={false}
    />
  );
}

/** Faint dot grid decoration. */
export function DotGrid({ className = "", cols = 5, rows = 4 }: { className?: string; cols?: number; rows?: number }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute grid gap-2.5 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 4px)` }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <span key={i} className="h-1 w-1 rounded-full bg-[#0d9488]/30" />
      ))}
    </div>
  );
}

/** The thin diagonal chevron lines on the section edges. */
export function EdgeChevrons({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 hidden overflow-hidden lg:block ${className}`}>
      <svg className="absolute left-0 top-1/2 h-[420px] w-[140px] -translate-y-1/2" viewBox="0 0 140 420" fill="none">
        <path d="M0 40 L120 210 L0 380" stroke="#0d9488" strokeOpacity="0.18" strokeWidth="1.2" />
        <path d="M0 110 L70 210 L0 310" stroke="#94a3b8" strokeOpacity="0.2" strokeWidth="1" />
      </svg>
      <svg className="absolute right-0 top-1/2 h-[420px] w-[140px] -translate-y-1/2" viewBox="0 0 140 420" fill="none">
        <path d="M140 40 L20 210 L140 380" stroke="#0d9488" strokeOpacity="0.5" strokeWidth="1.4" />
        <path d="M140 110 L70 210 L140 310" stroke="#94a3b8" strokeOpacity="0.25" strokeWidth="1" />
      </svg>
    </div>
  );
}

/** Arrow used inside buttons. */
export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Icon set (stroke icons, 24×24)                                     */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };
const S = ({ className = "h-6 w-6", children }: IconProps & { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {children}
  </svg>
);

export const Icons = {
  store: (p: IconProps) => (
    <S {...p}><path d="M4 9.5V20h16V9.5" /><path d="M3 9.5 5 4h14l2 5.5a2.6 2.6 0 0 1-4.5 1.6A2.6 2.6 0 0 1 12 11a2.6 2.6 0 0 1-4.5.1A2.6 2.6 0 0 1 3 9.5Z" /><path d="M9.5 20v-5h5v5" /></S>
  ),
  code: (p: IconProps) => (<S {...p}><path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" /></S>),
  upload: (p: IconProps) => (<S {...p}><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 14v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5" /></S>),
  gauge: (p: IconProps) => (<S {...p}><path d="M4.5 18a9 9 0 1 1 15 0" /><path d="m12 13 4-5" /><circle cx="12" cy="13.5" r="1.4" /><path d="M7 11.5h.01M12 7h.01M17 11.5h.01" /></S>),
  headset: (p: IconProps) => (<S {...p}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19a3 3 0 0 1-3 3h-3" /></S>),
  puzzle: (p: IconProps) => (<S {...p}><path d="M10 3.5a2 2 0 0 1 4 0V6h4v4h-1.5a2 2 0 0 0 0 4H18v4h-4v-1.5a2 2 0 0 0-4 0V18H6v-4h1.5a2 2 0 0 0 0-4H6V6h4V3.5Z" /></S>),
  link: (p: IconProps) => (<S {...p}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></S>),
  shield: (p: IconProps) => (<S {...p}><path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></S>),
  check: (p: IconProps) => (<S {...p}><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></S>),
  layout: (p: IconProps) => (<S {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 13h4M8 16h3M14 13h3v3h-3z" /></S>),
  network: (p: IconProps) => (<S {...p}><circle cx="12" cy="12" r="2.2" /><circle cx="5" cy="6" r="1.8" /><circle cx="19" cy="6" r="1.8" /><circle cx="5" cy="18" r="1.8" /><circle cx="19" cy="18" r="1.8" /><path d="m6.5 7 4 3.5M17.5 7l-4 3.5M6.5 17l4-3.5M17.5 17l-4-3.5" /></S>),
  arrowUpBox: (p: IconProps) => (<S {...p}><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M12 16V8M8.5 11.5 12 8l3.5 3.5" /></S>),
  cart: (p: IconProps) => (<S {...p}><path d="M3 4h2l2.2 10.5a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6" /><circle cx="9" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></S>),
  health: (p: IconProps) => (<S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></S>),
  building: (p: IconProps) => (<S {...p}><path d="M4 21V9l5-3v15M9 21V4l7 3v14M16 21v-9l4 2v7M3 21h18" /><path d="M12 9h1M12 12h1M12 15h1" /></S>),
  cap: (p: IconProps) => (<S {...p}><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" /></S>),
  bank: (p: IconProps) => (<S {...p}><path d="m3 9 9-5 9 5H3ZM5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 21h18M3 18h18" /></S>),
  diamond: (p: IconProps) => (<S {...p}><path d="M6 4h12l3 5-9 11L3 9l3-5Z" /><path d="M3 9h18M9.5 4 8 9l4 11 4-11-1.5-5" /></S>),
  users: (p: IconProps) => (<S {...p}><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.4" /><path d="M16 14a4.5 4.5 0 0 1 5 4.5" /></S>),
  cog: (p: IconProps) => (<S {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3" /></S>),
  chart: (p: IconProps) => (<S {...p}><path d="M4 20V14M9 20V10M14 20v-7M19 20V6M3 20h18" /><path d="m4 10 5-4 5 3 6-5" /></S>),
  pen: (p: IconProps) => (<S {...p}><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4M9 13l1-3 5-5 2 2-5 5-3 1Z" /></S>),
  search: (p: IconProps) => (<S {...p}><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5.5 5.5" /></S>),
  doc: (p: IconProps) => (<S {...p}><path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8l-5-5Z" /><path d="M14 3v5h5M8.5 12h7M8.5 15.5h4" /></S>),
  clock: (p: IconProps) => (<S {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /><path d="M3 5.5 5.5 3M21 5.5 18.5 3" /></S>),
  stopwatch: (p: IconProps) => (<S {...p}><circle cx="12" cy="13.5" r="7.5" /><path d="M12 9.5v4l2.5 1.5M10 2.5h4M12 2.5V6M18.5 6.5 20 5" /></S>),
  database: (p: IconProps) => (<S {...p}><ellipse cx="12" cy="5.5" rx="7" ry="2.5" /><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" /></S>),
  report: (p: IconProps) => (<S {...p}><path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21H11" /><path d="M14 3v5h5v3M8.5 9h4M8.5 12.5h3" /><circle cx="16.5" cy="17" r="4" /><path d="M16.5 15v2l1.3 1" /></S>),
  userCog: (p: IconProps) => (<S {...p}><circle cx="10" cy="8" r="3.5" /><path d="M3.5 20a6.5 6.5 0 0 1 9.5-5.8" /><circle cx="18" cy="17.5" r="2" /><path d="M18 13.5v1.5M18 20v1.5M14 17.5h1.5M20.5 17.5H22" /></S>),
  chat: (p: IconProps) => (<S {...p}><path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /><path d="M19 9h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v3l-4-3h-4" /><path d="M6 10h.01M9.5 10h.01M13 10h.01" /></S>),
  calendar: (p: IconProps) => (<S {...p}><rect x="3" y="5" width="15" height="15" rx="2" /><path d="M3 10h15M7 3v4M14 3v4" /><circle cx="18" cy="18" r="3.5" /><path d="M18 16.5V18l1 .8" /></S>),
  docCheck: (p: IconProps) => (<S {...p}><path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21H12" /><path d="M14 3v5h5v4M8.5 9h4M8.5 12.5h5M8.5 16h2.5" /><circle cx="17" cy="17.5" r="3.5" /><path d="m15.5 17.5 1 1 2-2" /></S>),
  handshake: (p: IconProps) => (<S {...p}><path d="m2 11 4-4 4 1 2-1 4-1 6 5" /><path d="m6 7 0 0M2 11l3 3M22 11l-3 3" /><path d="m8 13 2 2a1.4 1.4 0 0 0 2-2l-1-1M11 16l1 1a1.4 1.4 0 0 0 2-2l-1-1M13.5 17.5l.5.5a1.4 1.4 0 0 0 2-2l-4-4-2 1.5a1.5 1.5 0 0 1-2-2L12 8" /></S>),
  browserCode: (p: IconProps) => (<S {...p}><rect x="2.5" y="4" width="19" height="16" rx="2" /><path d="M2.5 8.5h19M5.5 6.3h.01M8 6.3h.01M9.5 12l-2.5 2.5 2.5 2.5M14.5 12l2.5 2.5-2.5 2.5" /></S>),
  clipboard: (p: IconProps) => (<S {...p}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1M8.5 10l1 1 2-2M8.5 15l1 1 2-2M13.5 10.5h2M13.5 15.5h2" /></S>),
  devLaptop: (p: IconProps) => (<S {...p}><circle cx="12" cy="6.5" r="3" /><path d="M6 21v-2a6 6 0 0 1 12 0v2" /><rect x="7" y="14" width="10" height="6" rx="1" /><path d="m10.7 16-1 1 1 1M13.3 16l1 1-1 1" /></S>),
  team: (p: IconProps) => (<S {...p}><circle cx="12" cy="7.5" r="2.8" /><circle cx="5.5" cy="9.5" r="2.2" /><circle cx="18.5" cy="9.5" r="2.2" /><path d="M7 20a5 5 0 0 1 10 0M1.5 18.5a4 4 0 0 1 5-3.5M22.5 18.5a4 4 0 0 0-5-3.5" /></S>),
  target: (p: IconProps) => (<S {...p}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /><path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" /></S>),
  rocket: (p: IconProps) => (<S {...p}><path d="M5 15c-1.5 1-2 4-2 6 2 0 5-.5 6-2" /><path d="M9 15 6 12c1-4 5-9 15-9 0 10-5 14-9 15l-3-3Z" /><circle cx="15" cy="9" r="2" /></S>),
  sliders: (p: IconProps) => (<S {...p}><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></S>),
  shieldCheck: (p: IconProps) => (<S {...p}><path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></S>),
  trend: (p: IconProps) => (<S {...p}><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /><path d="M3 21h18" /></S>),
  bolt: (p: IconProps) => (<S {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></S>),
  docText: (p: IconProps) => (<S {...p}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></S>),
  rupee: (p: IconProps) => (<S {...p}><circle cx="12" cy="12" r="9" /><path d="M9 7.5h6M9 10.5h6M11 7.5c2.5 0 3 3 0 3H9l4.5 6" /></S>),
  play: (p: IconProps) => (<svg viewBox="0 0 24 24" className={p.className ?? "h-4 w-4"} fill="currentColor" aria-hidden><path d="M8 5.5v13l10.5-6.5L8 5.5Z" /></svg>),
  user: (p: IconProps) => (<S {...p}><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></S>),
  briefcase: (p: IconProps) => (<S {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5h6v2M3 12h18" /></S>),
  mail: (p: IconProps) => (<S {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></S>),
  phone: (p: IconProps) => (<S {...p}><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" /></S>),
  grid: (p: IconProps) => (<S {...p}><rect x="4" y="4" width="6.5" height="6.5" rx="1" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" /></S>),
  lock: (p: IconProps) => (<S {...p}><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></S>),
};
export type IconName = keyof typeof Icons;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const C = Icons[name];
  return <C className={className} />;
}
