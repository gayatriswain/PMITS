import "server-only";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import mongoose from "mongoose";

/** Consistent JSON envelopes: { success, message, data } / { success:false, message, errors }. */
export function ok<T>(data: T, message = "OK", status = 200, headers?: HeadersInit) {
  return NextResponse.json({ success: true, message, data }, { status, headers });
}

export function fail(message: string, status = 400, errors?: Record<string, string | string[]>, headers?: HeadersInit) {
  return NextResponse.json({ success: false, message, ...(errors ? { errors } : {}) }, { status, headers });
}

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: Record<string, string | string[]>,
  ) {
    super(message);
  }
}

export function zodErrors(err: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".") || "_";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/** Wrap a route handler so thrown HttpError / ZodError / Mongo errors become proper responses. */
export function handle<A extends unknown[]>(fn: (...args: A) => Promise<Response>) {
  return async (...args: A): Promise<Response> => {
    try {
      return await fn(...args);
    } catch (err) {
      if (err instanceof HttpError) return fail(err.message, err.status, err.errors);
      if (err instanceof ZodError) return fail("Validation failed", 422, zodErrors(err));
      if (err instanceof mongoose.Error.ValidationError) {
        const errors: Record<string, string> = {};
        for (const [k, v] of Object.entries(err.errors)) errors[k] = v.message;
        return fail("Validation failed", 422, errors);
      }
      if (err instanceof mongoose.Error.CastError) return fail("Invalid identifier", 400);
      if (typeof err === "object" && err && "code" in err && (err as { code: number }).code === 11000) {
        const key = Object.keys((err as { keyValue?: object }).keyValue ?? {})[0] ?? "field";
        return fail(`A record with this ${key} already exists`, 409, { [key]: "Must be unique" });
      }
      console.error("[api] unhandled error", err);
      return fail("Something went wrong. Please try again.", 500);
    }
  };
}

/** Parse ?page=&limit=&q=&sort= safely. */
export function listParams(url: URL, defaults: { limit?: number; sort?: string } = {}) {
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit")) || defaults.limit || 20));
  const q = (url.searchParams.get("q") || "").trim().slice(0, 100);
  const rawSort = url.searchParams.get("sort") || defaults.sort || "-createdAt";
  const sort = /^-?[a-zA-Z0-9_.]{1,40}$/.test(rawSort) ? rawSort : "-createdAt";
  return { page, limit, skip: (page - 1) * limit, q, sort };
}

export function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
