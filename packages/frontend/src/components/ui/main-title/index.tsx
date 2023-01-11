import React, { ReactNode } from "react";
import { cva } from "class-variance-authority";

const mainTitleStyles = cva(["font-bold"], {
    variants: {
        size: {
            big: ["text-5xl font-bold md:text-6xl"],
            small: ["text-4xl font-bold md:text-5xl"],
        },
    },
    defaultVariants: {
        size: "big",
    },
});

interface MainTitleProps {
    children: ReactNode;
    size?: "big" | "small";
}

export const MainTitle = ({ children, size }: MainTitleProps) => {
    return <h1 className={mainTitleStyles({ size })}>{children}</h1>;
};
