"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { Mark, mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import HardBreak from "@tiptap/extension-hard-break";
import { Bold as BoldIcon, CornerDownLeft, Highlighter, Italic as ItalicIcon, Link2, RemoveFormatting, Strikethrough, Underline as UnderlineIcon } from "lucide-react";

/**
 * Small formatting editor for text on the website (bold, italic, underline, links, line breaks and
 * the design's coloured words). It stays inline - no headings or lists - so the text keeps the
 * section's design. Stored as a short HTML string, e.g.
 *   `Our Core Expertise, <span class="text-[#0d9488]">Your Advantage</span>`; the server cleans it again.
 */
export const toInline = (html: string) =>
  html
    .trim()
    .replace(/^<p>/, "")
    .replace(/<\/p>$/, "")
    .replace(/<\/p>\s*<p>/g, "<br><br>")
    .replace(/<p><\/p>/g, "")
    .replace(/&nbsp;/g, " ")
    // a line break that is hidden on small screens (class "hidden sm:block") needs the space after it,
    // or the words join up on phones; the editor drops that space
    .replace(/(<br class="[^"]*\bhidden\b[^"]*">)(?=[^\s<])/g, "$1 ");

/** Keeps the `class` of an element (the website's styling), e.g. <br class="hidden sm:block">. */
const classAttr = {
  class: {
    default: null as string | null,
    parseHTML: (el: HTMLElement) => el.getAttribute("class"),
    renderHTML: (a: { class?: string | null }) => (a.class ? { class: a.class } : {}),
  },
};

/** <span class="…">: a coloured / styled word of the design. */
const StyledText = Mark.create({
  name: "styledText",
  addAttributes() {
    return classAttr;
  },
  parseHTML() {
    return [{ tag: "span[class]" }, { tag: "mark" }, { tag: "small" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },
});

const BoldWithClass = Bold.extend({ addAttributes: () => classAttr });
const ItalicWithClass = Italic.extend({ addAttributes: () => classAttr });
const BreakWithClass = HardBreak.extend({ addAttributes: () => classAttr });

/** A colour for an accent button, read from its Tailwind classes (text-[#0d9488], from-[#…]…). */
function swatch(cls: string) {
  const hex = /#[0-9a-f]{3,8}/i.exec(cls);
  if (hex) return hex[0];
  const named = /(?:text|from)-(teal|emerald|green|sky|blue|indigo|violet|purple|amber|rose|red|slate|cyan)-(\d{3})/.exec(cls);
  const map: Record<string, string> = { teal: "#0d9488", emerald: "#059669", green: "#16a34a", sky: "#0284c7", blue: "#2563eb", indigo: "#4f46e5", violet: "#7c3aed", purple: "#9333ea", amber: "#d97706", rose: "#e11d48", red: "#dc2626", slate: "#475569", cyan: "#0891b2" };
  return named ? map[named[1]] : "#0d9488";
}

export function InlineRichText({ value, onChange, id, placeholder, accents = [] }: { value: string; onChange: (html: string) => void; id?: string; placeholder?: string; accents?: string[] }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false, bulletList: false, orderedList: false, listItem: false, blockquote: false, codeBlock: false, code: false, horizontalRule: false, link: false,
        bold: false, italic: false, hardBreak: false,
      }),
      BoldWithClass,
      ItalicWithClass,
      BreakWithClass,
      StyledText,
      Link.configure({ openOnClick: false, autolink: false, protocols: ["http", "https", "mailto", "tel"] }),
    ],
    content: value || "",
    editorProps: {
      attributes: { id: id ?? "", class: "prose-cms inline-rich min-h-[42px] px-3 py-2 text-sm text-slate-800 outline-none", "data-placeholder": placeholder ?? "" },
    },
    onUpdate: ({ editor: e }) => onChange(e.isEmpty ? "" : toInline(e.getHTML())),
  });

  // Value replaced from outside (page loaded, draft discarded): show it, unless the user is typing.
  useEffect(() => {
    if (!editor || editor.isFocused) return;
    if (toInline(editor.getHTML()) !== (value || "")) editor.commands.setContent(value || "", { emitUpdate: false });
  }, [value, editor]);

  if (!editor) return <div className="h-[42px] animate-pulse rounded-lg border border-slate-200 bg-slate-50" />;

  const btn = (active: boolean) => `rounded p-1 ${active ? "bg-teal/10 text-teal" : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"}`;
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL (/page, https://…, mailto: or tel:)", prev ?? "");
    if (url === null) return;
    if (url === "") editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else if (/^(https?:\/\/|\/|#|mailto:|tel:)/i.test(url)) editor.chain().focus().extendMarkRange("link").setLink({ href: url, target: url.startsWith("http") ? "_blank" : null }).run();
    else window.alert("Use a path starting with / (e.g. /contact), a full https:// URL, mailto: or tel:");
  };
  const toggleAccent = (cls: string) => {
    const on = editor.isActive("styledText", { class: cls });
    if (on) editor.chain().focus().extendMarkRange("styledText").unsetMark("styledText").run();
    else editor.chain().focus().setMark("styledText", { class: cls }).run();
  };

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/15">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-100 bg-slate-50/60 px-1.5 py-1">
        <button type="button" title="Bold (Ctrl+B)" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}><BoldIcon className="h-3.5 w-3.5" /></button>
        <button type="button" title="Italic (Ctrl+I)" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}><ItalicIcon className="h-3.5 w-3.5" /></button>
        <button type="button" title="Underline (Ctrl+U)" className={btn(editor.isActive("underline"))} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon className="h-3.5 w-3.5" /></button>
        <button type="button" title="Strikethrough" className={btn(editor.isActive("strike"))} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough className="h-3.5 w-3.5" /></button>
        {accents.length > 0 && <span className="mx-1 h-4 w-px bg-slate-200" />}
        {accents.map((cls, i) => (
          <button
            key={cls}
            type="button"
            title={`Accent colour${accents.length > 1 ? ` ${i + 1}` : ""}: select words, then click`}
            className={`${btn(editor.isActive("styledText", { class: cls }))} flex items-center gap-0.5`}
            onClick={() => toggleAccent(cls)}
          >
            <Highlighter className="h-3.5 w-3.5" />
            <span className="h-2.5 w-2.5 rounded-full ring-1 ring-black/10" style={{ background: swatch(cls) }} />
          </button>
        ))}
        <span className="mx-1 h-4 w-px bg-slate-200" />
        <button type="button" title="Link" className={btn(editor.isActive("link"))} onClick={setLink}><Link2 className="h-3.5 w-3.5" /></button>
        <button type="button" title="Line break (Shift+Enter)" className={btn(false)} onClick={() => editor.chain().focus().setHardBreak().run()}><CornerDownLeft className="h-3.5 w-3.5" /></button>
        <button type="button" title="Clear formatting" className={btn(false)} onClick={() => editor.chain().focus().unsetAllMarks().run()}><RemoveFormatting className="h-3.5 w-3.5" /></button>
      </div>
      <EditorContent editor={editor} />
      {accents.length > 0 && <p className="border-t border-slate-100 bg-slate-50/40 px-3 py-1.5 text-[11px] text-slate-500">Coloured words: select them and press the highlighter. Shift+Enter starts a new line.</p>}
    </div>
  );
}
