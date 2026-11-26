"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Crosshair, Euro, Filter, RefreshCw, TrendingUp, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const INK = "#0b1a2a";
const TEAL = "#0f5c5a";
const EASE = [0.22, 1, 0.36, 1] as const;

const POINT_ICONS: LucideIcon[] = [Crosshair, Euro, Filter, BarChart3, RefreshCw];

const points__cms = [
  { title: "High Intent Traffic", text: "We reach the right people ready to take action." },
  { title: "Lower Cost Per Lead", text: "Smarter bidding & optimization reduce wasted spend." },
  { title: "Better Conversion Rate", text: "Optimized landing pages that convert more visitors." },
  { title: "Transparent Reporting", text: "Real-time insights and honest communication." },
  { title: "Continuous Optimization", text: "We test, learn and improve campaigns every day." },
];

/** "Real Campaigns. Real Performance." - campaign dashboard visual with the "stop paying for clicks" pitch. */
export default function GoogleAdsPerformance() {
  const $t = useCmsText();
  const points = useCmsData("GoogleAdsPerformance__points", points__cms);

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#eef6f5] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em]" style={{ color: INK }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#0f8a6e]/60" />
              <span className="relative h-2 w-2 rounded-full bg-[#0f8a6e]" />
            </span>
            {$t("GoogleAdsPerformance__t1", "Live performance snapshot")}
          </span>
          <h2 className="text-h2 font-heading mt-4 font-bold tracking-[-0.02em]" style={{ color: INK }}>
            {$t("GoogleAdsPerformance__t2", "Real Campaigns.")} <span style={{ color: TEAL }}>{$t("GoogleAdsPerformance__t3", "Real Performance.")}</span>
          </h2>
          <p className="text-body mx-auto mt-3 max-w-[520px] text-slate-600">{rich($t("GoogleAdsPerformance__t4", "Our data-driven Google Ads strategies deliver measurable results that grow your business."))}</p>
        </motion.div>

        <div className="relative mx-auto mt-10 max-w-[1300px]">
          {/* campaign scene (text on the left is live, the dashboard is the artwork) */}
          <div className="relative overflow-hidden rounded-[28px] bg-[#f3f4f4]">
            <Image
              src={$t("GoogleAdsPerformance__t5", "/google-ads/campaign-panel.webp")}
              alt={$t("GoogleAdsPerformance__t6", "Google Ads campaign dashboard with conversions, keywords and landing page preview")}
              width={1524}
              height={794}
              sizes="(min-width: 1280px) 1300px, 100vw"
              className="hidden h-auto w-full lg:block"
            />
            <Image
              src={$t("GoogleAdsPerformance__t5", "/google-ads/campaign-panel.webp")}
              alt=""
              aria-hidden
              width={1524}
              height={794}
              sizes="100vw"
              className="h-[260px] w-full object-cover object-[72%_50%] sm:h-[360px] lg:hidden"
            />
            <motion.div
              className="relative px-6 py-8 sm:px-10 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[38%] lg:flex-col lg:justify-center lg:py-0 lg:pl-[3.5%] lg:pr-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ color: INK }}>{$t("GoogleAdsPerformance__t7", "Google Ads • Google Partner")}</p>
              <h3 className="text-h3 font-heading mt-4 font-bold leading-[1.1] tracking-[-0.02em]" style={{ color: INK }}>
                <span className="block">{$t("GoogleAdsPerformance__t8", "Stop Paying For Clicks.")}</span>
                <span className="block" style={{ color: TEAL }}>{$t("GoogleAdsPerformance__t9", "Start Paying For Customers.")}</span>
              </h3>
              <i aria-hidden className="mt-4 block h-[3px] w-12 rounded-full" style={{ background: TEAL }} />
              <p className="text-small mt-4 max-w-[380px] leading-relaxed text-slate-600">{rich($t("GoogleAdsPerformance__t10", "We build, manage and optimize Google Ads campaigns that bring qualified leads, reduce wasted spend, and deliver measurable business growth."))}</p>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <Link href={$t("GoogleAdsPerformance__t11", "/contact")} className="group inline-flex items-center gap-2.5 rounded-md px-5 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(15,92,90,0.8)]" style={{ background: TEAL }}>
                  <TrendingUp className="h-4 w-4" />
                  {$t("GoogleAdsPerformance__t12", "Get My Free Google Ads Strategy")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href={$t("GoogleAdsPerformance__t13", "/testimonials")} className="group inline-flex items-center gap-2 border-b-2 border-[#0f5c5a]/40 pb-0.5 text-[14px] font-semibold hover:border-[#0f5c5a]" style={{ color: TEAL }}>
                  {$t("GoogleAdsPerformance__t14", "View Case Studies")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* proof points */}
          <ul className="relative z-10 mx-auto -mt-6 grid max-w-[1150px] grid-cols-1 gap-5 rounded-2xl bg-white px-6 py-6 shadow-[0_20px_44px_-26px_rgba(11,26,42,0.45)] ring-1 ring-slate-100 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-slate-200">
            {points.map((p, i) => {
              const Icon = POINT_ICONS[i % POINT_ICONS.length];
              return (
                <motion.li
                  key={i}
                  className="flex gap-3 lg:px-4 lg:first:pl-0"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }}
                >
                  <Icon className="mt-0.5 h-8 w-8 shrink-0" strokeWidth={1.6} style={{ color: TEAL }} />
                  <span>
                    <span className="block text-[13px] font-bold" style={{ color: INK }}>{p.title}</span>
                    <span className="mt-1 block text-[12px] leading-snug text-slate-600">{p.text}</span>
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
