import { handle, ok, HttpError } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { getResource } from "@/lib/services/resources";
import { deleteItem, getItem, updateItem } from "@/lib/services/crud";

type Ctx = { params: Promise<{ resource: string; id: string }> };

async function resolve(ctx: Ctx) {
  const { resource, id } = await ctx.params;
  const cfg = getResource(resource);
  if (!cfg) throw new HttpError(404, "Unknown resource");
  return { cfg, id };
}

export const GET = handle(async (req: Request, ctx: Ctx) => {
  const { cfg, id } = await resolve(ctx);
  await requireUser(req, cfg.perms.read);
  return ok(await getItem(cfg, id));
});

export const PUT = handle(async (req: Request, ctx: Ctx) => {
  const { cfg, id } = await resolve(ctx);
  const user = await requireUser(req, cfg.perms.write);
  const doc = await updateItem(cfg, user, id, await req.json().catch(() => ({})));
  return ok(doc, `${cfg.label} item updated`);
});

export const DELETE = handle(async (req: Request, ctx: Ctx) => {
  const { cfg, id } = await resolve(ctx);
  const user = await requireUser(req, cfg.perms.delete);
  return ok(await deleteItem(cfg, user, id), `${cfg.label} item deleted`);
});
