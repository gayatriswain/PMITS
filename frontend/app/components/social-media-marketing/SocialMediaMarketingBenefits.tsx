"use client";

import Container from "../shared/Container";
import { useInView } from "../shared/useInView";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const TEAL = "#0d9488";

type IconProps = { size?: number };
const iconBase = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: TEAL,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const VisibilityIcon = ({ size = 18 }: IconProps) => (
  <svg {...iconBase(size)}>
    <path d="M17 2 21 6 17 10" />
    <path d="M3 12V9a3 3 0 0 1 3-3h15" />
    <path d="M7 22 3 18 7 14" />
    <path d="M21 12v3a3 3 0 0 1-3 3H3" />
  </svg>
);
const ConsistencyIcon = ({ size = 18 }: IconProps) => (
  <svg {...iconBase(size)}>
    <path d="M12 3 20 6 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V6 Z" />
    <path d="M8.5 12 L11 14.5 L15.5 9.5" />
  </svg>
);
const EngagementIcon = ({ size = 18 }: IconProps) => (
  <svg {...iconBase(size)}>
    <path d="M12 20.5s-7-4.4-9.3-8.6C.9 8.6 1.6 5 4.5 3.6c2.2-1 4.7-.3 6 1.5l1.5 2 1.5-2c1.3-1.8 3.8-2.5 6-1.5 2.9 1.4 3.6 5 1.8 8.3-2.3 4.2-9.3 8.6-9.3 8.6Z" />
  </svg>
);
const PerformanceIcon = ({ size = 18 }: IconProps) => (
  <svg {...iconBase(size)}>
    <path d="M4 14a8 8 0 0 1 16 0" />
    <path d="m12 14 3-5" />
    <circle cx="12" cy="14" r="1.6" fill={TEAL} stroke="none" />
    <path d="M4 14h2M18 14h2M12 4v2" />
  </svg>
);
const CreativityIcon = ({ size = 18 }: IconProps) => (
  <svg {...iconBase(size)} fill={TEAL} stroke="none">
    <path d="M12 2c0 4.5 4.5 9 9 9-4.5 0-9 4.5-9 9 0-4.5-4.5-9-9-9 4.5 0 9-4.5 9-9z" />
    <path d="M19 15c0 1.5 1.5 3 3 3-1.5 0-3 1.5-3 3 0-1.5-1.5-3-3-3 1.5 0 3-1.5 3-3z" />
  </svg>
);
const StrategyIcon = ({ size = 18 }: IconProps) => (
  <svg {...iconBase(size)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill={TEAL} stroke="none" />
  </svg>
);
const SpeedIcon = ({ size = 18 }: IconProps) => (
  <svg {...iconBase(size)} fill={TEAL} stroke="none">
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
  </svg>
);
const ScalabilityIcon = ({ size = 18 }: IconProps) => (
  <svg {...iconBase(size)}>
    <path d="M4 20 V15 M9 20 V12 M14 20 V14 M19 20 V9" />
    <path d="M4 11 L9 7 L13 9 L20 4 M16.5 4 H20 V7.5" />
  </svg>
);

const BENEFITS__cms = [
  {
    title: "Visibility",
    desc: "Be seen across platforms with content that actually stands out in busy feeds every single day.",
    Icon: VisibilityIcon,
  },
  {
    title: "Consistency",
    desc: "Keep the same voice and visual vibe so people recognize you instantly without confusion anywhere.",
    Icon: ConsistencyIcon,
  },
  {
    title: "Engagement",
    desc: "Turn casual viewers into followers who like, comment and share naturally without forced tactics.",
    Icon: EngagementIcon,
  },
  {
    title: "Performance",
    desc: "Focus on what works and keep improving with every post you publish over time consistently.",
    Icon: PerformanceIcon,
  },
  {
    title: "Creativity",
    desc: "Use bold visuals and fresh ideas that break the usual scroll pattern effortlessly online daily.",
    Icon: CreativityIcon,
  },
  {
    title: "Strategy",
    desc: "Every piece of content has a purpose, not just random posting for short-term attention spikes.",
    Icon: StrategyIcon,
  },
  {
    title: "Speed",
    desc: "Move fast with trends while still keeping quality high even under tight deadlines.",
    Icon: SpeedIcon,
  },
  {
    title: "Scalability",
    desc: "Grow your presence smoothly without redesigning everything again from zero each time.",
    Icon: ScalabilityIcon,
  },
];

const HASHTAGS__cms = ["#content", "#growth", "#strategy", "#performance", "#visibility"];

function BenefitItem({
  title,
  desc,
  Icon,
  index,
}: {
  title: string;
  desc: string;
  Icon: (p: IconProps) => React.JSX.Element;
  index: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="text-left transition-all duration-700 ease-out"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transitionDelay: inView ? `${Math.min(index, 6) * 70}ms` : "0ms",
      }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: "#e6f6f4" }}
        >
          <Icon size={16} />
        </span>
        <h3 className="text-[15px] font-bold" style={{ color: NAVY }}>
          {title}
        </h3>
      </div>
      <p className="text-small mt-2.5 text-slate-500">{desc}</p>
    </div>
  );
}

export default function SocialMediaMarketingBenefits() {
  const $t = useCmsText();
  const BENEFITS = useCmsData("SocialMediaMarketingBenefits__BENEFITS", BENEFITS__cms);
  const HASHTAGS = useCmsData("SocialMediaMarketingBenefits__HASHTAGS", HASHTAGS__cms);
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="w-full lg:w-[88%] mx-auto grid grid-cols-1 gap-10 lg:grid-cols-[300px_1px_1fr] lg:items-start lg:gap-10">
          <div className="lg:sticky lg:top-28">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{$t("SocialMediaMarketingBenefits__t1", "Benefits")}</span>

            <h2 className="text-h2 mt-3 font-bold" style={{ color: NAVY }}>
              {$t("SocialMediaMarketingBenefits__t2", "Everything You Need to Grow")}</h2>

            <p className="text-small mt-4 text-slate-500">
              {rich($t("SocialMediaMarketingBenefits__t3", "A flexible system designed to help brands create, scale and stay ahead across platforms while capturing trends, shaping culture and turning content into scroll-stopping moments."))}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {HASHTAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: "#e6f6f4", color: TEAL }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block w-px bg-slate-200 self-stretch" aria-hidden />

          <div className="flex flex-col gap-8">
            {BENEFITS.map((item, i) => (
              <BenefitItem key={item.title} title={item.title} desc={item.desc} Icon={item.Icon} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
