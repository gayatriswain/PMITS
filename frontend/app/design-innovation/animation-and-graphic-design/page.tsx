import type { Metadata } from "next";
import AnimationGraphicDesignHero from "@/app/components/animation-and-graphic-design/AnimationGraphicDesignHero";
import VisualCommunicationSolutions from "@/app/components/animation-and-graphic-design/VisualCommunicationSolutions";
import CreativePartnershipSection from "@/app/components/animation-and-graphic-design/CreativePartnershipSection";
import AnimationProcess from "@/app/components/animation-and-graphic-design/AnimationProcess";
import AnimationOurWork from "@/app/components/animation-and-graphic-design/AnimationOurWork";
import AnimationImpactShowcase from "@/app/components/animation-and-graphic-design/AnimationImpactShowcase";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Animation & Graphic Design Services | ProManage",
  description:
    "Design That Speaks. Animation That Moves. We create powerful 2D/3D animations and stunning graphic designs that captivate your audience and elevate your brand.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/design-innovation/animation-and-graphic-design", staticMetadata);
}

export default function AnimationAndGraphicDesignPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      <JsonLd path="/design-innovation/animation-and-graphic-design" />
      {/* 1. Hero Section matching reference design with 3D workspace graphic */}
      <CmsSections
        path="/design-innovation/animation-and-graphic-design"
        sections={[
          ["graphic-design-hero", <AnimationGraphicDesignHero key="graphic-design-hero" />],
          ["visual-communication-solutions", <VisualCommunicationSolutions key="visual-communication-solutions" />],
          ["creative-partnership-section", <CreativePartnershipSection key="creative-partnership-section" />],
          ["process", <AnimationProcess key="process" />],
          ["impact-showcase", <AnimationImpactShowcase key="impact-showcase" />],
          ["our-work", <AnimationOurWork key="our-work" />],
        ]}
      />

      {/* 2. Complete Visual Communication Solutions (Animation Services & Graphic Design Services) */}

      {/* 3. Why Choose Us: More Than Design. A Creative Partnership (with 3D Wave & 6 Feature Cards) */}

      {/* 4. Our Process: Your Vision, Perfectly Crafted (with 3D Infinity Ribbon, 5 Steps, Testimonial & Dark CTA) */}

      {/* 5. Extraordinary Designs. Real Results. (Interactive Form, 3D Fan, Carousel, Stats & 3-Step Workflow) */}

      {/* 6. Our Work: Real Projects. Real Impact. (Filter Tabs, 3D Coverflow Carousel, Trusted Brands & CTA) */}
    </main>
  );
}
