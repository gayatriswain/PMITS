"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../shared/Container";
import { ArrowIcon, ChevronLeftIcon, ChevronRightIcon } from "../shared/icons";
import { SkylineIllustration, HavenlyIllustration } from "./ProjectIllustrations";

const TEAL = "#0d9488";
const NAVY = "#132a43";

type Project = {
  brand: string;
  tag: string;
  image?: string;
  cta?: string;
  heading?: string;
  highlight?: string;
  highlightColor?: string;
  sub?: string;
  Illustration?: () => React.JSX.Element;
};

const projects: Project[] = [
  {
    brand: "AURELIA",
    tag: "Luxury Chauffeur",
    image: "/website1.png",
  },
  {
    brand: "VITALCARE",
    tag: "Healthcare",
    image: "/website2.png",
  },
  {
    brand: "SKYLINE GROUP",
    cta: "Get Quote",
    tag: "Corporate",
    heading: "Building The",
    highlight: "Future Today",
    highlightColor: "#fb923c",
    sub: "Global excellence in construction and building materials.",
    Illustration: SkylineIllustration,
  },
  {
    brand: "HAVENLY",
    cta: "Explore",
    tag: "Home Interiors",
    heading: "Beautiful Homes",
    highlight: "Made Easy",
    highlightColor: "#fb923c",
    sub: "Interiors that reflect your style and simplify your life.",
    Illustration: HavenlyIllustration,
  },
];

const AUTO_ADVANCE_MS = 4500;

export default function ProjectsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollStep = () => {
    const card = firstCardRef.current;
    if (!card) return 300;
    const gap = 24;
    return card.offsetWidth + gap;
  };

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * scrollStep(), behavior: "smooth" });
  };

  const advance = () => {
    const track = trackRef.current;
    if (!track) return;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
    if (atEnd) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollByCard(1);
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    timerRef.current = setInterval(advance, AUTO_ADVANCE_MS);
  };

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleManualNav = (direction: 1 | -1) => {
    stopAutoplay();
    scrollByCard(direction);
    startAutoplay();
  };

  return (
    <section className="bg-white pb-8 pt-16 lg:pb-10 lg:pt-20">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: TEAL }}>
            Featured Projects
            <span className="h-px w-8" style={{ backgroundColor: TEAL }} />
          </p>
          <Link
            href="/portfolio"
            className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: TEAL }}
          >
            View All Projects <ArrowIcon />
          </Link>
        </div>

        <div className="relative mt-6" onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
          <div
            ref={trackRef}
            className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth pb-1"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {projects.map((project, i) => {
              const Illustration = project.Illustration;
              return (
                <div
                  key={project.brand}
                  ref={i === 0 ? firstCardRef : undefined}
                  className="shrink-0 basis-[85%] overflow-hidden rounded-2xl shadow-[0_15px_40px_-15px_rgba(15,23,42,0.2)] ring-1 ring-slate-100 sm:basis-[48%] lg:basis-[31.5%] xl:basis-[23.5%]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="relative h-56 w-full overflow-hidden bg-white">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.brand} website preview`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 32vw, (min-width: 640px) 48vw, 85vw"
                      />
                    ) : (
                      <>
                        {Illustration ? <Illustration /> : null}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/50" />
                        <div className="relative flex h-full flex-col justify-between p-5">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-extrabold tracking-wide text-white">{project.brand}</span>
                            <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                              {project.cta}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold leading-snug text-white">
                              {project.heading}
                              <br />
                              <span style={{ color: project.highlightColor }}>{project.highlight}</span>
                            </h3>
                            <p className="mt-1.5 max-w-[230px] text-xs leading-relaxed text-white/80">
                              {project.sub}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between bg-white px-5 py-3">
                    <span className="text-sm font-semibold" style={{ color: NAVY }}>
                      {project.tag}
                    </span>
                    <span className="text-xs font-medium" style={{ color: TEAL }}>
                      Website Design &amp; Development
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => handleManualNav(-1)}
            aria-label="Previous project"
            className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.3)] ring-1 ring-slate-100 transition-colors hover:bg-[#0d9488] hover:text-white lg:flex"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => handleManualNav(1)}
            aria-label="Next project"
            className="absolute right-0 top-1/2 flex h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.3)] ring-1 ring-slate-100 transition-colors hover:bg-[#0d9488] hover:text-white"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </Container>
    </section>
  );
}
