"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "./Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const PURPLE = "#7f54b3";
const PURPLE_SOFT = "#f3edfa";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* Timeline: the line draws top→bottom, and each point (dot + card) appears as the line reaches it. */
const STEP = 0.55; // seconds between points
const timelineLine: Variants = {
  hidden: { scaleY: 0 },
  show: (count: number) => ({ scaleY: 1, transition: { duration: (count - 1) * STEP, ease: "linear" } }),
};
const timelineDot: Variants = {
  hidden: { scale: 0 },
  show: (i: number) => ({ scale: [0, 1.5, 1], transition: { duration: 0.45, delay: i * STEP, ease: "easeOut" } }),
};
const timelineRing: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  // keyframes start at 0 opacity: framer applies the first keyframe during the delay
  show: (i: number) => ({
    scale: [0.6, 0.6, 2.6],
    opacity: [0, 0.6, 0],
    transition: { duration: 0.8, delay: i * STEP, times: [0, 0.05, 1], ease: "easeOut" },
  }),
};
const timelineCard: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: (i: number) => ({ opacity: 1, x: 0, transition: { duration: 0.6, delay: i * STEP + 0.05, ease: EASE } }),
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

const StarIcon = ({ size = 12, color = "#fff" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2.5 14.9 8.6 21.5 9.3 16.6 13.8 18 20.4 12 17 6 20.4 7.4 13.8 2.5 9.3 9.1 8.6Z" />
  </svg>
);
const DesignIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 20l4-1L19 8a2.1 2.1 0 0 0-3-3L5 16Z" />
    <path d="M14 7l3 3M4 4l4 4M3 9l3-3" />
  </svg>
);
const CursorIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M5 3l14 7-6 1.8L10.5 18Z" />
    <path d="m13 11.8 5 5" />
  </svg>
);
const ScaleIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 20h16" />
    <rect x="5" y="13" width="3" height="5" rx="0.6" />
    <rect x="10.5" y="9" width="3" height="9" rx="0.6" />
    <rect x="16" y="5" width="3" height="13" rx="0.6" />
  </svg>
);
const ShieldIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 3 19.5 6V11.5C19.5 16.8 16 20 12 21.5 8 20 4.5 16.8 4.5 11.5V6Z" />
    <path d="m8.7 12.2 2.2 2.1 4.4-4.8" />
  </svg>
);
const HeadsetIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="13" width="4" height="6" rx="1.5" />
    <rect x="17" y="13" width="4" height="6" rx="1.5" />
    <path d="M19 19a3 3 0 0 1-3 3h-3" />
  </svg>
);
const ArrowIcon = ({ size = 15, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const REASONS__cms = [
  { Icon: DesignIcon, title: "Contemporary Design", desc: "Modern, user-centric designs that reflect your brand personality and leave a lasting impression." },
  { Icon: CursorIcon, title: "Smooth Navigation", desc: "Intuitive layouts and seamless navigation that keep visitors engaged and coming back." },
  { Icon: ScaleIcon, title: "Totally Scalable", desc: "Future-ready solutions built to scale with your business and adapt to evolving needs." },
  { Icon: ShieldIcon, title: "High Level Security", desc: "Robust security measures to protect your store and customer data from online threats." },
  { Icon: HeadsetIcon, title: "24X7 Technical Support", desc: "Round-the-clock support from our experts to keep your store running smoothly." },
];

/* ---------- Product illustrations ---------- */
export function Sneaker() {
  return (
    <svg viewBox="0 0 120 64" className="h-full w-full drop-shadow-[0_10px_8px_rgba(15,40,60,0.18)]" aria-hidden>
      <path d="M8 44c0-8 4-14 10-16l18-6c6-2 10-8 14-12 3 0 6 2 8 5 4 6 12 10 22 12 14 3 24 8 26 14v5H8Z" fill="#ffffff" stroke="#8d97a5" strokeWidth="1.5" />
      <path d="M8 49h98v5c0 2-2 3-4 3H12c-2 0-4-1-4-3Z" fill="#cfd5dc" stroke="#8d97a5" strokeWidth="1.2" />
      <path d="M40 24l6 8M47 20l6 8M54 17l5 8" stroke="#5b6573" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M58 36c14 2 30 2 42 4" stroke={PURPLE} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M10 44h96" stroke="#b6bec8" strokeWidth="1" />
    </svg>
  );
}
export function Hoodie() {
  return (
    <svg viewBox="0 0 60 60" className="h-full w-full" aria-hidden>
      <path d="M22 10c2-4 14-4 16 0l12 8-4 10-5-3v28H19V25l-5 3-4-10Z" fill={PURPLE} />
      <path d="M24 10c2 6 10 6 12 0" fill="none" stroke="#5b3a8c" strokeWidth="2" />
      <rect x="24" y="36" width="12" height="7" rx="2" fill="#6a45a0" />
    </svg>
  );
}
export function Plant() {
  return (
    <svg viewBox="0 0 80 110" className="h-full w-full" aria-hidden>
      <path d="M40 70C38 50 20 40 8 42c4 14 18 22 32 28Z" fill="#4c8b5a" />
      <path d="M40 70C42 46 58 30 74 30c-2 18-16 32-34 40Z" fill="#5fa36d" />
      <path d="M40 70C36 40 40 18 52 6c6 18 0 44-12 64Z" fill="#3f7a4d" />
      <path d="M22 70h36l-5 36H27Z" fill="#f4f1ec" stroke="#e2ddd4" />
    </svg>
  );
}

/* ---------- Left visual: WooCommerce store mockup ---------- */
function StoreVisual() {
  const $t = useCmsText();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <Image
        src={$t("WooWhyHire__t1", "/WooCommerce2.webp")}
        alt={$t("WooWhyHire__t2", "WooCommerce store on a tablet with a 5.0 rating, shopping bag and parcels")}
        width={1474}
        height={1067}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="h-auto w-full"
      />
    </motion.div>
  );
}

export default function WooWhyHire() {
  const $t = useCmsText();
  const REASONS = useCmsData("WooWhyHire__REASONS", REASONS__cms);
  return (
    <section className="relative w-full overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <Container>
        {/* Heading block */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto flex max-w-[860px] flex-col items-center text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-purple-100 py-1 pl-1 pr-4 text-[11.5px] font-bold uppercase tracking-[0.08em]"
            style={{ backgroundColor: PURPLE_SOFT, color: "#5b3a8c" }}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: PURPLE }}>
              <StarIcon />
            </span>
            {$t("WooWhyHire__t3", "Built for growth. Designed to convert.")}</motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-h2 mt-5 font-extrabold tracking-tight"
            style={{ color: NAVY }}
          >
            {$t("WooWhyHire__t4", "Why Hire ")}<span style={{ color: PURPLE }}>{$t("WooWhyHire__t5", "Woo-commerce")}</span>
            <br />
            {$t("WooWhyHire__t6", "Developers")}{" "}
            <span className="relative inline-block">
              {$t("WooWhyHire__t7", "from Us?")}<svg className="pointer-events-none absolute -bottom-2.5 left-0 h-3 w-[88%]" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
                <path d="M3 9C60 3 140 2 197 6" fill="none" stroke={TEAL} strokeWidth="3.2" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-small mt-7 text-slate-600">
            {rich($t("WooWhyHire__t8", "It takes lots of skills and experience to develop an ecommerce website. However, a good looking online store is not enough to attract customers and to provide a wonderful shopping experience to them. Our WooCommerce developers at ProManage IT Solution give all this, and much more to you when you hire them to make your ecommerce website."))}</motion.p>
        </motion.div>

        {/* Visual + reasons */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-8 items-center">
          <StoreVisual />

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex flex-col gap-3.5"
          >
            {/* dotted timeline, drawn from the top down */}
            <motion.span
              variants={timelineLine}
              custom={REASONS.length}
              className="absolute left-[7px] top-[46px] bottom-[46px] origin-top border-l-2 border-dotted border-teal-400"
              aria-hidden
            />
            {REASONS.map((r, i) => (
              <li key={r.title} className="relative flex items-center gap-4 pl-7">
                <span className="absolute left-[2px] top-1/2 -translate-y-1/2" aria-hidden>
                  <motion.span
                    variants={timelineRing}
                    custom={i}
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: TEAL }}
                  />
                  <motion.span
                    variants={timelineDot}
                    custom={i}
                    className="relative block h-3 w-3 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: TEAL }}
                  />
                </span>
                <motion.div
                  variants={timelineCard}
                  custom={i}
                  className="group flex flex-1 items-center gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3.5 shadow-[0_15px_35px_-28px_rgba(15,40,60,0.45)] transition-[border-color,box-shadow] hover:border-teal-200 hover:shadow-[0_18px_35px_-24px_rgba(13,148,136,0.45)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-50 border border-teal-100 transition-colors group-hover:bg-teal-100">
                    <r.Icon />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-bold" style={{ color: NAVY }}>{r.title}</h3>
                    <p className="text-caption mt-0.5 text-slate-500">{r.desc}</p>
                  </div>
                  <span className="hidden sm:block text-[26px] font-light text-slate-200">{String(i + 1).padStart(2, "0")}</span>
                </motion.div>
              </li>
            ))}
          </motion.ol>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 flex flex-col lg:flex-row items-center gap-5 lg:gap-8 rounded-[22px] border border-teal-100/70 bg-gradient-to-r from-[#f1faf8] to-[#f7fbfa] px-6 py-5 sm:px-8"
        >
          <div className="flex items-center gap-4 shrink-0">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-teal-100">
              <svg {...base(22, TEAL, 1.6)}>
                <path d="M12 2.5 14.9 8.6 21.5 9.3 16.6 13.8 18 20.4 12 17 6 20.4 7.4 13.8 2.5 9.3 9.1 8.6Z" />
              </svg>
            </span>
            <div>
              <p className="text-body font-bold" style={{ color: NAVY }}>{rich($t("WooWhyHire__t9", "We build more than just online stores"))}</p>
              <p className="text-caption" style={{ color: TEAL }}>{rich($t("WooWhyHire__t10", "We build growth engines for your business."))}</p>
            </div>
          </div>
          <span className="hidden lg:block h-12 w-px bg-teal-100" />
          <p className="text-small flex-1 text-center lg:text-left text-slate-600">
            {rich($t("WooWhyHire__t11", "From stunning design to powerful functionality, we deliver optimized WooCommerce stores that drive traffic, boost sales and create happy customers."))}</p>
          <Link
            href={$t("WooWhyHire__t12", "/contact")}
            className="group inline-flex shrink-0 items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[14px] font-semibold text-white shadow-[0_15px_30px_-14px_rgba(13,148,136,0.75)] transition hover:-translate-y-0.5"
            style={{ background: `linear-gradient(90deg, ${DEEP_TEAL}, ${TEAL})` }}
          >
            {$t("WooWhyHire__t13", "Let's Build Your Store")}<span className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-transform group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
