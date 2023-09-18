import React, { type ReactNode } from "react";
import { mergedCva } from "../utils/components";
import { Typography } from "./typography";
import Warning from "../icons/warning";

const rootStyles = mergedCva(["cui-p-4", "cui-border", "cui-border-black"], {
    variants: {
        variant: {
            info: ["cui-bg-green"],
            warning: ["cui-bg-yellow"],
        },
        roundedBorder: {
            true: ["cui-rounded-lg"],
        },
    },
});

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

export interface FeedbackBoxProps {
    variant: "info" | "warning";
    roundedBorder?: boolean;
    messages: {
        title: string;
    };
    icon?: boolean;
    children?: ReactNode;
    className?: { root?: string; title?: string };
}

export const FeedbackBox = ({
    variant,
    roundedBorder,
    messages,
    icon,
    children,
    className,
}: FeedbackBoxProps) => {
    return (
        <div
            className={rootStyles({
                variant,
                roundedBorder,
                className: className?.root,
            })}
        >
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
