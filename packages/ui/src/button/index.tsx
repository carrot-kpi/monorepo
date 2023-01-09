import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

const buttonStyles = cva(
    [
        "cui-font-mono cui-rounded-xxl cui-border cui-border-black disabled:cui-text-white disabled:cui-bg-gray-400 disabled:cui-border-gray-400",
    ],
    {
        variants: {
            variant: {
                primary:
                    "cui-bg-black cui-text-white hover:cui-bg-orange hover:cui-text-black",
                secondary:
                    "cui-bg-transparent hover:cui-bg-black hover:cui-text-white cui-text-black",
            },
            size: {
                big: ["cui-px-6 cui-py-5"],
                small: ["cui-px-6 cui-py-4 cui-text-xs"],
                xsmall: ["cui-p-4 cui-text-xs"],
            },
            withDarkMode: {
                true: "",
            },
        },
        defaultVariants: {
            variant: "primary",
            withDarkMode: true,
            size: "big",
        },
        compoundVariants: [
            {
                variant: "primary",
                withDarkMode: true,
                class: "dark:bg-white dark:text-black",
            },
            // {
            //     variant: "secondary",
            //     withDarkMode: true,
            //     class: "dark:bg-magenta dark:text-black",
            // },
        ],
    }
);

export interface CarrotButtonProps {
    onClick?: (event: React.MouseEvent) => void;
    href?: string;
    disabled?: boolean;
    loading?: boolean;
    withDarkMode?: boolean;
    className?: string;
    size?: "big" | "small" | "xsmall";
    variant?: "primary" | "secondary";
    children: ReactNode;
}

export const Button = ({
    href,
    variant,
    size,
    disabled,
    onClick,
    loading,
    children,
    className,
    withDarkMode,
}: CarrotButtonProps) => {
    if (href) {
        return (
            <a
                className={buttonStyles({
                    size,
                    variant,
                    withDarkMode,
                    className,
                })}
                href={href}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            disabled={disabled || loading}
            className={buttonStyles({ size, variant, withDarkMode, className })}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
