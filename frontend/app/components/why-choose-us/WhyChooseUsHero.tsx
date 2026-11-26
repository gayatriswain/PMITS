"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";
import HeroGrowthScene from "./HeroGrowthScene";

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

const TargetIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill={color} stroke="none" />
  </svg>
);
const CodeIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m9 7-5 5 5 5" />
    <path d="m15 7 5 5-5 5" />
  </svg>
);
const ChartUpIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 20V13" />
    <path d="M10 20V9" />
    <path d="M16 20v-6" />
    <path d="m20 5-6.5 6.5-3-3L4 15" />
    <path d="M15 5h5v5" />
  </svg>
);
const RocketIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
  </svg>
);
const PlayIcon = ({ size = 14, color = NAVY }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M8 5.5v13l11-6.5Z" />
  </svg>
);

const FEATURES__cms = [
  { Icon: TargetIcon, title: "Strategic by Design", desc: "We start with your goals and build with purpose." },
  { Icon: CodeIcon, title: "Built for You", desc: "Custom solutions tailored to your brand and audience." },
  { Icon: ChartUpIcon, title: "Results That Scale", desc: "Future-ready digital experiences that drive growth." },
  { Icon: RocketIcon, title: "Beyond Delivery", desc: "We partner with you to optimize, evolve, and grow." },
];

export default function WhyChooseUsHero() {
  const $t = useCmsText();
  const FEATURES = useCmsData("WhyChooseUsHero__FEATURES", FEATURES__cms);
  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#f5f8fb_0%,#eef3f8_100%)] py-14 sm:py-16 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.08),transparent_70%)]" />
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="block text-[13px] font-bold uppercase tracking-[0.18em]" style={{ color: TEAL }}>
              {$t("WhyChooseUsHero__t1", "Why Choose Us?")}
            </span>
            <i aria-hidden className="mt-3 block h-[2px] w-14 rounded-full" style={{ backgroundColor: TEAL }} />
            <h1 className="font-heading mt-8 text-[clamp(40px,4.6vw,72px)] font-bold leading-[1.08] tracking-[-0.025em]" style={{ color: NAVY }}>
              <span className="block">{$t("WhyChooseUsHero__t2", "We Build")}</span>
              <span className="block">
                {$t("WhyChooseUsHero__t23", "What")} <span style={{ color: TEAL }}>{$t("WhyChooseUsHero__t3", "Grows")}</span>
              </span>
              <span className="block">
                {$t("WhyChooseUsHero__t24", "Your")}{" "}
                <span className="relative inline-block" style={{ color: TEAL }}>
                  {$t("WhyChooseUsHero__t4", "Business.")}
                  <svg aria-hidden className="absolute -bottom-3 left-[-8%] w-[112%]" height="14" viewBox="0 0 300 14" fill="none" preserveAspectRatio="none">
                    <path d="M2 10C70 3 200 1 298 8" stroke={TEAL} strokeWidth="3.5" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
            </h1>
            <p className="text-body mt-10 max-w-[480px] leading-relaxed text-slate-600">
              {$t("WhyChooseUsHero__t5", "Strategy. Design. Technology.")} <span className="font-medium" style={{ color: TEAL }}>{$t("WhyChooseUsHero__t6", "Growth.")}</span>
              <br />
              {rich($t("WhyChooseUsHero__t7", "Everything aligned to deliver real results that matter to you."))}
            </p>

            <div className="mt-9 grid max-w-[640px] grid-cols-2 gap-y-7 sm:grid-cols-4 sm:divide-x sm:divide-slate-200">
              {FEATURES.map((f, i) => (
                <div key={i} className="pr-4 sm:px-4 sm:first:pl-0">
                  <f.Icon size={30} />
                  <h3 className="mt-4 text-[14px] font-bold leading-snug" style={{ color: NAVY }}>{f.title}</h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-slate-500">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href={$t("WhyChooseUsHero__t8", "/contact")}
                className="group inline-flex items-center gap-4 rounded-full py-2 pl-7 pr-2 text-[15px] font-semibold text-white shadow-[0_16px_30px_-14px_rgba(15,92,86,0.7)] transition-transform hover:-translate-y-0.5"
                style={{ backgroundImage: `linear-gradient(90deg, ${NAVY}, ${DEEP_TEAL} 60%, ${TEAL})` }}
              >
                {$t("WhyChooseUsHero__t9", "Let's Build What's Next")}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:translate-x-0.5" style={{ color: DEEP_TEAL }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
              </Link>
              <Link href={$t("WhyChooseUsHero__u1", "#how-we-work")} className="group flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors group-hover:bg-[#e6f4f1]" style={{ borderColor: DEEP_TEAL, color: NAVY }}>
                  <PlayIcon />
                </span>
                <span className="text-left">
                  <span className="block text-[15px] font-semibold" style={{ color: NAVY }}>{$t("WhyChooseUsHero__t10", "See How We Do It")}</span>
                  <span className="block text-[12px] text-slate-500">{$t("WhyChooseUsHero__t11", "Watch 60-sec overview")}</span>
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Right: devices on the podium with live, editable overlays */}
          <HeroGrowthScene />
        </div>
      </Container>
    </section>
  );
}
