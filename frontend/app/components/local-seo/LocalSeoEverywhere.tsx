"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Bot,
  Eye,
  FileText,
  Link2,
  MapPin,
  Mic,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Store,
  Target,
  TrendingUp,
  AudioLines,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import { BrandIcon, Inner, LH2, LPill, LS, Panel, T, ease, heading } from "./LocalSeoShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

type Channel = {
  title: string;
  text: string;
  chip: string;
  ChipIcon: LucideIcon;
  icon: React.ReactNode;
};

const CHANNELS__cms: Channel[] = [
  { title: "Google Search", text: "Appear in local search & 3-pack results", chip: "More local visibility", ChipIcon: Search, icon: <BrandIcon name="google" className="h-10 w-10" /> },
  { title: "Google Maps", text: "Get discovered on Maps by local searchers", chip: "More map impressions", ChipIcon: MapPin, icon: <BrandIcon name="maps" className="h-11 w-11" /> },
  {
    title: "Google Business Profile",
    text: "Optimized profile that converts visitors",
    chip: "More profile actions",
    ChipIcon: Store,
    icon: (
      <span className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-[#1a73e8] text-white">
        <Store className="h-6 w-6" />
        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#1a73e8] shadow">G</span>
      </span>
    ),
  },
  { title: "Reviews", text: "Build trust with positive reviews & ratings", chip: "Stronger trust & credibility", ChipIcon: BadgeCheck, icon: <Star className="h-11 w-11 fill-green-500 text-green-500" /> },
  { title: "Local Citations", text: "Consistent NAP across trusted directories", chip: "More consistency, better ranking", ChipIcon: FileText, icon: <Link2 className="h-11 w-11 text-red-500" strokeWidth={2.4} /> },
  { title: "Voice Search", text: "Capture “near me” and voice-based searches", chip: "More voice discoveries", ChipIcon: AudioLines, icon: <Mic className="h-11 w-11 text-violet-500" strokeWidth={2} /> },
  { title: "AI & Directories", text: "Appear in AI results and top local directories", chip: "Future-ready discoverability", ChipIcon: Bot, icon: <Search className="h-11 w-11 text-amber-400" strokeWidth={2.6} /> },
];

const WINS__cms = [
  { Icon: Eye, title: "Get Found More Often", text: "Show up when local customers are searching." },
  { Icon: Phone, title: "Drive More Calls & Visits", text: "Turn searches into real conversations & footfall." },
  { Icon: ShieldCheck, title: "Build Trust That Lasts", text: "Earn reviews & maintain a strong reputation." },
  { Icon: TrendingUp, title: "Grow Your Local Business", text: "Consistent visibility leads to scalable growth." },
];

export default function LocalSeoEverywhere() {
  const $t = useCmsText();
  const CHANNELS = useCmsData("LocalSeoEverywhere__CHANNELS", CHANNELS__cms);
  const WINS = useCmsData("LocalSeoEverywhere__WINS", WINS__cms);
  return (
    <Panel inner="!bg-white">
      {/* isometric city map with roads & pins at the sides (from the design assets) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image src={LS.cityMapBg} alt="" fill sizes="100vw" className="object-cover object-center opacity-90" />
      </div>
      <Inner className="py-14 sm:py-16 lg:py-20 2xl:py-24">
        <div className="text-center">
          <LPill>{$t("LocalSeoEverywhere__t1", "Be Found. Everywhere.")}</LPill>
          <LH2 className="mt-5" size="text-[clamp(30px,3.1vw,60px)]">
            {$t("LocalSeoEverywhere__t2", "From One Location to")}<br />
            <T>{$t("LocalSeoEverywhere__t3", "Everywhere")}</T> {$t("LocalSeoEverywhere__t4", "Customers Search.")}</LH2>
          <p className="text-body mx-auto mt-5 max-w-[640px] text-slate-600">{rich($t("LocalSeoEverywhere__t5m", "We build and optimize your presence across all local discovery channels so your business shows up <b class=\"font-semibold text-[#0f766e]\">where it matters most.</b>"))}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-y-10 min-[480px]:grid-cols-2 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 xl:gap-x-6">
          {CHANNELS.map(({ title, text, chip, ChipIcon, icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease }}
              className="group relative"
            >
              <span className={`${heading.className} absolute -top-4 left-1/2 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-[#0b5f5a] text-[13px] font-bold text-white shadow-md`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex h-full flex-col items-center rounded-2xl border border-slate-100 bg-white px-3 pb-3 pt-8 text-center shadow-[0_18px_40px_-28px_rgba(15,40,80,.5)] transition duration-300 group-hover:-translate-y-1.5 group-hover:border-teal-100 group-hover:shadow-[0_24px_44px_-24px_rgba(15,118,110,.45)]">
                <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-slate-50 shadow-[inset_0_0_0_1px_rgba(226,232,240,.8)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[6deg] 2xl:h-[96px] 2xl:w-[96px]">
                  <span className="2xl:scale-[1.3]">{icon}</span>
                </span>
                <h3 className="mt-4 min-h-[2.6em] text-[15px] font-semibold leading-tight text-[#0b1b33] 2xl:text-[16.5px]">{title}</h3>
                <p className="text-small mt-1 flex-1 text-slate-600">{text}</p>
                <span className="mt-4 flex w-full items-center gap-2 rounded-xl bg-teal-50/70 px-3 py-2.5 text-left text-[12px] font-medium leading-tight text-[#0b1b33]">
                  <ChipIcon className="h-5 w-5 shrink-0 text-[#0f766e]" />
                  {chip}
                </span>
              </div>
              {i < CHANNELS.length - 1 && (
                <svg viewBox="0 0 40 14" className="absolute -right-[22px] top-[38%] z-10 hidden h-3.5 w-9 text-[#0f766e] xl:block" aria-hidden>
                  <path d="M2 9 C 12 2, 24 2, 34 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" className="ai-flow" />
                  <path d="M30 3l5 4-6 3" fill="currentColor" />
                </svg>
              )}
            </motion.div>
          ))}
        </div>

        {/* outcome banner */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="mt-12 grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_24px_50px_-34px_rgba(15,40,80,.5)] lg:grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)]"
        >
          <div className="relative flex items-center gap-5 bg-gradient-to-br from-[#0b4f4a] to-[#0f766e] px-7 py-7 text-white lg:[clip-path:polygon(0_0,100%_0,90%_100%,0_100%)] lg:pr-14">
            <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/10">
              <Target className="h-10 w-10" strokeWidth={1.6} />
              <span className="ai-anim absolute inset-0 rounded-full border border-white/30" style={{ animation: "aiPing 2.4s ease-out infinite" }} />
            </span>
            <p className={`text-body ${heading.className} font-bold`}>{rich($t("LocalSeoEverywhere__t7m", "More Visibility.<br> More Customers.<br> More <span class=\"text-teal-200\">Growth.</span>"))}</p>
          </div>
          <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:py-7">
            {WINS.map(({ Icon, title, text }, i) => (
              <div key={title} className={`group flex items-start gap-3 lg:px-5 ${i ? "lg:border-l lg:border-slate-100" : ""}`}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[#0f766e] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block text-[14px] font-semibold text-[#0b1b33] 2xl:text-[15.5px]">{title}</span>
                  <span className="mt-0.5 block text-[12.5px] leading-relaxed text-slate-500 2xl:text-[13.5px]">{text}</span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </Inner>
    </Panel>
  );
}
