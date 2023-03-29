import React, {
    ElementType,
    ForwardedRef,
    forwardRef,
    HTMLAttributes,
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import { mergedCva } from "../../../utils/components";
import { Popover, PopoverProps } from "../../utils";

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
            "2xs": ["cui-font-mono", "cui-font-normal", "cui-text-2xs"],
            xs: ["cui-font-mono", "cui-font-normal", "cui-text-xs"],
            sm: ["cui-font-mono", "cui-font-normal", "cui-text-sm"],
            md: ["cui-font-mono", "cui-font-normal", "cui-text-base"],
            lg: ["cui-font-mono", "cui-font-normal", "cui-text-lg"],
            xl: ["cui-font-mono", "cui-font-normal", "cui-text-xl"],
            "2xl": ["cui-font-mono", "cui-font-normal", "cui-text-2xl"],
            h6: ["cui-font-sans", "cui-font-bold", "cui-text-h6"],
            h5: ["cui-font-sans", "cui-font-bold", "cui-text-h5"],
            h4: ["cui-font-sans", "cui-font-bold", "cui-text-h4"],
            h3: ["cui-font-sans", "cui-font-bold", "cui-text-h3"],
            h2: [
                "cui-font-sans",
                "cui-font-bold",
                "cui-text-h3",
                "md:cui-text-h2",
            ],
            h1: [
                "cui-font-sans",
                "cui-font-bold",
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
    | "2xs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";

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
    | "h6"
    | "h5"
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
    "2xs": "p",
    xs: "p",
    sm: "p",
    md: "p",
    lg: "p",
    xl: "p",
    "2xl": "p",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
};

const Component = <V extends TypographyVariant>(
    {
        variant = "md",
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

    const handleMouseEnter = useCallback(() => {
        if (!truncate || !shouldShowPopover) return;
        setPopoverOpen(true);
    }, [shouldShowPopover, truncate]);

    const handleMouseLeave = useCallback(() => {
        if (!truncate || !shouldShowPopover) return;
        setPopoverOpen(false);
    }, [shouldShowPopover, truncate]);

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
