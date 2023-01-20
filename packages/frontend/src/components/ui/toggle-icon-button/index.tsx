import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

export interface ToggleButtonProps {
    toggle: () => void;
    active: boolean;
}

interface ToggleIconButtonProps extends ToggleButtonProps {
    children: ReactNode;
}

export const ToggleIconButton = ({
    toggle,
    active,
    children,
}: ToggleIconButtonProps) => (
    <button className={ToggleIconButtonStyles({ active })} onClick={toggle}>
        {children}
    </button>
);

const ToggleIconButtonStyles = cva(
    ["p-3", "border", "rounded-xl", "font-mono"],
    {
        variants: {
            active: {
                true: ["bg-black text-white"],
                false: ["text-black"],
            },
        },
        defaultVariants: {
            active: false,
        },
    }
);
