import { Editor } from "@tiptap/react";
import { twMerge } from "tailwind-merge";
import {
  BoldIcon,
  ItalicIcon,
  List,
  ListOrdered,
  Redo2,
  Strikethrough,
  UnderlineIcon,
  Undo2,
} from "lucide-react";
import Button, { ButtonProps } from "components/Button";

interface EditorButtonType extends ButtonProps {
  isActive?: boolean;
}

function EditorButton({
  children,
  className,
  isActive,
  ...props
}: EditorButtonType) {
  return (
    <Button
      {...props}
      shape="icon"
      type="button"
      variant="simple"
      className={twMerge(
        "w-8 h-8 [&>*]:w-5 [&>*]:h-5 hover:bg-gray-300 dark:hover:bg-gray-700 text-black/60 dark:text-white/70",
        className,
        isActive
          ? "border bg-gray-500 dark:bg-gray-600 text-white dark:text-white"
          : null
      )}
    >
      {children}
    </Button>
  );
}

function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="overflow-hidden">
      <main className="flex flex-wrap [&>*]:m-0.5 -m-0.5">
        <EditorButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <BoldIcon />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <ItalicIcon />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <UnderlineIcon />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough />
        </EditorButton>

        <EditorButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered />
        </EditorButton>

        <EditorButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo2 />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo2 />
        </EditorButton>
      </main>
    </div>
  );
}

export default MenuBar;
