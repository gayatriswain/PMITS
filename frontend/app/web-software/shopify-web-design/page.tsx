import type { Metadata } from "next";
import ShopifyWebDesignHero from "../../components/shopify-web-design/ShopifyWebDesignHero";
import ShopifyWebDesignJourney from "../../components/shopify-web-design/ShopifyWebDesignJourney";
import ShopifyStoreArchitecture from "../../components/shopify-web-design/ShopifyStoreArchitecture";
import ShopifyProductDesign from "../../components/shopify-web-design/ShopifyProductDesign";
import ShopifyMobileExperience from "../../components/shopify-web-design/ShopifyMobileExperience";
import ShopifyWhatWeOffer from "../../components/shopify-web-design/ShopifyWhatWeOffer";
import ShopifyCTABanner from "../../components/shopify-web-design/ShopifyCTABanner";
import ShopifyResultsAndForm from "../../components/shopify-web-design/ShopifyResultsAndForm";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Shopify Web Design | ProManage",
  description:
    "We design fast, intuitive Shopify stores that turn product discovery into confident purchases.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/web-software/shopify-web-design", staticMetadata);
}

export default function ShopifyWebDesignPage() {
  return (
    <div className="relative overflow-x-clip">
      <JsonLd path="/web-software/shopify-web-design" />
      <CmsSections
        path="/web-software/shopify-web-design"
        sections={[
          ["web-design-hero", <ShopifyWebDesignHero key="web-design-hero" />],
          ["web-design-journey", <ShopifyWebDesignJourney key="web-design-journey" />],
          ["product-design", <ShopifyProductDesign key="product-design" />],
          ["store-architecture", <ShopifyStoreArchitecture key="store-architecture" />],
          ["mobile-experience", <ShopifyMobileExperience key="mobile-experience" />],
          ["what-we-offer", <ShopifyWhatWeOffer key="what-we-offer" />],
          ["cta-banner", <ShopifyCTABanner key="cta-banner" />],
          ["results-and-form", <ShopifyResultsAndForm key="results-and-form" />],
        ]}
      />
    </div>
  );
}
