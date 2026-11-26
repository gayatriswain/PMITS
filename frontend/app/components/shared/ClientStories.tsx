import { getCollection } from "@/lib/cms";
import ClientStoriesView, { type CmsTestimonial } from "./ClientStoriesView";

type Testimonial = { clientName: string; designation?: string; company?: string; content?: string; videoUrl?: string };

/**
 * "Client stories" section. Uses the published entries of the CMS Testimonials module when there
 * are any; otherwise the section's own (page-editable) content. Server component: fetches once per
 * render with the usual cache/revalidation.
 */
export default async function ClientStories() {
  const res = await getCollection<Testimonial>("testimonials", { limit: 24 });
  const cms: CmsTestimonial[] = (res?.items ?? []).map((t) => ({
    name: t.clientName,
    role: [t.designation, t.company].filter(Boolean).join(", "),
    quote: t.content ?? "",
    videoUrl: t.videoUrl || undefined,
  }));
  return <ClientStoriesView cms={cms} />;
}
