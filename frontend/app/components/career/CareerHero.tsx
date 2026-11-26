"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const caveat = { className: "font-caveat" }; // global font from app/layout.tsx

const INK = "#0d1b33";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type IconProps = { size?: number; color?: string };
const base = (size: number, color: string, strokeWidth = 1.6) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const BulbIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
    <path d="M12 1v.5M4.5 4.5l.4.4M19.5 4.5l-.4.4M2 11h.5M21.5 11H22" />
  </svg>
);
const GrowIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 21h17M6 21v-5M10.5 21v-8M15 21v-6M19.5 21V9" />
    <path d="m4 11 5-4.5 4 3L20 3M16 3h4v4" />
  </svg>
);
const TeamIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="6.5" r="2.5" />
    <circle cx="5" cy="9" r="2" />
    <circle cx="19" cy="9" r="2" />
    <path d="M7.5 19a4.5 4.5 0 0 1 9 0M1.5 18a3.5 3.5 0 0 1 5.5-3M22.5 18a3.5 3.5 0 0 0-5.5-3" />
  </svg>
);
const TargetIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="11" cy="13" r="8" />
    <circle cx="11" cy="13" r="4.5" />
    <circle cx="11" cy="13" r="1.2" fill={color} />
    <path d="m11 13 9-9M17 4h3v3" />
  </svg>
);
const RocketIcon = ({ size = 22, color = "#5eead4" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M14 4.5c2.5-1.3 5-1.5 6-1 .5 1 .3 3.5-1 6l-7 7-5-5Z" />
    <path d="M7 11.5 4 11l3-4h4.5M12.5 17l.5 3 4-3v-4.5" />
    <circle cx="15.5" cy="8.5" r="1.4" />
    <path d="M6 15.5c-1.5.5-2.5 2-2.5 5 3 0 4.5-1 5-2.5" />
  </svg>
);
const ArrowIcon = ({ size = 16, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const PERKS__cms = [
  { Icon: BulbIcon, title: "Innovate", desc: "Solve real-world challenges" },
  { Icon: GrowIcon, title: "Grow", desc: "Learn, unlearn and level up" },
  { Icon: TeamIcon, title: "Collaborate", desc: "Together, we go further" },
  { Icon: TargetIcon, title: "Make an Impact", desc: "Your work creates real change" },
];

// team avatars as coloured initials, overlapping like a stack
const AVATARS__cms = [
  { initials: "AS", bg: "linear-gradient(135deg,#0f766e,#14b8a6)" },
  { initials: "RK", bg: "linear-gradient(135deg,#1e3a8a,#3b82f6)" },
  { initials: "PM", bg: "linear-gradient(135deg,#9a3412,#f97316)" },
  { initials: "NV", bg: "linear-gradient(135deg,#6d28d9,#a78bfa)" },
];

function TeamStack() {
  const $t = useCmsText();
  const AVATARS = useCmsData("CareerHero__AVATARS", AVATARS__cms);
  return (
    <div className="flex items-center gap-5">
      <div className="flex -space-x-1.5">
        {AVATARS.map((a) => (
          <span
            key={a.initials}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-bold text-white ring-[3px] ring-white"
            style={{ background: a.bg }}
          >
            {a.initials}
          </span>
        ))}
        <span className="flex h-10 w-10 items-center justify-center rounded-full text-[18px] font-semibold text-white ring-[3px] ring-white" style={{ backgroundColor: DEEP_TEAL }}>
          +
        </span>
      </div>
      <span className="h-10 w-px bg-slate-200" />
      <p className="text-small max-w-[230px] text-slate-600">
        {rich($t("CareerHero__t1", "Join "))}<span className="font-bold" style={{ color: INK }}>{$t("CareerHero__t2", "100+")}</span> {rich($t("CareerHero__t3", "passionate problem solvers building digital solutions that matter."))}</p>
    </div>
  );
}

/* Dark teal disc over the photo's left edge, with a slow-turning dashed ring */
function IdeaBadge() {
  const $t = useCmsText();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
      className="relative h-[200px] w-[200px] sm:h-[230px] sm:w-[230px]"
    >
      <motion.svg
        className="absolute -inset-3"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <circle cx="50" cy="50" r="48.5" fill="none" stroke="#5eead4" strokeWidth="0.6" strokeDasharray="1.5 2.5" />
        <circle cx="50" cy="1.5" r="1.4" fill={TEAL} />
      </motion.svg>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-full w-full flex-col items-center justify-center rounded-full px-7 text-center shadow-[0_30px_60px_-20px_rgba(6,40,45,0.7),0_0_0_8px_rgba(255,255,255,0.8)]"
        style={{ background: "radial-gradient(circle at 35% 25%, #1c5a63, #0c3a42 60%, #082a31)" }}
      >
        <RocketIcon size={30} />
        <p className="text-body mt-3 font-semibold text-white">
          {rich($t("CareerHero__t4", "Great ideas"))}<br />
          {rich($t("CareerHero__t5", "start here."))}<br />
          {rich($t("CareerHero__t6", "Big "))}<span className="text-teal-300">impact</span>
          <br />
          {rich($t("CareerHero__t7", "starts with you."))}</p>
        <span className="mt-3 h-[2px] w-10 rounded-full bg-teal-300" />
      </motion.div>
    </motion.div>
  );
}

function PerksBar() {
  const PERKS = useCmsData("CareerHero__PERKS", PERKS__cms);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
      className="grid grid-cols-2 gap-y-5 rounded-2xl bg-white/90 px-5 py-5 shadow-[0_24px_50px_-26px_rgba(13,27,51,0.45)] ring-1 ring-slate-100 backdrop-blur md:grid-cols-4"
    >
      {PERKS.map((p, i) => (
        <div key={p.title} className={`flex items-center gap-3 px-3 ${i > 0 ? "md:border-l md:border-slate-200" : ""} ${i % 2 === 1 ? "border-l border-slate-200 md:border-l" : ""}`}>
          <p.Icon size={30} color={DEEP_TEAL} />
          <span className="leading-tight">
            <span className="block text-[14px] font-semibold" style={{ color: TEAL }}>
              {p.title}
            </span>
            <span className="mt-0.5 block text-[12px] text-slate-500">{p.desc}</span>
          </span>
        </div>
      ))}
    </motion.div>
  );
}

// the photo's own pale left margin melts into the white page instead of showing a box edge
const EDGE = "linear-gradient(to right, transparent, #000 14%)";
const PHOTO_EDGE_FADE: React.CSSProperties = { maskImage: EDGE, WebkitMaskImage: EDGE };

const PHOTO_W = 1376;
const PHOTO_H = 768;

export default function CareerHero() {
  const $t = useCmsText();
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* the whole photo, half the screen wide and flush with its right edge, with the idea badge on
          its left edge and the perks bar along its foot, reaching back under the copy */}
      <div className="relative w-full lg:absolute lg:right-0 lg:top-0 lg:w-[50%]">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative w-full lg:!aspect-auto lg:h-[clamp(480px,40vw,620px)]"
          style={{ aspectRatio: `${PHOTO_W} / ${PHOTO_H}` }}
        >
          <Image
            src={$t("CareerHero__t8", "/career1.webp")}
            alt={$t("CareerHero__t9", "The ProManage team working together round a laptop in the office")}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain lg:object-cover lg:object-right"
            style={PHOTO_EDGE_FADE}
          />
        </motion.div>
        <div className="absolute left-[-110px] top-1/2 z-10 hidden -translate-y-1/2 lg:block">
          <IdeaBadge />
        </div>
        <div className="absolute left-[-12%] right-6 top-[calc(100%-36px)] z-10 hidden lg:block">
          <PerksBar />
        </div>
      </div>

      <Container className="relative">
        {/* the copy keeps to the left; the section is just tall enough for the photo and the perks bar under it */}
        <div className="grid grid-cols-1 items-center lg:min-h-[calc(clamp(480px,40vw,620px)+90px)] lg:grid-cols-[minmax(0,1fr)_52%]">
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 flex flex-col justify-center pb-14 pt-4 lg:py-10">
            <motion.p variants={fadeUp} className="text-small font-bold uppercase tracking-[0.12em]" style={{ color: TEAL }}>
              {rich($t("CareerHero__t10", "Careers at ProManage"))}</motion.p>
            <motion.h1 variants={fadeUp} className="text-h1 mt-4 font-bold tracking-tight" style={{ color: INK }}>
              {$t("CareerHero__t11", "Your next chapter")}</motion.h1>
            <motion.p variants={fadeUp} className={`${caveat.className} relative -mt-1 inline-block self-start text-[52px] font-bold leading-tight sm:text-[68px]`} style={{ color: TEAL }}>
              {rich($t("CareerHero__t12", "could start here."))}<svg className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden>
                <path d="M4 8C90 2 220 2 296 6" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
              </svg>
            </motion.p>
            <motion.p variants={fadeUp} className="text-body mt-6 max-w-[460px] text-slate-600">
              {rich($t("CareerHero__t13", "Work with people who turn "))}<span className="font-semibold" style={{ color: TEAL }}>ideas</span> {rich($t("CareerHero__t14", "into technology—and technology into"))}{" "}
              <span className="font-semibold" style={{ color: TEAL }}>impact</span>.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9">
              <Link
                href={$t("CareerHero__t15", "#open-positions")}
                className="group inline-flex items-center gap-6 rounded-full py-2.5 pl-7 pr-2.5 text-[15px] font-semibold text-white shadow-[0_18px_34px_-14px_rgba(15,92,86,0.8)] transition hover:-translate-y-0.5"
                style={{ background: `linear-gradient(90deg, #0c3a42, ${DEEP_TEAL})` }}
              >
                {$t("CareerHero__t16", "Explore Open Positions")}<span className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon size={16} color={DEEP_TEAL} />
                </span>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12">
              <TeamStack />
            </motion.div>
          </motion.div>

        </div>
      </Container>

      {/* small screens: badge and perks stack under the copy */}
      <Container className="relative pb-14 lg:hidden">
        <div className="flex justify-center">
          <IdeaBadge />
        </div>
        <div className="mt-10">
          <PerksBar />
        </div>
      </Container>
    </section>
  );
}
