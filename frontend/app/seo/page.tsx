import type { Metadata } from "next";
import SeoHero from "../components/seo/SeoHero";
import SeoOpportunity from "../components/seo/SeoOpportunity";
import SeoTransformation from "../components/seo/SeoTransformation";
import SeoProcess from "../components/seo/SeoProcess";
import SeoEcosystem from "../components/seo/SeoEcosystem";
import SeoGrowthFramework from "../components/seo/SeoGrowthFramework";
import WebsiteDevComparison from "../components/shared/WebsiteDevComparison";
import FAQSection from "../components/shared/FAQSection";

export const metadata: Metadata = {
  title: "SEO Services | ProManage",
  description:
    "Premium SEO services that put your business at the top of search — more visibility, more traffic and more revenue.",
};

export default function SeoPage() {
  return (
    <div className="relative overflow-x-clip bg-[#F7F9FA]">
      <SeoHero />
      <SeoOpportunity />
      <SeoTransformation />
      <SeoProcess />
      <SeoEcosystem />
      <SeoGrowthFramework />
      <WebsiteDevComparison />
      <FAQSection />
    </div>
  );
}
