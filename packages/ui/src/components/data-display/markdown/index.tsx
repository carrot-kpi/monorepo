import React, { ReactElement, ReactNode } from "react";
import { mergedCva } from "../../../utils/components";

const rootStyles = mergedCva([
    "font-mono",
    "cui-prose",
    "cui-prose-md",
    "first:only:prose-p:cui-my-0",
    "dark:cui-prose-invert",
    "prose-pre:dark:cui-bg-gray-700",
]);

export interface MarkdownProps {
    children: ReactNode;
    className?: { root?: string };
}

export const Markdown = ({
    children,
    className,
}: MarkdownProps): ReactElement => {
    if (typeof children !== "string") {
        console.warn(
            "the markdown component needs to be passed a string with the children prop"
        );
        return <></>;
    }

    return (
        <div
            className={rootStyles({ className: className?.root })}
            dangerouslySetInnerHTML={{ __html: children }}
        />
    );
};
