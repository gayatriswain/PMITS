import type { Metadata } from "next";
import CustomCrmHero from "@/app/components/custom-crm-solution/CustomCrmHero";
import CustomCrmChallenge from "@/app/components/custom-crm-solution/CustomCrmChallenge";
import CustomCrmFeatures from "@/app/components/custom-crm-solution/CustomCrmFeatures";
import CustomCrmSmartTools from "@/app/components/custom-crm-solution/CustomCrmSmartTools";
import CustomCrmIndustries from "@/app/components/custom-crm-solution/CustomCrmIndustries";
import CustomCrmBuiltAround from "@/app/components/custom-crm-solution/CustomCrmBuiltAround";
import CustomCrmStartJourney from "@/app/components/custom-crm-solution/CustomCrmStartJourney";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Custom CRM Solution | ProManage",
  description:
    "A CRM built around your business. We build custom CRM software that adapts to the way you work — connecting leads, conversations and data in one intelligent system.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/web-software/custom-crm-solution", staticMetadata);
}

export default function CustomCrmSolutionPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      <JsonLd path="/web-software/custom-crm-solution" />
      {/* 1. Hero: headline, CTAs, CRM dashboard visual with connected sources & outcomes, trusted brands */}
      <CmsSections
        path="/web-software/custom-crm-solution"
        sections={[
          ["hero", <CustomCrmHero key="hero" />],
          ["challenge", <CustomCrmChallenge key="challenge" />],
          ["features", <CustomCrmFeatures key="features" />],
          ["smart-tools", <CustomCrmSmartTools key="smart-tools" />],
          ["industries", <CustomCrmIndustries key="industries" />],
          ["built-around", <CustomCrmBuiltAround key="built-around" />],
          ["start-journey", <CustomCrmStartJourney key="start-journey" />],
        ]}
      />

      {/* 2. The Challenge: disconnected tools vs one connected CRM */}

      {/* 3. Powerful Features: CRM hub with 6 connected feature cards and impact stats */}

      {/* 4. Smarter Tools: 4 linked feature cards with illustration, title and description */}

      {/* 5. Our Work: Custom CRMs built for every business, with an industry selector */}

      {/* 6. Built Around Your Business: generic CRM vs your CRM, with six tailored capabilities */}

      {/* 7. Start Your CRM Journey: consultation form, trusted-by logos and closing message */}
    </main>
  );
}
