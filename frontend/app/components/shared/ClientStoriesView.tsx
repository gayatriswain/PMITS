"use client";

import { useEffect, useState } from "react";
import Container from "./Container";
import { QuoteIcon, PlayIcon, UserIcon, CloseIcon } from "./icons";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";

const NAVY = "#132a43";
const TEAL = "#0d9488";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  brand: string;
  initials: string;
  gradient: string;
};

const testimonials__cms: Testimonial[] = [
  {
    quote:
      "ProManage didn't just build us a website, they built a booking engine. Online reservations climbed within the first two months of launch.",
    name: "Isabelle Hart",
    role: "Founder, Aurelia",
    brand: "AURELIA",
    initials: "IH",
    gradient: "linear-gradient(135deg, #0d9488, #134e4a)",
  },
  {
    quote:
      "They understood the sensitivity of our industry from day one. The new site is fast, accessible, and patient inquiries have nearly doubled.",
    name: "Dr. Samuel Reyes",
    role: "Practice Director, VitalCare",
    brand: "VITALCARE",
    initials: "SR",
    gradient: "linear-gradient(135deg, #132a43, #0b3b35)",
  },
  {
    quote:
      "From strategy to execution, every detail was intentional. We finally have a digital presence that matches the scale of our projects.",
    name: "Owen Whitfield",
    role: "VP Marketing, Skyline Group",
    brand: "SKYLINE",
    initials: "OW",
    gradient: "linear-gradient(135deg, #fb923c, #c2410c)",
  },
  {
    quote:
      "Our online showroom went from an afterthought to our biggest lead source. The team made the whole process feel effortless.",
    name: "Priya Nandakumar",
    role: "Co-Founder, Havenly",
    brand: "HAVENLY",
    initials: "PN",
    gradient: "linear-gradient(135deg, #0d9488, #0ea5e9)",
  },
  {
    quote:
      "Working with ProManage felt like adding a growth team overnight. Class bookings and site traffic both climbed within the first quarter.",
    name: "Derek Lomax",
    role: "Studio Owner, NovaFit",
    brand: "NOVAFIT",
    initials: "DL",
    gradient: "linear-gradient(135deg, #64748b, #334155)",
  },
  {
    quote:
      "They understood our brand voice better than we did and brought it to life in a way that exceeded expectations. Ten out of ten.",
    name: "Camille Torres",
    role: "Broker, Marbella Realty",
    brand: "MARBELLA",
    initials: "CT",
    gradient: "linear-gradient(135deg, #0d9488, #134e4a)",
  },
];

type VideoStory = {
  name: string;
  role: string;
  gradient: string;
  videoSrc: string;
};

const videoStories__cms: VideoStory[] = [
  {
    name: "Elliot Marsh",
    role: "Owner, Norther & Co.",
    gradient: "linear-gradient(135deg, #132a43, #1e293b)",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    name: "Aisha Coleman",
    role: "Founder, Verdant Studio",
    gradient: "linear-gradient(135deg, #0b3b35, #0d9488)",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
];



const CARD_START_MS = 200;
const CARD_STEP_MS = 100;

/** Published testimonials from the CMS "Testimonials" module (mapped by ./ClientStories.tsx). */
export type CmsTestimonial = { name: string; role: string; quote: string; videoUrl?: string };

const initialsOf = (name: string) =>
  name
    .replace(/^(dr|mr|mrs|ms)\.?\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function ClientStoriesView({ cms }: { cms?: CmsTestimonial[] }) {
  const $t = useCmsText();
  const sectionTestimonials = useCmsData("ClientStories__testimonials", testimonials__cms);
  const sectionVideos = useCmsData("ClientStories__videoStories", videoStories__cms);
  // The Testimonials module wins when it has published entries; otherwise this section's own content.
  const written = (cms ?? []).filter((t) => t.quote);
  const videos = (cms ?? []).filter((t) => t.videoUrl);
  const testimonials: Testimonial[] = written.length
    ? written.map((t, i) => ({
        ...testimonials__cms[i % testimonials__cms.length],
        quote: t.quote,
        name: t.name,
        role: t.role,
        brand: (t.role.split(",").pop() ?? "").trim().toUpperCase(),
        initials: initialsOf(t.name),
      }))
    : sectionTestimonials;
  const videoStories: VideoStory[] = videos.length
    ? videos.map((t, i) => ({ ...videoStories__cms[i % videoStories__cms.length], name: t.name, role: t.role, videoSrc: t.videoUrl! }))
    : sectionVideos;
  const avatarStack = testimonials.slice(0, 4);
  const [openVideo, setOpenVideo] = useState<number | null>(null);

  useEffect(() => {
    if (openVideo === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenVideo(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openVideo]);

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div className="pointer-events-none absolute -left-24 -top-24 hidden h-96 w-96 rounded-full bg-teal-100/25 blur-3xl lg:block" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 hidden h-96 w-96 rounded-full bg-teal-100/20 blur-3xl lg:block" />

      <Container className="relative">
        <div className="mx-auto lg:w-[90%] 2xl:w-[84%]">
          <div className="mx-auto max-w-2xl text-center">
            <span
              className="animate-fade-up inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 shadow-sm"
              style={{ borderColor: "rgba(19,42,67,0.15)" }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: NAVY }}
              >
                <UserIcon className="h-3 w-3" />
              </span>
              <span className="text-xs font-bold tracking-wide" style={{ color: NAVY }}>
                {$t("ClientStories__t1", "Client Stories")}</span>
            </span>

            <h2
              className="text-h2 animate-fade-up mt-5 font-bold"
              style={{ color: NAVY, animationDelay: "80ms" }}
            >
              {$t("ClientStories__t2", "Hear stories")}{" "}
              <span className="mx-1 inline-flex -space-x-2 align-middle">
                {avatarStack.map((t) => (
                  <span
                    key={t.name}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-white"
                    style={{ backgroundImage: t.gradient }}
                  >
                    {t.initials}
                  </span>
                ))}
              </span>{" "}
              {$t("ClientStories__t3", "straight from the people we helped!")}</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="animate-fade-up transition-transform duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${CARD_START_MS + i * CARD_STEP_MS}ms` }}
              >
                <div className="rounded-2xl bg-slate-100 p-6">
                  <span className="inline-block" style={{ color: TEAL }}>
                    <QuoteIcon className="h-4 w-5" />
                  </span>
                  <p className="text-small mt-4 text-slate-600">&ldquo;{t.quote}&rdquo;</p>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ring-2 ring-white"
                    style={{ backgroundImage: t.gradient }}
                  >
                    {t.initials}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 shadow-sm">
                    <span className="h-2 w-2 shrink-0 rounded-sm" style={{ backgroundImage: t.gradient }} />
                    <span className="text-[10px] font-bold tracking-wide text-slate-500">{t.brand}</span>
                  </span>
                </div>

                <div className="mt-3">
                  <p className="text-small font-bold" style={{ color: NAVY }}>
                    {t.name}
                  </p>
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {videoStories.map((v, i) => {
              const delay = CARD_START_MS + (testimonials.length + i) * CARD_STEP_MS;
              return (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => setOpenVideo(i)}
                  aria-label={`Play video testimonial from ${v.name}`}
                  className="animate-fade-up group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white text-left font-sans shadow-[0_10px_30px_-15px_rgba(15,23,42,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-15px_rgba(15,23,42,0.22)]"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  <div className="relative h-56 w-full shrink-0">
                    <div className="absolute inset-0" style={{ backgroundImage: v.gradient }} />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.12]"
                      style={{
                        backgroundImage: "radial-gradient(white 1px, transparent 1.5px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <div className="absolute inset-0 bg-black/15 transition-colors duration-300 group-hover:bg-black/25" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <span className="animate-pulse-ring absolute inset-0 rounded-full" />
                        <span
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-white"
                          style={{ color: NAVY }}
                        >
                          <PlayIcon className="ml-0.5 h-4 w-4" />
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="px-5 py-4 text-center" style={{ backgroundColor: "#F5F7F9" }}>
                    <p className="text-small font-bold" style={{ color: NAVY }}>
                      {v.name}
                    </p>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">{v.role}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>

      {openVideo !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setOpenVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenVideo(null)}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
            >
              <CloseIcon />
            </button>
            <video
              key={videoStories[openVideo].videoSrc}
              src={videoStories[openVideo].videoSrc}
              controls
              autoPlay
              className="aspect-video w-full"
            />
            <div className="p-4">
              <p className="text-small font-bold text-white">{videoStories[openVideo].name}</p>
              <p className="text-[11px] uppercase tracking-wide text-white/60">
                {videoStories[openVideo].role}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
