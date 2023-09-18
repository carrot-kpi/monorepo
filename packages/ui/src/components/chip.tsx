import React, { type HTMLAttributes, type ReactNode } from "react";
import { mergedCva } from "../utils/components";
import { Typography } from "./typography";

const rootStyles = mergedCva(
    [
        "cui-bg-transparent",
        "cui-w-fit",
        "cui-rounded-md",
        "cui-border",
        "cui-border-black",
        "dark:cui-border-white",
        "cui-whitespace-nowrap",
        "cui-transition-colors",
    ],
    {
        variants: {
            size: {
                small: ["cui-py-1", "cui-px-2", "cui-text-xs"],
                big: ["cui-py-3", "cui-px-4"],
            },
            clickable: {
                true: ["cui-cursor-pointer", "hover:cui-bg-orange"],
            },
            active: {
                true: ["cui-cursor-pointer", "cui-bg-black"],
            },
        },
        compoundVariants: [
            {
                clickable: true,
                active: true,
                className: ["hover:cui-bg-black"],
            },
        ],
    },
);

const textStyles = mergedCva(["cui-transition-colors"], {
    variants: {
        active: {
            true: ["cui-text-white"],
        },
    },
});

export interface BaseChipsProps {
    size?: "big" | "small";
    clickable?: boolean;
    active?: boolean;
    className?: { root?: string; text?: string };
    children: ReactNode;
}

export type ChipProps = BaseChipsProps &
    Omit<HTMLAttributes<HTMLDivElement>, keyof BaseChipsProps>;

export const Chip = ({
    size = "small",
    clickable,
    active,
    children,
    className,
    ...rest
}: ChipProps) => (
    <div
        {...rest}
        className={rootStyles({
            size,
            clickable,
            active,
            className: className?.root,
        })}
    >
        <Typography
            className={{
                root: textStyles({ active, className: className?.text }),
            }}
            variant="sm"
        >
            {children}
        </Typography>
    </div>
);
