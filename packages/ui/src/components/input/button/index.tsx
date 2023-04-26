import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ElementType,
    ForwardedRef,
    forwardRef,
    FunctionComponent,
    ReactNode,
    SVGProps,
} from "react";
import Spinner from "../../../icons/spinner";
import { mergedCva, mergedCx } from "../../../utils/components";

const buttonStyles = mergedCva(
    [
        "cui-relative",
        "cui-w-fit",
        "cui-flex cui-items-center cui-justify-center",
        "cui-font-mono cui-uppercase",
        "cui-border cui-border-black",
        "cui-cursor-pointer",
        "cui-group",
        "cui-transition-colors",
        "cui-rounded-xxl",
    ],
    {
        variants: {
            size: {
                big: "cui-px-6 cui-py-5",
                small: "cui-px-6 cui-py-4 cui-text-s",
                xsmall: "cui-p-4 cui-text-xs",
            },
            variant: {
                primary: [],
                secondary: [],
            },
            active: {
                true: [],
            },
        },
        defaultVariants: {
            active: false,
        },
        compoundVariants: [
            {
                variant: "primary",
                active: false,
                className: [
                    // light mode
                    "cui-bg-black cui-text-white",
                    "hover:cui-bg-orange hover:cui-text-black",
                    "disabled:cui-text-white disabled:cui-bg-gray-400 disabled:cui-border-gray-400",
                    // dark mode
                    "dark:cui-bg-orange dark:cui-text-black",
                    "hover:dark:cui-bg-black hover:dark:cui-text-orange hover:dark:cui-border-orange",
                    "disabled:dark:cui-text-gray-400 disabled:dark:cui-bg-gray-700 disabled:dark:cui-border-gray-700",
                ],
            },
            {
                variant: "secondary",
                active: false,
                className: [
                    "cui-text-black",
                    // dark mode
                    "dark:cui-border-white dark:cui-text-white",
                    "hover:dark:cui-border-black hover:dark:cui-bg-white hover:dark:cui-text-black",
                ],
            },
            // active styles
            {
                variant: ["primary", "secondary"],
                active: true,
                className: [
                    "cui-bg-green cui-border cui-text-black",
                    "hover:cui-bg-black hover:cui-text-white",
                ],
            },
        ],
    }
);

const iconStyles = mergedCva(
    ["only:cui-m-0", "first:cui-mr-2", "last:cui-ml-2"],
    {
        variants: {
            size: {
                big: ["cui-w-6 cui-h-6"],
                small: ["cui-w-5 cui-h-5"],
                xsmall: ["cui-w-4 cui-h-4"],
            },
            loading: {
                true: ["cui-animate-spin"],
            },
        },
    }
);

const spinnerWrapperStyles = mergedCva(
    ["only:cui-m-0", "first:cui-mr-2", "last:cui-ml-2"],
    {
        variants: {
            hasIcon: {
                false: [],
            },
            loading: {
                true: [],
            },
            size: {
                big: ["cui-w-6 cui-h-6"],
                small: ["cui-w-5 cui-h-5"],
                xsmall: ["cui-w-4 cui-h-4"],
            },
        },
        compoundVariants: [
            {
                hasIcon: false,
                loading: true,
                className: [
                    "cui-absolute",
                    "cui-left-1/2",
                    "cui-transform",
                    "-cui-translate-x-1/2",
                ],
            },
        ],
    }
);

const spinnerStyles = mergedCva([], {
    variants: {
        hasIcon: {
            false: ["!cui-m-0"],
        },
        loading: {
            true: ["cui-animate-spin"],
        },
    },
});

const wrapperStyles = mergedCva([], {
    variants: {
        hasIcon: {
            true: [],
            false: [],
        },
        loading: {
            true: [],
        },
    },
    compoundVariants: [
        {
            hasIcon: false,
            loading: true,
            className: ["cui-invisible"],
        },
    ],
});

export interface BaseProps {
    onClick?: (event: React.MouseEvent) => void;
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
    active?: boolean;
    children?: ReactNode;
}

export type CleanHTMLButtonProps = BaseProps &
    BaseProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;
export type CleanHTMLAnchorProps = BaseProps &
    BaseProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps>;

export type ButtonProps = CleanHTMLButtonProps | CleanHTMLAnchorProps;

export type RefType<P extends ButtonProps> = ForwardedRef<
    "href" extends keyof P ? HTMLAnchorElement : HTMLButtonElement
>;

const Component = (props: ButtonProps, ref: RefType<typeof props>) => {
    const {
        variant = "primary",
        size = "big",
        disabled,
        onClick,
        loading,
        children,
        className,
        active = false,
        icon: Icon,
        iconPlacement = "left",
        ...rest
    } = props;

    const sharedProps = {
        className: buttonStyles({
            active,
            size,
            variant,
            className: className?.root,
        }),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [Root, rootProps]: [ElementType, any] =
        "href" in rest
            ? ["a", { href: rest.href }]
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
                    className: className?.iconWrapper,
                })}
            >
                <Spinner
                    className={mergedCx(
                        iconStyles({
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
                    size,
                    className: className?.icon,
                })}
            />
        );

    return (
        <Root {...sharedProps} {...rootProps} {...rest} ref={ref}>
            {children && iconPlacement === "left" && resolvedIcon}
            {children ? (
                <div
                    className={wrapperStyles({
                        hasIcon,
                        loading,
                        className: className?.contentWrapper,
                    })}
                >
                    {children}
                </div>
            ) : (
                resolvedIcon
            )}
            {children && iconPlacement === "right" && resolvedIcon}
        </Root>
    );
};

export const Button = forwardRef(Component) as <P extends ButtonProps>(
    props: P & {
        ref?: RefType<P>;
    }
) => ReturnType<typeof Component>;
