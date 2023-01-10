import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

const textStyles = cva(["cui-font-mono cui-text-black dark:cui-text-white"], {
    variants: {
        caps: {
            true: ["cui-uppercase"],
        },
        weight: {
            medium: ["cui-font-medium"],
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
});

export interface TextMonoProps {
    size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    weight?: "medium";
    caps?: boolean;
    className?: string;
    children: ReactNode;
}

export const TextMono = ({
    children,
    size = "md",
    caps,
    weight,
    className,
}: TextMonoProps) => {
    return (
        <p
            className={textStyles({
                size,
                caps,
                weight,
                className,
            })}
        >
            {children}
        </p>
    );
};
