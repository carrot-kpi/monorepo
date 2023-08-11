import React, { type ReactElement, useMemo } from "react";

import { MenuItem } from "../menu-item";
import H1 from "../../../icons/h1";
import H2 from "../../../icons/h2";
import Bold from "../../../icons/bold";
import Code from "../../../icons/code";
import DoubleQuotes from "../../../icons/double-quotes";
import Italic from "../../../icons/italic";
import ListOrdered from "../../../icons/list-ordered";
import ListUnordered from "../../../icons/list-unordered";
import { Editor } from "@tiptap/react";
import { mergedCva } from "../../../utils/components";

const rootStyles = mergedCva(
    [
        "cui-flex cui-flex-wrap cui-content-center cui-gap-2.5 cui-border-b",
        "cui-border-black dark:cui-border-white cui-p-2 cui-rounded-t-xxl",
        "cui-bg-white dark:cui-bg-black",
    ],
    {
        variants: {
            focused: {
                true: ["cui-border-orange dark:cui-border-orange"],
            },
        },
    },
);

interface MenuBarProps {
    editor: Editor | null;
    focused?: boolean;
}

export const MenuBar = ({ editor, focused }: MenuBarProps): ReactElement => {
    const items = useMemo(
        () => [
            {
                icon: H1,
                title: "Heading 1",
                action: () =>
                    editor?.chain().focus().toggleHeading({ level: 1 }).run(),
                isActive: () => !!editor?.isActive("heading", { level: 1 }),
            },
            {
                icon: H2,
                title: "Heading 2",
                action: () =>
                    editor?.chain().focus().toggleHeading({ level: 2 }).run(),
                isActive: () => !!editor?.isActive("heading", { level: 2 }),
            },
            {
                icon: Bold,
                title: "Bold",
                action: () => editor?.chain().focus().toggleBold().run(),
                isActive: () => !!editor?.isActive("bold"),
            },
            {
                icon: Italic,
                title: "Italic",
                action: () => editor?.chain().focus().toggleItalic().run(),
                isActive: () => !!editor?.isActive("italic"),
            },
            {
                icon: Code,
                title: "Code",
                action: () => editor?.chain().focus().toggleCodeBlock().run(),
                isActive: () => !!editor?.isActive("code"),
            },
            {
                icon: DoubleQuotes,
                title: "Blockquote",
                action: () => editor?.chain().focus().toggleBlockquote().run(),
                isActive: () => !!editor?.isActive("blockquote"),
            },
            {
                icon: ListOrdered,
                title: "Ordered List",
                action: () => editor?.chain().focus().toggleOrderedList().run(),
                isActive: () => !!editor?.isActive("orderedList"),
            },
            {
                icon: ListUnordered,
                title: "Bullet List",
                action: () => editor?.chain().focus().toggleBulletList().run(),
                isActive: () => !!editor?.isActive("bulletList"),
            },
        ],
        [editor],
    );

    return (
        <div className={rootStyles({ focused })}>
            {items.map((item, index) => (
                <MenuItem key={index} {...item} />
            ))}
        </div>
    );
};
