import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

interface RowsWrapperProps {
    children: ReactNode;
    color?: "white" | "black";
}

export const RowsWrapper = ({ children, color }: RowsWrapperProps) => (
    <div className={rowsWrapperStyles({ color })}>{children}</div>
);

const rowsWrapperStyles = cva(["p-4 space-y-3 border-t"], {
    variants: {
        color: {
            black: ["border-gray-600"],
            white: ["border-white"],
        },
    },
    defaultVariants: {
        color: "black",
    },
});
