import "server-only";
import { connectDB } from "./mongodb";
import { RateLimit } from "@/models";
import { HttpError } from "./api";

/**
 * Fixed-window rate limiter stored in MongoDB (works across multiple server instances).
 * Throws 429 when `limit` is exceeded within `windowSec`.
 */
export async function rateLimit(key: string, limit: number, windowSec: number) {
  await connectDB();
  const now = Date.now();
  const bucket = Math.floor(now / (windowSec * 1000));
  const id = `${key}:${bucket}`;
  const doc = await RateLimit.findOneAndUpdate(
    { key: id },
    { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date((bucket + 1) * windowSec * 1000) } },
    { upsert: true, new: true },
  ).lean();
  if (doc && doc.count > limit) {
    const retry = Math.max(1, Math.ceil(((bucket + 1) * windowSec * 1000 - now) / 1000));
    throw new HttpError(429, `Too many requests. Please try again in ${retry} seconds.`);
  }
}
