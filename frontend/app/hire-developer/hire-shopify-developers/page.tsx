import type { Metadata } from "next";
import HireShopifyHero from "@/app/components/hire-shopify-developers/HireShopifyHero";
import ShopifyExpertise from "@/app/components/hire-shopify-developers/ShopifyExpertise";
import HireShopifySolutions from "@/app/components/hire-shopify-developers/HireShopifySolutions";
import HireShopifyExpect from "@/app/components/hire-shopify-developers/HireShopifyExpect";
import HireShopifyContact from "@/app/components/hire-shopify-developers/HireShopifyContact";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Hire Shopify Developers | ProManage",
  description:
    "Power up your online business using the skills of industry-certified Shopify developers having diverse experiences and deep eCommerce insights.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/hire-developer/hire-shopify-developers", staticMetadata);
}

export default function HireShopifyDevelopersPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      <JsonLd path="/hire-developer/hire-shopify-developers" />
      <CmsSections
        path="/hire-developer/hire-shopify-developers"
        sections={[
          ["hero", <HireShopifyHero key="hero" />],
          ["shopify-expertise", <ShopifyExpertise key="shopify-expertise" />],
          ["what-to-expect", <HireShopifyExpect key="what-to-expect" />],
          ["solutions", <HireShopifySolutions key="solutions" />],
          ["contact", <HireShopifyContact key="contact" />],
        ]}
      />

      {/* Solutions: "Totally Customized and Attractive Shopify Solutions" with the bag on a podium, 8 feature cards and CTAs */}

      {/* Contact: "Unzip Possibilities. Build Success." on the zipper artwork with the "Get My Free Proposal" form (id="contact") */}
    </main>
  );
}
