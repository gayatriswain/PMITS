import type { Metadata } from "next";
import HireShopifyHero from "@/app/components/HireShopifyHero";
import ShopifyExpertise from "@/app/components/ShopifyExpertise";
import HireShopifySolutions from "@/app/components/HireShopifySolutions";
import HireShopifyContact from "@/app/components/HireShopifyContact";

export const metadata: Metadata = {
  title: "Hire Shopify Developers | ProManage",
  description:
    "Power up your online business using the skills of industry-certified Shopify developers having diverse experiences and deep eCommerce insights.",
};

export default function HireShopifyDevelopersPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      <HireShopifyHero />
      <ShopifyExpertise />

      {/* Solutions: "Totally Customized and Attractive Shopify Solutions" with the bag on a podium, 8 feature cards and CTAs */}
      <HireShopifySolutions />

      {/* Contact: "Unzip Possibilities. Build Success." on the zipper artwork with the "Get My Free Proposal" form (id="contact") */}
      <HireShopifyContact />
    </main>
  );
}
