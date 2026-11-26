"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, Bookmark, CornerUpRight, Globe2, MapPin, Mic, Phone, Search, Star, Store, TrendingUp, Users } from "lucide-react";
import { Inner, LH2, LPill, LS, Panel, Stars, Swash, T, ease, heading } from "./LocalSeoShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const STEPS__cms = [
  { Icon: Search, title: "They Search", text: "Customers search for products or services near them." },
  { Icon: MapPin, title: "They Discover", text: "Your business appears in Maps, local packs or nearby results." },
  { Icon: Store, title: "They Choose You", text: "They view your profile, reviews, photos and services." },
  { Icon: Phone, title: "They Take Action", text: "They call, get directions or visit your website." },
  { Icon: Users, title: "They Become Customers", text: "More visits, more trust and more loyal customers." },
];

const OUTCOMES__cms = [
  { Icon: Search, label: "Be found in the right searches" },
  { Icon: MapPin, label: "Show up in Maps & local pack" },
  { Icon: Star, label: "Build trust with reviews & ratings" },
  { Icon: Phone, label: "Drive calls, directions & website visits" },
  { Icon: TrendingUp, label: "Turn local visibility into real business growth" },
];

const card = "rounded-2xl border border-slate-100 bg-white shadow-[0_18px_40px_-26px_rgba(15,40,80,.45)]";

function SearchMock() {
  const $t = useCmsText();
  return (
    <div className="relative h-full">
      <div className={`${card} mx-auto h-[86%] w-[86%] p-3`}>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-[12px] text-slate-700">
          <Search className="h-3.5 w-3.5 text-[#0f766e]" />
          <span className="flex-1 overflow-hidden whitespace-nowrap">
            <span className="ai-anim inline-block overflow-hidden align-bottom" style={{ animation: "aiType 2.4s steps(19) infinite alternate" }}>
              {$t("LocalSeoJourney__t1", "coffee shop near me")}</span>
          </span>
          <Mic className="h-3.5 w-3.5 text-blue-500" />
        </div>
        {[80, 62, 72, 50].map((w, i) => (
          <div key={i} className="mt-3 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-100" />
            <span className="h-2 rounded-full bg-slate-100" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6, ease }}
        className={`${card} absolute bottom-0 left-0 w-[84%] p-3`}
      >
        <p className="text-caption font-semibold text-[#0b1b33]">{rich($t("LocalSeoJourney__t2", "Coffee Shop Near Me"))}</p>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
          <Stars n={4} className="h-3 w-3" /> {rich($t("LocalSeoJourney__t3", "(120)"))}</p>
        <p className="mt-1 text-[11px]">
          <span className="font-semibold text-green-600">{$t("LocalSeoJourney__t4", "Open")}</span> <span className="text-slate-500">{$t("LocalSeoJourney__t5", "· Cafe · 0.2 mi")}</span>
        </p>
      </motion.div>
    </div>
  );
}

function MapMock() {
  const $t = useCmsText();
  return (
    <div className={`${card} relative mx-auto h-full w-[92%] overflow-hidden p-2`}>
      <div className="relative h-[62%] overflow-hidden rounded-xl">
        <Image src={LS.journeyMap} alt="" fill sizes="220px" className="object-cover" />
        <span className="ai-anim absolute left-1/2 top-[52%] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/30" style={{ animation: "aiPing 2s ease-out infinite" }} />
      </div>
      <div className="absolute inset-x-2 bottom-2 flex gap-2 rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
          <Image src={LS.gbpThumbs[0]} alt="" fill sizes="44px" className="object-cover" />
        </span>
        <span className="min-w-0 text-[10.5px] leading-tight">
          <span className="block text-[12px] font-semibold text-[#0b1b33]">{$t("LocalSeoJourney__t6", "Your Business")}</span>
          <span className="flex items-center gap-1 text-slate-500">
            {$t("LocalSeoJourney__t7", "4.9 ")}<Stars className="h-2.5 w-2.5" /> {$t("LocalSeoJourney__t8", "(256)")}</span>
          <span className="text-slate-500">
            {$t("LocalSeoJourney__t9", "Cafe · 0.2 mi · ")}<span className="text-green-600">{$t("LocalSeoJourney__t10", "Open")}</span>
          </span>
        </span>
      </div>
    </div>
  );
}

function ProfileMock() {
  const $t = useCmsText();
  return (
    <div className={`${card} mx-auto h-full w-[94%] overflow-hidden p-2`}>
      <div className="relative h-[44%] overflow-hidden rounded-xl">
        <Image src={LS.journeyPhoto} alt="" fill sizes="240px" className="object-cover transition-transform duration-700 hover:scale-105" />
      </div>
      <div className="px-2 pt-2">
        <p className={`text-body ${heading.className} flex items-center gap-1.5 font-bold text-[#0b1b33]`}>
          {rich($t("LocalSeoJourney__t11", "Your Business "))}<BadgeCheck className="h-4 w-4 fill-blue-500 text-white" />
        </p>
        <p className="flex items-center gap-1 text-[11px] text-slate-500">
          {rich($t("LocalSeoJourney__t12", "4.9 "))}<Stars className="h-3 w-3" /> {rich($t("LocalSeoJourney__t13", "(256)"))}</p>
        <p className="text-[11px]">
          <span className="font-semibold text-green-600">{$t("LocalSeoJourney__t14", "Open")}</span> <span className="text-slate-500">{$t("LocalSeoJourney__t15", "· Closes 9 PM")}</span>
        </p>
        <div className="mt-2 grid grid-cols-4 text-center text-[9.5px] text-slate-500">
          {[
            { I: Phone, l: $t("LocalSeoJourney__t16", "Call") },
            { I: CornerUpRight, l: $t("LocalSeoJourney__t17", "Directions") },
            { I: Globe2, l: $t("LocalSeoJourney__t18", "Website") },
            { I: Bookmark, l: $t("LocalSeoJourney__t19", "Save") },
          ].map(({ I, l }) => (
            <span key={l} className="flex flex-col items-center gap-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-[#0f766e]">
                <I className="h-3.5 w-3.5" />
              </span>
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActionMock() {
  const $t = useCmsText();
  return (
    <div className="mx-auto flex h-full w-[94%] flex-col gap-3">
      <div className={`${card} flex-1 p-3`}>
        <p className="text-caption font-semibold text-[#0b1b33]">{rich($t("LocalSeoJourney__t20", "Call Your Business"))}</p>
        <p className="text-[10.5px] text-slate-500">{rich($t("LocalSeoJourney__t21", "Tap to call now"))}</p>
        <div className="relative mt-2 flex justify-center">
          <span className="ai-anim absolute top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-[#0f766e]/30" style={{ animation: "aiPing 1.8s ease-out infinite" }} />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#0f766e] text-white shadow-lg">
            <Phone className="h-5 w-5" fill="currentColor" />
          </span>
        </div>
      </div>
      <div className={`${card} flex-1 overflow-hidden p-3`}>
        <p className="text-caption font-semibold text-[#0b1b33]">{rich($t("LocalSeoJourney__t22", "Get Directions"))}</p>
        <p className="text-[10.5px] text-slate-500">{rich($t("LocalSeoJourney__t23", "0.2 miles away"))}</p>
        <div className="relative mt-2 h-[52%] overflow-hidden rounded-lg">
          <Image src={LS.journeyRoute} alt="" fill sizes="200px" className="object-cover" />
        </div>
      </div>
    </div>
  );
}

function CustomersMock() {
  const $t = useCmsText();
  return (
    <div className="relative h-full">
      <div className="relative mx-auto h-[78%] w-full">
        <Image src={LS.journeyShop} alt="" fill sizes="260px" className="object-contain [mask-image:linear-gradient(180deg,#000_80%,transparent)]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6, ease }}
        className={`${card} absolute inset-x-[6%] bottom-0 p-3`}
      >
        <p className="text-caption flex items-center gap-2 font-semibold text-[#0b1b33]">
          <Users className="h-4 w-4 text-[#0f766e]" /> {rich($t("LocalSeoJourney__t24", "Happy Customers"))}</p>
        <p className="mt-0.5 text-[10.5px] leading-snug text-slate-500">{rich($t("LocalSeoJourney__t25", "More reviews. More referrals. More growth."))}</p>
        <div className="mt-2 flex items-center gap-1.5">
          <Image src={LS.avatars} alt="" width={135} height={45} className="h-7 w-auto" />
          <span className="rounded-full bg-[#0f766e] px-2 py-1 text-[10px] font-bold text-white">{$t("LocalSeoJourney__t26", "+120")}</span>
        </div>
      </motion.div>
    </div>
  );
}

const MOCKS = [SearchMock, MapMock, ProfileMock, ActionMock, CustomersMock];

export default function LocalSeoJourney() {
  const $t = useCmsText();
  const STEPS = useCmsData("LocalSeoJourney__STEPS", STEPS__cms);
  const OUTCOMES = useCmsData("LocalSeoJourney__OUTCOMES", OUTCOMES__cms);
  return (
    <Panel inner="!bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(240,247,247,.9))]" />
      <Inner className="py-14 sm:py-16 lg:py-20 2xl:py-24">
        <div className="text-center">
          <LPill soft>{$t("LocalSeoJourney__t27", "The Local Journey")}</LPill>
          <LH2 className="mt-5">
            {$t("LocalSeoJourney__t28", "Your Customers Are Searching ")}<T>{$t("LocalSeoJourney__t29", "Nearby.")}</T>
          </LH2>
          <p className="text-body mt-4 text-slate-500">
            {rich($t("LocalSeoJourney__t30", "We make sure they find you at"))}{" "}
            <span className="relative inline-block font-medium text-[#0f766e]">
              every
              <Swash className="-bottom-1.5 h-2" />
            </span>{" "}
            {rich($t("LocalSeoJourney__t31", "step."))}</p>
        </div>

        <div className="relative mt-12 lg:mt-14">
          {/* curved connector through the icon circles (xl) */}
          <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="pointer-events-none absolute left-[10%] right-[10%] top-2 hidden h-10 w-[80%] xl:block" aria-hidden>
            <path d="M0 20 C 60 0, 140 0, 200 20 S 340 40, 400 20 S 540 0, 600 20 S 740 40, 800 20 S 940 0, 1000 20" fill="none" stroke="#99d8d1" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
            <path d="M0 20 C 60 0, 140 0, 200 20 S 340 40, 400 20 S 540 0, 600 20 S 740 40, 800 20 S 940 0, 1000 20" fill="none" stroke="#14a39a" strokeWidth="1.8" vectorEffect="non-scaling-stroke" className="ai-flow" />
          </svg>

          <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-6">
            {STEPS.map(({ Icon, title, text }, i) => {
              const Mock = MOCKS[i];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease }}
                  className="group relative flex flex-col items-center text-center"
                >
                  <span className={`${heading.className} pointer-events-none absolute left-0 top-0 select-none text-[56px] font-extrabold leading-none text-slate-100 2xl:text-[64px]`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-slate-100 bg-white text-[#0f766e] shadow-[0_10px_24px_-12px_rgba(15,118,110,.45)] transition-transform duration-300 group-hover:-translate-y-1 2xl:h-16 2xl:w-16">
                    <Icon className="h-6 w-6 2xl:h-7 2xl:w-7" strokeWidth={2} />
                  </span>
                  <h3 className={`${heading.className} mt-4 text-lg font-bold text-[#0b1b33] 2xl:text-[20px]`}>{title}</h3>
                  <p className="text-small mt-1.5 max-w-[220px] text-slate-600">{text}</p>
                  <div className="mt-6 h-[250px] w-full max-w-[270px] 2xl:h-[320px] 2xl:max-w-[300px]">
                    <Mock />
                  </div>
                  <span className="mt-5 hidden h-4 w-4 rounded-full border-[3px] border-[#14a39a] bg-white xl:block" />
                </motion.div>
              );
            })}
          </div>
          {/* dashed ground line under the cards */}
          <svg viewBox="0 0 1000 30" preserveAspectRatio="none" className="pointer-events-none absolute bottom-[0.45rem] left-0 hidden h-6 w-full xl:block" aria-hidden>
            <path d="M0 10 C 200 30, 400 -5, 500 12 S 800 28, 1000 8" fill="none" stroke="#14a39a" strokeOpacity=".5" strokeWidth="1.4" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" className="ai-flow" />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="relative mt-10 grid gap-4 rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-[0_20px_44px_-32px_rgba(15,40,80,.5)] sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 2xl:py-6"
        >
          {OUTCOMES.map(({ Icon, label }, i) => (
            <div key={label} className={`group flex items-center gap-3 lg:px-5 ${i ? "lg:border-l lg:border-slate-100" : ""}`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[#0f766e] transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" strokeWidth={2} fill={Icon === Star ? "currentColor" : "none"} />
              </span>
              <span className="text-[14px] leading-snug text-[#0b1b33] 2xl:text-[15px]">{label}</span>
            </div>
          ))}
        </motion.div>
      </Inner>
    </Panel>
  );
}
