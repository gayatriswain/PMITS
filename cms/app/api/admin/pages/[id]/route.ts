import { handle, ok, HttpError } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { can } from "@/lib/permissions";
import { deletePage, getPageWithSections, savePageDraft } from "@/lib/services/pages";

type Ctx = { params: Promise<{ id: string }> };

export const GET = handle(async (req: Request, ctx: Ctx) => {
  await requireUser(req, "pages.read");
  return ok(await getPageWithSections((await ctx.params).id));
});

/** Editors save everything; SEO managers may only change the SEO block. */
export const PUT = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req);
  if (!can(user.role, "pages.write") && !can(user.role, "seo.write")) throw new HttpError(403, "You do not have permission to do this.");
  const auto = new URL(req.url).searchParams.get("auto") === "1";
  return ok(await savePageDraft(user, (await ctx.params).id, await req.json().catch(() => ({})), { auto }), "Draft saved");
});

export const DELETE = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req, "pages.delete");
  return ok(await deletePage(user, (await ctx.params).id), "Page deleted");
});
