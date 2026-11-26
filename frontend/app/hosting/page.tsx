import type { Metadata } from "next";
import { cmsMetadata } from "../../lib/seo";
import JsonLd from "../../components/cms/JsonLd";
import HostingContent from "../components/web-hosting/HostingContent";
import { CmsSlot } from "@/components/cms/CmsSections";

const NAVY = "#132a43";
const TEAL = "#0d9488";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/hosting");
}

export default function HostingPage() {
  return (
    <div className="bg-gradient-to-b from-white to-slate-50">
      <JsonLd path="/hosting" />
      <CmsSlot path="/hosting" k="content"><HostingContent /></CmsSlot>
    </div>
  );
}
