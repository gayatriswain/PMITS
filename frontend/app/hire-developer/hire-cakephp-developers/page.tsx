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

export const metadata: Metadata = {
  title: "Hire CakePHP Developers | ProManage",
  description:
    "Hire dedicated CakePHP developers to build secure, high-performance web applications that help your business rise.",
};

export default function HireCakePhpPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      {/* 1. Hero: Built on CakePHP. Built for what's next. with the layered CakePHP architecture cake */}
      <HireCakePhpHero />

      {/* 2. Expertise: More than Developers. A Complete CakePHP Partner. with 6 capability cards and stats */}
      <HireCakePhpExpertise />

      {/* 3. Hire CakePHP Developers: 3 hiring options (Developer, Full-Stack, Specialist) + perks and help box */}
      <HireCakePhpHireOptions />

      {/* 4. Process: A process as solid as Cake. six steps on a wavy line + principles bar */}
      <HireCakePhpProcess />

      {/* 5. Results: Real Projects. Real CakePHP Impact. with project cards, trusted-by row and CTA bar */}
      <HireCakePhpResults />

      {/* 6. Our Work: Built with CakePHP. Built to perform. with three laptop case-study cards (E-Commerce, Education, Healthcare) */}
      <HireCakePhpWork />

      {/* 7. Why ProManage: More than developers. Your CakePHP partner. orbit of 6 strengths around the cake + globe/stats/CTA bar */}
      <HireCakePhpWhy />

      {/* 8. Engagement Models: Hire the way your project needs. 3 models + cake with 4 chips + consultation form (id="cakephp-contact") */}
      <HireCakePhpEngagement />

      {/* 9. Final Step: Ready to build something extraordinary? Pedestal orbit + action selector card + bottom banner */}
      <HireCakePhpFinalStep />

      {/* 10. Start Your Project / CakePHP Expertise: Build it. The right way. (Code editor, 3D pedestal, project form + concept-to-code banner) */}
      <HireCakePhpStartProject />
    </main>
  );
}
