import "server-only";
import sanitizeHtml from "sanitize-html";

/** Allow-list for rich text from the editor. Scripts, event handlers and javascript: URLs are stripped. */
export function sanitizeRichText(html: string | undefined | null): string {
  if (!html) return "";
  return sanitizeHtml(html, {
    allowedTags: [
      "h2", "h3", "h4", "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "a", "ul", "ol", "li", "blockquote",
      "code", "pre", "img", "figure", "figcaption", "table", "thead", "tbody", "tr", "th", "td", "span",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https"] },
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: attribs.target === "_blank" ? { ...attribs, rel: "noopener noreferrer" } : attribs,
      }),
      img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: "lazy" } }),
    },
  });
}

/**
 * Paragraph-level formatting for website section text (InlineRichText in the admin): bold, italic,
 * underline, strike, links and line breaks only. Anything else is dropped (its text is kept).
 */
export function sanitizeInlineRichText(html: string | undefined | null): string {
  if (!html) return "";
  return sanitizeHtml(
    String(html)
      .replace(/<\/p>\s*<p[^>]*>/gi, "<br><br>")
      .replace(/<\/?p[^>]*>/gi, ""),
    {
      allowedTags: ["strong", "b", "em", "i", "u", "s", "a", "br", "span", "mark", "small", "sup", "sub"],
      // class: the design's styling of words in a heading (accent colour, line breaks per screen size)
      allowedAttributes: {
        a: ["href", "target", "rel"],
        ...Object.fromEntries(["strong", "b", "em", "i", "u", "s", "br", "span", "mark", "small", "sup", "sub"].map((t) => [t, ["class"]])),
      },
      // Tailwind class names only (the website renders nothing else)
      allowedClasses: { "*": [/^[\w\-:/.[\]%#(),]+$/] },
      allowedSchemes: ["http", "https", "mailto", "tel"],
      allowProtocolRelative: false,
      transformTags: {
        a: (tagName, attribs) => {
          const out: Record<string, string> = { href: attribs.href ?? "" };
          if (attribs.target === "_blank") Object.assign(out, { target: "_blank", rel: "noopener noreferrer" });
          return { tagName, attribs: out };
        },
      },
    },
  ).trim();
}

export function readingTimeMinutes(html: string) {
  const words = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
