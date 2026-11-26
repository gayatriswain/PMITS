import type { Metadata } from "next";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { NoAccess, requirePage } from "@/components/admin/Guard";
import { can } from "@/lib/permissions";

export const metadata: Metadata = { title: "Media library" };
export default async function Page() {
  const { user, allowed } = await requirePage("media.read");
  return allowed ? <MediaLibrary canWrite={can(user.role, "media.write")} canDelete={can(user.role, "media.delete")} /> : <NoAccess />;
}
