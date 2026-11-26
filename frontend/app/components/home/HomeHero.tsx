"use client";

import type { ReactNode } from "react";
import ConsultationForm from "../shared/ConsultationForm";
import Link from "next/link";
import Image from "next/image";
import Container from "../shared/Container";
import { PinIcon, ArrowIcon, PlayIcon, StarIcon, GiftIcon, ShieldCheckIcon, SparkleIcon } from "../shared/icons";
import { useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";

const TEAL = "#0d9488";

const DARK = "#0b3b35";

/** Moved out of app/page.tsx so its content can be edited in the CMS (markup unchanged). */
export default function HomeHero({ slot1 }: { slot1: ReactNode }) {
  const $t = useCmsText();
  return (
    <section className="relative">
      <Container className="grid grid-cols-1 gap-16 py-16 lg:grid-cols-2 lg:items-center lg:gap-0 lg:py-24 lg:pb-20">
        {/* Left column */}
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide"
            style={{ borderColor: "rgba(13,148,136,0.3)", color: TEAL, backgroundColor: "#e6f6f4" }}
          >
            <PinIcon /> {$t("HomeHero__t1", "YOUR GROWTH PARTNER, NATIONWIDE")}</span>

          <p className="text-caption mt-6 flex items-center gap-2 font-bold tracking-widest text-slate-500">
            {rich($t("HomeHero__t2", "WEBSITE DESIGN "))}<span className="h-1 w-1 rounded-full bg-slate-400" /> {rich($t("HomeHero__t3", "DEVELOPMENT"))}{" "}
            <span className="h-1 w-1 rounded-full bg-slate-400" /> {rich($t("HomeHero__t4", "SEO"))}</p>

          <h1 className="text-h1 mt-4 font-serif font-bold" style={{ color: NAVY }}>
            {$t("HomeHero__t5", "Digital Experiences.")}<br />
            {$t("HomeHero__t6", "Real Business")}{" "}
            <span className="relative inline-block" style={{ color: TEAL }}>
              {$t("HomeHero__t7", "Growth.")}<svg
                className="absolute -bottom-1.5 left-0 h-3 w-full"
                viewBox="0 0 160 12"
                preserveAspectRatio="none"
                fill="none"
                stroke={TEAL}
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M2 8c30-6 100-6 156 2" />
              </svg>
            </span>
          </h1>

          <p className="text-body mt-5 max-w-lg text-slate-600">
            {rich($t("HomeHero__t8", "We design, develop, and optimize websites and SEO strategies that attract the right audience and deliver measurable results."))}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={$t("HomeHero__t9", "/contact")}
              className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: DARK }}
            >
              {$t("HomeHero__t10", "Get Free Consultation ")}<ArrowIcon />
            </Link>
            <Link
              href={$t("HomeHero__t11", "/portfolio")}
              className="flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: NAVY }}
              >
                <PlayIcon />
              </span>
              {$t("HomeHero__t12", "View Our Work")}</Link>
          </div>

          <div className="mt-8 inline-flex flex-wrap items-center gap-6 rounded-2xl bg-white px-6 py-4 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.15)] ring-1 ring-slate-100 sm:gap-8">
            <div className="flex items-center gap-2">
              <Image src={$t("HomeHero__t13", "/Google_2015_logo.svg.webp")} alt={$t("HomeHero__t14", "Google")} width={120} height={41} className="h-5 w-auto" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold" style={{ color: NAVY }}>
                    {$t("HomeHero__t15", "4.9/5")}</span>
                  <span className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </span>
                </div>
                <p className="text-caption text-slate-500">{rich($t("HomeHero__t16", "Based on 100+ reviews"))}</p>
              </div>
            </div>

            <span className="hidden h-10 w-px bg-slate-200 sm:block" />

            <div className="flex items-center gap-2">
              <Image src={$t("HomeHero__t17", "/clutch.png")} alt={$t("HomeHero__t18", "Clutch")} width={779} height={256} className="h-6 w-auto" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold" style={{ color: NAVY }}>
                    {$t("HomeHero__t19", "4.9/5")}</span>
                  <span className="flex items-center gap-0.5 text-red-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </span>
                </div>
                <p className="text-caption text-slate-500">{rich($t("HomeHero__t20", "Based on 50+ reviews"))}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: growth dashboard + floating consultation form */}
        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:-ml-24 lg:w-[calc(100%+6rem)] lg:max-w-none">
          {/* Tilted dashboard card with real chart — fully visible except the last 20px behind the form */}
          <div className="lg:w-[calc(100%-320px)]">
            {slot1}
          </div>

          {/* Floating consultation form card — layered on top of the tilted card */}
          <div className="relative z-10 mt-10 rounded-2xl bg-white p-6 pt-9 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)] ring-1 ring-slate-100 lg:absolute lg:-top-5 lg:right-0 lg:mt-0 lg:w-[340px]">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2">
              <span
                className="relative flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md ring-4 ring-white"
                style={{ backgroundColor: TEAL }}
              >
                <GiftIcon />
                <SparkleIcon className="absolute -right-2.5 -top-2 text-amber-400" />
                <SparkleIcon className="absolute -left-2.5 top-0.5 h-2 w-2 text-teal-300" />
                <SparkleIcon className="absolute -right-1 bottom-[-6px] h-2 w-2 text-amber-300" />
              </span>
            </span>

            <p className="flex items-center justify-center gap-2 text-center text-[11px] font-bold tracking-wide" style={{ color: TEAL }}>
              <span aria-hidden>&rarr;</span> {rich($t("HomeHero__t21", "FREE CONSULTATION "))}<span aria-hidden>&larr;</span>
            </p>
            <h3 className="mt-1 text-center text-lg font-bold leading-snug" style={{ color: NAVY }}>
              {$t("HomeHero__t22", "Let's Grow Your Business ")}<span style={{ color: TEAL }}>{$t("HomeHero__t23", "Together.")}</span>
            </h3>
            <p className="text-caption mt-2 text-center text-slate-500">
              {rich($t("HomeHero__t24", "Book your free consultation and get expert advice tailored to your business goals."))}</p>

            <ConsultationForm variant="home" formType="home-consultation" />

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheckIcon className="h-3.5 w-3.5 text-emerald-500" /> {rich($t("HomeHero__t25", "No spam. No obligation. Just expert guidance."))}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
