import { cva } from "class-variance-authority";
import React, { ReactNode } from "react";

const rootStyles = cva([
    "scrollbar-none",
    "flex",
    "gap-10",
    "overflow-x-auto",
    "snap-mandatory",
    "snap-x",
]);

interface CardHorizontalProps {
    children: ReactNode;
    className?: string;
}

export const CardHorizontal = ({
    children,
    className,
}: CardHorizontalProps) => (
    <div className={rootStyles({ className })}>{children}</div>
);
