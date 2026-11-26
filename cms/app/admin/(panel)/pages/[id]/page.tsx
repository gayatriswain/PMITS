import { notFound } from "next/navigation";
import { PageEditor } from "@/components/admin/PageEditor";
import { NoAccess, requirePage } from "@/components/admin/Guard";
import { can } from "@/lib/permissions";
import { GLOBAL_PAGE } from "@/lib/sections/registry";

/** Shared sections are edited on the global screens, not per page. */
const SHARED_LINKS = Object.fromEntries((GLOBAL_PAGE?.sections ?? []).map((s) => [s.component, s.carousel ? `/admin/global/${s.key}` : "/admin/global"]));

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[a-f0-9]{24}$/i.test(id)) notFound();
  const { user, allowed } = await requirePage(["pages.read", "seo.write"]);
  if (!allowed) return <NoAccess />;
  return (
    <PageEditor
      id={id}
      sharedLinks={SHARED_LINKS}
      perms={{ write: can(user.role, "pages.write"), publish: can(user.role, "pages.publish"), delete: can(user.role, "pages.delete"), seo: can(user.role, "seo.write") }}
    />
  );
}
