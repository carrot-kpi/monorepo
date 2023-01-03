import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

const textStyles = cva(["font-mono dark:text-white"], {
    variants: {
        caps: {
            true: ["cui-uppercase"],
        },
        weight: {
            medium: ["cui-font-medium"],
        },
        color: {
            white: "cui-text-white",
            black: "cui-text-black",
        },
        size: {
            xxs: ["cui-text-xxs"],
            xs: ["cui-text-xs"],
            sm: ["cui-text-sm"],
            md: ["cui-text-md"],
            lg: ["cui-text-lg"],
            xl: ["cui-text-xl"],
            "2xl": ["cui-text-2xl"],
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export interface TextMonoProps {
    size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
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
