import React from "react";
import { mergedCva } from "../../../utils/components";

const rootStyles = mergedCva(
    ["cui-bg-gray-200 dark:cui-bg-gray-600 cui-animate-pulse"],
    {
        variants: {
            circular: {
                true: ["cui-rounded-full"],
                false: ["cui-rounded"],
            },
            variant: {
                xs: ["cui-h-xs"],
                sm: ["cui-h-sm"],
                base: ["cui-h-base"],
                xl: ["cui-h-xl"],
                "2xl": ["cui-h-2xl"],
                h4: ["cui-h-h4"],
                h3: ["cui-h-h3"],
                h2: ["cui-h-h2"],
                h1: ["cui-h-h1"],
            },
        },
    }
);

type SkeletonVariant =
    | "xs"
    | "sm"
    | "base"
    | "xl"
    | "2xl"
    | "h1"
    | "h2"
    | "h3"
    | "h4";

export interface SkeletonProps {
    variant?: SkeletonVariant;
    circular?: boolean;
    width?: number | string;
    height?: number | string;
    className?: { root?: string };
}

export const Skeleton = ({
    variant = "base",
    circular,
    width,
    height,
    className,
    ...rest
}: SkeletonProps) => {
    return (
        <div
            style={{
                width,
                height: circular ? width : !!variant ? undefined : height,
            }}
            className={rootStyles({
                variant,
                circular: !!circular,
                className: className?.root,
            })}
            {...rest}
        />
    );
};
