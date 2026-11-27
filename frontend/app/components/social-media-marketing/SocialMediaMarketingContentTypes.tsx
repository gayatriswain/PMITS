"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import type { InstagramMedia } from "../../lib/instagram";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#0d9488";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

type IconProps = { size?: number };
const iconBase = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const ReelsIcon = ({ size = 12 }: IconProps) => (
  <svg {...iconBase(size)}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M8 3 L10 8 M14 3 L16 8" />
  </svg>
);
const GridIcon = ({ size = 12 }: IconProps) => (
  <svg {...iconBase(size)}>
    <rect x="3" y="3" width="7" height="7" rx="1.2" />
    <rect x="14" y="3" width="7" height="7" rx="1.2" />
    <rect x="3" y="14" width="7" height="7" rx="1.2" />
    <rect x="14" y="14" width="7" height="7" rx="1.2" />
  </svg>
);
const CircleDotIcon = ({ size = 12 }: IconProps) => (
  <svg {...iconBase(size)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const StarIcon = ({ size = 12 }: IconProps) => (
  <svg {...iconBase(size)}>
    <path d="m12 2.5 3.1 6.3 7 1-5 4.9 1.2 6.9-6.3-3.3-6.3 3.3 1.2-6.9-5-4.9 7-1Z" />
  </svg>
);
const UserIcon = ({ size = 12 }: IconProps) => (
  <svg {...iconBase(size)}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
);
const PlayFillIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const ArrowUpRightIcon = ({ size = 13 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Content-type cards                                                 */
/* ------------------------------------------------------------------ */

type CardData = {
  label: string;
  Icon: (p: IconProps) => React.JSX.Element;
  image: string;
  href: string;
};

const CARDS__cms: CardData[] = [
  { label: "Reels", Icon: ReelsIcon, image: "/content-reels.webp", href: "#" },
  { label: "Carousels", Icon: GridIcon, image: "/content-carousels.webp", href: "#" },
  { label: "Stories", Icon: CircleDotIcon, image: "/content-stories.webp", href: "#" },
  { label: "Product Shots", Icon: StarIcon, image: "/content-product-shots.webp", href: "#" },
  { label: "Lifestyle", Icon: StarIcon, image: "/content-lifestyle.webp", href: "#" },
  { label: "UGC Content", Icon: UserIcon, image: "/content-ugc.webp", href: "#" },
];

function ContentCard({ card }: { card: CardData }) {
  return (
    <motion.a
      variants={fadeUp}
      href={card.href}
      className="group flex flex-col rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-[0_15px_30px_-20px_rgba(15,23,42,0.3)] transition-shadow hover:shadow-[0_20px_35px_-18px_rgba(15,23,42,0.4)]"
    >
      <div className="relative w-full aspect-[3/4] bg-slate-100">
        <Image src={card.image} alt={card.label} fill sizes="180px" className="object-cover" />
      </div>
      <div className="flex items-center justify-between px-3.5 py-3">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-500">
          <card.Icon size={13} />
          {card.label}
        </span>
        <span className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRightIcon />
        </span>
      </div>
    </motion.a>
  );
}

function LiveMediaCard({ item }: { item: InstagramMedia }) {
  const isVideo = item.mediaType === "VIDEO";
  return (
    <motion.a
      variants={fadeUp}
      href={item.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col"
    >
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 ring-1 ring-slate-100 shadow-[0_15px_30px_-20px_rgba(15,23,42,0.3)]">
        <Image
          src={isVideo ? item.thumbnailUrl ?? item.mediaUrl : item.mediaUrl}
          alt={item.caption?.slice(0, 80) ?? "Instagram post"}
          fill
          sizes="180px"
          className="object-cover"
          unoptimized
        />
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/35">
              <PlayFillIcon />
            </span>
          </div>
        )}
      </div>
      {item.caption && (
        <span className="mt-3 text-[11px] text-slate-500 leading-snug line-clamp-2">{item.caption}</span>
      )}
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/* Platforms                                                           */
/* ------------------------------------------------------------------ */

const PLATFORMS__cms = [
  {
    label: "Instagram",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.9.25-1.5 1.55-1.5H16.5V4.3C16.2 4.26 15.2 4.17 14 4.17c-2.4 0-4 1.46-4 4.16V10.5H7.5v3H10V21Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
        <path d="M10.5 9.5 L15 12 L10.5 14.5 Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="9" width="4" height="12" />
        <circle cx="5" cy="4.5" r="2.4" />
        <path d="M11 9h3.8v2.1h.05c.53-.95 1.83-2 3.77-2 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.28c0-1.26-.02-2.87-1.75-2.87-1.76 0-2.03 1.35-2.03 2.78V21h-3.9Z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 2c.4 2.5 2 4.2 4.7 4.4v3.3c-1.6.1-3.1-.4-4.7-1.4v6.6c0 3.7-3 6.6-6.7 6.6S3.1 18.6 3.1 14.9c0-3.6 2.9-6.6 6.5-6.6.3 0 .7 0 1 .1v3.4c-.3-.1-.6-.2-1-.2-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2 3.3-1.4 3.3-3.2V2Z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 3.5 5.7 3.5 9.7c0 2.1 1.1 4.7 2.9 5.5.3.1.4 0 .5-.3l.4-1.5c0-.2 0-.3-.1-.5-.5-.7-.9-1.8-.9-2.9 0-3.8 2.8-7.2 7.4-7.2 4 0 6.3 2.5 6.3 5.9 0 4.4-1.9 8.2-4.8 8.2-1.6 0-2.8-1.3-2.4-3 .5-1.9 1.3-3.9 1.3-5.3 0-1.2-.6-2.2-2-2.2-1.6 0-2.9 1.7-2.9 3.9 0 1.4.5 2.4.5 2.4l-1.9 8.2c-.6 2.4-.1 5.3-.05 5.6.03.2.28.24.4.1.16-.2 2.2-2.8 2.9-5.1.2-.7 1.1-4.4 1.1-4.4.6 1 2.1 1.9 3.7 1.9 4.9 0 8.2-4.4 8.2-10.4C20.5 5.2 17 2 12 2Z" />
      </svg>
    ),
  },
  {
    label: "Threads",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.2 22c-3.3 0-5.9-1.1-7.6-3.3C3 16.7 2.3 14.2 2.3 12s.7-4.7 2.3-6.7C6.3 3.1 8.9 2 12.2 2c3 0 5.3.9 7 2.6 1.4 1.4 2.2 3.1 2.5 5.1l-2.4.4c-.2-1.5-.8-2.7-1.8-3.7-1.2-1.2-2.9-1.8-5.2-1.8-2.5 0-4.4.8-5.7 2.4C5.4 8.5 4.8 10.1 4.8 12c0 1.9.6 3.5 1.8 4.9 1.3 1.6 3.2 2.4 5.7 2.4 2 0 3.5-.5 4.6-1.5.9-.8 1.4-1.8 1.6-3-.2-.1-.5-.1-.8-.2-.6-.1-1.3-.1-2-.1-1.5 0-2.7.3-3.6 1-.8.6-1.2 1.4-1.2 2.3 0 .8.3 1.4.9 1.9.6.5 1.4.7 2.3.7 1.1 0 2-.3 2.7-1 .6-.6 1-1.4 1.1-2.5l2.3.5c-.2 1.6-.9 2.9-2 3.9-1.3 1.1-2.8 1.6-4.6 1.6Z" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */

export default function SocialMediaMarketingContentTypes({
  liveMedia,
}: {
  liveMedia?: InstagramMedia[] | null;
}) {
  const $t = useCmsText();
  const CARDS = useCmsData("SocialMediaMarketingContentTypes__CARDS", CARDS__cms);
  const PLATFORMS = useCmsData("SocialMediaMarketingContentTypes__PLATFORMS", PLATFORMS__cms);
  const hasLiveMedia = !!liveMedia && liveMedia.length > 0;

  return (
    <section className="relative w-full bg-white py-16 lg:py-24 overflow-hidden">
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-start mb-10 lg:mb-14"
        >
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[2px]" style={{ backgroundColor: TEAL }} />
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: TEAL }}>
                {html($t("SocialMediaMarketingContentTypes__t1", "Content That Connects"))}</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-h2 font-serif font-bold">
              <span className="block" style={{ color: NAVY }}>{html($t("SocialMediaMarketingContentTypes__t2", "Great Content"))}</span>
              <span className="block" style={{ color: NAVY }}>{html($t("SocialMediaMarketingContentTypes__t3", "Lives Everywhere."))}</span>
              <span className="block font-serif italic" style={{ color: TEAL }}>{html($t("SocialMediaMarketingContentTypes__t4", "We Make It Work."))}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-body text-slate-600 mt-4 max-w-md">
              {rich($t("SocialMediaMarketingContentTypes__t5", "From scroll-stopping reels to engaging carousels and stories that convert — we create content designed to connect, engage, and grow your brand."))}</motion.p>
          </div>

          <motion.div variants={fadeUp} className="lg:pt-2 lg:text-right">
            <p className="text-small text-slate-500">{rich($t("SocialMediaMarketingContentTypes__t6", "Every platform. Every format."))}</p>
            <p className="text-small font-bold" style={{ color: NAVY }}>{rich($t("SocialMediaMarketingContentTypes__t7", "One consistent brand experience."))}</p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5 items-end"
        >
          {hasLiveMedia
            ? liveMedia!.slice(0, 6).map((item) => <LiveMediaCard key={item.id} item={item} />)
            : CARDS.map((card) => <ContentCard key={card.label} card={card} />)}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-14 lg:mt-16 flex flex-col items-center text-center"
        >
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-5">
            {rich($t("SocialMediaMarketingContentTypes__t8", "Creating Impact Across Platforms"))}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {PLATFORMS.map((p) => (
              <span key={p.label} className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
                <span style={{ color: DEEP_TEAL }}>{p.icon}</span>
                {p.label}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
