import { readFile } from "node:fs/promises";
import { isValidObjectId } from "mongoose";
import { handle, HttpError } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Media } from "@/models";
import { privateFilePath } from "@/lib/services/media";

type Ctx = { params: Promise<{ id: string }> };

/** Private uploads (CVs) are only readable by signed-in staff allowed to see applications. */
export const GET = handle(async (req: Request, ctx: Ctx) => {
  await requireUser(req, "careers.applications");
  const { id } = await ctx.params;
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  await connectDB();
  const doc = await Media.findById(id).lean();
  const p = doc?.storageKey ? privateFilePath(doc.storageKey) : null;
  if (!doc || !p) throw new HttpError(404, "File not found");
  const buf = await readFile(p);
  const name = (doc.originalName || doc.filename).replace(/[^\w.\- ]/g, "_");
  return new Response(new Uint8Array(buf), {
    headers: {
      "Content-Type": doc.mimeType,
      "Content-Disposition": `attachment; filename="${name}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
});
