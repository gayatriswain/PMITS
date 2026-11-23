import type { Metadata } from "next";
import HireCorePhpHero from "@/app/components/hire-core-php-developers/HireCorePhpHero";
import HireCorePhpApproach from "@/app/components/hire-core-php-developers/HireCorePhpApproach";
import HireCorePhpWhyItMatters from "@/app/components/hire-core-php-developers/HireCorePhpWhyItMatters";
import HireCorePhpSolutions from "@/app/components/hire-core-php-developers/HireCorePhpSolutions";
import HireCorePhpWhyChooseUs from "@/app/components/hire-core-php-developers/HireCorePhpWhyChooseUs";
import HireCorePhpWhatYouCanBuild from "@/app/components/hire-core-php-developers/HireCorePhpWhatYouCanBuild";
import HireCorePhpWhyHireFromUs from "@/app/components/hire-core-php-developers/HireCorePhpWhyHireFromUs";
import HireCorePhpSignature from "@/app/components/hire-core-php-developers/HireCorePhpSignature";

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
