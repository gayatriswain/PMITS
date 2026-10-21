import CustomDevHero from "@/app/components/CustomDevHero";
import CustomDevFeatures from "@/app/components/CustomDevFeatures";
import CustomDevWhatWeBuild from "@/app/components/CustomDevWhatWeBuild";
import CustomDevGrowthPartner from "@/app/components/CustomDevGrowthPartner";

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
    </div>
  );
}
