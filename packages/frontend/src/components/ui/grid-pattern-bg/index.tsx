import React from "react";

import { cva } from "class-variance-authority";

const gridPatterBgStyles = cva(
    ["w-full h-full  bg-[top_center] bg-2 md:bg-4"],
    {
        variants: {
            contrast: {
                true: ["bg-square-pattern-contrast"],
                false: ["bg-square-pattern"],
            },
        },
        defaultVariants: {
            contrast: false,
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
    contrast?: boolean;
    fullSize?: boolean;
    className?: string;
}

export const GridPatternBg = ({
    contrast,
    fullSize,
    className,
}: GridPatterBgProps) => {
    return (
        <div className={containerStyles({ fullSize })}>
            <div className={gridPatterBgStyles({ contrast, className })}></div>
        </div>
    );
};
