import type { Metadata } from "next";
import GoogleAdsHero from "../../components/google-ads/GoogleAdsHero";
import GoogleAdsEcosystem from "../../components/google-ads/GoogleAdsEcosystem";
import GoogleAdsIntent from "../../components/google-ads/GoogleAdsIntent";
import GoogleAdsFunnel from "../../components/google-ads/GoogleAdsFunnel";
import GoogleAdsCaseStudy from "../../components/google-ads/GoogleAdsCaseStudy";
import GoogleAdsCta from "../../components/google-ads/GoogleAdsCta";
import ClientStories from "../../components/shared/ClientStories";
import FAQSection from "../../components/shared/FAQSection";
import GoogleAdsBottomBanner from "../../components/google-ads/GoogleAdsBottomBanner";

export const metadata: Metadata = {
  title: "Google Ads | ProManage",
  description:
    "We create high-performing Google Ads campaigns that put your business at the top of search results—driving qualified leads, more calls, and real revenue.",
};

export default function GoogleAdsPage() {
  return (
    <div className="relative overflow-x-clip">
      <GoogleAdsHero />
      <GoogleAdsEcosystem />
      <GoogleAdsIntent />
      <GoogleAdsFunnel />
      <GoogleAdsCaseStudy />
      <GoogleAdsCta />
      <GoogleAdsBottomBanner />
      <ClientStories />
      <FAQSection />
    </div>
  );
}
