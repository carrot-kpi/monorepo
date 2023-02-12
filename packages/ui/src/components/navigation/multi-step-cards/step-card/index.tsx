import { cva } from "class-variance-authority";
import React from "react";
import { ReactElement, ReactNode } from "react";
import { Typography } from "../../../data-display";

const rootStyles = cva([
    "cui-border",
    "dark:cui-border-white",
    "cui-flex",
    "cui-max-w-xl",
    "cui-flex-col",
    "cui-gap-2",
    "cui-bg-white",
    "dark:cui-bg-black",
]);

const headerStyles = cva([
    "cui-flex",
    "cui-flex-col",
    "cui-gap-1",
    "cui-border-b",
    "cui-border-black",
    "dark:cui-border-white",
    "cui-p-6",
]);

const contentStyles = cva(["cui-p-6"]);

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
}

export const StepCard = ({
    title,
    step,
    children,
    className,
}: StepCardProps): ReactElement => (
    <div className={rootStyles({ className: className?.root })}>
        <div className={headerStyles({ className: className?.header })}>
            <Typography variant="sm" weight="medium">
                Step {step}
            </Typography>
            <Typography variant="h2">{title}</Typography>
        </div>
        <div className={contentStyles({ className: className?.content })}>
            {children}
        </div>
    </div>
);
