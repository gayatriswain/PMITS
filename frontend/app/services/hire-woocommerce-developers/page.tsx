import type { Metadata } from "next";
import WooHireHero from "../../components/WooHireHero";
import WooIntro from "../../components/WooIntro";
import WooWhy from "../../components/WooWhy";
import WooPowered from "../../components/WooPowered";
import WooWhyHire from "../../components/WooWhyHire";
import WooCommitment from "../../components/WooCommitment";
import WooExpertise from "../../components/WooExpertise";
import WooSuccess from "../../components/WooSuccess";
import WooProposal from "../../components/WooProposal";

export const metadata: Metadata = {
  title: "Hire WooCommerce Developers | ProManage",
  description:
    "Hire dedicated WooCommerce developers to build high-performance, scalable stores that drive sales.",
};

export default function HireWooCommerceDevelopersPage() {
  return (
    <div className="relative overflow-x-clip">
      <WooHireHero />
      <WooIntro />
      <WooWhy />
      <WooPowered />
      <WooWhyHire />
      <WooCommitment />
      <WooExpertise />
      <WooSuccess />
      <WooProposal />
    </div>
  );
}
