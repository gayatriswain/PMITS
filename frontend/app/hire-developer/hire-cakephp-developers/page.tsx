import type { Metadata } from "next";
import HireCakePhpHero from "@/app/components/hire-cakephp-developers/HireCakePhpHero";
import HireCakePhpExpertise from "@/app/components/hire-cakephp-developers/HireCakePhpExpertise";
import HireCakePhpHireOptions from "@/app/components/hire-cakephp-developers/HireCakePhpHireOptions";
import HireCakePhpProcess from "@/app/components/hire-cakephp-developers/HireCakePhpProcess";
import HireCakePhpResults from "@/app/components/hire-cakephp-developers/HireCakePhpResults";
import HireCakePhpWork from "@/app/components/hire-cakephp-developers/HireCakePhpWork";
import HireCakePhpWhy from "@/app/components/hire-cakephp-developers/HireCakePhpWhy";
import HireCakePhpEngagement from "@/app/components/hire-cakephp-developers/HireCakePhpEngagement";
import HireCakePhpFinalStep from "@/app/components/hire-cakephp-developers/HireCakePhpFinalStep";
import HireCakePhpStartProject from "@/app/components/hire-cakephp-developers/HireCakePhpStartProject";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Hire CakePHP Developers | ProManage",
  description:
    "Hire dedicated CakePHP developers to build secure, high-performance web applications that help your business rise.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/hire-developer/hire-cakephp-developers", staticMetadata);
}

export default function HireCakePhpPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      <JsonLd path="/hire-developer/hire-cakephp-developers" />
      {/* 1. Hero: Built on CakePHP. Built for what's next. with the layered CakePHP architecture cake */}
      <CmsSections
        path="/hire-developer/hire-cakephp-developers"
        sections={[
          ["hero", <HireCakePhpHero key="hero" />],
          ["expertise", <HireCakePhpExpertise key="expertise" />],
          ["hire-options", <HireCakePhpHireOptions key="hire-options" />],
          ["process", <HireCakePhpProcess key="process" />],
          ["results", <HireCakePhpResults key="results" />],
          ["work", <HireCakePhpWork key="work" />],
          ["why", <HireCakePhpWhy key="why" />],
          ["engagement", <HireCakePhpEngagement key="engagement" />],
          ["final-step", <HireCakePhpFinalStep key="final-step" />],
          ["start-project", <HireCakePhpStartProject key="start-project" />],
        ]}
      />

      {/* 2. Expertise: More than Developers. A Complete CakePHP Partner. with 6 capability cards and stats */}

      {/* 3. Hire CakePHP Developers: 3 hiring options (Developer, Full-Stack, Specialist) + perks and help box */}

      {/* 4. Process: A process as solid as Cake. six steps on a wavy line + principles bar */}

      {/* 5. Results: Real Projects. Real CakePHP Impact. with project cards, trusted-by row and CTA bar */}

      {/* 6. Our Work: Built with CakePHP. Built to perform. with three laptop case-study cards (E-Commerce, Education, Healthcare) */}

      {/* 7. Why ProManage: More than developers. Your CakePHP partner. orbit of 6 strengths around the cake + globe/stats/CTA bar */}

      {/* 8. Engagement Models: Hire the way your project needs. 3 models + cake with 4 chips + consultation form (id="cakephp-contact") */}

      {/* 9. Final Step: Ready to build something extraordinary? Pedestal orbit + action selector card + bottom banner */}

      {/* 10. Start Your Project / CakePHP Expertise: Build it. The right way. (Code editor, 3D pedestal, project form + concept-to-code banner) */}
    </main>
  );
}
