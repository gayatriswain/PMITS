"use client";

import Image from "next/image";
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

const TeamIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="7" r="2.8" />
    <circle cx="5.5" cy="9" r="2" />
    <circle cx="18.5" cy="9" r="2" />
    <path d="M6.5 19.5a5.5 5.5 0 0 1 11 0M1.5 18a4 4 0 0 1 4.5-3.5M22.5 18a4 4 0 0 0-4.5-3.5" />
  </svg>
);
const PartyIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m3 21 4.5-12 7.5 7.5Z" />
    <path d="M14 4.5v.01M20 10v.01M17 3l-1 2.5M21 7l-2.5 1M11 8c1-2 1-3.5 0-5M16 13c2-1 3.5-1 5 0" />
  </svg>
);
const CreateIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="2.5" y="4" width="19" height="13" rx="1.5" />
    <path d="M8 21h8M12 17v4M9.5 9 7.5 10.5l2 1.5M14.5 9l2 1.5-2 1.5M12.8 8.5l-1.6 4.5" />
  </svg>
);
const BookIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 6.5C10 5 7 4.5 3 5v13c4-.5 7 0 9 1.5 2-1.5 5-2 9-1.5V5c-4-.5-7 0-9 1.5ZM12 6.5v13" />
  </svg>
);
const SmileIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 14.5c1 1.3 2.3 2 4 2s3-.7 4-2M9 9.5v.5M15 9.5v.5" />
  </svg>
);
const SummitIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m2 20 7-11 4 6 3-4 6 9Z" />
    <path d="M14 3v6M14 3h4l-1 1.5 1 1.5h-4" />
  </svg>
);
const HeartIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 6.8 4.5 4.5 0 0 1 20 9.5C20 15.3 12 20 12 20Z" />
  </svg>
);

/* Each moment's photo. Until real culture photos are in /public, the two career photos stand in, each circle
   zoomed onto a different part of them: `position` picks which part of the photo fills the square, then the
   photo is scaled up by `zoom` around `focus`. With a real photo per moment, just set `src` and drop the rest. */
type Moment = {
  Icon: (p: IconProps) => React.ReactElement;
  title: string;
  desc: string;
  src: string;
  position?: string;
  zoom?: number;
  focus?: string;
};
const MOMENTS__cms: Moment[] = [
  { Icon: TeamIcon, title: "Collaborate", desc: "We believe the best ideas come together.", src: "/career1.webp", position: "65% 50%", zoom: 1.15 },
  { Icon: PartyIcon, title: "Celebrate", desc: "Milestones, big or small, we celebrate together.", src: "/career2.webp", zoom: 4, focus: "40% 100%" },
  { Icon: CreateIcon, title: "Create", desc: "A space to think, design and build your best work.", src: "/career1.webp", zoom: 2.4, focus: "33% 61%" },
  { Icon: BookIcon, title: "Learn", desc: "Knowledge sharing that helps everyone grow.", src: "/career1.webp", position: "0% 50%", zoom: 2.4, focus: "23% 58%" },
  { Icon: SmileIcon, title: "Have Fun", desc: "Good vibes, great people, unforgettable moments.", src: "/career2.webp", zoom: 4, focus: "77% 100%" },
  { Icon: SummitIcon, title: "Grow Together", desc: "Supporting each other to reach new heights.", src: "/career2.webp", position: "100% 50%", zoom: 2.6, focus: "79% 95%" },
];

/* Photo in a ring, with the icon badge hanging off its foot */
function MomentCard({ m, i }: { m: Moment; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.12 }}
      className="group relative flex flex-col items-center text-center"
    >
      <div className="relative">
        {/* faint outer ring, with a teal arc that sweeps round on hover */}
        <span className="absolute -inset-2.5 rounded-full border border-teal-100" aria-hidden />
        <span
          className="absolute -inset-2.5 rounded-full border-2 border-transparent border-t-teal-400/70 transition-transform duration-700 group-hover:rotate-180"
          aria-hidden
        />
        <div className="relative h-[150px] w-[150px] overflow-hidden rounded-full shadow-[0_20px_40px_-20px_rgba(13,27,51,0.5)] ring-4 ring-white xl:h-[170px] xl:w-[170px]">
          {/* zoom lives on a wrapper so the hover zoom on the image can stack on top of it */}
          <div className="absolute inset-0" style={{ transform: `scale(${m.zoom ?? 1})`, transformOrigin: m.focus ?? "50% 50%" }}>
            <Image
              src={m.src}
              alt={m.title}
              fill
              sizes="(min-width: 1280px) 680px, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ objectPosition: m.position ?? "50% 50%" }}
            />
          </div>
        </div>
        <span className="absolute -bottom-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-[0_12px_24px_-12px_rgba(13,27,51,0.45)] ring-1 ring-slate-100">
          <m.Icon size={26} color={TEAL} />
        </span>
      </div>
      <h3 className="mt-12 text-[17px] font-semibold" style={{ color: INK }}>
        {m.title}
      </h3>
      <span className="mt-2.5 h-[2px] w-7 rounded-full" style={{ backgroundColor: TEAL }} />
      <p className="text-small mt-3 max-w-[180px] text-slate-600">{m.desc}</p>
    </motion.li>
  );
}

/* Wavy line linking the photos, with a dot between each pair; drawn on as the row scrolls in */
function Wave() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-[75px] hidden h-[60px] w-full lg:block xl:top-[85px]"
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M0 40 C 50 40, 70 55, 100 55 S 160 20, 200 20 S 260 55, 300 55 S 360 20, 400 20 S 460 55, 500 55 S 560 20, 600 20 S 660 55, 700 55 S 760 20, 800 20 S 860 55, 900 55 S 960 20, 1000 20 S 1060 55, 1100 55 S 1170 40, 1200 40"
        stroke="#99d5d0"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
      />
    </svg>
  );
}

export default function CareerLife() {
  const $t = useCmsText();
  const MOMENTS = useCmsData("CareerLife__MOMENTS", MOMENTS__cms);
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#f7fbfb] to-white py-16 lg:py-20">
      {/* soft background swoops and dot grids */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full border-[40px] border-teal-50" aria-hidden />
      <div className="pointer-events-none absolute -bottom-56 left-1/2 h-[360px] w-[1100px] -translate-x-1/2 rounded-[50%] border-[30px] border-teal-50/80" aria-hidden />
      <div
        className="pointer-events-none absolute left-6 top-10 hidden h-24 w-28 opacity-50 lg:block"
        style={{ backgroundImage: "radial-gradient(#99d5d0 1.4px, transparent 1.6px)", backgroundSize: "12px 12px" }}
        aria-hidden
      />

      <Container className="relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-[760px] text-center"
        >
          <motion.p variants={fadeUp} className="text-small font-semibold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
            {rich($t("CareerLife__t1", "Life at ProManage"))}</motion.p>
          <motion.span variants={fadeUp} className="mx-auto mt-2 block h-[2px] w-10 rounded-full" style={{ backgroundColor: TEAL }} />
          <motion.h2 variants={fadeUp} className="text-h2 mt-4 font-bold tracking-tight" style={{ color: INK }}>
            {$t("CareerLife__t2", "More Than a Workplace,")}</motion.h2>
          <motion.p variants={fadeUp} className={`${caveat.className} relative mx-auto inline-block text-[44px] font-bold leading-tight sm:text-[58px]`} style={{ color: TEAL }}>
            {rich($t("CareerLife__t3", "It's Our Way of Life."))}<svg className="pointer-events-none absolute -bottom-1 left-[15%] h-3 w-[75%]" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
              <path d="M3 9C60 3 140 2 197 6" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </motion.p>
          <motion.p variants={fadeUp} className="text-body mx-auto mt-6 max-w-[560px] text-slate-600">
            {rich($t("CareerLife__t4", "At ProManage, we believe great work happens in an environment where people feel"))}{" "}
            <span className="font-medium" style={{ color: TEAL }}>valued</span>,{" "}
            <span className="font-medium" style={{ color: TEAL }}>inspired</span>{rich($t("CareerLife__t5", ", and"))}{" "}
            <span className="font-medium" style={{ color: TEAL }}>empowered</span> to{" "}
            <span className="font-medium" style={{ color: TEAL }}>{$t("CareerLife__t6", "grow together")}</span>.
          </motion.p>
        </motion.div>

        <div className="relative mt-14">
          <Wave />
          <ul className="relative grid grid-cols-2 gap-x-4 gap-y-14 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-2">
            {MOMENTS.map((m, i) => (
              <MomentCard key={m.title} m={m} i={i} />
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="mt-16 flex flex-col items-center text-center"
        >
          <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <HeartIcon size={26} color={TEAL} />
          </motion.span>
          <p className={`${caveat.className} mt-1 text-[34px] font-bold leading-none`} style={{ color: TEAL }}>
            {rich($t("CareerLife__t7", "Stronger Together."))}</p>
          <p className="text-body mt-2 flex items-center gap-3 tracking-[0.04em]" style={{ color: DEEP_TEAL }}>
            <span className="h-[4px] w-[4px] rounded-full" style={{ backgroundColor: TEAL }} />
            {rich($t("CareerLife__t8", "Better every day."))}<span className="h-[4px] w-[4px] rounded-full" style={{ backgroundColor: TEAL }} />
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
