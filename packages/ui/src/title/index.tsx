import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

const titleStyles = cva(["font-sans", "font-bold", "dark:text-white"], {
    variants: {
        color: {
            white: "cui-text-white",
            black: "cui-text-black",
        },
        size: {
            sm: ["cui-text-sm"],
            xl: ["cui-text-xl"],
            xxl: ["cui-text-xxl"],
            "3xl": ["cui-text-3xl"],
            "4xl": ["cui-text-4xl"],
            "5xl": ["cui-text-5xl"],
            "6xl": ["cui-text-6xl"],
            "7xl": ["cui-text-7xl"],
            "8xl": ["cui-text-8xl"],
            "9xl": ["cui-text-9xl"],
        },
    },
    defaultVariants: {
        size: "sm",
    },
});

export interface TitleProps {
    size?:
        | "sm"
        | "xl"
        | "xxl"
        | "3xl"
        | "4xl"
        | "5xl"
        | "6xl"
        | "7xl"
        | "8xl"
        | "9xl";
    color?: "white" | "black";
    className?: string;
    children: ReactNode;
}

export const Title = ({ children, size, color, className }: TitleProps) => {
    return (
        <p className={titleStyles({ color, size, className })}>{children}</p>
    );
};
