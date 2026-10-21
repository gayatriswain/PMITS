"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { CartIcon, BriefcaseIcon, HeartIcon, HomeIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DARK = "#0b3b35";

/* ---------------- Category-only icons not already in icons.tsx ---------------- */

function GraduationCapIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function RestaurantIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2s2-.9 2-2V2M5 11v11M9 2v6a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1V2M11 2v20M19 2c-2.2 0-4 2.7-4 6s1.8 6 4 6M19 2v20" />
    </svg>
  );
}

/* ---------------- Stat icons (kept identical to the original hardcoded panel) ---------------- */

function StatTrendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
      <polyline points="16 7 22 7 22 13"></polyline>
    </svg>
  );
}
function StatUsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
}
function StatCartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );
}
function StatGaugeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}

/* ---------------- Data ---------------- */
// NOTE: only "/furnisher.png" (before) + "/lux.png" (after) exist as a real
// before/after pair today. Every project below reuses that pair as a
// placeholder so the category → carousel → slider flow is fully wired up.
// Swap `before`/`after` per project once real client screenshots are added.

type Stat = { value: string; label: string; sub: string; Icon: () => React.JSX.Element };

type Project = {
  id: string;
  name: string;
  categoryId: string;
  tag: string;
  thumb: string;
  before: string;
  after: string;
  stats: Stat[];
};

const categories = [
  { id: "ecommerce", label: "Ecommerce", Icon: CartIcon },
  { id: "corporate", label: "Corporate", Icon: BriefcaseIcon },
  { id: "healthcare", label: "Healthcare", Icon: HeartIcon },
  { id: "education", label: "Education", Icon: GraduationCapIcon },
  { id: "restaurant", label: "Restaurant", Icon: RestaurantIcon },
  { id: "realestate", label: "Real Estate", Icon: HomeIcon },
] as const;

const projects: Project[] = [
  // Ecommerce
  {
    id: "organic-harvest",
    name: "Organic Harvest",
    categoryId: "ecommerce",
    tag: "Ecommerce",
    thumb: "/lux.png",
    before: "/furnisher.png",
    after: "/lux.png",
    stats: [
      { value: "312%", label: "Increase in Organic Traffic", sub: "Within 6 Months", Icon: StatTrendIcon },
      { value: "280%", label: "More Enquiries", sub: "Than Previous Website", Icon: StatUsersIcon },
      { value: "3.6X", label: "Increase in Online Sales", sub: "Within 4 Months", Icon: StatCartIcon },
      { value: "95/100", label: "Performance Score", sub: "Google PageSpeed", Icon: StatGaugeIcon },
    ],
  },
  {
    id: "urban-thread",
    name: "Urban Thread",
    categoryId: "ecommerce",
    tag: "Ecommerce",
    thumb: "/furnisher.png",
    before: "/furnisher.png",
    after: "/lux.png",
    stats: [
      { value: "265%", label: "Increase in Organic Traffic", sub: "Within 5 Months", Icon: StatTrendIcon },
      { value: "190%", label: "More Enquiries", sub: "Than Previous Website", Icon: StatUsersIcon },
      { value: "2.9X", label: "Increase in Online Sales", sub: "Within 3 Months", Icon: StatCartIcon },
      { value: "92/100", label: "Performance Score", sub: "Google PageSpeed", Icon: StatGaugeIcon },
    ],
  },
  // Corporate
  {
    id: "skyline-corp",
    name: "Skyline Corp",
    categoryId: "corporate",
    tag: "Corporate",
    thumb: "/lux.png",
    before: "/furnisher.png",
    after: "/lux.png",
    stats: [
      { value: "220%", label: "Increase in Qualified Leads", sub: "Within 6 Months", Icon: StatTrendIcon },
      { value: "150%", label: "More Enquiries", sub: "Than Previous Website", Icon: StatUsersIcon },
      { value: "2.1X", label: "Increase in Client Wins", sub: "Within 6 Months", Icon: StatCartIcon },
      { value: "96/100", label: "Performance Score", sub: "Google PageSpeed", Icon: StatGaugeIcon },
    ],
  },
  {
    id: "nova-consulting",
    name: "Nova Consulting",
    categoryId: "corporate",
    tag: "Corporate",
    thumb: "/furnisher.png",
    before: "/furnisher.png",
    after: "/lux.png",
    stats: [
      { value: "198%", label: "Increase in Qualified Leads", sub: "Within 5 Months", Icon: StatTrendIcon },
      { value: "140%", label: "More Enquiries", sub: "Than Previous Website", Icon: StatUsersIcon },
      { value: "1.8X", label: "Increase in Client Wins", sub: "Within 6 Months", Icon: StatCartIcon },
      { value: "94/100", label: "Performance Score", sub: "Google PageSpeed", Icon: StatGaugeIcon },
    ],
  },
  // Healthcare
  {
    id: "vitalcare-clinic",
    name: "VitalCare Clinic",
    categoryId: "healthcare",
    tag: "Healthcare",
    thumb: "/lux.png",
    before: "/furnisher.png",
    after: "/lux.png",
    stats: [
      { value: "240%", label: "Increase in Appointment Bookings", sub: "Within 6 Months", Icon: StatTrendIcon },
      { value: "175%", label: "More Patient Enquiries", sub: "Than Previous Website", Icon: StatUsersIcon },
      { value: "2.4X", label: "Increase in New Patients", sub: "Within 4 Months", Icon: StatCartIcon },
      { value: "97/100", label: "Performance Score", sub: "Google PageSpeed", Icon: StatGaugeIcon },
    ],
  },
  {
    id: "wellness-hub",
    name: "Wellness Hub",
    categoryId: "healthcare",
    tag: "Healthcare",
    thumb: "/furnisher.png",
    before: "/furnisher.png",
    after: "/lux.png",
    stats: [
      { value: "210%", label: "Increase in Appointment Bookings", sub: "Within 5 Months", Icon: StatTrendIcon },
      { value: "160%", label: "More Patient Enquiries", sub: "Than Previous Website", Icon: StatUsersIcon },
      { value: "2.0X", label: "Increase in New Patients", sub: "Within 4 Months", Icon: StatCartIcon },
      { value: "93/100", label: "Performance Score", sub: "Google PageSpeed", Icon: StatGaugeIcon },
    ],
  },
  // Education
  {
    id: "brightpath-academy",
    name: "BrightPath Academy",
    categoryId: "education",
    tag: "Education",
    thumb: "/lux.png",
    before: "/furnisher.png",
    after: "/lux.png",
    stats: [
      { value: "255%", label: "Increase in Admission Enquiries", sub: "Within 6 Months", Icon: StatTrendIcon },
      { value: "185%", label: "More Parent Enquiries", sub: "Than Previous Website", Icon: StatUsersIcon },
      { value: "2.6X", label: "Increase in Applications", sub: "Within 5 Months", Icon: StatCartIcon },
      { value: "95/100", label: "Performance Score", sub: "Google PageSpeed", Icon: StatGaugeIcon },
    ],
  },
  {
    id: "eduspark-institute",
    name: "EduSpark Institute",
    categoryId: "education",
    tag: "Education",
    thumb: "/furnisher.png",
    before: "/furnisher.png",
    after: "/lux.png",
    stats: [
      { value: "205%", label: "Increase in Admission Enquiries", sub: "Within 5 Months", Icon: StatTrendIcon },
      { value: "165%", label: "More Parent Enquiries", sub: "Than Previous Website", Icon: StatUsersIcon },
      { value: "2.2X", label: "Increase in Applications", sub: "Within 5 Months", Icon: StatCartIcon },
      { value: "91/100", label: "Performance Score", sub: "Google PageSpeed", Icon: StatGaugeIcon },
    ],
  },
  // Restaurant
  {
    id: "spice-route",
    name: "Spice Route",
    categoryId: "restaurant",
    tag: "Restaurant",
    thumb: "/lux.png",
    before: "/furnisher.png",
    after: "/lux.png",
    stats: [
      { value: "230%", label: "Increase in Online Orders", sub: "Within 4 Months", Icon: StatTrendIcon },
      { value: "170%", label: "More Table Reservations", sub: "Than Previous Website", Icon: StatUsersIcon },
      { value: "2.3X", label: "Increase in Online Sales", sub: "Within 3 Months", Icon: StatCartIcon },
      { value: "94/100", label: "Performance Score", sub: "Google PageSpeed", Icon: StatGaugeIcon },
    ],
  },
  {
    id: "cafe-bloom",
    name: "Cafe Bloom",
    categoryId: "restaurant",
    tag: "Restaurant",
    thumb: "/furnisher.png",
    before: "/furnisher.png",
    after: "/lux.png",
    stats: [
      { value: "195%", label: "Increase in Online Orders", sub: "Within 4 Months", Icon: StatTrendIcon },
      { value: "150%", label: "More Table Reservations", sub: "Than Previous Website", Icon: StatUsersIcon },
      { value: "1.9X", label: "Increase in Online Sales", sub: "Within 3 Months", Icon: StatCartIcon },
      { value: "90/100", label: "Performance Score", sub: "Google PageSpeed", Icon: StatGaugeIcon },
    ],
  },
  // Real Estate
  {
    id: "prime-realty",
    name: "Prime Realty",
    categoryId: "realestate",
    tag: "Real Estate",
    thumb: "/lux.png",
    before: "/furnisher.png",
    after: "/lux.png",
    stats: [
      { value: "270%", label: "Increase in Property Enquiries", sub: "Within 6 Months", Icon: StatTrendIcon },
      { value: "200%", label: "More Site Visit Requests", sub: "Than Previous Website", Icon: StatUsersIcon },
      { value: "2.8X", label: "Increase in Qualified Leads", sub: "Within 5 Months", Icon: StatCartIcon },
      { value: "95/100", label: "Performance Score", sub: "Google PageSpeed", Icon: StatGaugeIcon },
    ],
  },
  {
    id: "urban-nest",
    name: "Urban Nest",
    categoryId: "realestate",
    tag: "Real Estate",
    thumb: "/furnisher.png",
    before: "/furnisher.png",
    after: "/lux.png",
    stats: [
      { value: "215%", label: "Increase in Property Enquiries", sub: "Within 5 Months", Icon: StatTrendIcon },
      { value: "180%", label: "More Site Visit Requests", sub: "Than Previous Website", Icon: StatUsersIcon },
      { value: "2.2X", label: "Increase in Qualified Leads", sub: "Within 5 Months", Icon: StatCartIcon },
      { value: "92/100", label: "Performance Score", sub: "Google PageSpeed", Icon: StatGaugeIcon },
    ],
  },
];

export default function BeforeAfterShowcase() {
  const [categoryId, setCategoryId] = useState<string>(categories[0].id);
  const [projectId, setProjectId] = useState<string>(projects[0].id);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(
    () => projects.filter((p) => p.categoryId === categoryId),
    [categoryId]
  );

  const selectedProject = useMemo(
    () => filteredProjects.find((p) => p.id === projectId) ?? filteredProjects[0],
    [filteredProjects, projectId]
  );

  const handleCategoryClick = (id: string) => {
    setCategoryId(id);
    const firstOfCategory = projects.find((p) => p.categoryId === id);
    if (firstOfCategory) setProjectId(firstOfCategory.id);
    carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const scrollCarousel = (direction: 1 | -1) => {
    const track = carouselRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 16 : 180;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  if (!selectedProject) return null;

  return (
    <div className="mt-16 w-full">
      {/* Category pills */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => {
          const active = cat.id === categoryId;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              aria-pressed={active}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                active
                  ? "border-transparent text-white shadow-[0_10px_25px_-10px_rgba(11,59,53,0.6)]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
              style={active ? { backgroundColor: DARK } : undefined}
            >
              <cat.Icon className="h-4 w-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Showcase card: slider + results panel */}
      <div className="w-full bg-white rounded-[24px] lg:rounded-[32px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] flex flex-col xl:flex-row border border-slate-100 relative z-20 overflow-hidden">
        {/* Before / after slider — remounts (key) on project change so its drag position resets */}
        <div className="relative w-full xl:flex-1">
          <BeforeAfterSlider
            key={selectedProject.id}
            beforeImage={selectedProject.before}
            afterImage={selectedProject.after}
            beforeBadge="Before"
            afterBadge="After"
          />
        </div>

        {/* THE RESULTS (Right Panel) */}
        <div className="w-full xl:w-[340px] bg-[#fafafa] border-t xl:border-t-0 xl:border-l border-slate-100 p-8 flex flex-col justify-center relative z-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-bold tracking-[0.15em] text-[#132a43] uppercase">
              {selectedProject.name} · The Results
            </span>
          </div>
          <div className="h-px w-full bg-slate-200 mb-6" />

          <div className="flex flex-col gap-6">
            {selectedProject.stats.map((stat) => (
              <div key={stat.label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0b3b35] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                  <stat.Icon />
                </div>
                <div>
                  <h3 className="text-[24px] font-black text-[#0b3b35] leading-none mb-1">{stat.value}</h3>
                  <p className="text-[11px] font-bold text-slate-800 mb-0.5 leading-snug">{stat.label}</p>
                  <p className="text-[9px] text-slate-500 font-medium">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project carousel — filtered by the active category */}
      <div className="relative mt-6">
        <div
          ref={carouselRef}
          className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-1"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {filteredProjects.map((p) => {
            const active = p.id === selectedProject.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setProjectId(p.id)}
                aria-pressed={active}
                className={`shrink-0 basis-[42%] overflow-hidden rounded-xl border-2 text-left transition-colors sm:basis-[28%] lg:basis-[19%] ${
                  active ? "" : "border-transparent"
                }`}
                style={{ scrollSnapAlign: "start", borderColor: active ? TEAL : "transparent" }}
              >
                <div className="relative h-20 w-full bg-slate-100 sm:h-24">
                  <Image src={p.thumb} alt={p.name} fill className="object-cover object-top" sizes="220px" />
                </div>
                <div className="bg-white px-3 py-2">
                  <p className="truncate text-xs font-bold" style={{ color: NAVY }}>
                    {p.name}
                  </p>
                  <p className="truncate text-[10px] text-slate-400">{p.tag}</p>
                </div>
              </button>
            );
          })}
        </div>

        {filteredProjects.length > 3 && (
          <>
            <button
              type="button"
              onClick={() => scrollCarousel(-1)}
              aria-label="Previous project"
              className="absolute left-0 top-1/2 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.3)] ring-1 ring-slate-100 transition-colors hover:bg-[#0d9488] hover:text-white lg:flex"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel(1)}
              aria-label="Next project"
              className="absolute right-0 top-1/2 flex h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.3)] ring-1 ring-slate-100 transition-colors hover:bg-[#0d9488] hover:text-white"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
