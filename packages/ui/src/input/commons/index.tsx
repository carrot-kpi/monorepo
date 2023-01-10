import React, { ChangeEventHandler } from "react";
import { TextMono } from "../../text-mono";
import { ReactElement } from "react";
import { cva } from "class-variance-authority";

export interface BaseInputProps<V> extends LabelWrapperProps {
    size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    value?: V;
    border?: boolean;
}

export const inputStyles = cva(
    [
        "cui-rounded-xxl cui-p-3 cui-font-mono cui-font-normal focus:cui-outline-none cui-placeholder-opacity-20 dark:cui-placeholder-opacity-30 cui-text-black dark:cui-text-white cui-box-border",
    ],
    {
        variants: {
            size: {
                xxs: ["cui-text-xxs"],
                xs: ["cui-text-xs"],
                sm: ["cui-text-sm"],
                md: ["cui-text-md"],
                lg: ["cui-text-lg"],
                xl: ["cui-text-xl"],
                xxl: ["cui-text-xxl"],
            },
            border: {
                true: [
                    "cui-border cui-border-black dark:cui-border-white focus:cui-border-orange dark:focus:cui-border-orange cui-bg-transparent",
                ],
                false: ["cui-border-none cui-bg-gray-200 dark:cui-bg-gray-700"],
            },
        },
        defaultVariants: {
            size: "md",
            border: true,
        },
    }
);

export interface LabelWrapperProps {
    id: string;
    label: string;
    className?: string;
    children?: ReactElement;
}

export const LabelWrapper = ({
    id,
    label,
    className,
    children,
}: LabelWrapperProps): ReactElement => (
    <>
        {!!label && (
            <label
                className={`cui-block cui-w-fit cui-mb-2 ${className}`}
                htmlFor={id}
            >
                <TextMono size="sm" className="cui-font-medium">
                    {label}
                </TextMono>
            </label>
        )}
        {children}
    </>
);
