import React, {
    ElementType,
    FunctionComponent,
    ReactNode,
    SVGProps,
} from "react";
import { cva } from "class-variance-authority";
import { ReactComponent as Spinner } from "../assets/spinner.svg";

const buttonStyles = cva(
    [
        "cui-transition-colors cui-group cui-flex cui-items-center cui-font-mono cui-rounded-xxl cui-border cui-cursor-pointer cui-uppercase",
    ],
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

const iconStyles = cva([], {
    variants: {
        // variant: {
        //     primary:
        //         "cui-fill-white dark:cui-fill-black group-hover:cui-fill-black dark:group-hover:cui-fill-orange",
        //     secondary:
        //         "cui-fill-black dark:cui-fill-white group-hover:cui-fill-white dark:group-hover:cui-fill-black",
        // },
        iconPlacement: {
            left: "cui-mr-2",
            right: "cui-ml-2",
        },
        size: {
            big: ["cui-w-6 cui-h-6"],
            small: ["cui-w-5 cui-h-5"],
            xsmall: ["cui-w-4 cui-h-4"],
        },
        loading: {
            true: ["cui-animate-spin"],
        },
    },
});

export interface CarrotButtonProps {
    onClick?: (event: React.MouseEvent) => void;
    href?: string;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    iconPlacement?: "left" | "right";
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
    icon: Icon,
    iconPlacement = "left",
}: CarrotButtonProps) => {
    const sharedProps = {
        className: buttonStyles({
            size,
            variant,
            className: [className, "cui-inline-block"],
        }),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [Root, props]: [ElementType, any] = !!href
        ? ["a", { href }]
        : ["button", { onClick, disabled: disabled || loading }];

    let resolvedIcon;
    if (!!loading)
        resolvedIcon = (
            <Spinner
                className={iconStyles({
                    iconPlacement,
                    size,
                    loading,
                })}
            />
        );
    else if (!!Icon)
        resolvedIcon = <Icon className={iconStyles({ iconPlacement, size })} />;

    return (
        <Root {...sharedProps} {...props}>
            {iconPlacement === "left" && resolvedIcon}
            <div>{children}</div>
            {iconPlacement === "right" && resolvedIcon}
        </Root>
    );
};
