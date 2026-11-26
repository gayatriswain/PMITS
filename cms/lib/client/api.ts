"use client";

export type ApiResult<T> = { success: true; message: string; data: T } | { success: false; message: string; errors?: Record<string, string | string[]> };

export class ApiError extends Error {
  constructor(public status: number, message: string, public errors?: Record<string, string | string[]>) {
    super(message);
  }
}

/** JSON fetch against this CMS. Throws ApiError with server message + field errors. */
export async function api<T = unknown>(url: string, init: RequestInit & { json?: unknown } = {}): Promise<T> {
  const { json, headers, ...rest } = init;
  const res = await fetch(url, {
    ...rest,
    headers: { ...(json !== undefined ? { "Content-Type": "application/json" } : {}), ...headers },
    body: json !== undefined ? JSON.stringify(json) : rest.body,
    credentials: "same-origin",
    cache: "no-store",
  });
  if (res.status === 401 && typeof window !== "undefined" && !url.startsWith("/api/auth/")) {
    window.location.href = `/admin/login?next=${encodeURIComponent(window.location.pathname)}`;
  }
  const body = (await res.json().catch(() => null)) as ApiResult<T> | null;
  if (!res.ok || !body || !body.success) {
    throw new ApiError(res.status, body?.message || `Request failed (${res.status})`, body && !body.success ? body.errors : undefined);
  }
  return body.data;
}

export const qs = (o: Record<string, string | number | undefined | null | boolean>) => {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(o)) if (v !== undefined && v !== null && v !== "" && v !== false) p.set(k, String(v));
  const s = p.toString();
  return s ? `?${s}` : "";
};
