import { draftMode } from "next/headers";
import EditBridge from "./EditBridge";

/** Origin of the CMS admin (its visual editor shows this site in a frame). */
function adminOrigin() {
  try {
    return new URL(process.env.CMS_ADMIN_URL || process.env.NEXT_PUBLIC_API_URL || process.env.CMS_URL || "http://localhost:4000").origin;
  } catch {
    return "http://localhost:4000";
  }
}

/** Visible only while an editor is previewing drafts. */
export default async function PreviewBanner() {
  if (!(await draftMode()).isEnabled) return null;
  return (
    <>
      <div data-preview-banner className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#0c1e3d] px-4 py-2 text-xs text-white shadow-xl">
        <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
        Preview mode – you are seeing unpublished changes
        <form action="/api/draft/disable" method="post">
          <button type="submit" className="rounded-full bg-white/15 px-3 py-1 font-semibold hover:bg-white/25">Exit preview</button>
        </form>
      </div>
      <EditBridge adminOrigin={adminOrigin()} />
    </>
  );
}
