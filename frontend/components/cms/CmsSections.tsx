import { cloneElement, isValidElement, type ReactElement } from "react";
import { getCmsPage, type CmsSection } from "@/lib/cms";
import { SectionContentProvider } from "./SectionContent";
import { GLOBAL_PATH, type GlobalKey } from "./global-sections.data";
import TrustedBar from "@/app/components/shared/TrustedBar";
import WhyChooseUs from "@/app/components/shared/WhyChooseUs";
import CtaSection from "@/app/components/shared/CtaSection";
import WebsiteDevComparison from "@/app/components/shared/WebsiteDevComparison";
import ClientStories from "@/app/components/shared/ClientStories";
import ProjectsCarousel from "@/app/components/home/ProjectsCarousel";
import BeforeAfterShowcase from "@/app/components/website-development/BeforeAfterShowcase";

type Entry = readonly [key: string, element: ReactElement];

/** Shared section components → their entry in the global sections page (see global-sections.data.ts). */
const GLOBAL_BY_COMPONENT = new Map<unknown, GlobalKey>([
  [TrustedBar, "trusted-bar"],
  [ProjectsCarousel, "projects-carousel"],
  [ClientStories, "client-stories"],
  [WhyChooseUs, "why-choose-us"],
  [CtaSection, "cta-section"],
  [WebsiteDevComparison, "website-dev-comparison"],
  [BeforeAfterShowcase, "before-after"],
]);

/**
 * Gives a section its CMS content: through context (read by $t()/useCmsData() inside the section's
 * components) and, for sections with explicit fields (FAQ, CTA, TrustedBar), as a `content` prop.
 */
function withContent(el: ReactElement, key: string, content?: Record<string, unknown>) {
  const has = !!content && Object.keys(content).length > 0;
  const child = has ? cloneElement(el as ReactElement<{ content?: Record<string, unknown> }>, { content }) : el;
  return (
    <SectionContentProvider key={key} value={has ? content : null}>
      {child}
    </SectionContentProvider>
  );
}

/**
 * Content for a section. Shared sections (logos, sliders, CTA…) take their content from the global
 * sections page, so they are edited once for the whole site; `hidden` when switched off there.
 * Everything else uses the page's own section.
 */
async function resolve(el: ReactElement, own?: CmsSection): Promise<{ hidden: boolean; content?: Record<string, unknown> }> {
  const gkey = GLOBAL_BY_COMPONENT.get(el.type);
  if (!gkey) return { hidden: false, content: own?.content };
  const g = (await getCmsPage(GLOBAL_PATH))?.sections.find((s) => s.key === gkey);
  // global page not seeded/reachable yet → keep the page's own content, as before
  if (!g) return { hidden: false, content: own?.content };
  return { hidden: !g.enabled, content: g.content };
}

/**
 * Renders a page's sections in the order and visibility set in the CMS.
 * If the CMS is unreachable, or the page is not published there, the sections render exactly as
 * written in code - so the site never breaks because of the CMS.
 * Sections the CMS does not know about keep their code position.
 */
export default async function CmsSections({ path, sections }: { path: string; sections: readonly Entry[] }) {
  const page = await getCmsPage(path);
  const cms = new Map((page?.sections ?? []).map((s) => [s.key, s]));
  const ordered = sections
    .map(([k, el], i) => ({ k, el, rank: cms.get(k)?.order ?? i - 0.5 }))
    .sort((a, b) => a.rank - b.rank)
    .filter(({ k }) => cms.get(k)?.enabled !== false);
  const rendered = await Promise.all(
    ordered.map(async ({ k, el }) => {
      if (!isValidElement(el)) return null;
      const r = await resolve(el, cms.get(k));
      return r.hidden ? null : withContent(el, k, r.content);
    }),
  );
  return <>{rendered}</>;
}

/**
 * For pages whose layout mixes inline markup with sections (order fixed in code):
 * hides the section when disabled in the CMS and passes its CMS content.
 */
export async function CmsSlot({ path, k, children }: { path: string; k: string; children: ReactElement }) {
  const page = await getCmsPage(path);
  const s = page?.sections.find((x) => x.key === k);
  if (s && !s.enabled) return null;
  const r = await resolve(children, s);
  return r.hidden ? null : withContent(children, k, r.content);
}

/** A shared section placed outside the CMS page sections (e.g. the CTA under blog posts): global content only. */
export async function GlobalSlot({ children }: { children: ReactElement }) {
  const r = await resolve(children);
  return r.hidden ? null : withContent(children, String(GLOBAL_BY_COMPONENT.get(children.type) ?? "global"), r.content);
}
