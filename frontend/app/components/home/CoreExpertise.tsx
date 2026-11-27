"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";
import OrganicTrafficChart from "./OrganicTrafficChart";
import { DrawMonitorCodeIcon, DrawSearchIcon, DrawCheckIcon, DrawBarChartUpIcon, DrawArrowIcon } from "../shared/drawIcons";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const TEAL = "#0d9488";

const webDevChecklist__cms = [
  "Custom & Responsive Design",
  "High-Performance Development",
  "SEO-Friendly & Fast Loading",
  "Secure, Scalable & Future-Ready",
  "Conversion-Focused UI/UX",
];

const seoChecklist__cms = [
  "Keyword Research & Strategy",
  "On-Page & Technical SEO",
  "High-Quality Link Building",
  "Local SEO & Google Business Profile",
  "SEO Reporting & Analytics",
];

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <DrawCheckIcon className="h-3 w-3" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ExploreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-8 flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80 lg:mt-auto lg:pt-8"
      style={{ color: TEAL }}
    >
      <DrawArrowIcon />
      {children}
    </Link>
  );
}

export default function CoreExpertise() {
  const $t = useCmsText();
  const webDevChecklist = useCmsData("CoreExpertise__webDevChecklist", webDevChecklist__cms);
  const seoChecklist = useCmsData("CoreExpertise__seoChecklist", seoChecklist__cms);
  return (
    <section className="bg-white pb-8 pt-8 lg:pb-10 lg:pt-10">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide"
            style={{ borderColor: "rgba(13,148,136,0.3)", color: TEAL, backgroundColor: "#e6f6f4" }}
          >
            {html($t("CoreExpertise__t1", "OUR CORE EXPERTISE"))}</span>
          <h2 className="text-h2 mt-4 font-bold" style={{ color: NAVY }}>{rich($t("CoreExpertise__t2m", "Our Core Expertise, <span class=\"text-[#0d9488]\">Your Competitive Advantage</span>"))}</h2>
          <p className="text-body mt-4 text-slate-500">{rich($t("CoreExpertise__t4m", "We specialize in two core areas that drive real results for your business.<br class=\"hidden sm:block\"> Beautiful websites that convert visitors and SEO strategies that bring qualified traffic."))}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Website Design & Development */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
            <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-[1fr_1.2fr]">
              {/* Left column: all text content */}
              <div className="flex flex-col">
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "#e6f6f4", color: TEAL }}
                  >
                    <DrawMonitorCodeIcon />
                  </span>
                  <h3 className="text-h6 font-bold" style={{ color: NAVY }}>
                    {html($t("CoreExpertise__t6", "Website Design & Development"))}</h3>
                </div>

                <p className="text-small mt-4 text-slate-500">
                  {rich($t("CoreExpertise__t7", "We design and build fast, responsive, and conversion-focused websites that create a powerful first impression and turn visitors into loyal customers."))}</p>

                <Checklist items={webDevChecklist} />

                <ExploreLink href={$t("CoreExpertise__t8", "/web-software/website-development")}>{$t("CoreExpertise__t9", "Explore Web Development")}</ExploreLink>
              </div>

              {/* Right column: laptop preview */}
              <div className="relative mx-auto w-full max-w-[340px] self-start sm:mx-0 sm:max-w-none">
                <Image
                  src={$t("CoreExpertise__t10", "/Laptop.webp")}
                  alt={$t("CoreExpertise__t11", "Website design preview shown on a laptop")}
                  width={1440}
                  height={1092}
                  className="w-full"
                />
                <div className="absolute -bottom-3 right-[-8px] flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-[0_15px_35px_-10px_rgba(15,23,42,0.25)] ring-1 ring-slate-100 sm:right-2">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "#e6f6f4", color: TEAL }}
                  >
                    <DrawBarChartUpIcon />
                  </span>
                  <div>
                    <p className="text-small font-bold" style={{ color: NAVY }}>
                      {rich($t("CoreExpertise__t12", "3.2X"))}</p>
                    <p className="text-[10px] leading-tight text-slate-500">{rich($t("CoreExpertise__t13m", "Higher Conversion Rate<br>For Our Clients"))}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
            <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-[1fr_230px]">
              {/* Left column: all text content */}
              <div className="flex flex-col">
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "#e6f6f4", color: TEAL }}
                  >
                    <DrawSearchIcon />
                  </span>
                  <h3 className="text-h6 font-bold" style={{ color: NAVY }}>
                    {html($t("CoreExpertise__t15", "Search Engine Optimization (SEO)"))}</h3>
                </div>

                <p className="text-small mt-4 text-slate-500">
                  {rich($t("CoreExpertise__t16", "We help your business rank higher on Google, attract qualified traffic, and grow consistently with result-driven SEO strategies."))}</p>

                <Checklist items={seoChecklist} />

                <ExploreLink href={$t("CoreExpertise__t17", "/seo")}>{$t("CoreExpertise__t18", "Explore SEO Services")}</ExploreLink>
              </div>

              {/* Right column: traffic chart + stat panels */}
              <div className="flex flex-col gap-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <p className="text-caption text-slate-500">{rich($t("CoreExpertise__t19", "Organic Traffic"))}</p>
                  <p className="text-body font-bold" style={{ color: TEAL }}>
                    {rich($t("CoreExpertise__t20", "+247%"))}</p>
                  <p className="text-[10px] text-slate-400">{rich($t("CoreExpertise__t21", "Increase in 6 Months"))}</p>
                  <div className="mt-1 h-14 w-full">
                    <OrganicTrafficChart />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p className="text-body font-bold" style={{ color: NAVY }}>
                      {rich($t("CoreExpertise__t22", "320+"))}</p>
                    <p className="text-[10px] leading-tight text-slate-500">{rich($t("CoreExpertise__t23", "Keywords Ranked"))}</p>
                    <p className="text-[10px] leading-tight text-slate-400">{rich($t("CoreExpertise__t24", "Top 3 Positions"))}</p>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <p className="text-body font-bold" style={{ color: NAVY }}>
                      {rich($t("CoreExpertise__t25", "1.8M+"))}</p>
                    <p className="text-[10px] leading-tight text-slate-500">{rich($t("CoreExpertise__t26", "Impressions"))}</p>
                    <p className="text-[10px] leading-tight text-slate-400">{rich($t("CoreExpertise__t27", "in 6 Months"))}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-[11px] font-semibold" style={{ color: TEAL }}>
                    {rich($t("CoreExpertise__t28", "yourbusiness.com"))}</p>
                  <p className="text-[10px] text-slate-500">{rich($t("CoreExpertise__t29", "Your Business — Official Site"))}</p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                    <div className="h-1.5 w-[92%] rounded-full" style={{ backgroundColor: TEAL }} />
                  </div>
                  <p className="mt-1 text-[10px] font-semibold text-slate-600">{rich($t("CoreExpertise__t30", "#1 Position on Google"))}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
