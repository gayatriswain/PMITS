import type { Metadata } from "next";
import BlogHero from "../components/blog/BlogHero";
import BlogInsights from "../components/blog/BlogInsights";
import BlogGrid from "../components/blog/BlogGrid";
import { cmsMetadata } from "../../lib/seo";
import { cmsPosts } from "../../lib/blog";
import CmsSections from "../../components/cms/CmsSections";
import JsonLd from "../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Blog & Insights | ProManage",
  description: "Practical insights on SEO, AI, ecommerce, websites, and digital growth.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/blog", staticMetadata);
}

export default async function BlogPage() {
  const posts = await cmsPosts();
  return (
    <main className="min-h-screen bg-[#fafdfc]">
      <JsonLd path="/blog" />
      <CmsSections
        path="/blog"
        sections={[
          ["hero", <BlogHero key="hero" />],
          ["insights", <BlogInsights key="insights" />],
          ["grid", <BlogGrid key="grid" posts={posts} />],
        ]}
      />
    </main>
  );
}
