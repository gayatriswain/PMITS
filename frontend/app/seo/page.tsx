import type { Metadata } from "next";
import SeoHero from "../components/SeoHero";
import SeoOpportunity from "../components/SeoOpportunity";
import SeoTransformation from "../components/SeoTransformation";
import SeoProcess from "../components/SeoProcess";
import SeoEcosystem from "../components/SeoEcosystem";
import SeoGrowthFramework from "../components/SeoGrowthFramework";
import WebsiteDevComparison from "../components/WebsiteDevComparison";
import FAQSection from "../components/FAQSection";

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
