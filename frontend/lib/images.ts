import { absoluteUrl } from "./cms";

const OPTIMIZED_HOSTS = ["images.unsplash.com", "res.cloudinary.com", "localhost:4000"];

/**
 * next/image props for an image URL coming from the CMS. Hosts listed in next.config.ts go through
 * the optimiser; anything else is rendered as-is (unoptimized) so it never throws.
 */
export function cmsImage(src?: string | null): { src: string; unoptimized: boolean } | null {
  if (!src) return null;
  if (src.startsWith("/")) return { src, unoptimized: false };
  const url = absoluteUrl(src);
  if (!url) return null;
  try {
    const host = new URL(url).host;
    const cms = process.env.CMS_URL ? new URL(process.env.CMS_URL).host : "";
    return { src: url, unoptimized: !(OPTIMIZED_HOSTS.includes(host) || host === cms) };
  } catch {
    return null;
  }
}
