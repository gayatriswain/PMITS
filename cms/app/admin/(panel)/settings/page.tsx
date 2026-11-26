import type { Metadata } from "next";
import { SettingsEditor } from "@/components/admin/Misc";
import { NoAccess, requirePage } from "@/components/admin/Guard";

export const metadata: Metadata = { title: "Settings" };
export default async function Page() {
  const { allowed } = await requirePage("settings.write");
  return allowed ? <SettingsEditor /> : <NoAccess />;
}
