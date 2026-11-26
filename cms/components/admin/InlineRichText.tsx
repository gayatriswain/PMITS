"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Bold, CornerDownLeft, Italic, Link2, RemoveFormatting, Strikethrough, Underline as UnderlineIcon } from "lucide-react";

/**
 * Small formatting editor for paragraph-style text on the website (bold, italic, underline, links,
 * line breaks). It stays inline - no headings or lists - so the text keeps the section's design.
 * Stored as a short HTML string (e.g. `We <strong>build</strong> websites`); the server cleans it again.
 */
export const toInline = (html: string) =>
  html
    .trim()
    .replace(/^<p>/, "")
    .replace(/<\/p>$/, "")
    .replace(/<\/p>\s*<p>/g, "<br><br>")
    .replace(/<p><\/p>/g, "")
    .replace(/&nbsp;/g, " ");

export function InlineRichText({ value, onChange, id, placeholder }: { value: string; onChange: (html: string) => void; id?: string; placeholder?: string }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false, bulletList: false, orderedList: false, listItem: false, blockquote: false, codeBlock: false, code: false, horizontalRule: false, link: false,
      }),
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

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/15">
      <div className="flex items-center gap-0.5 border-b border-slate-100 bg-slate-50/60 px-1.5 py-1">
        <button type="button" title="Bold (Ctrl+B)" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-3.5 w-3.5" /></button>
        <button type="button" title="Italic (Ctrl+I)" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-3.5 w-3.5" /></button>
        <button type="button" title="Underline (Ctrl+U)" className={btn(editor.isActive("underline"))} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon className="h-3.5 w-3.5" /></button>
        <button type="button" title="Strikethrough" className={btn(editor.isActive("strike"))} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough className="h-3.5 w-3.5" /></button>
        <span className="mx-1 h-4 w-px bg-slate-200" />
        <button type="button" title="Link" className={btn(editor.isActive("link"))} onClick={setLink}><Link2 className="h-3.5 w-3.5" /></button>
        <button type="button" title="Line break (Shift+Enter)" className={btn(false)} onClick={() => editor.chain().focus().setHardBreak().run()}><CornerDownLeft className="h-3.5 w-3.5" /></button>
        <button type="button" title="Clear formatting" className={btn(false)} onClick={() => editor.chain().focus().unsetAllMarks().run()}><RemoveFormatting className="h-3.5 w-3.5" /></button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
