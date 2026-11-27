"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, CheckCircle2, Headphones, Layers, Rocket, ShieldCheck, ShoppingCart, TrendingUp, Zap, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#0f2333";
const TEAL = "#0f766e";
const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURE_ICONS: LucideIcon[] = [Layers, Zap, TrendingUp, ShieldCheck];
const PROMISE_ICONS: LucideIcon[] = [CheckCircle2, Headphones, ShieldCheck];

const stages__cms = [
  { title: "Start", text: "Launch your website with confidence." },
  { title: "Grow", text: "Reach more customers and expand your content." },
  { title: "Scale", text: "Handle traffic spikes and bigger opportunities." },
];
const features__cms = [
  { title: "Flexible Resources", text: "Add capacity instantly when you need it." },
  { title: "Traffic Ready", text: "Handle sudden spikes with ease." },
  { title: "Easy Upgrades", text: "Scale without rebuilding or downtime." },
  { title: "No Migration Headaches", text: "Keep your site where it belongs." },
];
const promises__cms = [{ label: "30-Day Money-Back Guarantee" }, { label: "24/7 Expert Support" }, { label: "99.9% Uptime Promise" }];

/** Mini browser mock-ups inside the three stage cards. */
function StageMock({ i }: { i: number }) {
  const bar = (
    <div className="flex items-center gap-1 border-b border-slate-100 px-2 py-1.5">
      {["#f87171", "#fbbf24", "#34d399"].map((c) => (
        <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
      ))}
      <span className="ml-2 h-1.5 w-1/3 rounded bg-slate-100" />
    </div>
  );
  const pic = (cls = "") => (
    <div className={`relative overflow-hidden rounded bg-[#cfece6] ${cls}`}>
      <svg viewBox="0 0 60 36" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        <path d="M0 36 L18 16 L30 28 L40 20 L60 36Z" fill="#7cc9bb" />
        <circle cx="16" cy="10" r="4" fill="#a7dcd2" />
      </svg>
    </div>
  );
  return (
    <div className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_10px_24px_-18px_rgba(15,35,51,0.4)]">
      {bar}
      <div className="p-2.5">
        {i === 0 && (
          <div className="flex gap-2">
            {pic("h-16 w-1/2")}
            <div className="flex-1 space-y-1.5 pt-1">
              <span className="block h-1.5 w-full rounded bg-slate-100" />
              <span className="block h-1.5 w-4/5 rounded bg-slate-100" />
              <span className="block h-1.5 w-3/5 rounded bg-slate-100" />
              <span className="mt-3 block h-1.5 w-2/5 rounded bg-[#0f766e]" />
            </div>
          </div>
        )}
        {i === 1 && (
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((k) => (
              <div key={k} className="space-y-1">
                {pic("h-10")}
                <span className="block h-1 w-full rounded bg-slate-100" />
                <span className="block h-1 w-2/3 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        )}
        {i >= 2 && (
          <div className="flex items-end gap-2">
            <svg viewBox="0 0 100 50" className="h-16 flex-1" aria-hidden>
              <path d="M0 48 L18 36 L32 40 L50 24 L66 28 L84 8 L100 2 L100 50 L0 50Z" fill="#cfece6" />
              <path d="M0 48 L18 36 L32 40 L50 24 L66 28 L84 8 L100 2" fill="none" stroke={TEAL} strokeWidth="2" />
            </svg>
            <ShoppingCart className="mb-2 h-5 w-5" style={{ color: TEAL }} />
          </div>
        )}
      </div>
    </div>
  );
}

/** "More Traffic? No Problem." - start / grow / scale, scaling features and a call to action. */
export default function WebHostingScale() {
  const $t = useCmsText();
  const stages = useCmsData("WebHostingScale__stages", stages__cms);
  const features = useCmsData("WebHostingScale__features", features__cms);
  const promises = useCmsData("WebHostingScale__promises", promises__cms);

  return (
    <section className="relative overflow-hidden bg-[#f7f9fb] py-16 lg:py-24">
      <Container className="relative">
        <div className="relative mx-auto max-w-[1140px]">
          {/* header */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="text-center">
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: TEAL }}>
              <span className="grid h-6 w-6 place-items-center rounded-md bg-[#e1f3ef]"><BarChart3 className="h-3.5 w-3.5" /></span>
              {html($t("WebHostingScale__t1", "Built to scale"))}
            </span>
            <h2 className="text-h2 font-heading mt-4 font-bold tracking-[-0.02em]" style={{ color: NAVY }}>{rich($t("WebHostingScale__t2m", "More Traffic? <span class=\"text-[#0f766e]\">No Problem.</span>"))}</h2>
            <p className="text-body mx-auto mt-3 max-w-[560px] text-slate-600">{rich($t("WebHostingScale__t4", "Your hosting grows with your business—so you never have to slow down."))}</p>
            <span aria-hidden className="mx-auto mt-5 flex w-fit items-center gap-1.5"><i className="h-[3px] w-10 rounded-full" style={{ background: TEAL }} /><i className="h-[3px] w-[3px] rounded-full" style={{ background: TEAL }} /></span>
          </motion.div>

          {/* floating note */}
          <motion.div
            className="absolute right-0 top-[128px] hidden items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_18px_40px_-24px_rgba(15,35,51,0.45)] ring-1 ring-slate-100 xl:flex"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eef7f5]"><TrendingUp className="h-5 w-5" style={{ color: TEAL }} /></span>
            <p className="text-[12px] font-bold uppercase leading-snug tracking-wide" style={{ color: NAVY }}>{rich($t("WebHostingScale__t5m", "Your business <span class=\"text-[#0f766e]\">grows</span><br>Your hosting <span class=\"text-[#0f766e]\">keeps up</span>"))}</p>
          </motion.div>

          {/* stages */}
          <div className="relative mt-12 lg:mt-16">
            <svg aria-hidden viewBox="0 0 1000 120" preserveAspectRatio="none" className="pointer-events-none absolute -top-16 left-[18%] hidden h-24 w-[66%] lg:block" fill="none">
              <motion.path d="M0 110 C 200 60, 420 40, 560 45 S 800 40, 990 5" stroke="#5fb8aa" strokeWidth="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut" }} />
              <circle cx="560" cy="45" r="6" fill={TEAL} />
              <circle cx="760" cy="38" r="6" fill={TEAL} />
              <path d="M968 0 L996 4 L980 26Z" fill={TEAL} />
            </svg>
            <div className="grid items-center gap-6 lg:grid-cols-[90px_1fr_32px_1fr_32px_1fr_90px] lg:gap-3">
              <div className="hidden flex-col items-center gap-2 lg:flex">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-[0_10px_24px_-14px_rgba(15,35,51,0.45)] ring-1 ring-slate-100"><Rocket className="h-7 w-7" style={{ color: TEAL }} /></span>
                <span className="text-caption font-medium text-slate-600">{html($t("WebHostingScale__t9", "Get Started"))}</span>
              </div>
              {stages.map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <span aria-hidden className="mx-auto hidden h-8 w-8 place-items-center rounded-full border-2 bg-white lg:grid" style={{ borderColor: TEAL, color: TEAL }}>
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                  <motion.div
                    className="rounded-2xl bg-white p-5 shadow-[0_18px_40px_-28px_rgba(15,35,51,0.45)] ring-1 ring-slate-100"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: EASE }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-slate-200 text-[15px] font-bold" style={{ color: TEAL }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[16px] font-bold uppercase tracking-wide" style={{ color: NAVY }}>{s.title}</h3>
                        <p className="text-caption mt-1 leading-relaxed text-slate-500">{s.text}</p>
                      </div>
                    </div>
                    <StageMock i={i} />
                  </motion.div>
                </React.Fragment>
              ))}
              <div className="hidden flex-col items-center gap-2 lg:flex">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-[0_10px_24px_-14px_rgba(15,35,51,0.45)] ring-1 ring-slate-100"><BarChart3 className="h-7 w-7" style={{ color: TEAL }} /></span>
                <span className="text-caption font-medium text-slate-600">{html($t("WebHostingScale__t10", "Keep Scaling"))}</span>
              </div>
            </div>
          </div>

          {/* features */}
          <ul className="mt-8 grid grid-cols-1 gap-5 rounded-2xl bg-white px-6 py-6 shadow-[0_18px_40px_-30px_rgba(15,35,51,0.45)] ring-1 ring-slate-100 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-slate-200">
            {features.map((f, i) => {
              const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
              return (
                <li key={i} className="flex items-start gap-3 lg:px-4 lg:first:pl-0">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#e8f5f2]"><Icon className="h-6 w-6" style={{ color: TEAL }} /></span>
                  <div>
                    <h3 className="text-[14px] font-bold" style={{ color: TEAL }}>{f.title}</h3>
                    <p className="text-caption mt-1 text-slate-600">{f.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* call to action */}
          <motion.div
            className="relative mt-6 overflow-hidden rounded-2xl bg-[linear-gradient(110deg,#062a38,#0a3c46_55%,#0b4a4f)] px-6 py-7 shadow-[0_24px_50px_-24px_rgba(6,42,56,0.7)] sm:px-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="grid items-center gap-6 lg:grid-cols-[150px_1fr_auto]">
              <Image src={$t("WebHostingScale__t11", "/web-hosting/server-stack.webp")} alt={$t("WebHostingScale__t12", "Cloud server stack")} width={222} height={180} className="edge-fade mx-auto h-auto w-[130px] mix-blend-screen" />
              <div>
                <p className="text-h5 font-heading font-semibold text-white">{html($t("WebHostingScale__t13", "Start with what you need today."))}</p>
                <p className="text-h5 font-heading font-semibold text-[#3fd3b8]">{html($t("WebHostingScale__t14", "Scale when your business demands more."))}</p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {promises.map((p, i) => {
                    const Icon = PROMISE_ICONS[i % PROMISE_ICONS.length];
                    return (
                      <li key={i} className="flex items-center gap-2 text-caption text-white/80">
                        <Icon className="h-4 w-4 text-[#3fd3b8]" />
                        {p.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={$t("WebHostingScale__t15", "/contact")} className="group inline-flex items-center gap-3 rounded-full bg-[#14907f] py-2 pl-6 pr-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#12a08c]">
                  {$t("WebHostingScale__t16", "Get Started Now")}
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#0f766e] transition-transform group-hover:translate-x-0.5"><ArrowRight className="h-4 w-4" /></span>
                </Link>
                <Link href={$t("WebHostingScale__t17", "/contact")} className="inline-flex items-center rounded-full border border-white/40 px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/10">
                  {$t("WebHostingScale__t18", "View Plans")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
