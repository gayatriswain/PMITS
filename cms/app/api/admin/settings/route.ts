import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { WebsiteSettings } from "@/models";
import { settingsSchema } from "@/lib/validation/schemas";
import { logActivity } from "@/lib/activity";
import { revalidateFrontend, tags } from "@/lib/revalidate";

export const GET = handle(async (req: Request) => {
  await requireUser(req, "dashboard.view");
  await connectDB();
  const doc = (await WebsiteSettings.findOne({ key: "global" }).lean()) ?? (await WebsiteSettings.create({ key: "global" })).toObject();
  return ok(doc);
});

export const PUT = handle(async (req: Request) => {
  const user = await requireUser(req, "settings.write");
  const data = settingsSchema.parse(await req.json().catch(() => ({})));
  await connectDB();
  const doc = await WebsiteSettings.findOneAndUpdate({ key: "global" }, { $set: data }, { new: true, upsert: true, runValidators: true }).lean();
  logActivity(user, "update", "settings", "global", "Updated website settings");
  await revalidateFrontend([tags.settings, tags.pages]);
  return ok(doc, "Settings saved");
});
