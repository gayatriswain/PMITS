import type { Metadata } from "next";
import AppDevHero from "../../components/app-development/AppDevHero";
import AppDevShowcase from "../../components/app-development/AppDevShowcase";
import AppDevServices from "../../components/app-development/AppDevServices";
import AppDevProcess from "../../components/app-development/AppDevProcess";
import WebsiteDevComparison from "../../components/shared/WebsiteDevComparison";
import WebsiteDevStrategyCta from "../../components/shared/WebsiteDevStrategyCta";
import FAQSection from "../../components/shared/FAQSection";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "App Development | ProManage",
  description:
    "We design and develop intuitive, high-performance mobile apps that engage users, streamline operations and help your business grow.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/web-software/app-development", staticMetadata);
}

export default function AppDevelopmentPage() {
  return (
    <div className="relative overflow-x-clip">
      <JsonLd path="/web-software/app-development" />
      <CmsSections
        path="/web-software/app-development"
        sections={[
          ["hero", <AppDevHero key="hero" />],
          ["showcase", <AppDevShowcase key="showcase" />],
          ["services", <AppDevServices key="services" />],
          ["process", <AppDevProcess key="process" />],
          ["website-dev-comparison", <WebsiteDevComparison key="website-dev-comparison" />],
          ["website-dev-strategy-cta", <WebsiteDevStrategyCta key="website-dev-strategy-cta" />],
          ["faq-section", <FAQSection key="faq-section" />],
        ]}
      />
    </div>
  );
}
