import { Typography } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import React, { ReactElement, ReactNode } from "react";

const rootStyles = cva([], {
    variants: {
        autoAlign: {
            true: ["text-center", "sm:text-left"],
        },
    },
});

const textStyles = cva([], {
    variants: {
        variant: {
            h3: ["text-h5 sm:text-h4 md:text-h3"],
            h2: ["text-h4 sm:text-h3 md:text-h2"],
            h1: ["text-h3 sm:text-h2 md:text-h1"],
        },
    },
});

type HeaderVariant = "h1" | "h2" | "h3";

interface ResponsiveHeaderProps {
    children: ReactNode;
    variant?: HeaderVariant;
    autoAlign?: boolean;
    className?: { root?: string; text?: string };
}

export const ResponsiveHeader = ({
    children,
    variant,
    autoAlign,
    className,
}: ResponsiveHeaderProps): ReactElement => (
    <div
        className={rootStyles({
            autoAlign,
            className: className?.root,
        })}
    >
        <Typography
            variant={variant}
            className={{
                root: textStyles({ variant }),
            }}
        >
            {children}
        </Typography>
    </div>
);
