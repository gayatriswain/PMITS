import "server-only";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { Page, PageSection } from "@/models";
import { HttpError, escapeRegex, listParams } from "@/lib/api";
import { pageSchema, sectionSaveSchema } from "@/lib/validation/schemas";
import { logActivity } from "@/lib/activity";
import { revalidateFrontend, tags } from "@/lib/revalidate";
import { can } from "@/lib/permissions";
import { GLOBAL_PATH, getSectionDef } from "@/lib/sections/registry";
import { cleanSectionContent } from "@/lib/sections/clean";
import type { SessionUser } from "@/lib/auth";

const toPath = (slug: string) => (slug ? `/${slug}` : "/");

/** URL prefixes the website serves itself; a builder page there would never be reachable. */
const RESERVED_SEGMENTS = new Set(["api", "admin", "blog", "_next", "sitemap.xml", "robots.txt"]);

function assertBuilderSlug(slug: string) {
  const parts = slug.split("/");
  if (!slug) throw new HttpError(422, "Builder pages need a URL", { slug: "Required" });
  if (parts.length > 5) throw new HttpError(422, "Use at most 5 URL segments", { slug: "Too deep" });
  if (RESERVED_SEGMENTS.has(parts[0])) throw new HttpError(422, `URLs starting with /${parts[0]} are reserved`, { slug: "Reserved URL" });
}

export async function listPages(url: URL) {
  await connectDB();
  const { page, limit, skip, q } = listParams(url, { limit: 50, sort: "path" });
  // the global-sections page has its own admin screens (Global sections / Sliders & carousels)
  const filter: Record<string, unknown> = { path: { $ne: GLOBAL_PATH } };
  if (q) filter.$or = [{ title: { $regex: escapeRegex(q), $options: "i" } }, { path: { $regex: escapeRegex(q), $options: "i" } }];
  const status = url.searchParams.get("status");
  if (status === "draft" || status === "published") filter.status = status;
  const group = url.searchParams.get("group");
  if (group && /^[a-z0-9-]{1,60}$/.test(group)) filter.group = group;
  const [items, total] = await Promise.all([
    Page.find(filter).sort({ group: 1, path: 1 }).skip(skip).limit(limit).lean(),
    Page.countDocuments(filter),
  ]);
  const counts = await PageSection.aggregate([
    { $match: { page: { $in: items.map((p) => p._id) } } },
    { $group: { _id: "$page", n: { $sum: 1 }, changed: { $sum: { $cond: ["$hasUnpublishedChanges", 1, 0] } } } },
  ]);
  const byId = new Map(counts.map((c) => [String(c._id), c]));
  return {
    items: items.map((p) => ({ ...p, sectionCount: byId.get(String(p._id))?.n ?? 0, pendingSections: byId.get(String(p._id))?.changed ?? 0 })),
    total,
    page,
    limit,
    pages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function getPageWithSections(id: string) {
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  await connectDB();
  const page = await Page.findById(id).lean();
  if (!page) throw new HttpError(404, "Page not found");
  const sections = await PageSection.find({ page: page._id }).sort({ order: 1 }).lean();
  return { page, sections };
}

/** New pages start as drafts; their URL is fixed at creation. */
export async function createPage(user: SessionUser, body: unknown) {
  await connectDB();
  const data = pageSchema.parse(body);
  assertBuilderSlug(data.slug);
  const path = toPath(data.slug);
  if (await Page.exists({ path })) throw new HttpError(409, "A page with this URL already exists", { slug: "Already used" });
  const doc = await Page.create({ ...data, path, kind: "builder", status: "draft", updatedBy: user.id });
  logActivity(user, "create", "pages", String(doc._id), `Created page ${path}`);
  return doc.toObject();
}

/** Saves page details into the draft copy. Visitors keep seeing the published version until publish. */
export async function savePageDraft(user: SessionUser, id: string, body: unknown) {
  const { page } = await getPageWithSections(id);
  const data = pageSchema.parse(body);
  const seoOnly = !can(user.role, "pages.write") && can(user.role, "seo.write");
  const draft = seoOnly ? { ...(page.draft ?? {}), seo: data.seo } : { title: data.title, description: data.description, featuredImage: data.featuredImage, group: data.group, seo: data.seo };
  if (!seoOnly && page.kind === "builder" && toPath(data.slug) !== page.path) {
    assertBuilderSlug(data.slug);
    const path = toPath(data.slug);
    if (await Page.exists({ path, _id: { $ne: page._id } })) throw new HttpError(409, "A page with this URL already exists", { slug: "Already used" });
    await Page.updateOne({ _id: page._id }, { $set: { slug: data.slug, path } });
  }
  await Page.updateOne({ _id: page._id }, { $set: { draft, hasUnpublishedChanges: true, updatedBy: user.id } });
  logActivity(user, "save-draft", "pages", id, `Saved draft of ${page.path}`);
  return getPageWithSections(id);
}

/** Replace the section list (order, visibility, content) in draft. */
export async function saveSectionsDraft(user: SessionUser, id: string, body: unknown) {
  const { page, sections } = await getPageWithSections(id);
  const { sections: incoming } = sectionSaveSchema.parse(body);
  const existingByKey = new Map(sections.map((s) => [s.key, s]));
  const keys = new Set<string>();
  for (const [i, s] of incoming.entries()) {
    if (keys.has(s.key)) throw new HttpError(422, `Duplicate section key "${s.key}"`);
    keys.add(s.key);
    const def = getSectionDef(s.component);
    if (!def) throw new HttpError(422, `Unknown section type "${s.component}"`);
    // Coded pages may only reorder / toggle / edit their own sections, not swap components.
    const prev = existingByKey.get(s.key);
    if (page.kind === "coded" && (!prev || prev.component !== s.component)) {
      throw new HttpError(422, `Sections of this page are fixed in code; "${s.key}" cannot be added or replaced.`);
    }
    const content = cleanSectionContent(def, s.content);
    await PageSection.updateOne(
      { page: page._id, key: s.key },
      {
        $set: { draftContent: content, draftEnabled: s.enabled, draftOrder: i, hasUnpublishedChanges: true, label: s.label ?? def.label },
        $setOnInsert: { component: s.component, order: i, enabled: false, content: {} },
      },
      { upsert: true },
    );
  }
  if (page.kind === "builder") {
    const removed = sections.filter((s) => !keys.has(s.key)).map((s) => s._id);
    if (removed.length) await PageSection.deleteMany({ _id: { $in: removed } });
  }
  await Page.updateOne({ _id: page._id }, { $set: { hasUnpublishedChanges: true, updatedBy: user.id } });
  logActivity(user, "save-draft", "pages", id, `Saved section draft for ${page.path}`);
  return getPageWithSections(id);
}

export async function publishPage(user: SessionUser, id: string) {
  const { page, sections } = await getPageWithSections(id);
  const set: Record<string, unknown> = { status: "published", hasUnpublishedChanges: false, publishedAt: page.publishedAt ?? new Date(), updatedBy: user.id };
  if (page.draft) {
    for (const k of ["title", "description", "featuredImage", "group", "seo"] as const) {
      if (page.draft[k] !== undefined) set[k] = page.draft[k];
    }
  }
  await Page.updateOne({ _id: page._id }, { $set: set, $unset: { draft: 1 } });
  for (const s of sections) {
    if (!s.hasUnpublishedChanges) continue;
    await PageSection.updateOne(
      { _id: s._id },
      {
        $set: {
          content: s.draftContent ?? s.content,
          enabled: s.draftEnabled ?? s.enabled,
          order: s.draftOrder ?? s.order,
          hasUnpublishedChanges: false,
        },
        $unset: { draftContent: 1, draftEnabled: 1, draftOrder: 1 },
      },
    );
  }
  logActivity(user, "publish", "pages", id, `Published ${page.path}`);
  const revalidated = await revalidateFrontend([tags.page(page.path), tags.pages, tags.sitemap]);
  return { ...(await getPageWithSections(id)), revalidated: revalidated.ok };
}

export async function unpublishPage(user: SessionUser, id: string) {
  const { page } = await getPageWithSections(id);
  await Page.updateOne({ _id: page._id }, { $set: { status: "draft", updatedBy: user.id } });
  logActivity(user, "unpublish", "pages", id, `Unpublished ${page.path}`);
  await revalidateFrontend([tags.page(page.path), tags.pages, tags.sitemap]);
  return getPageWithSections(id);
}

export async function discardDraft(user: SessionUser, id: string) {
  const { page } = await getPageWithSections(id);
  await Page.updateOne({ _id: page._id }, { $unset: { draft: 1 }, $set: { hasUnpublishedChanges: false } });
  await PageSection.updateMany({ page: page._id }, { $unset: { draftContent: 1, draftEnabled: 1, draftOrder: 1 }, $set: { hasUnpublishedChanges: false } });
  logActivity(user, "discard-draft", "pages", id, `Discarded draft of ${page.path}`);
  return getPageWithSections(id);
}

export async function deletePage(user: SessionUser, id: string) {
  const { page } = await getPageWithSections(id);
  if (page.kind === "coded") throw new HttpError(422, "This page is built into the website code. Unpublish it instead of deleting.");
  await PageSection.deleteMany({ page: page._id });
  await Page.deleteOne({ _id: page._id });
  logActivity(user, "delete", "pages", id, `Deleted page ${page.path}`);
  await revalidateFrontend([tags.page(page.path), tags.pages, tags.sitemap]);
  return { id };
}

/** Public read: published data, or draft-merged data for preview requests. */
export async function getPublicPage(path: string, preview: boolean) {
  await connectDB();
  const page = await Page.findOne({ path }).lean();
  if (!page || (!preview && page.status !== "published")) return null;
  const rows = await PageSection.find({ page: page._id }).lean();
  const sections = rows
    .map((s) => ({
      key: s.key,
      component: s.component,
      enabled: preview ? (s.draftEnabled ?? s.enabled) : s.enabled,
      order: preview ? (s.draftOrder ?? s.order) : s.order,
      content: preview ? (s.draftContent ?? s.content ?? {}) : (s.content ?? {}),
    }))
    .sort((a, b) => a.order - b.order);
  const live = preview && page.draft ? { ...page, ...page.draft } : page;
  return {
    path: page.path,
    kind: page.kind,
    status: page.status,
    title: live.title,
    description: live.description ?? null,
    featuredImage: live.featuredImage ?? null,
    seo: live.seo ?? {},
    updatedAt: page.updatedAt,
    sections,
  };
}
