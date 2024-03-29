import React, {
    forwardRef,
    type ReactElement,
    type ReactNode,
    useState,
    useEffect,
} from "react";
import { usePopper } from "react-popper";
import { type Placement } from "@popperjs/core";
import { mergedCva } from "../utils/components";

const dropdownRootStyles = mergedCva(
    [
        "cui-rounded-xl",
        "cui-border",
        "cui-bg-white",
        "cui-border-black",
        "dark:cui-text-white",
        "dark:cui-bg-black",
        "dark:cui-border-white",
        "cui-z-10",
        "cui-transition-opacity",
        "cui-shadow-lg",
    ],
    {
        variants: {
            open: {
                true: ["cui-opacity-100", "cui-pointer-events-auto"],
                false: ["cui-opacity-0", "cui-pointer-events-none"],
            },
        },
    },
);

export interface PopoverProps {
    open: boolean;
    anchor?: Element | null;
    placement?: Placement;
    offset?: [number, number];
    className?: { root?: string };
    children?: ReactNode;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
    function Popover(
        {
            open,
            anchor,
            placement = "auto",
            offset = [0, 8],
            className,
            children,
        },
        ref,
    ): ReactElement {
        const [popper, setPopper] = useState<HTMLDivElement | null>(null);

        const { styles, attributes, update } = usePopper(anchor, popper, {
            placement,
            modifiers: [
                {
                    name: "offset",
                    options: { offset },
                },
            ],
        });

        useEffect(() => {
            if (open && update) update();
        }, [open, update]);

        return (
            <div
                ref={(element) => {
                    if (ref) {
                        if (typeof ref === "function") ref(element);
                        else ref.current = element;
                    }
                    setPopper(element);
                }}
                style={styles.popper}
                className={dropdownRootStyles({
                    className: className?.root,
                    open,
                })}
                {...attributes.popper}
            >
                {children}
            </div>
        );
    },
);
