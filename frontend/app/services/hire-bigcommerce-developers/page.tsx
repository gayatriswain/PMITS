import type { Metadata } from "next";
import { MagentoStyles } from "../../components/MagentoShared";
import BigCommerceHero from "../../components/BigCommerceHero";
import BigCommerceTrusted from "../../components/BigCommerceTrusted";
import BigCommerceFeatures from "../../components/BigCommerceFeatures";
import BigCommerceAllInOne from "../../components/BigCommerceAllInOne";
import BigCommerceBenefits from "../../components/BigCommerceBenefits";
import BigCommerceGrowth from "../../components/BigCommerceGrowth";
import BigCommerceImpact from "../../components/BigCommerceImpact";
import BigCommerceContact from "../../components/BigCommerceContact";

export const metadata: Metadata = {
  title: "Hire BigCommerce Developers | ProManage IT Solution",
  description:
    "End-to-end BigCommerce development: custom storefronts, theme customization, apps & integrations, checkout, performance and ongoing support from dedicated BigCommerce developers.",
};

export default function HireBigCommerceDevelopersPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-white">
      {/* shared keyframes (magFlow, magPing, magSpin, bcMarquee, …) */}
      <MagentoStyles />
      <BigCommerceHero />
      <BigCommerceTrusted />
      <BigCommerceFeatures />
      <BigCommerceAllInOne />
      <BigCommerceBenefits />
      <BigCommerceGrowth />
      <BigCommerceImpact />
      <BigCommerceContact />
    </main>
  );
}
