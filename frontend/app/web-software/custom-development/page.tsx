import CustomDevHero from "@/app/components/custom-development/CustomDevHero";
import CustomDevFeatures from "@/app/components/custom-development/CustomDevFeatures";
import CustomDevWhatWeBuild from "@/app/components/custom-development/CustomDevWhatWeBuild";
import CustomDevGrowthPartner from "@/app/components/custom-development/CustomDevGrowthPartner";
import CustomDevOurWork from "@/app/components/custom-development/CustomDevOurWork";
import CustomDevStartProject from "@/app/components/custom-development/CustomDevStartProject";

export const metadata = {
  title: "Custom Development Services | ProManage",
  description: "We build fully custom web applications and software solutions designed around your business, your workflow, and your future.",
};

export default function CustomDevelopmentPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <CustomDevHero />
      <CustomDevFeatures />
      <CustomDevWhatWeBuild />
      <CustomDevGrowthPartner />
      <CustomDevOurWork />
      <CustomDevStartProject />
    </div>
  );
}
