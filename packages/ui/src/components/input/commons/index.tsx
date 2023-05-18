import React, {
    ChangeEventHandler,
    FunctionComponent,
    InputHTMLAttributes,
    LegacyRef,
    ReactElement,
    ReactNode,
    useCallback,
    useState,
} from "react";
import Info from "../../../icons/info";
import { mergedCva } from "../../../utils/components";
import { ErrorText } from "../../data-display/error-text";
import { Typography, TypographyProps } from "../../data-display/typography";
import { Popover } from "../../utils";

export interface PartialBaseInputProps<V> {
    error?: boolean;
    errorText?: string;
    variant?: "xs" | "sm" | "base" | "xl" | "2xl";
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
                xs: ["cui-text-xs"],
                sm: ["cui-text-sm"],
                base: ["cui-text-base"],
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
                true: ["cui-bg-red/20"],
            },
            hasLeftIcon: {
                true: ["cui-pl-12"],
            },
        },
        compoundVariants: [
            {
                border: false,
                error: true,
                className: ["cui-border-transparent"],
            },
        ],
        defaultVariants: { variant: "base", border: true },
    }
);

const labelStyles = mergedCva([
    "cui-flex",
    "cui-items-center",
    "cui-gap-1.5",
    "cui-w-fit",
    "cui-mb-1.5",
]);

export const infoIconStyles = mergedCva([
    "cui-w-4",
    "cui-h-4",
    "cui-text-black",
    "dark:cui-text-white",
]);

export interface BaseInputWrapperProps {
    id: string;
    label?: string;
    variant?: "xs" | "sm" | "base" | "xl" | "2xl";
    error?: boolean;
    border?: boolean;
    errorText?: string;
    info?: ReactNode;
    icon?: FunctionComponent<React.SVGProps<SVGSVGElement>>;
    iconPlacement?: "left" | "right";
    action?: ReactNode;
    actionPlacement?: "left" | "right";
    className?: {
        root?: string;
        label?: string;
        labelText?: TypographyProps["className"];
        infoIcon?: string;
        infoPopover?: string;
        errorTextContainer?: string;
        errorTextIcon?: string;
        errorText?: TypographyProps["className"];
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
    errorText,
    info,
    icon: Icon,
    iconPlacement = "right",
    action: Action,
    actionPlacement = "right",
    className,
    children,
}: BaseInputWrapperProps): ReactElement => {
    const [infoIcon, setInfoIcon] = useState<HTMLDivElement | null>(null);
    const [infoPopoverOpen, setInfoPopoverOpen] = useState(false);

    const handleInfoMouseEnter = useCallback(() => {
        setInfoPopoverOpen(true);
    }, []);

    const handleInfoMouseExit = useCallback(() => {
        setInfoPopoverOpen(false);
    }, []);

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
                    {info && (
                        <>
                            <div ref={setInfoIcon}>
                                <Info
                                    className={infoIconStyles({
                                        className: className?.infoIcon,
                                    })}
                                    onMouseEnter={handleInfoMouseEnter}
                                    onMouseLeave={handleInfoMouseExit}
                                />
                            </div>
                            <Popover
                                anchor={infoIcon}
                                open={infoPopoverOpen}
                                className={{
                                    root: `cui-p-2 ${className?.infoPopover}`,
                                }}
                            >
                                {info}
                            </Popover>
                        </>
                    )}
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
            {error && errorText && <ErrorText>{errorText}</ErrorText>}
        </div>
    );
};
