import type { Metadata } from "next";
import GoogleAdsHero from "../../components/google-ads/GoogleAdsHero";
import GoogleAdsEcosystem from "../../components/google-ads/GoogleAdsEcosystem";
import GoogleAdsIntent from "../../components/google-ads/GoogleAdsIntent";
import GoogleAdsFunnel from "../../components/google-ads/GoogleAdsFunnel";
import GoogleAdsCaseStudy from "../../components/google-ads/GoogleAdsCaseStudy";
import GoogleAdsPerformance from "../../components/google-ads/GoogleAdsPerformance";
import GoogleAdsCta from "../../components/google-ads/GoogleAdsCta";
import ClientStories from "../../components/shared/ClientStories";
import FAQSection from "../../components/shared/FAQSection";
import GoogleAdsBottomBanner from "../../components/google-ads/GoogleAdsBottomBanner";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Google Ads | ProManage",
  description:
    "We create high-performing Google Ads campaigns that put your business at the top of search results—driving qualified leads, more calls, and real revenue.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/marketing-growth/google-ads", staticMetadata);
}

export default function GoogleAdsPage() {
  return (
    <div className="relative overflow-x-clip">
      <JsonLd path="/marketing-growth/google-ads" />
      <CmsSections
        path="/marketing-growth/google-ads"
        sections={[
          ["hero", <GoogleAdsHero key="hero" />],
          ["ecosystem", <GoogleAdsEcosystem key="ecosystem" />],
          ["intent", <GoogleAdsIntent key="intent" />],
          ["funnel", <GoogleAdsFunnel key="funnel" />],
          ["performance", <GoogleAdsPerformance key="performance" />],
          ["case-study", <GoogleAdsCaseStudy key="case-study" />],
          ["cta", <GoogleAdsCta key="cta" />],
          ["bottom-banner", <GoogleAdsBottomBanner key="bottom-banner" />],
          ["client-stories", <ClientStories key="client-stories" />],
          ["faq-section", <FAQSection key="faq-section" />],
        ]}
      />
    </div>
  );
}
