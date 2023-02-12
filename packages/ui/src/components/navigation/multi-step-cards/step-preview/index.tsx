import { cva } from "class-variance-authority";
import React from "react";
import { ReactElement } from "react";
import { Typography } from "../../../data-display";

const rootStyles = cva([
    "cui-flex",
    "cui-w-full",
    "cui-max-w-xl",
    "cui-flex-col",
    "cui-gap-1",
    "cui-border-l",
    "cui-border-r",
    "cui-border-b",
    "cui-border-black",
    "dark:cui-border-white",
    "cui-bg-white",
    "dark:cui-bg-black",
    "cui-p-4",
    "[&:first-of-type]:cui-border-t",
]);

export interface NextStepPreviewProps {
    step: string;
    title: string;
    className?: { root?: string };
}

export const NextStepPreview = ({
    step,
    title,
    className,
}: NextStepPreviewProps): ReactElement => (
    <div className={rootStyles({ className: className?.root })}>
        <Typography weight="medium">{step}</Typography>
        <Typography variant="h3" className={{ root: "cui-opacity-60" }}>
            {title}
        </Typography>
    </div>
);
