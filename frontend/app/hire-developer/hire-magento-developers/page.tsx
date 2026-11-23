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

export const metadata: Metadata = {
  title: "Hire Magento Developers | ProManage IT Solution",
  description:
    "Hire dedicated, certified Magento developers for store development, customization, extensions, integrations, upgrades, performance optimization and ongoing support.",
};

export default function HireMagentoDevelopersPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-white">
      <MagentoStyles />
      <MagentoHero />
      <MagentoServices />
      <MagentoIndustry />
      <MagentoExpertise />
      <MagentoWhyUs />
      <MagentoProcess />
      <MagentoEngage />
      <MagentoOutcome />
      <MagentoProposal />
    </main>
  );
}
