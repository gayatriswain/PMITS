"use client";

import { useState } from "react";
import Container from "./Container";
import { useInView } from "./useInView";
import { ChatIcon, PlusIcon } from "./icons";

const INK = "#111827";

const faqs = [
  {
    q: "What services do you offer?",
    a: "We offer website design and development, SEO, and full-funnel digital marketing strategies tailored to help your business grow online.",
  },
  {
    q: "How long does it take to design a website?",
    a: "Most website projects take 3 to 6 weeks from kickoff to launch, depending on scope, content readiness, and the number of revisions.",
  },
  {
    q: "Do you work with small businesses or just big brands?",
    a: "We work with businesses of every size, from solo founders and startups to established brands looking to scale.",
  },
  {
    q: "Can I customize the packages you offer?",
    a: "Absolutely. Every package can be tailored to your goals, budget, and timeline, so you only pay for what you actually need.",
  },
  {
    q: "How do you measure the success of a marketing campaign?",
    a: "We track metrics like traffic, conversion rate, lead quality, and ROI, then share clear monthly reports so you always know what's working.",
  },
  {
    q: "What if I don't like the designs or strategies?",
    a: "We build in revision rounds at every stage, and we won't move forward until you're genuinely happy with the direction.",
  },
  {
    q: "How do I get started?",
    a: "Book a free consultation call, tell us about your goals, and we'll put together a tailored plan within a few days.",
  },
  {
    q: "Do you provide support after launching my website or campaign?",
    a: "Yes, we offer ongoing support and maintenance plans to keep your site secure, updated, and performing well long after launch.",
  },
  {
    q: "What makes your agency different from the rest?",
    a: "We combine design, development, and SEO under one roof, so your website and marketing strategy are built to work together from day one.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>();
  const id = `faq-${index}`;

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-[20px] transition-[background-color,box-shadow,opacity,transform] duration-500 ease-out ${
        open ? "bg-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/70" : "bg-[#f1f3f6] hover:bg-[#ebeef2]"
      }`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transitionDelay: inView ? `${Math.min(index, 6) * 60}ms` : "0ms",
      }}
    >
      <button
        type="button"
        id={`${id}-q`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`${id}-a`}
        className="flex min-h-[60px] w-full items-center justify-between gap-6 px-5 py-4 text-left font-sans sm:px-6"
      >
        <span className="text-[15px] font-medium leading-snug" style={{ color: INK }}>
          {q}
        </span>
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center text-slate-500 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          <PlusIcon className="h-4 w-4" />
        </span>
      </button>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <p className="text-small px-5 pb-5 leading-relaxed text-slate-500 sm:px-6">{a}</p>
        </div>
      </div>
    </div>
  );
}

export type FAQContent = { eyebrow?: string; heading?: string; intro?: string; items?: { question?: string; answer?: string }[] };

/**
 * Shared FAQ: sticky intro on the left, accordion on the right. Used by the coded pages and by FAQ
 * blocks on CMS-built pages. `content` comes from the CMS; anything missing falls back to the copy
 * above (an intentionally empty intro is hidden).
 */
export default function FAQSection({ content }: { content?: FAQContent } = {}) {
  const list = content?.items?.filter((i) => i.question && i.answer).map((i) => ({ q: i.question!, a: i.answer! }));
  const items = list && list.length ? list : faqs;
  const intro = content?.intro ?? "We've gathered all the important info right here. Explore our FAQs and find the answers you need.";
  return (
    <section className="bg-[#f9fafb] py-16 lg:py-24">
      <Container>
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-start lg:gap-16 xl:gap-24">
          <div className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: INK }}>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#111827] text-white [&_svg]:h-3 [&_svg]:w-3">
                <ChatIcon />
              </span>
              {content?.eyebrow || "Frequently Asked Questions"}
            </span>

            <h2 className="text-h3 font-heading mt-4 max-w-[460px] font-semibold leading-[1.12] tracking-[-0.025em]" style={{ color: INK }}>
              {content?.heading || "FAQ It Up! Your curiosity meets our expertise—let's clear things up!"}
            </h2>

            {intro && <p className="text-small mt-4 max-w-[360px] leading-relaxed text-slate-500">{intro}</p>}
          </div>

          <div className="flex flex-col gap-3">
            {items.map((item, i) => (
              <FAQItem key={`${i}-${item.q}`} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
