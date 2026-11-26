import type { Metadata } from "next";
import ContactHero from "../components/contact/ContactHero";
import WhyChooseUs from "../components/shared/WhyChooseUs";
import FAQSection from "../components/shared/FAQSection";
import { getSettings } from "../../lib/cms";
import { cmsMetadata } from "../../lib/seo";
import CmsSections from "../../components/cms/CmsSections";
import JsonLd from "../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Contact Us | ProManage",
  description: "Get in touch with ProManage IT Solution for websites, apps, SEO and digital marketing.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/contact", staticMetadata);
}

export default async function ContactPage() {
  const s = await getSettings();
  const details = { phone: s?.contactPhone, email: s?.contactEmail, address: s?.address, hours: s?.workingHours };
  return (
    <main className="bg-white">
      <JsonLd path="/contact" />
      <CmsSections
        path="/contact"
        sections={[
          ["hero", <ContactHero key="hero" details={details} />],
          ["why-choose-us", <WhyChooseUs key="why-choose-us" />],
          ["faq-section", <FAQSection key="faq-section" />],
        ]}
      />
    </main>
  );
}
