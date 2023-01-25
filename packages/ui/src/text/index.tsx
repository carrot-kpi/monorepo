import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

const rootStyles = cva(
    ["cui-text-black dark:cui-text-white cui-align-middle cui-inline-block"],
    {
        variants: {
            mono: {
                true: ["cui-font-mono"],
                false: ["cui-font-sans"],
            },
            uppercase: {
                true: ["cui-uppercase"],
            },
            weight: {
                normal: ["cui-font-normal"],
                medium: ["cui-font-medium"],
                bold: ["cui-font-bold"],
            },
            size: {
                "2xs": ["cui-text-2xs"],
                xs: ["cui-text-xs"],
                sm: ["cui-text-sm"],
                md: ["cui-text-base"],
                lg: ["cui-text-lg"],
                xl: ["cui-text-xl"],
                "2xl": ["cui-text-2xl"],
            },
        },
    }
);

export interface TextProps {
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    weight?: "normal" | "medium" | "bold";
    mono?: boolean;
    uppercase?: boolean;
    className?: { root?: string };
    children: ReactNode;
}

export const Text = ({
    size,
    weight = "normal",
    mono,
    uppercase,
    className,
    children,
}: TextProps) => {
    return (
        <span
            className={rootStyles({
                size,
                weight,
                mono,
                uppercase,
                className: className?.root,
            })}
        >
            {children}
        </span>
    );
};
