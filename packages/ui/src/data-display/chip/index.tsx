import { cva } from "class-variance-authority";
import React, { ReactNode } from "react";
import { Typography } from "../typography";

const rootStyles = cva([
    "cui-bg-transparent",
    "cui-cursor-default",
    "cui-p-1",
    "cui-px-2",
    "cui-text-xs",
    "cui-rounded-lg",
    "cui-border",
    "cui-border-black",
    "dark:cui-border-white",
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
