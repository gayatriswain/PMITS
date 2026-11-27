"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { Counter } from "../shared/useCountUp";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const TEAL = "#0d9488";
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

const TargetIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill={color} stroke="none" />
  </svg>
);
const PuzzleIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M9 4h3a1.5 1.5 0 0 1 1.3 2.3A1.5 1.5 0 0 0 14.6 9H18a1 1 0 0 1 1 1v3.4a1.5 1.5 0 0 0-2.3 1.3A1.5 1.5 0 0 0 18 18H20M9 4H6a1 1 0 0 0-1 1v3M9 4a1.5 1.5 0 0 1 0 3M5 8a1.5 1.5 0 0 0 0 3M5 11v7a1 1 0 0 0 1 1h3M16.3 16.3A1.5 1.5 0 0 1 18 18" />
  </svg>
);
const ChartIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 20V13" />
    <path d="M10 20V9" />
    <path d="M16 20v-6" />
    <path d="m20 5-6.5 6.5-3-3L4 15" />
    <path d="M15 5h5v5" />
  </svg>
);
const HandshakeIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2 1.4 1.4 0 0 0 2-2 1.4 1.4 0 0 0 2-2l-3.5-3.5" />
    <path d="m14 10 1.5-1.5a1.4 1.4 0 0 0-2-2L7 13" />
    <path d="M9 13 5 9a1.4 1.4 0 0 0-2 2l6.5 6.5" />
    <path d="M3 9 7 5l3.5 3.5" />
    <path d="M17 6l4-4" />
  </svg>
);
const SearchIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const ClipboardIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="6" y="4" width="12" height="16" rx="2" />
    <path d="M9 4h6v2H9z" />
    <path d="M9 11h6M9 15h4" />
  </svg>
);
const PencilIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m14.5 3.5 6 6L8 22H2v-6Z" />
    <path d="m13 5 6 6" />
  </svg>
);
const RocketIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const UsersIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M15.5 14.2c2.6.5 4.5 2.8 4.5 5.8" />
  </svg>
);
const StarIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 3 14.5 9 21 9.7 16.2 14 17.5 20.5 12 17.2 6.5 20.5 7.8 14 3 9.7 9.5 9Z" />
  </svg>
);
const GlobeIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
  </svg>
);

const LEFT_CARDS__cms = [
  { Icon: TargetIcon, title: "Business First", desc: <>We start with your <b style={{ color: TEAL }}>goals</b> and build with <b style={{ color: TEAL }}>purpose</b>.</> },
  { Icon: PuzzleIcon, title: "Custom Solutions", desc: <>Solutions <b style={{ color: TEAL }}>tailored</b> to your brand, audience and market.</> },
];
const RIGHT_CARDS__cms = [
  { Icon: ChartIcon, title: "Results That Matter", desc: <>We focus on performance that drives <b style={{ color: TEAL }}>real growth</b>.</> },
  { Icon: HandshakeIcon, title: "Long-Term Partner", desc: <>We grow <b style={{ color: TEAL }}>with you,</b> beyond launch and delivery.</> },
];

const STATS__cms = [
  { Icon: UsersIcon, value: 250, suffix: "+", label: "Businesses Served", sub: "Across the globe" },
  { Icon: RocketIcon, value: 500, suffix: "+", label: "Projects Delivered", sub: "With measurable impact" },
  { Icon: StarIcon, value: 50, suffix: "+", label: "Experts & Innovators", sub: "Passionate problem solvers" },
  { Icon: GlobeIcon, value: 10, suffix: "+", label: "Industries Empowered", sub: "Diverse. Dynamic. Growing." },
];

function Hexagon({ Icon }: { Icon: (p: IconProps) => React.ReactElement }) {
  return (
    <div className="relative h-[92px] w-[84px] shrink-0 flex-none group">
      <div className="absolute inset-0 drop-shadow-[0_8px_16px_rgba(13,148,136,0.12)] transition-transform duration-300 group-hover:-translate-y-1">
        <svg className="h-full w-full" viewBox="0 0 64 70" fill="none">
          {/* Flat-topped regular hexagon with softly rounded corners via strokeLinejoin */}
          <polygon 
            points="32,3 59,18.5 59,51.5 32,67 5,51.5 5,18.5" 
            fill="white" 
            stroke="#e2e8f0" 
            strokeWidth="2.5" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
        <Icon size={30} color={TEAL} />
      </div>
    </div>
  );
}

function BenefitCard({ Icon, title, desc, align }: { Icon: (p: IconProps) => React.ReactElement; title: string; desc: React.ReactNode; align: "left" | "right" }) {
  return (
    <div className={`flex items-start gap-4 ${align === "right" ? "lg:flex-row-reverse" : ""}`}>
      <Hexagon Icon={Icon} />
      <div>
        <h3 className="text-[18px] font-bold leading-tight" style={{ color: NAVY }}>{title}</h3>
        <p className="text-small mt-1.5 text-slate-500 max-w-[230px]">{desc}</p>
      </div>
    </div>
  );
}

export default function WhyChooseUsBenefits() {
  const $t = useCmsText();
  const LEFT_CARDS = useCmsData("WhyChooseUsBenefits__LEFT_CARDS", LEFT_CARDS__cms);
  const RIGHT_CARDS = useCmsData("WhyChooseUsBenefits__RIGHT_CARDS", RIGHT_CARDS__cms);
  const STATS = useCmsData("WhyChooseUsBenefits__STATS", STATS__cms);
  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center max-w-[900px] mx-auto mb-10"
        >
          <span className="inline-flex items-center gap-1.5 text-[13px] font-bold tracking-[0.16em] uppercase" style={{ color: TEAL }}>
            {html($t("WhyChooseUsBenefits__t1", "Why Choose Us?"))}</span>
          <span className="block mx-auto mt-2 h-[3px] w-10 rounded-full" style={{ backgroundColor: TEAL }} />
          <h2 className="text-h2 font-heading mt-5 font-bold leading-[1.12] tracking-[-0.025em]" style={{ color: NAVY }}>{rich($t("WhyChooseUsBenefits__t2m", "Because You Deserve More<br>Than Just a <span class=\"text-[#0d9488]\">Service Provider.</span>"))}</h2>
          <p className="text-body mx-auto mt-5 max-w-[620px] text-slate-600">{rich($t("WhyChooseUsBenefits__t5m", "We combine strategy, creativity, and technology to build digital solutions that drive growth, engagement, and <span class=\"font-semibold text-[#0d9488]\">real business impact.</span>"))}</p>
        </motion.div>

        {/* Main 3-column grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_380px_1fr] gap-10 lg:gap-8 items-center mb-8"
        >
          {/* Left cards */}
          <div className="flex flex-col gap-16">
            {LEFT_CARDS.map((c) => (
              <BenefitCard key={c.title} Icon={c.Icon} title={c.title} desc={c.desc} align="left" />
            ))}
          </div>

          {/* Center diagram */}
          <div className="relative mx-auto w-full max-w-[440px] aspect-square hidden lg:block">
            {/* SVG orbit rings - Slow continuous rotation */}
            <svg className="absolute inset-0 h-full w-full animate-[spin_40s_linear_infinite]" viewBox="0 0 440 440" fill="none">
              {/* Main dashed orbit circle r=178, center=220 */}
              <circle cx="220" cy="220" r="178" stroke={TEAL} strokeWidth="1.5" strokeDasharray="6 6" opacity="0.35" />
              {/* Inner subtle ring */}
              <circle cx="220" cy="220" r="145" stroke={TEAL} strokeWidth="1" opacity="0.12" />
              {/* Dots at cardinal points — between corner icons */}
              <circle cx="220" cy="42" r="3" fill={TEAL} opacity="0.5" />
              <circle cx="398" cy="220" r="3" fill={TEAL} opacity="0.5" />
              <circle cx="220" cy="398" r="3" fill={TEAL} opacity="0.5" />
              <circle cx="42" cy="220" r="3" fill={TEAL} opacity="0.5" />
            </svg>

            {/* Static SVG for branching connector lines & solid arcs */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 440 440" fill="none" style={{ overflow: "visible" }}>
              {/* Right solid arc */}
              <path d="M 393 180 A 178 178 0 0 1 393 260" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
              {/* Left solid arc */}
              <path d="M 47 180 A 178 178 0 0 0 47 260" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Right Top Branch */}
              <circle cx="393" cy="180" r="3.5" fill={TEAL} />
              <circle cx="560" cy="152" r="2.5" fill={TEAL} />
              <path d="M 393 180 L 475 180 Q 485 180 485 170 L 485 162 Q 485 152 495 152 L 560 152" stroke={TEAL} strokeWidth="1.5" fill="none" opacity="0.7" />
              
              {/* Right Bottom Branch */}
              <circle cx="393" cy="260" r="3.5" fill={TEAL} />
              <circle cx="560" cy="288" r="2.5" fill={TEAL} />
              <path d="M 393 260 L 475 260 Q 485 260 485 270 L 485 278 Q 485 288 495 288 L 560 288" stroke={TEAL} strokeWidth="1.5" fill="none" opacity="0.7" />
              
              {/* Left Top Branch */}
              <circle cx="47" cy="180" r="3.5" fill={TEAL} />
              <circle cx="-120" cy="152" r="2.5" fill={TEAL} />
              <path d="M 47 180 L -35 180 Q -45 180 -45 170 L -45 162 Q -45 152 -55 152 L -120 152" stroke={TEAL} strokeWidth="1.5" fill="none" opacity="0.7" />
              
              {/* Left Bottom Branch */}
              <circle cx="47" cy="260" r="3.5" fill={TEAL} />
              <circle cx="-120" cy="288" r="2.5" fill={TEAL} />
              <path d="M 47 260 L -35 260 Q -45 260 -45 270 L -45 278 Q -45 288 -55 288 L -120 288" stroke={TEAL} strokeWidth="1.5" fill="none" opacity="0.7" />
            </svg>

            {/* Center image */}
            <div className="absolute rounded-full overflow-hidden shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] ring-8 ring-white" style={{ inset: "19%" }}>
              <div className="relative h-full w-full">
                <Image src={$t("WhyChooseUsBenefits__t7", "/why-choose-us/benefits-laptop.webp")} alt={$t("WhyChooseUsBenefits__t8", "Laptop showing a growth dashboard")} fill sizes="260px" className="object-cover" />
              </div>
            </div>

            {/* TOP-LEFT – 01 Understand */}
            <div className="absolute" style={{ left: '21.4%', top: '21.4%' }}>
              <div className="absolute text-center flex flex-col items-center justify-center -translate-y-1/2" style={{ right: '36px' }}>
                <p className="text-body font-extrabold" style={{ color: TEAL }}>{rich($t("WhyChooseUsBenefits__t9", "01"))}</p>
                <p className="text-small font-bold mt-0.5" style={{ color: NAVY }}>{rich($t("WhyChooseUsBenefits__t10", "Understand"))}</p>
              </div>
              <div
                className="absolute flex items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(13,148,136,0.15)] h-[52px] w-[52px] shrink-0 -translate-x-1/2 -translate-y-1/2"
                style={{ border: `2px solid #e6f6f4` }}
              >
                <SearchIcon size={20} color={TEAL} />
              </div>
            </div>

            {/* TOP-RIGHT – 02 Strategize */}
            <div className="absolute" style={{ left: '78.6%', top: '21.4%' }}>
              <div className="absolute text-center flex flex-col items-center justify-center -translate-y-1/2" style={{ left: '36px' }}>
                <p className="text-body font-extrabold" style={{ color: TEAL }}>{rich($t("WhyChooseUsBenefits__t11", "02"))}</p>
                <p className="text-small font-bold mt-0.5" style={{ color: NAVY }}>{rich($t("WhyChooseUsBenefits__t12", "Strategize"))}</p>
              </div>
              <div
                className="absolute flex items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(13,148,136,0.15)] h-[52px] w-[52px] shrink-0 -translate-x-1/2 -translate-y-1/2"
                style={{ border: `2px solid #e6f6f4` }}
              >
                <ClipboardIcon size={20} color={TEAL} />
              </div>
            </div>

            {/* BOTTOM-LEFT – 03 Design */}
            <div className="absolute" style={{ left: '21.4%', top: '78.6%' }}>
              <div className="absolute text-center flex flex-col items-center justify-center -translate-y-1/2" style={{ right: '36px' }}>
                <p className="text-body font-extrabold" style={{ color: TEAL }}>{rich($t("WhyChooseUsBenefits__t13", "03"))}</p>
                <p className="text-small font-bold mt-0.5" style={{ color: NAVY }}>{rich($t("WhyChooseUsBenefits__t14", "Design"))}</p>
              </div>
              <div
                className="absolute flex items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(13,148,136,0.15)] h-[52px] w-[52px] shrink-0 -translate-x-1/2 -translate-y-1/2"
                style={{ border: `2px solid #e6f6f4` }}
              >
                <PencilIcon size={20} color={TEAL} />
              </div>
            </div>

            {/* BOTTOM-RIGHT – 04 Deliver */}
            <div className="absolute" style={{ left: '78.6%', top: '78.6%' }}>
              <div className="absolute text-center flex flex-col items-center justify-center -translate-y-1/2" style={{ left: '36px' }}>
                <p className="text-body font-extrabold" style={{ color: TEAL }}>{rich($t("WhyChooseUsBenefits__t15", "04"))}</p>
                <p className="text-small font-bold mt-0.5" style={{ color: NAVY }}>{rich($t("WhyChooseUsBenefits__t16", "Deliver"))}</p>
              </div>
              <div
                className="absolute flex items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(13,148,136,0.15)] h-[52px] w-[52px] shrink-0 -translate-x-1/2 -translate-y-1/2"
                style={{ border: `2px solid #e6f6f4` }}
              >
                <RocketIcon size={20} color={TEAL} />
              </div>
            </div>
          </div>

          {/* Right cards */}
          <div className="flex flex-col gap-16">
            {RIGHT_CARDS.map((c) => (
              <BenefitCard key={c.title} Icon={c.Icon} title={c.title} desc={c.desc} align="right" />
            ))}
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="rounded-2xl bg-white shadow-[0_20px_50px_-25px_rgba(15,23,42,0.3)] ring-1 ring-slate-100 px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className={`flex items-center gap-3 ${i > 0 ? "lg:border-l lg:border-slate-100 lg:pl-8" : ""}`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#e6f6f4" }}>
                <s.Icon />
              </span>
              <div>
                <p className="text-body font-extrabold" style={{ color: NAVY }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-caption font-semibold text-slate-600">{s.label}</p>
                <p className="text-[11px] text-slate-400">{s.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
