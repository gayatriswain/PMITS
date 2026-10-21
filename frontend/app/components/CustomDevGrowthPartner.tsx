"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "./Container";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type IconProps = { size?: number; color?: string };
const base = (size: number, color: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const StarIcon = ({ size = 12, color = TEAL }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2.5 14.9 8.6 21.5 9.3 16.6 13.8 18 20.4 12 17 6 20.4 7.4 13.8 2.5 9.3 9.1 8.6Z" />
  </svg>
);
const TargetIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill={color} stroke="none" />
  </svg>
);
const PuzzleIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M9 4h3a1.5 1.5 0 0 1 1.3 2.3A1.5 1.5 0 0 0 14.6 9H18a1 1 0 0 1 1 1v3.4a1.5 1.5 0 0 0-2.3 1.3A1.5 1.5 0 0 0 18 18H20M9 4H6a1 1 0 0 0-1 1v3M9 4a1.5 1.5 0 0 1 0 3M5 8a1.5 1.5 0 0 0 0 3M5 11v7a1 1 0 0 0 1 1h3M16.3 16.3A1.5 1.5 0 0 1 18 18" />
  </svg>
);
const CollabIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  </svg>
);
const ChartIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 19 10 12 14 15 20 7" />
    <path d="M14 7h6v6" />
  </svg>
);
const HeadsetIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M3 13a9 9 0 0 1 18 0" />
    <rect x="3" y="13" width="4" height="7" rx="1.5" />
    <rect x="17" y="13" width="4" height="7" rx="1.5" />
    <path d="M19 20v1a2 2 0 0 1-2 2h-3" />
  </svg>
);
const RocketIcon = ({ size = 20, color = "#fff" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
  </svg>
);
const TeamIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M15.5 14.2c2.6.5 4.5 2.8 4.5 5.8" />
  </svg>
);
const ClockIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);
const ShieldIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 3 19.5 6V11.5C19.5 16.8 16 20 12 21.5 8 20 4.5 16.8 4.5 11.5V6Z" />
    <path d="m8.7 12.2 2.2 2.1 4.4-4.8" />
  </svg>
);
const TrophyIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0Z" />
    <path d="M8 5H5a2 2 0 0 0 0 4h1M16 5h3a2 2 0 0 1 0 4h-1" />
    <path d="M12 13v3M9 21h6M10 17h4v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2Z" />
  </svg>
);
const ArrowIcon = ({ size = 16, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);
const CurvedArrowIcon = () => (
  <svg width="40" height="34" viewBox="0 0 40 34" fill="none" className="shrink-0">
    <path d="M36 4C24 2 10 8 5 20" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="1 5" />
    <path d="M2 14 5 20 11 18" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const FEATURES = [
  { Icon: TargetIcon, title: "Business-First Mindset", desc: "We understand your goals, challenges, and vision before writing a single line of code." },
  { Icon: PuzzleIcon, title: "Tailored to You", desc: "Every feature, workflow, and design is customized for the way you work." },
  { Icon: CollabIcon, title: "Transparent & Collaborative", desc: "You're part of every decision, every step, with clear communication." },
  { Icon: ChartIcon, title: "Built for Performance & Scale", desc: "Clean architecture that performs today and scales for tomorrow." },
  { Icon: HeadsetIcon, title: "Long-Term Support", desc: "We're with you beyond launch—optimizing, evolving, and supporting your growth." },
];

const TRUST_BADGES = [
  { Icon: TeamIcon, label: "Expert Team" },
  { Icon: ClockIcon, label: "On-Time Delivery" },
  { Icon: ShieldIcon, label: "Secure & Reliable" },
  { Icon: TrophyIcon, label: "Focused on Your Success" },
];

export default function CustomDevGrowthPartner() {
  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr_1fr] gap-10 lg:gap-6 items-center">
          {/* Left: title + paragraph + feature list */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="w-full"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full" style={{ backgroundColor: "#e6f6f4", color: TEAL }}>
                <StarIcon /> Why Businesses Choose ProManage
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-[42px] font-bold leading-tight" style={{ color: NAVY }}>
                More Than Code.
                <br />
                <span style={{ color: TEAL }}>A True Growth Partner.</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed max-w-md">
                We go beyond development to deliver long-term value through partnership, transparency, and results.
              </p>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              className="flex flex-col gap-3.5"
            >
              {FEATURES.map((f) => (
              <motion.li
                key={f.title}
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } }}
                className="flex items-start gap-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#e6f6f4" }}>
                  <f.Icon size={16} />
                </span>
                <div>
                  <h3 className="text-[13.5px] font-bold" style={{ color: NAVY }}>{f.title}</h3>
                  <p className="text-[12px] text-slate-500 leading-snug mt-0.5">{f.desc}</p>
                </div>
              </motion.li>
            ))}
            </motion.ul>
          </div>

          {/* Center: the vision image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="hidden lg:block relative self-start mx-auto w-full max-w-[880px] aspect-[938/1136]"
          >
            <Image src="/shopify-vision.png" alt="Your Vision, Our Expertise, Your Software, Real Business Impact" fill sizes="880px" className="object-contain" priority={false} />
          </motion.div>

          {/* Right: annotation + testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="flex flex-col items-center lg:items-end gap-8"
          >
            <div className="flex items-start gap-2">
              <CurvedArrowIcon />
              <p className="font-serif italic text-lg leading-snug max-w-[180px]" style={{ color: TEAL }}>
                A Partnership That Drives Real Growth
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_15px_35px_-20px_rgba(15,40,60,0.25)] p-5 max-w-[260px]">
              <div className="font-serif text-3xl leading-none mb-1" style={{ color: TEAL, opacity: 0.4 }}>&ldquo;</div>
              <p className="text-[13px] text-slate-600 italic leading-relaxed -mt-3">
                They didn&apos;t just deliver software. They helped us transform the way we work and grow.
              </p>
              <p className="text-[12px] font-semibold mt-3" style={{ color: NAVY }}>– Happy Client</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-14 lg:mt-16 rounded-2xl bg-[#f7fbfa] border border-slate-100 p-5 sm:p-6 flex flex-col xl:flex-row items-center gap-6 xl:gap-8"
        >
          <div className="flex items-center gap-4 flex-1 min-w-0 w-full xl:w-auto">
            <div className="relative h-20 w-20 shrink-0 flex items-center justify-center">
              <motion.svg
                viewBox="0 0 80 80"
                className="absolute inset-0 h-full w-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="40" cy="40" r="36" fill="none" stroke={TEAL} strokeWidth="1" strokeDasharray="2.5 4.5" opacity="0.35" />
                <circle cx="40" cy="4" r="2.8" fill={TEAL} />
                <circle cx="40" cy="76" r="1.9" fill={TEAL} opacity="0.5" />
              </motion.svg>
              <motion.svg
                viewBox="0 0 80 80"
                className="absolute inset-0 h-full w-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="40" cy="40" r="27" fill="none" stroke={TEAL} strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
                <circle cx="40" cy="13" r="2.1" fill={TEAL} opacity="0.8" />
              </motion.svg>
              <span
                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${DEEP_TEAL})` }}
              >
                <RocketIcon />
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-bold leading-snug" style={{ color: NAVY }}>Let&apos;s build something extraordinary together.</h3>
              <p className="text-[12.5px] text-slate-500 mt-1 leading-snug">Your vision + our expertise = software that drives real results.</p>
            </div>
          </div>

          <div className="hidden lg:flex flex-wrap items-center justify-center gap-x-6 gap-y-3 shrink-0">
            {TRUST_BADGES.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-1.5 w-[86px] text-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-100">
                  <b.Icon />
                </span>
                <span className="text-[10.5px] font-semibold leading-tight" style={{ color: NAVY }}>{b.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center xl:items-end gap-2.5 shrink-0 w-full xl:w-auto">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full pl-5 pr-1.5 py-1.5 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: DEEP_TEAL }}
            >
              Start Your Project
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <span key={i} className="h-6 w-6 rounded-full ring-2 ring-white bg-slate-200" />
                ))}
              </div>
              <span className="text-[11px] text-slate-500 whitespace-nowrap">Trusted by 500+ businesses</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
