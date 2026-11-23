import type { Metadata } from "next";
import AnimationGraphicDesignHero from "@/app/components/AnimationGraphicDesignHero";
import VisualCommunicationSolutions from "@/app/components/VisualCommunicationSolutions";
import CreativePartnershipSection from "@/app/components/CreativePartnershipSection";
import AnimationProcess from "@/app/components/AnimationProcess";
import AnimationOurWork from "@/app/components/AnimationOurWork";
import AnimationImpactShowcase from "@/app/components/AnimationImpactShowcase";

export const metadata: Metadata = {
  title: "Animation & Graphic Design Services | ProManage",
  description:
    "Design That Speaks. Animation That Moves. We create powerful 2D/3D animations and stunning graphic designs that captivate your audience and elevate your brand.",
};

export default function AnimationAndGraphicDesignPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      {/* 1. Hero Section matching reference design with 3D workspace graphic */}
      <AnimationGraphicDesignHero />

      {/* 2. Complete Visual Communication Solutions (Animation Services & Graphic Design Services) */}
      <VisualCommunicationSolutions />

      {/* 3. Why Choose Us: More Than Design. A Creative Partnership (with 3D Wave & 6 Feature Cards) */}
      <CreativePartnershipSection />

      {/* 4. Our Process: Your Vision, Perfectly Crafted (with 3D Infinity Ribbon, 5 Steps, Testimonial & Dark CTA) */}
      <AnimationProcess />

      {/* 5. Extraordinary Designs. Real Results. (Interactive Form, 3D Fan, Carousel, Stats & 3-Step Workflow) */}
      <AnimationImpactShowcase />

      {/* 6. Our Work: Real Projects. Real Impact. (Filter Tabs, 3D Coverflow Carousel, Trusted Brands & CTA) */}
      <AnimationOurWork />
    </main>
  );
}
