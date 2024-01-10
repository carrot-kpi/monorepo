import { cva } from "class-variance-authority";
import React, { type ReactNode } from "react";

const rootStyles = cva(["flex", "items-center", "justify-center"], {
    variants: {
        variant: {
            md: ["w-8", "h-8"],
            lg: ["w-11", "h-11"],
        },
        rounded: {
            true: ["rounded-full"],
            false: ["rounded-lg"],
        },
    },
});

interface ChainIconProps {
    backgroundColor: string;
    logo: ReactNode;
    variant?: "md" | "lg";
    rounded?: boolean;
    className?: string;
}

export const ChainIcon = ({
    backgroundColor,
    logo,
    variant = "md",
    rounded = false,
    className,
    ...props
}: ChainIconProps) => {
    return (
        <div
            className={rootStyles({ className, variant, rounded })}
            style={{ backgroundColor }}
            {...props}
        >
            <div className="flex items-center justify-center">{logo}</div>
        </div>
    );
};
