import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { getPageWithSections } from "@/lib/services/pages";
import { previewUrl } from "@/lib/preview";
import { GLOBAL_PATH } from "@/lib/sections/registry";

type Ctx = { params: Promise<{ id: string }> };

/** Returns a 5-minute signed link that opens the page on the website with drafts visible. */
export const GET = handle(async (req: Request, ctx: Ctx) => {
  await requireUser(req, "pages.read");
  const { page } = await getPageWithSections((await ctx.params).id);
  // the global-sections page has no URL of its own: preview its drafts on the home page
  return ok({ url: previewUrl(page.path === GLOBAL_PATH ? "/" : page.path) });
});
