import type { Metadata } from "next";
import WooHireHero from "../../components/hire-woocommerce-developers/WooHireHero";
import WooIntro from "../../components/hire-woocommerce-developers/WooIntro";
import WooWhy from "../../components/hire-woocommerce-developers/WooWhy";
import WooPowered from "../../components/hire-woocommerce-developers/WooPowered";
import WooWhyHire from "../../components/shared/WooWhyHire";
import WooCommitment from "../../components/hire-woocommerce-developers/WooCommitment";
import WooExpertise from "../../components/hire-woocommerce-developers/WooExpertise";
import WooSuccess from "../../components/hire-woocommerce-developers/WooSuccess";
import WooProposal from "../../components/shared/WooProposal";

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
