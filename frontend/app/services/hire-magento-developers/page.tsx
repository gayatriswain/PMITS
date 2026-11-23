import type { Metadata } from "next";
import { MagentoStyles } from "../../components/MagentoShared";
import MagentoHero from "../../components/MagentoHero";
import MagentoServices from "../../components/MagentoServices";
import MagentoIndustry from "../../components/MagentoIndustry";
import MagentoExpertise from "../../components/MagentoExpertise";
import MagentoWhyUs from "../../components/MagentoWhyUs";
import MagentoProcess from "../../components/MagentoProcess";
import MagentoEngage from "../../components/MagentoEngage";
import MagentoOutcome from "../../components/MagentoOutcome";
import MagentoProposal from "../../components/MagentoProposal";

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
