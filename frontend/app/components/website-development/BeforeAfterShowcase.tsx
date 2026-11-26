"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { CartIcon, BriefcaseIcon, HeartIcon, HomeIcon, ChevronLeftIcon, ChevronRightIcon } from "../shared/icons";
import { BEFORE_AFTER_DEFAULTS, type BAContent, type BAIcon, type BAProject, type BAStat, type BAStatIcon } from "@/components/cms/before-after.data";

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
// Content comes from the CMS global section "before-after" (Admin -> Global -> Before / after showcase);
// until it is saved there the defaults in before-after.data.ts are shown.

const CATEGORY_ICONS: Record<BAIcon, (p: { className?: string }) => React.JSX.Element> = {
  cart: CartIcon,
  briefcase: BriefcaseIcon,
  heart: HeartIcon,
  graduation: GraduationCapIcon,
  restaurant: RestaurantIcon,
  home: HomeIcon,
};
const STAT_ICONS: Record<BAStatIcon, () => React.JSX.Element> = { trend: StatTrendIcon, users: StatUsersIcon, cart: StatCartIcon, gauge: StatGaugeIcon };

type Stat = BAStat & { Icon: () => React.JSX.Element };
type Project = Omit<BAProject, "stats"> & { id: string; categoryId: string; stats: Stat[] };

/** Flatten "categories -> projects" into the shapes the UI below works with (ids are positional). */
function normalise(c: Partial<BAContent> | undefined) {
  const cats = c?.categories?.length ? c.categories : BEFORE_AFTER_DEFAULTS.categories;
  const categories = cats.map((cat, ci) => ({ id: `c${ci}`, label: cat.label, Icon: CATEGORY_ICONS[cat.icon] ?? CartIcon }));
  const projects: Project[] = cats.flatMap((cat, ci) =>
    (cat.projects ?? []).map((p, pi) => ({
      ...p,
      id: `c${ci}-p${pi}`,
      categoryId: `c${ci}`,
      tag: p.tag || cat.label,
      thumb: p.thumb || p.after || p.before,
      stats: (p.stats ?? []).map((st) => ({ ...st, Icon: STAT_ICONS[st.icon] ?? StatTrendIcon })),
    })),
  );
  return {
    categories: categories.filter((cat) => projects.some((p) => p.categoryId === cat.id)),
    projects,
    resultsLabel: c?.resultsLabel ?? BEFORE_AFTER_DEFAULTS.resultsLabel,
    beforeBadge: c?.beforeBadge || BEFORE_AFTER_DEFAULTS.beforeBadge,
    afterBadge: c?.afterBadge || BEFORE_AFTER_DEFAULTS.afterBadge,
  };
}

/** Before/after projects: category pills -> before/after slider + results -> project carousel. */
export default function BeforeAfterShowcase({ content }: { content?: Partial<BAContent> }) {
  const { categories, projects, resultsLabel, beforeBadge, afterBadge } = useMemo(() => normalise(content), [content]);
  const [categoryId, setCategoryId] = useState<string>(categories[0]?.id ?? "");
  const [projectId, setProjectId] = useState<string>(projects[0]?.id ?? "");
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(
    () => projects.filter((p) => p.categoryId === categoryId),
    [categoryId, projects]
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
            beforeBadge={beforeBadge}
            afterBadge={afterBadge}
          />
        </div>

        {/* THE RESULTS (Right Panel) */}
        <div className="w-full xl:w-[340px] bg-[#fafafa] border-t xl:border-t-0 xl:border-l border-slate-100 p-8 flex flex-col justify-center relative z-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-bold tracking-[0.15em] text-[#132a43] uppercase">
              {selectedProject.name} {resultsLabel}</span>
          </div>
          <div className="h-px w-full bg-slate-200 mb-6" />

          <div className="flex flex-col gap-6">
            {selectedProject.stats.map((stat, si) => (
              <div key={si} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0b3b35] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                  <stat.Icon />
                </div>
                <div>
                  <h3 className="text-h5 font-black text-[#0b3b35] mb-1">{stat.value}</h3>
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
                  <p className="text-caption truncate font-bold" style={{ color: NAVY }}>
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
