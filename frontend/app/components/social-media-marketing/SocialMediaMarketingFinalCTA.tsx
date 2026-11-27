"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#0d9488";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const CheckCircleIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.3 L10.8 14.6 L15.5 9.5" />
  </svg>
);

const TRUST_BADGES__cms = ["30-min strategy call", "No obligation", "Growth-focused approach"];

const HIGHLIGHTS__cms = ["New In", "Merch", "Story", "Reviews", "Events"];
// Product creatives already in /public. 7 images so that, together, the phone's display + all 6
// peek cards behind it (7 visible slots total) each show a distinct photo with no repeats,
// however the slideshow's `activeIndex` happens to line them up.
const GRID_IMAGES = [
  "/product1.webp",
  "/product2.webp",
  "/Product3.webp",
  "/product4.webp",
  "/product5.webp",
  "/product6.webp",
  "/product7.webp",
];
const POST_TILES__cms = [...GRID_IMAGES, "/content-lifestyle.webp", "/content-ugc.webp"];

// A coded (not photographed) phone screen showing a generic Instagram-profile-style layout —
// placeholder "yourbrand" text with a real (already-licensed) image grid for the posts.
function ProfileScreen({
  zoomed,
  onTapHero,
  zoomTransitionS,
}: {
  zoomed: boolean;
  onTapHero: () => void;
  zoomTransitionS: number;
}) {
  const $t = useCmsText();
  const HIGHLIGHTS = useCmsData("SocialMediaMarketingFinalCTA__HIGHLIGHTS", HIGHLIGHTS__cms);
  const POST_TILES = useCmsData("SocialMediaMarketingFinalCTA__POST_TILES", POST_TILES__cms);
  return (
    <div className="flex h-full flex-col px-3 pt-8 pb-2 text-[9px]">
      <div className="flex items-center justify-between mb-3">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round"><path d="M15 6 9 12 15 18" /></svg>
        <span className="flex items-center gap-1 font-bold" style={{ color: NAVY }}>
          yourbrand
          <svg width="9" height="9" viewBox="0 0 24 24" fill={TEAL}><circle cx="12" cy="12" r="10" /><path d="M8 12.5 10.5 15 16 9" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span className="text-slate-400">⋮</span>
      </div>

      <div className="flex items-center gap-2.5 mb-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white font-bold text-[11px]" style={{ backgroundColor: NAVY }}>{html($t("SocialMediaMarketingFinalCTA__t1", "B"))}</span>
        <div className="flex flex-1 justify-between text-center">
          {[[$t("SocialMediaMarketingFinalCTA__t2", "872"), $t("SocialMediaMarketingFinalCTA__t3", "Posts")], [$t("SocialMediaMarketingFinalCTA__t4", "28.6K"), $t("SocialMediaMarketingFinalCTA__t5", "Followers")], [$t("SocialMediaMarketingFinalCTA__t6", "129"), $t("SocialMediaMarketingFinalCTA__t7", "Following")]].map(([n, l]) => (
            <div key={l}>
              <p className="font-bold leading-tight" style={{ color: NAVY }}>{n}</p>
              <p className="text-slate-400 text-[7px] leading-tight">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-1.5 mb-3">
        <span className="flex-1 rounded-md py-1 text-center font-semibold text-white text-[8px]" style={{ backgroundColor: TEAL }}>{html($t("SocialMediaMarketingFinalCTA__t8", "Follow"))}</span>
        <span className="flex-1 rounded-md border border-slate-300 py-1 text-center font-semibold text-[8px]" style={{ color: NAVY }}>{html($t("SocialMediaMarketingFinalCTA__t9", "Message"))}</span>
      </div>

      <div className="flex justify-between mb-3">
        {HIGHLIGHTS.map((h) => (
          <div key={h} className="flex flex-col items-center gap-0.5">
            <span className="h-6 w-6 rounded-full bg-slate-100" />
            <span className="text-slate-400 text-[6px]">{h}</span>
          </div>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-3 gap-[2px] -mx-3 border-t border-slate-100 pt-[2px]">
        {POST_TILES.map((src, i) =>
          i === 0 ? (
            zoomed ? (
              // Unmounted (not just faded out) the instant zoom starts — the shared `layoutId`
              // below picks up the FLIP from here to the full-screen overlay with no cross-fade.
              <span key={i} className="relative block" />
            ) : (
              <motion.button
                key={i}
                type="button"
                aria-label="Open post"
                layoutId="hero-post"
                onClick={onTapHero}
                className="relative block"
                transition={{ duration: zoomTransitionS, ease: EASE }}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </motion.button>
            )
          ) : (
            <span key={i} className="relative block">
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </span>
          )
        )}
      </div>

      <div className="flex items-center justify-around border-t border-slate-100 pt-1.5 mt-1 -mx-3 px-3">
        {["home", "search", "add", "reels", "profile"].map((k) => (
          <span key={k} className="h-3 w-3 rounded-sm" style={{ backgroundColor: k === "home" ? NAVY : "#cbd5e1" }} />
        ))}
      </div>
    </div>
  );
}

const SLIDE_COUNT = GRID_IMAGES.length;

// Desktop gets a noticeably slower, more deliberate pace than mobile — matches the same
// useIsDesktop pattern already used in SocialMediaMarketingCaseStudy.tsx.
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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export default function SocialMediaMarketingFinalCTA() {
  const $t = useCmsText();
  const TRUST_BADGES = useCmsData("SocialMediaMarketingFinalCTA__TRUST_BADGES", TRUST_BADGES__cms);
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  const [zoomed, setZoomed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const zoomTransitionS = isDesktop ? 1.1 : 0.7;
  const slideTransitionS = isDesktop ? 1.8 : 1.1;
  const slideStepMs = isDesktop ? 3400 : 2400;

  // Waits for every peek card's own entrance animation to fully settle (the farthest card,
  // depth 6, finishes at delay 0.2 + 6*0.12 = 0.92s + its 1.2s duration = ~2.12s), then a
  // further 1s pause, before anything behind the phone moves.
  const entranceSettleMs = (0.2 + 6 * 0.12 + 1.2) * 1000;
  const startDelayMs = entranceSettleMs + 1000;

  // Plays the grid's post-grid-to-full-screen zoom exactly ONCE — the phone never goes back to
  // showing the grid after that. Once the zoom settles, the display slowly, continuously slides
  // through the rest of the images one by one, forever, staying perfectly synced with the peek
  // stack behind the phone (both driven by the same `activeIndex`).
  useEffect(() => {
    let slideInterval: ReturnType<typeof setInterval> | undefined;
    let slideStartTimeout: ReturnType<typeof setTimeout> | undefined;

    const zoomTimeout = setTimeout(() => {
      setZoomed(true);
      slideStartTimeout = setTimeout(() => {
        setActiveIndex((i) => (i + 1) % SLIDE_COUNT);
        slideInterval = setInterval(() => {
          setActiveIndex((i) => (i + 1) % SLIDE_COUNT);
        }, slideStepMs);
      }, zoomTransitionS * 1000);
    }, startDelayMs);

    return () => {
      clearTimeout(zoomTimeout);
      clearTimeout(slideStartTimeout);
      clearInterval(slideInterval);
    };
  }, [startDelayMs, zoomTransitionS, slideStepMs]);

  return (
    <section className="relative w-full bg-white py-6 sm:py-8 lg:py-14 overflow-hidden">
      <Container className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6 lg:gap-2 lg:items-stretch">
        {/* Text content */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
            <span className="w-6 h-[2px]" style={{ backgroundColor: TEAL }} />
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: TEAL }}>
              {html($t("SocialMediaMarketingFinalCTA__t10", "Ready To Own Attention?"))}</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-h2 font-serif font-bold" style={{ color: NAVY }}>
            {$t("SocialMediaMarketingFinalCTA__t11", "The Next Brand")}<br />
            {$t("SocialMediaMarketingFinalCTA__t12", "Everyone Talks About")}<br />
            {$t("SocialMediaMarketingFinalCTA__t13", "Could Be ")}<span style={{ color: TEAL }}>{html($t("SocialMediaMarketingFinalCTA__t14", "Yours."))}</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-body text-slate-600 mt-4 max-w-md">
            {rich($t("SocialMediaMarketingFinalCTA__t15", "Let's build a social media presence that gets attention, builds trust and drives real business results."))}</motion.p>

          <motion.div variants={fadeUp} className="mt-7">
            <Link
              href={$t("SocialMediaMarketingFinalCTA__t16", "/contact")}
              className="group inline-flex items-center gap-2.5 rounded-lg px-6 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-teal-900/15 transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: DEEP_TEAL }}
            >
              {$t("SocialMediaMarketingFinalCTA__t17", "Let's Grow Your Brand")}<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-6 gap-y-2.5 mt-7">
            {TRUST_BADGES.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500">
                <CheckCircleIcon />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual — right: the phone, with 6 receding image peeks behind it (the same 6 photos
            used in the profile's own post grid, so it reads as consistent with that content). */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative flex justify-center lg:justify-start"
        >
          {/* Width-driven (not height-driven) so the box, and everything inside it sized in %,
              scales down cleanly on narrow phones and tablets instead of overflowing them. */}
          <div className="relative w-[290px] sm:w-[300px] md:w-[360px] lg:w-[520px]" style={{ aspectRatio: "600/500" }}>
            {/* Peeks — start hidden right behind the phone, slide out to their resting, smaller/
                fainter offset, each tilted in 3D (pivoting on its right/outer edge, left edge
                receding into the page). Only the 2 closest cards show on mobile — the rest would
                just be clipped off-screen anyway on a narrow phone. */}
            {(isMobile ? [2, 1] : [6, 5, 4, 3, 2, 1]).map((depth) => {
              // At rest (before the grid image has zoomed), the peek stack just mirrors the same
              // photos already visible in the phone's own grid, in order — nothing here moves on
              // its own. Only once `zoomed` flips true does it switch to the flowing, +1-offset
              // mapping (so the closest card, depth 1, never shows the same photo the phone's
              // display is currently showing) — i.e. the peek stack only starts moving in lockstep
              // with the moment the grid image actually zooms into the phone.
              const imgIndex = zoomed ? (activeIndex + depth) % SLIDE_COUNT : depth - 1;
              // Card 1 (closest to the phone) keeps the full height; every card after that gets
              // a little shorter, tapering down to the farthest (depth 6) card.
              const heightRatio = 19 - Math.max(depth - 1, 0) * 0.7;
              return (
                <motion.div
                  key={depth}
                  className="absolute rounded-2xl overflow-hidden shadow-[0_20px_45px_-20px_rgba(15,23,42,0.35)]"
                  style={{
                    width: "34%",
                    aspectRatio: `9/${heightRatio}`,
                    top: "50%",
                    zIndex: 7 - depth,
                    transformPerspective: 1000,
                    transformOrigin: "right center",
                  }}
                  initial={{ left: "18%", y: "-50%", scale: 0.3, opacity: 0, rotateY: 0 }}
                  whileInView={{
                    left: `${10 + depth * 15}%`,
                    y: "-50%",
                    scale: Math.max(1 - depth * 0.06, 0.6),
                    opacity: 1,
                    rotateY: -30,
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.2 + depth * 0.12 }}
                >
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={imgIndex}
                      className="absolute inset-0"
                      initial={{ x: "10%", opacity: 0 }}
                      animate={{ x: "0%", opacity: 1 }}
                      exit={{ x: "-10%", opacity: 0 }}
                      transition={{ duration: slideTransitionS, ease: EASE }}
                    >
                      <Image src={GRID_IMAGES[imgIndex]} alt="" fill sizes="140px" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Phone — the foreground element, z-10, positioned at the left of the composition */}
            <div
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-[32px] bg-[#0e1117] p-[5px] shadow-[0_35px_70px_-25px_rgba(15,23,42,0.45)]"
              style={{ width: "38%", aspectRatio: "9/19", border: "1px solid #2a2f3a" }}
            >
              {/* side buttons — subtle, for realism */}
              <span className="absolute -left-[1.5px] top-[18%] h-[7%] w-[2px] rounded-r-sm bg-[#2a2f3a]" />
              <span className="absolute -right-[1.5px] top-[22%] h-[10%] w-[2px] rounded-l-sm bg-[#2a2f3a]" />
              <span className="absolute -right-[1.5px] top-[34%] h-[10%] w-[2px] rounded-l-sm bg-[#2a2f3a]" />

              <div className="relative h-full w-full rounded-[28px] bg-white overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
                <span className="absolute left-1/2 top-2 -translate-x-1/2 z-10 h-3.5 w-16 rounded-full bg-[#0e1117]" />
                <ProfileScreen zoomed={zoomed} onTapHero={() => setZoomed(true)} zoomTransitionS={zoomTransitionS} />

                {/* The first grid post slowly zooms (shared-layout transition) until it fills the
                    phone's screen — once, the phone never returns to the grid after that. From
                    then on, the display keeps slowly sliding through the rest of the images one
                    by one, forever, in sync with the peek stack behind the phone (same
                    `activeIndex` drives both). */}
                <AnimatePresence>
                  {zoomed && (
                    <motion.div
                      layoutId="hero-post"
                      className="absolute inset-0 z-20 overflow-hidden bg-[#0e1117]"
                      transition={{ duration: zoomTransitionS, ease: EASE }}
                    >
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.div
                          key={activeIndex}
                          className="absolute inset-0"
                          initial={{ x: "10%", opacity: 0 }}
                          animate={{ x: "0%", opacity: 1 }}
                          exit={{ x: "-10%", opacity: 0 }}
                          transition={{ duration: slideTransitionS, ease: EASE }}
                        >
                          <Image src={GRID_IMAGES[activeIndex]} alt="" fill sizes="200px" className="object-cover" />
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
