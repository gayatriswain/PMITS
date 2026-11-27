"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { Counter } from "../shared/useCountUp";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#0d9488";
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
/* Category icons                                                     */
/* ------------------------------------------------------------------ */

const ScooterIcon = ({ color = "currentColor", size = 18 }) => (
  <svg {...svgBase(color, size)}>
    <circle cx="6" cy="18" r="2.3" />
    <circle cx="18" cy="18" r="2.3" />
    <path d="M6 18 H13 L15.5 11 H19" />
    <path d="M9 18 L11 12 H14.5" />
    <path d="M15 7 H17.5 L19 11" strokeWidth="2.4" />
  </svg>
);
const BagIcon = ({ color = "currentColor", size = 18 }) => (
  <svg {...svgBase(color, size)}>
    <path d="M6 8 H18 L17.2 20.5 A2 2 0 0 1 15.2 22.3 H8.8 A2 2 0 0 1 6.8 20.5 Z" />
    <path d="M9 8 V6 a3 3 0 0 1 6 0 V8" />
  </svg>
);
const HeartPulseIcon = ({ color = "currentColor", size = 18 }) => (
  <svg {...svgBase(color, size)}>
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
    <path d="M4.5 11 H8 L10 7 L13 15 L15 11 H18.5" />
  </svg>
);
const DumbbellIcon = ({ color = "currentColor", size = 18 }) => (
  <svg {...svgBase(color, size)}>
    <path d="M4 9v6M2 10v4M20 9v6M22 10v4M6 12h12" strokeWidth="2.4" />
    <rect x="5.5" y="7.5" width="2.5" height="9" rx="1" fill={color} stroke="none" />
    <rect x="16" y="7.5" width="2.5" height="9" rx="1" fill={color} stroke="none" />
  </svg>
);
const CreditCardIcon = ({ color = "currentColor", size = 18 }) => (
  <svg {...svgBase(color, size)}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="2.4" />
    <path d="M2.5 10 H21.5" strokeWidth="2.4" />
    <path d="M6 14.5 H10" />
  </svg>
);
const GridDotsIcon = ({ color = "currentColor", size = 18 }) => (
  <svg {...svgBase(color, size)}>
    <circle cx="5" cy="5" r="1.6" fill={color} stroke="none" />
    <circle cx="12" cy="5" r="1.6" fill={color} stroke="none" />
    <circle cx="19" cy="5" r="1.6" fill={color} stroke="none" />
    <circle cx="5" cy="12" r="1.6" fill={color} stroke="none" />
    <circle cx="12" cy="12" r="1.6" fill={color} stroke="none" />
    <circle cx="19" cy="12" r="1.6" fill={color} stroke="none" />
    <circle cx="5" cy="19" r="1.6" fill={color} stroke="none" />
    <circle cx="12" cy="19" r="1.6" fill={color} stroke="none" />
    <circle cx="19" cy="19" r="1.6" fill={color} stroke="none" />
  </svg>
);
const MenuIcon = ({ color = "currentColor", size = 16 }) => (
  <svg {...svgBase(color, size)}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);
const BellIcon = ({ color = "currentColor", size = 16 }) => (
  <svg {...svgBase(color, size)}>
    <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);
const StarFillIcon = ({ color = "#f59e0b", size = 9 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
  </svg>
);
const DoctorAvatar = ({ color = "currentColor", size = 18 }) => (
  <svg {...svgBase(color, size)}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 21c0-3.5 3-6 7-6s7 2.5 7 6" />
    <path d="M9.5 13.5 V15.5 M14.5 13.5 V15.5" strokeWidth="1.4" />
  </svg>
);
const BurgerIcon = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <path d="M4 15 C4 9 10 6 18 6 C26 6 32 9 32 15 Z" fill="#f4c358" />
    <rect x="4" y="16" width="28" height="3.4" rx="1.4" fill="#7a9c3f" />
    <rect x="4" y="20" width="28" height="4.2" rx="1.8" fill="#a5672f" />
    <rect x="4" y="25" width="28" height="2.6" rx="1.2" fill="#f4c358" />
    <path d="M5 28 C5 30.5 10 32 18 32 C26 32 31 30.5 31 28 Z" fill="#f0b23f" />
    {[9, 15, 21, 27].map((x) => (
      <circle key={x} cx={x} cy="9" r="1" fill="#fff" opacity="0.85" />
    ))}
  </svg>
);

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Category = {
  id: string;
  label: string;
  Icon: (p: { color?: string; size?: number }) => React.JSX.Element;
  color: string;
  bg: string;
  appName: string;
};

const CATEGORIES__cms: Category[] = [
  { id: "food", label: "Food Delivery", Icon: ScooterIcon, color: "#ea580c", bg: "#fff1e6", appName: "QuickBite" },
  { id: "ecommerce", label: "Ecommerce", Icon: BagIcon, color: "#db2777", bg: "#fde8f2", appName: "ShopZone" },
  { id: "healthcare", label: "Healthcare", Icon: HeartPulseIcon, color: "#0284c7", bg: "#e6f4fd", appName: "HealthCare+" },
  { id: "fitness", label: "Fitness", Icon: DumbbellIcon, color: "#16a34a", bg: "#e9f9ee", appName: "FitLife" },
  { id: "fintech", label: "Fintech", Icon: CreditCardIcon, color: "#7c3aed", bg: "#f1ebfe", appName: "MyFinance" },
  { id: "more", label: "More", Icon: GridDotsIcon, color: "#475569", bg: "#eef2f6", appName: "And Many More" },
];

const FEATURES__cms = [
  {
    Icon: (p: { color?: string; size?: number }) => (
      <svg {...svgBase(p.color ?? "currentColor", p.size ?? 20)}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20a8 8 0 0 1 16 0" />
      </svg>
    ),
    title: "User Focused",
    text: "Designed for real people and real experiences.",
    color: "#2563eb",
    bg: "#dbeafe",
  },
  {
    Icon: (p: { color?: string; size?: number }) => (
      <svg {...svgBase(p.color ?? "currentColor", p.size ?? 20)}>
        <path d="M12 3 L20 6 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V6 Z" />
        <path d="M8.5 12 L11 14.5 L15.5 9.5" />
      </svg>
    ),
    title: "Secure & Reliable",
    text: "Built with enterprise-grade security and scalable architecture.",
    color: "#7c3aed",
    bg: "#ede9fe",
  },
  {
    Icon: (p: { color?: string; size?: number }) => (
      <svg width={p.size ?? 20} height={p.size ?? 20} viewBox="0 0 24 24" fill={p.color ?? "currentColor"}>
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
      </svg>
    ),
    title: "High Performance",
    text: "Optimized for speed, reliability and every device.",
    color: "#ea580c",
    bg: "#ffedd5",
  },
  {
    Icon: (p: { color?: string; size?: number }) => (
      <svg {...svgBase(p.color ?? "currentColor", p.size ?? 20)}>
        <path d="M4 20V10M10 20V4M16 20v-7M22 4h-5v5" />
      </svg>
    ),
    title: "Measurable Growth",
    text: "Apps that drive engagement, retention and revenue.",
    color: "#0f766e",
    bg: "#ccfbf1",
  },
];

/** Client faces in the trust bar (replace with real client photos in the CMS). */
const AVATARS__cms = [
  { name: "Client", image: "/customer-avatar.webp" },
  { name: "Client", image: "/ravi-sharma-avatar.webp" },
  { name: "Client", image: "/local-seo/avatar-sarah.webp" },
];

const STATS__cms = [
  {
    target: 120,
    suffix: "+",
    label: "Apps Delivered",
    icon: (
      <svg {...svgBase(TEAL, 18)}>
        <path d="M14 4 C18 3 21 6 20 10 L13 17 L7 11 Z" />
        <circle cx="15.5" cy="8.5" r="1.5" />
        <path d="M7 11 H4 L7 7 H11 M13 17 V20 L17 17 V13 M6 18 L3.5 20.5" />
      </svg>
    ),
  },
  {
    target: 98,
    suffix: "%",
    label: "Client Satisfaction",
    icon: (
      <svg {...svgBase(TEAL, 18)}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    target: 4.9,
    suffix: "/5",
    label: "Average Rating",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={TEAL}>
        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
      </svg>
    ),
  },
  {
    target: 15,
    suffix: "+",
    label: "Industries Served",
    icon: (
      <svg {...svgBase(TEAL, 18)}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Motion                                                              */
/* ------------------------------------------------------------------ */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/* Per-category screen content — full detail for the active phone,    */
/* reused (scaled down) for the peeking side cards.                   */
/* ------------------------------------------------------------------ */

const QUICK_ICONS__cms = [
  { label: "Pizza", emoji: "\u{1F355}" },
  { label: "Burger", emoji: "\u{1F354}" },
  { label: "Sushi", emoji: "\u{1F363}" },
  { label: "Drinks", emoji: "\u{1F964}" },
];

const RESTAURANTS__cms = [
  { name: "The Burger Co.", rating: "4.5", time: "20-30 min", fee: "$0 Delivery" },
  { name: "Pizza House", rating: "4.3", time: "25-35 min", fee: "$1.99 Delivery" },
  { name: "Sushi World", rating: "4.7", time: "20-30 min", fee: "$0 Delivery" },
  { name: "Taco Fiesta", rating: "4.6", time: "15-25 min", fee: "$0 Delivery" },
];

function FoodScreen() {
  const $t = useCmsText();
  const QUICK_ICONS = useCmsData("AppDevHero__QUICK_ICONS", QUICK_ICONS__cms);
  const RESTAURANTS = useCmsData("AppDevHero__RESTAURANTS", RESTAURANTS__cms);
  return (
    <>
      <div className="flex items-center justify-between px-4 pb-2.5">
        <MenuIcon color={NAVY} size={15} />
        <span className="flex items-center gap-1 text-[9px] font-semibold" style={{ color: NAVY }}>
          {html($t("AppDevHero__t1", "Deliver to "))}<span className="font-bold">{html($t("AppDevHero__t2", "Home"))}</span>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="3"><path d="m6 9 6 6 6-6" /></svg>
        </span>
        <span className="relative">
          <BellIcon color={NAVY} size={15} />
          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-orange-500" />
        </span>
      </div>

      <div className="mx-4 mb-3 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="6.5" /><path d="M16 16 L20.5 20.5" />
        </svg>
        <span className="text-[8.5px] text-slate-400">{html($t("AppDevHero__t3", "Search for restaurants or dishes"))}</span>
      </div>

      <div className="relative mx-4 mb-4 overflow-hidden rounded-2xl p-3.5" style={{ backgroundColor: "#ea580c" }}>
        <p className="inline-block rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-extrabold" style={{ color: "#ea580c" }}>{rich($t("AppDevHero__t4", "30% OFF"))}</p>
        <p className="text-[10px] font-semibold leading-snug text-white mt-1.5 max-w-[62%]">{rich($t("AppDevHero__t5", "on your first order"))}</p>
        <span className="inline-block mt-2 rounded-full bg-white px-2.5 py-1 text-[8px] font-bold" style={{ color: "#ea580c" }}>{html($t("AppDevHero__t6", "Order Now"))}</span>
        <span className="absolute right-1.5 bottom-1.5"><BurgerIcon size={40} /></span>
      </div>

      <div className="px-4 mb-1 flex items-center justify-between">
        <p className="text-[9.5px] font-bold" style={{ color: NAVY }}>{rich($t("AppDevHero__t7", "Popular Near You"))}</p>
        <p className="text-[8px] font-semibold" style={{ color: "#ea580c" }}>{rich($t("AppDevHero__t8", "View all"))}</p>
      </div>
      <div className="px-4 mb-3 flex items-center justify-between">
        {QUICK_ICONS.map((q) => (
          <div key={q.label} className="flex flex-col items-center gap-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-[13px]">{q.emoji}</span>
            <span className="text-[7.5px] text-slate-500">{q.label}</span>
          </div>
        ))}
        <div className="flex flex-col items-center gap-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 text-[13px]">•••</span>
          <span className="text-[7.5px] text-slate-500">{html($t("AppDevHero__t9", "More"))}</span>
        </div>
      </div>

      <div className="px-4 flex flex-1 flex-col pb-2">
        <p className="text-[9.5px] font-bold mb-2" style={{ color: NAVY }}>{rich($t("AppDevHero__t10", "Top Restaurants"))}</p>
        <div className="flex flex-1 flex-col justify-between">
          {RESTAURANTS.map((r) => (
            <div key={r.name} className="flex items-center gap-2 rounded-xl bg-slate-50 px-2 py-1.5">
              <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-orange-100">
                <Image src={$t("AppDevHero__t11", "/project4.webp")} alt={r.name} fill className="object-cover" sizes="32px" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold truncate" style={{ color: NAVY }}>{r.name}</p>
                <p className="flex items-center gap-1 text-[7.5px] text-slate-400"><StarFillIcon />{r.rating} • {r.time}</p>
              </div>
              <span className="shrink-0 text-[7px] font-semibold text-emerald-600">{r.fee}</span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav color="#ea580c" labels={[$t("AppDevHero__t12", "Home"), $t("AppDevHero__t13", "Orders"), $t("AppDevHero__t14", "Favorites"), $t("AppDevHero__t15", "Profile")]} />
    </>
  );
}

function EcommerceScreen() {
  const $t = useCmsText();
  return (
    <>
      <div className="px-4 pb-3 flex items-center justify-between">
        <p className="text-caption font-bold" style={{ color: NAVY }}>{rich($t("AppDevHero__t16", "Hi, Sarah "))}{"\u{1F44B}"}</p>
        <BellIcon color="#94a3b8" size={15} />
      </div>

      <div className="relative mx-4 mb-4 overflow-hidden rounded-2xl p-3.5">
        <Image src={$t("AppDevHero__t17", "/lux.webp")} alt="" fill className="object-cover" sizes="200px" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(219,39,119,0.9) 30%, rgba(219,39,119,0.15) 90%)" }} />
        <p className="relative text-[8px] font-bold uppercase tracking-wide text-white/85">{rich($t("AppDevHero__t18", "Today's Deals"))}</p>
        <p className="relative text-[10.5px] font-bold leading-snug mt-1 max-w-[60%] text-white">{rich($t("AppDevHero__t19", "Summer Collection up to 40% off"))}</p>
        <span className="relative inline-block mt-2 rounded-full px-2.5 py-1 text-[8px] font-bold text-white" style={{ backgroundColor: "#db2777" }}>{html($t("AppDevHero__t20", "Shop Now"))}</span>
      </div>

      <div className="px-4 mb-3">
        <p className="text-[9.5px] font-bold mb-2" style={{ color: NAVY }}>{rich($t("AppDevHero__t21", "Categories"))}</p>
        <div className="flex items-center justify-between">
          {[$t("AppDevHero__t22", "Men"), $t("AppDevHero__t23", "Women"), $t("AppDevHero__t24", "Kids"), $t("AppDevHero__t25", "Home")].map((c) => (
            <div key={c} className="flex flex-col items-center gap-1">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50" style={{ color: "#db2777" }}>
                <BagIcon size={13} />
              </span>
              <span className="text-[7.5px] text-slate-500">{c}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 flex flex-1 flex-col pb-2">
        <p className="text-[9.5px] font-bold mb-2" style={{ color: NAVY }}>{rich($t("AppDevHero__t26", "Best Sellers"))}</p>
        <div className="flex flex-1 flex-col justify-between">
          {[
            { name: $t("AppDevHero__t27", "Minimal Chair"), price: $t("AppDevHero__t28", "$88.00"), image: $t("AppDevHero__t29", "/83a9d1eb-da0f-4585-bf40-f9031fb7e5f1.webp") },
            { name: $t("AppDevHero__t30", "Everyday Sneakers"), price: $t("AppDevHero__t31", "$64.00"), image: $t("AppDevHero__t32", "/furnisher.webp") },
            { name: $t("AppDevHero__t33", "Canvas Tote Bag"), price: $t("AppDevHero__t34", "$22.00"), image: $t("AppDevHero__t35", "/lux.webp") },
          ].map((p) => (
            <div key={p.name} className="flex items-center gap-2 rounded-xl bg-slate-50 px-2 py-1.5">
              <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                <Image src={p.image} alt={p.name} fill className="object-cover" sizes="36px" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold truncate" style={{ color: NAVY }}>{p.name}</p>
                <p className="text-[7.5px] text-slate-400">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav color="#db2777" labels={[$t("AppDevHero__t36", "Home"), $t("AppDevHero__t37", "Categories"), $t("AppDevHero__t38", "Cart"), $t("AppDevHero__t39", "Profile")]} />
    </>
  );
}

function HealthcareScreen() {
  const $t = useCmsText();
  return (
    <>
      <div className="px-4 pb-2.5 flex items-center justify-between">
        <p className="text-[11px] font-bold" style={{ color: NAVY }}>{rich($t("AppDevHero__t40", "Book Doctor Appointment"))}</p>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="M16 16 L20.5 20.5" /></svg>
      </div>
      <div className="mx-4 mb-3 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
        <span className="text-[8.5px] text-slate-400">{html($t("AppDevHero__t41", "Search doctors, clinics..."))}</span>
      </div>

      <div className="mx-4 mb-4 rounded-2xl border border-slate-100 p-3">
        <div className="flex items-start gap-2.5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "#e6f4fd", color: "#0284c7" }}>
            <DoctorAvatar size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold truncate" style={{ color: NAVY }}>{rich($t("AppDevHero__t42", "Dr. James Carter"))}</p>
            <p className="text-[8px] text-slate-400">{rich($t("AppDevHero__t43", "Cardiologist"))}</p>
            <p className="flex items-center gap-1 text-[7.5px] text-slate-400 mt-0.5"><StarFillIcon />{rich($t("AppDevHero__t44", "4.8 (120)"))}</p>
          </div>
        </div>
        <span className="mt-2.5 block rounded-lg py-1.5 text-center text-[8.5px] font-bold text-white" style={{ backgroundColor: "#0284c7" }}>{html($t("AppDevHero__t45", "Book Now"))}</span>
      </div>

      <div className="px-4 flex flex-1 flex-col pb-2">
        <p className="text-[9.5px] font-bold mb-2" style={{ color: NAVY }}>{rich($t("AppDevHero__t46", "Upcoming Appointments"))}</p>
        <div className="flex flex-1 flex-col justify-between">
          {[
            { name: $t("AppDevHero__t47", "Dr. James Carter"), meta: $t("AppDevHero__t48", "Today, 5:00 PM") },
            { name: $t("AppDevHero__t49", "Dr. Sarah Lee"), meta: $t("AppDevHero__t50", "Fri, 11:30 AM") },
          ].map((a) => (
            <div key={a.name} className="flex items-center gap-2 rounded-xl bg-slate-50 px-2 py-1.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "#e6f4fd", color: "#0284c7" }}>
                <DoctorAvatar size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold truncate" style={{ color: NAVY }}>{a.name}</p>
                <p className="text-[7.5px] text-slate-400">{a.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav color="#0284c7" labels={[$t("AppDevHero__t51", "Home"), $t("AppDevHero__t52", "Appointments"), $t("AppDevHero__t53", "Records"), $t("AppDevHero__t54", "Profile")]} />
    </>
  );
}

function FitnessScreen() {
  const $t = useCmsText();
  return (
    <>
      <div className="px-4 pb-3 flex items-center justify-between">
        <p className="text-caption font-bold" style={{ color: NAVY }}>{rich($t("AppDevHero__t55", "Hello, Alex "))}{"\u{1F44B}"}</p>
        <BellIcon color="#94a3b8" size={15} />
      </div>

      <div className="mx-4 mb-4 rounded-2xl p-3.5 flex items-center justify-between" style={{ backgroundColor: "#e9f9ee" }}>
        <div>
          <p className="text-[8px] font-bold uppercase tracking-wide" style={{ color: "#16a34a" }}>{rich($t("AppDevHero__t56", "Today's Activity"))}</p>
          <p className="text-body font-extrabold mt-1.5" style={{ color: NAVY }}>{rich($t("AppDevHero__t57", "6,248"))}</p>
          <p className="text-[8px] text-slate-500 mt-0.5">{rich($t("AppDevHero__t58", "Steps"))}</p>
        </div>
        <svg width="46" height="46" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" fill="none" stroke="#d1f0da" strokeWidth="4" />
          <circle cx="20" cy="20" r="16" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeDasharray="100.5" strokeDashoffset="28" transform="rotate(-90 20 20)" />
        </svg>
      </div>

      <div className="px-4 mb-4 flex items-center gap-3">
        <div className="flex-1 rounded-xl bg-slate-50 px-2.5 py-2">
          <p className="text-[10px] font-bold" style={{ color: NAVY }}>{rich($t("AppDevHero__t59", "462"))}</p>
          <p className="text-[7px] text-slate-400">{rich($t("AppDevHero__t60", "Calories"))}</p>
        </div>
        <div className="flex-1 rounded-xl bg-slate-50 px-2.5 py-2">
          <p className="text-[10px] font-bold" style={{ color: NAVY }}>{rich($t("AppDevHero__t61", "5.2 km"))}</p>
          <p className="text-[7px] text-slate-400">{rich($t("AppDevHero__t62", "Distance"))}</p>
        </div>
      </div>

      <div className="px-4 flex flex-1 flex-col pb-2">
        <p className="text-[9.5px] font-bold mb-2" style={{ color: NAVY }}>{rich($t("AppDevHero__t63", "Workouts For You"))}</p>
        <div className="flex flex-1 flex-col justify-between">
          {[
            { n: $t("AppDevHero__t64", "Full Body Strength"), m: $t("AppDevHero__t65", "45 min • 320 kcal") },
            { n: $t("AppDevHero__t66", "Yoga Flow"), m: $t("AppDevHero__t67", "30 min • 180 kcal") },
            { n: $t("AppDevHero__t68", "Cardio Blast"), m: $t("AppDevHero__t69", "20 min • 210 kcal") },
          ].map((w) => (
            <div key={w.n} className="flex items-center gap-2 rounded-xl bg-slate-50 px-2 py-1.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: "#e9f9ee", color: "#16a34a" }}>
                <DumbbellIcon size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold truncate" style={{ color: NAVY }}>{w.n}</p>
                <p className="text-[7.5px] text-slate-400">{w.m}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav color="#16a34a" labels={[$t("AppDevHero__t70", "Home"), $t("AppDevHero__t71", "Workouts"), $t("AppDevHero__t72", "Progress"), $t("AppDevHero__t73", "Profile")]} />
    </>
  );
}

const TRANSACTIONS__cms = [
  { name: "Amazon", amount: "-$120.00", positive: false },
  { name: "Starbucks", amount: "-$8.50", positive: false },
  { name: "Salary", amount: "+$12,000.00", positive: true },
];

function FintechScreen() {
  const $t = useCmsText();
  const TRANSACTIONS = useCmsData("AppDevHero__TRANSACTIONS", TRANSACTIONS__cms);
  return (
    <>
      <div className="px-4 pb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: "#f1ebfe", color: "#7c3aed" }}>
          <CreditCardIcon size={14} />
        </span>
        <p className="text-[11px] font-bold" style={{ color: NAVY }}>{rich($t("AppDevHero__t74", "MyFinance"))}</p>
      </div>

      <div className="mx-4 mb-4 rounded-2xl p-3.5" style={{ backgroundColor: "#7c3aed" }}>
        <p className="text-[8px] font-semibold uppercase tracking-wide text-white/70">{rich($t("AppDevHero__t75", "Total Balance"))}</p>
        <p className="text-body font-extrabold text-white mt-1">{rich($t("AppDevHero__t76", "$8,750.50"))}</p>
        <div className="mt-3 flex items-center gap-4">
          {[$t("AppDevHero__t77", "Send"), $t("AppDevHero__t78", "Receive"), $t("AppDevHero__t79", "History")].map((a) => (
            <span key={a} className="text-[7.5px] font-semibold text-white/85">{a}</span>
          ))}
        </div>
      </div>

      <div className="px-4 flex flex-1 flex-col pb-2">
        <p className="text-[9.5px] font-bold mb-2" style={{ color: NAVY }}>{rich($t("AppDevHero__t80", "Recent Transactions"))}</p>
        <div className="flex flex-1 flex-col justify-between">
          {TRANSACTIONS.map((t) => (
            <div key={t.name} className="flex items-center gap-2 rounded-xl bg-slate-50 px-2.5 py-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[9px] font-bold" style={{ color: "#7c3aed" }}>
                {t.name[0]}
              </span>
              <p className="text-[9px] font-semibold flex-1 truncate" style={{ color: NAVY }}>{t.name}</p>
              <span className={`text-[8.5px] font-bold ${t.positive ? "text-emerald-600" : "text-slate-500"}`}>{t.amount}</span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav color="#7c3aed" labels={[$t("AppDevHero__t81", "Home"), $t("AppDevHero__t82", "Cards"), $t("AppDevHero__t83", "Stats"), $t("AppDevHero__t84", "Profile")]} />
    </>
  );
}

function MoreScreen() {
  const $t = useCmsText();
  return (
    <>
      <div className="px-4 pb-3">
        <p className="text-[11px] font-bold" style={{ color: NAVY }}>{rich($t("AppDevHero__t85", "And Many More Industries"))}</p>
      </div>
      <div className="relative mx-4 mb-4 overflow-hidden rounded-2xl p-3.5">
        <Image src={$t("AppDevHero__t86", "/954cbb0f-d7ee-4b91-b540-716a91c584b5.webp")} alt="" fill className="object-cover" sizes="200px" />
        <div className="absolute inset-0 bg-white/80" />
        <p className="relative text-[10.5px] font-bold leading-snug" style={{ color: NAVY }}>{rich($t("AppDevHero__t87", "Real estate, education, travel & more"))}</p>
        <p className="relative text-[8px] text-slate-500 mt-1">{rich($t("AppDevHero__t88", "Custom apps for every industry we serve."))}</p>
      </div>
      <div className="px-4 flex flex-1 flex-col justify-between pb-2">
        {[$t("AppDevHero__t89", "Real Estate"), $t("AppDevHero__t90", "Education"), $t("AppDevHero__t91", "Travel & Booking"), $t("AppDevHero__t92", "Logistics")].map((n) => (
          <div key={n} className="flex items-center gap-2 rounded-xl bg-slate-50 px-2.5 py-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#eef2f6", color: "#475569" }}>
              <GridDotsIcon size={13} />
            </span>
            <p className="text-[9px] font-semibold" style={{ color: NAVY }}>{n}</p>
          </div>
        ))}
      </div>
      <BottomNav color="#475569" labels={[$t("AppDevHero__t93", "Home"), $t("AppDevHero__t94", "Explore"), $t("AppDevHero__t95", "Saved"), $t("AppDevHero__t96", "Profile")]} />
    </>
  );
}

function BottomNav({ color, labels }: { color: string; labels: [string, string, string, string] }) {
  const icons = [
    <svg key="0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /></svg>,
    <svg key="1" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /></svg>,
    <svg key="2" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20s-7-4.35-9-8.5C1.4 8.2 2.9 5 6.5 5c1.9 0 3.3 1 4 2.2C11.2 6 12.6 5 14.5 5 18.1 5 19.6 8.2 18 11.5 17 15.65 12 20 12 20Z" /></svg>,
    <svg key="3" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>,
  ];
  return (
    <div className="mt-auto flex items-center justify-around border-t border-slate-100 px-2 pt-2 pb-3">
      {labels.map((label, i) => (
        <div key={label} className="flex flex-col items-center gap-0.5" style={{ color: i === 0 ? color : "#cbd5e1" }}>
          {icons[i]}
          <span className="text-[6.5px] font-semibold">{label}</span>
        </div>
      ))}
    </div>
  );
}

function ScreenBody({ id }: { id: string }) {
  switch (id) {
    case "food":
      return <FoodScreen />;
    case "ecommerce":
      return <EcommerceScreen />;
    case "healthcare":
      return <HealthcareScreen />;
    case "fitness":
      return <FitnessScreen />;
    case "fintech":
      return <FintechScreen />;
    default:
      return <MoreScreen />;
  }
}

/* ------------------------------------------------------------------ */
/* Peek card — a smaller phone-shaped card behind the active phone,    */
/* rendering the same screen content scaled down.                     */
/* ------------------------------------------------------------------ */

function PeekCard({ cat, side, depth }: { cat: Category; side: "left" | "right"; depth: 0 | 1 }) {
  const $t = useCmsText();
  // Upright, no rotation — flat open cards behind the phone, pushed out so ~70% of each is visible.
  // Near-card offset chosen so only ~10% of the card sits behind the phone (≈90% visible);
  // far cards get a smaller extra push so they don't overshoot past the section edge again.
  const translateX = side === "left" ? -170 - depth * 110 : 170 + depth * 110;
  const aspectClass = depth === 0 ? "aspect-[9/26]" : "aspect-[9/23.5]";
  const finalOpacity = depth === 0 ? 1 : 0.9;
  const finalScale = 1 - depth * 0.07;
  // Entrance sequence: phone first, then the near (depth 0) cards, then the far (depth 1) cards last —
  // slower duration + gentle ease so they glide out unhurried, rather than snapping into place.
  const enterDelay = depth === 0 ? 0.55 : 1;
  return (
    // The whole card (shadow, border, everything) is the motion element — it starts at x:0 (centered,
    // right behind the phone) and slides out to translateX, so the card itself moves, not just its content.
    // `transformTemplate` keeps the `-50%` centering (from `left-1/2`) alongside framer's own x/scale.
    <motion.div
      className={`absolute left-1/2 top-[3%] sm:top-[4%] w-[118px] sm:w-[138px] ${aspectClass} rounded-[22px] bg-white shadow-[0_20px_40px_-15px_rgba(15,23,42,0.22)] ring-1 ring-slate-100 overflow-hidden`}
      style={{ transformOrigin: "bottom center", zIndex: 10 - depth }}
      transformTemplate={(_, generated) => `translateX(-50%) ${generated}`}
      initial={{ x: 0, scale: finalScale * 0.88, opacity: 0 }}
      animate={{ x: translateX, scale: finalScale, opacity: finalOpacity }}
      transition={{ duration: 0.9, delay: enterDelay, ease: EASE }}
      aria-hidden
    >
      <div className="h-full w-full" style={{ transform: "scale(0.58)", transformOrigin: "top left", width: "172.4%", height: "172.4%" }}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 pt-3 pb-1 text-[9px] font-semibold" style={{ color: NAVY }}>
            <span>{html($t("AppDevHero__t97", "9:41"))}</span>
          </div>
          <div className="flex flex-1 min-h-0 flex-col">
            <ScreenBody id={cat.id} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Phone mock                                                          */
/* ------------------------------------------------------------------ */

function PhoneScreen({ cat }: { cat: Category }) {
  const $t = useCmsText();
  return (
    <div className="absolute inset-[3px] rounded-[34px] overflow-hidden bg-white">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -36 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="absolute inset-0 flex flex-col bg-white"
        >
          {/* status bar */}
          <div className="flex items-center justify-between px-4 pt-2.5 pb-1.5 text-[9px] font-semibold" style={{ color: NAVY }}>
            <span>{html($t("AppDevHero__t98", "9:41"))}</span>
            <span className="flex items-center gap-1">
              <svg width="12" height="9" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 4 C4 1 12 1 15 4 M3.5 6.5 C5.5 4.7 10.5 4.7 12.5 6.5 M6 9 C7 8 9 8 10 9" /></svg>
              <span className="w-3 h-2 rounded-sm border border-current" />
            </span>
          </div>

          <ScreenBody id={cat.id} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function AppDevHero() {
  const $t = useCmsText();
  const CATEGORIES = useCmsData("AppDevHero__CATEGORIES", CATEGORIES__cms);
  const FEATURES = useCmsData("AppDevHero__FEATURES", FEATURES__cms);
  const STATS = useCmsData("AppDevHero__STATS", STATS__cms);
  const AVATARS = useCmsData("AppDevHero__AVATARS", AVATARS__cms);
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].id);
  const [isPaused, setIsPaused] = useState(false);

  const activeIndex = useMemo(() => CATEGORIES.findIndex((c) => c.id === activeId), [activeId]);
  const active = CATEGORIES[activeIndex];

  const go = (dir: 1 | -1) => {
    const next = (activeIndex + dir + CATEGORIES.length) % CATEGORIES.length;
    setActiveId(CATEGORIES[next].id);
  };

  // Auto-advance through the categories, pausing on hover so manual browsing (arrows/clicks) isn't fought.
  React.useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveId((current) => {
        const idx = CATEGORIES.findIndex((c) => c.id === current);
        const next = (idx + 1) % CATEGORIES.length;
        return CATEGORIES[next].id;
      });
    }, 4000);
    return () => clearInterval(id);
  }, [isPaused]);

  const leftPeeks = [
    CATEGORIES[(activeIndex - 1 + CATEGORIES.length) % CATEGORIES.length],
    CATEGORIES[(activeIndex - 2 + CATEGORIES.length) % CATEGORIES.length],
  ];
  const rightPeeks = [
    CATEGORIES[(activeIndex + 1) % CATEGORIES.length],
    CATEGORIES[(activeIndex + 2) % CATEGORIES.length],
  ];

  return (
    <section className="relative w-full bg-[#F7F9FA] overflow-x-clip py-10 lg:py-14">
      <Container className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] gap-14 lg:gap-10 items-center">
        {/* Left content */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-md bg-[#e6f4f1] px-3 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase mb-6"
            style={{ color: TEAL }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: TEAL }} />
            {html($t("AppDevHero__t99", "App Development"))}</motion.span>

          <motion.h1 variants={fadeUp} className="font-heading text-[clamp(32px,3.4vw,52px)] font-bold leading-[1.16] tracking-[-0.025em] mb-6">
            <span className="block" style={{ color: NAVY }}>{html($t("AppDevHero__t100", "Powerful Apps."))}</span>
            <span className="block" style={{ color: NAVY }}>{html($t("AppDevHero__t101", "Meaningful Experiences."))}</span>
            <span className="block" style={{ color: DEEP_TEAL }}>{html($t("AppDevHero__t102", "Real Business Growth."))}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-small text-slate-600 leading-relaxed max-w-[470px]">
            {rich($t("AppDevHero__t103", "We design and develop intuitive, high-performance mobile apps that engage users, streamline operations and help your business grow — every single day."))}</motion.p>

          <motion.span variants={fadeUp} aria-hidden className="mt-6 mb-7 block h-[3px] w-10 rounded-full bg-amber-400" />

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-slate-200 mb-9 max-w-[640px]">
            {FEATURES.map((f) => (
              <div key={f.title} className="pr-3 sm:px-4 sm:first:pl-0">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full mb-3"
                  style={{ backgroundColor: f.bg, color: f.color }}
                >
                  <f.Icon color={f.color} size={19} />
                </span>
                <p className="text-[13px] font-bold leading-snug mb-1.5" style={{ color: NAVY }}>{f.title}</p>
                <p className="text-[11.5px] text-slate-500 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <Link
              href={$t("AppDevHero__t104", "/contact")}
              className="inline-flex items-center gap-3 rounded-lg px-6 py-3 text-[13px] font-semibold text-white shadow-lg shadow-teal-900/20 transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: DEEP_TEAL }}
            >
              {$t("AppDevHero__t105", "Let's Build Your App")}<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href={$t("AppDevHero__t106", "/portfolio")}
              className="inline-flex items-center gap-2.5 rounded-lg border px-5 py-3 text-[13px] font-semibold transition-colors hover:bg-[#e6f4f1]"
              style={{ color: DEEP_TEAL, borderColor: DEEP_TEAL }}
            >
              {$t("AppDevHero__t107", "View Our Work")}<span className="flex h-5 w-5 items-center justify-center rounded-full border-[1.5px]" style={{ borderColor: DEEP_TEAL, color: DEEP_TEAL }}>
                <svg width="7" height="7" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative z-10"
        >
          {/* Phone + peek cards */}
          <div className="relative h-[380px] sm:h-[440px] mb-8">
            {/* peeking cards, back to front */}
            <PeekCard cat={leftPeeks[1]} side="left" depth={1} />
            <PeekCard cat={rightPeeks[1]} side="right" depth={1} />
            <PeekCard cat={leftPeeks[0]} side="left" depth={0} />
            <PeekCard cat={rightPeeks[0]} side="right" depth={0} />

            {/* soft grounding shadow beneath the phone */}
            <div
              className="absolute left-1/2 top-[calc(50%+200px)] sm:top-[calc(50%+232px)] z-0 h-7 w-[150px] sm:w-[175px] -translate-x-1/2 rounded-full bg-black/25 blur-xl pointer-events-none"
              aria-hidden
            />

            {/* phone frame — zooms in into place (starts small, grows to its normal size) */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-20 w-[200px] sm:w-[230px] aspect-[9/19] rounded-[38px] bg-[#0b0f1a] shadow-[0_35px_70px_-25px_rgba(15,23,42,0.45)] p-2"
              style={{ border: "2px solid #1e2534" }}
              transformTemplate={(_, generated) => `translate(-50%, -50%) ${generated}`}
              initial={{ scale: 0.55, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {/* notch */}
              <span className="absolute left-1/2 top-2 -translate-x-1/2 z-30 h-4 w-20 rounded-full bg-[#0b0f1a]" />
              <div className="relative h-full w-full rounded-[30px] overflow-hidden bg-white">
                <PhoneScreen cat={active} />
              </div>
            </motion.div>
          </div>

          {/* Category switcher */}
          <div className="relative mt-12 flex items-center justify-between gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous category"
              className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_8px_20px_-8px_rgba(15,23,42,0.3)] ring-1 ring-slate-100 transition-colors hover:text-white"
              style={{ backgroundColor: "#fff" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = DEEP_TEAL; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>

            <div className="relative flex flex-1 items-start justify-center gap-3 sm:gap-7 overflow-x-auto no-scrollbar px-2 py-2.5">
              <span aria-hidden className="pointer-events-none absolute inset-x-4 top-[33px] border-t border-dashed border-slate-200" />
              {CATEGORIES.map((cat) => {
                const isActive = cat.id === active.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveId(cat.id)}
                    aria-pressed={isActive}
                    className="group flex shrink-0 flex-col items-center gap-1.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F9FA]"
                  >
                    <span
                      className="relative flex h-[46px] w-[46px] items-center justify-center rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? "#e6f4f1" : "#F7F9FA",
                        color: isActive ? DEEP_TEAL : "#64748b",
                        boxShadow: isActive ? `0 0 0 2px ${DEEP_TEAL}, 0 10px 20px -10px ${DEEP_TEAL}aa` : "none",
                      }}
                    >
                      <cat.Icon size={17} />
                    </span>
                    <span
                      className="text-[11px] font-semibold whitespace-nowrap"
                      style={{ color: isActive ? DEEP_TEAL : "#64748b" }}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next category"
              className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_8px_20px_-8px_rgba(15,23,42,0.3)] ring-1 ring-slate-100 transition-colors hover:text-white"
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = DEEP_TEAL; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </motion.div>
      </Container>

      {/* Bottom trust bar */}
      <Container className="relative z-10 mt-10 lg:mt-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="w-full bg-white rounded-[24px] shadow-[0_15px_40px_-25px_rgba(15,40,60,0.25)] border border-slate-100 p-6 lg:p-7 flex flex-col lg:flex-row items-center gap-6 lg:gap-10"
        >
          <div className="flex flex-col items-center lg:items-start gap-2 shrink-0">
            <p className="text-[11px] font-bold uppercase leading-relaxed tracking-[0.12em] text-center lg:text-left" style={{ color: NAVY }}>{rich($t("AppDevHero__t108m", "Trusted by Businesses<br class=\"hidden lg:block\"> Worldwide"))}</p>
            <div className="mt-1 flex -space-x-2">
              {AVATARS.map((a, i) => (
                <div key={i} className="h-10 w-10 rounded-full ring-[3px] ring-white overflow-hidden relative bg-slate-200 shadow-sm">
                  <Image src={a.image} alt={a.name} fill sizes="40px" className="object-cover" />
                </div>
              ))}
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full ring-[3px] ring-white text-sm font-bold shadow-sm"
                style={{ backgroundColor: "#f1f5f9", color: NAVY }}
              >
                +
              </span>
            </div>
          </div>

          <span className="hidden lg:block w-px h-16 bg-slate-200 shrink-0" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x sm:divide-slate-200 flex-1 w-full">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3.5 sm:justify-center sm:px-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1 ring-[#d7ece8] [&_svg]:h-[22px] [&_svg]:w-[22px]" style={{ backgroundColor: "#eef7f5" }}>
                  {stat.icon}
                </span>
                <div>
                  <p className="text-h4 font-heading font-bold leading-none" style={{ color: NAVY }}>
                    {stat.target % 1 === 0 ? <Counter target={stat.target} suffix={stat.suffix} /> : `${stat.target}${stat.suffix}`}
                  </p>
                  <p className="text-[12px] text-slate-500 mt-1.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
