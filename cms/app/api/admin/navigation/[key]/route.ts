import { handle, ok, HttpError } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Navigation } from "@/models";
import { navigationSchema } from "@/lib/validation/schemas";
import { logActivity } from "@/lib/activity";
import { revalidateFrontend, tags } from "@/lib/revalidate";

type Ctx = { params: Promise<{ key: string }> };
const KEY = /^[a-z0-9-]{2,60}$/;

export const GET = handle(async (req: Request, ctx: Ctx) => {
  await requireUser(req, "pages.read");
  const { key } = await ctx.params;
  if (!KEY.test(key)) throw new HttpError(400, "Invalid menu key");
  await connectDB();
  const doc = await Navigation.findOne({ key }).lean();
  if (!doc) throw new HttpError(404, "Menu not found");
  return ok(doc);
});

/** Saving a menu publishes it immediately (menus have no draft state). */
export const PUT = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req, "navigation.write");
  const { key } = await ctx.params;
  if (!KEY.test(key)) throw new HttpError(400, "Invalid menu key");
  const data = navigationSchema.parse(await req.json().catch(() => ({})));
  await connectDB();
  const doc = await Navigation.findOneAndUpdate({ key }, { $set: { name: data.name, items: data.items } }, { new: true, upsert: true, runValidators: true }).lean();
  logActivity(user, "update", "navigation", key, `Updated menu "${data.name}"`);
  await revalidateFrontend([tags.nav(key)]);
  return ok(doc, "Menu saved and published");
});
