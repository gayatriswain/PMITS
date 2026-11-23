"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, animate, useMotionValue, type Variants } from "framer-motion";
import { Counter } from "../shared/useCountUp";
import Container from "../shared/Container";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#0d9488";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// Matches Tailwind's `lg` breakpoint (1024px) — desktop gets a slower, smoother transition.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

type IconProps = { size?: number; color?: string };
const iconBase = (size: number, color: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: color,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const UsersIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...iconBase(size, color)}>
    <circle cx="9" cy="8" r="3.3" />
    <path d="M2.5 20c0-3.6 2.9-6.3 6.5-6.3s6.5 2.7 6.5 6.3" />
    <circle cx="17.5" cy="9" r="2.6" />
    <path d="M15.8 13.8c2.9.3 5.2 2.8 5.2 6.2" />
  </svg>
);
const LayersIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...iconBase(size, color)}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
);
const EyeIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...iconBase(size, color)}>
    <path d="M3 12c2-4 5.5-6.5 9-6.5s7 2.5 9 6.5c-2 4-5.5 6.5-9 6.5s-7-2.5-9-6.5Z" />
    <circle cx="12" cy="12" r="2.6" />
  </svg>
);
const TrendUpIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...iconBase(size, color)}>
    <path d="M4 20 V15 M9 20 V12 M14 20 V14 M19 20 V9" />
    <path d="M4 11 L9 7 L13 9 L20 4 M16.5 4 H20 V7.5" />
  </svg>
);
const CheckIcon = ({ size = 13, color = TEAL }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ArrowIcon = ({ flip = false }: { flip?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: flip ? "rotate(180deg)" : undefined }}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
const PlayFillIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const TargetIcon = ({ size = 18, color = DEEP_TEAL }: IconProps) => (
  <svg {...iconBase(size, color)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill={color} stroke="none" />
  </svg>
);
const BulbIcon = ({ size = 18, color = DEEP_TEAL }: IconProps) => (
  <svg {...iconBase(size, color)}>
    <path d="M9 18h6M10 21.5h4M12 2a6.5 6.5 0 0 0-3.8 11.8c.5.4.8 1 .8 1.7v.5h6v-.5c0-.7.3-1.3.8-1.7A6.5 6.5 0 0 0 12 2Z" />
  </svg>
);
const FunnelIcon = ({ size = 18, color = DEEP_TEAL }: IconProps) => (
  <svg {...iconBase(size, color)}>
    <path d="M3 4h18l-7 9v6l-4 2v-8Z" />
  </svg>
);
const ReportIcon = ({ size = 18, color = DEEP_TEAL }: IconProps) => (
  <svg {...iconBase(size, color)}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);
const ShieldCheckIcon = ({ size = 18, color = DEEP_TEAL }: IconProps) => (
  <svg {...iconBase(size, color)}>
    <path d="M12 3 20 6 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V6 Z" />
    <path d="M8.5 12 L11 14.5 L15.5 9.5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const STATS = [
  { target: 50, suffix: "+", label: "Brands Served", Icon: UsersIcon },
  { target: 2500, suffix: "+", label: "Campaigns Delivered", Icon: LayersIcon },
  { target: 160, suffix: "M+", label: "People Reached", Icon: EyeIcon },
  { target: 4.8, suffix: "x", label: "Avg. ROAS Achieved", Icon: TrendUpIcon },
];

type CaseStudy = {
  brand: string;
  category: string;
  mainImage: string;
  tagline: string[];
  subtagline: string;
  challenge: string;
  strategyPoints: string[];
  channelTags: string[];
  engagement: { likes: string; comments: string; shares: string };
  stat: string;
  metric: string;
};

// Shown as the 4 clickable side thumbnails for every case study — clicking one swaps the big
// visual to that image. Reuses whatever's already in /public rather than sourcing anything new.
const SIDE_THUMBS = [
  { image: "/content-reels.jpg", caption: "Behind The Scenes", video: true },
  { image: "/content-product-shots.jpg", caption: "3 Reasons They Choose Us" },
  { image: "/content-stories.jpg", caption: "Consistency Every Day" },
  { image: "/content-lifestyle.jpg", caption: "Your Growth Starts Here", cta: "Explore" },
];

const CASE_STUDIES: CaseStudy[] = [
  {
    brand: "Veloré Skincare",
    category: "Skincare Brand",
    mainImage: "/case-velore-main.jpg",
    tagline: ["Nature.", "Science.", "Results."],
    subtagline: "Clean, Conscious, Confident.",
    challenge: "Low brand awareness and minimal online presence in a highly competitive skincare market.",
    strategyPoints: [
      "Full-funnel social media strategy",
      "High-impact content & storytelling",
      "Performance advertising across platforms",
      "Influencer & UGC collaboration",
      "Conversion-focused landing pages",
    ],
    channelTags: ["Meta Ads", "Reels", "Carousels", "Stories", "Google Ads", "Landing Page", "Email Campaign", "+ More"],
    engagement: { likes: "24.8K", comments: "512", shares: "2.1K" },
    stat: "+214%",
    metric: "Website Traffic",
  },
  {
    brand: "Luxera Fashion",
    category: "Fashion Brand",
    mainImage: "/case-luxera.jpg",
    tagline: ["Style.", "Confidence.", "Presence."],
    subtagline: "Wear Your Story.",
    challenge: "Struggled to stand out in a saturated fashion market with generic product-only content.",
    strategyPoints: [
      "Editorial-style content direction",
      "Influencer seeding & try-on hauls",
      "Shoppable Instagram & TikTok integration",
      "Trend-responsive content calendar",
    ],
    channelTags: ["Instagram Ads", "Reels", "Try-On Hauls", "TikTok Shop", "Email Campaign", "+ More"],
    engagement: { likes: "31.2K", comments: "804", shares: "3.4K" },
    stat: "+312%",
    metric: "Revenue Growth",
  },
  {
    brand: "Nutrixia",
    category: "Health Supplement Brand",
    mainImage: "/case-nutrixia.jpg",
    tagline: ["Fuel.", "Focus.", "Feel Better."],
    subtagline: "Backed By Science.",
    challenge: "Needed to build trust in a crowded, skepticism-heavy supplements category.",
    strategyPoints: [
      "Science-backed educational content",
      "Customer testimonial & UGC series",
      "Retargeting across Meta & Google",
      "Subscription-focused landing funnel",
    ],
    channelTags: ["Meta Ads", "Google Ads", "UGC", "Email Campaign", "Landing Page", "+ More"],
    engagement: { likes: "18.6K", comments: "347", shares: "1.6K" },
    stat: "+256%",
    metric: "Website Traffic",
  },
  {
    brand: "Pawsome Pet Care",
    category: "Pet Care Brand",
    mainImage: "/case-pawsome.jpg",
    tagline: ["Happy.", "Healthy.", "Pawsome."],
    subtagline: "Every Tail Matters.",
    challenge: "Low awareness outside a small local customer base, mostly offline.",
    strategyPoints: [
      "Community-driven pet story content",
      "Local influencer & shelter partnerships",
      "Geo-targeted social ads",
      "Referral & loyalty program promotion",
    ],
    channelTags: ["Facebook Ads", "Reels", "Community Posts", "Local SEO", "Referral Program", "+ More"],
    engagement: { likes: "12.4K", comments: "268", shares: "980" },
    stat: "+167%",
    metric: "Leads Generated",
  },
  {
    brand: "Urban Threads",
    category: "Streetwear Brand",
    mainImage: "/case-urban.jpg",
    tagline: ["Bold.", "Street.", "Unapologetic."],
    subtagline: "Worn By The Culture.",
    challenge: "Drops sold inconsistently with no repeatable hype-building system.",
    strategyPoints: [
      "Drop-based content & countdown campaigns",
      "Streetwear creator collaborations",
      "TikTok trend-jacking content",
      "Waitlist & early-access email flows",
    ],
    channelTags: ["TikTok", "Reels", "Creator Collabs", "Email Campaign", "Waitlist", "+ More"],
    engagement: { likes: "22.9K", comments: "590", shares: "2.8K" },
    stat: "+193%",
    metric: "ROAS Achieved",
  },
  {
    brand: "EduClimb",
    category: "EdTech Platform",
    mainImage: "/case-educlimb.jpg",
    tagline: ["Learn.", "Grow.", "Climb."],
    subtagline: "Your Next Step, Simplified.",
    challenge: "High traffic but low enrolment conversion from social channels.",
    strategyPoints: [
      "Outcome-driven testimonial content",
      "Free-trial focused ad funnels",
      "Webinar & lead-magnet campaigns",
      "Retargeting drip email sequences",
    ],
    channelTags: ["LinkedIn Ads", "Meta Ads", "Webinars", "Email Campaign", "Landing Page", "+ More"],
    engagement: { likes: "9.7K", comments: "203", shares: "740" },
    stat: "+228%",
    metric: "Enrolments Growth",
  },
];

const FOOTER_FEATURES = [
  { title: "Data-Driven Strategies", Icon: TargetIcon },
  { title: "Creative that Converts", Icon: BulbIcon },
  { title: "Full-Funnel Execution", Icon: FunnelIcon },
  { title: "Transparent Reporting", Icon: ReportIcon },
  { title: "Results You Can Measure", Icon: ShieldCheckIcon },
];

/* ------------------------------------------------------------------ */
/* Motion                                                              */
/* ------------------------------------------------------------------ */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const listContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

/* ------------------------------------------------------------------ */

export default function SocialMediaMarketingCaseStudy() {
  const [selected, setSelected] = useState(0);
  const [mainImageOverride, setMainImageOverride] = useState<string | null>(null);
  const active = CASE_STUDIES[selected];
  const displayedImage = mainImageOverride ?? active.mainImage;
  const isDesktop = useIsDesktop();
  const crossfadeDuration = isDesktop ? 1.4 : 0.9;
  const stepDuration = isDesktop ? 2.6 : 2;

  // Growth-stories carousel: a real carousel — discrete slides, one card-width at a time, each
  // move animated smoothly and then it RESTS there (unlike a marquee, which never stops). A
  // TRIPLED list is rendered, starting centered on the middle copy, so stepping either direction
  // has real cards on both sides to slide to; once a step drifts too far into an outer copy, it
  // silently snaps back by one loop-width right after that step's animation settles (invisible,
  // since the copies are identical) — that's what makes it loop forever either direction.
  const CARD_STEP = 242; // 230px card + 12px gap (gap-3)
  const LOOP_WIDTH = CASE_STUDIES.length * CARD_STEP;
  const x = useMotionValue(-LOOP_WIDTH);
  const stepRef = useRef(CASE_STUDIES.length);
  const isHoveredRef = useRef(false);

  const applyStep = (newStep: number) => {
    stepRef.current = newStep;
    const idx = ((newStep % CASE_STUDIES.length) + CASE_STUDIES.length) % CASE_STUDIES.length;
    setSelected(idx);
    setMainImageOverride(null);
    animate(x, -newStep * CARD_STEP, {
      duration: stepDuration,
      ease: EASE,
      onComplete: () => {
        if (newStep >= CASE_STUDIES.length * 2) {
          stepRef.current = newStep - CASE_STUDIES.length;
          x.set(-stepRef.current * CARD_STEP);
        } else if (newStep < 0) {
          stepRef.current = newStep + CASE_STUDIES.length;
          x.set(-stepRef.current * CARD_STEP);
        }
      },
    });
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (isHoveredRef.current) return;
      applyStep(stepRef.current + 1);
    }, 3000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (dir: 1 | -1) => applyStep(stepRef.current + dir);

  const jumpTo = (targetIndex: number) => {
    const currentIndex = ((stepRef.current % CASE_STUDIES.length) + CASE_STUDIES.length) % CASE_STUDIES.length;
    const delta = (targetIndex - currentIndex + CASE_STUDIES.length) % CASE_STUDIES.length;
    if (delta === 0) return;
    applyStep(stepRef.current + delta);
  };

  return (
    <section className="relative w-full bg-white py-16 lg:py-24 overflow-hidden">
      <Container>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: TEAL }}>
              04 &middot; Proof &amp; Results
            </span>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight font-bold mt-3">
              <span className="block" style={{ color: NAVY }}>Real Strategies.</span>
              <span className="block font-serif italic underline" style={{ color: TEAL, textDecorationColor: TEAL }}>
                Real Growth.
              </span>
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mt-3 max-w-md">
              We turn strategy into impact. Here&apos;s how we&apos;ve helped brands grow, scale, and lead their market.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            {STATS.map((s, i) => (
              <div key={s.label} className={`flex items-center gap-2 ${i > 0 ? "lg:border-l lg:pl-8 border-slate-200" : ""}`}>
                <s.Icon size={16} />
                <div>
                  <p className="text-base font-bold" style={{ color: NAVY }}>
                    {Number.isInteger(s.target) ? <Counter target={s.target} suffix={s.suffix} /> : `${s.target}${s.suffix}`}
                  </p>
                  <p className="text-[11px] text-slate-500 whitespace-nowrap">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Main case study card — swaps content to whichever story is selected below */}
        <div
          className="rounded-3xl border border-slate-100 bg-white shadow-[0_25px_60px_-30px_rgba(15,40,60,0.25)] p-5 lg:p-7 overflow-hidden"
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active.brand}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, position: "absolute" }}
              transition={{ duration: crossfadeDuration, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-7"
            >
              {/* Visual */}
              <div>
                <div className="flex gap-2.5 h-[280px] sm:h-[320px]">
                  <div className="relative flex-1 rounded-2xl overflow-hidden bg-slate-900">
                    <Image src={displayedImage} alt={`${active.brand} campaign visual`} fill sizes="360px" className="object-cover" />
                  </div>

                  {/* Side thumbnails — click any to show it in the big visual on the left */}
                  <div className="hidden sm:flex flex-col gap-2.5 w-[110px] shrink-0">
                    {SIDE_THUMBS.map((t) => {
                      const isShown = displayedImage === t.image;
                      return (
                        <button
                          key={t.caption}
                          type="button"
                          onClick={() => setMainImageOverride(t.image)}
                          className="relative flex-1 rounded-2xl overflow-hidden text-left transition-transform hover:scale-[1.02]"
                          style={{ outline: isShown ? `2px solid ${TEAL}` : undefined, outlineOffset: isShown ? "-2px" : undefined }}
                        >
                          <Image src={t.image} alt={t.caption} fill sizes="110px" className="object-cover" />
                          {t.video && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/35">
                                <PlayFillIcon size={11} />
                              </span>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">❤ {active.engagement.likes}</span>
                  <span className="flex items-center gap-1">💬 {active.engagement.comments}</span>
                  <span className="flex items-center gap-1">↗ {active.engagement.shares}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {active.channelTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-medium text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Brand / Challenge / Strategy */}
              <motion.div variants={listContainer} initial="hidden" animate="show">
                <motion.div variants={fadeUp}>
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: TEAL }}>The Brand</p>
                  <p className="text-[15px] font-bold mt-1" style={{ color: NAVY }}>{active.brand}</p>
                  <p className="text-[12px] text-slate-500">{active.category}</p>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-5">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: TEAL }}>Challenge</p>
                  <p className="text-[12.5px] text-slate-500 leading-relaxed mt-1.5">{active.challenge}</p>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-5">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: TEAL }}>Our Strategy</p>
                  <ul className="flex flex-col gap-2 mt-2">
                    {active.strategyPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-[12.5px] text-slate-600">
                        <span className="mt-0.5"><CheckIcon /></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* More growth stories — auto-advancing carousel (same `selected` state as the main card
            above, so both stay in sync); arrows sit stacked on the right, centered on the row */}
        <div className="mt-10 lg:mt-14">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-4">More Growth Stories</p>

          <div
            className="flex items-center gap-3"
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { isHoveredRef.current = false; }}
          >
            <div className="relative flex-1 min-w-0">
              {/* Fixed highlight frame — this never moves. Scrolling the strip beneath it (right
                  to left, as `selected` advances) is what makes whichever card lines up with it
                  read as "active", instead of the border jumping from card to card. Cards are
                  230px each (6 x 230 + gaps > any container width) so this always overflows and
                  actually scrolls, even at full width, instead of just fitting everything at once. */}
              <div
                className="pointer-events-none absolute left-0 top-0 h-full w-[230px] rounded-xl z-10"
                style={{ boxShadow: `inset 0 0 0 2px ${TEAL}` }}
                aria-hidden
              />
              <div className="overflow-hidden">
                <motion.div className="flex gap-3 pb-1" style={{ x }}>
                  {[...CASE_STUDIES, ...CASE_STUDIES, ...CASE_STUDIES].map((s, i) => (
                    <button
                      key={`${s.brand}-${i}`}
                      type="button"
                      onClick={() => jumpTo(i % CASE_STUDIES.length)}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left w-[230px] shrink-0"
                    >
                      <span className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden">
                        <Image src={s.mainImage} alt={s.brand} fill sizes="48px" className="object-cover" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12.5px] font-bold truncate" style={{ color: NAVY }}>{s.brand}</span>
                        <span className="block text-[10.5px] text-slate-400 truncate">{s.category}</span>
                        <span className="block text-[13px] font-bold mt-0.5" style={{ color: DEEP_TEAL }}>{s.stat}</span>
                      </span>
                    </button>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="hidden sm:flex flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={() => goTo(-1)}
                aria-label="Previous"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-600"
                style={{ transform: "rotate(90deg)" }}
              >
                <ArrowIcon flip />
              </button>
              <button
                type="button"
                onClick={() => goTo(1)}
                aria-label="Next"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-600"
                style={{ transform: "rotate(90deg)" }}
              >
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-10 lg:mt-14 rounded-2xl border border-slate-200 p-6 lg:px-8 lg:py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug" style={{ color: NAVY }}>
              We don&apos;t chase
              <br />
              vanity metrics.
            </h3>
            <p className="font-serif italic text-lg mt-1" style={{ color: TEAL }}>
              We drive real business impact.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            {FOOTER_FEATURES.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center gap-1.5 w-[92px]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "#e6f6f4" }}>
                  <f.Icon />
                </span>
                <p className="text-[11px] font-semibold leading-snug" style={{ color: NAVY }}>{f.title}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
