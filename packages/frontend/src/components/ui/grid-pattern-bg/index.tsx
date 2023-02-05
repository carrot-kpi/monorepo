import React from "react";
import { cva } from "class-variance-authority";
import squarePatternLight from "../../../assets/square-pattern-light.svg";
import squarePatternDark from "../../../assets/square-pattern-dark.svg";

type Background = "white" | "black" | "orange";

const URL_MAP: Record<Background, string> = {
    orange: squarePatternLight,
    white: squarePatternLight,
    black: squarePatternDark,
};

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
    bg?: Background;
    fullSize?: boolean;
    className?: string;
}

export const GridPatternBg = ({
    bg = "orange",
    fullSize,
    className,
}: GridPatterBgProps) => {
    const bgURL = bg ? URL_MAP[bg] : undefined;

    return (
        <div className={containerStyles({ fullSize })}>
            <div
                style={!!bgURL ? { backgroundImage: `url(${bgURL})` } : {}}
                className={`w-full h-full bg-[top_center] bg-2 md:bg-4 ${className}`}
            ></div>
        </div>
    );
};
