import React from "react";
import { mergedCva } from "../../../../utils/components";

const rootStyles = mergedCva([
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
