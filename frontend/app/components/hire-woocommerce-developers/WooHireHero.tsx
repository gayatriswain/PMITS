"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useFitScale } from "../shared/useFitScale";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const caveat = { className: "font-caveat" }; // global font from app/layout.tsx

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const WOO_PURPLE = "#7f54b3";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type IconProps = { size?: number; color?: string };
const base = (size: number, color: string, strokeWidth = 1.7) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const CartIcon = ({ size = 14, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <path d="M3 4h2.5l2.2 11h10.8l2-8H7" />
    <circle cx="9.5" cy="19" r="1.3" />
    <circle cx="17" cy="19" r="1.3" />
  </svg>
);
const CodeWindowIcon = ({ size = 20, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 8h18M10 12l-2 2 2 2M14 12l2 2-2 2" />
  </svg>
);
const GaugeIcon = ({ size = 20, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4.5 17a8.5 8.5 0 1 1 15 0" />
    <path d="m12 13 4-4" />
    <circle cx="12" cy="13" r="1.2" fill={color} />
  </svg>
);
const PlugIcon = ({ size = 20, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 0 1-11 0Z" />
    <path d="M12 16.5V21" />
  </svg>
);
const ShieldIcon = ({ size = 20, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 3 19.5 6V11.5C19.5 16.8 16 20 12 21.5 8 20 4.5 16.8 4.5 11.5V6Z" />
    <path d="m8.7 12.2 2.2 2.1 4.4-4.8" />
  </svg>
);
const ArrowIcon = ({ size = 16, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);
const PlayIcon = ({ size = 14, color = TEAL }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);
const CheckIcon = ({ size = 10, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 3)}>
    <path d="m5 12 4.5 4.5L19 7" />
  </svg>
);
const TrophyIcon = ({ size = 30, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0Z" />
    <path d="M8 5H5a2 2 0 0 0 0 4h1M16 5h3a2 2 0 0 1 0 4h-1" />
    <path d="M12 13v3M9 21h6M10 17h4v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2Z" />
  </svg>
);
const StoreIcon = ({ size = 30, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <path d="M4 9.5 5.5 4h13L20 9.5" />
    <path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0" />
    <path d="M5 12v8h14v-8M10 20v-5h4v5" />
  </svg>
);
const SmileIcon = ({ size = 30, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01" strokeWidth={2.2} />
  </svg>
);
const HeadsetIcon = ({ size = 30, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="13" width="4" height="6" rx="1.5" />
    <rect x="17" y="13" width="4" height="6" rx="1.5" />
    <path d="M19 19a3 3 0 0 1-3 3h-3" />
  </svg>
);
const ChartUpIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <path d="M5 20v-4M10 20v-7M15 20v-5M20 20V9" />
    <path d="m4 11 5-4 4 3 7-6" />
  </svg>
);

/* A simple purple "Woo" speech-bubble badge */
export function WooBadge({ className = "", text = "text-[26px]" }: { className?: string; text?: string }) {
  const $t = useCmsText();
  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-[10px] font-extrabold tracking-tight text-white ${text} ${className}`}
      style={{ backgroundColor: WOO_PURPLE }}
    >
      {$t("WooHireHero__t1", "Woo")}<span
        className="absolute -bottom-[7px] left-[22%] h-0 w-0 border-l-[7px] border-r-[3px] border-t-[8px] border-l-transparent border-r-transparent"
        style={{ borderTopColor: WOO_PURPLE }}
      />
    </span>
  );
}

const FEATURES__cms = [
  { Icon: CodeWindowIcon, label: ["Custom WooCommerce", "Development"] },
  { Icon: GaugeIcon, label: ["Performance", "Optimization"] },
  { Icon: PlugIcon, label: ["Theme & Plugin", "Customization"] },
  { Icon: ShieldIcon, label: ["Secure & Scalable", "Solutions"] },
];

const STATS__cms = [
  { Icon: TrophyIcon, value: "10+", label: "Years of Experience" },
  { Icon: StoreIcon, value: "250+", label: "WooCommerce Stores Built" },
  { Icon: SmileIcon, value: "98%", label: "Client Satisfaction" },
  { Icon: HeadsetIcon, value: "24/7", label: "Support & Maintenance" },
];

const CHECKS__cms = ["More Sales", "Better UX", "Faster Stores", "Full Support"];

/* ---------- Right-side visual: laid out on a 760×570 canvas, scaled to fit ---------- */
const CANVAS_W = 760;
const CANVAS_H = 570;

function float(delay = 0, distance = 8) {
  return {
    animate: { y: [0, -distance, 0] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay },
  };
}

// Card entrance: start this far below the resting spot (hidden behind the laptop)
const RISE_FROM = 150;
const RISE = { duration: 1.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
// The checklist card starts rising only after the Woo card has finished.
const CARD1_DELAY = 1.2;
const CARD2_DELAY = CARD1_DELAY + RISE.duration;

function HeroVisual() {
  const $t = useCmsText();
  const CHECKS = useCmsData("WooHireHero__CHECKS", CHECKS__cms);
  const { ref, scale } = useFitScale(CANVAS_W);
  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}>
      <div
        className="absolute left-0 top-0"
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          // zoom (not transform: scale) so the tilted cards' text is re-rendered sharply
          zoom: scale || 1,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {/* Desk scene (blob) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="absolute left-0 top-[8px] w-[760px]"
        >
          <Image src={$t("WooHireHero__t2", "/woo-comm-image2.png")} alt="" width={1477} height={1065} priority sizes="760px" className="h-auto w-full"
            style={{
              // the photo has a white backdrop; fade its rectangular edges into the section
              maskImage:
                "linear-gradient(to right, transparent, #000 7%), linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)",
              maskComposite: "intersect",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 7%), linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)",
              WebkitMaskComposite: "source-in",
            }}
          />
        </motion.div>

        {/* The two cards slide up out from behind the laptop. They sit below the developer
            image in the stacking order and start fully hidden behind it, then appear only
            once that image has faded in. */}
        <motion.div
          className="absolute left-[203px] top-[119px]"
          initial={{ opacity: 0, y: RISE_FROM }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...RISE, delay: CARD1_DELAY, opacity: { duration: 0.01, delay: CARD1_DELAY } }}
        >
          <div>
            <div
              className="relative w-[150px] rounded-2xl bg-white px-5 pb-5 pt-5 shadow-[0_20px_40px_-18px_rgba(15,40,60,0.35)] border border-slate-100"
              style={{ transform: "perspective(700px) rotateY(24deg) rotateX(7deg) rotateZ(-2deg)", transformOrigin: "left center" }}
            >
              <WooBadge className="h-[36px] w-[64px]" text="text-[20px]" />
              <p className={`text-body ${caveat.className} mt-3 font-semibold`} style={{ color: NAVY }}>
                {rich($t("WooHireHero__t3", "Better"))}<br />
                {rich($t("WooHireHero__t4", "Stores"))}<br />
                {rich($t("WooHireHero__t5", "Bigger"))}<br />
                {rich($t("WooHireHero__t6", "Possibilities"))}</p>
              <svg className="absolute right-4 bottom-11" width="26" height="23" viewBox="0 0 34 30" fill="none" aria-hidden>
                <path d="M3 26C10 24 22 18 28 6" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" />
                <path d="M22 8l6-3 1 7" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-[307px] top-[111px]"
          initial={{ opacity: 0, y: RISE_FROM }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...RISE, delay: CARD2_DELAY, opacity: { duration: 0.01, delay: CARD2_DELAY } }}
        >
          <div>
            <ul
              className="w-[112px] rounded-2xl bg-white px-2.5 py-2.5 shadow-[0_20px_40px_-18px_rgba(15,40,60,0.35)] border border-slate-100 flex flex-col gap-1.5"
              style={{ transform: "perspective(700px) rotateY(24deg) rotateX(7deg) rotateZ(-2deg)", transformOrigin: "left center" }}
            >
              {CHECKS.map((c) => (
                <li key={c} className="flex items-center gap-1.5 text-[10.5px] font-medium" style={{ color: NAVY }}>
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full" style={{ backgroundColor: TEAL }}>
                    <CheckIcon size={8} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Developer at laptop */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="absolute left-[118px] top-[76px] w-[590px]"
        >
          <Image
            src={$t("WooHireHero__t7", "/woo-comm-image1.png")}
            alt={$t("WooHireHero__t8", "WooCommerce developer building an online store")}
            width={588}
            height={424}
            priority
            sizes="590px"
            className="h-auto w-full drop-shadow-[0_25px_30px_rgba(15,40,60,0.18)]"
          />
        </motion.div>

        {/* Handwritten note */}
        <div className="absolute left-[572px] top-[24px] w-[160px] text-center">
          <p className={`${caveat.className} text-[24px] font-semibold leading-[1.05] -rotate-[8deg]`} style={{ color: NAVY }}>
            {rich($t("WooHireHero__t9", "Let's Build"))}<br />
            {rich($t("WooHireHero__t10", "Something Great"))}<br />
            {rich($t("WooHireHero__t11", "Together"))}</p>
          <svg className="mx-auto mt-1" width="60" height="44" viewBox="0 0 60 44" fill="none" aria-hidden>
            <path d="M40 2C46 18 34 30 16 38" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" />
            <path d="M22 31l-7 7 9 2" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* "Your Vision" card */}
        <motion.div {...float(1.4, 6)} className="absolute left-[4px] top-[392px]">
          <div className="flex items-end gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_20px_40px_-18px_rgba(15,40,60,0.35)] border border-slate-100">
            <p className="text-small" style={{ color: NAVY }}>
              {rich($t("WooHireHero__t12", "Your Vision"))}<br />
              {rich($t("WooHireHero__t13", "Our Development"))}<br />
              <span className="font-bold" style={{ color: DEEP_TEAL }}>{$t("WooHireHero__t14", "Real Results")}</span>
            </p>
            <ChartUpIcon />
          </div>
        </motion.div>

        {/* Trusted-by card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          className="absolute left-[420px] top-[444px]"
        >
          <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_25px_45px_-18px_rgba(15,40,60,0.4)] border border-slate-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: "#f3eefa" }}>
              <WooBadge className="h-[24px] w-[36px]" text="text-[11.5px]" />
            </span>
            <div className="leading-tight">
              <p className="text-[11px] text-slate-500">{rich($t("WooHireHero__t15", "Trusted by"))}</p>
              <p className="text-[23px] font-extrabold" style={{ color: NAVY }}>{rich($t("WooHireHero__t16", "500+"))}</p>
              <p className="text-[10.5px] text-slate-500">{rich($t("WooHireHero__t17", "Businesses Worldwide"))}</p>
            </div>
            <div className="ml-1 flex -space-x-2">
              {["#f3d2b6", "#d9b08f", "#c69676"].map((c) => (
                <span key={c} className="h-7 w-7 rounded-full ring-2 ring-white" style={{ background: `linear-gradient(160deg, ${c}, #a87856)` }} />
              ))}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-50 text-[15px] font-semibold ring-2 ring-white" style={{ color: TEAL }}>
                +
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function WooHireHero() {
  const $t = useCmsText();
  const FEATURES = useCmsData("WooHireHero__FEATURES", FEATURES__cms);
  const STATS = useCmsData("WooHireHero__STATS", STATS__cms);
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-white via-[#f7fbfb] to-[#eef7f6] pt-10 pb-10 lg:pt-14">
      {/* dotted accent */}
      <svg className="pointer-events-none absolute left-4 top-24 opacity-60" width="40" height="40" viewBox="0 0 40 40" aria-hidden>
        {Array.from({ length: 16 }).map((_, i) => (
          <circle key={i} cx={5 + (i % 4) * 10} cy={5 + Math.floor(i / 4) * 10} r="1.6" fill="#99d5d0" />
        ))}
      </svg>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-8 items-center">
          {/* Left */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50/70 px-3 py-1.5 text-[11px] font-bold tracking-[0.08em] uppercase"
              style={{ color: NAVY }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-teal-100">
                <CartIcon />
              </span>
              {$t("WooHireHero__t18", "WooCommerce Experts You Can Rely On")}</motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-h1 mt-5 font-extrabold tracking-tight"
              style={{ color: NAVY, fontFamily: "var(--font-heading)" }}
            >
              {$t("WooHireHero__t19", "Dedicated")}<br />
              <span className="relative inline-block" style={{ color: TEAL }}>
                {$t("WooHireHero__t20", "WooCommerce")}<svg className="pointer-events-none absolute -bottom-2 left-[30%] h-3 w-[70%]" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 9C60 3 130 2 198 5" fill="none" stroke={TEAL} strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              {$t("WooHireHero__t21", "Developers")}</motion.h1>

            <motion.p variants={fadeUp} className="text-body mt-6 max-w-[480px] text-slate-500">
              {rich($t("WooHireHero__t22", "We build high-performance, scalable and feature-rich WooCommerce stores that"))}{" "}
              <span className="font-semibold" style={{ color: TEAL }}>{$t("WooHireHero__t23", "drive sales")}</span> {rich($t("WooHireHero__t24", "and deliver exceptional shopping experiences."))}</motion.p>

            <motion.ul variants={fadeUp} className="mt-7 grid max-w-[460px] grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {FEATURES.map((f) => (
                <li key={f.label[0]} className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50 border border-teal-100">
                    <f.Icon />
                  </span>
                  <span className="text-[13.5px] font-medium leading-snug" style={{ color: NAVY }}>
                    {f.label[0]}
                    <br />
                    {f.label[1]}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={$t("WooHireHero__t25", "/contact")}
                className="group inline-flex items-center gap-4 rounded-full py-2 pl-2 pr-7 text-[15px] font-semibold text-white shadow-[0_15px_30px_-12px_rgba(13,148,136,0.7)] transition hover:-translate-y-0.5"
                style={{ background: `linear-gradient(90deg, ${DEEP_TEAL}, ${TEAL})` }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
                {$t("WooHireHero__t26", "Get My Free Proposal")}</Link>
              <Link
                href={$t("WooHireHero__t27", "#how-we-work")}
                className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white py-2 pl-2 pr-6 transition hover:border-teal-300"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-200 transition-transform group-hover:scale-105">
                  <PlayIcon />
                </span>
                <span className="leading-tight">
                  <span className="block text-[14px] font-semibold" style={{ color: NAVY }}>{$t("WooHireHero__t28", "See How We Work")}</span>
                  <span className="block text-[11.5px] text-slate-500">{$t("WooHireHero__t29", "Watch 2-min video")}</span>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — on desktop it bleeds past the container to the viewport's right edge */}
          <div className="relative lg:mr-[calc(-1*(max(0px,(100vw-1640px)/2)+1.25rem))]">
            <HeroVisual />
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          className="mt-10 grid grid-cols-2 lg:grid-cols-4 rounded-[22px] border border-slate-100 bg-white/90 shadow-[0_20px_45px_-30px_rgba(15,40,60,0.35)] backdrop-blur"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex items-center justify-center gap-4 px-5 py-5 ${i > 0 ? "lg:border-l lg:border-slate-100" : ""} ${i % 2 === 1 ? "border-l border-slate-100" : ""} ${i > 1 ? "border-t lg:border-t-0 border-slate-100" : ""}`}
            >
              <s.Icon />
              <div className="leading-tight">
                <p className="text-[24px] font-extrabold" style={{ color: NAVY }}>{s.value}</p>
                <p className="text-caption text-slate-500">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
