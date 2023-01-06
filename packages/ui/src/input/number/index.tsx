import React from "react";
import { TextMono } from "../../text-mono";
import { ReactElement } from "react";
import {
    NumericFormat,
    NumericFormatProps,
    OnValueChange,
} from "react-number-format";
import { cva } from "class-variance-authority";

const inputStyles = cva(
    [
        "cui-p-3 cui-font-mono cui-font-normal cui-outline-none cui-bg-white dark:cui-bg-black cui-text-black dark:cui-text-white",
    ],
    {
        variants: {
            size: {
                "2xs": ["cui-text-2xs"],
                xs: ["cui-text-xs"],
                sm: ["cui-text-sm"],
                md: ["cui-text-md"],
                lg: ["cui-text-lg"],
                xl: ["cui-text-xl"],
                "2xl": ["cui-text-2xl"],
            },
            border: {
                true: [
                    "cui-rounded-2xl cui-border cui-border-black dark:cui-border-white",
                ],
                false: ["cui-border-none"],
            },
        },
        defaultVariants: {
            size: "md",
            border: true,
        },
    }
);

export interface NumberInputProps {
    id: string;
    value: number | string;
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    label?: string;
    placeholder?: string;
    className?: string;
    border?: boolean;
    onChange: OnValueChange;
}

export const NumberInput = ({
    id,
    size,
    value,
    label,
    placeholder,
    border,
    onChange,
    ...numericFormatProps
}: NumberInputProps &
    Omit<
        NumericFormatProps,
        "onValueChange" | "size" | "onChange"
    >): ReactElement => {
    return (
        <div className="cui-flex cui-flex-col cui-gap-2">
            {label ? (
                <label className="block" htmlFor={id}>
                    <TextMono size="sm" className="font-medium">
                        {label}
                    </TextMono>
                </label>
            ) : null}
            <NumericFormat
                id={id}
                className={inputStyles({ size, border })}
                thousandSeparator=","
                decimalSeparator="."
                {...numericFormatProps}
                placeholder={placeholder}
                value={value}
                onValueChange={onChange}
            />
        </div>
    );
};
