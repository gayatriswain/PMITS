"use client";

import ConsultationForm from "../shared/ConsultationForm";
import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";
import { ArrowIcon, CheckIcon, ClockIcon, GridIcon, LockIcon, PinIcon, PlayIcon, ShieldCheckIcon, StarIcon, UsersIcon } from "../shared/icons";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";

const TEAL = "#0d9488";

const DARK = "#0b3b35";

const ACCENT = "#ff6321";

const trustPoints__cms = [
  { title: "Result Driven", sub: "Focused on measurable growth & ROI" },
  { title: "Transparent Process", sub: "Clear communication, no hidden surprises" },
  { title: "Growth Focused", sub: "Strategies that scale your business" },
];

const statHighlights__cms = [
  { icon: GridIcon, value: "250+", label: "Projects Delivered" },
  { icon: ShieldCheckIcon, value: "10+", label: "Years of Excellence" },
  { icon: UsersIcon, value: "500+", label: "Happy Clients" },
];

/** Moved out of app/location/page.tsx so its content can be edited in the CMS (markup unchanged). */
export default function LocationHero() {
  const $t = useCmsText();
  const trustPoints = useCmsData("LocationHero__trustPoints", trustPoints__cms);
  const statHighlights = useCmsData("LocationHero__statHighlights", statHighlights__cms);
  return (
    <section className="relative overflow-hidden">
      <Container className="grid grid-cols-1 gap-14 py-16 lg:grid-cols-[0.82fr_1.25fr] lg:items-center lg:gap-8 lg:py-20">
        {/* Left column: copy */}
        <div>
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide"
            style={{ borderColor: "rgba(13,148,136,0.3)", color: TEAL, backgroundColor: "#e6f6f4" }}
          >
            <PinIcon /> {$t("LocationHero__t1", "NOIDA, NCR")}</span>

          <h1 className="text-h1 mt-4 font-serif font-bold" style={{ color: NAVY }}>
            {$t("LocationHero__t2", "Your Local")}<br />
            <span style={{ color: TEAL }}>{$t("LocationHero__t3", "Digital")}</span> {$t("LocationHero__t4", "Growth")}<br />
            {$t("LocationHero__t5", "Partner in Noida.")}<span
              className="ml-1 inline-block h-2 w-2 rounded-full align-middle"
              style={{ backgroundColor: ACCENT }}
            />
          </h1>

          <p className="text-small mt-4 max-w-md text-slate-600">
            {rich($t("LocationHero__t6", "We build strategic websites, powerful SEO and complete digital solutions that help Noida businesses attract more customers and grow faster."))}</p>

          <div className="mt-6 flex flex-wrap items-start gap-4">
            {trustPoints.map((t) => (
              <div key={t.title} className="flex max-w-[145px] items-start gap-1.5">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#e6f6f4", color: TEAL }}
                >
                  <CheckIcon />
                </span>
                <div>
                  <p className="text-[11px] font-bold" style={{ color: NAVY }}>
                    {t.title}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-snug text-slate-500">{t.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={$t("LocationHero__t7", "/contact")}
              className="flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: DARK }}
            >
              {$t("LocationHero__t8", "Get Free Consultation ")}<ArrowIcon />
            </Link>
            <Link
              href={$t("LocationHero__t9", "/portfolio")}
              className="flex items-center gap-1.5 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: NAVY }}
              >
                <PlayIcon />
              </span>
              {$t("LocationHero__t10", "View Our Work")}</Link>
          </div>
        </div>

        {/* Portrait image with the consultation form layered in front of it (image height matches form height, 20px overlap) */}
        <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:-ml-14 lg:flex lg:w-[calc(100%+3.5rem)] lg:max-w-none lg:items-stretch">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] lg:aspect-auto lg:w-auto lg:flex-1">
            <Image
              src={$t("LocationHero__t11", "/about-us-main.webp")}
              alt={$t("LocationHero__t12", "The ProManage team helping a Noida business grow")}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 420px, 90vw"
            />
          </div>

          {/* Consultation form (same fields as the homepage form) */}
          <div className="relative z-10 mx-auto mt-8 w-full max-w-[360px] shrink-0 overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)] ring-1 ring-slate-100 lg:mt-0 lg:-ml-5 lg:w-[350px]">
            {/* Header band */}
            <div className="px-6 pb-10 pt-7" style={{ backgroundImage: `linear-gradient(135deg, ${DARK}, ${TEAL})` }}>
              <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>
                {rich($t("LocationHero__t13", "Let's Talk"))}</p>
              <h3 className="text-h5 mt-2 font-bold text-white">{$t("LocationHero__t14", "Get a Free Consultation")}</h3>
              <p className="text-small mt-2 text-white/80">
                {rich($t("LocationHero__t15", "Share your details and our experts will get back to you shortly."))}</p>
            </div>

            {/* Card body overlapping the header */}
            <div className="relative -mt-6 rounded-t-3xl bg-white px-6 pb-6 pt-6">
              <ConsultationForm variant="location" formType="location-consultation" />

              <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <LockIcon className="h-3.5 w-3.5 text-slate-400" /> {rich($t("LocationHero__t16", "Your information is safe with us."))}</p>

              <div
                className="mt-4 flex items-center justify-between rounded-2xl px-4 py-3"
                style={{ backgroundColor: "#e6f6f4" }}
              >
                <div>
                  <p className="text-[11px] text-slate-500">{rich($t("LocationHero__t17", "Get a response within"))}</p>
                  <p className="text-small font-bold" style={{ color: TEAL }}>
                    {rich($t("LocationHero__t18", "24 Hours"))}</p>
                </div>
                <span style={{ color: TEAL }}>
                  <ClockIcon />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust bar: ratings + key stats, spans the full width at the bottom of the hero */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6 rounded-3xl bg-white px-6 py-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] ring-1 ring-slate-100 sm:px-8">
            <div className="flex items-center gap-2">
              <Image src={$t("LocationHero__t19", "/Google_2015_logo.svg.webp")} alt={$t("LocationHero__t20", "Google")} width={120} height={41} className="h-5 w-auto" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold" style={{ color: NAVY }}>
                    {$t("LocationHero__t21", "4.9")}</span>
                  <span className="flex items-center gap-0.5 text-amber-400">
                    <StarIcon />
                  </span>
                </div>
                <p className="text-caption text-slate-500">{rich($t("LocationHero__t22", "120+ Reviews"))}</p>
              </div>
            </div>

            <span className="hidden h-10 w-px bg-slate-200 sm:block" />

            <div className="flex items-center gap-2">
              <Image src={$t("LocationHero__t23", "/clutch.webp")} alt={$t("LocationHero__t24", "Clutch")} width={779} height={256} className="h-6 w-auto" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold" style={{ color: NAVY }}>
                    {$t("LocationHero__t25", "4.8")}</span>
                  <span className="flex items-center gap-0.5 text-red-500">
                    <StarIcon />
                  </span>
                </div>
                <p className="text-caption text-slate-500">{rich($t("LocationHero__t26", "50+ Reviews"))}</p>
              </div>
            </div>

            {statHighlights.map((s) => (
              <div key={s.label} className="contents">
                <span className="hidden h-10 w-px bg-slate-200 sm:block" />
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "#e6f6f4", color: TEAL }}
                  >
                    <s.icon />
                  </span>
                  <div>
                    <p className="text-small font-bold" style={{ color: NAVY }}>
                      {s.value}
                    </p>
                    <p className="text-caption text-slate-500">{s.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
