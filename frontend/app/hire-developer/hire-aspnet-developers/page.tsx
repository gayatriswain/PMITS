import type { Metadata } from "next";
import HireAspNetHero from "@/app/components/hire-aspnet-developers/HireAspNetHero";
import HireAspNetBuild from "@/app/components/hire-aspnet-developers/HireAspNetBuild";
import HireAspNetExpertise from "@/app/components/hire-aspnet-developers/HireAspNetExpertise";
import HireAspNetWhyUs from "@/app/components/hire-aspnet-developers/HireAspNetWhyUs";
import HireAspNetProcess from "@/app/components/hire-aspnet-developers/HireAspNetProcess";
import HireAspNetCta from "@/app/components/hire-aspnet-developers/HireAspNetCta";
import HireAspNetStories from "@/app/components/hire-aspnet-developers/HireAspNetStories";
import HireAspNetInnovation from "@/app/components/hire-aspnet-developers/HireAspNetInnovation";
import HireAspNetContact from "@/app/components/hire-aspnet-developers/HireAspNetContact";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Hire ASP.NET Developers | ProManage",
  description:
    "Hire skilled ASP.NET developers to build secure, scalable and high-performance web applications that drive your business forward.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/hire-developer/hire-aspnet-developers", staticMetadata);
}

export default function HireAspNetPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      <JsonLd path="/hire-developer/hire-aspnet-developers" />
      {/* Section order, visibility and every text/image/link are managed in the CMS (Pages → Hire ASP.NET Developers). */}
      <CmsSections
        path="/hire-developer/hire-aspnet-developers"
        sections={[
          // 1. Hero: ribbon, tech cards, podium with the </> mark
          ["hero", <HireAspNetHero key="hero" />],
          // 2. "What do you want to build?" - Build / Extend / Modernize + success bar
          ["build", <HireAspNetBuild key="build" />],
          // 3. "ASP.NET expertise built for real-world impact." + .NET ecosystem bar
          ["expertise", <HireAspNetExpertise key="expertise" />],
          // 4. "More than code. Delivering business value." - values, stats, glass .NET ribbon
          ["why-us", <HireAspNetWhyUs key="why-us" />],
          // 5. "Simple Steps. Powerful Results." - six-step process
          ["process", <HireAspNetProcess key="process" />],
          // 6. "Ready to build your next big thing with ASP.NET?" - CTA + stats
          ["cta", <HireAspNetCta key="cta" />],
          // 7. "Built on ASP.NET. Driven by results." - case-study slider + results
          ["success-stories", <HireAspNetStories key="success-stories" />],
          // 8. "Code that performs." - tech stack around ASP.NET + numbers
          ["innovation", <HireAspNetInnovation key="innovation" />],
          // 9. "Build beyond." - enquiry form (Admin → Leads) + "Your vision" banner
          ["contact", <HireAspNetContact key="contact" />],
        ]}
      />
    </main>
  );
}
