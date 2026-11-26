import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "./icons";

/**
 * Social platforms the admin can pick in Settings → Social (same keys as the CMS list in
 * cms/components/admin/Misc.tsx). Unknown / "other" platforms get a generic link icon.
 */
const s = { width: 16, height: 16, viewBox: "0 0 24 24" } as const;

const X = () => (
  <svg {...s} fill="currentColor" aria-hidden><path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2Z" /></svg>
);
const WhatsApp = () => (
  <svg {...s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);
const Telegram = () => (
  <svg {...s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 4 3 11l6 2 2 6 3-4 5 4 2-15Z" /><path d="m9 13 8-6" /></svg>
);
const Pinterest = () => (
  <svg {...s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M11 8.5c3-1.2 6 .6 5 3.8-.7 2.2-3.4 2.6-4.6 1.2M11.5 10 9 20" /></svg>
);
const GitHub = () => (
  <svg {...s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
);
const Behance = () => (
  <svg {...s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 18V6h5a3 3 0 0 1 0 6H3h5.5a3 3 0 0 1 0 6H3ZM14 13h7a3.5 3.5 0 1 0-1 2.5M15 7h5" /></svg>
);
const Dribbble = () => (
  <svg {...s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M9 3.6c4 4.4 6 10 6.6 16.6M3.2 10.3c6 .5 11-1 15-5M5.5 18.3c3-4.4 8.5-6 15.3-3.5" /></svg>
);
const Threads = () => (
  <svg {...s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M17 8.5C16 5.5 13.8 4 11.5 4 7.4 4 5 7.2 5 12s2.4 8 6.5 8c3.2 0 5.5-2 5.5-4.5 0-3.5-4-4.2-6-3.5-2.3.8-2 4 .5 4 2.6 0 3.7-2.4 3.2-6" /></svg>
);
const TikTok = () => (
  <svg {...s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.8 2.3 4.5 5 4.8" /></svg>
);
const Google = () => (
  <svg {...s} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M20 12.2c0 4.6-3.3 7.8-8 7.8a8 8 0 1 1 5.4-13.9M20 12h-8" /></svg>
);
const Clutch = () => (
  <svg {...s} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden><path d="M17 7.5A6.5 6.5 0 1 0 17 16.5" /><circle cx="12.5" cy="12" r="1.6" fill="currentColor" stroke="none" /></svg>
);
const Globe = () => (
  <svg {...s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
);
const LinkIcon = () => (
  <svg {...s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></svg>
);

export const SOCIAL_PLATFORMS: Record<string, { label: string; icon: () => React.JSX.Element }> = {
  linkedin: { label: "LinkedIn", icon: LinkedinIcon },
  instagram: { label: "Instagram", icon: InstagramIcon },
  facebook: { label: "Facebook", icon: FacebookIcon },
  youtube: { label: "YouTube", icon: YoutubeIcon },
  x: { label: "X (Twitter)", icon: X },
  twitter: { label: "X (Twitter)", icon: X },
  whatsapp: { label: "WhatsApp", icon: WhatsApp },
  telegram: { label: "Telegram", icon: Telegram },
  pinterest: { label: "Pinterest", icon: Pinterest },
  github: { label: "GitHub", icon: GitHub },
  behance: { label: "Behance", icon: Behance },
  dribbble: { label: "Dribbble", icon: Dribbble },
  threads: { label: "Threads", icon: Threads },
  tiktok: { label: "TikTok", icon: TikTok },
  google: { label: "Google Business", icon: Google },
  clutch: { label: "Clutch", icon: Clutch },
  website: { label: "Website", icon: Globe },
  other: { label: "Link", icon: LinkIcon },
};

export const socialIcon = (platform?: string) => (SOCIAL_PLATFORMS[(platform ?? "").toLowerCase()] ?? SOCIAL_PLATFORMS.other).icon;
export const socialLabel = (platform?: string, label?: string) => label?.trim() || (SOCIAL_PLATFORMS[(platform ?? "").toLowerCase()] ?? SOCIAL_PLATFORMS.other).label;
