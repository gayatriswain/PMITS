import type { ReactNode } from "react";
import { draftMode } from "next/headers";

/**
 * Marks a CMS section in preview (draft mode) so the admin's visual editor can tell which section
 * was clicked. `display: contents` keeps the layout untouched; visitors never get the wrapper.
 */
export default async function EditMark({ k, children }: { k: string; children: ReactNode }) {
  let on = false;
  try {
    on = (await draftMode()).isEnabled;
  } catch {
    on = false;
  }
  if (!on) return <>{children}</>;
  return (
    <div data-cms-key={k} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
