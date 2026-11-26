"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Bold, Code, Heading2, Heading3, ImageIcon, Italic, Link2, List, ListOrdered, Minus, Quote, Redo2, Strikethrough, Undo2 } from "lucide-react";
import { MediaPicker } from "./MediaPicker";

/** WYSIWYG editor. Output HTML is sanitised again on the server before saving. */
export function RichTextEditor({ value, onChange, placeholder }: { value: string; onChange: (html: string) => void; placeholder?: string }) {
  const [picker, setPicker] = useState(false);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: false }),
      Link.configure({ openOnClick: false, autolink: true, protocols: ["http", "https", "mailto", "tel"] }),
      Image.configure({ inline: false }),
    ],
    content: value || "",
    editorProps: { attributes: { class: "prose-cms px-4 py-3 text-sm text-slate-700", "data-placeholder": placeholder ?? "" } },
    onUpdate: ({ editor: e }) => onChange(e.isEmpty ? "" : e.getHTML()),
  });

  // Keep in sync if the value is replaced from outside (e.g. after loading).
  useEffect(() => {
    if (editor && value !== editor.getHTML() && !editor.isFocused) editor.commands.setContent(value || "", { emitUpdate: false });
  }, [value, editor]);

  if (!editor) return <div className="h-72 animate-pulse rounded-lg border border-slate-200 bg-slate-50" />;

  const btn = (active: boolean) => `rounded p-1.5 ${active ? "bg-teal/10 text-teal" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"}`;
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL (https://… or /page)", prev ?? "");
    if (url === null) return;
    if (url === "") editor.chain().focus().unsetLink().run();
    else if (/^(https?:\/\/|\/|mailto:|tel:)/i.test(url)) editor.chain().focus().extendMarkRange("link").setLink({ href: url, target: url.startsWith("http") ? "_blank" : undefined }).run();
    else window.alert("Use a full https:// URL or a path starting with /");
  };

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/15">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-100 bg-slate-50/60 px-2 py-1.5">
        <button type="button" title="Heading" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></button>
        <button type="button" title="Sub-heading" className={btn(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="h-4 w-4" /></button>
        <span className="mx-1 h-5 w-px bg-slate-200" />
        <button type="button" title="Bold" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></button>
        <button type="button" title="Italic" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></button>
        <button type="button" title="Strikethrough" className={btn(editor.isActive("strike"))} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough className="h-4 w-4" /></button>
        <button type="button" title="Inline code" className={btn(editor.isActive("code"))} onClick={() => editor.chain().focus().toggleCode().run()}><Code className="h-4 w-4" /></button>
        <span className="mx-1 h-5 w-px bg-slate-200" />
        <button type="button" title="Bullet list" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></button>
        <button type="button" title="Numbered list" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></button>
        <button type="button" title="Quote" className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="h-4 w-4" /></button>
        <button type="button" title="Divider" className={btn(false)} onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus className="h-4 w-4" /></button>
        <span className="mx-1 h-5 w-px bg-slate-200" />
        <button type="button" title="Link" className={btn(editor.isActive("link"))} onClick={setLink}><Link2 className="h-4 w-4" /></button>
        <button type="button" title="Image" className={btn(false)} onClick={() => setPicker(true)}><ImageIcon className="h-4 w-4" /></button>
        <span className="ml-auto flex">
          <button type="button" title="Undo" className={btn(false)} onClick={() => editor.chain().focus().undo().run()}><Undo2 className="h-4 w-4" /></button>
          <button type="button" title="Redo" className={btn(false)} onClick={() => editor.chain().focus().redo().run()}><Redo2 className="h-4 w-4" /></button>
        </span>
      </div>
      <EditorContent editor={editor} />
      {picker && (
        <MediaPicker
          onClose={() => setPicker(false)}
          onSelect={(m) => {
            editor.chain().focus().setImage({ src: m.url, alt: m.alt || "" }).run();
            setPicker(false);
          }}
        />
      )}
    </div>
  );
}
