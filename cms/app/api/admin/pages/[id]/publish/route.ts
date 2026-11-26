import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { publishPage } from "@/lib/services/pages";

type Ctx = { params: Promise<{ id: string }> };

export const POST = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req, "pages.publish");
  return ok(await publishPage(user, (await ctx.params).id), "Published. The live site updates within seconds.");
});
