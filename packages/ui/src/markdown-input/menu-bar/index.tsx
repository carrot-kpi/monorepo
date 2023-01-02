import React, { Fragment, ReactElement } from "react";

import { MenuItem } from "../menu-item";
import H1Icon from "../../assets/h1-icon.svg";
import H2Icon from "../../assets/h2-icon.svg";
import BoldIcon from "../../assets/bold-icon.svg";
import CodeIcon from "../../assets/code-icon.svg";
import DoubleQuotesIcon from "../../assets/double-quotes-icon.svg";
import ItalicIcon from "../../assets/italic-icon.svg";
import ListOrderedIcon from "../../assets/list-ordered-icon.svg";
import ListUnorderedIcon from "../../assets/list-unordered-icon.svg";

interface MenuBarProps {
    editor: any;
}

export const MenuBar = ({ editor }: MenuBarProps): ReactElement => {
    const items = [
        {
            icon: H1Icon,
            title: "Heading 1",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: () => editor.isActive("heading", { level: 1 }),
        },
        {
            icon: H2Icon,
            title: "Heading 2",
            action: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: () => editor.isActive("heading", { level: 2 }),
        },
        {
            icon: BoldIcon,
            title: "Bold",
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: () => editor.isActive("bold"),
        },
        {
            icon: ItalicIcon,
            title: "Italic",
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: () => editor.isActive("italic"),
        },
        {
            icon: CodeIcon,
            title: "Code",
            action: () => editor.chain().focus().toggleCodeBlock().run(),
            isActive: () => editor.isActive("code"),
        },
        {
            icon: DoubleQuotesIcon,
            title: "Blockquote",
            action: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: () => editor.isActive("blockquote"),
        },
        {
            icon: ListOrderedIcon,
            title: "Ordered List",
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: () => editor.isActive("orderedList"),
        },
        {
            icon: ListUnorderedIcon,
            title: "Bullet List",
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: () => editor.isActive("bulletList"),
        },
    ];

    return (
        <div className="cui-flex cui-content-center cui-gap-2.5 cui-border-b cui-border-black cui-p-2">
            {items.map((item, index) => (
                <Fragment key={index}>
                    <MenuItem {...item} />
                </Fragment>
            ))}
        </div>
    );
};
