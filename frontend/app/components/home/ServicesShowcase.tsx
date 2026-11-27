"use client";

import { useEffect, useRef, useState } from "react";
import Container from "../shared/Container";
import { PlusIcon, TagIcon, ArrowIcon, CheckIcon } from "../shared/icons";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const TEAL = "#0d9488";

type Service = {
  title: string;
  description: string;
  tags: string[];
  details: string[];
};

const services__cms: Service[] = [
  {
    title: "Web Design and Development",
    description:
      "Your website is like your digital handshake—it's the first thing people notice about you online. Our Web Design & Development services are all about making that handshake firm, friendly, and unforgettable.",
    tags: [
      "UI/UX Design",
      "Custom Website Design",
      "E-Commerce Development",
      "Content Management Systems (CMS)",
      "Website Maintenance and Support",
      "SEO Integration",
      "UX/UI Optimization",
    ],
    details: [
      "Discovery call to understand your goals and audience",
      "Custom design mockups tailored to your brand",
      "Responsive development across all devices",
      "Launch support and post-launch monitoring",
    ],
  },
  {
    title: "Digital Marketing",
    description:
      "Let's face it, the internet is a noisy place. But with our Digital Marketing services, you won't just stand out—you'll shine. We'll help you show up where your customers are hanging out, whether that's Google, Instagram, or somewhere in between. Think of us as your online hype team, always finding clever ways to boost your visibility and drive those sweet, sweet clicks.",
    tags: [
      "SEO (Search Engine Optimization)",
      "PPC Advertising",
      "Social Media Marketing",
      "Email Marketing",
      "Content Marketing",
    ],
    details: [
      "In-depth audience and competitor research",
      "Multi-channel campaign planning (SEO, PPC, Social)",
      "Monthly performance reports with clear insights",
      "Ongoing optimization based on real data",
    ],
  },
  {
    title: "Branding & Creative Services",
    description:
      "Your brand is so much more than a logo—it's your story, your personality, and your promise to customers. Our Branding & Creative Services bring your identity to life in a way that's bold, beautiful, and 100% you. We'll help you stand out, stick in people's minds, and make your competitors go, \"Whoa, that's cool.\"",
    tags: [
      "Logo Design",
      "Brand Strategy & Positioning",
      "Visual Identity Design",
      "Brand Guidelines",
      "Social Media Graphics",
      "Email Design",
      "Pitch Decks & Presentations",
      "Packaging Design",
    ],
    details: [
      "Brand discovery workshop to define your voice",
      "Logo, color palette, and typography system",
      "Complete brand guidelines document",
      "Marketing collateral ready to use across channels",
    ],
  },
  {
    title: "App Design & Development",
    description:
      "Your app is your business in someone's pocket—it needs to feel effortless, look great, and actually work. Our App Design & Development services turn your idea into a smooth, intuitive experience your users will want to open again and again.",
    tags: [
      "iOS App Development",
      "Android App Development",
      "Cross-Platform Apps",
      "UI/UX for Mobile",
      "App Store Optimization",
      "App Maintenance & Support",
    ],
    details: [
      "Wireframing and UX flow mapping",
      "Native or cross-platform development",
      "Rigorous QA testing across devices",
      "App store submission and launch support",
    ],
  },
];

function ServiceCard({ service }: { service: Service }) {
  const $t = useCmsText();
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-slate-50 p-6 lg:p-8">
      <h3 className="text-h6 font-bold" style={{ color: NAVY }}>
        {service.title}
      </h3>
      <p className="text-small mt-3 text-slate-600">{service.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600"
          >
            <TagIcon className="text-slate-400" />
            {tag}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-6 flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 font-sans text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
      >
        {open ? $t("ServicesShowcase__t1", "Hide Details") : $t("ServicesShowcase__t2", "View Details")}
        <span
          className="transition-transform duration-300 ease-out"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <PlusIcon />
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-caption font-semibold uppercase tracking-wide text-slate-400">{rich($t("ServicesShowcase__t3", "What's Included"))}</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {service.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckIcon className="h-2.5 w-2.5" />
                  </span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesShowcase() {
  const $t = useCmsText();
  const services = useCmsData("ServicesShowcase__services", services__cms);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>(() => services.map(() => false));

  // Scrollspy: tracks which card is centered, to highlight the left nav.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Reveal-on-scroll: each card starts hidden and fades/slides in the first
  // time it enters the viewport, then stays visible.
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isNaN(idx)) return;
          setRevealed((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    cardRefs.current.forEach((el) => el && revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  const scrollToIndex = (i: number) => {
    cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide"
            style={{ borderColor: "rgba(13,148,136,0.3)", color: TEAL, backgroundColor: "#e6f6f4" }}
          >
            {html($t("ServicesShowcase__t4", "OUR SERVICES"))}</span>
          <h2 className="text-h2 mt-4 font-bold" style={{ color: NAVY }}>{rich($t("ServicesShowcase__t5m", "Services designed to help your brand <span class=\"text-[#0d9488]\">shine brighter.</span>"))}</h2>
        </div>

        {/* Left nav (sticky, scrollspy-highlighted) + right cards that scroll normally */}
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[300px_1fr] lg:gap-10">
          <div className="hidden lg:block">
            <div className="sticky top-32 flex flex-col gap-3">
              {services.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  className="flex items-center gap-1.5 whitespace-nowrap text-left font-sans text-sm transition-colors"
                  style={{
                    color: activeIndex === i ? TEAL : "#64748b",
                    fontWeight: activeIndex === i ? 700 : 500,
                  }}
                >
                  {activeIndex === i && <ArrowIcon />}
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-index={i}
                className="transition-all duration-700 ease-out"
                style={{
                  opacity: revealed[i] ? 1 : 0,
                  transform: revealed[i] ? "translateY(0)" : "translateY(28px)",
                }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
