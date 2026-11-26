import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogHero from "../../../components/blog/BlogHero";
import BlogGrid from "../../../components/blog/BlogGrid";
import { categorySlug, cmsPosts, findCategory } from "../../../../lib/blog";
import CmsSections from "../../../../components/cms/CmsSections";

type Props = { params: Promise<{ category: string }> };

/** /blog/category/<slug>: a crawlable, indexable listing per topic (replaces a client-only filter). */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const posts = await cmsPosts();
  const name = await findCategory(category, posts);
  if (!name) return { title: "Category not found | ProManage", robots: { index: false } };
  // an empty topic is thin content: keep it out of Google until it has a published post
  const hasPosts = posts.some((p) => categorySlug(p.category) === category);
  const title = `${name} Insights & Articles | ProManage Blog`;
  const description = `Practical ${name} articles, guides and expert insights from the ProManage team.`;
  const url = `/blog/category/${category}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website" }, ...(hasPosts ? {} : { robots: { index: false, follow: true } }) };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  const posts = await cmsPosts();
  const name = await findCategory(category, posts);
  if (!name) notFound();
  return (
    <main className="min-h-screen bg-[#fafdfc]">
      {/* same hero/grid content as /blog (edited under Pages → Blog), filtered to this category */}
      <CmsSections
        path="/blog"
        sections={[
          ["hero", <BlogHero key="hero" />],
          ["grid", <BlogGrid key="grid" posts={posts} activeCategory={name} />],
        ]}
      />
    </main>
  );
}
