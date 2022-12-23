import React from "react";
import { cva } from "class-variance-authority";

const gridPatterBgStyles = cva(
    ["w-full h-full  bg-[top_center] bg-2 md:bg-4"],
    {
        variants: {
            bg: {
                black: ["bg-square-pattern-contrast"],
                orange: ["bg-square-pattern"],
                white: [
                    "bg-square-pattern-white-bg dark:bg-square-pattern-contrast",
                ],
            },
        },
        defaultVariants: {
            bg: "orange",
        },
    }
);

const containerStyles = cva(["absolute"], {
    variants: {
        fullSize: {
            true: ["w-full h-full top-0"],
            false: ["md:h-[72.5%] w-[92.45%] h-[65%] top-0 md:top-8 left-[5%]"],
        },
    },
    defaultVariants: {
        fullSize: false,
    },
});

interface GridPatterBgProps {
    bg?: "white" | "black" | "orange";
    fullSize?: boolean;
    className?: string;
}

export const GridPatternBg = ({
    bg,
    fullSize,
    className,
}: GridPatterBgProps) => {
    return (
        <div className={containerStyles({ fullSize })}>
            <div className={gridPatterBgStyles({ bg, className })}></div>
        </div>
    );
};
