import type { Metadata } from "next";
import Container from "../../components/shared/Container";
import WebsiteDevHeroVisual from "../../components/website-development/WebsiteDevHeroVisual";
import TrustedBar from "../../components/shared/TrustedBar";
import WebsiteDevTransformations from "../../components/website-development/WebsiteDevTransformations";
import BeforeAfterShowcase from "../../components/website-development/BeforeAfterShowcase";
import WebsiteDevApproach from "../../components/website-development/WebsiteDevApproach";
import WebsiteDevGrowthJourney from "../../components/website-development/WebsiteDevGrowthJourney";
import WebsiteDevComparison from "../../components/shared/WebsiteDevComparison";
import WebsiteDevGrowthPlan from "../../components/website-development/WebsiteDevGrowthPlan";
import WebsiteDevStrategyCta from "../../components/shared/WebsiteDevStrategyCta";
import FAQSection from "../../components/shared/FAQSection";
import { cmsMetadata } from "../../../lib/seo";
import { CmsSlot } from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";
import WebsiteDevHero from "../../components/website-development/WebsiteDevHero";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/web-software/website-development");
}

export default function WebsiteDevelopmentPage() {
  return (
    <div className="relative overflow-x-clip min-h-[90vh] bg-[#F5F7F8]">
      <JsonLd path="/web-software/website-development" />
      <CmsSlot path="/web-software/website-development" k="hero"><WebsiteDevHero slot1={<CmsSlot path="/web-software/website-development" k="hero-visual"><WebsiteDevHeroVisual /></CmsSlot>} /></CmsSlot>
      
      <section className="bg-[#F5F7F8] pb-12 lg:pb-16 relative z-10 -mt-4 lg:-mt-8">
        <Container>
          <CmsSlot path="/web-software/website-development" k="trusted-bar"><TrustedBar /></CmsSlot>
        </Container>
      </section>
      
      <CmsSlot path="/web-software/website-development" k="transformations"><WebsiteDevTransformations showcase={<CmsSlot path="/web-software/website-development" k="before-after"><BeforeAfterShowcase /></CmsSlot>} /></CmsSlot>

      <CmsSlot path="/web-software/website-development" k="approach"><WebsiteDevApproach /></CmsSlot>

      <CmsSlot path="/web-software/website-development" k="growth-journey"><WebsiteDevGrowthJourney /></CmsSlot>

      <CmsSlot path="/web-software/website-development" k="comparison"><WebsiteDevComparison /></CmsSlot>

      <CmsSlot path="/web-software/website-development" k="growth-plan"><WebsiteDevGrowthPlan /></CmsSlot>

      <CmsSlot path="/web-software/website-development" k="strategy-cta"><WebsiteDevStrategyCta /></CmsSlot>

      <CmsSlot path="/web-software/website-development" k="faq-section"><FAQSection /></CmsSlot>
    </div>
  );
}
