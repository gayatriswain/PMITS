"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronDown, Crown, Download, Eye, LayoutGrid, Inbox, KeyRound, Mail, Palette, PanelBottom, PanelTop, Pencil, PenLine, Phone, Plus, Save, Search, Share2, ShieldCheck, Trash2, UserPlus } from "lucide-react";
import { api, ApiError, qs } from "@/lib/client/api";
import { ROLE_LABELS, type Role } from "@/lib/permissions";
import { Avatar, Badge, Button, Card, EmptyState, Modal, PageHeader, Pagination, PerPage, SearchInput, Select, Spinner, fmtDate, useConfirm, usePerPage, useToast, useUnsavedWarning } from "./ui";
import { FieldGroup, type FieldDef } from "./fields";

type Errs = Record<string, string | string[]>;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

const linkFields = (withChildren: boolean, childLabel = "Sub-items"): FieldDef[] => [
  { name: "label", label: "Label", type: "text", required: true, max: 120, half: true },
  { name: "href", label: "Link", type: "url", placeholder: "/page or https://…", half: true },
  { name: "description", label: "Short description", type: "text", max: 200, half: true },
  { name: "badge", label: "Badge", type: "text", max: 20, half: true, placeholder: "New" },
  { name: "icon", label: "Icon (lucide name)", type: "text", max: 60, half: true },
  { name: "accent", label: "Accent colour (mega menu)", type: "select", options: ["teal", "indigo", "amber", "rose"].map((v) => ({ value: v, label: v })), half: true },
  { name: "external", label: "Opens in a new tab", type: "boolean", half: true },
  { name: "visible", label: "Visible", type: "boolean", half: true },
  ...(withChildren ? [{ name: "children", label: childLabel, type: "list", maxItems: 40, fields: linkFields(false) } as FieldDef] : []),
];

const MENUS = [
  { key: "header", label: "Header menu", help: "Top navigation links. The “Services” item opens the services mega menu." },
  { key: "services", label: "Services mega menu", help: "Each group is a column; its sub-items are the service links." },
  { key: "footer", label: "Footer columns", help: "Each group is a footer column. Items without a link show as plain text." },
];

export function NavigationEditor() {
  const toast = useToast();
  const [key, setKey] = useState("header");
  const [doc, setDoc] = useState<{ name: string; items: Record<string, unknown>[] } | null>(null);
  const [base, setBase] = useState("");
  const [errors, setErrors] = useState<Errs>({});
  const [busy, setBusy] = useState(false);
  const dirty = !!doc && JSON.stringify(doc) !== base;
  useUnsavedWarning(dirty);

  useEffect(() => {
    api<{ name: string; items: Record<string, unknown>[] }>(`/api/admin/navigation/${key}`)
      .then((d) => {
        const v = { name: d.name, items: d.items };
        setDoc(v);
        setBase(JSON.stringify(v));
      })
      .catch(() => {
        const v = { name: MENUS.find((m) => m.key === key)!.label, items: [] };
        setDoc(v);
        setBase(JSON.stringify(v));
      });
  }, [key]);

  const save = async () => {
    if (!doc) return;
    setBusy(true);
    setErrors({});
    try {
      const d = await api<{ name: string; items: Record<string, unknown>[] }>(`/api/admin/navigation/${key}`, { method: "PUT", json: { name: doc.name, items: strip(doc.items) } });
      const v = { name: d.name, items: d.items };
      setDoc(v);
      setBase(JSON.stringify(v));
      toast("success", "Menu saved and published");
    } catch (e) {
      if (e instanceof ApiError && e.errors) setErrors(e.errors);
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const menu = MENUS.find((m) => m.key === key)!;
  const MENU_ICON: Record<string, typeof Save> = { header: PanelTop, services: LayoutGrid, footer: PanelBottom };
  const visibleItems = (doc?.items ?? []).filter((i) => i.visible !== false);

  const strip = (items: Record<string, unknown>[]): Record<string, unknown>[] =>
    items.map(({ _id: _x, children, ...i }) => ({ external: false, visible: true, href: "", ...i, children: strip((children as Record<string, unknown>[]) ?? []) }));

  return (
    <>
      <PageHeader
        title="Navigation"
        description="The website's menus. Changes go live as soon as you save."
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Navigation" }]}
        actions={<Button onClick={save} loading={busy} disabled={!dirty}><Save className="h-4 w-4" /> Save menu</Button>}
      />
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {MENUS.map((m, i) => {
          const on = key === m.key;
          const Icon = MENU_ICON[m.key] ?? PanelTop;
          return (
            <button
              key={m.key}
              type="button"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => { if (m.key !== key && (!dirty || window.confirm("Discard unsaved menu changes?"))) { setDoc(null); setKey(m.key); } }}
              className={`auth-rise flex items-start gap-3 rounded-2xl border p-4 text-left transition ${on ? "border-teal/40 bg-white shadow-[0_14px_32px_-20px_rgba(13,148,136,0.55)] ring-1 ring-teal/20" : "border-slate-200 bg-white/70 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"}`}
            >
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${on ? "bg-teal text-white" : "bg-slate-100 text-slate-500"}`}><Icon className="h-5 w-5" /></span>
              <span>
                <span className="block text-sm font-semibold text-slate-900">{m.label}</span>
                <span className="mt-0.5 block text-xs text-slate-500">{m.help}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* live preview of the top-level items */}
      {doc && visibleItems.length > 0 && (
        <div key={`pv-${key}`} className="auth-rise mb-5 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400"><Eye className="h-3.5 w-3.5" /> Preview</p>
          {key === "header" ? (
            <div className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-50 px-3 py-2.5">
              <span className="mr-3 text-sm font-extrabold tracking-tight text-navy">PRO<span className="text-teal">MANAGE</span></span>
              {visibleItems.map((it, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-sm font-medium text-slate-700">
                  {String(it.label ?? "")}
                  {Array.isArray(it.children) && (it.children as unknown[]).length > 0 && <ChevronDown className="h-3.5 w-3.5 text-slate-400" />}
                  {typeof it.badge === "string" && it.badge && <span className="rounded bg-teal px-1 text-[9px] font-bold uppercase text-white">{it.badge}</span>}
                </span>
              ))}
            </div>
          ) : (
            <div className={`grid gap-3 ${key === "footer" ? "rounded-xl bg-navy p-4 text-white sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
              {visibleItems.map((g, i) => {
                const kids = ((g.children as Record<string, unknown>[]) ?? []).filter((c) => c.visible !== false);
                return (
                  <div key={i} className={key === "footer" ? "" : "rounded-xl bg-slate-50 p-3"}>
                    <p className={`text-xs font-bold uppercase tracking-wider ${key === "footer" ? "text-teal-300" : "text-slate-500"}`}>{String(g.label ?? "")}</p>
                    <ul className="mt-2 space-y-1">
                      {kids.slice(0, 7).map((c, j) => (
                        <li key={j} className={`truncate text-xs ${key === "footer" ? "text-slate-300" : "text-slate-700"}`}>{String(c.label ?? "")}</li>
                      ))}
                      {kids.length > 7 && <li className="text-[11px] text-slate-400">+{kids.length - 7} more</li>}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <Card title={<span className="inline-flex items-center gap-2">{menu.label} <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">{doc?.items.length ?? 0} {key === "header" ? "items" : "groups"}</span></span>}>
        <p className="mb-4 text-xs text-slate-500">Click a row to edit it. Use the arrows to change the order, the copy icon to duplicate, and untick <b>Visible</b> to hide an item without deleting it.</p>
        {!doc ? <Spinner /> : (
          <FieldGroup
            values={doc}
            onChange={(v) => setDoc(v as typeof doc)}
            errors={errors}
            fields={[{ name: "items", label: key === "header" ? "Menu items" : "Groups", type: "list", maxItems: 30, fields: linkFields(key !== "header", key === "services" ? "Services" : "Links") }]}
          />
        )}
      </Card>
      {dirty && (
        <div className="sticky bottom-4 z-20 mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-white/95 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)] backdrop-blur">
          <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400" /> Unsaved menu changes
          </span>
          <span className="ml-auto flex gap-2">
            <Button variant="ghost" onClick={() => setDoc(JSON.parse(base))}>Discard</Button>
            <Button variant="teal" loading={busy} onClick={save}><Save className="h-4 w-4" /> Save &amp; publish menu</Button>
          </span>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */

const SOCIAL_PLATFORMS = [
  ["linkedin", "LinkedIn"], ["instagram", "Instagram"], ["facebook", "Facebook"], ["youtube", "YouTube"], ["x", "X (Twitter)"],
  ["whatsapp", "WhatsApp"], ["telegram", "Telegram"], ["pinterest", "Pinterest"], ["github", "GitHub"], ["behance", "Behance"],
  ["dribbble", "Dribbble"], ["threads", "Threads"], ["tiktok", "TikTok"], ["google", "Google Business"], ["clutch", "Clutch"],
  ["website", "Website"], ["other", "Other link"],
].map(([value, label]) => ({ value, label }));

const SETTINGS_GROUPS: { title: string; fields: FieldDef[] }[] = [
  { title: "Brand", fields: [
    { name: "siteName", label: "Website name", type: "text", max: 120, half: true },
    { name: "tagline", label: "Tagline", type: "text", max: 200, half: true },
    { name: "logo", label: "Header logo", type: "image" },
    { name: "footerLogo", label: "Footer logo", type: "image" },
    { name: "favicon", label: "Favicon", type: "image" },
  ] },
  { title: "Contact details (footer & contact sections)", fields: [
    { name: "contactEmail", label: "Contact email", type: "email", half: true },
    { name: "contactPhone", label: "Contact phone", type: "text", max: 40, half: true },
    { name: "address", label: "Office address", type: "textarea", max: 300 },
    { name: "shortLocation", label: "Short location", type: "text", max: 120, half: true },
    { name: "workingHours", label: "Working hours", type: "text", max: 120, half: true },
  ] },
  { title: "Header top bar", fields: [
    { name: "topBar", label: "Top bar", type: "list", maxItems: 0 },
  ] },
  { title: "Social links", fields: [
    { name: "socialLinks", label: "Social profiles", type: "list", maxItems: 20, help: "Shown as icons in the website footer, in this order. Add as many as you like.", fields: [
      { name: "platform", label: "Platform", type: "select", required: true, options: SOCIAL_PLATFORMS, half: true },
      { name: "url", label: "Profile link", type: "url", required: true, half: true, placeholder: "https://…" },
      { name: "label", label: "Name shown on hover (optional)", type: "text", max: 60, help: "Leave empty to use the platform name." },
    ] },
  ] },
  { title: "Footer", fields: [
    { name: "footer", label: "Footer", type: "list", maxItems: 0 },
  ] },
  { title: "Default SEO & tracking", fields: [
    { name: "defaultSeo", label: "SEO", type: "list", maxItems: 0 },
  ] },
];

/** Nested objects are edited as flat fields prefixed "group.field". */
const NESTED: Record<string, FieldDef[]> = {
  topBar: [
    { name: "phone", label: "Phone", type: "text", max: 40, half: true },
    { name: "email", label: "Email", type: "email", half: true },
    { name: "location", label: "Location", type: "text", max: 80, half: true },
    { name: "onlineText", label: "Online text", type: "text", max: 80, half: true },
    { name: "ratingText", label: "Rating text", type: "text", max: 80, half: true },
    { name: "consultationText", label: "Consultation text", type: "text", max: 80, half: true },
    { name: "chatLabel", label: "Chat button label", type: "text", max: 40, half: true },
    { name: "chatHref", label: "Chat button link", type: "url", half: true },
  ],
  socials: ["linkedin", "instagram", "facebook", "youtube", "twitter"].map((n) => ({ name: n, label: n[0].toUpperCase() + n.slice(1), type: "url" as const, half: true })),
  footer: [
    { name: "headline", label: "Headline", type: "text", max: 120, half: true },
    { name: "accent", label: "Accent line", type: "text", max: 120, half: true },
    { name: "description", label: "Description", type: "textarea", max: 600 },
    { name: "copyright", label: "Copyright", type: "text", max: 200, half: true },
    { name: "madeIn", label: "“Made with ♥ in”", type: "text", max: 80, half: true },
    { name: "googleRating", label: "Google rating", type: "text", max: 10, half: true },
    { name: "reviewsText", label: "Reviews text", type: "text", max: 60, half: true },
    { name: "ctaTitle", label: "Side card title", type: "text", max: 120, half: true, placeholder: "Let's Grow Your Business Together" },
    { name: "ctaText", label: "Side card text", type: "text", max: 300, half: true, placeholder: "Get expert strategies and digital solutions tailored to your business goals." },
    { name: "ctaLabel", label: "Side card button text", type: "text", max: 60, half: true, placeholder: "Get a Free Consultation" },
    { name: "ctaHref", label: "Side card button link", type: "href", half: true, placeholder: "/contact" },
    { name: "trustedText", label: "“Trusted by” text", type: "text", max: 120, half: true, placeholder: "TRUSTED BY 500+ BUSINESSES ACROSS" },
    { name: "trustedAccent", label: "“Trusted by” highlighted words", type: "text", max: 80, half: true, placeholder: "INDIA & NCR" },
    { name: "stats", label: "Stats in the dark band (up to 3)", type: "list", maxItems: 3, fields: [
      { name: "value", label: "Value", type: "text", max: 20, half: true, placeholder: "500+" },
      { name: "label", label: "Label", type: "text", max: 60, half: true, placeholder: "Businesses Trusted" },
    ] },
  ],
  defaultSeo: [
    { name: "title", label: "Default SEO title", type: "text", max: 160, half: true },
    { name: "titleTemplate", label: "Title template", type: "text", max: 160, half: true, help: "%s = page title" },
    { name: "description", label: "Default meta description", type: "textarea", max: 320 },
    { name: "ogImage", label: "Default social share image", type: "image" },
  ],
};

/** Icon + one-line help for each settings tab. */
const SETTINGS_TABS: Record<string, { icon: typeof Save; short: string; help: string }> = {
  "Brand": { icon: Palette, short: "Brand", help: "Website name, logos and favicon." },
  "Contact details (footer & contact sections)": { icon: Phone, short: "Contact", help: "Email, phone and address shown in the footer and contact sections." },
  "Header top bar": { icon: PanelTop, short: "Top bar", help: "The thin bar above the main menu." },
  "Social links": { icon: Share2, short: "Social", help: "Your social media profiles - shown as icons in the website footer." },
  "Footer": { icon: PanelBottom, short: "Footer", help: "Text at the bottom of every page. Footer client logos come from Global → Client logos slider; footer links from Navigation." },
  "Default SEO & tracking": { icon: Search, short: "SEO & tracking", help: "Fallback SEO for pages without their own, plus Analytics / Tag Manager / Pixel IDs." },
};

export function SettingsEditor() {
  const toast = useToast();
  const [tab, setTab] = useState(SETTINGS_GROUPS[0].title);
  const [v, setV] = useState<Record<string, unknown> | null>(null);
  const [base, setBase] = useState("");
  const [errors, setErrors] = useState<Errs>({});
  const [busy, setBusy] = useState(false);
  const dirty = !!v && JSON.stringify(v) !== base;
  useUnsavedWarning(dirty);

  useEffect(() => {
    api<Record<string, unknown>>("/api/admin/settings").then((d) => {
      const { _id, __v, key, createdAt, updatedAt, ...rest } = d;
      void _id; void __v; void key; void createdAt; void updatedAt;
      // first time on the new Social list: start it from the old fixed fields (LinkedIn, Instagram…)
      const old = (rest.socials as Record<string, string | undefined>) ?? {};
      if (!(rest.socialLinks as unknown[] | undefined)?.length) {
        rest.socialLinks = Object.entries(old).filter(([, u]) => u).map(([p, u]) => ({ platform: p === "twitter" ? "x" : p, url: u, label: "" }));
      }
      setV(rest);
      setBase(JSON.stringify(rest));
    }).catch((e) => toast("error", e.message));
  }, [toast]);

  if (!v) return <Spinner />;
  const analytics = (v.analytics as Record<string, unknown>) ?? {};
  const save = async () => {
          setBusy(true);
          setErrors({});
          try {
            const d = await api<Record<string, unknown>>("/api/admin/settings", { method: "PUT", json: v });
            const { _id, __v, key, createdAt, updatedAt, ...rest } = d;
            void _id; void __v; void key; void createdAt; void updatedAt;
            setV(rest);
            setBase(JSON.stringify(rest));
            toast("success", "Settings saved");
          } catch (e) {
            if (e instanceof ApiError && e.errors) setErrors(e.errors);
            toast("error", (e as Error).message);
          } finally {
            setBusy(false);
          }
  };
  const tabs = [...SETTINGS_GROUPS.map((g) => ({ id: g.title, ...SETTINGS_TABS[g.title] })), { id: "Notifications", icon: Mail, short: "Notifications", help: "Who gets emailed about new enquiries." }];
  const current = tabs.find((t) => t.id === tab) ?? tabs[0];
  return (
    <>
      <PageHeader
        title="Website settings"
        description="Global details used across the whole website. Pick a tab, change what you need, then save."
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Settings" }]}
        actions={<Button loading={busy} disabled={!dirty} onClick={save}><Save className="h-4 w-4" /> Save settings</Button>}
      />
      <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
        {/* tab list */}
        <nav aria-label="Settings sections" className="flex gap-2 overflow-x-auto pb-1 lg:sticky lg:top-24 lg:flex-col lg:self-start lg:overflow-visible">
          {tabs.map((t) => {
            const on = t.id === current.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`group flex shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition ${on ? "bg-white font-semibold text-slate-900 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.45)] ring-1 ring-slate-200" : "text-slate-500 hover:bg-white/70 hover:text-slate-800"}`}
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition ${on ? "bg-teal text-white shadow-[0_8px_18px_-8px_rgba(13,148,136,0.8)]" : "bg-slate-100 text-slate-500 group-hover:bg-teal/10 group-hover:text-teal"}`}>
                  <t.icon className="h-4 w-4" />
                </span>
                <span className="whitespace-nowrap">{t.short}</span>
              </button>
            );
          })}
        </nav>

        {/* active tab */}
        <div key={current.id} className="auth-rise min-w-0">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal/10 text-teal"><current.icon className="h-5 w-5" /></span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{current.id}</h2>
              <p className="text-sm text-slate-500">{current.help}</p>
            </div>
          </div>
        {SETTINGS_GROUPS.filter((g) => g.title === current.id).map((g) => {
          const nestedKey = g.fields.length === 1 && NESTED[g.fields[0].name] ? g.fields[0].name : null;
          return (
            <Card key={g.title}>
              {nestedKey ? (
                <FieldGroup fields={NESTED[nestedKey]} values={(v[nestedKey] as Record<string, unknown>) ?? {}} onChange={(x) => setV({ ...v, [nestedKey]: x })} errors={errors} prefix={nestedKey} />
              ) : (
                <FieldGroup fields={g.fields} values={v} onChange={setV} errors={errors} />
              )}
              {nestedKey === "defaultSeo" && (
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <FieldGroup
                    values={analytics}
                    onChange={(x) => setV({ ...v, analytics: x })}
                    errors={errors}
                    prefix="analytics"
                    fields={[
                      { name: "googleAnalyticsId", label: "Google Analytics ID", type: "text", placeholder: "G-XXXXXXX", half: true },
                      { name: "googleTagManagerId", label: "Google Tag Manager ID", type: "text", placeholder: "GTM-XXXXXX", half: true },
                      { name: "metaPixelId", label: "Meta Pixel ID", type: "text", half: true },
                    ]}
                  />
                </div>
              )}
            </Card>
          );
        })}
        {current.id === "Notifications" && (
        <Card>
          <p className="text-sm text-slate-600">
            Who gets emailed about new enquiries (To, CC, BCC), the mail server and the test button are on the{" "}
            <Link href="/admin/email" className="font-medium text-teal hover:underline">Email (SMTP)</Link> page.
          </p>
        </Card>
        )}
        </div>
      </div>
      {dirty && (
        <div className="sticky bottom-4 z-20 mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-white/95 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)] backdrop-blur">
          <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400" /> You have unsaved changes (all tabs are saved together)
          </span>
          <span className="ml-auto flex gap-2">
            <Button variant="ghost" onClick={() => setV(JSON.parse(base))}>Discard</Button>
            <Button variant="teal" loading={busy} onClick={save}><Save className="h-4 w-4" /> Save settings</Button>
          </span>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Users                                                               */
/* ------------------------------------------------------------------ */

type UserRow = { _id: string; name: string; email: string; role: Role; active: boolean; lastLoginAt?: string; createdAt: string };
const ROLE_OPTS = (Object.keys(ROLE_LABELS) as Role[]).map((r) => ({ value: r, label: ROLE_LABELS[r] }));
const ROLE_INFO: Record<Role, { icon: typeof Save; cls: string; text: string }> = {
  super_admin: { icon: Crown, cls: "bg-amber-100 text-amber-700", text: "Everything, including users" },
  admin: { icon: ShieldCheck, cls: "bg-teal/10 text-teal", text: "Everything except users" },
  editor: { icon: PenLine, cls: "bg-indigo-100 text-indigo-700", text: "Pages, content, media, menus" },
  seo_manager: { icon: Search, cls: "bg-sky-100 text-sky-700", text: "SEO fields and publishing" },
  lead_manager: { icon: Inbox, cls: "bg-rose-100 text-rose-700", text: "Leads, proposals, applications" },
};

export function UsersManager({ selfId }: { selfId: string }) {
  const toast = useToast();
  const confirm = useConfirm();
  const [rows, setRows] = useState<UserRow[] | null>(null);
  const [edit, setEdit] = useState<Partial<UserRow> & { password?: string } | null>(null);
  const [errors, setErrors] = useState<Errs>({});
  const [busy, setBusy] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const load = useCallback(() => api<UserRow[]>("/api/admin/users").then(setRows).catch((e) => toast("error", e.message)), [toast]);
  useEffect(() => {
    // Defer to after render (fetch results update state asynchronously).
    const t = setTimeout(load, 0);
    return () => clearTimeout(t);
  }, [load]);

  return (
    <>
      <PageHeader title="Users & roles" description="Who can sign in to the CMS and what they can do." crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Users" }]}
        actions={<Button onClick={() => { setErrors({}); setEdit({ role: "editor", active: true }); }}><UserPlus className="h-4 w-4" /> Add user</Button>} />
      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {(Object.keys(ROLE_INFO) as Role[]).map((r, i) => {
          const info = ROLE_INFO[r];
          const count = rows?.filter((u) => u.role === r).length ?? 0;
          return (
            <div key={r} style={{ animationDelay: `${i * 60}ms` }} className="auth-rise rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-22px_rgba(15,23,42,0.4)]">
              <div className="flex items-center justify-between">
                <span className={`grid h-9 w-9 place-items-center rounded-xl ${info.cls}`}><info.icon className="h-4 w-4" /></span>
                <span className="text-xl font-bold text-slate-900">{count}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">{ROLE_LABELS[r]}</p>
              <p className="mt-0.5 text-xs text-slate-500">{info.text}</p>
            </div>
          );
        })}
      </div>
      <Card className="overflow-hidden [&>div]:p-0">
        {!rows ? <Spinner /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-2.5">User</th><th className="px-4 py-2.5">Role</th><th className="px-4 py-2.5">Status</th><th className="px-4 py-2.5">Last sign-in</th><th /></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((u) => (
                  <tr key={u._id}>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal to-navy text-xs font-bold uppercase text-white">
                          {u.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("")}
                        </span>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900">{u.name}{u._id === selfId && <span className="ml-1.5 rounded-full bg-teal/10 px-1.5 py-0.5 text-[10px] font-bold text-teal">YOU</span>}</p>
                          <p className="truncate text-xs text-slate-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold ${ROLE_INFO[u.role].cls}`}>
                        {(() => { const I = ROLE_INFO[u.role].icon; return <I className="h-3.5 w-3.5" />; })()}
                        {ROLE_LABELS[u.role]}
                      </span>
                    </td>
                    <td className="px-4 py-2.5"><Badge value={u.active ? "published" : "closed"} label={u.active ? "active" : "disabled"} /></td>
                    <td className="px-4 py-2.5 text-xs text-slate-500">{fmtDate(u.lastLoginAt, true)}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right">
                      <Button variant="ghost" size="sm" title="Create password reset link" onClick={async () => {
                        try { setLink((await api<{ url: string }>(`/api/admin/users/${u._id}/reset-link`, { method: "POST" })).url); } catch (e) { toast("error", (e as Error).message); }
                      }}><KeyRound className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => { setErrors({}); setEdit({ ...u, password: "" }); }}><Pencil className="h-4 w-4" /></Button>
                      {u._id !== selfId && <Button variant="ghost" size="sm" onClick={async () => {
                        if (!(await confirm({ title: `Remove ${u.name}?`, body: "They will be signed out and can no longer access the CMS.", confirmLabel: "Remove", danger: true }))) return;
                        try { await api(`/api/admin/users/${u._id}`, { method: "DELETE" }); toast("success", "User removed"); load(); } catch (e) { toast("error", (e as Error).message); }
                      }}><Trash2 className="h-4 w-4 text-rose-500" /></Button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      {edit && (
        <Modal title={edit._id ? `Edit ${edit.name}` : "Add a user"} onClose={() => setEdit(null)}>
          <FieldGroup values={edit as Record<string, unknown>} onChange={(x) => setEdit(x as typeof edit)} errors={errors} fields={[
            { name: "name", label: "Name", type: "text", required: true, max: 120, half: true },
            { name: "email", label: "Email", type: "email", required: true, half: true },
            { name: "role", label: "Role", type: "select", required: true, options: ROLE_OPTS, half: true },
            { name: "active", label: "Account active", type: "boolean", half: true },
            { name: "password", label: edit._id ? "New password (leave empty to keep)" : "Password", type: "password", required: !edit._id, help: "10+ characters with upper & lower case letters and a number." },
          ]} />
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setEdit(null)}>Cancel</Button>
            <Button loading={busy} onClick={async () => {
              setBusy(true); setErrors({});
              try {
                const { _id, lastLoginAt: _l, createdAt: _c, ...body } = edit as UserRow & { password?: string };
                const saved = await api<{ welcomeEmailSent?: boolean }>(_id ? `/api/admin/users/${_id}` : "/api/admin/users", { method: _id ? "PUT" : "POST", json: body });
                if (_id) toast("success", "User updated");
                else if (saved?.welcomeEmailSent) toast("success", `User added. A welcome email was sent to ${body.email}.`);
                // email off/failing: the account still works; share the sign-in details yourself
                else toast("info", "User added, but the welcome email could not be sent (check Email (SMTP) settings). Share the sign-in details with them directly.");
                setEdit(null); load();
              } catch (e) { if (e instanceof ApiError && e.errors) setErrors(e.errors); toast("error", (e as Error).message); }
              finally { setBusy(false); }
            }}>{edit._id ? "Save" : "Add user"}</Button>
          </div>
        </Modal>
      )}
      {link && (
        <Modal title="Password reset link" onClose={() => setLink(null)}>
          <p className="text-sm text-slate-600">Share this one-time link privately. It expires in 30 minutes.</p>
          <input readOnly value={link} onFocus={(e) => e.target.select()} className="mt-3 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 font-mono text-xs" />
          <div className="mt-4 flex justify-end"><Button onClick={() => { navigator.clipboard.writeText(link); toast("success", "Link copied"); }}>Copy link</Button></div>
        </Modal>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export function ProfileForm({ name, email, role }: { name: string; email: string; role: Role }) {
  const toast = useToast();
  const [v, setV] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Errs>({});
  const [busy, setBusy] = useState(false);
  const pw = String(v.newPassword ?? "");
  const rules = [
    { ok: pw.length >= 10, text: "At least 10 characters" },
    { ok: /[A-Z]/.test(pw), text: "An upper case letter" },
    { ok: /[a-z]/.test(pw), text: "A lower case letter" },
    { ok: /[0-9]/.test(pw), text: "A number" },
    { ok: !!pw && pw === v.confirm, text: "Both new passwords match" },
  ];
  const score = rules.slice(0, 4).filter((r) => r.ok).length + (pw.length >= 14 ? 1 : 0);
  const strength = !pw ? null : score <= 2 ? { label: "Weak", cls: "bg-rose-500", w: "w-1/4" } : score === 3 ? { label: "Fair", cls: "bg-amber-500", w: "w-2/4" } : score === 4 ? { label: "Good", cls: "bg-teal", w: "w-3/4" } : { label: "Strong", cls: "bg-emerald-500", w: "w-full" };
  const info = ROLE_INFO[role];
  const initials = name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const submit = async () => {
    if (v.newPassword !== v.confirm) { setErrors({ confirm: "Passwords do not match" }); return; }
    setBusy(true); setErrors({});
    try { await api("/api/auth/change-password", { method: "POST", json: { currentPassword: v.currentPassword, newPassword: v.newPassword } }); setV({}); toast("success", "Password updated. Other devices were signed out."); }
    catch (e) { if (e instanceof ApiError && e.errors) setErrors(e.errors); toast("error", (e as Error).message); }
    finally { setBusy(false); }
  };

  return (
    <>
      <PageHeader title="My profile" description="Your account details and password." crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Profile" }]} />

      {/* identity banner */}
      <section className="auth-rise relative mb-6 overflow-hidden rounded-3xl bg-[linear-gradient(120deg,#0c1e3d_0%,#0b3350_55%,#0b5f5a_100%)] p-6 text-white shadow-[0_24px_60px_-30px_rgba(12,30,61,0.7)] sm:p-8">
        <div aria-hidden className="auth-glow absolute -right-16 -top-20 h-64 w-64 rounded-full bg-teal/40 blur-[80px]" />
        <div aria-hidden className="auth-orbit absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-dashed border-white/15" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-teal-300 to-teal text-2xl font-extrabold text-navy shadow-[0_12px_30px_-10px_rgba(45,212,191,0.8)]">{initials}</span>
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">{name}</h2>
            <p className="mt-1 flex items-center gap-2 truncate text-sm text-slate-300"><Mail className="h-4 w-4 shrink-0 text-teal-200" /> {email}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
              <info.icon className="h-3.5 w-3.5 text-teal-200" /> {ROLE_LABELS[role]}
            </span>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        {/* account */}
        <div className="auth-rise space-y-6 [animation-delay:80ms]">
          <Card title="Account details">
            <dl className="grid gap-3">
              {[
                { icon: UserPlus, label: "Full name", value: name },
                { icon: Mail, label: "Sign-in email", value: email },
                { icon: info.icon, label: "Role", value: ROLE_LABELS[role] },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-teal ring-1 ring-slate-200"><r.icon className="h-4 w-4" /></span>
                  <div className="min-w-0">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{r.label}</dt>
                    <dd className="truncate text-sm font-semibold text-slate-900">{r.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-slate-500">To change your name, email or role, ask a Super Admin (Users &amp; roles).</p>
          </Card>
          <Card title="What your role can do">
            <div className="flex items-start gap-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${info.cls}`}><info.icon className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-semibold text-slate-900">{ROLE_LABELS[role]}</p>
                <p className="mt-0.5 text-sm text-slate-500">{info.text}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* password */}
        <div className="auth-rise [animation-delay:160ms]">
          <Card title={<span className="inline-flex items-center gap-2"><KeyRound className="h-4 w-4 text-teal" /> Change password</span>}>
            <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-4 [&>div]:grid-cols-1">
              <FieldGroup values={v} onChange={setV} errors={errors} fields={[
                { name: "currentPassword", label: "Current password", type: "password", required: true },
                { name: "newPassword", label: "New password", type: "password", required: true },
                { name: "confirm", label: "Repeat new password", type: "password", required: true },
              ]} />
              {strength && (
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Password strength</span>
                    <span className="font-bold text-slate-800">{strength.label}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full transition-all duration-500 ${strength.cls} ${strength.w}`} />
                  </div>
                </div>
              )}
              <ul className="grid gap-1.5 rounded-2xl bg-slate-50 p-3 sm:grid-cols-2">
                {rules.map((r) => (
                  <li key={r.text} className={`flex items-center gap-2 text-xs transition ${r.ok ? "font-semibold text-emerald-700" : "text-slate-500"}`}>
                    <span className={`grid h-4 w-4 place-items-center rounded-full text-[10px] ${r.ok ? "bg-emerald-500 text-white" : "bg-slate-200 text-transparent"}`}>✓</span>
                    {r.text}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">You stay signed in here; other devices are signed out.</p>
                <Button type="submit" variant="teal" loading={busy} disabled={!rules.every((r) => r.ok) || !v.currentPassword}>
                  <KeyRound className="h-4 w-4" /> Update password
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Job applications                                                    */
/* ------------------------------------------------------------------ */

type App = { _id: string; jobTitle?: string; name: string; email: string; phone?: string; portfolioUrl?: string; coverLetter?: string; status: string; createdAt: string; resume?: { _id: string; originalName?: string; url: string } | null; notes?: { _id: string; body: string; authorName?: string; createdAt: string }[] };
const APP_STATUSES = ["new", "reviewing", "shortlisted", "interview", "rejected", "hired"];

export function ApplicationsList() {
  const toast = useToast();
  const confirm = useConfirm();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = usePerPage("applications");
  const [data, setData] = useState<{ items: App[]; total: number; pages: number } | null>(null);
  const [sel, setSel] = useState<App | null>(null);
  const [note, setNote] = useState("");
  const load = useCallback(() => api<typeof data>(`/api/admin/applications${qs({ q, status, page, limit })}`).then(setData).catch((e) => toast("error", e.message)), [q, status, page, limit, toast]);
  useEffect(() => {
    // Defer to after render (fetch results update state asynchronously).
    const t = setTimeout(load, 0);
    return () => clearTimeout(t);
  }, [load]);
  const patch = async (body: Record<string, unknown>) => {
    if (!sel) return;
    try { const d = await api<App>(`/api/admin/applications/${sel._id}`, { method: "PATCH", json: body }); setSel(d); load(); toast("success", "Updated"); return true; }
    catch (e) { toast("error", (e as Error).message); return false; }
  };
  return (
    <>
      <PageHeader title="Job applications" description="Applications sent from the Career page. CVs are stored privately." crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Applications" }]} />
      <Card className="overflow-hidden [&>div]:p-0">
        <div className="flex flex-col gap-2 border-b border-slate-100 bg-slate-50/50 p-4 sm:flex-row">
          <SearchInput value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Name, email or job…" />
          <Select label="Status" value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={[{ value: "", label: "All statuses" }, ...APP_STATUSES.map((s) => ({ value: s, label: s }))]} />
          <PerPage value={limit} onChange={(n) => { setLimit(n); setPage(1); }} />
        </div>
        {!data ? <Spinner /> : data.items.length === 0 ? <EmptyState title="No applications yet" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-2.5">Applicant</th><th className="px-4 py-2.5">Position</th><th className="px-4 py-2.5">CV</th><th className="px-4 py-2.5">Status</th><th className="px-4 py-2.5">Received</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {data.items.map((a) => (
                  <tr key={a._id} className="cursor-pointer hover:bg-slate-50/60" onClick={() => setSel(a)}>
                    <td className="px-4 py-2.5"><div className="flex items-center gap-3"><Avatar name={a.name} /><div className="min-w-0"><p className="truncate font-semibold text-slate-900">{a.name}</p><p className="truncate text-xs text-slate-500">{a.email}</p></div></div></td>
                    <td className="px-4 py-2.5 text-slate-600">{a.jobTitle}</td>
                    <td className="px-4 py-2.5 text-xs">{a.resume ? <span className="inline-flex items-center rounded-lg bg-teal/10 px-2 py-0.5 font-semibold text-teal">CV attached</span> : <span className="text-slate-300">—</span>}</td>
                    <td className="px-4 py-2.5"><Badge value={a.status} /></td>
                    <td className="px-4 py-2.5 text-xs text-slate-500">{fmtDate(a.createdAt, true)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {data && <Pagination page={page} pages={data.pages} total={data.total} onPage={setPage} limit={limit} onLimit={(n) => { setLimit(n); setPage(1); }} />}
      </Card>
      {sel && (
        <Modal title={`${sel.name} – ${sel.jobTitle}`} onClose={() => setSel(null)} size="lg">
          <div className="grid gap-5 md:grid-cols-[1fr_220px]">
            <div className="space-y-3 text-sm">
              <p><span className="text-slate-500">Email:</span> <a className="text-teal" href={`mailto:${sel.email}`}>{sel.email}</a></p>
              {sel.phone && <p><span className="text-slate-500">Phone:</span> {sel.phone}</p>}
              {sel.portfolioUrl && <p><span className="text-slate-500">Portfolio:</span> <a className="text-teal" href={sel.portfolioUrl} target="_blank" rel="noreferrer">{sel.portfolioUrl}</a></p>}
              {sel.coverLetter && <div className="rounded-lg bg-slate-50 p-3 whitespace-pre-wrap text-slate-700">{sel.coverLetter}</div>}
              {sel.resume && <a href={`/api/admin/files/${sel.resume._id}`}><Button variant="secondary" size="sm"><Download className="h-4 w-4" /> Download CV</Button></a>}
              <div className="pt-2">
                <p className="mb-2 text-xs font-medium text-slate-500">Notes</p>
                <ul className="space-y-2">{sel.notes?.map((n) => <li key={n._id} className="rounded bg-slate-50 p-2 text-xs"><p className="text-slate-700">{n.body}</p><p className="mt-0.5 text-slate-400">{n.authorName} · {fmtDate(n.createdAt, true)}</p></li>)}</ul>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Add a note…" className="mt-2 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" />
                <Button size="sm" className="mt-1" disabled={!note.trim()} onClick={async () => (await patch({ note })) && setNote("")}><Plus className="h-4 w-4" /> Add note</Button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block"><span className="mb-1 block text-xs font-medium text-slate-600">Status</span>
                <Select className="w-full" value={sel.status} onChange={(v) => patch({ status: v })} options={APP_STATUSES.map((s) => ({ value: s, label: s }))} /></label>
              <Button variant="ghost" className="w-full text-rose-600 hover:bg-rose-50" onClick={async () => {
                if (!(await confirm({ title: "Delete this application?", body: "The application and the uploaded CV are deleted permanently.", confirmLabel: "Delete", danger: true }))) return;
                try { await api(`/api/admin/applications/${sel._id}`, { method: "DELETE" }); toast("success", "Deleted"); setSel(null); load(); } catch (e) { toast("error", (e as Error).message); }
              }}><Trash2 className="h-4 w-4" /> Delete</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
