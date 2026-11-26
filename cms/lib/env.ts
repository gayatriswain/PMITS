import "server-only";

/** Typed, validated access to server environment variables. Never import this from client components. */
function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required environment variable ${name} (see .env.example)`);
  return v;
}

export const env = {
  get mongodbUri() {
    return required("MONGODB_URI");
  },
  /** Used to sign preview/revalidation requests and as a pepper for token hashes. Min 32 chars. */
  get authSecret() {
    const s = required("AUTH_SECRET");
    if (s.length < 32) throw new Error("AUTH_SECRET must be at least 32 characters");
    return s;
  },
  appUrl: (process.env.APP_URL || "http://localhost:4000").replace(/\/$/, ""),
  frontendUrl: (process.env.FRONTEND_URL || "http://localhost:3000").replace(/\/$/, ""),
  /** Shared secret the frontend uses for /api/revalidate and draft preview. */
  get revalidateSecret() {
    return required("REVALIDATE_SECRET");
  },
  mediaProvider: (process.env.MEDIA_STORAGE_PROVIDER || "local") as "local" | "cloudinary",
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
  isProd: process.env.NODE_ENV === "production",
  sessionHours: Number(process.env.SESSION_HOURS || 8),
};
