/** Shared DB bootstrap for CLI scripts (they run outside Next.js, so no "server-only" imports). */
import { config } from "dotenv";
import path from "node:path";
import mongoose from "mongoose";

config({ path: path.resolve(process.cwd(), ".env.local") });
config({ path: path.resolve(process.cwd(), ".env") });

export async function connect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (cms/.env.local)");
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  return mongoose;
}

export async function disconnect() {
  await mongoose.disconnect();
}
