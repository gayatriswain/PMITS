import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { deleteMedia, updateMedia } from "@/lib/services/media";

type Ctx = { params: Promise<{ id: string }> };

export const PATCH = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req, "media.write");
  return ok(await updateMedia(user, (await ctx.params).id, await req.json().catch(() => ({}))), "Details saved");
});

export const DELETE = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req, "media.delete");
  const force = new URL(req.url).searchParams.get("force") === "1";
  return ok(await deleteMedia(user, (await ctx.params).id, force), "File deleted");
});
