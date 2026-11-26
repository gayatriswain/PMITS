"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Cloud, Database, Gauge, Globe, Headphones, Layers, Lock, MapPin, MousePointer2, Server, ShieldCheck, SlidersHorizontal, Zap, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#0f2333";
const TEAL = "#0f766e";
const EASE = [0.22, 1, 0.36, 1] as const;

const TAB_ICONS: LucideIcon[] = [Gauge, ShieldCheck, Database];
const ROW_ICONS: LucideIcon[] = [Zap, Gauge, MousePointer2];
const CHANGE_ICONS: LucideIcon[] = [Server, Layers, Globe, SlidersHorizontal];
const STAT_ICONS: LucideIcon[] = [Gauge, ShieldCheck, Headphones, Cloud];

/**
 * Before / after numbers per tab. Only tabs that have rows are shown, so Uptime and Reliability
 * appear once their real numbers are entered in the CMS.
 */
const tabs__cms = [
  {
    label: "Speed",
    rows: [
      { metric: "Load time", before: "5.6s", beforeNote: "Slow", after: "1.8s", afterNote: "Super Fast" },
      { metric: "Performance Score", before: "68", beforeNote: "Needs Improvement", after: "96", afterNote: "Excellent" },
      { metric: "Time to Interactive", before: "3.2s", beforeNote: "Slow", after: "1.1s", afterNote: "Super Fast" },
    ],
  },
  { label: "Uptime", rows: [] as { metric: string; before: string; beforeNote: string; after: string; afterNote: string }[] },
  { label: "Reliability", rows: [] as { metric: string; before: string; beforeNote: string; after: string; afterNote: string }[] },
];
const changes__cms = [{ label: "Optimized Hosting" }, { label: "Caching Layer" }, { label: "Global CDN" }, { label: "Server Tuning" }];
const stats__cms = [
  { value: "99.9%", label: "Uptime Across All Servers" },
  { value: "10K+", label: "Websites Trust Us" },
  { value: "24/7", label: "Expert Support" },
  { value: "Daily", label: "Backups & Monitoring" },
];
const clientNav__cms = ["Home", "About", "Services", "Blog", "Contact"];
const clientLogos__cms = ["logipsum", "IPSUM", "logo ipsum", "Logipsum", "LOGO"];

/** "Hosting You Can See Working." - a client site with before/after numbers and headline stats. */
export default function WebHostingResults() {
  const $t = useCmsText();
  const allTabs = useCmsData("WebHostingResults__tabs", tabs__cms);
  const changes = useCmsData("WebHostingResults__changes", changes__cms);
  const stats = useCmsData("WebHostingResults__stats", stats__cms);
  const clientNav = useCmsData("WebHostingResults__clientNav", clientNav__cms);
  const clientLogos = useCmsData("WebHostingResults__clientLogos", clientLogos__cms);
  const tabs = allTabs.map((t, i) => ({ ...t, icon: TAB_ICONS[i % TAB_ICONS.length] })).filter((t) => t.rows?.some((r) => r.before || r.after));
  const [active, setActive] = useState(0);
  const tab = tabs[Math.min(active, tabs.length - 1)];

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[1100px] rounded-[28px] border border-slate-100 bg-white px-4 py-10 shadow-[0_24px_60px_-40px_rgba(15,35,51,0.35)] sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eef7f5] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em]" style={{ color: TEAL }}>
              <BarChart3 className="h-4 w-4" />
              {$t("WebHostingResults__t1", "Real results")}
            </span>
            <h2 className="text-h2 font-heading mt-4 font-bold tracking-[-0.02em]" style={{ color: NAVY }}>
              {$t("WebHostingResults__t2", "Hosting You Can See")} <span style={{ color: TEAL }}>{$t("WebHostingResults__t3", "Working.")}</span>
            </h2>
            <p className="text-body mx-auto mt-3 max-w-[560px] text-slate-600">{rich($t("WebHostingResults__t4", "Real performance, real uptime, real websites — not just hosting promises."))}</p>
          </motion.div>

          {tabs.length > 1 && (
            <div role="tablist" className="mx-auto mt-7 flex w-fit flex-wrap justify-center gap-1 rounded-full bg-white p-1.5 shadow-[0_10px_30px_-18px_rgba(15,35,51,0.4)] ring-1 ring-slate-100">
              {tabs.map((t, i) => {
                const on = t === tab;
                return (
                  <button
                    key={t.label}
                    role="tab"
                    aria-selected={on}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-[13px] font-bold uppercase tracking-wide transition-colors ${on ? "text-white" : "text-slate-700 hover:bg-slate-50"}`}
                    style={on ? { background: TEAL } : undefined}
                  >
                    <t.icon className="h-4 w-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-8 grid gap-6 rounded-2xl border border-slate-100 p-4 sm:p-6 lg:grid-cols-[1.05fr_1fr]">
            {/* client website */}
            <div>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_16px_40px_-28px_rgba(15,35,51,0.5)]">
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                  {["#f87171", "#fbbf24", "#34d399"].map((c) => (
                    <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
                  ))}
                  <span className="ml-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] text-slate-600 ring-1 ring-slate-200">
                    <Lock className="h-3 w-3 text-emerald-600" />
                    {$t("WebHostingResults__t5", "yourclientwebsite.com")}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold" style={{ color: NAVY }}>{$t("WebHostingResults__t6", "YourClient")}</span>
                    <span className="hidden items-center gap-4 text-[10px] text-slate-600 sm:flex">
                      {clientNav.map((n) => <span key={n}>{n}</span>)}
                      <span className="rounded px-2 py-1 font-semibold text-white" style={{ background: TEAL }}>{$t("WebHostingResults__t7", "Get Started")}</span>
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-[1fr_0.9fr] items-center gap-4">
                    <div>
                      <p className="text-h5 font-heading font-bold leading-tight" style={{ color: NAVY }}>
                        {$t("WebHostingResults__t8", "Digital solutions that drive")} <span style={{ color: TEAL }}>{$t("WebHostingResults__t9", "real growth.")}</span>
                      </p>
                      <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{$t("WebHostingResults__t10", "We help businesses build fast, secure and high-performing websites.")}</p>
                      <span className="mt-3 inline-flex items-center gap-1 rounded px-3 py-1.5 text-[10px] font-semibold text-white" style={{ background: TEAL }}>{$t("WebHostingResults__t11", "Explore Services")} →</span>
                    </div>
                    <Image src={$t("WebHostingResults__t12", "/web-hosting/client-building.webp")} alt={$t("WebHostingResults__t13", "Modern office building")} width={289} height={315} className="h-auto w-full rounded-lg object-cover" />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-slate-400">
                    {clientLogos.map((l) => <span key={l}>{l}</span>)}
                  </div>
                </div>
              </div>
              <p className="mt-3 flex items-center gap-2 text-caption text-slate-600">
                <MapPin className="h-4 w-4" style={{ color: TEAL }} />
                {$t("WebHostingResults__t14", "Business Website • WordPress • USA")}
              </p>
            </div>

            {/* before / after */}
            <div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center px-2 text-[12px] font-bold uppercase tracking-wide">
                <span className="text-center" style={{ color: NAVY }}>{$t("WebHostingResults__t15", "Before")}</span>
                <svg viewBox="0 0 60 12" className="h-3 w-14" fill="none" aria-hidden><path d="M2 9 C 20 1, 40 1, 56 6" stroke={NAVY} strokeWidth="1.4" /><path d="M51 2 L57 6 L51 9" stroke={NAVY} strokeWidth="1.4" /></svg>
                <span className="text-center" style={{ color: TEAL }}>{$t("WebHostingResults__t16", "With ProManage")}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={tab?.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="mt-3 space-y-3">
                  {tab?.rows.map((r, i) => {
                    const Icon = ROW_ICONS[i % ROW_ICONS.length];
                    return (
                      <div key={i}>
                        {i > 0 && <p className="mb-1 text-center text-[11px] text-slate-500">{r.metric}</p>}
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center rounded-xl border border-slate-100 bg-white px-3 py-4 shadow-[0_8px_20px_-16px_rgba(15,35,51,0.4)]">
                          <div className="text-center">
                            <p className="text-h3 font-heading font-bold leading-none" style={{ color: NAVY }}>{r.before}</p>
                            <p className="mt-1 text-[12px] text-rose-500">{r.beforeNote}</p>
                          </div>
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-white shadow ring-1 ring-slate-100"><Icon className="h-5 w-5" style={{ color: TEAL }} /></span>
                          <div className="text-center">
                            <p className="text-h3 font-heading font-bold leading-none" style={{ color: TEAL }}>{r.after}</p>
                            <p className="mt-1 text-[12px]" style={{ color: TEAL }}>{r.afterNote}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
              <div className="mt-3 rounded-xl bg-[#eef6f6] px-4 py-4">
                <p className="text-center text-[13px] font-bold" style={{ color: NAVY }}>{$t("WebHostingResults__t17", "What changed?")}</p>
                <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {changes.map((c, i) => {
                    const Icon = CHANGE_ICONS[i % CHANGE_ICONS.length];
                    return (
                      <li key={i} className="flex items-center gap-2 text-[11px] leading-tight text-slate-600">
                        <Icon className="h-5 w-5 shrink-0" style={{ color: NAVY }} />
                        {c.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* headline stats */}
          <ul className="mt-6 grid grid-cols-2 gap-5 rounded-2xl bg-[#eef6f6] px-5 py-6 lg:grid-cols-4 lg:divide-x lg:divide-slate-300/60">
            {stats.map((s, i) => {
              const Icon = STAT_ICONS[i % STAT_ICONS.length];
              return (
                <li key={i} className="flex items-center gap-3 lg:justify-center lg:px-3">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white shadow-sm"><Icon className="h-7 w-7" style={{ color: TEAL }} /></span>
                  <span>
                    <span className="text-h5 font-heading block font-bold" style={{ color: TEAL }}>{s.value}</span>
                    <span className="block max-w-[120px] text-[12px] leading-snug text-slate-600">{s.label}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 flex items-center justify-center gap-2 text-caption text-slate-500">
            <Lock className="h-3.5 w-3.5" />
            {$t("WebHostingResults__t18", "Measured performance from active websites hosted on ProManage.")}
          </p>
        </div>
      </Container>
    </section>
  );
}
