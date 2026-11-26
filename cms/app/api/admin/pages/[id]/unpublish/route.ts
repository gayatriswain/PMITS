import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { unpublishPage } from "@/lib/services/pages";

type Ctx = { params: Promise<{ id: string }> };

export const POST = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req, "pages.publish");
  return ok(await unpublishPage(user, (await ctx.params).id), "Page unpublished");
});
