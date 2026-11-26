import type { Metadata } from "next";
import { MagentoStyles } from "../../components/shared/MagentoShared";
import MagentoHero from "../../components/hire-magento-developers/MagentoHero";
import MagentoServices from "../../components/hire-magento-developers/MagentoServices";
import MagentoIndustry from "../../components/hire-magento-developers/MagentoIndustry";
import MagentoExpertise from "../../components/hire-magento-developers/MagentoExpertise";
import MagentoWhyUs from "../../components/hire-magento-developers/MagentoWhyUs";
import MagentoProcess from "../../components/hire-magento-developers/MagentoProcess";
import MagentoEngage from "../../components/hire-magento-developers/MagentoEngage";
import MagentoOutcome from "../../components/hire-magento-developers/MagentoOutcome";
import MagentoProposal from "../../components/hire-magento-developers/MagentoProposal";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Hire Magento Developers | ProManage IT Solution",
  description:
    "Hire dedicated, certified Magento developers for store development, customization, extensions, integrations, upgrades, performance optimization and ongoing support.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/hire-developer/hire-magento-developers", staticMetadata);
}

export default function HireMagentoDevelopersPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-white">
      <JsonLd path="/hire-developer/hire-magento-developers" />
      <MagentoStyles />
      <CmsSections
        path="/hire-developer/hire-magento-developers"
        sections={[
          ["hero", <MagentoHero key="hero" />],
          ["services", <MagentoServices key="services" />],
          ["industry", <MagentoIndustry key="industry" />],
          ["expertise", <MagentoExpertise key="expertise" />],
          ["why-us", <MagentoWhyUs key="why-us" />],
          ["process", <MagentoProcess key="process" />],
          ["engage", <MagentoEngage key="engage" />],
          ["outcome", <MagentoOutcome key="outcome" />],
          ["proposal", <MagentoProposal key="proposal" />],
        ]}
      />
    </main>
  );
}
