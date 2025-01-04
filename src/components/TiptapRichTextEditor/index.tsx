/* eslint-disable import/no-named-as-default */
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import History from "@tiptap/extension-history";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import CharacterCount from "@tiptap/extension-character-count";
import Typography from "components/Typography";
import MenuBar from "./EditorMenuBar";

const limit = 1200;

export const EditorExtensions = [
  Document,
  Paragraph,
  Text,
  Bold,
  History,
  Italic,
  Strike,
  Underline,
  BulletList,
  OrderedList,
  ListItem,
  CharacterCount.configure({
    limit,
  }),
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TiptapRichTextEditor({
  onChange,
  value,
}: {
  onChange: (...args: any) => void;
  value: string;
}) {
  const localEditor = useEditor({
    extensions: EditorExtensions,
    content: value,
    onUpdate: ({ editor }) => {
      const editorValue = editor.isEmpty ? "" : editor.getHTML();
      onChange(editorValue);
    },
    editorProps: {
      attributes: {
        class:
          "border border-black/30 border-t-0 p-4 min-h-[12rem] rounded-b-md focus-visible:outline-none focus-visible:border-ring focus-visible:ring-offset-0 !outline-none",
      },
    },
  });

  return (
    <>
      <div className="border border-black/30 rounded-t-md py-1.5 px-3">
        <MenuBar editor={localEditor} />
      </div>
      <EditorContent editor={localEditor} />
      <Typography
        variant="sm"
        className="text-right text-black/60 dark:text-white/60 mt-2 font-medium"
      >
        {localEditor?.storage.characterCount.characters()}/{limit} characters
      </Typography>
    </>
  );
}

export default TiptapRichTextEditor;
