"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bell,
  Bookmark,
  ChevronDown,
  Clock3,
  CornerUpRight,
  Eye,
  FileText,
  Globe2,
  Image as ImageIcon,
  MapPin,
  MessageSquareQuote,
  Navigation,
  Phone,
  Send,
  Star,
  Tag,
  Users,
} from "lucide-react";
import CountUp from "../shared/CountUp";
import { BrandIcon, Inner, LH2, LS, Panel, Spark, Stars, T, ease, heading } from "./LocalSeoShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const ITEMS__cms = [
  { Icon: FileText, title: "Complete & Accurate Information", text: "We ensure every detail is correct, consistent, and compelling." },
  { Icon: ImageIcon, title: "High-Quality Photos & Posts", text: "Eye-catching photos and regular posts that build trust and engagement." },
  { Icon: Star, title: "Reviews & Reputation Management", text: "We help you get more 5-star reviews and protect your online reputation." },
  { Icon: Tag, title: "Services, Products & Categories", text: "We list the right services and categories so customers can find you easily." },
  { Icon: Clock3, title: "Opening Hours & Business Details", text: "Accurate hours and details that help customers choose you." },
  { Icon: Bell, title: "Updates, Offers & Announcements", text: "Keep your business active with updates that bring customers back." },
];

const CHIPS__cms = [
  { Icon: Users, a: "People search", b: "You appear", pos: "right-[2%] top-[34%]" },
  { Icon: Send, a: "They find you", b: "They visit", pos: "right-[0%] top-[52%]" },
  { Icon: Users, a: "They trust you", b: "They come back", pos: "right-[4%] top-[80%]" },
];

/** The Google Business Profile card on the left. */
function ProfileCard() {
  const $t = useCmsText();
  const CHIPS = useCmsData("LocalSeoDominate__CHIPS", CHIPS__cms);
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      {/* soft city backdrop behind the profile card */}
      <div className="pointer-events-none absolute -left-8 -top-8 bottom-[-2rem] right-[-1rem] overflow-hidden rounded-[32px] opacity-45">
        <Image src={LS.cityscape} alt="" fill sizes="640px" className="object-cover object-bottom [mask-image:radial-gradient(75%_70%_at_45%_55%,#000_40%,transparent)]" />
      </div>
      {/* map backdrop with route + pin */}
      <div className="pointer-events-none absolute -bottom-6 -right-6 left-[30%] top-[45%] opacity-90">
        <Image src={LS.routeScene} alt="" fill sizes="500px" className="object-cover object-right [mask-image:radial-gradient(70%_70%_at_60%_60%,#000_55%,transparent)]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease }}
        className="relative w-[78%] rounded-[26px] 2xl:w-[66%] border border-slate-100 bg-white p-3 shadow-[0_30px_60px_-30px_rgba(15,40,80,.5)] sm:w-[70%]"
      >
        <div className="relative aspect-[2.4] overflow-hidden rounded-2xl">
          <Image src={LS.gbpPhoto} alt={$t("LocalSeoDominate__t1", "Restaurant interior on the business profile")} fill sizes="420px" className="object-cover" />
        </div>
        <span className="absolute -left-5 top-[22%] flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg sm:h-14 sm:w-14">
          <BrandIcon name="google" className="h-7 w-7 sm:h-8 sm:w-8" />
        </span>
        <div className="px-3 pb-2 pt-3">
          <p className={`text-body ${heading.className} flex items-center gap-2 font-bold text-[#0b1b33]`}>
            {rich($t("LocalSeoDominate__t2", "Your Business "))}<BadgeCheck className="h-5 w-5 fill-blue-500 text-white" />
          </p>
          <p className="text-small mt-1 flex items-center gap-1.5 text-slate-600">
            {rich($t("LocalSeoDominate__t3", "4.9 "))}<Stars className="h-4 w-4" /> <span className="text-slate-400">{$t("LocalSeoDominate__t4", "(256)")}</span>
          </p>
          <p className="text-small mt-0.5">
            <span className="text-slate-700">{$t("LocalSeoDominate__t5", "Open")}</span> <span className="text-slate-500">{$t("LocalSeoDominate__t6", "· Closes 9 PM")}</span>
          </p>
          <div className="mt-3 grid grid-cols-4 text-center text-[11px] text-slate-600">
            {[
              { I: Phone, l: $t("LocalSeoDominate__t7", "Call") },
              { I: CornerUpRight, l: $t("LocalSeoDominate__t8", "Directions") },
              { I: Globe2, l: $t("LocalSeoDominate__t9", "Website") },
              { I: Bookmark, l: $t("LocalSeoDominate__t10", "Save") },
            ].map(({ I, l }) => (
              <span key={l} className="flex flex-col items-center gap-1">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-[#0f766e] transition-colors hover:bg-teal-50">
                  <I className="h-4 w-4" />
                </span>
                {l}
              </span>
            ))}
          </div>
          <div className="mt-3 flex justify-between gap-2 overflow-hidden border-b border-slate-100 pb-2 text-[9px] font-semibold text-slate-500 sm:text-[11px]">
            {[$t("LocalSeoDominate__t11", "OVERVIEW"), $t("LocalSeoDominate__t12", "SERVICES"), $t("LocalSeoDominate__t13", "REVIEWS"), $t("LocalSeoDominate__t14", "PHOTOS"), $t("LocalSeoDominate__t15", "UPDATES")].map((t, i) => (
              <span key={t} className={i === 0 ? "relative text-[#0f766e] after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[#0f766e]" : ""}>
                {t}
              </span>
            ))}
          </div>
          <ul className="mt-3 space-y-2.5 text-[13px] text-slate-700">
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-slate-500" /> {$t("LocalSeoDominate__t16", "123 Main Street, Your City, ST 10001")}</li>
            <li className="flex items-center gap-3">
              <Clock3 className="h-4 w-4 text-slate-500" /> {$t("LocalSeoDominate__t17", "Open · Closes 9 PM ")}<ChevronDown className="h-3.5 w-3.5" />
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-slate-500" /> {$t("LocalSeoDominate__t18", "(555) 123-4567")}</li>
            <li className="flex items-center gap-3">
              <Globe2 className="h-4 w-4 text-slate-500" /> {$t("LocalSeoDominate__t19", "yourbusiness.com")}</li>
          </ul>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {LS.gbpThumbs.map((src) => (
              <span key={src} className="relative aspect-[1.15] overflow-hidden rounded-lg">
                <Image src={src} alt="" fill sizes="120px" className="object-cover transition-transform duration-500 hover:scale-110" />
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* floating chips */}
      {CHIPS.map(({ Icon, a, b, pos }, i) => (
        <motion.div
          key={a}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease }}
          className={`absolute hidden sm:block ${pos}`}
        >
          <div className="ai-float flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-[0_14px_30px_-18px_rgba(15,40,80,.45)]" style={{ animationDelay: `${i * 0.7}s` }}>
            <Icon className="h-4 w-4 text-[#0f766e]" />
            <span className="text-[11px] leading-tight">
              <span className="block font-semibold text-[#0b1b33]">{a}</span>
              <span className="block text-[#0f766e]">{b}</span>
            </span>
          </div>
        </motion.div>
      ))}
      {/* big pin */}
      <motion.span
        initial={{ y: -40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, type: "spring", stiffness: 160, damping: 12 }}
        className="absolute right-[30%] top-[62%] hidden sm:block"
      >
        <MapPin className="h-16 w-16 fill-[#0f766e] text-white drop-shadow-xl 2xl:h-20 2xl:w-20" strokeWidth={1.2} />
      </motion.span>
      {/* profile views mini card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.6, ease }}
        className="absolute bottom-[-4%] left-[42%] hidden w-[30%] rounded-xl border border-slate-100 bg-white p-3 shadow-[0_18px_40px_-20px_rgba(15,40,80,.5)] sm:block"
      >
        <p className="text-[11px] text-slate-500">{rich($t("LocalSeoDominate__t20", "Profile Views"))}</p>
        <p className={`text-body ${heading.className} font-bold text-[#0f766e]`}>
          +<CountUp to={215} suffix="%" />
        </p>
        <Spark className="h-8 w-full" color="#0f766e" />
        <p className="text-[10px] text-slate-400">{rich($t("LocalSeoDominate__t21", "vs last 6 months"))}</p>
      </motion.div>
    </div>
  );
}

export default function LocalSeoDominate() {
  const $t = useCmsText();
  const ITEMS = useCmsData("LocalSeoDominate__ITEMS", ITEMS__cms);
  return (
    <Panel inner="!bg-[#f6f8fa]">
      <Inner className="py-14 sm:py-16 lg:py-20 2xl:py-24">
        <div className="grid items-center gap-12 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)_minmax(0,0.68fr)] xl:gap-8">
          <div className="pb-8 xl:pb-0">
            <ProfileCard />
          </div>

          {/* copy + list */}
          <div>
            <p className="text-caption flex items-center gap-2 font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
              <span className="h-px w-8 bg-[#0f766e]/50" />
              <MapPin className="h-4 w-4" /> {rich($t("LocalSeoDominate__t22", "Own Your Local Presence"))}</p>
            <LH2 className="mt-4 xl:whitespace-nowrap" size="text-[clamp(26px,1.95vw,38px)]">
              {$t("LocalSeoDominate__t23", "Dominate Local Search.")}<br />
              <T>{$t("LocalSeoDominate__t24", "Win More Customers.")}</T>
            </LH2>
            <p className="text-body mt-4 max-w-[470px] text-slate-600">
              {rich($t("LocalSeoDominate__t25", "We optimize your Google Business Profile to attract more views, build trust, and drive "))}<span className="font-semibold text-[#0f766e] underline decoration-[#0f766e]/40 underline-offset-4">{$t("LocalSeoDominate__t26", "real-world actions.")}</span>
            </p>
            <ul className="mt-6 divide-y divide-slate-100">
              {ITEMS.map(({ Icon, title, text }, i) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease }}
                  className="group flex gap-4 py-3"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-teal-100 bg-white text-[#0f766e] transition-colors duration-300 group-hover:bg-[#0f766e] group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-[#0b1b33] 2xl:text-[15.5px]">{title}</span>
                    <span className="block text-[13px] leading-relaxed text-slate-500 2xl:text-[14px]">{text}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
            <p className="text-body mt-4 flex items-center gap-3 font-[cursive] text-[#0f766e]">
              <svg viewBox="0 0 50 20" className="h-5 w-12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                <path d="M48 12C34 4 18 4 3 10M3 10l7-6M3 10l8 4" />
              </svg>
              <span>
                {$t("LocalSeoDominate__t27", "Every detail optimized.")}<br /> {$t("LocalSeoDominate__t28", "Every action maximized.")}</span>
            </p>
          </div>

          {/* testimonial + sketchy corner shop */}
          <div className="relative">
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="relative z-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_30px_60px_-36px_rgba(15,40,80,.5)] 2xl:p-7"
          >
            <MessageSquareQuote className="h-9 w-9 text-[#0f766e]" />
            <p className={`${heading.className} mt-4 text-2xl font-bold leading-tight text-[#0b1b33]`}>
              {rich($t("LocalSeoDominate__t29", "Real Results."))}<br />
              <T>{$t("LocalSeoDominate__t30", "Real Growth.")}</T>
            </p>
            <p className="text-small mt-4 text-slate-600">
              {rich($t("LocalSeoDominate__t31", "Since working with ProManage, our profile views increased by "))}<b className="text-[#0f766e]">215%</b> {rich($t("LocalSeoDominate__t32", "and calls by "))}<b className="text-[#0f766e]">160%</b>.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Image src={LS.sarah} alt={$t("LocalSeoDominate__t33", "Sarah Johnson")} width={48} height={49} className="h-12 w-12 rounded-full object-cover" />
              <span>
                <span className="block text-sm font-semibold text-[#0b1b33]">{$t("LocalSeoDominate__t34", "Sarah Johnson")}</span>
                <span className="block text-xs text-slate-500">{$t("LocalSeoDominate__t35", "Marketing Manager")}</span>
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { I: Eye, l: $t("LocalSeoDominate__t36", "Profile Views"), v: 215 },
                { I: Navigation, l: $t("LocalSeoDominate__t37", "Calls from Profile"), v: 160 },
              ].map(({ I, l, v }) => (
                <div key={l} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                  <p className="flex items-center gap-1.5 text-[10.5px] text-slate-500">
                    <I className="h-3.5 w-3.5 text-[#0f766e]" /> {l}
                  </p>
                  <p className={`text-body ${heading.className} mt-1 font-bold text-[#0f766e]`}>
                    +<CountUp to={v} suffix="%" />
                  </p>
                  <p className="text-[10px] text-slate-400">{rich($t("LocalSeoDominate__t38", "vs last 6 months"))}</p>
                  <Spark className="mt-1 h-8 w-full" color="#0f766e" />
                </div>
              ))}
            </div>
          </motion.aside>
          <div className="pointer-events-none relative -mt-2 hidden aspect-[1.875] w-[120%] opacity-60 xl:block">
            <Image src={LS.cornerShop} alt="" fill sizes="360px" className="object-contain [mask-image:linear-gradient(180deg,transparent,#000_25%,#000_80%,transparent)]" />
          </div>
          </div>
        </div>
      </Inner>
    </Panel>
  );
}
