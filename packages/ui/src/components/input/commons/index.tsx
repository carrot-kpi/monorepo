import React, {
    ChangeEventHandler,
    FunctionComponent,
    InputHTMLAttributes,
    ReactElement,
    ReactNode,
} from "react";
import { ReactComponent as DangerIcon } from "../../../assets/danger-icon.svg";
import { ReactComponent as InfoIcon } from "../../../assets/info-icon.svg";
import { mergedCva } from "../../../utils/components";
import { Typography, TypographyProps } from "../../data-display/typography";

export interface PartialBaseInputProps<V> {
    error?: boolean;
    helperText?: string;
    variant?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    value?: V | null;
    border?: boolean;
}

export type BaseInputProps<V> = PartialBaseInputProps<V> &
    BaseInputWrapperProps &
    Omit<
        InputHTMLAttributes<HTMLInputElement>,
        keyof PartialBaseInputProps<V> | keyof BaseInputWrapperProps | "ref"
    >;

const inputWrapperStyles = mergedCva(["cui-w-fit", "cui-relative"]);

const inputIconWrapperStyles = mergedCva(
    [
        "cui-absolute",
        "cui-top-0",
        "cui-h-full",
        "cui-w-12",
        "cui-flex",
        "cui-justify-center",
        "cui-items-center",
        "cui-pointer-events-none",
    ],
    {
        variants: {
            placement: {
                left: ["cui-left-0"],
                right: ["cui-right-0"],
            },
        },
    }
);

const inputActionWrapperStyles = mergedCva(
    [
        "cui-absolute",
        "cui-top-0",
        "cui-h-full",
        "cui-flex",
        "cui-justify-center",
        "cui-items-center",
    ],
    {
        variants: {
            placement: {
                left: ["cui-left-0"],
                right: ["cui-right-0"],
            },
        },
    }
);

export const inputIconStyles = mergedCva([
    "cui-w-5",
    "cui-text-black",
    "dark:cui-text-white",
]);

export const inputStyles = mergedCva(
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
        "cui-border",
    ],
    {
        variants: {
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
                    "cui-border-black",
                    "dark:cui-border-white",
                    "focus:cui-border-orange",
                    "dark:focus:cui-border-orange",
                    "cui-bg-transparent",
                ],
                false: [
                    "cui-border-gray-200",
                    "cui-bg-gray-200",
                    "dark:cui-border-gray-700",
                    "dark:cui-bg-gray-700",
                ],
            },
            error: {
                true: ["cui-bg-red/20 dark:cui-bg-red/20", "cui-border-red/10"],
            },
            hasLeftIcon: {
                true: ["cui-pl-12"],
            },
        },
        defaultVariants: { variant: "md", border: true },
    }
);

const labelStyles = mergedCva(["cui-block", "cui-w-fit", "cui-mb-1"]);

const helperTextWrapperStyles = mergedCva([
    "cui-flex",
    "cui-items-center",
    "cui-gap-2",
    "cui-mt-2",
]);

const helperTextIconStyles = mergedCva(["cui-w-6"], {
    variants: {
        variant: {
            danger: ["cui-stroke-red"],
            info: ["cui-stroke-black", "dark:cui-stroke-white"],
        },
    },
});

const helperTextStyles = mergedCva([], {
    variants: {
        error: {
            true: ["cui-text-red", "dark:cui-text-red"],
        },
    },
});

export interface BaseInputWrapperProps {
    id: string;
    label?: string;
    variant?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    error?: boolean;
    border?: boolean;
    helperText?: string;
    icon?: FunctionComponent<React.SVGProps<SVGSVGElement>>;
    iconPlacement?: "left" | "right";
    action?: ReactNode;
    actionPlacement?: "left" | "right";
    className?: {
        root?: string;
        label?: string;
        labelText?: TypographyProps["className"];
        helperTextContainer?: string;
        helperTextIcon?: string;
        helperText?: TypographyProps["className"];
        // should be applied when using the wrapper
        inputIcon?: string;
        inputIconWrapper?: string;
        inputActionWrapper?: string;
        inputWrapper?: string;
        input?: string;
    };
    children?: ReactNode;
}

export const BaseInputWrapper = ({
    id,
    label,
    error,
    helperText,
    icon: Icon,
    iconPlacement = "right",
    action: Action,
    actionPlacement = "right",
    className,
    children,
}: BaseInputWrapperProps): ReactElement => {
    const icon = !Action && Icon && (
        <div
            className={inputIconWrapperStyles({
                className: className?.inputIconWrapper,
                placement: iconPlacement,
            })}
        >
            <Icon
                className={inputIconStyles({
                    className: className?.inputIcon,
                })}
            />
        </div>
    );

    const action = Action && (
        <div
            className={inputActionWrapperStyles({
                className: className?.inputActionWrapper,
                placement: iconPlacement,
            })}
        >
            {Action}
        </div>
    );

    return (
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
            <div
                className={inputWrapperStyles({
                    className: className?.inputWrapper,
                })}
            >
                {iconPlacement === "left" && icon}
                {actionPlacement === "left" && action}
                {children}
                {iconPlacement === "right" && icon}
                {actionPlacement === "right" && action}
            </div>
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
                            ...className?.helperText,
                            root: helperTextStyles({
                                error,
                                className: className?.helperText?.root,
                            }),
                        }}
                    >
                        {helperText}
                    </Typography>
                </div>
            )}
        </div>
    );
};
