import type { Metadata } from "next";
import { PagesList } from "@/components/admin/PagesList";
import { NoAccess, requirePage } from "@/components/admin/Guard";
import { can } from "@/lib/permissions";

export const metadata: Metadata = { title: "Pages" };

export default async function PagesPage() {
  const { user, allowed } = await requirePage(["pages.read", "seo.write"]);
  if (!allowed) return <NoAccess />;
  return <PagesList canCreate={can(user.role, "pages.write")} />;
}
