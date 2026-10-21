import WhyChooseUsHero from "@/app/components/WhyChooseUsHero";
import WhyChooseUsBenefits from "@/app/components/WhyChooseUsBenefits";
import WhyChooseUsApproach from "@/app/components/WhyChooseUsApproach";
import HowWeWorkProcess from "@/app/components/HowWeWorkProcess";
import WhyChooseUsValue from "@/app/components/WhyChooseUsValue";
import WhyChooseUsFutureReady from "@/app/components/WhyChooseUsFutureReady";
import WhyChooseUsProposalForm from "@/app/components/WhyChooseUsProposalForm";

export const metadata = {
  title: "Why Choose Us | ProManage",
  description: "Strategy. Design. Technology. Growth. Everything aligned to deliver real results that matter to you.",
};

export default function WhyChooseUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <WhyChooseUsHero />
      <WhyChooseUsBenefits />
      <HowWeWorkProcess />
      <WhyChooseUsApproach />
      <WhyChooseUsValue />
      <WhyChooseUsFutureReady />
      <WhyChooseUsProposalForm />
    </div>
  );
}
