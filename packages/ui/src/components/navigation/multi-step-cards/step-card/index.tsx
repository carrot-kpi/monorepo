import React from "react";
import type { ReactElement, ReactNode } from "react";
import { mergedCva } from "../../../../utils/components";
import { Typography } from "../../../data-display";

const rootStyles = mergedCva([
    "cui-relative",
    "cui-border",
    "cui-border-black",
    "dark:cui-border-white",
    "cui-flex",
    "cui-max-w-xl",
    "cui-flex-col",
    "cui-gap-2",
    "cui-bg-white",
    "dark:cui-bg-black",
]);

const headerStyles = mergedCva([
    "cui-flex",
    "cui-flex-col",
    "cui-gap-1",
    "cui-bg-black",
    "cui-border-b",
    "cui-border-black",
    "dark:cui-border-white",
    "cui-p-4",
]);

const contentStyles = mergedCva(["cui-p-4"]);

export interface StepCardProps {
    title: string;
    step: number;
    children: ReactNode;
    className?: {
        root?: string;
        header?: string;
        content?: string;
        actionsContainer?: string;
    };
    messages: {
        step?: string;
    };
}

export const StepCard = ({
    title,
    step,
    children,
    className,
    messages,
}: StepCardProps): ReactElement => {
    return (
        <div className={rootStyles({ className: className?.root })}>
            <div className={headerStyles({ className: className?.header })}>
                <Typography
                    variant="sm"
                    weight="medium"
                    className={{ root: "cui-text-white" }}
                >
                    {messages.step} {step}
                </Typography>
                <Typography variant="h3" className={{ root: "cui-text-white" }}>
                    {title}
                </Typography>
            </div>
            <div className={contentStyles({ className: className?.content })}>
                {children}
            </div>
        </div>
    );
};
