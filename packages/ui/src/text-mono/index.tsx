import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

const textStyles = cva(["cui-font-mono cui-text-black dark:cui-text-white"], {
    variants: {
        caps: {
            true: ["cui-uppercase"],
        },
        mediumWeight: {
            true: ["cui-font-medium"],
            false: [],
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
            xxl: ["cui-text-xxl"],
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export interface TextMonoProps {
    size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    color?: "white" | "black";
    mediumWeight?: boolean;
    caps?: boolean;
    className?: string;
    children: ReactNode;
}

export const TextMono = ({
    children,
    size,
    color,
    caps,
    mediumWeight,
    className,
}: TextMonoProps) => {
    return (
        <p
            className={textStyles({
                color,
                size,
                caps,
                mediumWeight,
                className,
            })}
        >
            {children}
        </p>
    );
};
