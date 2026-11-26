"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { Counter } from "../shared/useCountUp";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#0d9488";
const GOLD = "#d4a54a";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const svgBase = (color: string, size: number, strokeWidth = 2) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const LightbulbIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 18)}>
    <path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 2Z" />
  </svg>
);
const CalendarChatIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 18)}>
    <rect x="3" y="4" width="18" height="17" rx="2.5" />
    <path d="M3 9h18M8 2v4M16 2v4" />
    <path d="M8 13.5h5M8 17h8" />
  </svg>
);
const CheckIcon = (p: { color?: string; size?: number }) => (
  <svg width={p.size ?? 10} height={p.size ?? 10} viewBox="0 0 24 24" fill="none" stroke={p.color ?? "currentColor"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const HeartIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 18)}>
    <path d="M12 20.5s-7-4.4-9.3-8.6C.9 8.6 1.6 5 4.5 3.6c2.2-1 4.7-.3 6 1.5l1.5 2 1.5-2c1.3-1.8 3.8-2.5 6-1.5 2.9 1.4 3.6 5 1.8 8.3-2.3 4.2-9.3 8.6-9.3 8.6Z" />
  </svg>
);
const RepeatIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 18)}>
    <path d="M17 2 21 6 17 10" />
    <path d="M3 12V9a3 3 0 0 1 3-3h15" />
    <path d="M7 22 3 18 7 14" />
    <path d="M21 12v3a3 3 0 0 1-3 3H3" />
  </svg>
);
const ThumbsUpIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 18)}>
    <path d="M7 22V11" />
    <path d="M7 11 10.5 3.5a2 2 0 0 1 3.7 1.4L13 9h6a2 2 0 0 1 1.9 2.6l-2.3 8A2 2 0 0 1 16.7 21H7" />
  </svg>
);
const RocketIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 18)}>
    <path d="M14 4c4-1 7 2 6 6l-7 7-6-6Z" />
    <circle cx="15.5" cy="8.5" r="1.5" />
    <path d="M7 11H4l3-4h4M13 17v3l4-4v-4M6 18l-2.5 2.5" />
  </svg>
);
const SparkleIcon = (p: { color?: string; size?: number }) => (
  <svg width={p.size ?? 20} height={p.size ?? 20} viewBox="0 0 24 24" fill={p.color ?? "currentColor"}>
    <path d="M12 2c0 4.5 4.5 9 9 9-4.5 0-9 4.5-9 9 0-4.5-4.5-9-9-9 4.5 0 9-4.5 9-9z" />
    <path d="M19 15c0 1.5 1.5 3 3 3-1.5 0-3 1.5-3 3 0-1.5-1.5-3-3-3 1.5 0 3-1.5 3-3z" />
  </svg>
);
const QuoteIcon = () => (
  <span className="font-serif text-4xl sm:text-5xl leading-none" style={{ color: GOLD }} aria-hidden>&ldquo;</span>
);
const RocketBadgeIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 22)}>
    <path d="M14 4c4-1 7 2 6 6l-7 7-6-6Z" />
    <circle cx="15.5" cy="8.5" r="1.5" />
    <path d="M7 11H4l3-4h4M13 17v3l4-4v-4M6 18l-2.5 2.5" />
  </svg>
);
const SmileyIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 22)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 10h.01M15.5 10h.01" strokeWidth="2.6" />
    <path d="M8 15c1.2 1.2 2.6 1.8 4 1.8s2.8-.6 4-1.8" />
  </svg>
);
const BuildingIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 22)}>
    <path d="M4 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16" />
    <path d="M12 10h7a1 1 0 0 1 1 1v10" />
    <path d="M2 21h20M7 8h1M7 12h1M7 16h1M15 14h1M15 18h1" />
  </svg>
);
const StarIcon = (p: { color?: string; size?: number }) => (
  <svg width={p.size ?? 22} height={p.size ?? 22} viewBox="0 0 24 24" fill={p.color ?? "currentColor"}>
    <path d="m12 2.5 3.1 6.3 7 1-5 4.9 1.2 6.9-6.3-3.3-6.3 3.3 1.2-6.9-5-4.9 7-1Z" />
  </svg>
);
const UsersBadgeIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 22)}>
    <circle cx="9" cy="8" r="3.3" />
    <path d="M2.5 20c0-3.6 2.9-6.3 6.5-6.3s6.5 2.7 6.5 6.3" />
    <circle cx="17.5" cy="9" r="2.6" />
    <path d="M15.8 13.8c2.9.3 5.2 2.8 5.2 6.2" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const LEFT_CHECKLIST__cms = [
  { title: "Idea Validation", desc: "Turn your concept into a real product." },
  { title: "Market & User Research", desc: "Understand your market and audience." },
  { title: "Product Strategy", desc: "Build the right product, the right way." },
  { title: "Interactive Prototype", desc: "Experience your app before it's built." },
];

const RIGHT_CHECKLIST__cms = [
  { Icon: SmileyIcon, title: "Users Love It", desc: "Intuitive design that users enjoy and remember." },
  { Icon: RepeatIcon, title: "They Keep Coming Back", desc: "Seamless experience that builds loyalty and retention." },
  { Icon: ThumbsUpIcon, title: "They Recommend It", desc: "Happy users turn into your biggest advocates." },
  { Icon: RocketIcon, title: "Your Business Grows", desc: "More engagement, more conversions, more revenue." },
];

const FoodBowlIcon = (p: { color?: string; size?: number }) => (
  <svg width={p.size ?? 40} height={p.size ?? 40} viewBox="0 0 24 24" fill="none" stroke={p.color ?? "currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 0 18 0Z" />
    <path d="M12 12V5M9 6l1-3M15 6l-1-3" />
  </svg>
);
const StethoscopeIcon = (p: { color?: string; size?: number }) => (
  <svg width={p.size ?? 40} height={p.size ?? 40} viewBox="0 0 24 24" fill="none" stroke={p.color ?? "currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4v5a4 4 0 0 0 8 0V4" />
    <path d="M10 13v2a5 5 0 0 0 10 0v-1.5" />
    <circle cx="20" cy="11.5" r="1.6" />
    <circle cx="6" cy="4" r="1.2" />
    <circle cx="14" cy="4" r="1.2" />
  </svg>
);
const PalmTreeIcon = (p: { color?: string; size?: number }) => (
  <svg width={p.size ?? 40} height={p.size ?? 40} viewBox="0 0 24 24" fill="none" stroke={p.color ?? "currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V11" />
    <path d="M12 11c-3-2-6-1-8 1 3 1 6 0 8-1Z" />
    <path d="M12 11c3-2 6-1 8 1-3 1-6 0-8-1Z" />
    <path d="M12 11c-1-3 0-6 2-8-3 0-5 3-5 6Z" />
  </svg>
);
const DumbbellPeekIcon = (p: { color?: string; size?: number }) => (
  <svg width={p.size ?? 40} height={p.size ?? 40} viewBox="0 0 24 24" fill="none" stroke={p.color ?? "currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9v6M2 10v4M20 9v6M22 10v4M6 12h12" />
    <rect x="5" y="7" width="3" height="10" rx="1.2" />
    <rect x="16" y="7" width="3" height="10" rx="1.2" />
  </svg>
);
const BagPeekIcon = (p: { color?: string; size?: number }) => (
  <svg width={p.size ?? 40} height={p.size ?? 40} viewBox="0 0 24 24" fill="none" stroke={p.color ?? "currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8 H18 L17.2 20.5 A2 2 0 0 1 15.2 22.3 H8.8 A2 2 0 0 1 6.8 20.5 Z" />
    <path d="M9 8 V6 a3 3 0 0 1 6 0 V8" />
  </svg>
);
const LaptopPeekIcon = (p: { color?: string; size?: number }) => (
  <svg width={p.size ?? 40} height={p.size ?? 40} viewBox="0 0 24 24" fill="none" stroke={p.color ?? "currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="11" rx="1.4" />
    <path d="M2 19h20l-1.5-3H3.5Z" />
  </svg>
);

const PEEK_CATEGORIES__cms = [
  {
    label: "Food Delivery",
    color: "#ea580c",
    bg: "#fff1e6",
    tagline: "Delicious food delivered fast.",
    Icon: FoodBowlIcon,
    image: "/app-dev1.webp",
    nav: ["Home", "Orders", "Delivery", "Rewards"],
  },
  {
    label: "Healthcare",
    color: "#0284c7",
    bg: "#e6f4fd",
    tagline: "Book appointments with ease.",
    Icon: StethoscopeIcon,
    image: "/app-dev2.webp",
    nav: ["Home", "Doctors", "Records", "Profile"],
  },
  {
    label: "Travel",
    color: "#0891b2",
    bg: "#e3f6f8",
    tagline: "Explore. Book. Travel.",
    Icon: PalmTreeIcon,
    image: "/app-dev3.webp",
    nav: ["Home", "Categories", "Travel", "Points"],
  },
  {
    label: "Fitness",
    color: "#16a34a",
    bg: "#e9f9ee",
    tagline: "Stronger every day.",
    Icon: DumbbellPeekIcon,
    image: "/app-dev4.webp",
    nav: ["Home", "Programs", "Experts", "Rewards"],
  },
  {
    label: "Shopping",
    color: "#db2777",
    bg: "#fde8f2",
    tagline: "Shop the latest trends.",
    Icon: BagPeekIcon,
    image: "/lux.webp",
    nav: ["Home", "Shop", "Cart", "Profile"],
  },
  {
    label: "Tech",
    color: "#7c3aed",
    bg: "#f1ebfe",
    tagline: "Smart gadgets, smarter living.",
    Icon: LaptopPeekIcon,
    image: "/project2.webp",
    nav: ["Home", "New", "Deals", "Profile"],
  },
];

const STATS__cms = [
  { target: 120, suffix: "+", label: "Apps Delivered", sub: "Across Industries", Icon: RocketBadgeIcon },
  { target: 98, suffix: "%", label: "Client Satisfaction", sub: "Rate", Icon: SmileyIcon },
  { target: 15, suffix: "+", label: "Industries Served", sub: "", Icon: BuildingIcon },
  { target: 4.9, suffix: "/5", label: "Average Rating", sub: "On Clutch", Icon: StarIcon },
];

const TRUSTED_BY__cms = { label: "Trusted by", sub: "Startups to Enterprises Worldwide", Icon: UsersBadgeIcon };

const FOOTER_FEATURES__cms = [
  { title: "End-to-End Development", sub: "From concept to launch" },
  { title: "Agile & Transparent Process", sub: "You're in the loop, always" },
  { title: "Ongoing Support", sub: "We grow with you" },
];

/* ------------------------------------------------------------------ */
/* Motion                                                              */
/* ------------------------------------------------------------------ */

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const listItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
/* ------------------------------------------------------------------ */

function ChecklistCard({
  badge,
  Icon,
  heading,
  highlight,
  items,
  align = "left",
}: {
  badge: string;
  Icon: (p: { color?: string; size?: number }) => React.JSX.Element;
  heading: string;
  highlight: string;
  items: { title: string; desc: string; Icon?: (p: { color?: string; size?: number }) => React.JSX.Element }[];
  align?: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_15px_40px_-25px_rgba(15,40,60,0.25)]"
    >
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: TEAL }}>
        <Icon color={TEAL} size={13} />
        {badge}
      </span>
      <h3 className="text-h6 font-serif font-bold mt-2.5 mb-4" style={{ color: NAVY }}>
        {heading} <span style={{ color: TEAL }}>{highlight}</span>
      </h3>
      <motion.ul variants={listVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="flex flex-col gap-4">
        {items.map((it) => (
          <motion.li key={it.title} variants={listItem} className={`flex items-start gap-3 ${align === "right" ? "text-left" : ""}`}>
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#e6f6f4", color: DEEP_TEAL }}>
              {it.Icon ? <it.Icon size={15} /> : <CheckIcon color={DEEP_TEAL} size={12} />}
            </span>
            <span>
              <span className="block text-[13px] font-bold" style={{ color: NAVY }}>{it.title}</span>
              <span className="block text-[11.5px] text-slate-500 leading-snug mt-0.5">{it.desc}</span>
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

const PEEK_NAV_ICON_PATHS = [
  <path key="home" d="m3 11 9-8 9 8M5 10v10h14V10" />,
  <><rect key="g1" x="3" y="3" width="8" height="8" rx="1.5" /><rect key="g2" x="13" y="3" width="8" height="8" rx="1.5" /><rect key="g3" x="3" y="13" width="8" height="8" rx="1.5" /><rect key="g4" x="13" y="13" width="8" height="8" rx="1.5" /></>,
  <path key="pin" d="M12 21c-4-4-7-7.5-7-11.5A7 7 0 0 1 19 9.5c0 4-3 7.5-7 11.5Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  <path key="star" d="m12 2.5 3.1 6.3 7 1-5 4.9 1.2 6.9-6.3-3.3-6.3 3.3 1.2-6.9-5-4.9 7-1Z" />,
];

function Peek({
  cat,
  side,
  overlap = false,
  touchPhone = false,
  z = 0,
}: {
  cat: (typeof PEEK_CATEGORIES__cms)[number];
  side: "left" | "right";
  overlap?: boolean;
  touchPhone?: boolean;
  z?: number;
}) {
  // 3D tilt, pivoting on the outer edge — the inner edge (facing the phone) recedes into the page:
  // left-side cards pivot on their left edge, right-side cards pivot on their right edge.
  const pivot = side === "left" ? "left center" : "right center";
  const rotateY = side === "left" ? 24 : -24;
  // The 3D rotation makes the inner edge visually recede/shrink (perspective foreshortening), which
  // leaves an apparent gap next to the phone even at zero margin — pull it in further to close that.
  const pullPx = 40;
  const margin = touchPhone ? (side === "left" ? { marginRight: -pullPx } : { marginLeft: -pullPx }) : undefined;
  return (
    // Slides in from the right every time (not a one-off scroll reveal) so it keeps pace with the
    // phone's own right-to-left flow — content drifts in from the right, past the phone, to the left.
    <motion.div
      initial={{ opacity: 0, x: 46, y: 10, rotateY: 0 }}
      animate={{ opacity: 1, x: 0, y: 0, rotateY }}
      transition={{ duration: 1.9, ease: EASE }}
      style={{ transformPerspective: 900, transformOrigin: pivot, zIndex: z, ...margin }}
      className={`relative flex w-[140px] sm:w-[168px] shrink-0 flex-col ${overlap ? "-ml-10 sm:-ml-14" : ""}`}
    >
      <div className="flex h-full flex-col rounded-[26px] bg-white p-4 shadow-[0_20px_45px_-20px_rgba(15,23,42,0.25)] ring-1 ring-slate-100">
        <p className="text-body font-bold" style={{ color: NAVY }}>{cat.label}</p>
        <p className="text-caption text-slate-500 mt-2 mb-3.5">{cat.tagline}</p>

        <div className="relative flex-1 min-h-[130px] sm:min-h-[150px] overflow-hidden rounded-2xl mb-3.5 bg-slate-100">
          <Image src={cat.image} alt={cat.label} fill className="object-cover" sizes="168px" />
          <div
            className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full shadow-sm"
            style={{ backgroundColor: cat.bg, color: cat.color }}
          >
            <cat.Icon color={cat.color} size={15} />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          {cat.nav.map((n, i) => (
            <div key={n} className="flex flex-col items-center gap-1" style={{ color: i === 0 ? cat.color : "#cbd5e1" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {PEEK_NAV_ICON_PATHS[i]}
              </svg>
              <span className="text-[6px] font-semibold whitespace-nowrap">{n}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Fashion: <path d="M8 4 3 8l3 3 2-1.5V20h8V9.5L18 11l3-3-5-4h-2a2 2 0 0 1-4 0Z" />,
  Electronics: <><rect x="4" y="4" width="16" height="12" rx="1.5" /><path d="M9 20h6M12 16v4" /></>,
  Home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /></>,
  Beauty: <><path d="M12 2c1.5 2.5 4 4 4 7a4 4 0 0 1-8 0c0-3 2.5-4.5 4-7Z" /><path d="M8 22h8M12 18v4" /></>,
  More: <><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></>,
};

const BOTTOM_NAV_ICONS: Record<string, React.ReactNode> = {
  Home: <path d="m3 11 9-8 9 8M5 10v10h14V10" />,
  Categories: <><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></>,
  Cart: <><circle cx="9" cy="21" r="1.3" /><circle cx="18" cy="21" r="1.3" /><path d="M2 3h2l2.6 12.6a2 2 0 0 0 2 1.6h8a2 2 0 0 0 2-1.6L21 7H6" /></>,
  Wishlist: <path d="M12 20.5s-7-4.4-9.3-8.6C.9 8.6 1.6 5 4.5 3.6c2.2-1 4.7-.3 6 1.5l1.5 2 1.5-2c1.3-1.8 3.8-2.5 6-1.5 2.9 1.4 3.6 5 1.8 8.3-2.3 4.2-9.3 8.6-9.3 8.6Z" />,
  Profile: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
};

function ShopScreenBody() {
  const $t = useCmsText();
  return (
    <div className="h-full w-full overflow-hidden bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-3 pb-1.5 text-[9px] font-semibold" style={{ color: NAVY }}>
        <span>{$t("AppDevShowcase__t1", "9:41")}</span>
        <span className="w-3 h-2 rounded-sm border border-current" />
      </div>
      <div className="px-4 pb-2.5 flex items-center justify-between">
        <p className="text-caption font-bold" style={{ color: NAVY }}>{rich($t("AppDevShowcase__t2", "Hello, Alex "))}<span aria-hidden>{"\u{1F44B}"}</span></p>
        <span className="relative">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" /><path d="M10 19a2 2 0 0 0 4 0" /></svg>
          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-orange-500" />
        </span>
      </div>
      <div className="mx-4 mb-3 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="M16 16 L20.5 20.5" /></svg>
        <span className="text-[8.5px] text-slate-400">{$t("AppDevShowcase__t3", "Search anything...")}</span>
      </div>

      <div className="px-4 mb-1"><p className="text-[9px] font-bold" style={{ color: NAVY }}>{rich($t("AppDevShowcase__t4", "Featured"))}</p></div>
      <div className="relative mx-4 mb-4 overflow-hidden rounded-2xl p-3.5">
        <Image src={$t("AppDevShowcase__t5", "/project2.webp")} alt="" fill className="object-cover" sizes="200px" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(100deg, ${DEEP_TEAL} 38%, transparent 90%)` }} />
        <p className="relative text-[8px] font-semibold uppercase tracking-wide text-white/70">{rich($t("AppDevShowcase__t6", "New Collection"))}</p>
        <p className="relative text-[11.5px] font-bold text-white mt-1 max-w-[62%]">{rich($t("AppDevShowcase__t7", "Summer Essentials"))}</p>
        <span className="relative inline-block mt-2 rounded-full bg-white px-2.5 py-1 text-[8px] font-bold" style={{ color: DEEP_TEAL }}>{$t("AppDevShowcase__t8", "Shop Now")}</span>
      </div>

      <div className="px-4 mb-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[9.5px] font-bold" style={{ color: NAVY }}>{rich($t("AppDevShowcase__t9", "Categories"))}</p>
          <p className="text-[7.5px] font-semibold" style={{ color: DEEP_TEAL }}>{rich($t("AppDevShowcase__t10", "View all"))}</p>
        </div>
        <div className="flex items-center justify-between">
          {[$t("AppDevShowcase__t11", "Fashion"), $t("AppDevShowcase__t12", "Electronics"), $t("AppDevShowcase__t13", "Home"), $t("AppDevShowcase__t14", "Beauty"), $t("AppDevShowcase__t15", "More")].map((c) => (
            <div key={c} className="flex flex-col items-center gap-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: "#e6f6f4", color: DEEP_TEAL }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{CATEGORY_ICONS[c]}</svg>
              </span>
              <span className="text-[6.5px] text-slate-500">{c}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 flex flex-1 flex-col pb-2">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[9.5px] font-bold" style={{ color: NAVY }}>{rich($t("AppDevShowcase__t16", "Popular Products"))}</p>
          <p className="text-[7.5px] font-semibold" style={{ color: DEEP_TEAL }}>{rich($t("AppDevShowcase__t17", "View all"))}</p>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          {[
            { n: $t("AppDevShowcase__t18", "Minimal Watch"), sub: $t("AppDevShowcase__t19", "Leather Strap"), p: $t("AppDevShowcase__t20", "$129.00"), rating: $t("AppDevShowcase__t21", "4.5"), image: $t("AppDevShowcase__t22", "/project3.webp") },
            { n: $t("AppDevShowcase__t23", "Wireless Headphones"), sub: $t("AppDevShowcase__t24", "Noise Cancelling"), p: $t("AppDevShowcase__t25", "$169.00"), rating: $t("AppDevShowcase__t26", "4.7"), image: $t("AppDevShowcase__t27", "/project2.webp") },
          ].map((pr) => (
            <div key={pr.n} className="flex items-center gap-2 rounded-xl bg-slate-50 px-2 py-1.5">
              <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                <Image src={pr.image} alt={pr.n} fill className="object-cover" sizes="36px" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold truncate" style={{ color: NAVY }}>{pr.n}</p>
                <p className="text-[7px] text-slate-400 truncate">{pr.sub}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[8px] font-bold" style={{ color: NAVY }}>{pr.p}</p>
                <p className="flex items-center justify-end gap-0.5 text-[7px] text-slate-400"><StarIcon color="#f59e0b" size={7} />{pr.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-around border-t border-slate-100 px-1 pt-2 pb-3">
        {[$t("AppDevShowcase__t28", "Home"), $t("AppDevShowcase__t29", "Categories"), $t("AppDevShowcase__t30", "Cart"), $t("AppDevShowcase__t31", "Wishlist"), $t("AppDevShowcase__t32", "Profile")].map((l, i) => (
          <div key={l} className="flex flex-col items-center gap-0.5" style={{ color: i === 0 ? DEEP_TEAL : "#cbd5e1" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{BOTTOM_NAV_ICONS[l]}</svg>
            <span className="text-[5.5px] font-semibold">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Generic themed screen for every category other than Shopping (which keeps the richer,
// bespoke ShopScreen above) — built from the same PEEK_CATEGORIES data (icon, color, tagline,
// image, nav), so the phone's content genuinely changes to match whichever category is active.
function CategoryScreenBody({ cat }: { cat: (typeof PEEK_CATEGORIES__cms)[number] }) {
  const $t = useCmsText();
  return (
    <div className="h-full w-full overflow-hidden bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-3 pb-1.5 text-[9px] font-semibold" style={{ color: NAVY }}>
        <span>{$t("AppDevShowcase__t33", "9:41")}</span>
        <span className="w-3 h-2 rounded-sm border border-current" />
      </div>

      <div className="px-4 pb-2.5 flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: cat.bg, color: cat.color }}>
          <cat.Icon color={cat.color} size={16} />
        </span>
        <div className="min-w-0">
          <p className="text-[11.5px] font-bold truncate" style={{ color: NAVY }}>{cat.label}</p>
          <p className="text-[7px] text-slate-400 truncate">{cat.tagline}</p>
        </div>
      </div>

      <div className="mx-4 mb-3 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="M16 16 L20.5 20.5" /></svg>
        <span className="text-[8.5px] text-slate-400">{$t("AppDevShowcase__t34", "Search ")}{cat.label.toLowerCase()}...</span>
      </div>

      <div className="relative mx-4 mb-4 overflow-hidden rounded-2xl" style={{ backgroundColor: cat.color }}>
        <div className="relative h-40 w-full opacity-90">
          <Image src={cat.image} alt={cat.label} fill className="object-cover" sizes="200px" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-3" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.55), transparent 60%)" }}>
          <p className="text-[10.5px] font-bold text-white max-w-[80%] leading-snug">{cat.tagline}</p>
          <span className="inline-block mt-2 w-fit rounded-full bg-white px-2.5 py-1 text-[7.5px] font-bold" style={{ color: cat.color }}>{$t("AppDevShowcase__t35", "Explore")}</span>
        </div>
      </div>

      <div className="px-4 flex-1 flex flex-col gap-2 pb-2">
        {cat.nav.slice(1, 3).map((l) => (
          <div key={l} className="flex flex-1 items-center gap-2 rounded-xl bg-slate-50 px-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: cat.bg, color: cat.color }}>
              <CheckIcon color={cat.color} size={9} />
            </span>
            <p className="text-[8.5px] font-semibold" style={{ color: NAVY }}>{l}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-around border-t border-slate-100 px-1 pt-2 pb-3">
        {cat.nav.map((l, i) => (
          <div key={l} className="flex flex-col items-center gap-0.5" style={{ color: i === 0 ? cat.color : "#cbd5e1" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{PEEK_NAV_ICON_PATHS[i]}</svg>
            <span className="text-[5.5px] font-semibold">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hosts the actual "slide one card out, slide the next one in" transition — the outgoing
// screen slides fully out to the left while the incoming one slides in from the right, both
// visible mid-transition, exactly like the hero section's phone.
function PhoneScreenFor({ cat }: { cat: (typeof PEEK_CATEGORIES__cms)[number] }) {
  return (
    <div className="absolute inset-[3px] rounded-[34px] overflow-hidden bg-white">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={cat.label}
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -36 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="absolute inset-0"
        >
          {cat.label === "Shopping" ? <ShopScreenBody /> : <CategoryScreenBody cat={cat} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StatsBar() {
  const STATS = useCmsData("AppDevShowcase__STATS", STATS__cms);
  const TRUSTED_BY = useCmsData("AppDevShowcase__TRUSTED_BY", TRUSTED_BY__cms);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: EASE }}
      className="w-full bg-white rounded-2xl border border-slate-100 shadow-[0_15px_40px_-25px_rgba(15,40,60,0.25)] p-5 grid grid-cols-2 lg:grid-cols-5 gap-y-6"
    >
      {STATS.map((stat, i) => (
        <div key={stat.label} className={`flex items-center justify-center gap-2.5 px-2 ${i > 0 ? "lg:border-l border-slate-100" : ""}`}>
          <span className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e6f6f4", color: DEEP_TEAL }}>
            <stat.Icon color={DEEP_TEAL} size={18} />
          </span>
          <div>
            <p className="text-body font-bold tabular-nums" style={{ color: DEEP_TEAL }}>
              {Number.isInteger(stat.target) ? <Counter target={stat.target} suffix={stat.suffix} /> : `${stat.target}${stat.suffix}`}
            </p>
            <p className="text-[11px] font-semibold text-slate-700 mt-1">{stat.label}</p>
            {stat.sub && <p className="text-[9.5px] text-slate-400">{stat.sub}</p>}
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center gap-2.5 px-2 lg:border-l border-slate-100 col-span-2 lg:col-span-1">
        <span className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e6f6f4", color: DEEP_TEAL }}>
          <TRUSTED_BY.Icon color={DEEP_TEAL} size={18} />
        </span>
        <div>
          <p className="text-small font-bold" style={{ color: DEEP_TEAL }}>{TRUSTED_BY.label}</p>
          <p className="text-[9.5px] text-slate-400 leading-snug max-w-[130px]">{TRUSTED_BY.sub}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

export default function AppDevShowcase() {
  const $t = useCmsText();
  const LEFT_CHECKLIST = useCmsData("AppDevShowcase__LEFT_CHECKLIST", LEFT_CHECKLIST__cms);
  const RIGHT_CHECKLIST = useCmsData("AppDevShowcase__RIGHT_CHECKLIST", RIGHT_CHECKLIST__cms);
  const PEEK_CATEGORIES = useCmsData("AppDevShowcase__PEEK_CATEGORIES", PEEK_CATEGORIES__cms);
  const FOOTER_FEATURES = useCmsData("AppDevShowcase__FOOTER_FEATURES", FOOTER_FEATURES__cms);
  // Same mechanism as the hero's category carousel: one category is "active" (shown inside the
  // phone itself, content and all), the 4 around it are the next/previous ones in the rotation —
  // a discrete slider (settle, pause, slide) rather than a continuous marquee, with a smooth ease.
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % PEEK_CATEGORIES.length);
    }, 5200);
    return () => clearInterval(id);
  }, []);
  const len = PEEK_CATEGORIES.length;
  const at = (offset: number) => PEEK_CATEGORIES[(activeIndex + offset + len * 2) % len];
  const active = at(0);

  return (
    <section className="relative w-full bg-white py-14 lg:py-20 overflow-x-clip">
      <Container>
        <>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col items-center text-center mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: TEAL }} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: TEAL }}>{$t("AppDevShowcase__t36", "Real Results, Real Growth")}</span>
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: TEAL }} />
            </div>
            <h2 className="text-h2 font-serif font-bold" style={{ color: NAVY }}>
              {$t("AppDevShowcase__t37", "Imagine Your Business.")}<br />
              <span style={{ color: TEAL }}>{$t("AppDevShowcase__t38", "In Every Customer's Pocket.")}</span>
            </h2>
            <p className="text-body text-slate-600 max-w-xl mt-4">
              {rich($t("AppDevShowcase__t39", "From idea to impact, we design and build mobile apps that delight users and drive real business growth."))}</p>
          </motion.div>

          {/* 3-column showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)_290px] gap-3 items-start">
            {/* Left column */}
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative pl-1"
              >
                <span className="font-serif italic text-lg" style={{ color: GOLD }}>{$t("AppDevShowcase__t40", "Your Idea")}</span>
                <p className="text-caption text-slate-500 mt-1.5 max-w-[220px]">
                  {rich($t("AppDevShowcase__t41", "We turn it into "))}<span className="font-semibold" style={{ color: NAVY }}>extraordinary</span> {rich($t("AppDevShowcase__t42", "digital experiences."))}</p>
                <svg className="mt-2 w-10 h-8 text-slate-300" viewBox="0 0 40 32" fill="none" aria-hidden>
                  <path d="M4 4 C10 20 22 26 34 24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                  <path d="M28 20 L36 25 L30 29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </motion.div>

              <ChecklistCard
                badge={$t("AppDevShowcase__t43", "Start With an Idea")}
                Icon={LightbulbIcon}
                heading={$t("AppDevShowcase__t44", "We help you see")}
                highlight="the big picture."
                items={LEFT_CHECKLIST}
              />
            </div>

            {/* Center: phone + peeks */}
            <div className="order-1 lg:order-2 flex flex-col items-center">
              <div className="relative w-full flex items-center justify-center">
                <div className="hidden xl:block">
                  <Peek key={at(-2).label} cat={at(-2)} side="left" z={1} />
                </div>
                <div className="hidden lg:block">
                  <Peek key={at(-1).label} cat={at(-1)} side="left" overlap touchPhone z={2} />
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.94, x: 90 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 3.6, ease: EASE }}
                  className="relative z-10 w-[190px] sm:w-[220px] aspect-[9/19] rounded-[36px] bg-[#0b0f1a] shadow-[0_35px_70px_-25px_rgba(15,23,42,0.45)] p-2 shrink-0 overflow-hidden"
                  style={{ border: "2px solid #1e2534" }}
                >
                  <span className="absolute left-1/2 top-2 -translate-x-1/2 z-30 h-4 w-16 rounded-full bg-[#0b0f1a]" />
                  <PhoneScreenFor cat={active} />
                </motion.div>

                <div className="hidden lg:block">
                  <Peek key={at(1).label} cat={at(1)} side="right" touchPhone z={2} />
                </div>
                <div className="hidden xl:block">
                  <Peek key={at(2).label} cat={at(2)} side="right" overlap z={1} />
                </div>
              </div>

              <p className="text-body font-serif italic mt-6" style={{ color: TEAL }}>
                {rich($t("AppDevShowcase__t45", "Your App. Your Brand. Our Expertise."))}</p>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6 order-3">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="rounded-2xl bg-white p-5 shadow-[0_20px_45px_-20px_rgba(15,40,60,0.3)] border border-slate-100"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: DEEP_TEAL }}>
                    <CalendarChatIcon color="#fff" size={18} />
                  </span>
                  <div>
                    <p className="text-small font-bold" style={{ color: NAVY }}>{rich($t("AppDevShowcase__t46", "Curious how we can do the same for you?"))}</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{rich($t("AppDevShowcase__t47", "Let's discuss your goals in a free strategy call."))}</p>
                  </div>
                </div>
                <Link
                  href={$t("AppDevShowcase__t48", "/contact")}
                  className="flex items-center justify-center gap-2 w-full rounded-lg py-2.5 text-[12px] font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: DEEP_TEAL }}
                >
                  {$t("AppDevShowcase__t49", "Book Free Strategy Call")}<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
                <div className="flex items-center gap-2.5 mt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-6 w-6 rounded-full ring-2 ring-white overflow-hidden relative bg-slate-200">
                        <Image src={$t("AppDevShowcase__t50", "/image1.webp")} alt={$t("AppDevShowcase__t51", "Client")} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {rich($t("AppDevShowcase__t52", "50+ businesses"))}<br />{rich($t("AppDevShowcase__t53", "transformed with ProManage"))}</p>
                </div>
              </motion.div>

              <ChecklistCard
                badge={$t("AppDevShowcase__t54", "Real Impact. Real Growth.")}
                Icon={HeartIcon}
                heading={$t("AppDevShowcase__t55", "We build apps that")}
                highlight="deliver measurable results."
                items={RIGHT_CHECKLIST}
                align="right"
              />
            </div>
          </div>

          {/* Testimonial + CTA banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-10 w-full bg-[#FEFEFC] rounded-[24px] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] border border-slate-100 p-6 lg:px-10 lg:py-8 flex flex-col xl:flex-row items-center gap-8 xl:gap-0"
          >
            <div className="flex-1 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 xl:pr-10">
              <div className="flex items-start gap-3 sm:gap-4 max-w-[320px]">
                <QuoteIcon />
                <p className="text-small font-medium text-slate-700">
                  {rich($t("AppDevShowcase__t56", "ProManage didn't just build our app, they became our product partners. The results have been exceptional."))}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden relative bg-slate-200">
                  <Image src={$t("AppDevShowcase__t57", "/image1.webp")} alt={$t("AppDevShowcase__t58", "Rohit Sharma")} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-[12px] sm:text-[13px] font-bold text-slate-900 leading-tight mb-0.5">{$t("AppDevShowcase__t59", "Rohit Sharma")}</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight">{rich($t("AppDevShowcase__t60", "Co-founder, FitLife"))}</p>
                </div>
              </div>
            </div>

            <div className="hidden xl:block w-px h-16 bg-slate-200 shrink-0" />
            <div className="block xl:hidden w-full h-px bg-slate-200" />

            <div className="flex-1 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 xl:pl-10">
              <div className="flex flex-col gap-1.5 max-w-[300px]">
                <h3 className="text-[15px] sm:text-[16px] font-bold text-[#132a43] leading-snug">
                  {$t("AppDevShowcase__t61", "Ready to build your success story?")}</h3>
                <p className="text-caption text-slate-500 font-medium">
                  {rich($t("AppDevShowcase__t62", "Let's turn your idea into the next big thing."))}</p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                <Link href={$t("AppDevShowcase__t63", "/testimonials")} className="bg-[#0b3b35] hover:bg-[#132a43] text-white text-[12px] font-semibold py-3 px-5 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                  {$t("AppDevShowcase__t64", "View More Success Stories")}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                </Link>
                <div className="flex items-center gap-1.5 text-[#0d9488]/80 sm:mr-1 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15c0-4.4 3.6-8 8-8s8 3.6 8 8" /><polyline points="17 11 21 15 17 19" /></svg>
                  <span className="text-[9px] font-bold tracking-wide">{$t("AppDevShowcase__t65", "Explore more transformations")}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="mt-6">
            <StatsBar />
          </div>

          {/* Dark bottom CTA banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative mt-6 overflow-hidden rounded-2xl border border-[#1a3844] p-6 lg:px-10 lg:py-7 flex flex-col lg:flex-row items-center justify-between gap-6"
            style={{ backgroundColor: "#09222b" }}
          >
            <div className="absolute right-0 top-0 opacity-20 pointer-events-none">
              <svg width="260" height="180" viewBox="0 0 260 180" fill="none">
                <path d="M0 160 L 70 130 L 130 100 L 190 60 L 250 18" stroke="#14b8a6" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="70" cy="130" r="4" fill="#09222b" stroke="#14b8a6" strokeWidth="2" />
                <circle cx="190" cy="60" r="4" fill="#09222b" stroke="#14b8a6" strokeWidth="2" />
              </svg>
            </div>

            <div className="flex items-center gap-4 relative z-10">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: "rgba(20,184,166,0.35)", backgroundColor: "#0d2e3a" }}>
                <SparkleIcon color="#fbbf24" size={22} />
              </span>
              <p className="text-body font-semibold text-white max-w-md">
                {rich($t("AppDevShowcase__t66", "Whether you have an idea or need to scale, we're here to build what's possible."))}</p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 relative z-10">
              {FOOTER_FEATURES.map((f) => (
                <div key={f.title} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: "rgba(20,184,166,0.4)" }}>
                    <CheckIcon color="#14b8a6" size={9} />
                  </span>
                  <span className="text-[11px] font-semibold text-slate-200 whitespace-nowrap">{f.title}</span>
                </div>
              ))}
            </div>

            <Link
              href={$t("AppDevShowcase__t67", "/contact")}
              className="relative z-10 shrink-0 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[13px] font-bold whitespace-nowrap transition-colors"
              style={{ backgroundColor: "#fbbf24", color: NAVY }}
            >
              {$t("AppDevShowcase__t68", "Let's Build Your App")}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </motion.div>
        </>
      </Container>
    </section>
  );
}
