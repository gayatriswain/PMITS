import type { Metadata } from "next";
import { NavigationEditor } from "@/components/admin/Misc";
import { NoAccess, requirePage } from "@/components/admin/Guard";

export const metadata: Metadata = { title: "Navigation" };
export default async function Page() {
  const { allowed } = await requirePage("navigation.write");
  return allowed ? <NavigationEditor /> : <NoAccess />;
}
