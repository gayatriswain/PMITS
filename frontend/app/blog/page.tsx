import type { Metadata } from "next";
import BlogHero from "../components/blog/BlogHero";
import BlogInsights from "../components/blog/BlogInsights";
import BlogGrid from "../components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Blog & Insights | ProManage",
  description: "Practical insights on SEO, AI, ecommerce, websites, and digital growth.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#fafdfc]">
      <BlogHero />
      <BlogInsights />
      <BlogGrid />
    </main>
  );
}
