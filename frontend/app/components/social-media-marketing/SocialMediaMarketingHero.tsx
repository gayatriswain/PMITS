"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#0d9488";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function StarIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#f59e0b">
      <path d="M12 2.5 L14.9 8.6 L21.5 9.3 L16.6 13.8 L18 20.4 L12 17 L6 20.4 L7.4 13.8 L2.5 9.3 L9.1 8.6 Z" />
    </svg>
  );
}

function PlayIcon({ size = 9 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

const STATS__cms = [
  { value: "4.9 Rating", sub: "From 150+ Reviews" },
  { value: "300+", sub: "Brands Served" },
  { value: "50M+", sub: "Impressions Generated" },
];

const PLATFORMS__cms = [
  {
    label: "Instagram",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.9.25-1.5 1.55-1.5H16.5V4.3C16.2 4.26 15.2 4.17 14 4.17c-2.4 0-4 1.46-4 4.16V10.5H7.5v3H10V21Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
        <path d="M10.5 9.5 L15 12 L10.5 14.5 Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="9" width="4" height="12" />
        <circle cx="5" cy="4.5" r="2.4" />
        <path d="M11 9h3.8v2.1h.05c.53-.95 1.83-2 3.77-2 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.28c0-1.26-.02-2.87-1.75-2.87-1.76 0-2.03 1.35-2.03 2.78V21h-3.9Z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 2c.4 2.5 2 4.2 4.7 4.4v3.3c-1.6.1-3.1-.4-4.7-1.4v6.6c0 3.7-3 6.6-6.7 6.6S3.1 18.6 3.1 14.9c0-3.6 2.9-6.6 6.5-6.6.3 0 .7 0 1 .1v3.4c-.3-.1-.6-.2-1-.2-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2 3.3-1.4 3.3-3.2V2Z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 3.5 5.7 3.5 9.7c0 2.1 1.1 4.7 2.9 5.5.3.1.4 0 .5-.3l.4-1.5c0-.2 0-.3-.1-.5-.5-.7-.9-1.8-.9-2.9 0-3.8 2.8-7.2 7.4-7.2 4 0 6.3 2.5 6.3 5.9 0 4.4-1.9 8.2-4.8 8.2-1.6 0-2.8-1.3-2.4-3 .5-1.9 1.3-3.9 1.3-5.3 0-1.2-.6-2.2-2-2.2-1.6 0-2.9 1.7-2.9 3.9 0 1.4.5 2.4.5 2.4l-1.9 8.2c-.6 2.4-.1 5.3-.05 5.6.03.2.28.24.4.1.16-.2 2.2-2.8 2.9-5.1.2-.7 1.1-4.4 1.1-4.4.6 1 2.1 1.9 3.7 1.9 4.9 0 8.2-4.4 8.2-10.4C20.5 5.2 17 2 12 2Z" />
      </svg>
    ),
  },
  {
    label: "Threads",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.2 22c-3.3 0-5.9-1.1-7.6-3.3C3 16.7 2.3 14.2 2.3 12s.7-4.7 2.3-6.7C6.3 3.1 8.9 2 12.2 2c3 0 5.3.9 7 2.6 1.4 1.4 2.2 3.1 2.5 5.1l-2.4.4c-.2-1.5-.8-2.7-1.8-3.7-1.2-1.2-2.9-1.8-5.2-1.8-2.5 0-4.4.8-5.7 2.4C5.4 8.5 4.8 10.1 4.8 12c0 1.9.6 3.5 1.8 4.9 1.3 1.6 3.2 2.4 5.7 2.4 2 0 3.5-.5 4.6-1.5.9-.8 1.4-1.8 1.6-3-.2-.1-.5-.1-.8-.2-.6-.1-1.3-.1-2-.1-1.5 0-2.7.3-3.6 1-.8.6-1.2 1.4-1.2 2.3 0 .8.3 1.4.9 1.9.6.5 1.4.7 2.3.7 1.1 0 2-.3 2.7-1 .6-.6 1-1.4 1.1-2.5l2.3.5c-.2 1.6-.9 2.9-2 3.9-1.3 1.1-2.8 1.6-4.6 1.6Z" />
      </svg>
    ),
  },
];

export default function SocialMediaMarketingHero() {
  const $t = useCmsText();
  const STATS = useCmsData("SocialMediaMarketingHero__STATS", STATS__cms);
  const PLATFORMS = useCmsData("SocialMediaMarketingHero__PLATFORMS", PLATFORMS__cms);
  return (
    <section className="relative w-full bg-white pt-10 pb-14 lg:pt-14 lg:pb-20 overflow-x-clip">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left content */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 max-w-xl">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[3px] rounded-full" style={{ backgroundColor: TEAL }} />
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: TEAL }}>
              {$t("SocialMediaMarketingHero__t1", "Creative Social Media Marketing")}</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-h1 font-serif font-bold tracking-tight mb-6">
            <span className="block" style={{ color: NAVY }}>{$t("SocialMediaMarketingHero__t2", "Every Day,")}</span>
            <span className="block" style={{ color: NAVY }}>{$t("SocialMediaMarketingHero__t3", "Millions Scroll.")}</span>
            <span className="block" style={{ color: NAVY }}>
              {$t("SocialMediaMarketingHero__t4", "Make Sure They")}{" "}
              <span className="font-serif italic" style={{ color: TEAL }}>{$t("SocialMediaMarketingHero__t5", "Stop")}</span> {$t("SocialMediaMarketingHero__t6", "For You.")}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-body text-slate-600 max-w-lg mb-8">
            {rich($t("SocialMediaMarketingHero__t7", "We create content, campaigns, and brand experiences that transform businesses into brands people notice, remember, and trust."))}</motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-9">
            <Link
              href={$t("SocialMediaMarketingHero__t8", "/contact")}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-lg text-white text-[14px] font-semibold shadow-[0_15px_30px_-12px_rgba(15,92,86,0.7)] transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: DEEP_TEAL }}
            >
              {$t("SocialMediaMarketingHero__t9", "Let's Build Your Brand")}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href={$t("SocialMediaMarketingHero__t10", "/portfolio")}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg bg-white border border-slate-300 text-[14px] font-semibold transition-colors hover:border-slate-400"
              style={{ color: NAVY }}
            >
              <span className="w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center" style={{ borderColor: NAVY }}>
                <PlayIcon />
              </span>
              {$t("SocialMediaMarketingHero__t11", "See Our Campaigns")}</Link>
          </motion.div>

          {/* Trust row */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-9">
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full ring-2 ring-white overflow-hidden relative bg-slate-200">
                    <Image src={$t("SocialMediaMarketingHero__t12", "/image1.webp")} alt={$t("SocialMediaMarketingHero__t13", "Client")} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className="text-caption font-semibold" style={{ color: NAVY }}>{STATS[0].value}</p>
                <p className="text-[11px] text-slate-500 leading-snug">{STATS[0].sub}</p>
              </div>
            </div>

            <span className="hidden sm:block w-px h-10 bg-slate-200" aria-hidden />

            <div>
              <p className="text-body font-bold" style={{ color: DEEP_TEAL }}>{STATS[1].value}</p>
              <p className="text-[11px] text-slate-500 leading-snug">{STATS[1].sub}</p>
            </div>

            <span className="hidden sm:block w-px h-10 bg-slate-200" aria-hidden />

            <div>
              <p className="text-body font-bold" style={{ color: DEEP_TEAL }}>{STATS[2].value}</p>
              <p className="text-[11px] text-slate-500 leading-snug">{STATS[2].sub}</p>
            </div>
          </motion.div>

          {/* Platforms */}
          <motion.div variants={fadeUp}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              {rich($t("SocialMediaMarketingHero__t14", "We create impact across every platform"))}</p>
            <div className="flex flex-wrap items-center gap-3">
              {PLATFORMS.map((p) => (
                <span
                  key={p.label}
                  aria-label={p.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200"
                >
                  {p.icon}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right side intentionally left blank */}
        <div aria-hidden className="hidden lg:block" />
      </Container>
    </section>
  );
}
