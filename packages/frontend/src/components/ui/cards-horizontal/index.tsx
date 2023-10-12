import { cva } from "class-variance-authority";
import React, { type ReactNode } from "react";

const rootStyles = cva([
    "px-4",
    "scrollbar-none",
    "flex",
    "gap-10",
    "overflow-x-auto",
]);

interface CardHorizontalProps {
    children: ReactNode;
    className?: string;
}

export const CardHorizontal = ({
    children,
    className,
}: CardHorizontalProps) => {
    return (
        <div className="relative">
            <div className="absolute pointer-events-none top-0 left-0 w-full h-full shadow-horizontal-scroller shadow-white dark:shadow-black" />
            <div className={rootStyles({ className })}>{children}</div>
        </div>
    );
};
