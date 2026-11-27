"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
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

const TrophyIcon = ({ size = 14, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0Z" />
    <path d="M8 5H5a2 2 0 0 0 0 4h1M16 5h3a2 2 0 0 1 0 4h-1" />
    <path d="M12 13v3M9 21h6M10 17h4v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2Z" />
  </svg>
);
const FastCartIcon = ({ size = 40, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.6)}>
    <path d="M7 5h2l2.2 10.5h8.3l1.9-7.5H10" />
    <circle cx="12.5" cy="19" r="1.3" />
    <circle cx="18" cy="19" r="1.3" />
    <path d="M1.5 8h4M2.5 11h3.5M1.5 14h5" />
  </svg>
);
const PeopleIcon = ({ size = 40, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.6)}>
    <circle cx="12" cy="7.5" r="2.6" />
    <circle cx="5.5" cy="9" r="2.1" />
    <circle cx="18.5" cy="9" r="2.1" />
    <path d="M7.5 18.5c0-2.6 2-4.6 4.5-4.6s4.5 2 4.5 4.6M1.5 18c0-2.2 1.7-3.9 3.8-3.9 1 0 1.8.3 2.5.8M22.5 18c0-2.2-1.7-3.9-3.8-3.9-1 0-1.8.3-2.5.8" />
  </svg>
);
const BoltIcon = ({ size = 40, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.6)}>
    <path d="M13.5 2 4.5 13.5h7L10 22l9.5-12h-7Z" />
  </svg>
);
const ShieldIcon = ({ size = 40, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.6)}>
    <path d="M12 2.5 20 5.8v5.9c0 5.3-3.6 8.6-8 10.3-4.4-1.7-8-5-8-10.3V5.8Z" />
    <path d="m8.3 12.1 2.6 2.5 4.9-5.3" />
  </svg>
);
const GrowthIcon = ({ size = 40, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.6)}>
    <path d="M4 21h17" />
    <rect x="5" y="15" width="3" height="4" rx="0.6" />
    <rect x="10.5" y="12" width="3" height="7" rx="0.6" />
    <rect x="16" y="9" width="3" height="10" rx="0.6" />
    <path d="m4 11 5-4 4 2.5L20 3" />
    <path d="M16 3h4v4" />
  </svg>
);
const RocketIcon = ({ size = 18, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 1.8)}>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
  </svg>
);
const ArrowIcon = ({ size = 16, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const REASONS__cms = [
  { Icon: FastCartIcon, title: "Ecommerce Expertise", desc: "Build high-performing WooCommerce stores" },
  { Icon: PeopleIcon, title: "Happy Clients", desc: "A long list of satisfied customers" },
  { Icon: BoltIcon, title: "High Sales Results", desc: "Turn visitors into loyal buyers" },
  { Icon: ShieldIcon, title: "Reliable & Secure", desc: "Built with WordPress + WooCommerce" },
  { Icon: GrowthIcon, title: "Scalable Solutions", desc: "Grow your business without limits" },
];

/* Minimal mint wave background (waves, WordPress mark, shopping bag) */
function Decorations() {
  const $t = useCmsText();
  return (
    <Image
      src={$t("WooWhy__t1", "/Minimal%20Mint%20Tech%20Wave%20Banner.webp")}
      alt=""
      fill
      sizes="100vw"
      className="pointer-events-none object-cover object-center"
      aria-hidden
    />
  );
}

export default function WooWhy() {
  const $t = useCmsText();
  const REASONS = useCmsData("WooWhy__REASONS", REASONS__cms);
  const [active, setActive] = useState(2);

  return (
    <section className="relative w-full overflow-hidden bg-[#f3fbfa] pt-8 sm:pt-10 pb-16 sm:pb-20">
      <Decorations />

      <Container className="relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="hidden sm:block h-px w-16 bg-gradient-to-r from-transparent to-teal-300" />
            <span
              className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-1.5 text-[13px] font-semibold"
              style={{ color: DEEP_TEAL }}
            >
              <TrophyIcon /> {html($t("WooWhy__t2", "Why WooCommerce?"))}</span>
            <span className="hidden sm:block h-px w-16 bg-gradient-to-l from-transparent to-teal-300" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-h2 mt-5 font-extrabold tracking-tight"
            style={{ color: NAVY }}
          >
            {$t("WooWhy__t3", "More Than Just a Website —")}<br />
            <span style={{ color: TEAL }}>
              {html($t("WooWhy__t4", "A Powerful"))}{" "}
              <span className="relative inline-block">
                {html($t("WooWhy__t5", "Online"))}<svg className="pointer-events-none absolute -bottom-3 left-[-6%] h-4 w-[112%]" viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden>
                  <path d="M3 11C60 3 140 2 197 7" fill="none" stroke={TEAL} strokeWidth="3.2" strokeLinecap="round" />
                  <path d="M30 15C80 9 130 8 170 11" fill="none" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
                </svg>
              </span>{" "}
              {html($t("WooWhy__t6", "Store"))}</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-body mt-8 max-w-[880px] text-slate-600">
            {rich($t("WooWhy__t7", "If WooCommerce is creating a buzz because of its ability as an ecommerce plugin, the developers at ProManage IT Solution are regarded as the best WooCommerce developers. We have a long list of happy and satisfied clients enjoying high amount of sales from their ecommerce websites with our help."))}</motion.p>

          {/* Reason cards */}
          <motion.ul
            variants={stagger}
            className="mt-10 grid w-full max-w-[1320px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5"
            onMouseLeave={() => setActive(2)}
          >
            {REASONS.map((r, i) => {
              const isActive = i === active;
              return (
                <motion.li
                  key={r.title}
                  variants={fadeUp}
                  onMouseEnter={() => setActive(i)}
                  className={`group relative flex flex-col items-center rounded-2xl border bg-white px-5 pb-6 pt-7 text-center transition-all duration-300 ${
                    isActive
                      ? "-translate-y-1.5 border-teal-300 shadow-[0_22px_45px_-20px_rgba(13,148,136,0.55)]"
                      : "border-slate-100 shadow-[0_15px_35px_-25px_rgba(15,40,60,0.35)]"
                  } ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <span
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300 ${
                      isActive ? "bg-teal-50" : "bg-transparent"
                    }`}
                  >
                    <r.Icon />
                  </span>
                  <h3 className="mt-4 text-[14.5px] font-bold" style={{ color: NAVY }}>{r.title}</h3>
                  <p className="text-caption mt-1.5 max-w-[170px] text-slate-500">{r.desc}</p>
                  <span
                    className="mt-4 block h-[3px] rounded-full transition-all duration-300"
                    style={{ backgroundColor: TEAL, width: isActive ? 40 : 28 }}
                  />
                </motion.li>
              );
            })}
          </motion.ul>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-3">
            <Link
              href={$t("WooWhy__t8", "/contact")}
              className="group inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_18px_35px_-14px_rgba(13,148,136,0.75)] transition hover:-translate-y-0.5"
              style={{ background: `linear-gradient(90deg, ${DEEP_TEAL}, ${TEAL})` }}
            >
              <RocketIcon />
              {$t("WooWhy__t9", "Build Your WooCommerce Store")}<span className="transition-transform group-hover:translate-x-1"><ArrowIcon /></span>
            </Link>
            <p className="text-small text-slate-600">{rich($t("WooWhy__t10m", "Better Design. <span class=\"font-bold text-[#0d9488]\">Higher Sales.</span> Stronger Business."))}</p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
