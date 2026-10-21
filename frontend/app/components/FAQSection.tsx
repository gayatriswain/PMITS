"use client";

import { useState } from "react";
import Container from "./Container";
import { useInView } from "./useInView";
import { ChatIcon, PlusIcon } from "./icons";

const NAVY = "#132a43";

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

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl bg-slate-50 transition-all duration-700 ease-out"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transitionDelay: inView ? `${Math.min(index, 6) * 70}ms` : "0ms",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-5 text-left font-sans"
      >
        <span className="text-sm font-semibold sm:text-base" style={{ color: NAVY }}>
          {q}
        </span>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 transition-transform duration-300"
          style={{ color: NAVY, transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <PlusIcon />
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-slate-500">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[380px_1fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: NAVY }}
              >
                <ChatIcon />
              </span>
              Frequently Asked Questions
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-snug sm:text-4xl" style={{ color: NAVY }}>
              FAQ It Up! Your curiosity meets our expertise—let&apos;s clear things up!
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              We&apos;ve gathered all the important info right here. Explore our FAQs and find the
              answers you need.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
