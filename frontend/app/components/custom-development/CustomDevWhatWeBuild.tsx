"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

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

/* ------------------------------------------------------------------ */
/* Small badge icons (top of each card)                                */
/* ------------------------------------------------------------------ */
const MonitorBadge = ({ size = 20, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);
const CartBadge = ({ size = 20, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="9" cy="20" r="1.2" fill={color} stroke="none" />
    <circle cx="18" cy="20" r="1.2" fill={color} stroke="none" />
    <path d="M2.5 3h2l2.2 11.5a2 2 0 0 0 2 1.6h8a2 2 0 0 0 2-1.6L21 7H6" />
  </svg>
);
const PhoneBadge = ({ size = 20, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </svg>
);
const GearBadge = ({ size = 20, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.5-2-3.4-2.4 1a7.6 7.6 0 0 0-1.7-1L15 3.5h-4l-.3 2.6a7.6 7.6 0 0 0-1.7 1l-2.4-1-2 3.4L6.6 11a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a7.6 7.6 0 0 0 1.7 1l.3 2.6h4l.3-2.6a7.6 7.6 0 0 0 1.7-1l2.4 1 2-3.4Z" />
  </svg>
);
const CloudBadge = ({ size = 20, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M7 18a4.5 4.5 0 0 1-1-8.9 5.5 5.5 0 0 1 10.6-1.5A4.5 4.5 0 0 1 17 18Z" />
  </svg>
);

const ArrowIcon = ({ size = 16, color = "#94a3b8", flip = false }: IconProps & { flip?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={flip ? { transform: "scaleX(-1)" } : undefined}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const RocketIcon = ({ size = 20, color = "#fff" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M14.5 9.5c2-2 2.3-5 2.1-6.6-1.6-.2-4.6.1-6.6 2.1-1.6 1.6-3.6 4.4-4.7 6.3a2 2 0 0 0 .3 2.4l1.2 1.2a2 2 0 0 0 2.4.3c1.9-1.1 4.7-3.1 6.3-4.7Z" />
    <circle cx="13.5" cy="7.5" r="1.4" />
    <path d="M7.5 14.5 5 17M6 20c-1-.5-1.5-1-2-2 1.5-1 3-1 4 .5M4 18c-.5-1-.5-1.5-.5-2.5 1.5-.5 2.5 0 3 1" />
  </svg>
);
const ChatBubbleIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  </svg>
);
const PencilIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);
const CodeIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);

const ITEMS__cms = [
  { Badge: MonitorBadge, title: "Business Management Systems", desc: "Streamline operations and manage your entire business from one place.", image: "/shopify-icon1.webp" },
  { Badge: CartBadge, title: "E-commerce & Marketplace Solutions", desc: "Powerful, secure and scalable platforms that grow with your business.", image: "/shopify-icon2.webp" },
  { Badge: PhoneBadge, title: "Customer-Facing Applications", desc: "Engaging digital experiences that your customers will love.", image: "/shopify-icon3.webp" },
  { Badge: GearBadge, title: "Workflow & Process Automation", desc: "Automate repetitive tasks and make your workflows smarter.", image: "/shopify-icon4.webp" },
  { Badge: CloudBadge, title: "Enterprise-Grade Solutions", desc: "Robust, secure and scalable software built for the long run.", image: "/shopify-icon5.webp" },
  // Dummy 6th card — just here so the row overflows and the carousel arrows have something to
  // actually scroll on wide screens where 5 cards alone would already fit.
  { Badge: MonitorBadge, title: "Something Custom in Mind?", desc: "Tell us what you need — we'll build a solution tailored exactly to your business.", image: "/shopify-icon1.webp" },
];

const PROCESS_STEPS__cms = [
  { Icon: ChatBubbleIcon, label: "Understand Your Goal" },
  { Icon: PencilIcon, label: "Plan & Design Your Solution" },
  { Icon: CodeIcon, label: "Build & Deliver With Excellence" },
];

export default function CustomDevWhatWeBuild() {
  const $t = useCmsText();
  const ITEMS = useCmsData("CustomDevWhatWeBuild__ITEMS", ITEMS__cms);
  const PROCESS_STEPS = useCmsData("CustomDevWhatWeBuild__PROCESS_STEPS", PROCESS_STEPS__cms);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scrollBy = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 266, behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-[#f8fafc] py-8 sm:py-10 lg:py-12 overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full" style={{ backgroundColor: "#e6f6f4", color: TEAL }}>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: TEAL }} />
            {$t("CustomDevWhatWeBuild__t1", "What We Build")}<span className="w-1 h-1 rounded-full" style={{ backgroundColor: TEAL }} />
          </span>
          <h2 className="text-h2 mt-5 font-serif font-bold" style={{ color: NAVY }}>
            {$t("CustomDevWhatWeBuild__t2", "Custom Software for")}<br />
            <span style={{ color: TEAL }}>{$t("CustomDevWhatWeBuild__t3", "Real Business Needs.")}</span>
          </h2>
          <p className="text-body mt-4 text-slate-500">
            {rich($t("CustomDevWhatWeBuild__t4", "From internal tools to customer-facing platforms, we build secure, scalable and future-ready software that solves real problems."))}</p>
        </motion.div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            aria-label="Scroll left"
            className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-300 shadow-[0_8px_24px_-6px_rgba(15,23,42,0.25)] text-slate-600 transition-colors disabled:opacity-0 disabled:pointer-events-none hover:bg-[#0f5c56] hover:text-white hover:border-[#0f5c56]"
          >
            <ArrowIcon flip color="currentColor" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="Scroll right"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full shadow-[0_8px_24px_-6px_rgba(15,92,86,0.5)] transition-opacity disabled:opacity-0 disabled:pointer-events-none hover:opacity-90"
            style={{ backgroundColor: DEEP_TEAL }}
          >
            <ArrowIcon color="#fff" />
          </button>

          <div ref={scrollerRef} className="flex gap-6 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth snap-x snap-mandatory px-1 pb-2">
            {ITEMS.map((item, i) => (
              <div key={item.title} className="relative shrink-0 w-[230px] sm:w-[248px] snap-start">
                {i < ITEMS.length - 1 && (
                  <span className="hidden lg:flex absolute top-[22px] -right-6 w-6 h-5 items-center z-0" aria-hidden>
                    <svg width="24" height="20" viewBox="0 0 24 20" fill="none" className="overflow-visible">
                      <motion.path
                        d="M0 4 C 8 4, 8 16, 16 16"
                        stroke={TEAL}
                        strokeWidth="1.5"
                        strokeDasharray="2.5 3.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.7 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: "easeInOut" }}
                      />
                    </svg>
                  </span>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                  className="relative z-10 bg-white rounded-[42px] border border-slate-100 shadow-[0_15px_35px_-20px_rgba(15,40,60,0.3)] p-6 flex flex-col items-center text-center h-full"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full mb-4" style={{ backgroundColor: "#e6f6f4" }}>
                    <item.Badge />
                  </span>
                  <h3 className="text-[14px] font-bold leading-snug" style={{ color: NAVY }}>{item.title}</h3>
                  <p className="text-caption text-slate-500 mt-2">{item.desc}</p>
                  <div className="relative w-full h-[120px] mt-5">
                    <Image src={item.image} alt="" fill sizes="250px" className="object-contain" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-10 lg:mt-12 rounded-2xl bg-white border border-slate-100 shadow-[0_15px_40px_-25px_rgba(15,40,60,0.2)] p-5 sm:p-6 flex flex-col xl:flex-row items-center gap-6 xl:gap-8"
        >
          {/* Rocket + copy */}
          <div className="flex items-center gap-4 flex-1 min-w-0 w-full xl:w-auto">
            <div className="relative shrink-0 flex h-14 w-14 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-dashed" style={{ borderColor: "#0d948855" }} />
              <span className="absolute inset-0 scale-[1.3] rounded-full border border-dashed opacity-40" style={{ borderColor: TEAL }} />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: DEEP_TEAL }}>
                <RocketIcon />
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] sm:text-base font-bold leading-snug" style={{ color: NAVY }}>
                {$t("CustomDevWhatWeBuild__t5", "Got an idea? Let's build it together.")}</h3>
              <p className="text-caption text-slate-500 mt-1">
                {rich($t("CustomDevWhatWeBuild__t6", "Share your requirements and we'll turn it into a powerful software solution."))}</p>
            </div>
          </div>

          {/* 3-step process */}
          <div className="hidden lg:flex items-center divide-x divide-slate-100 shrink-0">
            {PROCESS_STEPS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5 px-4 xl:px-5 text-center w-[110px]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "#e6f6f4" }}>
                  <s.Icon />
                </span>
                <span className="text-[11px] font-semibold leading-tight" style={{ color: NAVY }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTA + trust */}
          <div className="flex flex-col items-center xl:items-end gap-2.5 shrink-0 w-full xl:w-auto">
            <Link
              href={$t("CustomDevWhatWeBuild__t7", "/contact")}
              className="group inline-flex items-center gap-3 rounded-full pl-5 pr-1.5 py-1.5 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: DEEP_TEAL }}
            >
              {$t("CustomDevWhatWeBuild__t8", "Start Your Project")}<span className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform group-hover:translate-x-0.5">
                <ArrowIcon color={DEEP_TEAL} />
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <span key={i} className="h-6 w-6 rounded-full ring-2 ring-white bg-slate-200" />
                ))}
              </div>
              <span className="text-[11px] text-slate-500 whitespace-nowrap">{$t("CustomDevWhatWeBuild__t9", "Trusted by 500+ businesses")}</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
