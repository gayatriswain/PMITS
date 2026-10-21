import type { Metadata } from "next";
import SocialMediaMarketingHero from "../../components/SocialMediaMarketingHero";
import SocialMediaMarketingContentGrid from "../../components/SocialMediaMarketingContentGrid";
import SocialMediaMarketingBrandCompare from "../../components/SocialMediaMarketingBrandCompare";
import SocialMediaMarketingContentTypes from "../../components/SocialMediaMarketingContentTypes";
import SocialMediaMarketingBenefits from "../../components/SocialMediaMarketingBenefits";
import SocialMediaMarketingCaseStudy from "../../components/SocialMediaMarketingCaseStudy";
import SocialMediaMarketingFinalCTA from "../../components/SocialMediaMarketingFinalCTA";
import { getInstagramMedia } from "../../lib/instagram";

export const metadata: Metadata = {
  title: "Social Media Marketing | ProManage",
  description:
    "We create content, campaigns, and brand experiences that transform businesses into brands people notice, remember, and trust.",
};

export default async function SocialMediaMarketingPage() {
  // Fetches only if INSTAGRAM_ACCESS_TOKEN / INSTAGRAM_BUSINESS_ACCOUNT_ID are set in .env.local
  // (your own authorized account via the official Graph API) — otherwise null, and the section
  // below falls back to its static placeholder cards.
  const liveMedia = await getInstagramMedia();

  return (
    <div className="relative overflow-x-clip">
      <SocialMediaMarketingHero />
      <SocialMediaMarketingContentGrid />
      <SocialMediaMarketingBrandCompare />
      <SocialMediaMarketingContentTypes liveMedia={liveMedia} />
      <SocialMediaMarketingBenefits />
      <SocialMediaMarketingCaseStudy />
      <SocialMediaMarketingFinalCTA />
    </div>
  );
}
