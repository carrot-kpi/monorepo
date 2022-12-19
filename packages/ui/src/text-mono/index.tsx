import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

const textStyles = cva(["font-mono"], {
    variants: {
        caps: {
            true: ["uppercase"],
        },
        weight: {
            medium: ["font-medium"],
        },
        color: {
            white: "text-white",
            black: "text-black",
        },
        size: {
            "2xs": ["text-2xs"],
            xs: ["text-xs"],
            sm: ["text-sm"],
            md: ["text-md"],
            lg: ["text-lg"],
            xl: ["text-xl"],
            "2xl": ["text-2xl"],
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export interface TextMonoProps {
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    color?: "white" | "black";
    weight?: "medium";
    caps?: boolean;
    className?: string;
    children: ReactNode;
}

export const TextMono = ({
    children,
    size,
    color,
    caps,
    weight,
    className,
}: TextMonoProps) => {
    return (
        <p className={textStyles({ color, size, caps, weight, className })}>
            {children}
        </p>
    );
};
