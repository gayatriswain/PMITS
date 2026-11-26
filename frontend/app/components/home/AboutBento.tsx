"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../shared/Container";
import { useCountUp } from "../shared/useCountUp";
import { BarChartUpIcon, ChevronLeftIcon, ChevronRightIcon, GaugeIcon, LinkedinIcon, TrendingUpIcon } from "../shared/icons";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const ACCENT = "#ff6321";

const RATING_EMOJIS = ["\u{1F620}", "\u{1F641}", "\u{1F610}", "\u{1F642}", "\u{1F604}"];
const RATING_LABELS__cms = ["Poor", "Unhappy", "Neutral", "Good", "Excellent"];

function CsatMeter({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  const RATING_LABELS = useCmsData("AboutBento__RATING_LABELS", RATING_LABELS__cms);
  return (
    <div className="mt-5 flex items-center justify-center gap-2">
      {RATING_EMOJIS.map((emoji, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={RATING_LABELS[i]}
          aria-pressed={i === active}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed text-sm transition-all duration-300"
          style={{
            borderColor: i === active ? ACCENT : "#e2e8f0",
            backgroundColor: i === active ? "rgba(255,99,33,0.12)" : "transparent",
            opacity: i === active ? 1 : 0.4,
            transform: i === active ? "scale(1.15)" : "scale(1)",
          }}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}

function CsatCard({ delay }: { delay: number }) {
  const $t = useCmsText();
  const RATING_LABELS = useCmsData("AboutBento__RATING_LABELS", RATING_LABELS__cms);
  const [active, setActive] = useState(2);

  return (
    <div
      className="animate-fade-up flex flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-[0_10px_30px_-15px_rgba(15,23,42,0.12)] ring-1 ring-slate-100"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-base font-bold" style={{ color: NAVY }}>
        {$t("AboutBento__t1", "CSAT")}</h3>
      <p className="text-caption mt-1.5 text-slate-500">
        {rich($t("AboutBento__t2", "Measures and improves client satisfaction."))}</p>
      <p className="text-small mt-4 font-bold uppercase tracking-wide" style={{ color: ACCENT }}>
        {RATING_LABELS[active]}
      </p>
      <CsatMeter active={active} onSelect={setActive} />
    </div>
  );
}

const strategySlides__cms = [
  {
    image: "/project1.webp",
    icon: BarChartUpIcon,
    heading: "Strategy that matters",
    text: "Thoughtful direction aligned with real business goals.",
  },
  {
    image: "/project4.webp",
    icon: TrendingUpIcon,
    heading: "Built for long-term growth",
    text: "Your brand remains consistent and powerful as you expand.",
  },
  {
    image: "/project6.webp",
    icon: GaugeIcon,
    heading: "Designed to convert",
    text: "Every layout choice is built to turn visitors into customers.",
  },
];

function StrategyCard({ delay }: { delay: number }) {
  const strategySlides = useCmsData("AboutBento__strategySlides", strategySlides__cms);
  const [index, setIndex] = useState(0);
  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + strategySlides.length) % strategySlides.length);

  const slide = strategySlides[index];
  const Icon = slide.icon;

  return (
    <div
      className="animate-fade-up grid grid-cols-1 overflow-hidden rounded-lg bg-white shadow-[0_10px_30px_-15px_rgba(15,23,42,0.12)] ring-1 ring-slate-100 lg:grid-cols-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div key={`image-${index}`} className="animate-slide-fade relative h-48 w-full overflow-hidden lg:h-full lg:min-h-[220px]">
        <Image
          src={slide.image}
          alt={slide.heading}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 90vw"
        />
      </div>
      <div className="flex flex-col justify-between p-6">
        <div className="flex items-center justify-between">
          <span
            key={`icon-${index}`}
            className="animate-slide-fade flex h-9 w-9 items-center justify-center rounded-lg text-white"
            style={{ backgroundColor: NAVY }}
          >
            <Icon className="h-4 w-4" />
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
        <div key={`text-${index}`} className="animate-slide-fade mt-6 lg:mt-0">
          <h3 className="text-h6 font-bold" style={{ color: NAVY }}>
            {slide.heading}
          </h3>
          <p className="text-small mt-2 text-slate-500">{slide.text}</p>
        </div>
      </div>
    </div>
  );
}

const collaborators__cms = [
  { name: "Grace Thompson", initials: "GT", gradient: "linear-gradient(135deg, #0d9488, #134e4a)", rotate: "-18deg" },
  { name: "Ava Morgan", initials: "AM", gradient: "linear-gradient(135deg, #fb923c, #9a3412)", rotate: "-8deg" },
  { name: "Ethan Cole", initials: "EC", gradient: "linear-gradient(135deg, #132a43, #0b3b35)", rotate: "6deg" },
  { name: "Maya Clarke", initials: "MC", gradient: "linear-gradient(135deg, #64748b, #334155)", rotate: "14deg" },
];

function DiscussCard({ delay }: { delay: number }) {
  const $t = useCmsText();
  const collaborators = useCmsData("AboutBento__collaborators", collaborators__cms);
  return (
    <div
      className="animate-fade-up relative flex min-h-[280px] flex-col overflow-hidden rounded-lg p-6"
      style={{
        animationDelay: `${delay}ms`,
        background: "linear-gradient(135deg, #9bb08a 0%, #c9a97d 55%, #e0925f 100%)",
      }}
    >
      <div className="text-center">
        <h3 className="text-h6 font-bold text-white">{$t("AboutBento__t3", "Discuss your project")}</h3>
        <Link
          href={$t("AboutBento__t4", "/contact")}
          className="mt-4 inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-300 hover:scale-105"
          style={{ backgroundColor: NAVY }}
        >
          {$t("AboutBento__t5", "Schedule a call - 15 mins free")}</Link>
        <p className="text-small mt-3 font-semibold" style={{ color: NAVY }}>
          {rich($t("AboutBento__t6", "No pressure, just a thoughtful chat."))}</p>
      </div>

      <div className="absolute bottom-0 left-1/2 flex translate-x-[-50%] translate-y-8 items-end justify-center -space-x-4">
        {collaborators.map((c) => (
          <div key={c.name} className="group relative shrink-0 hover:z-20">
            <span
              className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide opacity-0 shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100"
              style={{ color: NAVY }}
            >
              {c.name}
            </span>

            <div
              className="relative flex h-24 w-16 items-center justify-center overflow-hidden rounded-md border-4 border-white text-sm font-bold text-white shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110 group-hover:rotate-0"
              style={{ backgroundImage: c.gradient, transform: `rotate(${c.rotate})` }}
            >
              <span className="transition-opacity duration-300 group-hover:opacity-0">{c.initials}</span>
              <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <LinkedinIcon />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CircularProgress({
  target,
  label,
  color = ACCENT,
  trackColor = "rgba(255,99,33,0.15)",
  size = 84,
}: {
  target: number;
  label: string;
  color?: string;
  trackColor?: string;
  size?: number;
}) {
  const value = useCountUp(target, 1400);
  const r = (size - 10) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth="6" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div
          className={`absolute inset-0 flex items-center justify-center font-bold ${size >= 90 ? "text-base" : "text-sm"}`}
          style={{ color: NAVY }}
        >
          {value}%
        </div>
      </div>
      <p className="text-caption uppercase tracking-wide text-slate-400">{label}</p>
    </div>
  );
}

function SeoStatsCard({ delay }: { delay: number }) {
  const $t = useCmsText();
  return (
    <div
      className="animate-fade-up rounded-lg bg-white p-6 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.12)] ring-1 ring-slate-100"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-lg font-bold" style={{ color: NAVY }}>
        {$t("AboutBento__t7", "SEO ready & fast performance")}</h3>
      <p className="text-small mt-1.5 text-slate-500">
        {rich($t("AboutBento__t8", "Optimized for search rankings and blazing-fast speed."))}</p>
      <div className="mt-8 flex items-end justify-center gap-6 sm:justify-start">
        <CircularProgress target={99} label={$t("AboutBento__t9", "Performance")} color={NAVY} trackColor="rgba(19,42,67,0.1)" size={76} />
        <CircularProgress target={100} label={$t("AboutBento__t10", "SEO")} color={NAVY} trackColor="rgba(19,42,67,0.1)" size={104} />
        <CircularProgress target={98} label={$t("AboutBento__t11", "Accessibility")} color={NAVY} trackColor="rgba(19,42,67,0.1)" size={76} />
      </div>
    </div>
  );
}

function AgencyRebuildCard({ delay }: { delay: number }) {
  const $t = useCmsText();
  return (
    <Link
      href={$t("AboutBento__t12", "/portfolio")}
      className="animate-fade-up group flex h-56 flex-col rounded-lg bg-white p-5 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.12)] ring-1 ring-slate-100"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div>
        <h3 className="text-base font-bold leading-snug" style={{ color: NAVY }}>
          {$t("AboutBento__t13", "Agency website rebuild")}</h3>
        <p className="text-small mt-1.5 text-slate-500">{rich($t("AboutBento__t14", "120% more inquiries"))}</p>
      </div>
      <div className="relative mt-3 flex-1 overflow-hidden rounded-lg bg-slate-50">
        <Image
          src={$t("AboutBento__t15", "/image1.webp")}
          alt={$t("AboutBento__t16", "Agency website rebuild case study")}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(min-width: 1024px) 33vw, 90vw"
        />
      </div>
    </Link>
  );
}

const industries__cms = [
  "Healthcare & Wellness",
  "Finance & Fintech",
  "SaaS & Tech",
  "E-Commerce & D2C",
  "Architecture & Interiors",
  "Education & Learning",
  "Hospitality & Events",
  "Lifestyle & Luxury",
];

function IndustryRow({
  name,
  containerRef,
}: {
  name: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const root = containerRef.current;
    const el = ref.current;
    if (!root || !el) return;

    // A near-zero-height band at the container's vertical center: an item is
    // "active" only while it's passing through the middle of the ticker.
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      root,
      rootMargin: "-48% 0px -48% 0px",
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  const color = active ? NAVY : TEAL;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2.5 py-2.5 transition-all duration-300"
      style={{ opacity: active ? 1 : 0.4, transform: `scale(${active ? 1 : 0.92})` }}
    >
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
        <p className={`text-caption whitespace-nowrap ${active ? "font-bold" : "font-semibold"}`} style={{ color }}>
          {name}
        </p>
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      </div>
    </div>
  );
}

function IndustriesTicker({ delay }: { delay: number }) {
  const $t = useCmsText();
  const industries = useCmsData("AboutBento__industries", industries__cms);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const items = [...industries, ...industries];

  return (
    <div
      className="animate-fade-up flex h-56 flex-col overflow-hidden rounded-lg bg-white p-5 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.12)] ring-1 ring-slate-100"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-center text-lg font-bold" style={{ color: NAVY }}>
        {$t("AboutBento__t17", "Industries we work with")}</h3>
      <div
        ref={containerRef}
        className="relative mt-3 flex-1 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="animate-ticker flex flex-col">
          {items.map((name, i) => (
            <IndustryRow key={i} name={name} containerRef={containerRef} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamPortraitCard({ delay }: { delay: number }) {
  const $t = useCmsText();
  return (
    <div
      className="animate-fade-up relative flex h-56 flex-col justify-end overflow-hidden rounded-lg p-5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <video
        src={$t("AboutBento__t18", "/cGuKSoUq2iETRc96nhUQGbcBc.mp4")}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <p className="text-body relative font-bold text-white">{rich($t("AboutBento__t19", "Rohan Desai"))}</p>
      <p className="text-caption relative font-semibold uppercase tracking-wide text-white/70">{rich($t("AboutBento__t20", "CEO - ProManage"))}</p>
    </div>
  );
}

export default function AboutBento() {
  const $t = useCmsText();
  return (
    <section className="bg-slate-50 py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide"
            style={{ borderColor: "rgba(13,148,136,0.3)", color: TEAL, backgroundColor: "#e6f6f4" }}
          >
            {$t("AboutBento__t21", "WHY PROMANAGE")}</span>
          <h2 className="text-h2 mt-4 font-bold" style={{ color: NAVY }}>
            {$t("AboutBento__t22", "What Working With Us ")}<span style={{ color: TEAL }}>{$t("AboutBento__t23", "Feels Like.")}</span>
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-6xl rounded-3xl border border-slate-200 bg-slate-100 p-3 sm:p-5">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_2fr]">
              <CsatCard delay={0} />
              <StrategyCard delay={90} />
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <DiscussCard delay={180} />
              <SeoStatsCard delay={270} />
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <AgencyRebuildCard delay={360} />
              <IndustriesTicker delay={450} />
              <TeamPortraitCard delay={540} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
