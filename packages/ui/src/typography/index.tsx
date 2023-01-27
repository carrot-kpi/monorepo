import React, { ElementType, ReactNode } from "react";
import { cva } from "class-variance-authority";

const rootStyles = cva(["cui-text-black dark:cui-text-white"], {
    variants: {
        uppercase: {
            true: ["cui-uppercase"],
        },
        variant: {
            "2xs": ["cui-font-mono", "cui-font-normal", "cui-text-2xs"],
            xs: ["cui-font-mono", "cui-font-normal", "cui-text-xs"],
            sm: ["cui-font-mono", "cui-font-normal", "cui-text-sm"],
            md: ["cui-font-mono", "cui-font-normal", "cui-text-base"],
            lg: ["cui-font-mono", "cui-font-normal", "cui-text-lg"],
            xl: ["cui-font-mono", "cui-font-normal", "cui-text-xl"],
            "2xl": ["cui-font-mono", "cui-font-normal", "cui-text-2xl"],
            h6: ["cui-font-sans", "cui-font-bold", "cui-text-h6"],
            h5: ["cui-font-sans", "cui-font-bold", "cui-text-h5"],
            h4: ["cui-font-sans", "cui-font-bold", "cui-text-h4"],
            h3: ["cui-font-sans", "cui-font-bold", "cui-text-h3"],
            h2: ["cui-font-sans", "cui-font-bold", "cui-text-h2"],
            h1: ["cui-font-sans", "cui-font-bold", "cui-text-h1"],
        },
        weight: {
            normal: ["cui-font-normal"],
            medium: ["cui-font-medium"],
            bold: ["cui-font-bold"],
        },
    },
});

type TypographyVariant =
    | "2xs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";

export interface TypographyProps {
    variant?: TypographyVariant;
    weight?: "normal" | "medium" | "bold";
    uppercase?: boolean;
    className?: { root?: string };
    children: ReactNode;
}

const COMPONENT_MAP: Record<TypographyVariant, ElementType> = {
    "2xs": "p",
    xs: "p",
    sm: "p",
    md: "p",
    lg: "p",
    xl: "p",
    "2xl": "p",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
};

export const Typography = ({
    variant = "md",
    weight,
    uppercase,
    className,
    children,
}: TypographyProps) => {
    const Root = COMPONENT_MAP[variant];

    return (
        <Root
            className={rootStyles({
                variant,
                weight,
                uppercase,
                className: className?.root,
            })}
        >
            {children}
        </Root>
    );
};
