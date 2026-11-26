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
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Hire WooCommerce Developers | ProManage",
  description:
    "Hire dedicated WooCommerce developers to build high-performance, scalable stores that drive sales.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/hire-developer/hire-woocommerce-developers", staticMetadata);
}

export default function HireWooCommerceDevelopersPage() {
  return (
    <div className="relative overflow-x-clip">
      <JsonLd path="/hire-developer/hire-woocommerce-developers" />
      <CmsSections
        path="/hire-developer/hire-woocommerce-developers"
        sections={[
          ["hire-hero", <WooHireHero key="hire-hero" />],
          ["intro", <WooIntro key="intro" />],
          ["why", <WooWhy key="why" />],
          ["powered", <WooPowered key="powered" />],
          ["why-hire", <WooWhyHire key="why-hire" />],
          ["commitment", <WooCommitment key="commitment" />],
          ["expertise", <WooExpertise key="expertise" />],
          ["success", <WooSuccess key="success" />],
          ["proposal", <WooProposal key="proposal" />],
        ]}
      />
    </div>
  );
}
