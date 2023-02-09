import React from "react";
import { cva } from "class-variance-authority";

const rootStyles = cva([
    "cui-h-[1px]",
    "cui-w-full",
    "cui-bg-black",
    "dark:cui-bg-white",
]);

export interface DividerProps {
    className?: { root?: string };
}

export const Divider = ({ className }: DividerProps) => {
    return <div className={rootStyles({ className: className?.root })} />;
};
