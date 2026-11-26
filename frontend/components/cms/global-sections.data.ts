/**
 * Sections that look the same on every page: their content is edited ONCE in the admin
 * ("Global sections" / "Sliders & carousels") and every page that shows them uses that content.
 * A page can still hide a global section for itself. FAQ is deliberately NOT here (per page).
 *
 * Pure data, also read by the CMS registry generator (cms/scripts/generate-registry.ts):
 * after changing this list run `npm run registry && npm run seed` in the cms folder.
 */
export const GLOBAL_PATH = "/__global";

export const GLOBAL_SECTIONS = [
  { key: "trusted-bar", component: "TrustedBar", label: "Client logos (Trusted by…)", carousel: true },
  { key: "projects-carousel", component: "ProjectsCarousel", label: "Featured projects slider", carousel: true },
  { key: "client-stories", component: "ClientStories", label: "Client stories slider", carousel: true },
  { key: "before-after", component: "BeforeAfterShowcase", label: "Before / after showcase", carousel: true },
  { key: "why-choose-us", component: "WhyChooseUs", label: "Why choose us", carousel: false },
  { key: "cta-section", component: "CtaSection", label: "Call to action banner", carousel: false },
  { key: "website-dev-comparison", component: "WebsiteDevComparison", label: "Us vs others comparison", carousel: false },
] as const;

export type GlobalKey = (typeof GLOBAL_SECTIONS)[number]["key"];
