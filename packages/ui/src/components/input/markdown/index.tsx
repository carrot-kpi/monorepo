import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React, { ReactElement, useCallback, useId, useState } from "react";

import { MenuBar } from "./menu-bar";
import { BaseInputProps, BaseInputWrapper } from "../commons";
import { mergedCva } from "../../../utils/components";

export interface MarkdownInputProps
    extends Omit<BaseInputProps<string>, "onChange" | "id"> {
    id?: string;
    label: string;
    error?: boolean;
    helperText?: string;
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
}

export const markdownInputRootStyles = mergedCva([
    "cui-rounded-xxl",
    "cui-border",
    "cui-border-black",
    "dark:cui-border-white",
    "focus-within:cui-outline-none",
    "focus-within:cui-border-orange",
    "dark:focus-within:cui-border-orange",
]);

export const markdownInputContentStyles = mergedCva(
    [
        "cui-rounded-b-xxl",
        "cui-scrollbar",
        "cui-h-44",
        "cui-overflow-y-auto",
        "cui-overflow-x-hidden",
        "cui-p-3",
        "cui-text-sm",
        "cui-font-normal",
        "cui-cursor-text",
        "focus:cui-outline-none",
        "cui-bg-white",
        "dark:cui-bg-black",
    ],
    {
        variants: {
            error: {
                true: [
                    "cui-bg-red",
                    "cui-bg-opacity-20",
                    "dark:cui-bg-red",
                    "dark:cui-bg-opacity-20",
                ],
            },
        },
    }
);

export const MarkdownInput = ({
    id,
    label,
    error = false,
    errorText,
    info,
    placeholder,
    value,
    onChange,
    className,
}: MarkdownInputProps): ReactElement => {
    const generatedId = useId();

    const resolvedId = id || generatedId;

    const editor = useEditor({
        content: value,
        extensions: [
            StarterKit.configure({}),
            Placeholder.configure({
                placeholder,
                emptyEditorClass:
                    "before:cui-content-[attr(data-placeholder)] before:cui-absolute before:cui-opacity-30 dark:before:cui-opacity-20 cui-text-sm cui-font-normal",
            }),
        ],
        editorProps: {
            attributes: {
                class: "cui-prose cui-prose-sm focus:cui-outline-none cui-font-mono cui-h-full dark:cui-prose-invert prose-pre:dark:cui-bg-gray-700",
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
        <BaseInputWrapper
            id={resolvedId}
            label={label}
            error={error}
            errorText={errorText}
            info={info}
            className={{ ...className }}
        >
            <div
                className={markdownInputRootStyles({
                    className: className?.input,
                })}
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                <MenuBar editor={editor} focused={focused} />
                <EditorContent
                    id={resolvedId}
                    className={markdownInputContentStyles({ error })}
                    editor={editor}
                />
            </div>
        </BaseInputWrapper>
    );
};
