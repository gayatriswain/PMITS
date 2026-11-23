import type { Metadata } from "next";
import HireCorePhpHero from "@/app/components/HireCorePhpHero";
import HireCorePhpApproach from "@/app/components/HireCorePhpApproach";
import HireCorePhpWhyItMatters from "@/app/components/HireCorePhpWhyItMatters";
import HireCorePhpSolutions from "@/app/components/HireCorePhpSolutions";
import HireCorePhpWhyChooseUs from "@/app/components/HireCorePhpWhyChooseUs";
import HireCorePhpWhatYouCanBuild from "@/app/components/HireCorePhpWhatYouCanBuild";
import HireCorePhpWhyHireFromUs from "@/app/components/HireCorePhpWhyHireFromUs";
import HireCorePhpSignature from "@/app/components/HireCorePhpSignature";

export const metadata: Metadata = {
  title: "Hire Core PHP Developers | ProManage",
  description:
    "Bring in dedicated PHP experts who build, optimize and scale powerful web applications.",
};

export default function HireCorePhpPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      <HireCorePhpHero />
      <HireCorePhpApproach />
      <HireCorePhpWhyItMatters />
      <HireCorePhpSolutions />
      <HireCorePhpWhyChooseUs />
      <HireCorePhpWhatYouCanBuild />
      <HireCorePhpWhyHireFromUs />
      <HireCorePhpSignature />
    </main>
  );
}
