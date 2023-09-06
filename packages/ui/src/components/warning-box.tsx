import React, { type ReactNode } from "react";
import { mergedCva } from "../utils/components";
import { Typography } from "./typography";
import Warning from "../icons/warning";

const rootStyles = mergedCva([
    "cui-p-4",
    "cui-border",
    "cui-border-black",
    "cui-bg-yellow",
]);

const titleContainerStyles = mergedCva([
    "cui-flex",
    "cui-mb-2",
    "cui-items-end",
]);

const titleStyles = mergedCva([
    "cui-leading-4",
    "cui-font-medium",
    "cui-uppercase",
]);

export interface WarningBoxProps {
    messages: {
        title: string;
    };
    icon?: boolean;
    children?: ReactNode;
    className?: { root?: string; title?: string };
}

export const WarningBox = ({
    messages,
    icon,
    children,
    className,
}: WarningBoxProps) => {
    return (
        <div className={rootStyles({ className: className?.root })}>
            <div className={titleContainerStyles()}>
                {icon && <Warning className="cui-mr-3" />}
                <Typography
                    className={{
                        root: titleStyles({ className: className?.title }),
                    }}
                >
                    {messages.title}
                </Typography>
            </div>
            {children}
        </div>
    );
};
