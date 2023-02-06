import { cva } from "class-variance-authority";
import React, { ReactElement, ReactNode } from "react";

const rootStyles = cva([
    "font-mono",
    "cui-prose",
    "cui-prose-md",
    "dark:cui-prose-invert",
    "prose-pre:dark:cui-bg-gray-700",
]);

export interface MarkdownProps {
    children: ReactNode | ReactNode[];
    className?: { root?: string };
}

export const Markdown = ({
    children,
    className,
}: MarkdownProps): ReactElement => (
    <div className={rootStyles({ className: className?.root })}>{children}</div>
);
