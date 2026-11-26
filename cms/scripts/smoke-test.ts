/**
 * End-to-end smoke test against a RUNNING CMS (npm run dev). Creates and then removes its own
 * test records (prefixed "qa-"). Needs an existing super admin:
 *
 *   QA_EMAIL=... QA_PASSWORD=... npm run test:api
 */
import path from "node:path";
import { rm } from "node:fs/promises";
import { connect, disconnect } from "./_db";
import { AdminUser, Lead, Proposal, Page, PageSection, Media, Navigation, JobApplication } from "../models";

const BASE = process.env.APP_URL || "http://localhost:4000";
const ORIGIN = new URL(BASE).origin;
let passed = 0;
const failures: string[] = [];

function check(name: string, cond: boolean, detail?: unknown) {
  if (cond) passed++;
  else failures.push(`${name}${detail !== undefined ? ` -> ${typeof detail === "string" ? detail : JSON.stringify(detail).slice(0, 300)}` : ""}`);
}

class Client {
  cookie = "";
  async req(method: string, path: string, body?: unknown, extra: Record<string, string> = {}) {
    const isForm = body instanceof FormData;
    const res = await fetch(BASE + path, {
      method,
      headers: { Origin: ORIGIN, ...(this.cookie ? { Cookie: this.cookie } : {}), ...(body && !isForm ? { "Content-Type": "application/json" } : {}), ...extra },
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
      redirect: "manual",
    });
    const set = res.headers.get("set-cookie");
    if (set?.startsWith("pm_session=")) this.cookie = set.split(";")[0];
    const text = await res.text();
    let json: Record<string, unknown> | null = null;
    try {
      json = JSON.parse(text);
    } catch {
      /* not json */
    }
    return { status: res.status, json, text, headers: res.headers };
  }
}

const PNG_1x1 = Buffer.from("89504e470d0a1a0a0000000d4948445200000001000000010806000000" + "1f15c4890000000d49444154789c6360000000000200015e2acc670000000049454e44ae426082", "hex");

async function main() {
  const email = process.env.QA_EMAIL;
  const password = process.env.QA_PASSWORD;
  if (!email || !password) throw new Error("Set QA_EMAIL and QA_PASSWORD");
  await connect();

  /* ---------------- auth ---------------- */
  const anon = new Client();
  check("anon cannot list services", (await anon.req("GET", "/api/admin/resources/services")).status === 401);
  check("admin page redirects when signed out", [302, 307, 308].includes((await anon.req("GET", "/admin")).status));
  check("bad password rejected", (await anon.req("POST", "/api/auth/login", { email, password: "wrong-password-1A" })).status === 401);
  check("cross-site login blocked", (await anon.req("POST", "/api/auth/login", { email, password }, { Origin: "https://evil.example" })).status === 403);

  const admin = new Client();
  const login = await admin.req("POST", "/api/auth/login", { email, password });
  check("login ok", login.status === 200, login.json);
  check("session cookie httpOnly", /HttpOnly/i.test(login.headers.get("set-cookie") ?? ""), login.headers.get("set-cookie"));
  check("me", (await admin.req("GET", "/api/auth/me")).json?.success === true);
  check("cross-site write blocked even with cookie", (await admin.req("POST", "/api/admin/resources/services", { name: "x", slug: "x" }, { Origin: "https://evil.example" })).status === 403);

  /* ---------------- generic CRUD ---------------- */
  const samples: Record<string, Record<string, unknown>> = {
    services: { name: "QA Service", slug: "qa-service", status: "draft", description: "<p>Hi<script>alert(1)</script></p>" },
    "blog-categories": { name: "QA Category", slug: "qa-category" },
    blogs: { title: "QA Blog", slug: "qa-blog", status: "published", content: "<p onclick=\"x()\">Body text <a href=\"javascript:alert(1)\">x</a></p>" },
    testimonials: { clientName: "QA Client", content: "Great", rating: 5, status: "draft" },
    portfolio: { name: "QA Project", slug: "qa-project", status: "draft", gallery: ["/images/a.webp"] },
    careers: { title: "QA Job", slug: "qa-job", status: "open", employmentType: "hybrid" },
    team: { name: "QA Member", status: "draft", socials: { linkedin: "https://linkedin.com/in/qa" } },
  };
  for (const [name, body] of Object.entries(samples)) {
    const c = await admin.req("POST", `/api/admin/resources/${name}`, body);
    check(`${name}: create`, c.status === 201, c.json);
    const id = (c.json?.data as { _id?: string })?._id;
    if (!id) continue;
    if (name === "services") check("services: script stripped", !String((c.json!.data as { description: string }).description).includes("<script"));
    if (name === "blogs") {
      const html = String((c.json!.data as { content: string }).content);
      check("blogs: handlers and javascript: stripped", !/onclick|javascript:/i.test(html), html);
      check("blogs: reading time computed", Number((c.json!.data as { readingTime: number }).readingTime) >= 1);
    }
    const list = await admin.req("GET", `/api/admin/resources/${name}?q=QA`);
    check(`${name}: list/search`, ((list.json?.data as { total?: number })?.total ?? 0) >= 1, list.json);
    const dup = await admin.req("POST", `/api/admin/resources/${name}`, body);
    if ("slug" in body) check(`${name}: duplicate slug -> 409`, dup.status === 409, dup.json);
    else if (dup.status === 201) await admin.req("DELETE", `/api/admin/resources/${name}/${(dup.json?.data as { _id: string })._id}`);
    const bad = await admin.req("PUT", `/api/admin/resources/${name}/${id}`, { ...body, slug: "Bad Slug!", name: "", title: "", clientName: "" });
    check(`${name}: validation -> 422`, bad.status === 422, bad.json);
    const upd = await admin.req("PUT", `/api/admin/resources/${name}/${id}`, { ...body, order: 3 });
    check(`${name}: update`, upd.status === 200, upd.json);
    const del = await admin.req("DELETE", `/api/admin/resources/${name}/${id}`);
    check(`${name}: delete`, del.status === 200);
    check(`${name}: gone`, (await admin.req("GET", `/api/admin/resources/${name}/${id}`)).status === 404);
  }
  check("unknown resource 404", (await admin.req("GET", "/api/admin/resources/nope")).status === 404);
  check("invalid id 400", (await admin.req("GET", "/api/admin/resources/services/not-an-id")).status === 400);
  check("NoSQL operator in query ignored", (await admin.req("GET", "/api/admin/resources/services?status[$ne]=x")).status === 200);

  /* ---------------- pages & sections ---------------- */
  const homeSection = await (async () => {
    const pages = await admin.req("GET", "/api/admin/pages?q=location");
    return (pages.json?.data as { items: { _id: string; path: string }[] }).items.find((p) => p.path === "/location");
  })();
  check("seeded page found", !!homeSection);
  const created = await admin.req("POST", "/api/admin/pages", { title: "QA Page", slug: "qa-page", seo: { title: "QA" } });
  check("page create", created.status === 201, created.json);
  const pageId = (created.json?.data as { _id: string })?._id;
  if (pageId) {
    const sec = await admin.req("PUT", `/api/admin/pages/${pageId}/sections`, {
      sections: [
        { key: "hero", component: "BuilderHero", enabled: true, content: { title: "Hello", primary: { label: "Go", href: "javascript:alert(1)" } } },
      ],
    });
    check("unsafe link in section rejected", sec.status === 422, sec.json);
    const sec2 = await admin.req("PUT", `/api/admin/pages/${pageId}/sections`, {
      sections: [
        { key: "hero", component: "BuilderHero", enabled: true, content: { title: "Hello QA", primary: { label: "Go", href: "/contact" }, extra: "dropped" } },
        { key: "text", component: "BuilderRichText", enabled: true, content: { heading: "T", body: "<p>ok</p><img src=x onerror=alert(1)>" } },
      ],
    });
    check("sections saved as draft", sec2.status === 200, sec2.json);
    const secs = (sec2.json?.data as { sections: { key: string; draftContent: Record<string, unknown> }[] }).sections;
    check("undeclared field dropped", secs.find((s) => s.key === "hero")?.draftContent.extra === undefined);
    check("rich text sanitised", !String(secs.find((s) => s.key === "text")?.draftContent.body).includes("onerror"));
    check("draft page hidden publicly", (await anon.req("GET", "/api/public/page?path=/qa-page")).status === 404);
    const prev = await admin.req("GET", `/api/admin/pages/${pageId}/preview`);
    check("preview link signed", /\/api\/draft\?path=%2Fqa-page&exp=\d+&sig=[a-f0-9]{64}$/.test(String((prev.json?.data as { url: string })?.url)), prev.json);
    const pub = await admin.req("POST", `/api/admin/pages/${pageId}/publish`);
    check("publish", pub.status === 200, pub.json);
    const live = await anon.req("GET", "/api/public/page?path=/qa-page");
    check("published page public", live.status === 200 && JSON.stringify(live.json).includes("Hello QA"), live.json);
    await admin.req("PUT", `/api/admin/pages/${pageId}/sections`, { sections: [{ key: "hero", component: "BuilderHero", enabled: true, content: { title: "Changed draft" } }] });
    const still = await anon.req("GET", "/api/public/page?path=/qa-page");
    check("draft edit not public before publish", !JSON.stringify(still.json).includes("Changed draft"));
    check("unknown component rejected", (await admin.req("PUT", `/api/admin/pages/${pageId}/sections`, { sections: [{ key: "x", component: "Evil", enabled: true, content: {} }] })).status === 422);
    check("page delete", (await admin.req("DELETE", `/api/admin/pages/${pageId}`)).status === 200);
  }
  if (homeSection) check("coded page cannot be deleted", (await admin.req("DELETE", `/api/admin/pages/${homeSection._id}`)).status === 422);

  /* ---------------- public forms ---------------- */
  const pub = new Client();
  const legacy = await pub.req("POST", "/api/leads", { idea: "QA idea long enough", email: "qa.lead@example.test", source: "qa-form" });
  check("legacy /api/leads 201 + ok", legacy.status === 201 && legacy.json?.ok === true, legacy.json);
  const legacyBad = await pub.req("POST", "/api/leads", { idea: "short", email: "nope" });
  check("legacy lead validation keeps `error` field", legacyBad.status === 400 && typeof legacyBad.json?.error === "string", legacyBad.json);
  const hp = await pub.req("POST", "/api/leads", { idea: "spam spam spam spam", email: "qa.bot@example.test", website: "http://spam" });
  check("honeypot accepted silently", hp.status === 201);
  check("honeypot not stored", !(await Lead.exists({ email: "qa.bot@example.test" })));
  const prop = await pub.req("POST", "/api/proposals", { firstName: "QA", lastName: "Tester", email: "qa.prop@example.test", phone: "+91 98765 43210", location: "Noida", message: "Hi" });
  check("legacy /api/proposals", prop.status === 201, prop.json);
  const generic = await pub.req("POST", "/api/forms", { formType: "qa-contact", name: "QA", email: "qa.form@example.test", message: "Hello", details: { budget: "10k" }, utm: { source: "google" }, source: "/qa" });
  check("generic /api/forms", generic.status === 201, generic.json);
  const injection = await pub.req("POST", "/api/forms", { formType: "qa-contact", email: { $gt: "" } });
  check("operator injection rejected", injection.status === 400, injection.json);
  const cors = await pub.req("OPTIONS", "/api/forms", undefined, { Origin: "http://localhost:3000", "Access-Control-Request-Method": "POST" });
  check("CORS preflight for website", cors.headers.get("access-control-allow-origin") === "http://localhost:3000");
  const corsEvil = await pub.req("OPTIONS", "/api/forms", undefined, { Origin: "https://evil.example" });
  check("CORS denied for other origins", !cors.headers.get("access-control-allow-origin")?.includes("evil") && !corsEvil.headers.get("access-control-allow-origin"));

  /* ---------------- lead management ---------------- */
  const lead = await Lead.findOne({ email: "qa.form@example.test", formType: "qa-contact" }).sort({ createdAt: -1 }).lean();
  if (lead) {
    const me = await AdminUser.findOne({ email }).lean();
    const u = await admin.req("PATCH", `/api/admin/enquiries/leads/${lead._id}`, { status: "contacted", note: "Called them", assignedTo: String(me!._id) });
    check("lead update + note + assign", u.status === 200 && (u.json?.data as { notes: unknown[] }).notes.length === 1, u.json);
    const f = await admin.req("GET", "/api/admin/enquiries/leads?status=contacted&formType=qa-contact");
    check("lead filters", ((f.json?.data as { total: number })?.total ?? 0) >= 1);
    const csv = await admin.req("GET", "/api/admin/enquiries/leads/export?formType=qa-contact");
    check("csv export", csv.status === 200 && csv.text.includes("qa.form@example.test"));
  }

  /* ---------------- media ---------------- */
  const fd = new FormData();
  fd.append("file", new Blob([PNG_1x1], { type: "image/png" }), "qa-pixel.png");
  const up = await admin.req("POST", "/api/admin/media", fd);
  check("png upload", up.status === 201, up.json);
  const mediaId = ((up.json?.data as { _id: string }[]) ?? [])[0]?._id;
  const fake = new FormData();
  fake.append("file", new Blob([Buffer.from("MZ\x90\x00 fake exe")], { type: "image/png" }), "qa.png");
  check("fake image rejected", (await admin.req("POST", "/api/admin/media", fake)).status === 415);
  const svg = new FormData();
  svg.append("file", new Blob(['<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'], { type: "image/svg+xml" }), "qa.svg");
  check("svg with script rejected", (await admin.req("POST", "/api/admin/media", svg)).status === 422);
  if (mediaId) {
    check("media alt update", (await admin.req("PATCH", `/api/admin/media/${mediaId}`, { alt: "QA pixel" })).status === 200);
    check("media delete", (await admin.req("DELETE", `/api/admin/media/${mediaId}`)).status === 200);
  }

  /* ---------------- careers apply (multipart) ---------------- */
  const apply = new FormData();
  apply.append("name", "QA Applicant");
  apply.append("email", "qa.apply@example.test");
  apply.append("jobTitle", "QA Job");
  apply.append("resume", new Blob([Buffer.from("%PDF-1.4\n%qa\n")], { type: "application/pdf" }), "qa-cv.pdf");
  const ap = await pub.req("POST", "/api/careers/apply", apply);
  check("job application with CV", ap.status === 201, ap.json);
  const appDoc = await JobApplication.findOne({ email: "qa.apply@example.test" }).lean();
  if (appDoc?.resume) {
    check("CV not downloadable anonymously", (await anon.req("GET", `/api/admin/files/${appDoc.resume}`)).status === 401);
    check("CV downloadable by admin", (await admin.req("GET", `/api/admin/files/${appDoc.resume}`)).status === 200);
    check("application delete", (await admin.req("DELETE", `/api/admin/applications/${appDoc._id}`)).status === 200);
  }

  /* ---------------- navigation / settings / public ---------------- */
  const nav = await admin.req("GET", "/api/admin/navigation/header");
  check("navigation read", nav.status === 200);
  const navPublic = await anon.req("GET", "/api/public/navigation/services");
  check("public navigation", navPublic.status === 200 && JSON.stringify(navPublic.json).includes("Local SEO"));
  const settings = await anon.req("GET", "/api/public/settings");
  check("public settings hide notificationEmails", settings.status === 200 && !JSON.stringify(settings.json).includes("notificationEmails"));
  const badSettings = await admin.req("PUT", "/api/admin/settings", { analytics: { googleAnalyticsId: "UA-<script>" } });
  check("settings validation", badSettings.status === 422, badSettings.json);
  const blogsPublic = await anon.req("GET", "/api/public/collections/blogs");
  // Every blog the public API returns must be published (or scheduled and due) - never a draft.
  const { Blog } = await import("../models");
  const draftSlugs = new Set((await Blog.find({ status: "draft" }, "slug").lean()).map((b) => b.slug));
  const publicItems = (blogsPublic.json?.data as { items: { slug: string }[] })?.items ?? [];
  check("draft blogs not public", blogsPublic.status === 200 && draftSlugs.size > 0 && publicItems.every((b) => !draftSlugs.has(b.slug)), publicItems.map((b) => b.slug));
  const careersPublic = await anon.req("GET", "/api/public/collections/careers");
  check("open careers public", ((careersPublic.json?.data as { items: unknown[] })?.items.length ?? 0) >= 6);
  check("sitemap", (await anon.req("GET", "/api/public/sitemap")).status === 200);
  check("preview header with wrong secret ignored", (await anon.req("GET", "/api/public/page?path=/qa-nope", undefined, { "x-preview-secret": "nope" })).status === 404);

  /* ---------------- roles ---------------- */
  const roles: Record<string, string> = {};
  for (const role of ["editor", "seo_manager", "lead_manager"]) {
    const pw = `QaRole${Math.random().toString(36).slice(2, 10)}9X`;
    const r = await admin.req("POST", "/api/admin/users", { name: `QA ${role}`, email: `qa.${role}@example.test`, role, password: pw });
    check(`create ${role}`, r.status === 201, r.json);
    roles[role] = pw;
  }
  check("weak password rejected", (await admin.req("POST", "/api/admin/users", { name: "QA weak", email: "qa.weak@example.test", role: "editor", password: "password12" })).status === 422);
  const editor = new Client();
  await editor.req("POST", "/api/auth/login", { email: "qa.editor@example.test", password: roles.editor });
  check("editor cannot see leads", (await editor.req("GET", "/api/admin/enquiries/leads")).status === 403);
  check("editor cannot manage users", (await editor.req("POST", "/api/admin/users", { name: "x", email: "x@y.z", role: "super_admin", password: "Aaaaaaaaaa1" })).status === 403);
  check("editor can list pages", (await editor.req("GET", "/api/admin/pages")).status === 200);
  const leadMgr = new Client();
  await leadMgr.req("POST", "/api/auth/login", { email: "qa.lead_manager@example.test", password: roles.lead_manager });
  check("lead manager sees leads", (await leadMgr.req("GET", "/api/admin/enquiries/leads")).status === 200);
  check("lead manager cannot edit content", (await leadMgr.req("POST", "/api/admin/resources/services", { name: "x", slug: "qa-x" })).status === 403);
  check("lead manager cannot delete leads", lead ? (await leadMgr.req("DELETE", `/api/admin/enquiries/leads/${lead._id}`)).status === 403 : true);
  const seo = new Client();
  await seo.req("POST", "/api/auth/login", { email: "qa.seo_manager@example.test", password: roles.seo_manager });
  check("seo manager cannot change settings", (await seo.req("PUT", "/api/admin/settings", { siteName: "x" })).status === 403);
  check("seo manager cannot edit sections", homeSection ? (await seo.req("PUT", `/api/admin/pages/${homeSection._id}/sections`, { sections: [] })).status === 403 : true);

  /* ---------------- lockout + logout ---------------- */
  for (let i = 0; i < 5; i++) await anon.req("POST", "/api/auth/login", { email: "qa.editor@example.test", password: "Wrong-pass-1" });
  const locked = await anon.req("POST", "/api/auth/login", { email: "qa.editor@example.test", password: roles.editor });
  check("repeated failures blocked (account lock 423 or IP limit 429)", [423, 429].includes(locked.status), locked.json);
  await admin.req("POST", "/api/auth/logout");
  check("logout ends session", (await admin.req("GET", "/api/admin/resources/services")).status === 401);

  /* ---------------- cleanup ---------------- */
  await Lead.deleteMany({ email: /^qa\./ });
  await Proposal.deleteMany({ email: /^qa\./ });
  // Test CVs: remove the stored files as well as their media records.
  const qaApps = await JobApplication.find({ email: /^qa\./ }, "resume").lean();
  const qaMedia = await Media.find({ $or: [{ _id: { $in: qaApps.map((a) => a.resume).filter(Boolean) } }, { originalName: /^qa[-.]/ }] }, "storageKey provider").lean();
  for (const m of qaMedia) {
    if (m.provider !== "local" || !m.storageKey) continue;
    const abs = m.storageKey.startsWith("private/") ? path.join(process.cwd(), "storage", m.storageKey) : path.join(process.cwd(), "public", m.storageKey);
    await rm(abs, { force: true });
  }
  await Media.deleteMany({ _id: { $in: qaMedia.map((m) => m._id) } });
  await JobApplication.deleteMany({ email: /^qa\./ });
  await AdminUser.deleteMany({ email: /^qa\.(editor|seo_manager|lead_manager|weak)@example\.test$/ });
  const qaPage = await Page.findOne({ path: "/qa-page" }).lean();
  if (qaPage) {
    await PageSection.deleteMany({ page: qaPage._id });
    await Page.deleteOne({ _id: qaPage._id });
  }
  await Media.deleteMany({ originalName: /^qa[-.]/ });
  void Navigation;
  await disconnect();

  console.log(`\n${passed} checks passed, ${failures.length} failed`);
  for (const f of failures) console.log(`  FAIL ${f}`);
  process.exit(failures.length ? 1 : 0);
}

main().catch(async (err) => {
  console.error(err);
  await disconnect().catch(() => {});
  process.exit(1);
});
