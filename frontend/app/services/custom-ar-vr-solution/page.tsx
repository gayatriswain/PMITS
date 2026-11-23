import type { Metadata } from "next";
import ArVrHero from "@/app/components/ArVrHero";
import ArVrSolutions from "@/app/components/ArVrSolutions";
import ArVrShowcase from "@/app/components/ArVrShowcase";
import ArVrWhy from "@/app/components/ArVrWhy";
import ArVrApproach from "@/app/components/ArVrApproach";
import ArVrCTA from "@/app/components/ArVrCTA";

export const metadata: Metadata = {
  title: "Custom AR/VR Solutions | ProManage",
  description:
    "Step Into. Experience. Transform. We create immersive AR/VR experiences that connect imagination with real-world impact.",
};

export default function CustomArVrSolutionPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      {/* 1. Hero Section (background image) */}
      <ArVrHero />

      {/* 2. Immersive Solutions: cards around the centre artwork + stats bar */}
      <ArVrSolutions />

      {/* 3. CTA: archway artwork, consultation form, trusted-by row */}
      <ArVrCTA />

      {/* 4. Our Approach: 5-step process on a wavy line + stats bar */}
      <ArVrApproach />

      {/* 5. What we create: circular carousel of solution cards + feature bar (bottom of the page) */}
      <ArVrShowcase />

      {/* 6. Why ProManage: five points on an arc + specialist CTA (bottom of the page) */}
      <ArVrWhy />
    </main>
  );
}
