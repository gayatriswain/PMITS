"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, FileSearch, Globe2, Lightbulb, LineChart, Mail, Search, Settings, ShieldCheck, Target, Waypoints } from "lucide-react";
import CountUp from "../shared/CountUp";
import { AI, FADE, ArrowRight, Pill, ease, heading, Inner, Panel } from "../shared/AiSeoShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";
import { goToThankYou } from "@/lib/forms";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ITEMS__cms = [
  { Icon: Target, title: "AI SEO Strategy", text: "Custom strategy aligned with your business goals." },
  { Icon: LineChart, title: "AI Visibility Roadmap", text: "Step-by-step plan to increase visibility across Google, AI Overviews & more." },
  { Icon: Search, title: "Competitor Insights", text: "Deep analysis of competitors and market gaps to give you the edge." },
  { Icon: Lightbulb, title: "Growth Opportunities", text: "High-impact opportunities to drive traffic, leads and revenue." },
];

const BLUEPRINT__cms = [
  { Icon: FileSearch, title: "AI Visibility", text: "Get discovered across Google, AI Overviews, ChatGPT, Gemini & more." },
  { Icon: Waypoints, title: "Content Strategy", text: "Topic clusters, content plan & high-intent targeting." },
  { Icon: Globe2, title: "GEO Optimization", text: "Optimize for generative engines and AI-driven search." },
  { Icon: Settings, title: "Technical SEO", text: "Crawlability, indexing, speed & technical excellence." },
  { Icon: ShieldCheck, title: "Entity Authority", text: "Build strong entities, signals & brand trust." },
];

function StrategyForm() {
  const $t = useCmsText();
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [honey, setHoney] = useState("");
  const [err, setErr] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) return setErr("Please enter a valid email.");
    if (status === "sending") return;
    setErr("");
    setStatus("sending");
    const idea = `AI SEO strategy request (AI SEO page)${site.trim() ? ` for website: ${site.trim()}` : ""}`.slice(0, 500);
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, email: email.trim(), source: "ai-seo", website: honey }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
      goToThankYou("ai-seo");
    } catch (e2) {
      setErr(e2 instanceof Error && e2.message !== "Failed to fetch" ? e2.message : "We couldn’t reach the server. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "sent")
    return (
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-small rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 font-medium text-[#0f766e]">
        {rich($t("AiSeoStrategy__t1", "Thanks! Our AI SEO team will send your strategy within 24 hours."))}</motion.p>
    );

  const field = "flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 transition focus-within:border-[#0f766e] focus-within:shadow-[0_0_0_3px_rgba(15,118,110,.12)]";
  return (
    <form onSubmit={submit} noValidate className="space-y-2.5">
      <label className={field}>
        <Mail className="h-4 w-4 shrink-0 text-slate-400" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={$t("AiSeoStrategy__t2", "Your work email *")} className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400" />
      </label>
      <label className={field}>
        <Globe2 className="h-4 w-4 shrink-0 text-slate-400" />
        <input type="text" value={site} onChange={(e) => setSite(e.target.value)} placeholder={$t("AiSeoStrategy__t3", "Your website (optional)")} className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400" />
      </label>
      <input type="text" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} className="hidden" aria-hidden />
      {err && <p className="text-caption text-rose-600">{err}</p>}
      <button type="submit" disabled={status === "sending"} className="w-full rounded-xl bg-[#0b1b33] py-3 text-sm font-semibold text-white transition hover:bg-[#13294a] disabled:opacity-60">
        {status === "sending" ? $t("AiSeoStrategy__t4", "Sending…") : $t("AiSeoStrategy__t5", "Send My Strategy")}
      </button>
    </form>
  );
}

export default function AiSeoStrategy() {
  const $t = useCmsText();
  const ITEMS = useCmsData("AiSeoStrategy__ITEMS", ITEMS__cms);
  const BLUEPRINT = useCmsData("AiSeoStrategy__BLUEPRINT", BLUEPRINT__cms);
  const [open, setOpen] = useState(false);
  return (
    <Panel id="ai-seo-strategy">
      <Inner className="!max-w-[1640px] py-14 sm:py-16 lg:py-20 2xl:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-6 2xl:grid-cols-[minmax(0,0.56fr)_minmax(0,1fr)]">
          {/* copy */}
          <div>
            <Pill>{$t("AiSeoStrategy__t6", "Your Next Big Leap Starts Here")}</Pill>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className={`text-h2 ${heading.className} mt-5 font-bold tracking-[-0.025em] text-[#0b1b33]`}
            >
              {$t("AiSeoStrategy__t7", "Let's Build Your")}<br />
              <span className="bg-gradient-to-r from-[#0f766e] to-[#14a39a] bg-clip-text text-transparent sm:whitespace-nowrap">{html($t("AiSeoStrategy__t8", "AI SEO Strategy."))}</span>
            </motion.h2>
            <p className="text-body mt-4 max-w-md text-slate-600">{rich($t("AiSeoStrategy__t9", "A personalized roadmap to help your business rank, get recommended, and grow."))}</p>

            <ul className="mt-6 max-w-md divide-y divide-slate-100">
              {ITEMS.map(({ Icon, title, text }, i) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.55, ease }}
                  className="group flex gap-4 py-3"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[#0f766e] transition-colors duration-300 group-hover:bg-[#0f766e] group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <span>
                    <span className="block font-semibold text-[#0b1b33] 2xl:text-[17px]">{title}</span>
                    <span className="mt-0.5 block text-[13px] leading-relaxed text-slate-500 2xl:text-[14px]">{text}</span>
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 max-w-md space-y-3">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#0f766e] to-[#14a39a] py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(15,118,110,.7)] transition hover:-translate-y-0.5"
              >
                <span className="ai-shine pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,.28)_50%,transparent_65%)]" aria-hidden />
                <span className="relative">{html($t("AiSeoStrategy__t10", "Get My AI SEO Strategy"))}</span>
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-white/60 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }} className="overflow-hidden">
                    <div className="pt-1">
                      <StrategyForm />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <a
                href={$t("AiSeoStrategy__t11", "/contact")}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#0f766e]/50 bg-white py-3.5 text-[15px] font-semibold text-[#0b1b33] transition hover:border-[#0f766e] hover:bg-teal-50/50"
              >
                <CalendarDays className="h-5 w-5 text-[#0f766e]" /> {html($t("AiSeoStrategy__t12", "Book Strategy Call"))}</a>
              <p className="text-small flex items-center gap-2 pt-1 text-slate-500">
                <ShieldCheck className="h-4 w-4 text-[#0f766e]" /> {rich($t("AiSeoStrategy__t13", "No obligation. Just a strategy built for your growth."))}</p>
            </div>
          </div>

          {/* visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease }}
            className="relative mx-auto w-full max-w-[720px] lg:max-w-none 2xl:-mr-10"
          >
            <div className="relative aspect-[1.057]">
              <Image src={AI.robotStand} alt={$t("AiSeoStrategy__t14", "ProManage AI agent presenting an AI SEO blueprint")} fill sizes="(min-width:1024px) 680px, 95vw" className="object-contain mix-blend-multiply" style={FADE} />

              {/* laptop screen text */}
              <div className="pointer-events-none absolute left-[73%] top-[63%] w-[17%] -rotate-[4deg] text-center text-[1.6vw] leading-tight text-white/90 sm:text-[11px] lg:text-[10px] xl:text-[12px]">{rich($t("AiSeoStrategy__t15m", "Building Your<br> AI SEO Strategy…"))}</div>
              <div className={`${heading.className} pointer-events-none absolute left-[78%] top-[82%] w-[8%] text-center text-[1.4vw] font-semibold text-teal-300 sm:text-[10px] xl:text-[11px]`}>
                <CountUp to={87} suffix="%" duration={2.4} />
              </div>

              {/* blueprint panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease }}
                className="absolute left-[38%] top-[3%] hidden w-[42%] sm:block [perspective:1100px]"
              >
                <div className="rounded-2xl border border-teal-200/70 bg-white/45 p-4 shadow-[0_0_40px_rgba(45,212,191,.25),inset_0_0_24px_rgba(255,255,255,.7)] backdrop-blur-[3px] [transform:rotateY(-14deg)] lg:p-5 2xl:p-8">
                  <p className={`text-body ${heading.className} font-semibold tracking-wide text-[#0f766e]`}>{rich($t("AiSeoStrategy__t17", "AI SEO BLUEPRINT"))}</p>
                  <ul className="mt-3 space-y-3 2xl:mt-5 2xl:space-y-5">
                    {BLUEPRINT.map(({ Icon, title, text }, i) => (
                      <motion.li
                        key={title}
                        initial={{ opacity: 0, x: 14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.12, duration: 0.5, ease }}
                        className="flex gap-2.5"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white text-[#0b1b33] shadow-sm 2xl:h-11 2xl:w-11">
                          <Icon className="h-4 w-4" strokeWidth={1.8} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[12px] font-semibold text-[#0b1b33] lg:text-[13px] 2xl:text-[16px]">{title}</span>
                          <span className="block text-[10px] leading-snug text-slate-500 lg:text-[11px] 2xl:text-[13px]">{text}</span>
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className={`${heading.className} mt-12 text-center text-lg font-semibold text-[#0b1b33] sm:text-2xl`}
        >{rich($t("AiSeoStrategy__t18m", "The future of search is here. <span class=\"text-[#0f766e]\">Let's make sure you're leading it.</span>"))}</motion.p>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease }}
          className="mx-auto mt-3 block h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[#14a39a] to-transparent"
        />
      </Inner>
    </Panel>
  );
}
