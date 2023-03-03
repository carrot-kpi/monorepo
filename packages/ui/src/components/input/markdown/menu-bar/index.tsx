import React, { ReactElement, useMemo } from "react";

import { MenuItem } from "../menu-item";
import { ReactComponent as H1Icon } from "../../../../assets/h1-icon.svg";
import { ReactComponent as H2Icon } from "../../../../assets/h2-icon.svg";
import { ReactComponent as BoldIcon } from "../../../../assets/bold-icon.svg";
import { ReactComponent as CodeIcon } from "../../../../assets/code-icon.svg";
import { ReactComponent as DoubleQuotesIcon } from "../../../../assets/double-quotes-icon.svg";
import { ReactComponent as ItalicIcon } from "../../../../assets/italic-icon.svg";
import { ReactComponent as ListOrderedIcon } from "../../../../assets/list-ordered-icon.svg";
import { ReactComponent as ListUnorderedIcon } from "../../../../assets/list-unordered-icon.svg";
import { Editor } from "@tiptap/react";
import { mergedCva } from "../../../../utils/components";

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
    }
);

interface MenuBarProps {
    editor: Editor | null;
    focused?: boolean;
}

export const MenuBar = ({ editor, focused }: MenuBarProps): ReactElement => {
    const items = useMemo(
        () => [
            {
                icon: H1Icon,
                title: "Heading 1",
                action: () =>
                    editor?.chain().focus().toggleHeading({ level: 1 }).run(),
                isActive: () => !!editor?.isActive("heading", { level: 1 }),
            },
            {
                icon: H2Icon,
                title: "Heading 2",
                action: () =>
                    editor?.chain().focus().toggleHeading({ level: 2 }).run(),
                isActive: () => !!editor?.isActive("heading", { level: 2 }),
            },
            {
                icon: BoldIcon,
                title: "Bold",
                action: () => editor?.chain().focus().toggleBold().run(),
                isActive: () => !!editor?.isActive("bold"),
            },
            {
                icon: ItalicIcon,
                title: "Italic",
                action: () => editor?.chain().focus().toggleItalic().run(),
                isActive: () => !!editor?.isActive("italic"),
            },
            {
                icon: CodeIcon,
                title: "Code",
                action: () => editor?.chain().focus().toggleCodeBlock().run(),
                isActive: () => !!editor?.isActive("code"),
            },
            {
                icon: DoubleQuotesIcon,
                title: "Blockquote",
                action: () => editor?.chain().focus().toggleBlockquote().run(),
                isActive: () => !!editor?.isActive("blockquote"),
            },
            {
                icon: ListOrderedIcon,
                title: "Ordered List",
                action: () => editor?.chain().focus().toggleOrderedList().run(),
                isActive: () => !!editor?.isActive("orderedList"),
            },
            {
                icon: ListUnorderedIcon,
                title: "Bullet List",
                action: () => editor?.chain().focus().toggleBulletList().run(),
                isActive: () => !!editor?.isActive("bulletList"),
            },
        ],
        [editor]
    );

    return (
        <div className={rootStyles({ focused })}>
            {items.map((item, index) => (
                <MenuItem key={index} {...item} />
            ))}
        </div>
    );
};
