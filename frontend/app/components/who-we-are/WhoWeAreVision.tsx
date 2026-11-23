"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";

const INK = "#0d1b33";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type IconProps = { size?: number; color?: string };
const base = (size: number, color: string, strokeWidth = 1.7) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const CapIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M2 9.5 12 5l10 4.5L12 14Z" />
    <path d="M6 11.3V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.7M22 9.5V15" />
  </svg>
);
const BankIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M3 9.5 12 4l9 5.5ZM4 20h16M3 22h18" />
    <path d="M6 10v8M10 10v8M14 10v8M18 10v8" />
  </svg>
);
const HeartPulseIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 6.8 4.5 4.5 0 0 1 20 9.5C20 15.3 12 20 12 20Z" />
    <path d="M4.5 12h3.5l1.5-2.5 2.5 5 1.5-2.5h6" />
  </svg>
);
const CartIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M2.5 3.5h2.5l2.4 11h11l2.1-8H6.2" />
    <circle cx="9.5" cy="19" r="1.5" />
    <circle cx="17" cy="19" r="1.5" />
    <path d="M10 10.5h7" />
  </svg>
);
const TruckIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M2 6h12v10H2ZM14 9.5h4l3.5 3.5V16H14" />
    <circle cx="6" cy="17.5" r="1.8" />
    <circle cx="17.5" cy="17.5" r="1.8" />
  </svg>
);
const GridIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
);
const EyeIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="1" fill={color} />
  </svg>
);
const ArrowIcon = ({ size = 18, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const INDUSTRIES = [
  { Icon: CapIcon, label: "Education" },
  { Icon: BankIcon, label: "Banking" },
  { Icon: HeartPulseIcon, label: "Healthcare" },
  { Icon: CartIcon, label: "E-commerce" },
  { Icon: TruckIcon, label: "Logistics" },
  { Icon: GridIcon, label: "And More" },
];

function Dots({
  cols,
  rows,
  className = "",
}: {
  cols: number;
  rows: number;
  className?: string;
}) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width={cols * 14}
      height={rows * 14}
      aria-hidden
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <circle
          key={i}
          cx={7 + (i % cols) * 14}
          cy={7 + Math.floor(i / cols) * 14}
          r="1.5"
          fill="#cbd5e1"
        />
      ))}
    </svg>
  );
}

/* Industries as a column of white tiles joined by a thin dotted spine */
function IndustryList() {
  return (
    <motion.ul
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative flex flex-col gap-5"
    >
      {INDUSTRIES.map(({ Icon, label }, i) => (
        <motion.li
          key={label}
          variants={{
            hidden: { opacity: 0, x: 24 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.5, ease: EASE },
            },
          }}
          className="relative flex w-[200px] items-center gap-4 rounded-xl bg-white/95 px-4 py-3.5 shadow-[0_14px_30px_-18px_rgba(13,27,51,0.45)] ring-1 ring-slate-100 backdrop-blur"
        >
          <span className="flex w-7 shrink-0 justify-center">
            <Icon size={26} color={DEEP_TEAL} />
          </span>
          <span className="h-7 w-px bg-slate-200" />
          <span className="text-[13.5px] font-semibold" style={{ color: INK }}>
            {label}
          </span>
          {/* dotted link down to the next card, under the icon, with a dot at each end */}
          {i < INDUSTRIES.length - 1 && (
            <span className="absolute left-[30px] top-full flex h-5 w-0 flex-col items-center justify-between py-[2px]" aria-hidden>
              <span className="h-[5px] w-[5px] shrink-0 rounded-full" style={{ backgroundColor: TEAL }} />
              <span className="w-0 flex-1 border-l-2 border-dotted" style={{ borderColor: TEAL }} />
              <span className="h-[5px] w-[5px] shrink-0 rounded-full" style={{ backgroundColor: TEAL }} />
            </span>
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
}

function VisionProposalLink() {
  return (
    <Link
      href="/contact"
      className="group inline-flex items-center gap-5 rounded-2xl py-3 pl-3 pr-10 text-[15px] font-semibold uppercase tracking-[0.04em] text-white shadow-[0_18px_36px_-14px_rgba(13,148,136,0.8)] transition hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(90deg, #0b857c, #109a90 50%, #23b3a8)",
      }}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/80 transition-transform group-hover:translate-x-1">
        <ArrowIcon size={20} />
      </span>
      <span className="h-8 w-px bg-white/40" />
      Get My Free Proposal
    </Link>
  );
}

// the photo keeps its full shape: soft fade in from the left where it meets the copy, and out to the right
const PHOTO_MASK =
  "linear-gradient(to right, transparent, #000 10%, #000 70%, transparent)";

export default function WhoWeAreVision() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <Container>
        <div className="grid grid-cols-1 items-center lg:grid-cols-[42fr_58fr]">
          {/* Left copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 order-2 py-14 lg:order-1 lg:-mr-16 lg:py-16"
          >
            <motion.span
              variants={fadeUp}
              className="flex items-center gap-2"
              aria-hidden
            >
              <span
                className="h-[3px] w-9 rounded-full"
                style={{ backgroundColor: TEAL }}
              />
              <span
                className="h-[3px] w-[3px] rounded-full"
                style={{ backgroundColor: TEAL }}
              />
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-[46px] font-bold leading-tight tracking-tight sm:text-[56px]"
            >
              <span style={{ color: INK }}>Our </span>
              <span style={{ color: TEAL }}>Vision</span>
            </motion.h2>
            <motion.span
              variants={fadeUp}
              className="mt-4 block h-[3px] w-14 rounded-full"
              style={{ backgroundColor: TEAL }}
            />
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[440px] text-[15px] leading-[1.8] text-slate-600"
            >
              Our goal is to be known as the go-to partner for companies looking
              to transition digitally. With a genuinely global reach, we enable
              our customers to thrive in various industries, such as education,
              banking, healthcare, e-commerce, logistics, and more, by combining
              innovative methods with strategic insights.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex max-w-[440px] items-center gap-5 rounded-2xl bg-white px-6 py-6 shadow-[0_24px_50px_-28px_rgba(13,27,51,0.4)] ring-1 ring-slate-100"
            >
              <span className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-teal-50 ring-8 ring-teal-50/50">
                <EyeIcon size={36} color={TEAL} />
                {/* little ticks round the eye, like a lens */}
                <span className="absolute -top-3 left-1/2 h-2 w-px -translate-x-1/2 bg-teal-300" />
                <span className="absolute -bottom-3 left-1/2 h-2 w-px -translate-x-1/2 bg-teal-300" />
              </span>
              <span className="h-14 w-px bg-slate-200" />
              <p className="text-[16px] leading-[1.6]" style={{ color: INK }}>
                Shaping a better tomorrow through{" "}
                <span className="font-semibold" style={{ color: TEAL }}>
                  digital innovation
                </span>{" "}
                and{" "}
                <span className="font-semibold" style={{ color: TEAL }}>
                  strategic insights.
                </span>
              </p>
            </motion.div>

            <Dots
              cols={6}
              rows={4}
              className="mt-10 hidden opacity-70 lg:block"
            />
            {/* on small screens the button follows the copy instead of sitting on the photo */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex justify-center lg:hidden"
            >
              <VisionProposalLink />
            </motion.div>
          </motion.div>

          {/* Right: the whole photo, with the industries over its fading right edge and the button at its foot */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[1068/992] w-full">
              <Image
                src="/who-we-are3.webp"
                alt="A man in a suit looking out over a city skyline at sunrise"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-contain lg:[-webkit-mask-image:var(--photo-mask)] lg:[mask-image:var(--photo-mask)]"
                style={{ "--photo-mask": PHOTO_MASK } as React.CSSProperties}
              />
            </div>
            <div className="absolute right-[4%] top-[13%] z-10 hidden lg:block">
              <IndustryList />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="absolute bottom-[5%] left-[34%] z-10 hidden lg:block"
            >
              <VisionProposalLink />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
