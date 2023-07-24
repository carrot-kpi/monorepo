import React, { type ReactElement, type ReactNode } from "react";
import { mergedCx } from "../../../utils/components";

export interface MarkdownProps {
    children?: ReactNode;
    className?: { root?: string };
}

export const Markdown = ({
    children,
    className,
    ...rest
}: MarkdownProps): ReactElement => {
    const rootProps =
        typeof children === "string"
            ? { dangerouslySetInnerHTML: { __html: children } }
            : {};

    return (
        <div
            className={mergedCx(
                [
                    "cui-prose",
                    "cui-prose-md",
                    "first:only:prose-p:cui-my-0",
                    "dark:cui-prose-invert",
                    "prose-pre:dark:cui-bg-gray-700",
                ],
                className?.root,
            )}
            {...rest}
            {...rootProps}
        >
            {typeof children !== "string" ? children : null}
        </div>
    );
};
