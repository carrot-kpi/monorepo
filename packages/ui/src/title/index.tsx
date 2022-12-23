import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

const titleStyles = cva(["font-sans", "font-bold"], {
    variants: {
        color: {
            white: "cui-text-white",
            black: "cui-text-black",
        },
        size: {
            sm: ["cui-text-sm"],
            xl: ["cui-text-xl"],
            "2xl": ["cui-text-2xl"],
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
        color: "black",
        size: "sm",
    },
});

export interface TitleProps {
    size?:
        | "sm"
        | "xl"
        | "2xl"
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
