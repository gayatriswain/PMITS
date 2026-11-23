import WhyChooseUsHero from "@/app/components/why-choose-us/WhyChooseUsHero";
import WhyChooseUsBenefits from "@/app/components/why-choose-us/WhyChooseUsBenefits";
import WhyChooseUsApproach from "@/app/components/why-choose-us/WhyChooseUsApproach";
import HowWeWorkProcess from "@/app/components/why-choose-us/HowWeWorkProcess";
import WhyChooseUsValue from "@/app/components/why-choose-us/WhyChooseUsValue";
import WhyChooseUsFutureReady from "@/app/components/why-choose-us/WhyChooseUsFutureReady";
import WhyChooseUsProposalForm from "@/app/components/why-choose-us/WhyChooseUsProposalForm";

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
