import { getCollection } from "@/lib/cms";
import ProjectsCarouselView, { type CmsProject } from "./ProjectsCarouselView";

/** Same hosts as next.config.ts images.remotePatterns, so next/image never rejects a CMS image. */
function optimizable(url: string) {
  if (url.startsWith("/")) return true;
  try {
    const host = new URL(url).host;
    const cms = process.env.CMS_URL ? new URL(process.env.CMS_URL).host : "localhost:4000";
    return ["res.cloudinary.com", "images.unsplash.com", "localhost:4000", cms].includes(host);
  } catch {
    return false;
  }
}

type PortfolioDoc = { name: string; client?: string; category?: string; featuredImage?: string };

/**
 * "Featured projects" carousel. Shows the published projects of the CMS Portfolio module (those
 * with a featured image) when there are any; otherwise the section's own, page-editable content.
 */
export default async function ProjectsCarousel() {
  const res = await getCollection<PortfolioDoc>("portfolio", { limit: 12 });
  const cms: CmsProject[] = (res?.items ?? [])
    .filter((p) => p.featuredImage && optimizable(p.featuredImage))
    .map((p) => ({ name: p.client || p.name, category: p.category, image: p.featuredImage! }));
  return <ProjectsCarouselView cms={cms} />;
}
