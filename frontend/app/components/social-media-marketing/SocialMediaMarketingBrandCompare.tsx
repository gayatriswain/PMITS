"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { Counter } from "../shared/useCountUp";
import Container from "../shared/Container";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#0d9488";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type IconProps = { color?: string; size?: number };
const svgBase = (color: string, size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const NoEntryIcon = ({ color = "#94a3b8", size = 14 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M6 6 L18 18" />
  </svg>
);
const ScatterGridIcon = ({ color = "#94a3b8", size = 14 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <rect x="3.5" y="3.5" width="6" height="6" rx="1" />
    <rect x="14.5" y="6.5" width="6" height="6" rx="1" />
    <rect x="6" y="15" width="6" height="6" rx="1" />
    <rect x="16" y="16.5" width="4.5" height="4.5" rx="1" />
  </svg>
);
const TrendDownIcon = ({ color = "#94a3b8", size = 14 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M4 6 L10 13 L14 10 L20 18" />
    <path d="M20 11 V18 H13" />
  </svg>
);
const IdentitySlashIcon = ({ color = "#94a3b8", size = 14 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M12 3 L19 6 V11 C19 16 15.5 19 12 20 C8.5 19 5 16 5 11 V6 Z" />
    <path d="M5 5 L19 19" />
  </svg>
);
const EyeSlashIcon = ({ color = "#94a3b8", size = 14 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M3 12 C5 8 8.2 6 12 6 C15.8 6 19 8 21 12 C19 16 15.8 18 12 18 C8.2 18 5 16 3 12 Z" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M4 4 L20 20" />
  </svg>
);

const CheckMark = () => (
  <span className="shrink-0 w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center" style={{ borderColor: TEAL }}>
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

const UsersIcon = ({ color = TEAL, size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <circle cx="9" cy="8" r="3.3" />
    <path d="M2.5 20c0-3.6 2.9-6.3 6.5-6.3s6.5 2.7 6.5 6.3" />
    <circle cx="17.5" cy="9" r="2.6" />
    <path d="M15.8 13.8c2.9.3 5.2 2.8 5.2 6.2" />
  </svg>
);
const HeartIcon = ({ color = TEAL, size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M12 20 C5 15.5 3 12.5 3 9 C3 6.2 5.2 4 8 4 C9.7 4 11.2 4.9 12 6.2 C12.8 4.9 14.3 4 16 4 C18.8 4 21 6.2 21 9 C21 12.5 19 15.5 12 20 Z" />
  </svg>
);
const TrendUpIcon = ({ color = TEAL, size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M4 20 V15 M9 20 V12 M14 20 V14 M19 20 V9" />
    <path d="M4 11 L9 7 L13 9 L20 4 M16.5 4 H20 V7.5" />
  </svg>
);
const StarIcon = ({ color = "#f59e0b", size = 11 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="m12 2.5 3.1 6.3 7 1-5 4.9 1.2 6.9-6.3-3.3-6.3 3.3 1.2-6.9-5-4.9 7-1Z" />
  </svg>
);

const TargetIcon = ({ color = DEEP_TEAL, size = 20 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill={color} stroke="none" />
    <path d="M12 2 V5.5 M12 18.5 V22 M2 12 H5.5 M18.5 12 H22" />
  </svg>
);
const BulbIcon = ({ color = DEEP_TEAL, size = 20 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M9 18h6M10 21.5h4M12 2a6.5 6.5 0 0 0-3.8 11.8c.5.4.8 1 .8 1.7v.5h6v-.5c0-.7.3-1.3.8-1.7A6.5 6.5 0 0 0 12 2Z" />
  </svg>
);
const RocketIcon = ({ color = DEEP_TEAL, size = 20 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M14 4c4-1 7 2 6 6l-7 7-6-6Z" />
    <circle cx="15.5" cy="8.5" r="1.5" />
    <path d="M7 11H4l3-4h4M13 17v3l4-4v-4M6 18l-2.5 2.5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const LEFT_ISSUES = [
  { label: "Inconsistent Look", Icon: NoEntryIcon },
  { label: "Random Content", Icon: ScatterGridIcon },
  { label: "Low Engagement", Icon: TrendDownIcon },
  { label: "No Brand Identity", Icon: IdentitySlashIcon },
  { label: "Forgettable", Icon: EyeSlashIcon },
];

const RIGHT_WINS = ["Consistent Identity", "Strategic Content", "Higher Engagement", "Stronger Brand Recall", "Better Results"];

const STATS = [
  { target: 30, suffix: "M+", label: "People Reached", Icon: UsersIcon },
  { target: 4.9, suffix: "/5", label: "Client Rating", Icon: HeartIcon, stars: true },
  { target: 1000, suffix: "+", label: "Campaigns Delivered", Icon: TrendUpIcon },
];

const FEATURES = [
  { title: "Consistency", desc: "A strong brand across every platform.", Icon: TargetIcon },
  { title: "Creativity", desc: "Content that stops and connects.", Icon: BulbIcon },
  { title: "Strategy", desc: "Data-driven campaigns that deliver real growth.", Icon: RocketIcon },
];

// Drop each logo file into frontend/public/ with these exact names and it'll show up here automatically.
const BRANDS = [
  { name: "bont", logo: "/brand-bont.png" },
  { name: "The Urban Collective", logo: "/brand-urban-collective.png" },
  { name: "Luna", logo: "/brand-luna.png" },
  { name: "Northfield Coffee", logo: "/brand-northfield-coffee.png" },
  { name: "eden Wellness", logo: "/brand-eden-wellness.png" },
  { name: "Verde Living", logo: "/brand-verde-living.png" },
];

/* ------------------------------------------------------------------ */
/* Motion                                                              */
/* ------------------------------------------------------------------ */

const listContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const listItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};
const listItemRight: Variants = {
  hidden: { opacity: 0, x: 10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

/* ------------------------------------------------------------------ */

function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: EASE }}
      className="w-full sm:w-[70%] mx-auto bg-white rounded-2xl border border-slate-100 shadow-[0_15px_40px_-25px_rgba(15,40,60,0.25)] p-6 lg:p-7 grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-4"
    >
      {STATS.map((stat, i) => (
        <div key={stat.label} className={`flex items-center justify-center gap-3 px-2 ${i > 0 ? "sm:border-l border-slate-100" : ""}`}>
          <span className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e6f6f4" }}>
            <stat.Icon />
          </span>
          <div>
            <p className="text-xl font-bold tabular-nums leading-none" style={{ color: DEEP_TEAL }}>
              {Number.isInteger(stat.target) ? (
                inView ? <Counter target={stat.target} suffix={stat.suffix} /> : `0${stat.suffix}`
              ) : (
                `${stat.target}${stat.suffix}`
              )}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <p className="text-[13px] font-semibold text-slate-700">{stat.label}</p>
              {stat.stars && (
                <span className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <StarIcon key={s} />
                  ))}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function FeaturesBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="w-full bg-white rounded-2xl border border-slate-100 shadow-[0_15px_40px_-25px_rgba(15,40,60,0.2)] p-6 lg:p-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6"
    >
      {FEATURES.map((f, i) => (
        <div key={f.title} className={`flex items-start gap-3.5 ${i > 0 ? "sm:border-l border-slate-100 sm:pl-6" : ""}`}>
          <span className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e6f6f4" }}>
            <f.Icon />
          </span>
          <div>
            <p className="text-[15px] font-bold" style={{ color: NAVY }}>{f.title}</p>
            <p className="text-[13px] text-slate-500 leading-snug mt-1">{f.desc}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

export default function SocialMediaMarketingBrandCompare() {
  return (
    <section className="relative w-full bg-[#F7F9FA] py-16 lg:py-24 overflow-hidden">
      <Container className="flex flex-col gap-12 lg:gap-16">
        {/* Top: text + phone comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.6fr] gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: TEAL }}>
              Why Some Brands Get Remembered
            </span>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight font-bold mt-3" style={{ color: NAVY }}>
              While Others Get Scrolled Past.
            </h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed mt-4 max-w-md">
              A beautiful social presence isn&apos;t about posting more. It&apos;s about creating a brand people instantly recognize, trust and remember every time they scroll.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 mt-6 rounded-lg px-5 py-3 text-[13px] font-semibold text-white shadow-lg shadow-teal-900/15 transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: DEEP_TEAL }}
            >
              Let&apos;s Build a Brand That Stands Out
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          {/* Comparison — mobile/tablet (<lg): two columns, each phone directly followed by its
              own point list, so it's clear which points belong to which brand. */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col items-center"
            >
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 text-center">Ordinary Brand</span>
              <span className="text-[11px] text-slate-400 mb-3 text-center">Just Another Feed</span>
              <div className="relative w-[120px] sm:w-[170px]" style={{ aspectRatio: "501/970" }}>
                <Image src="/social-media.webp" alt="Ordinary brand's inconsistent social feed" fill sizes="170px" className="object-contain" />
              </div>
              <motion.ul
                variants={listContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="mt-5 flex w-full flex-col gap-3"
              >
                {LEFT_ISSUES.map((it) => (
                  <motion.li key={it.label} variants={listItem} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100">
                      <it.Icon size={12} />
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">{it.label}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-center" style={{ color: TEAL }}>ProManage Brand</span>
              <span className="text-[11px] text-slate-400 mb-3 text-center">Built to Stand Out</span>
              <div className="relative w-[120px] sm:w-[170px]" style={{ aspectRatio: "500/941" }}>
                <Image src="/social media2.webp" alt="ProManage's consistent, branded social feed" fill sizes="170px" className="object-contain" />
              </div>
              <motion.ul
                variants={listContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="mt-5 flex w-full flex-col gap-3"
              >
                {RIGHT_WINS.map((label) => (
                  <motion.li key={label} variants={listItemRight} className="flex items-center gap-2">
                    <CheckMark />
                    <span className="text-[11px] font-bold" style={{ color: NAVY }}>{label}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>

          {/* Comparison — desktop (lg+): original checklist — phones+VS — checklist row */}
          <div className="hidden lg:flex items-center justify-center gap-4">
            {/* Left checklist */}
            <motion.ul
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 gap-4 shrink-0"
            >
              {LEFT_ISSUES.map((it) => (
                <motion.li key={it.label} variants={listItem} className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100">
                    <it.Icon />
                  </span>
                  <span className="text-[12px] font-medium text-slate-500 whitespace-nowrap">{it.label}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Phones + VS */}
            <div className="flex items-start justify-center gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex flex-col items-center"
              >
                <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400">Ordinary Brand</span>
                <span className="text-[11px] text-slate-400 mb-3">Just Another Feed</span>
                <div className="relative w-[170px]" style={{ aspectRatio: "501/970" }}>
                  <Image src="/social-media.webp" alt="Ordinary brand's inconsistent social feed" fill sizes="170px" className="object-contain" />
                </div>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
                className="mt-24 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold text-white ring-4 ring-white"
                style={{ backgroundColor: DEEP_TEAL }}
              >
                VS
              </motion.span>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: TEAL }}>ProManage Brand</span>
                <span className="text-[11px] text-slate-400 mb-3">Built to Stand Out</span>
                <div className="relative w-[170px]" style={{ aspectRatio: "500/941" }}>
                  <Image src="/social media2.webp" alt="ProManage's consistent, branded social feed" fill sizes="170px" className="object-contain" />
                </div>
              </motion.div>
            </div>

            {/* Right checklist */}
            <motion.ul
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 gap-4 shrink-0"
            >
              {RIGHT_WINS.map((label) => (
                <motion.li key={label} variants={listItemRight} className="flex items-center gap-2.5">
                  <CheckMark />
                  <span className="text-[12px] font-bold whitespace-nowrap" style={{ color: NAVY }}>{label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <StatsBar />
          <FeaturesBar />
        </div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col items-center text-center"
        >
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-5">
            Trusted by <span style={{ color: DEEP_TEAL }}>Ambitious Brands</span> Worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {BRANDS.map((b) => (
              <span key={b.name} className="relative h-7 sm:h-8 w-[110px] opacity-60 grayscale">
                <Image src={b.logo} alt={b.name} fill sizes="110px" className="object-contain object-center" />
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
