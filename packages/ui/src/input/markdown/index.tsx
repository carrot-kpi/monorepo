import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React, { ReactElement, useCallback, useState } from "react";

import { MenuBar } from "./menu-bar";
import { TextMono } from "../../text-mono";

export interface MarkdownInputProps {
    id: string;
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

export const MarkdownInput = ({
    id,
    label,
    placeholder,
    value,
    onChange,
}: MarkdownInputProps): ReactElement => {
    const editor = useEditor({
        content: value,
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder,
                emptyEditorClass:
                    "before:cui-content-[attr(data-placeholder)] before:cui-absolute before:cui-opacity-30 dark:before:cui-opacity-20 cui-text-sm cui-font-normal cui-text-black dark:cui-text-white",
            }),
        ],
        editorProps: {
            attributes: {
                class: "cui-prose-sm focus:cui-outline-none cui-font-mono cui-h-full",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    const [focused, setFocused] = useState(false);

    const handleFocus = useCallback(() => {
        setFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
        setFocused(false);
    }, []);

    return (
        <div className="cui-flex cui-min-h-full cui-flex-col cui-gap-2 cui-w-[500px]">
            <label className="cui-block" htmlFor={id}>
                <TextMono size="sm" className="cui-font-medium">
                    {label}
                </TextMono>
            </label>
            <div
                className="cui-rounded-xxl cui-border cui-border-black dark:cui-border-white focus-within:cui-outline-none focus-within:cui-border-orange dark:focus-within:cui-border-orange"
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                {editor && <MenuBar editor={editor} focused={focused} />}
                <EditorContent
                    className="cui-scrollbar cui-h-44 cui-overflow-y-auto cui-overflow-x-hidden cui-p-3 cui-text-sm cui-font-normal cui-cursor-text cui-text-black dark:cui-text-white focus:cui-outline-none"
                    editor={editor}
                />
            </div>
        </div>
    );
};
