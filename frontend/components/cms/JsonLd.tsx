import { pageJsonLd } from "@/lib/seo";

/** JSON for an ld+json script tag. Every `<` is written as a unicode escape so content can never close the tag. */
export function ldJson(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Raw structured-data blocks (used by routes that build their own JSON-LD). */
export function LdScripts({ data }: { data: object[] }) {
  if (!data.length) return null;
  return (
    <>
      {data.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(d) }} />
      ))}
    </>
  );
}

/** Renders the page's structured data from the CMS. */
export default async function JsonLd({ path }: { path: string }) {
  return <LdScripts data={await pageJsonLd(path)} />;
}
