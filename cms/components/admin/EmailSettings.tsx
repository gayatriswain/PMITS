"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Mail, Save, Send, XCircle } from "lucide-react";
import { api, ApiError } from "@/lib/client/api";
import { Button, Card, PageHeader, Spinner, fmtDate, useToast, useUnsavedWarning } from "./ui";
import { FieldGroup, type FieldDef } from "./fields";

type Errs = Record<string, string | string[]>;
type V = Record<string, unknown>;
type Meta = { hasPassword: boolean; passwordReadable: boolean; activeSource: "database" | "env" | "none"; envConfigured: boolean; lastTest?: { at: string; ok: boolean; message: string; by?: string } };

const PRESETS: { label: string; host: string; port: number; encryption: string; note: string }[] = [
  { label: "Gmail / Google Workspace", host: "smtp.gmail.com", port: 587, encryption: "tls", note: "Use an App Password (Google Account → Security → App passwords), not the normal password." },
  { label: "Outlook / Microsoft 365", host: "smtp.office365.com", port: 587, encryption: "tls", note: "SMTP AUTH must be enabled for the mailbox in Microsoft 365 admin." },
  { label: "Zoho Mail", host: "smtp.zoho.in", port: 465, encryption: "ssl", note: "Use smtp.zoho.com for accounts outside India." },
  { label: "Hostinger", host: "smtp.hostinger.com", port: 465, encryption: "ssl", note: "Use the full mailbox address as the username." },
  { label: "GoDaddy (Titan)", host: "smtp.titan.email", port: 465, encryption: "ssl", note: "Use the full mailbox address as the username." },
  { label: "Brevo (Sendinblue)", host: "smtp-relay.brevo.com", port: 587, encryption: "tls", note: "Username is your Brevo login; password is an SMTP key." },
  { label: "Amazon SES (Mumbai)", host: "email-smtp.ap-south-1.amazonaws.com", port: 587, encryption: "tls", note: "Use SES SMTP credentials and a verified From address." },
];

const SERVER: FieldDef[] = [
  { name: "host", label: "SMTP host", type: "text", max: 255, half: true, placeholder: "smtp.gmail.com" },
  { name: "port", label: "Port", type: "number", half: true, help: "587 for TLS (STARTTLS), 465 for SSL" },
  { name: "encryption", label: "Encryption", type: "select", required: true, half: true, options: [{ value: "tls", label: "TLS / STARTTLS (port 587)" }, { value: "ssl", label: "SSL (port 465)" }, { value: "none", label: "None (not recommended)" }] },
  { name: "username", label: "Username", type: "text", max: 255, half: true, placeholder: "you@yourdomain.com" },
];

const SENDER: FieldDef[] = [
  { name: "fromName", label: "From name", type: "text", max: 120, half: true, placeholder: "ProManage IT Solution" },
  { name: "fromEmail", label: "From email", type: "email", half: true, help: "Usually must be the SMTP account or a verified alias." },
  { name: "replyTo", label: "Reply-To for test/system emails", type: "email", half: true, help: "Enquiry emails reply straight to the visitor." },
  { name: "subjectPrefix", label: "Subject prefix", type: "text", max: 80, half: true, placeholder: "[Website]" },
];

const RECIPIENTS: FieldDef[] = [
  { name: "to", label: "To", type: "tags", help: "Main recipients of every enquiry. Press Enter after each address.", placeholder: "admin@yourdomain.com" },
  { name: "cc", label: "CC", type: "tags", help: "Get a copy; everyone can see these addresses." },
  { name: "bcc", label: "BCC", type: "tags", help: "Get a hidden copy." },
];

const AUTO: FieldDef[] = [
  { name: "enabled", label: "Send an automatic “thank you” email to the visitor", type: "boolean" },
  { name: "subject", label: "Subject", type: "text", max: 200, placeholder: "Thanks for contacting {siteName}" },
  { name: "body", label: "Message", type: "textarea", max: 3000, help: "Placeholders: {name} (visitor's first name), {siteName}, {formName}." },
];

export function EmailSettings() {
  const toast = useToast();
  const [v, setV] = useState<V | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [base, setBase] = useState("");
  const [errors, setErrors] = useState<Errs>({});
  const [busy, setBusy] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testTo, setTestTo] = useState("");
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const dirty = !!v && JSON.stringify(v) !== base;
  useUnsavedWarning(dirty);

  const load = (d: V & Meta) => {
    const { hasPassword, passwordReadable, activeSource, envConfigured, lastTest, createdAt, updatedAt, ...rest } = d as V & Meta & { createdAt?: string; updatedAt?: string };
    void createdAt; void updatedAt;
    setMeta({ hasPassword, passwordReadable, activeSource, envConfigured, lastTest });
    const vals = { password: "", ...rest };
    setV(vals);
    setBase(JSON.stringify(vals));
  };

  useEffect(() => {
    api<V & Meta>("/api/admin/email").then(load).catch((e) => toast("error", e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!v || !meta) return <Spinner />;
  const events = (v.events as V) ?? {};
  const auto = (v.autoReply as V) ?? {};
  const preset = PRESETS.find((p) => p.host === v.host);

  const save = async () => {
    setBusy(true);
    setErrors({});
    try {
      load(await api<V & Meta>("/api/admin/email", { method: "PUT", json: v }));
      toast("success", "Email settings saved");
    } catch (e) {
      if (e instanceof ApiError && e.errors) setErrors(e.errors);
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const test = async () => {
    setTesting(true);
    setResult(null);
    try {
      const r = await api<{ ok: boolean; message: string }>("/api/admin/email/test", { method: "POST", json: { to: testTo, config: v } });
      setResult(r);
      setMeta({ ...meta, lastTest: { at: new Date().toISOString(), ok: r.ok, message: r.message } });
    } catch (e) {
      setResult({ ok: false, message: (e as Error).message });
    } finally {
      setTesting(false);
    }
  };

  const status =
    meta.activeSource === "database"
      ? { cls: "bg-emerald-50 text-emerald-700 ring-emerald-200", text: "Email is ON - website enquiries are being emailed using the settings below." }
      : meta.activeSource === "env"
        ? { cls: "bg-amber-50 text-amber-800 ring-amber-200", text: "Using the SMTP details from the server's environment file. Fill in and enable the settings below to manage them here." }
        : v.host
          ? { cls: "bg-rose-50 text-rose-700 ring-rose-200", text: "Email is OFF - the SMTP details are filled in, but \"Send emails using these settings\" is not ticked. Enquiries and job applications are saved in the CMS, but nobody is emailed. Tick the box below and click Save." }
          : { cls: "bg-rose-50 text-rose-700 ring-rose-200", text: "Email is OFF - enquiries are saved in the CMS but nobody is emailed. Fill in the SMTP details, test them, then switch email on." };
  // the test sends with what is on screen even when sending is switched off, so say so plainly
  const sendingOff = !v.enabled && !!v.host;

  return (
    <>
      <PageHeader
        title="Email (SMTP)"
        description="Outgoing mail server and who gets an email when a website form is submitted."
        crumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Email (SMTP)" }]}
        actions={<Button loading={busy} disabled={!dirty} onClick={save}><Save className="h-4 w-4" /> Save</Button>}
      />
      <div className="space-y-6">
        <div className={`rounded-xl px-4 py-3 text-sm ring-1 ${status.cls}`}>{status.text}</div>

        <Card title="Mail server">
          <label className="mb-4 flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-800">
            <input type="checkbox" className="h-4 w-4 accent-teal" checked={Boolean(v.enabled)} onChange={(e) => setV({ ...v, enabled: e.target.checked })} />
            Send emails using these settings
          </label>
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500">Quick fill:</span>
            {PRESETS.map((p) => (
              <button key={p.host} type="button" onClick={() => setV({ ...v, host: p.host, port: p.port, encryption: p.encryption })}
                className={`rounded-full border px-2.5 py-1 transition ${v.host === p.host ? "border-teal bg-teal/10 text-teal" : "border-slate-200 text-slate-600 hover:border-teal hover:text-teal"}`}>
                {p.label}
              </button>
            ))}
          </div>
          {preset && <p className="mb-4 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">{preset.note}</p>}
          <FieldGroup fields={SERVER} values={v} onChange={setV} errors={errors} />
          <div className="mt-4">
            <FieldGroup
              values={v}
              onChange={setV}
              errors={errors}
              fields={[{
                name: "password",
                label: "Password",
                type: "password",
                max: 500,
                help: meta.hasPassword
                  ? meta.passwordReadable
                    ? "A password is saved (stored encrypted, never shown). Leave empty to keep it."
                    : "The saved password can no longer be read (the server secret changed). Enter it again."
                  : "Stored encrypted. It is never shown again after saving.",
                placeholder: meta.hasPassword ? "•••••••• (saved)" : "",
              }]}
            />
            {meta.hasPassword && (
              <label className="mt-2 flex cursor-pointer items-center gap-2 text-xs text-slate-600">
                <input type="checkbox" className="h-3.5 w-3.5 accent-teal" checked={Boolean(v.clearPassword)} onChange={(e) => setV({ ...v, clearPassword: e.target.checked })} />
                Remove the saved password
              </label>
            )}
          </div>
        </Card>

        <Card title="Sender">
          <FieldGroup fields={SENDER} values={v} onChange={setV} errors={errors} />
        </Card>

        <Card title="Who receives website enquiries">
          <FieldGroup fields={RECIPIENTS} values={v} onChange={setV} errors={errors} />
          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="mb-2 text-sm font-medium text-slate-700">Send an email for</p>
            <FieldGroup
              values={events}
              onChange={(x) => setV({ ...v, events: x })}
              errors={errors}
              prefix="events"
              fields={[
                { name: "leads", label: "Contact & enquiry forms", type: "boolean", half: true },
                { name: "proposals", label: "Proposal requests", type: "boolean", half: true },
                { name: "applications", label: "Job applications", type: "boolean", half: true },
              ]}
            />
          </div>
        </Card>

        <Card title="Auto-reply to the visitor (optional)">
          <FieldGroup fields={AUTO} values={auto} onChange={(x) => setV({ ...v, autoReply: x })} errors={errors} prefix="autoReply" />
        </Card>

        <Card title={<span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> Test the settings</span>}>
          <p className="mb-3 text-sm text-slate-600">Connects to the mail server, logs in and sends a test email. It uses what is on this screen, so you can test before saving.</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input type="email" value={testTo} onChange={(e) => setTestTo(e.target.value)} placeholder="Send the test to… (your email)"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 sm:max-w-sm" />
            <Button loading={testing} disabled={!testTo || !v.host} onClick={test}><Send className="h-4 w-4" /> Send test email</Button>
          </div>
          {result && (
            <div className={`mt-3 flex items-start gap-2 rounded-lg px-3 py-2 text-sm ${result.ok ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-700"}`}>
              {result.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0" />}
              <span className="break-words">{result.message}</span>
            </div>
          )}
          {!result && meta.lastTest?.at && (
            <p className="mt-3 text-xs text-slate-500">
              Last test {fmtDate(meta.lastTest.at, true)}{meta.lastTest.by ? ` by ${meta.lastTest.by}` : ""}: {meta.lastTest.ok ? "passed" : "failed"} - {meta.lastTest.message}
            </p>
          )}
          {sendingOff && (
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 ring-1 ring-amber-200">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {result?.ok ? "The test passed, but website forms will still NOT send emails: " : "Note: a passing test does not switch email on. "}
                &ldquo;Send emails using these settings&rdquo; is not ticked. Tick it in <b>Mail server</b> above and click <b>Save</b>.
              </span>
            </div>
          )}
          {dirty && <p className="mt-3 text-xs text-amber-700">Remember to click Save after a successful test.</p>}
        </Card>
      </div>
    </>
  );
}
