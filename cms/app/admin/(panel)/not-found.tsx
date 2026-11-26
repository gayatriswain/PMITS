import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-20 text-center">
      <p className="text-lg font-semibold text-slate-800">Not found</p>
      <p className="mt-1 text-sm text-slate-500">This admin page or record does not exist.</p>
      <Link href="/admin" className="mt-4 inline-block text-sm text-teal hover:underline">Back to dashboard</Link>
    </div>
  );
}
