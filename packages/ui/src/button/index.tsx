import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

const buttonStyles = cva(
    ["cui-font-mono cui-rounded-xxl cui-border cui-cursor-pointer"],
    {
        variants: {
            variant: {
                primary:
                    "cui-border-black cui-bg-black cui-text-white hover:cui-bg-orange hover:cui-text-black disabled:cui-text-white disabled:cui-bg-gray-400 disabled:cui-border-gray-400 dark:cui-bg-orange dark:cui-text-black hover:dark:cui-bg-black hover:dark:cui-text-orange hover:dark:cui-border-orange disabled:dark:cui-text-gray-400 disabled:dark:cui-bg-gray-700 disabled:dark:cui-border-gray-700",
                secondary:
                    "cui-border-black cui-bg-transparent cui-text-black hover:cui-border-white hover:cui-bg-black hover:cui-text-white dark:cui-border-white dark:cui-text-white hover:dark:cui-border-black hover:dark:cui-bg-white hover:dark:cui-text-black",
            },
            size: {
                big: ["cui-px-6 cui-py-5"],
                small: ["cui-px-6 cui-py-4 cui-text-s"],
                xsmall: ["cui-p-4 cui-text-xs"],
            },
        },
    }
);

export interface CarrotButtonProps {
    onClick?: (event: React.MouseEvent) => void;
    href?: string;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    size?: "big" | "small" | "xsmall";
    variant?: "primary" | "secondary";
    children: ReactNode;
}

export const Button = ({
    href,
    variant = "primary",
    size = "big",
    disabled,
    onClick,
    loading,
    children,
    className,
}: CarrotButtonProps) => {
    if (href) {
        return (
            <a
                className={buttonStyles({
                    size,
                    variant,
                    className: [className, "cui-inline-block"],
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
            className={buttonStyles({ size, variant, className })}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
