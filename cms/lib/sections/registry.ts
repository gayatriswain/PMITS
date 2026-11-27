/**
 * Section registry: which section types exist, what content each one accepts (drives the admin
 * form), and the default content (taken verbatim from the current frontend components).
 *
 * - "coded" sections are the existing hand-built React components in frontend/app/components.
 *   Their design/animation stays in code; only the fields declared here are editable. A coded
 *   section with no fields can still be reordered and shown/hidden.
 * - "builder" sections are generic blocks for brand-new CMS pages (rendered by
 *   frontend/components/cms/BuilderSections.tsx in the site's design language).
 *
 * To make another coded section editable: add its fields + defaults here, then accept a
 * `content` prop in the component (see FAQSection.tsx for the pattern).
 */
import generated from "./pages.generated.json";
import contentFields from "./content.generated.json";
import codedDefaults from "./coded-defaults.generated.json";

export type FieldType = "text" | "textarea" | "richtext" | "richinline" | "image" | "link" | "number" | "boolean" | "select" | "list" | "href" | "textlist" | "group";
export type Field = {
  name: string;
  label: string;
  type: FieldType;
  help?: string;
  max?: number;
  options?: { value: string; label: string }[];
  /** For type "list": shape of one item. */
  fields?: Field[];
  maxItems?: number;
  /** group: fields are stored on the parent object (presentational grouping). */
  flat?: boolean;
  /** richinline: span classes of the coloured words, offered as accent buttons in the editor. */
  accents?: string[];
};
export type SectionDef = {
  component: string;
  label: string;
  kind: "coded" | "builder";
  description?: string;
  fields: Field[];
  defaults: Record<string, unknown>;
  sanitize?: (c: Record<string, unknown>) => Record<string, unknown>;
  /** Fields generated from the frontend source (scripts/generate-content-fields.ts). Only edited values are stored. */
  generated?: boolean;
};

const text = (name: string, label: string, max = 300, help?: string): Field => ({ name, label, type: "text", max, help });
const area = (name: string, label: string, max = 2000, help?: string): Field => ({ name, label, type: "textarea", max, help });
const link = (name: string, label: string): Field => ({ name, label, type: "link" });
const image = (name: string, label: string, help?: string): Field => ({ name, label, type: "image", help });

/* ------------------------------------------------------------------ */
/* Coded sections with editable content                                */
/* ------------------------------------------------------------------ */

const FAQ_DEFAULTS = {
  eyebrow: "Frequently Asked Questions",
  heading: "FAQ It Up! Your curiosity meets our expertise—let's clear things up!",
  intro: "We've gathered all the important info right here. Explore our FAQs and find the answers you need.",
  items: [
    { question: "What services do you offer?", answer: "We offer website design and development, SEO, and full-funnel digital marketing strategies tailored to help your business grow online." },
    { question: "How long does it take to design a website?", answer: "Most website projects take 3 to 6 weeks from kickoff to launch, depending on scope, content readiness, and the number of revisions." },
    { question: "Do you work with small businesses or just big brands?", answer: "We work with businesses of every size, from solo founders and startups to established brands looking to scale." },
    { question: "Can I customize the packages you offer?", answer: "Absolutely. Every package can be tailored to your goals, budget, and timeline, so you only pay for what you actually need." },
    { question: "How do you measure the success of a marketing campaign?", answer: "We track metrics like traffic, conversion rate, lead quality, and ROI, then share clear monthly reports so you always know what's working." },
    { question: "What if I don't like the designs or strategies?", answer: "We build in revision rounds at every stage, and we won't move forward until you're genuinely happy with the direction." },
    { question: "How do I get started?", answer: "Book a free consultation call, tell us about your goals, and we'll put together a tailored plan within a few days." },
    { question: "Do you provide support after launching my website or campaign?", answer: "Yes, we offer ongoing support and maintenance plans to keep your site secure, updated, and performing well long after launch." },
    { question: "What makes your agency different from the rest?", answer: "We combine design, development, and SEO under one roof, so your website and marketing strategy are built to work together from day one." },
  ],
};

const CTA_DEFAULTS = {
  eyebrow: "Let's build something great",
  heading: "Ready to start your next project?",
  button: { label: "Get started", href: "/contact" },
  cardTitle: "Quick 15-minute call",
  cardText: "Pick a time that works for you.",
  cardButton: { label: "Book a free call", href: "/contact" },
  availability: "Available for project",
};

const TRUSTED_DEFAULTS = {
  label: "Trusted by 250+ Businesses Across 15+ Industries",
  logos: [
    { name: "Max Healthcare", image: "/clients/max-healthcare.svg" },
    { name: "Danube Properties", image: "/clients/danube-properties.svg" },
    { name: "The Better India", image: "/clients/the-better-india.svg" },
    { name: "HomeLane", image: "/clients/homelane.svg" },
    { name: "Tynor", image: "/clients/tynor.svg" },
    { name: "Policybazaar", image: "/clients/policybazaar.svg" },
    { name: "Bikanervala", image: "/clients/bikanervala.svg" },
  ],
};

const CODED_WITH_FIELDS: SectionDef[] = [
  {
    component: "FAQSection",
    label: "FAQ (shared)",
    kind: "coded",
    description: "Accordion of questions with a sticky intro on the left.",
    fields: [
      text("eyebrow", "Eyebrow", 80),
      area("heading", "Heading", 200),
      area("intro", "Intro text", 400),
      { name: "items", label: "Questions", type: "list", maxItems: 30, fields: [text("question", "Question", 300), area("answer", "Answer", 2000)] },
    ],
    defaults: FAQ_DEFAULTS,
  },
  {
    component: "CtaSection",
    label: "Call to action (shared)",
    kind: "coded",
    description: "Teal banner with a 'book a call' card.",
    fields: [
      text("eyebrow", "Eyebrow", 80),
      text("heading", "Heading", 120),
      link("button", "Main button"),
      text("availability", "Card status text", 60),
      text("cardTitle", "Card title", 80),
      text("cardText", "Card text", 160),
      link("cardButton", "Card button"),
    ],
    defaults: CTA_DEFAULTS,
  },
  {
    component: "TrustedBar",
    label: "Trusted by (logo marquee)",
    kind: "coded",
    fields: [
      text("label", "Label", 120),
      { name: "logos", label: "Client logos", type: "list", maxItems: 30, fields: [text("name", "Client name", 80), image("image", "Logo (SVG/PNG/WebP)")] },
    ],
    defaults: TRUSTED_DEFAULTS,
  },
  {
    // global "before-after" section (frontend/components/cms/before-after.data.ts)
    component: "BeforeAfterShowcase",
    label: "Before / after showcase",
    kind: "coded",
    description: "Category buttons, a before/after slider with the project's results, and a project carousel. Each category holds its own projects.",
    fields: [
      { name: "categories", label: "Categories", type: "list", maxItems: 12, fields: [
        text("label", "Category name", 60),
        { name: "icon", label: "Icon", type: "select", options: [["cart", "Shopping cart"], ["briefcase", "Briefcase"], ["heart", "Heart (health)"], ["graduation", "Graduation cap"], ["restaurant", "Fork & knife"], ["home", "House"]].map(([value, label]) => ({ value, label })) },
        { name: "projects", label: "Projects", type: "list", maxItems: 20, fields: [
          text("name", "Project / client name", 80),
          text("tag", "Tag under the name (optional)", 60),
          image("before", "BEFORE image (old website)"),
          image("after", "AFTER image (new website)"),
          image("thumb", "Carousel thumbnail (optional - uses the after image)"),
          { name: "stats", label: "Results", type: "list", maxItems: 4, fields: [
            text("value", "Number (e.g. 270%)", 20),
            text("label", "What it measures", 80),
            text("sub", "Small text (e.g. Within 6 Months)", 60),
            { name: "icon", label: "Icon", type: "select", options: [["trend", "Trend up"], ["users", "People"], ["cart", "Cart"], ["gauge", "Speed / clock"]].map(([value, label]) => ({ value, label })) },
          ] },
        ] },
      ] },
      text("resultsLabel", "Text after the project name in the results panel", 60),
      text("beforeBadge", "Before badge", 20),
      text("afterBadge", "After badge", 20),
    ],
    defaults: (codedDefaults as Record<string, Record<string, unknown>>).BeforeAfterShowcase ?? {},
  },
];

/* ------------------------------------------------------------------ */
/* Generic builder sections for CMS-created pages                      */
/* ------------------------------------------------------------------ */

const BUILDER: SectionDef[] = [
  {
    component: "BuilderHero",
    label: "Hero banner",
    kind: "builder",
    fields: [text("eyebrow", "Eyebrow", 80), text("title", "Title", 160), area("subtitle", "Subtitle", 500), image("image", "Image"), link("primary", "Primary button"), link("secondary", "Secondary button")],
    defaults: { eyebrow: "", title: "Page title", subtitle: "", image: "", primary: { label: "Get Free Quote", href: "/contact" }, secondary: { label: "", href: "" } },
  },
  {
    component: "BuilderRichText",
    label: "Rich text",
    kind: "builder",
    fields: [text("heading", "Heading", 160), { name: "body", label: "Content", type: "richtext" }],
    defaults: { heading: "", body: "<p>Write your content here.</p>" },
  },
  {
    component: "BuilderCards",
    label: "Cards grid",
    kind: "builder",
    fields: [
      text("heading", "Heading", 160),
      area("intro", "Intro", 500),
      { name: "columns", label: "Columns", type: "select", options: [{ value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }] },
      { name: "cards", label: "Cards", type: "list", maxItems: 24, fields: [text("title", "Title", 120), area("text", "Text", 600), image("image", "Image"), link("link", "Link")] },
    ],
    defaults: { heading: "", intro: "", columns: "3", cards: [] },
  },
  {
    component: "BuilderImageText",
    label: "Image + text",
    kind: "builder",
    fields: [
      text("heading", "Heading", 160),
      { name: "body", label: "Text", type: "richtext" },
      image("image", "Image"),
      { name: "imageSide", label: "Image side", type: "select", options: [{ value: "right", label: "Right" }, { value: "left", label: "Left" }] },
      link("button", "Button"),
    ],
    defaults: { heading: "", body: "", image: "", imageSide: "right", button: { label: "", href: "" } },
  },
  {
    component: "BuilderStats",
    label: "Statistics",
    kind: "builder",
    fields: [text("heading", "Heading", 160), { name: "items", label: "Stats", type: "list", maxItems: 8, fields: [text("value", "Value (e.g. 250+)", 20), text("label", "Label", 80)] }],
    defaults: { heading: "", items: [] },
  },
  {
    component: "BuilderFaq",
    label: "FAQ",
    kind: "builder",
    fields: [text("heading", "Heading", 160), { name: "items", label: "Questions", type: "list", maxItems: 30, fields: [text("question", "Question", 300), area("answer", "Answer", 2000)] }],
    defaults: { heading: "Frequently Asked Questions", items: [] },
  },
  {
    component: "BuilderCta",
    label: "Call to action",
    kind: "builder",
    fields: [text("title", "Title", 160), area("text", "Text", 400), link("button", "Button")],
    defaults: { title: "Ready to start your next project?", text: "", button: { label: "Get Free Quote", href: "/contact" } },
  },
];

/* ------------------------------------------------------------------ */
/* Every other coded section: order + visibility only (for now)        */
/* ------------------------------------------------------------------ */

type GenPage = { path: string; title: string; description: string; reorderable: boolean; global?: boolean; sections: { key: string; component: string; label: string; carousel?: boolean }[] };
export const GENERATED_PAGES = generated as GenPage[];

/** The hidden page holding shared sections (edited once, shown on every page that uses them). */
export const GLOBAL_PAGE = GENERATED_PAGES.find((p) => p.global) ?? null;
export const GLOBAL_PATH = GLOBAL_PAGE?.path ?? "/__global";
/** component name → global section key, e.g. TrustedBar → trusted-bar */
export const GLOBAL_COMPONENTS: Record<string, string> = Object.fromEntries((GLOBAL_PAGE?.sections ?? []).map((s) => [s.component, s.key]));

const byComponent = new Map<string, SectionDef>();
for (const d of [...CODED_WITH_FIELDS, ...BUILDER]) byComponent.set(d.component, d);
for (const p of GENERATED_PAGES) {
  for (const s of p.sections) {
    if (!byComponent.has(s.component)) {
      const gen = (contentFields as Record<string, { fields: Field[]; defaults: Record<string, unknown> }>)[s.component];
      byComponent.set(s.component, { component: s.component, label: s.label, kind: "coded", fields: gen?.fields ?? [], defaults: gen?.defaults ?? {}, generated: !!gen });
    }
  }
}

export function getSectionDef(component: string): SectionDef | null {
  return byComponent.get(component) ?? null;
}

export function allSectionDefs(): SectionDef[] {
  return [...byComponent.values()];
}

export const BUILDER_SECTIONS = BUILDER;
