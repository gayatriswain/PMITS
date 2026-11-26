"use client";

import Container from "./Container";
import { Counter } from "./useCountUp";
import { GoogleGIcon, StarIcon } from "./icons";
import {
  DrawUsersIcon,
  DrawBrowserCursorIcon,
  DrawSearchIcon,
  DrawHeadsetIcon,
  DrawChatIcon,
  DrawTrendingUpIcon,
  DrawBarChartUpIcon,
  DrawAwardIcon,
} from "./drawIcons";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const TEAL = "#0d9488";

const features__cms = [
  {
    number: "01",
    Icon: DrawUsersIcon,
    title: "Business-First Approach",
    description:
      "We start by understanding your business goals, target audience, and market to create strategies that drive real results.",
  },
  {
    number: "02",
    Icon: DrawBrowserCursorIcon,
    title: "Conversion-Focused Websites",
    description:
      "We design and develop websites that are not just visually stunning, but engineered to turn visitors into customers.",
  },
  {
    number: "03",
    Icon: DrawSearchIcon,
    title: "SEO-Driven Development",
    description:
      "Our websites are built with SEO at the core so you rank higher, attract qualified traffic, and grow your visibility.",
  },
  {
    number: "04",
    Icon: DrawHeadsetIcon,
    title: "Dedicated Support & Partnership",
    description:
      "Our dedicated team is always available to support you and act as a true extension of your business.",
  },
  {
    number: "05",
    Icon: DrawChatIcon,
    title: "Transparent Communication",
    description:
      "We believe in clarity and transparency. You'll always be informed with regular updates, reports, and open communication.",
  },
  {
    number: "06",
    Icon: DrawTrendingUpIcon,
    title: "Measurable Growth",
    description:
      "From traffic to leads, we focus on data that matters and deliver measurable growth for your business.",
  },
];

type Stat = {
  Icon: () => React.JSX.Element;
  label: string;
  sub: string;
  target?: number;
  prefix?: string;
  suffix?: string;
  value?: string;
};

const stats__cms: Stat[] = [
  { Icon: DrawTrendingUpIcon, target: 250, prefix: "", suffix: "+", label: "Projects Delivered", sub: "Across 15+ Industries" },
  { Icon: DrawUsersIcon, target: 98, prefix: "", suffix: "%", label: "Client Retention Rate", sub: "Long-term Partnerships" },
  { Icon: DrawAwardIcon, target: 7, prefix: "", suffix: "+", label: "Years of Excellence", sub: "Industry Experience" },
  { Icon: DrawBarChartUpIcon, value: "2X – 5X", label: "Average Growth", sub: "In Traffic & Leads" },
];

export default function WhyChooseUs() {
  const $t = useCmsText();
  const features = useCmsData("WhyChooseUs__features", features__cms);
  const stats = useCmsData("WhyChooseUs__stats", stats__cms);
  return (
    <section className="relative overflow-hidden bg-slate-50 pb-16 pt-8 lg:pb-20 lg:pt-10">
      <div className="pointer-events-none absolute -right-24 -top-24 hidden h-96 w-96 rounded-full bg-teal-100/25 blur-3xl lg:block" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 hidden h-96 w-96 rounded-full bg-teal-100/20 blur-3xl lg:block" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide"
            style={{ borderColor: "rgba(13,148,136,0.3)", color: TEAL, backgroundColor: "#e6f6f4" }}
          >
            {$t("WhyChooseUs__t1", "WHY BUSINESSES CHOOSE PROMANAGE")}</span>
          <h2 className="text-h2 mt-4 font-bold" style={{ color: NAVY }}>
            {$t("WhyChooseUs__t2", "More Than a Service, ")}<br className="hidden sm:block" />
            <span className="relative inline-block" style={{ color: TEAL }}>
              {$t("WhyChooseUs__t3", "A Growth Partnership.")}<svg
                className="absolute -bottom-1.5 left-0 h-3 w-full"
                viewBox="0 0 220 12"
                preserveAspectRatio="none"
                fill="none"
                stroke={TEAL}
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M2 8c40-6 140-6 216 2" />
              </svg>
            </span>
          </h2>
          <p className="text-body mt-4 text-slate-500">
            {rich($t("WhyChooseUs__t4", "We combine strategy, creativity, and technology to deliver digital experiences that help businesses attract, convert, and grow—consistently."))}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ number, Icon, title, description }) => (
            <div
              key={number}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6"
            >
              {/* subtle corner decoration */}
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-teal-50" />
              <div
                className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 opacity-[0.15]"
                style={{
                  backgroundImage: `radial-gradient(${TEAL} 1px, transparent 1.5px)`,
                  backgroundSize: "8px 8px",
                }}
              />

              <span
                className="absolute right-4 top-3 text-3xl font-extrabold text-slate-100 select-none"
                aria-hidden
              >
                {number}
              </span>
              <span
                className="relative flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#e6f6f4", color: TEAL }}
              >
                <Icon />
              </span>
              <h3 className="relative mt-4 text-base font-bold leading-snug" style={{ color: NAVY }}>
                {title}
              </h3>
              <p className="text-small relative mt-2 text-slate-500">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.15)] ring-1 ring-slate-100 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#e6f6f4", color: TEAL }}
                >
                  <stat.Icon />
                </span>
                <div>
                  <p className="text-body font-bold" style={{ color: TEAL }}>
                    {stat.target !== undefined ? (
                      <Counter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="text-caption font-medium text-slate-600">{stat.label}</p>
                  <p className="text-[11px] text-slate-400">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 border-t border-slate-100 pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <div className="flex items-center gap-2">
              <GoogleGIcon />
              <div>
                <span className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </span>
                <p className="text-caption text-slate-500">
                  <span className="font-bold" style={{ color: NAVY }}>
                    {$t("WhyChooseUs__t5", "4.9/5")}</span>{" "}
                  {rich($t("WhyChooseUs__t6", "Google Reviews"))}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold" style={{ color: NAVY }}>
                {$t("WhyChooseUs__t7", "Clutch")}</span>
              <div>
                <span className="flex items-center gap-0.5 text-red-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </span>
                <p className="text-caption text-slate-500">
                  <span className="font-bold" style={{ color: NAVY }}>
                    {$t("WhyChooseUs__t8", "4.9/5")}</span>{" "}
                  {rich($t("WhyChooseUs__t9", "Clutch Reviews"))}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
