import type { Metadata } from "next";
import NotFoundView from "./components/shared/NotFoundView";

export const metadata: Metadata = {
  title: "Page Not Found | ProManage",
  robots: { index: false, follow: true },
};

/** Shown for every unknown URL (and for notFound() in pages). Header and footer come from the root layout. */
export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-white">
      <NotFoundView />
    </main>
  );
}
