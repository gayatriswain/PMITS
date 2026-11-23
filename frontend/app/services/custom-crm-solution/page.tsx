import type { Metadata } from "next";
import CustomCrmHero from "@/app/components/CustomCrmHero";
import CustomCrmChallenge from "@/app/components/CustomCrmChallenge";
import CustomCrmFeatures from "@/app/components/CustomCrmFeatures";
import CustomCrmSmartTools from "@/app/components/CustomCrmSmartTools";
import CustomCrmIndustries from "@/app/components/CustomCrmIndustries";
import CustomCrmBuiltAround from "@/app/components/CustomCrmBuiltAround";
import CustomCrmStartJourney from "@/app/components/CustomCrmStartJourney";

export const metadata: Metadata = {
  title: "Custom CRM Solution | ProManage",
  description:
    "A CRM built around your business. We build custom CRM software that adapts to the way you work — connecting leads, conversations and data in one intelligent system.",
};

export default function CustomCrmSolutionPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      {/* 1. Hero: headline, CTAs, CRM dashboard visual with connected sources & outcomes, trusted brands */}
      <CustomCrmHero />

      {/* 2. The Challenge: disconnected tools vs one connected CRM */}
      <CustomCrmChallenge />

      {/* 3. Powerful Features: CRM hub with 6 connected feature cards and impact stats */}
      <CustomCrmFeatures />

      {/* 4. Smarter Tools: 4 linked feature cards with illustration, title and description */}
      <CustomCrmSmartTools />

      {/* 5. Our Work: Custom CRMs built for every business, with an industry selector */}
      <CustomCrmIndustries />

      {/* 6. Built Around Your Business: generic CRM vs your CRM, with six tailored capabilities */}
      <CustomCrmBuiltAround />

      {/* 7. Start Your CRM Journey: consultation form, trusted-by logos and closing message */}
      <CustomCrmStartJourney />
    </main>
  );
}
