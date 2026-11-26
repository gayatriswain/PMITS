import type { Metadata } from "next";
import { SeoOverview } from "@/components/admin/Misc";
import { NoAccess, requirePage } from "@/components/admin/Guard";

export const metadata: Metadata = { title: "SEO" };
export default async function Page() {
  const { allowed } = await requirePage(["pages.read", "seo.write"]);
  return allowed ? <SeoOverview /> : <NoAccess />;
}
