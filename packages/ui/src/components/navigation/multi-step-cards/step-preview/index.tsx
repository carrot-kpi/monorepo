import React from "react";
import type { ReactElement } from "react";
import { mergedCva } from "../../../../utils/components";
import { Typography } from "../../../data-display";

const rootStyles = mergedCva([
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
    "cui-bg-gray-500",
    "dark:cui-bg-gray-700",
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
        <Typography weight="medium" className={{ root: "cui-text-white" }}>
            {step}
        </Typography>
        <Typography variant="h2" className={{ root: "cui-text-white" }}>
            {title}
        </Typography>
    </div>
);
