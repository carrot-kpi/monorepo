import React, {
    ChangeEventHandler,
    ReactNode,
    InputHTMLAttributes,
} from "react";
import { Typography, TypographyProps } from "../../data-display/typography";
import { ReactComponent as DangerIcon } from "../../../assets/danger-icon.svg";
import { ReactComponent as InfoIcon } from "../../../assets/info-icon.svg";
import { ReactElement } from "react";
import { cva } from "class-variance-authority";

export interface PartialBaseInputProps<V> {
    error?: boolean;
    helperText?: string;
    variant?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    value?: V;
    border?: boolean;
}

export type BaseInputProps<V> = PartialBaseInputProps<V> &
    BaseInputWrapperProps &
    Omit<
        InputHTMLAttributes<HTMLInputElement>,
        keyof PartialBaseInputProps<V> | keyof BaseInputWrapperProps | "ref"
    >;

export const inputStyles = cva(
    [
        "cui-rounded-xxl",
        "cui-p-3",
        "cui-font-mono",
        "cui-font-normal",
        "focus:cui-outline-none",
        "cui-placeholder-opacity-20",
        "dark:cui-placeholder-opacity-30",
        "cui-text-black",
        "dark:cui-text-white",
        "cui-box-border",
        "cui-bg-white",
        "dark:cui-bg-black",
    ],
    {
        variants: {
            error: {
                true: [
                    "cui-bg-red",
                    "cui-bg-opacity-20",
                    "dark:cui-bg-red",
                    "dark:cui-bg-opacity-20",
                ],
            },
            variant: {
                "2xs": ["cui-text-2xs"],
                xs: ["cui-text-xs"],
                sm: ["cui-text-sm"],
                md: ["cui-text-base"],
                lg: ["cui-text-lg"],
                xl: ["cui-text-xl"],
                "2xl": ["cui-text-2xl"],
            },
            border: {
                true: [
                    "cui-border",
                    "cui-border-black",
                    "dark:cui-border-white",
                    "focus:cui-border-orange",
                    "dark:focus:cui-border-orange",
                    "cui-bg-transparent",
                ],
                false: [
                    "cui-border-none",
                    "cui-bg-gray-200",
                    "dark:cui-bg-gray-700",
                ],
            },
        },
        defaultVariants: { variant: "md", border: true },
    }
);

const labelStyles = cva(["cui-block", "cui-w-fit", "cui-mb-1"]);

const helperTextWrapperStyles = cva([
    "cui-flex",
    "cui-items-center",
    "cui-gap-2",
    "cui-mt-2",
]);

const helperTextIconStyles = cva([], {
    variants: {
        variant: {
            danger: ["cui-stroke-red"],
            info: ["cui-stroke-black", "dark:cui-stroke-white"],
        },
    },
});

const helperTextStyles = cva([], {
    variants: {
        error: {
            true: ["cui-text-red", "dark:cui-text-red"],
        },
    },
});

export interface BaseInputWrapperProps {
    id: string;
    label?: string;
    error?: boolean;
    helperText?: string;
    className?: {
        root?: string;
        label?: string;
        labelText?: TypographyProps["className"];
        helperTextContainer?: string;
        helperTextIcon?: string;
        helperText?: TypographyProps["className"];
        // should be applied when using the wrapper
        input?: string;
    };
    children?: ReactNode;
}

export const BaseInputWrapper = ({
    id,
    label,
    error,
    helperText,
    className,
    children,
}: BaseInputWrapperProps): ReactElement => (
    <div className={className?.root}>
        {!!label && (
            <label
                className={labelStyles({ className: className?.label })}
                htmlFor={id}
            >
                <Typography
                    variant="xs"
                    weight="medium"
                    className={className?.labelText}
                >
                    {label}
                </Typography>
            </label>
        )}
        {children}
        {helperText && (
            <div
                className={helperTextWrapperStyles({
                    className: className?.helperTextContainer,
                })}
            >
                {error ? (
                    <DangerIcon
                        className={helperTextIconStyles({
                            variant: "danger",
                            className: className?.helperTextIcon,
                        })}
                    />
                ) : (
                    <InfoIcon
                        className={helperTextIconStyles({
                            variant: "info",
                            className: className?.helperTextIcon,
                        })}
                    />
                )}
                <Typography
                    variant="xs"
                    className={{
                        root: helperTextStyles({
                            error,
                        }),
                        ...className?.helperText,
                    }}
                >
                    {helperText}
                </Typography>
            </div>
        )}
    </div>
);
