import type { Metadata } from "next";
import GoogleAdsHero from "../../components/GoogleAdsHero";
import GoogleAdsEcosystem from "../../components/GoogleAdsEcosystem";
import GoogleAdsIntent from "../../components/GoogleAdsIntent";
import GoogleAdsFunnel from "../../components/GoogleAdsFunnel";
import GoogleAdsCaseStudy from "../../components/GoogleAdsCaseStudy";
import GoogleAdsCta from "../../components/GoogleAdsCta";
import ClientStories from "../../components/ClientStories";
import FAQSection from "../../components/FAQSection";
import GoogleAdsBottomBanner from "../../components/GoogleAdsBottomBanner";

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
