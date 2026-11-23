import type { Metadata } from "next";
import ShopifyWebDesignHero from "../../components/shopify-web-design/ShopifyWebDesignHero";
import ShopifyWebDesignJourney from "../../components/shopify-web-design/ShopifyWebDesignJourney";
import ShopifyStoreArchitecture from "../../components/shopify-web-design/ShopifyStoreArchitecture";
import ShopifyProductDesign from "../../components/shopify-web-design/ShopifyProductDesign";
import ShopifyMobileExperience from "../../components/shopify-web-design/ShopifyMobileExperience";
import ShopifyWhatWeOffer from "../../components/shopify-web-design/ShopifyWhatWeOffer";
import ShopifyCTABanner from "../../components/shopify-web-design/ShopifyCTABanner";
import ShopifyResultsAndForm from "../../components/shopify-web-design/ShopifyResultsAndForm";

export const metadata: Metadata = {
  title: "Shopify Web Design | ProManage",
  description:
    "We design fast, intuitive Shopify stores that turn product discovery into confident purchases.",
};

export default function ShopifyWebDesignPage() {
  return (
    <div className="relative overflow-x-clip">
      <ShopifyWebDesignHero />
      <ShopifyWebDesignJourney />
      <ShopifyProductDesign />
      <ShopifyStoreArchitecture />
      <ShopifyMobileExperience />
      <ShopifyWhatWeOffer />
      <ShopifyCTABanner />
      <ShopifyResultsAndForm />
    </div>
  );
}
