import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { getMailSettings, updateMailSettings } from "@/lib/services/mail";

export const GET = handle(async (req: Request) => {
  await requireUser(req, "settings.write");
  return ok(await getMailSettings());
});

export const PUT = handle(async (req: Request) => {
  const user = await requireUser(req, "settings.write");
  return ok(await updateMailSettings(user, await req.json().catch(() => ({}))), "Email settings saved");
});
