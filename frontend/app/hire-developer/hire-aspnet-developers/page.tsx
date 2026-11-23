import type { Metadata } from "next";
import HireAspNetHero from "@/app/components/hire-aspnet-developers/HireAspNetHero";
import HireAspNetBuild from "@/app/components/hire-aspnet-developers/HireAspNetBuild";
import HireAspNetExpertise from "@/app/components/hire-aspnet-developers/HireAspNetExpertise";

export const metadata: Metadata = {
  title: "Hire ASP.NET Developers | ProManage",
  description:
    "Hire skilled ASP.NET developers to build secure, scalable and high-performance web applications that drive your business forward.",
};

export default function HireAspNetPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      {/* 1. Hero: Hire ASP.NET Developers with the 3D ribbon, tech cards, podium and </> mark */}
      <HireAspNetHero />

      {/* 2. Build / Extend / Modernize: "What do you want to build?" with three illustrated cards and a success bar */}
      <HireAspNetBuild />

      {/* 3. Expertise: "ASP.NET expertise built for real-world impact." with the glowing badge, 6 capabilities and the .NET ecosystem bar */}
      <HireAspNetExpertise />
    </main>
  );
}
