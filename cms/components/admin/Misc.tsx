"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Download, KeyRound, Pencil, Plus, Save, Trash2, UserPlus } from "lucide-react";
import { api, ApiError, qs } from "@/lib/client/api";
import { ROLE_LABELS, type Role } from "@/lib/permissions";
import { Badge, Button, Card, EmptyState, Modal, PageHeader, Pagination, SearchInput, Select, Spinner, fmtDate, useConfirm, useToast, useUnsavedWarning } from "./ui";
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

  const strip = (items: Record<string, unknown>[]): Record<string, unknown>[] =>
    items.map(({ _id: _x, children, ...i }) => ({ external: false, visible: true, href: "", ...i, children: strip((children as Record<string, unknown>[]) ?? []) }));

  return (
    <>
      <PageHeader
        title="Navigation"
        description="Menus are published as soon as you save."
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Navigation" }]}
        actions={<Button onClick={async () => {
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
        }} loading={busy} disabled={!dirty}><Save className="h-4 w-4" /> Save menu</Button>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {MENUS.map((m) => (
          <Button key={m.key} variant={key === m.key ? "primary" : "secondary"} size="sm" onClick={() => { if (m.key !== key && (!dirty || window.confirm("Discard unsaved menu changes?"))) { setDoc(null); setKey(m.key); } }}>{m.label}</Button>
        ))}
      </div>
      <Card title={MENUS.find((m) => m.key === key)?.label}>
        <p className="mb-4 text-xs text-slate-500">{MENUS.find((m) => m.key === key)?.help}</p>
        {!doc ? <Spinner /> : (
          <FieldGroup
            values={doc}
            onChange={(v) => setDoc(v as typeof doc)}
            errors={errors}
            fields={[{ name: "items", label: key === "header" ? "Menu items" : "Groups", type: "list", maxItems: 30, fields: linkFields(key !== "header", key === "services" ? "Services" : "Links") }]}
          />
        )}
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */

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
    { name: "socials", label: "Socials", type: "list", maxItems: 0 },
  ] },
  { title: "Footer", fields: [
    { name: "footer", label: "Footer", type: "list", maxItems: 0 },
  ] },
  { title: "Client logos (footer “Trusted by” strip)", fields: [
    { name: "clientLogos", label: "Logos", type: "list", maxItems: 40, help: "Shown on white tiles in the footer marquee, in this order. SVG or transparent PNG works best.", fields: [
      { name: "name", label: "Client name", type: "text", max: 120, required: true },
      { name: "image", label: "Logo", type: "image" },
    ] },
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

export function SettingsEditor() {
  const toast = useToast();
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
      setV(rest);
      setBase(JSON.stringify(rest));
    }).catch((e) => toast("error", e.message));
  }, [toast]);

  if (!v) return <Spinner />;
  const analytics = (v.analytics as Record<string, unknown>) ?? {};
  return (
    <>
      <PageHeader
        title="Website settings"
        description="Global details used across the whole website."
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Settings" }]}
        actions={<Button loading={busy} disabled={!dirty} onClick={async () => {
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
        }}><Save className="h-4 w-4" /> Save settings</Button>}
      />
      <div className="space-y-6">
        {SETTINGS_GROUPS.map((g) => {
          const nestedKey = g.fields.length === 1 && NESTED[g.fields[0].name] ? g.fields[0].name : null;
          return (
            <Card key={g.title} title={g.title}>
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
        <Card title="Notifications">
          <p className="text-sm text-slate-600">
            Who gets emailed about new enquiries (To, CC, BCC), the mail server and the test button are on the{" "}
            <Link href="/admin/email" className="font-medium text-teal hover:underline">Email (SMTP)</Link> page.
          </p>
        </Card>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* SEO overview                                                        */
/* ------------------------------------------------------------------ */

type SeoRow = { _id: string; title: string; path: string; status: string; seo?: { title?: string; description?: string; robotsIndex?: boolean; ogImage?: string }; draft?: { seo?: SeoRow["seo"] } };

export function SeoOverview() {
  const [rows, setRows] = useState<SeoRow[] | null>(null);
  const [q, setQ] = useState("");
  useEffect(() => {
    api<{ items: SeoRow[] }>(`/api/admin/pages${qs({ q, limit: 100 })}`).then((d) => setRows(d.items)).catch(() => setRows([]));
  }, [q]);
  const issues = (r: SeoRow) => {
    const s = r.draft?.seo ?? r.seo ?? {};
    const out: string[] = [];
    if (!s.title) out.push("Missing title");
    else if (s.title.length > 60) out.push("Title longer than 60");
    if (!s.description) out.push("Missing description");
    else if (s.description.length > 160) out.push("Description longer than 160");
    if (!s.ogImage) out.push("No share image");
    if (s.robotsIndex === false) out.push("noindex");
    return out;
  };
  return (
    <>
      <PageHeader title="SEO" description="Search titles, descriptions and indexing for every page. Click a page to edit its SEO tab." crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "SEO" }]} />
      <Card className="overflow-hidden [&>div]:p-0">
        <div className="border-b border-slate-100 p-4"><SearchInput value={q} onChange={setQ} placeholder="Search pages…" /></div>
        {!rows ? <Spinner /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                <tr><th className="px-4 py-2.5">Page</th><th className="px-4 py-2.5">SEO title</th><th className="px-4 py-2.5">Description</th><th className="px-4 py-2.5">Checks</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => {
                  const s = r.draft?.seo ?? r.seo ?? {};
                  const list = issues(r);
                  return (
                    <tr key={r._id} className="align-top hover:bg-slate-50/60">
                      <td className="px-4 py-2.5"><Link href={`/admin/pages/${r._id}`} className="font-medium text-slate-800 hover:text-teal">{r.title}</Link><p className="font-mono text-[11px] text-slate-400">{r.path}</p></td>
                      <td className="max-w-xs px-4 py-2.5 text-xs text-slate-600">{s.title || "—"}</td>
                      <td className="max-w-sm px-4 py-2.5 text-xs text-slate-500"><span className="line-clamp-2">{s.description || "—"}</span></td>
                      <td className="px-4 py-2.5">
                        {list.length === 0 ? <span className="inline-flex items-center gap-1 text-xs text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" /> Good</span> : (
                          <ul className="space-y-0.5">{list.map((i) => <li key={i} className="flex items-center gap-1 text-xs text-amber-700"><AlertTriangle className="h-3 w-3" /> {i}</li>)}</ul>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Users                                                               */
/* ------------------------------------------------------------------ */

type UserRow = { _id: string; name: string; email: string; role: Role; active: boolean; lastLoginAt?: string; createdAt: string };
const ROLE_OPTS = (Object.keys(ROLE_LABELS) as Role[]).map((r) => ({ value: r, label: ROLE_LABELS[r] }));

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
      <Card className="mb-6">
        <ul className="grid gap-2 text-xs text-slate-600 sm:grid-cols-2 xl:grid-cols-5">
          <li><b className="text-slate-800">Super Admin</b> – everything, incl. users</li>
          <li><b className="text-slate-800">Admin</b> – everything except users</li>
          <li><b className="text-slate-800">Editor</b> – pages, content, media, menus</li>
          <li><b className="text-slate-800">SEO Manager</b> – SEO fields and publishing</li>
          <li><b className="text-slate-800">Lead Manager</b> – leads, proposals, applications</li>
        </ul>
      </Card>
      <Card className="overflow-hidden [&>div]:p-0">
        {!rows ? <Spinner /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-2.5">User</th><th className="px-4 py-2.5">Role</th><th className="px-4 py-2.5">Status</th><th className="px-4 py-2.5">Last sign-in</th><th /></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((u) => (
                  <tr key={u._id}>
                    <td className="px-4 py-2.5"><p className="font-medium text-slate-800">{u.name}{u._id === selfId && <span className="ml-1 text-xs text-slate-400">(you)</span>}</p><p className="text-xs text-slate-500">{u.email}</p></td>
                    <td className="px-4 py-2.5 text-slate-600">{ROLE_LABELS[u.role]}</td>
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
  return (
    <>
      <PageHeader title="My profile" crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Profile" }]} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Account">
          <dl className="space-y-3 text-sm">
            <div><dt className="text-xs text-slate-500">Name</dt><dd className="font-medium text-slate-800">{name}</dd></div>
            <div><dt className="text-xs text-slate-500">Email</dt><dd className="text-slate-800">{email}</dd></div>
            <div><dt className="text-xs text-slate-500">Role</dt><dd className="text-slate-800">{ROLE_LABELS[role]}</dd></div>
          </dl>
        </Card>
        <Card title="Change password">
          <FieldGroup values={v} onChange={setV} errors={errors} fields={[
            { name: "currentPassword", label: "Current password", type: "password", required: true },
            { name: "newPassword", label: "New password", type: "password", required: true, help: "10+ characters with upper & lower case letters and a number." },
            { name: "confirm", label: "Repeat new password", type: "password", required: true },
          ]} />
          <Button className="mt-4" loading={busy} onClick={async () => {
            if (v.newPassword !== v.confirm) { setErrors({ confirm: "Passwords do not match" }); return; }
            setBusy(true); setErrors({});
            try { await api("/api/auth/change-password", { method: "POST", json: { currentPassword: v.currentPassword, newPassword: v.newPassword } }); setV({}); toast("success", "Password updated. Other devices were signed out."); }
            catch (e) { if (e instanceof ApiError && e.errors) setErrors(e.errors); toast("error", (e as Error).message); }
            finally { setBusy(false); }
          }}>Update password</Button>
        </Card>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Activity                                                            */
/* ------------------------------------------------------------------ */

export function ActivityList() {
  const [page, setPage] = useState(1);
  const [entity, setEntity] = useState("");
  const [data, setData] = useState<{ items: { _id: string; userName?: string; action: string; entity: string; summary?: string; createdAt: string }[]; total: number; pages: number } | null>(null);
  useEffect(() => {
    api<typeof data>(`/api/admin/activity${qs({ page, entity })}`).then(setData).catch(() => setData({ items: [], total: 0, pages: 1 }));
  }, [page, entity]);
  return (
    <>
      <PageHeader title="Activity log" description="Who changed what, and when." crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Activity" }]} />
      <Card className="overflow-hidden [&>div]:p-0">
        <div className="border-b border-slate-100 p-4">
          <Select label="Area" value={entity} onChange={(v) => { setEntity(v); setPage(1); }} options={[{ value: "", label: "Everything" }, ...["auth", "pages", "services", "blogs", "testimonials", "portfolio", "careers", "team", "media", "navigation", "settings", "leads", "proposals", "applications", "users"].map((x) => ({ value: x, label: x }))]} />
        </div>
        {!data ? <Spinner /> : data.items.length === 0 ? <EmptyState title="No activity" /> : (
          <ul className="divide-y divide-slate-100">
            {data.items.map((a) => (
              <li key={a._id} className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center">
                <span className="w-44 shrink-0 text-xs text-slate-400">{fmtDate(a.createdAt, true)}</span>
                <span className="w-32 shrink-0 font-medium text-slate-700">{a.userName ?? "System"}</span>
                <Badge value="draft" label={a.entity} />
                <span className="flex-1 text-slate-600 sm:pl-2">{a.summary ?? a.action}</span>
              </li>
            ))}
          </ul>
        )}
        {data && <Pagination page={page} pages={data.pages} total={data.total} onPage={setPage} />}
      </Card>
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
  const [data, setData] = useState<{ items: App[]; total: number; pages: number } | null>(null);
  const [sel, setSel] = useState<App | null>(null);
  const [note, setNote] = useState("");
  const load = useCallback(() => api<typeof data>(`/api/admin/applications${qs({ q, status, page })}`).then(setData).catch((e) => toast("error", e.message)), [q, status, page, toast]);
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
        <div className="flex flex-col gap-2 border-b border-slate-100 p-4 sm:flex-row">
          <SearchInput value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Name, email or job…" />
          <Select label="Status" value={status} onChange={(v) => { setStatus(v); setPage(1); }} options={[{ value: "", label: "All statuses" }, ...APP_STATUSES.map((s) => ({ value: s, label: s }))]} />
        </div>
        {!data ? <Spinner /> : data.items.length === 0 ? <EmptyState title="No applications yet" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-2.5">Applicant</th><th className="px-4 py-2.5">Position</th><th className="px-4 py-2.5">CV</th><th className="px-4 py-2.5">Status</th><th className="px-4 py-2.5">Received</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {data.items.map((a) => (
                  <tr key={a._id} className="cursor-pointer hover:bg-slate-50/60" onClick={() => setSel(a)}>
                    <td className="px-4 py-2.5"><p className="font-medium text-slate-800">{a.name}</p><p className="text-xs text-slate-500">{a.email}</p></td>
                    <td className="px-4 py-2.5 text-slate-600">{a.jobTitle}</td>
                    <td className="px-4 py-2.5 text-xs">{a.resume ? "Attached" : "—"}</td>
                    <td className="px-4 py-2.5"><Badge value={a.status} /></td>
                    <td className="px-4 py-2.5 text-xs text-slate-500">{fmtDate(a.createdAt, true)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {data && <Pagination page={page} pages={data.pages} total={data.total} onPage={setPage} />}
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
