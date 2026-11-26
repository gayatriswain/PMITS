import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCmsPage } from "@/lib/cms";
import { cmsMetadata } from "@/lib/seo";
import BuilderSections from "@/components/cms/BuilderSections";
import JsonLd from "@/components/cms/JsonLd";

/**
 * Pages created in the CMS page builder (e.g. /offers/diwali-sale).
 * Only runs for URLs no coded route handles; anything that isn't a published builder page is a 404.
 */
type Props = { params: Promise<{ slug: string[] }> };

const SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function toPath(slug: string[]) {
  if (!slug.length || slug.length > 5 || !slug.every((s) => SEGMENT.test(s))) return null;
  return `/${slug.join("/")}`;
}

async function load(slug: string[]) {
  const path = toPath(slug);
  if (!path) return null;
  const page = await getCmsPage(path);
  return page && page.kind === "builder" ? page : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await load(slug);
  if (!page) return { title: "Page not found", robots: { index: false } };
  return cmsMetadata(page.path, { title: page.title, description: page.description ?? undefined });
}

export default async function BuilderPage({ params }: Props) {
  const { slug } = await params;
  const page = await load(slug);
  if (!page) notFound();
  return (
    <main className="min-h-screen bg-[#fafdfc] font-sans">
      <JsonLd path={page.path} />
      <BuilderSections sections={page.sections} />
    </main>
  );
}
