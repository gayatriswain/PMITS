import type { Metadata } from "next";
import { ApplicationsList } from "@/components/admin/Misc";
import { NoAccess, requirePage } from "@/components/admin/Guard";

export const metadata: Metadata = { title: "Job applications" };
export default async function Page() {
  const { allowed } = await requirePage("careers.applications");
  return allowed ? <ApplicationsList /> : <NoAccess />;
}
