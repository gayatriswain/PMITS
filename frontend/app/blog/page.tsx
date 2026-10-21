import type { Metadata } from "next";
import BlogHero from "../components/BlogHero";
import BlogInsights from "../components/BlogInsights";
import BlogGrid from "../components/BlogGrid";

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
