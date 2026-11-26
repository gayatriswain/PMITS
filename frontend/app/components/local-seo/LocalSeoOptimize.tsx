"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, FileText, Gauge, MapPin, Megaphone, MapPinned, Network, Search, Star, Store, Target, TrendingUp, Users } from "lucide-react";
import { Inner, LH2, LS, Panel, T, ease, heading } from "./LocalSeoShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const SERVICES__cms = [
  { Icon: Store, title: "Google Business Profile Optimization", text: "Complete, optimize and enhance your GBP to rank higher and get noticed." },
  { Icon: Search, title: "Local Keyword Strategy", text: "Target the right local keywords that your customers are actually searching." },
  { Icon: Megaphone, title: "On-Page Local SEO", text: "Optimize your website pages to make them relevant, visible and conversion-ready." },
  { Icon: MapPinned, title: "Local Citations & Directories", text: "Build consistent citations across trusted directories to boost local authority." },
  { Icon: Star, title: "Reviews & Reputation Management", text: "Get more positive reviews and manage your reputation to build trust and credibility." },
  { Icon: FileText, title: "Location Pages Optimization", text: "Optimize location pages to rank better and convert local visitors." },
  { Icon: Network, title: "Local Schema & Structured Data", text: "Implement schema markup to help search engines understand your business better." },
  { Icon: Gauge, title: "Technical SEO for Local", text: "Improve site speed, mobile experience and technical health for better local rankings." },
];

const WINS__cms = [
  { Icon: Eye, label: "Rank Higher in Local Searches" },
  { Icon: Users, label: "Attract More Local Customers" },
  { Icon: MapPin, label: "Increase Foot Traffic" },
  { Icon: TrendingUp, label: "Grow Your Business" },
];

export default function LocalSeoOptimize() {
  const $t = useCmsText();
  const SERVICES = useCmsData("LocalSeoOptimize__SERVICES", SERVICES__cms);
  const WINS = useCmsData("LocalSeoOptimize__WINS", WINS__cms);
  return (
    <Panel inner="!bg-[#f6f8fa]">
      <Inner className="!max-w-[1360px] py-14 sm:py-16 lg:py-20 2xl:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <LH2 size="text-[clamp(32px,3.3vw,64px)]">
              {$t("LocalSeoOptimize__t1", "What We ")}<T>{$t("LocalSeoOptimize__t2", "Optimize.")}</T>
            </LH2>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease }}
              className="mt-4 block h-[3px] w-20 origin-left rounded-full bg-[#0f766e]"
            />
            <p className="text-body mt-5 max-w-[520px] text-slate-600">
              {rich($t("LocalSeoOptimize__t3", "Let's top-end Local SEO that improves "))}<b className="font-semibold text-[#0f766e]">visibility</b>, <b className="font-semibold text-[#0f766e]">trust</b> and{" "}
              <b className="font-semibold text-[#0f766e]">{$t("LocalSeoOptimize__t4", "foot traffic.")}</b>
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="relative aspect-[2.78] w-full"
          >
            <Image src={LS.routeScene} alt={$t("LocalSeoOptimize__t5", "Route leading to a local shop on a map")} fill sizes="(min-width:1024px) 680px, 95vw" className="object-contain [mask-image:radial-gradient(60%_70%_at_50%_50%,#000_60%,transparent)]" />
          </motion.div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-6">
          {SERVICES.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.6, ease }}
              className="group flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-6 pb-7 pt-7 text-center shadow-[0_18px_40px_-30px_rgba(15,40,80,.5)] transition duration-300 hover:-translate-y-1.5 hover:border-teal-100 hover:shadow-[0_26px_46px_-26px_rgba(15,118,110,.45)]"
            >
              <span className="relative flex h-[88px] w-[88px] items-center justify-center 2xl:h-[112px] 2xl:w-[112px]">
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90 transition-transform duration-700 group-hover:rotate-[90deg]" aria-hidden>
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#e2f2f0" strokeWidth="2" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="#14a39a"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 1 }}
                  />
                </svg>
                <span className="flex h-[70px] w-[70px] 2xl:h-[90px] 2xl:w-[90px] items-center justify-center rounded-full bg-gradient-to-b from-teal-50 to-white text-[#0f766e] shadow-[0_8px_20px_-10px_rgba(15,118,110,.5)]">
                  <Icon className="h-8 w-8 2xl:h-10 2xl:w-10" strokeWidth={1.7} />
                </span>
              </span>
              <h3 className={`${heading.className} mt-5 min-h-[2.6em] text-[17px] font-semibold leading-snug text-[#0b1b33] 2xl:text-[19px]`}>{title}</h3>
              <p className="text-small mt-2 text-slate-600">{text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="mt-8 grid gap-5 rounded-[28px] border border-slate-100 bg-white px-7 py-5 shadow-[0_20px_44px_-32px_rgba(15,40,80,.5)] sm:grid-cols-2 lg:grid-cols-[auto_repeat(4,1fr)] lg:items-center lg:gap-0"
        >
          <div className="flex items-center gap-4 sm:col-span-full lg:col-span-1 lg:pr-8">
            <Target className="h-14 w-14 shrink-0 text-[#14a39a]" strokeWidth={1.6} />
            <p className={`text-body ${heading.className} font-semibold text-[#0b1b33]`}>
              {rich($t("LocalSeoOptimize__t6", "More Visibility."))}<br /> {rich($t("LocalSeoOptimize__t7", "More Trust."))}<br /> {rich($t("LocalSeoOptimize__t8", "More "))}<T>{$t("LocalSeoOptimize__t9", "Customers.")}</T>
            </p>
          </div>
          {WINS.map(({ Icon, label }) => (
            <div key={label} className="group flex items-center gap-3 lg:border-l lg:border-slate-100 lg:px-6">
              <Icon className="h-7 w-7 shrink-0 text-[#0f766e] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.8} />
              <span className="text-[14px] leading-snug text-slate-700 2xl:text-[15px]">{label}</span>
            </div>
          ))}
        </motion.div>
      </Inner>
    </Panel>
  );
}
