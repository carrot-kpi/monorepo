import React, { type ReactNode } from "react";
import { mergedCva } from "../../../utils/components";
import { Typography } from "../typography";

const rootStyles = mergedCva([
    "cui-bg-transparent",
    "cui-w-fit",
    "cui-p-1",
    "cui-px-2",
    "cui-text-xs",
    "cui-rounded-lg",
    "cui-border",
    "cui-border-black",
    "dark:cui-border-white",
    "cui-whitespace-nowrap",
]);

export interface ChipProps {
    children: ReactNode;
    className?: { root?: string; text?: string };
}

export const Chip = ({ children, className }: ChipProps) => (
    <div className={rootStyles({ className: className?.root })}>
        <Typography className={{ root: className?.text }} variant="sm">
            {children}
        </Typography>
    </div>
);
