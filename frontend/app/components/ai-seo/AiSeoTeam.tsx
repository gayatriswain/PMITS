"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, FileEdit, Globe2, LineChart, Network, SearchCode } from "lucide-react";
import { AI, H2, Hl, Pill, ease, Inner, Panel } from "../shared/AiSeoShared";

const AGENTS = [
  { Icon: SearchCode, title: "Search Intelligence", text: "Finds how your customers search and what AI shows.", tone: "teal" },
  { Icon: FileEdit, title: "Content Intelligence", text: "Creates content that ranks, engages and gets referenced by AI.", tone: "violet" },
  { Icon: Globe2, title: "GEO & AI Visibility", text: "Optimizes for AI Overviews, ChatGPT, Gemini, Perplexity and more.", tone: "blue" },
  { Icon: Code2, title: "Technical Intelligence", text: "Improves speed, structure, indexing and overall site performance.", tone: "orange" },
  { Icon: Network, title: "Entity Intelligence", text: "Builds strong entities so AI understands, trusts and recommends your brand.", tone: "teal" },
  { Icon: LineChart, title: "Performance Intelligence", text: "Continuously learns, tests and adapts for better rankings and growth.", tone: "violet" },
] as const;

const TONE = {
  teal: { bg: "bg-teal-50", fg: "text-teal-600", dot: "bg-teal-500", chip: "bg-teal-50 text-teal-700" },
  violet: { bg: "bg-violet-50", fg: "text-violet-600", dot: "bg-violet-500", chip: "bg-violet-50 text-violet-700" },
  blue: { bg: "bg-sky-50", fg: "text-sky-600", dot: "bg-sky-500", chip: "bg-sky-50 text-sky-700" },
  orange: { bg: "bg-orange-50", fg: "text-orange-500", dot: "bg-orange-500", chip: "bg-orange-50 text-orange-600" },
};

/** Network of thin lines above & below the cards, with pulses travelling along them (lg+). */
function Network6({ flip = false }: { flip?: boolean }) {
  // card centres at 1/12, 3/12 … 11/12 of the width
  const xs = [8.33, 25, 41.67, 58.33, 75, 91.67];
  const d = flip
    ? `M${xs[0]} 0 V10 H${xs[2]} V0 M${xs[1]} 0 V14 H${xs[4]} V0 M${xs[3]} 0 V10 H${xs[5]} V0`
    : `M${xs[0]} 20 V8 H${xs[2]} V20 M${xs[1]} 20 V4 H${xs[4]} V20 M${xs[3]} 20 V8 H${xs[5]} V20`;
  return (
    <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="hidden h-6 w-full lg:block" aria-hidden>
      <path d={d} fill="none" stroke="#bfdbfe" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path d={d} fill="none" stroke="#38bdf8" strokeWidth="1.4" vectorEffect="non-scaling-stroke" className="ai-flow" />
    </svg>
  );
}

export default function AiSeoTeam() {
  return (
    <Panel id="how-it-works" inner="!bg-white">
      <Inner className="py-14 sm:py-16 lg:py-20 2xl:py-24">
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-6 2xl:grid-cols-[minmax(0,470px)_1fr] 2xl:gap-2">
            {/* robot */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease }}
              className="relative mx-auto w-full max-w-[360px] lg:-my-6 lg:-ml-6 lg:max-w-none 2xl:-ml-10"
            >
              <div className="relative aspect-square">
                <Image src={AI.robotPoint} alt="AI SEO agent robot pointing at its team" fill sizes="(min-width:1536px) 480px, 360px" className="ai-float object-contain mix-blend-multiply" />
              </div>
              <div className="absolute -top-2 right-0 hidden rotate-[-8deg] font-[cursive] text-[15px] leading-tight text-blue-600 sm:block lg:-right-6 lg:-top-6">
                Multiple AI specialists.
                <br /> One goal – Your Growth.
                <svg viewBox="0 0 40 30" className="ml-2 mt-1 h-7 w-9 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                  <path d="M30 2C30 16 20 24 6 24M6 24l7-5M6 24l7 4" />
                </svg>
              </div>
            </motion.div>

            {/* copy + agents */}
            <div className="min-w-0">
              <Pill>How It Works</Pill>
              <H2 className="mt-4">
                How Your <Hl>AI SEO</Hl> Team Works
              </H2>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
                className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base"
              >
                Our AI SEO Agent coordinates multiple AI specialists 24/7 to analyze, optimize and grow your visibility across every search experience.
              </motion.p>

              <div className="mt-6">
                <Network6 />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-2.5">
                  {AGENTS.map(({ Icon, title, text, tone }, i) => {
                    const t = TONE[tone];
                    return (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 26 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: i * 0.09, duration: 0.6, ease }}
                        className="group relative flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-3 pb-4 pt-5 text-center shadow-[0_14px_30px_-24px_rgba(15,40,80,.5)] transition duration-300 hover:-translate-y-1.5 hover:border-teal-100 hover:shadow-[0_22px_40px_-22px_rgba(15,118,110,.45)]"
                      >
                        <span className={`relative flex h-12 w-12 items-center justify-center rounded-full ${t.bg} ${t.fg}`}>
                          <span className={`ai-anim absolute inset-0 rounded-full ${t.bg}`} style={{ animation: `aiPing 2.6s ease-out ${i * 0.35}s infinite` }} />
                          <Icon className="relative h-5 w-5" strokeWidth={1.9} />
                        </span>
                        <h3 className="mt-3 text-[13.5px] font-bold leading-tight text-[#0b1b33]">{title}</h3>
                        <p className="mt-2 flex-1 text-[11.5px] leading-relaxed text-slate-500">{text}</p>
                        <span className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${t.chip}`}>
                          <span className={`ai-anim h-1.5 w-1.5 rounded-full ${t.dot}`} style={{ animation: "aiBlink 1.6s ease-in-out infinite" }} />
                          Active
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
                <Network6 flip />
              </div>
            </div>
          </div>
        </div>
      </Inner>
    </Panel>
  );
}
