import { cva } from "class-variance-authority";
import React from "react";
import { ReactElement } from "react";
import { ReactComponent as ChrevonUp } from "../../../../assets/chevron-up.svg";

const rootStyles = cva(
    [
        "cui-transition-opacity",
        "cui-duration-250",
        "cui-opacity-70 hover:cui-opacity-100",
        "cui-rounded-full",
        "cui-p-4",
        "cui-bg-white dark:cui-bg-black",
        "cui-border",
        "cui-border-black dark:cui-border-white",
    ],
    {
        variants: {
            visible: {
                false: ["cui-hidden"],
            },
        },
    }
);

const iconStyles = cva(["cui-stroke-black dark:cui-stroke-white"], {
    variants: {
        direction: {
            left: ["-cui-rotate-90"],
            right: ["cui-rotate-90"],
        },
    },
});

interface SlideButtonProps {
    onClick: (event: React.MouseEvent) => void;
    direction: "left" | "right";
    visible?: boolean;
    className?: { root?: string };
}

export const SlideButton = ({
    onClick,
    direction,
    visible,
    className,
}: SlideButtonProps): ReactElement => (
    <button
        className={rootStyles({ className: className?.root, visible })}
        onClick={onClick}
    >
        <ChrevonUp className={iconStyles({ direction })} />
    </button>
);
