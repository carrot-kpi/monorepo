import React, { forwardRef, useCallback, useEffect, useState } from "react";
import type {
    ElementType,
    ForwardedRef,
    HTMLAttributes,
    ReactElement,
    ReactNode,
} from "react";
import { mergedCva } from "../../../utils/components";
import { Popover, type PopoverProps } from "../../utils";

const rootStyles = mergedCva(["cui-text-black dark:cui-text-white"], {
    variants: {
        uppercase: {
            true: ["cui-uppercase"],
        },
        truncate: {
            true: [
                "cui-overflow-hidden",
                "cui-whitespace-nowrap",
                "cui-text-ellipsis",
            ],
        },
        cursorPointer: {
            true: ["cui-cursor-pointer"],
        },
        variant: {
            xs: ["cui-font-normal", "cui-font-mono", "cui-text-xs"],
            sm: ["cui-font-normal", "cui-font-mono", "cui-text-sm"],
            base: ["cui-font-normal", "cui-font-mono", "cui-text-base"],
            lg: ["cui-font-normal", "cui-font-mono", "cui-text-lg"],
            xl: ["cui-font-normal", "cui-font-mono", "cui-text-xl"],
            h4: ["cui-font-bold", "cui-font-sans", "cui-text-h4"],
            h3: ["cui-font-bold", "cui-font-sans", "cui-text-h3"],
            h2: [
                "cui-font-bold",
                "cui-font-sans",
                "cui-text-h3",
                "md:cui-text-h2",
            ],
            h1: [
                "cui-font-bold",
                "cui-font-sans",
                "cui-text-h3",
                "md:cui-text-h1",
            ],
        },
        weight: {
            normal: ["cui-font-normal"],
            medium: ["cui-font-medium"],
            bold: ["cui-font-bold"],
        },
    },
});

export type TypographyVariant =
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "h1"
    | "h2"
    | "h3"
    | "h4";

export interface BaseTypographyProps {
    variant?: TypographyVariant;
    weight?: "normal" | "medium" | "bold";
    uppercase?: boolean;
    truncate?: boolean;
    className?: {
        root?: string;
        truncatedTextPopover?: PopoverProps["className"];
    };
    children: ReactNode;
}

export type HTMLElementFromVariant<V extends TypographyVariant> = V extends
    | "h4"
    | "h3"
    | "h2"
    | "h1"
    ? HTMLHeadingElement
    : HTMLParagraphElement;

export type TypographyProps<V extends TypographyVariant = TypographyVariant> =
    Omit<HTMLAttributes<HTMLElementFromVariant<V>>, keyof BaseTypographyProps> &
        BaseTypographyProps;

const COMPONENT_MAP: Record<TypographyVariant, ElementType> = {
    xs: "p",
    sm: "p",
    base: "p",
    lg: "p",
    xl: "p",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
};

const Component = <V extends TypographyVariant>(
    {
        variant = "base",
        weight,
        uppercase,
        truncate,
        className,
        children,
        ...rest
    }: TypographyProps<V>,
    ref: ForwardedRef<HTMLElementFromVariant<V>>
): ReactElement => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [shouldShowPopover, setShouldShowPopover] = useState(false);
    const [rootEl, setRootEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!truncate || !rootEl) {
            setShouldShowPopover(false);
            return;
        }
        const shouldShow = rootEl.offsetWidth < rootEl.scrollWidth;
        if (!shouldShow) setPopoverOpen(false);
        setShouldShowPopover(shouldShow);
    }, [children, rootEl, truncate]);

    const handleMouseEnter = useCallback(
        (event: React.MouseEvent<HTMLElementFromVariant<V>, MouseEvent>) => {
            if (truncate && shouldShowPopover) setPopoverOpen(true);
            if (rest.onMouseEnter) rest.onMouseEnter(event);
        },
        [rest, shouldShowPopover, truncate]
    );

    const handleMouseLeave = useCallback(
        (event: React.MouseEvent<HTMLElementFromVariant<V>, MouseEvent>) => {
            if (truncate && shouldShowPopover) setPopoverOpen(false);
            if (rest.onMouseLeave) rest.onMouseLeave(event);
        },
        [rest, shouldShowPopover, truncate]
    );

    const Root = COMPONENT_MAP[variant];

    return (
        <>
            {truncate && (
                <Popover
                    open={popoverOpen}
                    anchor={rootEl}
                    className={{
                        ...className?.truncatedTextPopover,
                        root: `px-3 py-2 ${className?.truncatedTextPopover?.root}`,
                    }}
                >
                    <Typography variant="sm">{children}</Typography>
                </Popover>
            )}
            <Root
                className={rootStyles({
                    variant,
                    weight,
                    uppercase,
                    truncate,
                    cursorPointer: shouldShowPopover,
                    className: className?.root,
                })}
                {...rest}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={(element: HTMLElementFromVariant<V>) => {
                    if (ref) {
                        if (typeof ref === "function") ref(element);
                        else ref.current = element;
                    }
                    setRootEl(element);
                }}
            >
                {children}
            </Root>
        </>
    );
};

export const Typography = forwardRef(Component) as <
    V extends TypographyVariant
>(
    props: TypographyProps<V> & {
        ref?: React.ForwardedRef<HTMLElementFromVariant<V>>;
    }
) => ReturnType<typeof Component>;
