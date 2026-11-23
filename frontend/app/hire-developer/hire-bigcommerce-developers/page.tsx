import type { Metadata } from "next";
import { MagentoStyles } from "../../components/shared/MagentoShared";
import BigCommerceHero from "../../components/hire-bigcommerce-developers/BigCommerceHero";
import BigCommerceTrusted from "../../components/hire-bigcommerce-developers/BigCommerceTrusted";
import BigCommerceFeatures from "../../components/hire-bigcommerce-developers/BigCommerceFeatures";
import BigCommerceAllInOne from "../../components/hire-bigcommerce-developers/BigCommerceAllInOne";
import BigCommerceBenefits from "../../components/hire-bigcommerce-developers/BigCommerceBenefits";
import BigCommerceGrowth from "../../components/hire-bigcommerce-developers/BigCommerceGrowth";
import BigCommerceImpact from "../../components/hire-bigcommerce-developers/BigCommerceImpact";
import BigCommerceContact from "../../components/hire-bigcommerce-developers/BigCommerceContact";

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
