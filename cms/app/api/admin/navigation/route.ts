import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Navigation } from "@/models";

export const GET = handle(async (req: Request) => {
  await requireUser(req, "pages.read");
  await connectDB();
  return ok(await Navigation.find({}, "key name updatedAt").sort({ key: 1 }).lean());
});
