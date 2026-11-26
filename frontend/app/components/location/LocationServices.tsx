"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";
import { ArrowIcon, BuildingIcon, CartIcon, CheckIcon, GearIcon, PencilIcon, PinIcon, PlusIcon, SearchIcon, TrophyIcon, UsersIcon } from "../shared/icons";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";

const TEAL = "#0d9488";

const DARK = "#0b3b35";

const digitalServiceHighlights__cms = [
  { icon: PinIcon, title: "Local Focus", desc: "Deep understanding of Noida market & customer behavior." },
  { icon: UsersIcon, title: "Business Growth", desc: "Solutions designed to generate leads, sales & growth." },
  { icon: TrophyIcon, title: "Proven Results", desc: "Transparent work. Measurable results. Long-term impact." },
];

const wpChecklist__cms = [
  "Custom WordPress Website Design",
  "Theme Customization & Development",
  "Plugin Development & Integration",
  "WooCommerce Development",
  "Website Migration to WordPress",
  "Speed Optimization & Performance",
  "Security, Maintenance & Support",
];

const wpServiceCards__cms = [
  {
    icon: SearchIcon,
    number: "01",
    title: "SEO Services",
    desc: "Rank higher on Google and attract the right customers in Noida.",
    cta: "Explore SEO",
    href: "/seo",
  },
  {
    icon: CartIcon,
    number: "02",
    title: "E-commerce Development",
    desc: "Build online stores that convert visitors into paying customers.",
    cta: "Explore E-commerce",
    href: "/web-software/shopify-web-design",
  },
  {
    icon: PencilIcon,
    number: "03",
    title: "Website Design",
    desc: "Beautiful, responsive and conversion-focused websites for businesses.",
    cta: "Explore Design",
    href: "/web-software/website-development",
  },
  {
    icon: GearIcon,
    number: "04",
    title: "Website Maintenance",
    desc: "Keep your website secure, updated and performing at its best.",
    cta: "Explore Maintenance",
    href: "/web-software/web-hosting",
  },
];

const noidaLocations__cms = [
  { name: "Sector 62", sub: "Noida" },
  { name: "Sector 18", sub: "Noida" },
  { name: "Sector 126", sub: "Noida" },
  { name: "Greater Noida", sub: "West" },
  { name: "Noida Extension", sub: "NCR" },
];

/** Moved out of app/location/page.tsx so its content can be edited in the CMS (markup unchanged). */
export default function LocationServices({ slot1 }: { slot1: ReactNode }) {
  const $t = useCmsText();
  const digitalServiceHighlights = useCmsData("LocationServices__digitalServiceHighlights", digitalServiceHighlights__cms);
  const wpChecklist = useCmsData("LocationServices__wpChecklist", wpChecklist__cms);
  const wpServiceCards = useCmsData("LocationServices__wpServiceCards", wpServiceCards__cms);
  const noidaLocations = useCmsData("LocationServices__noidaLocations", noidaLocations__cms);
  return (
    <section className="py-12 md:py-16">
      <Container>
      <div className="mx-auto lg:w-[90%]">
        {slot1}

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              style={{ color: TEAL }}
            >
              <span className="h-px w-5" style={{ backgroundColor: TEAL }} />
              {$t("LocationServices__t1", "Our Digital Services in Noida")}</span>
            <h2 className="text-h2 mt-3 font-serif font-bold" style={{ color: NAVY }}>
              {$t("LocationServices__t2", "Digital Solutions")}<br />
              {$t("LocationServices__t3", "That Drive Growth ")}<span style={{ color: TEAL }}>{$t("LocationServices__t4", "in Noida")}</span>
            </h2>
            <p className="text-small mt-4 max-w-md text-slate-600">
              {rich($t("LocationServices__t5", "From WordPress development to powerful SEO strategies, we provide end-to-end digital solutions tailored for businesses in Noida."))}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {digitalServiceHighlights.map((h) => (
              <div
                key={h.title}
                className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 p-4 text-center"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#e6f6f4", color: TEAL }}
                >
                  <h.icon />
                </span>
                <p className="text-small font-bold" style={{ color: NAVY }}>
                  {h.title}
                </p>
                <p className="text-caption text-slate-500">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WordPress development focus */}
        <div className="relative mt-10 w-full rounded-[2rem] border border-slate-200/80 bg-slate-50/60 p-6 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.2)] sm:p-10">
          {/* Badge straddling the top border, masking the line right behind the text */}
          <span
            className="absolute left-1/2 top-0 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 bg-white px-4 text-xs font-bold uppercase tracking-widest"
            style={{ color: TEAL }}
          >
            <span
              className="h-1 w-10"
              style={{
                backgroundImage: `radial-gradient(${TEAL} 1px, transparent 1.5px)`,
                backgroundSize: "7px 100%",
                backgroundRepeat: "repeat-x",
              }}
            />
            {$t("LocationServices__t6", "What We Do Best")}<span
              className="h-1 w-10"
              style={{
                backgroundImage: `radial-gradient(${TEAL} 1px, transparent 1.5px)`,
                backgroundSize: "7px 100%",
                backgroundRepeat: "repeat-x",
              }}
            />
          </span>

          <div className="mx-auto max-w-2xl pt-2 text-center">
            <h2 className="text-h2 mt-3 font-serif font-bold" style={{ color: NAVY }}>
              {$t("LocationServices__t7", "WordPress Development Services ")}<span style={{ color: TEAL }}>{$t("LocationServices__t8", "in Noida")}</span>
            </h2>
            <p className="text-small mt-3 text-slate-500">
              {rich($t("LocationServices__t9", "We build fast, secure, scalable and SEO-friendly WordPress websites that help businesses in Noida establish a strong online presence."))}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            {/* Left: WordPress focus card */}
            <div className="flex gap-4">
              <div className="hidden shrink-0 flex-col items-center gap-3 lg:flex">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-400"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {$t("LocationServices__t10", "Our Core Focus")}</span>
                <span className="h-16 w-px bg-slate-200" />
              </div>
              <div>
                <div className="relative h-28 w-28">
                  {/* Orbit ring with revolving dots */}
                  <div className="animate-orbit-spin absolute inset-0">
                    <span
                      className="absolute inset-0 rounded-full border border-dashed"
                      style={{ borderColor: "rgba(13,148,136,0.3)" }}
                    />
                    {[0, 120, 240].map((deg) => (
                      <span
                        key={deg}
                        className="absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: TEAL, transform: `rotate(${deg}deg) translateX(3.5rem)` }}
                      />
                    ))}
                  </div>

                  {/* Static WordPress badge */}
                  <Image
                    src={$t("LocationServices__t11", "/wordpress-logo-svgrepo-com.webp")}
                    alt={$t("LocationServices__t12", "WordPress")}
                    width={64}
                    height={64}
                    className="absolute inset-0 m-auto h-16 w-16 rounded-full"
                  />
                </div>
                <h3 className="text-h5 mt-4 font-bold" style={{ color: NAVY }}>
                  {$t("LocationServices__t13", "WordPress Development")}<br />
                  <span style={{ color: TEAL }}>{$t("LocationServices__t14", "Services in Noida")}</span>
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {wpChecklist.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <CheckIcon className="h-2.5 w-2.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <Link
                    href={$t("LocationServices__t15", "/contact")}
                    className="flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: DARK }}
                  >
                    {$t("LocationServices__t16", "Discuss Your Project ")}<ArrowIcon />
                  </Link>
                  <Link
                    href={$t("LocationServices__t17", "/portfolio")}
                    className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{ color: TEAL }}
                  >
                    {$t("LocationServices__t18", "View Our Work")}<span
                      className="flex h-5 w-5 items-center justify-center rounded-full border"
                      style={{ borderColor: TEAL }}
                    >
                      <PlusIcon className="h-2.5 w-2.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: 2x2 service cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {wpServiceCards.map((c) => (
                <div
                  key={c.title}
                  className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5"
                >
                  <span
                    className="pointer-events-none absolute right-4 top-2 text-3xl font-extrabold text-slate-100"
                    aria-hidden
                  >
                    {c.number}
                  </span>
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ backgroundImage: `linear-gradient(135deg, ${DARK}, ${TEAL})`, color: "#ffffff" }}
                  >
                    <c.icon />
                  </span>
                  <p className="text-body mt-3 font-bold" style={{ color: NAVY }}>
                    {c.title}
                  </p>
                  <p className="text-caption mt-1.5 text-slate-500">{c.desc}</p>
                  <Link
                    href={c.href}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-80"
                    style={{ color: TEAL }}
                  >
                    {c.cta} <ArrowIcon />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Local presence across Noida & NCR */}
        <div className="mt-8 flex flex-col items-center gap-8 rounded-3xl border border-slate-100 bg-[#F4F8F9] p-[10px] shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)] lg:flex-row lg:gap-10">
          <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl sm:w-48 lg:w-44">
            <Image src={$t("LocationServices__t19", "/local area.webp")} alt={$t("LocationServices__t20", "Noida skyline")} fill className="object-cover" />
          </div>

          <div className="text-center lg:max-w-xs lg:shrink-0 lg:text-left">
            <p className="text-caption font-bold uppercase tracking-widest" style={{ color: TEAL }}>
              {rich($t("LocationServices__t21", "Local Roots. Better Results."))}</p>
            <h3 className="text-h6 mt-2 font-bold" style={{ color: NAVY }}>
              {$t("LocationServices__t22", "Proudly Serving Businesses Across ")}<span style={{ color: TEAL }}>{$t("LocationServices__t23", "Noida")}</span>
            </h3>
            <p className="text-small mt-2 text-slate-500">
              {rich($t("LocationServices__t24", "We work with companies and startups in all major sectors and locations of Noida & NCR."))}</p>
          </div>

          <span className="hidden h-20 w-px bg-slate-200 lg:block" />

          <div className="grid w-full flex-1 grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {noidaLocations.map((l) => (
              <div key={l.name} className="flex flex-col items-center gap-2 text-center">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white"
                  style={{ color: TEAL }}
                >
                  <BuildingIcon />
                </span>
                <p className="text-caption font-bold" style={{ color: NAVY }}>
                  {l.name}
                </p>
                <p className="text-[10px] text-slate-400">{l.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </Container>
    </section>
  );
}
