import React, {
    ElementType,
    FunctionComponent,
    HTMLAttributes,
    ReactNode,
    SVGProps,
} from "react";
import { cva, cx } from "class-variance-authority";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

const buttonStyles = cva(
    [
        "cui-relative",
        "cui-w-fit",
        "cui-transition-colors",
        "cui-group",
        "cui-flex",
        "cui-items-center",
        "cui-justify-center",
        "cui-font-mono",
        "cui-rounded-xxl",
        "cui-border",
        "cui-cursor-pointer",
        "cui-uppercase",
    ],
    {
        variants: {
            variant: {
                primary: [
                    "cui-border-black",
                    "cui-bg-black",
                    "cui-text-white",
                    "hover:cui-bg-orange",
                    "hover:cui-text-black",
                    "disabled:cui-text-white",
                    "disabled:cui-bg-gray-400",
                    "disabled:cui-border-gray-400",
                    "dark:cui-bg-orange",
                    "dark:cui-text-black",
                    "hover:dark:cui-bg-black",
                    "hover:dark:cui-text-orange",
                    "hover:dark:cui-border-orange",
                    "disabled:dark:cui-text-gray-400",
                    "disabled:dark:cui-bg-gray-700",
                    "disabled:dark:cui-border-gray-700",
                ],
                secondary: [
                    "cui-border-black",
                    "cui-bg-transparent",
                    "cui-text-black",
                    "hover:cui-border-white",
                    "hover:cui-bg-black",
                    "hover:cui-text-white",
                    "dark:cui-border-white",
                    "dark:cui-text-white",
                    "hover:dark:cui-border-black",
                    "hover:dark:cui-bg-white",
                    "hover:dark:cui-text-black",
                ],
            },
            size: {
                big: "cui-px-6 cui-py-5",
                small: "cui-px-6 cui-py-4 cui-text-s",
                xsmall: "cui-p-4 cui-text-xs",
            },
        },
    }
);

const iconStyles = cva("", {
    variants: {
        iconPlacement: {
            left: "cui-mr-2",
            right: "cui-ml-2",
        },
        size: {
            big: "cui-w-6 cui-h-6",
            small: "cui-w-5 cui-h-5",
            xsmall: "cui-w-4 cui-h-4",
        },
        loading: {
            true: "cui-animate-spin",
        },
    },
});

const spinnerWrapperStyles = cva("", {
    variants: {
        iconPlacement: {
            left: "cui-mr-2",
            right: "cui-ml-2",
        },
        hasIcon: {
            false: "",
        },
        loading: {
            true: "",
        },
        size: {
            big: "cui-w-6 cui-h-6",
            small: "cui-w-5 cui-h-5",
            xsmall: "cui-w-4 cui-h-4",
        },
    },
    compoundVariants: [
        {
            hasIcon: false,
            loading: true,
            className:
                "cui-absolute cui-left-1/2 cui-transform -cui-translate-x-1/2",
        },
    ],
});

const spinnerStyles = cva("", {
    variants: {
        hasIcon: {
            false: "!cui-m-0",
        },
        loading: {
            true: "cui-animate-spin",
        },
    },
});

const wrapperStyles = cva("", {
    variants: {
        hasIcon: {
            true: "",
            false: "",
        },
        loading: {
            true: "",
        },
    },
    compoundVariants: [
        {
            hasIcon: false,
            loading: true,
            className: "cui-invisible",
        },
    ],
});

interface BaseButtonProps {
    onClick?: (event: React.MouseEvent) => void;
    href?: string;
    disabled?: boolean;
    loading?: boolean;
    className?: {
        root?: string;
        iconWrapper?: string;
        icon?: string;
        contentWrapper?: string;
    };
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    iconPlacement?: "left" | "right";
    size?: "big" | "small" | "xsmall";
    variant?: "primary" | "secondary";
    children: ReactNode;
}

export type ButtonProps = Omit<
    HTMLAttributes<
        BaseButtonProps["href"] extends string
            ? HTMLAnchorElement
            : HTMLButtonElement
    >,
    keyof BaseButtonProps
> &
    BaseButtonProps;

export const Button = ({
    href,
    variant = "primary",
    size = "big",
    disabled,
    onClick,
    loading,
    children,
    className,
    icon: Icon,
    iconPlacement = "left",
    ...rest
}: ButtonProps) => {
    const sharedProps = {
        className: buttonStyles({
            size,
            variant,
            className: className?.root,
        }),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [Root, props]: [ElementType, any] = !!href
        ? ["a", { href }]
        : ["button", { onClick, disabled: disabled || loading }];

    const hasIcon = !!Icon;
    let resolvedIcon;
    if (!!loading)
        resolvedIcon = (
            <div
                className={spinnerWrapperStyles({
                    hasIcon,
                    loading,
                    size,
                    iconPlacement,
                    className: className?.iconWrapper,
                })}
            >
                <Spinner
                    className={cx(
                        iconStyles({
                            iconPlacement,
                            size,
                            loading,
                        }),
                        spinnerStyles({ hasIcon, loading }),
                        className?.icon
                    )}
                />
            </div>
        );
    else if (!!hasIcon)
        resolvedIcon = (
            <Icon
                className={iconStyles({
                    iconPlacement,
                    size,
                    className: className?.icon,
                })}
            />
        );

    return (
        <Root {...sharedProps} {...props} {...rest}>
            {iconPlacement === "left" && resolvedIcon}
            <div
                className={wrapperStyles({
                    hasIcon,
                    loading,
                    className: className?.contentWrapper,
                })}
            >
                {children}
            </div>
            {iconPlacement === "right" && resolvedIcon}
        </Root>
    );
};
