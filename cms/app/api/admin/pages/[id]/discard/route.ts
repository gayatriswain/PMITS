import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { discardDraft } from "@/lib/services/pages";

type Ctx = { params: Promise<{ id: string }> };

export const POST = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req, "pages.write");
  return ok(await discardDraft(user, (await ctx.params).id), "Draft discarded");
});
