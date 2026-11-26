import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { createPage, listPages } from "@/lib/services/pages";

export const GET = handle(async (req: Request) => {
  await requireUser(req, "pages.read");
  return ok(await listPages(new URL(req.url)));
});

export const POST = handle(async (req: Request) => {
  const user = await requireUser(req, "pages.write");
  return ok(await createPage(user, await req.json().catch(() => ({}))), "Page created as draft", 201);
});
