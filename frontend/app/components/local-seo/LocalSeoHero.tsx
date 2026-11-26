"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Bookmark,
  ChevronDown,
  Clock3,
  CornerUpRight,
  Globe2,
  MapPin,
  Mic,
  Navigation,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Store,
  TrendingUp,
  Trophy,
  Users,
  Map as MapIcon,
  Target,
  type LucideIcon,
} from "lucide-react";
import { GoogleWord, Inner, LButton, LPill, LS, Panel, PlayCircle, Stars, Swash, ease, heading } from "./LocalSeoShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

/** Soft fade on the left, right and bottom edges of the scene photo. */
const SCENE_FADE = {
  maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 92%, transparent), linear-gradient(180deg, #000 85%, transparent)",
  maskComposite: "intersect" as const,
  WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 92%, transparent), linear-gradient(180deg, #000 85%, transparent)",
  WebkitMaskComposite: "source-in",
};

const BENEFITS__cms = [
  { Icon: MapPin, title: "More Visibility", sub: "in Local Searches" },
  { Icon: Phone, title: "More Calls & Visits", sub: "from Nearby Customers" },
  { Icon: Store, title: "More Footfall", sub: "to Your Store" },
  { Icon: Users, title: "More Customers", sub: "for Your Business" },
];

const QUERIES__cms = ["best cafe near me", "dentist near me", "salon near me", "tiffin service near me", "plumber near me", "gym near me"];

const EXPERTISE__cms = [
  { Icon: Target, label: "Local Search Experts" },
  { Icon: MapIcon, label: "Google Business Profile Pros" },
  { Icon: TrendingUp, label: "Proven Local Results" },
  { Icon: ShieldCheck, label: "Transparent & Honest" },
  { Icon: Trophy, label: "Focused on Your Business Growth" },
];

/** Floating callout card around the phone. */
function Callout({
  Icon,
  title,
  lines,
  className,
  delay,
  tone = "teal",
}: {
  Icon: LucideIcon;
  title: string;
  lines: string[];
  className: string;
  delay: number;
  tone?: "teal" | "amber";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease }}
      className={`absolute z-20 hidden md:block ${className}`}
    >
      <div className="ai-float flex items-start gap-[0.9cqw] rounded-[1.4cqw] border border-white bg-white/95 p-[1.3cqw] shadow-[0_18px_40px_-20px_rgba(15,40,80,.45)]" style={{ animationDelay: `${delay * 2}s` }}>
        <span className={`flex h-[4cqw] w-[4cqw] shrink-0 items-center justify-center rounded-full ${tone === "amber" ? "bg-amber-50 text-amber-500" : "bg-teal-50 text-[#0f766e]"}`}>
          <Icon className="h-[2cqw] w-[2cqw]" strokeWidth={2.2} fill={tone === "amber" ? "currentColor" : "none"} />
        </span>
        <span className="leading-tight">
          <span className="block text-[1.6cqw] font-bold text-[#0b1b33]">{title}</span>
          {lines.map((l) => (
            <span key={l} className="block text-[1.32cqw] text-slate-500">
              {l}
            </span>
          ))}
        </span>
      </div>
    </motion.div>
  );
}

/** Live business profile drawn over the blank phone screen of the scene image. */
function PhoneScreen() {
  const $t = useCmsText();
  const reduce = useReducedMotion();
  const [tab, setTab] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setTab((v) => (v + 1) % 4), 2600);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <div className="absolute left-[41.4%] top-[36.4%] h-[51.8%] w-[28.6%] overflow-hidden rounded-b-[3.2cqw] bg-white px-[1.5cqw] pt-[1.3cqw] text-[#0b1b33]">
      <p className={`${heading.className} flex items-center gap-[0.6cqw] text-[2.5cqw] font-bold leading-none`}>
        {rich($t("LocalSeoHero__t1", "Your Business "))}<BadgeCheck className="h-[2.1cqw] w-[2.1cqw] fill-blue-500 text-white" />
      </p>
      <p className="mt-[1cqw] flex items-center gap-[0.6cqw] text-[1.5cqw] text-slate-600">
        {rich($t("LocalSeoHero__t2", "4.9 "))}<Stars className="h-[1.45cqw] w-[1.45cqw]" /> <span className="text-slate-400">{$t("LocalSeoHero__t3", "(256)")}</span>
      </p>
      <p className="mt-[0.7cqw] text-[1.5cqw]">
        <span className="font-semibold text-green-600">{$t("LocalSeoHero__t4", "Open")}</span> <span className="text-slate-500">{$t("LocalSeoHero__t5", "· Closes 9 PM")}</span>
      </p>
      <div className="mt-[1.3cqw] grid grid-cols-4 gap-[0.4cqw] text-center">
        {[
          { I: Phone, l: $t("LocalSeoHero__t6", "Call") },
          { I: CornerUpRight, l: $t("LocalSeoHero__t7", "Directions") },
          { I: Globe2, l: $t("LocalSeoHero__t8", "Website") },
          { I: Bookmark, l: $t("LocalSeoHero__t9", "Save") },
        ].map(({ I, l }, i) => (
          <span key={l} className="flex flex-col items-center gap-[0.4cqw]">
            <span
              className="flex h-[3.8cqw] w-[3.8cqw] items-center justify-center rounded-full border border-slate-200 text-[#0f766e] transition-colors duration-500"
              style={{ backgroundColor: i === tab ? "rgba(20,163,154,.12)" : undefined }}
            >
              <I className="h-[1.8cqw] w-[1.8cqw]" />
            </span>
            <span className="text-[1.1cqw] text-slate-600">{l}</span>
          </span>
        ))}
      </div>
      <div className="relative mt-[1.4cqw] flex justify-between border-b border-slate-100 pb-[0.7cqw] text-[1cqw] font-semibold text-slate-500">
        {[$t("LocalSeoHero__t10", "OVERVIEW"), $t("LocalSeoHero__t11", "REVIEWS"), $t("LocalSeoHero__t12", "PHOTOS"), $t("LocalSeoHero__t13", "ABOUT")].map((t, i) => (
          <span key={t} className={`relative ${tab === i ? "text-[#0f766e]" : ""}`}>
            {t}
            {tab === i && <motion.span layoutId="ls-hero-tab" className="absolute -bottom-[0.75cqw] left-0 right-0 h-[0.25cqw] rounded-full bg-[#0f766e]" />}
          </span>
        ))}
      </div>
      <p className="mt-[1.4cqw] flex items-start gap-[0.9cqw] text-[1.3cqw] leading-snug text-slate-700">
        <MapPin className="mt-[0.1cqw] h-[1.7cqw] w-[1.7cqw] shrink-0 text-[#0f766e]" />
        <span>
          {$t("LocalSeoHero__t14", "123 Main Street,")}<br /> {$t("LocalSeoHero__t15", "Your City, ST 10001")}</span>
      </p>
      <p className="mt-[1.2cqw] flex items-center gap-[0.9cqw] border-t border-slate-100 pt-[1.2cqw] text-[1.3cqw] text-slate-700">
        <Clock3 className="h-[1.7cqw] w-[1.7cqw] shrink-0 text-[#0f766e]" /> {rich($t("LocalSeoHero__t16", "Open · Closes 9 PM "))}<ChevronDown className="h-[1.3cqw] w-[1.3cqw]" />
      </p>
    </div>
  );
}

export default function LocalSeoHero() {
  const $t = useCmsText();
  const BENEFITS = useCmsData("LocalSeoHero__BENEFITS", BENEFITS__cms);
  const QUERIES = useCmsData("LocalSeoHero__QUERIES", QUERIES__cms);
  const EXPERTISE = useCmsData("LocalSeoHero__EXPERTISE", EXPERTISE__cms);
  return (
    <Panel inner="!bg-[#f4f7fa]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_75%_45%,rgba(20,163,154,.10),transparent_70%)]" />
      <Inner className="pb-10 pt-10 sm:pt-14 lg:pb-14 lg:pt-14 2xl:pt-16">
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,0.66fr)_minmax(0,1fr)] lg:gap-6">
          {/* copy */}
          <div className="relative z-10 text-center lg:pt-2 lg:text-left">
            <LPill>{$t("LocalSeoHero__t17", "Local SEO That Drives Real Customers")}</LPill>
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className={`text-h1 ${heading.className} mt-7 font-bold tracking-[-0.025em] text-[#0b1b33]`}
            >
              {$t("LocalSeoHero__t18", "Be Found.")}<br /> {$t("LocalSeoHero__t19", "Get Chosen.")}<br /> {$t("LocalSeoHero__t20", "Grow")}{" "}
              <span className="relative inline-block text-[#0f766e]">
                {$t("LocalSeoHero__t21", "Locally.")}<Swash className="-bottom-[0.18em] h-[0.22em]" />
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="text-body mx-auto mt-8 max-w-[520px] text-slate-600 lg:mx-0"
            >
              {rich($t("LocalSeoHero__t22", "We help local businesses show up at the right place, at the right time—when customers are searching nearby."))}</motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start 2xl:gap-5"
            >
              <LButton>{$t("LocalSeoHero__t23", "Get My Free Consultation")}</LButton>
              <LButton variant="ghost" href={$t("LocalSeoHero__t24", "#local-seo-results")} icon={<PlayCircle className="h-6 w-6" />}>
                {$t("LocalSeoHero__t25", "See Our Results")}</LButton>
            </motion.div>

            {/* benefits */}
            <div className="mt-9 grid grid-cols-2 gap-y-5 sm:grid-cols-4">
              {BENEFITS.map(({ Icon, title, sub }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease }}
                  className={`group flex flex-col items-center px-2 text-center lg:items-start lg:text-left ${i ? "sm:border-l sm:border-slate-200 sm:pl-3" : ""}`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-[#0f766e] transition-transform duration-300 group-hover:-translate-y-1 2xl:h-12 2xl:w-12">
                    <Icon className="h-5 w-5 2xl:h-6 2xl:w-6" strokeWidth={1.8} />
                  </span>
                  <span className="mt-3 text-[12.5px] font-semibold text-[#0b1b33] 2xl:text-[13.5px]">{title}</span>
                  <span className="text-[11.5px] text-slate-500 2xl:text-[12.5px]">{sub}</span>
                </motion.div>
              ))}
            </div>

            {/* ratings */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease }}
              className="mx-auto mt-9 grid max-w-[570px] grid-cols-1 divide-y divide-slate-100 rounded-2xl sm:grid-cols-2 sm:divide-x sm:divide-y-0 border border-slate-100 bg-white px-2 py-4 shadow-[0_18px_40px_-28px_rgba(15,40,80,.45)] lg:mx-0"
            >
              {[
                { brand: <GoogleWord className="text-[26px] 2xl:text-[30px]" />, rate: $t("LocalSeoHero__t26", "4.9/5"), red: false, note: $t("LocalSeoHero__t27", "Based on 100+ reviews") },
                { brand: <span className="text-[26px] font-bold tracking-tight text-[#17313b] 2xl:text-[30px]">{$t("LocalSeoHero__t28", "Clutch")}</span>, rate: $t("LocalSeoHero__t29", "4.9/5"), red: true, note: $t("LocalSeoHero__t30", "Based on 50+ reviews") },
              ].map((r) => (
                <div key={r.note} className="flex items-center justify-center gap-3 px-3 py-2 sm:py-0">
                  {r.brand}
                  <span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-[#0b1b33]">
                      {r.rate} <Stars className="h-3.5 w-3.5" color={r.red ? "text-red-500" : "text-amber-400"} />
                    </span>
                    <span className="text-[11.5px] text-slate-500">{r.note}</span>
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* visual */}
          <div className="relative pt-[14%] lg:-mr-4">
            <div className="@container relative aspect-[1.41] w-full">
              {/* google search bar */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className="absolute left-[18%] top-[-17%] z-20 flex h-[10%] w-[66%] items-center gap-[1.5cqw] rounded-full border border-white bg-white/95 px-[2cqw] shadow-[0_16px_36px_-20px_rgba(15,40,80,.45)]"
              >
                <GoogleWord className="text-[2.6cqw]" />
                <span className="flex h-[72%] flex-1 items-center rounded-full border border-slate-100 px-[1.6cqw] text-[1.45cqw] text-slate-700">{$t("LocalSeoHero__t31", "restaurant near me")}</span>
                <Mic className="h-[2.2cqw] w-[2.2cqw] text-blue-500" />
                <Search className="h-[2.2cqw] w-[2.2cqw] text-blue-500" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease }}
                className="absolute left-[18%] top-[-3%] z-20 hidden items-center gap-[1cqw] rounded-[1.2cqw] bg-white px-[1.4cqw] py-[1cqw] shadow-[0_16px_36px_-20px_rgba(15,40,80,.45)] md:flex"
              >
                <MapPin className="h-[3cqw] w-[3cqw] fill-[#0f766e] text-white" />
                <span className="leading-tight">
                  <span className="block text-[1.05cqw] font-semibold uppercase tracking-wide text-[#0f766e]">{$t("LocalSeoHero__t32", "Your Business")}</span>
                  <span className="block text-[1.3cqw] font-semibold text-[#0b1b33]">{$t("LocalSeoHero__t33", "Right here. Right now.")}</span>
                </span>
              </motion.div>
              {/* dashed hint arrow from the callout to the phone */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full md:block" aria-hidden>
                <path d="M41 3 C 47 3, 50 6, 50 11" fill="none" stroke="#14a39a" strokeWidth="1.4" vectorEffect="non-scaling-stroke" className="ai-flow" />
                <path d="M70 40 C 74 45, 74 52, 72 57" fill="none" stroke="#14a39a" strokeWidth="1.4" vectorEffect="non-scaling-stroke" className="ai-flow" />
                <path d="M72 70 C 75 76, 75 82, 72 86" fill="none" stroke="#14a39a" strokeWidth="1.4" vectorEffect="non-scaling-stroke" className="ai-flow" />
              </svg>

              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease }} className="absolute inset-0">
                <Image src={LS.heroScene} alt={$t("LocalSeoHero__t34", "Local shop with a pin and its Google Business Profile on a phone")} fill priority sizes="(min-width:1024px) 900px, 95vw" className="object-contain" style={SCENE_FADE} />
                <PhoneScreen />
              </motion.div>

              <Callout Icon={Star} tone="amber" title={$t("LocalSeoHero__t35", "Top Rated")} lines={[$t("LocalSeoHero__t36", "More trust."), $t("LocalSeoHero__t37", "More clicks.")]} className="left-[73%] top-[18%] w-[17%]" delay={0.5} />
              <Callout Icon={Phone} title={$t("LocalSeoHero__t38", "One Tap Call")} lines={[$t("LocalSeoHero__t39", "More calls."), $t("LocalSeoHero__t40", "More bookings.")]} className="left-[74%] top-[48%] w-[18%]" delay={0.65} />
              <Callout Icon={Navigation} title={$t("LocalSeoHero__t41", "Quick Directions")} lines={[$t("LocalSeoHero__t42", "More visits."), $t("LocalSeoHero__t43", "More walk-ins.")]} className="left-[74.5%] top-[75%] w-[19%]" delay={0.8} />
              <Callout Icon={Store} title={$t("LocalSeoHero__t44", "Easy to Find")} lines={[$t("LocalSeoHero__t45", "On Search."), $t("LocalSeoHero__t46", "On Maps."), $t("LocalSeoHero__t47", "Everywhere.")]} className="left-[1%] top-[58%] w-[17%]" delay={0.95} />
            </div>

            {/* people are searching for */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6, ease }} className="mt-4 lg:pl-[6%]">
              <p className="text-small text-center text-slate-600 lg:text-left">{rich($t("LocalSeoHero__t48", "People are searching for:"))}</p>
              <div className="relative mt-2 overflow-hidden [mask-image:linear-gradient(90deg,#000_85%,transparent)]">
                <div className="flex w-max gap-2.5" style={{ animation: "aiMarquee 26s linear infinite" }}>
                  {[...QUERIES, ...QUERIES].map((q, i) => (
                    <span key={i} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] text-slate-700 2xl:text-[14px]">
                      <Search className="h-3.5 w-3.5 text-slate-400" /> {q}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* expertise strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto mt-10 grid max-w-[1450px] gap-4 rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-[0_20px_44px_-32px_rgba(15,40,80,.5)] sm:grid-cols-2 lg:mt-14 lg:grid-cols-[auto_repeat(5,1fr)] lg:items-center lg:gap-0 2xl:px-7 2xl:py-6"
        >
          <p className="text-body font-semibold text-[#0b1b33] sm:col-span-full lg:col-span-1 lg:pr-8">{rich($t("LocalSeoHero__t49", "Your Success. Our Local SEO Expertise."))}</p>
          {EXPERTISE.map(({ Icon, label }, i) => (
            <div key={label} className={`group flex items-center gap-3 lg:px-4 ${i ? "lg:border-l lg:border-slate-100" : ""}`}>
              <Icon className="h-7 w-7 shrink-0 text-[#0f766e] transition-transform duration-300 group-hover:scale-110 2xl:h-8 2xl:w-8" strokeWidth={1.6} />
              <span className="text-[13.5px] font-medium leading-snug text-[#0b1b33] 2xl:text-[14.5px]">{label}</span>
            </div>
          ))}
        </motion.div>
      </Inner>
    </Panel>
  );
}

