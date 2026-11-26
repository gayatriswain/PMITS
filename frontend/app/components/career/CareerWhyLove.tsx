"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

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

const RocketIcon = ({ size = 22, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M14 4.5c2.5-1.3 5-1.5 6-1 .5 1 .3 3.5-1 6l-7 7-5-5Z" />
    <path d="M7 11.5 4 11l3-4h4.5M12.5 17l.5 3 4-3v-4.5" />
    <circle cx="15.5" cy="8.5" r="1.4" />
    <path d="M6 15.5c-1.5.5-2.5 2-2.5 5 3 0 4.5-1 5-2.5" />
  </svg>
);
const TeamIcon = ({ size = 22, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="7" r="2.8" />
    <circle cx="5.5" cy="9" r="2" />
    <circle cx="18.5" cy="9" r="2" />
    <path d="M6.5 19.5a5.5 5.5 0 0 1 11 0ZM1.5 18a4 4 0 0 1 4.5-3.5M22.5 18a4 4 0 0 0-4.5-3.5" />
  </svg>
);
const TargetIcon = ({ size = 22, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="11" cy="13" r="8" />
    <circle cx="11" cy="13" r="4.5" />
    <circle cx="11" cy="13" r="1.2" fill={color} />
    <path d="m11 13 9-9M17 4h3v3" />
  </svg>
);

const REASONS__cms = [
  {
    Icon: RocketIcon,
    lead: "Build with",
    accent: "Purpose",
    desc: "Work on meaningful projects that solve real business challenges and create lasting impact.",
  },
  {
    Icon: TeamIcon,
    lead: "Grow",
    accent: "Everyday",
    desc: "Learn, upskill and grow with mentors who support and challenge you.",
  },
  {
    Icon: TargetIcon,
    lead: "Make an",
    accent: "Impact",
    desc: "Your work creates value—for clients, for teams, and for you.",
  },
];

const DISC = 92;
const RING_R = DISC / 2 + 12;
const RING_C = 2 * Math.PI * RING_R;

/* Icon in a white disc, with a dashed teal arc sweeping round its top-right */
function ReasonIcon({ Icon, delay }: { Icon: (p: IconProps) => React.ReactElement; delay: number }) {
  const box = RING_R * 2 + 8;
  return (
    <span className="relative flex items-center justify-center" style={{ width: box, height: box }}>
      <svg className="absolute inset-0 -rotate-[150deg]" width={box} height={box} viewBox={`0 0 ${box} ${box}`} aria-hidden>
        <motion.circle
          cx={box / 2}
          cy={box / 2}
          r={RING_R}
          fill="none"
          stroke={TEAL}
          strokeOpacity={0.55}
          strokeWidth="5"
          strokeDasharray="1.5 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 0.42 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE, delay }}
        />
      </svg>
      <span
        className="flex items-center justify-center rounded-full bg-white shadow-[0_18px_36px_-18px_rgba(13,27,51,0.45)] ring-1 ring-slate-100 transition-transform duration-300 group-hover:-translate-y-1"
        style={{ width: DISC, height: DISC }}
      >
        <Icon size={42} color={DEEP_TEAL} />
      </span>
    </span>
  );
}

/* Thin dotted divider with a dot at its top, between columns */
function Divider() {
  return (
    <span className="hidden h-[200px] flex-col items-center self-center md:flex" aria-hidden>
      <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: TEAL }} />
      <span className="mt-1 w-0 flex-1 border-l border-dashed border-slate-300" />
    </span>
  );
}

export default function CareerWhyLove() {
  const $t = useCmsText();
  const REASONS = useCmsData("CareerWhyLove__REASONS", REASONS__cms);
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <Container className="relative z-10 pt-16 lg:pt-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-[680px] text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-small flex items-center justify-center gap-4 font-semibold uppercase tracking-[0.14em]"
            style={{ color: DEEP_TEAL }}
          >
            <span className="flex items-center" aria-hidden>
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-teal-500" />
              <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: TEAL }} />
            </span>
            {rich($t("CareerWhyLove__t1", "Why People Love"))}<span className="flex items-center" aria-hidden>
              <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: TEAL }} />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-teal-500" />
            </span>
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-h2 mt-3 font-bold tracking-tight">
            <span style={{ color: INK }}>{$t("CareerWhyLove__t2", "Working at ")}</span>
            <span style={{ color: TEAL }}>{$t("CareerWhyLove__t3", "ProManage")}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-body mt-4 text-slate-600">
            {rich($t("CareerWhyLove__t4", "We're more than a workplace — we're a community of thinkers, builders, and dreamers who"))}{" "}
            <span className="font-medium" style={{ color: TEAL }}>{$t("CareerWhyLove__t5", "grow together")}</span> and{" "}
            <span className="font-medium" style={{ color: TEAL }}>{$t("CareerWhyLove__t6", "create impact")}</span> {rich($t("CareerWhyLove__t7", "every day."))}</motion.p>
        </motion.div>

        <div className="mx-auto mt-12 flex max-w-[960px] flex-col items-stretch gap-12 md:flex-row md:gap-6">
          {REASONS.map((r, i) => (
            <div key={r.accent} className="contents">
              {i > 0 && <Divider />}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.15 }}
                className="group flex flex-1 flex-col items-center text-center"
              >
                <ReasonIcon Icon={r.Icon} delay={0.4 + i * 0.15} />
                <h3 className="text-h6 mt-5 font-bold" style={{ color: INK }}>
                  {r.lead} <span style={{ color: TEAL }}>{r.accent}</span>
                </h3>
                <span className="mt-3 h-[2px] w-8 rounded-full" style={{ backgroundColor: TEAL }} />
                <p className="text-small mt-4 max-w-[250px] text-slate-600">{r.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </Container>

      {/* the photo's top is plain white, so it slides up under the copy and only its curved scene shows */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mt-[calc(-75px-32vw)] w-full"
        style={{ aspectRatio: "1376 / 768" }}
      >
        <Image
          src={$t("CareerWhyLove__t8", "/career2.png")}
          alt={$t("CareerWhyLove__t9", "ProManage teammates chatting on sofas in the office lounge under a 'Teamwork makes the dream work' sign")}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}
