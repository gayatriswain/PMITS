"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowDown, ArrowUp, ChevronDown, Eye, EyeOff, Globe, Link2, Lock, PencilLine, Plus, RotateCcw, Save, Send, Trash2, Undo2 } from "lucide-react";
import { api, ApiError } from "@/lib/client/api";
import { Badge, Button, Card, Modal, PageHeader, Spinner, fmtDate, useConfirm, useToast, useUnsavedWarning } from "./ui";
import { FieldGroup, type FieldDef } from "./fields";

type SectionDef = { component: string; label: string; kind: "coded" | "builder"; description?: string; fields: FieldDef[]; defaults: Record<string, unknown>; generated?: boolean };
type Section = { _id?: string; key: string; component: string; label?: string; enabled: boolean; content: Record<string, unknown>; changed?: boolean };
type PageDoc = {
  _id: string; title: string; slug: string; path: string; kind: "coded" | "builder"; status: string; group?: string; description?: string; featuredImage?: string;
  seo: Record<string, unknown>; draft?: Record<string, unknown>; hasUnpublishedChanges?: boolean; publishedAt?: string; updatedAt: string;
};
type Raw = { page: PageDoc; sections: (Section & { draftContent?: Record<string, unknown>; draftEnabled?: boolean; draftOrder?: number; order: number; hasUnpublishedChanges?: boolean })[] };

const FRONT = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
/** Pages that mix inline layout with components cannot reorder sections (see registry generator). */
const FIXED_ORDER = new Set(["/", "/location", "/hosting", "/web-software/website-development"]);

/** How many texts/images of a coded section differ from the website's original. */
function editCount(def: SectionDef | undefined, content: Record<string, unknown>) {
  if (!def?.generated) return 0;
  return Object.keys(def.defaults).filter((k) => k in content && JSON.stringify(content[k]) !== JSON.stringify(def.defaults[k])).length;
}

/** Number of editable inputs in a section definition (presentational groups count their children). */
function fieldCount(fields: FieldDef[]): number {
  return fields.reduce((n, f) => n + (f.type === "group" && f.flat ? fieldCount(f.fields ?? []) : 1), 0);
}

function toState(raw: Raw) {
  const p = raw.page;
  const live = { ...p, ...(p.draft ?? {}) };
  const details = { title: live.title, slug: p.slug, description: live.description ?? "", featuredImage: live.featuredImage ?? "", group: live.group ?? "", seo: live.seo ?? {} };
  const sections = raw.sections
    .map((s) => ({
      _id: s._id,
      key: s.key,
      component: s.component,
      label: s.label,
      enabled: s.draftEnabled ?? s.enabled,
      content: (s.draftContent ?? s.content ?? {}) as Record<string, unknown>,
      order: s.draftOrder ?? s.order,
      changed: s.hasUnpublishedChanges,
    }))
    .sort((a, b) => a.order - b.order)
    .map(({ order: _o, ...s }) => s);
  return { details, sections };
}

/** Global-sections screens: a focused view of the hidden global page (only some sections, no page details/SEO). */
export type EditorScope = { title: string; description: string; crumb: string; only?: string[] };

export function PageEditor({
  id,
  perms,
  scope,
  sharedLinks = {},
}: {
  id: string;
  perms: { write: boolean; publish: boolean; delete: boolean; seo: boolean };
  scope?: EditorScope;
  /** component → admin screen where that shared section is edited (shown instead of its fields on normal pages) */
  sharedLinks?: Record<string, string>;
}) {
  const router = useRouter();
  const toast = useToast();
  const confirm = useConfirm();
  const [raw, setRaw] = useState<Raw | null>(null);
  const [defs, setDefs] = useState<Record<string, SectionDef>>({});
  const [builder, setBuilder] = useState<string[]>([]);
  const [details, setDetails] = useState<Record<string, unknown>>({});
  const [sections, setSections] = useState<Section[]>([]);
  const [baseline, setBaseline] = useState("");
  const [open, setOpen] = useState<string | null>(scope?.only?.length === 1 ? scope.only[0] : null);
  const params = useSearchParams();
  const [tab, setTab] = useState<"sections" | "details" | "seo">(() => {
    const t = params.get("tab");
    return t === "seo" || t === "details" ? t : "sections";
  });
  const [busy, setBusy] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | string[]>>({});

  const apply = useCallback((r: Raw) => {
    setRaw(r);
    const s = toState(r);
    setDetails(s.details);
    setSections(s.sections);
    setBaseline(JSON.stringify(s));
  }, []);

  useEffect(() => {
    // Load the page first, then only the field definitions of the section types it uses.
    api<Raw>(`/api/admin/pages/${id}`)
      .then(async (r) => {
        const comps = [...new Set(((r as { sections?: { component: string }[] }).sections ?? []).map((x) => x.component))];
        const d = await api<{ sections: SectionDef[]; builder: string[] }>(`/api/admin/sections?components=${encodeURIComponent(comps.join(","))}`);
        return [r, d] as const;
      })
      .then(([r, d]) => {
        setDefs(Object.fromEntries(d.sections.map((x) => [x.component, x])));
        setBuilder(d.builder);
        apply(r);
      })
      .catch((e) => toast("error", e.message));
  }, [id, apply, toast]);

  const current = JSON.stringify({ details, sections });
  const dirty = !!raw && current !== baseline;
  useUnsavedWarning(dirty);
  const page = raw?.page;
  const coded = page?.kind === "coded";
  const fixedOrder = !!scope || (!!page && FIXED_ORDER.has(page.path));
  const pending = !!page && (page.hasUnpublishedChanges || page.status !== "published");

  const sectionsChanged = useMemo(() => {
    if (!raw) return false;
    return JSON.stringify(sections) !== JSON.stringify(toState(raw).sections);
  }, [raw, sections]);
  const detailsChanged = useMemo(() => {
    if (!raw) return false;
    return JSON.stringify(details) !== JSON.stringify(toState(raw).details);
  }, [raw, details]);

  const saveDraft = async () => {
    setBusy("save");
    setErrors({});
    try {
      let r: Raw | null = null;
      if (detailsChanged) r = await api<Raw>(`/api/admin/pages/${id}`, { method: "PUT", json: { ...details, status: page!.status } });
      if (sectionsChanged && perms.write) {
        r = await api<Raw>(`/api/admin/pages/${id}/sections`, {
          method: "PUT",
          json: { sections: sections.map((s) => ({ id: s._id, key: s.key, component: s.component, label: s.label, enabled: s.enabled, content: s.content })) },
        });
      }
      if (r) apply(r);
      toast("success", "Draft saved. Visitors still see the published version until you publish.");
      return true;
    } catch (e) {
      if (e instanceof ApiError && e.errors) setErrors(e.errors);
      toast("error", (e as Error).message);
      return false;
    } finally {
      setBusy(null);
    }
  };

  const publish = async () => {
    if (dirty && !(await saveDraft())) return;
    setBusy("publish");
    try {
      const r = await api<Raw & { revalidated: boolean }>(`/api/admin/pages/${id}/publish`, { method: "POST" });
      apply(r);
      toast(r.revalidated ? "success" : "info", r.revalidated ? "Published. The live page has been refreshed." : "Published. The website could not be reached to refresh now - it will update shortly.");
    } catch (e) {
      toast("error", (e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const preview = async () => {
    if (dirty && !(await saveDraft())) return;
    try {
      const { url } = await api<{ url: string }>(`/api/admin/pages/${id}/preview`);
      window.open(url, "_blank", "noopener");
    } catch (e) {
      toast("error", (e as Error).message);
    }
  };

  const action = async (kind: "unpublish" | "discard" | "delete") => {
    const msgs = {
      unpublish: { title: "Unpublish this page?", body: "Visitors will no longer see the CMS version of this page. Designed pages fall back to their built-in content.", label: "Unpublish" },
      discard: { title: "Discard unpublished changes?", body: "All draft edits on this page go back to the published version.", label: "Discard" },
      delete: { title: "Delete this page?", body: "The page and its sections are removed permanently.", label: "Delete" },
    }[kind];
    if (!(await confirm({ title: msgs.title, body: msgs.body, confirmLabel: msgs.label, danger: true }))) return;
    setBusy(kind);
    try {
      if (kind === "delete") {
        await api(`/api/admin/pages/${id}`, { method: "DELETE" });
        setBaseline(current);
        router.replace("/admin/pages");
        return;
      }
      apply(await api<Raw>(`/api/admin/pages/${id}/${kind}`, { method: "POST" }));
      toast("success", kind === "unpublish" ? "Page unpublished" : "Changes discarded");
    } catch (e) {
      toast("error", (e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const move = (i: number, d: -1 | 1) => {
    const next = [...sections];
    const [x] = next.splice(i, 1);
    next.splice(i + d, 0, x);
    setSections(next);
  };
  const patch = (i: number, p: Partial<Section>) => setSections((s) => s.map((x, j) => (j === i ? { ...x, ...p } : x)));

  if (!raw || !page) return <Spinner />;

  return (
    <>
      <PageHeader
        title={scope ? scope.title : (details.title as string)}
        crumbs={scope ? [{ label: "Dashboard", href: "/admin" }, { label: scope.crumb }] : [{ label: "Dashboard", href: "/admin" }, { label: "Pages", href: "/admin/pages" }, { label: page.path }]}
        description={
          scope ? (
            <span className="flex flex-wrap items-center gap-2">
              {scope.description}
              {page.hasUnpublishedChanges && <Badge value="changes" label="unpublished changes" />}
            </span>
          ) : (
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs">{page.path}</span>
            <Badge value={page.status} />
            {page.hasUnpublishedChanges && <Badge value="changes" label="unpublished changes" />}
            <span className="text-xs">· updated {fmtDate(page.updatedAt, true)}</span>
          </span>
          )
        }
        actions={
          <>
            {dirty && <span className="text-xs font-medium text-amber-600">Unsaved edits</span>}
            {page.status === "published" && !scope && (
              <a href={`${FRONT}${page.path}`} target="_blank" rel="noreferrer"><Button variant="ghost"><Globe className="h-4 w-4" /> Live</Button></a>
            )}
            <Button variant="secondary" onClick={preview}><Eye className="h-4 w-4" /> Preview</Button>
            {(perms.write || perms.seo) && <Button variant="secondary" onClick={saveDraft} loading={busy === "save"} disabled={!dirty}><Save className="h-4 w-4" /> Save draft</Button>}
            {perms.publish && <Button variant="teal" onClick={publish} loading={busy === "publish"} disabled={!dirty && !pending}><Send className="h-4 w-4" /> Publish</Button>}
          </>
        }
      />

      {!scope && <div className="mb-4 flex gap-1 border-b border-slate-200">
        {(["sections", "details", "seo"] as const).map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium capitalize ${tab === t ? "border-teal text-teal" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
            {t === "seo" ? "SEO" : t}
          </button>
        ))}
      </div>}

      {tab === "sections" && (
        <Card
          title={scope ? (scope.only?.length === 1 ? "Content" : `Sections (${scope.only?.length ?? sections.length})`) : `Sections (${sections.length})`}
          actions={!coded && perms.write && <Button size="sm" variant="secondary" onClick={() => setAdding(true)}><Plus className="h-4 w-4" /> Add section</Button>}
        >
          {scope && (
            <p className="mb-4 rounded-lg bg-teal/5 px-3 py-2 text-xs text-slate-600 ring-1 ring-teal/15">
              <b>Shared on all pages.</b> Whatever you change here appears on every page that shows {scope.only?.length === 1 ? "this section" : "these sections"} after you click <b>Publish</b>. The eye icon hides it on the whole website; to hide it on just one page, use that page&apos;s own eye icon under Pages &amp; sections.
            </p>
          )}
          {coded && !scope && (
            <ol className="mb-5 grid gap-2 rounded-2xl border border-teal/15 bg-gradient-to-r from-teal/[0.06] to-transparent p-3 text-xs text-slate-600 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["1", "Open a section", "Click Edit content on any row"],
                ["2", "Change texts or images", "Edited fields turn amber"],
                ["3", "Save draft", "Visitors don't see it yet"],
                ["4", "Preview, then Publish", "Your changes go live"],
              ].map(([n, t, d]) => (
                <li key={n} className="flex items-start gap-2.5 rounded-xl bg-white/80 px-3 py-2.5 ring-1 ring-slate-200/70">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal text-[11px] font-bold text-white">{n}</span>
                  <span>
                    <span className="block font-semibold text-slate-800">{t}</span>
                    {d}
                  </span>
                </li>
              ))}
            </ol>
          )}
          {coded && !scope && (
            <p className="mb-3 text-xs text-slate-500">
              The design and animations are built into the website; here you {fixedOrder ? "show/hide sections" : "reorder and show/hide sections"} and change their texts, links and images.
            </p>
          )}
          {sections.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No sections yet. Add the first one.</p>}
          <ol className="space-y-2">
            {sections.map((s, i) => {
              if (scope?.only && !scope.only.includes(s.key)) return null;
              const def = defs[s.component];
              // a shared section on a normal page: its content lives on the global screen
              const sharedAt = !scope ? sharedLinks[s.component] : undefined;
              const editable = !!def?.fields.length && !sharedAt;
              const isOpen = open === s.key;
              return (
                <li key={s.key} className={`overflow-hidden rounded-2xl border transition ${isOpen ? "border-teal/40 bg-white shadow-[0_12px_32px_-20px_rgba(13,148,136,0.45)]" : s.enabled ? "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm" : "border-dashed border-slate-300 bg-slate-50"}`}>
                  <div className={`flex items-center gap-2 px-3 py-3 sm:px-4 ${isOpen ? "bg-teal/[0.04]" : ""}`}>
                    <button type="button" disabled={!editable} onClick={() => setOpen(isOpen ? null : s.key)} className="flex min-w-0 flex-1 items-center gap-3 text-left disabled:cursor-default">
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold ${isOpen ? "bg-teal text-white" : "bg-slate-100 text-slate-500"}`}>{i + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className={`truncate text-[15px] font-semibold ${s.enabled ? "text-slate-900" : "text-slate-400 line-through"}`}>{s.label || def?.label || s.component}</span>
                          {sharedAt && <Badge value="contacted" label="Shared on all pages" />}
                          {!s.enabled && <Badge value="draft" label="hidden" />}
                          {s.changed && <Badge value="changes" label="unpublished" />}
                          {editCount(def, s.content) > 0 && <Badge value="in_progress" label={`${editCount(def, s.content)} edited`} />}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500">
                          {sharedAt ? "Edited once for the whole website" : editable ? `${fieldCount(def!.fields)} texts, links & images you can change` : "Layout only - nothing to edit here"}
                        </span>
                      </span>
                      {editable && (
                        <span className={`hidden items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold sm:inline-flex ${isOpen ? "bg-white text-slate-600 ring-1 ring-slate-200" : "bg-teal/10 text-teal"}`}>
                          {isOpen ? <><ChevronDown className="h-3.5 w-3.5" /> Close</> : <><PencilLine className="h-3.5 w-3.5" /> Edit content</>}
                        </span>
                      )}
                      {!editable && !sharedAt && <Lock className="h-4 w-4 text-slate-300" />}
                    </button>
                    {perms.write && (
                      <div className="flex items-center">
                        {!fixedOrder && (
                          <>
                            <Button variant="ghost" size="sm" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up"><ArrowUp className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm" disabled={i === sections.length - 1} onClick={() => move(i, 1)} aria-label="Move down"><ArrowDown className="h-4 w-4" /></Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => patch(i, { enabled: !s.enabled })} title={s.enabled ? "Hide on website" : "Show on website"}>
                          {s.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-slate-400" />}
                        </Button>
                        {!coded && (
                          <Button variant="ghost" size="sm" onClick={() => setSections((x) => x.filter((_, j) => j !== i))} aria-label="Remove section"><Trash2 className="h-4 w-4 text-rose-500" /></Button>
                        )}
                      </div>
                    )}
                  </div>
                  {sharedAt && (
                    <div className="border-t border-slate-100 px-4 py-2.5 text-xs text-slate-500">
                      Same content on every page.{" "}
                      <Link href={sharedAt} className="inline-flex items-center gap-1 font-medium text-teal hover:underline">
                        <Link2 className="h-3 w-3" /> Edit it once here
                      </Link>
                      {" "}- the eye icon only hides it on this page.
                    </div>
                  )}
                  {isOpen && def && !sharedAt && (
                    <div className="border-t border-slate-100 bg-[#fbfcfd] p-4 sm:p-5">
                      {def.description && <p className="mb-3 text-xs text-slate-500">{def.description}</p>}
                      <fieldset disabled={!perms.write}>
                        <FieldGroup
                          fields={def.fields}
                          values={def.generated ? { ...def.defaults, ...s.content } : s.content}
                          defaults={def.generated ? def.defaults : undefined}
                          onChange={(c) => patch(i, { content: c })}
                          errors={errors}
                        />
                      </fieldset>
                      {perms.write && Object.keys(def.defaults).length > 0 && (
                        <button type="button" className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-teal" onClick={() => patch(i, { content: def.generated ? {} : structuredClone(def.defaults) })}>
                          <RotateCcw className="h-3 w-3" /> Reset to the website&apos;s original content
                        </button>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </Card>
      )}

      {tab === "details" && (
        <Card title="Page details">
          <fieldset disabled={!perms.write}>
            <FieldGroup
              values={details}
              onChange={setDetails}
              errors={errors}
              fields={[
                { name: "title", label: "Page title (admin)", type: "text", required: true, max: 200, half: true },
                { name: "slug", label: "URL path", type: "slug", help: coded ? "Fixed for designed pages." : "Changing this changes the page URL.", half: true },
                { name: "description", label: "Description", type: "textarea", max: 1000 },
                { name: "featuredImage", label: "Featured image", type: "image" },
              ]}
            />
          </fieldset>
        </Card>
      )}

      {tab === "seo" && (
        <Card title="Search engine & social sharing">
          <fieldset disabled={!perms.write && !perms.seo}>
            <FieldGroup values={details} onChange={setDetails} errors={errors} fields={[{ name: "seo", label: "SEO", type: "seo" }]} />
          </fieldset>
        </Card>
      )}

      {/* always-visible save bar while there are unsaved edits (long sections scroll far from the header buttons) */}
      {dirty && (
        <div className="sticky bottom-4 z-20 mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-white/95 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)] backdrop-blur">
          <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400" /> You have unsaved changes
          </span>
          <span className="ml-auto flex flex-wrap gap-2">
            <Button variant="ghost" onClick={() => raw && apply(raw)}><Undo2 className="h-4 w-4" /> Discard</Button>
            {(perms.write || perms.seo) && <Button variant="secondary" onClick={saveDraft} loading={busy === "save"}><Save className="h-4 w-4" /> Save draft</Button>}
            <Button variant="secondary" onClick={preview}><Eye className="h-4 w-4" /> Preview</Button>
            {perms.publish && <Button variant="teal" onClick={publish} loading={busy === "publish"}><Send className="h-4 w-4" /> Publish</Button>}
          </span>
        </div>
      )}

      {perms.publish && (
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-200 pt-4">
          {page.hasUnpublishedChanges && <Button variant="ghost" onClick={() => action("discard")} loading={busy === "discard"}><Undo2 className="h-4 w-4" /> Discard draft changes</Button>}
          {page.status === "published" && !scope && <Button variant="ghost" onClick={() => action("unpublish")} loading={busy === "unpublish"}><EyeOff className="h-4 w-4" /> Unpublish</Button>}
          {!coded && perms.delete && <Button variant="ghost" className="text-rose-600 hover:bg-rose-50" onClick={() => action("delete")} loading={busy === "delete"}><Trash2 className="h-4 w-4" /> Delete page</Button>}
        </div>
      )}

      {adding && (
        <Modal title="Add a section" onClose={() => setAdding(false)}>
          <div className="grid gap-2 sm:grid-cols-2">
            {builder.map((c) => (
              <button
                key={c}
                type="button"
                className="rounded-lg border border-slate-200 p-3 text-left hover:border-teal hover:bg-teal/5"
                onClick={() => {
                  const def = defs[c];
                  let key = def.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                  let n = 2;
                  while (sections.some((s) => s.key === key)) key = `${key.replace(/-\d+$/, "")}-${n++}`;
                  setSections((x) => [...x, { key, component: c, label: def.label, enabled: true, content: structuredClone(def.defaults) }]);
                  setOpen(key);
                  setAdding(false);
                }}
              >
                <p className="text-sm font-medium text-slate-800">{defs[c]?.label}</p>
                <p className="text-xs text-slate-500">{defs[c]?.fields.map((f) => f.label).slice(0, 4).join(", ")}</p>
              </button>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}
