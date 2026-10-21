import type { Metadata } from "next";
import ShopifyWebDesignHero from "../../components/ShopifyWebDesignHero";
import ShopifyWebDesignJourney from "../../components/ShopifyWebDesignJourney";
import ShopifyStoreArchitecture from "../../components/ShopifyStoreArchitecture";
import ShopifyProductDesign from "../../components/ShopifyProductDesign";
import ShopifyMobileExperience from "../../components/ShopifyMobileExperience";
import ShopifyWhatWeOffer from "../../components/ShopifyWhatWeOffer";
import ShopifyCTABanner from "../../components/ShopifyCTABanner";
import ShopifyResultsAndForm from "../../components/ShopifyResultsAndForm";

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
