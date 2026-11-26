import Link from "next/link";
import Container from "./Container";
import { ArrowIcon, CursorIcon, PlusIcon } from "./icons";

const NAVY = "#132a43";

type Link_ = { label?: string; href?: string };
export type CtaContent = { eyebrow?: string; heading?: string; button?: Link_; availability?: string; cardTitle?: string; cardText?: string; cardButton?: Link_ };

/** `content` comes from the CMS; anything missing falls back to the original copy. */
export default function CtaSection({ content: c = {} }: { content?: CtaContent } = {}) {
  const heading = c.heading || "Ready to start your next project?";
  const [h1, h2] = heading.includes(" your ") ? [heading.slice(0, heading.indexOf(" your ")), heading.slice(heading.indexOf(" your ") + 1)] : [heading, ""];
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-slate-100 p-3 sm:p-5">
          <div
            className="animate-fade-up relative overflow-hidden rounded-2xl px-6 py-14 sm:px-10 lg:px-14"
            style={{ background: "linear-gradient(135deg, #5eead4 0%, #2dd4bf 40%, #14b8a6 70%, #0d9488 100%)" }}
          >
            {/* Decorative arcs */}
            <span className="pointer-events-none absolute -right-24 -top-32 h-[340px] w-[340px] rounded-full border-[14px] border-[#0b3b35]/20" />
            <span className="pointer-events-none absolute -bottom-28 -left-16 h-[220px] w-[220px] rounded-full border-[14px] border-[#0b3b35]/25" />

            <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
              {/* Left: copy */}
              <div>
                <p className="text-caption font-bold uppercase tracking-widest text-slate-900/60">
                  {c.eyebrow || "Let's build something great"}
                </p>
                <h2 className="text-h2 mt-3 font-bold text-slate-900">
                  {h1}
                  {h2 && <br />}
                  {h2}
                </h2>
                <Link
                  href={c.button?.href || "/contact"}
                  className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
                  style={{ backgroundColor: NAVY }}
                >
                  {c.button?.label || "Get started"} <ArrowIcon />
                </Link>
              </div>

              {/* Right: floating consultation card */}
              <div className="relative mx-auto w-full max-w-sm lg:ml-auto lg:mr-8">
                {/* Floating collaborator cursor tag */}
                <div className="animate-cursor-float absolute -right-3 top-14 z-10 hidden items-center gap-1.5 sm:flex">
                  <CursorIcon className="text-slate-900 drop-shadow" />
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md"
                    style={{ backgroundColor: NAVY }}
                  >
                    Amanda
                  </span>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35)]">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <p className="text-caption font-bold uppercase tracking-wide text-slate-500">
                      {c.availability || "Available for project"}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ring-4 ring-white"
                      style={{ backgroundImage: "linear-gradient(135deg, #fb923c, #9a3412)" }}
                    >
                      A
                    </span>
                    <PlusIcon className="text-slate-300" />
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ring-4 ring-white"
                      style={{ backgroundColor: NAVY }}
                    >
                      You
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold" style={{ color: NAVY }}>
                    {c.cardTitle || "Quick 15-minute call"}
                  </h3>
                  <p className="text-small mt-1 text-slate-500">{c.cardText || "Pick a time that works for you."}</p>

                  <Link
                    href={c.cardButton?.href || "/contact"}
                    className="mt-5 flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-300 hover:scale-[1.03]"
                    style={{ backgroundColor: NAVY }}
                  >
                    {c.cardButton?.label || "Book a free call"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
