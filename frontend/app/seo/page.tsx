import type { Metadata } from "next";
import SeoHero from "../components/seo/SeoHero";
import SeoOpportunity from "../components/seo/SeoOpportunity";
import SeoTransformation from "../components/seo/SeoTransformation";
import SeoProcess from "../components/seo/SeoProcess";
import SeoEcosystem from "../components/seo/SeoEcosystem";
import SeoGrowthFramework from "../components/seo/SeoGrowthFramework";
import WebsiteDevComparison from "../components/shared/WebsiteDevComparison";
import FAQSection from "../components/shared/FAQSection";
import { cmsMetadata } from "../../lib/seo";
import CmsSections from "../../components/cms/CmsSections";
import JsonLd from "../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "SEO Services | ProManage",
  description:
    "Premium SEO services that put your business at the top of search — more visibility, more traffic and more revenue.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/seo", staticMetadata);
}

export default function SeoPage() {
  return (
    <div className="relative overflow-x-clip bg-[#F7F9FA]">
      <JsonLd path="/seo" />
      <CmsSections
        path="/seo"
        sections={[
          ["hero", <SeoHero key="hero" />],
          ["opportunity", <SeoOpportunity key="opportunity" />],
          ["transformation", <SeoTransformation key="transformation" />],
          ["process", <SeoProcess key="process" />],
          ["ecosystem", <SeoEcosystem key="ecosystem" />],
          ["growth-framework", <SeoGrowthFramework key="growth-framework" />],
          ["website-dev-comparison", <WebsiteDevComparison key="website-dev-comparison" />],
          ["faq-section", <FAQSection key="faq-section" />],
        ]}
      />
    </div>
  );
}
