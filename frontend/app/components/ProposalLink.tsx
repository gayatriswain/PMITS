import Link from "next/link";

const DEEP_TEAL = "#0f5c56";

/* Glossy teal "Get My Free Proposal" button with an arrow pill, shared by the Who We Are sections */
export default function ProposalLink({ href = "/contact" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-10 overflow-hidden rounded-2xl py-3 pl-9 pr-3 text-[15px] font-semibold uppercase tracking-[0.04em] text-white shadow-[0_18px_36px_-14px_rgba(13,148,136,0.8),0_0_0_1px_rgba(13,148,136,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-14px_rgba(13,148,136,0.9)]"
      style={{ background: "linear-gradient(180deg, #23b3a8 0%, #109a90 55%, #0b857c 100%)" }}
    >
      {/* glossy sheen across the top half */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-white/0" />
      <span className="relative">Get My Free Proposal</span>
      <span className="relative flex h-9 w-14 items-center justify-center rounded-full bg-white shadow-[0_4px_10px_-4px_rgba(13,27,51,0.35)] transition-transform group-hover:translate-x-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={DEEP_TEAL} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
