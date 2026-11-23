import type { Metadata } from "next";
import SocialMediaMarketingHero from "../../components/social-media-marketing/SocialMediaMarketingHero";
import SocialMediaMarketingContentGrid from "../../components/social-media-marketing/SocialMediaMarketingContentGrid";
import SocialMediaMarketingBrandCompare from "../../components/social-media-marketing/SocialMediaMarketingBrandCompare";
import SocialMediaMarketingContentTypes from "../../components/social-media-marketing/SocialMediaMarketingContentTypes";
import SocialMediaMarketingBenefits from "../../components/social-media-marketing/SocialMediaMarketingBenefits";
import SocialMediaMarketingCaseStudy from "../../components/social-media-marketing/SocialMediaMarketingCaseStudy";
import SocialMediaMarketingFinalCTA from "../../components/social-media-marketing/SocialMediaMarketingFinalCTA";
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
