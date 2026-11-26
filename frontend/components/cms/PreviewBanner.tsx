import { draftMode } from "next/headers";

/** Visible only while an editor is previewing drafts. */
export default async function PreviewBanner() {
  if (!(await draftMode()).isEnabled) return null;
  return (
    <div className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#0c1e3d] px-4 py-2 text-xs text-white shadow-xl">
      <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
      Preview mode – you are seeing unpublished changes
      <form action="/api/draft/disable" method="post">
        <button type="submit" className="rounded-full bg-white/15 px-3 py-1 font-semibold hover:bg-white/25">Exit preview</button>
      </form>
    </div>
  );
}
