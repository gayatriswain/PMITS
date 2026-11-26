"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import {
  Palette,
  Code2,
  Box,
  Megaphone,
  Settings,
  Headphones,
  Briefcase,
  MapPin,
  Home,
  ArrowRight,
  Send,
  Users,
  X,
  CheckCircle2,
  Wallet,
  CalendarClock,
} from "lucide-react";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";
import { applyForJob, type CmsJob } from "./careerJobs";

export type { CmsJob };

const caveat = { className: "font-caveat" }; // global font from app/layout.tsx

const INK = "#0a1f2c";
const TEAL = "#00a8b5";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const OPEN_POSITIONS__cms = [
  {
    id: "ui-ux",
    icon: Palette,
    category: "DESIGN",
    title: "UI/UX Designer",
    experience: "2 - 4 Yrs",
    location: "Gurugram",
    workType: "Hybrid",
  },
  {
    id: "frontend",
    icon: Code2,
    category: "DEVELOPMENT",
    title: "Frontend Developer",
    experience: "2 - 5 Yrs",
    location: "Gurugram",
    workType: "Hybrid",
  },
  {
    id: "backend",
    icon: Box,
    category: "DEVELOPMENT",
    title: "Backend Developer",
    experience: "2 - 5 Yrs",
    location: "Gurugram",
    workType: "Hybrid",
  },
  {
    id: "digital-marketing",
    icon: Megaphone,
    category: "MARKETING",
    title: "Digital Marketing Executive",
    experience: "1 - 3 Yrs",
    location: "Gurugram",
    workType: "Hybrid",
  },
  {
    id: "project-manager",
    icon: Settings,
    category: "OPERATIONS",
    title: "Project Manager",
    experience: "3 - 6 Yrs",
    location: "Gurugram",
    workType: "Hybrid",
  },
  {
    id: "tech-support",
    icon: Headphones,
    category: "SUPPORT",
    title: "Technical Support Engineer",
    experience: "1 - 4 Yrs",
    location: "Gurugram",
    workType: "Hybrid",
  },
];

/** How many cards show before "View More Openings". */
const VISIBLE = 6;

type Role = (typeof OPEN_POSITIONS__cms)[number] & {
  careerId?: string;
  salaryRange?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  deadline?: string;
};

const DEPT_ICONS: { match: RegExp; icon: (typeof OPEN_POSITIONS__cms)[number]["icon"] }[] = [
  { match: /design|creative|ui|ux/i, icon: Palette },
  { match: /front|web|develop|engineer|software/i, icon: Code2 },
  { match: /back|server|devops|data/i, icon: Box },
  { match: /market|seo|sales|growth|content/i, icon: Megaphone },
  { match: /support|service|help/i, icon: Headphones },
  { match: /operation|manage|project|hr|admin/i, icon: Settings },
];
const WORK_TYPES: Record<string, string> = { "full-time": "Full-time", "part-time": "Part-time", contract: "Contract", internship: "Internship", remote: "Remote", hybrid: "Hybrid", onsite: "On-site" };

export default function CareerOpenPositions({ jobs }: { jobs?: CmsJob[] }) {
  const $t = useCmsText();
  const sectionPositions = useCmsData("CareerOpenPositions__OPEN_POSITIONS", OPEN_POSITIONS__cms);
  // Jobs managed in the CMS "Careers" module take priority; otherwise the section's own list.
  const OPEN_POSITIONS: Role[] = jobs?.length
    ? jobs.map((j) => {
        const text = `${j.department ?? ""} ${j.title}`;
        return {
          id: j.slug,
          icon: (DEPT_ICONS.find((d) => d.match.test(text)) ?? DEPT_ICONS[1]).icon,
          category: (j.department ?? "").toUpperCase(),
          title: j.title,
          experience: j.experience ?? "",
          location: j.location ?? "",
          workType: WORK_TYPES[j.employmentType ?? ""] ?? j.employmentType ?? "",
          careerId: j._id,
          salaryRange: j.salaryRange,
          description: j.description,
          responsibilities: j.responsibilities,
          requirements: j.requirements,
          benefits: j.benefits,
          deadline: j.deadline,
        };
      })
    : sectionPositions;
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showAll, setShowAll] = useState(false);
  const closeRole = useCallback(() => setSelectedRole(null), []);
  const visibleRoles = showAll ? OPEN_POSITIONS : OPEN_POSITIONS.slice(0, VISIBLE);

  return (
    <section id="open-positions" className="relative w-full overflow-hidden py-16 lg:py-24 bg-[#fbfdfd]">
      {/* Background Graphic elements matching design */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Subtle dot grid in bottom corners */}
        <div
          className="absolute left-6 bottom-10 hidden h-32 w-32 opacity-40 lg:block"
          style={{
            backgroundImage: "radial-gradient(#00a8b5 1.4px, transparent 1.6px)",
            backgroundSize: "12px 12px",
          }}
          aria-hidden
        />
        <div
          className="absolute right-6 top-10 hidden h-32 w-32 opacity-40 lg:block"
          style={{
            backgroundImage: "radial-gradient(#00a8b5 1.4px, transparent 1.6px)",
            backgroundSize: "12px 12px",
          }}
          aria-hidden
        />

        {/* Top-right wave decorative gradient */}
        <div className="absolute -right-20 -top-20 w-[420px] h-[320px] rounded-full bg-gradient-to-b from-cyan-100/40 via-teal-50/20 to-transparent blur-3xl pointer-events-none" />

        {/* Top-left flying paper plane with dashed trailing line */}
        <svg
          className="absolute left-4 top-10 w-48 h-28 hidden md:block pointer-events-none"
          viewBox="0 0 200 100"
          fill="none"
          aria-hidden
        >
          <path
            d="M 10 90 C 50 85, 95 30, 160 20"
            stroke="#00a8b5"
            strokeWidth="1.6"
            strokeDasharray="4 4"
            opacity="0.6"
          />
          {/* Paper airplane icon at the end of the line */}
          <g transform="translate(160, 12) rotate(15)">
            <path
              d="M 0 0 L 22 10 L 10 22 L 7 13 L 0 0 Z M 7 13 L 22 10"
              fill="#00a8b5"
              stroke="#00a8b5"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>

      <Container className="relative z-10 max-w-[1240px]">
        {/* Section Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center mb-12 lg:mb-14"
        >
          {/* Subtitle / Tag */}
          <motion.div variants={fadeUp} className="inline-flex flex-col items-center">
            <span
              className="text-[13px] font-bold tracking-[0.22em] uppercase flex items-center gap-1.5"
              style={{ color: TEAL }}
            >
              <span className="text-[9px]">•</span>
              {$t("CareerOpenPositions__t1", "OPEN POSITIONS")}<span className="text-[9px]">•</span>
            </span>
            <span
              className="mt-1.5 h-[2.5px] w-12 rounded-full"
              style={{ backgroundColor: TEAL }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-h2 mt-4 font-extrabold tracking-tight relative inline-block"
            style={{ color: INK }}
          >
            {$t("CareerOpenPositions__t2", "Find Your Next")}{" "}
            <span className="relative inline-block">
              <span
                className={`${caveat.className} inline-block text-[44px] sm:text-[54px] lg:text-[62px] font-bold tracking-normal`}
                style={{ color: TEAL }}
              >
                {$t("CareerOpenPositions__t3", "Opportunity")}</span>
              {/* Hand-drawn sparkle accents on top-right of Opportunity */}
              <svg
                className="absolute -top-1 -right-6 w-6 h-6 text-[#00a8b5] pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M12 2 L12 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M19 5 L15.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 12 L17 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-body mt-3.5 text-slate-600 max-w-xl mx-auto"
          >
            {rich($t("CareerOpenPositions__t4", "Explore roles where your skills can"))}{" "}
            <strong className="font-bold" style={{ color: TEAL }}>
              {$t("CareerOpenPositions__t5", "create impact")}</strong>
            <br className="hidden sm:inline" />
            {rich($t("CareerOpenPositions__t6", "and your ideas can"))}{" "}
            <strong className="font-bold" style={{ color: TEAL }}>
              {$t("CareerOpenPositions__t7", "shape the future")}</strong>
            .
          </motion.p>
        </motion.div>

        {/* ========================================================
            6 JOB CARDS GRID
            ======================================================== */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5 mb-8"
        >
          {visibleRoles.map((role, i) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.id}
                variants={fadeUp}
                // cards revealed by "View More" mount after the grid's entrance animation, so they animate in on their own
                {...(i >= VISIBLE ? { initial: "hidden", animate: "show" } : {})}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-2xl p-5 shadow-[0_8px_25px_-8px_rgba(10,31,44,0.06)] border border-slate-100 hover:shadow-[0_16px_35px_-8px_rgba(0,168,181,0.18)] hover:border-teal-200 transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Solid teal bottom accent border line */}
                <div className="absolute inset-x-0 bottom-0 h-[4px] bg-[#00a8b5] transition-all duration-300 group-hover:h-[5px]" />

                <div>
                  {/* Top Icon Badge */}
                  <div className="w-11 h-11 rounded-full border border-teal-200/80 bg-teal-50/50 flex items-center justify-center text-[#00a8b5] mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#00a8b5] group-hover:text-white">
                    <Icon size={20} strokeWidth={2} />
                  </div>

                  {/* Category Pill Tag */}
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal-50/80 text-[#008f9c] text-[10px] font-bold tracking-wider uppercase mb-2">
                    {role.category}
                  </span>

                  {/* Job Title */}
                  <h3 className="text-[16px] font-bold text-[#0a1f2c] leading-tight mb-3 min-h-[40px] flex items-center group-hover:text-[#00a8b5] transition-colors">
                    {role.title}
                  </h3>

                  {/* Small teal accent dash */}
                  <div className="w-5 h-[2px] rounded-full bg-[#00a8b5] mb-3.5" />

                  {/* Metadata List */}
                  <div className="space-y-1.5 mb-5 text-[12px] text-slate-500">
                    <div className="flex items-center gap-2">
                      <Briefcase size={13} className="text-[#00a8b5] shrink-0" />
                      <span>{role.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-[#00a8b5] shrink-0" />
                      <span>{role.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home size={13} className="text-[#00a8b5] shrink-0" />
                      <span>{role.workType}</span>
                    </div>
                  </div>
                </div>

                {/* whole card opens the role popup */}
                <button
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a8b5]"
                  aria-label={`${$t("CareerOpenPositions__t8", "View Role")}: ${role.title}`}
                />

                {/* Card Footer: View Role */}
                <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#0a1f2c] group-hover:text-[#00a8b5] transition-colors">
                    {$t("CareerOpenPositions__t8", "View Role")}</span>
                  <div className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-[#00a8b5] group-hover:text-white group-hover:border-[#00a8b5] transition-all">
                    <ArrowRight size={14} strokeWidth={2.2} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ========================================================
            "View More Openings" Pill Button
            ======================================================== */}
        {/* only when there are more openings than fit in one row */}
        {OPEN_POSITIONS.length > VISIBLE ? (
          <div className="flex justify-center mb-12 lg:mb-14">
            <motion.button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3.5 px-6 py-2.5 rounded-full bg-white shadow-[0_8px_20px_-6px_rgba(10,31,44,0.08)] border border-slate-150 hover:border-teal-300 hover:shadow-[0_12px_28px_-6px_rgba(0,168,181,0.2)] transition-all cursor-pointer"
            >
              <span className="text-[14px] font-bold text-[#0a1f2c] group-hover:text-[#00a8b5] transition-colors">
                {showAll
                  ? $t("CareerOpenPositions__t16", "Show Fewer Openings")
                  : `${$t("CareerOpenPositions__t9", "View More Openings")} (${OPEN_POSITIONS.length - VISIBLE})`}
              </span>
              <span className={`w-6 h-6 rounded-full bg-[#00a8b5] text-white flex items-center justify-center transition-transform ${showAll ? "-rotate-90" : "rotate-90"}`}>
                <ArrowRight size={13} strokeWidth={2.4} />
              </span>
            </motion.button>
          </div>
        ) : (
          <div className="mb-4 lg:mb-6" />
        )}

        {/* ========================================================
            BOTTOM BANNER: "Don't see the right role? Let's build it together."
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#06242f] via-[#073646] to-[#04616d] p-6 sm:p-8 lg:p-10 shadow-[0_24px_50px_-15px_rgba(4,97,109,0.35)] border border-teal-500/20 overflow-hidden text-white"
        >
          {/* Subtle background glow */}
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
          <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Icon + Headline */}
            <div className="lg:col-span-5 flex items-start gap-4 sm:gap-5">
              {/* Circular Users Icon Badge */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-[#00a8b5] flex items-center justify-center shrink-0 shadow-lg mt-1">
                <Users size={28} strokeWidth={2.2} />
              </div>

              <div>
                {/* Decorative sparkle lines */}
                <div className="relative">
                  <svg
                    className="absolute -top-3.5 -left-1 w-5 h-5 text-cyan-300 pointer-events-none"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path d="M4 10 L0 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M6 5 L3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M10 4 L10 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <h3 className="text-h5 font-bold tracking-tight text-white">
                    {$t("CareerOpenPositions__t10", "Don't see the right role?")}</h3>
                </div>

                <div
                  className={`${caveat.className} text-[28px] sm:text-[34px] font-bold leading-none mt-1 tracking-normal`}
                  style={{ color: "#38bdf8" }}
                >
                  {$t("CareerOpenPositions__t11", "Let's build it together.")}</div>

                <p className="text-small text-slate-300/90 mt-2.5 max-w-[320px]">
                  {rich($t("CareerOpenPositions__t12", "We're always looking for curious minds who love solving problems and creating impact."))}</p>
              </div>
            </div>

            {/* Middle Divider */}
            <div className="hidden lg:block lg:col-span-1 justify-self-center">
              <div className="w-px h-24 border-r border-dashed border-teal-300/30" />
            </div>

            {/* Middle-Right Column: Send us your profile */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <h4 className="text-h6 font-bold text-white tracking-tight">
                {$t("CareerOpenPositions__t13", "Send us your profile")}</h4>
              <p className="text-small text-slate-300/90 mt-1.5 mb-4 max-w-[260px]">
                {rich($t("CareerOpenPositions__t14", "Share your details and we'll reach out when the perfect opportunity comes up."))}</p>

              <motion.a
                href="#send-profile"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white text-[#0a1f2c] font-bold text-[13px] shadow-md hover:bg-slate-50 transition-all w-fit cursor-pointer"
              >
                <span>{$t("CareerOpenPositions__t15", "Send Your Profile")}</span>
                <span className="w-6 h-6 rounded-full bg-[#00a8b5] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={13} strokeWidth={2.4} />
                </span>
              </motion.a>
            </div>

            {/* Far-Right Column: Envelope & Paper Airplane Vector Illustration */}
            <div className="lg:col-span-3 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-[220px] h-[165px] flex items-end justify-center group cursor-pointer select-none">
                {/* Cyan looping dashed flight trail & Paper Airplane */}
                <svg
                  className="absolute -top-3 right-0 w-36 h-28 pointer-events-none overflow-visible"
                  viewBox="0 0 140 100"
                  fill="none"
                >
                  <path
                    d="M 15 85 C 40 85, 75 90, 85 68 C 96 42, 65 28, 75 14 C 80 4, 110 5, 126 14"
                    stroke="#38bdf8"
                    strokeWidth="1.6"
                    strokeDasharray="3 3"
                    opacity="0.85"
                  />
                  {/* Paper Airplane */}
                  <g transform="translate(120, 5) rotate(22) scale(0.9)">
                    <polygon points="0,0 26,11 11,26 7,14" fill="#ffffff" />
                    <polygon points="7,14 26,11 11,26" fill="#cbd5e1" />
                    <polygon points="0,0 26,11 7,14" fill="#f8fafc" />
                  </g>
                </svg>

                {/* CV / Resume card emerging from envelope */}
                <div className="absolute top-1.5 w-[142px] h-[110px] rounded-t-xl bg-white shadow-md p-3 flex flex-col gap-2 transition-transform duration-500 group-hover:-translate-y-3.5 z-0 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-cyan-100/90 flex items-center justify-center text-[#00a8b5]">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="w-14 h-1.5 rounded-full bg-slate-300" />
                      <div className="w-8 h-1 rounded-full bg-slate-200" />
                    </div>
                  </div>
                  <div className="w-full h-1 rounded-full bg-slate-100 mt-1" />
                  <div className="w-4/5 h-1 rounded-full bg-slate-100" />
                  <div className="w-3/5 h-1 rounded-full bg-slate-100" />
                </div>

                {/* Envelope Body */}
                <div className="relative z-10 w-[172px] h-[98px] rounded-b-2xl bg-gradient-to-b from-white to-[#f8fafc] shadow-[0_16px_30px_rgba(0,0,0,0.25)] border-t border-slate-200 flex items-center justify-center">
                  {/* Flap Folds */}
                  <div className="absolute inset-x-0 top-0 h-0 border-t-[42px] border-t-slate-150/60 border-x-[86px] border-x-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-0 border-b-[58px] border-b-white border-x-[86px] border-x-transparent pointer-events-none rounded-b-2xl" />

                  {/* ProManage "P" Logo */}
                  <div className="relative z-20 flex items-center justify-center mt-2">
                    <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center shadow-inner">
                      <svg className="w-5 h-5 text-[#00a8b5]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 3h8a5 5 0 0 1 5 5c0 2.76-2.24 5-5 5H9v8H6V3zm3 3v4h5a2 2 0 1 0 0-4H9z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>

      <AnimatePresence>
        {selectedRole && <RoleDialog role={selectedRole} onClose={closeRole} />}
      </AnimatePresence>
    </section>
  );
}

/** Popup with everything filled in for the job in the CMS, and "Apply" that preselects it in the form below. */
function RoleDialog({ role, onClose }: { role: Role; onClose: () => void }) {
  const $t = useCmsText();
  const closeRef = useRef<HTMLButtonElement>(null);
  const Icon = role.icon;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const deadline = role.deadline ? new Date(role.deadline) : null;
  const facts = [
    { icon: Briefcase, label: $t("CareerOpenPositions__t17", "Experience"), value: role.experience },
    { icon: MapPin, label: $t("CareerOpenPositions__t18", "Location"), value: role.location },
    { icon: Home, label: $t("CareerOpenPositions__t19", "Work type"), value: role.workType },
    { icon: Wallet, label: $t("CareerOpenPositions__t20", "Salary"), value: role.salaryRange },
    {
      icon: CalendarClock,
      label: $t("CareerOpenPositions__t21", "Apply by"),
      value: deadline && !isNaN(+deadline) ? deadline.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "",
    },
  ].filter((f) => f.value);
  const lists = [
    { title: $t("CareerOpenPositions__t22", "What you'll do"), items: role.responsibilities },
    { title: $t("CareerOpenPositions__t23", "What we're looking for"), items: role.requirements },
    { title: $t("CareerOpenPositions__t24", "What you'll get"), items: role.benefits },
  ].filter((l) => l.items?.length);
  const hasDetails = !!role.description?.trim() || lists.length > 0;

  const apply = () => {
    onClose();
    applyForJob({ id: role.id, title: role.title, careerId: role.careerId });
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0a1f2c]/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="role-dialog-title"
        className="relative flex max-h-[92vh] w-full max-w-[720px] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="relative bg-gradient-to-r from-[#06242f] via-[#073646] to-[#04616d] px-6 pb-6 pt-7 text-white sm:px-8">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={$t("CareerOpenPositions__t25", "Close")}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            <X size={18} />
          </button>
          <div className="flex items-start gap-4 pr-10">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[#00a8b5]">
              <Icon size={22} />
            </span>
            <div>
              {role.category && (
                <span className="inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-100">
                  {role.category}
                </span>
              )}
              <h3 id="role-dialog-title" className="mt-1.5 text-[22px] font-extrabold leading-tight sm:text-[26px]">
                {role.title}
              </h3>
            </div>
          </div>
          {facts.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {facts.map((f) => (
                <span key={f.label} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[12px]">
                  <f.icon size={13} className="text-cyan-300" />
                  <span className="text-slate-300">{f.label}:</span>
                  <b className="font-semibold">{f.value}</b>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          {role.description?.trim() && (
            // sanitized by the CMS when the job is saved (allow-listed tags and attributes)
            <div className="cms-prose text-[14px] text-slate-600" dangerouslySetInnerHTML={{ __html: role.description }} />
          )}
          {lists.map((l) => (
            <div key={l.title} className="mt-6 first:mt-0">
              <h4 className="text-[15px] font-bold text-[#0a1f2c]">{l.title}</h4>
              <ul className="mt-3 space-y-2">
                {l.items!.map((it, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-slate-600">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#00a8b5]" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {!hasDetails && (
            <p className="rounded-xl bg-teal-50/60 px-4 py-3 text-[14px] text-slate-600">
              {rich($t("CareerOpenPositions__t26", "Interested in this role? Send us your profile and our team will share the full role details with you."))}
            </p>
          )}
        </div>

        {/* footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-8">
          <button type="button" onClick={onClose} className="rounded-full px-5 py-2.5 text-[14px] font-semibold text-slate-600 hover:text-[#0a1f2c]">
            {$t("CareerOpenPositions__t27", "Maybe later")}
          </button>
          <button
            type="button"
            onClick={apply}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0a1f2c] px-6 py-3 text-[14px] font-bold text-white shadow-lg transition-colors hover:bg-[#073646]"
          >
            <Send size={15} />
            {$t("CareerOpenPositions__t28", "Apply for this role")}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
