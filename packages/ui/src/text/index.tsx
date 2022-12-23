import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

const textStyles = cva(["font-sans"], {
    variants: {
        color: {
            white: "cui-text-white",
            black: "cui-text-black",
        },
        size: {
            xs: ["cui-text-xs"],
            sm: ["cui-text-sm"],
        },
    },
    defaultVariants: {
        color: "black",
        size: "sm",
    },
});

export interface TextProps {
    size?: "xs" | "sm";
    color?: "white" | "black";
    className?: string;
    children: ReactNode;
}

export const Text = ({ children, size, color, className }: TextProps) => {
    return <p className={textStyles({ color, size, className })}>{children}</p>;
};
