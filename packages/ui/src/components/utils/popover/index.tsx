import React, {
    forwardRef,
    ReactElement,
    ReactNode,
    useEffect,
    useState,
} from "react";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";
import { mergedCva } from "../../../utils/components";

const dropdownRootStyles = mergedCva(
    [
        "cui-rounded-xxl",
        "cui-border",
        "cui-bg-white",
        "dark:cui-bg-black",
        "dark:cui-border-white",
        "cui-z-10",
        "cui-transition-opacity",
    ],
    {
        variants: {
            open: {
                true: ["cui-opacity-100", "cui-pointer-events-auto"],
                false: ["cui-opacity-0", "cui-pointer-events-none"],
            },
        },
    }
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
            placement = "bottom",
            offset = [0, 8],
            className,
            children,
        },
        ref
    ): ReactElement {
        const [popper, setPopper] = useState<HTMLDivElement | null>(null);

        useEffect(() => {
            if (!popper || !ref) return;
            if (typeof ref === "function") ref(popper);
            else ref.current = popper;
        }, [popper, ref]);

        const { styles, attributes } = usePopper(anchor, popper, {
            placement,
            modifiers: [
                {
                    name: "offset",
                    options: { offset },
                },
            ],
        });

        return (
            <div
                ref={setPopper}
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
    }
);
