"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, Brain, Clock3, Crown, Globe2, Search, TrendingUp } from "lucide-react";
import CountUp from "../shared/CountUp";
import { AI, BrandIcon, ClientWordmarks, CtaButton, Inner, Panel, Pill, Sparkle, ease, fadeUp, heading, oval, type Brand } from "../shared/AiSeoShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const AGENTS__cms: { brand: Brand; title: string; sub: string; pos: string; delay: number }[] = [
  { brand: "chatgpt", title: "ChatGPT", sub: "Content Strategy & Optimization", pos: "left-[6%] top-[11%]", delay: 0.35 },
  { brand: "claude", title: "Claude", sub: "Content Creation & Enhancement", pos: "left-[74%] top-[11%]", delay: 0.45 },
  { brand: "gemini", title: "Google Gemini", sub: "Search Insights & Intelligence", pos: "left-[0%] top-[38%]", delay: 0.55 },
  { brand: "google", title: "Google AI", sub: "Ranking Signals & Understanding", pos: "left-[80%] top-[38%]", delay: 0.65 },
  { brand: "perplexity", title: "Perplexity", sub: "Research & Topic Discovery", pos: "left-[-3%] top-[67%]", delay: 0.75 },
  { brand: "more", title: "And More…", sub: "New AI Models & Future Agents", pos: "left-[80%] top-[67%]", delay: 0.85 },
];

const STATS__cms = [
  { Icon: TrendingUp, to: 180, suffix: "%", label: "Organic Traffic", arrow: true },
  { Icon: BarChart3, to: 145, suffix: "%", label: "Keyword Rankings", arrow: true },
  { Icon: Search, to: 200, suffix: "%", label: "AI Visibility", arrow: true },
  { Icon: Crown, to: 3, suffix: "", label: "More Keywords", prefix: "Top " },
];

const FEATURES__cms = [
  { Icon: Brain, title: "AI-Powered Insights", text: "Deep analysis across multiple AI models and search engines." },
  { Icon: Clock3, title: "24/7 Optimization", text: "Your AI agents never stop testing and improving." },
  { Icon: Globe2, title: "Future-Ready GEO", text: "Optimized for AI Overviews, ChatGPT, Gemini & beyond." },
  { Icon: BarChart3, title: "Measurable Growth", text: "Real results that drive traffic, leads and revenue." },
];

function AgentCard({ brand, title, sub, className = "" }: { brand: Brand; title: string; sub: string; className?: string }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 2xl:p-3.5 shadow-[0_18px_40px_-22px_rgba(15,40,80,.35)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 2xl:h-10 2xl:w-10">
        <BrandIcon name={brand} className="h-6 w-6 2xl:h-7 2xl:w-7" />
      </span>
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-[13px] font-bold text-[#0b1b33] 2xl:text-[15px]">{title}</span>
        <span className="block text-[10.5px] leading-snug text-slate-500 2xl:text-[11.5px]">{sub}</span>
      </span>
    </div>
  );
}

export default function AiSeoHero() {
  const $t = useCmsText();
  const AGENTS = useCmsData("AiSeoHero__AGENTS", AGENTS__cms);
  const STATS = useCmsData("AiSeoHero__STATS", STATS__cms);
  const FEATURES = useCmsData("AiSeoHero__FEATURES", FEATURES__cms);
  const reduce = useReducedMotion();
  return (
    <Panel>
      {/* soft background glow + grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_74%_40%,rgba(56,189,248,.16),transparent_70%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[.35] [background-image:linear-gradient(rgba(148,163,184,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.16)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]"
      />

      <Inner className="pb-10 pt-10 sm:pt-14 lg:pb-14 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.69fr)_minmax(0,1fr)] lg:gap-0">
          {/* copy */}
          <div className="relative z-10 text-center lg:text-left">
            <Pill>{$t("AiSeoHero__t1", "AI SEO & GEO Services")}</Pill>
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className={`text-h1 ${heading.className} mt-6 font-bold tracking-[-0.025em] text-[#0b1b33]`}
            >
              {$t("AiSeoHero__t2", "Your ")}<span className="bg-gradient-to-r from-[#0f766e] to-[#14a39a] bg-clip-text text-transparent">{html($t("AiSeoHero__t3", "AI SEO"))}</span>
              <br /> {$t("AiSeoHero__t4", "Agent. Always")}<br /> {$t("AiSeoHero__t5", "Optimizing.")}</motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="text-body mx-auto mt-6 max-w-[460px] text-slate-600 lg:mx-0"
            >{rich($t("AiSeoHero__t6m", "Powered by multiple AI agents that work together to grow your visibility, rankings and revenue across <span class=\"font-semibold text-[#0f766e]\">every search</span> experience."))}</motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start 2xl:gap-4"
            >
              <CtaButton className="2xl:min-w-[280px] 2xl:py-4 2xl:text-[17px]">{$t("AiSeoHero__t9", "Get AI SEO Strategy")}</CtaButton>
              <CtaButton variant="ghost" href={$t("AiSeoHero__t10", "#how-it-works")} className="!border-slate-300 !text-[#0b1b33] 2xl:min-w-[240px] 2xl:py-4 2xl:text-[17px]">
                {$t("AiSeoHero__t11", "See How It Works")}</CtaButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex items-center justify-center gap-4 lg:justify-start"
            >
              <Image src={AI.avatars} alt={$t("AiSeoHero__t12", "Happy ProManage clients")} width={200} height={66} className="h-12 w-auto 2xl:h-14" />
              <div className="text-left">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current 2xl:h-5 2xl:w-5" aria-hidden>
                      <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
                    </svg>
                  ))}
                </div>
                <p className="text-small mt-1 text-slate-500">{rich($t("AiSeoHero__t13", "Trusted by 100+ businesses"))}</p>
              </div>
            </motion.div>
          </div>

          {/* visual — positions measured from the 1920 design */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease }}
              className="relative mx-auto aspect-[1.2] w-full max-w-[887px] max-md:overflow-hidden md:aspect-[1.49]"
            >
              <div className="absolute left-[-18%] top-[-2%] aspect-[1.697] w-[136%] md:top-[-4%]">
                <Image
                  src={AI.robotDesk}
                  alt={$t("AiSeoHero__t14", "AI SEO agent robot working on a laptop")}
                  fill
                  priority
                  sizes="(min-width: 1024px) 1200px, 130vw"
                  className="object-contain"
                  style={oval(72)}
                />
                {/* glowing label on the laptop lid */}
                <span
                  aria-hidden
                  className={`${heading.className} absolute left-[28.7%] top-[66%] flex w-[22%] flex-col items-center text-center text-[clamp(9px,1.25vw,24px)] font-bold leading-[1.05] tracking-wide text-[#8ff3ff] [text-shadow:0_0_12px_rgba(56,232,255,.9)]`}
                >
                  <span className="ai-anim" style={{ animation: "aiBlink 3s ease-in-out infinite" }}>{html($t("AiSeoHero__t15", "AI SEO"))}</span>
                  <span className="text-[0.82em]">{html($t("AiSeoHero__t16", "AGENT"))}</span>
                </span>
              </div>
              {/* speech bubble */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6, ease }}
                className="absolute left-[48%] top-0 -translate-x-1/2"
              >
                <div className="ai-float relative whitespace-nowrap rounded-2xl bg-white px-4 py-2.5 text-center text-[11px] font-medium leading-snug text-slate-700 shadow-[0_16px_36px_-20px_rgba(15,40,80,.4)] sm:text-[13px] 2xl:px-6 2xl:py-3.5 2xl:text-[15px]">
                  {html($t("AiSeoHero__t17", "Analyzing. Optimizing."))}<br />
                  {html($t("AiSeoHero__t18", "Growing your business "))}<span className="font-bold text-[#0f766e]">{html($t("AiSeoHero__t19", "24/7"))}</span>
                  <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white" />
                </div>
                <span className="mx-auto mt-2 block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
              </motion.div>
              {/* agent cards (desktop: floating around the robot) */}
              {AGENTS.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: a.pos.includes("left") ? -24 : 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: a.delay, duration: 0.6, ease }}
                  className={`absolute hidden w-[20%] min-w-[150px] 2xl:min-w-[172px] md:block ${a.pos}`}
                >
                  <div className="ai-float" style={{ animationDelay: `${i * 0.6}s`, animationDuration: `${5 + (i % 3)}s` }}>
                    <AgentCard brand={a.brand} title={a.title} sub={a.sub} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* agent cards (mobile grid) */}
            <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
              {AGENTS.map((a) => (
                <AgentCard key={a.title} brand={a.brand} title={a.title} sub={a.sub} className="!p-2.5" />
              ))}
            </div>

            {/* stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease }}
              className="relative z-10 mx-auto mt-4 grid grid-cols-2 gap-y-5 rounded-2xl border border-white bg-white/95 p-4 shadow-[0_24px_50px_-30px_rgba(15,40,80,.35)] sm:grid-cols-4 sm:p-5 lg:-ml-[11%] lg:mt-1 lg:w-[111%] 2xl:px-8 2xl:py-6"
            >
              {STATS.map(({ Icon, to, suffix, label, prefix, arrow }, i) => (
                <div key={label} className={`flex items-center gap-3 px-2 ${i ? "sm:border-l sm:border-slate-100" : ""}`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0f766e] 2xl:h-14 2xl:w-14">
                    <Icon className="h-5 w-5 2xl:h-7 2xl:w-7" strokeWidth={2.2} />
                  </span>
                  <span>
                    <span className={`${heading.className} block text-lg font-bold leading-none text-[#0f766e] sm:text-xl 2xl:text-[27px]`}>
                      {arrow && "↑"}
                      {prefix}
                      {reduce ? `${to}${suffix}` : <CountUp to={to} suffix={suffix} />}
                    </span>
                    <span className="mt-1 block whitespace-nowrap text-[11px] text-slate-500 sm:text-xs 2xl:text-[14px]">{label}</span>
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* feature strip */}
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white bg-slate-100 shadow-[0_24px_50px_-34px_rgba(15,40,80,.35)] sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {FEATURES.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="group flex items-start gap-4 bg-white p-5 sm:p-6 2xl:px-9 2xl:py-8"
            >
              <span className="relative flex h-12 w-12 2xl:h-16 2xl:w-16 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[#0f766e] transition-colors duration-300 group-hover:bg-[#0f766e] group-hover:text-white">
                <Icon className="h-6 w-6 2xl:h-8 2xl:w-8" strokeWidth={1.6} />
              </span>
              <span>
                <span className="block font-bold text-[#0b1b33] 2xl:text-[19px]">{title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-500 2xl:text-[16px]">{text}</span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* trusted row */}
        <div className="mt-10 text-center">
          <p className="flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-slate-500">
            <Sparkle className="h-3 w-3 text-[#0f766e]" /> {rich($t("AiSeoHero__t20", "Trusted by businesses growing through AI search"))}</p>
          <ClientWordmarks className="mt-6" />
        </div>
      </Inner>
    </Panel>
  );
}
