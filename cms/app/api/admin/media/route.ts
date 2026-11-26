import { handle, ok, HttpError } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { listMedia, uploadMedia } from "@/lib/services/media";

export const GET = handle(async (req: Request) => {
  await requireUser(req, "media.read");
  return ok(await listMedia(new URL(req.url)));
});

export const POST = handle(async (req: Request) => {
  const user = await requireUser(req, "media.write");
  const form = await req.formData().catch(() => null);
  if (!form) throw new HttpError(422, "Send the file as multipart/form-data");
  const files = form.getAll("file").filter((f): f is File => typeof f === "object" && f !== null && "arrayBuffer" in f);
  if (!files.length) throw new HttpError(422, "No file received");
  if (files.length > 10) throw new HttpError(422, "Upload at most 10 files at once");
  const folder = String(form.get("folder") || "") || undefined;
  const alt = String(form.get("alt") || "") || undefined;
  const items = [];
  for (const f of files) items.push(await uploadMedia(user, f, { folder, alt }));
  return ok(items, `${items.length} file(s) uploaded`, 201);
});
