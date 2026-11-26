import "server-only";
import mongoose from "mongoose";
import { env } from "./env";

/**
 * One shared Mongoose connection per server process.
 * The promise is cached on globalThis so Next.js dev hot-reload does not open a new connection per edit.
 */
type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
const g = globalThis as unknown as { __pmMongoose?: Cache };
const cache: Cache = g.__pmMongoose ?? { conn: null, promise: null };
g.__pmMongoose = cache;

// Unknown fields in filters are dropped. NoSQL-injection safety comes from never passing raw
// request objects into queries: bodies are parsed by Zod into plain strings/numbers and query-string
// values are always strings checked against allow-list regexes before use.
mongoose.set("strictQuery", true);
mongoose.set("sanitizeFilter", false);

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(env.mongodbUri, { bufferCommands: false, maxPoolSize: 10, serverSelectionTimeoutMS: 8000 })
      .catch((err) => {
        cache.promise = null;
        throw err;
      });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
