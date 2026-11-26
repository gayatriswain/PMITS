import { redirect } from "next/navigation";

/** SEO is edited in each page's "SEO" tab; the page list shows a quick SEO check per page. */
export default function Page() {
  redirect("/admin/pages");
}
