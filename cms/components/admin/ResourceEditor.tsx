"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Save, Trash2 } from "lucide-react";
import { api, ApiError } from "@/lib/client/api";
import { RESOURCE_UI } from "@/lib/client/resources";
import { FieldGroup } from "./fields";
import { Badge, Button, Card, PageHeader, Spinner, fmtDate, useConfirm, useToast, useUnsavedWarning } from "./ui";

type Values = Record<string, unknown>;
const FRONT = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

/** Strip Mongo bookkeeping before sending back. */
function clean(v: Values) {
  const { _id, __v, createdAt, updatedAt, ...rest } = v;
  void _id; void __v; void createdAt; void updatedAt;
  return rest;
}

export function ResourceEditor({ name, id, canWrite, canPublish, canDelete }: { name: string; id?: string; canWrite: boolean; canPublish: boolean; canDelete: boolean }) {
  const ui = RESOURCE_UI[name];
  const router = useRouter();
  const toast = useToast();
  const confirm = useConfirm();
  const [values, setValues] = useState<Values | null>(id ? null : { ...ui.defaults });
  const [saved, setSaved] = useState<string>(id ? "" : JSON.stringify(ui.defaults));
  const [errors, setErrors] = useState<Record<string, string | string[]>>({});
  const [busy, setBusy] = useState(false);
  const dirty = values !== null && JSON.stringify(values) !== saved;
  useUnsavedWarning(dirty);

  useEffect(() => {
    if (!id) return;
    api<Values>(`/api/admin/resources/${name}/${id}`)
      .then((d) => {
        const v = ui.toForm ? ui.toForm(d) : d;
        // Selects bind to strings.
        if (typeof v.rating === "number") v.rating = String(v.rating);
        // Relations come back as ids already (lean docs).
        setValues(v);
        setSaved(JSON.stringify(v));
      })
      .catch((e) => toast("error", e.message));
  }, [id, name, ui, toast]);

  const publicStatus = useMemo(() => ["published", "open"], []);
  const isPublic = values ? publicStatus.includes(String(values.status)) : false;

  const save = async () => {
    if (!values) return;
    if (isPublic && !canPublish) {
      toast("error", "You can save drafts but not publish. Set the status to Draft or ask an admin.");
      return;
    }
    setBusy(true);
    setErrors({});
    try {
      const payload = clean(ui.toApi ? ui.toApi(values) : values);
      const doc = await api<Values>(id ? `/api/admin/resources/${name}/${id}` : `/api/admin/resources/${name}`, { method: id ? "PUT" : "POST", json: payload });
      const v = ui.toForm ? ui.toForm(doc) : doc;
      if (typeof v.rating === "number") v.rating = String(v.rating);
      setValues(v);
      setSaved(JSON.stringify(v));
      toast("success", id ? "Changes saved" : `${ui.singular[0].toUpperCase() + ui.singular.slice(1)} created`);
      if (!id) router.replace(`/admin/content/${name}/${doc._id}`);
    } catch (e) {
      if (e instanceof ApiError && e.errors) setErrors(e.errors);
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!id || !values) return;
    const ok = await confirm({ title: `Delete ${ui.singular}?`, body: "This cannot be undone.", confirmLabel: "Delete", danger: true });
    if (!ok) return;
    try {
      await api(`/api/admin/resources/${name}/${id}`, { method: "DELETE" });
      toast("success", "Deleted");
      setSaved(JSON.stringify(values));
      router.replace(`/admin/content/${name}`);
    } catch (e) {
      toast("error", (e as Error).message);
    }
  };

  if (!values) return <Spinner />;
  const title = String(values[ui.titleKey] || "") || `New ${ui.singular}`;
  const view = id && ui.viewUrl?.(values);

  return (
    <>
      <PageHeader
        title={title}
        description={id ? `Last updated ${fmtDate(values.updatedAt as string, true)}` : `Create a new ${ui.singular}.`}
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: ui.label, href: `/admin/content/${name}` }, { label: id ? "Edit" : "New" }]}
        actions={
          <>
            {dirty && <span className="text-xs font-medium text-amber-600">Unsaved changes</span>}
            {view && (
              <a href={`${FRONT}${view}`} target="_blank" rel="noreferrer">
                <Button variant="secondary"><ExternalLink className="h-4 w-4" /> View</Button>
              </a>
            )}
            {id && canDelete && values.isDefault !== true && (
              <Button variant="ghost" onClick={remove} className="text-rose-600 hover:bg-rose-50">
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            )}
            {canWrite && (
              <Button onClick={save} loading={busy} disabled={!dirty && !!id}>
                <Save className="h-4 w-4" /> {id ? "Save changes" : "Create"}
              </Button>
            )}
          </>
        }
      />
      {values.isDefault === true && (
        <div className="mb-4 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
          This is the <b>default category</b>. You can rename it, but it can&apos;t be deleted - posts without a category, and posts of deleted categories, are placed here.
        </div>
      )}
      {Object.keys(errors).length > 0 && (
        <div role="alert" className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Please fix the highlighted fields: {Object.keys(errors).join(", ")}
        </div>
      )}
      <fieldset disabled={!canWrite} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="auth-rise">
          <FieldGroup fields={ui.fields} values={values} onChange={setValues} errors={errors} />
        </Card>
        <div className="auth-rise space-y-6 [animation-delay:80ms] xl:sticky xl:top-24 xl:self-start">
          <Card title="Publishing & details">
            {typeof values.status === "string" && values.status && (
              <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current status</span>
                <Badge value={values.status} />
              </div>
            )}
            <div className="[&_.sm\:col-span-2]:col-span-1 [&>div]:grid-cols-1">
              <FieldGroup fields={ui.side} values={values} onChange={setValues} errors={errors} />
            </div>
            {!canPublish && <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">Your role can save drafts. An admin publishes them.</p>}
          </Card>
        </div>
      </fieldset>
      {dirty && canWrite && (
        <div className="sticky bottom-4 z-20 mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-white/95 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.45)] backdrop-blur">
          <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400" /> You have unsaved changes
          </span>
          <span className="ml-auto flex gap-2">
            <Button variant="teal" onClick={save} loading={busy}><Save className="h-4 w-4" /> {id ? "Save changes" : "Create"}</Button>
          </span>
        </div>
      )}
    </>
  );
}
