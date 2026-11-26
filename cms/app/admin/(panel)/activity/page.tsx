import type { Metadata } from "next";
import { ActivityLog } from "@/components/admin/ActivityLog";
import { NoAccess, requirePage } from "@/components/admin/Guard";

export const metadata: Metadata = { title: "Activity log" };
export default async function Page() {
  const { allowed } = await requirePage("activity.read");
  return allowed ? <ActivityLog /> : <NoAccess />;
}
