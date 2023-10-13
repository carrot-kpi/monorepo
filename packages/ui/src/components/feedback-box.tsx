import React, { type ReactNode } from "react";
import { mergedCva } from "../utils/components";
import { Typography } from "./typography";
import Warning from "../icons/warning";

const rootStyles = mergedCva(["cui-p-4", "cui-border", "cui-border-black"], {
    variants: {
        variant: {
            success: ["cui-bg-green"],
            info: ["cui-bg-sky-blue"],
            warning: ["cui-bg-yellow"],
            error: ["cui-bg-red"],
        },
        border: {
            rounded: ["cui-rounded-lg"],
            squared: [],
            none: ["cui-border-none"],
        },
    },
});

const titleContainerStyles = mergedCva(["cui-flex", "cui-items-center"]);

const titleStyles = mergedCva(["cui-leading-4", "cui-font-medium", "cui-mb-2"]);

export interface FeedbackBoxProps {
    variant?: "success" | "info" | "warning" | "error";
    border?: "none" | "rounded" | "squared";
    roundedBorder?: boolean;
    messages?: {
        title: string;
    };
    icon?: boolean;
    children?: ReactNode;
    className?: { root?: string; title?: string; titleContainer?: string };
}

export const FeedbackBox = ({
    variant = "info",
    border = "rounded",
    messages,
    icon,
    children,
    className,
}: FeedbackBoxProps) => {
    return (
        <div
            className={rootStyles({
                variant,
                border,
                className: className?.root,
            })}
        >
            <div
                className={titleContainerStyles({
                    className: className?.titleContainer,
                })}
            >
                {icon && <Warning className="cui-mr-3 cui-mb-2" />}
                {messages?.title && (
                    <Typography
                        uppercase
                        className={{
                            root: titleStyles({ className: className?.title }),
                        }}
                    >
                        {messages.title}
                    </Typography>
                )}
            </div>
            {children}
        </div>
    );
};
