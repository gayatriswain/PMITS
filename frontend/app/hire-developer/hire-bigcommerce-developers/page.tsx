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
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Hire BigCommerce Developers | ProManage IT Solution",
  description:
    "End-to-end BigCommerce development: custom storefronts, theme customization, apps & integrations, checkout, performance and ongoing support from dedicated BigCommerce developers.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/hire-developer/hire-bigcommerce-developers", staticMetadata);
}

export default function HireBigCommerceDevelopersPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-white">
      <JsonLd path="/hire-developer/hire-bigcommerce-developers" />
      {/* shared keyframes (magFlow, magPing, magSpin, bcMarquee, …) */}
      <MagentoStyles />
      <CmsSections
        path="/hire-developer/hire-bigcommerce-developers"
        sections={[
          ["hero", <BigCommerceHero key="hero" />],
          ["trusted", <BigCommerceTrusted key="trusted" />],
          ["features", <BigCommerceFeatures key="features" />],
          ["all-in-one", <BigCommerceAllInOne key="all-in-one" />],
          ["benefits", <BigCommerceBenefits key="benefits" />],
          ["growth", <BigCommerceGrowth key="growth" />],
          ["impact", <BigCommerceImpact key="impact" />],
          ["contact", <BigCommerceContact key="contact" />],
        ]}
      />
    </main>
  );
}
