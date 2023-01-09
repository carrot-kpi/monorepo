import React, { InputHTMLAttributes } from "react";
import { TextMono } from "../../text-mono";
import { FunctionComponent, ReactElement } from "react";
import { cva } from "class-variance-authority";

const inputStyles = cva(
    [
        "cui-rounded-xxl cui-p-3 cui-font-mono cui-font-normal cui-outline-none cui-placeholder-opacity-20 dark:cui-placeholder-opacity-30 cui-text-black dark:cui-text-white cui-box-border",
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
                    "cui-border cui-border-black dark:cui-border-white cui-bg-transparent",
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

interface CustomInputProps {
    className: string;
}

export interface BaseInputProps<V, C> {
    id: string;
    input: FunctionComponent<
        CustomInputProps &
            Omit<
                InputHTMLAttributes<HTMLInputElement>,
                "onChange" | "value"
            > & { onChange?: C; value?: V }
    >;
    size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    label: string;
    border?: boolean;
    placeholder: string;
    value: V;
    onChange?: C;
}

export const BaseInput = <C, V>({
    id,
    input: Input,
    label,
    size,
    border,
    placeholder,
    value,
    onChange,
}: BaseInputProps<C, V>): ReactElement => (
    <div className="flex flex-col gap-2">
        {!!label && (
            <label className="cui-block cui-mb-2" htmlFor={id}>
                <TextMono size="sm" className="cui-font-medium">
                    {label}
                </TextMono>
            </label>
        )}
        <Input
            className={inputStyles({ size, border })}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    </div>
);
