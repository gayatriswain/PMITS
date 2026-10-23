"use client";

import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import { motion, type Variants } from "framer-motion";
import Container from "./Container";
import { useFitScale } from "./useFitScale";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

const NAVY = "#132a43";
const PURPLE = "#7f54b3";
const PURPLE_DARK = "#5b3a8c";
const PURPLE_SOFT = "#f3edfa";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type IconProps = { size?: number; color?: string };
const base = (size: number, color: string, strokeWidth = 1.8) => ({
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
const ShieldIcon = ({ size = 18, color = PURPLE }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 3 19.5 6V11.5C19.5 16.8 16 20 12 21.5 8 20 4.5 16.8 4.5 11.5V6Z" />
    <path d="m8.7 12.2 2.2 2.1 4.4-4.8" />
  </svg>
);
const UserIcon = ({ size = 18, color = PURPLE }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </svg>
);
const CartIcon = ({ size = 18, color = PURPLE }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M3 4h2.5l2.2 11h10.8l2-8H7" />
    <circle cx="9.5" cy="19" r="1.3" />
    <circle cx="17" cy="19" r="1.3" />
  </svg>
);
const ThumbIcon = ({ size = 18, color = PURPLE }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M7 10v11H4V10Z" />
    <path d="M7 10l4-7a2.5 2.5 0 0 1 3 3l-1 4h6a2 2 0 0 1 2 2.3l-1.4 7A2 2 0 0 1 17.6 21H7" />
  </svg>
);
const RocketIcon = ({ size = 18, color = PURPLE }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const BoltIcon = ({ size = 26, color = PURPLE }: IconProps) => (
  <svg {...base(size, color, 1.6)}>
    <path d="M13.5 2 4.5 13.5h7L10 22l9.5-12h-7Z" />
  </svg>
);
const BarsIcon = ({ size = 26, color = PURPLE }: IconProps) => (
  <svg {...base(size, color, 1.6)}>
    <rect x="4" y="13" width="4" height="7" rx="1" />
    <rect x="10" y="8" width="4" height="12" rx="1" />
    <rect x="16" y="4" width="4" height="16" rx="1" />
  </svg>
);
const HeadsetIcon = ({ size = 26, color = PURPLE }: IconProps) => (
  <svg {...base(size, color, 1.6)}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="13" width="4" height="6" rx="1.5" />
    <rect x="17" y="13" width="4" height="6" rx="1.5" />
    <path d="M19 19a3 3 0 0 1-3 3h-3" />
  </svg>
);
const PhoneIcon = ({ size = 26, color = PURPLE }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1Z" />
  </svg>
);
const ArrowIcon = ({ size = 15, color = PURPLE }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const POINTS = [
  {
    Icon: ShieldIcon,
    text: "Hiring qualified and experienced developers and not freelancers means your online store never experiences downtime. It also means all your projects are finished on time.",
  },
  {
    Icon: UserIcon,
    text: "With a freelancer, you are not sure if they would be available for your next project. But when you choose ProManage IT Solution, you get dedicated WooCommerce developers who are always available on an hourly, monthly, contractual, or permanent basis. Our developers are not only knowledgeable but they also have access to all the resources at our disposal to solve the issues of the client.",
  },
  {
    Icon: CartIcon,
    text: "Our WooCommerce development services have been used by customers in all industries and sizes. Apart from start ups, our developers have also designed and developed Ecommerce portals for established players in healthcare, education, finance, travel, lifestyle, and many other spheres of economy.",
  },
  {
    Icon: ThumbIcon,
    text: "Most of the clients of ProManage IT Solution are doing fairly well and if they face any difficulty, they are most welcome to get these issues sorted out by our developers.",
  },
  {
    Icon: RocketIcon,
    text: "ProManage IT Solution provides very cost effective WooCommerce development solutions to its customers. At down to earth prices, you stand to receive all the benefits that one expects from a global IT company. Call us today to learn how we can help you through WooCommerce development services.",
  },
];

const PROMISES = [
  { Icon: ShieldIcon, title: "Secure & Reliable", desc: "Your store is in safe hands." },
  { Icon: BoltIcon, title: "Fast & Scalable", desc: "Built for speed and growth." },
  { Icon: BarsIcon, title: "Results Driven", desc: "Better stores. Higher sales." },
  { Icon: HeadsetIcon, title: "24X7 Support", desc: "We're here anytime you need us." },
];

/* Right visual: 600×450 canvas, zoomed to fit */
const CANVAS_W = 600;
const CANVAS_H = 450;

function CommitmentVisual() {
  const { ref, scale } = useFitScale(CANVAS_W);
  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}>
      <div
        className="absolute left-0 top-0"
        style={{ width: CANVAS_W, height: CANVAS_H, zoom: scale || 1, visibility: scale ? "visible" : "hidden" }}
      >
        {/* Laptop store mockup with plant and Woo bag */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src="/WooCommerce3.webp"
            alt="WooCommerce store on a laptop with a plant and a Woo shopping bag"
            width={1448}
            height={1086}
            sizes="(min-width: 1024px) 600px, 100vw"
            className="h-auto w-full"
          />
        </motion.div>

        {/* Growing your business card */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
          className="absolute left-[452px] top-[150px] flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-[0_18px_35px_-18px_rgba(30,20,60,0.45)] ring-1 ring-purple-50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: PURPLE_SOFT }}>
            <BarsIcon size={20} />
          </span>
          <p className="text-[11px] font-bold leading-tight" style={{ color: NAVY }}>
            Growing
            <br />
            Your Business
            <br />
            <span style={{ color: PURPLE }}>is Our Goal!</span>
          </p>
        </motion.div>

      </div>
    </div>
  );
}

export default function WooCommitment() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-[#faf8fd] py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-12 items-start">
          {/* Left: heading + points */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-purple-100 py-1 pl-1 pr-4 text-[11.5px] font-bold uppercase tracking-[0.08em]"
              style={{ backgroundColor: PURPLE_SOFT, color: PURPLE_DARK }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: PURPLE }}>
                <StarIcon />
              </span>
              Your success. Our commitment.
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-5 text-[30px] sm:text-[38px] lg:text-[42px] font-extrabold leading-[1.15] tracking-tight"
              style={{ color: NAVY }}
            >
              Build Powerful Stores.
              <br />
              Delivered with <span style={{ color: PURPLE }}>Commitment.</span>
            </motion.h2>

            <ol className="relative mt-8 flex flex-col gap-6">
              <span className="absolute left-[19px] top-6 bottom-6 w-px bg-purple-100" aria-hidden />
              {POINTS.map((p) => (
                <motion.li key={p.text.slice(0, 24)} variants={fadeUp} className="relative flex items-start gap-4">
                  <span
                    className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-purple-100 bg-white shadow-[0_8px_18px_-10px_rgba(91,58,140,0.45)]"
                  >
                    <p.Icon />
                  </span>
                  <p className="pt-1 text-[13.5px] leading-[1.75] text-slate-600">{p.text}</p>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          {/* Right: visual + promises */}
          <div className="lg:pt-10">
            <CommitmentVisual />
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="relative -mt-2 grid grid-cols-2 sm:grid-cols-4 rounded-2xl border border-slate-100 bg-white shadow-[0_25px_50px_-30px_rgba(30,20,60,0.35)]"
            >
              {PROMISES.map((p, i) => (
                <motion.li
                  key={p.title}
                  variants={fadeUp}
                  className={`flex flex-col items-center px-3 py-5 text-center ${i > 0 ? "sm:border-l border-slate-100" : ""} ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""}`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: PURPLE_SOFT }}>
                    <p.Icon size={24} />
                  </span>
                  <p className="mt-3 text-[13.5px] font-bold" style={{ color: NAVY }}>{p.title}</p>
                  <p className="mt-1 max-w-[130px] text-[12px] leading-snug text-slate-500">{p.desc}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative mt-12 flex flex-col md:flex-row items-center gap-5 md:gap-7 overflow-hidden rounded-[24px] px-6 py-6 sm:px-10"
          style={{ background: "linear-gradient(90deg, #f1eafa 0%, #f6f1fc 55%, #efe7fa 100%)" }}
        >
          <svg className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-50" viewBox="0 0 300 120" preserveAspectRatio="none" fill="none" aria-hidden>
            <path d="M0 120C80 60 180 100 300 20" stroke="#d9c6f2" strokeWidth="1.2" />
            <path d="M40 120C110 70 200 110 300 50" stroke="#e5d8f6" strokeWidth="1" />
          </svg>
          <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_12px_25px_-12px_rgba(91,58,140,0.5)]">
            <PhoneIcon />
          </span>
          <div className="relative flex-1 text-center md:text-left">
            <p className="text-[22px] sm:text-[26px] font-extrabold tracking-tight" style={{ color: NAVY }}>
              Let&apos;s Build Something{" "}
              <span className={`${caveat.className} relative inline-block text-[32px] font-bold`} style={{ color: PURPLE }}>
                Great
                <svg className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 6C30 2 70 2 98 4" fill="none" stroke={PURPLE} strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              Together!
            </p>
            <p className="mt-1 text-[13.5px] text-slate-600">
              Call us today to learn how we can help you through WooCommerce development services.
            </p>
          </div>
          <Link
            href="/contact"
            className="group relative inline-flex shrink-0 items-center gap-4 rounded-xl py-2 pl-7 pr-2 text-[15px] font-semibold text-white shadow-[0_18px_35px_-14px_rgba(91,58,140,0.75)] transition hover:-translate-y-0.5"
            style={{ background: `linear-gradient(90deg, ${PURPLE_DARK}, ${PURPLE})` }}
          >
            Let&apos;s Get Started
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-transform group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
