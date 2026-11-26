/**
 * Client helper for website enquiry forms. Posts to the CMS `/api/forms` endpoint, which stores
 * the enquiry in MongoDB (visible under Admin → Leads) and emails the team.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type EnquiryPayload = {
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  /** Extra answers that don't fit the standard fields (shown in the admin lead view). */
  details?: Record<string, string>;
  /** Honeypot: must stay empty for real visitors. */
  hp?: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

function utm(): Record<string, string> | undefined {
  if (typeof window === "undefined") return undefined;
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const v = p.get(k);
    if (v) out[k.slice(4)] = v.slice(0, 200);
  }
  return Object.keys(out).length ? out : undefined;
}

export async function submitEnquiry(formType: string, payload: EnquiryPayload): Promise<SubmitResult> {
  const details = payload.details
    ? Object.fromEntries(Object.entries(payload.details).filter(([, v]) => v && v.trim()).map(([k, v]) => [k, v.slice(0, 1000)]))
    : undefined;
  const body = {
    ...payload,
    details: details && Object.keys(details).length ? details : undefined,
    formType,
    source: typeof document !== "undefined" ? document.title.slice(0, 200) : undefined,
    sourceUrl: typeof window !== "undefined" ? window.location.href.slice(0, 500) : undefined,
    utm: utm(),
  };
  try {
    const res = await fetch(`${API_URL}/api/forms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => ({}))) as { message?: string; error?: string };
    if (!res.ok) return { ok: false, error: json.error || json.message || "Something went wrong. Please try again." };
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not reach the server. Please check your connection and try again." };
  }
}

/** After a successful enquiry, send the visitor to the thank-you page (keeps the form name for analytics). */
export function goToThankYou(form?: string) {
  if (typeof window === "undefined") return;
  const slug = (form ?? "").toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  // full navigation on purpose: works the same from every form component (no router hook needed)
  window.location.assign(slug ? `/thank-you/${slug}` : "/thank-you");
}
