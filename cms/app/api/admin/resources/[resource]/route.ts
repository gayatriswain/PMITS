import { handle, ok, HttpError } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { getResource } from "@/lib/services/resources";
import { createItem, listItems } from "@/lib/services/crud";

type Ctx = { params: Promise<{ resource: string }> };

async function cfgFrom(ctx: Ctx) {
  const { resource } = await ctx.params;
  const cfg = getResource(resource);
  if (!cfg) throw new HttpError(404, "Unknown resource");
  return cfg;
}

export const GET = handle(async (req: Request, ctx: Ctx) => {
  const cfg = await cfgFrom(ctx);
  await requireUser(req, cfg.perms.read);
  return ok(await listItems(cfg, new URL(req.url)));
});

export const POST = handle(async (req: Request, ctx: Ctx) => {
  const cfg = await cfgFrom(ctx);
  const user = await requireUser(req, cfg.perms.write);
  const doc = await createItem(cfg, user, await req.json().catch(() => ({})));
  return ok(doc, `${cfg.label} item created`, 201);
});
