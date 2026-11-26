import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageEditor } from "@/components/admin/PageEditor";
import { NoAccess, requirePage } from "@/components/admin/Guard";
import { can } from "@/lib/permissions";
import { connectDB } from "@/lib/mongodb";
import { Page } from "@/models";
import { GLOBAL_PAGE, GLOBAL_PATH } from "@/lib/sections/registry";

export const metadata: Metadata = { title: "Global sections" };

/**
 * /admin/global            → shared sections that are not sliders (Why choose us, CTA, comparison)
 * /admin/global/<key>      → one slider/carousel on its own (client logos, featured projects, client stories)
 */
export default async function GlobalSectionsPage({ params }: { params: Promise<{ key?: string[] }> }) {
  const { key } = await params;
  const { user, allowed } = await requirePage("pages.read");
  if (!allowed) return <NoAccess />;
  const all = GLOBAL_PAGE?.sections ?? [];
  const one = key?.length ? all.find((s) => s.key === key[0]) : null;
  if (key?.length && (key.length > 1 || !one)) notFound();

  await connectDB();
  const page = await Page.findOne({ path: GLOBAL_PATH }, "_id").lean<{ _id: unknown }>();
  if (!page)
    return (
      <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-200">
        Global sections are not set up yet. Run <code>npm run registry</code> and <code>npm run seed</code> in the cms folder.
      </p>
    );

  const scope = one
    ? { title: one.label, crumb: one.label, only: [one.key], description: "Slider shown on several pages - edit it once here." }
    : {
        title: "Global sections",
        crumb: "Global sections",
        only: all.filter((s) => !s.carousel).map((s) => s.key),
        description: "Sections that look the same on every page. FAQs stay on each page.",
      };
  return (
    <PageEditor
      key={one?.key ?? "all"}
      id={String(page._id)}
      scope={scope}
      perms={{ write: can(user.role, "pages.write"), publish: can(user.role, "pages.publish"), delete: false, seo: false }}
    />
  );
}
